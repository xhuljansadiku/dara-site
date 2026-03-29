import LocaleLink from "@/components/site/LocaleLink";
import BrandProjectGallery from "@/components/site/BrandProjectGallery";
import { BRAND_PROJECTS } from "@/lib/projects";
import type { Locale } from "@/lib/projects";
import type { Metadata } from "next";
import { use } from "react";

type Props = { params: Promise<{ locale: string }> };

const CTA_BY_LOCALE: Record<
  Locale,
  { backToWork: string; allProjects: string; backHome: string; title: string }
> = {
  sq: { backToWork: "Kthehu te punët", allProjects: "Të gjitha projektet", backHome: "Kthehu në kryefaqe", title: "Brand Identity" },
  en: { backToWork: "Back to work", allProjects: "All projects", backHome: "Back to home", title: "Brand Identity" },
  de: { backToWork: "Zurück zu Arbeiten", allProjects: "Alle Projekte", backHome: "Zur Startseite", title: "Brand Identity" },
};

export default function BrandPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  const cta = CTA_BY_LOCALE[locale];

  return (
    <>
      <section className="relative overflow-hidden py-8 md:py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#B89D5E]/10 blur-3xl" />
        </div>

        <LocaleLink
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#B89D5E] transition hover:text-[#d4b86a]"
        >
          ← {cta.backToWork}
        </LocaleLink>

        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#B89D5E]/80">
          {cta.title}
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          {locale === "sq"
            ? "Të gjitha logot tona"
            : locale === "de"
            ? "Alle unsere Logos"
            : "All our logos"}
        </h1>

        <p className="mt-4 max-w-2xl text-base text-white/80">
          {locale === "sq"
            ? "Identitet vizual dhe logo për marka të ndryshme."
            : locale === "de"
            ? "Visuelle Identität und Logos für verschiedene Marken."
            : "Visual identity and logos for various brands."}
        </p>
      </section>

      <section className="py-8 md:py-12">
        <BrandProjectGallery projects={BRAND_PROJECTS} />
      </section>

      <section className="py-8">
        <div className="flex flex-wrap gap-3">
          <LocaleLink
            href="/work"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#B89D5E] px-6 font-medium text-black transition hover:bg-[#b6944f]"
          >
            {cta.allProjects}
          </LocaleLink>
          <LocaleLink
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-white/90 transition hover:border-white/25 hover:bg-white/10"
          >
            {cta.backHome}
          </LocaleLink>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";
  return {
    title: locale === "sq" ? "Brand Identity" : locale === "de" ? "Markenidentität" : "Brand Identity",
    description:
      locale === "sq"
        ? "Të gjitha logot dhe identitetet vizuale të krijuara nga DARA."
        : locale === "de"
        ? "Alle von DARA erstellten Logos und visuellen Identitäten."
        : "All logos and visual identities created by DARA.",
  };
}
