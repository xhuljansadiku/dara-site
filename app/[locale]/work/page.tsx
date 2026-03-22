// app/[locale]/work/page.tsx
import type { Metadata } from "next";
import WorkContent from "@/components/site/WorkContent";
import { PROJECTS_BY_LOCALE, WORK_FILTER_TABS_BY_LOCALE } from "@/lib/projects";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Portfolio of DARA Marketing Agency: social media management, brand identity, websites and e-commerce. Creative projects for local and international businesses.",
};

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
      { "@type": "ListItem", position: 1, name: currentLocale === "sq" ? "Kryefaqe" : currentLocale === "de" ? "Startseite" : "Home", item: `${BASE}/${currentLocale}` },
      { "@type": "ListItem", position: 2, name: currentLocale === "sq" ? "Punët" : currentLocale === "de" ? "Arbeiten" : "Work", item: `${BASE}/${currentLocale}/work` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <WorkContent locale={currentLocale} projects={projects} filterTabs={filterTabs} />
    </>
  );
}
