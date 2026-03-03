"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import { type Locale } from "@/lib/services-data";
import {
  PACKAGES_BY_GROUP_AND_LOCALE,
  PACKAGE_FILTER_TABS_BY_LOCALE,
  PACKAGE_GROUP_LABELS,
  PACKAGE_GROUPS,
} from "@/lib/packages-data";
import PackageCard from "@/components/site/PackageCard";

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; title: string; titleAccent: string; subtitle: string; getQuote: string; viewServices: string }
> = {
  sq: {
    kicker: "Paketa",
    title: "Paketa për ",
    titleAccent: "çdo nevojë",
    subtitle: "Zgjidhje të gatshme për marketing, brand, trajnime dhe website. Paketa që përshtaten me biznesin tuaj.",
    getQuote: "Merr ofertë",
    viewServices: "Shiko shërbimet",
  },
  en: {
    kicker: "Packages",
    title: "Packages for ",
    titleAccent: "every need",
    subtitle: "Ready-made solutions for marketing, brand, training and website. Packages that fit your business.",
    getQuote: "Get a quote",
    viewServices: "View services",
  },
  de: {
    kicker: "Pakete",
    title: "Pakete für ",
    titleAccent: "jeden Bedarf",
    subtitle: "Fertige Lösungen für Marketing, Marke, Training und Website. Pakete, die zu Ihrem Unternehmen passen.",
    getQuote: "Angebot anfragen",
    viewServices: "Leistungen ansehen",
  },
};

const CTA_BY_LOCALE: Record<
  Locale,
  { title: string; titleAccent: string; subtitle: string; getQuote: string; backHome: string }
> = {
  sq: {
    title: "Gati për rritje? ",
    titleAccent: "Le të flasim.",
    subtitle: "Na tregoni qëllimin dhe ju kthejmë me një plan të qartë dhe paketë të përshtatshme.",
    getQuote: "Merr ofertë",
    backHome: "Kthehu në kryefaqe",
  },
  en: {
    title: "Ready to grow? ",
    titleAccent: "Let's talk.",
    subtitle: "Tell us your goal and we'll return with a clear plan and the right package.",
    getQuote: "Get a quote",
    backHome: "Back to home",
  },
  de: {
    title: "Bereit zu wachsen? ",
    titleAccent: "Lass uns reden.",
    subtitle: "Nennen Sie uns Ihr Ziel und wir melden uns mit einem klaren Plan und dem richtigen Paket.",
    getQuote: "Angebot anfragen",
    backHome: "Zur Startseite",
  },
};

type Props = {
  locale: Locale;
};

export default function PackagesPageContent({ locale }: Props) {
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const hero = HERO_BY_LOCALE[locale];
  const cta = CTA_BY_LOCALE[locale];
  const filterTabs = PACKAGE_FILTER_TABS_BY_LOCALE[locale];
  const packages = PACKAGES_BY_GROUP_AND_LOCALE[locale];
  const groupLabels = PACKAGE_GROUP_LABELS[locale];

  const visibleGroups =
    activeFilter === 0
      ? PACKAGE_GROUPS
      : filterTabs[activeFilter].groups;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(200,165,92,0.12)_0%,transparent_60%)]" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[white]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimateIn delay={0}>
          <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            {hero.kicker}
          </span>
        </AnimateIn>

        <AnimateIn delay={100}>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {hero.title}
            <span className="text-gray-900">{hero.titleAccent}</span>
          </h1>
        </AnimateIn>

        <AnimateIn delay={200}>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">{hero.subtitle}</p>
        </AnimateIn>

        <AnimateIn delay={300}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gray-900 px-8 font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
            >
              {hero.getQuote}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-300 px-8 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50 sm:w-auto"
            >
              {hero.viewServices}
            </LocaleLink>
          </div>
        </AnimateIn>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex w-max flex-nowrap gap-2 whitespace-nowrap sm:w-full sm:flex-wrap">
            {filterTabs.map((tab, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveFilter(idx)}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                  activeFilter === idx
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* PACKAGES GRID */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-14">
          {visibleGroups.map((groupKey, groupIdx) => {
            const groupPackages = packages[groupKey];
            const groupLabel = groupLabels[groupKey];
            return (
              <AnimateIn key={groupKey} delay={groupIdx * 80}>
                <div>
                  <h2 className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-900 md:text-xs">
                    {groupLabel}
                  </h2>
                  <div className="grid min-h-0 grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {groupPackages.map((pkg) => (
                      <PackageCard key={pkg.title} pkg={pkg} locale={locale} />
                    ))}
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateIn delay={0}>
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl lg:text-4xl">
              {cta.title}
              <span className="text-gray-900">{cta.titleAccent}</span>
            </h2>
            <p className="mt-3 max-w-2xl text-base text-gray-600 md:text-lg">{cta.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LocaleLink
                href="/contact"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-gray-900 px-6 font-medium text-white transition hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 sm:w-auto"
              >
                {cta.getQuote}
              </LocaleLink>
              <LocaleLink
                href="/"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border-2 border-gray-300 px-6 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 sm:w-auto"
              >
                {cta.backHome}
              </LocaleLink>
            </div>
          </div>
        </AnimateIn>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
