import Image from "next/image";
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
        {title}
      </h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
        {title}
      </h3>
      <ol className="mt-2 space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-gray-700">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-900">
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

  const images = SERVICE_IMAGES[slug];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {images && images[0] && (
        <section className="relative h-56 w-full overflow-hidden md:h-72">
          <Image
            src={images[0]}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </section>
      )}
      <section className="relative overflow-hidden py-8 md:py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
            {locale === "sq" ? "Shërbim" : locale === "de" ? "Leistung" : "Service"}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
            {service.title}
          </h1>

          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-gray-600">
            {service.desc}
          </p>

          {service.price && (
            <p className="mt-3 text-sm font-medium text-gray-900">
              {locale === "sq" && "Çmim referues: "}
              {locale === "en" && "Indicative price: "}
              {locale === "de" && "Richtpreis: "}
              {service.price}
            </p>
          )}
        </div>
      </section>

      {content && (
        <section className="py-8 md:py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <ContentSection title={labels.whatIncluded} items={content.whatIncluded} />
            <ContentSection title={labels.whoIsItFor} items={content.whoIsItFor} />
            <ContentSection title={labels.benefits} items={content.benefits} />
            <div className="md:col-span-2">
              <HowWeWorkSection title={labels.howWeWork} steps={content.howWeWork} />
            </div>
            {content.priceNote && (
              <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  {labels.priceNote}
                </p>
                <p className="mt-1.5 text-sm text-gray-700">{content.priceNote}</p>
              </div>
            )}
          </div>
          </div>
        </section>
      )}

      {images && images.length > 1 && (
        <section className="py-8 md:py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
              {images.slice(1).map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
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

      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-center text-xl font-semibold text-gray-900 md:text-2xl">
            {locale === "sq" && <>Gati të filloni? <span className="text-gray-900">Na kontaktoni për një ofertë.</span></>}
            {locale === "en" && <>Ready to get started? <span className="text-gray-900">Contact us for a tailored quote.</span></>}
            {locale === "de" && <>Bereit loszulegen? <span className="text-gray-900">Kontaktieren Sie uns für ein Angebot.</span></>}
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-gray-900 px-6 font-medium text-white transition hover:bg-gray-800"
            >
              {cta.getQuote}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-gray-300 px-6 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50"
            >
              {cta.allServices}
            </LocaleLink>
            <LocaleLink
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-gray-300 px-6 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50"
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
