"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import { SERVICE_ICONS_BY_SLUG } from "@/components/site/service-icons";
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
    { label: "Mirëmbajtje", indices: [10] },
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

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; title: string; titleAccent: string; subtitle: string; getQuote: string; viewWork: string }
> = {
  sq: {
    kicker: "Shërbime",
    title: "Çfarë mund të ",
    titleAccent: "bëjmë për ju",
    subtitle: "Website, rrjete sociale, reklama dhe brand. Zgjidhni çfarë ju duhet.",
    getQuote: "Merr ofertë",
    viewWork: "Shiko punën",
  },
  en: {
    kicker: "Services",
    title: "What we can ",
    titleAccent: "do for you",
    subtitle: "Websites, social media, ads and branding. Pick what you need.",
    getQuote: "Get a quote",
    viewWork: "View our work",
  },
  de: {
    kicker: "Leistungen",
    title: "Was wir ",
    titleAccent: "für Sie tun",
    subtitle: "Websites, Social Media, Anzeigen und Marke. Wählen Sie, was Sie brauchen.",
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

const SEO_SECTIONS_BY_LOCALE: Record<
  Locale,
  {
    strategyTitle: string;
    strategyBody: string[];
    linkingTitle: string;
    linkingBody: string;
    exploreMarketing: string;
    exploreWebsite: string;
    exploreWork: string;
  }
> = {
  sq: {
    strategyTitle: "Si funksionon",
    strategyBody: [
      "Shërbimet i kemi ndarë në dy grupe: marketing dhe website.",
      "Klikoni një shërbim për të parë çfarë përfshin dhe sa kushton.",
    ],
    linkingTitle: "Nuk e dini nga t’ia nisni?",
    linkingBody:
      "Duhen klientë? Shikoni Marketing. Duhet website ose dyqan? Shikoni Website. Doni të shihni punë reale? Shikoni Projektet.",
    exploreMarketing: "Shiko faqen Marketing",
    exploreWebsite: "Shiko faqen Website",
    exploreWork: "Shiko portfolio",
  },
  en: {
    strategyTitle: "How it works",
    strategyBody: [
      "Our services come in two groups: marketing and websites.",
      "Click a service to see what’s included and what it costs.",
    ],
    linkingTitle: "Not sure where to start?",
    linkingBody:
      "Need customers? See Marketing. Need a website or store? See Website. Want to see real work? See Projects.",
    exploreMarketing: "Explore Marketing",
    exploreWebsite: "Explore Website",
    exploreWork: "View work",
  },
  de: {
    strategyTitle: "So funktioniert es",
    strategyBody: [
      "Unsere Leistungen gibt es in zwei Gruppen: Marketing und Websites.",
      "Klicken Sie auf eine Leistung, um Umfang und Preis zu sehen.",
    ],
    linkingTitle: "Unsicher, wo Sie anfangen sollen?",
    linkingBody:
      "Sie brauchen Kunden? Siehe Marketing. Eine Website oder ein Shop? Siehe Website. Echte Arbeiten? Siehe Projekte.",
    exploreMarketing: "Marketing ansehen",
    exploreWebsite: "Website ansehen",
    exploreWork: "Referenzen ansehen",
  },
};

type Props = {
  locale: Locale;
};

export default function ServicesPageContent({ locale }: Props) {
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const hero = HERO_BY_LOCALE[locale];
  const cta = CTA_BY_LOCALE[locale];
  const seoSections = SEO_SECTIONS_BY_LOCALE[locale];
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
      <section className="relative overflow-hidden py-18 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(184,157,94,0.12)_0%,transparent_60%)]" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[white]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8 text-center">
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
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            {hero.subtitle}
          </p>
        </AnimateIn>

        <AnimateIn delay={300}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gray-900 px-8 font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
            >
              {hero.getQuote}
            </LocaleLink>
            <LocaleLink
              href="/work"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-300 px-8 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50 sm:w-auto"
            >
              {hero.viewWork}
            </LocaleLink>
          </div>
        </AnimateIn>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
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

      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900">{seoSections.strategyTitle}</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600 md:text-[15px]">
                {seoSections.strategyBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900">{seoSections.linkingTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-[15px]">{seoSections.linkingBody}</p>
              <div className="mt-6 flex flex-col gap-3">
                <LocaleLink
                  href="/services/marketing"
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-gray-900 px-6 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  {seoSections.exploreMarketing}
                </LocaleLink>
                <LocaleLink
                  href="/services/website"
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-gray-300 bg-white px-6 text-sm font-semibold text-gray-900 transition hover:border-gray-900 hover:bg-gray-50"
                >
                  {seoSections.exploreWebsite}
                </LocaleLink>
                <LocaleLink
                  href="/work"
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-gray-300 bg-white px-6 text-sm font-semibold text-gray-900 transition hover:border-gray-900 hover:bg-gray-50"
                >
                  {seoSections.exploreWork}
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE GRID */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="grid min-h-0 grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map(({ slug, service }, idx) => {
            if (!service) return null;
            return (
              <AnimateIn key={slug} delay={idx * 50} className="h-full">
                <LocaleLink
                  href={`/services/${slug}`}
                  className="group relative flex h-full min-h-[332px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-xl sm:text-left"
                >
                  {/* Top accent */}
                  <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 transition group-hover:opacity-100" />

                  {/* Number + Icon row */}
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs tabular-nums text-gray-500">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="rounded-xl bg-gray-100 p-2.5 text-gray-600 transition group-hover:bg-gray-200 group-hover:text-gray-900">
                      {SERVICE_ICONS_BY_SLUG[slug] || (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-lg font-semibold text-gray-900">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 line-clamp-3 text-sm leading-relaxed text-gray-700">
                    {service.desc}
                  </p>

                  {/* Price + CTA row */}
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-gray-200 pt-5">
                    {service.price ? (
                      <span className="text-sm font-medium text-gray-900">{service.price}</span>
                    ) : (
                      <span />
                    )}
                    <span className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition group-hover:gap-2.5 group-hover:text-gray-900">
                      {locale === "sq" ? "Lexo më shumë" : locale === "de" ? "Mehr erfahren" : "Read more"}
                      <span className="transition group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </LocaleLink>
              </AnimateIn>
            );
          })}
        </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
        <AnimateIn delay={0}>
          <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm md:p-10 md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl lg:text-4xl">
              {cta.title}
              <span className="text-gray-900">{cta.titleAccent}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600 md:mx-0 md:text-lg">{cta.subtitle}</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
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
