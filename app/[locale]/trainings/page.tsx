// app/[locale]/trainings/page.tsx
import TrainingsSection from "@/components/site/TrainingsSection";
import { type Locale } from "@/lib/services-data";
import type { Metadata } from "next";
import { use } from "react";

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Trajnime",
    description:
      "Ndiq trajnimet tona: SMM, SMM 1:1 dhe Web Developer. 50+ studente. Mëso nga ekspertët dhe ndrysho karrierën tënde.",
  },
  en: {
    title: "Training",
    description:
      "Follow our trainings: SMM, SMM 1:1 and Web Developer. 50+ students. Learn from experts and change your career.",
  },
  de: {
    title: "Training",
    description:
      "Folgen Sie unseren Trainings: SMM, SMM 1:1 und Web Developer. 50+ Teilnehmer. Lernen Sie von Experten und ändern Sie Ihre Karriere.",
  },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = ["sq", "en", "de"].includes(localeParam) ? (localeParam as Locale) : "sq";
  const meta = META_BY_LOCALE[locale];
  return { title: meta.title, description: meta.description };
}

export default function TrainingsPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  return (
    <>
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(200,165,92,0.1)_0%,transparent_60%)]" />
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">
          {locale === "sq" ? "Trajnime" : locale === "de" ? "Training" : "Training"}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          {locale === "sq" ? (
            <>A dëshiron ta <span className="text-[#c8a55c]">ndryshosh</span> jetën tënde?</>
          ) : locale === "de" ? (
            <>Möchtest du dein Leben <span className="text-[#c8a55c]">verändern</span>?</>
          ) : (
            <>Do you want to <span className="text-[#c8a55c]">change</span> your life?</>
          )}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
          {locale === "sq"
            ? "Ndiq trajnimet tona dhe mëso nga ekspertët. 50+ studente kanë ndjekur programet tona."
            : locale === "de"
            ? "Folge unseren Trainings und lerne von Experten. 50+ Teilnehmer haben unsere Programme besucht."
            : "Follow our trainings and learn from experts. 50+ students have attended our programmes."}
        </p>
      </section>
      <TrainingsSection locale={locale} />
      <div className="h-8" />
    </>
  );
}
