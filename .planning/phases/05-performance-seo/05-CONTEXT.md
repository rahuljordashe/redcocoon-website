# Phase 5: Performance & SEO - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

The site passes a Lighthouse mobile performance audit at 85+, every product page is shareable with a social preview image, and search engines discover the business via LocalBusiness + Product structured data. No new pages, no new features — this is optimization and discoverability on top of the existing site.

</domain>

<decisions>
## Implementation Decisions

### Structured data — LocalBusiness
- Schema type: `LocalBusiness` (not Store or ArtGallery) — best Google Rich Results support
- Full street address included (use TODO placeholders — user will fill before launch)
- Phone number: TODO placeholder
- Opening hours: TODO placeholder
- Social profiles in `sameAs`: Instagram (`https://instagram.com/redcocoon`) + WhatsApp (`https://wa.me/94777720696`)
- Replaces the current bare-bones `Organization` schema in BaseLayout

### Structured data — Product
- Full `Product` schema on each `/shop/[slug]` page
- Fields: name, image, price (LKR currency), availability (InStock/OutOfStock based on stock field), SKU (piece code)
- Made to Order pieces: availability maps to a suitable schema value

### Social sharing (OG images)
- Product pages: use the product's own photo directly as OG image — no build-time generation
- Non-product pages (homepage, /shop, /workshop): Claude picks the best existing image per page
- BaseLayout Props must accept an `ogImage` parameter so pages can pass per-page images
- Per-page OG title and description already parameterized — extend with image

### Performance — preloader
- Remove the preloader entirely — self-hosted fonts + optimized images mean no FOIT or layout jank
- Fastest possible First Contentful Paint

### Performance — lightbox
- Claude's discretion: evaluate GLightbox's actual Lighthouse impact and keep it or replace with CSS-only zoom — whichever achieves 85+ with the better UX

### Performance — scroll animations
- Keep fade-in animations (IntersectionObserver + CSS transitions) — they're lightweight
- Ensure elements have explicit dimensions to avoid CLS

### Performance — audit approach
- Audit-first: run Lighthouse, read the report, fix actual bottlenecks
- No fixed checklist — data-driven optimization only
- Target: mobile preset, score 85+

### Claude's Discretion
- GLightbox keep vs. replace decision based on actual Lighthouse data
- Non-product page OG image selection (best existing image per page)
- Specific Lighthouse fixes beyond the decisions above (defer JS, compress, etc.)
- Product schema `availability` mapping for Made to Order pieces
- Whether to add `offers` with `priceCurrency: "LKR"` or simpler Product markup

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `BaseLayout.astro`: Already has OG meta tags and structured data script — extend, don't rewrite
- `BaseLayout.astro` Props: `title` and `description` already parameterized — add `ogImage`
- `src/content/config.ts`: Zod schema has `price`, `stock`, `code`, `collection`, `madeToOrder` — all needed for Product schema
- `src/utils/format.ts`: `formatPrice()` — reuse for price formatting consistency
- `src/utils/instagram.ts` / `whatsapp.ts`: Social profile URLs already defined as constants

### Established Patterns
- Structured data via `<script type="application/ld+json" set:html={JSON.stringify(...)}>` in BaseLayout — same pattern for LocalBusiness
- Product data accessed via `getCollection('products')` in page frontmatter
- imageMap pattern (`Record<string, ImageMetadata>`) for Astro Image — product images already mapped in `[slug].astro`
- Scoped `<style>` per component, CSS custom properties on `:root`
- Preloader component imported in BaseLayout — remove import + component tag + its CSS/JS

### Integration Points
- `src/layouts/BaseLayout.astro`: LocalBusiness schema, OG image prop, preloader removal
- `src/pages/shop/[slug].astro`: Product schema injection, per-product OG meta
- `src/pages/index.astro`: Homepage OG image override
- `src/pages/shop.astro`: Shop page OG image override
- `src/pages/workshop.astro`: Workshop page OG image override
- `src/components/Preloader.astro`: Remove or delete entirely

</code_context>

<specifics>
## Specific Ideas

- Preloader removal is unconditional — don't gate it behind a Lighthouse check, just remove it
- Product photos as OG images should use the public/ path versions (not Astro Image processed) so social crawlers can fetch them without build-time processing
- TODO placeholders for business address/phone/hours should be clearly marked in the code so they're easy to find before launch

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-performance-seo*
*Context gathered: 2026-03-12*
