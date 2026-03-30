import type { Metadata } from "next";
import { type Locale } from "@/lib/services-data";
import { buildLocalizedMetadata } from "@/lib/seo-utils";

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Karrierë | DARA Marketing Agency",
    description: "Po zgjerojmë ekipin. Apliko për Graphic Design, Video Maker ose Social Media Manager.",
  },
  en: {
    title: "Careers | DARA Marketing Agency",
    description: "We are expanding our team. Apply for Graphic Design, Video Maker or Social Media Manager.",
  },
  de: {
    title: "Karriere | DARA Marketing Agency",
    description: "Wir erweitern unser Team. Bewerben Sie sich für Grafikdesign, Video Maker oder Social Media Manager.",
  },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = ["sq", "en", "de"].includes(localeParam) ? (localeParam as Locale) : "sq";
  const meta = META_BY_LOCALE[locale];
  return buildLocalizedMetadata({
    locale,
    path: "/careers",
    title: meta.title,
    description: meta.description,
  });
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
