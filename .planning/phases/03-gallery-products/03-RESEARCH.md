# Phase 3: Gallery & Products - Research

**Researched:** 2026-03-12
**Domain:** Astro static site — Content Collections, dynamic routes, vanilla JS filtering, lightbox
**Confidence:** HIGH

## Summary

Phase 3 builds on a solid Astro 5.18.0 foundation that is already producing a clean build. The existing product data (12 items across 5 collections), component library (ProductCard, SectionHeader, btn classes, fade-in animations), and utility helpers (instagram.ts, whatsapp.ts, format.ts) are all in place and reusable. The primary work is: (1) adding `madeToOrder` to the content schema, (2) building a `/shop` page with FilterBar and GalleryGrid, (3) creating dynamic `/shop/[slug].astro` product detail pages with GLightbox, and (4) migrating product images from `/public/images/` string refs to `src/assets/images/` static imports so Astro Image can optimize them.

The most critical technical fact is that the project uses Astro 5 with legacy `type: 'content'` collections, which still exposes `.slug` via backwards-compatibility shim. The plan should migrate to `.id` (the Astro 5 canonical property) as part of this phase since new pages will need it. GLightbox 3.3.1 (published January 2025, with a 4.0.0 beta in progress) is acceptably maintained for this phase — it works via CDN/npm, requires no framework. The fallback if issues arise is LightGallery.js or CSS-only zoom.

**Primary recommendation:** Build all new pages using `product.id` (not `.slug`). Use the established imageMap pattern from Phase 2 for Astro `<Image />` in product detail pages. Implement filtering with vanilla JS `data-collection` attributes and CSS `display: none` toggling — no library needed.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Single-select filter pills with "All" default — one collection active at a time
- Subtle fade transition (~300ms) when switching collections — uses existing CSS transition system
- SectionHeader component at top ("The Collection" or similar) with filter pills directly below
- Subtle product count indicator below filters (e.g., "Showing 4 pieces") when filtered
- Product grid reuses Phase 2 pattern: 3 columns desktop, 2 columns mobile
- Side-by-side layout on product detail: large image left (~60% width), product info right — stacks vertically on mobile
- Breadcrumb navigation: Shop > [Collection] > [Product Name]
- Info panel shows: name, piece code, price, stock status badge, collection, material
- Description paragraph NOT included on detail page
- "More from this collection" section below main product — shows 2-3 other products from same collection using ProductCard
- Image lightbox via GLightbox (note: verify maintenance status, fallback to CSS-only zoom per STATE.md blocker)
- Sold-out products appear dimmed in gallery grid with "Sold" badge overlay (slightly desaturated image)
- Made to Order pieces show "Commission This Piece" CTA instead of dead sold state
- Commission CTA offers BOTH channels: Instagram DM + WhatsApp (not DM-only)
- Pre-filled messages include piece name and code (e.g., "Hi, I'd like to commission Bowl — Terracotta (RC-BT-018)")
- Schema addition: `madeToOrder: z.boolean().default(false)` field in content config
- Mark 1-2 existing products as sold (stock: 0) + madeToOrder: true as examples for launch
- "Available" — green/sage badge for in-stock pieces
- "Sold" — grey/muted badge for sold-out, non-MTO pieces
- "Made to Order" — terracotta/warm badge for sold-out pieces with madeToOrder: true
- About section lives on /shop page as a section below the product grid (not a separate /about page)
- Personal & warm tone — first-person or close third-person
- Short: 2-3 sentences + maker photo
- Uses alternating section rhythm (dark espresso section after light product grid, per Phase 2 pattern)
- Pickup/shipping note on /shop page near CTA/reservation area
- Exact wording: "Collection from our Colombo studio. DM us to arrange shipping (at buyer's risk)."

### Claude's Discretion
- Filter pill styling (colors, active state, border treatment)
- Lightbox library choice (GLightbox if maintained, fallback per STATE.md)
- Exact about section copy (placeholder until real content provided)
- Which 1-2 products to mark as sold/MTO examples
- Image sizing and aspect ratios on product detail pages
- "More from this collection" layout when collection has only 1 item (skip section or show from adjacent collection)
- Empty state for filtered views with 0 products (unlikely with current data but handle gracefully)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| GAL-01 | User can browse all products on a dedicated `/shop` gallery page | `src/pages/shop.astro` — NEW; uses `getCollection('products')` to render all 12 products |
| GAL-02 | User can filter gallery by collection using filter pill buttons | Vanilla JS data-attribute filtering; derive unique collections at build time from product data |
| GAL-03 | Each product shows stock status badge ("Available" / "Sold" / "Made to Order") | New badge component/logic driven by `stock` and new `madeToOrder` field |
| GAL-04 | Sold-out pieces with Made to Order enabled show commission inquiry CTA | Commission CTA with IG DM + WhatsApp pre-filled links using `getInstagramDMLink` + `getWhatsAppLink` |
| GAL-05 | User can click a product to view a dedicated detail page at `/shop/[slug]` | `src/pages/shop/[slug].astro` with `getStaticPaths()` using `product.id` |
| GAL-06 | User can zoom/expand product images via lightbox (GLightbox) | GLightbox 3.3.1 via npm — init in `<script>`, CSS in BaseLayout or scoped |
| GAL-07 | All product images use Astro `<Image />` for WebP optimization, lazy loading | imageMap pattern (static import per image file) — same as Phase 2 Process/InstagramFeed |
| GAL-08 | Piece code badge is visually prominent on product cards | Already implemented in ProductCard.astro — reuse as-is |
| ABOUT-01 | Site includes an About the maker / studio story section | Section at bottom of /shop page; espresso dark background per alternating rhythm |
| INTL-01 | International shipping/inquiry clarity paragraph visible near reservation flow | Pickup/shipping policy note on /shop page near CTA area |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 5.18.0 (installed) | Static site framework, routing, Content Collections | Already installed; entire site built on it |
| astro:content | built-in | `getCollection`, schema validation | Official Astro data layer |
| astro:assets | built-in | `<Image />` component, WebP optimization | Official Astro image pipeline (Phase 2 established) |
| GLightbox | 3.3.1 | Product image lightbox/zoom | User-selected (CONTEXT.md); pure JS, no framework; last stable release Jan 2025; 4.0 beta active |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| zod | bundled with astro | Content schema validation | Schema change for `madeToOrder` field |
| Vanilla JS | N/A | Filter interactivity, lightbox init | Project constraint: zero client frameworks |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GLightbox | LightGallery.js | More actively maintained, more features, but heavier. GLightbox is sufficient for single-image zoom. |
| GLightbox | CSS-only zoom (scale transform on click) | Zero dependency, but no keyboard nav, no overlay close, no mobile swipe. Use only if GLightbox breaks. |
| Vanilla JS filter | Alpine.js | Simpler syntax, but adds ~8KB and violates zero-framework project constraint. |

**Installation:**
```bash
bun add glightbox
```
Or load from CDN (simpler for static site, avoids npm bundling):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
```
Note: CDN approach preferred for this project — no JS bundler config needed, consistent with zero-framework static approach. Alternatively install via npm and import in `<script>` tag.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── pages/
│   ├── shop.astro              # Gallery page (NEW) — GAL-01, GAL-02, ABOUT-01, INTL-01
│   └── shop/
│       └── [slug].astro        # Product detail page (NEW) — GAL-05, GAL-06, GAL-07
├── components/
│   ├── FilterBar.astro         # Filter pills component (NEW) — GAL-02
│   ├── GalleryGrid.astro       # Product grid with filtering (NEW) — GAL-01, GAL-02, GAL-03, GAL-04
│   ├── StockBadge.astro        # Stock status badge (NEW) — GAL-03
│   ├── CommissionCTA.astro     # Commission inquiry panel (NEW) — GAL-04
│   └── AboutMaker.astro        # About section (NEW) — ABOUT-01
├── content/
│   ├── config.ts               # ADD madeToOrder field
│   └── products/
│       ├── bowl-terracotta.md  # UPDATE: add madeToOrder, mark 1-2 as sold + MTO
│       └── ...                 # UPDATE all: migrate image paths to src/assets/
└── assets/
    └── images/                 # Add missing product images (Bowls5.jpg, Vases3.jpg, etc.)
```

### Pattern 1: Dynamic Routes from Content Collections (Astro 5)
**What:** Generate one static page per product using `getStaticPaths`
**When to use:** All `src/pages/shop/[slug].astro` generation
**Key Astro 5 change:** Use `product.id` not `product.slug` — legacy `.slug` property works via compat shim but `.id` is canonical in Astro 5.

```typescript
// src/pages/shop/[slug].astro
// Source: https://docs.astro.build/en/guides/content-collections/
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const products = await getCollection('products');
  return products.map(product => ({
    params: { slug: product.id },
    props: { product },
  }));
}

const { product } = Astro.props;
// product.data.name, product.data.code, product.data.stock, etc.
```

### Pattern 2: imageMap for Astro `<Image />` in Dynamic Pages
**What:** Static imports of all product images mapped by filename for runtime lookup
**When to use:** Both `shop.astro` (GalleryGrid) and `shop/[slug].astro` (detail view)
**Why needed:** Astro Image requires static imports known at build time — string interpolation `import(variable)` does not work.

```typescript
// Source: Established in Phase 2 (InstagramFeed.astro, ProcessSection.astro)
import type { ImageMetadata } from 'astro';
import imgBowls from '../assets/images/Bowls5.jpg';
import imgCoasters from '../assets/images/Coasters18.jpg';
// ... one import per image file

const imageMap: Record<string, ImageMetadata> = {
  '/images/Bowls5.jpg': imgBowls,
  '/images/Coasters18.jpg': imgCoasters,
  // keys match product frontmatter images[] values
};

// Usage
const img = imageMap[product.data.images[0]];
// <Image src={img} alt={product.data.name} width={600} height={750} />
```

**Critical:** The key format must match exactly what's in product frontmatter (`/images/Bowls5.jpg` not `Bowls5.jpg`). Phase 2 used basename-only keys; this phase should standardize on the full path as stored in frontmatter.

### Pattern 3: Vanilla JS Collection Filtering
**What:** Render all products server-side with `data-collection` attributes; JS toggles visibility
**When to use:** FilterBar + GalleryGrid interaction on `/shop` page
**Why:** No client framework, instant filter, no hydration, no layout shift if done right

```html
<!-- Markup (generated server-side in GalleryGrid.astro) -->
<div class="gallery-grid">
  {products.map(p => (
    <div class="gallery-item" data-collection={p.data.collection}>
      <ProductCard ... />
    </div>
  ))}
</div>
<span class="gallery-count">Showing 12 pieces</span>
```

```javascript
// Vanilla JS in <script> block of shop.astro
const pills = document.querySelectorAll('.filter-pill');
const items = document.querySelectorAll('.gallery-item');
const countEl = document.querySelector('.gallery-count');

function applyFilter(collection) {
  let visible = 0;
  items.forEach(item => {
    const match = collection === 'all' || item.dataset.collection === collection;
    item.style.opacity = match ? '' : '0';         // fade start
    item.style.display = match ? '' : 'none';      // for count accuracy
    if (match) visible++;
  });
  // Update count text only when filtered (hide when showing all)
  if (collection === 'all') {
    countEl.textContent = '';
  } else {
    countEl.textContent = `Showing ${visible} piece${visible !== 1 ? 's' : ''}`;
  }
}
```

**Fade transition approach:** The 300ms fade requires CSS transition on `.gallery-item` opacity, with JS toggling a class rather than `display: none` directly (display:none kills transitions). Use a two-step: set opacity to 0 first (transition), then display:none after transition ends; reverse for show.

### Pattern 4: Stock Status Badge Logic
**What:** Conditional rendering based on `stock` and `madeToOrder` fields
**When to use:** ProductCard and product detail page

```typescript
// Derived status — compute once, pass to template
const isSold = product.data.stock === 0;
const isMTO = product.data.madeToOrder === true;
const status = isSold && isMTO ? 'mto' : isSold ? 'sold' : 'available';
// Render badge class: .badge-available | .badge-sold | .badge-mto
```

### Pattern 5: Pre-filled Commission Messages
**What:** Deep links to Instagram DM and WhatsApp with product-specific text
**Utilities:** `getInstagramDMLink()` (existing, no message param) and `getWhatsAppLink(message)` (existing)

```typescript
// WhatsApp commission link — uses existing getWhatsAppLink utility
const commissionMessage = `Hi, I'd like to commission ${product.data.name} (${product.data.code})`;
const waLink = getWhatsAppLink(commissionMessage);

// Instagram DM — getInstagramDMLink() has no message parameter
// Deep link format for pre-filled DM not supported by Instagram API
// Use getInstagramDMLink() which opens DM thread; user types their own message
// OR: add a getCommissionDMLink() wrapper that opens IG profile (pre-fill not possible via web)
const igLink = getInstagramDMLink(); // Opens DM thread to @redcocoon
```

**Note:** Instagram DM deep links (`ig.me/m/username`) cannot pre-fill message text — this is a platform limitation. WhatsApp CAN pre-fill via `?text=`. The commission CTA should state the piece name visually on-page so users can reference it.

### Anti-Patterns to Avoid
- **Importing images via string interpolation:** `import(imageStr)` in `.astro` files — Astro's bundler requires static imports. Use the imageMap pattern.
- **Using `product.slug` in new code:** Astro 5 canonical property is `.id`. The existing `LatestPieces.astro` uses `.slug` via compat shim — update it to `.id` in this phase.
- **CSS `display:none` with opacity transition:** Setting `display:none` immediately ends the transition. Use `opacity` + `pointer-events: none` + `position: absolute` trick, or a brief `setTimeout` after transition.
- **`getStaticPaths` without passing full product as prop:** Without passing props, the detail page must re-query the collection — wasteful in build. Pass `{ props: { product } }`.
- **GLightbox before DOM ready:** Initialize `GLightbox()` inside `DOMContentLoaded` or at end of `<body>`, not inline.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image lightbox/zoom | Custom modal with CSS transforms | GLightbox | Keyboard nav, touch swipe, accessibility, focus trap — edge cases are extensive |
| Image optimization | `<img>` with manual width/height | Astro `<Image />` | WebP conversion, srcset, lazy loading, correct dimensions — `<img>` with `/public/` paths does none of this |
| URL-safe slugs | Custom slugify function | Use `product.id` directly | Astro generates URL-safe IDs from filenames automatically |
| Pre-filled message encoding | `encodeURIComponent` inline | `getWhatsAppLink(message)` utility (already exists) | Handles encoding consistently; already in use |

**Key insight:** All the complex pieces (image optimization, message encoding, DM links) already exist as utilities from Phase 1/2. This phase assembles them, it does not invent new infrastructure.

## Common Pitfalls

### Pitfall 1: Missing Product Images in `src/assets/images/`
**What goes wrong:** Product frontmatter references `/images/Bowls5.jpg` but the imageMap expects a static import from `src/assets/images/Bowls5.jpg`. If the file doesn't exist in `src/assets/`, the build fails with a missing module error.
**Why it happens:** Phase 2 copied only the images used by non-product components (Process, InstagramFeed, Hero) to `src/assets/`. Product images still live only in `public/images/`.
**How to avoid:** Plan 03-01 or 03-02 must COPY all product images from `public/images/` to `src/assets/images/` before building the imageMap. Check the full list:
- `Bowls5.jpg` — bowl-terracotta, cocoon-serving-bowl
- `Chip-dip-sets4.jpg` — cocoon-serving-bowl (second image)
- `Coasters18.jpg` — coasters-set
- `Dinner-sets5.jpg` — dinner-plate-ocean
- `Enamel.jpg` — enamel-vase (already in src/assets/)
- `mugs-fatured-image.jpg` — espresso-cup-ember, mug-midnight
- `Kitchen-ware1.jpg` — kitchen-set (already in src/assets/)
- `Tea-coffee-set5.jpg` — sake-set-ash (already in src/assets/)
- `Toast-Plates-new.jpg` — toast-plates (already in src/assets/)
- `Vases3.jpg` — vase-sand
- `Wall-deco5.jpg` — wall-decor-plate (already in src/assets/)

**Warning signs:** Build error `Cannot find module '../assets/images/Bowls5.jpg'`

### Pitfall 2: Filter Transition with `display: none`
**What goes wrong:** Setting `display: none` on filtered-out items immediately removes them from the DOM flow — CSS `opacity` transition never plays.
**Why it happens:** CSS cannot transition from `display: block` to `display: none`.
**How to avoid:** Use one of these patterns:
- Option A: Set `opacity: 0; pointer-events: none; height: 0; overflow: hidden` (keeps grid flow, hidden)
- Option B: Toggle a CSS class `.hidden` that sets `opacity: 0; visibility: hidden` first, then `display: none` via `transitionend` event listener
- Option C (simplest): Use CSS Grid with `display: contents` wrapper and only toggle `visibility`/`opacity` — grid gaps may show but acceptable for 12 items
**Warning signs:** Filter switches instantly with no fade despite `transition: opacity 300ms`

### Pitfall 3: `product.slug` vs `product.id` in Astro 5
**What goes wrong:** `LatestPieces.astro` passes `slug={product.slug}` to ProductCard, which builds hrefs like `/shop/bowl-terracotta`. The new `[slug].astro` page uses `params: { slug: product.id }`. These must match or navigation 404s.
**Why it happens:** Legacy `.slug` in Astro 5 strips the `.md` extension and lowercases — same result as `.id` for these filenames. But `.slug` is the compat shim; `.id` is authoritative.
**How to avoid:** Standardize on `product.id` in ALL new code. Update `LatestPieces.astro` to pass `slug={product.id}` in this phase for consistency.
**Warning signs:** `/shop/bowl-terracotta` 404s despite the file existing as `bowl-terracotta.md`

### Pitfall 4: GLightbox CSS Not Loading
**What goes wrong:** GLightbox JS initializes and creates the lightbox overlay, but it appears unstyled (no backdrop, no close button styles).
**Why it happens:** GLightbox requires its own CSS file in addition to the JS.
**How to avoid:** Include both CSS and JS. If using npm import in `<script>`, Astro does not automatically process CSS from `node_modules` inside `<script>` tags — import the CSS in the layout's `<head>` via `<link>` or add `import 'glightbox/dist/css/glightbox.css'` to the page's frontmatter (Astro processes this).
**Warning signs:** Lightbox opens but looks completely unstyled / no close button visible

### Pitfall 5: "More from this Collection" with Single-Item Collections
**What goes wrong:** Collection has only 1 product (e.g., "Signature" — only `cocoon-serving-bowl`). Filtering `allProducts.filter(p => p.data.collection === current && p.id !== current.id)` returns empty array. Rendering an empty `<section>` wastes space.
**Why it happens:** Small inventory; 5 collections with 12 products means average 2.4 per collection.
**How to avoid:** Conditionally render the "More from this collection" section only when `relatedProducts.length > 0`. If empty, silently omit the section (per Claude's Discretion in CONTEXT.md).

## Code Examples

Verified patterns from official sources and existing codebase:

### getStaticPaths for Product Detail Pages
```typescript
// src/pages/shop/[slug].astro
// Source: https://docs.astro.build/en/guides/content-collections/
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const products = await getCollection('products');
  return products.map(product => ({
    params: { slug: product.id },  // product.id = 'bowl-terracotta' (filename without .md)
    props: { product },
  }));
}

const { product } = Astro.props;
const allProducts = await getCollection('products');
const related = allProducts
  .filter(p => p.data.collection === product.data.collection && p.id !== product.id)
  .slice(0, 3);
```

### Schema Addition for madeToOrder
```typescript
// src/content/config.ts — add one field to existing schema
const products = defineCollection({
  type: 'content',
  schema: z.object({
    // ... existing fields ...
    madeToOrder: z.boolean().default(false),  // NEW
  }),
});
```

### Product Frontmatter for MTO Example
```yaml
# src/content/products/enamel-vase.md — suggested MTO example (stock: 1 → 0)
name: "Enamel Vase"
code: "RC-EV-033"
price: 4800
collection: "Monsoon Series"
category: "vases"
material: "Stoneware Clay"
stock: 0
madeToOrder: true
images: ["/images/Enamel.jpg"]
featured: false
```

### Breadcrumb Navigation (no library needed)
```astro
<!-- Simple HTML breadcrumb — no component needed for 3 levels -->
<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol>
    <li><a href="/shop">Shop</a></li>
    <li><a href={`/shop?collection=${encodeURIComponent(product.data.collection)}`}>{product.data.collection}</a></li>
    <li aria-current="page">{product.data.name}</li>
  </ol>
</nav>
```

### GLightbox Initialization (vanilla JS)
```html
<!-- In BaseLayout.astro <head> or page-level -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox@3.3.1/dist/css/glightbox.min.css">

<!-- In shop/[slug].astro <script> block -->
<script>
  // Source: https://biati-digital.github.io/glightbox/
  import GLightbox from 'glightbox';  // if npm, OR use global if CDN

  const lightbox = GLightbox({
    selector: '.product-lightbox-trigger',
    touchNavigation: true,
    loop: false,
    autoplayVideos: false,
  });
</script>

<!-- Trigger markup -->
<a href={fullSizeImageUrl} class="product-lightbox-trigger" data-gallery="product-images">
  <Image src={img} alt={product.data.name} ... />
</a>
```

### Commission CTA with Dual Channel
```astro
---
import { getInstagramDMLink } from '../utils/instagram';
import { getWhatsAppLink } from '../utils/whatsapp';

const commissionMsg = `Hi, I'd like to commission ${product.data.name} (${product.data.code})`;
const igLink = getInstagramDMLink();
const waLink = getWhatsAppLink(commissionMsg);
---

<div class="commission-cta">
  <p class="commission-label">Commission This Piece</p>
  <div class="commission-actions">
    <a href={igLink} target="_blank" rel="noopener" class="btn btn-instagram">DM on Instagram</a>
    <a href={waLink} target="_blank" rel="noopener" class="btn btn-whatsapp">WhatsApp Us</a>
  </div>
</div>
```

### Deriving Unique Collections at Build Time
```typescript
// In shop.astro frontmatter — derive filter options from actual data
const allProducts = await getCollection('products');
const collections = ['All', ...new Set(allProducts.map(p => p.data.collection))].sort();
// Result: ['All', 'Earthen Table', 'Monsoon Series', 'Morning Ritual', 'Signature', 'Wabi-Sabi Home']
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `entry.slug` | `entry.id` | Astro 5 (late 2024) | Compat shim still works but `.id` is authoritative; use `.id` in all new code |
| `<img src="/images/...">` | `<Image src={importedImg} />` | Phase 2 of this project | WebP, lazy loading, correct sizing — product pages must use the imageMap pattern |
| Public folder images | `src/assets/images/` imports | Phase 2 (partial) | Product images still in `/public` — Phase 3 must complete the migration |
| `type: 'content'` legacy | `loader: glob()` new Content Layer | Astro 5 (late 2024) | Legacy still works in Astro 5.18; no need to migrate now, but avoid adding new legacy collections |

**Deprecated/outdated:**
- `product.slug`: Works in Astro 5 via compat shim but not canonical. LatestPieces.astro uses it — should be updated to `.id` in this phase for consistency with new route params.
- `<img src="/images/...">`: Still works but bypasses Astro Image optimization. All Phase 3 new components must use `<Image />` with imported sources.

## Open Questions

1. **Maker photo for About section**
   - What we know: About section needs "2-3 sentences + maker photo" (CONTEXT.md)
   - What's unclear: No maker photo exists in `src/assets/images/` or `public/images/` — `abyee.jpg` (already in src/assets) appears to be a craft/process photo that could serve as maker photo placeholder
   - Recommendation: Use `abyee.jpg` as placeholder maker photo; note in plan that real maker portrait needed before launch

2. **`mugs-fatured-image.jpg` (typo in filename)**
   - What we know: Both `espresso-cup-ember.md` and `mug-midnight.md` reference `/images/mugs-fatured-image.jpg` (typo: "fatured" not "featured")
   - What's unclear: Should the filename be corrected as part of Phase 3 image migration?
   - Recommendation: Copy as-is to `src/assets/images/` maintaining the typo'd name; update frontmatter to correct spelling only if time permits (not critical)

3. **GLightbox with npm vs CDN for this project**
   - What we know: Project has no GLightbox dependency in package.json yet; Astro 5 can bundle npm packages in `<script>` tags
   - What's unclear: CDN is simpler for static site but adds external network dependency; npm avoids CDN but requires correct CSS import path
   - Recommendation: Use npm (`bun add glightbox`) and import CSS in page frontmatter (`import 'glightbox/dist/css/glightbox.css'`) + JS in `<script>` tag. More robust than CDN for production.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None — Astro static site, no test runner configured |
| Config file | None (no pytest.ini, jest.config.*, vitest.config.*) |
| Quick run command | `bun run build` — build must complete without errors |
| Full suite command | `bunx astro check && bun run build` — type check + build |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| GAL-01 | /shop page renders all 12 products | smoke | `bun run build` (check dist/shop/index.html exists) | ❌ Wave 0 |
| GAL-02 | Filter pills render with data-collection attrs | smoke | `bun run build` (check HTML attrs in output) | ❌ Wave 0 |
| GAL-03 | Stock badges render correct class per product state | smoke | `bun run build` (check badge markup) | ❌ Wave 0 |
| GAL-04 | Commission CTA renders for MTO products | smoke | `bun run build` (check commission-cta in MTO product HTML) | ❌ Wave 0 |
| GAL-05 | /shop/[slug] generates for all 12 products | smoke | `bun run build` (check dist/shop/ for 12 HTML files) | ❌ Wave 0 |
| GAL-06 | GLightbox trigger markup present on detail pages | smoke | `bun run build` (check .product-lightbox-trigger in output) | ❌ Wave 0 |
| GAL-07 | All product images use Astro Image (WebP output) | smoke | `bun run build` (check /_astro/*.webp in dist) | ❌ Wave 0 |
| GAL-08 | Piece code badge visible on product cards | smoke | `bun run build` (check .product-card-code in output) | ✅ (existing ProductCard) |
| ABOUT-01 | About section exists on /shop page | smoke | `bun run build` (check .about-maker section in dist/shop) | ❌ Wave 0 |
| INTL-01 | Shipping note text present near CTA | smoke | `bun run build` (grep "buyer's risk" in dist/shop) | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `bun run build` (must pass, ~5 seconds)
- **Per wave merge:** `bunx astro check && bun run build`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] No test runner configured — all validation is build-based (smoke tests via HTML output inspection)
- [ ] Manual browser check needed for GLightbox interactivity (cannot automate without Playwright)
- [ ] Manual check needed for filter fade transition timing (CSS/JS interaction not testable at build time)

Note: "Wave 0" here means the first plan (03-01) should ensure `bun run build` is green as a baseline before adding new pages. The build is currently clean.

## Sources

### Primary (HIGH confidence)
- Astro docs — https://docs.astro.build/en/guides/content-collections/ — getStaticPaths + content collections pattern
- Astro docs — https://docs.astro.build/en/guides/routing/ — dynamic routes, params/props pattern
- Astro docs — https://docs.astro.build/en/guides/images/ — Image component, imageMap pattern
- Project codebase (direct inspection) — InstagramFeed.astro, LatestPieces.astro, ProductCard.astro, config.ts — confirmed existing patterns
- `bun run build` output (direct execution) — confirmed build is clean at start of phase

### Secondary (MEDIUM confidence)
- GLightbox GitHub releases — https://github.com/biati-digital/glightbox/releases — v3.3.1 published January 21, 2025; 4.0.0-beta active in March 2025
- GLightbox docs — https://biati-digital.github.io/glightbox/ — initialization API
- Astro 5 upgrade guide — https://docs.astro.build/en/guides/upgrade-to/v5/ — entry.slug → entry.id change

### Tertiary (LOW confidence)
- WebSearch result (unverified): GLightbox ~20-25k weekly npm downloads suggesting still widely used
- WebSearch result (unverified): Astro 5 legacy `type: 'content'` compat shim preserves `.slug` property

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All libraries already installed or confirmed working; imageMap pattern verified in production build
- Architecture: HIGH — Astro static routing, getStaticPaths, and content collection patterns verified against official docs
- Pitfalls: HIGH for items 1, 2, 3 (verified in codebase); MEDIUM for 4, 5 (GLightbox CSS, edge cases)
- GLightbox maintenance: MEDIUM — Last stable release Jan 2025, beta active; not abandoned but not fast-moving

**Research date:** 2026-03-12
**Valid until:** 2026-04-12 (stable ecosystem; Astro minor releases unlikely to break patterns used here)
