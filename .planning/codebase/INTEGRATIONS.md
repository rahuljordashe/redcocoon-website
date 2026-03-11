# External Integrations

**Analysis Date:** 2026-03-12

## APIs & External Services

**Social Messaging:**
- WhatsApp - Reservation channel via deep links
  - Implementation: `src/utils/whatsapp.ts` with `wa.me/` URL scheme
  - Phone: +94 777720696
  - Usage: ProductCard CTAs, FloatingContactButton, Footer buttons

- Instagram - DM-first messaging + profile showcase
  - Implementation: `src/utils/instagram.ts` with `ig.me/m/` and `instagram.com/` links
  - Handle: @redcocoon
  - Usage: FloatingContactButton, InstagramFeed section, Footer buttons
  - Helper functions: `getInstagramDMLink()`, `getInstagramProfileLink()`

## Data Storage

**Databases:**
- None - Static site, no runtime database

**Content Management:**
- Astro Content Collections - `src/content/products/` markdown files with YAML frontmatter
  - Collection: `products`
  - Schema defined in: `src/content/config.ts`
  - 12 product markdown files (based on memory)
  - No dynamic database queries at runtime

**File Storage:**
- Local filesystem only
  - Images: `public/images/` directory
  - Static assets: `public/` directory (logo.svg, favicon, image files)
  - Instagram feed placeholder images: 10.jpg, abyee.jpg, Tea-coffee-set5.jpg, Kitchen-ware1.jpg, Wall-deco5.jpg, Enamel.jpg

**Caching:**
- None - Static site generation eliminates runtime caching needs
- Build-time optimization only via Astro's static output

## Authentication & Identity

**Auth Provider:**
- None required - Public website with no user accounts
- All contact flows are outbound links (WhatsApp, Instagram DM)

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Not detected - Console output during development only

**Analytics:**
- Not detected - No Google Analytics or Plausible integration found

## CI/CD & Deployment

**Hosting:**
- Vercel (production environment)
  - Project: redcocoon-website
  - URL: https://redcocoon-website.vercel.app
  - Project ID: prj_JhzK2EYpaLvf8jJWwsFB9r9nV7Ws
  - Org ID: team_2QhGu9TlhNgjYr64HH1mVqxg

**Git Integration:**
- GitHub repository: https://github.com/rahuljordashe/redcocoon-website
- GitHub user: rahuljordashe
- Vercel auto-deploys on push to main/master branch

**CI Pipeline:**
- Vercel handles build and deployment automatically
- No separate CI service (GitHub Actions, etc.) detected
- Build command: `npm run build` → `astro build` → outputs to `dist/`
- Preview: `npm run preview` for local production simulation

**Adapter:**
- @astrojs/vercel 9.0.4 - Configured in `astro.config.mjs`

## Environment Configuration

**Required env vars:**
- None - All configuration hardcoded in source files

**Optional env vars:**
- Not used in codebase

**Secrets location:**
- WhatsApp number: hardcoded in `src/utils/whatsapp.ts` (public contact info, not a secret)
- Instagram handle: hardcoded in `src/utils/instagram.ts` (public handle, not a secret)

**Configuration approach:**
- Compile-time constants only
- All values embedded at build time into static HTML/CSS/JS
- No runtime environment loading

## Font Delivery

**Google Fonts:**
- DM Serif Display - Loaded in `src/layouts/BaseLayout.astro` via `<link>`
- Cormorant Garamond - Loaded in `src/layouts/BaseLayout.astro` via `<link>`
- Inter - Loaded in `src/layouts/BaseLayout.astro` via `<link>`
- Font request: https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- All contact flows are user-initiated via link opens:
  - WhatsApp deep link (`wa.me/94777720696?text=...`)
  - Instagram DM deep link (`ig.me/m/redcocoon`)
  - Manual form submission (link anchor to `#contact-form` section in ReservationFlow)

## Structured Data

**Schema.org:**
- Organization schema embedded in `src/layouts/BaseLayout.astro`
- Fields: name, url, logo, description, address (Colombo, LK)
- Type: Organization

**Open Graph & Twitter Cards:**
- og:title, og:description, og:image, og:url, og:type, og:site_name
- twitter:card, twitter:title, twitter:description, twitter:image
- Canonical URL: https://redcocoon-pottery.vercel.app

## No External Dependencies

**Explicitly absent:**
- No API integrations (Stripe, Supabase, Sanity, etc.)
- No session/cookie management
- No form backend (submissions not implemented)
- No CDN (Vercel serves all static assets)
- No email service
- No SMS service
- No push notifications
- No third-party chat/support tools
- No tracking/analytics libraries

---

*Integration audit: 2026-03-12*
