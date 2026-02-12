// app/[locale]/packages/page.tsx
import PackagesPageContent from "@/components/site/PackagesPageContent";
import { type Locale } from "@/lib/services-data";
import type { Metadata } from "next";
import { use } from "react";

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Paketa",
    description:
      "Paketa të gatshme për marketing, brand, trajnime dhe website. Zgjidhje që përshtaten me biznesin tuaj — nga Starter te Premium.",
  },
  en: {
    title: "Packages",
    description:
      "Ready-made packages for marketing, brand, training and website. Solutions that fit your business — from Starter to Premium.",
  },
  de: {
    title: "Pakete",
    description:
      "Fertige Pakete für Marketing, Marke, Training und Website. Lösungen, die zu Ihrem Unternehmen passen — von Starter bis Premium.",
  },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = ["sq", "en", "de"].includes(localeParam) ? (localeParam as Locale) : "sq";
  const meta = META_BY_LOCALE[locale];
  return { title: meta.title, description: meta.description };
}

export default function PackagesPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  return <PackagesPageContent locale={locale} />;
}
