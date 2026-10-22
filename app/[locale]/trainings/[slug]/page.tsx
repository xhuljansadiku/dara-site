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
import { buildLocalizedMetadata } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales: Locale[] = ["sq", "en", "de"];
  return locales.flatMap((locale) =>
    TRAINING_SLUGS.map((slug) => ({ locale, slug }))
  );
}

const CTA_BY_LOCALE: Record<
  Locale,
  { register: string; registerInterest: string; allTrainings: string; backHome: string }
> = {
  sq: { register: "Regjistrohu tani", registerInterest: "Shpreh interesin", allTrainings: "Të gjitha trajnimet", backHome: "Kthehu në kryefaqe" },
  en: { register: "Register now", registerInterest: "Register interest", allTrainings: "All trainings", backHome: "Back to home" },
  de: { register: "Jetzt anmelden", registerInterest: "Interesse vormerken", allTrainings: "Alle Trainings", backHome: "Zur Startseite" },
};

const COMING_SOON_BY_LOCALE: Record<
  Locale,
  { title: string; subtitle: string }
> = {
  sq: {
    title: "Së shpejti",
    subtitle: "Ky kurs nuk është hapur ende për regjistrim. Shpreh interesin dhe të njoftojmë kur të caktohet data e fillimit.",
  },
  en: {
    title: "Coming soon",
    subtitle: "This course is not open for registration yet. Register your interest and we will let you know when a start date is set.",
  },
  de: {
    title: "Demnächst",
    subtitle: "Dieser Kurs ist noch nicht buchbar. Merken Sie Ihr Interesse vor, wir informieren Sie, sobald ein Starttermin feststeht.",
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
            <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[white]/10 blur-3xl" />
          </div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
              {comingSoonCopy.title}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
              {training.title[locale]}
            </h1>
            <p className="mt-4 max-w-xl text-base text-gray-600 md:text-lg">
              {comingSoonCopy.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <LocaleLink
                href={`/trainings/register?training=${training.slug}`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-gray-900 px-8 font-medium text-white transition hover:bg-gray-800"
              >
                {cta.registerInterest}
              </LocaleLink>
              <LocaleLink
                href="/trainings"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-300 px-6 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50"
              >
                {cta.allTrainings}
              </LocaleLink>
              <LocaleLink
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-300 px-6 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50"
              >
                {cta.backHome}
              </LocaleLink>
            </div>
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
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[white]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
            {locale === "sq" ? "Trajnim" : locale === "de" ? "Training" : "Training"}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {training.title[locale]}
          </h1>

          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            {training.shortDesc[locale]}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{training.price}</span>
              <span className="text-sm text-gray-600">{training.duration[locale]}</span>
            </div>
            <div className="flex flex-wrap gap-6">
              {training.stats.map((stat, statIdx) => (
                <div key={`stat-${statIdx}`} className="flex items-baseline gap-1.5">
                  <span className="text-lg font-semibold text-gray-900">{stat.value}</span>
                  <span className="text-sm text-gray-500">{stat.label[locale]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <AnimateIn>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                {locale === "sq" ? "Çfarë përfshin" : locale === "de" ? "Was enthalten ist" : "What's included"}
              </h3>
              <ul className="mt-4 space-y-3">
                {training.highlights[locale].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
          <AnimateIn delay={50}>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                {locale === "sq" ? "Përshkrim i plotë" : locale === "de" ? "Vollständige Beschreibung" : "Full description"}
              </h3>
              <div className="mt-4 space-y-4">
                {training.fullDescription[locale].map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-gray-600">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
        <AnimateIn>
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-md md:p-10">
            <h2 className="text-center text-2xl font-semibold text-gray-900 md:text-3xl">
              {locale === "sq" ? (
                <>Gati të fillosh? <span className="text-gray-900">Rregjistrohu tani.</span></>
              ) : locale === "de" ? (
                <>Bereit zu starten? <span className="text-gray-900">Jetzt anmelden.</span></>
              ) : (
                <>Ready to start? <span className="text-gray-900">Register now.</span></>
              )}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <LocaleLink
                href={`/trainings/register?training=${training.slug}`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-gray-900 px-8 font-medium text-white transition hover:bg-gray-800"
              >
                {cta.register}
              </LocaleLink>
              <LocaleLink
                href="/trainings"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-300 px-6 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50"
              >
                {cta.allTrainings}
              </LocaleLink>
              <LocaleLink
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-300 px-6 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50"
              >
                {cta.backHome}
              </LocaleLink>
            </div>
          </div>
        </AnimateIn>
        </div>
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
    return buildLocalizedMetadata({
      locale,
      path: `/trainings/${slug}`,
      title: training.title[locale],
      description: training.shortDesc[locale],
      noIndex: Boolean(training.comingSoon),
    });
  })();
}
