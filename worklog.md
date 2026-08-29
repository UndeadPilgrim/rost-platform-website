# ROST PLATFORM — Single Viewport Animated Homepage — Worklog

---
Task ID: 1
Agent: main (Z.ai Code)
Task: Read company profile & understand ROST PLATFORM brand; plan a single-viewport animated homepage.

Work Log:
- Read `/home/z/my-project/upload/CP-2026-007_COMPANY_PROFILE_compressed.md`.
- Extracted brand identity: ROST PLATFORM, tagline "YOUR VISION WOULD GROW".
- Main hero copy (user-requested): "A multidisciplinary platform for guiding development in Architecture & Construction."
- Key brand facts to surface: RIBA-aligned Strategic Design Consultant; global presence UK / Iran / UAE / China / Brazil; branded-house departments ROST LIGHTING & ROST TRIP; UK entity ROST PLATFORM LTD (Company No. 16445406).
- Design direction: sophisticated architectural-premium aesthetic, warm ink/stone palette with amber-terracotta accent (NO indigo/blue), Fraunces serif italic emphasis + Geist sans, animated SVG blueprint line-art background with mouse parallax, word-stagger headline reveal via Framer Motion, single 100vh viewport, sticky footer.

Stage Summary:
- Plan locked. Next: update layout.tsx (Fraunces font + ROST metadata), enhance globals.css (tokens + animations), build page.tsx hero, then verify with Agent Browser.

---
Task ID: 2-7
Agent: main (Z.ai Code)
Task: Implement layout/fonts/globals, build the animated single-viewport hero, lint, run, and self-verify with Agent Browser.

Work Log:
- Updated `src/app/layout.tsx`: added Fraunces serif font (italic + 300-700 weights), rewrote metadata (title, description, keywords, OG, Twitter) for ROST PLATFORM.
- Enhanced `src/app/globals.css`: added ROST color tokens (warm ink / sand / amber, NO blue/indigo), grain texture, breathing glow, marquee, pulse-dot, scan-line keyframes.
- Rewrote `src/app/page.tsx` as a single-viewport animated hero:
  - Animated SVG blueprint backdrop (grid, horizon lines, tower silhouettes, portal circles, dimension ticks) with pathLength draw-ins + mouse parallax via Framer Motion useMotionValue/useSpring/useTransform.
  - Header: animated ROST brand mark (square + growth arrow), nav, EN/فا language toggle (functional — switches tagline EN<->FA), "Start a project" CTA.
  - Hero: kicker (RIBA Plan of Work) with pulsing dot, word-by-word mask-rise headline using staggerChildren. Main copy rendered exactly as requested; "Architecture & Construction." styled as Fraunces italic amber accent. Tagline "Your vision would grow." + supporting copy + 3-stat block (05 / 07 / 02).
  - Bottom band: animated global-presence marquee (UK/IRAN/UAE/CHINA/BRAZIL with edge fades), 3-card grid (Branded House departments, RIBA Client Adviser credential, Begin-the-journey CTA).
  - Sticky footer: ROST PLATFORM LTD, website, email, phone, @rostplatform, Back-to-top.
- Fixed next/font error (axes requires variable weight → removed axes).
- `bun run lint` → clean, no errors. Dev log: GET / 200, no runtime/hydration errors.
- Agent Browser verification (1440x900 + 1440x1080 + 390x844):
  - Title correct; no console/page errors.
  - H1 hero copy renders exactly: "A multidisciplinary platform for guiding development in Architecture & Construction."
  - Language toggle verified: "Your vision would grow." → "چشم‌انداز تو رشد خواهد کرد.".
  - "Start a project" scrolls to footer; footer anchors to viewport bottom (gap: 0 on 1080 tall, no overlap).
  - Mobile: no horizontal overflow (body w = viewport w), h1 visible, clean vertical hierarchy.
  - VLM visual audit (desktop + mobile): headline legible, warm amber/charcoal palette (no blue/indigo), blueprint/grid/glow animated decor visible, balanced premium layout, footer visible, no defects. Verdict: "high-fidelity, professional design".

Stage Summary:
- Final artifacts: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`.
- Single-viewport animated homepage for ROST PLATFORM is live at `/` (port 3000), browser-verified and lint-clean.
- All core interactions functional; sticky footer confirmed on desktop + mobile; responsive.
