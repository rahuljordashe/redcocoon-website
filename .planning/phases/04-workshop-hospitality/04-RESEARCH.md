# Phase 4: Workshop & Hospitality - Research

**Researched:** 2026-03-12
**Domain:** Static site form submission (Web3Forms), Astro page creation, vanilla JS inline state management
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Workshop page structure**
- Form-focused page: short warm intro (1-2 sentences) + inquiry form — no scrolling needed
- Warm invitation tone ("Come get your hands dirty" feel) — personal, welcoming, emphasizes the experience
- Cream background — light, open, inviting, consistent with /shop page
- Add "Workshop" link to main navigation between "Studio" and "Contact"

**Workshop form fields & submission**
- Four fields: name (required), email (required), phone (optional), message/interest (required)
- Web3Forms as submission service — free tier with hCaptcha spam protection (researcher to confirm hCaptcha availability on free tier; fallback: Formspree with honeypot)
- Inline success state: form fields fade out, replaced by green checkmark + "Thanks! We'll be in touch soon." message in same space — no page reload, no redirect
- Inline error state for submission failures

**Hospitality section expansion**
- Stays as homepage anchor section (/#hospitality) — no separate /hospitality page
- Add 2-3 concrete service bullets below existing description (e.g., "Custom dinnerware sets", "Serving platters & accent pieces", "Full venue collections")
- Add email CTA alongside existing WhatsApp CTA: mailto: link to hello@redcocoon.com with pre-filled subject "Hospitality Inquiry"
- Keep "Discuss a Project" WhatsApp button (unchanged from Phase 1)

**Form link restoration**
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| WKSP-01 | User can submit a workshop inquiry via a form on `/workshop` page | Web3Forms fetch API + Astro page pattern documented below |
| WKSP-02 | Workshop form collects name, email, and interest/message | 4-field form pattern (name, email, phone optional, message) — standard HTML5 fields |
| WKSP-03 | Workshop form has spam protection (honeypot + hCaptcha via Web3Forms) | CONFIRMED: hCaptcha available on free tier with Web3Forms-provided sitekey; honeypot also free |
| WKSP-04 | User sees inline success/error feedback after form submission | JS fetch pattern with DOM swap (form fields hidden, confirmation shown in-place) documented below |
| HOSP-01 | Hospitality B2B section has tailored messaging for hotels, restaurants, and cafes | Existing component already has B2B framing; add service bullet list to existing `.hospitality-desc` area |
| HOSP-02 | Hospitality section has a separate inquiry path (WhatsApp with B2B pre-filled message) | `getQuoteLink()` in whatsapp.ts already generates B2B pre-filled WhatsApp message; email CTA is new addition |
</phase_requirements>

---

## Summary

Phase 4 is primarily a form integration and content expansion phase. The core technical work is creating `src/pages/workshop.astro` — a new Astro static page with a Web3Forms-backed contact form — plus content and CTA additions to the existing `Hospitality.astro` component. The rest is surgical link restoration in three existing components (ReservationFlow, FloatingContactButton, Footer) using CSS classes that were already preserved from Phase 1 specifically for this purpose.

Web3Forms hCaptcha is **confirmed available on the free tier** using the shared sitekey `50b2fe65-b00b-4b9e-ad62-3ba471098be2`. The Web3Forms script (`https://web3forms.com/client/script.js`) auto-injects hCaptcha when it finds `.h-captcha[data-captcha="true"]`. Free tier limit is 250 submissions/month — more than adequate for a pottery studio workshop inquiry form.

The inline success/error state swap is pure vanilla JS: on form submission, `e.preventDefault()`, POST to `https://api.web3forms.com/submit` via `fetch()`, then toggle CSS classes to hide the form fields and show the confirmation area — no page reload. This matches the project's zero-framework, vanilla-JS-in-`<script>`-tags architecture exactly.

**Primary recommendation:** Create `workshop.astro` as a single-section page following the `shop.astro` pattern (BaseLayout wrapper + scoped styles + vanilla JS `<script>`), use Web3Forms fetch pattern for submission, and add hCaptcha via the Web3Forms script tag.

---

## Standard Stack

### Core

| Library/Service | Version/Tier | Purpose | Why Standard |
|----------------|-------------|---------|--------------|
| Web3Forms | Free tier | Form submission to email, no backend | Zero-config, no server needed, confirmed hCaptcha on free tier |
| Web3Forms script | CDN (`web3forms.com/client/script.js`) | Auto-injects hCaptcha widget | Required companion to `.h-captcha` div |
| Astro static pages | Already installed (v5) | `/workshop` page route | Project standard |
| Vanilla JS fetch | Browser built-in | AJAX form POST | Project's zero-framework rule |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| hCaptcha (via Web3Forms) | Free sitekey | Spam protection | Always — included in the form div pattern |
| HTML5 honeypot field | n/a | Additional spam layer | Hidden `<input type="text" name="botcheck">` |
| CSS transition (opacity/visibility) | n/a | Inline state swap (form → success) | The success/error reveal animation |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Web3Forms | Formspree | Formspree free tier is 50 submissions/month vs 250; Web3Forms confirmed for hCaptcha on free |
| Web3Forms hCaptcha | Honeypot-only | WKSP-03 requires hCaptcha; honeypot alone doesn't satisfy the requirement |
| Web3Forms CDN script | Self-hosted hCaptcha | Unnecessary complexity; Web3Forms script handles widget injection automatically |

**Installation:**

No new npm packages needed. Web3Forms is used via fetch API (no client library) and the CDN script tag for hCaptcha injection. The Access Key is a string constant embedded in the form's hidden input.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── pages/
│   └── workshop.astro          # NEW — inquiry form page
├── components/
│   ├── Hospitality.astro       # MODIFY — add bullets + email CTA
│   ├── Navbar.astro            # MODIFY — add Workshop link
│   ├── ReservationFlow.astro   # MODIFY — restore .channel-form badge
│   ├── FloatingContactButton.astro  # MODIFY — restore Workshop option
│   └── Footer.astro            # MODIFY — restore Workshop CTA button
└── utils/
    └── whatsapp.ts             # EXISTING — getQuoteLink() used by Hospitality
```

### Pattern 1: Astro Static Page (following shop.astro)

**What:** Single-section page using BaseLayout with scoped `<style>` and vanilla `<script>`
**When to use:** Any new page in this project

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionHeader from '../components/SectionHeader.astro';
---

<BaseLayout
  title="Workshop — Redcocoon Pottery"
  description="Join a pottery workshop at Redcocoon studio in Colombo."
>
  <section class="workshop" id="workshop">
    <div class="container">
      <SectionHeader tag="Hands-On Experience" title="Workshop" titleAccent="Inquiry" />
      <!-- form content -->
    </div>
  </section>
</BaseLayout>

<style>
  .workshop {
    padding: var(--space-5xl) 0;
    background: var(--color-cream);   /* matches /shop cream bg */
  }
</style>

<script>
  /* vanilla JS form handler */
</script>
```

### Pattern 2: Web3Forms Fetch Submission

**What:** `fetch()` POST to Web3Forms API with JSON body; inline state management
**When to use:** This is the only form submission in the project

```html
<!-- Hidden fields Web3Forms requires -->
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
<input type="hidden" name="subject" value="Workshop Inquiry — Redcocoon">
<input type="hidden" name="from_name" value="Redcocoon Website">
<!-- Honeypot -->
<input type="checkbox" name="botcheck" style="display:none;">
<!-- hCaptcha widget — Web3Forms script auto-populates -->
<div class="h-captcha" data-captcha="true"></div>
```

```javascript
// Source: https://docs.web3forms.com/getting-started/examples/ajax-contact-form-using-javascript
const form = document.getElementById('workshopForm');
const formFields = document.getElementById('workshopFields');
const successMsg = document.getElementById('workshopSuccess');
const errorMsg = document.getElementById('workshopError');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.status === 200) {
      formFields.style.opacity = '0';
      setTimeout(() => {
        formFields.style.display = 'none';
        successMsg.style.display = 'flex';
        requestAnimationFrame(() => { successMsg.style.opacity = '1'; });
      }, 300);
    } else {
      errorMsg.textContent = json.message || 'Something went wrong. Please try again.';
      errorMsg.style.display = 'block';
    }
  } catch {
    errorMsg.textContent = 'Network error — please check your connection and try again.';
    errorMsg.style.display = 'block';
  }
});
```

### Pattern 3: Inline Success State Swap (CSS approach)

**What:** Two sibling containers — `#workshopFields` (the form fields) and `#workshopSuccess` (the confirmation) — in the same space. JS toggles visibility on success.
**When to use:** No-reload confirmation UX

```html
<form id="workshopForm">
  <div id="workshopFields">
    <!-- name, email, phone, message inputs + submit button + hcaptcha -->
  </div>
  <!-- Success panel — hidden initially -->
  <div id="workshopSuccess" style="display:none; opacity:0;">
    <span class="success-icon">✓</span>
    <p>Thanks! We'll be in touch soon.</p>
  </div>
  <!-- Error line — hidden initially -->
  <p id="workshopError" style="display:none;"></p>
</form>
```

```css
/* Transition matches project's --transition-med */
#workshopFields {
  transition: opacity var(--transition-med);
}
#workshopSuccess {
  transition: opacity var(--transition-med);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}
.success-icon {
  color: var(--color-sage);
  font-size: 2.5rem;
}
```

### Pattern 4: Restoring .channel-form Badge

**What:** Add a third `<a>` alongside the existing Instagram DM + WhatsApp badges in ReservationFlow step 2
**When to use:** CSS class `.channel-form` is already defined in ReservationFlow.astro (line 115-124) — zero CSS changes needed

```astro
<!-- Source: src/components/ReservationFlow.astro — step 2 channels block -->
<a href="/workshop" class="channel-badge channel-form">Workshop</a>
```

```astro
<!-- FloatingContactButton.astro — inside .floating-popup -->
<a href="/workshop" class="floating-option floating-form">Workshop</a>
```

```astro
<!-- Footer.astro — .footer-cta-buttons block -->
<a href="/workshop" class="btn btn-outline-workshop">Workshop</a>
```

### Pattern 5: Hospitality Email CTA

**What:** mailto: link with pre-filled subject alongside the existing WhatsApp button
**When to use:** Hospitality section only — email is the B2B alternative channel

```astro
<!-- src/components/Hospitality.astro — .hospitality-actions block -->
<a
  href="mailto:hello@redcocoon.com?subject=Hospitality%20Inquiry"
  class="btn btn-ghost hospitality-ghost"
>
  Email Us
</a>
```

Note: `.hospitality-ghost` CSS class is already defined in Hospitality.astro (lines 90-98) and was preserved from Phase 1 for exactly this use.

### Anti-Patterns to Avoid

- **Direct `window.location` redirect on success:** The locked decision is inline state swap, not redirect. Do not navigate away.
- **`form.reset()` before showing success:** Reset clears hCaptcha state; show success first, then optionally reset if user navigates back.
- **Using `is:inline` unnecessarily:** The project uses standard `<script>` tags (not `is:inline`) for module-bundled scripts. Use standard `<script>` for the form handler — it can access DOM elements by ID fine.
- **Hardcoding the Web3Forms Access Key as a visible constant:** Embed in the hidden input only; no separate JS constant needed.
- **Placing hCaptcha `<script>` in BaseLayout:** Load it only on the workshop page to avoid 37KB script load on every page.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email delivery from static site | Custom serverless function / Netlify Function | Web3Forms fetch API | No backend, no deploy config, 250 free/month covers a pottery studio |
| Spam prevention | Custom rate limiting or IP checks | Web3Forms hCaptcha (free sitekey) + honeypot | hCaptcha challenge happens client-side; server-side validation done by Web3Forms |
| Form validation feedback | Custom validation state machine | HTML5 `required` + `type="email"` + a single `errorMsg` element | Browser validation catches required/email format; Web3Forms catches the rest |

**Key insight:** Web3Forms exists precisely to solve the "static site needs a form" problem. The fetch-to-email pattern is battle-tested and documented with Astro specifically.

---

## Common Pitfalls

### Pitfall 1: hCaptcha Not Rendering

**What goes wrong:** The `.h-captcha` div renders blank; no challenge appears; form submits without captcha verification.
**Why it happens:** The Web3Forms client script (`web3forms.com/client/script.js`) must be loaded on the page for hCaptcha to inject. Missing or incorrectly placed `<script>` tag.
**How to avoid:** Add the script tag to `workshop.astro` page (not BaseLayout): `<script src="https://web3forms.com/client/script.js" async defer is:inline></script>`. Note: use `is:inline` for external CDN script tags in Astro to prevent bundling interference.
**Warning signs:** Empty space where captcha should appear; form submits instantly on first click.

### Pitfall 2: Web3Forms Blocks Submission Without hCaptcha Token

**What goes wrong:** Form submits via fetch but Web3Forms API returns a 400/422 error because the hCaptcha token is missing from the POST body.
**Why it happens:** hCaptcha populates a hidden field (`h-captcha-response`) automatically when the widget is solved. If the widget never loaded (Pitfall 1), the token is absent.
**How to avoid:** Test form submission in browser (not in Node/headless). Verify that the `.h-captcha` div shows the challenge widget after page load. Check the `data-captcha="true"` attribute is present.
**Warning signs:** `fetch` returns non-200; `json.message` mentions "captcha" or "bot".

### Pitfall 3: FormData Misses Hidden Inputs

**What goes wrong:** `Object.fromEntries(new FormData(form))` omits some fields; Web3Forms doesn't receive `access_key` or `subject`.
**Why it happens:** Hidden inputs must be inside the `<form>` element, not siblings of it. If the `<div id="workshopFields">` wrapper contains the inputs but the hidden fields are outside it, FormData still picks them up — as long as they are inside `<form>`. Common error is placing hidden inputs outside the `<form>` tag.
**How to avoid:** Keep all `<input type="hidden">` elements as direct children of `<form id="workshopForm">`, above the `<div id="workshopFields">` wrapper.
**Warning signs:** Web3Forms sends email without subject line, or with "undefined" access key errors in the response.

### Pitfall 4: Navbar "Workshop" Link Position

**What goes wrong:** "Workshop" link is added at the end of `.nav-links` instead of between "Studio" and "Contact".
**Why it happens:** Simple append without reading the existing order.
**How to avoid:** Current nav order in Navbar.astro (line 10-15) is: Shop → Collections → Hospitality → Studio → Contact. Insert Workshop between Studio and Contact.
**Warning signs:** Nav link order doesn't match locked decision.

### Pitfall 5: Footer CTA Button Style Gap

**What goes wrong:** The third "Workshop" button in `.footer-cta-buttons` has no defined style in the dark charcoal banner context. `.channel-form` is defined in ReservationFlow but not in the footer's dark background.
**Why it happens:** `.channel-form` uses `color: var(--color-clay)` and `border: 1.5px solid var(--color-beige-dark)` — readable on cream but low-contrast on the charcoal footer banner.
**How to avoid:** In Footer.astro, use the existing `.hospitality-ghost` style concept or add a scoped `.btn-outline-workshop` that uses lighter colors suitable for the dark background (e.g., `color: rgba(255,255,255,0.8)` + `border-color: rgba(255,255,255,0.25)`). Alternatively, reuse `.hospitality-ghost` directly — it's defined in Hospitality.astro but can be applied in Footer since it's the same global scope.
**Warning signs:** "Workshop" button text is invisible or very low contrast against the dark footer banner.

### Pitfall 6: FloatingContactButton Layout Overflow

**What goes wrong:** Adding a 3rd option to the floating popup makes the popup too tall on small screens, overflowing the viewport top edge.
**Why it happens:** `.floating-popup` is positioned `bottom: calc(100% + 12px)` from the trigger button (which is 80px from the bottom). With 3 options, the popup height may exceed available space on short viewport devices.
**How to avoid:** The current 2-option popup is ~130px tall. Adding a third option adds ~50px. On a 568px-tall viewport (iPhone SE), 80px trigger + 12px gap + ~180px popup = fine. No height constraint needed, but verify on 320px width during implementation.
**Warning signs:** Popup clips at the top of screen on small phones.

---

## Code Examples

Verified patterns from official sources and existing codebase:

### Web3Forms Hidden Fields (Required)

```html
<!-- Source: https://docs.web3forms.com/getting-started/examples/ajax-contact-form-using-javascript -->
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
<input type="hidden" name="subject" value="Workshop Inquiry — Redcocoon">
<input type="hidden" name="from_name" value="Redcocoon Website">
<!-- Honeypot field — bots fill this, humans don't -->
<input type="checkbox" name="botcheck" class="hidden" style="display:none;">
<!-- hCaptcha — Web3Forms script auto-populates h-captcha-response -->
<div class="h-captcha" data-captcha="true"></div>
```

### Web3Forms hCaptcha Free Sitekey

```html
<!-- Source: https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha -->
<!-- Free plan shared sitekey — used when no custom hCaptcha account exists -->
<!-- Sitekey: 50b2fe65-b00b-4b9e-ad62-3ba471098be2 -->
<!-- Note: Web3Forms script uses this internally; you don't need to reference the sitekey in markup -->
<!-- Just add data-captcha="true" to the .h-captcha div and load the script -->
<script src="https://web3forms.com/client/script.js" async defer></script>
```

### Existing .channel-form Class (ReservationFlow.astro lines 115-124)

```css
/* Source: src/components/ReservationFlow.astro — already exists, no changes needed */
.channel-form {
  background: transparent;
  color: var(--color-clay);
  border: 1.5px solid var(--color-beige-dark);
}
.channel-form:hover {
  border-color: var(--color-terracotta);
  color: var(--color-terracotta);
}
```

### Existing .hospitality-ghost Class (Hospitality.astro lines 90-98)

```css
/* Source: src/components/Hospitality.astro — already exists, ready for email CTA button */
.hospitality-ghost {
  color: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.25);
}
.hospitality-ghost:hover {
  color: white;
  border-color: white;
}
```

### getQuoteLink() — Existing B2B WhatsApp Utility

```typescript
/* Source: src/utils/whatsapp.ts */
export function getQuoteLink(): string {
  const message = `Hi! I'm interested in custom tableware for my venue. Could we discuss a hospitality project?`;
  return getWhatsAppLink(message);
}
/* This is already used in Hospitality.astro — no changes needed */
```

### Navbar Link Insertion Pattern

```astro
<!-- Source: src/components/Navbar.astro lines 10-15 — current order -->
<ul class="nav-links">
  <li><a href="/shop">Shop</a></li>
  <li><a href="/#collections">Collections</a></li>
  <li><a href="/#hospitality">Hospitality</a></li>
  <li><a href="/#studio">Studio</a></li>
  <!-- INSERT HERE: -->
  <li><a href="/workshop">Workshop</a></li>
  <li><a href="/#contact">Contact</a></li>
</ul>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Form redirect to thank-you page | Inline state swap (no reload) | Industry shift ~2018 | Better UX; required by WKSP-04 |
| Server-side form processing | Third-party form API (Web3Forms) | JAMStack era ~2019 | No backend needed; perfect for Astro static |
| reCaptcha (Google) | hCaptcha (privacy-first) | 2020+ | No Google tracking; hCaptcha GDPR-friendlier |

**Deprecated/outdated:**
- `<form action="mailto:...">`: Relies on desktop email client; broken on most mobile. Do not use.
- `<form method="POST" action="/api/submit">`: Requires server; this project is static output only.

---

## Open Questions

1. **Web3Forms Access Key**
   - What we know: Key is obtained by entering email at web3forms.com; delivered via email
   - What's unclear: The real key for hello@redcocoon.com hasn't been obtained yet
   - Recommendation: Planner should include a task "Obtain Web3Forms Access Key" as Wave 0 setup. The key is embedded as a hidden input value. Use a placeholder like `YOUR_WEB3FORMS_ACCESS_KEY` during build; swap before launch. The build will succeed without a real key — only submissions will fail.

2. **Footer Workshop Button Style on Dark Background**
   - What we know: `.channel-form` uses `var(--color-clay)` text — readable on cream (ReservationFlow), but insufficient contrast on the charcoal footer CTA banner
   - What's unclear: Whether to reuse `.hospitality-ghost` (white text style defined in Hospitality.astro) or define a new scoped rule in Footer.astro
   - Recommendation: Use `btn btn-ghost hospitality-ghost` class on the footer Workshop button; `.hospitality-ghost` provides white/translucent border style suited to dark backgrounds. No new CSS needed.

3. **MobileMenu Workshop Link**
   - What we know: MobileMenu.astro was modified in Phase 2; it mirrors the Navbar links
   - What's unclear: Whether MobileMenu needs a corresponding "Workshop" link added (not mentioned in CONTEXT.md integration points)
   - Recommendation: Read MobileMenu.astro before implementing; add Workshop link there if it mirrors Navbar. Likely yes — the hamburger menu is the mobile equivalent of the desktop nav.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — Astro static site, no test runner configured |
| Config file | None |
| Quick run command | `bun run build` (build validation — catches type errors and broken imports) |
| Full suite command | `npx astro check` (TypeScript typecheck across all .astro files) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| WKSP-01 | `/workshop` page exists and renders without error | smoke | `bun run build` | ❌ Wave 0 — page to be created |
| WKSP-02 | Form has name, email, phone, message fields | smoke | `bun run build` (build-time HTML structure) | ❌ Wave 0 |
| WKSP-03 | `.h-captcha[data-captcha="true"]` div present + Web3Forms script loaded | manual | Browser devtools — inspect DOM after page load | n/a |
| WKSP-04 | Success panel hidden by default; visible after mock success response | manual | Open `/workshop` in browser, submit form | n/a |
| HOSP-01 | Hospitality section contains service bullets list | smoke | `bun run build` | ❌ Wave 0 — bullets to be added |
| HOSP-02 | Email CTA link has correct mailto: href | smoke | `bun run build` | ❌ Wave 0 — email CTA to be added |

### Sampling Rate

- **Per task commit:** `bun run build` — catches import errors, broken component props, TypeScript issues
- **Per wave merge:** `npx astro check` — full TypeScript validation
- **Phase gate:** Both commands clean before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] Web3Forms Access Key — obtain from web3forms.com (manual step, not a file gap)
- [ ] No test framework to install — build validation is the mechanism for this project

*(No test files needed — this project uses build-time validation rather than a test runner)*

---

## Sources

### Primary (HIGH confidence)

- https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha — hCaptcha free tier confirmed, sitekey `50b2fe65-b00b-4b9e-ad62-3ba471098be2`
- https://docs.web3forms.com/getting-started/customizations/spam-protection — honeypot + hCaptcha both available free
- https://docs.web3forms.com/getting-started/examples/ajax-contact-form-using-javascript — complete fetch pattern
- `src/components/ReservationFlow.astro` — `.channel-form` CSS class confirmed present lines 115-124
- `src/components/Hospitality.astro` — `.hospitality-ghost` CSS class confirmed present lines 90-98
- `src/components/FloatingContactButton.astro` — `.floating-form` CSS class confirmed present lines 117-126
- `src/components/Navbar.astro` — current nav link order confirmed (lines 10-15)
- `src/components/Footer.astro` — CTA banner structure confirmed (lines 8-15)

### Secondary (MEDIUM confidence)

- https://docs.web3forms.com/how-to-guides/static-site-generators/astro — Astro `is:inline` pattern for external CDN scripts; use for the Web3Forms client script tag
- Web3Forms free tier: 250 submissions/month (multiple sources consistent, pricing page returned 403 but AppSumo and comparison sites confirm)

### Tertiary (LOW confidence)

- None — all critical claims verified from official docs or codebase inspection

---

## Metadata

**Confidence breakdown:**
- Web3Forms hCaptcha free tier: HIGH — verified directly from official docs page
- Web3Forms fetch API pattern: HIGH — verified from official AJAX example docs
- Existing CSS classes ready to reuse: HIGH — verified by direct file read
- Free tier 250 submissions/month: MEDIUM — pricing page inaccessible (403), confirmed by multiple third-party sources
- MobileMenu Workshop link: MEDIUM — not mentioned in CONTEXT.md but logically implied by nav parity

**Research date:** 2026-03-12
**Valid until:** 2026-06-12 (Web3Forms API is stable; hCaptcha free sitekey confirmed stable)
