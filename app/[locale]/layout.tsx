// app/[locale]/layout.tsx
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });


export const metadata: Metadata = {
  title: {
    default: "DARA — Dare to be Different",
    template: "%s | DARA",
  },
  description:
    "DARA Marketing Agency. We bring brand stories to life through bold strategies, digital marketing, and creative content.",
  openGraph: {
    title: "DARA — Dare to be Different",
    description:
      "We bring brand stories to life through bold strategies, digital marketing, and creative content.",
    type: "website",
  },
};


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} className={`${montserrat.variable} ${playfair.variable}`}>
      <body className={`min-h-screen bg-[#444444] text-white antialiased ${montserrat.className}`}>
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
