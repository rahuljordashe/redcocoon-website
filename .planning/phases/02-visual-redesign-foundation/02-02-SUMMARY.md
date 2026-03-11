---
phase: 02-visual-redesign-foundation
plan: "02"
subsystem: ui
tags: [astro, css, design-system, backgrounds, noise-texture, touch-targets, shadows, typography, vis-01, vis-03, vis-05]

# Dependency graph
requires:
  - 02-01 (shadow tokens, --border-radius-img, --noise-texture, variable font names)
provides:
  - Cream background hero with espresso text
  - Dark espresso + noise texture on Process and CollectionBanner sections
  - 3-column desktop product grid
  - 44px touch targets on channel badges and reserve buttons
  - ProductCard shadow tokens replacing inline rgba
  - Section subtitles at 1.25rem in Cormorant Garamond
affects:
  - 02-03
  - 02-04
  - 02-05

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Noise overlay pattern: <div class='X-noise' aria-hidden='true'></div> as first child of dark sections, position:absolute inset:0, z-index:1, container z-index:2"
    - "Dark section text flip: espresso -> cream headings, clay -> var(--color-beige) body text"
    - "Touch target floor: min-height:44px on all interactive badges/buttons per VIS-03"

key-files:
  created: []
  modified:
    - src/components/Hero.astro
    - src/components/LatestPieces.astro
    - src/components/InstagramFeed.astro
    - src/components/SectionHeader.astro
    - src/components/Process.astro
    - src/components/CollectionBanner.astro
    - src/components/ReservationFlow.astro
    - src/components/ProductCard.astro

key-decisions:
  - "Hero changed from dark gradient to cream background — CLAUDE.md key decision overridden by locked VIS-01 decision (plan frontmatter 'truths' take precedence)"
  - "CollectionBanner restructured from terracotta card to full-width dark section — .collection-inner wrapper kept but stripped of background/border-radius"
  - "Noise overlay added as aria-hidden div (not CSS pseudo-element) to avoid z-index stacking issues with container children"
  - "LatestPieces 1024px media query for 3-col grid removed (now the default) — mobile breakpoint at 768px preserved"

# Metrics
duration: 4min
completed: 2026-03-12
---

# Phase 2 Plan 02: Component Visual Transformation Summary

**Cream hero, dark espresso noise sections (Process, CollectionBanner), 3-column grid, 44px touch targets, and shadow token migration across all 8 homepage section components**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-11T23:12:29Z
- **Completed:** 2026-03-11T23:16:09Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments

- Converted Hero from dark gradient to cream background with espresso/charcoal text — all element colors flipped (tag, title, ghost button, scroll indicator, badge)
- Hero circle radial glow lightened from 0.15 to 0.08 opacity (appropriate for light background), hero image shadow softened from 0.3 to 0.12 opacity
- LatestPieces product grid changed to 3 columns desktop (was 4), explicit `--color-white` background added
- InstagramFeed background changed from `--color-white` to `--color-cream` (section alternation: off-white → cream)
- SectionHeader subtitle: font-size bumped 1.05rem → 1.25rem, font-family set to `--font-elegant` (Cormorant Garamond) — was inheriting Inter body font
- SectionHeader title: clamp max tightened from 3.5rem to 3rem per locked decision
- Process converted from light (`--color-white`) to dark espresso with noise overlay and cream/beige text
- CollectionBanner rebuilt from terracotta gradient card to full-width espresso section with noise, terracotta CTA button
- ProductCard: `background: white` replaced with `--color-white`, resting shadow `--shadow-card` added, hover shadow uses `--shadow-card-hover` token
- ProductCard image container gets `border-radius-img` on top corners so images clip correctly to card shape
- ReservationFlow channel badges: min-height 44px, padding increased, font bumped 0.7rem → 0.75rem
- ProductCard reserve button: min-height 44px on both desktop and mobile breakpoints

## Task Commits

Each task was committed atomically:

1. **Task 1: Hero cream bg, 3-col grid, cream sections, subtitle typography** — `32d645c` (feat)
2. **Task 2: Dark espresso sections with noise for Process and CollectionBanner** — `d85e533` (feat)
3. **Task 3: Touch targets 44px, card shadow tokens, product image border-radius** — `fd79570` (feat)

**Plan metadata:** (docs commit — created with SUMMARY)

## Files Created/Modified

- `src/components/Hero.astro` — Cream background, espresso text, charcoal ghost button, lighter shadows, border-radius-img on image
- `src/components/LatestPieces.astro` — 3-col desktop grid, explicit off-white background, redundant 1024px media query removed
- `src/components/InstagramFeed.astro` — Cream background
- `src/components/SectionHeader.astro` — section-title clamp 3rem max, section-subtitle 1.25rem Cormorant Garamond
- `src/components/Process.astro` — Dark espresso background, noise overlay, cream/beige text, border-radius-img and shadow-card on images
- `src/components/CollectionBanner.astro` — Full-width espresso section with noise, terracotta CTA, collection-photo image gets border-radius and shadow
- `src/components/ReservationFlow.astro` — Channel badges 44px min-height, improved padding and font size
- `src/components/ProductCard.astro` — Token-based shadow, var(--color-white) background, border-radius-img on image container, 44px reserve button

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None.

## Next Phase Readiness

- All 8 section components now match locked visual decisions from RESEARCH.md Pattern 5
- Section background alternation: cream (Hero) → off-white (LatestPieces) → espresso+noise (CollectionBanner) → espresso+noise (Hospitality) → espresso+noise (Process) → cream (InstagramFeed) → cream (ReservationFlow)
- All touch targets >= 44px
- Shadow tokens in use across cards — no inline rgba box-shadow on product grid
- Build: clean, 1 page, ~3.3s

---
*Phase: 02-visual-redesign-foundation*
*Completed: 2026-03-12*

## Self-Check: PASSED

- src/components/Hero.astro — FOUND
- src/components/LatestPieces.astro — FOUND
- src/components/InstagramFeed.astro — FOUND
- src/components/SectionHeader.astro — FOUND
- src/components/Process.astro — FOUND
- src/components/CollectionBanner.astro — FOUND
- src/components/ReservationFlow.astro — FOUND
- src/components/ProductCard.astro — FOUND
- .planning/phases/02-visual-redesign-foundation/02-02-SUMMARY.md — FOUND
- Commit 32d645c (Task 1) — FOUND
- Commit d85e533 (Task 2) — FOUND
- Commit fd79570 (Task 3) — FOUND
