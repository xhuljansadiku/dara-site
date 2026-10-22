import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import { TRAININGS } from "@/lib/trainings-data";
import { TRAINING_PARTICIPANTS } from "@/lib/business-facts";
import type { Locale } from "@/lib/services-data";

const SECTION_COPY: Record<
  Locale,
  {
    kicker: string;
    title: string;
    subtitle: string;
    viewProgram: string;
    comingSoon: string;
    registerNow: string;
    registerInterest: string;
    studentsLabel: string;
    programsLabel: string;
    teamTraining: string;
  }
> = {
  sq: {
    kicker: "Trajnime",
    title: "Trajnime praktike për marketing dhe social media",
    subtitle: "Programe për individë dhe ekipe që duan të menaxhojnë vetë marketingun digjital.",
    viewProgram: "Shiko programin",
    comingSoon: "Së shpejti",
    registerNow: "Regjistrohu",
    registerInterest: "Shpreh interesin",
    studentsLabel: "pjesëmarrës deri tani",
    programsLabel: "programe aktive",
    teamTraining: "Kërko trajnim për ekipin",
  },
  en: {
    kicker: "Training",
    title: "Practical marketing and social media training",
    subtitle: "Programmes for individuals and teams who want to run their own digital marketing.",
    viewProgram: "View the programme",
    comingSoon: "Coming soon",
    registerNow: "Register",
    registerInterest: "Register interest",
    studentsLabel: "participants so far",
    programsLabel: "active programmes",
    teamTraining: "Request team training",
  },
  de: {
    kicker: "Training",
    title: "Praxisnahe Trainings für Marketing und Social Media",
    subtitle: "Programme für Einzelpersonen und Teams, die ihr digitales Marketing selbst steuern möchten.",
    viewProgram: "Programm ansehen",
    comingSoon: "Demnächst",
    registerNow: "Anmelden",
    registerInterest: "Interesse vormerken",
    studentsLabel: "Teilnehmende bisher",
    programsLabel: "aktive Programme",
    teamTraining: "Team-Training anfragen",
  },
};

const ACTIVE_PROGRAMS = TRAININGS.filter((t) => !t.comingSoon).length;

type Props = { locale: Locale };

/** Training is a separate journey from agency services: register here, not via the quote form. */
export default function TrainingsSection({ locale }: Props) {
  const copy = SECTION_COPY[locale];

  return (
    <section id="trainings" aria-labelledby="trainings-heading" className="relative overflow-hidden py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_40%,#fafafa_100%)]"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
              <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
              {copy.kicker}
            </span>
            <h2
              id="trainings-heading"
              className="mt-4 font-display text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl"
            >
              {copy.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-[17px]">{copy.subtitle}</p>
          </div>
          <dl className="flex shrink-0 gap-2 rounded-2xl bg-neutral-200/60 p-1.5 ring-1 ring-black/[0.04]">
            <div className="flex min-w-[130px] flex-col-reverse items-center rounded-xl bg-white px-5 py-3 text-center shadow-sm">
              <dt className="mt-1 text-xs font-medium text-neutral-500">{copy.studentsLabel}</dt>
              <dd className="text-2xl font-bold tabular-nums text-neutral-950">{TRAINING_PARTICIPANTS}</dd>
            </div>
            <div className="flex min-w-[130px] flex-col-reverse items-center rounded-xl bg-white px-5 py-3 text-center shadow-sm">
              <dt className="mt-1 text-xs font-medium text-neutral-500">{copy.programsLabel}</dt>
              <dd className="text-2xl font-bold tabular-nums text-neutral-950">{ACTIVE_PROGRAMS}</dd>
            </div>
          </dl>
        </div>

        <ul className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {TRAININGS.map((training, idx) => {
            const isComingSoon = training.comingSoon;
            return (
              <li key={training.slug} className="flex">
                <AnimateIn delay={idx * 80} className="flex w-full">
                  <article
                    className={`flex w-full flex-col rounded-3xl border p-7 md:p-8 ${
                      isComingSoon
                        ? "border-dashed border-neutral-300 bg-neutral-50"
                        : "border-black/[0.06] bg-white shadow-[0_8px_40px_-24px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.04]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {isComingSoon ? (
                        <span className="rounded-full bg-neutral-200 px-3 py-1.5 text-sm font-semibold text-neutral-700">
                          {copy.comingSoon}
                        </span>
                      ) : (
                        <span className="rounded-full bg-neutral-950 px-3.5 py-1.5 text-sm font-semibold text-white">
                          {training.price}
                        </span>
                      )}
                      <span className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700">
                        {training.duration[locale]}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-neutral-950 md:text-2xl">
                      {training.title[locale]}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{training.shortDesc[locale]}</p>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {training.highlights[locale].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-snug text-neutral-700">
                          <span
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B89D5E]/15 text-[#8a7344] ring-1 ring-[#B89D5E]/25"
                            aria-hidden
                          >
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span className="min-w-0 flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex flex-col gap-2">
                      {isComingSoon ? (
                        <LocaleLink
                          href={`/trainings/register?training=${training.slug}`}
                          className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950"
                        >
                          {copy.registerInterest}
                        </LocaleLink>
                      ) : (
                        <>
                          <LocaleLink
                            href={`/trainings/${training.slug}`}
                            className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
                          >
                            {copy.viewProgram}
                          </LocaleLink>
                          <LocaleLink
                            href={`/trainings/register?training=${training.slug}`}
                            className="inline-flex h-11 w-full items-center justify-center rounded-2xl text-sm font-semibold text-neutral-800 underline-offset-4 transition hover:underline"
                          >
                            {copy.registerNow}
                          </LocaleLink>
                        </>
                      )}
                    </div>
                  </article>
                </AnimateIn>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <LocaleLink
            href="/services/training"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/[0.08] bg-white px-5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:border-[#B89D5E]/50"
          >
            {copy.teamTraining}
            <span aria-hidden>→</span>
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
