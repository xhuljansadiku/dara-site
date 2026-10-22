import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import TextWithBreaksAfterPeriods from "@/components/site/TextWithBreaksAfterPeriods";
import { getServiceFaq } from "@/lib/service-page-faq";
import {
  getServiceCategoryKicker,
  getServiceClientInputs,
  getServiceCtaHref,
  SERVICE_CTA,
  SERVICE_HERO_SUBLINE,
  SERVICE_PAGE_TRUST_LINE,
  SERVICE_PROBLEM,
} from "@/lib/service-page-extras";
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
  { viewWork: string; allServices: string; learnMore: string; quoteOnRequest: string; seePackages: string; seeAllWork: string }
> = {
  sq: {
    viewWork: "Shiko projektet",
    allServices: "Të gjitha shërbimet",
    learnMore: "Më shumë",
    quoteOnRequest: "Ofertë sipas nevojës",
    seePackages: "Krahaso paketat",
    seeAllWork: "Shiko projektet e realizuara",
  },
  en: {
    viewWork: "View projects",
    allServices: "All services",
    learnMore: "Learn more",
    quoteOnRequest: "Quote on request",
    seePackages: "Compare packages",
    seeAllWork: "See completed projects",
  },
  de: {
    viewWork: "Referenzen ansehen",
    allServices: "Alle Leistungen",
    learnMore: "Mehr",
    quoteOnRequest: "Angebot auf Anfrage",
    seePackages: "Pakete vergleichen",
    seeAllWork: "Umgesetzte Projekte ansehen",
  },
};

const LONGFORM_LABELS: Record<
  Locale,
  {
    problem: string;
    approach: string;
    includedIntro: string;
    audienceIntro: string;
    processIntro: string;
    clientInputs: string;
    faqIntro: string;
    relatedIntro: string;
    finalTitle: string;
    finalSubtitle: string;
  }
> = {
  sq: {
    problem: "Problemi që zgjidhim",
    approach: "Çfarë bëjmë",
    includedIntro: "Çdo projekt përshtatet sipas qëllimit, por zakonisht përfshin:",
    audienceIntro: "Ky shërbim sjell vlerë sidomos për:",
    processIntro: "Punojmë me hapa të qartë, me aprovimin tuaj në çdo fazë:",
    clientInputs: "Çfarë na duhet nga ju",
    faqIntro: "Pyetjet që marrim më shpesh para se të nisim:",
    relatedIntro: "Shërbime që shpesh kombinohen me këtë:",
    finalTitle: "Gati për hapin tjetër?",
    finalSubtitle: "Na tregoni qëllimin. Ju kthejmë përgjigje brenda 24 orëve me një plan të shkurtër dhe ofertë.",
  },
  en: {
    problem: "The problem we solve",
    approach: "What we do",
    includedIntro: "Each scope is tailored to the goal, but it usually includes:",
    audienceIntro: "This service is most useful for:",
    processIntro: "We work in clear stages, with your approval at each step:",
    clientInputs: "What we need from you",
    faqIntro: "The questions we are asked most often before starting:",
    relatedIntro: "Services that are often combined with this one:",
    finalTitle: "Ready for the next step?",
    finalSubtitle: "Tell us your goal. We reply within 24 hours with a short plan and a quote.",
  },
  de: {
    problem: "Das Problem, das wir lösen",
    approach: "Was wir tun",
    includedIntro: "Jeder Umfang wird an das Ziel angepasst, enthält aber meist:",
    audienceIntro: "Diese Leistung ist besonders sinnvoll für:",
    processIntro: "Wir arbeiten in klaren Phasen, mit Ihrer Freigabe in jedem Schritt:",
    clientInputs: "Was wir von Ihnen brauchen",
    faqIntro: "Die Fragen, die uns vor dem Start am häufigsten gestellt werden:",
    relatedIntro: "Leistungen, die oft mit dieser kombiniert werden:",
    finalTitle: "Bereit für den nächsten Schritt?",
    finalSubtitle: "Nennen Sie uns Ihr Ziel. Wir melden uns innerhalb von 24 Stunden mit einem kurzen Plan und Angebot.",
  },
};

/** Packages filter key for services that have published packages. */
const PACKAGE_GROUP_FOR_SERVICE: Partial<Record<ServiceSlug, string>> = {
  "social-media": "marketing",
  ads: "marketing",
  strategy: "marketing",
  branding: "brand",
  training: "training",
  "website-landing": "websiteLanding",
  ecommerce: "websiteLanding",
  saas: "websiteLanding",
  maintenance: "maintenance",
};

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

const cardClass = "rounded-3xl border border-neutral-200/90 bg-white p-6 text-left shadow-sm ring-1 ring-black/[0.03] md:p-8";

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
  const copy = LONGFORM_LABELS[locale];
  const subline = SERVICE_HERO_SUBLINE[slug][locale];
  const kicker = getServiceCategoryKicker(locale, slug);
  const trust = SERVICE_PAGE_TRUST_LINE[locale];
  const title = service.title.replace(/\s*\n\s*/g, " ").trim();
  const primaryCta = { label: SERVICE_CTA[slug][locale], href: getServiceCtaHref(slug) };
  // Only local images: remote stock photos are not DARA's work and are not shown.
  const localImages = (images ?? []).filter((src) => src.startsWith("/"));
  const heroImage = localImages[0];
  const gallery = localImages.slice(1);
  const related = getRelatedServiceSlugs(slug, 3);
  const servicesList = SERVICE_DETAILS_BY_LOCALE[locale];
  const faqItems = getServiceFaq(locale, slug, title, service.price, content);
  const packageGroup = PACKAGE_GROUP_FOR_SERVICE[slug];

  return (
    <>
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-neutral-200/80 bg-gradient-to-b from-neutral-50 via-white to-[#fafafa]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(184,157,94,0.14)_0%,transparent_55%)]" aria-hidden />

        <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 md:pb-20 md:pt-14 lg:px-8">
          <nav aria-label={locale === "sq" ? "Gjurmë navigimi" : locale === "de" ? "Brotkrumen" : "Breadcrumb"} className="mb-6 text-sm text-neutral-600">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <LocaleLink href="/services" className="underline-offset-2 hover:text-neutral-950 hover:underline">
                  {cta.allServices}
                </LocaleLink>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-medium text-neutral-900">
                {title}
              </li>
            </ol>
          </nav>
          <div className={`grid gap-10 lg:items-center ${heroImage ? "lg:grid-cols-2 lg:gap-14" : ""}`}>
            <div className={heroImage ? "text-center lg:text-left" : "mx-auto max-w-3xl text-center"}>
              <p className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b5a38]">
                <span className="h-px w-6 bg-gradient-to-r from-[#B89D5E] to-transparent" aria-hidden />
                {kicker}
              </p>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                {title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-neutral-600 md:text-xl">{subline}</p>
              <p className="mt-4 text-base font-semibold text-neutral-950">{service.price ?? cta.quoteOnRequest}</p>

              <div className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center ${heroImage ? "justify-center lg:justify-start" : "justify-center"}`}>
                <LocaleLink
                  href={primaryCta.href}
                  className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-2xl bg-neutral-950 px-8 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition hover:bg-neutral-800 sm:w-auto"
                >
                  {primaryCta.label}
                </LocaleLink>
                <LocaleLink
                  href="/work"
                  className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-2xl border-2 border-neutral-200 bg-white px-8 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950 sm:w-auto"
                >
                  {cta.viewWork}
                </LocaleLink>
              </div>
              <p className={`mt-6 text-sm text-neutral-600 ${heroImage ? "text-center lg:text-left" : "text-center"}`}>{trust}</p>
            </div>

            {heroImage && (
              <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-neutral-200/90 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
                  <Image src={heroImage} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6 md:space-y-20 md:py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <SectionCard id="problem" title={copy.problem}>
            <div className={cardClass}>
              <p className="text-[15px] leading-relaxed text-neutral-700">{SERVICE_PROBLEM[slug][locale]}</p>
            </div>
          </SectionCard>
          <SectionCard id="approach" title={copy.approach}>
            <div className={cardClass}>
              <p className="text-[15px] leading-relaxed text-neutral-700">{service.desc}</p>
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <SectionCard id="included" title={labels.whatIncluded}>
            <div className={cardClass}>
              <p className="mb-5 text-sm leading-relaxed text-neutral-600">{copy.includedIntro}</p>
              <ul className="space-y-3">
                {content.whatIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89D5E]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>

          <SectionCard id="audience" title={labels.whoIsItFor}>
            <div className={cardClass}>
              <p className="mb-5 text-sm leading-relaxed text-neutral-600">{copy.audienceIntro}</p>
              <ul className="space-y-3">
                {content.whoIsItFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B89D5E]/15 text-[#8a7344]" aria-hidden>
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>
        </div>

        <SectionCard id="benefits" title={labels.benefits}>
          <ul className="grid gap-4 sm:grid-cols-3">
            {content.benefits.map((item) => (
              <li key={item} className="rounded-2xl border border-neutral-200/90 bg-gradient-to-b from-white to-neutral-50/80 p-5 shadow-sm">
                <p className="text-center text-sm font-medium leading-relaxed text-neutral-800 sm:text-left">{item}</p>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard id="process" title={labels.howWeWork}>
          <p className="mb-5 text-sm leading-relaxed text-neutral-600">{copy.processIntro}</p>
          <ol className="grid gap-4 md:grid-cols-2">
            {content.howWeWork.map((step, i) => (
              <li
                key={i}
                className="flex flex-col items-center gap-3 rounded-3xl border border-neutral-200/90 bg-white p-6 text-center shadow-sm md:flex-row md:items-start md:gap-4 md:text-left"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#B89D5E]/12 text-sm font-bold tabular-nums text-[#6b5a38] ring-1 ring-[#B89D5E]/25" aria-hidden>
                  {i + 1}
                </span>
                <p className="min-w-0 text-sm leading-relaxed text-neutral-700 md:pt-2">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-3xl border border-dashed border-[#B89D5E]/40 bg-[#B89D5E]/[0.06] p-6">
            <h3 className="text-sm font-semibold text-neutral-950">{copy.clientInputs}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{getServiceClientInputs(locale, slug)}</p>
          </div>
        </SectionCard>

        <SectionCard id="pricing" title={labels.priceNote}>
          <div className={`${cardClass} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
            <div>
              <p className="text-xl font-semibold text-neutral-950">{service.price ?? cta.quoteOnRequest}</p>
              {content.priceNote && (
                <div className="mt-3 text-sm leading-relaxed text-neutral-600">
                  <TextWithBreaksAfterPeriods text={content.priceNote} variant="rich" />
                </div>
              )}
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
              <LocaleLink
                href={primaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                {primaryCta.label}
              </LocaleLink>
              {packageGroup && (
                <LocaleLink
                  href={`/packages?group=${packageGroup}`}
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-neutral-300 px-6 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950"
                >
                  {cta.seePackages}
                </LocaleLink>
              )}
            </div>
          </div>
        </SectionCard>

        {gallery.length > 0 && (
          <SectionCard id="visuals" title={labels.workGallery}>
            <div className="grid gap-4 sm:grid-cols-2">
              {gallery.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-neutral-200/90 shadow-sm">
                  <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm md:text-left">
              <LocaleLink href="/work" className="font-semibold text-[#6b5a38] underline-offset-4 hover:underline">
                {cta.seeAllWork} →
              </LocaleLink>
            </p>
          </SectionCard>
        )}

        <SectionCard id="faq" title={labels.faq}>
          <p className="mb-5 text-sm leading-relaxed text-neutral-600">{copy.faqIntro}</p>
          <div className="divide-y divide-neutral-200/90 rounded-3xl border border-neutral-200/90 bg-white shadow-sm">
            {faqItems.map((item) => (
              <details key={item.q} className="group px-5 py-4 md:px-6 md:py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-neutral-950 marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="mt-0.5 shrink-0 text-[#8a7344] transition group-open:rotate-180" aria-hidden>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.a}</p>
              </details>
            ))}
          </div>
        </SectionCard>

        {related.length > 0 && (
          <SectionCard id="related" title={labels.relatedServices}>
            <p className="mb-5 text-sm leading-relaxed text-neutral-600">{copy.relatedIntro}</p>
            <ul className="grid gap-4 sm:grid-cols-3">
              {related.map((relSlug) => {
                const idx = SERVICE_SLUGS.indexOf(relSlug);
                const rel = idx >= 0 ? servicesList[idx] : null;
                if (!rel) return null;
                const relTitle = rel.title.replace(/\s*\n\s*/g, " ");
                return (
                  <li key={relSlug} className="flex">
                    <LocaleLink
                      href={`/services/${relSlug}`}
                      className="group flex w-full flex-col rounded-2xl border border-neutral-200/90 bg-white p-5 text-center shadow-sm transition hover:border-[#B89D5E]/35 hover:shadow-md sm:text-left"
                    >
                      <span className="font-medium text-neutral-950 group-hover:text-[#6b5a38]">{relTitle}</span>
                      <span className="mt-2 line-clamp-2 flex-1 text-sm text-neutral-600">{rel.desc}</span>
                      <span className="mt-3 text-sm font-semibold text-neutral-900">{rel.price ?? cta.quoteOnRequest}</span>
                    </LocaleLink>
                  </li>
                );
              })}
            </ul>
          </SectionCard>
        )}
      </div>

      {/* Final CTA: service-specific */}
      <section className="border-t border-neutral-200/80 bg-gradient-to-b from-neutral-50/80 to-white py-14 md:py-20" aria-labelledby="final-cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="final-cta-heading" className="font-display text-2xl font-semibold text-neutral-950 md:text-3xl">
            {copy.finalTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-600">{copy.finalSubtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <LocaleLink
              href={primaryCta.href}
              className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-2xl bg-neutral-950 px-8 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-800 sm:w-auto"
            >
              {primaryCta.label}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-12 min-h-[48px] w-full items-center justify-center rounded-2xl border-2 border-neutral-200 bg-white px-8 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950 sm:w-auto"
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
