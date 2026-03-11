# Coding Conventions

**Analysis Date:** 2026-03-12

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `ProductCard.astro`, `FloatingContactButton.astro`, `MobileMenu.astro`)
- Utilities: camelCase (e.g., `instagram.ts`, `whatsapp.ts`, `format.ts`)
- Layouts: PascalCase (e.g., `BaseLayout.astro`)
- Pages: kebab-case for dynamic routes (implied), root index at `src/pages/index.astro`

**Functions:**
- camelCase for all functions and methods (e.g., `getInstagramDMLink()`, `getWhatsAppLink()`, `togglePopup()`, `formatPrice()`)
- Verb-first naming for functions that perform actions (e.g., `getReserveLink()`, `closePopup()`, `openMobileMenu()`)

**Variables:**
- camelCase for all variable and constant declarations (e.g., `navToggle`, `mobileMenu`, `isOpen`, `scrollY`)
- SCREAMING_SNAKE_CASE for module-level configuration constants (e.g., `INSTAGRAM_USERNAME = 'redcocoon'`, `WHATSAPP_NUMBER = '94777720696'`)

**Types and Interfaces:**
- PascalCase for interfaces and types (e.g., `Props` interface in components)
- Explicit `Props` interface pattern in Astro components:
  ```typescript
  interface Props {
    name: string;
    code: string;
    price: number;
  }
  ```

**CSS Class Names:**
- kebab-case for all CSS classes (e.g., `.product-card`, `.hero-scroll`, `.mobile-menu-links`, `.floating-popup-title`)
- BEM-like block-element naming for complex components (e.g., `.product-card__info`, `.hero__visual`, `.footer-cta-banner`)
- Scoped `<style>` tags per component (no CSS leakage between components)

**CSS Custom Properties:**
- kebab-case with double-dash prefix (e.g., `--color-terracotta`, `--font-serif`, `--space-lg`, `--transition-med`)
- Semantic grouping with comment headers (Colors, Typography, Spacing, Transitions, etc.)

## Code Style

**Formatting:**
- No explicit formatter configured (no `.prettierrc`, no ESLint)
- Apparent style from code:
  - 2-space indentation observed in most files
  - Single quotes for strings in TypeScript/JavaScript
  - Double quotes for JSX/HTML attributes
  - Trailing commas in objects (TypeScript/JSON)

**Linting:**
- No linter configuration detected
- Astro's TypeScript is set to `strict` mode (extends `astro/tsconfigs/strict`)
- Type checking available via `astro check` command (from CLAUDE.md)

**Comments:**
- Inline comments sparse; style observed uses `//` for single-line comments
- Large section headers in CSS use comment blocks:
  ```css
  /* ---------- CSS Custom Properties ---------- */
  /* ---------- Reset & Base ---------- */
  ```
- No JSDoc/TSDoc usage observed; functions are mostly self-documenting

## Import Organization

**Order:**
1. Astro framework imports (e.g., `import { defineCollection, z } from 'astro:content'`)
2. Relative utility imports from `../utils/` (e.g., `import { formatPrice } from '../utils/format'`)
3. Relative component imports from `../components/` (e.g., `import Navbar from '../components/Navbar.astro'`)
4. Relative layout imports from `../layouts/` (e.g., `import BaseLayout from '../layouts/BaseLayout.astro'`)
5. Global CSS imports (e.g., `import '../styles/global.css'`)

**Observed in `/src/layouts/BaseLayout.astro`:**
```typescript
import '../styles/global.css';
import Preloader from '../components/Preloader.astro';
import Navbar from '../components/Navbar.astro';
import MobileMenu from '../components/MobileMenu.astro';
import Footer from '../components/Footer.astro';
```

**Path Aliases:**
- No path aliases configured; all imports use relative paths (`../`, `./`)

## Error Handling

**Strategy:** Defensive null-checking in vanilla JavaScript event handlers

**Patterns:**
- Null coalescing with `?.` operator in DOM queries:
  ```javascript
  const container = document.getElementById('floatingContact');
  const trigger = container?.querySelector('.floating-trigger');
  ```
- Guard clauses returning early if elements not found:
  ```javascript
  function togglePopup() {
    if (!container || !trigger || !popup) return;
    // ... rest of logic
  }
  ```
- Optional element updates:
  ```javascript
  if (header) {
    header.classList.add('scrolled');
  }
  ```
- Event listener safety with `?` operator:
  ```javascript
  trigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopup();
  });
  ```

## Logging

**Framework:** No centralized logging; only `console` methods used
- Observed in global animations: none logged (silent operation)
- No error logging or debug statements in codebase
- Production behavior: silent failures for missing DOM elements

## Function Design

**Size:** Functions are concise and focused
- Utility functions: 1-3 lines (e.g., `formatPrice()`, `getInstagramDMLink()`)
- Handlers: 3-10 lines (e.g., `togglePopup()`, `onScroll()`)
- Component-level scripts: 20-50 lines total per component

**Parameters:**
- Minimal parameters; prefer default values:
  ```typescript
  export function formatPrice(amount: number, currency = 'LKR'): string
  export function getWhatsAppLink(message: string): string
  ```
- Props passed via destructuring in Astro:
  ```typescript
  const { name, code, price, currency = 'LKR', images, stock, slug } = Astro.props;
  ```

**Return Values:**
- Mostly single-purpose: functions return strings (URLs), booleans (state), or void (DOM updates)
- No nested return statements; linear control flow

## Module Design

**Exports:**
- Named exports for utilities (not default exports):
  ```typescript
  export function getInstagramDMLink(): string {}
  export function getWhatsAppLink(message: string): string {}
  ```
- Components are default exports (Astro convention):
  ```typescript
  // ProductCard.astro exports implicitly as default
  ```

**Barrel Files:**
- No barrel files (`index.ts`) used; direct imports from utility files

**Astro Component Pattern:**
- Frontmatter (code fence `---...---`) for server-side logic
- Props interface for type safety
- Destructure props from `Astro.props`
- Template section with HTML
- Scoped `<style>` section
- Client-side `<script>` section (vanilla JS only, no frameworks)

**Example from `ProductCard.astro`:**
```astro
---
import { formatPrice } from '../utils/format';

interface Props {
  name: string;
  code: string;
  price: number;
}

const { name, code, price, currency = 'LKR' } = Astro.props;
---

<article class="product-card">
  {/* template */}
</article>

<style>
  {/* scoped styles */}
</style>
```

## Event Handling

**Vanilla JavaScript Only:** No frameworks (Vue, React, Svelte)
- Event listeners attached in `<script>` tags within components
- Null-safe DOM element selection before attaching listeners
- Event delegation patterns for closing menus (click outside):
  ```javascript
  document.addEventListener('click', (e) => {
    if (container && !container.contains(e.target as Node)) {
      closePopup();
    }
  });
  ```

**Keyboard Events:**
- Escape key handling for modals/popups:
  ```javascript
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup();
    }
  });
  ```
- Focus trap for accessibility (mobile menu):
  ```javascript
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  }
  ```

## Accessibility

**ARIA Attributes:**
- All interactive components include ARIA labels and roles:
  - `aria-label` on buttons (e.g., `aria-label="Toggle menu"`)
  - `aria-expanded` for collapsible elements
  - `aria-hidden` for decorative elements
  - `role="dialog"` for modal overlays

**Semantic HTML:**
- Proper heading hierarchy (`<h1>`, `<h2>`, `<h3>`)
- `<nav>` elements with `aria-label="Main navigation"`
- `<footer>` and `<main>` landmarks used
- Skip-to-content link in base layout: `<a href="#main-content" class="skip-link">`

## Animation & Transitions

**CSS Transitions:**
- Scoped to custom properties for consistency:
  ```css
  transition: transform var(--transition-med), box-shadow var(--transition-med);
  ```
- Timing functions use design system variables:
  - `--transition-fast: 0.2s var(--ease-out)`
  - `--transition-med: 0.4s var(--ease-out)`
  - `--transition-slow: 0.6s var(--ease-out)`

**Performance:**
- RAF-throttled scroll handlers to avoid jank:
  ```javascript
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  ```
- Lazy-loaded images: `loading="lazy"`, `decoding="async"`

## Responsive Design

**Breakpoints:**
- Single main breakpoint observed: `768px` (tablet cutoff)
- Mobile-first approach with `@media (max-width: 768px)` overrides
- Desktop queries: `@media (min-width: 769px)`

**Pattern in Components:**
```css
@media (max-width: 768px) {
  .component {
    /* Mobile overrides */
  }
}
```

## Data Types & Validation

**Zod Schema Validation:**
- Content collections use Zod for runtime type safety (`src/content/config.ts`):
  ```typescript
  schema: z.object({
    name: z.string(),
    code: z.string(),
    price: z.number(),
    featured: z.boolean().default(false),
  })
  ```

**TypeScript:**
- Strict mode enabled (`tsconfig.json` extends `astro/tsconfigs/strict`)
- Explicit type annotations on function returns:
  ```typescript
  export function getInstagramDMLink(): string {}
  ```

---

*Convention analysis: 2026-03-12*
