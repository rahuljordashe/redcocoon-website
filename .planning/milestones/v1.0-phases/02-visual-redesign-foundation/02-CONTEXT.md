# Phase 2: Visual Redesign Foundation - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the design system, image pipeline, and typography that all new pages inherit. Users experience a warm, earthy visual identity across every section, with audited CSS tokens, self-hosted fonts, optimized images, and 44px touch targets site-wide. No new pages or features — this is the visual foundation.

</domain>

<decisions>
## Implementation Decisions

### Color usage & mood
- Alternating section rhythm: light (cream) and dark (espresso) sections alternate as you scroll
- Hero is LIGHT (cream #F5F0E8 background) — NOT the dark gradient from the wireframe. Espresso heading text, terracotta CTA, hero image as focal point
- Dark sections (Process, Collection Banner, Reserve, Footer): solid espresso #2A2420 background with cream text and terracotta CTAs
- Terracotta (#C17747) is THE primary accent color — all primary CTAs, active states, hover highlights. Sage and espresso are supporting cast
- Light sections alternate subtly between cream (#F5F0E8) and off-white (#FDFBF7) to avoid "same section" feel

### Typography scale & hierarchy
- Bold, commanding headings: ~3rem / 48px on desktop, ~2rem / 32px on mobile (DM Serif Display)
- Subheadings/taglines: ~1.25rem / 20px (Cormorant Garamond) — appears under section headings and in product card subtitles
- Body text bumped to 1rem / 16px (Inter) — up from current 0.92rem
- Clear 3-tier hierarchy: DM Serif Display (headings) → Cormorant Garamond (accents/taglines) → body sans-serif

### Visual texture & depth
- Noise texture on dark sections only (espresso backgrounds at ~3.5% opacity using existing --noise-texture SVG)
- Light/cream sections stay clean — no texture
- Soft box-shadows on product cards and CTA blocks (e.g., 0 4px 20px rgba(0,0,0,0.06))
- Subtle lift shadow on card/CTA hover states
- No section dividers — color alternation handles visual separation
- Images: 12px border-radius with soft shadow, overflow hidden to clip

### Section spacing & rhythm
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

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `--noise-texture` CSS variable: SVG noise already defined in global.css `:root` — ready to apply to dark sections
- Button system: `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-instagram`, `.btn-whatsapp` — audit for 44px touch targets
- `.fade-in` / `.visible` classes + IntersectionObserver: scroll animation system already working
- Spacing scale: `--space-xs` through `--space-5xl` (0.25rem to 8rem) — may need `--space-6xl` for section padding
- Transition tokens: `--transition-fast`, `--transition-med`, `--transition-slow` with custom easing

### Established Patterns
- CSS custom properties on `:root` in `src/styles/global.css` — all tokens live here
- Scoped `<style>` per component — section-specific styles stay in components
- Google Fonts loaded via `<link>` in `BaseLayout.astro` — must migrate to self-hosted
- 768px as primary mobile breakpoint, 1024px for tablet
- `.container` class for max-width + padding wrapper

### Integration Points
- `src/styles/global.css`: Token definitions, button system, animations — primary edit target
- `src/layouts/BaseLayout.astro`: Font loading strategy changes here (remove Google Fonts links, add self-hosted)
- Every section component: Section padding, background colors, heading styles need updating
- `src/components/ProductCard.astro`: Card shadow, border-radius, image treatment
- `src/components/Hero.astro`: Background change from dark to cream

</code_context>

<specifics>
## Specific Ideas

- Hero should feel "warm, open, gallery-like" — cream background lets the hero product image be the focal point
- Dark sections should feel "warm, tactile, studio-like" — noise texture adds handcrafted quality
- Product cards should feel like they float slightly above the page — soft shadows create layered depth
- The site should feel like "walking into a pottery studio" (from PROJECT.md vision)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-visual-redesign-foundation*
*Context gathered: 2026-03-12*
