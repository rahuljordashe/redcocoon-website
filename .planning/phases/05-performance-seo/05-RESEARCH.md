# Phase 5: Performance & SEO - Research

**Researched:** 2026-03-12
**Domain:** Lighthouse performance, Schema.org structured data, Open Graph social sharing
**Confidence:** HIGH

## Summary

Phase 5 optimizes an already-built Astro 5 static site for three measurable outcomes: Lighthouse mobile 85+, social sharing previews on product pages, and valid LocalBusiness structured data. The site is in a strong starting position -- Astro static output ships zero client JS by default, fonts are self-hosted via @fontsource, and images already use Astro's `<Image />` component for WebP conversion. The main performance drag is the preloader component (delays FCP by 1.4-3s via `setTimeout`) and potentially GLightbox (56KB minified JS + 14KB CSS loaded on product pages). On the SEO side, the existing Organization schema needs upgrading to LocalBusiness, product pages need Product+Offer JSON-LD, and the OG meta tags need per-page image support.

The technical work is straightforward: remove the preloader, upgrade structured data schemas, and wire OG image props through BaseLayout. The audit-first approach (run Lighthouse, fix what the data says) keeps the scope data-driven rather than speculative. GLightbox at ~11KB gzipped is small enough that it likely does not threaten the 85+ target, but the user wants this evaluated with real data.

**Primary recommendation:** Remove the preloader (biggest FCP win), add `ogImage` prop to BaseLayout, inject LocalBusiness and Product JSON-LD schemas, then validate with Lighthouse and Google Rich Results Test.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Structured data -- LocalBusiness: Schema type `LocalBusiness` (not Store or ArtGallery), full street address with TODO placeholders, phone/hours as TODO, social profiles in `sameAs` (Instagram + WhatsApp URLs), replaces existing `Organization` schema
- Structured data -- Product: Full `Product` schema on each `/shop/[slug]` page with name, image, price (LKR), availability, SKU (piece code)
- Social sharing (OG images): Product pages use the product's own photo as OG image (no build-time generation), non-product pages use best existing image, BaseLayout Props must accept `ogImage` parameter
- Performance -- preloader: Remove entirely (unconditional, not gated behind Lighthouse check)
- Performance -- scroll animations: Keep fade-in animations (IntersectionObserver + CSS transitions), ensure explicit dimensions to avoid CLS
- Performance -- audit approach: Audit-first, data-driven optimization, target mobile 85+
- Preloader removal is unconditional
- Product photos as OG images should use public/ path versions so social crawlers can fetch without build-time processing
- TODO placeholders for business address/phone/hours must be clearly marked

### Claude's Discretion
- GLightbox keep vs. replace decision based on actual Lighthouse data
- Non-product page OG image selection (best existing image per page)
- Specific Lighthouse fixes beyond the decisions above (defer JS, compress, etc.)
- Product schema `availability` mapping for Made to Order pieces
- Whether to add `offers` with `priceCurrency: "LKR"` or simpler Product markup

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PERF-01 | Lighthouse mobile performance score >= 85 across all pages | Preloader removal eliminates 1.4-3s FCP delay; GLightbox evaluation; audit-first methodology; image optimization already in place via Astro Image |
| SEO-01 | Schema.org LocalBusiness + Product structured data on relevant pages | LocalBusiness JSON-LD spec documented with required/recommended properties; Product+Offer schema with availability mapping including MadeToOrder; replaces existing Organization schema |
| SEO-02 | Open Graph image is set per product page for social sharing previews | OG image prop on BaseLayout; product pages use public/ image paths for crawler access; og:image:width/height meta tags; WhatsApp 300KB image limit documented |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.17.1 | Static site generator | Already installed; ships zero JS by default; `<Image />` for WebP; `site` config for absolute URLs |
| GLightbox | 3.3.1 | Product image lightbox | Already installed; 56KB min JS + 14KB min CSS (~11KB gzipped total); only loads on product pages via Astro's per-page bundling |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource/* | 5.x | Self-hosted fonts | Already installed; eliminates Google Fonts CDN round-trip; critical for FCP |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GLightbox | CSS-only `:target` zoom | Loses pinch-zoom, swipe, keyboard nav; saves ~11KB gzipped; only worth it if GLightbox pushes score below 85 |
| Build-time OG images (satori) | Static product photos as OG | User decision: use existing product photos directly; simpler, no build dependency |

**Installation:**
No new packages needed. All dependencies are already installed.

## Architecture Patterns

### Recommended Changes Structure
```
src/
  layouts/
    BaseLayout.astro        # Modify: add ogImage prop, replace Organization with LocalBusiness, remove Preloader import
  pages/
    shop/[slug].astro       # Modify: inject Product JSON-LD, pass ogImage to BaseLayout
    index.astro             # Modify: pass ogImage to BaseLayout
    shop.astro              # Modify: pass ogImage to BaseLayout
    workshop.astro          # Modify: pass ogImage to BaseLayout
  components/
    Preloader.astro         # DELETE entirely
```

### Pattern 1: BaseLayout ogImage Prop
**What:** Extend BaseLayout Props interface to accept an optional `ogImage` string (absolute URL to the OG image)
**When to use:** Every page passes its best image; BaseLayout falls back to a default
**Example:**
```typescript
// Source: existing BaseLayout pattern + Astro docs
interface Props {
  title?: string;
  description?: string;
  ogImage?: string;   // absolute URL, e.g. https://redcocoon-pottery.vercel.app/images/Bowls5.jpg
}

const {
  title = 'Redcocoon Pottery...',
  description = 'Handcrafted pottery...',
  ogImage = `${siteUrl}/images/399x650-01.png`,
} = Astro.props;
```

### Pattern 2: Canonical URL from Astro.site
**What:** Use `Astro.site` + `Astro.url.pathname` for canonical URLs instead of hardcoded `siteUrl`
**When to use:** For canonical link and og:url tags
**Example:**
```typescript
// Source: Astro API reference
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
```
**Note:** The `site` property is already set in `astro.config.mjs` to `https://redcocoon-pottery.vercel.app`. However, MEMORY.md shows the actual Vercel deployment is at `https://redcocoon-website.vercel.app`. This discrepancy should be flagged but not fixed in this phase (it is a configuration concern, not a Phase 5 scope item). The existing hardcoded `siteUrl` can remain as-is or switch to `Astro.site` -- either works.

### Pattern 3: JSON-LD Structured Data Injection
**What:** Use Astro's `set:html={JSON.stringify(schema)}` pattern for structured data scripts
**When to use:** LocalBusiness in BaseLayout head, Product in [slug].astro head slot
**Example:**
```typescript
// Source: existing BaseLayout pattern
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  // ... properties
})} />
```

### Anti-Patterns to Avoid
- **Generating OG images at build time:** User explicitly chose product photos as OG images. Do not introduce satori/@vercel/og.
- **Adding a CSS-only lightbox preemptively:** Only replace GLightbox if Lighthouse data shows it causes the score to drop below 85.
- **Hardcoding the site URL in multiple places:** Use the existing `siteUrl` constant or `Astro.site` consistently; do not duplicate the URL string.
- **Using Astro Image processed paths for OG images:** Social crawlers cannot run Astro's build pipeline. OG images must point to `/images/filename.ext` paths in `public/` that are directly fetchable.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Structured data validation | Custom JSON-LD validator | Google Rich Results Test (https://search.google.com/test/rich-results) | Google's own tool; definitive for what Google will accept |
| Performance auditing | Manual metric checking | Chrome DevTools Lighthouse or `npx lighthouse` CLI | Industry standard; produces the exact score the requirement targets |
| OG image preview testing | Manual URL sharing | https://opengraph.dev or https://cards-dev.twitter.com/validator | Shows exactly what social platforms will render |
| Font performance | Custom font loader | @fontsource (already installed) with `font-display: swap` | Already in place; handles FOIT/FOUT correctly |

**Key insight:** The validation tools for all three requirements (PERF-01, SEO-01, SEO-02) are external services with definitive answers. Do not build custom test harnesses -- use the official tools.

## Common Pitfalls

### Pitfall 1: OG Image Must Be Absolute URL with HTTPS
**What goes wrong:** OG meta tag uses a relative path like `/images/Bowls5.jpg` -- social crawlers cannot resolve it
**Why it happens:** Astro templates naturally use relative paths; easy to forget OG images need full URLs
**How to avoid:** Always prefix with `siteUrl` or construct with `new URL(path, Astro.site)`. Template: `${siteUrl}/images/filename.jpg`
**Warning signs:** Sharing a URL on WhatsApp/Instagram shows no preview image

### Pitfall 2: OG Image File Size for WhatsApp
**What goes wrong:** WhatsApp drops OG image preview entirely if the image exceeds ~300KB
**Why it happens:** WhatsApp mobile has aggressive timeout on OG image fetch
**How to avoid:** Product images in `public/images/` are all under 200KB except `399x650-01.png` (397KB) and `399x650-02.png` (332KB). The PNG hero images are borderline. For product pages this is fine (largest product image is Kitchen-ware1.jpg at 182KB). For homepage, if using 399x650-01.png, consider using a JPEG product image instead.
**Warning signs:** Preview works on Facebook/Twitter but not WhatsApp

### Pitfall 3: Product Schema Requires `offers` for Rich Results
**What goes wrong:** Adding only `name` and `image` to Product schema -- Google Rich Results Test fails
**Why it happens:** Google requires at least one of `review`, `aggregateRating`, or `offers` alongside `name`
**How to avoid:** Always include `offers` with `price`, `priceCurrency`, and `availability`. This site has no reviews/ratings, so `offers` is the only viable option.
**Warning signs:** Rich Results Test returns "missing field" errors

### Pitfall 4: Preloader Blocks FCP by Design
**What goes wrong:** The preloader shows a fixed overlay for 1.4s minimum (with 3s fallback timeout), meaning Lighthouse FCP is delayed by at least 1.4s on top of actual render time
**Why it happens:** The preloader was designed for a CDN-font-loading era; now fonts are self-hosted and critical
**How to avoid:** Remove the entire Preloader component, its import in BaseLayout, and its `<Preloader />` tag. The preloader's CSS animations (`@keyframes pulse`, `@keyframes loading`) may be defined in global.css and can be cleaned up.
**Warning signs:** Lighthouse reports FCP > 2.5s on mobile throttled connection

### Pitfall 5: Canonical URL Mismatch
**What goes wrong:** `og:url` and `<link rel="canonical">` use the same hardcoded URL for all pages instead of per-page URLs
**Why it happens:** BaseLayout currently hardcodes `siteUrl` (no pathname) for both canonical and og:url
**How to avoid:** Use `new URL(Astro.url.pathname, Astro.site).href` for canonical URL and og:url so each page gets its own canonical
**Warning signs:** All pages show the homepage URL as canonical in source

### Pitfall 6: LocalBusiness `sameAs` Must Be Array of URLs
**What goes wrong:** Using an object or single string for `sameAs`
**Why it happens:** Schema.org accepts both, but Google expects an array
**How to avoid:** Always use `"sameAs": ["https://instagram.com/redcocoon", "https://wa.me/94777720696"]`
**Warning signs:** Rich Results Test warns about `sameAs` format

## Code Examples

Verified patterns from official sources:

### LocalBusiness JSON-LD (for BaseLayout)
```typescript
// Source: https://developers.google.com/search/docs/appearance/structured-data/local-business
// Source: https://schema.org/LocalBusiness
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Redcocoon Pottery",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.svg`,
  "description": "Handcrafted pottery and ceramics. Artisan dinnerware, vases, mugs, and home decor.",
  "image": `${siteUrl}/images/399x650-01.png`,
  "telephone": "+94-TODO-PHONE",       // TODO: Replace before launch
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "TODO Street Address",   // TODO: Replace before launch
    "addressLocality": "Colombo",
    "addressRegion": "Western Province",
    "postalCode": "TODO",                      // TODO: Replace before launch
    "addressCountry": "LK"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",      // TODO: Replace before launch
      "closes": "17:00"      // TODO: Replace before launch
    }
  ],
  "sameAs": [
    "https://instagram.com/redcocoon",
    "https://wa.me/94777720696"
  ],
  "priceRange": "$$"
};
```

### Product + Offer JSON-LD (for [slug].astro)
```typescript
// Source: https://developers.google.com/search/docs/appearance/structured-data/product-snippet
// Source: https://schema.org/Product, https://schema.org/MadeToOrder
function getAvailability(stock: number, madeToOrder: boolean): string {
  if (stock > 0) return "https://schema.org/InStock";
  if (madeToOrder) return "https://schema.org/MadeToOrder";
  return "https://schema.org/SoldOut";
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": name,
  "image": `${siteUrl}${images[0]}`,
  "description": description || `Handcrafted ${material.toLowerCase()} piece from the ${collection} collection.`,
  "sku": code,
  "brand": {
    "@type": "Brand",
    "name": "Redcocoon Pottery"
  },
  "material": material,
  "offers": {
    "@type": "Offer",
    "price": price,
    "priceCurrency": currency,
    "availability": getAvailability(stock, madeToOrder),
    "seller": {
      "@type": "Organization",
      "name": "Redcocoon Pottery"
    }
  }
};
```

### OG Meta Tags with Per-Page Image (BaseLayout head)
```html
<!-- Source: OG protocol spec + WhatsApp/Instagram requirements -->
<meta property="og:image" content={ogImage}>
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content={canonicalURL}>
<meta name="twitter:image" content={ogImage}>
```

### Product Page Passing OG Image to BaseLayout
```typescript
// Source: existing [slug].astro pattern
// Product images are in public/images/ and directly fetchable by crawlers
const ogImageUrl = `${siteUrl}${images[0]}`;  // e.g. https://...vercel.app/images/Bowls5.jpg
---
<BaseLayout
  title={`${name} — Redcocoon Pottery`}
  description={`${name} (${code}) — handcrafted...`}
  ogImage={ogImageUrl}
>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Google Fonts CDN `<link>` | @fontsource self-hosted | Phase 2 (already done) | Eliminates DNS lookup + external CSS fetch; major FCP win |
| Preloader overlay for font loading | No preloader; `font-display: swap` | This phase (Phase 5) | Removes 1.4-3s artificial FCP delay |
| Single Organization schema | LocalBusiness + per-page Product schema | This phase (Phase 5) | Rich Results eligibility; local search visibility |
| One global OG image | Per-page OG images | This phase (Phase 5) | Social sharing shows relevant product photo instead of generic hero |

**Deprecated/outdated:**
- **Preloader component:** Was needed when fonts loaded from Google CDN and could cause FOIT. Fonts are now self-hosted with `font-display: swap` -- preloader serves no purpose and actively harms FCP.
- **Organization schema for local business:** Google recommends LocalBusiness for businesses with physical locations. Organization is too generic.

## Open Questions

1. **GLightbox Lighthouse impact**
   - What we know: 56KB minified JS + 14KB CSS (~11KB gzipped combined). Only loads on product detail pages. Astro tree-shakes it from other pages.
   - What's unclear: Actual Lighthouse score impact on mobile-throttled product pages.
   - Recommendation: Run Lighthouse on a product page with GLightbox present. If score is 85+, keep it. If below 85, evaluate CSS-only alternative. This is a user-decided "audit-first" approach.

2. **Site URL discrepancy**
   - What we know: `astro.config.mjs` has `site: 'https://redcocoon-pottery.vercel.app'` but MEMORY.md shows actual deployment at `https://redcocoon-website.vercel.app`
   - What's unclear: Which is the canonical production URL
   - Recommendation: Flag in plan but do not change in this phase. OG images and structured data will use whichever URL is in the config. User should reconcile before launch.

3. **Hero PNG as homepage OG image**
   - What we know: `399x650-01.png` is 397KB (above WhatsApp's ~300KB threshold). Product JPEGs are all under 200KB.
   - What's unclear: Whether to use the hero PNG or pick a smaller JPEG for homepage OG
   - Recommendation: Use a representative product JPEG (e.g., Bowls5.jpg at 99KB) for homepage OG image. It will preview reliably on all platforms including WhatsApp.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Lighthouse CLI (via Chrome DevTools or `npx lighthouse`) + Google Rich Results Test (web) |
| Config file | none -- external tools |
| Quick run command | `npx lighthouse http://localhost:4321 --preset=perf --only-categories=performance --output=json --chrome-flags="--headless"` |
| Full suite command | Manual: Lighthouse on each page + Rich Results Test on structured data + OG preview check |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PERF-01 | Lighthouse mobile 85+ on all pages | manual / CLI | `npx lighthouse URL --preset=perf --only-categories=performance --emulated-form-factor=mobile` | N/A -- external tool |
| SEO-01 | Valid LocalBusiness + Product structured data | manual | Google Rich Results Test (https://search.google.com/test/rich-results) | N/A -- external tool |
| SEO-02 | OG image renders on social share preview | manual | https://opengraph.dev or share URL on WhatsApp/Instagram | N/A -- external tool |

### Sampling Rate
- **Per task commit:** Build site (`bun run build`) and verify no build errors
- **Per wave merge:** Run Lighthouse CLI on localhost preview server
- **Phase gate:** All three external validation tools pass before `/gsd:verify-work`

### Wave 0 Gaps
None -- validation uses external tools (Lighthouse, Google Rich Results Test, OG preview tools), not project-internal test infrastructure. The build command (`bun run build`) is the only automated check, and it already works.

## Sources

### Primary (HIGH confidence)
- [Google Search Central - LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business) - Required/recommended properties for LocalBusiness schema
- [Google Search Central - Product Snippet](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) - Required properties: name + one of review/aggregateRating/offers
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness) - Full property list
- [Schema.org Product](https://schema.org/Product) - Full property list
- [Schema.org MadeToOrder](https://schema.org/MadeToOrder) - Confirmed valid ItemAvailability enumeration member
- [Astro Configuration Reference](https://docs.astro.build/en/reference/configuration-reference/) - `site` property for absolute URL construction
- [Astro API Reference](https://docs.astro.build/en/reference/api-reference/) - `Astro.site`, `Astro.url` for canonical URLs

### Secondary (MEDIUM confidence)
- [OG Image Requirements](https://opengraphdebug.com/posts/og-image-requirements) - 1200x630 recommended, HTTPS required, explicit width/height tags
- [WhatsApp OG Image](https://thospfuller.com/2023/12/24/open-graph-whatsapp/) - 300KB limit for WhatsApp preview images
- [GLightbox Bundlephobia](https://bundlephobia.com/package/glightbox) - ~11KB gzipped bundle size
- [Astro Performance Optimization Guide](https://eastondev.com/blog/en/posts/dev/20251202-astro-performance-optimization/) - Lighthouse optimization techniques for Astro sites

### Tertiary (LOW confidence)
- None -- all findings verified with primary or secondary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and verified in package.json; versions confirmed
- Architecture: HIGH - Patterns based on existing codebase analysis + official Astro/Schema.org docs
- Pitfalls: HIGH - Verified against Google official docs (Product requires offers), OG spec (absolute URLs), and measured file sizes (WhatsApp 300KB limit vs actual image sizes)

**Research date:** 2026-03-12
**Valid until:** 2026-04-12 (stable domain -- Schema.org and OG specs change slowly)
