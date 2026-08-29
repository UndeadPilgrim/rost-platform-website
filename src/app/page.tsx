'use client'

import { useEffect, useRef, useState } from "react";
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
  Plus,
  Mail,
  Globe2,
  Phone,
  Instagram,
  ArrowDown,
} from "lucide-react";

/* ----------------------------------------------------------------------------
   ROST PLATFORM — single viewport animated homepage
   Architecture & Construction · Strategic Design Consultant (RIBA-aligned)
---------------------------------------------------------------------------- */

const HEADLINE_PLAIN = "A multidisciplinary platform for guiding development in";
const HEADLINE_ACCENT = ["Architecture", "&", "Construction."];

const PRESENCE = [
  { city: "London", code: "UK", role: "HQ · ROST PLATFORM LTD", lat: "51°N" },
  { city: "Mashhad", code: "IRAN", role: "Headquarter", lat: "36°N" },
  { city: "Tehran", code: "IRAN", role: "Office", lat: "35°N" },
  { city: "Dubai", code: "UAE", role: "Office", lat: "25°N" },
  { city: "Shanghai", code: "CHINA", role: "Partner", lat: "31°N" },
  { city: "São Paulo", code: "BRAZIL", role: "Partner", lat: "23°S" },
];

const DEPARTMENTS = [
  {
    name: "ROST LIGHTING",
    tag: "Light, the narrative of architecture",
  },
  {
    name: "ROST TRIP",
    tag: "Travel & experience",
  },
];

const NAV = [
  { label: "Platform", href: "#platform" },
  { label: "Service", href: "#service" },
  { label: "Departments", href: "#departments" },
  { label: "Network", href: "#network" },
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
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
            ? "inline-block font-display italic text-rost-amber"
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
      {/* warm ink base */}
      <div className="absolute inset-0 bg-rost-ink" />

      {/* radial amber glow, breathing */}
      <motion.div
        style={{ x: txSlow, y: tySlow }}
        className="absolute inset-0"
      >
        <div className="rost-breathe absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.13_55/0.22),transparent_65%)] blur-2xl" />
        <div className="rost-breathe-2 absolute bottom-[-20%] right-[-10%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,oklch(0.62_0.15_48/0.18),transparent_60%)] blur-2xl" />
      </motion.div>

      {/* faint architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.92 0.018 80) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.92 0.018 80) 1px, transparent 1px)",
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
            <stop offset="0%" stopColor="oklch(0.78 0.02 80)" stopOpacity="0.02" />
            <stop offset="50%" stopColor="oklch(0.78 0.02 80)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="oklch(0.78 0.02 80)" stopOpacity="0.02" />
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
          stroke="oklch(0.78 0.02 80 / 0.22)"
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
          stroke="oklch(0.78 0.02 80 / 0.16)"
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
          stroke="oklch(0.72 0.13 55 / 0.16)"
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
          stroke="oklch(0.78 0.02 80 / 0.1)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: EASE, delay: 0.9 }}
        />

        {/* dimension ticks on horizon */}
        <motion.g
          stroke="oklch(0.78 0.02 80 / 0.32)"
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
      <div className="rost-scan absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-rost-amber/40 to-transparent" />

      {/* grain */}
      <div className="rost-grain absolute inset-0 opacity-[0.05] mix-blend-soft-light" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,oklch(0.12_0.012_65/0.85)_100%)]" />
    </div>
  );
}

/* ----------------------------- brand mark ---------------------------------- */

function BrandMark() {
  return (
    <a
      href="#platform"
      className="group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-amber/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rost-ink"
      aria-label="ROST PLATFORM — home"
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center" aria-hidden>
        <svg viewBox="0 0 36 36" className="h-9 w-9" role="img" aria-label="ROST PLATFORM logo">
          <rect
            x="2.5"
            y="2.5"
            width="31"
            height="31"
            rx="2"
            stroke="oklch(0.92 0.018 80)"
            strokeWidth="1.2"
            fill="none"
            className="origin-center transition-transform duration-500 group-hover:rotate-90"
            style={{ transformBox: "fill-box" }}
          />
          {/* upward growth arrow / structure */}
          <motion.path
            d="M10 26 L18 10 L26 26"
            stroke="oklch(0.72 0.13 55)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
          />
          <motion.path
            d="M14 22 H22"
            stroke="oklch(0.72 0.13 55)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.4 }}
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold tracking-[0.22em] text-rost-sand">
          ROST
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-rost-sand-dim/70">
          Platform
        </span>
      </span>
    </a>
  );
}

/* ----------------------------- main page ----------------------------------- */

export default function Home() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [locale, setLocale] = useState<"EN" | "FA">("EN");

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

  const tagline =
    locale === "EN" ? "Your vision would grow." : "چشم‌انداز تو رشد خواهد کرد.";

  return (
    <main
      ref={rootRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-rost-ink text-rost-sand"
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
          in Architecture &amp; Construction. We act as a curator and mentor for
          project development — helping clients define and steer the path from
          first vision to final realization. Our core service is the role of
          Strategic Design Consultant, aligned with the RIBA Plan of Work 2020
          and the international RIBA Client Adviser framework.
        </p>
        <h2>Core service — Strategic Design Consultant</h2>
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
          Emirates, China, and Brazil.
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

      {/* ============================ Header ============================ */}
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
              className="group relative rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-rost-sand-dim transition-colors hover:text-rost-sand focus-visible:outline-none focus-visible:text-rost-sand"
            >
              {n.label}
              <span className="absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 bg-rost-amber/60 transition-transform duration-300 group-hover:scale-x-100" />
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
            className="flex items-center gap-1.5 rounded-full border border-rost-line-strong/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-rost-sand-dim transition-colors hover:border-rost-amber/60 hover:text-rost-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-amber/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rost-ink"
            aria-label="Toggle language between English and Persian"
            aria-pressed={locale === "FA"}
          >
            <span className={locale === "EN" ? "text-rost-sand" : ""} lang="en">
              EN
            </span>
            <span className="text-rost-sand-dim/40">/</span>
            <span className={locale === "FA" ? "text-rost-sand" : ""} lang="fa" dir="rtl">
              فا
            </span>
          </button>
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full bg-rost-sand px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-rost-ink transition-all hover:bg-rost-amber hover:text-rost-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-amber/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rost-ink sm:inline-flex"
          >
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </motion.div>
      </header>

      {/* ============================ Hero ============================ */}
      <section
        className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-center px-5 md:px-10"
        aria-labelledby="hero-heading"
      >
        {/* kicker */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
          className="mb-5 flex items-center gap-3 md:mb-6"
        >
          <span className="relative inline-flex h-2 w-2" aria-hidden>
            <span className="rost-pulse-dot absolute inline-flex h-2 w-2 rounded-full bg-rost-amber" />
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.42em] text-rost-sand-dim md:text-[12px]">
            Strategic Design Consultant · RIBA Plan of Work
          </span>
        </motion.div>

        {/* headline */}
        <h1
          id="hero-heading"
          className="max-w-[18ch] text-balance font-sans text-[clamp(2rem,5.4vw,4.6rem)] font-medium leading-[1.04] tracking-[-0.02em] text-rost-sand"
        >
          <motion.span
            variants={headlineWrap}
            initial="hidden"
            animate="show"
            className="inline"
          >
            {HEADLINE_PLAIN.split(" ").map((w, i) => (
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
            {HEADLINE_ACCENT.map((w, i) => (
              <Word key={`a-${i}`} accent>
                {w}&nbsp;
              </Word>
            ))}
          </motion.span>
        </h1>

        {/* tagline + meta */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9, ease: EASE }}
          className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-3">
            <p
              className="font-display text-xl italic text-rost-amber md:text-2xl"
              dir={locale === "FA" ? "rtl" : "ltr"}
            >
              {tagline}
            </p>
            <p className="max-w-[44ch] text-sm leading-relaxed text-rost-sand-dim/80 md:text-[15px]">
              We curate and steer the development journey — from first vision to
              final realization — for clients shaping the built environment.
            </p>
          </div>

          {/* mini stat block */}
          <dl className="flex items-stretch gap-6 md:gap-8">
            <Stat n="05" label="Global offices & partners" />
            <span className="w-px bg-rost-line-strong/50" aria-hidden />
            <Stat n="07" label="RIBA project stages guided" />
            <span className="w-px bg-rost-line-strong/50" aria-hidden />
            <Stat n="02" label="Departments · Branded House" />
          </dl>
        </motion.div>
      </section>

      {/* ============================ Bottom band ============================ */}
      <section
        id="network"
        className="relative z-10 mx-auto w-full max-w-[1480px] px-5 pb-5 md:px-10"
        aria-labelledby="network-heading"
      >
        {/* global presence ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="mb-4 flex items-center gap-3 border-y border-rost-line-strong/40 py-2"
        >
          <span className="hidden shrink-0 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.32em] text-rost-sand-dim/70 md:flex">
            <Globe2 className="h-3.5 w-3.5 text-rost-amber" aria-hidden />
            <span id="network-heading" className="sr-only">Global presence</span>
            Global presence
          </span>
          <div className="relative flex-1 overflow-hidden" aria-hidden>
            <div className="rost-marquee flex w-max gap-8 whitespace-nowrap">
              {[...PRESENCE, ...PRESENCE].map((p, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-rost-sand-dim"
                >
                  <span className="text-rost-sand">{p.city}</span>
                  <span className="text-rost-amber/70">·</span>
                  <span className="text-rost-sand-dim/60">{p.code}</span>
                  <span className="text-rost-line-strong">|</span>
                </span>
              ))}
            </div>
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-rost-ink to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-rost-ink to-transparent" />
          </div>
        </motion.div>

        {/* departments row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.05, duration: 0.8, ease: EASE }}
          id="departments"
          className="grid grid-cols-1 gap-3 md:grid-cols-[1.1fr_1fr_1fr]"
        >
          {/* Departments */}
          <article className="group relative overflow-hidden rounded-xl border border-rost-line-strong/40 bg-rost-ink-soft/40 p-4 backdrop-blur-sm transition-colors hover:border-rost-amber/40 focus-within:border-rost-amber/40">
            <div className="flex items-center justify-between">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-rost-sand-dim/70">
                Branded House · Departments
              </h2>
              <Plus className="h-4 w-4 text-rost-amber transition-transform duration-500 group-hover:rotate-90" aria-hidden />
            </div>
            <ul className="mt-3 space-y-2.5">
              {DEPARTMENTS.map((d) => (
                <li key={d.name} className="flex items-baseline gap-2">
                  <span className="font-display text-base font-medium text-rost-sand">
                    {d.name}
                  </span>
                  <span className="text-[11px] italic text-rost-sand-dim/70">
                    — {d.tag}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* RIBA credential */}
          <article className="relative overflow-hidden rounded-xl border border-rost-line-strong/40 bg-rost-ink-soft/40 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-rost-sand-dim/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-rost-amber" aria-hidden />
              International foundation
            </div>
            <p className="mt-3 font-display text-2xl font-medium leading-tight text-rost-sand">
              RIBA <span className="italic text-rost-amber">Client Adviser</span>
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-rost-sand-dim/70">
              Royal Institute of British Architects · Plan of Work 2020 · Stages 0–7
            </p>
            <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-rost-sand-dim/50">
              Founder Dr. Taha Fallah · RIBA Member
            </p>
          </article>

          {/* CTA */}
          <a
            href="#contact"
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-rost-amber/30 bg-gradient-to-br from-rost-amber/15 to-transparent p-4 transition-all hover:border-rost-amber/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-amber/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rost-ink"
            aria-label="Begin your project journey — contact ROST PLATFORM"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-rost-amber">
                Begin the journey
              </span>
              <ArrowUpRight className="h-4 w-4 text-rost-amber transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
            </div>
            <p className="mt-3 font-display text-lg leading-snug text-rost-sand">
              Define, curate &amp; realize your next built environment.
            </p>
          </a>
        </motion.div>
      </section>

      {/* ============================ Footer (sticky) ============================ */}
      <footer
        id="contact"
        className="relative z-20 mt-auto border-t border-rost-line-strong/40 bg-rost-ink/70 backdrop-blur-md"
        aria-labelledby="contact-heading"
      >
        <h2 id="contact-heading" className="sr-only">
          Contact ROST PLATFORM
        </h2>
        <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:justify-between md:px-10">
          <address className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] not-italic text-rost-sand-dim/80">
            <span className="font-display font-medium tracking-[0.18em] text-rost-sand">
              ROST PLATFORM LTD
            </span>
            <span className="hidden text-rost-line-strong md:inline" aria-hidden>|</span>
            <a
              href="https://www.rostplatform.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-rost-sand focus-visible:outline-none focus-visible:text-rost-sand focus-visible:underline"
            >
              <Globe2 className="h-3 w-3 text-rost-amber/70" aria-hidden />
              www.rostplatform.com
            </a>
            <span className="hidden text-rost-line-strong md:inline" aria-hidden>|</span>
            <a
              href="mailto:info@rostplatform.com"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-rost-sand focus-visible:outline-none focus-visible:text-rost-sand focus-visible:underline"
            >
              <Mail className="h-3 w-3 text-rost-amber/70" aria-hidden />
              info@rostplatform.com
            </a>
            <span className="hidden text-rost-line-strong md:inline" aria-hidden>|</span>
            <a
              href="tel:+447386296171"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-rost-sand focus-visible:outline-none focus-visible:text-rost-sand focus-visible:underline"
            >
              <Phone className="h-3 w-3 text-rost-amber/70" aria-hidden />
              +44 73 86 296 171
            </a>
          </address>
          <div className="flex items-center gap-4 text-[11px] text-rost-sand-dim/70">
            <span className="hidden md:inline">© 2026 ROST PLATFORM LTD · Company No. 16445406</span>
            <a
              href="https://instagram.com/rostplatform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-rost-sand focus-visible:outline-none focus-visible:text-rost-sand focus-visible:underline"
              aria-label="ROST PLATFORM on Instagram — @rostplatform"
            >
              <Instagram className="h-3.5 w-3.5 text-rost-amber/70" aria-hidden />
              @rostplatform
            </a>
            <a
              href="#platform"
              className="inline-flex items-center gap-1.5 rounded-full border border-rost-line-strong/50 px-3 py-1 transition-colors hover:border-rost-amber/50 hover:text-rost-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-amber/70"
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
      <dd className="font-display text-2xl font-semibold leading-none text-rost-sand md:text-3xl">
        {n}
      </dd>
      <dt className="mt-1.5 max-w-[14ch] text-[10px] uppercase leading-tight tracking-[0.2em] text-rost-sand-dim/70">
        {label}
      </dt>
    </div>
  );
}
