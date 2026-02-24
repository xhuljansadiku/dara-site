// app/layout.tsx - Root layout (no locale)
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import RecaptchaProviderWrap from "@/components/RecaptchaProvider";
import { Analytics } from "@/components/Analytics";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DARA · Dare to be Different",
    template: "%s | DARA Marketing Agency",
  },
  description:
    "DARA Marketing Agency. We bring brand stories to life through bold strategies, digital marketing, and creative content.",
  keywords: ["marketing", "digital marketing", "branding", "social media", "content", "Albania", "DARA"],
  authors: [{ name: "DARA Marketing Agency", url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "DARA Marketing Agency",
    title: "DARA · Dare to be Different",
    description:
      "DARA Marketing Agency. We bring brand stories to life through bold strategies, digital marketing, and creative content.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "DARA Marketing Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DARA · Dare to be Different",
    description:
      "DARA Marketing Agency. We bring brand stories to life through bold strategies, digital marketing, and creative content.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${playfair.variable}`}>
      <body className={`min-h-screen bg-[#444444] text-white antialiased ${montserrat.className}`} suppressHydrationWarning>
        <RecaptchaProviderWrap>
          {children}
          <Analytics />
        </RecaptchaProviderWrap>
      </body>
    </html>
  );
}
﻿