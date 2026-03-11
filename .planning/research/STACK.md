# Stack Research

**Domain:** Studio pottery / artisan e-commerce website (enhancements to existing Astro 5 static site)
**Researched:** 2026-03-12
**Confidence:** MEDIUM-HIGH — core choices verified against official docs and npm; experimental API status confirmed via GitHub issues

---

## Context: What Already Exists

Do not re-install or redesign around:

- **Astro 5.17.1** — static output, Content Collections, Vercel adapter
- **TypeScript 5.9.3** — strict mode
- **@astrojs/vercel 9.0.4** — deployment adapter
- **Vanilla JS** in `<script>` tags — zero client frameworks, this stays
- **Plain CSS** with custom properties — no preprocessor, this stays
- **Google Fonts via `<link>`** — DM Serif Display, Cormorant Garamond, Inter

The table below covers only what needs to be **added** for the gallery, form, and redesign features.

---

## Recommended Stack (Additions Only)

### Gallery & Lightbox

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| GLightbox | 3.3.1 | Full-screen image lightbox for gallery | 11KB gzipped, pure JS (no jQuery), MIT license, keyboard + touch + zoom, works with static Astro with no build-step integration needed — just import the JS/CSS |
| CSS `columns` layout | Native | Masonry-style gallery grid | CSS `column-count` + `column-gap` produces a masonry layout with zero JS and full browser support. Native CSS masonry (`grid-template-rows: masonry`) is Chrome 140+ only — not usable in production yet. Columns layout is the safe fallback |
| Vanilla JS data-filter pattern | Native | Collection filtering by category/collection | Static Astro renders all cards into the DOM at build time; vanilla JS shows/hides by toggling `hidden` attribute based on `data-collection` attribute. No library needed for 12–50 products. Isotope and Shuffle.js are overkill for this scale |

**Gallery filtering implementation note:** Astro static pages cannot read URL search parameters at build time (confirmed in Astro docs). Filter state must live entirely in client-side JS. Implement as: render all products, attach `data-collection="earthenware"` attributes in the Astro template, and use a single `<script>` block with click handlers on filter buttons to toggle `hidden`. This is the standard approach for Astro static gallery pages.

### Forms

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Web3Forms | API-based (no package) | Workshop inquiry form submission | Free tier: 250 submissions/month, no credit card required, built-in hCaptcha spam protection, email delivery, no backend needed. Deploy on Vercel with zero config. Formspree starts at $10/month for comparable features. Netlify Forms requires Netlify hosting. Web3Forms is the correct choice for a Vercel-hosted static site with low volume |

**Integration pattern:** HTML `<form>` with `action="https://api.web3forms.com/submit"` and a hidden `<input name="access_key" value="YOUR_KEY">`. Plain HTML, no npm package required. Spam protection via hCaptcha (free, included). Access key registered at web3forms.com with no credit card.

### Typography (Self-Hosted Upgrade)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro experimental Fonts API | Astro 5.17+ | Self-host fonts from Google/Fontsource | Eliminates Google Fonts third-party request, improves privacy and Core Web Vitals. Fonts are downloaded at build time and served from `_astro/fonts/`. Configured in `astro.config.mjs`. This project is already on 5.17.1, so it's available — enable with `experimental: { fonts: true }` |

**Important:** The Fonts API had a breaking syntax change in v5.17.0. If enabling it, use the current `fontProviders.google()` / `fontProviders.fontsource()` function syntax — not the old `{ entrypoint }` object syntax. See official docs at `https://docs.astro.build/en/reference/experimental-flags/fonts/`.

**Alternative if experimental API feels risky:** Keep current Google Fonts `<link>` tags but add `rel="preconnect"` and `crossorigin` attributes. Lower risk, lower reward.

### Images

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro `<Image />` and `<Picture />` (built-in) | Built into Astro 5 | Automatic WebP/AVIF conversion, responsive `srcset`, prevents CLS | Already available via `astro:assets` — `@astrojs/image` was deprecated in Astro v3. For the gallery page with many pottery images, `<Picture />` with `formats={['avif', 'webp']}` and `widths={[400, 800, 1200]}` is the standard pattern. Sharp is the default processor and runs at build time for static sites |

**No additional npm package required.** Sharp is bundled with Astro's default image service for static output.

---

## Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@fontsource/dm-serif-display` | latest | Self-host DM Serif Display as npm package | If NOT using Astro experimental Fonts API — import once in BaseLayout, removes Google CDN dependency for this font |
| `@fontsource-variable/cormorant-garamond` | latest (updated 2025-09-08) | Self-host Cormorant Garamond as variable font | If NOT using Astro experimental Fonts API — variable font includes weights 300–700 + italic in a single file, better than multiple discrete weight files |

**Recommendation:** Use the Astro experimental Fonts API rather than Fontsource npm packages. The Fonts API handles both fonts in one config block and gives you preload hints automatically. The Fontsource packages are the right fallback if the experimental API proves unstable during development.

---

## Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `npx astro check` | TypeScript checking for `.astro` files | Already configured. Run before each commit when modifying component props |
| `npm run build` then `npm run preview` | Verify gallery filtering and form markup in production output | Critical for catching issues specific to static output (e.g., search param stripping) |

---

## Installation

```bash
# GLightbox — lightbox for gallery
npm install glightbox

# ONLY if skipping Astro experimental Fonts API:
npm install @fontsource/dm-serif-display
npm install @fontsource-variable/cormorant-garamond

# No install for Web3Forms — it's an API, not a package
# No install for Astro <Image>/<Picture> — built into astro:assets
```

**GLightbox usage in an Astro component:**

```astro
---
// GalleryPage.astro — server-side, no changes needed
---
<script>
  import GLightbox from 'glightbox';
  import 'glightbox/dist/css/glightbox.min.css';

  const lightbox = GLightbox({ selector: '.gallery-item' });
</script>
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Web3Forms (free API) | Formspree | If you need Slack/Sheets integrations or >250 submissions/month (starts at $10/mo) |
| Web3Forms (free API) | Netlify Forms | If you migrate hosting to Netlify (free tier: 100 submissions/month) |
| GLightbox | lightgallery.js | If you need thumbnail strips, social sharing, or full plugin ecosystem. More complex, larger bundle |
| GLightbox | LiteLight (<10KB) | If even GLightbox's 11KB is too heavy — less mature project |
| CSS `columns` masonry | Isotope.js / Shuffle.js | If you have >100+ items with complex sort/reorder animation. Overkill for 12–50 pottery pieces |
| Astro experimental Fonts API | Google Fonts `<link>` | If experimental API adds friction during a tight deadline — `<link>` with `preconnect` is still acceptable |
| Astro `<Image />` built-in | Cloudinary / imgix | If you need runtime image transforms, user-uploaded images, or CDN-level resizing. Not needed for a static product catalog |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `@astrojs/image` (npm package) | Deprecated since Astro v3. Package still exists on npm but points to `astro:assets` docs | Astro built-in `<Image />` and `<Picture />` from `astro:assets` |
| Isotope.js | Requires jQuery or a special vanilla build, GPLv3 license (not MIT), last meaningful update 2021 | Vanilla JS `data-filter` pattern with `hidden` attribute toggling |
| React/Vue/Svelte for filtering | Violates the project constraint of zero client frameworks; adds hydration overhead | Vanilla JS + `data-*` attributes |
| Netlify Forms | Requires Netlify hosting; this project deploys to Vercel | Web3Forms |
| CSS native masonry (`grid-template-rows: masonry`) | Chrome 140+ only as of 2026-03 — not safe for production | CSS `column-count` masonry or standard CSS Grid |
| `scrollreveal` npm package | Adds JS where CSS IntersectionObserver (already in codebase via BaseLayout.astro) handles the same job | Extend the existing BaseLayout `fade-in` + `IntersectionObserver` pattern |
| Variable fonts for DM Serif Display | DM Serif Display only has one weight (400) — no variable font exists | `@fontsource/dm-serif-display` (static, weight 400 only) |

---

## Stack Patterns by Variant

**If building the gallery as a new page (`/gallery`) rather than a homepage section:**
- Create `src/pages/gallery.astro` using `getCollection('products')` directly
- Group products by `collection` field in Astro frontmatter, render all groups
- Filter buttons show/hide entire collection groups via vanilla JS
- GLightbox initializes on `DOMContentLoaded` across all images on the page

**If building the gallery as a filtered section on the homepage:**
- Same pattern, but scoped to the `<LatestPieces>` section component
- Filter state resets on page reload (acceptable for a static site)

**If the workshop form needs to go to a custom thank-you page:**
- Add a hidden `<input name="redirect" value="https://redcocoon-website.vercel.app/thank-you">` to the Web3Forms form
- Create `src/pages/thank-you.astro`
- No backend work required

**If the Astro experimental Fonts API causes build failures:**
- Remove `experimental: { fonts: true }` from `astro.config.mjs`
- Fall back to `@fontsource/dm-serif-display` and `@fontsource-variable/cormorant-garamond` npm imports
- Add `import '@fontsource/dm-serif-display'` to `BaseLayout.astro`

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| glightbox@3.3.1 | astro@5.x, TypeScript 5.x | Pure JS, no Astro-specific integration needed. Import as ESM in `<script>` tags |
| Astro experimental Fonts API | astro@5.17.x | Breaking syntax change in 5.17.0 — must use `fontProviders.google()` function syntax, not old `{ entrypoint }` object |
| astro:assets `<Image />` | astro@5.x | Built-in, no compatibility concerns |
| Web3Forms | Any static site | API-only, no npm package, no compatibility constraints |
| @fontsource-variable/cormorant-garamond | Any Astro/bundler | Variable font, weights 300–700 |
| @fontsource/dm-serif-display | Any Astro/bundler | Static only, weight 400 (DM Serif Display has no variable axis) |

---

## Sources

- `https://docs.astro.build/en/guides/images/` — Confirmed `astro:assets` built-in, Sharp default, `@astrojs/image` deprecated. HIGH confidence.
- `https://docs.astro.build/en/reference/experimental-flags/fonts/` — Astro experimental Fonts API, provider syntax for 5.17+. HIGH confidence.
- `https://github.com/withastro/astro/issues/15515` — Confirmed breaking syntax change in 5.17.0, API is not dead. HIGH confidence.
- `https://github.com/biati-digital/glightbox` — GLightbox 3.3.1, MIT, 11KB gzipped, keyboard/touch/zoom. MEDIUM confidence (version confirmed via cdnjs; npm page says "published a year ago" which warrants checking activity).
- `https://web3forms.com/pricing` — Free tier: 250 submissions/month, no credit card, hCaptcha included. HIGH confidence.
- `https://fontsource.org/fonts/cormorant-garamond/install` — `@fontsource-variable/cormorant-garamond` package name, weights 300–700, updated 2025-09-08. HIGH confidence.
- `https://www.npmjs.com/package/@fontsource/dm-serif-display` — Package name confirmed. MEDIUM confidence (DM Serif Display single-weight nature inferred from Google Fonts; variable font absence not explicitly confirmed via official Fontsource page).
- MDN `https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout` — CSS native masonry browser support (Chrome 140+ only). HIGH confidence.
- WebSearch (multiple results) — CSS `column-count` masonry as safe cross-browser approach. MEDIUM confidence.
- WebSearch — Astro static pages cannot read URL search params at build time (confirmed in Astro docs search result excerpt). HIGH confidence.

---

*Stack research for: Redcocoon pottery studio — gallery, forms, visual redesign additions*
*Researched: 2026-03-12*
