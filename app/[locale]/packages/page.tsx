// app/[locale]/packages/page.tsx
import PackagesPageContent from "@/components/site/PackagesPageContent";
import { type Locale } from "@/lib/services-data";
import type { Metadata } from "next";
import { use } from "react";

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Paketa marketing & web design | Çmime për website dhe shërbime",
    description:
      "Paketa të gatshme për krijim website, marketing digjital, branding dhe trajnime. Çmime transparente për kompani. Nga Starter te Premium.",
  },
  en: {
    title: "Packages",
    description:
      "Ready-made packages for marketing, brand, training and website. Solutions that fit your business. From Starter to Premium.",
  },
  de: {
    title: "Pakete",
    description:
      "Fertige Pakete für Marketing, Marke, Training und Website. Lösungen, die zu Ihrem Unternehmen passen. Von Starter bis Premium.",
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
      url: `${base}/${locale}/packages`,
    },
  };
}

export default function PackagesPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  return <PackagesPageContent locale={locale} />;
}
