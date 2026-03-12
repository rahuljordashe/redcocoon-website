---
phase: 04-workshop-hospitality
plan: "01"
subsystem: ui
tags: [astro, web3forms, hcaptcha, forms, navigation]

# Dependency graph
requires:
  - phase: 01-critical-fixes
    provides: Orphaned CSS classes (.channel-form, .floating-form, .hospitality-ghost) preserved for Phase 4 restoration
  - phase: 03-gallery-products
    provides: BaseLayout pattern, SectionHeader component, existing nav/footer structure
provides:
  - /workshop inquiry page with Web3Forms-backed 4-field form
  - Workshop nav link in Navbar and MobileMenu (between Studio and Contact)
  - Workshop channel badge in ReservationFlow step 2
  - Workshop option in FloatingContactButton popup
  - Workshop button in Footer CTA banner
affects: [hospitality-content, phase-5-launch]

# Tech tracking
tech-stack:
  added: [web3forms CDN integration, hCaptcha via Web3Forms client script]
  patterns: [vanilla JS fetch POST with inline success/error feedback, is:inline for external CDN scripts]

key-files:
  created:
    - src/pages/workshop.astro
  modified:
    - src/components/Navbar.astro
    - src/components/MobileMenu.astro
    - src/components/ReservationFlow.astro
    - src/components/FloatingContactButton.astro
    - src/components/Footer.astro

key-decisions:
  - "Web3Forms access_key placeholder value used — real key required before launch"
  - "hospitality-ghost styles duplicated into Footer scoped style block — Astro scoping prevents cross-component class sharing"
  - "MobileMenu nth-child(7) transition delay added at 0.4s to maintain stagger animation with new Workshop item"

patterns-established:
  - "External CDN scripts must use is:inline attribute in Astro to prevent bundler interference"
  - "fetch POST pattern: FormData -> Object.fromEntries -> JSON.stringify to api.web3forms.com/submit"
  - "Inline success: opacity 0 -> display:none fields, display:flex -> opacity 1 success panel with 300ms fade"

requirements-completed: [WKSP-01, WKSP-02, WKSP-03, WKSP-04]

# Metrics
duration: 3min
completed: 2026-03-12
---

# Phase 4 Plan 01: Workshop Inquiry Page Summary

**Web3Forms-backed /workshop inquiry page with hCaptcha and inline success feedback, plus Workshop links wired into all 5 site navigation and contact surfaces**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-12T12:25:42Z
- **Completed:** 2026-03-12T12:28:57Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Created /workshop page: warm intro, 4-field form (name/email/phone/message), hCaptcha, vanilla JS fetch POST, inline success/error panels
- Wired Workshop nav links: Navbar (desktop) and MobileMenu (mobile) — both between Studio and Contact
- Restored 3 Phase-1-removed contact surfaces: ReservationFlow channel badge, FloatingContactButton popup option, Footer CTA banner button

## Task Commits

Each task was committed atomically:

1. **Task 1: Create /workshop page with Web3Forms form** - `ae13dcd` (feat)
2. **Task 2: Wire Workshop links into navigation and contact surfaces** - `4175406` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/pages/workshop.astro` - Workshop inquiry page: BaseLayout wrapper, SectionHeader, 4-field form, hCaptcha div, Web3Forms CDN script (is:inline), vanilla JS fetch POST handler, success/error UI, scoped styles
- `src/components/Navbar.astro` - Added Workshop link between Studio and Contact
- `src/components/MobileMenu.astro` - Added Workshop link between Studio and Contact; added nth-child(7) transition delay rule
- `src/components/ReservationFlow.astro` - Added channel-badge channel-form Workshop link after WhatsApp
- `src/components/FloatingContactButton.astro` - Added floating-option floating-form Workshop link after WhatsApp
- `src/components/Footer.astro` - Added btn-ghost hospitality-ghost Workshop button in CTA banner; added hospitality-ghost scoped styles

## Decisions Made
- Web3Forms access_key uses placeholder "YOUR_WEB3FORMS_ACCESS_KEY" — real key needed before launch (logged as pending setup)
- `.hospitality-ghost` styles duplicated in Footer.astro scoped `<style>` block rather than using global.css — preserves Astro's scoped-styling convention and avoids polluting global scope
- MobileMenu nth-child(7) transition delay at 0.4s continues the 0.05s stagger pattern (item 6 = 0.35s, item 7 = 0.4s)

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered
- Pre-existing TypeScript errors in MobileMenu.astro (null checks), LatestPieces.astro (Event type), and BaseLayout.astro (16 total) remain unchanged from before this plan. No new TS errors introduced by workshop.astro. Build completes cleanly.

## User Setup Required

**Web3Forms requires manual configuration before the workshop form works:**

1. Sign up at https://web3forms.com (free tier)
2. Create an access key for your domain
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `src/pages/workshop.astro` (line with `<input type="hidden" name="access_key" ...>`)
4. Verify: submit the form, check your email inbox for the inquiry

hCaptcha is enabled automatically by Web3Forms when you set `data-captcha="true"` — no separate hCaptcha account needed on the free tier.

## Next Phase Readiness
- /workshop page is live and accessible via nav on both desktop and mobile
- All 3 contact surfaces (ReservationFlow, FloatingContactButton, Footer) now show 3-channel model (Instagram DM + WhatsApp + Workshop)
- Phase 04-02 (Hospitality section expansion) can proceed independently — no blocking dependencies
- Web3Forms access key must be set before workshop form submissions route to inbox

---
*Phase: 04-workshop-hospitality*
*Completed: 2026-03-12*
