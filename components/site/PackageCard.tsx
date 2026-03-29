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
  const isFeatured = Boolean(pkg.badge);

  const shell =
    elevated && isFeatured
      ? "border-[#B89D5E]/40 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.45),0_0_44px_-10px_rgba(184,157,94,0.38)] ring-2 ring-[#B89D5E]/45 hover:shadow-[0_32px_64px_-24px_rgba(0,0,0,0.55),0_0_52px_-8px_rgba(184,157,94,0.42)]"
      : elevated
        ? "border-white/20 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.45)] ring-1 ring-black/5 hover:shadow-[0_32px_64px_-24px_rgba(0,0,0,0.55)]"
        : isFeatured
          ? "border-[#B89D5E]/35 shadow-[0_0_36px_-18px_rgba(184,157,94,0.28)] ring-2 ring-[#B89D5E]/35 hover:border-[#B89D5E]/45 hover:shadow-[0_0_44px_-14px_rgba(184,157,94,0.35)]"
          : "border-neutral-200/90 shadow-lg shadow-black/[0.06] ring-1 ring-black/[0.04] hover:border-neutral-300/90 hover:shadow-xl";

  return (
    <div
      className={`group relative flex min-h-[340px] flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-1 ${shell}`}
    >
      {/* Header strip */}
      <div className="flex items-center justify-center border-b border-neutral-100 bg-neutral-50/90 px-5 py-3.5 md:justify-start">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
          {pkg.subtitle}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 text-center md:p-6 md:text-left">
        {pkg.badge && (
          <div className="mb-3 flex justify-center">
            <span
              className="inline-flex max-w-full items-center gap-1.5 whitespace-nowrap rounded-[20px] border border-[#B89D5E] bg-neutral-950 px-3 py-1 text-[12px] font-semibold leading-none text-[#B89D5E] md:text-[13px]"
              title={pkg.badge}
            >
              <svg
                className="h-3 w-3 shrink-0 text-[#B89D5E]"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {pkg.badge}
            </span>
          </div>
        )}
        <h5 className="text-xl font-bold tracking-tight text-neutral-950">{pkg.title}</h5>
        <div className="mt-3 flex items-baseline justify-center gap-2 md:justify-start">
          {pkg.priceOriginal && (
            <span className="text-sm text-neutral-400 line-through">{pkg.priceOriginal}</span>
          )}
          <span className="text-lg font-bold text-neutral-950">{pkg.price}</span>
        </div>

        <ul className="mt-6 flex-1 space-y-3">
          {pkg.points.map((point, idx) => (
            <li key={point} className="flex flex-col items-center gap-2 text-sm text-neutral-600 md:flex-row md:items-start md:gap-3 md:text-left">
              <span
                className="animate-package-check-pop mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white ring-1 ring-neutral-950/10"
                style={{ animationDelay: `${80 + idx * 55}ms` }}
              >
                <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
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
