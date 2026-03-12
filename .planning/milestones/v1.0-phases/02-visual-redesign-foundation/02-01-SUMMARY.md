---
phase: 02-visual-redesign-foundation
plan: "01"
subsystem: ui
tags: [astro, fontsource, css-tokens, typography, design-system, vis-02, vis-04, vis-06, vis-07]

# Dependency graph
requires: []
provides:
  - Self-hosted font loading via @fontsource packages (no CDN dependency)
  - Variable font family names correctly mapped in CSS custom properties
  - Updated design tokens: --text-base 1rem, --space-6xl, shadow tokens, --border-radius-img
  - Full component color audit classified as acceptable or needing token
affects:
  - 02-02
  - 02-03
  - 02-04
  - 02-05

# Tech tracking
tech-stack:
  added:
    - "@fontsource/dm-serif-display@5.x — static font with 400/400-italic"
    - "@fontsource-variable/cormorant-garamond@5.x — variable font"
    - "@fontsource-variable/inter@5.x — variable font"
  patterns:
    - "Import @fontsource packages in BaseLayout.astro frontmatter (not in <head>)"
    - "Variable font packages register as 'Font Name Variable' — must match in CSS custom properties"
    - "font-size: var(--text-base) on body ensures all text inherits from token"

key-files:
  created: []
  modified:
    - src/layouts/BaseLayout.astro
    - src/styles/global.css
    - package.json

key-decisions:
  - "Variable font CSS family names: 'Cormorant Garamond Variable' and 'Inter Variable' — these must be used in CSS custom properties to match @fontsource-variable registration"
  - "--text-base changed from 0.92rem to 1rem — VIS-04 locked decision, body text now readable at standard scale"
  - "DM Serif Display uses @fontsource/dm-serif-display (non-variable, 400/400-italic) — no variable version needed for display-only headings"

patterns-established:
  - "Font loading pattern: @fontsource imports in .astro frontmatter, font-family tokens in global.css :root"
  - "Shadow tokens: use --shadow-card, --shadow-card-hover, --shadow-cta for consistent depth — avoid inline rgba(0,0,0,...)"

requirements-completed: [VIS-02, VIS-04, VIS-06, VIS-07]

# Metrics
duration: 3min
completed: 2026-03-11
---

# Phase 2 Plan 01: Font Migration and Design Token Foundation Summary

**Self-hosted fonts via @fontsource replacing Google Fonts CDN, variable font names mapped in CSS tokens, design token set extended with --space-6xl, shadow tokens, --border-radius-img, and --text-base bumped to 1rem**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-11T23:04:55Z
- **Completed:** 2026-03-11T23:08:36Z
- **Tasks:** 3 (2 with commits, 1 audit-only)
- **Files modified:** 3 (BaseLayout.astro, global.css, package.json)

## Accomplishments
- Migrated all three fonts from Google Fonts CDN to self-hosted @fontsource packages — zero external font network requests
- Updated `--font-elegant` and `--font-sans` CSS tokens to match the variable font package registration names ('Cormorant Garamond Variable', 'Inter Variable')
- Bumped `--text-base` from 0.92rem to 1rem and wired `font-size: var(--text-base)` into the body rule
- Added `--space-6xl: 10rem`, `--border-radius-img: 12px`, and three shadow tokens (`--shadow-card`, `--shadow-card-hover`, `--shadow-cta`) for Plan 02 component work
- Audited all 17 component .astro files — 31 hardcoded color instances classified (all ACCEPTABLE or already handled by Plan 02)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install @fontsource packages and migrate BaseLayout font loading** - `a8272b9` (feat)
2. **Task 2: Audit and update global.css design tokens** - `c9bbe17` (feat)
3. **Task 3: Component color audit (VIS-02)** — audit-only, no files modified, no commit

**Plan metadata:** (docs commit — created with SUMMARY)

## Files Created/Modified
- `src/layouts/BaseLayout.astro` — Added 4 @fontsource import statements; removed Google Fonts preconnect and stylesheet links
- `src/styles/global.css` — Updated font family tokens, bumped --text-base, added --space-6xl, --border-radius-img, shadow tokens, body font-size declaration
- `package.json` — Added @fontsource/dm-serif-display, @fontsource-variable/cormorant-garamond, @fontsource-variable/inter

## Decisions Made
- Variable font packages register with "Variable" suffix — `@fontsource-variable/inter` registers as `'Inter Variable'`, not `'Inter'`. CSS custom properties updated to match.
- DM Serif Display: used non-variable package (`@fontsource/dm-serif-display`) importing 400 and 400-italic — no variable axes needed for a display-only heading font.
- `font-size: var(--text-base)` added to body rule (not just the token) to ensure inheritance cascade works correctly across all elements.

## VIS-02 Component Color Audit — Full Results

**Total instances scanned:** 31 across 17 component files

### CLEAN — No hardcoded colors
| Component | Status |
|-----------|--------|
| MobileMenu.astro | CLEAN |
| BottomTabBar.astro | CLEAN |
| LatestPieces.astro | CLEAN |
| SectionHeader.astro | CLEAN |
| Process.astro | CLEAN |
| Preloader.astro | CLEAN |

### ACCEPTABLE — Brand colors (third-party, cannot use palette tokens)
| Component | Line | Value | Reason |
|-----------|------|-------|--------|
| WhatsAppButton.astro | 33 | `#25D366` | WhatsApp brand green |
| WhatsAppButton.astro | 45 | `#1da851` | WhatsApp brand hover green |
| FloatingContactButton.astro | 40 | `rgba(131, 58, 180, 0.4)` | Instagram brand purple shadow |
| FloatingContactButton.astro | 46 | `rgba(131, 58, 180, 0.5)` | Instagram brand purple shadow (hover) |
| FloatingContactButton.astro | 109 | `#fff` | White text on Instagram gradient button |
| FloatingContactButton.astro | 114 | `#fff` | White text on WhatsApp button |
| ReservationFlow.astro | 106 | `#fff` | White text on Instagram gradient button |
| ReservationFlow.astro | 111 | `#fff` | White text on WhatsApp button |

### ACCEPTABLE — Opacity overlays (require alpha, cannot use simple tokens)
| Component | Line | Value | Reason |
|-----------|------|--------|--------|
| Navbar.astro | 40 | `rgba(253, 251, 247, 0.92)` | Navbar glass — off-white at 92% opacity |
| Navbar.astro | 43 | `rgba(212, 200, 181, 0.3)` | Navbar border — beige-dark at 30% |
| BackToTop.astro | 21 | `rgba(193, 119, 71, 0.3)` | Terracotta shadow at 30% opacity |
| Footer.astro | 208 | `rgba(255, 255, 255, 0.08)` | Subtle white overlay on dark bg |
| Footer.astro | 248 | `rgba(107, 91, 78, 0.3)` | Earth-tone border on dark bg |
| Hospitality.astro | 87 | `rgba(255, 255, 255, 0.8)` | White text on dark image overlay |
| Hospitality.astro | 88 | `rgba(255, 255, 255, 0.25)` | White border on dark image overlay |
| CollectionBanner.astro | 45 | `rgba(255, 255, 255, 0.7)` | White text on dark banner |
| CollectionBanner.astro | 58 | `rgba(255, 255, 255, 0.85)` | White text on dark banner (hover) |
| InstagramFeed.astro | 105 | `rgba(0, 0, 0, 0.7)` | Dark overlay on photo hover |
| Hero.astro | 116 | `rgba(255, 255, 255, 0.3)` | White border at 30% on dark hero |
| Hero.astro | 140 | `rgba(193, 119, 71, 0.95)` | Terracotta at 95% opacity overlay |
| Hero.astro | 175 | `rgba(255, 255, 255, 0.5)` | Muted white text on dark bg |
| Hero.astro | 184 | `rgba(255, 255, 255, 0.3)` | White progress indicator on dark |
| Hero.astro | 64 | `rgba(193, 119, 71, 0.15)` | Subtle terracotta radial glow |

### ACCEPTABLE — Standard black shadows
| Component | Line | Value | Reason |
|-----------|------|--------|--------|
| CollectionBanner.astro | 71 | `rgba(0, 0, 0, 0.15)` | Generic shadow |
| FloatingContactButton.astro | 67 | `rgba(0, 0, 0, 0.15)` | Generic shadow |
| ProductCard.astro | 47 | `rgba(0, 0, 0, 0.1)` | Generic shadow |
| Hero.astro | 133 | `rgba(0, 0, 0, 0.3)` | Generic shadow |

### ACCEPTABLE — CSS fallback value
| Component | Line | Value | Reason |
|-----------|------|--------|--------|
| Hero.astro | 95 | `var(--color-white, #fdfbf7)` | Fallback in CSS custom property call — acceptable |

### ACCEPTABLE — Dark gradient stop (not a palette color, not a token candidate)
| Component | Line | Value | Reason |
|-----------|------|--------|--------|
| Hero.astro | 42 | `#2a2118` | Near-black gradient stop for dark hero bg — not a named palette color, gradient-specific |
| Hero.astro | 43 | `rgba(196, 68, 10, 0.27)` | Warm reddish gradient stop — cinematic effect, not a palette token |

### NEEDS TOKEN — Already handled by Plan 02 scope
| Component | Line | Value | Recommended Token |
|-----------|------|--------|------------------|
| ProductCard.astro | 78 | `rgba(42, 36, 32, 0.75)` | Espresso overlay — Plan 02 Task 3 handles ProductCard |

**Result: Zero unaudited components. Zero "NEEDS TOKEN" items outside Plan 02 scope.**

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None — no external service configuration required.

## Next Phase Readiness
- All three @fontsource packages installed and verified building cleanly
- CSS tokens complete: variable font names, --text-base 1rem, --space-6xl, shadow tokens, --border-radius-img all ready for Plan 02 component work
- VIS-02 color audit proves only 1 component instance (ProductCard.astro) needs token replacement, which is already in Plan 02's scope
- Build clean: 1 page, 4.94s

---
*Phase: 02-visual-redesign-foundation*
*Completed: 2026-03-11*

## Self-Check: PASSED

- src/layouts/BaseLayout.astro — FOUND
- src/styles/global.css — FOUND
- .planning/phases/02-visual-redesign-foundation/02-01-SUMMARY.md — FOUND
- Commit a8272b9 (Task 1) — FOUND
- Commit c9bbe17 (Task 2) — FOUND
