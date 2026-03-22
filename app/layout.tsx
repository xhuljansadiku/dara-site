// app/layout.tsx - Root layout (no locale)
import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Montserrat, Oswald } from "next/font/google";
import { Analytics } from "@/components/Analytics";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DARA Marketing Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DARA · Dare to be Different",
    description:
      "DARA Marketing Agency. We bring brand stories to life through bold strategies, digital marketing, and creative content.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get("x-next-locale") ?? "en";
  const lang = locale === "sq" ? "sq" : locale === "de" ? "de" : "en";

  return (
    <html lang={lang} suppressHydrationWarning className={`${montserrat.variable} ${oswald.variable}`}>
      <body className={`min-h-screen bg-[#FFFFFF] text-gray-900 antialiased ${montserrat.className}`} suppressHydrationWarning>
        <>
          {children}
          <Analytics />
        </>
      </body>
    </html>
  );
}
﻿