"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/services-data";
import { FAQ_BY_LOCALE } from "@/lib/faq-data";

export default function FaqPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "sq";
  const faqs = FAQ_BY_LOCALE[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const title = locale === "sq" ? "Pyetje të shpeshta" : locale === "de" ? "Häufige Fragen" : "Frequently asked questions";
  const subtitle = locale === "sq"
    ? "Përgjigje të shpejta për pyetjet më të bëra."
    : locale === "de"
    ? "Schnelle Antworten auf die häufigsten Fragen."
    : "Quick answers to the most common questions.";

  return (
    <section className="py-14 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">FAQ</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-xl text-white/70">{subtitle}</p>

      <div className="mt-10 space-y-3">
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
