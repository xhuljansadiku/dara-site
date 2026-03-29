"use client";

import { useParams } from "next/navigation";
import LocaleLink from "@/components/site/LocaleLink";
import type { Locale } from "@/lib/services-data";

const COPY: Record<
  Locale,
  { kicker: string; title: string; message: string; backToCareers: string; backToHome: string }
> = {
  sq: {
    kicker: "Aplikimi u dërgua",
    title: "Faleminderit!",
    message: "Aplikimi juaj u dërgua me sukses. Ekipi ynë do ta shqyrtojë dhe do të ju kontaktojmë së shpejti.",
    backToCareers: "Kthehu te karriera",
    backToHome: "Faqja kryesore",
  },
  en: {
    kicker: "Application sent",
    title: "Thank you!",
    message: "Your application was submitted successfully. Our team will review it and get back to you soon.",
    backToCareers: "Back to careers",
    backToHome: "Home",
  },
  de: {
    kicker: "Bewerbung gesendet",
    title: "Vielen Dank!",
    message: "Ihre Bewerbung wurde erfolgreich übermittelt. Unser Team prüft sie und meldet sich bald bei Ihnen.",
    backToCareers: "Zurück zur Karriere",
    backToHome: "Startseite",
  },
};

export default function CareersThankYouPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "sq";
  const copy = COPY[locale];

  return (
    <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-stone-50 via-white to-stone-50/50 py-20 md:py-28 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-12 h-80 w-80 -translate-x-1/2 rounded-full bg-[#B89D5E]/15 blur-3xl" />
        <div className="absolute bottom-0 right-[-10%] h-72 w-72 rounded-full bg-[#B89D5E]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <div className="rounded-3xl border border-stone-200/90 bg-white p-10 shadow-xl shadow-stone-200/60 ring-1 ring-black/[0.04] md:p-12">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full border border-[#B89D5E]/30 bg-[#B89D5E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#6b5a38]">
                {copy.kicker}
              </span>

              <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 ring-2 ring-emerald-500/15">
                <svg
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-neutral-950 md:text-[2.75rem] md:leading-[1.1]">
                {copy.title}
              </h1>
              <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-neutral-600">{copy.message}</p>

              <div className="mx-auto mt-8 h-px w-20 rounded-full bg-gradient-to-r from-transparent via-[#B89D5E]/70 to-transparent" />

              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <LocaleLink
                  href="/careers"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#B89D5E] px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-[#a68d54] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B89D5E]"
                >
                  {copy.backToCareers}
                </LocaleLink>
                <LocaleLink
                  href="/"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-8 text-sm font-semibold text-neutral-800 transition hover:border-stone-400 hover:bg-stone-50"
                >
                  {copy.backToHome}
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
