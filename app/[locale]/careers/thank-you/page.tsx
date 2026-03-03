"use client";

import { useParams } from "next/navigation";
import LocaleLink from "@/components/site/LocaleLink";
import type { Locale } from "@/lib/services-data";

const COPY: Record<Locale, { title: string; message: string; backToCareers: string; backToHome: string }> = {
  sq: {
    title: "Faleminderit!",
    message: "Aplikimi juaj u dërgua. Do të kontaktojmë së shpejti.",
    backToCareers: "Kthehu te Karriera",
    backToHome: "Kthehu në faqen kryesore",
  },
  en: {
    title: "Thank you!",
    message: "Your application has been sent. We'll contact you soon.",
    backToCareers: "Back to Careers",
    backToHome: "Back to home",
  },
  de: {
    title: "Vielen Dank!",
    message: "Ihre Bewerbung wurde gesendet. Wir melden uns bald.",
    backToCareers: "Zurück zu Karriere",
    backToHome: "Zurück zur Startseite",
  },
};

export default function CareersThankYouPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "sq";
  const copy = COPY[locale];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[white]/10 blur-3xl" />
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
            href="/careers"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[white] px-6 font-medium text-black transition hover:bg-[white/90]"
          >
            {copy.backToCareers}
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
