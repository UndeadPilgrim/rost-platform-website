# ROST PLATFORM — Project State

## Baseline & Overview
- **Product:** Official website for **ROST PLATFORM** ([ROST PLATFORM LTD](file:///e:/Projects/Rost_Platform_Website/src/app/layout.tsx), UK Company No. 16445406).
- **Core Role & Positioning:** Strategic Design Advisor in Architecture & Construction, aligned with the [RIBA Plan of Work 2020](file:///e:/Projects/Rost_Platform_Website/REFERENCES/context/company_portfolios/CP-2026-006_STRATEGIC_DESIGN_ADVISOR_compressed.md) and international RIBA Client Adviser framework.
- **Current UI Experience:** High-fidelity single-viewport animated homepage (`min-h-screen`, `overflow-hidden`) with mouse parallax, blueprint line-art SVG animations, live bilingual EN / FA translation toggle with RTL support, and sticky footer.

## Architecture & Technology Stack
- **Framework:** Next.js 16.1.1 (App Router) / React 19 / TypeScript 5 ([`package.json`](file:///e:/Projects/Rost_Platform_Website/package.json), [`next.config.ts`](file:///e:/Projects/Rost_Platform_Website/next.config.ts))
- **Styling:** Tailwind CSS v4 ([`globals.css`](file:///e:/Projects/Rost_Platform_Website/src/app/globals.css)), `tw-animate-css`, Radix UI primitives ([`src/components/ui/`](file:///e:/Projects/Rost_Platform_Website/src/components/ui))
- **Animation:** Framer Motion 12.23.2 ([`src/app/page.tsx`](file:///e:/Projects/Rost_Platform_Website/src/app/page.tsx))
- **Typography:** Geist Sans (`--font-geist-sans`), Geist Mono (`--font-geist-mono`), and Fraunces serif (`--font-fraunces` italic display emphasis) via `next/font/google`
- **Data & Services:** Pure static Next.js application without database overhead; GLM/Z.ai container residue, Prisma scaffolding, and unused templates removed.

## Explicit Decisions & Implementation Rules
1. **Visual & Color Tokens:**
   - Base: Ink charcoal (`--color-rost-ink`, `oklch(0.165 0.012 65)` / `#1a1714`)
   - Text & Neutrals: Warm sand (`--color-rost-sand`, `oklch(0.92 0.018 80)`)
   - Signature Accent: Architectural blue `#007acc` (`--color-rost-accent`, `oklch(0.524 0.149 238)`), used for SVG blueprint details, hero display italic highlights, buttons, and focus rings.
   - Textures: Subtle SVG turbulence grain (`.rost-grain`), breathing radial glow (`.rost-breathe`), scan line (`.rost-scan`).
2. **Layout & Spacing:**
   - Single-viewport fit (zero gap / zero unexpected overflow on standard desktop viewports).
   - Headline leads the hero without separate kicker line.
   - Hero copy: Tagline *"Strategic Design Advisor"* + 2 core stats (*59+ Countries of experience*, *16+ Years of project record*).
   - Global presence ticker (`#network`) with edge gradients and infinite marquee across London, Mashhad, Tehran, Dubai, Shanghai, São Paulo.
   - Lower 3-card department grid intentionally omitted for spacious, focused composition (Task 10).
3. **Navigation & CTA:**
   - Nav items: `About` (`#platform`), `Service` (`#service`), `Departments` (`#network`), `Contact` (`#contact`).
   - CTA button: `EXPERIENCE OUR ROLE` (linking to `#contact`).
4. **Internationalization (i18n):**
   - Toggle button: `EN` / `فا`.
   - Content switching: Hero and presence sections dynamically switch strings and flip reading direction (`dir="rtl"`, `lang="fa"`) for Persian.
   - Header and sticky footer are deliberately locked to English and LTR in both modes.
5. **SEO, E-E-A-T & Accessibility:**
   - JSON-LD `@graph` (`Organization`, `ProfessionalService`, `WebSite`) surfacing NAP, founder Dr. Taha Fallah's RIBA membership, and legal entity data ([`layout.tsx`](file:///e:/Projects/Rost_Platform_Website/src/app/layout.tsx)).
   - Branded OpenGraph (`/public/og.png`) and Favicon (`/public/favicon.png`).
   - Hidden semantic `sr-only` section (`#platform`) delivering deep indexable narrative for crawlers and assistive technologies.
   - Accessible skip link and `:focus-visible` ring styling.

## Verification & Baseline Health
- **Source of Truth Files:**
  - Page implementation: [`src/app/page.tsx`](file:///e:/Projects/Rost_Platform_Website/src/app/page.tsx)
  - Layout & SEO graph: [`src/app/layout.tsx`](file:///e:/Projects/Rost_Platform_Website/src/app/layout.tsx)
  - Color tokens & animations: [`src/app/globals.css`](file:///e:/Projects/Rost_Platform_Website/src/app/globals.css)
  - History & previous task logs: [`worklog.md`](file:///e:/Projects/Rost_Platform_Website/worklog.md)
  - Reference portfolio decks: [`REFERENCES/context/company_portfolios/`](file:///e:/Projects/Rost_Platform_Website/REFERENCES/context/company_portfolios)
- **Status:** Baseline approved; container/scaffold residue purged; `bun run lint` and `bun run build` verified 100% clean; visual rendering in EN and FA verified identical to baseline.

## Agreed Next Actions
- Maintain current implementation as the approved working baseline.
- Await specific user direction for subsequent feature work, multi-page additions, or content enhancements.
