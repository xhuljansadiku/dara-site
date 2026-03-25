"use client";

import { useState, useEffect, useCallback } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import { TRAININGS } from "@/lib/trainings-data";
import type { Locale } from "@/lib/services-data";

const REVIEWS_AUTO_ADVANCE_MS = 5000;
const GOOGLE_MAPS_PLACE_URL = "https://www.google.com/maps/place/DARA+MARKETING+AGENCY/@41.3226095,19.8161564,847m/data=!3m2!1e3!4b1!4m6!3m5!1s0x135031966872c267:0x3d7b8d966cb7b655!8m2!3d41.3226055!4d19.8187313!16s%2Fg%2F11tff8h77t?entry=ttu";

function formatReviewerName(firstName: string, lastName?: string): string {
  if (!lastName) return firstName;
  const initial = lastName.charAt(0).toUpperCase();
  const first = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  return `${first} ${initial}.`;
}

const GOOGLE_REVIEWS: {
  firstName: string;
  lastName?: string;
  rating: number;
  text: Record<Locale, string>;
}[] = [
  {
    firstName: "Sabina",
    lastName: "Tahiri",
    rating: 5,
    text: {
      sq: "Kam qenë pjesë e trajnimit për Social Media Manager nga Dara Marketing Agency, dhe përvoja ka qenë jashtëzakonisht e vlefshme. Gjatë trajnimit fitova aftësi reale që mund t'i aplikoj menjëherë në punë. Nga strategjia e përmbajtjes deri te menaxhimi i platformave dhe analiza e rezultateve. E rekomandoj Dara Marketing Agency për këdo që dëshiron të zhvillohet në fushën e marketingut digjital dhe të fitojë përvojë!",
      en: "I was part of the Social Media Manager training from Dara Marketing Agency, and the experience was exceptionally valuable. During the training I gained real skills that I can apply immediately at work. From content strategy to platform management and results analysis. I recommend Dara Marketing Agency to anyone who wants to develop in digital marketing and gain experience!",
      de: "Ich war Teil des Social Media Manager Trainings von Dara Marketing Agency, und die Erfahrung war außergewöhnlich wertvoll. Während des Trainings habe ich echte Fähigkeiten erworben, die ich sofort im Beruf anwenden kann. Von der Content-Strategie bis zum Plattformmanagement und der Ergebnisanalyse. Ich empfehle Dara Marketing Agency jedem, der sich im digitalen Marketing weiterentwickeln möchte!",
    },
  },
  {
    firstName: "Adelaida",
    lastName: "Begaj",
    rating: 5,
    text: {
      sq: "Trajnime SMM leksion + praktike ne klasë. Jam tepër e kënaqur me trajnimet nga Dara.",
      en: "SMM trainings with lectures and practice in class. I am very satisfied with the trainings from Dara.",
      de: "SMM-Trainings mit Vortrag und Praxis im Klassenzimmer. Ich bin sehr zufrieden mit den Trainings von Dara.",
    },
  },
  {
    firstName: "Flamur",
    lastName: "Doku",
    rating: 5,
    text: {
      sq: "Shumë e rekomanduar. Jo vetëm përmirësova aftësitë e mia në social media që më ndihmojnë të mbaj dhe rrit bizneset e mia, por edhe u argëtova gjatë procesit. Pavarësisht nëse dëshiron të punosh në Marketing, të marketosh biznesin tënd, të bëhesh influencer ose thjesht të krijosh memorje më të mira online. Dara është më e mira. Faleminderit!",
      en: "Highly recommended. Not only did I enhance my social media skills that will help me better maintain and grow my businesses but I also had fun doing so. Whether you want to work in Marketing, market your own business, become an influencer or simply like to create better memories online. Dara is the best. Thank you!",
      de: "Sehr empfehlenswert. Ich habe nicht nur meine Social-Media-Fähigkeiten verbessert, die mir helfen, meine Unternehmen zu pflegen und auszubauen, sondern hatte dabei auch viel Spaß. Ob Sie im Marketing arbeiten, Ihr eigenes Unternehmen vermarkten, Influencer werden oder einfach bessere Erinnerungen online schaffen möchten. Dara ist die Beste. Danke!",
    },
  },
  {
    firstName: "Vals",
    rating: 5,
    text: {
      sq: "Kam qenë pjesë e masterklasës në social media marketing të ofruar nga kjo agjenci. Masterklasa ishte shumë informative dhe kisha mundësinë të analizoj shembuj praktikë dhe të implementoj dizajne në Canva nën mbikëqyrjen e profesionistëve me përvojë. E rekomandoj për fillestarët që duan të njihen me marketingun në social media dhe të fillojnë karrierën në këtë fushë.",
      en: "I was part of the masterclass in social media marketing offered by this agency. The masterclass was very informative and I had the opportunity to analyse practical examples and implement designs in Canva with experienced professionals. I would recommend this for beginners who want to get familiar with Social media marketing and start their career in this field.",
      de: "Ich war Teil des Masterkurses in Social-Media-Marketing dieser Agentur. Der Masterkurs war sehr informativ und ich hatte die Gelegenheit, praktische Beispiele zu analysieren und Designs in Canva unter der Anleitung erfahrener Profis umzusetzen. Ich empfehle dies Anfängern, die sich mit Social-Media-Marketing vertraut machen und ihre Karriere in diesem Bereich starten möchten.",
    },
  },
  {
    firstName: "Ilo",
    lastName: "Sula",
    rating: 5,
    text: {
      sq: "Kam pasur kënaqësinë të bashkëpunoj me Dara Marketing dhe mbeta shumë i impresionuar. Ekipi është shumë profesional, kreativ dhe gjithmonë i gatshëm për të gjetur zgjidhje unike për bizneset. Ajo që më pëlqeu më shumë ishte përkushtimi i tyre për të kuptuar nevojat specifike dhe për t'i kthyer ato në rezultate konkrete. Shërbim cilësor, komunikim i shkëlqyer dhe ide që bëjnë diferencën. Me plot bindje do ta rekomandoja për këdo që kërkon të rrisë praninë e biznesit në treg.",
      en: "I had the pleasure of collaborating with Dara Marketing and was very impressed. The team is very professional, creative and always ready to find unique solutions for businesses. What I liked most was their dedication to understanding specific needs and turning them into concrete results. Quality service, excellent communication and ideas that make a difference. I would wholeheartedly recommend them to anyone looking to increase their business presence in the market.",
      de: "Ich hatte das Vergnügen, mit Dara Marketing zusammenzuarbeiten und war sehr beeindruckt. Das Team ist sehr professionell, kreativ und immer bereit, einzigartige Lösungen für Unternehmen zu finden. Was mir am besten gefiel, war ihr Engagement, spezifische Bedürfnisse zu verstehen und sie in konkrete Ergebnisse umzuwandeln. Qualitätsservice, ausgezeichnete Kommunikation und Ideen, die den Unterschied machen. Ich empfehle sie jedem, der die Präsenz seines Unternehmens auf dem Markt erhöhen möchte.",
    },
  },
  {
    firstName: "Era",
    lastName: "Leka",
    rating: 5,
    text: {
      sq: "Ekipi i Dara Marketing është gjithmonë i gatshëm të ndihmojë, plot ide kreative dhe energji pozitive. Falë tyre kemi parë ndryshime të vërteta në marketingun tonë.",
      en: "The Dara Marketing team is always ready to help, full of creative ideas and positive energy. Thanks to them we have seen real changes in our marketing.",
      de: "Das Dara Marketing Team ist immer bereit zu helfen, voller kreativer Ideen und positiver Energie. Dank ihnen haben wir echte Veränderungen in unserem Marketing gesehen.",
    },
  },
  {
    firstName: "Aldo",
    lastName: "Al",
    rating: 5,
    text: {
      sq: "Stafi shumë profesional dhe e rekomandoj te çdo biznes që do t'i rritet audienca online!",
      en: "Very professional staff and I recommend them to every business that wants to grow its online audience!",
      de: "Sehr professionelles Team und ich empfehle sie jedem Unternehmen, das sein Online-Publikum vergrößern möchte!",
    },
  },
];

const REVIEWS_COPY: Record<Locale, { title: string; subtitle: string; viewOnGoogle: string }> = {
  sq: { title: "Çfarë thonë klientët", subtitle: "Review nga Google", viewOnGoogle: "Shiko të gjitha në Google" },
  en: { title: "What clients say", subtitle: "Reviews from Google", viewOnGoogle: "View all on Google" },
  de: { title: "Was Kunden sagen", subtitle: "Bewertungen von Google", viewOnGoogle: "Alle bei Google ansehen" },
};

const SECTION_COPY: Record<
  Locale,
  {
    kicker: string;
    title: string;
    subtitle: string;
    learnDetails: string;
    comingSoon: string;
    registerNow: string;
    statsIntro: string;
    studentsLabel: string;
    programsLabel: string;
    ctaSubtext: string;
  }
> = {
  sq: {
    kicker: "Trajnime",
    title: "A dëshiron ta ndryshosh jetën tënde?",
    subtitle: "Ndiq trajnimet tona dhe zhvillo aftësi për karrierën tënde",
    learnDetails: "Mëso detajet",
    comingSoon: "Së shpejti",
    registerNow: "Rregjistrohu tani",
    statsIntro: "Rezultate të vërtetuara",
    studentsLabel: "studente",
    programsLabel: "programe",
    ctaSubtext: "50+ studente kanë ndjekur trajnimet tona",
  },
  en: {
    kicker: "Training",
    title: "Do you want to change your life?",
    subtitle: "Follow our trainings and develop skills for your career",
    learnDetails: "Learn details",
    comingSoon: "Coming soon",
    registerNow: "Register now",
    statsIntro: "Proven results",
    studentsLabel: "students",
    programsLabel: "programmes",
    ctaSubtext: "50+ students have attended our trainings",
  },
  de: {
    kicker: "Training",
    title: "Möchtest du dein Leben verändern?",
    subtitle: "Folge unseren Trainings und entwickle Fähigkeiten für deine Karriere",
    learnDetails: "Details erfahren",
    comingSoon: "Demnächst",
    registerNow: "Jetzt anmelden",
    statsIntro: "Bewährte Ergebnisse",
    studentsLabel: "Teilnehmer",
    programsLabel: "Programme",
    ctaSubtext: "50+ Teilnehmer haben unsere Trainings besucht",
  },
};

type Props = { locale: Locale };

export default function TrainingsSection({ locale }: Props) {
  const copy = SECTION_COPY[locale];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((idx: number) => {
    setActiveIndex((idx + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length);
  }, []);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, REVIEWS_AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [next, isPaused]);

  return (
    <section id="trainings" className="relative overflow-hidden py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_40%,#fafafa_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4] [mask-image:linear-gradient(180deg,white,transparent)]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <AnimateIn>
            <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
              <span className="h-px w-8 bg-gradient-to-r from-amber-500/80 to-transparent" aria-hidden />
              {copy.kicker}
              <span className="hidden h-px w-8 bg-gradient-to-l from-amber-500/80 to-transparent sm:block" aria-hidden />
            </span>
          </AnimateIn>
          <AnimateIn delay={50}>
            <h2 className="mt-5 bg-gradient-to-br from-neutral-950 via-neutral-800 to-amber-800/90 bg-clip-text font-display text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
              {copy.title}
            </h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p className="mt-4 text-[17px] leading-relaxed text-neutral-600 md:text-lg">
              {copy.subtitle}
            </p>
          </AnimateIn>
        </div>

        {/* Stats bar */}
        <AnimateIn delay={80}>
          <div className="mx-auto mt-12 flex max-w-lg flex-col items-center md:mt-16">
            <div className="inline-flex flex-wrap items-stretch justify-center gap-2 rounded-2xl bg-neutral-200/60 p-1.5 ring-1 ring-black/[0.04] backdrop-blur-sm">
              <div className="flex min-w-[140px] flex-col items-center rounded-xl bg-white px-6 py-4 text-center shadow-sm ring-1 ring-black/[0.05] sm:min-w-[160px]">
                <span className="text-3xl font-bold tabular-nums text-neutral-950 md:text-4xl">50+</span>
                <span className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">{copy.studentsLabel}</span>
              </div>
              <div className="flex min-w-[140px] flex-col items-center rounded-xl bg-white px-6 py-4 text-center shadow-sm ring-1 ring-black/[0.05] sm:min-w-[160px]">
                <span className="text-3xl font-bold tabular-nums text-neutral-950 md:text-4xl">4</span>
                <span className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">{copy.programsLabel}</span>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Training cards */}
        <div className="mt-16 grid min-h-0 grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:gap-8">
          {TRAININGS.map((training, idx) => {
            const isDisabled = training.comingSoon;
            return (
              <AnimateIn key={training.slug} delay={idx * 80}>
                <div
                  className={`group relative flex min-h-0 flex-col overflow-hidden rounded-3xl border transition-all duration-300 ease-out ${
                    isDisabled
                      ? "cursor-not-allowed border-neutral-200/90 bg-neutral-50/90 opacity-[0.92] ring-1 ring-black/[0.03]"
                      : "border-black/[0.06] bg-white shadow-[0_8px_40px_-24px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.04] hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(245,158,11,0.14)]"
                  }`}
                >
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-amber-400/15 via-transparent to-transparent blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  {!isDisabled && (
                    <div
                      className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/80 to-transparent opacity-70"
                      aria-hidden
                    />
                  )}
                  <div className="relative flex flex-1 flex-col p-8 md:p-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-neutral-950 px-3.5 py-1.5 text-sm font-semibold text-white shadow-lg shadow-neutral-900/15">
                        {training.price}
                      </span>
                      {isDisabled && (
                        <span className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-500">
                          {copy.comingSoon}
                        </span>
                      )}
                      <span className="rounded-full border border-neutral-200/90 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700">
                        {training.duration[locale]}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-950 md:text-2xl">
                      {training.title[locale]}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-neutral-600">
                      {training.shortDesc[locale]}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-6 border-t border-neutral-100 pt-6">
                      {training.stats.map((stat, statIdx) => (
                        <div key={`${training.slug}-stat-${statIdx}`} className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold tabular-nums text-neutral-950">{stat.value}</span>
                          <span className="text-xs font-medium text-neutral-500">{stat.label[locale]}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      {isDisabled ? (
                        <span
                          className="inline-flex h-11 cursor-not-allowed items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-100/80 px-6 text-sm font-medium text-neutral-400"
                          aria-disabled
                        >
                          {copy.comingSoon}
                        </span>
                      ) : (
                        <LocaleLink
                          href={`/trainings/${training.slug}`}
                          className="inline-flex h-11 items-center justify-center rounded-2xl bg-neutral-950 px-6 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition hover:bg-neutral-800"
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

        {/* Reviews */}
        <AnimateIn delay={150}>
          <div className="relative mt-20 overflow-hidden rounded-[1.75rem] bg-neutral-950 p-6 shadow-2xl shadow-black/25 ring-1 ring-white/10 md:mt-24 md:rounded-[2rem] md:p-10">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/12 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                backgroundSize: "36px 36px",
              }}
              aria-hidden
            />

            <div className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200/80">
                  {REVIEWS_COPY[locale].subtitle}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
                  {REVIEWS_COPY[locale].title}
                </h3>
              </div>
              <a
                href={GOOGLE_MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:border-white/25 hover:bg-white/15"
              >
                {REVIEWS_COPY[locale].viewOnGoogle}
                <span aria-hidden>→</span>
              </a>
            </div>
            <div
              className="relative overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative min-h-[200px] md:min-h-[220px]">
                {GOOGLE_REVIEWS.map((review, idx) => (
                  <div
                    key={idx}
                    role="tabpanel"
                    aria-hidden={idx !== activeIndex}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      idx === activeIndex ? "relative z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
                    }`}
                  >
                    <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white p-6 shadow-2xl shadow-black/30 ring-1 ring-black/5 transition md:p-8">
                      <div className="flex items-center gap-2 text-amber-500">
                        <span className="text-2xl leading-none text-amber-400/90">"</span>
                        <span className="flex flex-shrink-0" aria-label={`${review.rating} stars`}>
                          {"★".repeat(review.rating)}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white ring-2 ring-amber-500/30">
                          {review.firstName.charAt(0)}
                          {review.lastName?.charAt(0) ?? ""}
                        </div>
                        <span className="font-semibold text-neutral-950">
                          {formatReviewerName(review.firstName, review.lastName)}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
                        {review.text[locale]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={prev}
                  aria-label={locale === "sq" ? "Review i mëparshëm" : locale === "de" ? "Vorherige Bewertung" : "Previous review"}
                  className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex gap-2">
                  {GOOGLE_REVIEWS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`${locale === "sq" ? "Shiko review" : locale === "de" ? "Bewertung anzeigen" : "View review"} ${idx + 1}`}
                      aria-current={idx === activeIndex ? "true" : undefined}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeIndex ? "w-8 bg-amber-400" : "w-2 bg-white/25 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={next}
                  aria-label={locale === "sq" ? "Review tjetër" : locale === "de" ? "Nächste Bewertung" : "Next review"}
                  className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* CTA */}
        <AnimateIn delay={200}>
          <div className="mt-16 md:mt-20">
            <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-gradient-to-br from-white via-amber-50/30 to-white p-8 shadow-[0_20px_60px_-30px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/10 md:p-12">
              <div
                className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl"
                aria-hidden
              />
              <div className="relative flex flex-col items-center text-center">
                <h3 className="font-display text-xl font-semibold text-neutral-950 md:text-2xl">
                  {locale === "sq" ? "Gati të fillosh?" : locale === "de" ? "Bereit zu starten?" : "Ready to start?"}
                </h3>
                <p className="mt-2 max-w-md text-sm text-neutral-600">
                  {copy.ctaSubtext}
                </p>
                <LocaleLink
                  href="/trainings/register"
                  className="mt-7 inline-flex h-14 min-w-[200px] items-center justify-center rounded-full bg-neutral-950 px-10 text-base font-semibold text-white shadow-xl shadow-neutral-900/25 transition hover:bg-neutral-800 hover:shadow-2xl"
                >
                  {copy.registerNow}
                </LocaleLink>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
