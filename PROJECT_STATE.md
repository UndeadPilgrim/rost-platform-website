# ROST PLATFORM — Project State

## Current Baseline
- **Approved State:** Single-viewport animated homepage for ROST PLATFORM ([`src/app/page.tsx`](file:///e:/Projects/Rost_Platform_Website/src/app/page.tsx)), clean of container/scaffold residue, building with Bun/Turbopack.
- **Original Import Tag:** `glm-original-baseline` pinned at `41b2fd8`.

## Explicit Decisions
- **Brand Palette:** Canonical tokens defined in [`src/app/globals.css`](file:///e:/Projects/Rost_Platform_Website/src/app/globals.css): ROST BLUE (`#1C80BB`), ROST WHITE (`#FFFFFF`), ROST BLACK (`#171717`), ROST GRAY (`#767676`).
- **Viewport Layout:** Single-viewport composition fitted to 100vh on standard desktop viewports; sticky footer.
- **Bilingual i18n:** EN/FA toggle flips hero and global presence ticker to Persian (`dir="rtl"`); header and footer are intentionally fixed in English (`dir="ltr"`).
- **Navigation & CTA:** Nav links map to `#platform` (About), `#service` (Service), `#network` (Departments / Ticker), `#contact` (Footer). Header CTA is `EXPERIENCE OUR ROLE`.
- **Architecture:** Pure static Next.js frontend; no database or container harness dependencies.

## In-Progress Work & Blockers
- **In-Progress:** None.
- **Blockers:** None.

## Meaningful Verification
- `bun run lint` passes (0 errors, 0 warnings).
- `bun run build` passes with all static routes prerendered.
- Visual inspection verified in browser devtools for both EN and FA modes.

## Agreed Next Actions
- Maintain current implementation as approved baseline.
- Await user instructions for subsequent feature work or multi-page expansion.
