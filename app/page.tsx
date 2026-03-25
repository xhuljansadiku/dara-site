// app/page.tsx
// Neutral root homepage: language selector (no redirect to /en or /sq).

import Link from "next/link";
import type { Metadata } from "next";
import { defaultLocale, locales } from "@/i18n";

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
    <main className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
      {/* Background */}
      <img
        src="/hero-bg-dara.png"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        aria-hidden
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/55 to-black/80" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(200,165,92,0.15),transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-72 w-72 rounded-full bg-[#c8a55c]/10 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-64 w-64 rounded-full bg-white/5 blur-[90px]" aria-hidden />

      {/* Content card */}
      <div className="relative w-full max-w-lg animate-fade-in-up">
        <div className="rounded-[2rem] border border-white/[0.12] bg-white/[0.07] p-8 shadow-[0_25px_80px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.06] backdrop-blur-2xl sm:p-10 md:p-12">
          <div className="text-center">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.45em] text-[#c8a55c]/90 sm:text-xs">
              Marketing Agency
            </p>
            <h1 className="font-display mt-3 bg-gradient-to-b from-white via-white to-white/75 bg-clip-text text-5xl font-bold tracking-[-0.02em] text-transparent sm:text-6xl md:text-7xl">
              DARA
            </h1>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/45 sm:text-xs">
              Dare to be Different
            </p>
            <div className="mx-auto mt-8 h-px max-w-[180px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <p className="mt-8 text-sm leading-relaxed text-white/65 sm:text-[15px]">
              <span className="block text-white/90">Choose your language</span>
              <span className="mt-1.5 block text-xs font-normal text-white/50 sm:text-sm">
                Zgjidhni gjuhën · Wählen Sie Ihre Sprache
              </span>
            </p>
          </div>

          <nav
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-3"
            aria-label="Language selection"
          >
            {locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}`}
                className="group relative flex min-h-[52px] flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/[0.14] bg-white/[0.06] px-6 py-3.5 text-[15px] font-semibold text-white/95 shadow-inner shadow-white/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c8a55c]/45 hover:bg-white/[0.12] hover:shadow-[0_12px_40px_-8px_rgba(200,165,92,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a55c]"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#c8a55c]/80 transition group-hover:text-[#c8a55c]">
                  {locale}
                </span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <span>{LOCALE_LABELS[locale] ?? locale}</span>
                <svg
                  className="h-4 w-4 shrink-0 text-white/35 transition group-hover:translate-x-0.5 group-hover:text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-6 text-center text-[11px] tracking-wide text-white/35">
          dara.al
        </p>

        {/* Team teaser (lidhje me faqen Ekipi) */}
        <div className="mt-10 w-full max-w-lg rounded-2xl border border-white/[0.1] bg-white/[0.05] p-6 backdrop-blur-md sm:p-7">
          <p className="text-center font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-[#c8a55c]/90">
            Team
          </p>
          <h2 className="mt-3 text-center font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
            Njerëzit pas DARA
          </h2>
          <p className="mt-2 text-center text-sm leading-relaxed text-white/60">
            Strategji, kreativitet dhe marketing digjital: njihni ekipin tonë.
          </p>
          <div className="mt-5 flex justify-center">
            <Link
              href={`/${defaultLocale}/team`}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.18] bg-white/[0.08] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#c8a55c]/50 hover:bg-white/[0.12]"
            >
              Shiko ekipin
              <svg className="h-4 w-4 text-[#c8a55c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
