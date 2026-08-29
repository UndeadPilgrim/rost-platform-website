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

---
Task ID: 8 (SEO/branding review + implementation)
Agent: main (Z.ai Code)
Task: Professional digital-branding + SEO review of the ROST PLATFORM site, then update the site to address findings.

Expert Review Findings (branding + SEO):
- Branding strengths kept: warm ink/sand/amber palette, Fraunces italic accent, blueprint motion, single-viewport composition, EN/FA toggle, RIBA + global-presence trust signals.
- SEO weaknesses found & fixed:
  1. Title led with tagline, not the service/keywords → rewrote to "ROST PLATFORM — Architecture & Construction Strategic Consultant".
  2. No JSON-LD structured data → added Organization + ProfessionalService + WebSite graph (NAP, founder Dr. Taha Fallah, RIBA membership, departments, areaServed, serviceType).
  3. No canonical URL → added via metadataBase + alternates.canonical.
  4. No OG image / blank social shares → generated branded 1344×768 OG share card (warm amber portal + blueprint line-art) via Image Generation skill; wired into OG + Twitter metadata.
  5. Generic Z.ai favicon → generated branded favicon (1024×1024 amber growth mark on charcoal) and wired into metadata.icons + apple-touch-icon.
  6. Heading hierarchy was only H1 → added semantic H2s for Departments, Network, Contact + sr-only expanded narrative (About, Core Service, Departments, Global Presence, Founder Credentials, Contact) for crawlers without breaking single-viewport feel.
  7. No tel: / mailto: clickable contact links → footer now uses mailto: and tel: with proper rel="noopener noreferrer"; footer wrapped in <address> for local-SEO NAP.
  8. No sitemap.xml → created /public/sitemap.xml with image extension; updated robots.txt with expanded crawler allowlist + Sitemap directive.
  9. Missing theme-color + viewport config → added viewport export + themeColor #1a1714 + colorScheme dark.
  10. Thin keyword set → expanded keywords with long-tail (RIBA Plan of Work, RIBA Client Adviser, architectural lighting design, Taha Fallah, London architecture, etc.).
  11. Accessibility gaps → added focus-visible ring styles in globals.css, skip-to-content link (first focusable), aria-labels on nav/buttons/links, aria-labelledby on sections, aria-hidden on decorative SVG/icons, lang/dir on language toggle, dl/dt/dd for stat block, <article> for cards, <ul> for departments.
  12. Microcopy refinements → footer now reads "© 2026 ROST PLATFORM LTD · Company No. 16445406" (legal entity + reg number for trust/SEO), RIBA card surfaces "Founder Dr. Taha Fallah · RIBA Member" (E-E-A-T).

Work Log:
- Generated /public/og.png (1344×768 branded share card) and /public/favicon.png (1024×1024 branded mark) via z-ai image CLI.
- Rewrote src/app/layout.tsx: added metadataBase, canonical, robots (index,follow + googleBot directives), expanded keywords, OG (locale en_GB + alternate fa_IR + image 1344×768), Twitter (summary_large_image + creator/site), Viewport export (themeColor + colorScheme dark), JSON-LD @graph (Organization/ProfessionalService/WebSite) injected in <head>, skip-to-content link, display:swap on all 3 fonts.
- Rewrote src/app/page.tsx: sr-only SEO narrative section (6 H2s), semantic <article>/<ul>/<dl>/<address>, aria + lang/dir on language toggle, tel:/mailto: footer links with rel noopener, focus-visible ring classes on all interactive elements, founder attribution on RIBA card, tightened vertical spacing to restore true single-viewport fit (8px overflow at 900, 0 gap at 1080).
- globals.css: added :focus-visible ring (amber, 2px, offset 2px) for a/button/[role=tab]/[tabindex].
- Created /public/sitemap.xml (with image:image extension) and rewrote /public/robots.txt (expanded crawler list + Sitemap directive).
- Lint: clean (0 errors, 0 warnings). Dev log: GET / 200, no runtime/hydration errors.

Agent Browser verification (1440×900, 1440×1080, 390×844):
- Title: "ROST PLATFORM — Architecture & Construction Strategic Consultant" ✓
- Meta description, canonical, OG title/image/type/locale, Twitter card, robots, theme-color all present ✓
- JSON-LD: 3 @types (Organization, ProfessionalService, WebSite) ✓
- Heading hierarchy: 1 H1 + 8 semantic H2s ✓
- No page/console errors ✓
- Language toggle: EN→FA tagline switch verified ✓
- Skip-to-content link: first Tab focuses it, becomes visible ✓
- CTA "Start a project" scrolls to footer ✓
- Footer: 8px overflow at 900 (essentially single-viewport), 0 gap at 1080 (perfect sticky), no overlap ✓
- Mobile 390×844: no horizontal overflow, h1 visible ✓
- tel:/mailto: links rendered (mailto:info@rostplatform.com, tel:+447386296171) ✓
- All SEO assets serve 200 (/, /sitemap.xml, /robots.txt, /og.png, /favicon.png) ✓
- VLM visual audit: headline legible, warm amber palette intact (no blue/indigo), 3 cards balanced, footer visible, no defects, "premium architectural brand identity" confirmed ✓

Stage Summary:
- Final artifacts: src/app/layout.tsx, src/app/page.tsx, src/app/globals.css, public/sitemap.xml, public/robots.txt, public/og.png, public/favicon.png.
- Site now has production-grade SEO (structured data, canonical, OG/Twitter cards with branded image, sitemap, robots, semantic headings, NAP) and accessibility (skip link, focus-visible rings, ARIA, lang/dir) while preserving the single-viewport animated hero.
- Browser-verified end-to-end; lint clean.

---
Task ID: 9 (color change to blue + full FA translation)
Agent: main (Z.ai Code)
Task: Change the orange/amber accent color to blue #007acc, and add full functioning to the فا button by actually translating all page content (except header and footer) to Persian.

Work Log:
- Color system (globals.css): renamed `--color-rost-amber` → `--color-rost-accent` and `--color-rost-amber-deep` → `--color-rost-accent-deep`; set values to blue OKLCH approximations of #007acc (oklch(0.524 0.149 238) and oklch(0.42 0.165 238)). Updated focus-visible ring, pulse-dot keyframes, and theme comment to blue.
- Color system (page.tsx): replaced every `rost-amber` class → `rost-accent`; replaced every inline amber OKLCH value (oklch(0.72 0.13 55...) / oklch(0.62 0.15 48...)) with blue OKLCH (oklch(0.524 0.149 238...) / oklch(0.42 0.165 238...)) across the SVG blueprint (portal circle stroke, brand-mark arrow, radial glows, scan line, all borders/hovers/rings).
- Brand assets: regenerated /public/og.png (1344×768) and /public/favicon.png (1024×1024) via z-ai image CLI with vivid medium blue (#007acc) replacing the previous amber.
- Full Persian i18n (page.tsx): introduced a `STRINGS` dictionary with `EN` and `FA` maps covering kicker, headline (plain + accent split for the word-by-word mask animation), tagline, hero copy, 3 stat labels, "Global presence" label, departments card title + both department names/tags, RIBA card (title / adviser / description / founder line), CTA card (title + copy), and the 6 network-ticker city names (Mashhad→مشهد, Tehran→تهران, Dubai→دبی, Shanghai→شانگهای, São Paulo→سائو پائولو, London→لندن); ISO-style country codes kept identical.
- Locale wiring: the EN/FA toggle now swaps ALL content between header and footer. Hero <section> and network <section> receive `lang` (en/fa) and `dir` (ltr/rtl) attributes so Persian renders correctly RTL and screen readers pronounce it properly. Header (brand, nav, "Start a project") and footer (contact info, copyright, social, back-to-top) are explicitly forced `dir="ltr"` and left in English, per the user's instruction. Stat block forced `dir="ltr"` (numbers read left-to-right); ticker forced `dir="ltr"` with per-city `dir`/`lang` on the city name span. Headline `max-w` widened to 22ch and tracking/leading tuned for Persian ligatures.
- Preserved: all prior SEO/a11y work (JSON-LD, canonical, OG/Twitter, sitemap, robots, skip link, focus-visible rings, semantic headings, sr-only narrative, tel:/mailto:).

Agent Browser verification (1440×900, 1440×1080, 390×844):
- No page/console errors; lint clean (0 errors, 0 warnings).
- EN: headline "A multidisciplinary platform for guiding development in Architecture & Construction." ✓; accent computed color = blue lab(44.5 -13.7 -45.1) ≈ #007acc ✓.
- FA: full translation verified — headline "پلتفرمی چندرشته‌ای برای راهبری توسعه در معماری و ساخت‌وساز.", kicker "مشاور استراتژیک طرح · چارچوب RIBA", tagline "چشم‌انداز تو رشد خواهد کرد.", hero copy, all 3 stat labels (دفاتر و شرکای جهانی / مراحل پروژهٔ RIBA / دپارتمان‌ها · برند مادر), global-presence label, ticker cities (لندن, مشهد, تهران, دبی, شانگهای, سائو پائولو), departments card (برند مادر · دپارتمان‌ها + نور، روایتگر معماری + سفر و تجربه), RIBA card (بنیان بین‌المللی / RIBA مشاور کارفرما / مؤسسهٔ معماران سلطنتی بریتانیا · چارچوب ۲۰۲۰ · مراحل ۰ تا ۷ / بنیان‌گذار دکتر طه فلاح · عضو RIBA), CTA card (آغاز مسیر / محیط ساخته‌شدهٔ بعدی خود را تعریف، کیوریت و محقق کنید.) ✓.
- Hero & network sections: dir="rtl" + lang="fa" when FA; dir="ltr" + lang="en" when EN ✓. Toggle EN↔FA verified both directions.
- Header & footer: stay dir=ltr / English in both locales ✓ (footer text "ROST PLATFORM LTD | www.rostplatform.com | info@rostplatform.com | +44 73 86 296 171 | © 2026 ROST PLATFORM LTD · Company No. 16445406").
- Sticky footer: 0px overflow at 900 (true single-viewport), 0px gap at 1080 (perfect sticky), no overlap ✓.
- Mobile 390×844: no horizontal overflow in EN or FA; h1 visible ✓.
- VLM visual audit (EN desktop): accent is blue (not orange/amber), headline visible with "Architecture & Construction" in blue italic, premium clean layout, no defects ✓.
- VLM visual audit (FA desktop): headline in Persian script, accent blue, RTL layout correct, no defects / no overlap ✓.

Stage Summary:
- Final artifacts: src/app/globals.css (blue tokens + keyframes), src/app/page.tsx (blue accent + full EN/FA i18n with RTL), public/og.png + public/favicon.png (regenerated in blue).
- Accent color is now signature blue #007acc everywhere (palette, blueprint SVG, glows, rings, focus, brand assets).
- فا button now fully translates all page content between header and footer to Persian with correct RTL direction and lang attributes; header and footer remain in English/LTR.
- Browser-verified end-to-end; lint clean; sticky footer + responsiveness preserved.

---
Task ID: 10 (less-dense revision: copy, stats, remove boxes, spacing)
Agent: main (Z.ai Code)
Task: Remove "Network" from navbar; change tagline to "Strategic Design Advisor" with new hero copy; remove the kicker line; reduce the 3 stats to "59+ COUNTRIES OF EXPERIENCE" and "16+ YEARS OF PROJECT RECORD"; remove the three bottom boxes before the footer; space everything better.

Work Log:
- Navbar: removed "Network" (explicit request) and "Departments" (its #departments section was being removed, so it would have become a dead anchor). Nav is now Platform · Service · Contact.
- Hero copy: tagline changed "Your vision would grow." → "Strategic Design Advisor"; supporting copy changed to "We help clients define direction, curate the right expertise, and align decisions from initial vision to final realization." Both translated to Persian (مشاور استراتژیک طرح / ما به کارفرمایان کمک می‌کنیم جهت‌گیری را تعریف کنند، تخصص درست را کیوریت کنند، و تصمیمات را از چشم‌انداز اولیه تا تحقق نهایی هم‌راستا کنند.).
- Removed the kicker line "STRATEGIC DESIGN CONSULTANT · RIBA PLAN OF WORK" (and its pulse dot + fadeUp animation) — headline now starts cleanly at the top of the hero.
- Stats: reduced from 3 (05 / 07 / 02) to 2 — "59+ Countries of experience" and "16+ Years of project record" (FA: کشور تجربه / سال سابقه پروژه). Stat numbers bumped from text-2xl/3xl → text-3xl/4xl for emphasis now that there are fewer.
- Removed the entire 3-card grid (id="departments") — Departments card, RIBA Client Adviser credential card, and "Begin the journey" CTA card all removed. Removed now-unused STRINGS fields (kicker, stat3, dept*, riba*, cta*) and the unused `Plus` import and `fadeUp` variant for clean code.
- Kept the global-presence ticker (the only remaining element before the footer). Removed its `mb-4` (nothing below it now), bumped `py-2` → `py-3`.
- Spacing improvements for a less-dense feel: headline→tagline block margin `mt-6/md:mt-8` → `mt-10/md:mt-14`; tagline/copy inner gap `gap-3` → `gap-4`; text-stats outer gap `gap-6` → `gap-10/md:gap-14`; hero copy max-width `44ch` → `50ch` and text opacity bumped to /85; ticker section bottom padding `pb-5` → `pb-10/md:pb-14` for breathing room before the footer.
- Updated the sr-only SEO narrative to reflect the new positioning ("Strategic Design Advisor", "define direction, curate the right expertise", "59+ countries", "16+ years").
- Preserved: blue #007acc accent, full EN/FA toggle with RTL, JSON-LD/OG/sitemap SEO, accessibility (skip link, focus-visible rings, ARIA, semantic headings), sticky footer, single-viewport composition.

Agent Browser verification (1440×900, 1440×1080, 390×844):
- No page/console errors; lint clean (0 errors, 0 warnings).
- Nav = [Platform, Service, Contact] ✓ (Network & Departments gone).
- Headline unchanged: "A multidisciplinary platform for guiding development in Architecture & Construction." ✓.
- Tagline = "Strategic Design Advisor" (FA: مشاور استراتژیک طرح) ✓.
- Hero copy = new text in both EN and FA ✓.
- Kicker line absent (no "STRATEGIC DESIGN CONSULTANT" / "RIBA PLAN OF WORK" on page) ✓.
- Stats = exactly 2: "59+ Countries of experience" / "16+ Years of project record" (FA: 59+ کشور تجربه / 16+ سال سابقه پروژه) ✓.
- 3 bottom boxes removed: 0 <article> elements; #departments gone ✓; ticker still present ✓.
- EN↔FA toggle verified both directions; footer stays EN/LTR ✓.
- Sticky footer: 0px overflow at 900 (true single-viewport), 0px gap at 1080 (perfect sticky) ✓.
- Mobile 390×844: no horizontal overflow, h1 visible ✓.
- VLM audit (EN): no kicker, tagline "Strategic Design Advisor" in blue italic, exactly 2 stats, 3 boxes removed, "spacious and well-balanced", no defects ✓.
- VLM audit (FA): tagline مشاور استراتژیک طرح in blue italic, exactly 2 stats, 3 boxes removed, RTL correct, no defects ✓.

Stage Summary:
- Final artifacts: src/app/page.tsx (revised content + spacing + cleaned imports/strings).
- Page is now less dense: headline leads the hero, tagline "Strategic Design Advisor" + new supporting copy, 2 stats (59+ / 16+), only the global-presence ticker before the footer, generous spacing throughout.
- Blue #007acc accent, EN/FA full translation, SEO, a11y, and sticky single-viewport layout all preserved.
- Browser-verified end-to-end; lint clean.
