import Image from "next/image";
import TextWithBreaksAfterPeriods from "@/components/site/TextWithBreaksAfterPeriods";
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

/** Hero + gallery images per service slug (optional) */
const SERVICE_IMAGES: Record<string, string[]> = {
  "website-landing": [
    "/images/services/website/website-cover.jpg",
    "/images/services/website/website-1.jpg",
    "/images/services/website/website-2.jpg",
  ],
  ecommerce: [
    "/images/services/e-commerce/e-commerce-cover.jpg",
    "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
  ],
  saas: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  ],
  maintenance: [
    "/images/services/maintenance/maintenance-cover.jpg",
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  ],
  "social-media": [
    "/images/services/social-media/social-media-cover.jpg",
    "/images/services/social-media/social-media-1.jpg",
    "/images/services/social-media/social-media-2.jpg",
  ],
  content: [
    "/images/services/content-creation/content-creation-cover.jpg",
    "/images/services/content-creation/content-creation-1.jpg",
    "/images/services/content-creation/content-creation-2.jpg",
  ],
  strategy: [
    "/images/services/digital-marketing/digital-marketing-cover.jpg",
    "/images/services/digital-marketing/digital-marketing-1.jpg",
    "/images/services/digital-marketing/digital-marketing-2.jpg",
  ],
  ads: [
    "/images/services/ads/ads-cover.jpg",
    "/images/services/ads/ads-1.jpg",
    "/images/services/ads/ads-2.jpg",
  ],
  consulting: [
    "/images/services/consulting/consulting-cover.jpg",
    "/images/services/consulting/consulting-1.jpg",
    "/images/services/consulting/consulting-2.jpg",
  ],
  branding: [
    "/images/services/branding/branding-cover.jpg",
    "/images/services/branding/branding-1.jpg",
    "/images/services/branding/branding-2.jpg",
  ],
};

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
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_2px_20px_rgba(15,23,42,0.06)] transition-shadow duration-300 md:p-7 hover:shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)]">
      <div className="border-b border-neutral-100 pb-4">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a6d32] md:text-xs">
          {title}
        </h3>
      </div>
      <ul className="mt-5 flex-1 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8a55c]" aria-hidden />
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
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_2px_20px_rgba(15,23,42,0.06)] transition-shadow duration-300 md:p-7 hover:shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)]">
      <div className="border-b border-neutral-100 pb-4">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a6d32] md:text-xs">
          {title}
        </h3>
      </div>
      <ol className="mt-5 flex-1 space-y-4">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4 text-sm leading-relaxed text-neutral-600">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c8a55c]/35 bg-[#c8a55c]/10 text-xs font-semibold tabular-nums text-[#8a6d32]">
              {i + 1}
            </span>
            <span className="min-w-0 pt-1">{step}</span>
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

  const images = SERVICE_IMAGES[slug];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {images && images[0] && (
        <section className="relative h-[min(42vh,380px)] w-full min-h-[14rem] overflow-hidden md:h-[min(46vh,440px)]">
          <Image
            src={images[0]}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/20 to-neutral-950/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(200,165,92,0.15)_0%,transparent_55%)]" />
        </section>
      )}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-stone-50 via-white to-stone-50/50 py-10 md:py-14">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/12 blur-3xl" />
          <div className="absolute bottom-0 right-[-15%] h-64 w-64 rounded-full bg-amber-100/35 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-[#c8a55c]/30 bg-[#c8a55c]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6d32]">
            {locale === "sq" ? "Shërbim" : locale === "de" ? "Leistung" : "Service"}
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
            {service.title}
          </h1>

          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            {service.desc}
          </p>

          {service.price && (
            <p className="mt-4 inline-flex flex-wrap items-center justify-center gap-1 rounded-2xl border border-stone-200/90 bg-white/90 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-black/[0.03] backdrop-blur-sm">
              <span className="text-neutral-500">
                {locale === "sq" && "Çmim referues: "}
                {locale === "en" && "Indicative price: "}
                {locale === "de" && "Richtpreis: "}
              </span>
              {service.price}
            </p>
          )}
        </div>
      </section>

      {content && (
        <section className="relative bg-neutral-100/90 py-10 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            <ContentSection title={labels.whatIncluded} items={content.whatIncluded} />
            <ContentSection title={labels.whoIsItFor} items={content.whoIsItFor} />
            <ContentSection title={labels.benefits} items={content.benefits} />
            <HowWeWorkSection title={labels.howWeWork} steps={content.howWeWork} />
            {content.priceNote && (
              <div className="rounded-3xl bg-white p-6 shadow-[0_2px_20px_rgba(15,23,42,0.06)] transition-shadow duration-300 md:col-span-2 md:p-7 hover:shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)]">
                <div className="border-b border-neutral-100 pb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a6d32] md:text-xs">
                    {labels.priceNote}
                  </p>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                  <TextWithBreaksAfterPeriods text={content.priceNote} variant="rich" />
                </p>
              </div>
            )}
          </div>
          </div>
        </section>
      )}

      {images && images.length > 1 && (
        <section className="border-t border-stone-200/80 py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
              {images.slice(1).map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone-200/90 shadow-sm ring-1 ring-black/[0.03]">
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
          </div>
        </section>
      )}

      <section className="border-t border-stone-200/80 bg-gradient-to-b from-stone-50/60 to-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-stone-200/90 bg-white p-6 shadow-sm ring-1 ring-black/[0.03] md:p-10">
          <h2 className="text-center text-xl font-semibold text-neutral-800 md:text-2xl">
            {locale === "sq" && <>Gati të filloni? <span className="text-neutral-950">Na kontaktoni për një ofertë.</span></>}
            {locale === "en" && <>Ready to get started? <span className="text-neutral-950">Contact us for a tailored quote.</span></>}
            {locale === "de" && <>Bereit loszulegen? <span className="text-neutral-950">Kontaktieren Sie uns für ein Angebot.</span></>}
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-neutral-950 px-6 font-medium text-white transition hover:bg-neutral-800"
            >
              {cta.getQuote}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-11 items-center justify-center rounded-2xl border-2 border-stone-300 bg-white px-6 font-medium text-neutral-900 transition hover:border-neutral-950 hover:bg-stone-50"
            >
              {cta.allServices}
            </LocaleLink>
            <LocaleLink
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-2xl border-2 border-stone-300 bg-white px-6 font-medium text-neutral-900 transition hover:border-neutral-950 hover:bg-stone-50"
            >
              {cta.backHome}
            </LocaleLink>
          </div>
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
    const titleSuffix = locale === "sq" ? " | DARA" : locale === "de" ? " | DARA" : " | DARA";
    return {
      title: service.title + titleSuffix,
      description: service.desc,
      alternates: { canonical, languages },
      openGraph: {
        title: service.title + titleSuffix,
        description: service.desc,
      },
    };
  })();
}
