# Architecture

**Analysis Date:** 2026-03-12

## Pattern Overview

**Overall:** Static Site Generation (Astro)

**Key Characteristics:**
- Zero client frameworks — all interactivity is vanilla JavaScript in `<script>` tags
- Content Collections for structured product data (Markdown + Zod schema)
- Multi-channel reservation flow (Instagram DM, WhatsApp, Form)
- Component-based page structure with reusable sections
- Server-side page composition, client-side progressive enhancement

## Layers

**Layout Layer:**
- Purpose: Shared HTML structure, metadata, global scripts
- Location: `src/layouts/BaseLayout.astro`
- Contains: Header template, footer, navigation, SEO meta tags, scroll listeners, animation setup
- Depends on: Component imports (Navbar, Footer, BackToTop, etc.)
- Used by: All page files (currently just `index.astro`)

**Page Layer:**
- Purpose: Route-level entry point that composes sections
- Location: `src/pages/index.astro`
- Contains: Section imports and composition (Hero → LatestPieces → Process → Footer)
- Depends on: Layout template, section components
- Used by: Astro router (maps to `/`)

**Section Components Layer:**
- Purpose: Discrete page sections with self-contained styling and behavior
- Location: `src/components/` (Hero, LatestPieces, InstagramFeed, ReservationFlow, etc.)
- Contains: Grid layouts, card grids, form structures, copy, images
- Depends on: Utility functions (instagram.ts, whatsapp.ts, format.ts), sub-components
- Used by: Page files

**Sub-components Layer:**
- Purpose: Reusable elements within sections (e.g., ProductCard, SectionHeader)
- Location: `src/components/ProductCard.astro`, `src/components/SectionHeader.astro`
- Contains: Card templates, header patterns
- Depends on: Utility functions, CSS variables
- Used by: Section components (LatestPieces uses ProductCard)

**Navigation/Persistent UI:**
- Purpose: Fixed/modal navigation and contact affordances
- Location: `src/components/Navbar.astro`, `src/components/MobileMenu.astro`, `src/components/FloatingContactButton.astro`, `src/components/BottomTabBar.astro`
- Contains: Header navigation, mobile hamburger menu, mobile FAB, bottom tab bar
- Depends on: Utility functions
- Used by: BaseLayout

**Utility Layer:**
- Purpose: Shared logic for external service integration
- Location: `src/utils/`
- Contains: Link generators (Instagram DM, WhatsApp, pricing formatter)
- Depends on: None
- Used by: All components that need external links

**Data Layer:**
- Purpose: Content structure and schema
- Location: `src/content/config.ts`, `src/content/products/*.md`
- Contains: Zod schema definition for products, markdown product files with frontmatter
- Depends on: None (consumed by Astro Content Collections API)
- Used by: LatestPieces component (via `getCollection('products')`)

**Style Layer:**
- Purpose: Design system and global styles
- Location: `src/styles/global.css`, scoped `<style>` blocks in components
- Contains: CSS custom properties (colors, typography, spacing), reset, keyframes, utilities
- Depends on: None
- Used by: All components

## Data Flow

**Product Display Flow:**

1. `src/pages/index.astro` renders `<LatestPieces />` component
2. `src/components/LatestPieces.astro` calls `getCollection('products')`
3. Astro reads `src/content/products/*.md` files, validates against schema in `src/content/config.ts`
4. LatestPieces filters for `featured: true`, maps over array
5. For each product, passes props to `<ProductCard />`
6. ProductCard renders image, code badge, price, stock, and "DM to Reserve" button
7. DM button calls `getInstagramDMLink()` utility to generate Instagram DM URL
8. On client: ProductCard script adds tilt effect (3D rotation) on mouse move

**Reservation Flow:**

1. User browses products on home page
2. User clicks "DM to Reserve" on ProductCard or "DM Us to Order" in InstagramFeed
3. Gets Instagram DM link via `getInstagramDMLink()` (opens `ig.me/m/redcocoon`)
4. Alternative: Click ReservationFlow step 2 channel badges (Instagram, WhatsApp, or Form)
5. WhatsApp flow: `getWhatsAppLink()` encodes product name + price into message
6. Form link goes to `#contact-form` (anchors to reservation section)

**Scroll Animation Flow:**

1. Page loads, BaseLayout script adds `fade-in` class to animated elements
2. Sets staggered `transitionDelay` (index % 4 * 0.1s) for cascade effect
3. IntersectionObserver triggers when elements reach 15% threshold
4. Adds `visible` class when intersecting, removes observer
5. RAF-throttled scroll listener handles:
   - Header glassmorphism (at 60px)
   - Back-to-top button visibility (at 600px)
   - Parallax-lite on hero image (desktop, 0.08 multiplier)

**State Management:**

- Navigation menu toggle: `MobileMenu.astro` script uses DOM classList
- FloatingContactButton popup: Toggle with `container.classList.toggle('open')`, close on ESC/click-outside
- No persistent state; all state is DOM-based (classList)

## Key Abstractions

**Section Component Pattern:**

Each section (Hero, LatestPieces, InstagramFeed) follows:
```
<section class="section-name" id="anchor">
  <div class="container">
    {section markup}
  </div>
</section>

<style>
  .section-name {
    padding: var(--space-5xl) 0;
    background: {color};
  }
  /* Grid, typography, responsive rules */
</style>

<script>
  // Optional: animation, event handling
</script>
```

**Link Generator Pattern:**

`src/utils/instagram.ts`:
- `getInstagramDMLink()` — returns `https://ig.me/m/redcocoon`
- `getInstagramProfileLink()` — returns `https://instagram.com/redcocoon`

`src/utils/whatsapp.ts`:
- `getWhatsAppLink(message)` — encodes message, returns `wa.me/NUMBER?text=...`
- `getReserveLink(productName, price)` — builds pre-filled reserve message
- `getQuoteLink()` — builds hospitality inquiry message

All components import these functions and use them as link hrefs.

**Product Card Abstraction:**

`src/components/ProductCard.astro` receives:
- `name`, `code`, `price`, `currency`, `images`, `stock`, `slug`
- Renders: image with code badge, info section, DM button
- Behavior: Tilt effect on desktop hover (3D perspective)

Decouples product presentation from where it's used (LatestPieces, future shop page).

**CSS Utility System:**

Global CSS variables for:
- **Colors:** `--color-terracotta`, `--color-cream`, `--color-espresso`, etc.
- **Spacing:** `--space-xs` through `--space-5xl`
- **Typography:** `--font-serif`, `--font-elegant`, `--font-sans`
- **Transitions:** `--transition-fast`, `--transition-med`, `--transition-slow`

All component styles reference these, enabling design consistency and easy theming.

## Entry Points

**Page Entry:**
- Location: `src/pages/index.astro`
- Triggers: Astro build, page request to `/`
- Responsibilities: Compose sections, pass layout template to BaseLayout

**Layout Entry:**
- Location: `src/layouts/BaseLayout.astro`
- Triggers: Page component uses it
- Responsibilities: HTML scaffold, SEO, global scripts, persistent UI (nav, footer, FAB)

**Client Script Entry Points (in BaseLayout):**
- Scroll listener: RAF-throttled, handles header/parallax/back-to-top
- Fade-in observer: IntersectionObserver for scroll animations
- Anchor smooth scroll: Click handler for `a[href^="#"]`

## Error Handling

**Strategy:** Graceful degradation

**Patterns:**
- Missing images: Lazy loading with `loading="lazy"`, fallback to alt text
- Missing product data: Zod schema validates on build (build fails if invalid)
- JavaScript disabled: Vanilla JS enhancements (tilt, scroll effects) degrade gracefully
- Mobile menu toggle: NoScript-safe with `aria-expanded`, manual class toggle
- Contact buttons: Always provide link, even if target opens in new tab

## Cross-Cutting Concerns

**Logging:** No structured logging; uses `console` if debugging needed (not in production)

**Validation:** Zod schema in `src/content/config.ts` validates product data at build time

**Authentication:** None (static site, no auth required)

**Error Boundaries:** None (Astro static generation catches config errors at build)

**Accessibility:**
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`)
- ARIA labels on buttons, modals, and interactive elements
- Skip link: `<a href="#main-content" class="skip-link">`
- Respects `prefers-reduced-motion` for parallax
- Focus management in FloatingContactButton (ESC to close)

---

*Architecture analysis: 2026-03-12*
