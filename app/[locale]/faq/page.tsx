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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">FAQ</span>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{title}</h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">{subtitle}</p>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="card overflow-hidden shadow-md"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">{faq.q}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-gray-600 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="border-t border-gray-200 px-6 py-4 text-gray-600">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
