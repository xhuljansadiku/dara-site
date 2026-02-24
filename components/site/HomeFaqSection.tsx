"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import { FAQ_BY_LOCALE } from "@/lib/faq-data";
import type { Locale } from "@/lib/services-data";

export default function HomeFaqSection({ locale }: { locale: Locale }) {
  const faqs = FAQ_BY_LOCALE[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const title = locale === "sq" ? "Pyetje të shpeshta" : locale === "de" ? "Häufige Fragen" : "Frequently asked questions";
  const subtitle =
    locale === "sq"
      ? "Përgjigje të shpejta për pyetjet më të bëra."
      : locale === "de"
        ? "Schnelle Antworten auf die häufigsten Fragen."
        : "Quick answers to the most common questions.";
  const viewAll = locale === "sq" ? "Shiko të gjitha →" : locale === "de" ? "Alle anzeigen →" : "View all →";

  return (
    <section id="faq" className="py-12 md:py-20">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
          <p className="mt-3 max-w-xl text-sm text-white/70">{subtitle}</p>
        </div>
        <LocaleLink
          href="/faq"
          className="shrink-0 text-sm font-medium text-[#c8a55c] transition hover:text-[#b6944f]"
        >
          {viewAll}
        </LocaleLink>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-white/5"
            >
              <span className="font-medium text-white">{faq.q}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-[#c8a55c] transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="border-t border-white/10 px-6 py-4 text-white/70">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
