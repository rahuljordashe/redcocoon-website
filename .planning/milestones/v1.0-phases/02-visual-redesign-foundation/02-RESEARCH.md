# Phase 02: Visual Redesign Foundation - Research

**Researched:** 2026-03-12
**Domain:** CSS design systems, Astro font self-hosting, Astro Image component, touch target accessibility
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Color usage & mood**
- Alternating section rhythm: light (cream) and dark (espresso) sections alternate as you scroll
- Hero is LIGHT (cream #F5F0E8 background) — NOT the dark gradient from the wireframe. Espresso heading text, terracotta CTA, hero image as focal point
- Dark sections (Process, Collection Banner, Reserve, Footer): solid espresso #2A2420 background with cream text and terracotta CTAs
- Terracotta (#C17747) is THE primary accent color — all primary CTAs, active states, hover highlights. Sage and espresso are supporting cast
- Light sections alternate subtly between cream (#F5F0E8) and off-white (#FDFBF7) to avoid "same section" feel

**Typography scale & hierarchy**
- Bold, commanding headings: ~3rem / 48px on desktop, ~2rem / 32px on mobile (DM Serif Display)
- Subheadings/taglines: ~1.25rem / 20px (Cormorant Garamond) — appears under section headings and in product card subtitles
- Body text bumped to 1rem / 16px (Inter) — up from current 0.92rem
- Clear 3-tier hierarchy: DM Serif Display (headings) → Cormorant Garamond (accents/taglines) → body sans-serif

**Visual texture & depth**
- Noise texture on dark sections only (espresso backgrounds at ~3.5% opacity using existing --noise-texture SVG)
- Light/cream sections stay clean — no texture
- Soft box-shadows on product cards and CTA blocks (e.g., 0 4px 20px rgba(0,0,0,0.06))
- Subtle lift shadow on card/CTA hover states
- No section dividers — color alternation handles visual separation
- Images: 12px border-radius with soft shadow, overflow hidden to clip

**Section spacing & rhythm**
- Generous vertical padding: 6-8rem top/bottom per section on desktop, 4rem on mobile
- Product grid: 3 columns desktop, 2 columns tablet, 2 columns mobile
- Scroll-triggered fade-in animations preserved (existing .fade-in / .visible system)
- Each section feels like its own scene with clear breathing room

### Claude's Discretion
- Font family selection — evaluate and pick the best combination for warm artisan feel (may keep current 3 or substitute)
- Exact letter-spacing and line-height values
- Font self-hosting approach (@fontsource vs Astro Fonts API — note STATE.md blocker about Astro 5.17.0 breaking change)
- Image pipeline migration details (Astro Image component usage)
- Touch target implementation specifics (44px minimum)
- Exact shadow values and hover transition timing
- Responsive breakpoint fine-tuning
- Light section shade mapping (which sections get cream vs off-white)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| VIS-01 | Site has a warm, earthy visual identity with updated spacing, layout, and color usage across all sections | Section background mapping, spacing token additions, color rhythm system |
| VIS-02 | CSS custom property tokens are audited and all component styles use tokens (no hardcoded hex values) | Global.css token audit findings, hardcoded value inventory |
| VIS-03 | All interactive CTAs have minimum 44px touch targets on mobile | WCAG 2.5.8, padding formula, `.btn` audit, channel-badge audit |
| VIS-04 | Typography hierarchy is refined with clear heading/body/accent distinction | Font scale tokens, --text-base bump, heading clamp values |
| VIS-05 | Hero and section backgrounds use subtle ambient CSS texture (noise, grain, or gradient depth) | Existing --noise-texture SVG usage, pseudo-element pattern |
| VIS-06 | Fonts are self-hosted via Astro Fonts API or @fontsource (no Google Fonts CDN) | @fontsource packages confirmed, Astro Fonts API syntax verified |
| VIS-07 | Font loading uses font-display: swap with preconnect hints (no FOIT) | @fontsource ships font-display:swap by default; preload link pattern |
</phase_requirements>

---

## Summary

This phase is a CSS-first design pass with three focused workstreams: (1) token audit and section background/spacing system overhaul in `global.css` and every component's scoped `<style>`, (2) font self-hosting migration replacing Google Fonts CDN links, and (3) migrating `<img>` tags to Astro's `<Image />` component for build-time WebP optimization.

The codebase is in excellent shape for this work. All colors already live as CSS custom properties on `:root` in `src/styles/global.css`. The design token vocabulary (spacing scale, transitions, border-radius) is complete and consistent. The main gaps are: the `.btn` system uses `0.9rem` vertical padding that already achieves ~44px on desktop but needs verification on mobile; `--text-base` is set to `0.92rem` but must become `1rem`; the hero background is dark espresso but must become cream; and all product images are currently `<img>` tags pointing to `/images/` (public folder) — they cannot use the Astro `<Image />` component without moving them to `src/assets/`.

**Primary recommendation:** Use `@fontsource` packages (not Astro Fonts API) because the experimental API had a confirmed breaking syntax change in 5.17.0 and the project is already on Astro 5.17.1. @fontsource is stable, ships `font-display: swap` by default, and requires only npm install + import in BaseLayout.astro.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @fontsource/dm-serif-display | latest | Self-host DM Serif Display (weight 400, italic) | Stable npm package, font-display:swap built-in, no CDN dependency |
| @fontsource-variable/cormorant-garamond | latest | Self-host Cormorant Garamond as variable font | Variable version covers all weights 300-700 + italic in one file; smaller than loading individual weights |
| @fontsource-variable/inter | latest | Self-host Inter as variable font | Variable version covers all weights in one request; Inter is the body font |
| astro:assets `<Image />` | built-in (Astro 5.x) | Build-time WebP conversion, lazy loading, CLS prevention | Ships with Astro, no extra install, generates width/height automatically |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource/dm-serif-display (italic) | same package | Italic variant for `<em>` in hero title | Already used in `.hero-title em` |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @fontsource packages | Astro experimental Fonts API | Fonts API had breaking syntax change in 5.17.0 (project is on 5.17.1); API is still experimental, requires `experimental.fonts` config key, and has active open issues. @fontsource is battle-tested. |
| @fontsource-variable/inter | @fontsource/inter (static) | Static requires importing multiple weight-specific CSS files; variable is one import |
| Moving images to src/assets/ | Keep images in public/ | Keeping in public/ means `<Image />` cannot optimize them — must use `<img>` with manual `loading="lazy"`. Moving to src/assets/ enables WebP output and CLS-safe sizing. |

**Installation:**
```bash
npm install @fontsource/dm-serif-display @fontsource-variable/cormorant-garamond @fontsource-variable/inter
```

---

## Architecture Patterns

### Recommended Project Structure (changes only)
```
src/
├── assets/
│   └── images/          # Move product images here for <Image /> optimization
│       ├── 399x650-01.png
│       ├── mugs-fatured-image.jpg
│       └── ...
├── styles/
│   └── global.css       # Token additions, --text-base bump, section bg tokens
├── layouts/
│   └── BaseLayout.astro # Remove Google Fonts <link>, add @fontsource imports
└── components/
    ├── Hero.astro       # Cream bg, espresso text, updated touch targets
    ├── LatestPieces.astro  # Updated grid (3-col desktop), section bg
    ├── CollectionBanner.astro  # Dark espresso bg with noise
    ├── Process.astro    # Dark espresso bg with noise
    ├── InstagramFeed.astro  # Off-white bg
    ├── ReservationFlow.astro  # Cream bg, touch target audit on channel-badge
    ├── Footer.astro     # Noise already applied; audit CTA buttons
    ├── ProductCard.astro   # 12px radius, shadow, <Image /> migration
    └── Hospitality.astro   # Noise already applied; audit
```

### Pattern 1: @fontsource Import in BaseLayout.astro
**What:** Import font CSS from @fontsource packages in the layout frontmatter. The package injects `@font-face` rules with `font-display: swap` automatically.
**When to use:** All fonts — replaces the Google Fonts `<link>` block entirely.
**Example:**
```astro
---
// src/layouts/BaseLayout.astro
// REMOVE: <link href="https://fonts.googleapis.com/..."> block
// ADD these imports in the frontmatter:
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource-variable/cormorant-garamond';
import '@fontsource-variable/inter';
---
```
After this change, the CSS custom property values in `:root` (e.g., `--font-serif: 'DM Serif Display', 'Georgia', serif`) require no changes — the family names are identical. The Google Fonts `<link rel="preconnect">` and `<link href="https://fonts.googleapis.com/...">` lines are simply deleted.

Source: fontsource.org/fonts/dm-serif-display/install, fontsource.org/fonts/cormorant-garamond/install

### Pattern 2: Section Background with Noise on Dark Sections
**What:** Dark (espresso) sections apply the existing `--noise-texture` CSS variable as a background-image overlay via a child element or pseudo-element, not on the section itself (to avoid stacking context issues).
**When to use:** Hospitality (already done), Process, CollectionBanner (needs dark rebg), Footer (already done). NOT on light sections.
**Example (existing, confirmed working in Hospitality.astro and Footer.astro):**
```css
/* The pattern already in the codebase — replicate for Process and CollectionBanner */
.section-dark {
  background: var(--color-espresso);
  position: relative;
  overflow: hidden;
}
.section-dark-noise {
  position: absolute;
  inset: 0;
  background-image: var(--noise-texture);
  background-repeat: repeat;
  pointer-events: none;
  z-index: 1;
}
.section-dark .container {
  position: relative;
  z-index: 2;
}
```

### Pattern 3: Astro `<Image />` Component with Local Assets
**What:** Move images from `public/images/` to `src/assets/images/`, import them in component frontmatter, and pass to `<Image />`.
**When to use:** Any image that benefits from WebP conversion and lazy loading. Content Collections images stay as URL strings until Phase 3 (when content schema is reworked).
**Example:**
```astro
---
// ProductCard.astro — after migration
import { Image } from 'astro:assets';
import productImg from '../assets/images/mugs-fatured-image.jpg';
---
<Image src={productImg} alt={name} width={300} height={375} loading="lazy" />
```
**Important limitation:** Images referenced as strings in Content Collections frontmatter (`images: ["/images/foo.jpg"]`) cannot be automatically optimized by `<Image />` without changing the schema to use `image()` helper from `astro:content`. This schema change is scoped to Phase 3 (GAL-07). For Phase 2, migrate only the images that are hardcoded in component files (Hero, Process, CollectionBanner, InstagramFeed, Hospitality) — NOT the ProductCard images which come from frontmatter strings.

Source: docs.astro.build/en/guides/images/

### Pattern 4: 44px Touch Target Implementation
**What:** Ensure `min-height: 44px` on all interactive elements. The existing `.btn` uses `padding: 0.9rem 2rem` which computes to approximately 44.8px at 16px base — this passes. The problem areas are the `.channel-badge` elements in ReservationFlow (padding: 0.35rem 0.75rem — approx 22px) and `.product-card-reserve` (padding: 0.6rem 1rem — approx 28px).
**When to use:** All interactive elements on mobile.
**Example:**
```css
/* global.css — add to .btn if not already meeting 44px */
.btn {
  padding: 0.75rem 2rem;   /* 0.75rem × 2 + line-height ≈ 44px */
  min-height: 44px;        /* safety floor */
}

/* ReservationFlow channel badges — needs fix */
.channel-badge {
  padding: 0.6rem 1rem;    /* bump from 0.35rem to 0.6rem */
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}

/* ProductCard reserve button — needs fix */
.product-card-reserve {
  padding: 0.75rem 1rem;   /* bump from 0.6rem */
  min-height: 44px;
}
```
Source: WCAG 2.5.8, Apple HIG 44pt, Google Material 48dp recommendations

### Pattern 5: Section Background Alternation Mapping
**What:** Which sections get which background color, based on locked decisions.
**Mapping:**
```
Hero           → cream  (#F5F0E8)   — CHANGE from dark gradient
LatestPieces   → off-white (#FDFBF7) — currently --color-white, keep
CollectionBanner → espresso (#2A2420) + noise — CHANGE from terracotta gradient
Hospitality    → espresso (#2A2420) + noise — ALREADY CORRECT
Process        → espresso (#2A2420) + noise — CHANGE from --color-white
InstagramFeed  → cream (#F5F0E8) — CHANGE from --color-white
ReservationFlow → cream (#F5F0E8) — ALREADY CORRECT
Footer         → espresso (#2A2420) + noise — ALREADY CORRECT
```

### Anti-Patterns to Avoid
- **Hardcoding hex values in component `<style>` blocks:** Always use `var(--color-*)` tokens. The audit will reveal violations (e.g., `rgba(196, 68, 10, 0.27)` in Hero.astro background, `rgba(193, 119, 71, ...)` in hero circle).
- **Applying noise texture to light sections:** Noise only on espresso-background sections per locked decision.
- **Using `<img>` for hardcoded component images after migration:** Once moved to src/assets/, always use `<Image />` — never fall back to `<img>`.
- **Migrating ProductCard images in Phase 2:** The `images: z.array(z.string())` schema produces URL strings, not importable assets. Changing this requires a schema migration scoped to Phase 3 (GAL-07).
- **Using Astro experimental Fonts API:** Known breaking change at 5.17.0. The project is on 5.17.1. Use @fontsource instead.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font self-hosting + font-display:swap | Manual @font-face declarations with downloaded font files | @fontsource npm packages | @fontsource handles subsetting, WOFF2 generation, font-display:swap, and version pinning |
| WebP image conversion + lazy loading | Custom build script or sharp integration | Astro `<Image />` from `astro:assets` | Built into Astro, handles format conversion, CLS prevention, srcset, and lazy loading automatically |
| Noise/grain texture | Raster PNG texture file | Existing `--noise-texture` SVG data URI in `:root` | Already in the codebase, zero bytes downloaded, scales infinitely |

**Key insight:** The token and CSS work is the bulk of this phase — it is genuinely bespoke, no library replaces it. The dependencies are kept minimal (3 @fontsource packages, built-in Astro Image).

---

## Common Pitfalls

### Pitfall 1: Variable Font Family Name Mismatch
**What goes wrong:** After installing `@fontsource-variable/cormorant-garamond`, the CSS family name becomes `'Cormorant Garamond Variable'` — not `'Cormorant Garamond'`. If `--font-elegant` in `:root` still says `'Cormorant Garamond'`, the font does not load.
**Why it happens:** Variable font packages use a different registered family name suffix.
**How to avoid:** Either update the CSS variable, or import the static `@fontsource/cormorant-garamond` instead (uses original family name). For this project, updating `--font-elegant: 'Cormorant Garamond Variable', 'Georgia', serif` is the correct fix.
**Warning signs:** Font inspector shows system font (Georgia) rendering where Cormorant should appear.

### Pitfall 2: @fontsource Import Must Be in BaseLayout.astro Frontmatter
**What goes wrong:** Importing a @fontsource package in a component file (e.g., `Hero.astro`) means the `@font-face` is only injected when that component is on the page.
**Why it happens:** Astro's CSS bundler scopes styles per-component.
**How to avoid:** All font imports go in `BaseLayout.astro`'s frontmatter only — where they are guaranteed to be on every page.

### Pitfall 3: Hero Background Change Breaks Navbar Contrast
**What goes wrong:** Changing Hero from dark espresso to cream means the Navbar (which starts with transparent background and dark text colors) now shows properly — but the hero scroll indicator text (`rgba(255, 255, 255, 0.5)`) and `.hero-ghost` border (`rgba(255, 255, 255, 0.3)`) become invisible on cream.
**Why it happens:** Several Hero text colors assume a dark background.
**How to avoid:** Audit Hero.astro for every hardcoded white/rgba-white value and flip them to espresso/charcoal equivalents. Specific items:
- `.hero-scroll span` color → `var(--color-earth)` or similar
- `.scroll-line` → `var(--color-beige-dark)`
- `.hero-ghost` border-color and color → espresso/terracotta variants
- `.hero-tag` color → `var(--color-terracotta)` (already terracotta-light, safe)
- `.hero-title` color → `var(--color-espresso)` instead of `--color-white`
- `.hero-title em` → stays terracotta, already correct

### Pitfall 4: Images in public/ Cannot Be Processed by `<Image />`
**What goes wrong:** Passing `/images/foo.jpg` (a URL string) as the `src` prop to `<Image />` throws a build error — `<Image />` requires an imported asset object or a full URL to an external image, not a relative path string.
**Why it happens:** Astro's Image component needs the file to be in Vite's module graph to perform build-time transforms.
**How to avoid:** Any image used in a hardcoded component (Hero, Process, CollectionBanner, InstagramFeed, Hospitality) must be moved to `src/assets/images/` and imported. Images used in Content Collections frontmatter stay as strings until Phase 3.

### Pitfall 5: Product Grid Is Currently 4-Col on Desktop
**What goes wrong:** LatestPieces.astro uses `grid-template-columns: repeat(4, 1fr)` on desktop. Locked decisions specify 3 columns on desktop.
**Why it happens:** Built earlier without the 3-col decision locked in.
**How to avoid:** Update to `repeat(3, 1fr)` at 1024px+ breakpoint.

### Pitfall 6: token audit misses rgba() inline values
**What goes wrong:** The `global.css` token audit looks clean, but component `<style>` blocks contain hardcoded rgba() values like `rgba(0,0,0,0.06)` for shadows, `rgba(193,119,71,0.15)` for glows, and `rgba(255,255,255,0.3)` for borders. These are missed by a text search for hex values only.
**Why it happens:** RGBA values are not hex, so `grep '#'` misses them.
**How to avoid:** Shadow and opacity values like `rgba(0,0,0,0.06)` are acceptable (they're relative to any bg color). Hardcoded color RGBs that correspond to palette colors must be replaced with CSS custom properties.

---

## Code Examples

Verified patterns from official sources and existing codebase:

### Fontsource Installation and Import (BaseLayout.astro)
```astro
---
// Source: fontsource.org/fonts/*/install
// Remove entire Google Fonts <link> block from <head>
// Add these imports at top of BaseLayout.astro frontmatter:
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource-variable/cormorant-garamond';
import '@fontsource-variable/inter';
---
```

### Updated CSS Variable for Variable Font Name (global.css)
```css
/* Source: fontsource.org/fonts/cormorant-garamond/install */
:root {
  --font-serif:    'DM Serif Display', 'Georgia', serif;
  --font-elegant:  'Cormorant Garamond Variable', 'Georgia', serif; /* changed from 'Cormorant Garamond' */
  --font-sans:     'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; /* changed */
  --text-base: 1rem; /* bumped from 0.92rem per locked decision */
}
```

### New Spacing Token (global.css)
```css
/* Add to :root spacing section — needed for section padding */
:root {
  --space-6xl: 10rem; /* for generous desktop section padding */
}
/* Section padding pattern for light sections */
.section-light {
  padding: var(--space-5xl) 0; /* 8rem desktop */
}
@media (max-width: 768px) {
  .section-light {
    padding: var(--space-3xl) 0; /* 4rem mobile */
  }
}
```

### Hero Background Change (Hero.astro)
```astro
<style>
  .hero {
    /* BEFORE: dark gradient */
    /* background: linear-gradient(135deg, var(--color-espresso) ... ) */
    /* AFTER: cream */
    background: var(--color-cream);
    min-height: 100vh;
    /* etc */
  }

  .hero-title {
    color: var(--color-espresso); /* was --color-white */
  }

  .hero-tag {
    color: var(--color-terracotta); /* already near-correct */
  }

  .hero-ghost {
    color: var(--color-charcoal); /* was white */
    border-color: var(--color-beige-dark); /* was rgba(255,255,255,0.3) */
  }

  .hero-scroll span {
    color: var(--color-earth); /* was rgba(255,255,255,0.5) */
  }

  .scroll-line {
    background: var(--color-beige-dark); /* was rgba(255,255,255,0.3) */
  }
</style>
```

### Astro Image Component — Hardcoded Component Images
```astro
---
// Source: docs.astro.build/en/guides/images/
// CollectionBanner.astro example — after moving abyee.jpg to src/assets/images/
import { Image } from 'astro:assets';
import collectionPhoto from '../assets/images/abyee.jpg';
---
<Image
  src={collectionPhoto}
  alt="Monsoon Series collection piece"
  width={400}
  height={500}
  loading="lazy"
/>
```

### Process Dark Section Background Rebrand
```astro
<style>
  .process {
    /* BEFORE: background: var(--color-white) */
    /* AFTER: dark with noise */
    background: var(--color-espresso);
    position: relative;
    overflow: hidden;
  }
  .process-noise {
    position: absolute;
    inset: 0;
    background-image: var(--noise-texture);
    background-repeat: repeat;
    pointer-events: none;
    z-index: 1;
  }
  .process .container {
    position: relative;
    z-index: 2;
  }
  /* Flip text colors for dark bg */
  .step-content h3 {
    color: var(--color-cream); /* was --color-espresso */
  }
  .step-content p {
    color: var(--color-beige); /* was --color-clay */
  }
</style>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Google Fonts CDN `<link>` | @fontsource npm packages | Long-standing best practice | No third-party DNS lookup, GDPR-friendly, guaranteed font-display:swap |
| `<img loading="lazy">` for all images | Astro `<Image />` for src/assets/ images | Astro 2+ | Build-time WebP, automatic width/height, CLS prevention |
| Astro experimental Fonts API (pre-5.17) | @fontsource (fallback strategy) | Astro 5.17.0 breaking change | Experimental API syntax changed; @fontsource is stable alternative |
| Manual FOIT prevention via `<link rel="preload">` | font-display:swap in @font-face | CSS Fonts Level 4 | @fontsource provides this automatically |

**Deprecated/outdated in this project:**
- `<link rel="preconnect" href="https://fonts.googleapis.com">`: Remove after @fontsource migration (no longer connecting to Google)
- `--text-base: 0.92rem`: Outdated value, must become `1rem` per decision
- Hero dark gradient: Outdated per locked decision, becomes cream
- Process white background: Outdated per locked decision, becomes dark espresso

---

## Hardcoded Value Inventory (Token Audit Starting Point)

During the audit pass, these known violations need to be resolved:

| File | Hardcoded Value | Replace With |
|------|----------------|--------------|
| Hero.astro | `rgba(196, 68, 10, 0.27)` (bg gradient) | Remove — hero goes cream |
| Hero.astro | `rgba(193, 119, 71, 0.15)` (hero-circle) | `rgba from --color-terracotta with opacity` or remove |
| Hero.astro | `rgba(255, 255, 255, 0.3)` (ghost border) | `var(--color-beige-dark)` |
| Hero.astro | `rgba(255, 255, 255, 0.5)` (scroll text) | `var(--color-earth)` |
| Hero.astro | `color: var(--color-white, #fdfbf7)` | `var(--color-espresso)` (heading on cream bg) |
| Hero.astro | `rgba(193, 119, 71, 0.95)` (badge bg) | Keep — already close to terracotta; minor |
| Footer.astro | `#1fb855` (whatsapp hover) | `--color-whatsapp` dark variant or keep (brand color) |
| ProductCard.astro | `background: white` | `var(--color-white)` |
| ProductCard.astro | `rgba(42, 36, 32, 0.75)` (code badge) | Acceptable overlay (espresso at opacity) |
| Navbar.astro | `rgba(253, 251, 247, 0.92)` (scrolled bg) | `rgba(253, 251, 247, 0.92)` — close to `--color-white`, acceptable |
| ReservationFlow.astro | `channel-badge` padding `0.35rem` | Bump to meet 44px (touch target fix) |

---

## Open Questions

1. **Which light sections get cream vs. off-white?**
   - What we know: Locked decision says LatestPieces alternates subtly, cream vs off-white. ReservationFlow is specified as cream.
   - What's unclear: InstagramFeed and LatestPieces have no explicit assignment in locked decisions.
   - Recommendation: Claude's discretion — LatestPieces uses off-white (#FDFBF7 = `--color-white`), InstagramFeed uses cream (#F5F0E8 = `--color-cream`). This creates the intended alternation.

2. **CollectionBanner: Keep terracotta inner card or change to espresso?**
   - What we know: Locked decisions list "dark sections (Process, Collection Banner, Reserve, Footer)" as espresso.
   - What's unclear: CollectionBanner currently uses a terracotta gradient card inside a light section. Moving to full-width espresso bg changes the visual significantly.
   - Recommendation: Claude's discretion — per locked decision, CollectionBanner should be a dark espresso full-section background (no inner terracotta card). The terracotta accent moves to the CTA button only.

3. **Are 25 images in public/images/ all used in hardcoded components?**
   - What we know: 12 product files reference images as strings. Several images are used directly in components (Hero, Process, Hospitality, CollectionBanner, InstagramFeed).
   - What's unclear: Some images may be referenced in both places.
   - Recommendation: Only move images used in hardcoded component files to `src/assets/images/`. Images referenced as strings in frontmatter stay in `public/images/` for now.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — static Astro site, visual/build verification |
| Config file | none |
| Quick run command | `npm run build` (verifies no build errors) |
| Full suite command | `npm run build && npx astro check` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VIS-01 | Warm visual identity across all sections | manual | `npm run build` (build smoke) | N/A |
| VIS-02 | No hardcoded hex values in component styles | manual (grep audit) | `npm run build` | N/A |
| VIS-03 | All CTAs >= 44px touch targets | manual (DevTools) | `npm run build` | N/A |
| VIS-04 | Typography hierarchy visible | manual | `npm run build` | N/A |
| VIS-05 | Texture on dark sections | manual | `npm run build` | N/A |
| VIS-06 | No Google Fonts CDN requests | manual (Network tab) | `npm run build` (no Google Fonts link in output) | N/A |
| VIS-07 | font-display:swap, no FOIT | manual (Lighthouse) | `npm run build` | N/A |

### Sampling Rate
- **Per task commit:** `npm run build` — confirms no TS/Astro errors introduced
- **Per wave merge:** `npm run build && npx astro check`
- **Phase gate:** Full build green + manual browser verification before `/gsd:verify-work`

### Wave 0 Gaps
None — this phase has no automated test infrastructure to scaffold. All verification is build-time (Astro check) + manual browser inspection. No test files needed.

---

## Sources

### Primary (HIGH confidence)
- fontsource.org/fonts/dm-serif-display/install — package name, import syntax, font-display:swap confirmation
- fontsource.org/fonts/cormorant-garamond/install — variable font package name, family name suffix
- docs.astro.build/en/guides/images/ — Image component usage, src/ vs public/ limitation, content collection limitation
- docs.astro.build/en/reference/experimental-flags/fonts/ — current Fonts API syntax (post-5.17.0)
- Existing codebase (src/styles/global.css, all component files) — token inventory, current violations

### Secondary (MEDIUM confidence)
- github.com/withastro/astro/issues/15515 — Fonts API breaking change confirmed in 5.17.0, migration path documented
- fontsource.org/fonts/*/install — Inter variable package (@fontsource-variable/inter) confirmed

### Tertiary (LOW confidence)
- WCAG 2.5.8 target size guidance (w3.org) — 44px recommendation is Level AAA for WCAG 2.1, AA for 2.2 enhanced. The 44px floor is well-established cross-platform guidance.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — @fontsource packages verified on fontsource.org, Astro Image component is built-in
- Architecture: HIGH — based on direct codebase reading + official docs
- Pitfalls: HIGH — derived from actual component code analysis (specific line violations identified) + confirmed breaking change

**Research date:** 2026-03-12
**Valid until:** 2026-06-12 (stable stack; @fontsource and Astro Image are mature APIs)
