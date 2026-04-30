# Top Shelf Acquisitions — Full Redesign Spec

**Date:** 2026-04-29  
**Status:** Approved

---

## Overview

Full redesign and Next.js conversion of the Top Shelf Acquisitions website. The goal is a significantly more professional, polished site that commands authority and converts sellers into leads. The existing site's navy + teal direction is kept but everything — layout, typography, spacing, hierarchy, and content — is upgraded.

**Stack:** Next.js 15, React 19, TypeScript, Framer Motion 11, Leaflet.js  
**Project location:** `/Users/seancastro/top-shelf-next/`

---

## Design Direction

**Theme:** Navy + Teal (Direction C), significantly upgraded  
**Layout:** Clean Authority (Layout A) — clear top-to-bottom section flow, well-spaced, easy to navigate

### Colors
- Background deep: `#060d1a`
- Background mid: `#0B1628`
- Background card: `#0f1e38`
- Teal accent: `#5DD6DB`
- Text primary: `#ffffff`
- Text secondary: `rgba(255,255,255,0.55)`
- Text muted: `rgba(255,255,255,0.35)`
- Border subtle: `rgba(93,214,219,0.12)`

### Typography
- Headlines: Playfair Display (serif), bold — commands authority
- Body + UI: Inter (sans-serif)
- Eyebrow labels: Inter, 10–11px, 3–4px letter-spacing, uppercase, teal

### Key Design Improvements Over Current Site
- Larger, bolder hero with more breathing room
- Eyebrow labels before every section heading (teal, uppercase)
- Cards use subtle glass borders (`rgba(93,214,219,0.08)` bg, `rgba(93,214,219,0.15)` border)
- Section backgrounds alternate: `#060d1a` ↔ `#0B1628` to create depth
- Stats displayed as real numbers (99 deals, $1.85M+ closed)
- All spacing scaled up — generous padding, nothing cramped

---

## Page Sections (in order)

### 1. Navbar
- Fixed, transparent until scroll then frosted glass (`backdrop-filter: blur`)
- Logo left, nav links right, "Get An Offer" CTA button (teal)
- Mobile: hamburger → full-screen overlay menu
- Active section highlighting via scroll position

### 2. Hero
- Full-viewport height
- Background: deep navy + subtle grid overlay + radial teal glow (orb top-right)
- **Left column:** eyebrow → H1 → subtext → two CTA buttons
- **H1:** "We Buy Real Estate With Purpose." — Playfair Display, ~56px
- **Subtext:** "Top Shelf Acquisitions specializes in value-add single family homes and vacant land across Tampa Bay. Fast closings, fair offers, no hassle."
- **CTAs:** "Get A Cash Offer" (teal filled) + "See Our Deals" (ghost)
- **Right column:** 3 floating stat cards (SFR / Land / Fast Cash)
- Framer Motion: sequential entrance animations (eyebrow → H1 → sub → CTAs)
- CSS: stat card float animation (subtle up/down)

### 3. Proof Bar
- Full-width strip between hero and about
- 4 stats with dividers: **99+ Deals Closed** | **$1.85M+ In Fees** | **24hr Offer** | **$0 Fees**
- Framer Motion: staggered fade-in on scroll

### 4. About
- Two-column: left = text block, right = 2 stacked feature cards
- Headline: "Real Estate Investors Rooted in Tampa Bay"
- Body: 2 short paragraphs about the company
- CTA: "Work With Us" button (teal)
- Cards: "Value-Add Focus" and "Tampa Bay Market" with icons
- Framer Motion: left block fades in, cards stagger

### 5. What We Buy
- Section header centered
- Two prominent cards side by side: Single Family Homes (left) + Vacant Land (right, featured/highlighted)
- Each card: large icon, title, description, 4 bullet points
- Framer Motion: staggered card entrance

### 6. How It Works
- 3-step horizontal process: Tell Us → Receive Offer → Close
- Step numbers in teal circle, connected by arrow dividers
- Framer Motion: staggered step entrance

### 7. Portfolio / Map
- Section header: "99 Deals Closed Across Tampa Bay"
- Animated deal counter (counts up from 0 when section enters view)
- Full-width Leaflet map, dark CartoDB tiles, teal teardrop pins
- **Map data:** Re-geocoded from the Google Sheet (97 rows; Belleview and Temple rows each represent 2 deals = 99 total)
- Pins excluded: none (all addresses plotted, $0 deals included as closed transactions)
- Popup on click: Google Maps embed + address + close date
- Map loaded via `dynamic(() => import('./DealMap'), { ssr: false })`

### 8. Contact
- Two-column: left = contact info text, right = form
- Headline: "Ready to Sell? Let's Talk."
- Email: `info@topshelfacquisitions.com`
- Form fields: Name, Phone, Email, Property Address, Property Type (SFR/Land/Other), Message
- Submit shows success state inline (no page reload)
- Framer Motion: left and form fade in with slight stagger

### 9. Footer
- Logo centered
- Tagline: "Tampa Bay Real Estate Investments"
- Copyright: "© 2026 Top Shelf Acquisitions. All rights reserved."

---

## Map Data Plan

**Source:** Google Sheets "All Time" tab — 97 rows  
**Deal count displayed:** 99 (Belleview and Temple rows tagged as `count: 2`)  
**Geocoding:** All 97 addresses re-geocoded fresh via Nominatim + Census Bureau API fallback  
**Addresses that need special handling:**
- `6941 & 6945 SE 110th St, Belleview, FL 34420` → split into 2 pins or 1 pin with `count: 2` label
- `3817 & 3819 Temple St, Tampa, FL 33619` → same treatment
- `4111 W Marietta St` ($0 deal) → include on map, just no fee data shown in popup

**Out-of-area addresses to still include on map:**  
- Delray Beach, Ocala, Cantonment, Englewood, Punta Gorda, Sarasota, Port Charlotte — all plotted as-is

---

## Animation Strategy

| Element | Approach |
|---------|----------|
| Hero text (eyebrow, H1, sub, CTAs) | Framer Motion `animate` on mount, staggered |
| Hero stat cards | CSS `@keyframes` float (no transform conflict) |
| Section entries (About, WhatWeBuy, etc.) | Framer Motion `whileInView`, `once: true` |
| Deal counter | JS `requestAnimationFrame` count-up on section enter |
| Map pins | CSS `@keyframes` drop-bounce, triggered by IntersectionObserver |
| Navbar | CSS transition on scroll (React state) |

---

## File Structure

```
app/
  layout.tsx          — fonts, metadata, globals.css
  globals.css         — full CSS (ported + upgraded from styles.css)
  page.tsx            — composes all sections

components/
  Navbar.tsx
  Hero.tsx
  ProofBar.tsx        — NEW (replaces old StatsBar)
  About.tsx
  WhatWeBuy.tsx
  HowItWorks.tsx
  Portfolio.tsx       — deal counter + dynamic DealMap
  DealMap.tsx         — Leaflet, client-only, SSR-disabled
  ContactForm.tsx
  Footer.tsx

data/
  deals.ts            — re-geocoded TypeScript deal data (from spreadsheet)
  geocode.py          — geocoding script (Nominatim + Census fallback)

public/
  logo.png
```

---

## Contact Info

- **Email:** `info@topshelfacquisitions.com`
- **Location:** Tampa Bay, Florida

---

## What's Different From the Previous Plan

1. **Deal data is fresh** — re-geocoded from the live Google Sheet (99 deals vs 96)
2. **ProofBar** replaces old StatsBar with real numbers ($1.85M+, 99 deals)
3. **Email updated** to `info@topshelfacquisitions.com`
4. **Package deals** (Belleview, Temple) flagged as `count: 2` in data
5. **Design is significantly more polished** — not just a React port, a full visual upgrade
