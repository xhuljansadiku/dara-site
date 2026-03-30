import type { Metadata } from "next";
import WorkContent from "@/components/site/WorkContent";
import { PROJECTS_BY_LOCALE, WORK_FILTER_TABS_BY_LOCALE } from "@/lib/projects";
import { SITE_URL, buildLocalizedMetadata } from "@/lib/seo-utils";

const META_BY_LOCALE: Record<"sq" | "en" | "de", { title: string; description: string }> = {
  sq: {
    title: "Punët tona",
    description:
      "Portfolio DARA: web design Tirana, krijim website, branding, social media dhe e-commerce. Projekte për biznese në Shqipëri dhe Evropë.",
  },
  en: {
    title: "Work & Case Studies",
    description:
      "Portfolio of DARA Marketing Agency: social media management, brand identity, websites and e-commerce. Creative projects for local and international businesses.",
  },
  de: {
    title: "Arbeiten & Case Studies",
    description:
      "Portfolio der DARA Marketing Agency: Social Media, Branding, Websites und E-Commerce. Kreative Projekte für lokale und internationale Unternehmen.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = (["sq", "en", "de"].includes(locale) ? locale : "en") as "sq" | "en" | "de";
  const meta = META_BY_LOCALE[currentLocale];

  return buildLocalizedMetadata({
    locale: currentLocale,
    path: "/work",
    title: meta.title,
    description: meta.description,
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (["sq", "en", "de"].includes(locale) ? locale : "en") as "sq" | "en" | "de";
  const projects = PROJECTS_BY_LOCALE[currentLocale];
  const filterTabs = WORK_FILTER_TABS_BY_LOCALE[currentLocale];

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: currentLocale === "sq" ? "Kryefaqe" : currentLocale === "de" ? "Startseite" : "Home",
        item: `${SITE_URL}/${currentLocale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: currentLocale === "sq" ? "Punët" : currentLocale === "de" ? "Arbeiten" : "Work",
        item: `${SITE_URL}/${currentLocale}/work`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <WorkContent locale={currentLocale} projects={projects} filterTabs={filterTabs} />
    </>
  );
}
