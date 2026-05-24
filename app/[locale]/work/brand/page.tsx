import LocaleLink from "@/components/site/LocaleLink";
import BrandProjectGallery from "@/components/site/BrandProjectGallery";
import { BRAND_PROJECTS } from "@/lib/projects";
import type { Locale } from "@/lib/projects";
import type { Metadata } from "next";
import { use } from "react";
import { buildLocalizedMetadata } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };

const COPY: Record<Locale, { back: string; kicker: string; title: string; subtitle: string; allProjects: string; backHome: string }> = {
  sq: {
    back: "Kthehu te punët",
    kicker: "Brand Identity",
    title: "Të gjitha logot tona",
    subtitle: "Identitet vizual dhe logo të krijuara për marka të ndryshme.",
    allProjects: "Të gjitha projektet",
    backHome: "Kthehu në kryefaqe",
  },
  en: {
    back: "Back to work",
    kicker: "Brand Identity",
    title: "All our logos",
    subtitle: "Visual identity and logos created for various brands.",
    allProjects: "All projects",
    backHome: "Back to home",
  },
  de: {
    back: "Zurück zu Arbeiten",
    kicker: "Markenidentität",
    title: "Alle unsere Logos",
    subtitle: "Visuelle Identität und Logos für verschiedene Marken.",
    allProjects: "Alle Projekte",
    backHome: "Zur Startseite",
  },
};

export default function BrandPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam) ? (localeParam as Locale) : "sq";
  const copy = COPY[locale];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-stone-50 via-white to-white py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#B89D5E]/10 blur-3xl" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right,rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.03) 1px,transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <LocaleLink
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
          >
            ← {copy.back}
          </LocaleLink>

          <div className="mt-6">
            <span className="inline-flex items-center rounded-full border border-[#B89D5E]/30 bg-[#B89D5E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#6b5a38]">
              {copy.kicker}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600">
              {copy.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BrandProjectGallery projects={BRAND_PROJECTS} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone-200/80 py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <LocaleLink
              href="/work"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              {copy.allProjects}
            </LocaleLink>
            <LocaleLink
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-2xl border-2 border-stone-300 bg-white px-6 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950 hover:bg-stone-50"
            >
              {copy.backHome}
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = ["sq", "en", "de"].includes(localeParam) ? (localeParam as Locale) : "sq";
  const copy = COPY[locale];

  return buildLocalizedMetadata({
    locale,
    path: "/work/brand",
    title: `${copy.kicker} | DARA Marketing Agency`,
    description: copy.subtitle,
  });
}
