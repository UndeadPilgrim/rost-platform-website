# AGENTS.md

## PROJECT_STATE.md

Create `PROJECT_STATE.md` only if the user or project requires it. If present, keep it as a terse handoff snapshot: record only current baselines that materially constrain future work, explicit decisions, in-progress work, blockers, meaningful verification, and agreed next actions. Do not duplicate facts that can be cheaply rediscovered from the repository. Omit `Agreed Next Actions` unless a concrete next action is established by the user or an accepted plan. Remove resolved blockers and stale next actions. Reconcile state; link rather than duplicate authoritative sources.

## Commands

- Package manager is **bun** (only `bun.lock` exists). Use `bun run dev` (:3000), `bun run lint` (eslint over the repo), `bun run build` (static production build).
- `next.config.ts` sets `typescript.ignoreBuildErrors: true`, so `build` will NOT catch type errors. Run `bunx tsc --noEmit` when type correctness matters.
- No test framework is configured; don't invent one unless asked. Verification = lint + build + browser inspection at 1440x900 and 390x844 (see PROJECT_STATE.md).

## Structure

- Single-page marketing site for ROST PLATFORM. The entire UI is `src/app/page.tsx` (hero composition, header, ticker, footer) plus `src/app/layout.tsx` (fonts, metadata, JSON-LD, skip link, toaster).
- Pure static frontend: no API routes, no database, no `process.env` usage anywhere in `src/`.
- `src/components/ui/` is mostly unused shadcn/ui scaffolding (new-york style, config in `components.json`). Path alias `@/*` → `src/*`.

## Styling and fonts (common trap)

- Tailwind CSS v4 with CSS-first config. Brand tokens, animations, and utilities live in `src/app/globals.css` (`@theme inline`, `:root`, `rost-*` keyframes). `tailwind.config.ts` is stale v3-style config that v4 never loads (no `@config` import anywhere) — do not add tokens there.
- Canonical brand palette: ROST BLUE `#1C80BB`, ROST WHITE `#FFFFFF`, ROST BLACK `#171717`, ROST GRAY `#767676` (explicit decision recorded in PROJECT_STATE.md). Legacy aliases `rost-ink`/`rost-sand`/`rost-accent` map onto it. Amber `#007acc` is an outdated accent color, not the brand blue.
- Fonts are local `.ttf` files under `src/fonts/`, loaded via `next/font/local` in `layout.tsx`: Optima (EN, default sans stack) and Yekan Bakh (FA).

## Bilingual i18n (easy to break)

- EN/FA is a client-side `STRINGS` dictionary inside `page.tsx` (no i18n routing). Any new copy must be added in both `EN` and `FA` maps.
- The toggle flips hero and network sections to `dir="rtl"`/`lang="fa"`; header and footer stay English `dir="ltr"` by explicit decision. Stats and the city ticker are forced `dir="ltr"`.

## Conventions

- SEO/a11y baseline is deliberate: JSON-LD in `layout.tsx`, `public/og.png`, `favicon.png`, `sitemap.xml`, `robots.txt`, skip link, focus-visible rings, ARIA, semantic headings. Preserve it.
- ESLint config is intentionally permissive (most TS/React rules off), so lint passing is a weak signal — don't rely on it to catch unused vars or `any`.
