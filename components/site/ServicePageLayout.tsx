import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import TextWithBreaksAfterPeriods from "@/components/site/TextWithBreaksAfterPeriods";
import { DEFAULT_SERVICE_FAQ } from "@/lib/service-page-faq";
import { getServiceCategoryKicker, SERVICE_HERO_SUBLINE, SERVICE_PAGE_TRUST_LINE } from "@/lib/service-page-extras";
import { getRelatedServiceSlugs } from "@/lib/service-page-related";
import {
  SERVICE_DETAILS_BY_LOCALE,
  SERVICE_SLUGS,
  type ServiceDetail,
  type Locale,
} from "@/lib/services-data";
import type { ServiceSlug } from "@/lib/services-data";
import type { ServicePageContent } from "@/lib/services-page-content";
import { SECTION_LABELS_BY_LOCALE } from "@/lib/services-page-content";

const CTA_LABELS: Record<
  Locale,
  { getQuote: string; viewWork: string; allServices: string; learnMore: string }
> = {
  sq: {
    getQuote: "Merr ofertë",
    viewWork: "Shiko punët",
    allServices: "Të gjitha shërbimet",
    learnMore: "Më shumë",
  },
  en: {
    getQuote: "Get a quote",
    viewWork: "View work",
    allServices: "All services",
    learnMore: "Learn more",
  },
  de: {
    getQuote: "Angebot anfragen",
    viewWork: "Referenzen",
    allServices: "Alle Leistungen",
    learnMore: "Mehr",
  },
};

const LONGFORM_LABELS: Record<
  Locale,
  {
    whatIsThis: string;
    whyItMatters: string;
    includedIntro: string;
    audienceIntro: string;
    processIntro: string;
    faqIntro: string;
    relatedIntro: string;
  }
> = {
  sq: {
    whatIsThis: "Çfarë është ky shërbim",
    whyItMatters: "Pse ka rëndësi",
    includedIntro: "Çdo projekt përshtatet sipas qëllimit, por zakonisht përfshin këto elemente thelbësore:",
    audienceIntro: "Ky shërbim sjell vlerë sidomos për këto profile biznesi dhe raste përdorimi:",
    processIntro: "Punojmë me hapa të qartë që nga analiza fillestare deri te dorëzimi dhe optimizimi:",
    faqIntro: "Këto janë pyetjet që marrim më shpesh para se të nisim bashkëpunimin:",
    relatedIntro: "Nëse po e vlerëson këtë shërbim, këto faqe janë zakonisht hapi tjetër më relevant:",
  },
  en: {
    whatIsThis: "What is this service",
    whyItMatters: "Why it matters",
    includedIntro: "Each scope is tailored to the goal, but these are the core deliverables most projects include:",
    audienceIntro: "This service tends to create the most value for these business profiles and use cases:",
    processIntro: "We run the work through clear stages, from discovery to delivery and ongoing improvement:",
    faqIntro: "These are the questions we answer most often before a project starts:",
    relatedIntro: "If you are considering this service, these related pages are usually the next useful step:",
  },
  de: {
    whatIsThis: "Was ist diese Leistung",
    whyItMatters: "Warum sie wichtig ist",
    includedIntro: "Jeder Umfang wird an das Ziel angepasst, aber diese Bausteine gehören in den meisten Projekten dazu:",
    audienceIntro: "Diese Leistung schafft besonders viel Wert für folgende Unternehmen und Einsatzfälle:",
    processIntro: "Wir arbeiten in klaren Phasen, von der Analyse bis zur Umsetzung und Optimierung:",
    faqIntro: "Das sind die Fragen, die wir vor dem Projektstart am häufigsten beantworten:",
    relatedIntro: "Wenn Sie diese Leistung prüfen, sind diese Seiten meist der sinnvollste nächste Schritt:",
  },
};


function splitSentences(text: string): string[] {
  return text
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildNarrativeCopy(locale: Locale, service: ServiceDetail, content: ServicePageContent, subline: string) {
  const cleanTitle = service.title.replace(/\s*\n\s*/g, " ").trim();
  const descSentences = splitSentences(service.desc);

  const whyItMatters: Record<Locale, string> = {
    sq: "Shumë biznese humbasin klientë jo nga mungesa e trafikut, por nga mungesa e strukturës. Ne ndërtojmë zgjidhje që komunikojnë ofertën qartë dhe e çojnë vizitorin drejt veprimit.",
    en: "Most businesses lose leads not from lack of traffic, but from lack of structure. We build solutions that communicate the offer clearly and guide visitors toward action.",
    de: "Viele Unternehmen verlieren Anfragen nicht wegen fehlender Sichtbarkeit, sondern wegen unklarer Struktur. Wir bauen Lösungen, die das Angebot klar kommunizieren und Besucher zur Handlung führen.",
  };

  return {
    whatIsThis: [
      `${cleanTitle}.`,
      ...descSentences,
      subline,
    ],
    whyItMatters: splitSentences(whyItMatters[locale]),
    supporting: [],
  };
}

function SectionCard({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`scroll-mt-24 ${className}`}>
      <h2 id={`${id}-heading`} className="text-center font-display text-2xl font-semibold tracking-tight text-neutral-950 md:text-left md:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export type ServicePageLayoutProps = {
  locale: Locale;
  slug: ServiceSlug;
  service: ServiceDetail;
  content: ServicePageContent;
  images?: string[];
};

export default function ServicePageLayout({ locale, slug, service, content, images }: ServicePageLayoutProps) {
  const labels = SECTION_LABELS_BY_LOCALE[locale];
  const cta = CTA_LABELS[locale];
  const subline = SERVICE_HERO_SUBLINE[slug][locale];
  const kicker = getServiceCategoryKicker(locale, slug);
  const trust = SERVICE_PAGE_TRUST_LINE[locale];
  const heroImage = images?.[0];
  const gallery = images && images.length > 1 ? images.slice(1) : [];
  const related = getRelatedServiceSlugs(slug, 3);
  const servicesList = SERVICE_DETAILS_BY_LOCALE[locale];
  const faqItems = content.faq?.length ? content.faq : DEFAULT_SERVICE_FAQ[locale];
  const longformLabels = LONGFORM_LABELS[locale];
  const narrative = buildNarrativeCopy(locale, service, content, subline);

  return (
    <>
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-neutral-200/80 bg-gradient-to-b from-neutral-50 via-white to-[#fafafa]">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45] [mask-image:linear-gradient(180deg,white,transparent)]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(184,157,94,0.14)_0%,transparent_55%)]" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#B89D5E]/10 blur-3xl" aria-hidden />

        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 md:pb-20 md:pt-14 lg:px-8">
          <div className={`grid gap-10 lg:items-center ${heroImage ? "lg:grid-cols-2 lg:gap-14" : ""}`}>
            <div className={heroImage ? "text-center lg:text-left" : "mx-auto max-w-3xl text-center"}>
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b5a38]">
                  <span className="h-px w-6 bg-gradient-to-r from-[#B89D5E] to-transparent" aria-hidden />
                  {kicker}
                </span>
              </div>
              <h1 className="mt-5 whitespace-pre-line font-display text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                {service.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-neutral-600 md:text-xl">{subline}</p>

              <div
                className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center ${
                  heroImage ? "justify-center lg:justify-start" : "justify-center"
                }`}
              >
                <LocaleLink
                  href="/contact"
                  className="inline-flex h-12 min-h-[48px] w-full min-w-0 items-center justify-center rounded-2xl bg-neutral-950 px-8 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition-[background-color,box-shadow,transform] duration-300 hover:bg-neutral-800 sm:w-auto"
                >
                  {cta.getQuote}
                </LocaleLink>
                <LocaleLink
                  href="/work"
                  className="inline-flex h-12 min-h-[48px] w-full min-w-0 items-center justify-center rounded-2xl border-2 border-neutral-200 bg-white px-8 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950 hover:bg-neutral-50 sm:w-auto"
                >
                  {cta.viewWork}
                </LocaleLink>
                <LocaleLink
                  href="/contact"
                  className={`inline-flex h-12 min-h-[48px] w-full items-center justify-center text-sm font-medium text-[#6b5a38] underline-offset-4 transition hover:underline sm:w-auto ${
                    heroImage ? "lg:ml-0" : ""
                  }`}
                >
                  {locale === "sq" ? "Kontakt" : locale === "de" ? "Kontakt" : "Contact"}
                </LocaleLink>
              </div>
              <p className={`mt-6 text-sm text-neutral-500 ${heroImage ? "text-center lg:text-left" : "text-center"}`}>
                {trust}
              </p>
            </div>

            {heroImage && (
              <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-neutral-200/90 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.04]">
                  <Image
                    src={heroImage}
                    alt={service.title.replace(/\s*\n\s*/g, " ").trim()}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950/20 via-transparent to-transparent" aria-hidden />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-18 sm:px-6 md:space-y-20 md:py-20 lg:px-8">
        <SectionCard id="what-is-this" title={longformLabels.whatIsThis}>
          <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 text-left shadow-sm ring-1 ring-black/[0.03] md:p-8">
            <div className="space-y-4 text-sm leading-relaxed text-neutral-700 md:text-[15px]">
              {narrative.whatIsThis.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard id="why-it-matters" title={longformLabels.whyItMatters}>
          <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 text-left shadow-sm ring-1 ring-black/[0.03] md:p-8">
            <div className="space-y-4 text-sm leading-relaxed text-neutral-700 md:text-[15px]">
              {narrative.whyItMatters.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {narrative.supporting.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <SectionCard id="included" title={labels.whatIncluded}>
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 text-left shadow-sm ring-1 ring-black/[0.03] md:p-8">
              <p className="mb-5 text-sm leading-relaxed text-neutral-600">{longformLabels.includedIntro}</p>
              <ul className="space-y-3">
                {content.whatIncluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89D5E]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>

          <SectionCard id="audience" title={labels.whoIsItFor}>
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 text-left shadow-sm ring-1 ring-black/[0.03] md:p-8">
              <p className="mb-5 text-sm leading-relaxed text-neutral-600">{longformLabels.audienceIntro}</p>
              <ul className="space-y-3">
                {content.whoIsItFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B89D5E]/15 text-[#B89D5E]" aria-hidden>
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>
        </div>

        <SectionCard id="results" title={labels.benefits}>
          <div className="grid gap-4 sm:grid-cols-3">
            {content.benefits.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-neutral-200/90 bg-gradient-to-b from-white to-neutral-50/80 p-5 shadow-sm ring-1 ring-black/[0.03] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-center text-sm font-medium leading-relaxed text-neutral-800 sm:text-left">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="process" title={labels.howWeWork}>
          <p className="mb-5 text-sm leading-relaxed text-neutral-600">{longformLabels.processIntro}</p>
          <ol className="grid gap-4 md:grid-cols-2">
            {content.howWeWork.map((step, i) => (
              <li
                key={i}
                className="flex flex-col items-center gap-3 rounded-3xl border border-neutral-200/90 bg-white p-6 text-center shadow-sm ring-1 ring-black/[0.03] transition hover:shadow-md md:flex-row md:items-start md:gap-4 md:text-left"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#B89D5E]/12 text-sm font-bold tabular-nums text-[#6b5a38] ring-1 ring-[#B89D5E]/25">
                  {i + 1}
                </span>
                <p className="min-w-0 pt-0 text-sm leading-relaxed text-neutral-700 md:pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </SectionCard>

        {content.priceNote && (
          <SectionCard id="pricing" title={labels.priceNote}>
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 text-center shadow-sm ring-1 ring-black/[0.03] md:p-8 md:text-left">
              {service.price && <p className="text-lg font-semibold text-neutral-950">{service.price}</p>}
              <div className={`${service.price ? "mt-4" : ""} text-sm leading-relaxed text-neutral-600`}>
                <TextWithBreaksAfterPeriods text={content.priceNote} variant="rich" />
              </div>
            </div>
          </SectionCard>
        )}

        <div className="rounded-3xl bg-neutral-950 px-6 py-10 text-center shadow-xl shadow-neutral-900/20 md:px-10">
          <p className="font-display text-xl font-semibold text-white md:text-2xl">{labels.midCta}</p>
          <p className="mx-auto mt-2 max-w-lg text-sm text-neutral-400">
            {locale === "sq"
              ? "Na tregoni objektivin dhe ju kthejmë me një plan të qartë."
              : locale === "de"
                ? "Nennen Sie uns Ihr Ziel, wir melden uns mit einem klaren Plan."
                : "Tell us your goal, we’ll come back with a clear plan."}
          </p>
          <LocaleLink
            href="/contact"
            className="mt-6 inline-flex h-12 min-h-[48px] w-full max-w-md items-center justify-center rounded-2xl bg-white px-8 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-100 sm:w-auto"
          >
            {cta.getQuote}
          </LocaleLink>
        </div>

        {gallery.length > 0 && (
          <SectionCard id="work" title={labels.workGallery}>
            <div className="grid gap-4 sm:grid-cols-2">
              {gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200/90 shadow-sm ring-1 ring-black/[0.03]"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        <SectionCard id="faq" title={labels.faq}>
          <p className="mb-5 text-sm leading-relaxed text-neutral-600">{longformLabels.faqIntro}</p>
          <div className="divide-y divide-neutral-200/90 rounded-3xl border border-neutral-200/90 bg-white shadow-sm ring-1 ring-black/[0.03]">
            {faqItems.map((item) => (
              <details key={item.q} className="group px-5 py-4 md:px-6 md:py-5">
                <summary className="cursor-pointer list-none pr-8 font-medium text-neutral-950 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="mt-0.5 shrink-0 text-[#B89D5E] transition group-open:rotate-180" aria-hidden>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.a}</p>
              </details>
            ))}
          </div>
        </SectionCard>

        {related.length > 0 && (
          <SectionCard id="related" title={labels.relatedServices}>
            <p className="mb-5 text-sm leading-relaxed text-neutral-600">{longformLabels.relatedIntro}</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((relSlug) => {
                const idx = SERVICE_SLUGS.indexOf(relSlug);
                const rel = idx >= 0 ? servicesList[idx] : null;
                if (!rel) return null;
                return (
                  <LocaleLink
                    key={relSlug}
                    href={`/services/${relSlug}`}
                    className="group flex flex-col rounded-2xl border border-neutral-200/90 bg-white p-5 text-center shadow-sm ring-1 ring-black/[0.03] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#B89D5E]/35 hover:shadow-md sm:text-left"
                  >
                    <span className="font-medium text-neutral-950 group-hover:text-[#6b5a38]">{rel.title}</span>
                    <span className="mt-2 line-clamp-2 flex-1 text-sm text-neutral-600">{rel.desc}</span>
                    <span className="mt-4 text-sm font-medium text-[#6b5a38]">
                      {cta.learnMore}
                      <span aria-hidden> →</span>
                    </span>
                  </LocaleLink>
                );
              })}
            </div>
          </SectionCard>
        )}
      </div>

      {/* Final CTA */}
      <section className="border-t border-neutral-200/80 bg-gradient-to-b from-neutral-50/80 to-white py-14 md:py-20" aria-labelledby="final-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="final-cta-heading" className="font-display text-2xl font-semibold text-neutral-950 md:text-3xl">
            {locale === "sq" && (
              <>
                Gati të rrisësh rezultatet?
                <br />
                <span className="text-neutral-600">Kërko një ofertë të personalizuar.</span>
              </>
            )}
            {locale === "en" && (
              <>
                Ready to grow?
                <br />
                <span className="text-neutral-600">Get a tailored quote.</span>
              </>
            )}
            {locale === "de" && (
              <>
                Bereit durchzustarten?
                <br />
                <span className="text-neutral-600">Holen Sie sich ein passendes Angebot.</span>
              </>
            )}
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-2xl bg-neutral-950 px-8 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-800 sm:w-auto"
            >
              {cta.getQuote}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-2xl border-2 border-neutral-200 bg-white px-8 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950 hover:bg-neutral-50 sm:w-auto"
            >
              {cta.allServices}
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="h-6" />
    </>
  );
}
