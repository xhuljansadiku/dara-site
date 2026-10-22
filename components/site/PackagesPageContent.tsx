"use client";

import { useSearchParams } from "next/navigation";
import PackagesLevels from "@/components/site/PackagesLevels";
import HomeContactCta from "@/components/site/HomeContactCta";
import { type Locale } from "@/lib/services-data";
import { PACKAGES_BY_GROUP_AND_LOCALE, PACKAGE_GROUP_LABELS, PACKAGE_GROUPS, type PackageGroup } from "@/lib/packages-data";

const COPY: Record<Locale, { kicker: string; titleBefore: string; titleHighlight: string; intro: string }> = {
  sq: { kicker: "Paketa", titleBefore: "Paketa për ", titleHighlight: "çdo nevojë", intro: "Zgjidhni kategorinë dhe nivelin. Shihni menjëherë çfarë përfshin dhe sa kushton." },
  en: { kicker: "Packages", titleBefore: "Packages for ", titleHighlight: "every need", intro: "Pick a category and a level. See right away what’s included and what it costs." },
  de: { kicker: "Pakete", titleBefore: "Pakete für ", titleHighlight: "jeden Bedarf", intro: "Wählen Sie Kategorie und Stufe. Sie sehen sofort, was enthalten ist und was es kostet." },
};

type Props = {
  locale: Locale;
};

/** /packages: the same category + level picker as the homepage, then the closing call to action. */
export default function PackagesPageContent({ locale }: Props) {
  // ?group=<package group> opens a category directly (used by the footer and service pages).
  const requested = useSearchParams().get("group");
  const initialGroup = PACKAGE_GROUPS.includes(requested as PackageGroup) ? (requested as PackageGroup) : null;

  return (
    <>
      <section className="bg-[#f4f1ea] pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <PackagesLevels
            locale={locale}
            packagesByGroup={PACKAGES_BY_GROUP_AND_LOCALE[locale]}
            groupLabels={PACKAGE_GROUP_LABELS[locale]}
            copy={COPY[locale]}
            initialGroup={initialGroup}
            headingLevel="h1"
          />
        </div>
      </section>
      <HomeContactCta locale={locale} />
    </>
  );
}
