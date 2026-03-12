# Redcocoon — Studio Pottery Website

## What This Is

A modern website for Redcocoon, a studio pottery practice based in Colombo, Sri Lanka. The site showcases handmade pottery through a warm, earthy visual identity with a browsable product gallery, workshop inquiry form, and B2B hospitality section — all driving inquiries via Instagram DM and WhatsApp rather than a shopping cart.

## Core Value

People see the pottery, feel the craft quality, and reach out to inquire — the site must be both a beautiful showcase AND an inquiry driver.

## Requirements

### Validated

- ✓ Static Astro site with Content Collections for product data — v1.0
- ✓ Product catalog with 12 pieces (code, price, collection, category, stock) — v1.0
- ✓ Instagram DM reservation flow (primary channel) — v1.0
- ✓ WhatsApp reservation flow (secondary channel) — v1.0
- ✓ Multi-channel CTA pattern (Instagram DM > WhatsApp > Form) — v1.0
- ✓ Responsive layout with mobile menu and bottom tab bar — v1.0
- ✓ Floating contact button for mobile — v1.0
- ✓ Product cards with imagery, piece codes, and DM-to-reserve CTA — v1.0
- ✓ Design system with CSS custom properties (colors, spacing, typography tokens) — v1.0
- ✓ Vercel deployment with GitHub auto-deploy — v1.0
- ✓ Warm earthy visual identity with self-hosted fonts, noise textures, 44px touch targets — v1.0
- ✓ Browsable /shop gallery page with collection filtering and stock badges — v1.0
- ✓ Individual product detail pages at /shop/[slug] with GLightbox zoom — v1.0
- ✓ Made-to-Order commission flow for sold-out pieces — v1.0
- ✓ Workshop inquiry form at /workshop with Web3Forms + hCaptcha — v1.0
- ✓ B2B hospitality section with service bullets, WhatsApp, and email CTA — v1.0
- ✓ About the maker section and international shipping note — v1.0
- ✓ Lighthouse mobile 85+ performance across all pages — v1.0
- ✓ LocalBusiness + Product JSON-LD structured data — v1.0
- ✓ Per-page OG images for social sharing — v1.0
- ✓ Full Astro Image WebP pipeline for all component and product images — v1.0

### Active

- [ ] Process section expanded with real craft photography and detailed copy
- [ ] Multi-angle product photography (minimum 2-3 photos per piece)
- [ ] Commission intake form for custom piece requests (dimensions, glazes, quantity)
- [ ] Wholesale/trade page for B2B pricing and MOQ

### Out of Scope

- Online checkout / payment processing — keeping DM-first model, no Stripe/PayHere
- Full e-commerce (cart, inventory management, order tracking) — unnecessary complexity for inquiry-based sales
- Calendar-based workshop booking system — inquiry form is sufficient for her workflow
- Blog / stories section — not requested; inactive blog signals dead business
- Real-time chat — DM and WhatsApp cover this
- Mobile app — web-first
- OAuth / user accounts — static site, no auth needed
- Live Instagram API feed — requires OAuth, token management; static placeholders work
- Multi-language support — international ceramics market uses English
- Product reviews / ratings — not enough volume; Instagram testimonials serve this purpose

## Context

Shipped v1.0 with 4,280 LOC across Astro/TypeScript/CSS.
Tech stack: Astro 5 static, @fontsource fonts, Astro Image pipeline, Web3Forms, GLightbox.
Deployed at: https://redcocoon-website.vercel.app via GitHub (rahuljordashe/redcocoon-website).
Instagram handle: `redcocoon` | WhatsApp: `94777720696`

**Pre-launch TODOs:**
- Replace Web3Forms access_key placeholder in workshop.astro with real key
- Replace LocalBusiness schema TODO placeholders (address, phone, hours)
- Replace AboutMaker placeholder copy with real maker story
- Source real craft photography for Process section

## Constraints

- **Tech stack**: Astro static site, zero client frameworks, vanilla JS only
- **Hosting**: Vercel static deployment
- **No backend**: No server, no database, no API — inquiry model handles everything through external channels
- **Content**: Product data lives in Markdown frontmatter Content Collections
- **Performance**: Static HTML/CSS/JS, minimal JavaScript — fast loads for international visitors

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep DM-first reservation model | Works for her workflow, avoids e-commerce complexity | ✓ Good — Instagram DM + WhatsApp drives all inquiries |
| Workshop as inquiry form (not calendar booking) | She follows up manually, no scheduling system needed | ✓ Good — Web3Forms form works cleanly |
| Build on existing Astro foundation | Solid tech base, no reason to start over | ✓ Good — shipped full site in 8 days |
| Warm & earthy visual direction | Matches pottery studio feel, differentiates from generic portfolio sites | ✓ Good — cream/espresso/noise textures create distinctive identity |
| Gallery by collection (not full portfolio) | Focus on purchasable pieces, not process/exhibition shots | ✓ Good — filter pills make browsing intuitive |
| Self-hosted fonts via @fontsource | Eliminates CDN dependency, enables font-display control | ✓ Good — no FOIT, instant text rendering |
| imageMap pattern for Astro Image | Astro requires static imports, not runtime strings | ✓ Good — consistent pattern across 5 components |
| Hero cream bg (overrides CLAUDE.md dark gradient) | Better legibility and warmth per VIS-01 | ✓ Good — cohesive with overall design |
| GLightbox for product zoom | Lightweight, works with vanilla JS constraint | ⚠️ Revisit — last npm publish over 1 year ago |

---
*Last updated: 2026-03-12 after v1.0 milestone*
