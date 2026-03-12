---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: planning
stopped_at: Completed 05-02-PLAN.md Task 1; awaiting Task 2 human-verify checkpoint
last_updated: "2026-03-12T11:24:35.454Z"
last_activity: 2026-03-12 — Roadmap created
progress:
  total_phases: 5
  completed_phases: 5
  total_plans: 12
  completed_plans: 12
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-12)

**Core value:** People see the pottery, feel the craft quality, and reach out to inquire — beautiful showcase AND inquiry driver
**Current focus:** Phase 1 — Critical Fixes

## Current Position

Phase: 1 of 5 (Critical Fixes)
Plan: 0 of 1 in current phase
Status: Ready to plan
Last activity: 2026-03-12 — Roadmap created

Progress: [░░░░░░░░░░] 0%

## Performance Metrics

**Velocity:**
- Total plans completed: 0
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**
- Last 5 plans: —
- Trend: —

*Updated after each plan completion*
| Phase 01-critical-fixes P01 | 2 | 2 tasks | 4 files |
| Phase 02-visual-redesign-foundation P01 | 3 | 3 tasks | 3 files |
| Phase 02-visual-redesign-foundation P02 | 4min | 3 tasks | 8 files |
| Phase 02-visual-redesign-foundation P03 | 4min | 1 tasks | 18 files |
| Phase 02-visual-redesign-foundation P03 | 15min | 2 tasks | 18 files |
| Phase 03-gallery-products P01 | 3min | 2 tasks | 8 files |
| Phase 03-gallery-products P02 | 3min | 2 tasks | 5 files |
| Phase 03-gallery-products P03 | 3min | 2 tasks | 4 files |
| Phase 03-gallery-products P04 | 10min | 1 tasks | 3 files |
| Phase 04-workshop-hospitality P02 | 1min | 1 tasks | 1 files |
| Phase 04-workshop-hospitality P01 | 3min | 2 tasks | 6 files |
| Phase 05-performance-seo P01 | 15min | 2 tasks | 6 files |
| Phase 05-performance-seo P02 | 45 | 1 tasks | 5 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Keep DM-first reservation model — avoids e-commerce complexity
- Workshop as inquiry form (not calendar booking) — manual follow-up fits workflow
- Build on existing Astro foundation — solid base, no reason to start over
- Gallery by collection — focus on purchasable pieces
- [Phase 01-critical-fixes]: Orphaned CSS classes (.channel-form, .floating-form, .btn-ghost, .hospitality-ghost) preserved when form anchors removed — Phase 4 can restore form link with zero CSS changes
- [Phase 01-critical-fixes]: FloatingContactButton retains 2-option popup (IG DM + WA) — user decision to keep mini-menu, not simplify to single link
- [Phase 02-visual-redesign-foundation]: Variable font CSS family names: 'Cormorant Garamond Variable' and 'Inter Variable' — must match @fontsource-variable registration in CSS custom properties
- [Phase 02-visual-redesign-foundation]: --text-base changed from 0.92rem to 1rem (VIS-04 locked decision)
- [Phase 02-visual-redesign-foundation]: DM Serif Display uses non-variable @fontsource package (400/400-italic) — no variable axes needed for display-only heading font
- [Phase 02-visual-redesign-foundation]: Hero changed from dark gradient to cream background per VIS-01 locked decision (overrides CLAUDE.md legacy note)
- [Phase 02-visual-redesign-foundation]: Noise overlay uses aria-hidden div (not CSS pseudo-element) to avoid z-index stacking issues with container children
- [Phase 02-visual-redesign-foundation]: Images COPIED to src/assets/ (not moved) — public/ originals remain for content collection string refs until Phase 3
- [Phase 02-visual-redesign-foundation]: imageMap pattern (Record<string, ImageMetadata>) used for Process and InstagramFeed — Astro Image requires static imports, not runtime string interpolation
- [Phase 02-visual-redesign-foundation]: Hero preload link removed from BaseLayout — Astro Image with loading=eager handles above-fold rendering; old path no longer valid after WebP conversion
- [Phase 02-visual-redesign-foundation]: Images COPIED to src/assets/images/ (not moved) — public/ originals remain for content collection string refs until Phase 3
- [Phase 02-visual-redesign-foundation]: imageMap pattern (Record<string, ImageMetadata>) used for Process and InstagramFeed — Astro Image requires static imports, not runtime string interpolation
- [Phase 02-visual-redesign-foundation]: Hero preload link removed from BaseLayout — Astro Image with loading=eager handles above-fold rendering; old /images/399x650-01.png path no longer valid after WebP conversion
- [Phase 03-gallery-products]: madeToOrder uses schema default(false) — existing product files need no change, only MTO examples set it explicitly
- [Phase 03-gallery-products]: enamel-vase and wall-decor-plate chosen as MTO examples — non-featured items from different collections for filter testing variety
- [Phase 03-gallery-products]: mugs-fatured-image.jpg filename typo preserved — matches existing product frontmatter references
- [Phase 03-gallery-products]: product.id in Astro 5 legacy type:content includes .md extension — strip with .replace(/\.md$/, '') for clean /shop/[slug] URLs
- [Phase 03-gallery-products]: GalleryGrid uses inline card markup not ProductCard — ProductCard uses plain img, would bypass Astro Image WebP optimization
- [Phase 03-gallery-products]: GLightbox href points to public/ image path for lightbox overlay; Astro Image handles WebP for visible img
- [Phase 03-gallery-products]: Related products in More from this collection use inline card markup not ProductCard — consistent with GalleryGrid approach
- [Phase 03-gallery-products]: CommissionCTA shown only when isSold && isMTO — plain sold-out shows sold notice; available shows reserve CTAs
- [Phase 03-gallery-products]: Placeholder maker copy flagged with italic note inside AboutMaker.astro — signals real content needed before launch
- [Phase 03-gallery-products]: Espresso background on AboutMaker section maintains alternating light/dark rhythm following the cream gallery section
- [Phase 04-workshop-hospitality]: Email CTA uses pre-existing .hospitality-ghost CSS class (already defined in component) — no new button styles needed
- [Phase 04-workshop-hospitality]: Hospitality service bullets use specific product language to help hotel buyers picture the product offering
- [Phase 04-workshop-hospitality]: Web3Forms access_key placeholder used in workshop.astro — real key required before launch
- [Phase 04-workshop-hospitality]: hospitality-ghost styles duplicated in Footer scoped style block — Astro scoping prevents cross-component class sharing
- [Phase 04-workshop-hospitality]: External CDN scripts require is:inline attribute in Astro to prevent bundler interference
- [Phase 05-performance-seo]: Default OG image uses Bowls5.jpg (99KB JPEG) not 399x650-01.png (397KB PNG) — WhatsApp 300KB crawler limit
- [Phase 05-performance-seo]: LocalBusiness schema replaces Organization — enables Google Rich Results with address, hours, phone fields; TODO placeholders marked for pre-launch
- [Phase 05-performance-seo]: Product JSON-LD in body (not head slot) — BaseLayout has no head slot, Google reads body JSON-LD fine
- [Phase 05-performance-seo]: fetchpriority='high' on hero image targets 71% of LCP Render Delay confirmed by lcp-discovery-insight audit
- [Phase 05-performance-seo]: GLightbox retained — data confirms identical Vercel scores with/without it; not a performance bottleneck
- [Phase 05-performance-seo]: GLightbox retained — data confirms identical Vercel scores with/without it; not a performance bottleneck
- [Phase 05-performance-seo]: DM Serif Display italic removed — confirmed unused (all italic CSS uses --font-elegant, never --font-serif)

### Pending Todos

None yet.

### Blockers/Concerns

- Phase 3: GLightbox maintenance status should be verified at implementation time (last npm publish over 1 year ago per research). Fallback: LiteLight or CSS-only zoom.
- Phase 4: Web3Forms hCaptcha must be confirmed available on free tier before implementation. Fallback: Formspree with honeypot.
- Phase 4: Hospitality scope decision needed — full /hospitality page vs. anchor in existing page. Content (photography, copy) takes longer than development.
- Phase 2/3: Astro experimental Fonts API had breaking syntax change in 5.17.0. Do not block redesign if it causes build issues — use @fontsource fallback.

## Session Continuity

Last session: 2026-03-12T11:24:35.443Z
Stopped at: Completed 05-02-PLAN.md Task 1; awaiting Task 2 human-verify checkpoint
Resume file: None
