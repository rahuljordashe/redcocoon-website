---
phase: 05-performance-seo
plan: 01
subsystem: seo
tags: [structured-data, open-graph, schema-org, json-ld, canonical-url, local-business, product-schema]

# Dependency graph
requires:
  - phase: 03-gallery-products
    provides: product content schema with code, price, images, stock, madeToOrder fields
  - phase: 04-workshop-hospitality
    provides: BaseLayout.astro as foundation for SEO head upgrades

provides:
  - LocalBusiness JSON-LD schema on every page via BaseLayout
  - Product+Offer JSON-LD on every /shop/[slug] page
  - Per-page canonical URLs (not hardcoded homepage)
  - Per-page og:image, og:url, og:image:width/height meta tags
  - ogImage prop on BaseLayout for page-specific social images
  - Preloader removed — content renders immediately (eliminates 1.4-3s FCP delay)

affects: [06-launch, all pages using BaseLayout, social sharing links]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "ogImage prop on BaseLayout: pass absolute URL, defaults to Bowls5.jpg (99KB, WhatsApp-safe)"
    - "Canonical URL via new URL(Astro.url.pathname, siteUrl).href — per-page, not hardcoded"
    - "Product JSON-LD injected as bare script tag inside BaseLayout body, right after opening tag"
    - "getAvailability() helper maps stock/madeToOrder to schema.org availability URLs"

key-files:
  created: []
  modified:
    - src/layouts/BaseLayout.astro
    - src/pages/shop/[slug].astro
    - src/pages/index.astro
    - src/pages/shop.astro
    - src/pages/workshop.astro
    - src/styles/global.css
  deleted:
    - src/components/Preloader.astro

key-decisions:
  - "Default OG image uses Bowls5.jpg (99KB JPEG) instead of 399x650-01.png (397KB PNG) — keeps under WhatsApp 300KB limit"
  - "siteUrl kept as hardcoded constant — URL discrepancy with Astro.site is a known out-of-scope issue"
  - "LocalBusiness replaces Organization schema — has phone/address/hours fields Google Rich Results needs"
  - "TODO placeholders left in telephone, streetAddress, postalCode — flagged for pre-launch replacement"
  - "Product JSON-LD placed as bare script tag in body (not head slot) — Google reads it fine, BaseLayout has no head slot"

patterns-established:
  - "All per-page OG images are absolute URLs pointing to public/ paths (not Astro-processed assets)"
  - "Product availability: InStock (stock>0), MadeToOrder (stock=0 && madeToOrder), SoldOut (stock=0 && !madeToOrder)"

requirements-completed: [SEO-01, SEO-02, PERF-01]

# Metrics
duration: 15min
completed: 2026-03-12
---

# Phase 05 Plan 01: SEO Foundation Summary

**LocalBusiness JSON-LD on all pages, Product+Offer schema on product pages, per-page OG images with canonical URLs, and preloader removed to eliminate 1.4-3s FCP delay**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-12T10:25:00Z
- **Completed:** 2026-03-12T10:42:00Z
- **Tasks:** 2
- **Files modified:** 6 (1 deleted)

## Accomplishments
- Deleted Preloader.astro and removed @keyframes loading and @keyframes pulse — eliminates 1.4-3s artificial FCP delay
- BaseLayout now generates per-page canonical URLs and accepts ogImage prop (defaults to Bowls5.jpg, 99KB)
- LocalBusiness JSON-LD replaces Organization schema — includes address, hours, sameAs (Instagram + WhatsApp), phone/address as TODO placeholders
- Product+Offer JSON-LD on all 12 product pages with name, image (absolute URL), sku (piece code), price (LKR), priceCurrency, availability, brand, material
- Per-page OG images wired: index (Bowls5.jpg), shop (Dinner-sets5.jpg), workshop (Tea-coffee-set5.jpg), product pages (own product photo)

## Task Commits

Each task was committed atomically:

1. **Task 1: Remove Preloader and upgrade BaseLayout** - `5b52369` (feat)
2. **Task 2: Product JSON-LD and per-page OG images** - `07440c9` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/layouts/BaseLayout.astro` - Added ogImage prop, per-page canonical URL, LocalBusiness JSON-LD, updated OG/Twitter meta tags
- `src/pages/shop/[slug].astro` - Added Product+Offer JSON-LD, ogImageUrl computed from product image, passed to BaseLayout
- `src/pages/index.astro` - ogImage prop added (Bowls5.jpg)
- `src/pages/shop.astro` - ogImage prop added (Dinner-sets5.jpg)
- `src/pages/workshop.astro` - ogImage prop added (Tea-coffee-set5.jpg)
- `src/styles/global.css` - Removed @keyframes loading and @keyframes pulse
- `src/components/Preloader.astro` - DELETED

## Decisions Made
- Default OG image uses Bowls5.jpg (99KB JPEG) instead of 399x650-01.png (397KB PNG) — stays under WhatsApp's 300KB crawler limit
- siteUrl hardcoded as constant (not Astro.site) — URL discrepancy between astro.config and actual Vercel deployment is flagged but out of scope here
- LocalBusiness chosen over Organization — enables Google Rich Results with address, hours, phone fields
- TODO placeholders left in telephone, streetAddress, postalCode fields — clearly marked for pre-launch replacement
- Product JSON-LD injected as bare script tag in body (not a head slot mechanism) — Google crawlers handle body JSON-LD fine

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required

Before launch, replace TODO fields in BaseLayout.astro LocalBusiness schema:
- `"telephone": "+94-TODO-PHONE"` — replace with real phone number
- `"streetAddress": "TODO Street Address"` — replace with studio address
- `"postalCode": "TODO"` — replace with Colombo postal code

## Next Phase Readiness
- SEO foundation is in place — social sharing previews, Google Rich Results, per-page canonical URLs all working
- Build passes cleanly with 15 pages generated
- Pre-launch: fill TODO placeholders in LocalBusiness schema (phone, address, postal code)
- Potential next: image optimization pass (convert remaining OG images, verify all public/ images are crawlable)

---
*Phase: 05-performance-seo*
*Completed: 2026-03-12*
