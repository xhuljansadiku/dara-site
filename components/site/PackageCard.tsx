"use client";

import LocaleLink from "@/components/site/LocaleLink";
import { type Locale } from "@/lib/services-data";
import type { Pkg } from "@/lib/packages-data";

const CTA_LABELS: Record<Locale, Record<"quote" | "consult", string>> = {
  sq: { quote: "Kërko ofertë", consult: "Kërko konsultim" },
  en: { quote: "Get a quote", consult: "Request consultation" },
  de: { quote: "Angebot anfragen", consult: "Beratung anfragen" },
};

type Props = { pkg: Pkg; locale: Locale; ctaLabel?: string; /** Deep shadow for dark-on-light panels (e.g. homepage Paketa block) */ elevated?: boolean };

export default function PackageCard({ pkg, locale, ctaLabel: ctaLabelProp, elevated = false }: Props) {
  const ctaType = pkg.cta ?? "quote";
  const ctaLabel = ctaLabelProp ?? CTA_LABELS[locale][ctaType];
  return (
    <div
      className={`group relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-1 ${
        elevated
          ? "border-white/20 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.45)] ring-1 ring-black/5 hover:shadow-[0_32px_64px_-24px_rgba(0,0,0,0.55)]"
          : "border-neutral-200/90 shadow-lg shadow-black/[0.06] ring-1 ring-black/[0.04] hover:border-neutral-300/90 hover:shadow-xl"
      }`}
    >
      {/* Header strip */}
      <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/90 px-5 py-3.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
          {pkg.subtitle}
        </span>
        {pkg.badge && (
          <span className="flex items-center gap-1 rounded-full bg-neutral-950 px-2.5 py-0.5 text-[10px] font-medium text-amber-300">
            ⭐ {pkg.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h5 className="text-xl font-bold tracking-tight text-neutral-950">{pkg.title}</h5>
        <div className="mt-3 flex items-baseline gap-2">
          {pkg.priceOriginal && (
            <span className="text-sm text-neutral-400 line-through">{pkg.priceOriginal}</span>
          )}
          <span className="text-lg font-bold text-neutral-950">{pkg.price}</span>
        </div>

        <ul className="mt-6 flex-1 space-y-3">
          {pkg.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-neutral-600">
              <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white ring-1 ring-neutral-950/10">
                <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              {point}
            </li>
          ))}
        </ul>

        <LocaleLink
          href="/contact"
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-neutral-950 text-sm font-semibold text-white shadow-lg shadow-neutral-900/25 transition hover:bg-neutral-800"
        >
          {ctaLabel}
        </LocaleLink>
      </div>
    </div>
  );
}
