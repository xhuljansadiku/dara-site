"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import { FAQ_BY_LOCALE, HOME_FAQ_COUNT } from "@/lib/faq-data";
import type { Locale } from "@/lib/services-data";

type Props = {
  locale: Locale;
  /** Rruga e veçantë `/faq`: titull `h1`, pa butonin «Shiko të gjitha» */
  variant?: "home" | "page";
};

export default function HomeFaqSection({ locale, variant = "home" }: Props) {
  const isPage = variant === "page";
  const faqs = isPage ? FAQ_BY_LOCALE[locale] : FAQ_BY_LOCALE[locale].slice(0, HOME_FAQ_COUNT);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const TitleTag = isPage ? "h1" : "h2";

  const title = locale === "sq" ? "Pyetje të shpeshta" : locale === "de" ? "Häufige Fragen" : "Frequently asked questions";
  const subtitle =
    locale === "sq"
      ? "Përgjigje të shpejta për pyetjet më të bëra."
      : locale === "de"
        ? "Schnelle Antworten auf die häufigsten Fragen."
        : "Quick answers to the most common questions.";
  const viewAll = locale === "sq" ? "Shiko të gjitha" : locale === "de" ? "Alle anzeigen" : "View all";

  return (
    <section {...(!isPage ? { id: "faq" } : {})} className="relative overflow-hidden py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_50%,#fafafa_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.38] [mask-image:linear-gradient(180deg,white,transparent)]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#B89D5E]/10 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
        <div
          className={
            isPage
              ? "mb-10 text-center"
              : "mb-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left"
          }
        >
          <div className={isPage ? "mx-auto max-w-2xl" : "w-full sm:w-auto"}>
            <span className={`inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500 ${isPage ? "justify-center" : "justify-center sm:justify-start"}`}>
              <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
              FAQ
            </span>
            <TitleTag
              className={`mt-4 bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-900 bg-clip-text font-display font-semibold tracking-tight text-transparent md:text-4xl lg:leading-[1.1] ${
                isPage
                  ? "text-4xl lg:text-[2.75rem]"
                  : "text-3xl lg:text-[2.65rem]"
              }`}
            >
              {title}
            </TitleTag>
            <p className={`mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600 ${isPage ? "mx-auto" : "mx-auto sm:mx-0"}`}>{subtitle}</p>
          </div>
          {!isPage && (
            <LocaleLink
              href="/faq"
              className="group inline-flex h-11 w-full max-w-xs shrink-0 items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white px-5 text-sm font-semibold text-neutral-950 shadow-sm ring-1 ring-black/[0.04] transition hover:border-[#B89D5E]/50 hover:bg-[#B89D5E]/10/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 sm:w-auto sm:max-w-none"
            >
              {viewAll}
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                →
              </span>
            </LocaleLink>
          )}
        </div>

        <div className="space-y-3 md:space-y-3.5">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#B89D5E]/50 bg-white shadow-[0_12px_40px_-24px_rgba(184,157,94,0.15)] ring-1 ring-[#B89D5E]/15"
                    : "border-black/[0.06] bg-white/90 shadow-[0_4px_24px_-16px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] hover:border-neutral-300/80"
                }`}
              >
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-neutral-50/80 md:px-6 md:py-4"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                >
                  <span className="font-semibold leading-snug text-neutral-950 md:text-[17px]">{faq.q}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                      isOpen
                        ? "border-[#B89D5E]/60 bg-[#B89D5E]/10 text-neutral-950"
                        : "border-neutral-200 bg-neutral-50 text-neutral-600"
                    }`}
                  >
                    <svg
                      className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  hidden={!isOpen}
                >
                  <div className="border-t border-neutral-100 px-5 py-4 text-left text-[15px] leading-relaxed text-neutral-600 md:px-6">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
