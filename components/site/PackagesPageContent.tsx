"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import { type Locale } from "@/lib/services-data";

type PackageGroup = "marketing" | "brand" | "training" | "website" | "maintenance";
type Pkg = { title: string; subtitle: string; price: string; points: string[] };

const PACKAGE_GROUPS: PackageGroup[] = ["marketing", "brand", "training", "website", "maintenance"];

const PACKAGES_BY_GROUP_AND_LOCALE: Record<Locale, Record<PackageGroup, Pkg[]>> = {
  sq: {
    marketing: [
      { title: "Starter", subtitle: "Social + Content", price: "Nga 250€/muaj", points: ["Rrjete sociale", "Përmbajtje bazë", "Raportim mujor"] },
      { title: "Growth", subtitle: "+ Reklama", price: "Nga 500€/muaj", points: ["Starter +", "Meta/Google Ads", "Strategji e personalizuar"] },
      { title: "Scale", subtitle: "Paketë e plotë", price: "Ofertë", points: ["Growth +", "Konsulencë", "Optimizim i vazhdueshëm"] },
    ],
    brand: [
      { title: "Logo", subtitle: "Identitet bazë", price: "Nga 300€", points: ["Koncept logo", "2–3 drejtime", "Formatet e nevojshme"] },
      { title: "Brand Pack", subtitle: "Paketë e plotë", price: "Nga 600€", points: ["Logo +", "Paletë ngjyrash", "Style guide bazë"] },
      { title: "Full Brand", subtitle: "Identitet i plotë", price: "Ofertë", points: ["Brand Pack +", "Tone of voice", "Aplikime (kartëvizita, etj.)"] },
    ],
    training: [
      { title: "1 Ditë", subtitle: "Workshop", price: "Nga 250€", points: ["1 sesion", "Materiale digitale", "Pyetje-përgjigje"] },
      { title: "2 Ditë", subtitle: "Program i plotë", price: "Nga 450€", points: ["2 ditë", "Ushtrime praktike", "Rekomandime pas trajnimit"] },
      { title: "Custom", subtitle: "Për ekipin tuaj", price: "Ofertë", points: ["Modulet e nevojshme", "Kohëzgjatje fleksibël", "Ndjekje opsionale"] },
    ],
    website: [
      { title: "Landing", subtitle: "Një faqe", price: "Nga 400€", points: ["1 faqe konvertuese", "Dizajn i përshtatshëm", "SEO bazë"] },
      { title: "Website", subtitle: "Multi-faqe", price: "Nga 800€", points: ["5–8 faqe", "Forma kontakt", "Mobile-friendly"] },
      { title: "E-commerce / SaaS", subtitle: "Projekt i dedikuar", price: "Ofertë", points: ["Dyqan online ose app", "Integrime", "Mbështetje"] },
    ],
    maintenance: [
      { title: "Bazë", subtitle: "Website, E-commerce, SaaS", price: "Nga 100€/muaj", points: ["Updates dhe backups", "Monitoring bazë", "Support email", "Siguri bazë", "Website, E-commerce dhe SaaS"] },
      { title: "Standard", subtitle: "+ Optimizim", price: "Nga 200€/muaj", points: ["Bazë +", "Optimizim shpejtësie", "SEO monitoring", "Raportim mujor", "Mirembajtje E-commerce dhe SaaS"] },
      { title: "Premium", subtitle: "Paketë e plotë", price: "Ofertë", points: ["Standard +", "Mirembajtje e plotë E-commerce", "Mirembajtje SaaS dhe aplikacione", "Optimizim i vazhdueshëm", "Support prioritet"] },
    ],
  },
  en: {
    marketing: [
      { title: "Starter", subtitle: "Social + Content", price: "From €250/mo", points: ["Social media", "Basic content", "Monthly reporting"] },
      { title: "Growth", subtitle: "+ Ads", price: "From €500/mo", points: ["Starter +", "Meta/Google ads", "Custom strategy"] },
      { title: "Scale", subtitle: "Full package", price: "On request", points: ["Growth +", "Consulting", "Ongoing optimization"] },
    ],
    brand: [
      { title: "Logo", subtitle: "Basic identity", price: "From €300", points: ["Logo concept", "2–3 directions", "Required formats"] },
      { title: "Brand Pack", subtitle: "Full package", price: "From €600", points: ["Logo +", "Colour palette", "Basic style guide"] },
      { title: "Full Brand", subtitle: "Complete identity", price: "On request", points: ["Brand Pack +", "Tone of voice", "Applications (cards, etc.)"] },
    ],
    training: [
      { title: "1 Day", subtitle: "Workshop", price: "From €250", points: ["1 session", "Digital materials", "Q&A"] },
      { title: "2 Days", subtitle: "Full programme", price: "From €450", points: ["2 days", "Practical exercises", "Post-training recommendations"] },
      { title: "Custom", subtitle: "For your team", price: "On request", points: ["Required modules", "Flexible duration", "Optional follow-up"] },
    ],
    website: [
      { title: "Landing", subtitle: "Single page", price: "From €400", points: ["1 conversion page", "Responsive design", "Basic SEO"] },
      { title: "Website", subtitle: "Multi-page", price: "From €800", points: ["5–8 pages", "Contact form", "Mobile-friendly"] },
      { title: "E-commerce / SaaS", subtitle: "Dedicated project", price: "On request", points: ["Online store or app", "Integrations", "Support"] },
    ],
    maintenance: [
      { title: "Basic", subtitle: "Website, E-commerce, SaaS", price: "From €100/mo", points: ["Updates and backups", "Basic monitoring", "Email support", "Basic security", "Website, E-commerce and SaaS"] },
      { title: "Standard", subtitle: "+ Optimization", price: "From €200/mo", points: ["Basic +", "Speed optimization", "SEO monitoring", "Monthly reporting", "E-commerce and SaaS maintenance"] },
      { title: "Premium", subtitle: "Full package", price: "On request", points: ["Standard +", "Full E-commerce maintenance", "SaaS and applications maintenance", "Ongoing optimization", "Priority support"] },
    ],
  },
  de: {
    marketing: [
      { title: "Starter", subtitle: "Social + Content", price: "Ab 250€/Monat", points: ["Social Media", "Basis-Content", "Monatsreporting"] },
      { title: "Growth", subtitle: "+ Ads", price: "Ab 500€/Monat", points: ["Starter +", "Meta/Google Ads", "Individuelle Strategie"] },
      { title: "Scale", subtitle: "Vollpaket", price: "Auf Anfrage", points: ["Growth +", "Beratung", "Laufende Optimierung"] },
    ],
    brand: [
      { title: "Logo", subtitle: "Basis-Identität", price: "Ab 300€", points: ["Logo-Konzept", "2–3 Richtungen", "Erforderliche Formate"] },
      { title: "Brand Pack", subtitle: "Vollpaket", price: "Ab 600€", points: ["Logo +", "Farbpalette", "Basis-Styleguide"] },
      { title: "Full Brand", subtitle: "Komplette Identität", price: "Auf Anfrage", points: ["Brand Pack +", "Tone of Voice", "Anwendungen (Karten etc.)"] },
    ],
    training: [
      { title: "1 Tag", subtitle: "Workshop", price: "Ab 250€", points: ["1 Session", "Digitale Unterlagen", "Frage-Antwort"] },
      { title: "2 Tage", subtitle: "Vollprogramm", price: "Ab 450€", points: ["2 Tage", "Praktische Übungen", "Empfehlungen danach"] },
      { title: "Custom", subtitle: "Für Ihr Team", price: "Auf Anfrage", points: ["Benötigte Module", "Flexible Dauer", "Optionale Nachbetreuung"] },
    ],
    website: [
      { title: "Landing", subtitle: "Eine Seite", price: "Ab 400€", points: ["1 Conversion-Seite", "Responsives Design", "Basis-SEO"] },
      { title: "Website", subtitle: "Mehrseitig", price: "Ab 800€", points: ["5–8 Seiten", "Kontaktformular", "Mobile-friendly"] },
      { title: "E-Commerce / SaaS", subtitle: "Dediziertes Projekt", price: "Auf Anfrage", points: ["Online-Shop oder App", "Integrationen", "Support"] },
    ],
    maintenance: [
      { title: "Basis", subtitle: "Website, E-Commerce, SaaS", price: "Ab 100€/Monat", points: ["Updates und Backups", "Basis-Monitoring", "E-Mail-Support", "Basis-Sicherheit", "Website, E-Commerce und SaaS"] },
      { title: "Standard", subtitle: "+ Optimierung", price: "Ab 200€/Monat", points: ["Basis +", "Geschwindigkeitsoptimierung", "SEO-Monitoring", "Monatsreporting", "E-Commerce- und SaaS-Wartung"] },
      { title: "Premium", subtitle: "Vollpaket", price: "Auf Anfrage", points: ["Standard +", "Vollständige E-Commerce-Wartung", "SaaS- und Anwendungs-Wartung", "Laufende Optimierung", "Prioritäts-Support"] },
    ],
  },
};

const FILTER_TABS_BY_LOCALE: Record<Locale, { label: string; group: PackageGroup | null }[]> = {
  sq: [
    { label: "Të gjitha", group: null },
    { label: "Marketing", group: "marketing" },
    { label: "Brand", group: "brand" },
    { label: "Trajnime", group: "training" },
    { label: "Website", group: "website" },
    { label: "Mirembajtje", group: "maintenance" },
  ],
  en: [
    { label: "All", group: null },
    { label: "Marketing", group: "marketing" },
    { label: "Brand", group: "brand" },
    { label: "Training", group: "training" },
    { label: "Website", group: "website" },
    { label: "Maintenance", group: "maintenance" },
  ],
  de: [
    { label: "Alle", group: null },
    { label: "Marketing", group: "marketing" },
    { label: "Brand", group: "brand" },
    { label: "Training", group: "training" },
    { label: "Website", group: "website" },
    { label: "Wartung", group: "maintenance" },
  ],
};

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

type Props = {
  locale: Locale;
};

export default function PackagesPageContent({ locale }: Props) {
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const hero = HERO_BY_LOCALE[locale];
  const cta = CTA_BY_LOCALE[locale];
  const filterTabs = FILTER_TABS_BY_LOCALE[locale];
  const packages = PACKAGES_BY_GROUP_AND_LOCALE[locale];

  const filteredGroups =
    activeFilter === 0
      ? PACKAGE_GROUPS
      : [filterTabs[activeFilter].group!].filter(Boolean);

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
          {filteredGroups.map((groupKey, groupIdx) => {
            const groupPackages = packages[groupKey];
            const groupLabel = filterTabs.find((t) => t.group === groupKey)?.label || groupKey;
            return (
              <AnimateIn key={groupKey} delay={groupIdx * 100}>
                <div>
                  <h2 className="mb-6 text-xl font-semibold text-[#c8a55c] md:text-2xl">
                    {groupLabel}
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {groupPackages.map((pkg, pkgIdx) => (
                      <div
                        key={pkg.title}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition-all duration-300 hover:border-[#c8a55c]/30 hover:bg-gradient-to-br hover:from-white/[0.1] hover:to-white/[0.05] hover:shadow-[0_0_40px_rgba(200,165,92,0.15)]"
                      >
                        <p className="text-xs font-medium uppercase tracking-wider text-[#c8a55c]">
                          {pkg.subtitle}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-white transition group-hover:text-[#c8a55c]/90">
                          {pkg.title}
                        </h3>
                        <p className="mt-3 text-lg font-semibold text-[#c8a55c]">{pkg.price}</p>
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
                            {locale === "sq" ? "Kërko ofertë" : locale === "de" ? "Angebot anfragen" : "Get a quote"}
                          </LocaleLink>
                        </div>
                        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#c8a55c]/0 to-[#c8a55c]/0 transition group-hover:from-[#c8a55c]/5 group-hover:to-transparent" />
                      </div>
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
