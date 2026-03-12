---
phase: 3
slug: gallery-products
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Astro static site, build-based smoke tests |
| **Config file** | None — no test runner configured |
| **Quick run command** | `bun run build` |
| **Full suite command** | `bunx astro check && bun run build` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `bun run build`
- **After every plan wave:** Run `bunx astro check && bun run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | GAL-04 | smoke | `bun run build` (check madeToOrder in schema) | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | GAL-01 | smoke | `bun run build` (check dist/shop/index.html exists) | ❌ W0 | ⬜ pending |
| 03-02-02 | 02 | 1 | GAL-02 | smoke | `bun run build` (check data-collection attrs in HTML) | ❌ W0 | ⬜ pending |
| 03-02-03 | 02 | 1 | GAL-03 | smoke | `bun run build` (check stock badge markup) | ❌ W0 | ⬜ pending |
| 03-02-04 | 02 | 1 | GAL-08 | smoke | `bun run build` (check piece code badge) | ✅ | ⬜ pending |
| 03-03-01 | 03 | 2 | GAL-05 | smoke | `bun run build` (check dist/shop/ for 12 HTML files) | ❌ W0 | ⬜ pending |
| 03-03-02 | 03 | 2 | GAL-06 | smoke | `bun run build` (check .product-lightbox-trigger) | ❌ W0 | ⬜ pending |
| 03-03-03 | 03 | 2 | GAL-07 | smoke | `bun run build` (check /_astro/*.webp in dist) | ❌ W0 | ⬜ pending |
| 03-03-04 | 03 | 2 | GAL-04 | smoke | `bun run build` (check commission-cta in MTO product) | ❌ W0 | ⬜ pending |
| 03-04-01 | 04 | 2 | ABOUT-01 | smoke | `bun run build` (check .about-maker section) | ❌ W0 | ⬜ pending |
| 03-04-02 | 04 | 2 | INTL-01 | smoke | `bun run build` (grep "buyer's risk" in dist/shop) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Ensure `bun run build` passes cleanly before adding new pages (baseline)
- [ ] No test runner to install — all validation is build-based smoke tests via HTML output inspection

*Existing infrastructure (Astro build + type check) covers all phase requirements at the smoke test level.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| GLightbox opens/closes on product detail page | GAL-06 | Requires browser JS execution | Navigate to /shop/[slug], click image, verify lightbox opens |
| Filter pills animate with 300ms fade | GAL-02 | CSS/JS transition not testable at build time | Click filter pill, observe fade transition |
| Commission CTA opens correct DM thread | GAL-04 | External service interaction | Click commission CTA on sold-out MTO product, verify DM link |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
