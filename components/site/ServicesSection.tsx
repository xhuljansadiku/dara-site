"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import TextWithBreaksAfterPeriods from "@/components/site/TextWithBreaksAfterPeriods";
import PackageCard from "@/components/site/PackageCard";
import type { Pkg, PackageGroup } from "@/lib/packages-data";

type Locale = "sq" | "en" | "de";
type Service = { title: string; desc: string; price?: string };

const GROUP_ICONS = [
  <svg key="0" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  <svg key="3" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
];

type PackageFilterTab = { label: string; groups: PackageGroup[] };

type Props = {
  locale: Locale;
  services: Service[];
  groupIndices: readonly (readonly number[])[];
  groupLabels: [string, string, string, string];
  filterTabs: { label: string; indices: number[] }[];
  serviceAnchors: readonly string[];
  priceTooltip: string;
  resultByIndex: Record<number, string>;
  packagesByGroup: Record<PackageGroup, Pkg[]>;
  packageFilterTabs: PackageFilterTab[];
  packageGroupLabels: Record<PackageGroup, string>;
  testimonial: { quote: string; name: string; role: string; company?: string };
  copy: {
    sectionKicker: string;
    sectionTitleBefore: string;
    sectionTitleHighlight: string;
    sectionIntro: string;
    allServices: string;
    from: string;
    quoteRequest: string;
    more: string;
    requestQuoteForGroup: string;
    packagesTitle: string;
    packagesKicker: string;
    packagesTitleBefore: string;
    packagesTitleHighlight: string;
    packagesIntro: string;
    packagesAll: string;
  };
};

export default function ServicesSection({
  locale,
  services,
  groupIndices,
  groupLabels,
  filterTabs,
  serviceAnchors,
  priceTooltip,
  resultByIndex,
  packagesByGroup,
  packageFilterTabs,
  packageGroupLabels,
  testimonial,
  copy,
}: Props) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activePackageTab, setActivePackageTab] = useState<number>(0);
  const [tooltipCard, setTooltipCard] = useState<number | null>(null);

  const filteredPackageTabs = packageFilterTabs.filter((tab) => tab.groups.length > 0);
  const packageTabLabels = filteredPackageTabs.map((t) => t.label);

  const visiblePackageGroups =
    filteredPackageTabs[activePackageTab]?.groups ?? ([] as PackageGroup[]);

  const visibleGroups = filterTabs[activeTab]
    ? [{ indices: filterTabs[activeTab].indices, groupIndex: 0, groupLabel: filterTabs[activeTab].label }]
    : [];

  const tabLabels = filterTabs.map((t) => t.label);

  return (
    <section id="services" className="relative overflow-hidden py-16 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_50%,#fafafa_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45] [mask-image:linear-gradient(180deg,white,transparent)]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
        <div>
          <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
            <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
            {copy.sectionKicker}
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {copy.sectionTitleBefore}
            <span className="bg-gradient-to-r from-[#B89D5E] to-[#6b5a38] bg-clip-text text-transparent">
              {copy.sectionTitleHighlight}
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600 md:max-w-none">
            {copy.sectionIntro}
          </p>
        </div>
      </div>

      {/* Tabs: segmented control */}
      <div className="mb-10 w-full overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          className="inline-flex min-w-min flex-wrap gap-0 rounded-2xl bg-neutral-200/60 p-1.5 ring-1 ring-black/[0.04] backdrop-blur-sm"
          role="tablist"
        >
          {tabLabels.map((label, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={activeTab === idx}
              onClick={() => setActiveTab(idx)}
              className={`whitespace-nowrap rounded-[0.65rem] px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeTab === idx
                  ? "bg-white text-neutral-950 shadow-sm ring-1 ring-black/[0.06]"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Groups + cards */}
      <div className="space-y-12 md:space-y-16">
        {visibleGroups.map(({ indices, groupIndex, groupLabel }, boxIdx) => (
          <div
            key={boxIdx}
            className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.12)] md:p-8"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
              aria-hidden
            />
            <div className="relative mb-7 flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-950 text-white shadow-lg shadow-neutral-900/15 ring-1 ring-white/10">
                {GROUP_ICONS[activeTab === 0 ? groupIndex : (activeTab - 1) % GROUP_ICONS.length]}
              </span>
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                {groupLabel}
              </h3>
            </div>
            <div
              className={
                indices.length === 1
                  ? "grid min-h-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-1 md:max-w-md"
                  : "grid min-h-0 auto-rows-[minmax(0,1fr)] grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {indices.map((i) => {
                const s = services[i];
                const result = resultByIndex[i];
                const anchor = serviceAnchors[i];
                return (
                  <LocaleLink
                    key={s.title}
                    href={`/services/${anchor}`}
                    className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white/90 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.02] transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_24px_48px_-20px_rgba(184,157,94,0.18)] md:min-h-[300px] md:p-6"
                  >
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#B89D5E]/15 via-transparent to-transparent blur-2xl transition-opacity group-hover:opacity-100 opacity-70"
                      aria-hidden
                    />

                    <div className="relative flex h-full min-h-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <span className="inline-flex min-w-[2.25rem] items-center justify-center rounded-full bg-neutral-950 px-2 py-1 font-mono text-[10px] font-semibold tabular-nums text-white">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {result && (
                          <span className="rounded-full bg-[#B89D5E]/10 px-2.5 py-0.5 text-[10px] font-medium text-neutral-900 ring-1 ring-[#B89D5E]/25">
                            {result}
                          </span>
                        )}
                      </div>

                      <h4 className="mt-5 text-lg font-semibold tracking-tight text-neutral-950 md:text-xl">
                        {s.title}
                      </h4>
                      <p className="mt-3 min-h-0 flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-3">
                        {s.desc}
                      </p>

                      <div className="mt-auto flex flex-col border-t border-neutral-200/80 pt-4">
                        <div className="flex items-center justify-between gap-2">
                          {s.price ? (
                            <>
                              <div className="flex items-baseline gap-2">
                                <span className="text-[10px] uppercase tracking-wider text-gray-500">
                                  {copy.from}
                                </span>
                                <span className="font-semibold text-gray-900">{s.price}</span>
                              </div>
                              <span
                                className="relative flex h-5 w-5 shrink-0 cursor-help items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-[10px] text-neutral-500 transition group-hover:border-[#B89D5E]/60"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onMouseEnter={() => setTooltipCard(i)}
                                onMouseLeave={() => setTooltipCard(null)}
                                title={priceTooltip}
                              >
                                ?
                                {tooltipCard === i && (
                                  <span className="absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-900 shadow-xl">
                                    {priceTooltip}
                                  </span>
                                )}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-xs text-gray-500">{copy.quoteRequest}</span>
                              <span
                                className="flex h-5 w-5 shrink-0 cursor-help items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-[10px] text-neutral-500"
                                title={priceTooltip}
                              >
                                ?
                              </span>
                            </>
                          )}
                        </div>

                        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-neutral-950">
                          {copy.more}
                          <span className="text-xs transition group-hover:translate-x-0.5">→</span>
                        </div>
                      </div>
                    </div>
                  </LocaleLink>
                );
              })}
            </div>

            {/* Testimonial pas përmbajtjes (filter Marketing) */}
            {activeTab === 0 && (
              <div className="relative mt-8 overflow-hidden rounded-2xl border border-black/[0.06] bg-gradient-to-br from-neutral-50 to-white p-5 md:p-6">
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[#B89D5E]/10 blur-2xl" aria-hidden />
                <p className="relative text-sm italic leading-relaxed text-neutral-800">
                  &ldquo;
                  <TextWithBreaksAfterPeriods text={testimonial.quote} />
                  &rdquo;
                </p>
                <p className="relative mt-3 text-xs font-medium text-neutral-950">
                  {testimonial.name}, {testimonial.role}
                  {testimonial.company && ` · ${testimonial.company}`}
                </p>
              </div>
            )}

            {/* CTA per group */}
            <div className="relative mt-6">
              <LocaleLink
                href="/contact"
                className="animate-services-cta-glow inline-flex h-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 px-7 text-sm font-semibold text-white transition-colors duration-300 hover:bg-neutral-900"
              >
                {copy.requestQuoteForGroup}
              </LocaleLink>
            </div>
          </div>
        ))}
      </div>

      {/* Packages: dark panel, light cards */}
      <div className="relative mt-20 md:mt-24">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-neutral-950 px-6 py-10 shadow-2xl shadow-black/25 ring-1 ring-white/10 md:rounded-[2rem] md:px-10 md:py-14">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#B89D5E]/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-32 left-1/4 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
            aria-hidden
          />

        <div className="relative mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
              <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/90 to-transparent" aria-hidden />
              {copy.packagesKicker}
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {copy.packagesTitleBefore}
              <span className="bg-gradient-to-r from-[#c4af78] to-[#B89D5E] bg-clip-text text-transparent">
                {copy.packagesTitleHighlight}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-400 md:max-w-none">
              <TextWithBreaksAfterPeriods text={copy.packagesIntro} />
            </p>
          </div>
        </div>
        <div className="relative mb-10 w-full overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-min flex-wrap gap-0 rounded-2xl bg-white/10 p-1.5 ring-1 ring-white/10 backdrop-blur-md">
            {packageTabLabels.map((label, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePackageTab(idx)}
                className={`whitespace-nowrap rounded-[0.65rem] px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activePackageTab === idx
                    ? "bg-white text-neutral-950 shadow-lg shadow-black/20"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div key={activePackageTab} className="relative space-y-14 animate-packages-tab-enter">
          {visiblePackageGroups.map((groupKey) => (
            <div key={groupKey}>
              <h4 className="mb-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B89D5E]/65 md:text-xs">
                {packageGroupLabels[groupKey]}
              </h4>
              <div className="grid min-h-0 grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {packagesByGroup[groupKey].map((pkg) => (
                  <PackageCard key={`${groupKey}-${pkg.title}`} pkg={pkg} locale={locale} ctaLabel={copy.requestQuoteForGroup} elevated />
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      </div>
    </section>
  );
}
