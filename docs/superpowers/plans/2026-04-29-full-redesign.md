# Top Shelf Acquisitions Full Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert and fully redesign the Top Shelf Acquisitions static site into a polished Next.js 16 + React + Framer Motion 12 site with fresh geocoded map data (99 deals), upgraded navy/teal design system, and all-new component architecture.

**Architecture:** Next.js 16 App Router at `/Users/seancastro/top-shelf-next/`. Each section is a `'use client'` React component in `components/`. Framer Motion 12 handles entrance animations. Leaflet map lives in `DealMap.tsx` loaded via `dynamic(..., { ssr: false })`. globals.css is a complete rewrite with new design tokens. Deal data is re-geocoded from the live Google Sheet via a Python script.

**Tech Stack:** Next.js 16.2.4, React 19, TypeScript, Framer Motion 12, Leaflet 1.9, next/font (Inter + Playfair Display)

---

## File Map

| File | Action | Role |
|------|--------|------|
| `app/layout.tsx` | Modify | Inter + Playfair Display fonts, updated metadata |
| `app/globals.css` | Rewrite | Complete new design system |
| `app/page.tsx` | Create | Composes all section components |
| `components/Navbar.tsx` | Create | Fixed nav, scroll state, mobile menu |
| `components/Hero.tsx` | Create | Full-viewport hero, Framer Motion entrance |
| `components/ProofBar.tsx` | Create | 4-stat strip (99 deals, $1.85M+, 24hr, $0 fees) |
| `components/About.tsx` | Create | Two-column: text left, cards right |
| `components/WhatWeBuy.tsx` | Create | Two asset class cards |
| `components/HowItWorks.tsx` | Create | 3-step horizontal process |
| `components/Portfolio.tsx` | Create | Animated counter + dynamic DealMap |
| `components/DealMap.tsx` | Create | Leaflet map, client-only |
| `components/ContactForm.tsx` | Create | Contact form with submit state |
| `components/Footer.tsx` | Create | Logo, tagline, copyright |
| `data/deals.ts` | Create | 97 geocoded deals as typed TS array |
| `data/geocode_fresh.py` | Create | Geocoding script (Nominatim + Census fallback) |

---

### Task 1: Verify Setup and Dependencies

**Files:** None new

- [ ] **Step 1: Check Next.js 16 App Router docs**

```bash
ls /Users/seancastro/top-shelf-next/node_modules/next/dist/docs/ 2>/dev/null | head -20 || echo "no docs dir"
cat /Users/seancastro/top-shelf-next/node_modules/next/package.json | grep '"version"'
```

- [ ] **Step 2: Verify all dependencies are installed**

```bash
cd /Users/seancastro/top-shelf-next
cat package.json
ls node_modules | grep -E "framer-motion|leaflet|next"
```

Expected: `framer-motion`, `leaflet`, `next` all present.

- [ ] **Step 3: Create component and data directories**

```bash
cd /Users/seancastro/top-shelf-next
mkdir -p components data
```

- [ ] **Step 4: Copy logo**

```bash
cp /Users/seancastro/top-shelf-acquisitions/logo.png /Users/seancastro/top-shelf-next/public/logo.png
```

- [ ] **Step 5: Initialize git if needed and commit**

```bash
cd /Users/seancastro/top-shelf-next
git init 2>/dev/null || true
git add -A
git commit -m "chore: verify setup, create dirs, copy logo" --allow-empty
```

---

### Task 2: Geocode Addresses and Create data/deals.ts

**Files:**
- Create: `data/geocode_fresh.py`
- Create: `data/deals.ts`

- [ ] **Step 1: Write geocoding script**

Write to `/Users/seancastro/top-shelf-next/data/geocode_fresh.py`:

```python
#!/usr/bin/env python3
"""
Geocodes all TSA deal addresses using Nominatim with Census Bureau API fallback.
Outputs data/deals_raw.json. Run once, then generate deals.ts from the output.
"""
import json, time, urllib.request, urllib.parse

ADDRESSES = [
    {"address": "5425 Drinkard Dr, New Port Richey, FL 34653", "date": "12/22/2022"},
    {"address": "6940 17th St N, St Petersburg, FL 33702", "date": "01/31/2023"},
    {"address": "11205 N Florence Ave, Tampa, FL 33612", "date": "02/28/2023"},
    {"address": "3425 24th Cir, Sarasota, FL 34235", "date": "05/26/2023"},
    {"address": "3815 N 14th St, Tampa, FL 33603", "date": "05/26/2023"},
    {"address": "2506 N Avenida Republica De Cuba, Tampa, FL 33605", "date": "05/19/2023"},
    {"address": "1740 W Powhatan Ave, Tampa, FL 33603", "date": "06/26/2023"},
    {"address": "7950 52nd St N, Pinellas Park, FL 33781", "date": "06/05/2023"},
    {"address": "8606 N Semmes St, Tampa, FL 33604", "date": "08/01/2023"},
    {"address": "429 Burgundy I, Delray Beach, FL 33484", "date": "09/29/2023"},
    {"address": "5311 10th St N, St Petersburg, FL 33703", "date": "10/05/2023"},
    {"address": "6733 81st Ave N, Pinellas Park, FL 33781", "date": "10/26/2023"},
    {"address": "1806 7th Ave W, Bradenton, FL 34205", "date": "11/22/2023"},
    {"address": "3817 Buckeye Cir, Sarasota, FL 34232", "date": "12/20/2023"},
    {"address": "1915 E Ellicott St, Tampa, FL 33610", "date": "12/07/2023"},
    {"address": "1004 27th Ave W, Bradenton, FL 34205", "date": "01/17/2024"},
    {"address": "3616 Lindell Ave, Tampa, FL 33610", "date": "01/30/2024"},
    {"address": "4151 Oakfield Ave, Holiday, FL 34691", "date": "02/08/2024"},
    {"address": "6108 Oak Ridge Ave, New Port Richey, FL 34653", "date": "03/22/2024"},
    {"address": "4004 36th Avenue Dr W, Bradenton, FL 34205", "date": "03/01/2024"},
    {"address": "3008 Newtown Blvd, Sarasota, FL 34234", "date": "03/14/2024"},
    {"address": "5410 Jersey Ave S, Gulfport, FL 33707", "date": "04/26/2024"},
    {"address": "1205 29th St W, Bradenton, FL 34205", "date": "04/22/2024"},
    {"address": "3910 W Iowa Ave, Tampa, FL 33616", "date": "05/22/2024"},
    {"address": "811 27th Street Court East, Bradenton, FL 34208", "date": "05/28/2024"},
    {"address": "149 Caddy Rd, Rotonda West, FL 33947", "date": "05/01/2024"},
    {"address": "4800 Turnberry Cir, North Port, FL 34288", "date": "05/03/2024"},
    {"address": "462 NE 71st Ter, Ocala, FL 34470", "date": "07/22/2024"},
    {"address": "6941 Dalkeith Ave N, Saint Petersburg, FL 33709", "date": "07/24/2024"},
    {"address": "112 E Emily St, Tampa, FL 33603", "date": "07/31/2024"},
    {"address": "3145 Kingston St, Port Charlotte, FL 33952", "date": "08/07/2024"},
    {"address": "1400 Lakeview Rd, Clearwater, FL 33756", "date": "08/28/2024"},
    {"address": "101 Williams Ditch Rd, Cantonment, FL 32533", "date": "09/12/2024"},
    {"address": "6343 Talbot St, North Port, FL 34287", "date": "01/10/2025"},
    {"address": "2100 Auburn St S, St Petersburg, FL 33712", "date": "01/14/2025"},
    {"address": "7377 Royal Palm Dr, New Port Richey, FL 34652", "date": "01/31/2025"},
    {"address": "16214 2nd St E, Redington Beach, FL 33708", "date": "02/14/2025"},
    {"address": "3430 Chapel Dr, Sarasota, FL 34234", "date": "02/13/2025"},
    {"address": "803 W Woodlawn Ave, Tampa, FL 33603", "date": "02/28/2025"},
    {"address": "8701 Gulf Blvd, St Pete Beach, FL 33706", "date": "03/07/2025"},
    {"address": "5745 4th Ave N, St Petersburg, FL 33710", "date": "03/07/2025"},
    {"address": "2115 W Saint John St, Tampa, FL 33607", "date": "03/07/2025"},
    {"address": "6572 Mauna Loa Blvd, Sarasota, FL 34241", "date": "03/13/2025"},
    {"address": "3011 W Spruce St, Tampa, FL 33607", "date": "03/14/2025"},
    {"address": "1213 W Camellia Dr, Brandon, FL 33510", "date": "03/21/2025"},
    {"address": "905 Hart St, Clearwater, FL 33755", "date": "03/27/2025"},
    {"address": "4041 52nd Ave N, Saint Petersburg, FL 33714", "date": "03/28/2025"},
    {"address": "2401 16th Ave N, Saint Petersburg, FL 33713", "date": "04/01/2025"},
    {"address": "7013 Symmes Rd, Gibsonton, FL 33534", "date": "04/01/2025"},
    {"address": "9948 Skewlee Rd, Thonotosassa, FL 33592", "date": "04/11/2025"},
    {"address": "1004 E 28th Ave, Tampa, FL 33605", "date": "04/29/2025"},
    {"address": "5175 23rd Ave N, St Petersburg, FL 33710", "date": "05/02/2025"},
    {"address": "5720 79th Ave N, Pinellas Park, FL 33781", "date": "05/21/2025"},
    {"address": "8052 Gabriel Dr, Port Richey, FL 34668", "date": "05/22/2025"},
    {"address": "2220 Davis St, Tampa, FL 33605", "date": "05/23/2025"},
    {"address": "4107 W Fielder St, Tampa, FL 33611", "date": "06/03/2025"},
    {"address": "4630 W Euclid Ave, Tampa, FL 33629", "date": "06/11/2025"},
    {"address": "7441 San Moritz Dr, Port Richey, FL 34668", "date": "06/12/2025"},
    {"address": "2505 Hollis Dr, Tampa, FL 33618", "date": "06/19/2025"},
    {"address": "111 Orangeview Ave, Clearwater, FL 33755", "date": "07/07/2025"},
    {"address": "4719 W Wyoming Ave, Tampa, FL 33616", "date": "07/10/2025"},
    {"address": "13097 120th St, Largo, FL 33778", "date": "07/10/2025"},
    {"address": "601 Park Blvd, Oldsmar, FL 34677", "date": "07/16/2025"},
    {"address": "10418 N Oklawaha Ave, Tampa, FL 33617", "date": "08/08/2025"},
    {"address": "16103 4th St E, Redington Beach, FL 33708", "date": "08/08/2025"},
    {"address": "1607 Stevensons Dr, Clearwater, FL 33755", "date": "08/12/2025"},
    {"address": "1602 3rd Ave W, Palmetto, FL 34221", "date": "08/20/2025"},
    {"address": "12760 118th St, Seminole, FL 33778", "date": "09/08/2025"},
    {"address": "8717 91st Ter, Seminole, FL 33777", "date": "09/16/2025"},
    {"address": "124 Magnolia Ave, Seffner, FL 33584", "date": "09/17/2025"},
    {"address": "300 83rd Ave NE, Saint Petersburg, FL 33702", "date": "09/30/2025"},
    {"address": "7504 S Germer St, Tampa, FL 33616", "date": "09/30/2025"},
    {"address": "4946 Dr Martin Luther King Jr St S, St Petersburg, FL 33705", "date": "10/03/2025"},
    {"address": "5170 Flamingo Dr, Saint Petersburg, FL 33714", "date": "10/03/2025"},
    {"address": "4111 W Marietta St, Tampa, FL 33616", "date": "10/06/2025"},
    {"address": "6544 S West Shore Cir, Tampa, FL 33616", "date": "10/14/2025"},
    {"address": "335 80th Ave NE, Saint Petersburg, FL 33702", "date": "10/15/2025"},
    {"address": "1925 Forked Creek Dr, Englewood, FL 34223", "date": "10/17/2025"},
    {"address": "2309 21st Ave W, Bradenton, FL 34205", "date": "11/12/2025"},
    {"address": "2415 25th Ave W, Bradenton, FL 34205", "date": "01/09/2026"},
    {"address": "2303 N 47th St, Tampa, FL 33605", "date": "01/16/2026"},
    {"address": "1806 E Linda St, Plant City, FL 33563", "date": "02/06/2026"},
    {"address": "3604 E Lambright St, Tampa, FL 33610", "date": "02/06/2026"},
    {"address": "7735 Brookridge Dr, Port Richey, FL 34668", "date": "02/10/2026"},
    {"address": "701 Westwood Ln, Brandon, FL 33511", "date": "02/19/2026"},
    {"address": "3817 Temple St, Tampa, FL 33619", "date": "02/25/2026", "count": 2},
    {"address": "1609 Council Dr, Sun City Center, FL 33573", "date": "02/27/2026"},
    {"address": "431 Rafael Blvd NE, Saint Petersburg, FL 33704", "date": "03/05/2026"},
    {"address": "5905 N Cherokee Ave, Tampa, FL 33604", "date": "03/13/2026"},
    {"address": "1001 Carlton St, Clearwater, FL 33755", "date": "03/13/2026"},
    {"address": "1621 N Washington Ave, Clearwater, FL 33755", "date": "03/26/2026"},
    {"address": "27215 Punta Cabello Ct, Punta Gorda, FL 33983", "date": "03/27/2026"},
    {"address": "402 E Damon St, Plant City, FL 33563", "date": "04/10/2026"},
    {"address": "6941 SE 110th St, Belleview, FL 34420", "date": "04/13/2026", "count": 2},
    {"address": "4425 18th Ave S, St Petersburg, FL 33711", "date": "04/17/2026"},
    {"address": "3307 Hickman Ave, Plant City, FL 33563", "date": "04/21/2026"},
]

def geocode_nominatim(address):
    q = urllib.parse.urlencode({"q": address, "format": "json", "limit": 1})
    url = f"https://nominatim.openstreetmap.org/search?{q}"
    req = urllib.request.Request(url, headers={"User-Agent": "TSA-Geocoder/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read())
            if data:
                return float(data[0]["lat"]), float(data[0]["lon"])
    except Exception as e:
        print(f"  Nominatim error: {e}")
    return None, None

def geocode_census(address):
    q = urllib.parse.urlencode({"address": address, "benchmark": "Public_AR_Current", "format": "json"})
    url = f"https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?{q}"
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            data = json.loads(r.read())
            matches = data.get("result", {}).get("addressMatches", [])
            if matches:
                coords = matches[0]["coordinates"]
                return float(coords["y"]), float(coords["x"])
    except Exception as e:
        print(f"  Census error: {e}")
    return None, None

results = []
for i, item in enumerate(ADDRESSES):
    addr = item["address"]
    print(f"[{i+1}/{len(ADDRESSES)}] {addr}")
    lat, lng = geocode_nominatim(addr)
    time.sleep(1.1)  # Nominatim rate limit
    if not lat:
        print("  -> Nominatim failed, trying Census...")
        lat, lng = geocode_census(addr)
        time.sleep(0.5)
    if lat:
        print(f"  -> {lat:.5f}, {lng:.5f}")
    else:
        print(f"  -> FAILED — manual fix needed")
    result = {**item, "lat": lat, "lng": lng}
    results.append(result)

with open("/Users/seancastro/top-shelf-next/data/deals_raw.json", "w") as f:
    json.dump(results, f, indent=2)

failed = [r for r in results if not r["lat"]]
print(f"\nDone. {len(results) - len(failed)}/{len(results)} geocoded.")
if failed:
    print("FAILED:")
    for r in failed:
        print(f"  {r['address']}")
```

- [ ] **Step 2: Run geocoding script**

```bash
cd /Users/seancastro/top-shelf-next
python3 data/geocode_fresh.py
```

Expected: `Done. 97/97 geocoded.` (or near — any failures get manual lat/lng below)

Manual fallbacks if geocoding fails (hardcode these in the raw JSON):
- `429 Burgundy I, Delray Beach, FL 33484` → lat: 26.4615, lng: -80.0728
- `101 Williams Ditch Rd, Cantonment, FL 32533` → lat: 30.6088, lng: -87.3417
- `811 27th Street Court East, Bradenton, FL 34208` → lat: 27.4989, lng: -82.5268

- [ ] **Step 3: Generate data/deals.ts from raw JSON**

```bash
node -e "
const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('/Users/seancastro/top-shelf-next/data/deals_raw.json','utf8'));
const ts = \`export interface Deal {
  address: string;
  date: string;
  lat: number | null;
  lng: number | null;
  count?: number;
}

export const deals: Deal[] = \${JSON.stringify(raw, null, 2)};

export const TOTAL_DEALS = deals.reduce((sum, d) => sum + (d.count ?? 1), 0);
\`;
fs.writeFileSync('/Users/seancastro/top-shelf-next/data/deals.ts', ts);
console.log('Wrote', raw.length, 'rows,', raw.reduce((s,d)=>s+(d.count??1),0), 'total deals');
"
```

Expected output: `Wrote 97 rows, 99 total deals`

- [ ] **Step 4: Commit**

```bash
cd /Users/seancastro/top-shelf-next
git add data/
git commit -m "feat: add geocoded deal data (97 addresses, 99 deals)"
```

---

### Task 3: Rewrite globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css entirely**

Write to `/Users/seancastro/top-shelf-next/app/globals.css`:

```css
/* ===== DESIGN TOKENS ===== */
:root {
  --bg-deep: #060d1a;
  --bg-mid: #0b1628;
  --bg-card: #0f1e38;
  --teal: #5dd6db;
  --teal-glow: rgba(93, 214, 219, 0.15);
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.55);
  --text-muted: rgba(255, 255, 255, 0.32);
  --border: rgba(93, 214, 219, 0.12);
  --border-hover: rgba(93, 214, 219, 0.28);
  --font-sans: var(--font-inter), 'Inter', sans-serif;
  --font-serif: var(--font-playfair), 'Playfair Display', serif;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --section-pad: clamp(80px, 10vw, 140px);
  --container: 1180px;
}

/* ===== RESET ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-sans);
  background: var(--bg-deep);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img { display: block; max-width: 100%; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
button { font-family: inherit; cursor: pointer; border: none; background: none; }

/* ===== CONTAINERS ===== */
.container { max-width: var(--container); margin: 0 auto; padding: 0 clamp(20px, 5vw, 60px); }

/* ===== BUTTONS ===== */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(90deg, var(--teal), #3db8bd);
  color: var(--bg-deep);
  font-weight: 700;
  font-size: 14px;
  padding: 14px 28px;
  border-radius: 8px;
  transition: opacity 0.2s, transform 0.2s;
  letter-spacing: 0.3px;
}
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border-hover);
  color: var(--teal);
  font-weight: 600;
  font-size: 14px;
  padding: 14px 28px;
  border-radius: 8px;
  transition: background 0.2s, border-color 0.2s;
}
.btn-ghost:hover { background: var(--teal-glow); border-color: var(--teal); }
.full-width { width: 100%; justify-content: center; }

/* ===== SECTION TYPOGRAPHY ===== */
.section-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.section-eyebrow::before {
  content: '';
  display: block;
  width: 28px;
  height: 1px;
  background: var(--teal);
  flex-shrink: 0;
}
h2 {
  font-family: var(--font-serif);
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.5px;
}
h3 {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
}
.teal { color: var(--teal); }

/* ===== NAVBAR ===== */
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.3s, backdrop-filter 0.3s, border-color 0.3s;
  border-bottom: 1px solid transparent;
}
#navbar.scrolled {
  background: rgba(6, 13, 26, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-color: var(--border);
}
.nav-inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 60px);
  height: 72px;
  display: flex;
  align-items: center;
  gap: 40px;
}
.logo { display: flex; align-items: center; }
.logo-img {
  height: 44px;
  width: auto;
  mix-blend-mode: screen;
  filter: brightness(1.1);
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 36px;
  margin-left: auto;
}
.nav-links a {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s;
  letter-spacing: 0.2px;
}
.nav-links a:hover { color: var(--text-primary); }
.nav-cta {
  background: linear-gradient(90deg, var(--teal), #3db8bd) !important;
  color: var(--bg-deep) !important;
  font-weight: 700 !important;
  font-size: 13px !important;
  padding: 9px 22px !important;
  border-radius: 7px !important;
  transition: opacity 0.2s !important;
}
.nav-cta:hover { opacity: 0.9 !important; }
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  margin-left: auto;
  cursor: pointer;
}
.hamburger span { display: block; width: 22px; height: 2px; background: var(--text-primary); border-radius: 2px; transition: all 0.3s; }
.mobile-menu {
  display: none;
  flex-direction: column;
  background: rgba(6, 13, 26, 0.97);
  backdrop-filter: blur(20px);
  padding: 20px clamp(20px, 5vw, 60px);
  border-bottom: 1px solid var(--border);
}
.mobile-menu a { padding: 14px 0; font-size: 16px; color: var(--text-secondary); border-bottom: 1px solid var(--border); }
.mobile-menu a:last-child { border-bottom: none; color: var(--teal); font-weight: 700; }
.mobile-menu.open { display: flex; }

/* ===== HERO ===== */
#hero {
  min-height: 100vh;
  background: var(--bg-deep);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 72px;
}
.hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 70% 20%, rgba(93,214,219,0.07) 0%, transparent 65%); pointer-events: none; }
.hero-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(93,214,219,0.025) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(93,214,219,0.025) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}
.hero-inner {
  position: relative;
  max-width: var(--container);
  margin: 0 auto;
  padding: clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px);
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 60px;
  align-items: center;
}
.hero-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.hero-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--teal); }
.hero-content h1 {
  font-family: var(--font-serif);
  font-size: clamp(42px, 5.5vw, 72px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -1px;
  margin-bottom: 24px;
}
.hero-sub {
  font-size: clamp(15px, 1.5vw, 17px);
  color: var(--text-secondary);
  line-height: 1.75;
  max-width: 500px;
  margin-bottom: 40px;
}
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
.hero-cards { display: flex; flex-direction: column; gap: 16px; }
.hero-card {
  background: rgba(93,214,219,0.05);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  gap: 18px;
  transition: border-color 0.2s;
  animation: cardFloat 4s ease-in-out infinite;
}
.hero-card:nth-child(2) { animation-delay: 1.3s; }
.hero-card:nth-child(3) { animation-delay: 2.6s; }
.hero-card:hover { border-color: var(--border-hover); }
.hero-card-icon { font-size: 28px; flex-shrink: 0; }
.hero-card-text { display: flex; flex-direction: column; gap: 2px; }
.hero-card-num { font-size: 22px; font-weight: 800; color: var(--text-primary); line-height: 1; }
.hero-card-label { font-size: 12px; color: var(--text-muted); }
.hero-scroll {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: scrollBounce 2s ease-in-out infinite;
}
.hero-scroll::after { content: ''; display: block; width: 1px; height: 36px; background: linear-gradient(to bottom, var(--teal), transparent); }

/* ===== PROOF BAR ===== */
#proof-bar {
  background: var(--bg-mid);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 0;
}
.proof-inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 60px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.proof-stat {
  padding: 36px 24px;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.proof-stat:last-child { border-right: none; }
.proof-num {
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 800;
  color: var(--teal);
  line-height: 1;
  letter-spacing: -0.5px;
}
.proof-label {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.3px;
}

/* ===== ABOUT ===== */
#about {
  padding: var(--section-pad) 0;
  background: var(--bg-deep);
}
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.about-text p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 18px;
}
.about-text h2 { margin-bottom: 24px; }
.about-text .btn-primary { margin-top: 8px; }
.about-cards { display: flex; flex-direction: column; gap: 20px; }
.about-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px 32px;
  transition: border-color 0.2s;
}
.about-card:hover { border-color: var(--border-hover); }
.about-card-icon { font-size: 32px; margin-bottom: 14px; }
.about-card h3 { margin-bottom: 10px; }
.about-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.7; }

/* ===== WHAT WE BUY ===== */
#what-we-buy {
  padding: var(--section-pad) 0;
  background: var(--bg-mid);
}
.section-header { text-align: center; margin-bottom: 60px; }
.section-header .section-eyebrow { justify-content: center; }
.section-header .section-eyebrow::before { display: none; }
.section-header h2 { margin-bottom: 0; }
.buy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.buy-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 44px 40px;
  transition: border-color 0.25s, transform 0.25s;
}
.buy-card:hover { border-color: var(--border-hover); transform: translateY(-4px); }
.buy-card.featured {
  background: rgba(93,214,219,0.05);
  border-color: rgba(93,214,219,0.25);
}
.buy-icon { font-size: 40px; margin-bottom: 20px; }
.buy-card h3 { font-size: 22px; margin-bottom: 14px; }
.buy-card > p { font-size: 14px; color: var(--text-secondary); line-height: 1.75; margin-bottom: 24px; }
.buy-card ul { display: flex; flex-direction: column; gap: 10px; }
.buy-card ul li {
  font-size: 13px;
  color: var(--text-secondary);
  padding-left: 18px;
  position: relative;
}
.buy-card ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--teal);
}

/* ===== HOW IT WORKS ===== */
#how-it-works {
  padding: var(--section-pad) 0;
  background: var(--bg-deep);
}
.steps {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 0;
  align-items: start;
  margin-top: 60px;
}
.step { padding: 0 24px; }
.step-num {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--teal-glow);
  border: 1px solid var(--teal);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 800;
  color: var(--teal);
  margin-bottom: 20px;
}
.step h3 { margin-bottom: 12px; font-size: 17px; }
.step p { font-size: 14px; color: var(--text-secondary); line-height: 1.75; }
.step-arrow {
  font-size: 22px;
  color: var(--teal);
  opacity: 0.4;
  padding-top: 14px;
  align-self: flex-start;
  flex-shrink: 0;
}

/* ===== PORTFOLIO ===== */
#portfolio {
  padding: var(--section-pad) 0 0;
  background: var(--bg-mid);
}
.map-wrapper { position: relative; margin-top: 48px; }
.map-overlay-stat {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  background: rgba(6, 13, 26, 0.88);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.map-stat-val { font-size: 36px; font-weight: 800; color: var(--teal); line-height: 1; letter-spacing: -1px; }
.map-stat-lbl { font-size: 11px; color: var(--text-muted); letter-spacing: 0.5px; }
#deal-map { width: 100%; height: 600px; }
.map-pin { animation: pinDrop 0.5s var(--ease-out) both; animation-play-state: paused; }
.custom-popup .leaflet-popup-content-wrapper {
  background: #0b1628;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
}
.custom-popup .leaflet-popup-tip { background: #0b1628; }
.custom-popup .leaflet-popup-close-button { color: var(--text-muted) !important; top: 10px !important; right: 10px !important; }
.deal-popup { font-family: var(--font-sans); }
.popup-body { padding: 14px 16px; }
.popup-address { font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
.popup-date { font-size: 11px; color: var(--text-muted); }

/* ===== CONTACT ===== */
#contact {
  padding: var(--section-pad) 0;
  background: var(--bg-deep);
}
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 80px;
  align-items: start;
}
.contact-text h2 { margin-bottom: 20px; }
.contact-text > p { font-size: 15px; color: var(--text-secondary); line-height: 1.8; margin-bottom: 32px; }
.contact-info { display: flex; flex-direction: column; gap: 14px; }
.contact-item { display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--text-secondary); }
.contact-item a { color: var(--teal); }
.contact-item a:hover { text-decoration: underline; }
.contact-icon { font-size: 18px; }
.contact-form {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 12px; font-weight: 600; color: var(--text-muted); letter-spacing: 0.5px; text-transform: uppercase; }
.form-group input,
.form-group select,
.form-group textarea {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: var(--text-primary);
  font-family: var(--font-sans);
  transition: border-color 0.2s;
  width: 100%;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--teal);
}
.form-group select option { background: var(--bg-mid); }
.form-group textarea { resize: vertical; min-height: 100px; }
.form-group input::placeholder,
.form-group textarea::placeholder { color: var(--text-muted); }
.contact-form .btn-primary { margin-top: 4px; }

/* ===== FOOTER ===== */
footer {
  background: #030810;
  border-top: 1px solid var(--border);
  padding: 60px 20px;
}
.footer-inner { max-width: var(--container); margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
.footer-logo-img { height: 48px; width: auto; mix-blend-mode: screen; filter: brightness(0.8); }
.footer-tagline { font-size: 13px; color: var(--text-muted); letter-spacing: 0.5px; }
.footer-copy { font-size: 12px; color: rgba(255,255,255,0.2); }

/* ===== ANIMATIONS ===== */
@keyframes cardFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes scrollBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}
@keyframes pinDrop {
  0% { transform: translateY(-40px) scale(0.5); opacity: 0; }
  70% { transform: translateY(4px) scale(1.1); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-cards { flex-direction: row; }
  .hero-card { flex: 1; }
  .about-grid { grid-template-columns: 1fr; gap: 48px; }
  .buy-grid { grid-template-columns: 1fr; }
  .steps { grid-template-columns: 1fr; }
  .step-arrow { display: none; }
  .contact-grid { grid-template-columns: 1fr; gap: 48px; }
  .proof-inner { grid-template-columns: repeat(2, 1fr); }
  .proof-stat:nth-child(2) { border-right: none; }
  .proof-stat:nth-child(3) { border-top: 1px solid var(--border); }
  .proof-stat:nth-child(4) { border-top: 1px solid var(--border); border-right: none; }
}
@media (max-width: 600px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
  .hero-cards { flex-direction: column; }
  .form-row { grid-template-columns: 1fr; }
  .proof-inner { grid-template-columns: 1fr; }
  .proof-stat { border-right: none; border-top: 1px solid var(--border); }
  .proof-stat:first-child { border-top: none; }
  .contact-form { padding: 28px 20px; }
}
```

- [ ] **Step 2: Verify CSS has no syntax errors**

```bash
cd /Users/seancastro/top-shelf-next
npx next build 2>&1 | grep -i "error\|warn" | head -20 || echo "Build check pending components"
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: complete globals.css redesign with new design system"
```

---

### Task 4: Update app/layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Rewrite layout.tsx**

Write to `/Users/seancastro/top-shelf-next/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Top Shelf Acquisitions | Tampa Bay Real Estate Investments',
  description: 'Top Shelf Acquisitions buys single family homes and vacant land across the Tampa Bay area. Fast closings, fair cash offers, no hassle.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: update layout with Inter + Playfair Display fonts and site metadata"
```

---

### Task 5: Create Navbar Component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Write Navbar.tsx**

Write to `/Users/seancastro/top-shelf-next/components/Navbar.tsx`:

```tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMobileOpen(false)

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="#" className="logo">
          <Image src="/logo.png" alt="Top Shelf Acquisitions" className="logo-img" width={130} height={52} unoptimized />
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#what-we-buy">What We Buy</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact" className="nav-cta">Get An Offer</a></li>
        </ul>
        <button className="hamburger" aria-label="Toggle menu" onClick={() => setMobileOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </div>
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <a href="#about" onClick={close}>About</a>
        <a href="#what-we-buy" onClick={close}>What We Buy</a>
        <a href="#portfolio" onClick={close}>Portfolio</a>
        <a href="#contact" onClick={close}>Get An Offer</a>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add Navbar with scroll state and mobile menu"
```

---

### Task 6: Create Hero Component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Write Hero.tsx**

Write to `/Users/seancastro/top-shelf-next/components/Hero.tsx`:

```tsx
'use client'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />

      <div className="hero-inner">
        <div className="hero-content">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Tampa Bay, Florida
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease }}
          >
            We Buy <span className="teal">Real Estate</span><br />With Purpose.
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
          >
            Top Shelf Acquisitions specializes in value-add single family homes and vacant
            land across Tampa Bay. Fast closings, fair offers, no hassle.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78, ease }}
          >
            <a href="#contact" className="btn-primary">Get A Cash Offer</a>
            <a href="#portfolio" className="btn-ghost">See Our Deals</a>
          </motion.div>
        </div>

        <div className="hero-cards">
          <div className="hero-card">
            <span className="hero-card-icon">🏠</span>
            <div className="hero-card-text">
              <span className="hero-card-num">SFR</span>
              <span className="hero-card-label">Single Family Homes</span>
            </div>
          </div>
          <div className="hero-card">
            <span className="hero-card-icon">🌿</span>
            <div className="hero-card-text">
              <span className="hero-card-num">Land</span>
              <span className="hero-card-label">Vacant &amp; Buildable Lots</span>
            </div>
          </div>
          <div className="hero-card">
            <span className="hero-card-icon">⚡</span>
            <div className="hero-card-text">
              <span className="hero-card-num">Fast</span>
              <span className="hero-card-label">Cash Close</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">Scroll</div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero with Framer Motion entrance animations"
```

---

### Task 7: Create ProofBar Component

**Files:**
- Create: `components/ProofBar.tsx`

- [ ] **Step 1: Write ProofBar.tsx**

Write to `/Users/seancastro/top-shelf-next/components/ProofBar.tsx`:

```tsx
'use client'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const stats = [
  { num: '99+', label: 'Deals Closed' },
  { num: '$1.85M+', label: 'In Assignment Fees' },
  { num: '24hr', label: 'Offer Turnaround' },
  { num: '$0', label: 'Fees or Commissions' },
]

export default function ProofBar() {
  return (
    <section id="proof-bar">
      <div className="proof-inner">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="proof-stat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease }}
          >
            <span className="proof-num">{s.num}</span>
            <span className="proof-label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ProofBar.tsx
git commit -m "feat: add ProofBar with real stats"
```

---

### Task 8: Create About Component

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Write About.tsx**

Write to `/Users/seancastro/top-shelf-next/components/About.tsx`:

```tsx
'use client'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const cards = [
  {
    icon: '🏠',
    title: 'Value-Add Focus',
    body: 'We see potential where others see problems. Our expertise is identifying and acquiring undervalued properties — homes that need rehab, inherited estates, distressed situations — across the Tampa Bay market.',
  },
  {
    icon: '📍',
    title: 'Hyper-Local Expertise',
    body: 'We know the neighborhoods, the comps, and the opportunities. Our Tampa Bay focus means faster decisions, better offers, and a smoother process for every seller we work with.',
  },
]

export default function About() {
  return (
    <section id="about">
      <div className="container about-grid">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease }}
        >
          <p className="section-eyebrow">Who We Are</p>
          <h2>Real Estate Investors<br />Rooted in Tampa Bay</h2>
          <p>Top Shelf Acquisitions is a Tampa Bay-based real estate investment company with a focus on value-add opportunities. We buy single family properties that need work and vacant land with untapped potential — and we do it with speed, transparency, and respect.</p>
          <p>Whether you&apos;re a seller looking for a fast exit or a landowner ready to move on, we&apos;re the team that shows up, closes, and delivers.</p>
          <a href="#contact" className="btn-primary">Work With Us</a>
        </motion.div>

        <div className="about-cards">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="about-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease }}
            >
              <div className="about-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/About.tsx
git commit -m "feat: add About with staggered card animations"
```

---

### Task 9: Create WhatWeBuy Component

**Files:**
- Create: `components/WhatWeBuy.tsx`

- [ ] **Step 1: Write WhatWeBuy.tsx**

Write to `/Users/seancastro/top-shelf-next/components/WhatWeBuy.tsx`:

```tsx
'use client'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const cards = [
  {
    icon: '🏠',
    title: 'Single Family Homes',
    desc: 'We specialize in value-add single family residences — properties that need rehab, deferred maintenance, or sit in transitional neighborhoods with strong upside.',
    items: ['Distressed or dated properties', 'Inherited homes & estate sales', 'Pre-foreclosure situations', 'Off-market opportunities'],
    featured: false,
  },
  {
    icon: '🌿',
    title: 'Vacant Land',
    desc: 'From infill lots to larger parcels, we actively seek vacant and underutilized land across the Tampa Bay region with development or resale potential.',
    items: ['Infill residential lots', 'Buildable parcels', 'Overgrown or unused land', 'Rural and suburban tracts'],
    featured: true,
  },
]

export default function WhatWeBuy() {
  return (
    <section id="what-we-buy">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-eyebrow">What We Buy</p>
          <h2>Two Asset Classes.<br />One Standard of Excellence.</h2>
        </motion.div>

        <div className="buy-grid">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`buy-card${card.featured ? ' featured' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease }}
            >
              <div className="buy-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <ul>{card.items.map(item => <li key={item}>{item}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/WhatWeBuy.tsx
git commit -m "feat: add WhatWeBuy with staggered card animations"
```

---

### Task 10: Create HowItWorks Component

**Files:**
- Create: `components/HowItWorks.tsx`

- [ ] **Step 1: Write HowItWorks.tsx**

Write to `/Users/seancastro/top-shelf-next/components/HowItWorks.tsx`:

```tsx
'use client'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    num: '01',
    title: 'Tell Us About Your Property',
    body: "Fill out our quick form or send us an email. We'll gather the basic details — no obligation, no pressure.",
  },
  {
    num: '02',
    title: 'Receive a Cash Offer',
    body: "We analyze the property and send you a fair, no-nonsense cash offer — typically within 24 hours.",
  },
  {
    num: '03',
    title: 'Close On Your Schedule',
    body: "We close on your timeline — 10 days or 60 days. No repairs, no commissions, no surprises.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-eyebrow">The Process</p>
          <h2>Simple. Straightforward. Fast.</h2>
        </motion.div>

        <div className="steps">
          {steps.map((step, i) => (
            <>
              <motion.div
                key={step.num}
                className="step"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease }}
              >
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div key={`arrow-${i}`} className="step-arrow">→</div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/HowItWorks.tsx
git commit -m "feat: add HowItWorks 3-step process"
```

---

### Task 11: Create DealMap Component

**Files:**
- Create: `components/DealMap.tsx`

- [ ] **Step 1: Write DealMap.tsx**

Write to `/Users/seancastro/top-shelf-next/components/DealMap.tsx`:

```tsx
'use client'
import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import type { Map as LeafletMap } from 'leaflet'
import { deals, TOTAL_DEALS } from '@/data/deals'

export default function DealMap({ onCountReady }: { onCountReady: (n: number) => void }) {
  const mapRef = useRef<LeafletMap | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet') as typeof import('leaflet')

    const map = L.map(containerRef.current, {
      center: [27.85, -82.65],
      zoom: 10,
      zoomControl: false,
      preferCanvas: false,
    })
    mapRef.current = map

    L.control.zoom({ position: 'bottomright' }).addTo(map)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    const makePinIcon = (delay: number) =>
      L.divIcon({
        className: '',
        html: `<div class="map-pin" style="animation-delay:${delay}ms">
          <svg width="28" height="38" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 0C6.716 0 0 6.716 0 15C0 26.25 15 40 15 40C15 40 30 26.25 30 15C30 6.716 23.284 0 15 0Z" fill="#5DD6DB"/>
            <circle cx="15" cy="15" r="7" fill="#0B1628"/>
            <circle cx="15" cy="15" r="3.5" fill="#5DD6DB"/>
          </svg>
        </div>`,
        iconSize: [28, 38],
        iconAnchor: [14, 38],
        popupAnchor: [0, -42],
      })

    deals.forEach((deal, i) => {
      if (!deal.lat || !deal.lng) return
      const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(deal.address)}&output=embed`
      const marker = L.marker([deal.lat, deal.lng], { icon: makePinIcon(i * 8), riseOnHover: true })
      marker.bindPopup(
        `<div class="deal-popup">
          <div class="popup-street-view">
            <iframe src="${mapsUrl}" width="100%" height="150" style="border:0;border-radius:8px 8px 0 0;display:block;" loading="lazy" allowfullscreen></iframe>
          </div>
          <div class="popup-body">
            <div class="popup-address">${deal.address}</div>
            ${deal.date ? `<div class="popup-date">Closed ${deal.date}</div>` : ''}
          </div>
        </div>`,
        { maxWidth: 300, minWidth: 280, className: 'custom-popup' }
      )
      marker.addTo(map)
    })

    onCountReady(TOTAL_DEALS)

    const portfolioSection = document.getElementById('portfolio')
    if (!portfolioSection) return
    let animated = false
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated) {
        animated = true
        document.querySelectorAll<HTMLElement>('.map-pin').forEach(el => {
          el.style.animationPlayState = 'running'
        })
      }
    }, { threshold: 0.15 })
    observer.observe(portfolioSection)
    return () => observer.disconnect()
  }, [onCountReady])

  return <div ref={containerRef} id="deal-map" />
}
```

- [ ] **Step 2: Commit**

```bash
git add components/DealMap.tsx
git commit -m "feat: add DealMap Leaflet component (client-only, SSR-disabled)"
```

---

### Task 11b: Create BeforeAfter Component

**Files:**
- Create: `components/BeforeAfter.tsx`
- Modify: `app/globals.css` (add section styles)

**Note:** Image URL placeholder below — replace `BEFORE_AFTER_IMAGE_URL` with the actual Dropbox direct link (dl=1) once provided by user.

- [ ] **Step 1: Add BeforeAfter CSS to globals.css**

Append to `/Users/seancastro/top-shelf-next/app/globals.css`:

```css
/* ===== BEFORE / AFTER ===== */
#before-after {
  padding: var(--section-pad) 0;
  background: var(--bg-mid);
}
.ba-image-wrap {
  margin-top: 48px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
  position: relative;
}
.ba-image-wrap img {
  width: 100%;
  height: auto;
  display: block;
}
.ba-label {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(6,13,26,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--teal);
  letter-spacing: 2px;
  text-transform: uppercase;
}
```

- [ ] **Step 2: Write BeforeAfter.tsx**

Write to `/Users/seancastro/top-shelf-next/components/BeforeAfter.tsx`:

```tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as const

// Replace with actual Dropbox dl=1 URL once provided
const IMAGE_URL = 'BEFORE_AFTER_IMAGE_URL'

export default function BeforeAfter() {
  return (
    <section id="before-after">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-eyebrow">Our Work</p>
          <h2>From Distressed to Delivered.</h2>
        </motion.div>

        <motion.div
          className="ba-image-wrap"
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
        >
          <Image
            src={IMAGE_URL}
            alt="Before and after renovation by Top Shelf Acquisitions"
            width={1200}
            height={600}
            style={{ width: '100%', height: 'auto' }}
            unoptimized
          />
          <div className="ba-label">Before → After</div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/BeforeAfter.tsx app/globals.css
git commit -m "feat: add BeforeAfter renovation showcase section"
```

---

### Task 12: Create Portfolio Component

**Files:**
- Create: `components/Portfolio.tsx`

- [ ] **Step 1: Write Portfolio.tsx**

Write to `/Users/seancastro/top-shelf-next/components/Portfolio.tsx`:

```tsx
'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const DealMap = dynamic(() => import('./DealMap'), {
  ssr: false,
  loading: () => <div id="deal-map" style={{ background: 'rgba(6,13,26,0.8)' }} />,
})

export default function Portfolio() {
  const [dealCount, setDealCount] = useState(0)
  const [displayCount, setDisplayCount] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(counterRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView || dealCount === 0) return
    const duration = 1800
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayCount(Math.floor(eased * dealCount))
      if (progress < 1) requestAnimationFrame(step)
      else setDisplayCount(dealCount)
    }
    requestAnimationFrame(step)
  }, [isInView, dealCount])

  return (
    <section id="portfolio">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="section-eyebrow">Our Portfolio</p>
          <h2>Deals Closed Across Tampa Bay</h2>
        </motion.div>
      </div>

      <div className="map-wrapper">
        <div className="map-overlay-stat">
          <span ref={counterRef} className="map-stat-val">{displayCount || '—'}</span>
          <span className="map-stat-lbl">Closed Deals</span>
        </div>
        <DealMap onCountReady={setDealCount} />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Portfolio.tsx
git commit -m "feat: add Portfolio with deal counter and dynamic map"
```

---

### Task 13: Create ContactForm Component

**Files:**
- Create: `components/ContactForm.tsx`

- [ ] **Step 1: Write ContactForm.tsx**

Write to `/Users/seancastro/top-shelf-next/components/ContactForm.tsx`:

```tsx
'use client'
import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      (e.target as HTMLFormElement).reset()
      setSubmitted(false)
    }, 3500)
  }

  return (
    <section id="contact">
      <div className="container contact-grid">
        <motion.div
          className="contact-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease }}
        >
          <p className="section-eyebrow">Get In Touch</p>
          <h2>Ready to Sell?<br />Let&apos;s Talk.</h2>
          <p>We buy properties in any condition, any situation. No repairs. No agents. No fees. Just a fair cash offer and a smooth closing.</p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <a href="mailto:info@topshelfacquisitions.com">info@topshelfacquisitions.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Tampa Bay, Florida</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.12, ease }}
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" placeholder="John Smith" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="(813) 555-0100" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="you@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Property Address</label>
            <input type="text" id="address" name="address" placeholder="123 Main St, Tampa, FL" />
          </div>
          <div className="form-group">
            <label htmlFor="type">Property Type</label>
            <select id="type" name="type">
              <option value="">Select one...</option>
              <option value="sfr">Single Family Home</option>
              <option value="land">Vacant Land</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Tell Us More (Optional)</label>
            <textarea id="message" name="message" rows={4} placeholder="Condition of the property, your situation, timeline..." />
          </div>
          <button
            type="submit"
            className="btn-primary full-width"
            disabled={submitted}
            style={submitted ? { background: 'linear-gradient(90deg,#2a7a5a,#1d6b4c)', opacity: 1 } : {}}
          >
            {submitted ? "✓ We'll be in touch soon!" : 'Submit & Get My Offer'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ContactForm.tsx
git commit -m "feat: add ContactForm with success state"
```

---

### Task 14: Create Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Write Footer.tsx**

Write to `/Users/seancastro/top-shelf-next/components/Footer.tsx`:

```tsx
import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <Image src="/logo.png" alt="Top Shelf Acquisitions" className="footer-logo-img" width={160} height={64} unoptimized />
        <p className="footer-tagline">Tampa Bay Real Estate Investments</p>
        <p className="footer-copy">&copy; 2026 Top Shelf Acquisitions. All rights reserved.</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer"
```

---

### Task 15: Create app/page.tsx

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Write page.tsx**

Write to `/Users/seancastro/top-shelf-next/app/page.tsx`:

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProofBar from '@/components/ProofBar'
import About from '@/components/About'
import WhatWeBuy from '@/components/WhatWeBuy'
import HowItWorks from '@/components/HowItWorks'
import BeforeAfter from '@/components/BeforeAfter'
import Portfolio from '@/components/Portfolio'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProofBar />
      <About />
      <WhatWeBuy />
      <HowItWorks />
      <BeforeAfter />
      <Portfolio />
      <ContactForm />
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose all sections in page.tsx"
```

---

### Task 16: Build Verification and Launch

**Files:** None new

- [ ] **Step 1: TypeScript check**

```bash
cd /Users/seancastro/top-shelf-next
npx tsc --noEmit
```

Expected: zero errors. Common fixes:
- `motion` import issues: ensure `framer-motion` v12 exports are used (`import { motion } from 'framer-motion'`)
- `require('leaflet')` in DealMap: the eslint-disable comment handles this
- Missing `key` props on fragments in HowItWorks: wrap `<>` in `<div key={...}>` if TS complains

- [ ] **Step 2: Production build**

```bash
npm run build
```

Expected: successful build. Fix any reported errors before continuing.

- [ ] **Step 3: Start dev server**

```bash
npm run dev
```

Open `http://localhost:3000`

- [ ] **Step 4: Visual checklist**

- [ ] Navbar transparent on load, frosted on scroll
- [ ] Hero: eyebrow → h1 → sub → buttons animate in sequentially
- [ ] Hero cards float (CSS animation)
- [ ] Proof bar shows 99+, $1.85M+, 24hr, $0
- [ ] About section fades in on scroll
- [ ] WhatWeBuy cards stagger in
- [ ] HowItWorks 3 steps stagger in with arrows
- [ ] Map loads with teal pins on dark CartoDB tiles
- [ ] Map deal counter animates up to 99 when map scrolls into view
- [ ] Clicking a pin shows popup with Google Maps embed
- [ ] Contact form: fills, submits, shows success message
- [ ] Footer logo renders (mix-blend-mode: screen)
- [ ] Mobile: hamburger menu opens/closes, layout stacks correctly

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Top Shelf Acquisitions redesign — Next.js 16 + Framer Motion + 99-deal map"
```
