import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://www.rostplatform.com";
const OG_IMAGE = `${SITE_URL}/og.png`;

/* JSON-LD structured data — Organization + ProfessionalService + WebSite
   Boosts E-E-A-T, enables rich results, and surfaces NAP for local SEO. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "ROST PLATFORM",
      alternateName: "ROST PLATFORM LTD",
      legalName: "ROST PLATFORM LTD",
      description:
        "A multidisciplinary platform for guiding development in Architecture & Construction. RIBA-aligned Strategic Design Consultant with a global network across the UK, Iran, the UAE, China and Brazil.",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      image: OG_IMAGE,
      foundingDate: "2024",
      foundingLocation: {
        "@type": "Place",
        name: "London, United Kingdom",
      },
      email: "info@rostplatform.com",
      telephone: "+44 73 86 296 171",
      sameAs: [
        "https://instagram.com/rostplatform",
        "https://www.rostplatform.com",
      ],
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Unit 13 Warham Rd",
          addressLocality: "London",
          addressRegion: "England",
          addressCountry: "GB",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Unit 1, No-23, 2nd Kamal-ol-molk",
          addressLocality: "Mashhad",
          addressCountry: "IR",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Unit 309, Queen Center, Fereshteh St",
          addressLocality: "Tehran",
          addressCountry: "IR",
        },
      ],
      founder: {
        "@type": "Person",
        name: "Dr. Taha Fallah",
        jobTitle: "Founder & Strategic Design Consultant",
        memberOf: {
          "@type": "Organization",
          name: "Royal Institute of British Architects (RIBA)",
          url: "https://www.architecture.com",
        },
      },
      department: [
        {
          "@type": "Organization",
          name: "ROST LIGHTING",
          description:
            "Architectural lighting design — light as the narrative of architecture.",
        },
        {
          "@type": "Organization",
          name: "ROST TRIP",
          description:
            "Specialist architectural travel and experience programs for project teams.",
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#professional-service`,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      name: "ROST PLATFORM — Strategic Design Consultant",
      description:
        "Strategic Design Consultant for Architecture & Construction projects, aligned with the RIBA Plan of Work 2020. We curate expertise and steer the development journey from first vision to final realization.",
      url: SITE_URL,
      image: OG_IMAGE,
      telephone: "+44 73 86 296 171",
      email: "info@rostplatform.com",
      priceRange: "$$$$",
      areaServed: [
        "United Kingdom",
        "Iran",
        "United Arab Emirates",
        "China",
        "Brazil",
      ],
      knowsAbout: [
        "Architecture",
        "Construction",
        "Strategic Design Consultancy",
        "RIBA Plan of Work 2020",
        "RIBA Client Adviser",
        "Project Management",
        "Architectural Lighting Design",
        "Branding",
        "Business Strategy",
        "Hospitality",
      ],
      serviceType: [
        "Strategic Design Consultant",
        "RIBA Client Adviser",
        "Project Curation & Steering",
        "Architectural Lighting Design",
        "Architectural Travel Programs",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit 13 Warham Rd",
        addressLocality: "London",
        addressRegion: "England",
        addressCountry: "GB",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "ROST PLATFORM",
      alternateName: "ROST PLATFORM — Your Vision Would Grow",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ROST PLATFORM — Architecture & Construction Strategic Consultant",
    template: "%s · ROST PLATFORM",
  },
  description:
    "ROST PLATFORM is a multidisciplinary consultancy guiding development in Architecture & Construction. RIBA-aligned Strategic Design Consultant across the UK, Iran, the UAE, China and Brazil. Your vision would grow.",
  applicationName: "ROST PLATFORM",
  authors: [{ name: "ROST PLATFORM LTD", url: SITE_URL }],
  creator: "ROST PLATFORM LTD",
  publisher: "ROST PLATFORM LTD",
  keywords: [
    "ROST PLATFORM",
    "architecture consultancy",
    "construction consultant",
    "Strategic Design Consultant",
    "RIBA Client Adviser",
    "RIBA Plan of Work",
    "architecture & construction",
    "multidisciplinary platform",
    "architectural lighting design",
    "project curation",
    "Taha Fallah",
    "London architecture",
    "Iran architecture",
  ],
  category: "Architecture & Construction",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "1024x1024" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/favicon.png", sizes: "1024x1024" }],
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["fa_IR"],
    url: SITE_URL,
    siteName: "ROST PLATFORM",
    title:
      "ROST PLATFORM — Architecture & Construction Strategic Consultant",
    description:
      "A multidisciplinary platform guiding development in Architecture & Construction. RIBA-aligned. UK · Iran · UAE · China · Brazil. Your vision would grow.",
    images: [
      {
        url: OG_IMAGE,
        width: 1344,
        height: 768,
        alt: "ROST PLATFORM — Strategic Design Consultant for Architecture & Construction",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ROST PLATFORM — Architecture & Construction Strategic Consultant",
    description:
      "A multidisciplinary platform guiding development in Architecture & Construction. RIBA-aligned. Your vision would grow.",
    images: [OG_IMAGE],
    creator: "@rostplatform",
    site: "@rostplatform",
  },
  other: {
    "theme-color": "#1a1714",
    "application-name": "ROST PLATFORM",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1714",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        {/* SEO + accessibility: skip link for keyboard users */}
        <a
          href="#platform"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-rost-sand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-rost-ink"
        >
          Skip to content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
