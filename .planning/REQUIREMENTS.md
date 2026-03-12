# Requirements: Redcocoon Website v2

**Defined:** 2026-03-12
**Core Value:** People see the pottery, feel the craft quality, and reach out to inquire — the site must be both a beautiful showcase AND an inquiry driver.

## v1 Requirements

Requirements for this milestone. Each maps to roadmap phases.

### Critical Fixes

- [x] **FIX-01**: Broken `#contact-form` anchor in ReservationFlow is patched with a working target
- [x] **FIX-02**: Broken `/hospitality` link returns a valid page or anchor instead of 404

### Visual Design

- [x] **VIS-01**: Site has a warm, earthy visual identity with updated spacing, layout, and color usage across all sections
- [x] **VIS-02**: CSS custom property tokens are audited and all component styles use tokens (no hardcoded hex values)
- [x] **VIS-03**: All interactive CTAs have minimum 44px touch targets on mobile
- [x] **VIS-04**: Typography hierarchy is refined with clear heading/body/accent distinction
- [x] **VIS-05**: Hero and section backgrounds use subtle ambient CSS texture (noise, grain, or gradient depth)
- [x] **VIS-06**: Fonts are self-hosted via Astro Fonts API or @fontsource (no Google Fonts CDN)
- [x] **VIS-07**: Font loading uses font-display: swap with preconnect hints (no FOIT)

### Gallery & Products

- [x] **GAL-01**: User can browse all products on a dedicated `/shop` gallery page
- [x] **GAL-02**: User can filter gallery by collection using filter pill buttons
- [x] **GAL-03**: Each product shows stock status badge ("Available" / "Sold" / "Made to Order")
- [x] **GAL-04**: Sold-out pieces with Made to Order enabled show a commission inquiry CTA instead of a dead state
- [ ] **GAL-05**: User can click a product to view a dedicated detail page at `/shop/[slug]`
- [ ] **GAL-06**: User can zoom/expand product images via lightbox (GLightbox)
- [x] **GAL-07**: All product images use Astro `<Image />` for WebP optimization, lazy loading, and correct sizing
- [x] **GAL-08**: Piece code badge is visually prominent on product cards

### Workshop

- [ ] **WKSP-01**: User can submit a workshop inquiry via a form on `/workshop` page
- [ ] **WKSP-02**: Workshop form collects name, email, and interest/message
- [ ] **WKSP-03**: Workshop form has spam protection (honeypot + hCaptcha via Web3Forms)
- [ ] **WKSP-04**: User sees inline success/error feedback after form submission

### Hospitality & About

- [ ] **HOSP-01**: Hospitality B2B section has tailored messaging for hotels, restaurants, and cafes
- [ ] **HOSP-02**: Hospitality section has a separate inquiry path (WhatsApp with B2B pre-filled message)
- [ ] **ABOUT-01**: Site includes an About the maker / studio story section
- [ ] **INTL-01**: International shipping/inquiry clarity paragraph is visible near the reservation flow

### Performance & SEO

- [ ] **PERF-01**: Lighthouse mobile performance score >= 85 across all pages
- [ ] **SEO-01**: Schema.org LocalBusiness + Product structured data on relevant pages
- [ ] **SEO-02**: Open Graph image is set per product page for social sharing previews

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content

- **CONT-01**: Process section expanded with real craft photography and detailed copy
- **CONT-02**: Multi-angle product photography (minimum 2-3 photos per piece)

### Commerce

- **COMM-01**: Commission intake form for custom piece requests (dimensions, glazes, quantity)
- **COMM-02**: Wholesale/trade page for B2B pricing and MOQ

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Shopping cart / checkout | Breaks the personal DM-first model; massive complexity for ~12-20 pieces |
| Calendar-based workshop booking | Potter follows up manually; automation removes intentional personal touch |
| Real-time stock sync | Static site; manually updating Markdown frontmatter is trivial for small inventory |
| Blog / journal section | Ongoing content maintenance burden; inactive blog signals dead business |
| Customer accounts / wishlists | Requires auth/database; piece codes serve the same "save for later" function |
| Live chat / chatbot | Routes to same DM/WhatsApp with extra steps; adds JS weight |
| Multi-language support | Unsustainable for solo artisan; international ceramics market uses English |
| Product reviews / ratings | Not enough volume to be useful; Instagram testimonials serve this purpose |
| Live Instagram API feed | Requires OAuth, token management, rate limits; use static placeholders instead |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FIX-01 | Phase 1 | Complete |
| FIX-02 | Phase 1 | Complete |
| VIS-01 | Phase 2 | Complete |
| VIS-02 | Phase 2 | Complete |
| VIS-03 | Phase 2 | Complete |
| VIS-04 | Phase 2 | Complete |
| VIS-05 | Phase 2 | Complete |
| VIS-06 | Phase 2 | Complete |
| VIS-07 | Phase 2 | Complete |
| GAL-01 | Phase 3 | Complete |
| GAL-02 | Phase 3 | Complete |
| GAL-03 | Phase 3 | Complete |
| GAL-04 | Phase 3 | Complete |
| GAL-05 | Phase 3 | Pending |
| GAL-06 | Phase 3 | Pending |
| GAL-07 | Phase 3 | Complete |
| GAL-08 | Phase 3 | Complete |
| WKSP-01 | Phase 4 | Pending |
| WKSP-02 | Phase 4 | Pending |
| WKSP-03 | Phase 4 | Pending |
| WKSP-04 | Phase 4 | Pending |
| HOSP-01 | Phase 4 | Pending |
| HOSP-02 | Phase 4 | Pending |
| ABOUT-01 | Phase 3 | Pending |
| INTL-01 | Phase 3 | Pending |
| PERF-01 | Phase 5 | Pending |
| SEO-01 | Phase 5 | Pending |
| SEO-02 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-12*
*Last updated: 2026-03-12 after roadmap creation*
