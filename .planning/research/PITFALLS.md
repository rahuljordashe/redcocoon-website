# Pitfalls Research

**Domain:** Artisan pottery studio website — visual redesign + gallery + workshop inquiry on Astro 5 static site
**Researched:** 2026-03-12
**Confidence:** MEDIUM (most pitfalls verified across multiple sources; some Astro-specific items from official docs + community, some from domain experience)

---

## Critical Pitfalls

### Pitfall 1: Redesign Breaks the Existing CSS Token System

**What goes wrong:**
The existing site has a well-built CSS custom property system in `global.css` — 25+ color tokens, 9 spacing tokens, 3 font-stack tokens. A redesign that adds new hardcoded values (`#D4A574`, `padding: 48px`) instead of extending the token system creates two parallel systems. After 2-3 components are built this way, global changes (e.g., adjusting the terracotta hue) require hunting through both systems. The redesign visually diverges from itself.

**Why it happens:**
Designers produce mockups with new colors; developers implement directly from the mockup hex value rather than asking "does a token exist for this, or should I add one?" The existing token system isn't documented inline, so new contributors don't know it's there.

**How to avoid:**
Before any redesign work begins, audit `global.css` and document which tokens exist. When a new color/spacing value is needed, add it as a token first, then use the token. A rule: if a value appears in more than one component, it must be a token. During PR review, reject any hardcoded hex colors that aren't brand channel colors (WhatsApp green, Instagram gradient).

**Warning signs:**
- Searching for a hex value finds it in more than 2 files
- A component `<style>` block defines `color: #somevalue` that doesn't reference `var(--color-...)`
- Two components with the same visual intent (e.g., "muted body text") use different color values

**Phase to address:** Visual Redesign phase — establish token governance before writing any new component styles.

---

### Pitfall 2: Gallery Filtering Hides Content From Screen Readers Incorrectly

**What goes wrong:**
The most common client-side gallery filter implementation uses `display: none` or `visibility: hidden` toggled by a CSS class. This works visually but leaves the hidden items in the DOM where screen readers may still encounter them, or conversely, removes content from the accessibility tree without announcing the change to the user. Filtered items that are "hidden" via `opacity: 0; pointer-events: none` (a common shortcut) are still read aloud by screen readers.

**Why it happens:**
Developers test filtering visually and it works. They don't test with a screen reader (VoiceOver/NVDA). The shortcut `opacity: 0` is often used for smooth fade-out transitions, but it doesn't remove content from the accessibility tree.

**How to avoid:**
Use `display: none` (not opacity tricks) for filtered-out items — this correctly removes them from the accessibility tree. Additionally, add `aria-live="polite"` on a status region that announces "Showing 4 of 12 pieces in Earthy Collection" when filters change. Use `<button>` elements (not `<div>` or `<a>`) for filter controls so they receive keyboard focus automatically.

**Warning signs:**
- Filter buttons implemented as `<span>` or `<div>` with click listeners instead of `<button>`
- CSS for hidden items uses `opacity: 0` without `display: none`
- No announcement when filter state changes

**Phase to address:** Gallery page phase — build the filter with accessible patterns from the start, not as a post-hoc fix.

---

### Pitfall 3: Image Assets Are Unoptimized Raw Photos at Build Time

**What goes wrong:**
The current site uses `<img src="/images/..." loading="lazy">` with plain `<img>` tags — Astro does not process these at build time. If product or gallery images are uploaded from a camera (4000px wide, 3-8MB JPEG), every visitor downloads the full file. On a phone in Colombo or on a slow international connection, the gallery page takes 10-15 seconds to load. Bounce rate spikes; the pottery looks bad because images load late.

**Why it happens:**
Images work during local development (fast disk reads). The performance problem only surfaces on real connections. The site currently has 12 products with placeholder images; adding a 30-product gallery multiplies the problem.

**How to avoid:**
Switch product and gallery images to Astro's `<Image />` component from `astro:assets`. It generates WebP at build time, adds `width`/`height` to prevent layout shift, and handles `srcset` for responsive sizes automatically. For images in Content Collections, store them in `src/assets/images/` (not `public/images/`) so Astro can process them. Run images through a pre-processing step (squoosh, imagemin, or Cloudinary) before committing to keep repository size manageable.

**Warning signs:**
- Image files in `public/images/` larger than 300KB
- Gallery page Lighthouse performance score below 70
- `<img src="/images/...">` (path starting with `/`) in any component that renders product imagery
- Build output contains `.jpg` files larger than the originals

**Phase to address:** Visual Redesign phase (establish image pipeline before gallery is built) AND Gallery phase (enforce for all new assets).

---

### Pitfall 4: The Contact/Form CTA Goes Nowhere — `#contact-form` Anchor With No Actual Form

**What goes wrong:**
The current `ReservationFlow` component has a "Form" channel badge that links to `#contact-form`. There is no form with that ID on the page. When a user who prefers not to use Instagram or WhatsApp clicks it, they get a broken in-page navigation (page scrolls to nothing or stays in place). This is the lowest-friction exit from the DM funnel — a user who clicked "Form" was already opting out of DM; a broken link loses them entirely.

**Why it happens:**
The form was deferred to a later phase. The anchor link was placed as a placeholder. The placeholder was never replaced. This is visible in the current codebase.

**How to avoid:**
The workshop inquiry form milestone is the right moment to close this loop. Until the form exists, the "Form" channel badge should either be removed or changed to open a mailto link as a temporary fallback. Once the form is built, verify the `id="contact-form"` matches exactly — case-sensitive.

**Warning signs:**
- Clicking the "Form" badge results in no scroll movement
- DevTools shows no element with `id="contact-form"` in the DOM
- The form section exists on the page but uses a different ID

**Phase to address:** Workshop Inquiry Form phase — this must be closed before launch.

---

### Pitfall 5: Mobile Touch Targets Too Small for the Inquiry Funnel

**What goes wrong:**
The current `channel-badge` elements use `font-size: 0.7rem` with `padding: 0.35rem 0.75rem` — the rendered touch target is approximately 28-30px tall. Apple HIG and Google Material both specify 44px minimum touch targets. The DM/WhatsApp/Form badges in the ReservationFlow are the most conversion-critical interactive elements on the page, yet they're among the smallest touch targets. Users on phones mis-tap, hit the wrong channel, or give up.

**Why it happens:**
The badges were designed to look compact and elegant at desktop scale. Mobile responsiveness was added, but the touch target size was not increased — only font and margin were reduced further on mobile.

**How to avoid:**
Set `min-height: 44px` on all interactive elements in the reservation flow and the FloatingContactButton. Use padding to fill vertical space while keeping the visual appearance small if needed (`padding: 0.6rem 1rem` achieves ~44px height with the current font sizes). Test the entire inquiry flow on a real phone before declaring any phase complete.

**Warning signs:**
- DevTools mobile device simulation shows CTA buttons shorter than 44px
- Tapping a CTA on a real phone occasionally opens the wrong app
- The "DM to Reserve" button in ProductCard has `font-size: 0.65rem` on mobile (currently true)

**Phase to address:** Visual Redesign phase — fix touch targets site-wide; verify in Gallery and Form phases.

---

### Pitfall 6: Google Fonts Cause Layout Shift and Slow First Paint

**What goes wrong:**
The site loads DM Serif Display, Cormorant Garamond, and Inter via a Google Fonts `<link>` in the `<head>`. If the fonts are not preloaded and `font-display` is not set, the browser shows invisible text (FOIT) or swaps in system fonts (FOUT) — visually jarring for an artisan site where typography is central to the aesthetic. Additionally, a Google Fonts request adds a DNS lookup + TCP connection to an external server on every page load, adding 200-300ms on first visit. On slow international connections this is more.

**Why it happens:**
Google Fonts is the path of least resistance. Font display defaults vary by browser. Nobody checks the visual during slow-connection simulation.

**How to avoid:**
Add `font-display: swap` to the Google Fonts URL: append `&display=swap` (Google Fonts supports this via the URL parameter). Preload the most critical font file — DM Serif Display is used for all headings, so preloading its woff2 file eliminates heading FOIT. For highest performance, self-host fonts via `@font-face` in `global.css` — verified 200-300ms faster than Google Fonts CDN. If keeping Google Fonts, add `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` before the font `<link>`.

**Warning signs:**
- Lighthouse flags "Ensure text remains visible during webfont load"
- Watching the page load in DevTools throttled to "Slow 3G" shows headings appearing 1-2 seconds after body text
- The Google Fonts URL in BaseLayout does not include `&display=swap`

**Phase to address:** Visual Redesign phase — fix font loading strategy alongside any typography changes.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| `<img src="/images/...">` for product photos instead of Astro `<Image />` | Simpler code, works immediately | Gallery of 30+ items loads slowly; no WebP, no srcset, CLS from missing dimensions | MVP with <12 images; not acceptable when building gallery page |
| Hardcoded hex colors in component `<style>` instead of CSS tokens | Faster individual component work | Two parallel color systems; redesign requires grep + find-replace across files | Never acceptable once a design token system exists |
| `display: none` toggle via `data-collection` + vanilla JS without ARIA live region | Filtering works visually | Screen readers announce nothing when filter changes; filtered items may still be read | Never in production |
| Netlify Forms / third-party form service for workshop inquiry | No backend needed | 100-submission free tier exhausted quickly; spam gets silently filtered without notification | Acceptable for MVP; monitor volume monthly |
| Flat image directory in `public/` with no naming convention | Easy to add images ad-hoc | 12 images → 50 images → impossible to know which are in use; build copies everything | Never once collection count exceeds current 12 |
| Single-page layout (everything on index.astro) | Simple routing | Gallery page needs its own route; adding pages to single-page site requires refactoring nav, layout, BaseLayout | Must create separate page routes for gallery and workshop |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Instagram DM link (`ig.me/m/redcocoon`) | Assuming the link works without Instagram login on desktop — it redirects to the login page for logged-out users | Add a note near DM CTAs for desktop users: "Open in Instagram app"; the link works correctly on mobile |
| WhatsApp link (`wa.me/94777720696`) | Pre-filled message text that's too long — WhatsApp truncates encoded URLs in some clients | Keep pre-filled messages under 100 characters; test on Android and iOS WhatsApp |
| Netlify Forms (if used for workshop inquiry) | Submitting test data with fake content — Netlify's spam filter silently drops entries without frontend indication | Test forms with real-looking data; check the Netlify Forms dashboard to verify submissions appear |
| Netlify Forms | No honeypot field — bots fill and spam the workshop inquiry | Add `netlify-honeypot="bot-field"` and a visually hidden `<input name="bot-field">` |
| Google Fonts CDN | Blocking render: `<link>` in `<head>` without `rel="preconnect"` causes extra DNS round-trip | Add `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` before the Google Fonts link |
| Vercel deployment | Deploying an Astro static site with `output: 'static'` but using `@astrojs/vercel` adapter that defaults to serverless — verify adapter is configured for static output | Confirm `vercel.json` or adapter config specifies static; the current site uses `output: 'static'` correctly per CLAUDE.md |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| All product images in `public/images/` as raw JPEGs | Gallery page slow on mobile; high LCP | Use Astro `<Image />` component, store in `src/assets/` | With 12 images it's borderline; with 30+ gallery images, it's a problem |
| All filtering logic runs on `getCollection()` output in the browser (full data serialized to JSON in page) | Page HTML is large; slow parse on low-end Android devices | Pre-filter at build time using Astro static paths; only ship necessary data to client | Not an issue at 30 products; relevant if catalog grows past 100 |
| Multiple `<script>` tags across components all adding `scroll` event listeners | Janky scroll performance; multiple listeners competing | Centralize scroll handling in BaseLayout script (already done correctly) | Already architected correctly; risk is adding new components with their own scroll listeners |
| Tilt effect on ProductCard runs on every `mousemove` without RAF throttle | CPU spike on gallery page with 12+ cards | Already uses IntersectionObserver; ensure any new mouse handlers use `requestAnimationFrame` | At 30+ cards on gallery page |
| Workshop inquiry form submits to an external service that's rate-limited or has CORS restrictions | Form silently fails in production; works in dev | Test form submissions on Vercel preview URL before merging, not just localhost | From day one if CORS is misconfigured |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing the real WhatsApp number in page source (already present in `whatsapp.ts`) | Scrapers harvest the number for spam/marketing lists | Accepted trade-off for the DM-first model; consider obfuscation if spam becomes an issue |
| Workshop inquiry form with no spam protection | Inbox flooded with bot submissions; Netlify free tier exhausted | Add honeypot field; optionally add hCaptcha (free tier, privacy-respecting alternative to reCAPTCHA) |
| Linking to `/hospitality` (a page that doesn't yet exist in the current build) | 404 for any user who clicks "View Portfolio" in the Hospitality section | Either build the hospitality page in this milestone or change the link to `#hospitality` anchor until the page exists |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Gallery filter shows all collections as tabs but hides "All" as default — user sees nothing until they pick a filter | User thinks gallery is empty; leaves | Default state = "All" selected; show all pieces on load, filter on interaction |
| Price displayed as "LKR 4,500" with no currency explanation for international visitors | International visitors don't know LKR to USD/EUR conversion; can't evaluate if piece is in their budget | Add "≈ USD X" in small text beneath LKR price, or add a sentence in the gallery/product header: "Prices in Sri Lankan Rupees (LKR)" |
| Workshop inquiry form asks for too many fields (name, email, phone, workshop type, dates, message) | Form abandonment — especially on mobile where typing is laborious | Keep to 3 fields maximum for MVP: name, email (required for follow-up), and message/interest; she follows up manually |
| "DM to Reserve" button on ProductCard opens Instagram on desktop in browser rather than app | Desktop users who have Instagram open in a browser tab get sent to `ig.me` which may prompt login | Accept this limitation; add tooltip or small note "Opens Instagram" on hover for clarity |
| Hospitality section CTA "View Portfolio" links to `/hospitality` which doesn't exist yet | Hard 404 for any hotel/restaurant visitor clicking the most relevant CTA for them | This is a live broken link in the current build — must be fixed immediately, either by building the page or changing the link |
| Gallery filtering without a "no results" state when a category has zero items | User selects a filter, all cards disappear, no explanation — feels broken | Always render a "No pieces in this collection yet — check back soon" empty state |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Gallery filter:** Often missing the "no results" empty state — verify by selecting a category with no products
- [ ] **Workshop inquiry form:** The `#contact-form` anchor in ReservationFlow must resolve to an actual form element with `id="contact-form"` — verify by clicking the "Form" channel badge
- [ ] **Image pipeline:** Visually looks fine in dev (fast disk reads) — verify actual file sizes in `public/images/` and check Lighthouse on a throttled connection
- [ ] **Hospitality portfolio page:** `/hospitality` is linked from the Hospitality section CTA — verify the page exists and returns 200, not 404
- [ ] **Touch targets on mobile:** DM/WhatsApp buttons look fine on desktop — verify rendered height ≥ 44px on a real phone (iPhone SE viewport)
- [ ] **Form spam protection:** Form appears to work — verify honeypot field is present and test submissions appear in the Netlify dashboard (not silently dropped)
- [ ] **Font loading:** Fonts look correct in dev (cached) — verify `&display=swap` is in the Google Fonts URL and test on Slow 3G in DevTools
- [ ] **International pricing clarity:** Prices display correctly — verify a non-Sri Lankan visitor understands LKR without additional context

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| CSS token system divergence (hardcoded values across components) | MEDIUM | Audit with `grep -r "#[0-9a-fA-F]" src/components/` to find all hardcoded colors; map each to the nearest token; replace in one PR |
| Broken `#contact-form` anchor in production | LOW | Add `id="contact-form"` to the existing reservation section as immediate fix; build real form in same milestone |
| Unoptimized images causing slow gallery | MEDIUM | Add Astro `<Image />` component to ProductCard and gallery items; run existing images through squoosh; this requires Content Collection images to move to `src/assets/` |
| Netlify Forms spam overwhelm | LOW-MEDIUM | Add honeypot field to form; if still problematic, switch to hCaptcha or a paid form service (Formspree, Basin) |
| Broken `/hospitality` 404 in production | LOW | Redirect the link to `#hospitality` anchor as immediate fix; build the page in a follow-up milestone |
| Font layout shift on redesign | LOW | Add `&display=swap` to Google Fonts URL and `<link rel="preconnect">` — 30-minute fix with meaningful impact |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| CSS token system divergence | Visual Redesign — Day 1 (token audit before any new styles) | Grep for hardcoded hex values in components returns zero results |
| Google Fonts FOUT/slow load | Visual Redesign (typography work) | Lighthouse "Ensure text remains visible" passes; `&display=swap` in font URL |
| Image pipeline (unoptimized photos) | Visual Redesign (before gallery is built, establish `<Image />` usage) | No `<img src="/images/...">` tags in product/gallery components; Lighthouse performance ≥ 85 |
| Mobile touch targets | Visual Redesign (systematic mobile pass) | All CTA buttons ≥ 44px height on iPhone SE viewport |
| Gallery filter accessibility | Gallery Page phase | Screen reader announces filter results; filter buttons are `<button>` elements |
| Gallery empty state | Gallery Page phase | Selecting empty category shows message, not blank grid |
| `#contact-form` broken anchor | Workshop Inquiry Form phase — must be first task | Clicking "Form" badge scrolls to visible form |
| Form spam protection | Workshop Inquiry Form phase | Honeypot present; test submission appears in form service dashboard |
| Hospitality 404 | Workshop Inquiry Form phase (or sooner if live) | `/hospitality` returns 200 or link is changed before deployment |
| International pricing clarity | Gallery Page phase (when international audience is primary focus) | LKR prices have explanatory context visible without extra clicks |
| DM link behavior on desktop | Visual Redesign phase (document as known limitation) | Add "Opens Instagram" tooltip; document in code comments |

---

## Sources

- Astro Image component documentation: [https://docs.astro.build/en/guides/images/](https://docs.astro.build/en/guides/images/)
- Font display strategies — FOIT/FOUT: [https://talent500.com/blog/optimizing-fonts-foit-fout-font-display-strategies/](https://talent500.com/blog/optimizing-fonts-foit-fout-font-display-strategies/)
- Self-hosted vs Google Fonts performance (200-300ms gap): [https://medium.com/@ignatovich.dm/local-font-loading-vs-google-fonts-performance-comparison-with-real-data-021a62a763da](https://medium.com/@ignatovich.dm/local-font-loading-vs-google-fonts-performance-comparison-with-real-data-021a62a763da)
- Netlify Forms spam filter behavior (silent drops): [https://www.seancdavis.com/posts/what-you-need-to-know-about-netlify-forms/](https://www.seancdavis.com/posts/what-you-need-to-know-about-netlify-forms/)
- Netlify spam filters and honeypot: [https://docs.netlify.com/manage/forms/spam-filters/](https://docs.netlify.com/manage/forms/spam-filters/)
- Form UX mistakes and conversion: [https://raw.studio/blog/5-common-mistakes-that-kill-form-conversions-how-to-avoid-them/](https://raw.studio/blog/5-common-mistakes-that-kill-form-conversions-how-to-avoid-them/)
- Accessibility — CSS/JS best practices: [https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/CSS_and_JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/CSS_and_JavaScript)
- Image optimization for artist websites: [https://artstoheartsproject.com/image-optimization-for-artists-in-3-steps/](https://artstoheartsproject.com/image-optimization-for-artists-in-3-steps/)
- Image sizes and page load: [https://snipcart.com/blog/images-optimization-page-load-time](https://snipcart.com/blog/images-optimization-page-load-time)
- Website redesign mistakes 2025: [https://www.brainiacmedia.net/blogs/website-redesign-mistakes-to-avoid-2025/](https://www.brainiacmedia.net/blogs/website-redesign-mistakes-to-avoid-2025/)
- Codebase inspection: `src/components/ProductCard.astro`, `src/components/ReservationFlow.astro`, `src/components/Hospitality.astro`, `src/content/config.ts`, `src/styles/global.css`

---
*Pitfalls research for: Redcocoon — artisan pottery studio website, visual redesign + gallery + workshop inquiry milestone*
*Researched: 2026-03-12*
