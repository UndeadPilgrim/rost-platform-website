'use client'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type Variants,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ----------------------------------------------------------------------------
   ROST PLATFORM — the homepage as ROST's own project document.
   One continuous drafting sheet: a single grid, a vertical drafting margin
   with indexed sections (01–04), hairline datum rules dividing the read.
   Architecture & Construction · Strategic Design Advisor (RIBA-aligned)
   Canonical Brand Palette:
   - ROST BLUE:  #1C80BB (Primary Accent)
   - ROST WHITE: #FFFFFF (Primary Contrast & Foreground)
   - ROST BLACK: #171717 (Deep Background Base)
   - ROST GRAY:  #767676 (Secondary Neutral)
   Drafting conventions: numerals, stage codes and stats stay Latin dir="ltr";
   the margin device uses logical properties so it mirrors cleanly in RTL.
---------------------------------------------------------------------------- */

type Locale = "EN" | "FA";

/* ----------------------------- i18n strings -------------------------------- */

interface Dict {
  dir: "ltr" | "rtl";
  // 0 · Hero
  headlineLine1: string;
  headlineLine2: string;
  headlineLine3Plain: string;
  headlineLine3Accent: string[];
  heroCopy: string;
  stat1: string;
  stat2: string;
  stat1Number: string;
  stat2Number: string;
  scroll: string;
  // Drafting-margin labels
  labelPlatform: string;
  labelRole: string;
  labelDepartments: string;
  labelNetwork: string;
  // 01 · Platform
  platformPre: string;
  platformAccent: string;
  platformPost: string;
  platformBody: string;
  platformEtym: string;
  // 02 · The Role
  roleTitle: string;
  roleFramework: string;
  roleStatement: string;
  stages: string[];
  stageDescriptions: string[];
  // 03 · Departments
  departmentsIntro: string;
  plateNameA: string;
  plateNameB: string;
  plateDescA: string;
  plateDescB: string;
  plateTagA: string;
  plateTagB: string;
  // 04 · Network
  networkHeading: string;
  networkCountries: string[];
  networkRoles: string[];
}

const STRINGS: Record<Locale, Dict> = {
  EN: {
    dir: "ltr",
    headlineLine1: "A MULTIDISCIPLINARY PLATFORM",
    headlineLine2: "FOR GUIDING DEVELOPMENT",
    headlineLine3Plain: "IN",
    headlineLine3Accent: ["THE", "BUILT", "ENVIRONMENT."],
    heroCopy:
      "We help clients define direction, curate the right expertise, and align decisions from initial vision to final realization.",
    stat1: "Countries of experience",
    stat2: "Years of project record",
    stat1Number: "59+",
    stat2Number: "16+",
    scroll: "Scroll",
    labelPlatform: "Platform",
    labelRole: "The Role",
    labelDepartments: "Departments",
    labelNetwork: "Network",
    platformPre: "A ",
    platformAccent: "curator",
    platformPost: " and mentor for multidisciplinary development.",
    platformBody:
      "Projects rarely fail for lack of design; they lose value when decisions drift apart. ROST PLATFORM sits at the core of the project's value chain — connecting the client's team, our specialist departments, and an expansive network of experts — so strategic coherence survives and the asset's long-term worth is protected.",
    platformEtym:
      "«Rost» — an authentic Persian word evoking growth, development, flourishing.",
    roleTitle: "Strategic Design Advisor",
    roleFramework:
      "Aligned with the RIBA Plan of Work 2020 — the international RIBA Client Adviser framework.",
    roleStatement:
      "For building projects, from initial vision through to post-construction, we operate at the strategic decision-making level to safeguard the project\u2019s coherence and align it with investment objectives.",
    stages: [
      "Strategic Definition",
      "Preparation and Briefing",
      "Concept Design",
      "Spatial Coordination",
      "Technical Design",
      "Manufacturing and Construction",
      "Handover",
      "Use",
    ],
    stageDescriptions: [
      "Set the strategic framework and clear investment objectives.",
      "Develop the brief and assemble the aligned expert team.",
      "Steer the concept so its market position stays distinct.",
      "Protect the design's integrity against technical and economic pressure.",
      "Resolve details, engineer value, and reduce risks before construction.",
      "Guard the project's DNA as it is built.",
      "Stabilize asset value through early operation.",
      "Strengthen pricing power and brand credibility over time.",
    ],
    departmentsIntro:
      "A branded house cultivating a dynamic value chain of specialist businesses.",
    plateNameA: "Rost Lighting",
    plateNameB: "Rost Trip",
    plateDescA: "Architectural lighting design.",
    plateDescB: "Specialist architectural travel and experience programs.",
    plateTagA: "Light, the narrative of architecture.",
    plateTagB: "Travel & Experience.",
    networkHeading: "Global network",
    networkCountries: ["Iran", "UK", "UAE", "China", "Brazil"],
    networkRoles: ["Headquarter", "Office", "Office", "Partner", "Partner"],
  },
  FA: {
    dir: "rtl",
    headlineLine1: "پلتفرمی چندرشته‌ای",
    headlineLine2: "برای راهبری توسعه در",
    headlineLine3Plain: "",
    headlineLine3Accent: ["معماری", "و", "ساخت."],
    heroCopy:
      "ما به کارفرمایان کمک می‌کنیم جهت‌گیری را تعریف کنند، تخصص درست را کیوریت کنند، و تصمیمات را از چشم‌انداز اولیه تا تحقق نهایی هم‌راستا کنند.",
    stat1: "کشور تجربه",
    stat2: "سال سابقه پروژه",
    stat1Number: "۵۹+",
    stat2Number: "۱۶+",
    scroll: "اسکرول",
    labelPlatform: "پلتفرم",
    labelRole: "سرویس محوری",
    labelDepartments: "دپارتمان‌ها",
    labelNetwork: "شبکه جهانی",
    platformPre: "",
    platformAccent: "کیوریتور",
    platformPost: " و منتور توسعه چندرشته‌ای",
    platformBody:
      "پروژه‌ها به‌ندرت از کمبود طراحی شکست می‌خورند؛ آن‌ها وقتی ارزش می‌بازند که تصمیم‌ها واگر می‌شوند. رست پلتفرم در هسته زنجیره ارزش پروژه قرار دارد — تیم کارفرما، دپارتمان‌های تخصصی و شبکه گسترده متخصصان را به هم پیوند می‌دهد — تا انسجام راهبردی از دست نرود و ارزش بلندمدت دارایی محفوظ بماند.",
    platformEtym:
      "«رست» واژه‌ای اصیل فارسی است که مفاهیم رشد، توسعه و شکوفایی را تداعی می‌کند.",
    roleTitle: "مشاور استراتژیک طرح",
    roleFramework:
      "هم‌راستا با چارچوب RIBA Plan of Work 2020 و نقش بین‌المللی RIBA Client Adviser.",
    roleStatement:
      "نماینده منافع راهبردی پروژه؛ از شکل‌گیری چشم‌انداز اولیه تا پس از تکمیل ساخت، در سطح تصمیم‌گیری کلان فعالیت می‌کند تا با حفظ انسجام طرح و هم‌راستایی آن با اهداف سرمایه‌گذاری، از کیفیت کلان پروژه محافظت کند.",
    stages: [
      "تعریف راهبردی",
      "آماده‌سازی و تدوین شرح نیاز",
      "طراحی مفهومی",
      "هماهنگی فضایی",
      "طراحی فنی و اجرایی",
      "ساخت و اجرا",
      "تحویل و راه‌اندازی",
      "بهره‌برداری و چرخه عمر",
    ],
    stageDescriptions: [
      "چارچوب راهبردی و اهداف شفاف سرمایه‌گذاری.",
      "تدوین شرح نیاز و انتخاب تیم‌های هم‌راستا.",
      "راهبری کانسپت منطبق بر استراتژی کلان.",
      "حفاظت از یکپارچگی طرح در برابر فشارها.",
      "مهندسی ارزش و کنترل ریسک پیش از اجرا.",
      "حفاظت از DNA پروژه در اجرا.",
      "تثبیت ارزش دارایی در بهره‌برداری اولیه.",
      "تقویت قیمت‌گذاری و اعتبار برند در بلندمدت.",
    ],
    departmentsIntro:
      "برند مادر؛ پرورش زنجیره ارزشی پویا از کسب‌وکارهای تخصصی.",
    plateNameA: "رست لایتینگ",
    plateNameB: "رست تریپ",
    plateDescA: "طراحی نورپردازی معمارانه.",
    plateDescB: "برنامه‌های سفر تخصصی معماری و تجربه.",
    plateTagA: "نور، روایت معماری.",
    plateTagB: "سفر و تجربه.",
    networkHeading: "شبکه جهانی",
    networkCountries: ["ایران", "انگلستان", "امارات", "چین", "برزیل"],
    networkRoles: ["دفتر مرکزی", "دفتر", "دفتر", "همکار", "همکار"],
  },
};
/* ----------------------------- animations ---------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

/* Hero rise variants, gated on reduced motion through the same invariant the
   reveal() helper guarantees: the variant SHAPE is identical in both modes,
   the static target is the visible word, and motion is removed only by
   collapsing the transition to zero duration -- never by dropping props.
   When the reduce flag flips after mount, a word that mounted mid-rise is
   still carried to y "0%" (instantly), so no clipped word can freeze out of
   view. With reduce off the choreography is identical to the approved
   motion: 0.55s hold, 0.045s stagger, 0.78s eased rise. */
function headlineWrap(reduce: boolean): Variants {
  return {
    hidden: {},
    show: {
      transition: reduce
        ? { duration: 0 }
        : { staggerChildren: 0.045, delayChildren: 0.55 },
    },
  };
}

function wordRise(reduce: boolean): Variants {
  return {
    hidden: reduce ? {} : { y: "115%" },
    show: {
      y: "0%",
      transition: reduce ? { duration: 0 } : { duration: 0.78, ease: EASE },
    },
  };
}

/* ----------------------------- helpers ------------------------------------ */

/**
 * One masked, rising headline word.
 *
 * The inter-word gap is a proportional inline-end margin, never a
 * non-breaking space: measured at display size, the U+00A0 advance of Optima
 * is ~1.8x its normal space (Yekan Bakh ~1.5x), which doubled the hero gaps
 * at 1440 even though no JSX whitespace survives between the spans. The two
 * margins equal each face true space advance at hero size -- Optima bold,
 * minus the heading tracking of -0.01em, measures 0.268em; Yekan Bakh black
 * measures 0.1em -- so word spacing stays typographically exact while the
 * rise/clip animation and its RTL variant continue unchanged.
 *
 * Reduced motion follows the reveal() invariant: the variant shape is
 * identical in both modes and the static target is the visible word; under
 * reduce the rise collapses to zero duration instead of motion props
 * disappearing, so a late flip of useReducedMotion() can never leave a word
 * frozen behind its overflow clip.
 */
function Word({
  children,
  accent = false,
  rtl = false,
  reduce = false,
}: {
  children: ReactNode;
  accent?: boolean;
  rtl?: boolean;
  reduce?: boolean;
}) {
  const variants = useMemo(() => wordRise(reduce), [reduce]);
  return (
    <span
      className={`inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] ${
        rtl ? "me-[0.1em]" : "me-[0.268em]"
      }`}
    >
      <motion.span
        variants={variants}
        className={
          accent
            ? "inline-block text-rost-blue"
            : "inline-block"
        }
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Reveal props for in-view editorial rises (growth motif: content rises).
 *
 *  Invariant (QA-defect guard): the returned prop SHAPE is identical whether
 *  or not the visitor prefers reduced motion, and whileInView is ALWAYS
 *  present. Only the values differ: under reduce the element mounts already
 *  at the visible target and the transition collapses to zero duration --
 *  motion is removed through the transition, never by dropping the
 *  animation props. useReducedMotion() can read null on the first pass and
 *  flip AFTER mount, so a component that mounted hidden (opacity: 0) must
 *  still carry whileInView to be brought back to opacity: 1 immediately;
 *  omitting the props on the flip is what stranded whole sections invisible
 *  for reduced-motion users. All timing below the fold resolves to the same
 *  visible endpoint in every flip order. */
function reveal(reduce: boolean, index = 0, baseDelay = 0, travel = 26) {
  return {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: travel },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px -10% 0px" },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.85, ease: EASE, delay: baseDelay + index * 0.06 },
  };
}

/* ------------------------- hydration guard -------------------------------- */

/**
 * Mount signal for hydration-safe reduced-motion consumers.
 *
 * WHY -- framer-motion v12 seeds useReducedMotion() with useState(prefersReducedMotion.current),
 * and initPrefersReducedMotion() sets that ref synchronously from matchMedia on the first
 * client render. The server has no window/matchMedia and always renders reduce=false. Under
 * an OS-level prefers-reduced-motion: reduce the FIRST client hydration pass therefore runs
 * with reduce=true, diverging from SSR on every framer-motion style prop derived from the flag
 * (hero Words opacity/translate, header/subtitle/scroll-cue initial states, each reveal()) and
 * React 19 logs that as an attribute-level hydration mismatch at error level.
 *
 * HOW -- useSyncExternalStore's getServerSnapshot (false here) is the only value used during
 * React's hydration pass, so hasMounted pins reduce=false on the first client render and the
 * markup equals SSR exactly. On the next commit React re-reads getSnapshot (true) and reduce
 * flips to the real OS value through an ordinary client re-render. Flip order safety is
 * guaranteed by the reveal() invariant: whileInView is always present and every timing
 * resolves to the visible (opacity 1 / y=0) endpoint whichever way the flag is read, so a
 * late flip never strands content hidden. heroWrap/wordRise(reduce) preserve the same prop
 * SHAPE and visible target across both modes (see the docs at reveal() and Word).
 */
const emptySubscribe = () => () => {};
function useHasMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/* ------------------------- /hydration guard ------------------------------- */

/**
 * One RIBA stage row (section 02) with two independent motion layers.
 *
 * Layer 1: the staggered reveal() rise, unchanged from the approved
 * composition. Layer 2: single-focus activation -- the parent StageList
 * computes which row's rect center sits nearest the viewport center and
 * passes it down as `active`, so exactly one row is ever lit: its numeral
 * takes full ROST BLUE, the title brightens to full white and lifts 3px
 * (translate only, never a layout property) and its description reaches
 * full opacity while quiet neighbours hold at 0.35. Descriptions are
 * always in the DOM and always in flow, so nothing shifts and SEO/a11y
 * content never disappears.
 *
 * Reduced-motion invariant (the reveal() guard): the activation result is
 * hard-gated off under reduce -- no activation behavior at all -- and the
 * class values collapse to the approved static look: Stage 0 numeral
 * blue, every description at full opacity, no lift. The rendered prop
 * SHAPE is identical in both modes, so a late flip of useReducedMotion()
 * can never strand a row dimmed or lifted out of view.
 */
function StageRow({
  index,
  name,
  desc,
  rtl,
  reduce,
  active,
}: {
  index: number;
  name: string;
  desc: string;
  rtl: boolean;
  reduce: boolean;
  active: boolean;
}) {
  /* Hydration guard (React 19 does not patch up attribute mismatches):
     `reduce` arriving from Home is already mount-gated by useHasMounted(),
     so the static look follows it directly. `mounted` still gates the
     activation class to keep every row's first client render identical to
     the server markup even if a future refactor lets the parent light a
     row during hydration. */
  const mounted = useHasMounted();
  const staticLook = reduce;
  const lit = mounted && !reduce && active;
  const numeralBlue = staticLook ? index === 0 : lit;
  return (
    <li>
      <motion.div
        {...reveal(reduce, index, 0.12)}
        className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-x-6 border-b border-rost-line py-6 last:border-b-0 md:grid-cols-[8.5rem_1fr] md:gap-x-10 md:py-8"
      >
        <span
          dir="ltr"
          className={`font-display text-5xl leading-[0.85] font-semibold tracking-tight transition-colors duration-[450ms] md:text-7xl ${
            numeralBlue
              ? "text-rost-blue"
              : "text-rost-white/18 group-hover:text-rost-white/45"
          }`}
        >
          {index}
        </span>
        <div className="min-w-0">
          <span
            className={`block transition-[transform,translate,color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-rost-white ${
              lit
                ? "-translate-y-[3px] text-rost-white"
                : "translate-y-0 text-rost-white/85"
            } ${
              rtl
                ? "text-lg leading-[1.7] font-medium md:text-[1.7rem] md:leading-[1.55]"
                : "text-base font-medium tracking-[0.12em] uppercase md:text-2xl md:tracking-[0.14em]"
            }`}
          >
            {name}
          </span>
          <p
            className={`mt-1.5 text-rost-gray transition-opacity duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              rtl
                ? "text-[14px] leading-[1.9] md:text-[15px]"
                : "text-sm max-w-[52ch]"
            } ${lit || staticLook ? "opacity-100" : "opacity-[0.35]"}`}
          >
            {desc}
          </p>
        </div>
      </motion.div>
    </li>
  );
}

/**
 * The RIBA stage stack (section 02) with single-focus activation.
 *
 * One scroll-linked state replaces the per-row center-band observers: on
 * each rAF-throttled frame after a scroll or resize, the row whose rect
 * center sits nearest the viewport center becomes the active index, so
 * exactly one row is ever lit -- on desktop, and on mobile where rows are
 * shorter than the old ±42% band and several lit at once. The whole
 * computation is gated on the list container intersecting the viewport
 * (one useInView with a -10% edge margin), so rows stay quiet until the
 * stack actually scrolls in and revert when it has fully passed, and it
 * is skipped under reduced-motion, where the approved static look holds.
 */
function StageList({
  names,
  descs,
  rtl,
  reduce,
}: {
  names: string[];
  descs: string[];
  rtl: boolean;
  reduce: boolean;
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, {
    once: false,
    margin: "-10% 0px -10% 0px",
  });
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const list = listRef.current;
      if (!list) return;
      const mid = window.innerHeight / 2;
      let nearest = -1;
      let nearestDist = Number.POSITIVE_INFINITY;
      Array.from(list.children).forEach((row, i) => {
        const rect = row.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - mid);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = i;
        }
      });
      setActiveIndex((prev) => (prev === nearest ? prev : nearest));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [inView, reduce]);

  return (
    <ol
      ref={listRef}
      className="mt-12 list-none border-s border-rost-line-strong/40 ps-6 md:mt-20 md:ps-10 lg:ps-14"
    >
      {names.map((name, i) => (
        <StageRow
          key={`stage-${i}`}
          index={i}
          name={name}
          desc={descs[i]}
          rtl={rtl}
          reduce={reduce}
          active={inView && i === activeIndex}
        />
      ))}
    </ol>
  );
}

/* ----------------------------- drafting shell ------------------------------ */

/**
 * One section of the drawing sheet: a hairline datum rule above (continuation
 * of the hero's datum), a drafting-margin cell carrying the index numeral +
 * label, and the section body behind a logical border-inline-start so the
 * margin device mirrors cleanly for RTL. On mobile the margin device reduces
 * to a top-aligned annotation row.
 */
function DocSection({
  id,
  headingId,
  index,
  label,
  rtl,
  children,
}: {
  id?: string;
  headingId: string;
  index: string;
  label: string;
  rtl: boolean;
  children: ReactNode;
}) {
  const pad = "pt-12 pb-24 md:pt-28 md:pb-32";
  return (
    <section id={id} aria-labelledby={headingId} className="relative">
      <div className="mx-auto w-full max-w-[1480px] border-t border-rost-line-strong/40 px-5 md:px-10">
        {/* Mobile: the margin reduces to a top annotation row */}
        <div className="flex items-center gap-4 pt-10 md:hidden">
          <span dir="ltr" className="font-display text-[13px] tracking-[0.28em] text-rost-annotation">
            {index}
          </span>
          <span
            className={`rost-track text-[10px] uppercase text-rost-annotation ${rtl ? "font-medium" : ""}`}
          >
            {label}
          </span>
          <span className="h-px flex-1 bg-rost-line" aria-hidden />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[7rem_minmax(0,1fr)]">
          {/* Desktop drafting margin: index numeral + section label */}
          <div
            className={`hidden flex-col items-end me-4 md:flex ${pad}`}
            aria-hidden
          >
            <span dir="ltr" className="font-display text-[13px] tracking-[0.28em] text-rost-annotation">
              {index}
            </span>
            <span
              className={`rost-track mt-2 max-w-[7rem] text-[10px] uppercase leading-[1.9] text-rost-annotation ${
                rtl ? "font-medium" : ""
              }`}
            >
              {label}
            </span>
          </div>

          {/* Section body, hung off the vertical margin rule */}
          <div className={`md:border-s md:border-rost-line-strong/40 md:ps-8 lg:ps-14 ${pad}`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
/* ----------------------------- axonometric engine -------------------------- */

type AxonPoint = readonly [x: number, y: number, z: number];

const AXON_ORIGIN_X = 1110;
const AXON_ORIGIN_Y = 500;
const AXON_X_STEP = 48;
const AXON_Y_STEP = 24;
const AXON_Z_STEP = 44;

function projectAxon([x, y, z]: AxonPoint, offsetY = 0) {
  return {
    x: AXON_ORIGIN_X + (x - y) * AXON_X_STEP,
    y: AXON_ORIGIN_Y + (x + y) * AXON_Y_STEP - z * AXON_Z_STEP + offsetY,
  };
}

function AxonLine({
  from,
  to,
  offsetY = 0,
  toOffsetY,
  stroke = "currentColor",
  strokeWidth = 0.9,
  dash,
}: {
  from: AxonPoint;
  to: AxonPoint;
  offsetY?: number;
  toOffsetY?: number;
  stroke?: string;
  strokeWidth?: number;
  dash?: string;
}) {
  const a = projectAxon(from, offsetY);
  const b = projectAxon(to, toOffsetY ?? offsetY);

  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={dash}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
  );
}

function AxonPolygon({
  points,
  offsetY = 0,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 0.9,
  dash,
}: {
  points: readonly AxonPoint[];
  offsetY?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  dash?: string;
}) {
  return (
    <polygon
      points={points
        .map((point) => {
          const projected = projectAxon(point, offsetY);
          return `${projected.x},${projected.y}`;
        })
        .join(" ")}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={dash}
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  );
}

function AxonVolume({
  bounds,
  offsetY = 0,
  edge = "rgba(255,255,255,0.42)",
  top = "rgba(255,255,255,0.05)",
  right = "rgba(255,255,255,0.02)",
  left = "rgba(255,255,255,0.03)",
}: {
  bounds: readonly [x1: number, y1: number, z1: number, x2: number, y2: number, z2: number];
  offsetY?: number;
  edge?: string;
  top?: string;
  right?: string;
  left?: string;
}) {
  const [x1, y1, z1, x2, y2, z2] = bounds;
  const bottom: readonly AxonPoint[] = [
    [x1, y1, z1],
    [x2, y1, z1],
    [x2, y2, z1],
    [x1, y2, z1],
  ];
  const upper: readonly AxonPoint[] = [
    [x1, y1, z2],
    [x2, y1, z2],
    [x2, y2, z2],
    [x1, y2, z2],
  ];

  return (
    <g>
      <AxonPolygon points={upper} offsetY={offsetY} fill={top} stroke={edge} />
      <AxonPolygon
        points={[bottom[1], bottom[2], upper[2], upper[1]]}
        offsetY={offsetY}
        fill={right}
        stroke={edge}
      />
      <AxonPolygon
        points={[bottom[2], bottom[3], upper[3], upper[2]]}
        offsetY={offsetY}
        fill={left}
        stroke={edge}
      />
      <AxonPolygon points={bottom} offsetY={offsetY} stroke={edge} />
      {bottom.map((point, index) => (
        <AxonLine
          key={index}
          from={point}
          to={upper[index]}
          offsetY={offsetY}
          stroke={edge}
        />
      ))}
    </g>
  );
}

function AxonRegistration({ point, offsetY = 0 }: { point: AxonPoint; offsetY?: number }) {
  const projected = projectAxon(point, offsetY);

  return (
    <g stroke="rgba(255,255,255,0.26)" strokeWidth="0.8">
      <line x1={projected.x - 9} y1={projected.y} x2={projected.x + 9} y2={projected.y} />
      <line x1={projected.x} y1={projected.y - 9} x2={projected.x} y2={projected.y + 9} />
      <circle cx={projected.x} cy={projected.y} r="3" fill="none" />
    </g>
  );
}
/* ----------------------------- background ---------------------------------- */

function BlueprintBackdrop({
  mx,
  my,
  rtl,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  rtl: boolean;
}) {
  const backX = useTransform(mx, [-0.5, 0.5], [-2.5, 2.5]);
  const backY = useTransform(my, [-0.5, 0.5], [-1.5, 1.5]);
  const midX = useTransform(mx, [-0.5, 0.5], [-4.5, 4.5]);
  const midY = useTransform(my, [-0.5, 0.5], [-3, 3]);
  const frontX = useTransform(mx, [-0.5, 0.5], [-6.5, 6.5]);
  const frontY = useTransform(my, [-0.5, 0.5], [-4.5, 4.5]);

  const siteGridX = Array.from({ length: 10 }, (_, index) => -0.6 + index);
  const siteGridY = Array.from({ length: 8 }, (_, index) => -0.6 + index);
  const columnXs = [0.65, 2.85, 5.05, 7.2];
  const columnYs = [0.7, 2.75, 4.9];
  const facadeXs = Array.from({ length: 11 }, (_, index) => 0.8 + index * 0.64);
  const stairSteps = Array.from({ length: 7 }, (_, index) => ({
    y: 2.15 + index * 0.31,
    z: 2.38 + index * 0.17,
  }));

  const drawProject = (compact: boolean) => (
    <>
      <motion.g style={{ x: backX, y: backY }}>
        {/* Site plate: the project's shared ground and decision field. */}
        <AxonPolygon
          points={[
            [-0.8, -0.8, 0],
            [8.4, -0.8, 0],
            [8.4, 6.5, 0],
            [-0.8, 6.5, 0],
          ]}
          fill="rgba(255,255,255,0.008)"
          stroke="rgba(255,255,255,0.22)"
        />
        <AxonPolygon
          points={[
            [0.25, 0.35, 0.02],
            [7.55, 0.35, 0.02],
            [7.55, 5.25, 0.02],
            [0.25, 5.25, 0.02],
          ]}
          stroke="rgba(255,255,255,0.18)"
          dash="5 8"
        />

        {!compact && (
          <g>
            {siteGridX.map((x) => (
              <AxonLine
                key={`gx-${x}`}
                from={[x, -0.8, 0]}
                to={[x, 6.5, 0]}
                stroke="rgba(255,255,255,0.065)"
                strokeWidth={0.7}
              />
            ))}
            {siteGridY.map((y) => (
              <AxonLine
                key={`gy-${y}`}
                from={[-0.8, y, 0]}
                to={[8.4, y, 0]}
                stroke="rgba(255,255,255,0.065)"
                strokeWidth={0.7}
              />
            ))}

            {/* A project brief lies within the same drawing, not outside it. */}
            <AxonPolygon
              points={[
                [0.1, 4.55, 0.055],
                [2.15, 4.55, 0.055],
                [2.15, 6.02, 0.055],
                [0.1, 6.02, 0.055],
              ]}
              fill="rgba(23,23,23,0.72)"
              stroke="rgba(255,255,255,0.28)"
            />
            <AxonLine
              from={[0.34, 4.86, 0.065]}
              to={[1.82, 4.86, 0.065]}
              stroke="rgba(255,255,255,0.24)"
              strokeWidth={0.75}
            />
            <AxonLine
              from={[0.34, 5.12, 0.065]}
              to={[1.45, 5.12, 0.065]}
              stroke="rgba(255,255,255,0.13)"
              strokeWidth={0.7}
            />
            <AxonPolygon
              points={[
                [1.48, 5.28, 0.065],
                [1.92, 5.28, 0.065],
                [1.92, 5.74, 0.065],
                [1.48, 5.74, 0.065],
              ]}
              stroke="rgba(28,128,187,0.56)"
              strokeWidth={0.85}
            />
            <AxonLine
              from={[0.34, 5.75, 0.065]}
              to={[1.16, 5.75, 0.065]}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={0.7}
            />

            <AxonRegistration point={[-0.8, 6.5, 0]} />
            <AxonRegistration point={[8.4, -0.8, 0]} />
          </g>
        )}

        {/* Registration lines keep every discipline visibly aligned. */}
        {(
          [
            [0.25, 0.35, 0],
            [7.55, 0.35, 0],
            [7.55, 5.25, 0],
            [0.25, 5.25, 0],
          ] as readonly AxonPoint[]
        )
          .slice(0, compact ? 2 : 4)
          .map((point, index) => (
            <AxonLine
              key={`register-${index}`}
              from={point}
              to={[point[0], point[1], 6.1]}
              toOffsetY={-236}
              stroke="rgba(255,255,255,0.14)"
              strokeWidth={0.7}
              dash="3 9"
            />
          ))}
      </motion.g>
      <motion.g style={{ x: midX, y: midY }}>
        {/* Structural layer. */}
        <AxonVolume
          bounds={[0.25, 0.35, 0.42, 7.55, 5.25, 0.62]}
          offsetY={-34}
          edge="rgba(255,255,255,0.32)"
          top="rgba(255,255,255,0.028)"
        />
        {columnXs.flatMap((x) =>
          columnYs.map((y) => (
            <AxonLine
              key={`column-${x}-${y}`}
              from={[x, y, 0.62]}
              to={[x, y, 2.18]}
              offsetY={-34}
              stroke="rgba(255,255,255,0.36)"
              strokeWidth={compact ? 1 : 0.85}
            />
          )),
        )}
        {columnYs.map((y) => (
          <AxonLine
            key={`beam-y-${y}`}
            from={[0.65, y, 2.18]}
            to={[7.2, y, 2.18]}
            offsetY={-34}
            stroke="rgba(255,255,255,0.28)"
          />
        ))}
        {columnXs.map((x) => (
          <AxonLine
            key={`beam-x-${x}`}
            from={[x, 0.7, 2.18]}
            to={[x, 4.9, 2.18]}
            offsetY={-34}
            stroke="rgba(255,255,255,0.28)"
          />
        ))}

        {/* Spatial layer: three volumes form one courtyard building. */}
        <AxonVolume bounds={[0.55, 0.65, 2.32, 2.55, 4.75, 3.72]} offsetY={-103} />
        <AxonVolume bounds={[5.02, 0.65, 2.32, 7.25, 4.75, 3.72]} offsetY={-103} />
        <AxonVolume bounds={[2.55, 0.65, 2.32, 5.02, 1.72, 3.72]} offsetY={-103} />
        <AxonPolygon
          points={[
            [2.7, 1.95, 2.34],
            [4.88, 1.95, 2.34],
            [4.88, 4.6, 2.34],
            [2.7, 4.6, 2.34],
          ]}
          offsetY={-103}
          stroke="rgba(255,255,255,0.22)"
          dash="4 6"
        />
        {stairSteps.map((step, index) => (
          <AxonLine
            key={`stair-${index}`}
            from={[2.82, step.y, step.z]}
            to={[4.56, step.y, step.z]}
            offsetY={-103}
            stroke={
              index === stairSteps.length - 1
                ? "rgba(28,128,187,0.68)"
                : "rgba(255,255,255,0.32)"
            }
            strokeWidth={0.8}
          />
        ))}
        <AxonLine
          from={[2.82, stairSteps[0].y, stairSteps[0].z]}
          to={[2.82, stairSteps[stairSteps.length - 1].y, stairSteps[stairSteps.length - 1].z]}
          offsetY={-103}
          stroke="rgba(28,128,187,0.5)"
          strokeWidth={1.1}
        />
      </motion.g>

      <motion.g style={{ x: frontX, y: frontY }}>
        {/* Upper envelope retains the courtyard and reads as architecture first. */}
        <AxonVolume
          bounds={[0.82, 0.48, 4.02, 3.28, 4.7, 5.38]}
          offsetY={-166}
          edge="rgba(255,255,255,0.45)"
          top="rgba(255,255,255,0.055)"
        />
        <AxonVolume
          bounds={[4.36, 0.48, 4.02, 7.3, 4.7, 5.38]}
          offsetY={-166}
          edge="rgba(255,255,255,0.45)"
          top="rgba(255,255,255,0.055)"
        />
        <AxonVolume
          bounds={[3.28, 0.48, 4.02, 4.36, 1.42, 5.38]}
          offsetY={-166}
          edge="rgba(255,255,255,0.45)"
          top="rgba(255,255,255,0.055)"
        />

        {!compact && (
          <g>
            {facadeXs.map((x, index) => (
              <AxonLine
                key={`facade-${x}`}
                from={[x, 4.82, 3.98]}
                to={[x, 4.82, 5.43]}
                offsetY={-166}
                stroke={index === 7 ? "rgba(28,128,187,0.7)" : "rgba(255,255,255,0.25)"}
                strokeWidth={index === 7 ? 1.05 : 0.72}
              />
            ))}
            <AxonLine
              from={[0.8, 4.82, 3.98]}
              to={[7.2, 4.82, 3.98]}
              offsetY={-166}
              stroke="rgba(255,255,255,0.25)"
            />
            <AxonLine
              from={[0.8, 4.82, 5.43]}
              to={[7.2, 4.82, 5.43]}
              offsetY={-166}
              stroke="rgba(255,255,255,0.25)"
            />
          </g>
        )}

        {/* Roof and integrated lighting layer. */}
        <AxonVolume
          bounds={[0.35, 0.08, 5.62, 7.72, 5.2, 5.78]}
          offsetY={-236}
          edge="rgba(255,255,255,0.44)"
          top="rgba(255,255,255,0.04)"
        />
        <AxonPolygon
          points={[
            [2.95, 1.72, 5.79],
            [4.86, 1.72, 5.79],
            [4.86, 3.58, 5.79],
            [2.95, 3.58, 5.79],
          ]}
          offsetY={-236}
          fill="rgba(23,23,23,0.72)"
          stroke="rgba(255,255,255,0.22)"
          dash="4 5"
        />
        {[1.15, 2.12, 3.1, 4.08].slice(0, compact ? 2 : 4).map((y) => (
          <AxonLine
            key={`light-${y}`}
            from={[1.2, y, 5.58]}
            to={[6.82, y, 5.58]}
            offsetY={-236}
            stroke="rgba(28,128,187,0.42)"
            strokeWidth={0.78}
          />
        ))}
        <AxonLine
          from={[0.35, 5.2, 5.79]}
          to={[7.72, 5.2, 5.79]}
          offsetY={-236}
          stroke="rgba(28,128,187,0.78)"
          strokeWidth={1.2}
        />

        {!compact && (
          <g>
            <AxonLine
              from={[8.12, -0.15, 0.1]}
              to={[8.12, -0.15, 6.05]}
              toOffsetY={-236}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={0.7}
              dash="2 7"
            />
            <AxonRegistration point={[7.72, 0.08, 5.78]} offsetY={-236} />
          </g>
        )}
      </motion.g>
    </>
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-rost-black" />
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="rost-axonometric absolute inset-0 hidden h-full w-full md:block"
        style={{ opacity: rtl ? 0.72 : 0.8 }}
      >
        <g transform={rtl ? "translate(-390 -85) scale(0.79)" : "translate(130 -85) scale(0.79)"}>
          {drawProject(false)}
        </g>
      </svg>
      <svg
        viewBox="700 60 760 820"
        preserveAspectRatio="xMidYMax meet"
        className="rost-axonometric absolute inset-0 h-full w-full md:hidden"
        style={{ opacity: rtl ? 0.24 : 0.26 }}
      >
        <g transform={rtl ? "translate(0 110) scale(0.92)" : "translate(0 60) scale(0.92)"}>{drawProject(true)}</g>
      </svg>
      {/* Architectural vignettes: isolate the headline field and the lower tier. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-rost-black via-rost-black/85 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-rost-black/80 via-rost-black/25 to-transparent" />
    </div>
  );
}

/* ----------------------------- brand mark ---------------------------------- */

function BrandMark() {
  return (
    <a
      href="#platform"
      className="group inline-flex items-center transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rost-black"
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
  /* Single mount-gated source of truth for reduced motion (see useHasMounted()).
     Gating reduce behind hasMounted makes the hydration pass deterministic across
     BOTH modes on the exact same server markup -- without it, React 19 sees
     framer-motion style-prop drift when the OS requests reduce and logs an
     attribute-level hydration mismatch (dev, error level). One frame after mount
     the flip becomes an ordinary re-render; the reveal() invariant plus the
     always-present `animate = visible` targets on the hero/header/subtitle/scroll
     cue guarantee the endpoint is reached in every order. */
  const prefersReduce = useReducedMotion();
  const hasMounted = useHasMounted();
  const reduce = Boolean(prefersReduce) && hasMounted;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [locale, setLocale] = useState<Locale>("EN");
  const t = STRINGS[locale];
  const rtl = t.dir === "rtl";
  // The hero variant objects are keyed on the reduced-motion flag only: a
  // locale toggle re-renders without rebuilding them (no animation replay),
  // while a flip of reduce swaps in the zero-duration visible target.
  const heroWrap = useMemo(() => headlineWrap(reduce), [reduce]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      // Normalised against the viewport so the axon stays responsive as the
      // document grows beyond one screen.
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  // Reflect the active content language on the translated body for screen
  // readers, so assistive tech pronounces the Persian text correctly.
  const contentLang = locale === "EN" ? "en" : "fa";

  return (
    <main className="relative bg-rost-black text-rost-white">
      {/* ====================================================================
          SEO + a11y: screen-reader-only expanded description.
          Crawlers and assistive tech get the full brand narrative, services,
          and credentials.
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

      {/* ============================ Header (always EN, dir ltr) ============================ */}
      <header className="relative z-20 mx-auto flex w-full max-w-[1480px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <BrandMark />
        </motion.div>

        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => setLocale((l) => (l === "EN" ? "FA" : "EN"))}
            className="flex items-center gap-1.5 rounded-none border border-rost-line-strong/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-rost-gray transition-colors hover:border-rost-blue/60 hover:text-rost-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rost-black"
            aria-label="Toggle language between English and Persian"
            aria-pressed={locale === "FA"}
          >
            <span
              aria-hidden
              className={`h-[5px] w-[5px] shrink-0 bg-rost-blue transition-opacity duration-300 ${
                locale === "EN" ? "opacity-100" : "opacity-0"
              }`}
            />
            <span className={locale === "EN" ? "text-rost-white" : ""} lang="en">
              EN
            </span>
            <span className="text-rost-gray/50">/</span>
            <span
              aria-hidden
              className={`h-[5px] w-[5px] shrink-0 bg-rost-blue transition-opacity duration-300 ${
                locale === "FA" ? "opacity-100" : "opacity-0"
              }`}
            />
            <span className={locale === "FA" ? "text-rost-white" : ""} lang="fa" dir="rtl">
              فا
            </span>
          </button>
          <a
            href="#role"
            className="hidden items-center gap-1.5 rounded-none bg-rost-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-rost-black transition-all hover:bg-rost-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rost-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rost-black sm:inline-flex"
          >
            Experience our role
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </motion.div>
      </header>

      {/* ============================ Translated document body ============================ */}
      <div dir={rtl ? "rtl" : "ltr"} lang={contentLang} className={`relative ${rtl ? "font-persian" : ""}`}>
        {/* ============================ 0 · Hero (translated) ============================ */}
        <section
          id="service"
          className="relative flex min-h-[calc(100svh-5.5rem)] flex-col"
          aria-labelledby="hero-heading"
        >
          <BlueprintBackdrop mx={mx} my={my} rtl={rtl} />

          {/* Headline + subtitle read as one editorial block, vertically
              centered in the hero field between the header band and the
              viewport bottom: display type with a discreet annotation
              caption on the shared start edge. */}
          <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-center pb-[4vh] px-5 md:px-10">
            <h1
              id="hero-heading"
              className={`max-w-[40ch] text-rost-white ${
                rtl
                  ? "text-[clamp(2.4rem,5.6vw,5.2rem)] leading-[1.35] font-black"
                  : "font-sans text-[clamp(2.1rem,4.9vw,4.6rem)] leading-[1.04] font-bold tracking-[-0.01em]"
              }`}
            >
              <span className="block">
                <motion.span variants={heroWrap} initial="hidden" animate="show">
                  {t.headlineLine1.split(" ").map((w, i) => (
                    <Word key={`l1-${i}`} rtl={rtl} reduce={reduce}>
                      {w}
                    </Word>
                  ))}
                </motion.span>
              </span>

              <span className="block">
                <motion.span variants={heroWrap} initial="hidden" animate="show">
                  {t.headlineLine2.split(" ").map((w, i) => (
                    <Word key={`l2-${i}`} rtl={rtl} reduce={reduce}>
                      {w}
                    </Word>
                  ))}
                </motion.span>
              </span>

              <span className="block">
                <motion.span variants={heroWrap} initial="hidden" animate="show">
                  {t.headlineLine3Plain ? (
                    <Word key="l3-p" rtl={rtl} reduce={reduce}>
                      {t.headlineLine3Plain}
                    </Word>
                  ) : null}
                  {t.headlineLine3Accent.map((w, i) => (
                    <Word key={`l3-a-${i}`} accent rtl={rtl} reduce={reduce}>
                      {w}
                    </Word>
                  ))}
                </motion.span>
              </span>
            </h1>

            {/* Subtitle carries the old lower tier's entrance treatment:
                fade + small rise, delayed past the word-rise. Reduced
                motion keeps the identical prop shape -- visible initial
                state, zero-duration transition -- never dropped props. */}
            <motion.p
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduce ? { duration: 0 } : { delay: 1.4, duration: 0.9, ease: EASE }
              }
              className={`mt-6 max-w-[52ch] text-rost-annotation md:mt-8 ${
                rtl
                  ? "text-[15px] leading-[1.9] md:text-[16.5px]"
                  : "text-sm leading-relaxed md:text-[15px]"
              }`}
            >
              {t.heroCopy}
            </motion.p>
          </div>

          {/* Scroll cue: a falling hairline annotation, not a bouncing chevron */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              reduce ? { duration: 0 } : { delay: 2.05, duration: 1 }
            }
            className="relative z-10 flex flex-col items-center gap-2.5 pb-4"
            aria-hidden
          >
            <span className={`rost-track text-[9px] uppercase text-rost-annotation ${rtl ? "font-medium" : ""}`}>
              {t.scroll}
            </span>
            <span className="rost-cue-line block h-9 w-px bg-gradient-to-b from-rost-white/45 to-transparent" />
          </motion.div>
        </section>
        {/* ============================ 01 · Platform ============================ */}
        <DocSection headingId="platform-heading" index="01" label={t.labelPlatform} rtl={rtl}>
          <motion.div {...reveal(reduce, 0, 0.05)}>
            <h2
              id="platform-heading"
              className={`max-w-[24ch] text-rost-white ${
                rtl
                  ? "text-[clamp(1.95rem,5vw,3.9rem)] leading-[1.4] font-extrabold"
                  : "font-sans text-[clamp(1.8rem,4.6vw,4.5rem)] leading-[1.08] font-medium tracking-[-0.01em]"
              }`}
            >
              {t.platformPre}
              <span className={rtl ? "text-rost-blue" : "font-display italic text-rost-blue"}>
                {t.platformAccent}
              </span>
              {t.platformPost}
            </h2>
          </motion.div>

          <motion.p
            {...reveal(reduce, 1, 0.05)}
            className={`mt-8 max-w-[62ch] text-rost-gray md:mt-10 ${
              rtl
                ? "text-[15px] leading-[2] md:text-[17px]"
                : "text-[15px] leading-relaxed md:text-[16.5px] md:leading-relaxed"
            }`}
          >
            {t.platformBody}
          </motion.p>

          {/* Bilingual footnote: the name, drawn in both scripts */}
          <motion.div
            {...reveal(reduce, 2, 0.05)}
            className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-rost-line pt-9 md:mt-20"
          >
            <span
              lang="fa"
              dir="rtl"
              aria-hidden
              className="font-persian text-[clamp(4rem,7vw,6rem)] leading-none font-light text-rost-blue"
            >
              رست
            </span>
            <p
              className={`max-w-[52ch] ${
                rtl
                  ? "text-[15px] leading-[2] text-rost-gray md:text-[16.5px]"
                  : "font-display text-lg italic text-rost-white/60 md:text-xl"
              }`}
            >
              {t.platformEtym}
            </p>
          </motion.div>
        </DocSection>

        {/* ============================ 02 · The Role ============================ */}
        <DocSection id="role" headingId="role-heading" index="02" label={t.labelRole} rtl={rtl}>
          <motion.h2
            {...reveal(reduce, 0, 0)}
            id="role-heading"
            className={`text-rost-white ${
              rtl
                ? "text-[clamp(2rem,5.2vw,4.6rem)] leading-[1.35] font-black"
                : "font-sans text-[clamp(2.1rem,5.9vw,5.6rem)] leading-[1.04] font-bold uppercase tracking-[0.01em]"
            }`}
          >
            {t.roleTitle}
          </motion.h2>

          <motion.p
            {...reveal(reduce, 1, 0)}
            className={`mt-6 max-w-[58ch] text-rost-blue md:mt-8 ${
              rtl
                ? "text-lg leading-[1.9] font-light md:text-[1.45rem]"
                : "font-display text-xl italic md:text-[1.6rem]"
            }`}
          >
            {t.roleFramework}
          </motion.p>

          <motion.p
            {...reveal(reduce, 2, 0)}
            className={`mt-7 max-w-[64ch] text-rost-gray md:mt-9 ${
              rtl
                ? "text-[15px] leading-[2] md:text-[17px] md:leading-[2]"
                : "text-base leading-relaxed"
            }`}
          >
            {t.roleStatement}
          </motion.p>

          {/* The RIBA stages stack: pure typography on a datum line. */}
          <StageList
            names={t.stages}
            descs={t.stageDescriptions}
            rtl={rtl}
            reduce={reduce}
          />
        </DocSection>
        {/* ============================ 03 · Departments ============================ */}
        <DocSection headingId="dept-heading" index="03" label={t.labelDepartments} rtl={rtl}>
          <motion.h2
            {...reveal(reduce, 0, 0)}
            id="dept-heading"
            className={`max-w-[52ch] text-rost-white/85 ${
              rtl
                ? "text-lg font-medium leading-[1.9] md:text-2xl md:leading-[1.8]"
                : "text-xl font-medium md:text-[1.7rem]"
            }`}
          >
            {t.departmentsIntro}
          </motion.h2>

          {/* Plate A — ROST LIGHTING */}
          <motion.div
            {...reveal(reduce, 1, 0)}
            className="mt-14 border-b border-rost-line-strong/40 pb-16 md:mt-20 md:pb-20"
          >
            <h3
              className={`text-rost-white ${
                rtl
                  ? "text-[clamp(2.1rem,5.6vw,4.6rem)] leading-[1.3] font-black"
                  : "font-sans text-[clamp(2.5rem,5.9vw,5rem)] leading-[1.02] font-bold uppercase tracking-[0.015em]"
              }`}
            >
              {t.plateNameA}
            </h3>
            {/* The light line — one deliberate nod to the lighting department. */}
            <motion.span
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 1.15, ease: EASE, delay: 0.25 }
              }
              className="mt-6 block h-px w-full origin-left bg-rost-blue/60 rtl:origin-right md:mt-7"
              aria-hidden
            />
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 md:mt-8">
              <p className={`text-sm text-rost-gray ${rtl ? "leading-[1.9]" : ""}`}>{t.plateDescA}</p>
              <p
                className={
                  rtl
                    ? "text-[1.35rem] font-light text-rost-blue md:text-[1.75rem]"
                    : "font-display text-xl italic text-rost-blue md:text-2xl"
                }
              >
                {t.plateTagA}
              </p>
            </div>
          </motion.div>

          {/* Plate B — ROST TRIP */}
          <motion.div {...reveal(reduce, 2, 0)} className="pt-14 md:pt-16">
            <h3
              className={`text-rost-white ${
                rtl
                  ? "text-[clamp(2.1rem,5.6vw,4.6rem)] leading-[1.3] font-black"
                  : "font-sans text-[clamp(2.5rem,5.9vw,5rem)] leading-[1.02] font-bold uppercase tracking-[0.015em]"
              }`}
            >
              {t.plateNameB}
            </h3>
            {/* Shared plate anatomy: below the identical title block, the same
                full-width datum rule geometry as the LIGHTING plate -- there
                the ROST BLUE light line keeps its draw, here the standard
                gray hairline -- and the identical row below it: descriptor at
                the start-edge, tagline flush the end-edge, in both locales. */}
            <span className="mt-6 block h-px w-full bg-rost-line-strong md:mt-7" aria-hidden />
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 md:mt-8">
              <p className={`text-sm text-rost-gray ${rtl ? "leading-[1.9]" : ""}`}>{t.plateDescB}</p>
              <p
                className={
                  rtl
                    ? "text-[1.35rem] font-light text-rost-blue md:text-[1.75rem]"
                    : "font-display text-xl italic text-rost-blue md:text-2xl"
                }
              >
                {t.plateTagB}
              </p>
            </div>
          </motion.div>
        </DocSection>

        {/* ============================ 04 · Network ============================ */}
        <DocSection headingId="net-heading" index="04" label={t.labelNetwork} rtl={rtl}>
          <h2 id="net-heading" className="sr-only">
            {t.networkHeading}
          </h2>

          {/* Typographic monuments: the hero stats, repeated at full weight. */}
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-0">
            <motion.div {...reveal(reduce, 0, 0)} className="md:pe-12 lg:pe-20">
              <p
                dir="ltr"
                className={`text-[clamp(5rem,11.5vw,11.5rem)] leading-[0.82] text-rost-white ${
                  rtl ? "font-extrabold" : "font-sans font-bold tracking-[-0.02em]"
                }`}
              >
                {t.stat1Number}
              </p>
              <span className="mt-2 block h-[2px] w-10 bg-rost-blue" aria-hidden />
              <p className={`rost-track mt-3 text-[11px] uppercase text-rost-annotation md:text-xs ${rtl ? "text-sm font-medium" : ""}`}>
                {t.stat1}
              </p>
            </motion.div>

            <motion.div
              {...reveal(reduce, 1, 0.08)}
              className="md:border-s md:border-rost-line-strong md:ps-12 lg:ps-20"
            >
              <p
                dir="ltr"
                className={`text-[clamp(5rem,11.5vw,11.5rem)] leading-[0.82] text-rost-white ${
                  rtl ? "font-extrabold" : "font-sans font-bold tracking-[-0.02em]"
                }`}
              >
                {t.stat2Number}
              </p>
              <span className="mt-2 block h-[2px] w-10 bg-rost-blue" aria-hidden />
              <p className={`rost-track mt-3 text-[11px] uppercase text-rost-annotation md:text-xs ${rtl ? "text-sm font-medium" : ""}`}>
                {t.stat2}
              </p>
            </motion.div>
          </div>

          {/* Network index: one typographic line, hairline above and below. */}
          <motion.ul
            {...reveal(reduce, 2, 0.05)}
            className="mt-16 flex list-none flex-wrap items-baseline gap-x-10 gap-y-4 border-y border-rost-line-strong/40 py-6 md:mt-24 md:gap-x-14"
          >
            {t.networkCountries.map((country, i) => (
              <li
                key={`net-${country}`}
                className="flex items-baseline gap-x-3 whitespace-nowrap text-[11px] md:text-xs"
              >
                <span className={`rost-track uppercase text-rost-white ${rtl ? "font-bold" : "font-semibold"}`}>
                  {country}
                </span>
                <span className="text-rost-blue" aria-hidden>
                  —
                </span>
                <span className={`rost-track uppercase text-rost-annotation ${rtl ? "font-medium" : ""}`}>
                  {t.networkRoles[i]}
                </span>
              </li>
            ))}
          </motion.ul>
        </DocSection>
      </div>

      {/* ============================ Footer — drawing title block (always EN) ============================ */}
      <footer
        id="contact"
        className="relative z-20 border-t border-rost-line-strong/40 bg-rost-black"
        aria-labelledby="contact-heading"
      >
        <h2 id="contact-heading" className="sr-only">
          Contact ROST PLATFORM
        </h2>
        <div className="mx-auto w-full max-w-[1480px] px-5 py-10 md:px-10 md:py-12" dir="ltr">
          {/* Office annotations — three columns of small print on the sheet grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-7 border-b border-rost-line pb-9 sm:grid-cols-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-rost-blue/90">London</p>
              <p className="mt-2.5 text-xs leading-relaxed text-rost-gray">
                Unit 13 Warham Rd
                <br />
                London, England
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-rost-gray">Mashhad</p>
              <p className="mt-2.5 text-xs leading-relaxed text-rost-gray">
                Unit 1, No-23, 2nd Kamal-ol-molk
                <br />
                Mashhad, Iran
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-rost-gray">Tehran</p>
              <p className="mt-2.5 text-xs leading-relaxed text-rost-gray">
                Unit 309, Queen Center, Fereshteh St
                <br />
                Tehran, Iran
              </p>
            </div>
          </div>

          {/* Legal + registration line */}
          <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <address className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[11px] not-italic text-rost-gray">
              <span className="font-display font-medium tracking-[0.18em] text-rost-white">
                ROST PLATFORM LTD
              </span>
              <a
                href="https://www.rostplatform.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-rost-white hover:underline focus-visible:outline-none focus-visible:text-rost-white focus-visible:underline"
              >
                www.rostplatform.com
              </a>
              <a
                href="mailto:info@rostplatform.com"
                className="underline-offset-4 transition-colors hover:text-rost-white hover:underline focus-visible:outline-none focus-visible:text-rost-white focus-visible:underline"
              >
                info@rostplatform.com
              </a>
              <a
                href="tel:+447386296171"
                className="underline-offset-4 transition-colors hover:text-rost-white hover:underline focus-visible:outline-none focus-visible:text-rost-white focus-visible:underline"
              >
                +44 73 86 296 171
              </a>
            </address>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[11px] text-rost-gray">
              <span>© 2026 ROST PLATFORM LTD · Company No. 16445406</span>
              <a
                href="https://instagram.com/rostplatform"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-rost-white hover:underline focus-visible:outline-none focus-visible:text-rost-white focus-visible:underline"
                aria-label="ROST PLATFORM on Instagram — @rostplatform"
              >
                @rostplatform
              </a>
              <a
                href="#platform"
                className="text-[10px] uppercase tracking-[0.28em] underline-offset-4 transition-colors hover:text-rost-white hover:underline focus-visible:outline-none focus-visible:text-rost-white focus-visible:underline"
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
