# Codebase Concerns

**Analysis Date:** 2026-03-12

## Missing Critical Features

**Contact/Reservation Form Not Implemented:**
- Problem: Multiple CTA links point to `#contact-form` anchor (FloatingContactButton, Footer, ReservationFlow) but no form component exists on the page
- Files: `src/components/FloatingContactButton.astro`, `src/components/Footer.astro`, `src/components/ReservationFlow.astro`, `src/pages/index.astro`
- Blocks: Users cannot submit reservations via form. Only Instagram DM and WhatsApp are functional fallbacks
- Priority: High - Complete the feature or remove all form CTA links
- Fix approach: Create `src/components/ReservationForm.astro` component and integrate into page, or audit all form references and remove dead links

**Newsletter Subscription Form Non-functional:**
- Problem: Footer subscribe button has `onsubmit="return false"` (line 56 in Footer.astro), preventing actual submission
- Files: `src/components/Footer.astro` (lines 56-59)
- Impact: Newsletter collection is completely disabled with no backend service or validation
- Priority: Medium - Either implement with service or remove UI entirely
- Fix approach: Integrate with email marketing service (Mailchimp, ConvertKit, etc.) or remove newsletter section

## TypeScript Issues (Pre-existing)

**Null/Type Safety Issues in MobileMenu.astro:**
- Problem: Script accesses `document.getElementById()` without null checks before usage in some code paths
- Files: `src/components/MobileMenu.astro` (lines 75-132)
- Impact: Not blocking build but runtime errors possible if DOM structure changes
- Mitigation: Current code uses optional chaining and conditional checks (e.g., `if (navToggle && mobileMenu)`)

**Null Safety in FloatingContactButton.astro:**
- Problem: Type casting with `e.target as Node` without prior existence validation (line 161)
- Files: `src/components/FloatingContactButton.astro` (line 161)
- Impact: Potential null reference at runtime
- Workaround: Null guards on container exist before use (lines 149-152)

**BaseLayout Script Type Issues:**
- Problem: Event handler and DOM manipulation lacks strict type checking for HTMLElement accessors
- Files: `src/layouts/BaseLayout.astro` (lines 88-171)
- Impact: Non-critical; code works but doesn't benefit from full TS safety

**Recommendation:** Run `npx astro check` to see full error list. Consider enabling stricter lint rules if migration plan exists.

## Security Considerations

**Hardcoded Phone/Username in Utils:**
- Issue: WhatsApp number and Instagram username are hardcoded in source
- Files: `src/utils/whatsapp.ts` (line 1), `src/utils/instagram.ts` (line 1)
- Current mitigation: Version control tracked, not in secrets
- Risk level: Low - public contact info, acceptable for marketing site
- Recommendation: No action needed (these are meant to be public)

**Missing Privacy Policy and Terms Links:**
- Problem: Footer links to `#` (placeholder) for Privacy Policy and Terms of Service (lines 66-67 in Footer.astro)
- Files: `src/components/Footer.astro` (lines 66-67)
- Impact: Legal compliance gap - could expose liability
- Priority: Medium - required before production
- Fix approach: Create `src/pages/privacy.astro` and `src/pages/terms.astro`, update footer links

**Open Graph Image Hardcoded Path:**
- Problem: All OG meta tags reference fixed image `/images/399x650-01.png` (line 36, 45 in BaseLayout.astro)
- Files: `src/layouts/BaseLayout.astro` (lines 36, 45)
- Impact: Product pages (if added) will show same hero image in social previews
- Priority: Low - acceptable for current static site
- Future consideration: Pass image per-page when product detail pages added

**Email Address in Footer Not Verified:**
- Problem: `mailto:hello@redcocoon.com` referenced but address not validated
- Files: `src/components/Footer.astro` (line 30, 50)
- Impact: Email delivery untested
- Recommendation: Verify email endpoint is monitored

## Performance Bottlenecks

**Large Inline Style Blocks and Animations:**
- Problem: Multiple components use heavy CSS-in-JS `<style>` blocks with animations (keyframes, transitions)
- Files: `src/components/Hero.astro` (210+ lines), `src/components/Footer.astro` (220+ lines), `src/layouts/BaseLayout.astro`
- Cause: No CSS extraction or optimization - all styles are component-scoped
- Impact: Minimal for static site but adds to page weight on initial load
- Improvement path: Consider extracting global animations to `src/styles/global.css` and reusing @keyframes

**Parallax Effect Performance:**
- Problem: Scroll-triggered transform on hero-visual on every scroll frame (BaseLayout.astro, line 119)
- Files: `src/layouts/BaseLayout.astro` (lines 88-130)
- Impact: Minor - RAF throttled but still recalculates on every scroll
- Current mitigation: RAF throttling in place, respects `prefers-reduced-motion`
- Improvement: Cache hero element reference and consider will-change CSS hint

**IntersectionObserver Threshold Configuration:**
- Problem: Fade-in animations use threshold 0.15 with rootMargin offset (BaseLayout.astro, line 150)
- Files: `src/layouts/BaseLayout.astro` (line 150)
- Impact: May cause visual jank if too many elements animate simultaneously
- Recommendation: Monitor on mobile devices; consider reducing animated element count

**Google Fonts Network Request:**
- Problem: Three font families loaded via Google Fonts link (DM Serif Display, Inter, Cormorant Garamond)
- Files: `src/layouts/BaseLayout.astro` (line 57)
- Impact: 3+ network requests for fonts (not preloaded, blocking render)
- Improvement path: Download fonts locally and serve from `/public/fonts/`, add font-display: swap

## Fragile Areas

**Mobile Menu and Navigation Cross-dependency:**
- Files: `src/components/MobileMenu.astro`, `src/components/Navbar.astro`, `src/layouts/BaseLayout.astro`
- Why fragile: Menu state managed via DOM class toggles; navToggle button (`#navToggle`) must exist for menu to work
- Risks: If Navbar component removed or navToggle ID changes, menu breaks silently
- Safe modification: Keep ID stable, add integration tests for open/close flow
- Test coverage: No unit/integration tests present

**Hardcoded Anchor Links in Components:**
- Files: All CTA components (FloatingContactButton, Footer, ReservationFlow, Navbar)
- Fragility: Links to sections `#shop`, `#collections`, `#studio`, etc. hardcoded; if section IDs change, navigation breaks
- Risks: Dead anchor links fail silently
- Safe modification: Create constants file with section IDs, import in all components
- Example: Move to `src/constants/sections.ts` with exports for SHOP_ID, COLLECTIONS_ID, etc.

**Footer Subscribe Button Without Backend:**
- Files: `src/components/Footer.astro` (lines 56-59)
- Fragility: Button exists but does nothing (`onsubmit="return false"`); user confusion if clicked
- Risk: Users think form works when it doesn't
- Safe modification: Either implement backend (API endpoint) or hide form entirely

**Image Path Dependencies:**
- Files: `src/layouts/BaseLayout.astro` (36, 45, 52), `src/components/Hero.astro` (18), Footer.astro (21)
- Fragility: Image paths hardcoded; if `/images/` directory structure changes, images break
- Risk: No fallback or error handling for missing images
- Safe modification: Add width/height attributes (already done on Hero), consider responsive srcset

## Scaling Limits

**Static Site Content Limitation:**
- Current capacity: All products loaded at build time from Content Collections
- Limit: Scaling to 100+ products will increase build time and page size
- Scaling path: When product count exceeds 50+, consider switching to SSR (output: 'server') or hybrid rendering (output: 'hybrid') with pagination

**No Dynamic Filtering/Search:**
- Problem: LatestPieces and product catalog show all items; no client-side filtering
- Impact: On slow networks, loading all product data is expensive
- Future path: Add client-side filter UI with Preact/Alpine or transition to dynamic rendering

**Vercel Static Adapter Dependency:**
- Current setup: Astro static output with Vercel adapter
- Risk: Tightly coupled to Vercel deploy pipeline
- Migration path: If self-hosting needed, adapter can be removed but build output remains static

## Dependencies at Risk

**Astro Framework at Risk (Minor):**
- Package: `astro@^5.17.1`
- Risk: Major version bump (5.x to 6.x) likely in future; check breaking changes
- Impact: May require UI component updates
- Migration plan: Regular dependency audits; test upgrade on branch before merging

**TypeScript Version Pinned to 5.9.3:**
- Package: `typescript@^5.9.3`
- Risk: If TS 6.x released with breaking changes, unforeseen type errors
- Current mitigation: Caret allows patch upgrades; major versions must be manual
- Recommendation: Monitor TS changelog quarterly

**Minimal Dependency Footprint (Strength):**
- Current deps: Only Astro, TypeScript, @astrojs/vercel, @astrojs/check
- No UI framework bloat (no React, Vue, Svelte)
- Risk level: Very low overall

## Test Coverage Gaps

**No Unit Tests:**
- What's not tested: Utility functions (`whatsapp.ts`, `instagram.ts`, `format.ts`)
- Files: `src/utils/*.ts`
- Risk: URL encoding, message formatting logic untested; edge cases like special characters in product names
- Priority: Medium - add at least snapshot tests for URL generation

**No Integration Tests:**
- What's not tested: Navigation flow (open menu → click link → scroll to anchor)
- Files: `src/components/MobileMenu.astro`, `src/layouts/BaseLayout.astro`
- Risk: Refactors to scroll behavior or menu logic could break navigation without detection
- Priority: Medium - create Playwright E2E tests for main user flows

**No Component Tests:**
- What's not tested: ReservationFlow, ProductCard, FloatingContactButton interactions
- Files: `src/components/*.astro`
- Risk: Visual regressions, broken affordances not caught
- Priority: Low for MVP (site is pre-launch)

**No Build Verification:**
- What's not tested: Production build succeeds, static output includes all expected files
- Current mitigation: CI/CD on Vercel automatically builds on push
- Recommendation: Add GitHub Actions to verify `npm run build` passes

## Unused or Deprecated Code

**WhatsAppButton Component Exists but Unused:**
- Files: `src/components/WhatsAppButton.astro` (52 lines)
- Status: Not imported in any page or layout; appears to be replaced by multi-channel CTAs
- Action: Remove to reduce codebase clutter, or document why kept

**Unimplemented Form ID References:**
- Problem: Form helpers in `src/utils/whatsapp.ts` define `getQuoteLink()` but no hospitality quote form exists on page
- Files: `src/utils/whatsapp.ts` (lines 13-16)
- Impact: Dead code; misleading API
- Action: Remove if no hospitality page planned, or implement hospitality section with quote form

## Accessibility Concerns

**Missing Alt Text on Some Decorative Elements:**
- Problem: Some `aria-hidden="true"` decorative elements (hero-circle, hero-bg) have no fallback text for screen readers
- Files: `src/components/Hero.astro` (lines 2-3, 54-68)
- Current state: Marked correctly as hidden, acceptable
- Recommendation: Audit all aria-hidden usage; verify visually important elements have alt text

**Fixed Position Mobile FAB Overlap:**
- Problem: FloatingContactButton fixed position (bottom: 80px) may overlap BottomTabBar
- Files: `src/components/FloatingContactButton.astro` (line 26), `src/layouts/BaseLayout.astro` (line 180)
- Risk: z-index conflict; FAB may disappear behind tab bar
- Fix: Coordinate z-indices and spacing; test on mobile

**Focus Management in Mobile Menu:**
- Current implementation: Focus trap in place (MobileMenu.astro, lines 117-131)
- Status: Good - ESC key closes, focus returns to trigger
- Recommendation: Continue testing with keyboard-only navigation

## Maintenance Concerns

**No Linting or Format Config Documentation:**
- Problem: No `.eslintrc`, `.prettierrc`, or equivalent in repo
- Files: Root directory lacks config
- Impact: Inconsistent code style across contributions
- Recommendation: Add `.prettierrc.json` (existing Prettier setup) and `.eslintrc.json` (Astro recommended rules)

**No Build or Deploy Documentation:**
- Problem: README or deployment guide not found
- Impact: New contributors unclear on build process, deployment steps
- Recommendation: Create `DEPLOYMENT.md` with Vercel setup, environment vars, build commands

**No Component Storybook or Documentation:**
- Problem: Component variants and props not documented
- Impact: Hard to reuse components; knowledge silos
- Current workaround: All components single-purpose, rarely reused
- Recommendation: Not critical for current size, add if component library grows

## Known Limitations Accepted for MVP

**Instagram Feed Static:**
- Implementation: Placeholder images only, no API integration
- Reason: Instagram API access complex; static adequate for launch
- Future consideration: Integrate when Instagram API credentials available

**No Cart/Checkout:**
- Design: All purchases via WhatsApp/Instagram DM (WhatsApp-first now Instagram-DM-first per memory)
- Reason: Manual fulfillment acceptable for handmade studio
- Scalability: If demand grows, revisit Shopify/Stripe integration

**No Inventory Tracking:**
- Design: Piece codes in product metadata but no stock management in UI
- Current approach: `stock` field in schema (line 22 in config.ts) defined but unused in templates
- Impact: Manual update required; shows in cart flow but not enforced in reserve flow
- Recommendation: If stock tracking needed, implement inventory system backend

---

*Concerns audit: 2026-03-12*
