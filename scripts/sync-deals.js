#!/usr/bin/env node
/**
 * Syncs deal data from the Google Sheet CSV and updates data/deals.ts.
 * - Fetches the published CSV
 * - Geocodes any new addresses not in data/geocache.json
 * - Writes updated data/deals.ts and data/geocache.json
 *
 * Usage: node scripts/sync-deals.js
 */

const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTB8iqkpYfxuJ1njRZBWqcNV8_5aDrR-ndQNIB-TI8EuHpnrvcipRfTd4XzDYgbH35B7WLaJxqHwhcR/pub?output=csv&gid=0'

// Addresses that count as 2 deals (package deals) — match exactly as they appear in the sheet
const PACKAGE_DEALS = new Set([
  '3817 & 3819 Temple St, Tampa, FL 33619',
  '6941 & 6945 Se 110Th St, Belleview, FL 34420',
  '6941 & 6945 SE 110th St, Belleview, FL 34420',
])

const ROOT = path.join(__dirname, '..')
const GEOCACHE_PATH = path.join(ROOT, 'data', 'geocache.json')
const DEALS_PATH = path.join(ROOT, 'data', 'deals.ts')

// ── helpers ──────────────────────────────────────────────────────────────────

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    lib.get(url, { headers: { 'User-Agent': 'TopShelfSync/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject)
      }
      let data = ''
      res.on('data', (c) => (data += c))
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function geocode(address) {
  // Try Nominatim first
  try {
    const q = encodeURIComponent(address)
    const body = await fetchUrl(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=us`
    )
    const results = JSON.parse(body)
    if (results.length) return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) }
  } catch (_) {}

  await sleep(500)

  // Fallback: Census Bureau
  try {
    const q = encodeURIComponent(address)
    const body = await fetchUrl(
      `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${q}&benchmark=2020&format=json`
    )
    const data = JSON.parse(body)
    const matches = data?.result?.addressMatches ?? []
    if (matches.length) {
      return { lat: parseFloat(matches[0].coordinates.y), lng: parseFloat(matches[0].coordinates.x) }
    }
  } catch (_) {}

  return null
}

function parseCSV(text) {
  const rows = []
  const lines = text.split('\n')
  for (const line of lines) {
    if (!line.trim()) continue
    const cols = []
    let cur = ''
    let inQuote = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"' && !inQuote) { inQuote = true; continue }
      if (ch === '"' && inQuote) {
        if (line[i + 1] === '"') { cur += '"'; i++; continue }
        inQuote = false; continue
      }
      if (ch === ',' && !inQuote) { cols.push(cur.trim()); cur = ''; continue }
      cur += ch
    }
    cols.push(cur.trim())
    rows.push(cols)
  }
  return rows
}

function normalizeAddress(addr) {
  return addr
    .replace(/\s+/g, ' ')
    .replace(/\bST\b/g, 'St').replace(/\bAVE\b/g, 'Ave').replace(/\bDR\b/g, 'Dr')
    .replace(/\bBLVD\b/g, 'Blvd').replace(/\bRD\b/g, 'Rd').replace(/\bCT\b/g, 'Ct')
    .replace(/\bLN\b/g, 'Ln').replace(/\bPL\b/g, 'Pl').replace(/\bCIR\b/g, 'Cir')
    .replace(/\bTERR?\b/g, 'Ter').replace(/\bHWY\b/g, 'Hwy').replace(/\bPKWY\b/g, 'Pkwy')
    .split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    // Fix known abbreviations that should stay uppercase
    .replace(/\bFl\b/g, 'FL').replace(/\bNe\b/g, 'NE').replace(/\bNw\b/g, 'NW')
    .replace(/\bSe\b/g, 'SE').replace(/\bSw\b/g, 'SW').replace(/\bN\b/g, 'N')
    .replace(/\bS\b/g, 'S').replace(/\bE\b/g, 'E').replace(/\bW\b/g, 'W')
    .trim()
}

function buildDealsTs(deals) {
  const entries = deals.map((d) => {
    const lat = d.lat !== null ? d.lat : null
    const lng = d.lng !== null ? d.lng : null
    const count = d.count ? `,\n    "count": ${d.count}` : ''
    return `  {\n    "address": "${d.address}",\n    "date": "${d.date}",\n    "lat": ${lat},\n    "lng": ${lng}${count}\n  }`
  })

  return `export interface Deal {
  address: string;
  date: string;
  lat: number | null;
  lng: number | null;
  count?: number;
}

export const deals: Deal[] = [
${entries.join(',\n')}
];

export const TOTAL_DEALS = deals.reduce((sum, d) => sum + (d.count ?? 1), 0);
`
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📊 Fetching Google Sheet CSV...')
  const csv = await fetchUrl(SHEET_CSV_URL)

  const rows = parseCSV(csv)
  const header = rows[0]
  const dateIdx = header.findIndex((h) => h.toLowerCase().includes('date'))
  const addrIdx = header.findIndex((h) => h.toLowerCase().includes('address'))

  if (dateIdx === -1 || addrIdx === -1) {
    console.error('Could not find Date or Address columns in sheet. Headers:', header)
    process.exit(1)
  }

  // Load geocache
  const geocache = fs.existsSync(GEOCACHE_PATH)
    ? JSON.parse(fs.readFileSync(GEOCACHE_PATH, 'utf8'))
    : {}

  // Parse rows into deals (skip header, skip rows without a real address)
  const deals = []
  const seen = new Set()
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const rawDate = row[dateIdx]?.trim()
    const rawAddr = row[addrIdx]?.trim()

    if (!rawDate || !rawAddr || rawAddr.toLowerCase() === 'address') continue
    // Skip summary/stat rows (no recognizable date format)
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(rawDate)) continue

    const address = normalizeAddress(rawAddr)
    if (!address || seen.has(address + rawDate)) continue
    seen.add(address + rawDate)

    const count = PACKAGE_DEALS.has(address) ? 2 : undefined
    deals.push({ address, date: rawDate, count })
  }

  console.log(`📋 Found ${deals.length} deals in sheet`)

  // Geocode any new addresses
  let newCount = 0
  for (const deal of deals) {
    if (geocache[deal.address]) continue
    console.log(`🗺  Geocoding: ${deal.address}`)
    await sleep(1100) // respect Nominatim rate limit
    const coords = await geocode(deal.address)
    if (coords) {
      geocache[deal.address] = coords
      console.log(`   ✓ ${coords.lat}, ${coords.lng}`)
      newCount++
    } else {
      console.log(`   ✗ Could not geocode — pin will be hidden`)
    }
  }

  // Attach coordinates
  const dealsWithCoords = deals.map((d) => ({
    ...d,
    lat: geocache[d.address]?.lat ?? null,
    lng: geocache[d.address]?.lng ?? null,
  }))

  // Write files
  fs.writeFileSync(GEOCACHE_PATH, JSON.stringify(geocache, null, 2))
  fs.writeFileSync(DEALS_PATH, buildDealsTs(dealsWithCoords))

  const total = dealsWithCoords.reduce((s, d) => s + (d.count ?? 1), 0)
  console.log(`\n✅ Done — ${deals.length} addresses, ${total} total deals, ${newCount} newly geocoded`)
  console.log(`   deals.ts and geocache.json updated`)
}

main().catch((err) => { console.error(err); process.exit(1) })
