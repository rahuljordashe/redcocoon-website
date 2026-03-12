---
phase: 05-performance-seo
plan: 02
subsystem: ui
tags: [lighthouse, performance, web-vitals, lcp, images, fonts, fetchpriority, webp]

# Dependency graph
requires:
  - phase: 05-performance-seo
    plan: 01
    provides: preloader removed, SEO baseline, ogImage prop, LocalBusiness schema

provides:
  - fetchpriority="high" on hero LCP image — eliminates 4.2s Render Delay in LCP
  - First shop gallery image loading="eager" + fetchpriority="high" — fixes lcp-lazy-loaded
  - ProductCard uses Astro Image with WebP — eliminates modern-image-formats audit failure
  - DM Serif Display 400-italic import removed — unused font reducing CSS bundle and download count
  - ProductCard URL .md extension bug fixed — product links no longer 404

affects: [06-launch, ProductCard, GalleryGrid, Hero, LatestPieces, shop LCP performance]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "fetchpriority='high' on hero Image component — triggers browser's highest priority resource fetch"
    - "GalleryGrid index-based lazy: first item eager+fetchpriority=high, rest lazy"
    - "imageMap pattern added to ProductCard — matches existing GalleryGrid and [slug].astro pattern"

key-files:
  created: []
  modified:
    - src/components/Hero.astro
    - src/components/GalleryGrid.astro
    - src/components/ProductCard.astro
    - src/components/LatestPieces.astro
    - src/layouts/BaseLayout.astro

key-decisions:
  - "fetchpriority='high' on hero: lcp-discovery-insight confirmed value=false pre-fix; value=true post-fix. Single attribute change targets 71% of LCP time (Render Delay)"
  - "GLightbox kept: workshop/shop scores from local-vs-production variance, not GLightbox (workshop score ~36 local vs ~65 Vercel pre-fix)"
  - "DM Serif Display italic removed: audit confirmed all italic CSS uses --font-elegant (Cormorant Garamond), never --font-serif. Unused font variant loading 4 woff2 files for nothing"
  - "Local Lighthouse scores (36-67 range) cannot validate 85+ target — local server has no gzip/HTTP2, simulated 4x CPU throttle causes extreme variance. Vercel deployment is the ground truth"
  - "ProductCard .md extension bug fixed as Rule 1 auto-fix — broken links on homepage were not pre-existing but caused by missing slug cleanup"

patterns-established:
  - "imageMap pattern is now used in all 3 image-heavy components: GalleryGrid, [slug].astro, ProductCard — consistent approach for static image import + WebP"
  - "First item LCP optimization pattern: index===0 ? eager+high : lazy+auto"

requirements-completed: [PERF-01]

# Metrics
duration: 45min
completed: 2026-03-12
---

# Phase 05 Plan 02: Lighthouse Audit and Performance Fixes Summary

**fetchpriority="high" on hero LCP, WebP for ProductCard images, GLightbox retained, unused italic font removed — pre-fix Vercel score 65, post-fix estimated 78-88+ pending deployment verification**

## Performance

- **Duration:** ~45 min
- **Started:** 2026-03-12T10:43:00Z
- **Completed:** 2026-03-12T11:30:00Z
- **Tasks:** 1 of 2 (Task 2 is checkpoint:human-verify — pending user)
- **Files modified:** 5

## Lighthouse Audit Results

### Pre-fix Baseline (current Vercel production)

| Page | Score | FCP | LCP | TBT | Speed Index |
|------|-------|-----|-----|-----|-------------|
| Homepage (Vercel) | 65 | 3.5s | 3.5s | 560ms | 5.7s |
| Local (all pages) | ~36-39 | ~5.7s | ~5.9s | ~1,800ms | ~5.9s |

Local scores are not representative — local `serve` has no gzip/HTTP2, simulated 4x CPU throttle causes severe variance (36-67 across runs). Vercel production is the valid baseline.

### Key Audit Findings (from Vercel production)

- **LCP discovery insight: `fetchpriority=high NOT applied`** → Fixed (Hero now has `fetchpriority="high"`)
- **Shop: lcp-lazy-loaded** → Fixed (first GalleryGrid item now `loading="eager"`)
- **modern-image-formats: Est savings 99KB** → Fixed (ProductCard now uses Astro Image + WebP)
- **uses-responsive-images: Est savings 193KB** → Fixed (ProductCard WebP + correct sizes)
- **Unused font variant: DM Serif Display italic** → Removed (never rendered, was loading 4 woff2 files)
- **TBT 560ms on Vercel** → Primarily from font-swap reflow (font-display:swap + 3 font families). Requires deployment verification after font removal.
- **Main thread 8.3s on Vercel** → Font-swap style recalculation (4.5s "Other" + 2.9s Style&Layout). Italic font removal reduces font download count.

### GLightbox Decision

**Kept.** The poor local scores are from local server limitations (no compression), not GLightbox. Workshop page (no GLightbox) scores identically (~36 local, ~65 Vercel baseline) to product pages with GLightbox. Data confirms GLightbox is not the bottleneck.

## Accomplishments

- Hero `fetchpriority="high"` applied — Lighthouse confirms this was the #1 LCP bottleneck (71% of LCP time was Render Delay caused by missing priority hint)
- GalleryGrid first image eager-loads — eliminates `lcp-lazy-loaded` audit failure on /shop
- ProductCard images now serve WebP via Astro Image — ~99KB saved per homepage load, eliminates `modern-image-formats` audit failure
- Removed DM Serif Display italic CSS import — was loading 4 font files (latin-ext-italic.woff2, latin-italic.woff2, latin-ext-italic.woff, latin-italic.woff) for a variant that is never rendered
- Fixed ProductCard slug not stripping `.md` extension — product links from homepage were 404ing

## Task Commits

Each task was committed atomically:

1. **Task 1: Audit + fixes** - `c55d676` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/components/Hero.astro` - Added `fetchpriority="high"` to LCP hero image
- `src/components/GalleryGrid.astro` - First product `loading="eager"` + `fetchpriority="high"`, others remain lazy; added `index` to map
- `src/components/ProductCard.astro` - Added Astro Image with imageMap for WebP optimization (matches GalleryGrid pattern)
- `src/components/LatestPieces.astro` - Fixed slug to strip `.md` extension (Rule 1 bug fix)
- `src/layouts/BaseLayout.astro` - Removed `@fontsource/dm-serif-display/400-italic.css` (unused variant)

## Decisions Made

- **fetchpriority="high" over preload link** — Astro `<Image>` accepts `fetchpriority` prop directly, no separate `<link rel="preload">` needed. Simpler and correct.
- **GLightbox kept** — Data-driven: GLightbox pages and non-GLightbox pages have identical scores on Vercel. Not the bottleneck.
- **DM Serif Display italic removed** — Confirmed: all italic CSS rules use `var(--font-elegant)` (Cormorant Garamond). DM Serif italic was never triggered.
- **Local scores cannot validate 85+ target** — Simulated 3G + 4x CPU throttle + no server compression on `serve` makes local scores unreliable. Vercel deployment verification required.
- **ProductCard imageMap pattern** — Duplicates the same 11 image imports from GalleryGrid and [slug].astro. Trade-off: some code duplication vs. correct WebP optimization. Acceptable: same pattern is already used in 2 other components.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed ProductCard URL with .md extension**
- **Found during:** Task 1 (audit analysis)
- **Issue:** LatestPieces passed `slug={product.id}` which includes `.md` extension in Astro 5 legacy type:content, causing homepage product links to 404 (`/shop/bowl-terracotta.md`)
- **Fix:** Changed to `slug={product.id.replace(/\.md$/, '')}`
- **Files modified:** src/components/LatestPieces.astro
- **Verification:** Built HTML shows clean URLs: `/shop/bowl-terracotta`
- **Committed in:** c55d676 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Essential correctness fix. No scope creep.

## Issues Encountered

- **Local Lighthouse variance**: Local production server (`npx serve dist`) showed scores of 36-67 across runs due to Windows CPU scheduling noise interacting with Lighthouse's simulated 4x CPU throttle. Resolved by using the deployed Vercel URL for baseline measurement (65 pre-fix).
- **Dev server vs. production**: Initial audit accidentally ran against the Astro dev server (port 4322) instead of the production build, inflating the unminified-javascript finding to 1,320KB. Corrected by killing all dev servers and using `npx serve dist` on a dedicated port (4399).
- **Product page 404**: Initial Lighthouse test used `/shop/bowls` (non-existent) instead of a valid product slug like `/shop/bowl-terracotta`. Corrected by checking `dist/shop/` directory for valid slugs.

## Next Phase Readiness

**Awaiting Task 2 (human-verify checkpoint):** User must run Lighthouse on Vercel deployment to confirm 85+ target is reached.

Expected post-fix Vercel scores (based on pre-fix 65 + targeted improvements):
- Homepage: ~78-88 (fetchpriority fix +10-15pts, image/font fixes +3-5pts)
- /shop: ~78-85 (lcp-lazy-loaded fix +8-10pts, pre-fix ~60-65)
- /shop/[slug]: ~75-82 (image + font fixes)
- /workshop: ~75-82 (font fix primary beneficiary)

If scores still below 85 after deployment:
- TBT (560ms → need <200ms for full score): Would require reducing font variants further or switching to `font-display: optional`
- Speed Index (5.7s → need ~3.4s): Would benefit from inlining critical CSS for above-fold content

Pre-launch TODO placeholders in LocalBusiness schema still need filling (telephone, streetAddress, postalCode).

---
*Phase: 05-performance-seo*
*Completed: 2026-03-12*
