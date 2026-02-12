"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import {
  SERVICE_SLUGS,
  SERVICE_DETAILS_BY_LOCALE,
  type Locale,
} from "@/lib/services-data";

const FILTER_TABS_BY_LOCALE: Record<Locale, { label: string; indices: number[] }[]> = {
  sq: [
    { label: "Të gjitha", indices: [] },
    { label: "Marketing", indices: [0, 1, 2, 4, 5] },
    { label: "Brand", indices: [3] },
    { label: "Trajnime", indices: [6] },
    { label: "Website", indices: [7, 8, 9] },
    { label: "Mirembajtje", indices: [10] },
  ],
  en: [
    { label: "All", indices: [] },
    { label: "Marketing", indices: [0, 1, 2, 4, 5] },
    { label: "Brand", indices: [3] },
    { label: "Training", indices: [6] },
    { label: "Website", indices: [7, 8, 9] },
    { label: "Maintenance", indices: [10] },
  ],
  de: [
    { label: "Alle", indices: [] },
    { label: "Marketing", indices: [0, 1, 2, 4, 5] },
    { label: "Brand", indices: [3] },
    { label: "Training", indices: [6] },
    { label: "Website", indices: [7, 8, 9] },
    { label: "Wartung", indices: [10] },
  ],
};

// Service icons mapping
const SERVICE_ICONS: Record<string, JSX.Element> = {
  "social-media": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  "content": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  "strategy": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  "branding": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  "ads": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  "consulting": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "training": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  "website-landing": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  "ecommerce": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  "saas": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "maintenance": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; title: string; titleAccent: string; subtitle: string; getQuote: string; viewWork: string }
> = {
  sq: {
    kicker: "Shërbimet",
    title: "Shërbime për ",
    titleAccent: "rezultate",
    subtitle: "Nga rrjete sociale dhe përmbajtje te strategjia, branding, reklama, konsulencë dhe trajnime — kombinojmë çfarë ju nevojitet për të rritur.",
    getQuote: "Merr ofertë",
    viewWork: "Shiko punën",
  },
  en: {
    kicker: "Services",
    title: "Services built for ",
    titleAccent: "results",
    subtitle: "From social media and content to strategy, branding, ads, consulting and training—we combine what you need to grow.",
    getQuote: "Get a quote",
    viewWork: "View our work",
  },
  de: {
    kicker: "Leistungen",
    title: "Leistungen für ",
    titleAccent: "Erfolge",
    subtitle: "Von Social Media und Content über Strategie, Branding, Ads, Beratung und Training—wir kombinieren, was Sie zum Wachstum brauchen.",
    getQuote: "Angebot anfragen",
    viewWork: "Referenzen ansehen",
  },
};

const CTA_BY_LOCALE: Record<
  Locale,
  { title: string; titleAccent: string; subtitle: string; getQuote: string; backHome: string }
> = {
  sq: {
    title: "Gati për rritje? ",
    titleAccent: "Le të flasim.",
    subtitle: "Na tregoni qëllimin (lead / shitje / brand) dhe ju kthejmë me një plan të qartë.",
    getQuote: "Merr ofertë",
    backHome: "Kthehu në kryefaqe",
  },
  en: {
    title: "Ready to grow? ",
    titleAccent: "Let's talk.",
    subtitle: "Tell us your goal (leads / sales / brand) and we'll return with a clear plan.",
    getQuote: "Get a quote",
    backHome: "Back to home",
  },
  de: {
    title: "Bereit zu wachsen? ",
    titleAccent: "Lass uns reden.",
    subtitle: "Nennen Sie uns Ihr Ziel (Leads / Verkäufe / Marke) und wir melden uns mit einem klaren Plan.",
    getQuote: "Angebot anfragen",
    backHome: "Zur Startseite",
  },
};

type Props = {
  locale: Locale;
};

export default function ServicesPageContent({ locale }: Props) {
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const hero = HERO_BY_LOCALE[locale];
  const cta = CTA_BY_LOCALE[locale];
  const services = SERVICE_DETAILS_BY_LOCALE[locale];
  const filterTabs = FILTER_TABS_BY_LOCALE[locale];

  const filteredServices =
    activeFilter === 0
      ? SERVICE_SLUGS.map((slug, i) => ({ slug, index: i, service: services[i] }))
      : filterTabs[activeFilter].indices.map((i) => ({
          slug: SERVICE_SLUGS[i],
          index: i,
          service: services[i],
        }));

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
          <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">
            {hero.kicker}
          </p>
        </AnimateIn>

        <AnimateIn delay={100}>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            {hero.title}
            <span className="text-[#c8a55c]">{hero.titleAccent}</span>
          </h1>
        </AnimateIn>

        <AnimateIn delay={200}>
          <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
            {hero.subtitle}
          </p>
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
              href="/work"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-white/90 transition hover:border-white/25 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 sm:w-auto"
            >
              {hero.viewWork}
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

      {/* SERVICE GRID */}
      <section className="py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map(({ slug, index, service }, idx) => {
            if (!service) return null;
            return (
              <AnimateIn key={slug} delay={idx * 50}>
                <LocaleLink
                  href={`/services/${slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition-all duration-300 hover:border-[#c8a55c]/30 hover:bg-gradient-to-br hover:from-white/[0.1] hover:to-white/[0.05] hover:shadow-[0_0_40px_rgba(200,165,92,0.15)]"
                >
                  {/* Icon */}
                  <div className="mb-4 inline-flex rounded-xl bg-[#c8a55c]/10 p-3 text-[#c8a55c] transition group-hover:bg-[#c8a55c]/20 group-hover:scale-110">
                    {SERVICE_ICONS[slug] || (
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white/95 transition group-hover:text-[#c8a55c]/90">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 line-clamp-3 text-sm leading-relaxed text-white/60">
                    {service.desc}
                  </p>

                  {/* Price */}
                  <div className="mt-4 min-h-[1.5rem]">
                    {service.price && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                          {locale === "sq" ? "Çmim" : locale === "de" ? "Preis" : "Price"}
                        </span>
                        <span className="text-sm font-semibold text-[#c8a55c]">{service.price}</span>
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-xs font-medium text-[#c8a55c]/70 transition group-hover:text-[#c8a55c] group-hover:gap-3">
                    <span>
                      {locale === "sq" ? "Lexo më shumë" : locale === "de" ? "Mehr erfahren" : "Read more"}
                    </span>
                    <span className="transition group-hover:translate-x-1">→</span>
                  </div>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#c8a55c]/0 to-[#c8a55c]/0 transition group-hover:from-[#c8a55c]/5 group-hover:to-transparent" />
                </LocaleLink>
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
