// app/[locale]/process/page.tsx
import LocaleLink from "@/components/site/LocaleLink";
import type { Metadata } from "next";
import { use } from "react";

type Locale = "sq" | "en" | "de";

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Procesi ynë",
    description:
      "Si punojmë: audit, strategji, launch dhe optimizim për marketing digjital dhe zhvillim website që sjell rezultate të qëndrueshme.",
  },
  en: {
    title: "Process",
    description:
      "Clear process: audit, build, launch, optimize & scale for sustainable results.",
  },
  de: {
    title: "Prozess",
    description:
      "Klarer Prozess: Audit, Aufbau, Launch, Optimierung und Skalierung für nachhaltige Ergebnisse.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (["sq", "en", "de"].includes(locale) ? locale : "sq") as Locale;
  const meta = META_BY_LOCALE[l];
  return {
    title: meta.title,
    description: meta.description,
  };
}

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; title: string; titleAccent: string; subtitle: string; ctaAudit: string; ctaServices: string }
> = {
  sq: {
    kicker: "Procesi",
    title: "Proces i qartë, ekzekutim ",
    titleAccent: "i fortë",
    subtitle: "Pa fjalë të kota. Ne ndërtojmë sistem: audit → asetet → launch → optimizim & scale.",
    ctaAudit: "Kërko audit",
    ctaServices: "Shërbimet",
  },
  en: {
    kicker: "Process",
    title: "Clear process, ",
    titleAccent: "strong execution",
    subtitle: "No fluff. We build a system: audit → assets → launch → optimize & scale.",
    ctaAudit: "Request audit",
    ctaServices: "Services",
  },
  de: {
    kicker: "Prozess",
    title: "Klarer Prozess, ",
    titleAccent: "starke Umsetzung",
    subtitle: "Kein Geschwätz. Wir bauen ein System: Audit → Assets → Launch → Optimierung & Skalierung.",
    ctaAudit: "Audit anfragen",
    ctaServices: "Leistungen",
  },
};

const STEPS_BY_LOCALE: Record<
  Locale,
  Array<{ n: string; title: string; desc: string; bullets: string[] }>
> = {
  sq: [
    {
      n: "01",
      title: "Audit & Discovery",
      desc: "E kuptojmë biznesin, ofertën, audiencën, dhe ku po humbin konvertimet.",
      bullets: ["Audit website + funnel", "Konkurrenca & positioning", "KPI + objektiva", "Plan 7–30 ditë"],
    },
    {
      n: "02",
      title: "Strategy & Assets",
      desc: "Ndërtojmë planin dhe asetet që e bëjnë marketingun të performojë realisht.",
      bullets: ["Landing pages / UX", "Tracking (events + pixels)", "Creative & copy", "Content calendar"],
    },
    {
      n: "03",
      title: "Launch & Testing",
      desc: "Nisim me strukturë, jo “random ads”. Pastaj testojmë për fitues.",
      bullets: ["Campaign structure", "A/B testing", "Budget allocation", "Offer iterations"],
    },
    {
      n: "04",
      title: "Optimize & Scale",
      desc: "Optimizojmë çdo javë dhe skalojmë vetëm atë që sjell rezultat.",
      bullets: ["Weekly reporting", "CRO improvements", "Scale winners", "New creative cycles"],
    },
  ],
  en: [
    {
      n: "01",
      title: "Audit & Discovery",
      desc: "We understand your business, offer, audience, and where conversions are lost.",
      bullets: ["Website + funnel audit", "Competition & positioning", "KPI & objectives", "7–30 day plan"],
    },
    {
      n: "02",
      title: "Strategy & Assets",
      desc: "We build the plan and assets that make marketing perform in the real world.",
      bullets: ["Landing pages / UX", "Tracking (events + pixels)", "Creative & copy", "Content calendar"],
    },
    {
      n: "03",
      title: "Launch & Testing",
      desc: "We launch with structure, not random ads. Then we test for winners.",
      bullets: ["Campaign structure", "A/B testing", "Budget allocation", "Offer iterations"],
    },
    {
      n: "04",
      title: "Optimize & Scale",
      desc: "We optimize every week and scale only what delivers results.",
      bullets: ["Weekly reporting", "CRO improvements", "Scale winners", "New creative cycles"],
    },
  ],
  de: [
    {
      n: "01",
      title: "Audit & Discovery",
      desc: "Wir verstehen Ihr Geschäft, Ihr Angebot, die Zielgruppe und wo Konversionen verloren gehen.",
      bullets: ["Website- + Funnel-Audit", "Wettbewerb & Positionierung", "KPI & Ziele", "7–30 Tage Plan"],
    },
    {
      n: "02",
      title: "Strategy & Assets",
      desc: "Wir erstellen den Plan und die Assets, die Marketing in der Praxis wirksam machen.",
      bullets: ["Landing Pages / UX", "Tracking (Events + Pixels)", "Creative & Copy", "Content-Kalender"],
    },
    {
      n: "03",
      title: "Launch & Testing",
      desc: "Wir starten mit Struktur, keine zufälligen Ads. Dann testen wir auf Gewinner.",
      bullets: ["Kampagnenstruktur", "A/B-Tests", "Budgetverteilung", "Angebots-Iterationen"],
    },
    {
      n: "04",
      title: "Optimize & Scale",
      desc: "Wir optimieren wöchentlich und skalieren nur, was Ergebnisse liefert.",
      bullets: ["Wöchentliches Reporting", "CRO-Verbesserungen", "Gewinner skalieren", "Neue Creative-Zyklen"],
    },
  ],
};

const DELIVERABLES_BY_LOCALE: Record<Locale, { title: string; items: { label: string; desc: string }[] }> = {
  sq: {
    title: "Deliverables",
    items: [
      { label: "Plan & KPI", desc: "Objektiva të qarta + roadmap" },
      { label: "Design/UX", desc: "Pages që konvertojnë" },
      { label: "Tracking", desc: "Evente + atribim bazik" },
      { label: "Ads/Content", desc: "Creative + copy + cadence" },
      { label: "Optimization", desc: "Testim & përmirësim i vazhdueshëm" },
    ],
  },
  en: {
    title: "Deliverables",
    items: [
      { label: "Plan & KPI", desc: "Clear objectives + roadmap" },
      { label: "Design/UX", desc: "Pages that convert" },
      { label: "Tracking", desc: "Events + basic attribution" },
      { label: "Ads/Content", desc: "Creative + copy + cadence" },
      { label: "Optimization", desc: "Ongoing testing & improvement" },
    ],
  },
  de: {
    title: "Lieferables",
    items: [
      { label: "Plan & KPI", desc: "Klare Ziele + Roadmap" },
      { label: "Design/UX", desc: "Seiten, die konvertieren" },
      { label: "Tracking", desc: "Events + Basis-Attribution" },
      { label: "Ads/Content", desc: "Creative + Copy + Cadence" },
      { label: "Optimization", desc: "Laufende Tests & Verbesserung" },
    ],
  },
};

const STEPS_SECTION_BY_LOCALE: Record<Locale, { title: string; subtitle: string }> = {
  sq: { title: "Hapat", subtitle: "Çdo hap ka output të qartë, që të mos ketë konfuzion." },
  en: { title: "The steps", subtitle: "Each step has a clear output, so there’s no confusion." },
  de: { title: "Die Schritte", subtitle: "Jeder Schritt hat ein klares Ergebnis, ohne Konfusion." },
};

const CTA_BY_LOCALE: Record<
  Locale,
  { title: string; titleAccent: string; subtitle: string; ctaContact: string; ctaWork: string }
> = {
  sq: {
    title: "Gati për rritje? ",
    titleAccent: "Le të flasim.",
    subtitle: "Na trego çfarë synon dhe ku je sot. Të kthejmë me një plan të shkurtër.",
    ctaContact: "Kontakt",
    ctaWork: "Shiko punën",
  },
  en: {
    title: "Ready to grow? ",
    titleAccent: "Let's talk.",
    subtitle: "Tell us your goals and where you are today. We’ll come back with a short plan.",
    ctaContact: "Contact",
    ctaWork: "View work",
  },
  de: {
    title: "Bereit zu wachsen? ",
    titleAccent: "Lass uns reden.",
    subtitle: "Erzähl uns deine Ziele und wo du heute stehst. Wir melden uns mit einem kurzen Plan.",
    ctaContact: "Kontakt",
    ctaWork: "Arbeiten ansehen",
  },
};

export default function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeFromParams } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeFromParams) ? (localeFromParams as Locale) : "sq";

  const hero = HERO_BY_LOCALE[locale];
  const steps = STEPS_BY_LOCALE[locale];
  const deliverables = DELIVERABLES_BY_LOCALE[locale];
  const stepsSection = STEPS_SECTION_BY_LOCALE[locale];
  const cta = CTA_BY_LOCALE[locale];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[white]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8 text-center">
          <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            {hero.kicker}
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {hero.title}
            <span className="text-gray-900">{hero.titleAccent}</span>
          </h1>

          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">{hero.subtitle}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gray-900 px-8 font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
            >
              {hero.ctaAudit}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-300 px-8 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50 sm:w-auto"
            >
              {hero.ctaServices}
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-8">
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-gray-600">{deliverables.title}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {deliverables.items.map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3"
              >
                <span className="text-sm font-medium text-gray-900">{d.label}</span>
                <span className="text-xs text-gray-600">{d.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS - Timeline */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">{stepsSection.title}</h2>
        <p className="mt-2 max-w-2xl text-gray-600">{stepsSection.subtitle}</p>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gray-200 md:left-6" />
            <ul className="space-y-8 md:space-y-10">
              {steps.map((s, i) => (
                <li key={s.n} className="relative flex gap-6 md:gap-8">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-900 text-xs font-semibold text-white md:h-12 md:w-12">
                    {s.n}
                  </div>
                  <div className="card card-lift min-w-0 flex-1 p-6">
                    <h3 className="text-lg font-medium text-gray-900">{s.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                    <div className="mt-5 h-px bg-gray-200" />
                    <ul className="mt-4 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-10">
          <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            {cta.title}
            <span className="text-gray-900">{cta.titleAccent}</span>
          </h2>
          <p className="mt-2 max-w-2xl text-gray-600">{cta.subtitle}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-gray-900 px-5 font-medium text-white transition hover:bg-gray-800 sm:w-auto"
            >
              {cta.ctaContact}
            </LocaleLink>
            <LocaleLink
              href="/work"
              className="inline-flex h-11 w-full items-center justify-center rounded-full border-2 border-gray-300 px-5 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50 sm:w-auto"
            >
              {cta.ctaWork}
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
