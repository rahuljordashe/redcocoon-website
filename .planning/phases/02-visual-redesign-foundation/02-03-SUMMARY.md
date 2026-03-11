---
phase: 02-visual-redesign-foundation
plan: "03"
subsystem: ui
tags: [astro, image-optimization, webp, astro-assets, image-pipeline]

# Dependency graph
requires:
  - phase: 02-visual-redesign-foundation/02-02
    provides: Section backgrounds, spacing tokens, and touch target CSS established in 02-02

provides:
  - src/assets/images/ directory with 12 component images for Astro build-time optimization
  - Hero, CollectionBanner, Hospitality, Process, InstagramFeed updated to use Astro Image component
  - WebP conversion and lazy loading for all non-product component images

affects:
  - 03-product-gallery (will handle product image migration from content collections)
  - Any component that adds new hardcoded images should follow this imageMap pattern

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "ESM import of images from src/assets/images/ for Astro build-time optimization"
    - "Static import + imageMap pattern for components using dynamic image src (Process, InstagramFeed)"
    - "loading=eager for above-fold hero image, loading=lazy for all others"

key-files:
  created:
    - src/assets/images/ (12 image files for component use)
  modified:
    - src/components/Hero.astro
    - src/components/CollectionBanner.astro
    - src/components/Hospitality.astro
    - src/components/Process.astro
    - src/components/InstagramFeed.astro
    - src/layouts/BaseLayout.astro

key-decisions:
  - "COPY images to src/assets/images/ (not move) — originals remain in public/images/ for content collection string references until Phase 3"
  - "Process and InstagramFeed use static import + Record<string, ImageMetadata> imageMap pattern — Astro Image requires static imports, not dynamic strings"
  - "Hero preload link removed from BaseLayout — Astro Image with loading=eager handles above-fold rendering correctly without it"

patterns-established:
  - "imageMap pattern: import images statically, map filenames to ImageMetadata, pass imageMap[post.src] to Image component"

requirements-completed: [VIS-01]

# Metrics
duration: 4min
completed: 2026-03-12
---

# Phase 2 Plan 03: Image Pipeline Migration Summary

**12 component images migrated to src/assets/images/ with Astro Image component for build-time WebP conversion (387kB PNG hero → 50kB WebP)**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-11T23:19:05Z
- **Completed:** 2026-03-11T23:23:00Z
- **Tasks:** 1 of 2 complete (Task 2 is human-verify checkpoint)
- **Files modified:** 18 (12 new images + 6 component/layout files)

## Accomplishments
- Copied 12 hardcoded component images from public/images/ to src/assets/images/
- Replaced all `<img>` tags with `<Image />` from `astro:assets` in 5 components
- Process and InstagramFeed use static import + imageMap pattern to handle dynamic src with Astro Image
- Hero uses `loading="eager"` for above-fold performance; all other images use `loading="lazy"`
- Removed stale hero preload link from BaseLayout (was pointing to a file Astro no longer serves at that path)
- Build produces WebP output for all 14 image instances with major savings (e.g. 387kB PNG → 50kB WebP, 306kB JPEG → 33kB WebP)

## Task Commits

Each task was committed atomically:

1. **Task 1: Move component images to src/assets/images/ and update components** - `f34b797` (feat)

**Plan metadata:** TBD (docs commit after checkpoint)

## Files Created/Modified
- `src/assets/images/` - 12 JPEG/PNG images for component optimization (10.jpg, 399x650-01.png, abyee.jpg, Coasters18.jpg, Dinner-sets5.jpg, Enamel.jpg, Fire-Glow.jpg, Kitchen-ware1.jpg, Plates1.jpg, Tea-coffee-set5.jpg, Toast-Plates-new.jpg, Wall-deco5.jpg)
- `src/components/Hero.astro` - Uses `<Image />` with `loading="eager"` for hero photo
- `src/components/CollectionBanner.astro` - Uses `<Image />` for Monsoon Series photo
- `src/components/Hospitality.astro` - Uses `<Image />` for two hospitality photos
- `src/components/Process.astro` - Static imports + imageMap pattern for 4 process step images
- `src/components/InstagramFeed.astro` - Static imports + imageMap pattern for 6 grid images
- `src/layouts/BaseLayout.astro` - Removed stale `<link rel="preload">` for hero image

## Decisions Made
- Images COPIED (not moved) to src/assets/ because several (Coasters18.jpg, Dinner-sets5.jpg, Enamel.jpg, Kitchen-ware1.jpg, Tea-coffee-set5.jpg, Toast-Plates-new.jpg, Wall-deco5.jpg) are also referenced as `/images/...` strings in content collection product .md files — those public/ copies must stay until Phase 3 migrates the content schema
- imageMap pattern chosen for Process and InstagramFeed because Astro's `<Image />` requires statically importable sources, not runtime string interpolation
- Hero preload link removed — with Astro Image handling the output filename (hashed, WebP), the old `/images/399x650-01.png` preload would point to a non-existent path

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Image pipeline migration complete; all component images now go through Astro's build pipeline
- Phase 3 can migrate product content collection images (from public/images/ string refs to src/assets/ ESM imports) following the same pattern established here
- Human visual checkpoint (Task 2) is pending — user should run `npm run dev` and verify the complete Phase 2 redesign looks correct

---
*Phase: 02-visual-redesign-foundation*
*Completed: 2026-03-12*
