---
phase: 01-critical-fixes
plan: 01
subsystem: ui
tags: [astro, navigation, whatsapp, instagram, broken-links]

# Dependency graph
requires: []
provides:
  - Zero broken internal navigation links in ReservationFlow, FloatingContactButton, Footer, and Hospitality components
  - Hospitality section with single WhatsApp "Discuss a Project" CTA (no dead /hospitality route)
  - Contact flow limited to Instagram DM + WhatsApp (Form link removed, CSS preserved for Phase 4)
affects: [02-product-gallery, 04-contact-form]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Orphaned CSS classes preserved when anchor removed — enables Phase 4 form restoration without CSS changes"

key-files:
  created: []
  modified:
    - src/components/ReservationFlow.astro
    - src/components/FloatingContactButton.astro
    - src/components/Footer.astro
    - src/components/Hospitality.astro

key-decisions:
  - "CSS classes for removed form links (.channel-form, .floating-form, .btn-ghost, .hospitality-ghost) preserved — Phase 4 will restore the form link without needing CSS changes"
  - "FloatingContactButton retains 2-option popup (IG DM + WA) — user decision to keep mini-menu, not simplify to single link"
  - "Hospitality CTA consolidated to single btn-primary (Discuss a Project via WhatsApp quoteLink) — /hospitality route does not exist yet"

patterns-established:
  - "Broken link removal: delete anchor element, preserve CSS class definitions for future restoration"

requirements-completed: [FIX-01, FIX-02]

# Metrics
duration: 2min
completed: 2026-03-12
---

# Phase 1 Plan 01: Critical Fixes — Broken Navigation Links Summary

**Removed four broken navigation anchors (#contact-form x3, /hospitality x1) across four Astro components, reducing dead-end nav paths to zero while preserving orphaned CSS classes for Phase 4 form restoration**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-11T22:03:47Z
- **Completed:** 2026-03-11T22:05:52Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Removed `href="#contact-form"` from ReservationFlow, FloatingContactButton, and Footer — zero dead anchors remain
- Replaced two-button Hospitality actions block (View Portfolio + Request a Quote) with single "Discuss a Project" WhatsApp CTA
- Build passes cleanly; all orphaned CSS classes preserved for future Phase 4 form restoration

## Task Commits

Each task was committed atomically:

1. **Task 1: Remove broken #contact-form links from 3 components** - `f8d7f82` (fix)
2. **Task 2: Consolidate Hospitality section to single WhatsApp CTA** - `fe1b740` (fix)

**Plan metadata:** _(docs commit below)_

## Files Created/Modified
- `src/components/ReservationFlow.astro` - Removed Form channel badge; now has 2 channel badges (IG DM + WA)
- `src/components/FloatingContactButton.astro` - Removed Reservation Form option; popup now has 2 options (IG DM + WA)
- `src/components/Footer.astro` - Removed Reservation Form button from CTA banner; now has 2 buttons (IG + WA)
- `src/components/Hospitality.astro` - Replaced 2-button block with single "Discuss a Project" btn-primary linking to WhatsApp

## Decisions Made
- CSS classes for removed form links (.channel-form, .floating-form, .btn-ghost, .hospitality-ghost) preserved — Phase 4 will restore the form link without needing CSS changes
- FloatingContactButton retains 2-option popup (IG DM + WA) per user decision — not simplified to a single link
- Hospitality CTA consolidated to single btn-primary (Discuss a Project via WhatsApp quoteLink) — /hospitality route does not exist

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- `npx astro check` reports pre-existing TS errors in MobileMenu.astro (null checks) and BaseLayout.astro (type issues) — documented in MEMORY.md as pre-existing, not blocking build. Out of scope per deviation rules.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All broken navigation links eliminated — site has zero dead-end navigation paths
- Phase 4 can restore the contact form link by re-adding the anchor elements (CSS already preserved)
- No blockers for proceeding to Phase 2 (product gallery improvements)

---
*Phase: 01-critical-fixes*
*Completed: 2026-03-12*
