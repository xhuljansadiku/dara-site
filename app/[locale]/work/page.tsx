// app/[locale]/work/page.tsx
import type { Metadata } from "next";
import WorkContent from "@/components/site/WorkContent";
import { PROJECTS_BY_LOCALE, WORK_FILTER_TABS_BY_LOCALE } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Previous projects: Don Mare Hotel, 355 Black, Aia Hotel, Zorada, City Fitness, Cara Dental, Premium Real Estate, Nova Real Estate, Icon Store, DD Store, KOA Consulting, Endis Store, Taxi Service Dhermi.",
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

  return <WorkContent locale={currentLocale} projects={projects} filterTabs={filterTabs} />;
}
