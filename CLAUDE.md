# Redcocoon Website — Astro Build

## Project
Handmade pottery studio (Colombo, Sri Lanka). Rebuilding as Astro static site with Content Collections.

## Commands
- `npm run dev` — dev server
- `npm run build` — production build to `dist/`
- `npx astro check` — typecheck

## Architecture
- **Astro static** (`output: 'static'`) with `@astrojs/vercel` adapter
- **Zero client frameworks** — all interactivity is vanilla JS in `<script>` tags
- **Content Collections** for products (`src/content/products/*.md`, Zod schema in `src/content/config.ts`)
- **WhatsApp reservation flow** — no cart/checkout, use `src/utils/whatsapp.ts` helpers

## Design System
- Ported from `../New Draft Website/styles.css` into `src/styles/global.css`
- Colors: terracotta `#C17747`, cream `#F5F0E8`, espresso `#2A2420`, sage `#8B9E6B`
- Fonts: DM Serif Display (headings), Cormorant Garamond (accents), Inter (body) — loaded via Google Fonts `<link>`
- CSS custom properties on `:root`, scoped `<style>` per component

## Source References
- `../New Draft Website/styles.css` — visual design (CSS vars, component styles, responsive)
- `../New Draft Website/script.js` — animation behaviors (scroll, tilt, nav, preloader)
- `../New Draft Website/index.html` — SEO meta tags, HTML patterns, structured data
- `../redcocoon-wireframe.jsx` — page structure, section ordering, nav links, bottom tab bar

## Key Decisions
- Hero uses wireframe's **dark gradient** bg, not draft's cream bg
- Section order follows wireframe: Hero → LatestPieces → CollectionBanner → Hospitality → Process → InstagramFeed → ReservationFlow
- Instagram feed: static placeholder images initially (no API)
- Mobile: hamburger menu + bottom tab bar (both)
- WhatsApp number placeholder in `src/utils/whatsapp.ts` — needs real number before launch

## Build Progress
See `~/.claude/projects/.../memory/MEMORY.md` for wave status and session plans.
