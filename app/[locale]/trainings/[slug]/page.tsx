import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import {
  getTrainingBySlug,
  TRAINING_SLUGS,
  type Locale,
} from "@/lib/trainings-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales: Locale[] = ["sq", "en", "de"];
  return locales.flatMap((locale) =>
    TRAINING_SLUGS.map((slug) => ({ locale, slug }))
  );
}

const CTA_BY_LOCALE: Record<
  Locale,
  { register: string; allTrainings: string; backHome: string }
> = {
  sq: { register: "Rregjistrohu tani", allTrainings: "Të gjitha trajnimet", backHome: "Kthehu në kryefaqe" },
  en: { register: "Register now", allTrainings: "All trainings", backHome: "Back to home" },
  de: { register: "Jetzt anmelden", allTrainings: "Alle Trainings", backHome: "Zur Startseite" },
};

const COMING_SOON_BY_LOCALE: Record<
  Locale,
  { title: string; subtitle: string }
> = {
  sq: {
    title: "Së shpejti",
    subtitle: "Ky trajnim do të jetë i disponueshëm shumë shpejt. Na kontaktoni për të mësuar më shumë.",
  },
  en: {
    title: "Coming soon",
    subtitle: "This training will be available very soon. Contact us to learn more.",
  },
  de: {
    title: "Demnächst",
    subtitle: "Dieses Training wird sehr bald verfügbar sein. Kontaktieren Sie uns für weitere Informationen.",
  },
};

export default function TrainingSlugPage({ params }: Props) {
  const { locale: localeParam, slug } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  const training = getTrainingBySlug(slug);
  if (!training) notFound();

  const cta = CTA_BY_LOCALE[locale];
  const comingSoonCopy = COMING_SOON_BY_LOCALE[locale];

  if (training.comingSoon) {
    return (
      <>
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="rounded-full border border-[#c8a55c]/30 bg-[#c8a55c]/10 px-4 py-2 text-sm font-medium text-[#c8a55c]">
              {comingSoonCopy.title}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              {training.title[locale]}
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/70 md:text-lg">
              {comingSoonCopy.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <LocaleLink
                href="/trainings/register"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#c8a55c] px-8 font-medium text-black transition hover:bg-[#b6944f]"
              >
                {cta.register}
              </LocaleLink>
              <LocaleLink
                href="/trainings"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-white/90 transition hover:border-white/25 hover:bg-white/10"
              >
                {cta.allTrainings}
              </LocaleLink>
              <LocaleLink
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-white/90 transition hover:border-white/25 hover:bg-white/10"
              >
                {cta.backHome}
              </LocaleLink>
            </div>
          </div>
        </section>
        <div className="h-8" />
      </>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden py-8 md:py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">
          {locale === "sq" ? "Trajnim" : locale === "de" ? "Training" : "Training"}
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          {training.title[locale]}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          {training.shortDesc[locale]}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#c8a55c]">{training.price}</span>
            <span className="text-sm text-white/60">{training.duration[locale]}</span>
          </div>
          <div className="flex flex-wrap gap-6">
            {training.stats.map((stat, statIdx) => (
              <div key={`stat-${statIdx}`} className="flex items-baseline gap-1.5">
                <span className="text-lg font-semibold text-white">{stat.value}</span>
                <span className="text-sm text-white/50">{stat.label[locale]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <AnimateIn>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c8a55c]/90">
                {locale === "sq" ? "Çfarë përfshin" : locale === "de" ? "Was enthalten ist" : "What's included"}
              </h3>
              <ul className="mt-4 space-y-3">
                {training.highlights[locale].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8a55c]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
          <AnimateIn delay={50}>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c8a55c]/90">
                {locale === "sq" ? "Përshkrim i plotë" : locale === "de" ? "Vollständige Beschreibung" : "Full description"}
              </h3>
              <div className="mt-4 space-y-4">
                {training.fullDescription[locale].map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-white/80">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <AnimateIn>
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-[#c8a55c]/20 bg-gradient-to-br from-[#c8a55c]/10 via-[#c8a55c]/5 to-transparent p-8 md:p-12">
            <h2 className="text-center text-2xl font-semibold md:text-3xl">
              {locale === "sq" ? (
                <>Gati të fillosh? <span className="text-[#c8a55c]">Rregjistrohu tani.</span></>
              ) : locale === "de" ? (
                <>Bereit zu starten? <span className="text-[#c8a55c]">Jetzt anmelden.</span></>
              ) : (
                <>Ready to start? <span className="text-[#c8a55c]">Register now.</span></>
              )}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <LocaleLink
                href="/trainings/register"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#c8a55c] px-8 font-medium text-black transition hover:bg-[#b6944f]"
              >
                {cta.register}
              </LocaleLink>
              <LocaleLink
                href="/trainings"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-white/90 transition hover:border-white/25 hover:bg-white/10"
              >
                {cta.allTrainings}
              </LocaleLink>
              <LocaleLink
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-white/90 transition hover:border-white/25 hover:bg-white/10"
              >
                {cta.backHome}
              </LocaleLink>
            </div>
          </div>
        </AnimateIn>
      </section>

      <div className="h-4" />
    </>
  );
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return (async () => {
    const { locale: localeParam, slug } = await params;
    const locale: Locale = ["sq", "en", "de"].includes(localeParam)
      ? (localeParam as Locale)
      : "sq";
    const training = getTrainingBySlug(slug);
    if (!training) return { title: "Training" };
    return {
      title: training.title[locale],
      description: training.shortDesc[locale],
    };
  })();
}
