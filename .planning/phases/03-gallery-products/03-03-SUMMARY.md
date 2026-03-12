---
phase: 03-gallery-products
plan: "03"
subsystem: ui
tags: [astro, product-detail, glightbox, lightbox, dynamic-routes, commission-cta]

# Dependency graph
requires:
  - phase: 03-gallery-products
    plan: "02"
    provides: /shop gallery page, StockBadge component, imageMap pattern, .md extension stripping pattern
provides:
  - /shop/[slug] product detail pages (12 total)
  - CommissionCTA component with dual-channel IG DM + WhatsApp commission inquiry
  - GLightbox image zoom on product detail pages
affects: [03-04, reservation-flow, product-linking]

# Tech tracking
tech-stack:
  added:
    - glightbox@3.3.1
  patterns:
    - "getStaticPaths with product.id.replace(/\\.md$/, '') — consistent with GalleryGrid URL pattern, 12 pages generated"
    - "imageMap pattern reused from GalleryGrid — same 11 image imports keyed by /images/ path"
    - "GLightbox href uses public/ path (/images/Bowls5.jpg) for lightbox overlay while Astro Image handles WebP optimization for the visible <img>"
    - "CommissionCTA pre-fills message with piece name and code for direct commission inquiry context"
    - "Related products use inline card markup with plain <img> — avoids ProductCard's img limitation, matches GalleryGrid approach"

key-files:
  created:
    - src/pages/shop/[slug].astro
    - src/components/CommissionCTA.astro
  modified:
    - package.json
    - bun.lock

key-decisions:
  - "GLightbox href points to public/ image path (/images/Bowls5.jpg) not the Astro-generated WebP path — simpler and works correctly for lightbox overlay"
  - "Related products section uses inline card markup not ProductCard component — ProductCard uses plain <img> which bypasses Astro Image; consistent with GalleryGrid approach from Plan 02"
  - "CommissionCTA shown only when isSold && isMTO — plain sold-out (non-MTO) pieces show 'This piece has been sold.' text; available pieces show reserve CTAs"
  - "Related cards in More from this collection use plain <img> tags (secondary content) — main product image uses Astro Image (GAL-07 requirement)"

# Metrics
duration: 3min
completed: 2026-03-12
---

# Phase 3 Plan 03: Product Detail Pages Summary

**Individual product detail pages at /shop/[slug] with side-by-side layout, GLightbox image zoom, breadcrumb navigation, CommissionCTA for MTO pieces, and More from this collection related products section**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-12T05:35:03Z
- **Completed:** 2026-03-12T05:37:56Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Installed glightbox@3.3.1 via bun
- Created CommissionCTA.astro — commission inquiry panel with pre-filled IG DM + WhatsApp links; message includes piece name and code for immediate context
- Created src/pages/shop/[slug].astro — 12 dynamic product detail pages via getStaticPaths
  - Breadcrumb nav: Shop > Collection > Product Name
  - Side-by-side image + info layout (stacks vertically on mobile)
  - Astro Image optimization on main product image (600x750, loading="eager")
  - GLightbox zoom trigger on product image click
  - StockBadge + piece code pill in product info
  - Product meta section: Collection and Material in 2-column definition list
  - CommissionCTA for MTO sold-out products (enamel-vase, wall-decor-plate)
  - DM to Reserve + WhatsApp Us CTAs for available products
  - More from this collection grid (up to 3 related products, hidden for single-item collections)
  - GLightbox initialized via DOMContentLoaded script

## Task Commits

Each task was committed atomically:

1. **Task 1: Install GLightbox and create CommissionCTA component** — `568d58b` (feat)
2. **Task 2: Create product detail page with lightbox, breadcrumbs, and related products** — `a81ff8f` (feat)

## Files Created/Modified

- `src/pages/shop/[slug].astro` — Dynamic product detail page, 12 routes via getStaticPaths
- `src/components/CommissionCTA.astro` — Commission inquiry panel, dual-channel IG DM + WhatsApp
- `package.json` — Added glightbox@3.3.1 dependency
- `bun.lock` — Updated lockfile

## Decisions Made

- GLightbox href on the `<a>` tag uses the public/ path (`/images/Bowls5.jpg`) rather than the Astro-generated WebP path. This is simpler and correct — GLightbox loads the href URL in its overlay, and the public/ originals still exist from Phase 2's copy-not-move decision
- Related products in the "More from this collection" section use inline card markup with plain `<img>` tags rather than the ProductCard component. ProductCard uses `<img>` not `<Image />` so offers no WebP advantage; the inline approach is consistent with GalleryGrid from Plan 02
- CommissionCTA is conditionally rendered only when `isSold && isMTO` — products that are simply sold out (no MTO) show a "This piece has been sold" message; available products show the reserve CTAs
- Related cards use plain `<img>` tags pointing to public/ paths. The main product image uses Astro Image (satisfying GAL-07); related cards are secondary content

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Product detail pages complete — Plan 03-04 (about/studio section) can proceed independently
- CommissionCTA is reusable for any future MTO-related flows
- GLightbox is installed and available for any additional gallery contexts
- The imageMap pattern is now used in 3 components (GalleryGrid, [slug].astro, plus existing Process/InstagramFeed) — consider centralizing in Phase 5 optimization

## Self-Check: PASSED

All files verified present:
- src/pages/shop/[slug].astro — FOUND
- src/components/CommissionCTA.astro — FOUND
- .planning/phases/03-gallery-products/03-03-SUMMARY.md — FOUND

All commits verified:
- 568d58b — FOUND
- a81ff8f — FOUND

---
*Phase: 03-gallery-products*
*Completed: 2026-03-12*
