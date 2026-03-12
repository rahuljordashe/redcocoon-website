---
phase: 5
slug: performance-seo
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Lighthouse CLI + Google Rich Results Test (external tools) |
| **Config file** | none — external tools |
| **Quick run command** | `bun run build` |
| **Full suite command** | `bun run build && npx lighthouse http://localhost:4321 --preset=perf --only-categories=performance --emulated-form-factor=mobile --output=json` |
| **Estimated runtime** | ~30 seconds (build) + ~60 seconds (Lighthouse) |

---

## Sampling Rate

- **After every task commit:** Run `bun run build`
- **After every plan wave:** Run `bun run build` + Lighthouse CLI on localhost preview
- **Before `/gsd:verify-work`:** Full suite must be green — Lighthouse 85+, Rich Results Test valid, OG preview renders
- **Max feedback latency:** 90 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | PERF-01 | manual | `bun run build` (no build errors) | ✅ | ⬜ pending |
| 05-01-02 | 01 | 1 | PERF-01 | manual | `npx lighthouse URL --emulated-form-factor=mobile` | N/A external | ⬜ pending |
| 05-02-01 | 02 | 1 | SEO-01 | manual | Google Rich Results Test | N/A external | ⬜ pending |
| 05-02-02 | 02 | 1 | SEO-02 | manual | OG preview tool (opengraph.dev) | N/A external | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. Validation uses external tools (Lighthouse, Google Rich Results Test, OG preview tools), not project-internal test infrastructure. The build command (`bun run build`) is the only automated check, and it already works.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Lighthouse mobile 85+ | PERF-01 | Requires Chrome/headless browser | Run `npx lighthouse URL --preset=perf --only-categories=performance --emulated-form-factor=mobile` on each page type |
| Valid LocalBusiness structured data | SEO-01 | Google Rich Results Test is a web tool | Paste site URL into https://search.google.com/test/rich-results |
| Valid Product structured data | SEO-01 | Google Rich Results Test is a web tool | Paste product page URL into https://search.google.com/test/rich-results |
| OG image renders on social share | SEO-02 | Requires social platform crawlers | Share product URL on WhatsApp/Instagram and verify preview image appears |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 90s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
