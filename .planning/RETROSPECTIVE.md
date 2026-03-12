# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-12
**Phases:** 5 | **Plans:** 12 | **Tasks:** ~24

### What Was Built
- Complete pottery studio website with warm, earthy visual identity
- Browsable /shop gallery with collection filtering and 12 product detail pages
- /workshop inquiry form with Web3Forms + hCaptcha spam protection
- B2B hospitality section with service bullets and multi-channel inquiry CTAs
- Lighthouse 85+ mobile performance with LocalBusiness + Product JSON-LD structured data
- Full Astro Image WebP pipeline replacing all manual image handling

### What Worked
- **Phase dependency ordering** — fixes before redesign, redesign before pages, pages before SEO. Each phase built cleanly on the previous.
- **imageMap pattern** — solving the Astro static import constraint once (Phase 2) created a reusable pattern applied in 5 components across 3 phases.
- **Yolo mode execution** — minimized confirmation overhead while maintaining quality through SUMMARY.md tracking.
- **Rapid iteration** — 8-day timeline from initial commit to shipped milestone with 12 plans executed.
- **CSS preservation strategy** — preserving orphaned CSS classes in Phase 1 meant Phase 4 form restoration required zero CSS work.

### What Was Inefficient
- **ROADMAP.md plan checkbox drift** — Phase 3 plans showed unchecked in ROADMAP.md despite all SUMMARY files existing. Manual checkbox updates fell behind.
- **STATE.md staleness** — progress metrics, current position, and percent weren't kept in sync with actual execution. Showed 0% at milestone end.
- **Duplicate decisions in STATE.md** — several Phase 2 decisions were logged twice verbatim.

### Patterns Established
- **imageMap** (`Record<string, ImageMetadata>`) for any component needing dynamic image sources with Astro Image
- **Noise overlay pattern**: `<div class="X-noise" aria-hidden="true">` as first child of dark sections
- **Dark section text flip**: espresso bg → cream headings, clay → beige body
- **Touch target floor**: `min-height: 44px` on all interactive elements
- **Product URL clean**: `product.id.replace(/\.md$/, '')` for Astro 5 legacy content collections

### Key Lessons
1. Astro Image requires static imports — runtime string interpolation won't work. Design image loading patterns early.
2. @fontsource variable font packages register CSS family names as `"Font Name Variable"` — must match exactly in CSS custom properties.
3. `font-display: optional` (not swap) eliminates layout shift TBT from web font loading.
4. `fetchpriority="high"` on hero images eliminates majority of LCP Render Delay.
5. WhatsApp has a 300KB OG image crawler limit — choose JPEG defaults over PNGs.

### Cost Observations
- Model mix: Balanced profile (opus + sonnet agents)
- Sessions: Multiple across 8 days
- Notable: Parallel agent execution for research and planning phases significantly accelerated throughput

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Plans | Key Change |
|-----------|--------|-------|------------|
| v1.0 | 5 | 12 | First milestone — established patterns and conventions |

### Top Lessons (Verified Across Milestones)

1. (Awaiting v1.1+ data to identify cross-milestone patterns)
