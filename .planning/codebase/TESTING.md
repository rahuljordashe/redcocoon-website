# Testing Patterns

**Analysis Date:** 2026-03-12

## Test Framework

**Status:** Not implemented

**Runner:**
- No test runner installed (no Jest, Vitest, Mocha, etc. in dependencies)
- `package.json` contains only: `@astrojs/check`, `@astrojs/vercel`, `astro`, `typescript`

**Type Checking:**
- `astro check` command available (not a test runner, but catches TS errors)
- Run via: `npx astro check`
- Configured in: `tsconfig.json` extends `astro/tsconfigs/strict`

**Run Commands:**
```bash
npm run dev              # Start dev server (no tests run)
npm run build            # Production build (no tests run)
npx astro check         # TypeScript type checking
```

## Test File Organization

**Location:**
- No test files exist in codebase
- No `__tests__`, `tests/`, `.test.`, or `.spec.` files found in `src/`

**Naming Convention:**
- Undefined (no test files to pattern from)

**Structure:**
- N/A

## Test Coverage

**Requirements:**
- No coverage requirements or tooling configured
- No GitHub Actions CI/CD configured for test automation

**View Coverage:**
- No coverage reporting available

## Testing Strategy

**Current State:** Zero automated testing

**Manually Testable Areas:**
- Type errors caught via `astro check` (TypeScript strict mode)
- Component rendering: locally via `npm run dev` with browser dev tools
- Accessibility: manual testing with keyboard/screen readers
- Responsive design: manual testing at breakpoints

## Key Testable Modules (If Tests Were to Be Added)

**Utility Functions** (`src/utils/`):
- `format.ts`: `formatPrice()` function
  - Would test number formatting with different locales
  - Test currency display
  - Edge cases: 0, negative, very large numbers

- `instagram.ts`: `getInstagramDMLink()`, `getInstagramProfileLink()`
  - Would test URL generation with hardcoded username
  - Test protocol handling (`https://`, `ig.me/`, etc.)

- `whatsapp.ts`: `getWhatsAppLink()`, `getReserveLink()`, `getQuoteLink()`
  - Would test URL encoding of messages
  - Test template message formatting
  - Test product name and price interpolation

**Content Schema** (`src/content/config.ts`):
- Zod validation logic is self-documenting and runtime-checked
- Would validate collection schema: required fields (`name`, `code`, `price`), defaults (`currency = 'LKR'`), enums (`category`)
- Would test markdown frontmatter parsing against schema

## Vanilla JavaScript Testing Considerations

**If Tests Were Implemented**, DOM interaction testing would be critical:

**FloatingContactButton.astro:**
```javascript
// Pseudo test structure (not actual code):
// - Setup: mount component, query DOM elements
// - Test: click trigger → popup opens → aria-expanded = "true"
// - Test: click outside → popup closes
// - Test: Escape key → popup closes
// - Test: null-safety: missing elements don't crash
```

**MobileMenu.astro:**
```javascript
// Pseudo test structure:
// - Setup: mount component, query navToggle, mobileMenu
// - Test: click toggle → menu opens → aria-modal = "true"
// - Test: click menu link → menu closes, focus returns to button
// - Test: Escape key closes menu
// - Test: focus trap prevents tabbing outside modal
// - Test: overflow: hidden applied to body when open
```

**BaseLayout.astro (Scroll Handlers):**
```javascript
// Pseudo test structure:
// - Test: scroll past 60px → header.classList.add('scrolled')
// - Test: scroll past 600px → backToTop visible
// - Test: RAF throttling prevents excessive reflows
// - Test: reduced-motion preference disables parallax
// - Test: smooth scroll to anchor links with header offset
```

## What Is Currently Type-Checked

**TypeScript Strict Mode** catches:
- Unused variables
- Undefined properties
- Null/undefined type mismatches
- Type inference errors

**Example from `FloatingContactButton.astro`:**
```typescript
// Type safe: elements typed as HTMLElement | null
const container = document.getElementById('floatingContact');
const trigger = container?.querySelector('.floating-trigger');

// TS error if you tried to call .addEventListener without null check
if (!container || !trigger || !popup) return;
trigger.addEventListener('click', (e) => { /* ... */ });
```

**Content Validation** via Zod:
- All product markdown files validated at build time
- Schema enforces shape and types
- Mismatched frontmatter fails build

## Known Testing Gaps

**Critical Untested Functionality:**

1. **Event Handlers:**
   - Floating contact button toggle behavior
   - Mobile menu open/close/focus-trap
   - Scroll-based header styling and parallax
   - Anchor link smooth scrolling with header offset
   - Click-outside detection for popups

2. **URL Generation:**
   - WhatsApp/Instagram links properly encoded
   - Product names correctly interpolated into messages
   - Currency symbols displayed correctly for different locales

3. **Responsive Behavior:**
   - Media query breakpoints (768px) trigger correct CSS
   - Mobile FAB hidden on desktop (min-width: 769px)
   - Bottom tab bar layout correct on mobile
   - Hamburger menu only visible on mobile

4. **Accessibility:**
   - ARIA attributes correctly updated on state changes
   - Keyboard navigation works (focus management, Escape key)
   - Skip link functional
   - Semantic HTML structure correct

5. **Performance:**
   - RAF throttling prevents excessive scroll handler calls
   - Images lazy-load correctly
   - CSS transitions don't cause layout thrashing

6. **Animations:**
   - Intersection observer fade-in animations trigger at correct scroll positions
   - Staggered transition delays apply correctly
   - Reduced-motion preference respected

## Recommendation for Future Testing

**Suggested Test Stack:**
- **Unit Tests:** Vitest (Vite-native, works with Astro)
  - Test utility functions (`format.ts`, `instagram.ts`, `whatsapp.ts`)
  - Test Zod schema validation

- **Component Tests:** Vitest + Astro testing library
  - Test Astro component rendering
  - Test event handlers and DOM interactions

- **E2E Tests:** Playwright or Cypress
  - Test complete user flows (reserve product via Instagram DM)
  - Test responsive layouts
  - Test keyboard navigation and accessibility

**Priority Areas (if implementing tests first):**
1. Utility functions (easiest to test, most isolated)
2. Content schema validation (catches build errors early)
3. Event handlers in FloatingContactButton and MobileMenu (high user interaction)
4. Responsive breakpoints and layout changes

---

*Testing analysis: 2026-03-12*
