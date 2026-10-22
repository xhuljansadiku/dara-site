// app/[locale]/trainings/page.tsx
import TrainingsSection from "@/components/site/TrainingsSection";
import GoogleReviewsSection from "@/components/site/GoogleReviewsSection";
import { TRAINING_PARTICIPANTS } from "@/lib/business-facts";
import { type Locale } from "@/lib/services-data";
import type { Metadata } from "next";
import { use } from "react";
import { buildLocalizedMetadata } from "@/lib/seo-utils";

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Trajnime",
    description:
      "Trajnime marketingu nga DARA: SMM në grup dhe SMM 1:1, me ushtrime praktike. Kursi Web Developer së shpejti.",
  },
  en: {
    title: "Training",
    description:
      "Marketing training from DARA: group SMM and SMM 1:1, with practical exercises. Web Developer course coming soon.",
  },
  de: {
    title: "Training",
    description:
      "Marketing-Trainings von DARA: SMM in der Gruppe und SMM 1:1, mit praktischen Übungen. Web-Entwickler-Kurs demnächst.",
  },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = ["sq", "en", "de"].includes(localeParam) ? (localeParam as Locale) : "en";
  const meta = META_BY_LOCALE[locale];
  return buildLocalizedMetadata({
    locale,
    path: "/trainings",
    title: meta.title,
    description: meta.description,
  });
}

const HERO_BY_LOCALE: Record<Locale, { kicker: string; title: string; subtitle: string }> = {
  sq: {
    kicker: "Trajnime",
    title: "Trajnime marketingu nga ekipi i DARA",
    subtitle: `Programe praktike në social media marketing, në grup ose 1:1. ${TRAINING_PARTICIPANTS} pjesëmarrës kanë ndjekur trajnimet tona.`,
  },
  en: {
    kicker: "Training",
    title: "Marketing training from the DARA team",
    subtitle: `Practical social media marketing programmes, in groups or 1:1. ${TRAINING_PARTICIPANTS} participants have attended our training.`,
  },
  de: {
    kicker: "Training",
    title: "Marketing-Trainings vom DARA-Team",
    subtitle: `Praxisnahe Social-Media-Marketing-Programme, in der Gruppe oder 1:1. ${TRAINING_PARTICIPANTS} Teilnehmende haben unsere Trainings besucht.`,
  },
};

export default function TrainingsPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";
  const hero = HERO_BY_LOCALE[locale];

  return (
    <>
      <section className="relative overflow-hidden pb-2 pt-12 md:pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(184,157,94,0.1)_0%,transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 md:px-8 lg:px-8">
          <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            {hero.kicker}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{hero.subtitle}</p>
        </div>
      </section>
      <TrainingsSection locale={locale} />
      <GoogleReviewsSection locale={locale} />
      <div className="h-8" />
    </>
  );
}
