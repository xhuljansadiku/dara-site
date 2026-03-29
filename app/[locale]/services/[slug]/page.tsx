import ServicePageLayout from "@/components/site/ServicePageLayout";
import { getServiceBySlug, SERVICE_SLUGS, type ServiceSlug } from "@/lib/services-data";
import type { Locale } from "@/lib/services-data";
import { DEFAULT_SERVICE_FAQ } from "@/lib/service-page-faq";
import { SERVICE_HERO_SUBLINE } from "@/lib/service-page-extras";
import { getServicePageContent } from "@/lib/services-page-content";
import { buildAlternates } from "@/lib/seo-utils";
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

/** Hero + gallery images per service slug (optional). */
const SERVICE_IMAGES: Partial<Record<ServiceSlug, string[]>> = {
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
  training: [
    "/images/services/consulting/consulting-cover.jpg",
    "/images/services/digital-marketing/digital-marketing-1.jpg",
    "/images/services/social-media/social-media-1.jpg",
  ],
};

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
        name: service.title,
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
    ...(service.price && { offers: { "@type": "Offer", price: service.price } }),
  };

  const faqForJsonLd = content.faq?.length ? content.faq : DEFAULT_SERVICE_FAQ[locale];
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

    const { canonical, languages } = buildAlternates(`services/${slug}`, locale);
    const titlePlain = service.title.replace(/\s*\n\s*/g, " ").trim();
    const title = `${titlePlain} | DARA Marketing Agency`;

    return {
      title,
      description,
      alternates: { canonical, languages },
      openGraph: { title, description },
    };
  })();
}
