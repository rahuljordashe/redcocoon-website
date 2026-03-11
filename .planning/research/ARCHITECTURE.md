# Architecture Research

**Domain:** Artisan pottery studio / static inquiry-driven e-commerce
**Researched:** 2026-03-12
**Confidence:** HIGH (existing codebase is source of truth; patterns verified against Astro 5 docs and community)

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Build Time (Astro SSG)                      │
│                                                                       │
│  ┌──────────────┐    ┌──────────────┐    ┌───────────────────────┐  │
│  │ Content Layer │    │  Pages Layer  │    │  Component Layer      │  │
│  │              │    │               │    │                       │  │
│  │ products/*.md│───▶│ index.astro   │───▶│ Hero, LatestPieces,   │  │
│  │ config.ts    │    │ shop.astro    │    │ ProductCard, etc.     │  │
│  │ (Zod schema) │    │ shop/[slug]   │    │                       │  │
│  └──────────────┘    │ workshop.astro│    └───────────────────────┘  │
│                      └──────────────┘                                │
│                             │                                        │
│                             ▼                                        │
│                    ┌────────────────┐                                │
│                    │  dist/ output  │                                │
│                    │  Static HTML   │                                │
│                    │  + embedded JS │                                │
│                    └────────────────┘                                │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Browser (Runtime)                             │
│                                                                       │
│  ┌───────────────────┐    ┌──────────────────┐                       │
│  │  Gallery Filter   │    │  Form Handler    │                       │
│  │  (vanilla JS)     │    │  (vanilla JS     │                       │
│  │                   │    │   → Formspree)   │                       │
│  │  data-category    │    │                  │                       │
│  │  show/hide        │    │  fetch POST      │                       │
│  │  classList toggle │    │  success state   │                       │
│  └───────────────────┘    └──────────────────┘                       │
│                                                                       │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │              Persistent DOM State                              │   │
│  │  Scroll effects  |  Mobile menu  |  FloatingContactButton      │   │
│  └───────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      External Services                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────────┐    │
│  │  Instagram DM  │  │    WhatsApp    │  │     Formspree      │    │
│  │  ig.me/m/...   │  │    wa.me/...   │  │  form submissions  │    │
│  └────────────────┘  └────────────────┘  └────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `BaseLayout.astro` | HTML scaffold, global scripts, persistent UI | Navbar, Footer, FloatingContactButton, BottomTabBar |
| `src/pages/index.astro` | Home page composition | BaseLayout, all section components |
| `src/pages/shop.astro` | Gallery page with client-side filtering | BaseLayout, GalleryGrid (new), ProductCard |
| `src/pages/shop/[slug].astro` | Individual product detail page | BaseLayout, ProductCard |
| `src/pages/workshop.astro` | Workshop inquiry landing page | BaseLayout, WorkshopForm (new) |
| `LatestPieces.astro` | Home-page featured products (max 6) | getCollection('products'), ProductCard |
| `GalleryGrid.astro` (new) | Full product gallery with filter UI | getCollection('products'), ProductCard, FilterBar |
| `FilterBar.astro` (new) | Filter pill buttons by collection/category | Renders into GalleryGrid, driven by data-attributes |
| `ProductCard.astro` | Single product tile with DM CTA | format.ts, instagram.ts utilities |
| `WorkshopForm.astro` (new) | Workshop inquiry form | Formspree endpoint (POST via fetch) |
| `ReservationFlow.astro` | Multi-step DM/WhatsApp/Form guide | instagram.ts, whatsapp.ts utilities |
| `global.css` | Design tokens + global styles | All components reference CSS custom properties |

## Recommended Project Structure

```
src/
├── content/
│   ├── config.ts              # Zod schemas — add workshops collection here if needed
│   └── products/*.md          # Existing product data (12 files)
├── pages/
│   ├── index.astro            # Existing home page
│   ├── shop.astro             # NEW: full gallery page with filtering
│   ├── shop/
│   │   └── [slug].astro       # NEW: individual product detail page
│   └── workshop.astro         # NEW: workshop inquiry page
├── components/
│   ├── [existing components]  # Keep as-is during redesign
│   ├── GalleryGrid.astro      # NEW: renders all products + embeds filter data
│   ├── FilterBar.astro        # NEW: filter pill UI (category + collection)
│   └── WorkshopForm.astro     # NEW: inquiry form component
├── layouts/
│   └── BaseLayout.astro       # Existing — minimal changes for new pages
├── styles/
│   └── global.css             # Existing — extend tokens, never delete existing vars
└── utils/
    ├── instagram.ts           # Existing
    ├── whatsapp.ts            # Existing
    └── format.ts              # Existing
```

### Structure Rationale

- **pages/shop.astro:** The gallery filtering pattern for an Astro static site means all product cards must be in the DOM at build time — vanilla JS hides/shows them. A dedicated page avoids polluting the home page.
- **components/GalleryGrid.astro:** Wraps both FilterBar and the product grid so filtering logic is co-located. Embeds all product metadata as `data-*` attributes at build time so JavaScript never needs to fetch anything.
- **components/FilterBar.astro:** Pure presentational — renders filter pill buttons, JavaScript in GalleryGrid handles click → filter. Stateless at build, animated by JS at runtime.
- **pages/workshop.astro:** Workshop inquiry is a separate page (not a modal) so it can be deep-linked from social and has its own SEO title.
- **styles/global.css:** All redesign tokens are additions or modifications to `:root` custom properties — never remove existing vars until confirmed unused (prevents silent breakage in components you haven't touched yet).

## Architectural Patterns

### Pattern 1: Build-Time Data Embedding for Client-Side Filtering

**What:** Astro renders all product cards as static HTML. Each card carries its filter criteria as `data-*` attributes. JavaScript reads these attributes at runtime to show/hide cards.

**When to use:** Any time you need client-side filtering on a static site. No framework, no API call at runtime.

**Trade-offs:**
- Pro: Zero runtime latency, no fetch, no hydration cost
- Pro: Works with JS disabled (all products visible — graceful degradation)
- Con: All products must be in the initial HTML payload (fine for ~50 products, not for thousands)

**Example:**
```astro
<!-- GalleryGrid.astro (build time) -->
{allProducts.map(product => (
  <article
    class="product-card"
    data-category={product.data.category}
    data-collection={product.data.collection}
    data-stock={product.data.stock > 0 ? 'available' : 'sold-out'}
  >
    <ProductCard {...product.data} slug={product.slug} />
  </article>
))}

<script>
  // Runtime: filter by reading data-* attributes
  const cards = document.querySelectorAll('[data-category]');
  function applyFilter(category) {
    cards.forEach(card => {
      const match = category === 'all' || card.dataset.category === category;
      card.style.display = match ? '' : 'none';
    });
  }
</script>
```

### Pattern 2: CSS Custom Property Layering for Visual Redesign

**What:** All visual changes happen by updating CSS custom property values in `:root`. Components reference tokens (`var(--color-terracotta)`) not raw values. Redesign = update tokens, not hunt through every component.

**When to use:** Visual redesign pass where the component structure stays the same but spacing, color, or type scale changes.

**Trade-offs:**
- Pro: Change one token, all components update atomically
- Pro: Zero risk of breaking component structure (HTML untouched)
- Con: Structural layout changes (grid columns, section ordering) still require component edits

**Example:**
```css
/* global.css — redesign updates only the :root block */
:root {
  /* Existing tokens preserved */
  --color-terracotta: #C17747;
  --color-cream: #F5F0E8;

  /* Updated or added tokens for redesign */
  --color-terracotta: #B56A3A;     /* Slightly deeper, warmer */
  --space-section: var(--space-5xl);  /* New semantic token */
  --font-size-hero: clamp(2.5rem, 6vw, 5rem);  /* Fluid type */
}
```

### Pattern 3: Formspree for Zero-Backend Forms

**What:** HTML form POSTs to a Formspree endpoint URL. Formspree forwards submission to email. JavaScript intercepts submit event, uses `fetch` for AJAX submission, shows success/error state.

**When to use:** Any contact or inquiry form on a static site deployed to Vercel (no server, no backend).

**Trade-offs:**
- Pro: No backend code, no environment secrets required in production
- Pro: Vercel has a first-party Formspree integration (auto environment variable setup)
- Pro: Free tier handles low-volume inquiry forms (50 submissions/month free)
- Con: Formspree branding on free tier (upgrade removes it)
- Con: External service dependency (mitigated by graceful degradation — form still works without JS via full-page POST)

**Example:**
```astro
<!-- WorkshopForm.astro -->
<form
  id="workshop-form"
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
>
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message"></textarea>
  <button type="submit">Send Inquiry</button>
  <p class="form-success" hidden>We'll be in touch!</p>
</form>

<script>
  const form = document.getElementById('workshop-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      form.querySelector('.form-success').hidden = false;
      form.reset();
    }
  });
</script>
```

### Pattern 4: Additive Component Enhancement (Redesign Strategy)

**What:** When redesigning, work section-by-section. Mark each component with a CSS class scoped to the redesign pass. Old styles remain in place until the new scoped styles are complete and verified, then old styles are removed.

**When to use:** Redesigning a site where users are actively visiting (prevents half-broken states mid-build).

**Trade-offs:**
- Pro: Existing pages remain functional while redesign is in progress
- Pro: Changes are reversible (remove new class, fall back to old styles)
- Con: Temporarily more CSS to manage

## Data Flow

### Gallery Filter Flow

```
Build time:
  getCollection('products')
      ↓
  All products rendered as HTML cards
  Each card: data-category="cups", data-collection="everyday"
      ↓
  FilterBar buttons rendered: data-filter="all|cups|bowls|..."
      ↓
  dist/shop/index.html (static, all cards present)

Runtime (user clicks filter):
  FilterBar button click
      ↓
  JS reads button's data-filter value
      ↓
  JS iterates all [data-category] cards
      ↓
  show/hide via CSS class or style.display
      ↓ (optional)
  URL hash update: window.location.hash = '#cups'
  (allows deep-linking to filtered state)
```

### Workshop Inquiry Flow

```
User fills WorkshopForm
    ↓
JS intercepts submit (preventDefault)
    ↓
fetch POST to Formspree endpoint
    ↓ (success)
Show inline success message
Reset form fields
    ↓ (failure)
Show error message, preserve field values
    ↓ (fallback: JS disabled)
Full-page POST to Formspree → Formspree success page
```

### Visual Redesign Data Flow

```
Design decision (color/type/spacing change)
    ↓
Update CSS custom property in :root (global.css)
    ↓
All components referencing that token update at compile time
    ↓
No component .astro files touched
    ↓ (structural changes)
Edit component .astro markup/layout
    ↓
Scoped <style> in component handles isolation
```

### State Management

```
Filter state:
  FilterBar click → JS classList on cards (transient, page lifetime)
  URL hash → optional persistence across refresh

Form state:
  DOM form fields (native browser state)
  success/error: JS sets hidden attribute on message elements

Navigation state:
  Existing pattern: MobileMenu classList toggle
  Unchanged by gallery/form additions
```

## Suggested Build Order

Dependencies between new components flow in this order — build from data upward:

```
1. Content Schema (config.ts)
   └─ Add any new fields needed for gallery (e.g., tags, sold status)

2. Product pages (shop/[slug].astro)
   └─ Requires: ProductCard (existing), getStaticPaths + getCollection pattern
   └─ Can reuse ProductCard as-is

3. GalleryGrid + FilterBar components
   └─ Requires: ProductCard (existing), all products have correct category/collection fields
   └─ FilterBar is dumb UI — build GalleryGrid first with inline filter script

4. shop.astro page
   └─ Requires: GalleryGrid, BaseLayout (existing)
   └─ Hook up LatestPieces "View All" link → /shop

5. WorkshopForm component
   └─ Requires: Formspree account + endpoint URL
   └─ Pure HTML/JS — no dependency on content collections

6. workshop.astro page
   └─ Requires: WorkshopForm, BaseLayout (existing)

7. Visual redesign pass (global.css + component scoped styles)
   └─ No dependencies on above — can overlap with any step
   └─ Start with global.css token updates, then section-by-section
   └─ Do NOT start redesign before new pages exist (redesign should cover all pages)
```

## Anti-Patterns

### Anti-Pattern 1: Fetch-at-Runtime for Gallery Data

**What people do:** Build a gallery that calls an API endpoint or fetches a JSON file at page load to populate product cards.

**Why it's wrong:** Introduces loading states, CORS concerns, and latency on a site that is already fully static. Astro already gives you the data at build time.

**Do this instead:** Embed all product data as static HTML at build time via `getCollection()`. Use `data-*` attributes for any information JavaScript needs to filter.

### Anti-Pattern 2: Separate Filter Page Per Category (Static Routes)

**What people do:** Create `shop/cups.astro`, `shop/bowls.astro`, etc. as separate pages for each category.

**Why it's wrong:** Full page reload on filter change feels slow and breaks the gallery browsing UX. Each filter change should be instant (DOM manipulation), not a navigation event.

**Do this instead:** Single `shop.astro` with all cards, vanilla JS filtering with optional URL hash for deep-linking.

### Anti-Pattern 3: Removing Existing CSS Variables During Redesign

**What people do:** Clean up `global.css` by deleting old token values when updating them.

**Why it's wrong:** Multiple components reference these tokens. Deleting a token before auditing all usages causes silent visual breakage — the browser falls back to `initial` values (often black or 0), which is hard to spot without visual testing of every component.

**Do this instead:** Update token values in place. Only delete after confirming zero usages via search (`grep -r 'var(--token-name)' src/`). Add new tokens alongside old ones during transition.

### Anti-Pattern 4: Inline Form POST Without JavaScript Fallback

**What people do:** Intercept the form submit with JavaScript only, removing the `action` attribute so the form does nothing without JS.

**Why it's wrong:** Mobile browsers in Sri Lanka and internationally have variable JS environments. A form that silently does nothing is worse than a full-page POST.

**Do this instead:** Keep the `action="https://formspree.io/f/..."` on the form element. JavaScript enhances with AJAX; without JS the form still submits via browser's native POST.

### Anti-Pattern 5: Mixing Redesign and Feature Work in One Phase

**What people do:** Try to redesign the visual system and add new pages simultaneously, editing the same components.

**Why it's wrong:** Merge conflicts and confusion about which changes are "feature" vs "visual." Bugs are harder to bisect.

**Do this instead:** Treat the gallery page build and the visual redesign as separate, sequential phases. Build new pages against the existing design system first, then apply the redesign uniformly to all pages (old + new) in a dedicated pass.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Instagram DM | Client-side link (`ig.me/m/redcocoon`) via `src/utils/instagram.ts` | No API key, no backend — pure link generation |
| WhatsApp | Client-side link (`wa.me/94777720696?text=...`) via `src/utils/whatsapp.ts` | Pre-filled messages encoded in URL |
| Formspree | HTML `<form action>` + optional `fetch` POST | Free tier: 50 submissions/month. Vercel has native integration. Register form at formspree.io, get endpoint ID |
| Google Fonts | `<link>` in BaseLayout `<head>` | DM Serif Display, Cormorant Garamond, Inter — already loaded |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Content Collections → Components | `getCollection('products')` called in component frontmatter | Build-time only; zero runtime coupling |
| global.css → All Components | CSS custom properties on `:root`, referenced as `var(--token)` | Redesign changes tokens; components pick up automatically |
| GalleryGrid → FilterBar | Props: list of available categories/collections | FilterBar renders buttons; GalleryGrid script handles click events |
| WorkshopForm → Formspree | `fetch` POST with `FormData` | Endpoint URL is the only configuration needed |
| ProductCard → instagram.ts | Import `getInstagramDMLink()` | Pure function, no side effects, used at render time |
| BaseLayout → Persistent UI | Direct `import` and `<Component />` | FloatingContactButton, BottomTabBar mount once in layout |

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current: 12 products | Everything in one HTML page; fine as-is |
| 50 products | Still fine; gallery filtering via DOM is fast for <200 items |
| 200+ products | Consider `getStaticPaths` to generate per-category static pages; client-side filter becomes slow |
| 500+ products | Introduce a search API (Pagefind, Algolia free tier) rather than DOM iteration |

The current 12-product catalog (and likely <50 at any point) means the single-page filter approach is the correct one — no premature architecture needed.

## Sources

- [Astro 5 Content Collections docs](https://docs.astro.build/en/guides/content-collections/) — getCollection(), filter callbacks, build-time data
- [Astro 5.0 release post](https://astro.build/blog/astro-5/) — Content Layer and static output patterns
- [Formspree Vercel integration](https://vercel.com/docs/integrations/cms/formspree) — MEDIUM confidence; official Vercel docs
- [W3Schools portfolio filtering](https://www.w3schools.com/howto/howto_js_portfolio_filter.asp) — data-attributes + classList filter pattern
- [Building an Astro photo gallery](https://jankraus.net/2024/04/05/how-to-build-a-simple-photo-gallery-with-astro/) — Astro-specific gallery implementation
- Existing codebase (`src/components/`, `src/content/`, `src/pages/`) — PRIMARY source; HIGH confidence

---
*Architecture research for: Redcocoon artisan pottery studio — Astro 5 static site*
*Researched: 2026-03-12*
