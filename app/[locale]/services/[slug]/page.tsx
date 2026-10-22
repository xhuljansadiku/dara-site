import ServicePageLayout from "@/components/site/ServicePageLayout";
import { getServiceBySlug, SERVICE_MIN_PRICE_EUR, SERVICE_SLUGS, type ServiceSlug } from "@/lib/services-data";
import type { Locale } from "@/lib/services-data";
import { getServiceFaq } from "@/lib/service-page-faq";
import { SERVICE_HERO_SUBLINE, SERVICE_IMAGES } from "@/lib/service-page-extras";
import { getServicePageContent } from "@/lib/services-page-content";
import { buildLocalizedMetadata } from "@/lib/seo-utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales: Locale[] = ["sq", "en", "de"];
  return locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al";

export default function ServiceSlugPage({ params }: Props) {
  const { locale: localeParam, slug: slugParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  const slug = slugParam as ServiceSlug;
  const service = getServiceBySlug(locale, slug);
  if (!service) notFound();

  const content = getServicePageContent(locale, slug);
  if (!content) notFound();

  const images = SERVICE_IMAGES[slug];

  /** Single-line title for schema, breadcrumbs, alt text (hero may use multi-line `service.title`) */
  const titlePlain = service.title.replace(/\s*\n\s*/g, " ").trim();

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "sq" ? "Kryefaqe" : locale === "de" ? "Startseite" : "Home",
        item: `${BASE}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "sq" ? "Shërbimet" : locale === "de" ? "Leistungen" : "Services",
        item: `${BASE}/${locale}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: titlePlain,
        item: `${BASE}/${locale}/services/${slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: titlePlain,
    description: service.desc,
    provider: { "@type": "Organization", name: "DARA Marketing Agency" },
    // schema.org needs a numeric price; the published starting price is a minimum.
    ...(SERVICE_MIN_PRICE_EUR[slug] > 0 && {
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "PriceSpecification", minPrice: SERVICE_MIN_PRICE_EUR[slug], priceCurrency: "EUR" },
      },
    }),
  };

  const faqForJsonLd = getServiceFaq(locale, slug, titlePlain, service.price, content);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqForJsonLd.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ServicePageLayout locale={locale} slug={slug} service={service} content={content} images={images} />
    </>
  );
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return (async () => {
    const { locale: localeParam, slug: slugParam } = await params;
    const locale: Locale = ["sq", "en", "de"].includes(localeParam)
      ? (localeParam as Locale)
      : "sq";
    const slug = slugParam as ServiceSlug;
    const service = getServiceBySlug(locale, slug);
    if (!service) return { title: "Service" };

    const sub = SERVICE_HERO_SUBLINE[slug]?.[locale] ?? "";
    const description = [service.desc, sub].filter(Boolean).join(" ").slice(0, 160);
    const titlePlain = service.title.replace(/\s*\n\s*/g, " ").trim();
    const title = `${titlePlain} | DARA Marketing Agency`;

    return buildLocalizedMetadata({
      locale,
      path: `/services/${slug}`,
      title,
      description,
    });
  })();
}
