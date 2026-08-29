import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ROST PLATFORM — Your Vision Would Grow",
  description:
    "ROST PLATFORM is a multidisciplinary platform for guiding development in Architecture & Construction. RIBA-aligned Strategic Design Consultant with a global network across the UK, Iran, UAE, China and Brazil.",
  keywords: [
    "ROST PLATFORM",
    "Architecture",
    "Construction",
    "Strategic Design Consultant",
    "RIBA Client Adviser",
    "Multidisciplinary platform",
    "Architecture & Construction",
  ],
  authors: [{ name: "ROST PLATFORM LTD" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "ROST PLATFORM — Your Vision Would Grow",
    description:
      "A multidisciplinary platform for guiding development in Architecture & Construction.",
    url: "https://www.rostplatform.com",
    siteName: "ROST PLATFORM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROST PLATFORM — Your Vision Would Grow",
    description:
      "A multidisciplinary platform for guiding development in Architecture & Construction.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
