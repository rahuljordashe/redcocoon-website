# Codebase Structure

**Analysis Date:** 2026-03-12

## Directory Layout

```
redcocoon-website/
├── .planning/codebase/          # GSD planning documents
├── public/                      # Static assets (images, logo)
│   ├── logo.svg
│   └── images/                  # Product, section, process images
├── src/
│   ├── components/              # Astro components (sections, UI elements)
│   ├── content/                 # Content Collections (products)
│   │   ├── config.ts            # Zod schema for products
│   │   └── products/            # Markdown product files
│   ├── layouts/                 # BaseLayout (wrapper template)
│   ├── pages/                   # Route-based pages (index.astro → /)
│   ├── styles/                  # Global styles
│   └── utils/                   # Utility functions (links, formatters)
├── astro.config.mjs             # Astro config
├── package.json                 # Dependencies, scripts
└── tsconfig.json                # TypeScript config
```

## Directory Purposes

**public/:**
- Purpose: Static assets served as-is (images, icons)
- Contains: Logo, product/section images (jpg, png, svg)
- Key files: `logo.svg` (header/footer), `images/*.jpg` (product photos, process images, Instagram feed)
- Committed: Yes
- Served at: `/` in build (e.g., `/logo.svg`, `/images/399x650-01.png`)

**src/components/:**
- Purpose: Reusable Astro components (sections, UI elements)
- Contains: Section components (Hero, LatestPieces, Process, etc.), sub-components (ProductCard, SectionHeader, etc.), navigation (Navbar, MobileMenu, FloatingContactButton, BottomTabBar)
- Key files:
  - Sections: `Hero.astro`, `LatestPieces.astro`, `InstagramFeed.astro`, `ReservationFlow.astro`, `Process.astro`, `Hospitality.astro`, `CollectionBanner.astro`
  - Sub-components: `ProductCard.astro`, `SectionHeader.astro`
  - Navigation: `Navbar.astro`, `MobileMenu.astro`, `FloatingContactButton.astro`, `BottomTabBar.astro`
  - Utility: `Preloader.astro`, `BackToTop.astro`, `WhatsAppButton.astro`, `Footer.astro`

**src/content/config.ts:**
- Purpose: Zod schema for Content Collections
- Contains: Product collection schema with fields (name, code, price, currency, collection, category, material, stock, images, featured, description)
- Defines validation rules at build time

**src/content/products/:**
- Purpose: Markdown files containing product data
- Contains: 12 product files (e.g., `bowl-terracotta.md`, `enamel-vase.md`)
- Format: YAML frontmatter (name, code, price, currency, collection, category, stock, images, featured, description) + empty body
- Example:
  ```yaml
  ---
  name: "Bowl — Terracotta"
  code: "RC-BT-018"
  price: 3200
  currency: "LKR"
  collection: "Earthen Table"
  category: "bowls"
  stock: 4
  images: ["/images/Bowls5.jpg"]
  featured: true
  description: "Warm terracotta serving bowl..."
  ---
  ```

**src/layouts/BaseLayout.astro:**
- Purpose: Wrapper template for all pages
- Contains: HTML scaffold, SEO meta tags, Google Fonts links, structured data (schema.org), persistent UI (Navbar, MobileMenu, Footer, BackToTop, BottomTabBar, FloatingContactButton), global scripts (scroll, animations)
- Accepts props: `title`, `description`
- Default title: "Redcocoon Pottery — Artisan Ceramics & Handmade Pottery"

**src/pages/:**
- Purpose: Route-based pages (maps to URLs)
- Key files: `index.astro` (home page, `/`)
- Current: Single index.astro page composing all sections
- Future: Additional pages (e.g., `shop.astro`, `about.astro`)

**src/styles/global.css:**
- Purpose: Global design system and reset
- Contains:
  - CSS custom properties (colors, typography, spacing, transitions)
  - Reset (*, html, body)
  - Keyframes (float, scrollPulse, fade-in animations)
  - Button utilities (`.btn`, `.btn-primary`, `.btn-ghost`, `.btn-instagram`, `.btn-whatsapp`)
  - Container layout (max-width, padding)
  - Utility classes (`.container`, `.skip-link`, fade-in classes)

**src/utils/:**
- Purpose: Shared utility functions
- Key files:
  - `instagram.ts`: `getInstagramDMLink()`, `getInstagramProfileLink()` (Instagram username: `redcocoon`)
  - `whatsapp.ts`: `getWhatsAppLink(message)`, `getReserveLink(productName, price)`, `getQuoteLink()` (WhatsApp number: `94777720696`)
  - `format.ts`: `formatPrice(amount, currency)` (formats as "LKR 3,200")

## Key File Locations

**Entry Points:**
- `src/pages/index.astro`: Home page (root route `/`)
- `src/layouts/BaseLayout.astro`: HTML template for all pages
- `astro.config.mjs`: Build configuration

**Configuration:**
- `src/content/config.ts`: Content Collections schema
- `tsconfig.json`: TypeScript settings
- `package.json`: Dependencies, build scripts

**Core Logic:**
- Product data: `src/content/products/*.md` (12 files)
- Product display: `src/components/LatestPieces.astro` (queries products, renders grid)
- Product card: `src/components/ProductCard.astro` (reusable product template)
- Sections: `src/components/Hero.astro`, `Process.astro`, `InstagramFeed.astro`, `ReservationFlow.astro`, etc.

**Utilities:**
- Link generation: `src/utils/instagram.ts`, `src/utils/whatsapp.ts`
- Formatting: `src/utils/format.ts`

**Styling:**
- Global: `src/styles/global.css` (colors, typography, spacing)
- Scoped: Each `.astro` component has `<style>` block

**Images:**
- Product photos: `public/images/*.jpg` (named: Bowls5.jpg, Plates1.jpg, etc.)
- Process images: `public/images/*.jpg`
- Instagram feed: `public/images/*.jpg`
- Hero image: `public/images/399x650-01.png`
- Logo: `public/logo.svg`

## Naming Conventions

**Files:**
- Components: PascalCase, `.astro` extension (e.g., `ProductCard.astro`, `LatestPieces.astro`)
- Utilities: camelCase, `.ts` extension (e.g., `instagram.ts`, `format.ts`)
- Products: kebab-case, `.md` extension (e.g., `bowl-terracotta.md`, `enamel-vase.md`)
- CSS/Images: kebab-case or camelCase (e.g., `global.css`, `399x650-01.png`)

**Directories:**
- Plural (components, layouts, pages, utils)
- Lowercase
- Semantic (content, styles)

**CSS Classes:**
- BEM-inspired: `.component-name`, `.component-name__element`, `.component-name--modifier`
- Examples: `.product-card`, `.product-card-image`, `.product-card-reserve`, `.footer-cta-banner`, `.nav-links`
- Utilities: `.container`, `.skip-link`, `.btn`, `.btn-primary`, `.fade-in`

**CSS Variables:**
- Prefix: `--color-`, `--font-`, `--text-`, `--space-`, `--transition-`, `--ls-` (letter-spacing)
- Format: kebab-case (e.g., `--color-terracotta`, `--space-lg`, `--font-serif`)

**Props in Components:**
- Interface: `Props` interface above frontmatter separator `---`
- Pattern: `interface Props { propName: type; }`
- Destructure: `const { propName } = Astro.props;`

**Product Codes:**
- Format: `RC-{CATEGORY}-{NUMBER}` (e.g., `RC-BT-018`, `RC-EM-042`)
- Displayed on product cards as code badge

## Where to Add New Code

**New Section/Page:**
1. Create component in `src/components/SectionName.astro`
2. Add section markup with `.container` div
3. Scoped `<style>` with responsive queries
4. Optional `<script>` for interactivity
5. Import in `src/pages/index.astro` or new page file
6. Add navigation link in `src/components/Navbar.astro` and `Footer.astro` if needed

**New Product:**
1. Create markdown file `src/content/products/product-name.md`
2. Add YAML frontmatter matching schema in `src/content/config.ts`
3. Required fields: name, code, price, collection, category, images
4. Set `featured: true` to show in LatestPieces (max 6 featured)
5. Images should be in `public/images/`

**New Component:**
1. Create `src/components/ComponentName.astro`
2. Define `interface Props` if accepting props
3. Destructure props: `const { propName } = Astro.props;`
4. Use CSS variables for colors, spacing
5. Add scoped `<style>` with responsive media queries (1024px, 768px breakpoints)
6. Optional `<script>` for vanilla JS interactivity

**New Utility Function:**
1. Create `src/utils/category.ts`
2. Export named function: `export function functionName(...): ReturnType { }`
3. Use in components: `import { functionName } from '../utils/category';`

**New Global Style:**
1. Add CSS rule to `src/styles/global.css`
2. Use existing CSS variables
3. Or define new variable in `:root` if site-wide

**New Link/CTA:**
- Instagram DM: `import { getInstagramDMLink } from '../utils/instagram';` → use as `href={getInstagramDMLink()}`
- WhatsApp: `import { getWhatsAppLink } from '../utils/whatsapp';` → use as `href={getWhatsAppLink('message')}`

## Special Directories

**public/:**
- Purpose: Static files served without processing
- Generated: No
- Committed: Yes (images, logo)
- Access: `/images/filename.jpg` at runtime

**src/content/:**
- Purpose: Content Collections data
- Generated: No (hand-written markdown)
- Committed: Yes
- Validated: Zod schema at build time

**.planning/codebase/:**
- Purpose: GSD (Get Stuff Done) planning documents
- Generated: Yes (by orchestrator)
- Committed: No (git-ignored)
- Contains: ARCHITECTURE.md, STRUCTURE.md, etc.

## Responsive Breakpoints

**Defined in Component Styles:**
- Desktop: default (no media query)
- Tablet: `@media (max-width: 1024px)` — 3-column grids, adjusted padding
- Mobile: `@media (max-width: 768px)` — 2-column grids, stacked layouts, hamburger menu
- Small mobile: `@media (max-width: 480px)` — 2-column Instagram grid, single-column sections

## Build Outputs

**Build Command:** `npm run build`

**Output:** `dist/` directory (deployed to Vercel)

**Key Files:**
- `dist/index.html` — compiled home page
- `dist/images/` — copied from public/
- `dist/logo.svg` — copied from public/

---

*Structure analysis: 2026-03-12*
