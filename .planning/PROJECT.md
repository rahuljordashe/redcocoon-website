# Redcocoon — Studio Pottery Website

## What This Is

A modern website for Redcocoon, a studio pottery practice based in Colombo, Sri Lanka. The site showcases handmade pottery to three audiences — local collectors, hospitality clients (hotels, restaurants, cafes), and international pottery lovers — through a warm, earthy visual identity that evokes the feeling of walking into a pottery studio. Sales happen via Instagram DM and WhatsApp, not a shopping cart.

## Core Value

People see the pottery, feel the craft quality, and reach out to inquire — the site must be both a beautiful showcase AND an inquiry driver.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Static Astro site with Content Collections for product data — existing
- ✓ Product catalog with 12 pieces (code, price, collection, category, stock) — existing
- ✓ Instagram DM reservation flow (primary channel) — existing
- ✓ WhatsApp reservation flow (secondary channel) — existing
- ✓ Multi-channel CTA pattern (Instagram DM > WhatsApp > Form) — existing
- ✓ Responsive layout with mobile menu and bottom tab bar — existing
- ✓ Floating contact button for mobile — existing
- ✓ Product cards with imagery, piece codes, and DM-to-reserve CTA — existing
- ✓ Section-based page composition (Hero, LatestPieces, Process, InstagramFeed, ReservationFlow, Footer) — existing
- ✓ Design system with CSS custom properties (colors, spacing, typography tokens) — existing
- ✓ Vercel deployment with GitHub auto-deploy — existing

### Active

<!-- Current scope. Building toward these. -->

- [ ] Comprehensive visual redesign — warm, earthy, artisan feel (layout, spacing, typography, imagery, mobile)
- [ ] Product gallery page organized by collection with filtering
- [ ] Workshop inquiry form (express interest, she follows up manually)
- [ ] Smoother, more intuitive DM-first reservation experience
- [ ] Mobile-first responsive design that feels native on phones
- [ ] Hospitality/B2B section or messaging for hotels, restaurants, cafes
- [ ] Improved typography hierarchy (DM Serif Display, Cormorant Garamond, Inter — or revised selections)
- [ ] Rich imagery and mood that communicates handmade craft quality
- [ ] International audience considerations (English, clear shipping/inquiry info)

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Online checkout / payment processing — keeping DM-first model, no Stripe/PayHere
- Full e-commerce (cart, inventory management, order tracking) — unnecessary complexity for inquiry-based sales
- Calendar-based workshop booking system — inquiry form is sufficient for her workflow
- Blog / stories section — not requested for this milestone
- Real-time chat — DM and WhatsApp cover this
- Mobile app — web-first
- OAuth / user accounts — static site, no auth needed

## Context

- The site already has a working Astro 5 foundation with 12 products in Content Collections, Instagram/WhatsApp link utilities, and a complete component set deployed to Vercel.
- The current design uses terracotta (#C17747), cream (#F5F0E8), espresso (#2A2420), and sage (#8B9E6B) as the color palette — this may evolve during the redesign but captures the right earthy direction.
- Instagram handle: `redcocoon` | WhatsApp: `94777720696`
- Deployed at: https://redcocoon-website.vercel.app via GitHub (rahuljordashe/redcocoon-website)
- Source design references exist at `../New Draft Website/` (CSS, JS, HTML) and `../redcocoon-wireframe.jsx`

## Constraints

- **Tech stack**: Astro static site, zero client frameworks, vanilla JS only — this is working and should stay
- **Hosting**: Vercel static deployment — already configured
- **No backend**: No server, no database, no API — inquiry model handles everything through external channels
- **Content**: Product data lives in Markdown frontmatter Content Collections — keep this pattern
- **Performance**: Static HTML/CSS/JS, minimal JavaScript — fast loads are non-negotiable for international visitors

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep DM-first reservation model | Works for her workflow, avoids e-commerce complexity | — Pending |
| Workshop as inquiry form (not calendar booking) | She follows up manually, no scheduling system needed | — Pending |
| Build on existing Astro foundation | Solid tech base, no reason to start over | — Pending |
| Warm & earthy visual direction | Matches pottery studio feel, differentiates from generic portfolio sites | — Pending |
| Gallery by collection (not full portfolio) | Focus on purchasable pieces, not process/exhibition shots | — Pending |

---
*Last updated: 2026-03-12 after initialization*
