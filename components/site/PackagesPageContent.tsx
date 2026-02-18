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
  type Pkg,
} from "@/lib/packages-data";

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; title: string; titleAccent: string; subtitle: string; getQuote: string; viewServices: string }
> = {
  sq: {
    kicker: "Paketa",
    title: "Paketa për ",
    titleAccent: "çdo nevojë",
    subtitle: "Zgjidhje të gatshme për marketing, brand, trajnime dhe website — paketa që përshtaten me biznesin tuaj.",
    getQuote: "Merr ofertë",
    viewServices: "Shiko shërbimet",
  },
  en: {
    kicker: "Packages",
    title: "Packages for ",
    titleAccent: "every need",
    subtitle: "Ready-made solutions for marketing, brand, training and website — packages that fit your business.",
    getQuote: "Get a quote",
    viewServices: "View services",
  },
  de: {
    kicker: "Pakete",
    title: "Pakete für ",
    titleAccent: "jeden Bedarf",
    subtitle: "Fertige Lösungen für Marketing, Marke, Training und Website — Pakete, die zu Ihrem Unternehmen passen.",
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

const CTA_LABELS: Record<Locale, Record<"quote" | "consult", string>> = {
  sq: { quote: "Kërko ofertë", consult: "Kërko konsultim" },
  en: { quote: "Get a quote", consult: "Request consultation" },
  de: { quote: "Angebot anfragen", consult: "Beratung anfragen" },
};

function PackageCard({ pkg, locale }: { pkg: Pkg; locale: Locale }) {
  const ctaType = pkg.cta ?? "quote";
  const ctaLabel = CTA_LABELS[locale][ctaType];
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition-all duration-300 hover:border-[#c8a55c]/30 hover:bg-gradient-to-br hover:from-white/[0.1] hover:to-white/[0.05] hover:shadow-[0_0_40px_rgba(200,165,92,0.15)]">
      {pkg.badge && (
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#c8a55c]/20 px-2.5 py-1 text-xs font-medium text-[#c8a55c]">
          <span aria-hidden>⭐</span> {pkg.badge}
        </span>
      )}
      <p className="text-xs font-medium uppercase tracking-wider text-[#c8a55c]">{pkg.subtitle}</p>
      <h3 className="mt-2 text-xl font-semibold text-white transition group-hover:text-[#c8a55c]/90">{pkg.title}</h3>
      <div className="mt-3 flex flex-wrap items-baseline gap-2">
        {pkg.priceOriginal && (
          <span className="text-sm text-white/50 line-through">{pkg.priceOriginal}</span>
        )}
        <span className="text-lg font-semibold text-[#c8a55c]">{pkg.price}</span>
      </div>
      <ul className="mt-5 space-y-2.5">
        {pkg.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-white/70">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8a55c]" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <LocaleLink
          href="/contact"
          className="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#c8a55c] px-4 text-sm font-medium text-black transition hover:bg-[#b6944f]"
        >
          {ctaLabel}
        </LocaleLink>
      </div>
    </div>
  );
}

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
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <AnimateIn delay={0}>
          <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">{hero.kicker}</p>
        </AnimateIn>

        <AnimateIn delay={100}>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            {hero.title}
            <span className="text-[#c8a55c]">{hero.titleAccent}</span>
          </h1>
        </AnimateIn>

        <AnimateIn delay={200}>
          <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">{hero.subtitle}</p>
        </AnimateIn>

        <AnimateIn delay={300}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#c8a55c] px-6 font-medium text-black transition hover:bg-[#b6944f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a55c] sm:w-auto"
            >
              {hero.getQuote}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-white/90 transition hover:border-white/25 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 sm:w-auto"
            >
              {hero.viewServices}
            </LocaleLink>
          </div>
        </AnimateIn>
      </section>

      {/* FILTER TABS */}
      <section className="py-6">
        <div className="-mx-4 overflow-x-auto px-4">
          <div className="flex w-max flex-nowrap gap-2 whitespace-nowrap">
            {filterTabs.map((tab, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveFilter(idx)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  activeFilter === idx
                    ? "bg-[#c8a55c] text-black shadow-[0_0_20px_rgba(200,165,92,0.3)]"
                    : "border border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES GRID */}
      <section className="py-12 md:py-16">
        <div className="space-y-12">
          {visibleGroups.map((groupKey, groupIdx) => {
            const groupPackages = packages[groupKey];
            const groupLabel = groupLabels[groupKey];
            return (
              <AnimateIn key={groupKey} delay={groupIdx * 100}>
                <div>
                  <h2 className="mb-6 text-xl font-semibold text-[#c8a55c] md:text-2xl">{groupLabel}</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {groupPackages.map((pkg) => (
                      <PackageCard key={pkg.title} pkg={pkg} locale={locale} />
                    ))}
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <AnimateIn delay={0}>
          <div className="rounded-3xl border border-[#c8a55c]/20 bg-gradient-to-br from-[#c8a55c]/10 via-[#c8a55c]/5 to-transparent p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
              {cta.title}
              <span className="text-[#c8a55c]">{cta.titleAccent}</span>
            </h2>
            <p className="mt-3 max-w-2xl text-base text-white/80 md:text-lg">{cta.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LocaleLink
                href="/contact"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#c8a55c] px-6 font-medium text-black shadow-[0_0_24px_rgba(200,165,92,0.3)] transition hover:bg-[#b6944f] hover:shadow-[0_0_32px_rgba(200,165,92,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a55c] sm:w-auto"
              >
                {cta.getQuote}
              </LocaleLink>
              <LocaleLink
                href="/"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-white/90 transition hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 sm:w-auto"
              >
                {cta.backHome}
              </LocaleLink>
            </div>
          </div>
        </AnimateIn>
      </section>

      <div className="h-8" />
    </>
  );
}
