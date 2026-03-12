# Phase 1: Critical Fixes - Research

**Researched:** 2026-03-12
**Domain:** Astro component editing — HTML/CSS link removal and CTA consolidation
**Confidence:** HIGH

## Summary

Phase 1 fixes two broken navigation links in the live Redcocoon site. Both fixes are pure HTML edits within existing Astro components — no new libraries, no architectural changes, no new files. Every target component, helper function, and CSS class needed already exists in the codebase.

FIX-01 removes three occurrences of `href="#contact-form"` (a non-existent anchor) from `ReservationFlow.astro`, `FloatingContactButton.astro`, and `Footer.astro`. FIX-02 replaces the broken `href="/hospitality"` link in `Hospitality.astro` with a single consolidated CTA that calls the already-present `getQuoteLink()` / `getHospitalityWhatsAppLink()` function.

**Primary recommendation:** Make surgical line deletions and a single line replacement using the existing `getQuoteLink()` function and `.btn-primary` class. No new code, no new CSS, no new utilities needed.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Form link removal (FIX-01)**
- Remove `#contact-form` link from all 3 locations: ReservationFlow "Form" badge, FloatingContactButton "Reservation Form" option, Footer "Reservation Form" button
- FloatingContactButton keeps the remaining 2 options: Instagram DM + WhatsApp (still a mini-menu, not simplified to single link)
- No replacement link needed — Phase 4 adds a real workshop form and restores these links
- ReservationFlow step 2 channels reduce from 3 badges to 2 (Instagram DM + WhatsApp)

**Hospitality CTA consolidation (FIX-02)**
- Replace both Hospitality section buttons ("View Portfolio" broken link + "Request a Quote" WhatsApp) with a single CTA
- Single button label: "Discuss a Project"
- Links to WhatsApp using the existing B2B pre-filled message (`getHospitalityWhatsAppLink()` in whatsapp.ts)
- Styled as primary button (existing `.btn-primary`)

### Claude's Discretion
- Button styling details (padding, hover state)
- Whether to adjust Hospitality section layout after removing one button (single CTA centering)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FIX-01 | Broken `#contact-form` anchor in ReservationFlow is patched with a working target | Remove the three `#contact-form` anchor elements entirely; no replacement needed until Phase 4 |
| FIX-02 | Broken `/hospitality` link returns a valid page or anchor instead of 404 | Replace `/hospitality` href with `getQuoteLink()` WhatsApp link; merge with existing "Request a Quote" button |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | ^5.17.1 | Static site framework | Already in project — all components are `.astro` files |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `src/utils/whatsapp.ts` | project-local | WhatsApp deep-link construction | Already used everywhere; use `getQuoteLink()` for hospitality CTA |
| `src/utils/instagram.ts` | project-local | Instagram DM link construction | Already used in all channel locations |

### Alternatives Considered
None applicable — this phase uses only existing project assets.

**Installation:**
No new packages required.

---

## Architecture Patterns

### Affected Files (all are edits, no new files)

```
src/
├── components/
│   ├── ReservationFlow.astro     # line 28 — remove Form badge <a>
│   ├── FloatingContactButton.astro  # line 19 — remove Reservation Form <a>
│   ├── Footer.astro              # line 13 — remove Reservation Form <a href="#contact-form">
│   └── Hospitality.astro         # lines 15-16 — replace 2-button group with 1 btn-primary
└── utils/
    └── whatsapp.ts               # read-only — getQuoteLink() already exported
```

### Pattern 1: Line Deletion (FIX-01)

**What:** Remove an `<a>` element that links to a non-existent anchor.
**When to use:** The broken link has no replacement yet; clean removal is correct.

ReservationFlow.astro — remove entire line 28:
```astro
{/* DELETE this line */}
<a href="#contact-form" class="channel-badge channel-form">Form</a>
```

FloatingContactButton.astro — remove line 19:
```astro
{/* DELETE this line */}
<a href="#contact-form" class="floating-option floating-form">Reservation Form</a>
```

Footer.astro — remove line 13:
```astro
{/* DELETE this line */}
<a href="#contact-form" class="btn btn-ghost">Reservation Form</a>
```

### Pattern 2: Two-Button Replacement with One Button (FIX-02)

**What:** Replace the `hospitality-actions` div contents (two `<a>` elements) with a single primary CTA.
**When to use:** One button was broken, the second duplicates the replacement — merge into one.

Hospitality.astro — current lines 14-17:
```astro
<div class="hospitality-actions">
  <a href="/hospitality" class="btn btn-primary">View Portfolio</a>
  <a href={quoteLink} target="_blank" rel="noopener noreferrer" class="btn btn-ghost hospitality-ghost">Request a Quote</a>
</div>
```

Replace with:
```astro
<div class="hospitality-actions">
  <a href={quoteLink} target="_blank" rel="noopener noreferrer" class="btn btn-primary">Discuss a Project</a>
</div>
```

Note: `quoteLink` is already declared in the frontmatter (`const quoteLink = getQuoteLink()`), so no import change is needed. The `getHospitalityWhatsAppLink()` mentioned in CONTEXT.md resolves to the same function as `getQuoteLink()` — both generate the B2B pre-filled WhatsApp message. Use the existing `quoteLink` constant already in scope.

### Layout Discretion: Single-Button Centering

After reducing to one button in `hospitality-actions`, the flex container will display it left-aligned on desktop (matching the text-left layout of the section). If centering is desired for visual balance, no CSS change is needed — the single `.btn` will simply sit left-aligned within the flex flow, which is correct for a left-aligned copy block. No layout CSS changes are required unless it looks wrong at review time.

### Anti-Patterns to Avoid

- **Adding a placeholder anchor target:** Do not add `<section id="contact-form">` as a placeholder — CONTEXT.md explicitly says "No replacement link needed."
- **Simplifying FloatingContactButton to a single link:** CONTEXT.md locked keeping the 2-option mini-menu (Instagram DM + WhatsApp); do not collapse it.
- **Removing `.channel-form` CSS:** The CSS rule for `.channel-form` in ReservationFlow.astro can be left in place — unused CSS in a scoped `<style>` block causes no harm and may be needed in Phase 4.
- **Removing `.floating-form` CSS:** Same rationale as above — leave the CSS, remove only the HTML element.
- **Changing `getQuoteLink()` to `getHospitalityWhatsAppLink()`:** These are the same function by another name per CONTEXT.md; `getQuoteLink()` is the actual export in `whatsapp.ts`. No function rename needed.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| B2B WhatsApp pre-fill | Custom URL builder | `getQuoteLink()` in `whatsapp.ts` | Already encodes the hospitality message |
| Instagram DM links | Custom URL builder | `getInstagramDMLink()` in `instagram.ts` | Already handles ig.me format |

**Key insight:** Every utility and class needed for these fixes already exists. The work is deletion and substitution, not construction.

---

## Common Pitfalls

### Pitfall 1: CSS Orphan Cleanup Temptation
**What goes wrong:** Developer removes the HTML element and also deletes its CSS class definition, causing a build error if the class is referenced by another element, or causing a merge conflict in Phase 4 when the form link is restored.
**Why it happens:** Clean-up instinct; the `.channel-form` and `.floating-form` styles look orphaned.
**How to avoid:** Remove only the `<a>` element. Leave `.channel-form` and `.floating-form` style blocks in their respective component `<style>` tags.
**Warning signs:** Running `npx astro check` or `npm run build` fails with CSS parsing errors.

### Pitfall 2: Wrong whatsapp.ts Function Name
**What goes wrong:** Developer looks for `getHospitalityWhatsAppLink()` (the name used in CONTEXT.md) but this function does not exist in `whatsapp.ts`. The actual export is `getQuoteLink()`.
**Why it happens:** CONTEXT.md describes intent, not the exact function name. The function generates a hospitality WhatsApp link but is named `getQuoteLink`.
**How to avoid:** Use `getQuoteLink()` — it is already imported and assigned to `quoteLink` at line 3 of `Hospitality.astro`. No import change is needed.
**Warning signs:** TypeScript error: "Module has no exported member 'getHospitalityWhatsAppLink'".

### Pitfall 3: Partial Removal of Form Links
**What goes wrong:** Developer removes the Form badge from ReservationFlow but misses the identical link in FloatingContactButton or Footer.
**Why it happens:** Three separate components contain the same broken link; they are easy to miss.
**How to avoid:** Treat FIX-01 as three sub-edits in a single task. Verify all three files are touched before marking complete.
**Warning signs:** Manual navigation test shows the floating contact button still has a "Reservation Form" option.

---

## Code Examples

### FIX-01: Complete Post-Edit State of ReservationFlow channels block

```astro
{/* Source: src/components/ReservationFlow.astro, step 2 */}
{step.number === 2 && (
  <div class="reservation-channels">
    <a href={getInstagramDMLink()} target="_blank" rel="noopener noreferrer" class="channel-badge channel-instagram">Instagram DM</a>
    <a href={getWhatsAppLink("Hi! I'd like to reserve a piece.")} target="_blank" rel="noopener noreferrer" class="channel-badge channel-whatsapp">WhatsApp</a>
  </div>
)}
```

### FIX-01: Complete Post-Edit State of FloatingContactButton popup

```astro
{/* Source: src/components/FloatingContactButton.astro */}
<div class="floating-popup" id="floatingPopup" aria-hidden="true">
  <p class="floating-popup-title">Reserve a piece</p>
  <a href={getInstagramDMLink()} target="_blank" rel="noopener noreferrer" class="floating-option floating-ig">Instagram DM</a>
  <a href={getWhatsAppLink("Hi! I'd like to reserve a piece.")} target="_blank" rel="noopener noreferrer" class="floating-option floating-wa">WhatsApp</a>
</div>
```

### FIX-01: Complete Post-Edit State of Footer CTA buttons

```astro
{/* Source: src/components/Footer.astro */}
<div class="footer-cta-buttons">
  <a href={getInstagramDMLink()} target="_blank" rel="noopener noreferrer" class="btn btn-instagram">Instagram DM</a>
  <a href={getWhatsAppLink("Hi! I'd like to reserve a piece.")} target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">WhatsApp</a>
</div>
```

### FIX-02: Complete Post-Edit State of Hospitality actions block

```astro
{/* Source: src/components/Hospitality.astro */}
<div class="hospitality-actions">
  <a href={quoteLink} target="_blank" rel="noopener noreferrer" class="btn btn-primary">Discuss a Project</a>
</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Three-channel reservation flow (IG + WA + Form) | Two-channel (IG + WA) | Phase 1 | Form channel removed until Phase 4 workshop form is built |
| Two hospitality CTAs (Portfolio + Quote) | One CTA (Discuss a Project) | Phase 1 | Eliminates the dead `/hospitality` route |

**Deprecated/outdated after this phase:**
- `href="#contact-form"` — removed from all 3 locations; do not re-add until Phase 4
- `href="/hospitality"` — removed; no `/hospitality` route exists

---

## Open Questions

1. **`getHospitalityWhatsAppLink()` vs `getQuoteLink()`**
   - What we know: CONTEXT.md references `getHospitalityWhatsAppLink()` but `whatsapp.ts` exports `getQuoteLink()` — both produce the same output.
   - What's unclear: Whether a rename was intended before the context session was written.
   - Recommendation: Use `getQuoteLink()` as-is. If a renamed alias is wanted, it can be added in Phase 4 alongside the Hospitality expansion scope.

2. **Unused CSS class cleanup (`.channel-form`, `.floating-form`)**
   - What we know: After removing the `<a>` elements, these CSS classes will be orphaned in their scoped `<style>` blocks.
   - What's unclear: Whether the planner wants cleanup now or defers to Phase 4.
   - Recommendation: Leave CSS in place. Astro scoped styles do not affect other components; orphaned CSS adds zero bytes to the final build for those selectors. Phase 4 will restore the elements.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed — no test runner in project |
| Config file | None — see Wave 0 gaps |
| Quick run command | `npm run build` (build-time type check) |
| Full suite command | `npx astro check && npm run build` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FIX-01 | No `#contact-form` href in any component | manual-only | `npx astro check && npm run build` (catches broken imports) | ❌ Wave 0 |
| FIX-02 | No `/hospitality` href; Hospitality CTA links to WhatsApp | manual-only | `npx astro check && npm run build` | ❌ Wave 0 |

**Manual-only justification:** Both requirements are link-correctness checks on a static HTML output. The project has no test runner; the correct verification method is:
1. `npm run build` — confirms no TypeScript or import errors
2. Browser navigation test — click each former broken link location and confirm no dead end
3. Deploy preview check on Vercel — confirm live URLs resolve

### Sampling Rate
- **Per task commit:** `npm run build`
- **Per wave merge:** `npx astro check && npm run build`
- **Phase gate:** Full suite green + manual navigation test before `/gsd:verify-work`

### Wave 0 Gaps
- No test framework is installed; this phase does not require one. Link-correctness tests for a static site are inherently manual (click-and-check). The build command serves as the automated gate.

*(No new test files are needed for Phase 1. Verification is: build passes + manual click test of the 4 previously-broken link locations.)*

---

## Sources

### Primary (HIGH confidence)
- Direct file reads — `src/components/ReservationFlow.astro`, `FloatingContactButton.astro`, `Footer.astro`, `Hospitality.astro` — exact line numbers for each broken link confirmed
- Direct file reads — `src/utils/whatsapp.ts`, `src/utils/instagram.ts` — exact function exports confirmed
- Direct file reads — `src/styles/global.css` — `.btn-primary`, `.btn-ghost`, `.btn-whatsapp`, `.btn-instagram` class definitions confirmed
- `.planning/phases/01-critical-fixes/01-CONTEXT.md` — locked decisions from user discussion session

### Secondary (MEDIUM confidence)
None needed — all facts are sourced from project files.

### Tertiary (LOW confidence)
None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — confirmed by direct file inspection; no new libraries
- Architecture: HIGH — exact file paths and line numbers verified by reading source
- Pitfalls: HIGH — identified from direct code reading (function naming mismatch is a concrete observation)

**Research date:** 2026-03-12
**Valid until:** Phase 4 start (no external dependencies; only changes if project structure changes)
