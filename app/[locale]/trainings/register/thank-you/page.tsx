"use client";

import { useParams } from "next/navigation";
import LocaleLink from "@/components/site/LocaleLink";
import type { Locale } from "@/lib/trainings-data";

const COPY: Record<Locale, { title: string; message: string; backToTrainings: string; backToHome: string }> = {
  sq: {
    title: "U regjistrua!",
    message: "Kërkesa juaj për regjistrim u dërgua. Do të kontaktojmë së shpejti për detajet.",
    backToTrainings: "Kthehu te trajnimet",
    backToHome: "Kthehu në faqen kryesore",
  },
  en: {
    title: "Registered!",
    message: "Your registration request has been sent. We'll contact you soon with the details.",
    backToTrainings: "Back to trainings",
    backToHome: "Back to home",
  },
  de: {
    title: "Angemeldet!",
    message: "Ihre Anmeldung wurde gesendet. Wir melden uns bald mit den Details.",
    backToTrainings: "Zurück zu Trainings",
    backToHome: "Zurück zur Startseite",
  },
};

export default function TrainingThankYouPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "sq";
  const copy = COPY[locale];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
          <svg className="h-10 w-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{copy.title}</h1>
        <p className="mt-4 text-lg text-white/70">{copy.message}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <LocaleLink
            href="/trainings"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#c8a55c] px-6 font-medium text-black transition hover:bg-[#e2c37a]"
          >
            {copy.backToTrainings}
          </LocaleLink>
          <LocaleLink
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 font-medium text-white transition hover:bg-white/5"
          >
            {copy.backToHome}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
