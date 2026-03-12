---
type: quick
mode: quick
task: "UI fixes: remove scroll indicator, 12+ years card, fix hero clipping, process text legibility, simplify reservation step, restyle contact buttons, fix DM button alignment"
plans: 1
---

# Quick Task 1: UI Fixes

## Plan 1: UI Polish Pass

### Task 1: Hero cleanup
- **files:** `src/components/Hero.astro`
- **action:** Remove `.hero-scroll` div (scroll to discover indicator) and its styles. Remove `.hero-floating-badge` div (12+ years card) and its styles. Remove `overflow: hidden` from `.hero` to fix image clipping at bottom.
- **verify:** Build passes, hero renders without scroll indicator or badge, image not clipped
- **done:** Hero section clean

### Task 2: Process section legibility
- **files:** `src/components/Process.astro`
- **action:** The SectionHeader `.section-title` uses `color: var(--color-espresso)` which is nearly invisible on the espresso background. Add a scoped style override in Process.astro to make `.section-title` use `var(--color-cream)` when inside `.process`.
- **verify:** "From Raw Earth" text is clearly visible on dark background
- **done:** Process heading legible

### Task 3: Reservation step simplification
- **files:** `src/components/ReservationFlow.astro`
- **action:** Change step 4 title from "Collect or Deliver" to "Collect". Update description to "Pick up from our studio in Colombo".
- **verify:** Step 4 shows "Collect" only
- **done:** Reservation step simplified

### Task 4: Restyle contact buttons
- **files:** `src/styles/global.css`, `src/components/ReservationFlow.astro`, `src/components/Footer.astro`
- **action:** Replace garish gradient Instagram and bright green WhatsApp buttons with elegant, on-brand alternatives. Use subtle, muted versions: Instagram gets a warm dark style, WhatsApp gets a refined outline or muted green. Channel badges in ReservationFlow also need restyling.
- **verify:** Buttons look professional and on-brand
- **done:** Buttons restyled

### Task 5: Fix DM button alignment on mobile
- **files:** `src/components/ProductCard.astro`
- **action:** The "DM to Reserve" button positioning varies across cards because card content height differs. Use flexbox on `.product-card` to push the button to the bottom regardless of content height. Set card as flex column with `.product-card-reserve` having `margin-top: auto`.
- **verify:** DM buttons align across cards on mobile viewports
- **done:** Buttons aligned
