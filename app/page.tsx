// app/page.tsx
// Neutral root homepage: language selector (no redirect to /en or /sq).

import Link from "next/link";
import type { Metadata } from "next";
import { locales } from "@/i18n";

const LOCALE_LABELS: Record<string, string> = {
  sq: "Shqip",
  en: "English",
  de: "Deutsch",
};

export const metadata: Metadata = {
  title: "DARA · Dare to be Different",
  description:
    "DARA Marketing Agency. We bring brand stories to life through bold strategies, digital marketing, and creative content.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al",
    languages: {
      "x-default": process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al",
      sq: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al"}/sq`,
      en: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al"}/en`,
      de: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al"}/de`,
    },
  },
};

export default function RootPage() {
  return (
    <main className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <img
        src="/hero-bg-dara.png"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        aria-hidden
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-black/50" aria-hidden />
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          DARA
        </h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
          Dare to be Different
        </p>
        <p className="mt-8 text-base text-white/90 max-w-md mx-auto">
          Choose your language / Zgjidhni gjuhën / Wählen Sie Ihre Sprache
        </p>
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-4" aria-label="Language selection">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white/60 bg-white/10 px-8 font-medium text-white backdrop-blur-sm transition hover:border-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {LOCALE_LABELS[locale] ?? locale}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
