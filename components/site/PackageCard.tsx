"use client";

import LocaleLink from "@/components/site/LocaleLink";
import { type Locale } from "@/lib/services-data";
import type { Pkg } from "@/lib/packages-data";

const CTA_LABELS: Record<Locale, Record<"quote" | "consult", string>> = {
  sq: { quote: "Kërko ofertë", consult: "Kërko konsultim" },
  en: { quote: "Get a quote", consult: "Request consultation" },
  de: { quote: "Angebot anfragen", consult: "Beratung anfragen" },
};

type Props = { pkg: Pkg; locale: Locale; ctaLabel?: string };

export default function PackageCard({ pkg, locale, ctaLabel: ctaLabelProp }: Props) {
  const ctaType = pkg.cta ?? "quote";
  const ctaLabel = ctaLabelProp ?? CTA_LABELS[locale][ctaType];
  return (
    <div className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:border-gray-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Header strip */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700">
          {pkg.subtitle}
        </span>
        {pkg.badge && (
          <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-medium text-amber-800">
            ⭐ {pkg.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h5 className="text-xl font-bold text-gray-900">{pkg.title}</h5>
        <div className="mt-3 flex items-baseline gap-2">
          {pkg.priceOriginal && (
            <span className="text-sm text-gray-500 line-through">{pkg.priceOriginal}</span>
          )}
          <span className="text-lg font-bold text-gray-900">{pkg.price}</span>
        </div>

        <ul className="mt-6 flex-1 space-y-3">
          {pkg.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-200">
                <svg className="h-2.5 w-2.5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              {point}
            </li>
          ))}
        </ul>

        <LocaleLink
          href="/contact"
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
        >
          {ctaLabel}
        </LocaleLink>
      </div>
    </div>
  );
}
