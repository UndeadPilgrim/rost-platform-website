# ROST PLATFORM — Project State

## Current Baseline
- **Approved State:** The single-viewport homepage foreground, copy, navigation, typography, statistics, trust ticker, language behavior, and brand colors remain the approved baseline ([`src/app/page.tsx`](file:///e:/Projects/Rost_Platform_Website/src/app/page.tsx)).
- **Current Candidate:** The hero background is now one responsive exploded architectural axonometric. Implementation is complete; Director visual acceptance is not yet recorded.
- **Original Import Tag:** `glm-original-baseline` pinned at `41b2fd8`.

## Explicit Decisions
- **Brand Palette:** Canonical tokens defined in [`src/app/globals.css`](file:///e:/Projects/Rost_Platform_Website/src/app/globals.css): ROST BLUE (`#1C80BB`), ROST WHITE (`#FFFFFF`), ROST BLACK (`#171717`), ROST GRAY (`#767676`).
- **Typography:** Official brand typography bundled via `next/font/local`: English uses **Optima** (`--font-optima`: Regular, Italic, Medium, Bold) and Persian uses **Yekan Bakh** (`--font-yekan-bakh`: Hairline through Fat).
- **Viewport Layout:** Single-viewport composition fitted to 100vh on standard desktop viewports; sticky footer.
- **Bilingual i18n:** EN/FA toggle flips hero and trust/credibility ticker to Persian (`dir="rtl"`); header and footer are intentionally fixed in English (`dir="ltr"`).
- **Navigation & CTA:** Nav links map to `#platform` (About), `#service` (Service), `#network` (Departments / Ticker), `#contact` (Footer). Header CTA is `EXPERIENCE OUR ROLE`.
- **Architecture:** Pure static Next.js frontend; no database or container harness dependencies.

## In-Progress Work & Blockers
- **In-Progress:** Homepage hero-background candidate awaiting Director review.
- **Blockers:** None.

## Meaningful Verification
- `bun run lint` passes (0 errors, 0 warnings).
- `bun run build` passes with all static routes prerendered.
- Impeccable detector returns no findings for the changed UI files.
- Browser inspection verified English and Persian at desktop and mobile widths; the final console was clean.
