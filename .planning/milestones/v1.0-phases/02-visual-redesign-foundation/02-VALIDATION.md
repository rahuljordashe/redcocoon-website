---
phase: 2
slug: visual-redesign-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — static Astro site, visual/build verification |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npx astro check` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npx astro check`
- **Before `/gsd:verify-work`:** Full suite must be green + manual browser verification
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | VIS-01 | manual + build | `npm run build` | N/A | ⬜ pending |
| 02-01-02 | 01 | 1 | VIS-02 | manual (grep audit) | `npm run build` | N/A | ⬜ pending |
| 02-01-03 | 01 | 1 | VIS-03 | manual (DevTools) | `npm run build` | N/A | ⬜ pending |
| 02-01-04 | 01 | 1 | VIS-04 | manual | `npm run build` | N/A | ⬜ pending |
| 02-01-05 | 01 | 1 | VIS-05 | manual | `npm run build` | N/A | ⬜ pending |
| 02-02-01 | 02 | 1 | VIS-06 | manual (Network tab) | `npm run build` | N/A | ⬜ pending |
| 02-02-02 | 02 | 1 | VIS-07 | manual (Lighthouse) | `npm run build` | N/A | ⬜ pending |
| 02-03-01 | 03 | 2 | VIS-01 | build | `npm run build` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test files needed — this phase uses build-time verification (Astro check) + manual browser inspection.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Warm visual identity across all sections | VIS-01 | Subjective visual assessment | Open each section in browser, verify cohesive terracotta/cream/espresso/sage palette |
| No hardcoded hex values in component styles | VIS-02 | Code audit, not runtime | `grep -rn '#[0-9a-fA-F]' src/components/` — should return zero matches outside comments |
| All CTAs >= 44px touch targets | VIS-03 | Requires DevTools measurement | Inspect each CTA in mobile viewport, verify computed height >= 44px |
| Typography hierarchy visible | VIS-04 | Subjective visual assessment | Verify headings (DM Serif Display), accents (Cormorant Garamond), body (Inter) are distinct |
| Texture on dark sections | VIS-05 | Visual check | Verify Hero/Hospitality/Footer have noise/gradient texture, not flat color |
| No Google Fonts CDN requests | VIS-06 | Network tab check | Open Network tab, reload, filter "fonts.googleapis" — should be zero requests |
| font-display:swap, no FOIT | VIS-07 | Lighthouse / visual check | Run Lighthouse, check "Ensure text remains visible during webfont load" passes |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
