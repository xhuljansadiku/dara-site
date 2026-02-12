// app/[locale]/services/page.tsx
import ServicesPageContent from "@/components/site/ServicesPageContent";
import {
  type Locale,
} from "@/lib/services-data";
import type { Metadata } from "next";
import { use } from "react";

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Shërbimet",
    description:
      "Menaxhim rrjeteve sociale, krijim përmbajtjeje, strategji, branding, reklama, konsulencë, trajnime — website & landing, e-commerce dhe SaaS të personalizuar.",
  },
  en: {
    title: "Services",
    description:
      "Social Media Management, Content Creation, Strategy, Branding, Ads, Consulting, Training — website & landing pages, e-commerce and custom SaaS.",
  },
  de: {
    title: "Leistungen",
    description:
      "Social-Media-Management, Content-Erstellung, Strategie, Branding, Ads, Beratung, Training — Website & Landingpages, E-Commerce und individuelle SaaS.",
  },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = ["sq", "en", "de"].includes(localeParam) ? (localeParam as Locale) : "sq";
  const meta = META_BY_LOCALE[locale];
  return { title: meta.title, description: meta.description };
}

export default function ServicesPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  return <ServicesPageContent locale={locale} />;
}
