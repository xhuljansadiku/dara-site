// app/layout.tsx - Root layout (no locale)
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "DARA — Dare to be Different",
  description:
    "DARA Marketing Agency. We bring brand stories to life through bold strategies, digital marketing, and creative content.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${playfair.variable}`}>
      <body className={`min-h-screen bg-[#444444] text-white antialiased ${montserrat.className}`}>
        {children}
      </body>
    </html>
  );
}
﻿