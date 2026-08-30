'use client'

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type Variants,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Globe2,
  Phone,
  Instagram,
  ArrowDown,
} from "lucide-react";

/* ----------------------------------------------------------------------------
   ROST PLATFORM — single viewport animated homepage
   Architecture & Construction · Strategic Design Advisor (RIBA-aligned)
   Canonical Brand Palette:
   - ROST BLUE:  #1C80BB (Primary Accent)
   - ROST WHITE: #FFFFFF (Primary Contrast & Foreground)
   - ROST BLACK: #171717 (Deep Background Base)
   - ROST GRAY:  #767676 (Secondary Neutral)
---------------------------------------------------------------------------- */

type Locale = "EN" | "FA";

/* ----------------------------- i18n strings -------------------------------- */

const STRINGS = {
  EN: {
    dir: "ltr",
    headlinePlain: "A multidisciplinary platform for guiding development in",
    headlineAccent: ["Architecture", "&", "Construction."],
    tagline: "Strategic Design Advisor",
    heroCopy:
      "We help clients define direction, curate the right expertise, and align decisions from initial vision to final realization.",
    stat1: "Countries of experience",
    stat2: "Years of project record",
    globalPresence: "Global presence",
    presence: [
      { city: "London", code: "UK" },
      { city: "Mashhad", code: "IRAN" },
      { city: "Tehran", code: "IRAN" },
      { city: "Dubai", code: "UAE" },
      { city: "Shanghai", code: "CHINA" },
      { city: "São Paulo", code: "BRAZIL" },
    ],
  },
  FA: {
    dir: "rtl",
    headlinePlain: "پلتفرمی چندرشته‌ای برای راهبری توسعه در",
    headlineAccent: ["معماری", "و", "ساخت‌وساز."],
    tagline: "مشاور استراتژیک طرح",
    heroCopy:
      "ما به کارفرمایان کمک می‌کنیم جهت‌گیری را تعریف کنند، تخصص درست را کیوریت کنند، و تصمیمات را از چشم‌انداز اولیه تا تحقق نهایی هم‌راستا کنند.",
    stat1: "کشور تجربه",
    stat2: "سال سابقه پروژه",
    globalPresence: "حضور جهانی",
    presence: [
      { city: "لندن", code: "UK" },
      { city: "مشهد", code: "IRAN" },
      { city: "تهران", code: "IRAN" },
      { city: "دبی", code: "UAE" },
      { city: "شانگهای", code: "CHINA" },
      { city: "سائو پائولو", code: "BRAZIL" },
    ],
  },
} as const;

const NAV = [
  { label: "About", href: "#platform" },
  { label: "Service", href: "#service" },
  { label: "Departments", href: "#network" },
  { label: "Contact", href: "#contact" },
];

/* ----------------------------- animations ---------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

const headlineWrap: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.55 },
  },
};

const wordRise: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 0.78, ease: EASE },
  },
};

/* ----------------------------- helpers ------------------------------------ */

function Word({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
      <motion.span
        variants={wordRise}
        className={
          accent
            ? "inline-block font-display italic text-rost-blue"
            : "inline-block"
        }
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ----------------------------- background ---------------------------------- */

function BlueprintBackdrop({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const tx = useTransform(mx, [-0.5, 0.5], [-18, 18]);
  const ty = useTransform(my, [-0.5, 0.5], [-14, 14]);
  const txSlow = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const tySlow = useTransform(my, [-0.5, 0.5], [-6, 6]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* black base */}
      <div className="absolute inset-0 bg-rost-black" />

      {/* blue radial glow, breathing */}
      <motion.div
        style={{ x: txSlow, y: tySlow }}
        className="absolute inset-0"
      >
        <div className="rost-breathe absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(28,128,187,0.22),transparent_65%)] blur-2xl" />
        <div className="rost-breathe-2 absolute bottom-[-20%] right-[-10%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(21,101,148,0.18),transparent_60%)] blur-2xl" />
      </motion.div>

      {/* faint architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #767676 1px, transparent 1px), linear-gradient(to bottom, #767676 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      {/* blueprint line-art */}
      <motion.svg
        style={{ x: tx, y: ty }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="rost-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#767676" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#767676" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#767676" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* horizon */}
        <motion.path
          d="M0 620 H1440"
          stroke="url(#rost-line)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
        />
        {/* mid line */}
        <motion.path
          d="M0 300 H1440"
          stroke="url(#rost-line)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.35 }}
        />

        {/* abstract structure: tower silhouette */}
        <motion.g
          stroke="rgba(118, 118, 118, 0.24)"
          strokeWidth="1"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.8 }}
        >
          <motion.path
            d="M170 620 L170 250 L210 230 L250 250 L250 620"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: EASE, delay: 0.5 }}
          />
          <motion.path
            d="M170 360 H250 M170 470 H250 M170 560 H250"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 1.1 }}
          />
        </motion.g>

        {/* second structure */}
        <motion.g
          stroke="rgba(118, 118, 118, 0.18)"
          strokeWidth="1"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1 }}
        >
          <motion.path
            d="M1180 620 L1180 330 L1220 318 L1270 330 L1270 620"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: EASE, delay: 0.7 }}
          />
          <motion.path
            d="M1180 410 H1270 M1180 500 H1270 M1180 580 H1270"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: EASE, delay: 1.3 }}
          />
        </motion.g>

        {/* large portal circle */}
        <motion.circle
          cx="720"
          cy="460"
          r="300"
          stroke="rgba(28, 128, 187, 0.22)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: EASE, delay: 0.4 }}
        />
        <motion.circle
          cx="720"
          cy="460"
          r="180"
          stroke="rgba(118, 118, 118, 0.14)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: EASE, delay: 0.9 }}
        />

        {/* dimension ticks on horizon */}
        <motion.g
          stroke="rgba(118, 118, 118, 0.35)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          {Array.from({ length: 36 }).map((_, i) => (
            <line
              key={i}
              x1={i * 40}
              y1={618}
              x2={i * 40}
              y2={i % 5 === 0 ? 605 : 613}
            />
          ))}
        </motion.g>
      </motion.svg>

      {/* vertical scan line */}
      <div className="rost-scan absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-rost-blue/40 to-transparent" />

      {/* grain */}
      <div className="rost-grain absolute inset-0 opacity-[0.05] mix-blend-soft-light" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(23,23,23,0.85)_100%)]" />
    </div>
  );
}

/* ----------------------------- brand mark ---------------------------------- */

function BrandMark() {
  return (
    <a
      href="#platform"
      className="group inline-flex items-center rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rost-black"
      aria-label="ROST PLATFORM — home"
    >
      <Image
        src="/rost-platform-logo-white.png"
        alt="ROST PLATFORM — Your Vision Would Grow"
        width={1426}
        height={205}
        priority
        className="h-7 w-auto object-contain md:h-8"
      />
    </a>
  );
}

/* ----------------------------- main page ----------------------------------- */

export default function Home() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [locale, setLocale] = useState<Locale>("EN");
  const t = STRINGS[locale];
  const rtl = t.dir === "rtl";

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const r = rootRef.current?.getBoundingClientRect();
      if (!r) return;
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  // Reflect the active content language on <main> for screen readers,
  // so assistive tech pronounces the Persian text correctly.
  const contentLang = locale === "EN" ? "en" : "fa";

  return (
    <main
      ref={rootRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-rost-black text-rost-white"
    >
      <BlueprintBackdrop mx={mx} my={my} />

      {/* ====================================================================
          SEO + a11y: screen-reader-only expanded description.
          Visible hero stays single-viewport; crawlers and assistive tech
          get the full brand narrative, services, and credentials.
          ==================================================================== */}
      <section id="platform" className="sr-only">
        <h2>About ROST PLATFORM</h2>
        <p>
          ROST PLATFORM is a multidisciplinary platform for guiding development
          in Architecture &amp; Construction. We act as a Strategic Design
          Advisor — a curator and mentor for project development — helping
          clients define direction, curate the right expertise, and align
          decisions from initial vision to final realization. Our core service
          is aligned with the RIBA Plan of Work 2020 and the international RIBA
          Client Adviser framework.
        </p>
        <h2>Core service — Strategic Design Advisor</h2>
        <p>
          For building projects, from initial vision through to post-construction,
          we operate at the strategic decision-making level to safeguard the
          project&apos;s coherence and align it with investment objectives. The
          role spans the seven RIBA Plan of Work 2020 stages: Stage 0 Strategic
          Definition, Stage 1 Preparation and Briefing, Stage 2 Concept Design,
          Stage 3 Spatial Coordination, Stage 4 Technical Design, Stage 5
          Manufacturing and Construction, Stage 6 Handover, and Stage 7 Use.
        </p>
        <h2>Departments — Branded House</h2>
        <p>
          Alongside our core consultancy, ROST PLATFORM operates as a branded
          house cultivating a dynamic value chain of specialist businesses:
          ROST LIGHTING (architectural lighting design) and ROST TRIP
          (specialist architectural travel and experience programs).
        </p>
        <h2>Global presence</h2>
        <p>
          ROST PLATFORM LTD is incorporated in the United Kingdom (Company
          Number 16445406) under the Companies Act 2006. We operate offices and
          partnerships across the United Kingdom, Iran, the United Arab
          Emirates, China, and Brazil — with experience spanning 59+ countries
          and 16+ years of project record.
        </p>
        <h2>Founder credentials</h2>
        <p>
          Founder Dr. Taha Fallah is a current Member of the Royal Institute of
          British Architects (RIBA) and holds the RIBA Certificate of Completion
          in Managing Architectural Projects. These credentials form the
          professional and academic foundation for our consultancy.
        </p>
        <h2>Contact</h2>
        <p>
          Email:{" "}
          <a href="mailto:info@rostplatform.com">info@rostplatform.com</a>. UK
          office: ROST PLATFORM LTD, Unit 13 Warham Rd, London, England. Phone:{" "}
          <a href="tel:+447386296171">+44 73 86 296 171</a>. Mashhad office:
          Unit 1, No-23, 2nd Kamal-ol-molk, Mashhad, Iran. Tehran office: Unit
          309, Queen Center, Fereshteh St, Tehran, Iran. Website:{" "}
          <a href="https://www.rostplatform.com">www.rostplatform.com</a>. Social
          media: @rostplatform.
        </p>
      </section>

      {/* ============================ Header (always EN) ============================ */}
      <header className="relative z-20 mx-auto flex w-full max-w-[1480px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <BrandMark />
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="group relative rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-rost-gray transition-colors hover:text-rost-white focus-visible:outline-none focus-visible:text-rost-white"
            >
              {n.label}
              <span className="absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 bg-rost-blue/70 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => setLocale((l) => (l === "EN" ? "FA" : "EN"))}
            className="flex items-center gap-1.5 rounded-full border border-rost-line-strong/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-rost-gray transition-colors hover:border-rost-blue/60 hover:text-rost-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rost-black"
            aria-label="Toggle language between English and Persian"
            aria-pressed={locale === "FA"}
          >
            <span className={locale === "EN" ? "text-rost-white" : ""} lang="en">
              EN
            </span>
            <span className="text-rost-gray/50">/</span>
            <span className={locale === "FA" ? "text-rost-white" : ""} lang="fa" dir="rtl">
              فا
            </span>
          </button>
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full bg-rost-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-rost-black transition-all hover:bg-rost-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rost-black sm:inline-flex"
          >
            Experience our role
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </motion.div>
      </header>

      {/* ============================ Hero (translated) ============================ */}
      <section
        id="service"
        lang={contentLang}
        dir={rtl ? "rtl" : "ltr"}
        className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-center px-5 md:px-10"
        aria-labelledby="hero-heading"
      >
        {/* headline */}
        <h1
          id="hero-heading"
          className="max-w-[22ch] text-balance font-sans text-[clamp(2rem,5.4vw,4.6rem)] font-medium leading-[1.1] tracking-[-0.01em] text-rost-white"
        >
          <motion.span
            variants={headlineWrap}
            initial="hidden"
            animate="show"
            className="inline"
          >
            {t.headlinePlain.split(" ").map((w, i) => (
              <Word key={`p-${i}`}>
                {w}&nbsp;
              </Word>
            ))}
          </motion.span>

          <motion.span
            variants={headlineWrap}
            initial="hidden"
            animate="show"
            className="inline"
            style={{ transitionDelay: "0.4s" }}
          >
            {t.headlineAccent.map((w, i) => (
              <Word key={`a-${i}`} accent>
                {w}&nbsp;
              </Word>
            ))}
          </motion.span>
        </h1>

        {/* tagline + supporting copy + stats */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9, ease: EASE }}
          className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-4">
            <p className="font-display text-xl italic text-rost-blue md:text-2xl">
              {t.tagline}
            </p>
            <p className="max-w-[50ch] text-sm leading-relaxed text-[#a3a3a3] md:text-[15px] md:leading-relaxed">
              {t.heroCopy}
            </p>
          </div>

          {/* stat block */}
          <dl className="flex items-stretch gap-10 md:gap-14" dir="ltr">
            <Stat n="59+" label={t.stat1} />
            <span className="w-px bg-rost-line-strong/50" aria-hidden />
            <Stat n="16+" label={t.stat2} />
          </dl>
        </motion.div>
      </section>

      {/* ============================ Global presence ticker (translated) ============================ */}
      <section
        id="network"
        lang={contentLang}
        dir={rtl ? "rtl" : "ltr"}
        className="relative z-10 mx-auto w-full max-w-[1480px] px-5 pb-10 md:px-10 md:pb-14"
        aria-labelledby="network-heading"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="flex items-center gap-3 border-y border-rost-line-strong/40 py-3"
        >
          <span className="hidden shrink-0 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-rost-gray md:flex">
            <Globe2 className="h-3.5 w-3.5 text-rost-blue" aria-hidden />
            <span id="network-heading" className="sr-only">{t.globalPresence}</span>
            {t.globalPresence}
          </span>
          <div className="relative flex-1 overflow-hidden" aria-hidden>
            <div className="rost-marquee flex w-max gap-8 whitespace-nowrap" dir="ltr">
              {[...t.presence, ...t.presence].map((p, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-rost-gray"
                >
                  <span
                    className="text-rost-white"
                    dir={rtl ? "rtl" : "ltr"}
                    lang={contentLang}
                  >
                    {p.city}
                  </span>
                  <span className="text-rost-blue/80">·</span>
                  <span className="text-rost-gray/80">{p.code}</span>
                  <span className="text-rost-line-strong">|</span>
                </span>
              ))}
            </div>
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-rost-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-rost-black to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ============================ Footer (always EN, sticky) ============================ */}
      <footer
        id="contact"
        className="relative z-20 mt-auto border-t border-rost-line-strong/40 bg-rost-black/80 backdrop-blur-md"
        aria-labelledby="contact-heading"
      >
        <h2 id="contact-heading" className="sr-only">
          Contact ROST PLATFORM
        </h2>
        <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:justify-between md:px-10">
          <address className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] not-italic text-rost-gray" dir="ltr">
            <span className="font-display font-medium tracking-[0.18em] text-rost-white">
              ROST PLATFORM LTD
            </span>
            <span className="hidden text-rost-line-strong md:inline" aria-hidden>|</span>
            <a
              href="https://www.rostplatform.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-rost-white focus-visible:outline-none focus-visible:text-rost-white focus-visible:underline"
            >
              <Globe2 className="h-3 w-3 text-rost-blue/80" aria-hidden />
              www.rostplatform.com
            </a>
            <span className="hidden text-rost-line-strong md:inline" aria-hidden>|</span>
            <a
              href="mailto:info@rostplatform.com"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-rost-white focus-visible:outline-none focus-visible:text-rost-white focus-visible:underline"
            >
              <Mail className="h-3 w-3 text-rost-blue/80" aria-hidden />
              info@rostplatform.com
            </a>
            <span className="hidden text-rost-line-strong md:inline" aria-hidden>|</span>
            <a
              href="tel:+447386296171"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-rost-white focus-visible:outline-none focus-visible:text-rost-white focus-visible:underline"
            >
              <Phone className="h-3 w-3 text-rost-blue/80" aria-hidden />
              +44 73 86 296 171
            </a>
          </address>
          <div className="flex items-center gap-4 text-[11px] text-rost-gray" dir="ltr">
            <span className="hidden md:inline">© 2026 ROST PLATFORM LTD · Company No. 16445406</span>
            <a
              href="https://instagram.com/rostplatform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-rost-white focus-visible:outline-none focus-visible:text-rost-white focus-visible:underline"
              aria-label="ROST PLATFORM on Instagram — @rostplatform"
            >
              <Instagram className="h-3.5 w-3.5 text-rost-blue/80" aria-hidden />
              @rostplatform
            </a>
            <a
              href="#platform"
              className="inline-flex items-center gap-1.5 rounded-full border border-rost-line-strong/50 px-3 py-1 transition-colors hover:border-rost-blue/50 hover:text-rost-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-blue/70"
            >
              Back to top
              <ArrowDown className="h-3 w-3 rotate-180" aria-hidden />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ----------------------------- small components ---------------------------- */

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex flex-col">
      <dd className="font-display text-3xl font-semibold leading-none text-rost-white md:text-4xl">
        {n}
      </dd>
      <dt className="mt-2 max-w-[16ch] text-[10px] uppercase leading-tight tracking-[0.18em] text-rost-gray">
        {label}
      </dt>
    </div>
  );
}
