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
    stat1Number: "59+",
    stat2Number: "16+",
    ticker: [
      "RIBA-ALIGNED METHODOLOGY",
      "UK-REGISTERED COMPANY",
      "RESEARCH-DRIVEN APPROACH",
      "MULTIDISCIPLINARY EXPERT NETWORK",
      "OUTSTANDING CURATOR AWARD",
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
    stat1Number: "۵۹+",
    stat2Number: "۱۶+",
    ticker: [
      "هم‌راستا با چارچوب RIBA",
      "ثبت رسمی در انگلستان",
      "رویکرد پژوهش‌محور",
      "شبکه چندرشته‌ای متخصصان",
      "کیوریتور برجسته نمایشگاهی",
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

function Word({
  children,
  accent = false,
  rtl = false,
}: {
  children: string;
  accent?: boolean;
  rtl?: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
      <motion.span
        variants={wordRise}
        className={
          accent
            ? rtl
              ? "inline-block font-persian font-bold text-rost-blue"
              : "inline-block font-display italic text-rost-blue"
            : rtl
            ? "inline-block font-persian"
            : "inline-block"
        }
      >
        {children}
      </motion.span>
    </span>
  );
}

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
  edge = "rgba(255,255,255,0.34)",
  top = "rgba(255,255,255,0.045)",
  right = "rgba(255,255,255,0.018)",
  left = "rgba(255,255,255,0.028)",
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
    <g stroke="rgba(255,255,255,0.22)" strokeWidth="0.8">
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
          stroke="rgba(255,255,255,0.18)"
        />
        <AxonPolygon
          points={[
            [0.25, 0.35, 0.02],
            [7.55, 0.35, 0.02],
            [7.55, 5.25, 0.02],
            [0.25, 5.25, 0.02],
          ]}
          stroke="rgba(255,255,255,0.16)"
          dash="5 8"
        />

        {!compact && (
          <g>
            {siteGridX.map((x) => (
              <AxonLine
                key={`gx-${x}`}
                from={[x, -0.8, 0]}
                to={[x, 6.5, 0]}
                stroke="rgba(255,255,255,0.055)"
                strokeWidth={0.7}
              />
            ))}
            {siteGridY.map((y) => (
              <AxonLine
                key={`gy-${y}`}
                from={[-0.8, y, 0]}
                to={[8.4, y, 0]}
                stroke="rgba(255,255,255,0.055)"
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
              stroke="rgba(255,255,255,0.25)"
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
              stroke="rgba(255,255,255,0.12)"
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
          edge="rgba(255,255,255,0.27)"
          top="rgba(255,255,255,0.025)"
        />
        {columnXs.flatMap((x) =>
          columnYs.map((y) => (
            <AxonLine
              key={`column-${x}-${y}`}
              from={[x, y, 0.62]}
              to={[x, y, 2.18]}
              offsetY={-34}
              stroke="rgba(255,255,255,0.31)"
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
            stroke="rgba(255,255,255,0.25)"
          />
        ))}
        {columnXs.map((x) => (
          <AxonLine
            key={`beam-x-${x}`}
            from={[x, 0.7, 2.18]}
            to={[x, 4.9, 2.18]}
            offsetY={-34}
            stroke="rgba(255,255,255,0.25)"
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
          stroke="rgba(255,255,255,0.19)"
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
                : "rgba(255,255,255,0.28)"
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
          edge="rgba(255,255,255,0.39)"
          top="rgba(255,255,255,0.052)"
        />
        <AxonVolume
          bounds={[4.36, 0.48, 4.02, 7.3, 4.7, 5.38]}
          offsetY={-166}
          edge="rgba(255,255,255,0.39)"
          top="rgba(255,255,255,0.052)"
        />
        <AxonVolume
          bounds={[3.28, 0.48, 4.02, 4.36, 1.42, 5.38]}
          offsetY={-166}
          edge="rgba(255,255,255,0.39)"
          top="rgba(255,255,255,0.052)"
        />

        {!compact && (
          <g>
            {facadeXs.map((x, index) => (
              <AxonLine
                key={`facade-${x}`}
                from={[x, 4.82, 3.98]}
                to={[x, 4.82, 5.43]}
                offsetY={-166}
                stroke={index === 7 ? "rgba(28,128,187,0.7)" : "rgba(255,255,255,0.22)"}
                strokeWidth={index === 7 ? 1.05 : 0.72}
              />
            ))}
            <AxonLine
              from={[0.8, 4.82, 3.98]}
              to={[7.2, 4.82, 3.98]}
              offsetY={-166}
              stroke="rgba(255,255,255,0.22)"
            />
            <AxonLine
              from={[0.8, 4.82, 5.43]}
              to={[7.2, 4.82, 5.43]}
              offsetY={-166}
              stroke="rgba(255,255,255,0.22)"
            />
          </g>
        )}

        {/* Roof and integrated lighting layer. */}
        <AxonVolume
          bounds={[0.35, 0.08, 5.62, 7.72, 5.2, 5.78]}
          offsetY={-236}
          edge="rgba(255,255,255,0.38)"
          top="rgba(255,255,255,0.035)"
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
        style={{ opacity: rtl ? 0.74 : 0.82 }}
      >
        <g transform={rtl ? "translate(-470 20)" : undefined}>{drawProject(false)}</g>
      </svg>
      <svg
        viewBox="700 60 760 820"
        preserveAspectRatio="xMidYMax meet"
        className="rost-axonometric absolute inset-0 h-[100svh] w-full md:hidden"
        style={{ opacity: rtl ? 0.27 : 0.32 }}
      >
        <g transform={rtl ? "translate(0 190)" : "translate(0 120)"}>{drawProject(true)}</g>
      </svg>
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
      <BlueprintBackdrop mx={mx} my={my} rtl={rtl} />

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
        className={`relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-center px-5 md:px-10 ${
          rtl ? "font-persian" : ""
        }`}
        aria-labelledby="hero-heading"
      >
        {/* headline */}
        <h1
          id="hero-heading"
          className={`max-w-[22ch] text-balance ${
            rtl
              ? "font-persian text-[clamp(2.15rem,5.1vw,4.65rem)] leading-[1.12]"
              : "font-sans text-[clamp(2rem,4.8vw,4.35rem)] leading-[1.08]"
          } font-medium tracking-[-0.01em] text-rost-white`}
        >
          <motion.span
            variants={headlineWrap}
            initial="hidden"
            animate="show"
            className="inline"
          >
            {t.headlinePlain.split(" ").map((w, i) => (
              <Word key={`p-${i}`} rtl={rtl}>
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
              <Word key={`a-${i}`} accent rtl={rtl}>
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
          className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-3">
            <p
              className={
                rtl
                  ? "font-persian text-xl font-bold text-rost-blue md:text-[1.65rem]"
                  : "font-display text-xl italic text-rost-blue md:text-2xl"
              }
            >
              {t.tagline}
            </p>
            <p
              className={`max-w-[50ch] text-sm leading-relaxed text-[#a3a3a3] ${
                rtl ? "font-persian text-[15px] md:text-[16px]" : "md:text-[15px]"
              } md:leading-relaxed`}
            >
              {t.heroCopy}
            </p>
          </div>

          {/* stat block */}
          <dl className="flex items-stretch gap-10 md:gap-14" dir="ltr">
            <Stat n={t.stat1Number} label={t.stat1} rtl={rtl} />
            <span className="w-px bg-rost-line-strong/50" aria-hidden />
            <Stat n={t.stat2Number} label={t.stat2} rtl={rtl} />
          </dl>
        </motion.div>
      </section>

      {/* ============================ Trust & Credibility Ticker (translated) ============================ */}
      <section
        id="network"
        lang={contentLang}
        dir={rtl ? "rtl" : "ltr"}
        className="relative z-10 mx-auto w-full max-w-[1480px] px-5 pb-6 md:px-10 md:pb-8"
        aria-label={locale === "EN" ? "Credentials and Trust" : "اعتبار و تعهدات"}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1 }}
          className="relative flex items-center border-y border-rost-line-strong/40 py-3"
        >
          <div className="relative flex-1 overflow-hidden" aria-hidden>
            <div
              className={`flex w-max gap-8 whitespace-nowrap ${
                rtl ? "rost-marquee-rtl" : "rost-marquee-ltr"
              }`}
              dir={rtl ? "rtl" : "ltr"}
            >
              {[...t.ticker, ...t.ticker, ...t.ticker, ...t.ticker].map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-rost-gray"
                >
                  <span
                    className={
                      rtl
                        ? "font-persian text-[13px] font-medium tracking-normal text-rost-white"
                        : "font-medium text-rost-white"
                    }
                  >
                    {item}
                  </span>
                  <span className="text-rost-blue/80">·</span>
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

function Stat({
  n,
  label,
  rtl = false,
}: {
  n: string;
  label: string;
  rtl?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <dd
        className={
          rtl
            ? "font-persian text-3xl font-bold leading-none text-rost-white md:text-[2.6rem]"
            : "font-display text-3xl font-semibold leading-none text-rost-white md:text-4xl"
        }
      >
        {n}
      </dd>
      <dt
        className={`mt-2 max-w-[16ch] text-[10px] uppercase leading-tight text-rost-gray ${
          rtl
            ? "font-persian text-[11px] font-medium tracking-normal md:text-[12px]"
            : "tracking-[0.18em]"
        }`}
      >
        {label}
      </dt>
    </div>
  );
}
