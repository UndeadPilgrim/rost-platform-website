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
  capabilitiesA: string[];
  capabilitiesB: string[];
  complementA: string;
  complementB: string;
  plateTagA: string;
  plateTagB: string;
  captionA: string;
  captionB: string;
  // 04 · Network
  networkHeading: string;
  networkIntro: string;
  networkCountries: string[];
  networkRoles: string[];
}

const STRINGS: Record<Locale, Dict> = {
  EN: {
    dir: "ltr",
    headlineLine1: "A MULTIDISCIPLINARY PLATFORM",
    headlineLine2: "FOR GUIDING DEVELOPMENT",
    headlineLine3Plain: "IN",
    headlineLine3Accent: ["THE", "BUILT", "ENVIRONMENT"],
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
      "Projects rarely fail for lack of design; they lose value when decisions drift apart. ROST PLATFORM sits at the core of the project — connecting the client's team, our specialist departments, and an expansive network of experts — so strategic coherence survives and the asset's long-term worth is protected.",
    platformEtym:
      "«Rost» — an authentic Persian word evoking growth, development, flourishing.",
    roleTitle: "Strategic Design Advisor",
    roleFramework:
      "Aligned with the RIBA Plan of Work 2020 and the RIBA Client Adviser role.",
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
      "One parent brand — complementary specialist departments",
    plateNameA: "Rost Lighting",
    plateNameB: "Rost Trip",
    capabilitiesA: [
      "Design & Consultation — concepts that carry the project's identity",
      "Calculations & Engineering — buildable, standard-compliant, sustainable",
      "Equipment Design & Supply — specified for the project, not the catalogue",
      "Light Art & Education — events, installations, and training programs",
    ],
    capabilitiesB: [
      "Custom Trip — end-to-end planning and full delivery, built around you",
      "Signature Trips — pre-designed journeys in small, focused groups",
      "Itinerary Design — a precise, professional plan, without our operations",
      "Research & Access — trusted sources, field insight, local connections",
    ],
    complementA:
      "Light as a foundational discipline of architecture — shaping how space, atmosphere, and identity are perceived, through international experience, precise technical knowledge, and an interdisciplinary approach.",
    complementB:
      "Deep insight into global architecture cannot come from print — it is lived. ROST TRIP is the strategic answer: experiential, specialized journeys that transfer firsthand understanding to decision-makers, professionals, and leading architects.",
    plateTagA: "Light, the narrative of architecture.",
    plateTagB: "Travel & Experience.",
    captionA: "Armitaj Residential Tower — Mashhad",
    captionB: "Kyoto Study Program — Japan, 2023",
    networkHeading: "Global network",
    networkIntro: "Offices, partners, and specialists — one network behind the role.",
    networkCountries: ["Iran", "UK", "UAE", "China", "Brazil"],
    networkRoles: ["Headquarters", "Office", "Office", "Partner", "Partner"],
  },
  FA: {
    dir: "rtl",
    headlineLine1: "پلتفرمی چندرشته‌ای",
    headlineLine2: "برای راهبری توسعه در",
    headlineLine3Plain: "",
    headlineLine3Accent: ["معماری", "و", "ساخت"],
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
      "پروژه‌ها به‌ندرت از کمبود طراحی شکست می‌خورند؛ آن‌ها وقتی ارزش می‌بازند که تصمیم‌ها واگر می‌شوند. رست پلتفرم در هسته پروژه قرار دارد — تیم کارفرما، دپارتمان‌های تخصصی و شبکه گسترده متخصصان را به هم پیوند می‌دهد — تا انسجام راهبردی از دست نرود و ارزش بلندمدت دارایی محفوظ بماند.",
    platformEtym:
      "«رست» واژه‌ای اصیل فارسی است که مفاهیم رشد، توسعه و شکوفایی را تداعی می‌کند.",
    roleTitle: "مشاور استراتژیک طرح",
    roleFramework:
      "هم‌راستا با RIBA Plan of Work 2020 و نقش RIBA Client Adviser.",
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
      "یک برند مادر — دپارتمان‌های تخصصی مکمل",
    plateNameA: "رست لایتینگ",
    plateNameB: "رست تریپ",
    capabilitiesA: [
      "طراحی و مشاوره نور — کانسپت‌هایی که هویت پروژه را حمل می‌کنند",
      "محاسبات و مهندسی روشنایی — قابل ساخت، منطبق با استاندارد، پایدار",
      "طراحی و تأمین تجهیزات — انتخاب برای پروژه، نه کاتالوگ",
      "لایت‌آرت و آموزش — رویدادها، اینستالیشن و برنامه‌های آموزشی",
    ],
    capabilitiesB: [
      "سفر سفارشی — برنامه‌ریزی و اجرای صفر تا صد، بر پایه نیاز شما",
      "سفرهای اختصاصی — سفرهای از پیش طراحی‌شده در گروه‌های محدود",
      "مشاوره و طراحی مسیر — برنامه‌ای دقیق و حرفه‌ای، بدون نیاز به حضور ما",
      "تحقیق و دسترسی — منابع معتبر، تجربه میدانی، ارتباطات محلی",
    ],
    complementA:
      "نور نه ابزار روشنایی، بلکه دیسیپلینی بنیادین در معماری است — عنصری که کیفیت ادراک فضا، اتمسفر و هویت بنا را شکل می‌دهد؛ حاصل تجربه بین‌المللی، دانش فنی دقیق و نگرش میان‌رشته‌ای.",
    complementB:
      "بینش عمیق از معماری جهانی بدون تجربه زیسته ممکن نیست — رست تریپ پاسخی استراتژیک به این نیاز است: سفرهای تجربه‌گرایانه و تخصصی برای مدیران، متخصصان و معماران برجسته.",
    plateTagA: "نور، روایت معماری.",
    plateTagB: "سفر و تجربه.",
    captionA: "برج مسکونی ارمیتاژ — مشهد",
    captionB: "برنامه مطالعاتی کیوتو — ژاپن، ۲۰۲۳",
    networkHeading: "شبکه جهانی",
    networkIntro: "دفاتر، پارتنرها و متخصصان — یک شبکه در خدمت این نقش.",
    networkCountries: ["ایران", "انگلستان", "امارات", "چین", "برزیل"],
    networkRoles: ["دفتر مرکزی", "دفتر", "دفتر", "پارتنر", "پارتنر"],
  },
};

/* FA optical fit: Yekan Bakh's Latin glyphs read larger than its Persian
   script at the same point size, so Latin runs inside a Persian line are
   set at 75% (empirically matched against the Persian letter band —
   confirmed visually at 0.7/0.75/0.8/1.0; see item-3 refinement notes).
   EN rendering is all-Latin and passes through untouched. Latin runs keep
   dir="ltr" per the drafting convention (numerals and codes stay Latin). */
function fitFaLatin(text: string): ReactNode {
  return text
    .split(/([A-Za-z0-9][A-Za-z0-9 .]*[A-Za-z0-9])/g)
    .map((part, i) =>
      /[A-Za-z0-9]/.test(part) ? (
        <span key={i} dir="ltr" className="inline-block text-[0.75em] leading-[1.1]">
          {part}
        </span>
      ) : (
        part
      )
    );
}

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
 * composition. Layer 2: single-focus activation -- by default the parent
 * StageList lights the highest row whose top edge has crossed a reading
 * line at 44% of the viewport height, passing it down as `active`, so
 * exactly one row is ever lit: its numeral takes full ROST BLUE, the
 * title brightens to full white and lifts 3px (translate only, never a
 * layout property) and its description reaches full opacity while quiet
 * neighbours recess to a clearly subordinate 0.2 / white-60. Hover stays
 * an affordance only: a hovered quiet title tops out at white-90 without
 * lift, so it can never out-weigh the active row. Descriptions are always
 * in the DOM and always in flow, so nothing shifts and SEO/a11y content
 * never disappears.
 *
 * Click-to-activate: a stretched transparent button (last child, covering
 * the row) calls onActivate(index), letting a reader pin any visible stage
 * without scrolling; the parent releases the pin when the scroll-derived
 * crossing reaches or passes it, when the row leaves the viewport, or when
 * the stack leaves view. aria-current="step" marks the lit row for AT.
 *
 * Reduced-motion invariant (the reveal() guard): the activation result is
 * hard-gated off under reduce -- no activation or pinning behavior at all
 * -- and the class values collapse to the approved static look: Stage 0
 * numeral blue, every description at full opacity, no lift. The overlay
 * button is still rendered (prop-shape discipline) but unfocusable and
 * aria-hidden, so it is silent. The rendered prop SHAPE is identical in
 * both modes, so a late flip of useReducedMotion() can never strand a row
 * dimmed or lifted out of view.
 */
function StageRow({
  index,
  name,
  desc,
  rtl,
  reduce,
  active,
  onActivate,
}: {
  index: number;
  name: string;
  desc: string;
  rtl: boolean;
  reduce: boolean;
  active: boolean;
  onActivate: (index: number) => void;
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
        aria-current={lit ? "step" : undefined}
        className="group relative grid cursor-pointer grid-cols-[3.5rem_1fr] items-baseline gap-x-6 border-b border-rost-line py-6 last:border-b-0 md:grid-cols-[8.5rem_1fr] md:gap-x-10 md:py-8"
      >
        <span
          dir="ltr"
          className={`font-display text-5xl leading-[0.85] font-semibold tracking-tight transition-colors duration-[450ms] md:text-7xl ${
            numeralBlue
              ? "text-rost-blue"
              : "text-rost-white/12 group-hover:text-rost-white/45"
          }`}
        >
          {index}
        </span>
        <div className="min-w-0">
          <span
            className={`block transition-[transform,translate,color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              lit
                ? "-translate-y-[3px] text-rost-white"
                : "translate-y-0 text-rost-white/60 group-hover:text-rost-white/90"
            } ${
              rtl
                ? "text-lg leading-[1.7] font-medium md:text-[1.7rem] md:leading-[1.55]"
                : "text-base font-medium tracking-[0.12em] uppercase md:text-2xl md:tracking-[0.14em]"
            }`}
          >
            {name}
          </span>
          <p
            className={`mt-1.5 text-rost-annotation transition-opacity duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              rtl
                ? "text-[14px] leading-[1.9] md:text-[15px]"
                : "text-sm max-w-[52ch]"
            } ${lit || staticLook ? "opacity-100" : "opacity-[0.2]"}`}
          >
            {desc}
          </p>
        </div>
        {/* Stretched transparent overlay: the whole row is the tap/click
            target. focus-visible:outline-none is deliberately absent so the
            site-wide blue button ring (globals.css base layer) draws around
            the row; the global :focus-visible reset is not enough because a
            utility-layer outline-none would override it. */}
        <button
          type="button"
          aria-label={`${index} — ${name}`}
          onClick={() => onActivate(index)}
          tabIndex={reduce ? -1 : 0}
          aria-hidden={reduce || undefined}
          className="absolute inset-0 cursor-pointer rounded-none"
        />
      </motion.div>
    </li>
  );
}

/* The reading line, as a fraction of viewport height, whose crossing lights
   a stage row: slightly above the middle so a row activates exactly when
   its title arrives in the reading zone, not when its rect center passes. */
const STAGE_READING_LINE_RATIO = 0.44;

/**
 * The RIBA stage stack (section 02) with single-focus activation.
 *
 * Crossing-trigger governs by default: on each rAF-throttled frame after a
 * scroll or resize, the active index is the HIGHEST row whose top edge has
 * crossed a reading line positioned at 44% of the viewport height. Rows are
 * contiguous and ordered, so that index is a pure function of scroll
 * position: a row lights exactly as its title reaches the reading line,
 * stopping between stages keeps the last crossed row lit, backward scroll
 * unwinds one crossing at a time, and no position can oscillate between two
 * winners. Before the first row crosses the line, activeIndex stays -1 and
 * every row holds the quiet state -- the honest "not arrived yet" reading
 * of the stack.
 *
 * A click pins the displayed stage without scrolling (activate): the pin
 * keeps that row lit while the scroll-derived index stays below it, and
 * releases silently when the crossing reaches or passes the pinned index,
 * when the pinned row is fully outside the viewport, or when the stack
 * leaves view (the whole computation is gated on the list container
 * intersecting the viewport -- one useInView with a -10% edge margin -- so
 * rows stay quiet until the stack actually scrolls in and revert when it
 * has fully passed). The pin lives in a ref mirrored by state so compute()
 * never reads state inside an updater. Reduced motion: no crossing, no
 * pinning, static look.
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
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  const pinnedRef = useRef<number | null>(null);

  /* A click pins the displayed stage exactly as if the scroll had reached
     it -- no scroll movement, no scrollIntoView. Gated off under reduce,
     where the static look holds and no activation exists. */
  const activate = (i: number) => {
    if (reduce) return;
    pinnedRef.current = i;
    setPinnedIndex(i);
    setActiveIndex(i);
  };

  /* Leaving view clears a stale pin so a re-entry resumes pure
     crossing-driven behavior. */
  useEffect(() => {
    if (!inView && (pinnedIndex !== null || pinnedRef.current !== null)) {
      pinnedRef.current = null;
      setPinnedIndex(null);
    }
  }, [inView, pinnedIndex]);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const list = listRef.current;
      if (!list) return;
      const readingLine = window.innerHeight * STAGE_READING_LINE_RATIO;
      /* Rows are contiguous and ordered, so every row above the deepest
         crossed one has crossed too: scanning top-to-bottom and keeping
         the last row whose top edge sits at or above the reading line
         yields the highest crossed index -- a pure function of scroll
         position, so any given position maps to exactly one state and
         activation cannot flicker. -1 means nothing has arrived yet. */
      let crossed = -1;
      Array.from(list.children).forEach((row, i) => {
        if (row.getBoundingClientRect().top <= readingLine) crossed = i;
      });
      let displayed = crossed;
      if (pinnedRef.current !== null) {
        const pinned = pinnedRef.current;
        const row = list.children[pinned] as HTMLElement | undefined;
        const rect = row?.getBoundingClientRect();
        const outOfView =
          !rect || rect.bottom < 0 || rect.top > window.innerHeight;
        if (crossed >= pinned || outOfView) {
          /* Scroll caught up with or passed the pin, or the pinned row is
             gone: release and let the crossing drive again. */
          pinnedRef.current = null;
          setPinnedIndex(null);
        } else {
          displayed = pinned;
        }
      }
      setActiveIndex((prev) => (prev === displayed ? prev : displayed));
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
          onActivate={activate}
        />
      ))}
    </ol>
  );
}

/* --------------------------- 04 · network map ------------------------------ */

/**
 * The handmade world map as section 04's central visual, with one drafting
 * annotation per verified location.
 *
 * Markers are percent-positioned on the image box (calibrated against the
 * supplied 1104x640 geometry -- no JS measurement): a small ROST BLUE dot
 * with a thin white/70 ring, a hairline leader, and an always-visible
 * uppercase label (white country over annotation-gray role). Leader
 * directions are distributed per marker (up-left / up / up-right /
 * down-right) so the IRAN, UAE and CHINA labels cannot collide at either
 * tested viewport.
 *
 * The whole map block is forced dir="ltr": geography never mirrors, while
 * each label text keeps its natural script via dir="auto" (Persian names in
 * FA stay Persian on the Latin-oriented container). The image is decorative
 * (alt=""): the sr-only section heading plus the five marker buttons carry
 * the content; every marker is a focusable button with a localized
 * "<country> — <role>" aria-label and a 24px hit area.
 *
 * Emphasis is one shared active-index state driven identically by hover and
 * keyboard focus (pointerenter/focus set, pointerleave/blur clear -- with
 * pointer-type gating so Chromium's synthetic post-tap mouseleave cannot
 * wipe a touch selection; click or tap sets, a click on the map background
 * clears), so no information is hover-only: the active dot scales 1.35 and
 * its role line goes full white while the others recess to 60% opacity.
 * Under reduced motion the same state and the same prop shape hold -- only
 * the transition duration collapses to zero, so the resting look is
 * identical to the static look.
 */
const NETWORK_MARKERS = [
  { x: 65.0, y: 34.0, place: "up-right" }, // Iran — Headquarters
  { x: 43.5, y: 22.5, place: "up-left" }, // UK — Office (central England; the previous London-precise dot read as northern France at map scale)
  { x: 63.5, y: 42.5, place: "up-left" }, // UAE — Office (label offset left of its riser)
  { x: 80.5, y: 39.0, place: "down-right" }, // China — Partner (east coast; below: up-right would collide with Iran's label at 390px)
  { x: 30.0, y: 68.0, place: "up" }, // Brazil — Partner
] as const;

/* Stack anchor + flex order; the leader sits nearest the dot in every
   direction (flex-col puts it last above, flex-col-reverse first below).
   align mirrors the stack edge so the two label lines stack flush the same
   side as their riser. */
const MARKER_STACK: Record<
  (typeof NETWORK_MARKERS)[number]["place"],
  { stack: string; align: string }
> = {
  up: {
    stack: "bottom-[calc(50%+7px)] left-1/2 -translate-x-1/2 flex-col items-center",
    align: "items-center",
  },
  "up-right": {
    stack: "bottom-[calc(50%+7px)] left-[7px] flex-col items-start",
    align: "items-start",
  },
  "up-left": {
    stack: "bottom-[calc(50%+7px)] right-[7px] flex-col items-end",
    align: "items-end",
  },
  "down-right": {
    stack: "top-[calc(50%+7px)] left-[7px] flex-col-reverse items-start",
    align: "items-start",
  },
};

function NetworkMap({
  countries,
  roles,
  rtl,
  reduce,
}: {
  countries: string[];
  roles: string[];
  rtl: boolean;
  reduce: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const ease = reduce ? "duration-0" : "duration-300";
  return (
    <div
      ref={mapRef}
      dir="ltr"
      className="relative mt-12 md:mt-16"
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("button")) setActive(null);
      }}
    >
      <Image
        src="/network/world-map.png"
        alt=""
        width={1104}
        height={640}
        sizes="(min-width: 1280px) 1216px, (min-width: 1024px) 760px, (min-width: 768px) 528px, calc(100vw - 40px)"
        className="h-auto w-full opacity-90"
      />
      {NETWORK_MARKERS.map((m, i) => {
        const isActive = active === i;
        const dimmed = active !== null && !isActive;
        const place = MARKER_STACK[m.place];
        return (
          <div
            key={`marker-${countries[i]}`}
            className="absolute"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute flex flex-col gap-1.5 transition-opacity ${ease} ease-[cubic-bezier(0.22,1,0.36,1)] ${
                dimmed ? "opacity-60" : "opacity-100"
              } ${place.stack}`}
            >
              <span className={`flex flex-col gap-0.5 ${place.align}`}>
                <span
                  dir="auto"
                  className={`rost-track text-[10px] uppercase leading-[1.35] text-rost-white ${rtl ? "font-bold" : "font-semibold"}`}
                >
                  {countries[i]}
                </span>
                <span
                  dir="auto"
                  className={`rost-track text-[10px] uppercase leading-[1.35] transition-colors ${ease} ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? "text-rost-white" : "text-rost-annotation"
                  } ${rtl ? "font-medium" : ""}`}
                >
                  {roles[i]}
                </span>
              </span>
              <span className="h-7 w-px bg-rost-white/70" />
            </div>
            <button
              type="button"
              aria-label={`${countries[i]} — ${roles[i]}`}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActive(i);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType !== "mouse") return;
                // Keyboard focus keeps precedence over a departing hover:
                // restore emphasis to the focused marker, if any.
                const focused = Array.from(
                  mapRef.current?.querySelectorAll("button") ?? [],
                ).findIndex((button) => button === document.activeElement);
                setActive(focused >= 0 ? focused : null);
              }}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(i)}
              className={`absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-[scale,opacity] ${ease} ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? "scale-[1.35]" : "scale-100"
              } ${dimmed ? "opacity-60" : "opacity-100"}`}
            >
              <span
                aria-hidden
                className="h-[9px] w-[9px] rounded-full bg-rost-blue ring-1 ring-rost-white/70"
              />
            </button>
          </div>
        );
      })}
    </div>
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

/* --------------------------- capability list --------------------------------
 * One plate's four capability rows: hairline-ruled ledger entries (border-b on
 * every row, border-t on the first). On md+ the list stretches to the paired
 * image's height and the four rows become equal bands (flex-1 with the
 * baseline numeral+text pair vertically centered inside each band), so the
 * first and last hairlines sit exactly on the image's top and bottom edges
 * and the two columns read as one integrated plate; on mobile the list stays
 * normal flow with py-5 rows. Index numerals carry ps clearance from the row
 * rule, stay Latin dir=ltr in EN, and render as Persian digits (۰۱–۰۴) in FA.
 * Rows are PLAIN DIVS — nothing here is a link, so the
 * list adds no tab stops; the progressive disclosure is hover-only
 * (focus-visible can never match a non-focusable div). The hover emphasis is
 * color/border only — never a lift — and under reduce the CSS transitions
 * collapse to duration 0 (the class SHAPE stays identical: SSR and the first
 * client render both see the non-reduce branch via useHasMounted gating).
 */

function CapabilityList({
  items,
  rtl,
  reduce,
}: {
  items: string[];
  rtl: boolean;
  reduce: boolean;
}) {
  const ease = reduce ? "duration-0" : "duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";
  const faNumerals = ["۰۱", "۰۲", "۰۳", "۰۴"];
  return (
    <div className="md:flex md:h-full md:flex-col">
      {items.map((cap, i) => (
        <motion.div
          key={cap}
          {...reveal(reduce, i, 0)}
          className={`group flex border-b border-s-2 border-s-transparent py-5 transition-colors ${ease} hover:border-s-rost-blue md:flex-1 md:items-center md:py-0 ${i === 0 ? "border-t" : ""}`}
        >
          <div className="flex items-baseline gap-4">
            <span
              dir={rtl ? undefined : "ltr"}
              className={`shrink-0 ps-1 font-display text-xs tracking-widest text-rost-blue/80 transition-colors md:ps-2 ${ease} group-hover:text-rost-blue`}
            >
              {rtl ? faNumerals[i] : String(i + 1).padStart(2, "0")}
            </span>
            <p
              className={`text-[15px] text-rost-white/90 transition-colors ${ease} md:text-base ${rtl ? "leading-[1.9]" : "leading-relaxed"} group-hover:text-rost-white`}
            >
              {cap}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
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

  /* Stage ladder ticks sit on each layer's base plane, in group space
     (projected coordinates on the x=8.12 registration axis). */
  const stageLadder = [
    { y: 696, label: "0–1" }, // site & brief — Strategic Definition, Preparation
    { y: 646, label: "2–3" }, // structure — Concept, Spatial Coordination
    { y: 493, label: "4" }, // spatial volumes — Technical Design
    { y: 356, label: "5" }, // envelope — Construction
    { y: 215, label: "6–7" }, // roof & light — Handover, Use
  ];

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

            {/* Stage ladder: the five exploded planes map remotely to the RIBA
                Plan of Work stages 0-7 along the registration axis - a silent
                drafting annotation on the sheet, not a process diagram.
                direction ltr keeps SVG text anchoring stable when the FA
                toggle flips the hero wrapper to RTL (Latin stage codes never
                mirror; font stays the inherited sheet stack). */}
            <g style={{ direction: "ltr" }} fill="none">
              {/* Rail, broken at y=571: one quiet drafting join, no more. */}
              <line x1={1507} y1={700} x2={1507} y2={576} stroke="rgba(255,255,255,0.14)" strokeWidth={0.8} />
              <line x1={1507} y1={566} x2={1507} y2={210} stroke="rgba(255,255,255,0.14)" strokeWidth={0.8} />
              {stageLadder.map(({ y, label }) => (
                <g key={label}>
                  <line x1={1499} y1={y} x2={1515} y2={y} stroke="rgba(28,128,187,0.5)" strokeWidth={1} />
                  <text x={1525} y={y + 3.5} fontSize={10.5} letterSpacing="0.18em" fill="rgba(255,255,255,0.42)">
                    {label}
                  </text>
                </g>
              ))}
              <text x={1509} y={726} fontSize={9} letterSpacing="0.24em" fill="rgba(255,255,255,0.28)">
                RIBA PLAN OF WORK
              </text>
            </g>
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
        src={process.env.NEXT_BASE_PATH
          ? "/rost-platform-website/rost-platform-logo-white.png"
          : "/rost-platform-logo-white.png"}
        alt="ROST PLATFORM — Your Vision Would Grow"
        width={1426}
        height={205}
        priority
        className="h-7 w-auto object-contain md:h-8"
      />
    </a>
  );
}

/* ----------------------------- RIBA logotype ---------------------------------
   RIBA logotype (public/riba/riba-logotype-white.svg) inlined as a decorative
   mark: next/image is bypassed because SVG optimization is blocked in dev, and
   the mark itself carries no unique reading — the adjacent caption does. The
   caption beside it credits the FOUNDER'S INDIVIDUAL credentials (CP-2026-006/
   007); nothing here must read as ROST PLATFORM itself being RIBA-certified. */

function RibaLogotype() {
  return (
    <svg
      viewBox="0 0 201 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="h-7 w-auto shrink-0"
    >
      <path
        fill="#FFFFFF"
        d="M0.163086 50.0342L19.4492 80.0391H0.163086V50.0342ZM8.41736 12.7921H0.163086V35.3642H8.41736C13.19 35.3642 16.476 34.1515 18.5103 31.9999C20.388 30.0048 21.4834 27.1882 21.4834 24.0586C21.4834 20.929 20.388 18.1124 18.5103 16.1173C16.476 13.9657 13.19 12.7921 8.41736 12.7921ZM189.425 49.2909L178.628 20.2249L167.439 49.2909H189.425ZM117.17 28.8312C118.735 27.1491 119.713 24.7628 119.713 22.1809C119.713 19.599 118.774 17.2127 117.17 15.5305C115.488 13.731 112.828 12.753 109.464 12.753H101.21V31.5696H109.464C112.828 31.5696 115.488 30.5916 117.17 28.7921V28.8312ZM40.4956 22.7677C40.4956 35.4816 33.6105 44.5183 21.7181 47.8043L43.1558 80.0782H49.9626V0.0390625H26.0995C34.3929 4.02928 40.5347 11.8532 40.5347 22.7677H40.4956ZM127.498 0.0390625C134.227 3.63808 138.686 10.132 138.686 18.6992C138.686 27.2664 134.618 33.8777 129.024 36.6161C136.378 39.2762 142.833 45.9266 143.85 57.0366L167.948 0.0390625H127.498ZM68.9357 80.0391H82.1973V0.0390625H68.9357V80.0391ZM195.019 64.2738H161.689L155.625 80.0391H200.848L195.019 64.2738ZM112.202 46.1613H101.21V67.3251H112.202C116.466 67.3251 119.244 66.308 121.122 64.352C122.96 62.4351 124.016 59.6576 124.016 56.7237C124.016 53.7897 122.96 51.0122 121.122 49.0953C119.283 47.1784 116.505 46.1222 112.202 46.1222V46.1613Z"
      />
    </svg>
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
          role spans the eight RIBA Plan of Work 2020 stages: Stage 0 Strategic
          Definition, Stage 1 Preparation and Briefing, Stage 2 Concept Design,
          Stage 3 Spatial Coordination, Stage 4 Technical Design, Stage 5
          Manufacturing and Construction, Stage 6 Handover, and Stage 7 Use.
        </p>
        <h2>Departments — One Parent Brand</h2>
        <p>
          ROST PLATFORM is one parent brand with complementary specialist
          departments:
          ROST LIGHTING (architectural lighting design) and ROST TRIP
          (specialist architectural travel and experience programs).
          ROST LIGHTING delivers architectural lighting design for facades,
          interiors, and the public realm with product-neutral specification.
          ROST TRIP curates architectural journeys through cities and landmark
          projects, with access beyond the public route.
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
          309, Queen Center, Fereshteh St, Tehran, Iran. Social
          media: @rost.platform.
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
            Explore the role
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
            {rtl ? fitFaLatin(t.roleFramework) : t.roleFramework}
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
                ? "text-xl font-medium leading-[1.9] md:text-[1.65rem] md:leading-[1.8]"
                : "text-2xl font-medium md:text-[2.1rem]"
            }`}
          >
            {t.departmentsIntro}
          </motion.h2>

          {/* Plate A — ROST LIGHTING */}
          <motion.div
            {...reveal(reduce, 1, 0)}
            className="mt-14 border-b border-rost-line-strong/40 pb-16 md:mt-20 md:pb-20"
          >
            {/* The supplied white wordmark replaces the written name. The
                localized name survives as sr-only text (screen readers, FA
                parity); the mark itself is decorative, stays Latin in both
                locales (brand integrity), and keeps its exact proportions:
                fixed height + w-auto. The asset is alpha-trimmed so the
                wordmark sits flush on the start edge (the source PNG carried
                323px of transparent left padding that offset it from the
                TRIP mark); max-w-full/object-contain remains as the 390px
                safety. */}
            <h3 className="text-rost-white">
              <span className="sr-only">{t.plateNameA}</span>
              <Image
                src="/departments/rost-lighting-white-no-tagline.png"
                alt=""
                aria-hidden
                width={3854}
                height={399}
                sizes="(min-width: 1024px) 720px, (min-width: 768px) 640px, 360px"
                className="h-8 w-auto max-w-full object-contain md:h-14 lg:h-16"
              />
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
            {/* Plate header row: the complement annotation enters at the
                start edge with a stat-rule blue tick (it supersedes the old
                descriptor line — the capabilities carry that job now), the
                tagline stays flush at the end edge, in both locales. */}
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 md:mt-8">
              <div className="max-w-[52ch]">
                <span className="block h-[2px] w-10 bg-rost-blue" aria-hidden />
                <p className={`mt-3 text-sm text-rost-gray ${rtl ? "leading-[1.9]" : ""}`}>
                  {t.complementA}
                </p>
              </div>
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

            {/* Editorial split — image left (7 cols), capability ledger right
                (5 cols); TRIP mirrors it. Mobile stacks: logo, tagline,
                image + caption, then capabilities. Explicit dims on the
                3:2 frame keep the reveal shift free of layout shift. */}
            <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-12 md:gap-10 lg:gap-16">
              <motion.figure {...reveal(reduce, 0, 0)} className="md:relative md:col-span-7">
                <div className="aspect-[3/2] w-full overflow-hidden border border-rost-line-strong/40">
                  <Image
                    src="/departments/armitaj-interior.jpg"
                    alt={t.captionA}
                    width={2400}
                    height={1510}
                    sizes="(min-width: 768px) 760px, 100vw"
                    className="h-full w-full object-cover saturate-[0.82] contrast-[1.05]"
                  />
                </div>
                {/* Drafting annotation under the frame: index numeral + caption.
                    Absolute on md+ so the grid row (and the stretched ledger
                    beside it) measures the image block exactly; the caption
                    still sits 12px under the frame in both flow modes. */}
                <figcaption className="mt-3 flex items-baseline gap-3 md:absolute md:top-full">
                  <span
                    dir="ltr"
                    aria-hidden
                    className="font-display text-xs tracking-widest text-rost-blue/80"
                  >
                    01
                  </span>
                  <span className={`text-xs text-rost-annotation ${rtl ? "leading-[1.9]" : ""}`}>
                    {t.captionA}
                  </span>
                </figcaption>
              </motion.figure>
              <div className="md:col-span-5">
                <CapabilityList items={t.capabilitiesA} rtl={rtl} reduce={reduce} />
              </div>
            </div>
          </motion.div>

          {/* Plate B — ROST TRIP */}
          <motion.div {...reveal(reduce, 2, 0)} className="pt-14 md:pt-16">
            {/* Same plate anatomy as LIGHTING: sr-only localized name, the
                Latin wordmark as a decorative companion at the identical
                cap-height ladder (equal optical parity across both marks). */}
            <h3 className="text-rost-white">
              <span className="sr-only">{t.plateNameB}</span>
              <Image
                src="/departments/rost-trip-white-no-tagline.png"
                alt=""
                aria-hidden
                width={2340}
                height={334}
                sizes="(min-width: 1024px) 720px, (min-width: 768px) 640px, 360px"
                className="h-8 w-auto max-w-full object-contain md:h-14 lg:h-16"
              />
            </h3>
            {/* Shared plate anatomy: below the identical title block, the same
                full-width datum rule geometry as the LIGHTING plate -- there
                the ROST BLUE light line keeps its draw, here the standard
                gray hairline -- and the identical row below it: complement
                annotation at the start-edge, tagline flush the end-edge, in
                both locales. */}
            <span className="mt-6 block h-px w-full bg-rost-line-strong md:mt-7" aria-hidden />
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 md:mt-8">
              <div className="max-w-[52ch]">
                <span className="block h-[2px] w-10 bg-rost-blue" aria-hidden />
                <p className={`mt-3 text-sm text-rost-gray ${rtl ? "leading-[1.9]" : ""}`}>
                  {t.complementB}
                </p>
              </div>
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

            {/* Mirrored editorial split — capability ledger left (5 cols),
                image right (7 cols); the DOM still runs image-then-list so
                the mobile stack keeps the shared plate order. */}
            <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-12 md:gap-10 lg:gap-16">
              <motion.figure {...reveal(reduce, 0, 0)} className="md:relative md:col-start-6 md:col-span-7">
                <div className="aspect-[3/2] w-full overflow-hidden border border-rost-line-strong/40">
                  <Image
                    src="/departments/kyoto-study.jpg"
                    alt={t.captionB}
                    width={2400}
                    height={1350}
                    sizes="(min-width: 768px) 760px, 100vw"
                    className="h-full w-full object-cover saturate-[0.82] contrast-[1.05]"
                  />
                </div>
                {/* Drafting annotation under the frame: index numeral + caption */}
                <figcaption className="mt-3 flex items-baseline gap-3 md:absolute md:top-full">
                  <span
                    dir="ltr"
                    aria-hidden
                    className="font-display text-xs tracking-widest text-rost-blue/80"
                  >
                    02
                  </span>
                  <span className={`text-xs text-rost-annotation ${rtl ? "leading-[1.9]" : ""}`}>
                    {t.captionB}
                  </span>
                </figcaption>
              </motion.figure>
              <div className="md:col-span-5 md:col-start-1 md:row-start-1">
                <CapabilityList items={t.capabilitiesB} rtl={rtl} reduce={reduce} />
              </div>
            </div>
          </motion.div>
        </DocSection>

        {/* ============================ 04 · Network ============================ */}
        <DocSection headingId="net-heading" index="04" label={t.labelNetwork} rtl={rtl}>
          <h2 id="net-heading" className="sr-only">
            {t.networkHeading}
          </h2>

          {/* The handmade map is the section's central visual: the five
              verified locations read as drafting annotations on the sheet. */}
          <motion.div {...reveal(reduce, 0, 0)}>
            <span className="block h-[2px] w-10 bg-rost-blue" aria-hidden />
            <p
              className={`mt-3 max-w-[48ch] text-sm text-rost-annotation md:text-base ${
                rtl ? "leading-[1.9] font-medium" : ""
              }`}
            >
              {t.networkIntro}
            </p>
            <NetworkMap
              countries={t.networkCountries}
              roles={t.networkRoles}
              rtl={rtl}
              reduce={reduce}
            />
          </motion.div>

          {/* Experience figures, relocated below the map at modest scale:
              countries of experience / years of project record -- never
              office or partner counts. */}
          <div className="mt-16 grid grid-cols-2 gap-x-8 border-t border-rost-line-strong/40 pt-8 md:mt-24 md:gap-x-0">
            <motion.div {...reveal(reduce, 1, 0)} className="md:pe-12 lg:pe-20">
              <p
                className={`inline-block text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.9] text-rost-white ${
                  rtl ? "font-extrabold" : "font-sans font-bold tracking-[-0.02em]"
                }`}
                dir="ltr"
              >
                {t.stat1Number}
              </p>
              <span className="mt-2 block h-[2px] w-10 bg-rost-blue" aria-hidden />
              <p className={`rost-track mt-3 text-[11px] uppercase text-rost-annotation md:text-xs ${rtl ? "text-sm font-medium" : ""}`}>
                {t.stat1}
              </p>
            </motion.div>

            <motion.div
              {...reveal(reduce, 2, 0.08)}
              className="md:border-s md:border-rost-line-strong md:ps-12 lg:ps-20"
            >
              <p
                className={`inline-block text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.9] text-rost-white ${
                  rtl ? "font-extrabold" : "font-sans font-bold tracking-[-0.02em]"
                }`}
                dir="ltr"
              >
                {t.stat2Number}
              </p>
              <span className="mt-2 block h-[2px] w-10 bg-rost-blue" aria-hidden />
              <p className={`rost-track mt-3 text-[11px] uppercase text-rost-annotation md:text-xs ${rtl ? "text-sm font-medium" : ""}`}>
                {t.stat2}
              </p>
            </motion.div>
          </div>
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
              <p className="text-[10px] uppercase tracking-[0.28em] text-rost-gray">London</p>
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

          {/* Credential + contact row — the founder's individual RIBA
              credentials sit at the start edge as the sheet's approval stamp
              (the company itself claims nothing from them); the reachable
              contact endpoints sit flush at the end edge. The redundant
              self-referential website URL and repeated company name are gone:
              the visitor is already on the site. */}
          <address className="mt-7 flex flex-col gap-5 border-b border-rost-line pb-4 not-italic md:flex-row md:items-center md:justify-between">
            <span className="flex items-center gap-4">
              <RibaLogotype />
              <span className="border-s border-rost-line ps-4 text-[11px] leading-snug text-rost-annotation">
                Founder Dr. Taha Fallah
                <br />
                Certified RIBA Member
              </span>
            </span>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[11px] text-rost-gray">
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
              <a
                href="https://instagram.com/rost.platform"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-rost-white hover:underline focus-visible:outline-none focus-visible:text-rost-white focus-visible:underline"
                aria-label="ROST PLATFORM on Instagram — @rost.platform"
              >
                @rost.platform
              </a>
            </div>
          </address>

          {/* Copyright bottom line — the single occurrence of the company
              name on the sheet, with Back to top pinned to the end edge. */}
          <div className="mt-4 flex items-baseline justify-between gap-x-6 gap-y-2 text-[11px] text-rost-gray">
            <span>© 2026 ROST PLATFORM LTD</span>
            <a
              href="#platform"
              className="text-[10px] uppercase tracking-[0.28em] underline-offset-4 transition-colors hover:text-rost-white hover:underline focus-visible:outline-none focus-visible:text-rost-white focus-visible:underline"
            >
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
