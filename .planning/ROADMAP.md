# Roadmap: Redcocoon Website v2

## Overview

Starting from a working Astro 5 foundation, this milestone adds the three capabilities the site critically lacks — a browsable full gallery, a working workshop inquiry form, and a cohesive visual redesign — while first patching two live broken links. Each phase delivers a coherent, verifiable capability on top of the previous. The dependency order is non-negotiable: fixes before redesign, redesign before new pages, new pages before SEO audit.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Critical Fixes** - Patch two live broken links before building anything new (completed 2026-03-11)
- [x] **Phase 2: Visual Redesign Foundation** - Establish the design system, image pipeline, and typography that all new pages inherit (completed 2026-03-12)
- [ ] **Phase 3: Gallery & Products** - Full browsable product gallery with collection filtering, individual product pages, and international context
- [ ] **Phase 4: Workshop & Hospitality** - Workshop inquiry form and expanded B2B hospitality section
- [ ] **Phase 5: Performance & SEO** - Lighthouse audit, structured data, and OG images across all pages

## Phase Details

### Phase 1: Critical Fixes
**Goal**: Two live broken links are patched so the current site has no dead ends before new milestone work begins
**Depends on**: Nothing (first phase)
**Requirements**: FIX-01, FIX-02
**Success Criteria** (what must be TRUE):
  1. Clicking the "Form" / reservation form CTA in ReservationFlow navigates to a real target (not a missing anchor)
  2. Clicking any Hospitality navigation link returns a valid page or section (not a 404)
  3. The deployed site at redcocoon-website.vercel.app has no broken internal navigation links
**Plans**: 1 plan

Plans:
- [x] 01-01: Remove broken #contact-form anchors and consolidate Hospitality CTA

### Phase 2: Visual Redesign Foundation
**Goal**: Users experience a warm, earthy visual identity across every section, with audited CSS tokens, self-hosted fonts, optimized images, and 44px touch targets site-wide
**Depends on**: Phase 1
**Requirements**: VIS-01, VIS-02, VIS-03, VIS-04, VIS-05, VIS-06, VIS-07
**Success Criteria** (what must be TRUE):
  1. Every section on the homepage reads as warm and earthy — terracotta, cream, espresso, and sage are used cohesively with no visual jarring
  2. All text is legible at hierarchy: headings, accents, and body copy are visually distinct and appropriately sized on mobile
  3. Every CTA button and inquiry link is at least 44px tall and tappable without precision on a phone screen
  4. Fonts load instantly with no invisible-text flash (FOIT) — headings appear on first paint via font-display swap
  5. Page backgrounds and hero use subtle visual depth (CSS texture, noise, or gradient) that distinguishes the site from generic templates
**Plans**: 3 plans

Plans:
- [ ] 02-01-PLAN.md — CSS token audit, font self-hosting via @fontsource, typography scale update
- [ ] 02-02-PLAN.md — Section backgrounds, spacing rhythm, touch targets, card shadows
- [ ] 02-03-PLAN.md — Image pipeline migration to Astro Image + visual checkpoint

### Phase 3: Gallery & Products
**Goal**: Users can browse, filter, and inspect all products on a dedicated gallery page, and reach out to inquire on any piece — including sold-out pieces via a commission path
**Depends on**: Phase 2
**Requirements**: GAL-01, GAL-02, GAL-03, GAL-04, GAL-05, GAL-06, GAL-07, GAL-08, ABOUT-01, INTL-01
**Success Criteria** (what must be TRUE):
  1. A visitor can navigate to /shop and see all available products displayed with imagery, piece codes, and stock status
  2. A visitor can click a filter pill (e.g., "Earthy Matte") and see only products from that collection — other products hide
  3. A visitor can click any product and arrive on a dedicated page (/shop/[slug]) with full details and a DM-to-reserve CTA
  4. A visitor viewing a sold-out Made to Order piece sees a commission inquiry CTA instead of a dead "Sold" state
  5. An international visitor can find clear information about international shipping or inquiry near the reservation flow
**Plans**: TBD

Plans:
- [ ] 03-01: Content schema additions (madeToOrder field) and product MD updates
- [ ] 03-02: GalleryGrid and FilterBar components + /shop page
- [ ] 03-03: Individual product pages (/shop/[slug]) with lightbox
- [ ] 03-04: About section and international shipping note

### Phase 4: Workshop & Hospitality
**Goal**: Users can submit a workshop inquiry through a working form, and hospitality clients see dedicated B2B messaging with a direct inquiry path
**Depends on**: Phase 2
**Requirements**: WKSP-01, WKSP-02, WKSP-03, WKSP-04, HOSP-01, HOSP-02
**Success Criteria** (what must be TRUE):
  1. A visitor can navigate to /workshop and submit their name, email, and interest message — and receive inline confirmation that the message was sent
  2. A visitor submitting the workshop form sees a clear success message (or error message) without a page reload
  3. A hospitality client (hotel buyer, restaurant owner) reads messaging clearly addressed to their context — custom ware, volume, collaboration
  4. A hospitality client can initiate a B2B inquiry via WhatsApp with a pre-filled message distinguishing them from a retail buyer
**Plans**: TBD

Plans:
- [ ] 04-01: WorkshopForm component and /workshop page with Web3Forms integration
- [ ] 04-02: Hospitality section expansion with B2B messaging and separate inquiry path

### Phase 5: Performance & SEO
**Goal**: The site passes a Lighthouse mobile performance audit at 85+, and every product page is shareable with a social preview and discoverable by search engines via structured data
**Depends on**: Phase 4
**Requirements**: PERF-01, SEO-01, SEO-02
**Success Criteria** (what must be TRUE):
  1. Running Lighthouse on any page from a mobile preset returns a performance score of 85 or higher
  2. Sharing a product page URL on Instagram or WhatsApp renders a preview image and the piece name/description (not a blank card)
  3. Pasting the site URL into Google's Rich Results Test returns valid LocalBusiness structured data with no errors
**Plans**: TBD

Plans:
- [ ] 05-01: Lighthouse audit and performance fixes
- [ ] 05-02: Schema.org structured data and OG image implementation

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Critical Fixes | 1/1 | Complete   | 2026-03-11 |
| 2. Visual Redesign Foundation | 3/3 | Complete   | 2026-03-12 |
| 3. Gallery & Products | 0/4 | Not started | - |
| 4. Workshop & Hospitality | 0/2 | Not started | - |
| 5. Performance & SEO | 0/2 | Not started | - |
