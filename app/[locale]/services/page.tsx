// app/[locale]/services/page.tsx
import ServicesPageContent from "@/components/site/ServicesPageContent";
import {
  type Locale,
} from "@/lib/services-data";
import type { Metadata } from "next";
import { use } from "react";

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Shërbime web design, krijim website & marketing digjital",
    description:
      "Krijim website, web design Tirana, dyqan online, mirembajtje website. Marketing digjital shqip: rrjetet sociale, branding, reklama Meta & Google, strategji. Agjenci për biznese në Shqipëri.",
  },
  en: {
    title: "Services",
    description:
      "Social Media Management, Content Creation, Strategy, Branding, Ads, Consulting, Training. Website & landing pages, e-commerce and custom SaaS.",
  },
  de: {
    title: "Leistungen",
    description:
      "Social-Media-Management, Content-Erstellung, Strategie, Branding, Ads, Beratung, Training. Website & Landingpages, E-Commerce und individuelle SaaS.",
  },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = ["sq", "en", "de"].includes(localeParam) ? (localeParam as Locale) : "sq";
  const meta = META_BY_LOCALE[locale];
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al";
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${base}/${locale}/services`,
    },
  };
}

export default function ServicesPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  return <ServicesPageContent locale={locale} />;
}
