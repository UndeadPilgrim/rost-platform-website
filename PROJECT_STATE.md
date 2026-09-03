# ROST PLATFORM - Project State

## Current Baseline
- **Homepage Redesign (2026-09-02): Complete.** Single-viewport hero replaced by one continuous scrolling editorial composition (the homepage as ROSTs own project document): amplified hero with axonometric backdrop, drafting-sheet sections 01 PLATFORM / 02 THE ROLE (RIBA stages 0-7 stack) / 03 DEPARTMENTS (ROST LIGHTING + ROST TRIP plates) / 04 NETWORK (monumental 59+/16+ + network index), drafting-margin index rail, title-block footer with office columns. Entire UI in src/app/page.tsx; token/util additions in globals.css.
- **Hero restructure (2026-09-03, director-approved):** bottom tagline tier (italic "Strategic Design Advisor" + border-t datum rule) removed from hero; heroCopy is now the subtitle caption directly under the headline (start-aligned, mt-6 md:mt-8; EN text-sm -> md:text-[15px] rost-gray max-w-[52ch] leading-relaxed; FA 15px -> 16.5px leading-[1.9]); headline+subtitle block vertically centered via flex-1 justify-center wrapper, scroll cue stays bottom-anchored; subtitle carries the old tier's entrance (fade + y14, delay 1.4s, 0.9s EASE) and honors the reduce invariant; t.tagline deleted from Dict and EN/FA STRINGS (role lives on as 02 roleTitle + metadata, untouched). Verified: lint + tsc pass; 1440x900 + 390x844 EN/FA renders centered without axon/text collision, zero horizontal overflow; reduced-motion mounts all hero text immediately.
- **Reduced-motion hydration fix (2026-09-03):** reduce is mount-gated via useHasMounted() (useSyncExternalStore, getServerSnapshot=false) so the first client render matches SSR exactly; reduce flips on the following commit. Verified: 0 console errors under emulated reduce (previously a React hydration mismatch error), content reachable in EN+FA under reduce, normal-motion choreography unchanged, zero horizontal overflow.
- **Metadata:** layout.tsx titles/meta-description/JSON-LD/OG aligned to Strategic Design Advisor (12 replacements; generic keyword construction consultant intentionally kept).

## Explicit Decisions
- **Role naming: Strategic Design Advisor** (user-confirmed 2026-09-02). Never Consultant for the role title.
- **Brand Palette:** ROST BLUE #1C80BB, ROST WHITE #FFFFFF, ROST BLACK #171717, ROST GRAY #767676 (tokens in globals.css). Small drafting annotations use --color-rost-annotation (55% white mix, AA-compliant) - no new hues.
- **Typography:** Optima (EN) + Yekan Bakh (FA) via next/font/local. FA display uses Yekan 900; FA elegant accents use Light. optima-italic.ttf was corrupt (OTS overlapping tables + invalid cmap language) and was repaired in place via fontTools (glyph-identical, verified); backup outside repo at C:/Users/EmPeeJay/AppData/Local/Temp/kilo/optima-italic-backup.ttf.
- **Bilingual i18n:** EN/FA toggle flips hero + all translated sections (dir=rtl on wrapper); header and footer fixed EN dir=ltr; stats/numerals/stage indices forced LTR (FA digits 59+/16+ in Persian digits; RIBA stage numerals stay Latin).
- **CTA:** EXPERIENCE OUR ROLE anchors to #role; hidden on mobile by design (approved baseline behavior) - no in-body equivalent.
- **Motion invariant (QA blocker guard):** never conditionally drop framer-motion props on useReducedMotion(). reveal() keeps an identical prop shape in both modes with whileInView ALWAYS present; reduce removes motion only via duration: 0 and mounts visible. Applied to all motion paths (Word variants, light line, scroll cue, header fades). Reduce is mount-gated via useHasMounted() so SSR/hydration markup always match; see fix note in Current Baseline.
- **Architecture:** Pure static Next.js frontend; no API routes, DB, or env usage.

## In-Progress Work & Blockers
- **Blockers:** None.

## Meaningful Verification (2026-09-02; re-run 2026-09-03)
- 2026-09-03 re-run before commit: lint + tsc + build pass; browser reduce-mode audit: 0 console errors (hydration mismatch eliminated), sections reveal on scroll-into-view under reduce in EN+FA, zero horizontal overflow at 1440x900.
- bun run lint, bunx tsc --noEmit, bun run build: all pass.
- Browser matrix 1440x900 / 1024x768 / 390x844 x EN/FA: zero horizontal overflow, zero text collisions, RTL mirroring correct, hero word gaps exact (18.91px EN / 8.06px FA), interactions pass (toggle round-trip, anchors, focus rings), console clean (font + OTS warnings eliminated).
- Reduced-motion full-scroll audit: every content element reaches opacity 1; normal-motion choreography unchanged.
- Outstanding: production deploy test not performed; og.png predates the redesign (visually reflects the old hero).
