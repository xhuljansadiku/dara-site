import LocaleLink from "@/components/site/LocaleLink";
import { TRAININGS, type Training } from "@/lib/trainings-data";
import { TRAINING_PARTICIPANTS } from "@/lib/business-facts";
import type { Locale } from "@/lib/services-data";

const SECTION_COPY: Record<
  Locale,
  {
    kicker: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    passLabel: string;
    price: string;
    duration: string;
    register: string;
    comingSoon: string;
    registerInterest: string;
    studentsLabel: string;
    teamTraining: string;
  }
> = {
  sq: {
    kicker: "Trajnime",
    title: "Mëso marketing",
    titleHighlight: "nga praktika",
    subtitle: "Programe për individë dhe ekipe që duan të menaxhojnë vetë marketingun digjital.",
    passLabel: "Leje hyrjeje",
    price: "Çmimi",
    duration: "Kohëzgjatja",
    register: "Regjistrohu",
    comingSoon: "Së shpejti",
    registerInterest: "Shpreh interesin",
    studentsLabel: "pjesëmarrës deri tani",
    teamTraining: "Kërko trajnim për ekipin",
  },
  en: {
    kicker: "Training",
    title: "Learn marketing",
    titleHighlight: "by doing",
    subtitle: "Programmes for individuals and teams who want to run their own digital marketing.",
    passLabel: "Admission pass",
    price: "Price",
    duration: "Duration",
    register: "Register",
    comingSoon: "Coming soon",
    registerInterest: "Register interest",
    studentsLabel: "participants so far",
    teamTraining: "Request team training",
  },
  de: {
    kicker: "Training",
    title: "Marketing lernen",
    titleHighlight: "in der Praxis",
    subtitle: "Programme für Einzelpersonen und Teams, die ihr digitales Marketing selbst steuern möchten.",
    passLabel: "Eintrittskarte",
    price: "Preis",
    duration: "Dauer",
    register: "Anmelden",
    comingSoon: "Demnächst",
    registerInterest: "Interesse vormerken",
    studentsLabel: "Teilnehmende bisher",
    teamTraining: "Team-Training anfragen",
  },
};

const ACTIVE = TRAININGS.filter((t) => !t.comingSoon);
const SOON = TRAININGS.filter((t) => t.comingSoon);
const registerHref = (t: Training) => `/trainings/register?training=${t.slug}`;

type Props = { locale: Locale };

function Tick() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B89D5E] text-neutral-950" aria-hidden>
      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </span>
  );
}

/**
 * Training is a separate journey from agency services: register here, not via the quote form.
 * Each programme is an admission pass (the first one in gold); programmes not yet running are listed below.
 */
export default function TrainingsSection({ locale }: Props) {
  const copy = SECTION_COPY[locale];

  return (
    <section id="trainings" aria-labelledby="trainings-heading" className="bg-neutral-950 py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">
            <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
            {copy.kicker}
          </span>
          <h2 id="trainings-heading" className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-6xl">
            {copy.title} <span className="text-[#d1b780]">{copy.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/65">{copy.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {ACTIVE.map((t, i) => (
            <article
              key={t.slug}
              className={`flex flex-col overflow-hidden rounded-[1.75rem] text-neutral-950 sm:flex-row ${i === 0 ? "bg-gradient-to-br from-[#e3cf9c] to-[#a88b4f]" : "bg-[#f4f1ea]"}`}
            >
              <div className="flex-1 p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-900/60">{copy.passLabel} · DARA</p>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase">
                  <LocaleLink href={`/trainings/${t.slug}`} className="hover:underline">
                    {t.title[locale]}
                  </LocaleLink>
                </h3>
                <p className="mt-2 text-sm text-neutral-800">{t.shortDesc[locale]}</p>
                <ul className="mt-5 space-y-2">
                  {t.highlights[locale].slice(0, 4).map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm">
                      <Tick />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Stub: tear line with notches cut in the section colour */}
              <div className="relative flex flex-col justify-between gap-4 border-t-2 border-dashed border-neutral-950/20 p-7 sm:w-48 sm:border-l-2 sm:border-t-0">
                <span className="absolute -left-4 -top-4 hidden h-8 w-8 rounded-full bg-neutral-950 sm:block" aria-hidden />
                <span className="absolute -bottom-4 -left-4 hidden h-8 w-8 rounded-full bg-neutral-950 sm:block" aria-hidden />
                <div>
                  <p className="text-xs text-neutral-900/60">{copy.price}</p>
                  <p className="font-display text-4xl font-bold">{t.price}</p>
                  <p className="mt-3 text-xs text-neutral-900/60">{copy.duration}</p>
                  <p className="text-sm font-semibold">{t.duration[locale]}</p>
                </div>
                <LocaleLink
                  href={registerHref(t)}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  {copy.register}
                </LocaleLink>
              </div>
            </article>
          ))}
        </div>

        {SOON.map((t) => (
          <div key={t.slug} className="mt-6 flex flex-col justify-between gap-4 rounded-[1.5rem] border border-dashed border-white/20 p-6 sm:flex-row sm:items-center">
            <div>
              <span className="rounded-full bg-[#B89D5E]/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#d1b780]">{copy.comingSoon}</span>
              <p className="mt-3 font-display text-2xl font-bold uppercase">{t.title[locale]}</p>
              <p className="mt-1 text-sm text-white/60">{t.shortDesc[locale]}</p>
            </div>
            <LocaleLink
              href={registerHref(t)}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold transition hover:border-white/60"
            >
              {copy.registerInterest}
            </LocaleLink>
          </div>
        ))}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/60">
            <span className="font-display text-2xl font-bold text-[#d1b780]">{TRAINING_PARTICIPANTS}</span> {copy.studentsLabel}
          </p>
          <LocaleLink href="/services/training" className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#d1b780]">
            {copy.teamTraining}
            <span aria-hidden className="transition group-hover:translate-x-0.5">
              →
            </span>
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
