import LocaleLink from "@/components/site/LocaleLink";
import { getServiceBySlug, SERVICE_SLUGS } from "@/lib/services-data";
import type { Locale } from "@/lib/services-data";
import {
  getServicePageContent,
  SECTION_LABELS_BY_LOCALE,
} from "@/lib/services-page-content";
import { buildAlternates } from "@/lib/seo-utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales: Locale[] = ["sq", "en", "de"];
  return locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

const CTA_BY_LOCALE: Record<
  Locale,
  { getQuote: string; allServices: string; backHome: string }
> = {
  sq: { getQuote: "Merr ofertë", allServices: "Të gjitha shërbimet", backHome: "Kthehu në kryefaqe" },
  en: { getQuote: "Get a quote", allServices: "All services", backHome: "Back to home" },
  de: { getQuote: "Angebot anfragen", allServices: "Alle Leistungen", backHome: "Zur Startseite" },
};

function ContentSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c8a55c]/90">
        {title}
      </h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/85">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8a55c]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowWeWorkSection({ title, steps }: { title: string; steps: string[] }) {
  if (!steps.length) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c8a55c]/90">
        {title}
      </h3>
      <ol className="mt-2 space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-white/85">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c8a55c]/20 text-xs font-medium text-[#c8a55c]">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function ServiceSlugPage({ params }: Props) {
  const { locale: localeParam, slug } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  const service = getServiceBySlug(locale, slug);
  if (!service) notFound();

  const content = getServicePageContent(locale, slug);
  const labels = SECTION_LABELS_BY_LOCALE[locale];
  const cta = CTA_BY_LOCALE[locale];

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "sq" ? "Kryefaqe" : locale === "de" ? "Startseite" : "Home", item: `${BASE}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "sq" ? "Shërbimet" : locale === "de" ? "Leistungen" : "Services", item: `${BASE}/${locale}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${BASE}/${locale}/services/${slug}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.desc,
    provider: { "@type": "Organization", name: "DARA Marketing Agency" },
    ...(service.price && { offers: { "@type": "Offer", price: service.price } }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <section className="relative overflow-hidden py-8 md:py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">
          {locale === "sq" ? "Shërbim" : locale === "de" ? "Leistung" : "Service"}
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          {service.title}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
          {service.desc}
        </p>

        {service.price && (
          <p className="mt-3 text-sm font-medium text-[#c8a55c]">
            {locale === "sq" && "Çmim referues: "}
            {locale === "en" && "Indicative price: "}
            {locale === "de" && "Richtpreis: "}
            {service.price}
          </p>
        )}
      </section>

      {content && (
        <section className="py-8 md:py-10">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <ContentSection title={labels.whatIncluded} items={content.whatIncluded} />
            <ContentSection title={labels.whoIsItFor} items={content.whoIsItFor} />
            <ContentSection title={labels.benefits} items={content.benefits} />
            <div className="md:col-span-2">
              <HowWeWorkSection title={labels.howWeWork} steps={content.howWeWork} />
            </div>
            {content.priceNote && (
              <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
                <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                  {labels.priceNote}
                </p>
                <p className="mt-1.5 text-sm text-white/70">{content.priceNote}</p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="py-8 md:py-10">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-5 md:p-8">
          <h2 className="text-center text-xl font-semibold md:text-2xl">
            {locale === "sq" && <>Gati të filloni? <span className="text-[#c8a55c]">Na kontaktoni për një ofertë.</span></>}
            {locale === "en" && <>Ready to get started? <span className="text-[#c8a55c]">Contact us for a tailored quote.</span></>}
            {locale === "de" && <>Bereit loszulegen? <span className="text-[#c8a55c]">Kontaktieren Sie uns für ein Angebot.</span></>}
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#c8a55c] px-6 font-medium text-black transition hover:bg-[#b6944f]"
            >
              {cta.getQuote}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-white/90 transition hover:border-white/25 hover:bg-white/10"
            >
              {cta.allServices}
            </LocaleLink>
            <LocaleLink
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-white/90 transition hover:border-white/25 hover:bg-white/10"
            >
              {cta.backHome}
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="h-4" />
    </>
  );
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return (async () => {
    const { locale: localeParam, slug } = await params;
    const locale: Locale = ["sq", "en", "de"].includes(localeParam)
      ? (localeParam as Locale)
      : "sq";
    const service = getServiceBySlug(locale, slug);
    if (!service) return { title: "Service" };
    const { canonical, languages } = buildAlternates(`services/${slug}`, locale);
    return {
      title: service.title,
      description: service.desc,
      alternates: { canonical, languages },
    };
  })();
}
