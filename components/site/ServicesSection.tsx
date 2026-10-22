"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import PackageCard from "@/components/site/PackageCard";
import { PACKAGE_GROUP_NOTES, getPackageCtaHref, type Pkg, type PackageGroup } from "@/lib/packages-data";

type Locale = "sq" | "en" | "de";
type Service = { title: string; desc: string; price?: string };

const GROUP_ICONS = [
  <svg key="0" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
];

type PackageFilterTab = { label: string; groups: PackageGroup[] };

const GROUP_LABEL: Record<Locale, { services: string; packages: string }> = {
  sq: { services: "Kategoritë e shërbimeve", packages: "Kategoritë e paketave" },
  en: { services: "Service categories", packages: "Package categories" },
  de: { services: "Leistungskategorien", packages: "Paketkategorien" },
};

type Props = {
  locale: Locale;
  services: Service[];
  filterTabs: { label: string; indices: number[] }[];
  serviceAnchors: readonly string[];
  priceTooltip: string;
  packagesByGroup: Record<PackageGroup, Pkg[]>;
  packageFilterTabs: PackageFilterTab[];
  packageGroupLabels: Record<PackageGroup, string>;
  /** Verified testimonials only (see lib/testimonials.ts). */
  testimonials: { quote: string; name: string; role: string; company?: string }[];
  copy: {
    sectionKicker: string;
    sectionTitleBefore: string;
    sectionTitleHighlight: string;
    sectionIntro: string;
    quoteRequest: string;
    more: string;
    requestQuoteForGroup: string;
    packagesKicker: string;
    packagesTitleBefore: string;
    packagesTitleHighlight: string;
    packagesIntro: string;
    comparePackages: string;
  };
};

function ToggleGroup({
  label,
  options,
  active,
  onChange,
  dark = false,
}: {
  label: string;
  options: string[];
  active: number;
  onChange: (idx: number) => void;
  dark?: boolean;
}) {
  return (
    <div className="mb-8 w-full overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        role="group"
        aria-label={label}
        className={`inline-flex min-w-min flex-nowrap gap-0 rounded-2xl p-1.5 ring-1 md:flex-wrap ${
          dark ? "bg-white/10 ring-white/10" : "bg-neutral-200/60 ring-black/[0.04]"
        }`}
      >
        {options.map((option, idx) => (
          <button
            key={option}
            type="button"
            aria-pressed={active === idx}
            onClick={() => onChange(idx)}
            className={`min-h-11 whitespace-nowrap rounded-[0.65rem] px-4 text-sm font-medium transition-colors duration-200 ${
              active === idx
                ? "bg-white text-neutral-950 shadow-sm ring-1 ring-black/[0.06]"
                : dark
                  ? "text-neutral-300 hover:text-white"
                  : "text-neutral-600 hover:text-neutral-950"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection({
  locale,
  services,
  filterTabs,
  serviceAnchors,
  priceTooltip,
  packagesByGroup,
  packageFilterTabs,
  packageGroupLabels,
  testimonials,
  copy,
}: Props) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activePackageTab, setActivePackageTab] = useState<number>(0);

  const packageTabs = packageFilterTabs.filter((tab) => tab.groups.length > 0);
  const visiblePackageGroups = packageTabs[activePackageTab]?.groups ?? ([] as PackageGroup[]);
  const activeFilter = filterTabs[activeTab];
  const notes = PACKAGE_GROUP_NOTES[locale];

  return (
    <section id="services" aria-labelledby="services-heading" className="relative overflow-hidden py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_50%,#fafafa_100%)]"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="mb-10 text-center md:text-left">
          <span className="inline-flex items-center justify-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500 md:justify-start">
            <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
            {copy.sectionKicker}
          </span>
          <h2 id="services-heading" className="mt-4 font-display text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {copy.sectionTitleBefore}
            <span className="bg-gradient-to-r from-[#8a7344] to-[#5c4c2c] bg-clip-text text-transparent">
              {copy.sectionTitleHighlight}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600 md:mx-0">{copy.sectionIntro}</p>
        </div>

        <ToggleGroup
          label={GROUP_LABEL[locale].services}
          options={filterTabs.map((t) => t.label)}
          active={activeTab}
          onChange={setActiveTab}
        />

        {activeFilter && (
          <div className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.12)] md:p-8">
            <div className="relative mb-7 flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-950 text-white shadow-lg shadow-neutral-900/15">
                {GROUP_ICONS[activeTab % GROUP_ICONS.length]}
              </span>
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-600">{activeFilter.label}</h3>
            </div>
            <ul
              className={
                activeFilter.indices.length === 1
                  ? "grid grid-cols-1 gap-4 md:max-w-md"
                  : "grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {activeFilter.indices.map((i) => {
                const s = services[i];
                const title = s.title.replace(/\s*\n\s*/g, " ");
                return (
                  <li key={s.title} className="flex">
                    <LocaleLink
                      href={`/services/${serviceAnchors[i]}`}
                      className="group relative flex w-full flex-col rounded-3xl border border-black/[0.06] bg-white p-6 text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.02] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-20px_rgba(184,157,94,0.18)] md:text-left"
                    >
                      <h4 className="text-lg font-semibold tracking-tight text-neutral-950 md:text-xl">{title}</h4>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-4">{s.desc}</p>
                      <div className="mt-5 border-t border-neutral-200/80 pt-4">
                        <p className="text-sm font-semibold text-neutral-950">{s.price ?? copy.quoteRequest}</p>
                        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#6b5a38]">
                          {copy.more}
                          <span className="sr-only">: {title}</span>
                          <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
                        </p>
                      </div>
                    </LocaleLink>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-neutral-600">{priceTooltip}</p>

            {testimonials.length > 0 && (
              <div className="mt-8 space-y-4 rounded-2xl border border-black/[0.06] bg-neutral-50 p-5 md:p-6">
                {testimonials.map((t, i) => (
                  <figure key={i} className={i > 0 ? "border-t border-neutral-200 pt-4" : ""}>
                    <blockquote className="text-sm italic leading-relaxed text-neutral-800">&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className="mt-2 text-xs font-medium text-neutral-950">
                      {t.name}, {t.role}
                      {t.company && ` · ${t.company}`}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            <div className="mt-7 flex justify-center md:justify-start">
              <LocaleLink
                href="/contact"
                className="inline-flex h-11 w-full max-w-md items-center justify-center rounded-full bg-neutral-950 px-7 text-sm font-semibold text-white transition-colors duration-300 hover:bg-neutral-800 sm:w-auto"
              >
                {copy.requestQuoteForGroup}
              </LocaleLink>
            </div>
          </div>
        )}

        {/* Packages: dark panel, light cards */}
        <div className="relative mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-neutral-950 px-5 py-10 shadow-2xl shadow-black/25 ring-1 ring-white/10 md:rounded-[2rem] md:px-10 md:py-14">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#B89D5E]/15 blur-3xl" aria-hidden />

            <div className="relative mb-8 text-center md:text-left">
              <span className="inline-flex items-center justify-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-400 md:justify-start">
                <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/90 to-transparent" aria-hidden />
                {copy.packagesKicker}
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                {copy.packagesTitleBefore}
                <span className="bg-gradient-to-r from-[#d9c38c] to-[#B89D5E] bg-clip-text text-transparent">
                  {copy.packagesTitleHighlight}
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-300 md:mx-0">{copy.packagesIntro}</p>
            </div>

            <ToggleGroup
              label={GROUP_LABEL[locale].packages}
              options={packageTabs.map((t) => t.label)}
              active={activePackageTab}
              onChange={setActivePackageTab}
              dark
            />

            <div key={activePackageTab} className="relative space-y-12 animate-packages-tab-enter">
              {visiblePackageGroups.map((groupKey) => (
                <div key={groupKey}>
                  <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#d1b780] md:text-left">
                    {packageGroupLabels[groupKey]}
                  </h3>
                  <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {packagesByGroup[groupKey].map((pkg, pkgIdx) => (
                      <PackageCard key={`${groupKey}-${pkg.title}`} pkg={pkg} locale={locale} href={getPackageCtaHref(groupKey, pkgIdx)} elevated />
                    ))}
                  </div>
                  {notes[groupKey] && (
                    <p className="mt-5 text-center text-sm leading-relaxed text-neutral-300 md:text-left">{notes[groupKey]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="relative mt-10 flex justify-center md:justify-start">
              <LocaleLink
                href="/packages"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
              >
                {copy.comparePackages}
                <span aria-hidden>→</span>
              </LocaleLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
