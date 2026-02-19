"use client";

import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import { TRAININGS } from "@/lib/trainings-data";
import type { Locale } from "@/lib/services-data";

const SECTION_COPY: Record<
  Locale,
  {
    kicker: string;
    title: string;
    subtitle: string;
    learnDetails: string;
    comingSoon: string;
    registerNow: string;
  }
> = {
  sq: {
    kicker: "Trajnime",
    title: "A dëshiron ta ndryshosh jetën tënde?",
    subtitle: "Ndiq trajnimet tona",
    learnDetails: "Mëso detajet",
    comingSoon: "Së shpejti",
    registerNow: "Rregjistrohu tani",
  },
  en: {
    kicker: "Training",
    title: "Do you want to change your life?",
    subtitle: "Follow our trainings",
    learnDetails: "Learn details",
    comingSoon: "Coming soon",
    registerNow: "Register now",
  },
  de: {
    kicker: "Training",
    title: "Möchtest du dein Leben verändern?",
    subtitle: "Folge unseren Trainings",
    learnDetails: "Details erfahren",
    comingSoon: "Demnächst",
    registerNow: "Jetzt anmelden",
  },
};

type Props = { locale: Locale };

export default function TrainingsSection({ locale }: Props) {
  const copy = SECTION_COPY[locale];

  return (
    <section id="trainings" className="relative py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#c8a55c]/[0.03] to-transparent" />
      <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#c8a55c]/5 blur-3xl" />
      <div className="absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-[#c8a55c]/5 blur-3xl" />

      <div className="mb-12 md:mb-16">
        <AnimateIn>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#c8a55c]">
            {copy.kicker}
          </span>
        </AnimateIn>
        <AnimateIn delay={50}>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            {copy.title}
          </h2>
        </AnimateIn>
        <AnimateIn delay={100}>
          <p className="mt-2 text-lg text-[#c8a55c] md:text-xl">{copy.subtitle}</p>
        </AnimateIn>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TRAININGS.map((training, idx) => {
          const isDisabled = training.comingSoon;
          return (
            <AnimateIn key={training.slug} delay={idx * 80}>
              <div
                className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 md:p-8 ${
                  isDisabled
                    ? "cursor-not-allowed border-white/5 bg-white/[0.01] opacity-75"
                    : "border-white/10 bg-white/[0.02] hover:-translate-y-1 hover:border-[#c8a55c]/30 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[#c8a55c]/5"
                }`}
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[#c8a55c]/5 blur-2xl transition group-hover:bg-[#c8a55c]/10" />
                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-[#c8a55c]/30 bg-[#c8a55c]/10 px-3 py-1 text-xs font-medium text-[#c8a55c]">
                      {training.price}
                    </span>
                    {isDisabled && (
                      <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
                        {copy.comingSoon}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white md:text-2xl">
                    {training.title[locale]}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
                    {training.shortDesc[locale]}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4">
                    {training.stats.map((stat) => (
                      <div key={stat.value} className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-[#c8a55c]">{stat.value}</span>
                        <span className="text-xs text-white/50">{stat.label[locale]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    {isDisabled ? (
                      <span
                        className="inline-flex h-10 cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-white/40"
                        aria-disabled
                      >
                        {copy.comingSoon}
                      </span>
                    ) : (
                      <LocaleLink
                        href={`/trainings/${training.slug}`}
                        className="inline-flex h-10 items-center justify-center rounded-full border border-[#c8a55c]/40 bg-[#c8a55c]/10 px-5 text-sm font-medium text-[#c8a55c] transition hover:bg-[#c8a55c]/20 hover:border-[#c8a55c]/60"
                      >
                        {copy.learnDetails} →
                      </LocaleLink>
                    )}
                  </div>
                </div>
              </div>
            </AnimateIn>
          );
        })}
      </div>

      <AnimateIn delay={200}>
        <div className="mt-12 flex flex-col items-center text-center md:mt-16">
          <LocaleLink
            href="/contact"
            className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#c8a55c] to-[#b6944f] px-10 font-semibold text-black shadow-lg shadow-[#c8a55c]/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c8a55c]/40"
          >
            {copy.registerNow}
          </LocaleLink>
          <p className="mt-4 text-sm text-white/50">
            {locale === "sq"
              ? "50+ studente kanë ndjekur trajnimet tona"
              : locale === "de"
              ? "50+ Teilnehmer haben unsere Trainings besucht"
              : "50+ students have attended our trainings"}
          </p>
        </div>
      </AnimateIn>
    </section>
  );
}
