---
phase: 4
slug: workshop-hospitality
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None (Astro static site — build-time validation) |
| **Config file** | `astro.config.mjs` |
| **Quick run command** | `bun run build` |
| **Full suite command** | `npx astro check` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `bun run build`
- **After every plan wave:** Run `npx astro check`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | WKSP-01 | smoke | `bun run build` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | WKSP-02 | smoke | `bun run build` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 1 | WKSP-03 | manual | Browser devtools | n/a | ⬜ pending |
| 04-01-04 | 01 | 1 | WKSP-04 | manual | Browser test | n/a | ⬜ pending |
| 04-02-01 | 02 | 1 | HOSP-01 | smoke | `bun run build` | ❌ W0 | ⬜ pending |
| 04-02-02 | 02 | 1 | HOSP-02 | smoke | `bun run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework to install — this project uses build-time validation (`bun run build` + `npx astro check`) rather than a test runner.

- [ ] Web3Forms Access Key — obtain from web3forms.com (manual setup step, not a file gap)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| hCaptcha widget renders in browser | WKSP-03 | Requires browser JS execution; build can't verify DOM injection | Open `/workshop`, confirm `.h-captcha` div shows challenge widget |
| Success panel appears after form submit | WKSP-04 | Requires real fetch to Web3Forms API + DOM state toggle | Submit form with valid data, verify fields fade + success message appears |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
