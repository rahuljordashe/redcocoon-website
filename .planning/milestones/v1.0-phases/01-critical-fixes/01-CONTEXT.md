# Phase 1: Critical Fixes - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Patch two live broken links so the current site has no dead ends before new milestone work begins. No new features, no redesign — just fix the two broken navigation paths.

</domain>

<decisions>
## Implementation Decisions

### Form link removal (FIX-01)
- Remove `#contact-form` link from all 3 locations: ReservationFlow "Form" badge, FloatingContactButton "Reservation Form" option, Footer "Reservation Form" button
- FloatingContactButton keeps the remaining 2 options: Instagram DM + WhatsApp (still a mini-menu, not simplified to single link)
- No replacement link needed — Phase 4 adds a real workshop form and restores these links
- ReservationFlow step 2 channels reduce from 3 badges to 2 (Instagram DM + WhatsApp)

### Hospitality CTA consolidation (FIX-02)
- Replace both Hospitality section buttons ("View Portfolio" broken link + "Request a Quote" WhatsApp) with a single CTA
- Single button label: "Discuss a Project"
- Links to WhatsApp using the existing B2B pre-filled message (`getHospitalityWhatsAppLink()` in whatsapp.ts)
- Styled as primary button (existing `.btn-primary`)

### Claude's Discretion
- Button styling details (padding, hover state)
- Whether to adjust Hospitality section layout after removing one button (single CTA centering)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/utils/whatsapp.ts`: `getHospitalityWhatsAppLink()` — B2B pre-filled WhatsApp link already exists
- `src/utils/instagram.ts`: `getInstagramDMLink()` — Instagram DM helper already exists
- `.btn-primary` class in global.css — existing button style for the merged CTA

### Established Patterns
- Channel badges in ReservationFlow use `.channel-badge` class with variant modifiers
- FloatingContactButton uses `.floating-option` class for each channel link
- Footer CTA uses `.btn` class variants

### Integration Points
- `src/components/ReservationFlow.astro:28` — remove `#contact-form` badge from step 2 channels
- `src/components/FloatingContactButton.astro:19` — remove "Reservation Form" option
- `src/components/Footer.astro:13` — remove "Reservation Form" button from CTA banner
- `src/components/Hospitality.astro:15-16` — replace 2 buttons with single "Discuss a Project" WhatsApp CTA

</code_context>

<specifics>
## Specific Ideas

No specific requirements — straightforward fixes with clear targets.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-critical-fixes*
*Context gathered: 2026-03-12*
