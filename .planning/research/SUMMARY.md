# Project Research Summary

**Project:** Redcocoon Website — v2 Milestone (Gallery, Workshop, Visual Redesign)
**Domain:** Studio pottery / artisan ceramics — inquiry-driven, DM-first static site
**Researched:** 2026-03-12
**Confidence:** HIGH

## Executive Summary

Redcocoon is a handmade pottery studio in Colombo, Sri Lanka, operating an inquiry-driven model where the conversion event is "visitor sends an Instagram DM", not "visitor completes a checkout." This fundamentally shapes every decision: visual impact and frictionless inquiry paths outrank feature breadth, and the existing Astro 5 static architecture is exactly right for the business model. The v2 milestone adds three things the site critically lacks: a browsable full gallery (currently only 3 featured pieces are visible), a working workshop inquiry form (the existing #contact-form anchor goes nowhere), and a cohesive visual redesign that elevates the craft narrative to match the product quality.

The recommended approach preserves the zero-framework constraint and extends the existing token-based CSS system rather than replacing it. New additions are purposefully minimal: GLightbox (11KB, no framework) for lightbox, Web3Forms (free API, no npm package) for the workshop form, and Astro's built-in `<Image />` component for gallery image optimization. The gallery filtering pattern — build-time HTML embedding with `data-*` attributes and vanilla JS show/hide — is the established Astro static approach and requires no new dependencies. All new pages (`/shop`, `/shop/[slug]`, `/workshop`) follow the existing Astro Content Collections pattern already in the codebase.

The two highest-risk items are both fixable before new features are built. First: two live broken links in the current site (`#contact-form` resolves to nothing; `/hospitality` returns 404) must be patched immediately. Second: the visual redesign must establish CSS token governance and a WebP image pipeline before the gallery page is built, or those problems multiply across 30+ product images. Build order matters: redesign foundation first, then gallery, then workshop form. This sequence avoids rework and ensures every new page benefits from the finalized design system.

---

## Key Findings

### Recommended Stack

The existing stack (Astro 5.17.1, TypeScript, Vercel, vanilla JS, plain CSS) requires no replacement — only targeted additions. Astro's built-in `<Image />` and `<Picture />` components from `astro:assets` handle WebP conversion and responsive `srcset` at build time with no extra packages. GLightbox 3.3.1 is the right lightbox choice: pure JS (no jQuery), MIT license, 11KB gzipped, and imports cleanly into an Astro `<script>` tag. Web3Forms replaces the Formspree reference in the architecture docs as the preferred form backend — free tier covers 250 submissions/month with hCaptcha spam protection and no credit card required. The Astro experimental Fonts API (available at Astro 5.17+, already on this version) can self-host Google Fonts at build time, eliminating the 200–300ms CDN round-trip; if it proves unstable during development, `@fontsource` npm packages are the clean fallback.

**Core technologies (additions only):**
- GLightbox 3.3.1 — gallery lightbox — 11KB pure JS, no framework, MIT, keyboard/touch/zoom
- Web3Forms API — workshop inquiry form — free 250/month, hCaptcha included, zero npm package
- Astro `<Image />` / `<Picture />` — image optimization — built into `astro:assets`, no extra install
- CSS `column-count` masonry — gallery layout — zero JS, full browser support (native CSS masonry is Chrome 140+ only, not production-safe)
- Astro experimental Fonts API — self-hosted fonts — eliminates Google Fonts CDN request, available at current version
- Vanilla JS `data-filter` pattern — gallery filtering — no library needed for 12–50 products

**Version notes:**
- The Astro experimental Fonts API had a breaking syntax change in 5.17.0 — use `fontProviders.google()` function syntax, not the old `{ entrypoint }` object
- GLightbox activity is worth verifying at implementation time (last npm publish was over a year ago per the source note)
- CSS native masonry (`grid-template-rows: masonry`) is Chrome 140+ only as of March 2026 — do not use

### Expected Features

The three audiences (local collectors, hospitality/B2B clients, international pottery lovers) each have distinct needs, but the overriding principle is: visual impact and frictionless inquiry paths outrank everything else. The piece code system (RC-EM-042) is a genuine differentiator — no competitor reviewed uses human-readable codes on the product card itself — and should be made more prominent, not treated as a metadata detail.

**Must have (table stakes):**
- Full gallery page browsable by collection — the biggest missing page; only 3 featured pieces are visible today
- Stock status on every card — "Available" / "Sold" / "Made to Order" — prevents wasted DM exchanges
- Made to Order conditional CTA — converts sold-out views into commission inquiries instead of dead ends
- Workshop inquiry form — closes the broken #contact-form anchor; captures the teaching-interested audience
- About the maker section — trust-building is non-negotiable for handmade goods; currently absent
- International shipping clarity — one paragraph near ReservationFlow unlocks the largest potential market
- Mobile-responsive inquiry flow with 44px+ touch targets — over 60% of Instagram referral traffic is mobile
- Image optimization (WebP, lazy load, correct sizing) — non-negotiable for international load times

**Should have (differentiators):**
- Hospitality/B2B dedicated section with separate inquiry path — high order value, currently a stub with a broken link
- Piece code badge made prominent — a real competitive differentiator; reinforce visually on ProductCard
- Pre-filled DM messages with piece code — already built via `getInstagramDMLink()`; verify consistency everywhere
- Earthy, warm visual redesign — the existing foundation is correct directionally; needs execution
- Process section with real photography — converts skeptics into buyers by justifying handmade premium
- Ambient CSS texture in hero/sections — differentiates from Squarespace templates at low implementation cost
- LKR price with currency context — international visitors need to self-qualify before DM-ing

**Defer to v2.x / v3+:**
- Image lightbox — valuable only after multi-angle photography exists; pointless before photo quality improves
- Process section expansion — depends on potter providing photography assets
- Structured data / schema.org audit — SEO enhancement, finalize after design is stable
- Commission intake form — only if commission volume grows beyond what DM handles
- Shopping cart, calendar booking, real-time stock, live Instagram API feed, blog — explicitly out of scope per feature research anti-features analysis

### Architecture Approach

The site follows a clean build-time-first Astro pattern: Content Collections (`products/*.md` with Zod schema) feed `getCollection()` calls in component frontmatter, all product data is embedded as static HTML at build time, and vanilla JS handles any runtime interactivity by reading `data-*` attributes. Three new pages are needed (`/shop`, `/shop/[slug]`, `/workshop`) and two new components (`GalleryGrid.astro`, `WorkshopForm.astro`). No changes to the routing or layout architecture are required — new pages slot into the existing `BaseLayout.astro` pattern.

**Major components:**
1. `GalleryGrid.astro` (new) — renders all products with `data-category` / `data-collection` attributes; embeds vanilla JS filter toggle; wraps `FilterBar.astro`
2. `FilterBar.astro` (new) — presentational filter pill buttons; stateless at build; driven by GalleryGrid's script at runtime
3. `WorkshopForm.astro` (new) — HTML form posting to Web3Forms API via `fetch`; includes honeypot spam protection; progressive enhancement (works without JS via plain POST)
4. `src/pages/shop.astro` (new) — gallery page; uses `getCollection('products')` directly; hooks up "View All" from LatestPieces
5. `src/pages/workshop.astro` (new) — workshop inquiry landing page with SEO title for deep-linking from social
6. `global.css` (extend) — all redesign changes go through CSS custom property tokens; never hardcode values that belong in `:root`

**Build order (dependency-driven):**
1. Content schema additions (`madeToOrder: boolean`, any new fields) — all 12 existing `.md` files need updating before new components reference them
2. Visual redesign foundation — CSS token audit, WebP image pipeline, touch target fixes, font loading — must precede gallery build
3. Gallery page (`shop.astro` + `GalleryGrid` + `FilterBar`) — depends on stable design system and schema
4. Individual product pages (`shop/[slug].astro`) — can parallel with or follow gallery
5. Workshop form (`WorkshopForm.astro` + `workshop.astro`) — independent of gallery; close the `#contact-form` broken anchor immediately

### Critical Pitfalls

1. **Redesign breaks the CSS token system** — The existing `global.css` has 25+ color tokens, 9 spacing tokens, 3 font-stack tokens. Any hardcoded hex values in new component `<style>` blocks create a parallel system that diverges visually and makes global changes laborious. Prevention: audit tokens before redesign begins; reject any value that appears in more than one file without a token.

2. **Unoptimized images kill international load times** — Current `<img src="/images/...">` tags bypass Astro's build-time image processor. With 12 products this is borderline; with 30+ gallery images, raw JPEGs from a camera (3-8MB each) make the gallery page unusable on mobile. Prevention: migrate to Astro `<Image />` and store images in `src/assets/` (not `public/`) before building the gallery.

3. **Two live broken links exist in the current build** — `#contact-form` in ReservationFlow resolves to no element, and `/hospitality` linked from the Hospitality section returns 404. Both must be patched before any new work ships. Prevention: fix `#contact-form` by adding a temporary mailto fallback or removing the badge; change `/hospitality` link to `#hospitality` anchor until the page is built.

4. **Gallery filter accessibility** — The most common filter implementation uses `opacity: 0` or `visibility: hidden` for "hidden" items, which leaves them in the screen reader DOM. Prevention: use `display: none` for filtered cards; wrap filter state changes with an `aria-live="polite"` announcement region; implement filter buttons as `<button>` elements, not `<div>` or `<span>`.

5. **Mobile touch targets below 44px on the inquiry funnel** — The most conversion-critical elements (DM/WhatsApp/Form badges in ReservationFlow, ProductCard CTAs) are currently ~28-30px tall. Apple HIG and Material both specify 44px minimum. Prevention: set `min-height: 44px` on all inquiry CTAs in the visual redesign pass and verify on a real phone before calling any phase complete.

6. **Google Fonts FOUT and extra round-trip** — No `font-display: swap` in the current Google Fonts URL; no `rel="preconnect"` to `fonts.gstatic.com`. On slow international connections this causes invisible heading text (FOIT) and adds 200-300ms to first paint. Prevention: add `&display=swap` to the Fonts URL and preconnect hints in BaseLayout; ideally switch to Astro experimental Fonts API during the redesign pass.

---

## Implications for Roadmap

Based on research, the dependency graph points clearly to three sequential phases with a patch step at the start.

### Phase 0: Critical Fixes (pre-phase, ship immediately)
**Rationale:** Two broken links (`#contact-form`, `/hospitality`) exist in the current deployed site. These must be patched before any new milestone work begins to avoid live 404s compounding during development.
**Delivers:** Clean slate — no broken links in production; form badge has a temporary fallback
**Addresses:** Pitfall 4 (broken contact anchor), Security/UX pitfall (live `/hospitality` 404)
**Effort:** Under 2 hours; change `/hospitality` to `#hospitality` anchor; change "Form" badge to temporary `mailto:` link
**Research flag:** None — trivial fixes, no research needed

### Phase 1: Visual Redesign Foundation
**Rationale:** FEATURES.md is explicit: "Visual redesign should come before new pages — building a Gallery Page on top of an unresolved design system creates rework." ARCHITECTURE.md confirms the additive component enhancement pattern. PITFALLS.md maps 4 of 6 critical pitfalls to this phase (CSS tokens, image pipeline, touch targets, font loading). This phase sets the rules all subsequent phases follow.
**Delivers:** Stable design system with audited tokens; WebP image pipeline via `<Image />`; 44px touch targets site-wide; `font-display: swap` + optional self-hosted fonts; earthy visual identity across all existing sections
**Addresses:** Gallery grid browsability (existing LatestPieces improved), About/story section, ambient texture, stock status badges, international shipping note in ReservationFlow
**Uses:** Astro `<Image />` / `<Picture />` (built-in), Astro experimental Fonts API or `@fontsource` fallback, CSS `column-count` for masonry
**Avoids:** CSS token divergence (Pitfall 1), image pipeline debt (Pitfall 3), touch target failures (Pitfall 5), font FOUT (Pitfall 6)
**Research flag:** Standard patterns — no additional research needed; Astro `<Image />` docs are HIGH confidence

### Phase 2: Gallery Page with Collection Filtering
**Rationale:** The gallery is the biggest missing page and the primary driver of inquiry from Instagram referrals. It must be built on the stable design system from Phase 1 — not before. The filtering pattern (build-time `data-*` attributes + vanilla JS) is the established Astro static approach and requires no new dependencies beyond GLightbox.
**Delivers:** `/shop` page with all products, collection-based filter pills, "no results" empty state, optional lightbox, individual product pages (`/shop/[slug]`)
**Addresses:** Gallery browsable by collection (table stakes), lightbox/zoom (P2 after photo quality improves), international pricing clarity (LKR context), stock status visible on all cards, Made to Order CTA (requires `madeToOrder` schema field)
**Uses:** GLightbox 3.3.1 (`npm install glightbox`), vanilla JS `data-filter` pattern, Astro `getCollection('products')`, CSS `column-count` masonry
**Implements:** `GalleryGrid.astro`, `FilterBar.astro`, `src/pages/shop.astro`, `src/pages/shop/[slug].astro`
**Avoids:** Gallery filter accessibility (Pitfall 2 — use `display: none` + `aria-live`), fetch-at-runtime anti-pattern, separate-route-per-category anti-pattern
**Research flag:** Standard patterns — HIGH confidence on all components; no additional research needed

### Phase 3: Workshop Inquiry Form + Hospitality Expansion
**Rationale:** The workshop form is independent of the gallery but closes the critical `#contact-form` broken anchor. The Hospitality section expansion logically pairs here — both involve inquiry forms or structured CTAs for distinct audiences (workshop seekers, B2B clients). Web3Forms is the correct form backend for Vercel-hosted static sites.
**Delivers:** `/workshop` page with name/email/message form posting to Web3Forms; spam protection via hCaptcha; inline success/error state; Hospitality section expanded with B2B-tailored WhatsApp message and (optionally) `/hospitality` page or anchor
**Addresses:** Workshop inquiry (P1 differentiator), hospitality B2B section (P1 — high order value audience), broken `#contact-form` anchor (critical), spam protection
**Uses:** Web3Forms API (no npm install), vanilla JS `fetch` POST with `FormData`, honeypot field pattern
**Implements:** `WorkshopForm.astro`, `src/pages/workshop.astro`, expanded `Hospitality.astro`
**Avoids:** Form without JS fallback (keep `action` attribute — Pitfall 4 recovery), silent form spam drops (honeypot required), Formspree 50-submission limit (use Web3Forms 250/month instead)
**Research flag:** Standard patterns — Web3Forms and Formspree are both well-documented; no additional research needed

### Phase 4: SEO, Performance Audit, and Launch Readiness
**Rationale:** After all pages exist and the design is stable, a final audit pass ensures the site is ready for international visitors. Structured data, OG images per product, and Lighthouse performance verification are all low-development-effort but need all pages to exist first.
**Delivers:** LocalBusiness + Product schema.org markup, OG image per product page, Lighthouse performance score ≥ 85 on mobile, verified touch targets across all new pages, final content pass (About section, process copy, international shipping note)
**Addresses:** SEO basics (table stakes), OG image per product (table stakes), structured data (P2)
**Research flag:** May benefit from a focused research pass on schema.org pottery/artisan structured data — LOW confidence on exact markup; all other items are standard patterns

### Phase Ordering Rationale

- **Fixes before features:** The live broken links are a reputational risk; patch them before building anything new.
- **Design system before new pages:** FEATURES.md, ARCHITECTURE.md, and PITFALLS.md all independently reach the same conclusion — a stable token and image system must precede gallery build to avoid cascading rework.
- **Gallery before workshop:** Gallery is the higher-value page (drives DM inquiries from Instagram referrals); workshop serves a secondary audience. Independence of the workshop form means it could theoretically parallel Phase 2 if resources allow, but sequential is cleaner.
- **Audit last:** Schema.org and Lighthouse verification require all pages to exist; this cannot move earlier.

### Research Flags

Phases needing deeper research during planning:
- **Phase 4 (SEO audit):** Specific schema.org markup for pottery/artisan products (Product + LocalBusiness intersection) — LOW confidence on exact implementation; needs a focused research pass before implementation

Phases with standard patterns (skip additional research):
- **Phase 0:** Trivial HTML edits — no research needed
- **Phase 1:** Astro `<Image />` docs are HIGH confidence; CSS token patterns are well-established
- **Phase 2:** GLightbox + vanilla JS filter are HIGH confidence; Astro `getCollection` is HIGH confidence
- **Phase 3:** Web3Forms + honeypot pattern are HIGH confidence; Formspree is a documented fallback

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM-HIGH | Core choices verified against official docs. GLightbox activity warrants a check at implementation time (last npm publish over a year ago). Astro experimental Fonts API syntax verified against GitHub issues. Web3Forms pricing HIGH confidence from official pricing page. |
| Features | HIGH (table stakes), MEDIUM (differentiators) | Table stakes verified against ceramics field guides and competitor analysis (Kevala, Laima, Hammerly, Heath). Differentiator value is expert judgment with supporting comparisons — not quantified conversion data. |
| Architecture | HIGH | Existing codebase is primary source. Patterns verified against Astro 5 official docs and community. All components are extensions of patterns already proven to work in this codebase. |
| Pitfalls | MEDIUM | Most pitfalls verified across multiple sources. Some items (touch target sizes, FOUT timing) are from authoritative specs (Apple HIG, Lighthouse). Broken links confirmed by direct codebase inspection. |

**Overall confidence:** HIGH

### Gaps to Address

- **GLightbox maintenance status:** The STACK.md source note flags that GLightbox's last npm publication was over a year ago. At implementation time, verify the GitHub repository shows active issues being addressed. If the project appears abandoned, LiteLight (<10KB) or a CSS-only zoom approach are acceptable fallbacks for a 12-50 product gallery.
- **Web3Forms vs. Formspree:** ARCHITECTURE.md references Formspree in code examples; STACK.md recommends Web3Forms. Both work; the decision is Web3Forms for the higher free-tier limit (250 vs. 50 submissions/month). Confirm at implementation that Web3Forms hCaptcha integration is enabled on the free tier — if spam protection requires a paid plan, revert to Formspree with a honeypot field.
- **Astro experimental Fonts API stability:** Marked as experimental with a breaking syntax change in 5.17.0. If it causes build failures during development, the `@fontsource` npm fallback is documented in STACK.md. Do not block redesign work on the experimental API.
- **Hospitality page scope:** PITFALLS.md flags `/hospitality` as a live 404. Whether this becomes a full page or an anchor in Phase 3 should be decided before that phase begins — the content task (photography, copy) takes longer than the development task.
- **Photography assets:** The process section expansion and lightbox are marked P2 because their value depends on multi-angle product photography that doesn't currently exist. The roadmap should flag these as content-blocked, not development-blocked.

---

## Sources

### Primary (HIGH confidence)
- Existing codebase (`src/components/`, `src/content/`, `src/styles/global.css`) — component responsibilities, broken links, CSS token inventory
- Astro 5 Content Collections docs — `getCollection()`, static paths, build-time data embedding
- Astro `astro:assets` image docs — `<Image />`, `<Picture />`, Sharp default processor, `@astrojs/image` deprecation
- Astro experimental Fonts API docs + GitHub issue #15515 — provider syntax for 5.17+, breaking change confirmed
- Web3Forms pricing page — free tier 250/month, hCaptcha, no credit card
- MDN — CSS native masonry browser support (Chrome 140+ only)

### Secondary (MEDIUM confidence)
- Ceramics Field Guide, Starter Story (23 ceramics designs), competitor sites (Kevala, Laima, Hammerly, Heath) — feature expectations and competitor patterns
- Fontsource npm pages — package names, variable font availability
- GLightbox GitHub — version 3.3.1, MIT, 11KB; maintenance status to verify at implementation
- Medium/talent500 — Google Fonts FOUT/FOIT patterns; self-hosted 200-300ms faster claim
- Netlify Forms docs — honeypot behavior, silent spam drops
- Formspree Vercel integration docs — zero-backend form patterns
- Raw Studio, Brainiac Media — form UX conversion and redesign mistakes

### Tertiary (LOW confidence)
- Schema.org structured data for pottery/artisan e-commerce — needs a dedicated research pass before Phase 4

---
*Research completed: 2026-03-12*
*Ready for roadmap: yes*
