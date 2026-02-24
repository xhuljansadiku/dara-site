"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
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

  const packageTabLabels = packageFilterTabs.map((t) => t.label);

  const visiblePackageGroups =
    activePackageTab === 0 || packageFilterTabs[activePackageTab]?.groups.length === 0
      ? (["marketing", "brand", "training", "websiteLanding", "ecommerce", "saas", "maintenance"] as PackageGroup[])
      : packageFilterTabs[activePackageTab].groups;

  const visibleGroups =
    activeTab === 0
      ? groupIndices.map((indices, i) => ({ indices: [...indices], groupIndex: i, groupLabel: groupLabels[i] }))
      : [{ indices: filterTabs[activeTab - 1].indices, groupIndex: 0, groupLabel: filterTabs[activeTab - 1].label }];

  const tabLabels = [copy.allServices, ...filterTabs.map((t) => t.label)];

  return (
    <section id="services" className="relative py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#c8a55c]/[0.02] to-transparent" />

      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#c8a55c]">
            {copy.sectionKicker}
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            {copy.sectionTitleBefore}
            <span className="text-[#c8a55c]">{copy.sectionTitleHighlight}</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/60">{copy.sectionIntro}</p>
        </div>
        <LocaleLink
          href="/services"
          className="shrink-0 text-sm font-medium text-[#c8a55c] transition hover:text-[#d4b86a]"
        >
          {copy.allServices} →
        </LocaleLink>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {tabLabels.map((label, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab === idx
                ? "bg-[#c8a55c] text-black"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Groups + cards */}
      <div className="space-y-12 md:space-y-16">
        {visibleGroups.map(({ indices, groupIndex, groupLabel }, boxIdx) => (
          <div key={boxIdx} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#c8a55c]/15 text-[#c8a55c]">
                {GROUP_ICONS[activeTab === 0 ? groupIndex : (activeTab - 1) % GROUP_ICONS.length]}
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
                {groupLabel}
              </h3>
            </div>
            <div
              className={
                indices.length === 1
                  ? "grid min-h-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-1 md:max-w-md"
                  : "grid min-h-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
                    className="group relative flex min-h-[320px] flex-col rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#c8a55c]/15 md:p-6"
                  >
                    {/* Top gold line */}
                    <div className="absolute left-6 right-6 top-0 h-0.5 rounded-full bg-[#c8a55c]/50" />

                    <div className="relative flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-xs font-medium text-white/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {result && (
                          <span className="rounded-md bg-[#c8a55c]/20 px-2 py-0.5 text-[10px] font-medium text-[#c8a55c]">
                            {result}
                          </span>
                        )}
                      </div>

                      <h4 className="mt-4 text-lg font-semibold text-white md:text-xl">
                        {s.title}
                      </h4>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60 line-clamp-3">
                        {s.desc}
                      </p>

                      <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                        {s.price ? (
                          <>
                            <div className="flex items-baseline gap-2">
                              <span className="text-[10px] uppercase tracking-wider text-white/40">
                                {copy.from}
                              </span>
                              <span className="font-semibold text-[#c8a55c]">{s.price}</span>
                            </div>
                            <span
                              className="relative flex h-5 w-5 shrink-0 cursor-help items-center justify-center rounded-full border border-white/15 text-[10px] text-white/40"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                              onMouseEnter={() => setTooltipCard(i)}
                              onMouseLeave={() => setTooltipCard(null)}
                              title={priceTooltip}
                            >
                              ?
                              {tooltipCard === i && (
                                <span className="absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded-lg border border-white/10 bg-[#2b2b2b] px-3 py-2 text-xs text-white/90 shadow-xl">
                                  {priceTooltip}
                                </span>
                              )}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-xs text-white/50">{copy.quoteRequest}</span>
                            <span
                              className="flex h-5 w-5 shrink-0 cursor-help items-center justify-center rounded-full border border-white/15 text-[10px] text-white/40"
                              title={priceTooltip}
                            >
                              ?
                            </span>
                          </>
                        )}
                      </div>

                      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#c8a55c]">
                        {copy.more}
                        <span className="text-xs opacity-70 group-hover:opacity-100">→</span>
                      </div>
                    </div>
                  </LocaleLink>
                );
              })}
            </div>

            {/* Testimonial pas përmbajtjes (grupi 1 ose filter Marketing) */}
            {(groupIndex === 1 || activeTab === 1) && (
              <div className="mt-8 rounded-xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-5 md:p-6">
                <p className="text-sm italic text-white/80">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="mt-3 text-xs font-medium text-[#c8a55c]">
                  — {testimonial.name}, {testimonial.role}
                  {testimonial.company && ` · ${testimonial.company}`}
                </p>
              </div>
            )}

            {/* CTA per group */}
            <div className="mt-6">
              <LocaleLink
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-full border border-[#c8a55c]/40 bg-[#c8a55c]/10 px-5 text-sm font-medium text-[#c8a55c] transition hover:bg-[#c8a55c]/20"
              >
                {copy.requestQuoteForGroup}
              </LocaleLink>
            </div>
          </div>
        ))}
      </div>

      {/* Packages: filter + paketa për çdo lloj shërbimi */}
      <div className="mt-16 md:mt-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#c8a55c]">
              {copy.packagesKicker}
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {copy.packagesTitleBefore}
              <span className="text-[#c8a55c]">{copy.packagesTitleHighlight}</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/60">{copy.packagesIntro}</p>
          </div>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {packageTabLabels.map((label, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActivePackageTab(idx)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activePackageTab === idx
                  ? "bg-[#c8a55c] text-black"
                  : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="space-y-10">
          {visiblePackageGroups.map((groupKey) => (
            <div key={groupKey}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8a55c]/90">
                {packageGroupLabels[groupKey]}
              </h4>
              <div className="grid min-h-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-3">
                {packagesByGroup[groupKey].map((pkg) => (
                  <div
                    key={`${groupKey}-${pkg.title}`}
                    className="card card-lift relative flex min-h-[340px] flex-col rounded-2xl p-5 md:p-6"
                  >
                    {pkg.badge && (
                      <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#c8a55c]/20 px-2.5 py-1 text-[10px] font-medium text-[#c8a55c]">
                        <span aria-hidden>⭐</span> {pkg.badge}
                      </span>
                    )}
                    <p className="text-xs font-medium uppercase tracking-wider text-[#c8a55c]">{pkg.subtitle}</p>
                    <h5 className="mt-2 text-lg font-semibold text-white">{pkg.title}</h5>
                    <div className="mt-2 flex flex-wrap items-baseline gap-2">
                      {pkg.priceOriginal && (
                        <span className="text-sm text-white/50 line-through">{pkg.priceOriginal}</span>
                      )}
                      <span className="text-sm font-semibold text-[#c8a55c]">{pkg.price}</span>
                    </div>
                    <ul className="mt-4 flex-1 space-y-2">
                      {pkg.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-sm text-white/70">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#c8a55c]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 shrink-0">
                      <LocaleLink
                        href="/contact"
                        className="inline-flex h-9 items-center justify-center rounded-full bg-[#c8a55c] px-4 text-sm font-medium text-black hover:bg-[#b6944f]"
                      >
                        {copy.requestQuoteForGroup}
                      </LocaleLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
