# Phase 4: Workshop & Hospitality - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can submit a workshop inquiry through a working form on a dedicated /workshop page, and hospitality clients see expanded B2B messaging with a direct inquiry path on the existing homepage section. No new sales channels, no calendar booking, no checkout.

</domain>

<decisions>
## Implementation Decisions

### Workshop page structure
- Form-focused page: short warm intro (1-2 sentences) + inquiry form — no scrolling needed
- Warm invitation tone ("Come get your hands dirty" feel) — personal, welcoming, emphasizes the experience
- Cream background — light, open, inviting, consistent with /shop page
- Add "Workshop" link to main navigation between "Studio" and "Contact"

### Workshop form fields & submission
- Four fields: name (required), email (required), phone (optional), message/interest (required)
- Web3Forms as submission service — free tier with hCaptcha spam protection (researcher to confirm hCaptcha availability on free tier; fallback: Formspree with honeypot)
- Inline success state: form fields fade out, replaced by green checkmark + "Thanks! We'll be in touch soon." message in same space — no page reload, no redirect
- Inline error state for submission failures

### Hospitality section expansion
- Stays as homepage anchor section (/#hospitality) — no separate /hospitality page
- Add 2-3 concrete service bullets below existing description (e.g., "Custom dinnerware sets", "Serving platters & accent pieces", "Full venue collections")
- Add email CTA alongside existing WhatsApp CTA: mailto: link to hello@redcocoon.com with pre-filled subject "Hospitality Inquiry"
- Keep "Discuss a Project" WhatsApp button (unchanged from Phase 1)

### Form link restoration
- Restore form link to ALL 3 locations removed in Phase 1:
  - ReservationFlow step 2 channels (3rd badge alongside Instagram DM + WhatsApp)
  - FloatingContactButton (3rd option alongside Instagram DM + WhatsApp)
  - Footer CTA banner (3rd button alongside Instagram DM + WhatsApp)
- Label: "Workshop" (short, matches nav link)
- All link to /workshop page
- Reuse existing .channel-form CSS class (preserved in Phase 1 — transparent bg, clay text, beige border, terracotta hover)

### Claude's Discretion
- Exact workshop intro copy (warm invitation tone, 1-2 sentences)
- Service bullet wording for Hospitality section
- Form field placeholder text and validation messages
- Success/error message exact wording
- Form layout spacing and field sizing
- hCaptcha widget placement relative to form fields

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.channel-form` CSS class in ReservationFlow.astro: preserved from Phase 1, ready for workshop link badge
- `.hospitality-ghost` CSS class: preserved orphaned style for potential secondary button
- `src/utils/whatsapp.ts`: `getQuoteLink()` — B2B pre-filled WhatsApp link already used in Hospitality section
- `SectionHeader.astro`: reusable tag + title + accent pattern for /workshop page header
- `.btn-primary` class: existing button style for form submit
- `.fade-in` / `.visible` CSS + IntersectionObserver: scroll animation system
- Footer already has hello@redcocoon.com email link — consistent email address

### Established Patterns
- Vanilla JS in `<script>` tags for interactivity (form submission handler)
- Scoped `<style>` per component with CSS custom properties
- Cream background sections use `var(--color-cream)` or `var(--color-offwhite)`
- 768px mobile, 1024px tablet breakpoints
- 44px minimum touch targets on all interactive elements (Phase 2)

### Integration Points
- `src/pages/workshop.astro` — NEW page to create
- `src/components/Navbar.astro:13` — add "Workshop" link between "Studio" and "Contact"
- `src/components/ReservationFlow.astro:27` — restore .channel-form badge linking to /workshop
- `src/components/FloatingContactButton.astro` — restore 3rd "Workshop" option
- `src/components/Footer.astro:12` — add 3rd "Workshop" button to CTA banner
- `src/components/Hospitality.astro:18` — add service bullets + email CTA button

</code_context>

<specifics>
## Specific Ideas

- Workshop intro should feel like a warm invitation — "Come get your hands dirty" spirit, not corporate
- Form should be the star of the page — minimal content above, no scrolling to reach it
- Hospitality email CTA uses mailto:hello@redcocoon.com?subject=Hospitality%20Inquiry
- "Workshop" label keeps consistent with nav link (not "Workshop Inquiry" or "Book a Workshop")
- Phone field is optional — acknowledges Sri Lankan context where phone/WhatsApp is common

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-workshop-hospitality*
*Context gathered: 2026-03-12*
