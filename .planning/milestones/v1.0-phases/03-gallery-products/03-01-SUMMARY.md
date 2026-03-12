---
phase: 03-gallery-products
plan: "01"
subsystem: ui
tags: [astro, content-collections, zod, image-optimization]

# Dependency graph
requires:
  - phase: 02-visual-redesign-foundation
    provides: src/assets/images/ directory with initial product images and Astro Image pipeline established
provides:
  - madeToOrder boolean field in product content schema (default false)
  - 2 sold/MTO example products (enamel-vase, wall-decor-plate) with stock: 0
  - All 16 product images available in src/assets/images/ for Astro Image optimization
  - LatestPieces using canonical product.id (not deprecated product.slug)
affects: [03-02, 03-03, 03-04, gallery-page, product-detail-page, stock-badges, commission-ctas]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "madeToOrder flag in content schema — differentiates sold-out vs available vs made-to-order"
    - "product.id as canonical Astro 5 property — replaces deprecated product.slug"

key-files:
  created:
    - src/assets/images/Bowls5.jpg
    - src/assets/images/Chip-dip-sets4.jpg
    - src/assets/images/mugs-fatured-image.jpg
    - src/assets/images/Vases3.jpg
  modified:
    - src/content/config.ts
    - src/content/products/enamel-vase.md
    - src/content/products/wall-decor-plate.md
    - src/components/LatestPieces.astro

key-decisions:
  - "madeToOrder uses schema default(false) — existing 10 product files need no change, only MTO examples set it explicitly"
  - "enamel-vase and wall-decor-plate chosen as MTO examples — non-featured items from different collections for filter testing variety"
  - "mugs-fatured-image.jpg filename typo preserved — matches existing product frontmatter references"
  - "public/images/ originals kept — not deleted, only copied to src/assets/"

patterns-established:
  - "MTO pattern: stock: 0 + madeToOrder: true in product frontmatter signals made-to-order state"
  - "All product images must exist in src/assets/images/ for Astro Image pipeline to optimize them"

requirements-completed: [GAL-03, GAL-04, GAL-07, GAL-08]

# Metrics
duration: 3min
completed: 2026-03-12
---

# Phase 3 Plan 01: Schema Foundation and Image Migration Summary

**madeToOrder boolean field added to product Zod schema, 2 MTO example products created (enamel-vase, wall-decor-plate), 4 product images migrated to src/assets/ completing the full 16-image set, and LatestPieces updated to canonical product.id**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-12T05:24:27Z
- **Completed:** 2026-03-12T05:27:30Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Added `madeToOrder: z.boolean().default(false)` to product schema — enables stock badge and commission CTA differentiation in downstream plans
- Marked enamel-vase (Monsoon Series) and wall-decor-plate (Wabi-Sabi Home) as sold/MTO examples with stock: 0
- Migrated 4 remaining product images (Bowls5, Chip-dip-sets4, mugs-fatured-image, Vases3) to src/assets/images/ — all 16 product images now available for Astro Image optimization
- Standardized LatestPieces.astro to use `product.id` (canonical Astro 5 property) instead of deprecated `product.slug`

## Task Commits

Each task was committed atomically:

1. **Task 1: Add madeToOrder to schema and mark 2 products as MTO** - `b499b3b` (feat)
2. **Task 2: Copy 4 product images to src/assets and use product.id in LatestPieces** - `f90622a` (feat)

## Files Created/Modified
- `src/content/config.ts` - Added madeToOrder field to product Zod schema
- `src/content/products/enamel-vase.md` - Changed stock: 1 to stock: 0, added madeToOrder: true
- `src/content/products/wall-decor-plate.md` - Changed stock: 3 to stock: 0, added madeToOrder: true
- `src/components/LatestPieces.astro` - Changed product.slug to product.id on line 22
- `src/assets/images/Bowls5.jpg` - Product image for bowl/serving-bowl products (copied from public/)
- `src/assets/images/Chip-dip-sets4.jpg` - Product image for chip-dip-set (copied from public/)
- `src/assets/images/mugs-fatured-image.jpg` - Product image for mug products (typo filename preserved, copied from public/)
- `src/assets/images/Vases3.jpg` - Product image for vase-sand (copied from public/)

## Decisions Made
- `madeToOrder` uses `z.boolean().default(false)` — the schema default means the 10 other product files need no frontmatter change, reducing diff noise
- enamel-vase and wall-decor-plate chosen as MTO examples because they are non-featured (won't affect homepage LatestPieces display) and span different collections (Monsoon Series, Wabi-Sabi Home), providing variety for gallery filter testing in plan 03-02
- `mugs-fatured-image.jpg` filename typo (should be "featured") was preserved intentionally — all existing product frontmatter references this exact filename
- public/images/ originals were not deleted — they remain as string refs in product frontmatter until Phase 3 image component work updates those paths

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Schema foundation complete — plan 03-02 (gallery page) and 03-03 (product detail) can now query madeToOrder field for stock badges and commission CTAs
- All 16 product images in src/assets/images/ — Astro Image `<Image>` component can optimize all product photos
- product.id standardized — no deprecated .slug usage in LatestPieces
- Concern: images in product frontmatter still reference /images/... string paths. Plans 03-02/03-03 will need the imageMap pattern (established in Phase 2) to resolve these to actual ImageMetadata at build time

## Self-Check: PASSED

All files verified present:
- src/content/config.ts — FOUND
- src/content/products/enamel-vase.md — FOUND
- src/content/products/wall-decor-plate.md — FOUND
- src/assets/images/Bowls5.jpg — FOUND
- src/assets/images/Chip-dip-sets4.jpg — FOUND
- src/assets/images/mugs-fatured-image.jpg — FOUND
- src/assets/images/Vases3.jpg — FOUND
- .planning/phases/03-gallery-products/03-01-SUMMARY.md — FOUND

All commits verified:
- b499b3b — FOUND
- f90622a — FOUND

---
*Phase: 03-gallery-products*
*Completed: 2026-03-12*
