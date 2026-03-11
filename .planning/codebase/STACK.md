# Technology Stack

**Analysis Date:** 2026-03-12

## Languages

**Primary:**
- TypeScript 5.9.3 - Type safety for components and utilities
- Astro 5.17.1 - Meta-framework for static site generation

**Secondary:**
- JavaScript - Vanilla inline scripts in `.astro` components for interactivity

## Runtime

**Environment:**
- Node.js (version not specified in package.json - uses current LTS)

**Package Manager:**
- npm (version not specified)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Astro 5.17.1 - Static site generation with Content Collections, zero client-side frameworks
- TypeScript - Strict mode configuration via `astro/tsconfigs/strict`

**Build/Dev:**
- @astrojs/check 0.9.6 - TypeScript checking for Astro components
- @astrojs/vercel 9.0.4 - Vercel adapter for static output deployment

## Key Dependencies

**Critical:**
- astro 5.17.1 - Core SSG framework, handles routing, Content Collections, Markdown rendering
- @astrojs/vercel 9.0.4 - Production deployment adapter, configured for static output
- typescript 5.9.3 - Language and type checking

**Internal utilities:**
- `src/utils/whatsapp.ts` - WhatsApp link generation helpers
- `src/utils/instagram.ts` - Instagram DM and profile link helpers
- `src/utils/format.ts` - Formatting utilities (not analyzed in depth)

## Configuration

**Environment:**
- No `.env` file required - all configuration hardcoded or compile-time
- WhatsApp number: `94777720696` in `src/utils/whatsapp.ts`
- Instagram handle: `redcocoon` in `src/utils/instagram.ts`
- Site URL: `https://redcocoon-pottery.vercel.app` in `src/layouts/BaseLayout.astro`

**Build:**
- `astro.config.mjs` - Main build configuration:
  - Output: `static` (pure static HTML/CSS/JS)
  - Adapter: `@astrojs/vercel` for Vercel deployment
  - Site URL configured for SEO and canonical tags

**TypeScript:**
- `tsconfig.json` - Strict mode with Astro type definitions
- Includes `.astro/types.d.ts` for component type safety
- Excludes `dist` directory from checking

**Content Schema:**
- `src/content/config.ts` - Zod schema for products collection:
  - Required fields: `name`, `code`, `price`, `collection`, `category`
  - Optional fields: `description`
  - Defaults: `currency: 'LKR'`, `material: 'Stoneware Clay'`, `stock: 0`, `featured: false`
  - Categories enum: cups, plates, bowls, vases, sets, coasters, decor, kitchen

## CSS & Styling

**Typography (via Google Fonts):**
- DM Serif Display - Headings and prominent text
- Cormorant Garamond - Elegant accents
- Inter - Body text and UI

**Design System:**
- CSS custom properties on `:root` in `src/styles/global.css`
- Color palette: terracotta (#C17747), cream (#F5F0E8), espresso (#2A2420), sage (#8B9E6B)
- Instagram gradient: linear-gradient from purple → red → orange
- Spacing, typography, transitions, border radius all tokenized in global CSS

**No preprocessor:** Plain CSS with custom properties, no Sass/LESS

## Platform Requirements

**Development:**
- Node.js (current LTS recommended)
- npm or compatible package manager
- Code editor with TypeScript/Astro support (VSCode extensions configured in `.vscode/extensions.json`)

**Production:**
- Vercel hosting with static output
- Project ID: `prj_JhzK2EYpaLvf8jJWwsFB9r9nV7Ws`
- GitHub integration for auto-deployments from `https://github.com/rahuljordashe/redcocoon-website`

## Build Output

- `dist/` directory - Production build output (static HTML/CSS/JS)
- `.vercel/output/` - Vercel deployment artifacts

---

*Stack analysis: 2026-03-12*
