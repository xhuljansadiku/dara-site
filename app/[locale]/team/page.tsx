// app/[locale]/team/page.tsx (Ekipi / Team)
import type { Metadata } from "next";
import HomeTeamSection from "@/components/site/HomeTeamSection";
import HomeContactCta from "@/components/site/HomeContactCta";
import { buildAlternates } from "@/lib/seo-utils";

type Locale = "sq" | "en" | "de";

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Ekipi",
    description:
      "Njihni ekipin DARA në Tiranë: strategji, kreativitet dhe marketing digjital për biznese në Shqipëri.",
  },
  en: {
    title: "Team",
    description:
      "Meet the DARA team: marketing, strategy and creative professionals helping brands grow.",
  },
  de: {
    title: "Team",
    description:
      "Lernen Sie das DARA-Team kennen: Marketing, Strategie und Kreativität für wachsende Marken.",
  },
};


type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = (["sq", "en", "de"].includes(localeParam) ? localeParam : "sq") as Locale;
  const meta = META_BY_LOCALE[locale];
  const { canonical, languages } = buildAlternates("team", locale);
  return {
    title: meta.title, // root template adds the brand suffix
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: `${meta.title} | DARA Marketing Agency`,
      description: meta.description,
    },
  };
}

export default async function TeamPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (["sq", "en", "de"].includes(localeParam) ? localeParam : "sq") as Locale;
  return (
    <>
      <div className="pt-6">
        <HomeTeamSection locale={locale} headingLevel="h1" showTeamLink={false} />
      </div>
      <HomeContactCta locale={locale} />
    </>
  );
}
