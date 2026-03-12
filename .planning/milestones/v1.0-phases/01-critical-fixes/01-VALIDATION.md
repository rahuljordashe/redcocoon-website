---
phase: 1
slug: critical-fixes
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None installed — no test runner in project |
| **Config file** | None — see Wave 0 gaps |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npx astro check && npm run build` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npx astro check && npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | FIX-01 | manual-only | `npm run build` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | FIX-02 | manual-only | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements.*

No test framework is installed; this phase does not require one. Link-correctness tests for a static site are inherently manual (click-and-check). The build command serves as the automated gate.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| No `#contact-form` href in any component | FIX-01 | Link-correctness on static HTML output; no test runner | 1. `npm run build` 2. Open dev server 3. Click reservation channels — confirm no "Form" option 4. Open floating contact — confirm no "Reservation Form" 5. Check footer — confirm no "Reservation Form" button |
| Hospitality CTA links to WhatsApp (no `/hospitality` route) | FIX-02 | Link-correctness on static HTML output; no test runner | 1. `npm run build` 2. Open dev server 3. Navigate to Hospitality section 4. Click "Discuss a Project" — confirm WhatsApp opens with B2B message 5. Confirm no "View Portfolio" button exists |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
