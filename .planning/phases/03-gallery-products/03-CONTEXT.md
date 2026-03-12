# Phase 3: Gallery & Products - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can browse, filter, and inspect all products on a dedicated /shop gallery page with collection filtering, individual product detail pages at /shop/[slug], and a commission inquiry path for sold-out Made to Order pieces. Includes an About the Maker section on the shop page and a pickup/shipping policy note. No new sales channels, no checkout, no workshop form.

</domain>

<decisions>
## Implementation Decisions

### Gallery filtering & layout
- Single-select filter pills with "All" default — one collection active at a time
- Subtle fade transition (~300ms) when switching collections — uses existing CSS transition system
- SectionHeader component at top ("The Collection" or similar) with filter pills directly below
- Subtle product count indicator below filters (e.g., "Showing 4 pieces") when filtered
- Product grid reuses Phase 2 pattern: 3 columns desktop, 2 columns mobile

### Product detail pages (/shop/[slug])
- Side-by-side layout: large image left (~60% width), product info right — stacks vertically on mobile
- Breadcrumb navigation: Shop > [Collection] > [Product Name]
- Info panel shows: name, piece code, price, stock status badge, collection, material
- Description paragraph NOT included on detail page (not selected)
- "More from this collection" section below main product — shows 2-3 other products from same collection using ProductCard
- Image lightbox via GLightbox (note: verify maintenance status, fallback to CSS-only zoom per STATE.md blocker)

### Sold-out & commission flow
- Sold-out products appear dimmed in gallery grid with "Sold" badge overlay (slightly desaturated image)
- Made to Order pieces show "Commission This Piece" CTA instead of dead sold state
- Commission CTA offers BOTH channels: Instagram DM + WhatsApp (not DM-only)
- Pre-filled messages include piece name and code (e.g., "Hi, I'd like to commission Bowl — Terracotta (RC-BT-018)")
- Schema addition: `madeToOrder: z.boolean().default(false)` field in content config
- Mark 1-2 existing products as sold (stock: 0) + madeToOrder: true as examples for launch

### Stock status badges
- "Available" — green/sage badge for in-stock pieces
- "Sold" — grey/muted badge for sold-out, non-MTO pieces
- "Made to Order" — terracotta/warm badge for sold-out pieces with madeToOrder: true

### About the Maker section
- Lives on /shop page as a section below the product grid (not a separate /about page)
- Personal & warm tone — first-person or close third-person ("Born from a love of clay and fire...")
- Short: 2-3 sentences + maker photo
- Uses alternating section rhythm (dark espresso section after light product grid, per Phase 2 pattern)

### Pickup & shipping policy
- Note placed on /shop page near the CTA/reservation area
- Wording: "Collection from our Colombo studio. DM us to arrange shipping (at buyer's risk)."
- NOT about international shipping — pickup is primary, shipping available at buyer's risk

### Claude's Discretion
- Filter pill styling (colors, active state, border treatment)
- Lightbox library choice (GLightbox if maintained, fallback per STATE.md)
- Exact about section copy (placeholder until real content provided)
- Which 1-2 products to mark as sold/MTO examples
- Image sizing and aspect ratios on product detail pages
- "More from this collection" layout when collection has only 1 item (skip section or show from adjacent collection)
- Empty state for filtered views with 0 products (unlikely with current data but handle gracefully)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ProductCard.astro`: Full card component with code badge, DM CTA, stock display, hover effects — reuse in gallery grid and "More from collection"
- `SectionHeader.astro`: Tag + title + accent pattern — reuse for /shop page header
- `src/utils/instagram.ts`: `getInstagramDMLink()` — for commission DM CTA
- `src/utils/whatsapp.ts`: `getWhatsAppLink(message)`, `getReserveLink(productName, price)` — for commission WhatsApp CTA
- `src/utils/format.ts`: `formatPrice()` — already used in ProductCard
- `.fade-in` / `.visible` CSS classes + IntersectionObserver — for scroll animations on new page
- CSS variables for shadows (`--shadow-card`, `--shadow-card-hover`), border-radius (`--border-radius-lg`, `--border-radius-img`), spacing scale
- `src/assets/images/` — Phase 2 migrated images here for Astro Image pipeline

### Established Patterns
- Astro Content Collections with `getCollection('products')` — query and filter in frontmatter
- imageMap pattern (`Record<string, ImageMetadata>`) for Astro Image — used in Phase 2 for Process/InstagramFeed
- Scoped `<style>` per component with CSS custom properties
- Vanilla JS `<script>` for interactivity (no frameworks)
- 768px mobile, 1024px tablet breakpoints
- Alternating light/dark section backgrounds (Phase 2)

### Integration Points
- `src/pages/index.astro` — LatestPieces already links to `/shop` ("View All Pieces")
- `src/content/config.ts` — add `madeToOrder` field to product schema
- `src/content/products/*.md` — update frontmatter for MTO examples
- `src/pages/shop.astro` — NEW page (gallery)
- `src/pages/shop/[slug].astro` — NEW dynamic route (product detail)
- `src/components/Navbar.astro` + `Footer.astro` — may need "Shop" nav link
- `src/layouts/BaseLayout.astro` — GLightbox CSS/JS integration point

</code_context>

<specifics>
## Specific Ideas

- Pickup/shipping wording is exact: "Collection from our Colombo studio. DM us to arrange shipping (at buyer's risk)."
- Commission CTA text is exact: "Commission This Piece"
- About section is personal/warm — "walking into a pottery studio" feel from PROJECT.md vision
- Filter should feel effortless — single tap to switch, subtle fade, no jarring layout shifts

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-gallery-products*
*Context gathered: 2026-03-12*
