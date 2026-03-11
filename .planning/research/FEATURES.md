# Feature Research

**Domain:** Studio pottery / artisan ceramics website (inquiry-driven, DM-first sales model)
**Researched:** 2026-03-12
**Confidence:** HIGH (table stakes), MEDIUM (differentiators), HIGH (anti-features)

---

## Context: What Makes This Domain Distinct

Redcocoon is not a conventional e-commerce site. It is a studio showcase that drives inquiry through Instagram DM and WhatsApp — the conversion event is "visitor sends a DM", not "visitor completes checkout". This fundamentally changes the feature priorities:

- Visual impact matters more than product filtering
- Trust and craft narrative matter more than SKU management
- Frictionless inquiry paths matter more than shopping cart UX
- Mobile-first matters more than desktop feature richness

The three audiences — local collectors, hospitality/B2B clients, international pottery lovers — each have different needs. Features must serve all three without bloating the experience for any one.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing = product feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| High-quality product photography with multiple angles | Ceramics are tactile; buyers need to inspect texture, glaze, and form from multiple views. Missing = can't trust quality. | LOW (content task, not dev) | Each product needs minimum 2-3 photos. Currently has single images in some cards. |
| Product gallery browsable by collection | Industry standard for any studio selling discrete collections. Visitors expect to browse "all mugs" or "all pieces in Earth Collection" — not just featured items. | MEDIUM | Existing architecture supports this via Content Collections. Needs a `/gallery` or `/shop` page. |
| Clear availability / stock status on every piece | One-of-a-kind pieces get DMs for sold items constantly if status isn't obvious. Sets wrong expectations and wastes inquiries. | LOW | Already has `stock` field in schema. Need "Available" / "Sold" / "Made to Order" states visually. |
| Visible pricing on product cards | International buyers need price to self-qualify before DM. Without price, most won't inquire — they assume it's out of range. | LOW | Already implemented. Keep it. |
| Clear "how to buy" or inquiry flow explanation | DM-first is non-standard globally. International visitors don't know what to do. Without explanation, they bounce. | LOW | ReservationFlow exists but needs to be clearer and earlier in the scroll. |
| Mobile-responsive gallery grid | Over 60% of Instagram referral traffic is mobile. If the gallery breaks on phone, inquiries drop. | MEDIUM | Currently exists but needs mobile-first refinement — larger tap targets, swipe-friendly layouts. |
| About the maker / studio story | Buyers of handmade work purchase the story as much as the object. A faceless website for handmade goods is a trust failure. | LOW | Likely needs a dedicated About section or page, not just a tagline. |
| Contact / inquiry path always visible | Visitors ready to inquire must never have to search for how to reach out. CTA must be present at every scroll position. | LOW | FloatingContactButton + BottomTabBar exist. Need to ensure they're present site-wide. |
| SEO basics — title, description, Open Graph | Studio work gets discovered via Google and Instagram link previews. Missing OG tags means ugly share previews kill social referrals. | LOW | BaseLayout has SEO meta tags already. Verify OG image is set per-product. |
| Fast load on mobile, especially on slow connections | Sri Lanka to international visitors: page load tolerance is ~3s. Heavy unoptimized images kill engagement before anything loads. | MEDIUM | Astro static is fast. Image optimization (WebP, lazy load, correct sizing) needs explicit attention. |

### Differentiators (Competitive Advantage)

Features that set Redcocoon apart from generic ceramics portfolios. Not expected by visitors, but create memorable experiences and drive inquiry.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Piece code system visible on every card | "RC-EM-042" lets buyers reference exact pieces in DMs without describing them. Eliminates "the mug with the blue glaze" confusion. Builds a professional, curated studio impression. | LOW | Already built into schema and ProductCard. Reinforce visually — the badge should be prominent. |
| Gallery filtered by collection, not just category | Pottery collectors think in collections (Earth Series, Ritual Series). Filtering by named collection (not just "mugs") communicates curatorial intent and increases perceived value. | MEDIUM | Requires `/gallery` page with vanilla JS filter toggle. No framework needed. |
| Process / making section with photos or video | "How it's made" content converts skeptics into buyers — shows real craft, justifies handmade premium pricing, builds emotional connection. Studios like Heath Ceramics and Laima use this. | MEDIUM | Existing Process section is a stub. Needs real process imagery and expanded copy. |
| Hospitality / B2B dedicated section with separate inquiry path | Hotels and restaurants need custom quantity, durability, and logistics info that retail buyers don't. A dedicated section with tailored messaging converts B2B leads without confusing retail visitors. | MEDIUM | Brief hospitality section exists in current site. Needs its own page or anchor + tailored WhatsApp/form inquiry path. |
| DM with piece code pre-filled in message | When visitor clicks "DM to Reserve", the Instagram DM opens pre-filled with the piece code and name. Removes friction, removes ambiguity, feels polished. | LOW | Already implemented via `getInstagramDMLink()`. Make sure it's consistent everywhere. |
| "Made to Order" option surfaced per piece | Sold-out pieces showing "Made to Order" with a commission inquiry path captures leads that would otherwise bounce. Converts loss into inquiry. | LOW-MEDIUM | Needs `madeToOrder: boolean` field in schema and conditional CTA on ProductCard. |
| Workshop inquiry section | Visitors who want to experience the craft, not just buy it, are a different conversion. A simple expression-of-interest form (name, email, interest level) captures this audience and lets the potter follow up. | MEDIUM | Out-of-scope for prior phases but now Active. Simple static form — no backend needed if it routes to email via Netlify Forms / Formspree. |
| Earthy, warm visual design that communicates handmade craft | Generic portfolio sites feel sterile. A site that looks like it was designed by the same sensibility as the pottery — warm, tactile, imperfect-in-a-good-way — signals quality before a single piece is seen. | HIGH | This is a full redesign effort. Spacing, typography scale, imagery quality, color usage. The existing foundation is correct directionally. |
| International shipping / inquiry clarity | International visitors (UK, US, Germany are top Sri Lankan export markets per DHL) need to know: do you ship internationally, how does that work, what's the inquiry process. One paragraph removes friction for the largest potential market. | LOW | A single "Shipping & International Inquiries" note near the ReservationFlow is sufficient. Not a full page. |
| Ambient texture / depth in hero and section backgrounds | Subtle CSS-based textures (noise, grain, paper feel) or high-quality lifestyle photography backgrounds make the site feel different from a Squarespace template. Ceramics sites that do this outperform plain-background alternatives in engagement. | LOW-MEDIUM | CSS can achieve this without images. Noise filter, subtle gradients over earth tones. |

### Anti-Features (Deliberately Not Building)

Features that seem reasonable but would damage the experience or business model.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Shopping cart / checkout | "Easier for buyers to just pay" | Requires Stripe integration, payment gateway compliance, order management, refund handling — massive complexity for a studio that sells ~12-20 pieces at a time. Breaks the personal, high-touch DM model that justifies premium pricing. | Keep DM/WhatsApp. Add clear pricing so buyers can self-qualify before messaging. |
| Calendar booking for workshops | "Feels more professional" | A calendar system requires time-slot management, cancellation logic, reminders, and capacity tracking. The potter follows up manually — this automates what she does intentionally. | Simple interest form: name, email, preferred timing (morning/evening/weekend). She replies. |
| Real-time stock sync | "Show live availability" | This site is static. Real-time inventory requires a backend. For 12-20 pieces, manually updating a Markdown frontmatter file when a piece sells is trivial and zero infrastructure cost. | Update `stock: false` in the `.md` file when a piece sells. Build takes <30 seconds to redeploy. |
| Blog / journal section | "Good for SEO" | Content maintenance is ongoing labour. A pottery studio blog that hasn't been updated in 6 months is worse than no blog — signals the business is inactive. | Instagram feed section is the live content. Let Instagram be the journal. |
| Customer accounts / wishlists | "Let buyers save favourites" | Requires auth, database, session management. None of this fits a static site model. Buyers ready to purchase DM immediately — a wishlist just adds indirection. | Piece codes let buyers screenshot or note their favourites without any system. |
| Chatbot / live chat widget | "Faster response" | A chatbot for a one-person studio will either give wrong answers or route to the same DM/WhatsApp channel with extra steps. Adds JavaScript weight. | FloatingContactButton with Instagram DM + WhatsApp is already the "live chat". |
| Multi-language support | "International visitors" | Translating and maintaining content in multiple languages for a solo artisan studio is unsustainable. The international ceramics market communicates in English. | Write clear, jargon-free English. Add a one-line note about international shipping. |
| Product reviews / ratings | "Builds social proof" | Review systems need moderation, spam prevention, and enough volume to be useful. For a studio with 12 products and small batch sales, 3 reviews per piece maximum — looks thin and unenforced. | Instagram testimonials: embed or screenshot real comments. Or pull a quote into the About section. |
| Instagram API feed (live) | "Keep it fresh automatically" | Instagram's API requires OAuth app review, token management, and handles edge cases on business accounts. Rate limits break the feed unexpectedly. | Static placeholder images with a link to the Instagram profile. Manually update the placeholder images quarterly. |

---

## Feature Dependencies

```
[Gallery Page with Collection Filter]
    └──requires──> [Product Content Collections] (already built)
    └──requires──> [Vanilla JS filter toggle] (new, LOW complexity)
    └──enhances──> [Piece Code System] (codes are more useful when browsing full gallery)

[Workshop Inquiry Form]
    └──requires──> [Form endpoint] (Formspree/Netlify Forms — no backend)
    └──independent from──> [Product Gallery]

[Hospitality B2B Section]
    └──enhances──> [WhatsApp inquiry link] (already built, extend with B2B message)
    └──independent from──> [Workshop Inquiry]

[Made to Order CTA]
    └──requires──> [Schema field: madeToOrder boolean] (new, LOW)
    └──requires──> [ProductCard conditional render] (new, LOW)
    └──enhances──> [Piece Code in DM message] (already built)

[Visual Redesign]
    └──enhances──> all sections
    └──independent from──> all feature additions
    └──should precede──> [Gallery Page] (design system must be stable before building new pages)

[International Shipping Clarity]
    └──enhances──> [Reservation Flow section] (add one paragraph, no new components)
    └──independent from──> everything else

[Lightbox / Image Zoom]
    └──requires──> [Gallery Page] (most useful in full gallery context)
    └──enhances──> [Product photography] (zoom only valuable if images are high-res)
    └──optional on──> [ProductCard] (hover zoom may be sufficient on homepage cards)
```

### Dependency Notes

- **Visual redesign should come before new pages:** Building a Gallery Page on top of an unresolved design system creates rework. Lock the design direction first, then add pages.
- **Made to Order requires schema change:** Adding `madeToOrder` to content config means all 12 existing `.md` files need the field. Low effort but must happen before the conditional render is built.
- **Workshop form requires a form endpoint:** Formspree (free tier: 50 submissions/month) or Netlify Forms are zero-backend options. Decision must be made before building the form component.
- **Gallery filtering is purely client-side:** Vanilla JS can filter by `data-collection` attributes on cards. No server, no framework, fits the zero-client-framework constraint perfectly.

---

## MVP Definition

### Launch With (this milestone, v2)

Minimum feature set to make the site feel complete and professional for all three audiences.

- [ ] **Visual redesign** — warm, earthy, high-craft visual identity across all sections. Without this, new features feel bolted onto a mediocre foundation.
- [ ] **Gallery page with collection filtering** — visitors need a browsable catalog, not just 3 featured pieces on the homepage. This is the primary missing page.
- [ ] **Stock status clarity** — "Available", "Sold", "Made to Order" on every product card. Prevents wasted DM exchanges about unavailable pieces.
- [ ] **Made to Order conditional CTA** — sold-out pieces show commission inquiry path instead of dead "Sold" state.
- [ ] **Workshop inquiry section** — simple name/email/interest form. Captures the teaching-interested audience without a booking system.
- [ ] **Hospitality B2B messaging** — dedicated section or anchor with tailored copy for hotels/restaurants. Separate inquiry path (WhatsApp message pre-filled for bulk inquiry).
- [ ] **International shipping note** — one paragraph near reservation flow. Unlocks the largest potential market with minimal effort.
- [ ] **Image optimization** — WebP conversion, correct sizing, lazy loading. Non-negotiable for international load times.

### Add After Validation (v2.x)

Features to add once the core milestone ships and real visitor behavior can be observed.

- [ ] **Image lightbox / zoom on gallery** — valuable once high-quality multi-angle photography exists. Pointless before photo quality improves.
- [ ] **Process section expansion** — expanded copy and real process photography. Depends on the potter having the photography assets to provide.
- [ ] **SEO / structured data audit** — LocalBusiness + Product schema.org markup. Add after design is stable so meta tags are finalized.

### Future Consideration (v3+)

Features to defer until there is evidence of demand.

- [ ] **Commission intake form** — a structured form for custom piece requests (dimensions, glazes, quantity). Only needed if commission volume grows beyond what DM can handle.
- [ ] **Wholesale/trade page** — a dedicated page for B2B pricing, MOQ, and trade inquiry. Only needed if hospitality clients start coming in volume.
- [ ] **Ambient sound / sensory layer** — some luxury artisan sites use subtle studio ambient sound. Experimental, divisive. Defer indefinitely.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Visual redesign (layout, spacing, typography) | HIGH | HIGH | P1 — prerequisite for everything else |
| Gallery page with collection filtering | HIGH | MEDIUM | P1 — biggest missing page |
| Stock status ("Available" / "Sold" / "Made to Order") | HIGH | LOW | P1 — prevents broken inquiry UX |
| Made to Order conditional CTA | HIGH | LOW | P1 — converts sold-out views into leads |
| Workshop inquiry form | MEDIUM | LOW | P1 — captures underserved audience |
| Hospitality B2B section/messaging | MEDIUM | LOW | P1 — B2B clients have high order value |
| International shipping clarity | HIGH | LOW | P1 — one paragraph, huge audience unlock |
| Image optimization (WebP, lazy load) | HIGH | LOW | P1 — performance is non-negotiable |
| Lightbox / image zoom | MEDIUM | MEDIUM | P2 — only valuable with multi-angle photos |
| Process section expansion | MEDIUM | LOW (dev), HIGH (content) | P2 — depends on photography assets |
| Structured data / schema.org | LOW | LOW | P2 — SEO enhancement, not user-facing |
| About the maker / studio story | HIGH | LOW | P1 — trust-building, currently weak |
| Ambient visual texture in design | MEDIUM | LOW | P2 — design detail, not core feature |

**Priority key:**
- P1: Must have for this milestone to feel complete
- P2: Should have, add when assets/time allow
- P3: Nice to have, future milestone

---

## Competitor Feature Analysis

| Feature | Kevala Ceramics (Bali, B2B focus) | Laima Ceramics (Latvia, studio/retail) | Hammerly Ceramics (US, DTC) | Redcocoon Approach |
|---------|----------------------------------|---------------------------------------|-----------------------------|--------------------|
| Gallery structure | Project portfolio grid by client | Photographer-based gallery sections | Collection pages ("In Stock") | Collection-based filter on gallery page |
| Inquiry flow | WhatsApp + consultation form | Email + courses form | Standard checkout (Shopify) | Instagram DM primary, WhatsApp secondary |
| Stock status | Not prominent (B2B custom) | Not explicit | "In Stock" collection filter + RTS tags | "Available" / "Sold" / "Made to Order" on card |
| B2B / hospitality | Primary business model | "Wholesale Terms" page | "Restaurants" page | Dedicated section with bulk inquiry path |
| Workshop offering | Not offered | 2-week and 4-week courses | Not offered | Simple inquiry form (manual follow-up) |
| About/story | Team + sustainability pages | Artist bio + studio history | Minimal | About section needed |
| Piece identification | Project references | Collection names | SKU numbers | Piece codes (RC-EM-042) — stronger than SKU |
| International clarity | Yes (multi-language, global clients) | Yes (shipping mention) | US-centric | Needs explicit shipping note |
| Mobile UX | Yes, responsive | Yes, responsive | Yes, Shopify standard | Bottom tab bar + FAB — ahead of most competitors |

**Key insight from competitor analysis:** The piece code system (RC-EM-042) is genuinely unique — no competitor reviewed uses a legible, human-readable code on the product card itself. This is a real differentiator that should be made more prominent, not hidden in a badge.

---

## Sources

- [Ceramics Field Guide: Chapter 7 — Websites](https://ceramicsfieldguide.org/chapter-7/websites/) — practitioner-level guidance for ceramicists
- [Starter Story: 23 Best Ceramic Store Web Designs](https://www.starterstory.com/pottery-business-web-designs) — real-world pattern analysis
- [Kevala Ceramics](https://kevalaceramics.com/) — high-end B2B ceramics studio, hospitality focus (Bali)
- [Wolf Ceramics: Restaurants Page](https://wolfceramics.com/pages/restaurants) — B2B hospitality messaging patterns
- [Laima Ceramics: Gallery](https://www.laimaceramics.com/gallery) — gallery organization by collection/photographer
- [Heath Ceramics](https://www.heathceramics.com/) — large-scale ceramics studio, collection filtering patterns
- [Hammerly Ceramics: In Stock](https://www.hammerlyceramics.com/collections/in-stock) — stock status UX patterns
- [DHL Sri Lanka: Export Handicrafts Guide](https://www.dhl.com/discover/en-lk/e-commerce-advice/e-commerce-sector-guides/export-sri-lankan-handicrafts) — international shipping context
- [Format Magazine: Ceramics Portfolio Examples](https://www.format.com/magazine/galleries/art/ceramics-portfolio-roundup) — portfolio design patterns
- [NN/G: Mobile Navigation Patterns](https://www.nngroup.com/articles/mobile-navigation-patterns/) — bottom tab bar UX validation
- [Kness Custom Ceramics](https://www.kness.fr/en/custom-ceramics-orders/) — commission + waitlist UX patterns

---

*Feature research for: Studio pottery / artisan ceramics website (inquiry-driven, DM-first)*
*Researched: 2026-03-12*
