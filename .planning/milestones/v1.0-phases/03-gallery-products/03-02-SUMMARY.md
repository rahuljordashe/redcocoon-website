---
phase: 03-gallery-products
plan: "02"
subsystem: ui
tags: [astro, gallery, filtering, image-optimization, content-collections]

# Dependency graph
requires:
  - phase: 03-gallery-products
    plan: "01"
    provides: madeToOrder field in schema, 2 MTO example products, all 16 product images in src/assets/images/
provides:
  - /shop gallery page at src/pages/shop.astro
  - StockBadge component with Available/Sold/Made-to-Order states
  - FilterBar component with collection filter pills
  - GalleryGrid component with imageMap for WebP-optimized product images
  - Vanilla JS two-step fade filtering with count indicator
affects: [03-03, 03-04, product-detail-page, about-section]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "imageMap pattern in GalleryGrid — all product images statically imported and keyed by /images/ path for Astro Image optimization"
    - "Two-step fade filter — opacity transition first, then setTimeout display:none to preserve CSS transition"
    - "product.id.replace(/\\.md$/, '') — strips .md extension from Astro 5 legacy collection id for clean URLs"

key-files:
  created:
    - src/pages/shop.astro
    - src/components/StockBadge.astro
    - src/components/FilterBar.astro
    - src/components/GalleryGrid.astro
  modified:
    - src/styles/global.css

key-decisions:
  - "product.id includes .md extension in Astro 5 legacy type:content collections — strip with .replace(/\\.md$/, '') for clean /shop/[slug] URLs"
  - "GalleryGrid uses inline card markup (not ProductCard) for Astro Image compliance — ProductCard uses plain <img>, would bypass WebP optimization"
  - "Gallery count element hidden when showing All — only shows count text when a collection filter is active"
  - "DM to Reserve button on each gallery card links to Instagram DM (consistent with DM-first reservation model)"

patterns-established:
  - "GalleryGrid imageMap: import all product images statically, map by /images/filename key matching frontmatter"
  - "Filter pill active state managed in vanilla JS, not Astro server-side — enables client-side toggling without re-render"
  - "gallery-item-image :global(img) selector needed to target Astro Image-generated <img> through scoped styles"

requirements-completed: [GAL-01, GAL-02, GAL-03, GAL-08]

# Metrics
duration: 3min
completed: 2026-03-12
---

# Phase 3 Plan 02: Gallery Page with Collection Filtering Summary

**Full /shop gallery page with 12 products in a 3-column grid, 5 collection filter pills with 300ms fade transitions, stock status badges (Available/Sold/Made-to-Order), piece code badges, and WebP-optimized product images via Astro Image**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-12T05:28:36Z
- **Completed:** 2026-03-12T05:31:52Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Created StockBadge.astro — pill badge with 3 states: Available (sage green), Sold (grey), Made to Order (terracotta); driven by `stock` and `madeToOrder` props
- Created FilterBar.astro — collection filter pills with All default, 44px touch targets, terracotta hover and charcoal active state
- Created GalleryGrid.astro — 3-column product grid using imageMap pattern for Astro Image WebP optimization; includes piece code badge overlay, stock badges, and DM to Reserve button per card
- Created src/pages/shop.astro — /shop gallery page composing SectionHeader, FilterBar, GalleryGrid; vanilla JS two-step fade filtering with count indicator
- Added Gallery section to global.css with `.gallery-item` transition class
- Auto-fixed: product URLs strip `.md` extension from `product.id` for clean `/shop/bowl-terracotta` URLs

## Task Commits

Each task was committed atomically:

1. **Task 1: Create StockBadge, FilterBar, and GalleryGrid components** - `89f264f` (feat)
2. **Task 2: Create /shop page with filtering, count indicator, and scroll animations** - `8c30503` (feat)

## Files Created/Modified

- `src/pages/shop.astro` - /shop gallery page with FilterBar, GalleryGrid, vanilla JS filter logic
- `src/components/StockBadge.astro` - Stock status badge component (Available/Sold/Made to Order)
- `src/components/FilterBar.astro` - Collection filter pills with All default and active state
- `src/components/GalleryGrid.astro` - Product grid with imageMap, Astro Image, StockBadge, piece codes
- `src/styles/global.css` - Added Gallery section with `.gallery-item` opacity transition class

## Decisions Made

- `product.id` in Astro 5 legacy `type: 'content'` collections includes the `.md` extension (e.g., `bowl-terracotta.md`). All product links in GalleryGrid strip this with `.replace(/\.md$/, '')` to generate clean `/shop/bowl-terracotta` URLs that will match the `[slug].astro` route in Plan 03
- GalleryGrid uses its own card markup rather than reusing ProductCard, because ProductCard uses a plain `<img>` tag which bypasses Astro Image WebP optimization. Plan 03 (product detail page) can update ProductCard's "More from this collection" section similarly
- The gallery count element stays empty when "All" is selected and shows "Showing N piece(s)" only when a collection is filtered — avoids redundant "Showing 12 pieces" text
- `gallery-item-image :global(img)` selector is required to style the `<img>` tag generated by Astro's `<Image />` component through Astro's scoped CSS system

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing critical fix] Strip .md extension from product.id in gallery links**
- **Found during:** Task 2 (verification of built HTML)
- **Issue:** `product.id` in Astro 5 legacy `type: 'content'` returns `bowl-terracotta.md` (full filename), resulting in `/shop/bowl-terracotta.md` href — would 404 against the `/shop/[slug]` route that Plan 03 will create using `.id.replace(/\.md$/, '')` as the param
- **Fix:** Added `.replace(/\.md$/, '')` when constructing href in GalleryGrid.astro line 57
- **Files modified:** `src/components/GalleryGrid.astro`
- **Commit:** `8c30503` (included in Task 2 commit)

## Issues Encountered

None beyond the auto-fixed .md extension deviation.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- /shop page complete — Plan 03-03 (product detail pages) can now build `src/pages/shop/[slug].astro` using `product.id.replace(/\.md$/, '')` as the route param to match gallery links
- imageMap pattern established in GalleryGrid — Plan 03-03 can reuse the same image imports (or centralize into a shared utility)
- StockBadge available for product detail page — import directly into `[slug].astro`
- Concern: ProductCard still uses `<img>` not `<Image />` — Plan 03-03's "More from this collection" section should use GalleryGrid-style inline markup or update ProductCard to accept ImageMetadata

## Self-Check: PASSED

All files verified present:
- src/pages/shop.astro — FOUND
- src/components/StockBadge.astro — FOUND
- src/components/FilterBar.astro — FOUND
- src/components/GalleryGrid.astro — FOUND
- .planning/phases/03-gallery-products/03-02-SUMMARY.md — FOUND

All commits verified:
- 89f264f — FOUND
- 8c30503 — FOUND

---
*Phase: 03-gallery-products*
*Completed: 2026-03-12*
