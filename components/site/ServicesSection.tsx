"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";

type Locale = "sq" | "en" | "de";
type Service = { title: string; desc: string; price?: string };

const GROUP_ICONS = [
  <svg key="0" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  <svg key="3" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
];

type Pkg = { title: string; subtitle: string; price: string; points: string[] };
type PackageGroup = "marketing" | "brand" | "training" | "website" | "maintenance";

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
  packageFilterTabs: { label: string; indices: number[] }[];
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
  testimonial,
  copy,
}: Props) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activePackageTab, setActivePackageTab] = useState<number>(0);
  const [tooltipCard, setTooltipCard] = useState<number | null>(null);

  const PACKAGE_GROUPS: PackageGroup[] = ["marketing", "brand", "training", "website", "maintenance"];
  const packageTabLabels = [copy.allServices, ...packageFilterTabs.map((t) => t.label)];

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
          <div key={boxIdx} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8">
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
                  ? "grid gap-4 sm:grid-cols-1 md:max-w-md"
                  : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {indices.map((i) => {
                const s = services[i];
                const result = resultByIndex[i];
                const anchor = serviceAnchors[i];
                return (
                  <div
                    key={s.title}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c8a55c]/30 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[#c8a55c]/5 md:p-6"
                  >
                    <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#c8a55c]/5 blur-xl transition group-hover:bg-[#c8a55c]/10" />
                    <div className="relative flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {result && (
                          <span className="rounded-full bg-[#c8a55c]/20 px-2.5 py-1 text-[10px] font-medium text-[#c8a55c]">
                            {result}
                          </span>
                        )}
                      </div>
                      <h4 className="mt-3 text-base font-semibold text-white md:text-lg">{s.title}</h4>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{s.desc}</p>

                      {/* Price + tooltip */}
                      <div className="mt-4 border-t border-white/10 pt-3">
                        {s.price ? (
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] uppercase tracking-wider text-white/50">
                              {copy.from}
                            </span>
                            <span className="text-sm font-semibold text-[#c8a55c]">{s.price}</span>
                            <span
                              className="relative flex h-4 w-4 shrink-0 cursor-help items-center justify-center rounded-full border border-white/20 bg-white/5 text-[10px] text-white/50"
                              onMouseEnter={() => setTooltipCard(i)}
                              onMouseLeave={() => setTooltipCard(null)}
                              title={priceTooltip}
                            >
                              ?
                              {tooltipCard === i && (
                                <span className="absolute bottom-full left-1/2 z-10 mb-1 w-48 -translate-x-1/2 rounded-lg border border-white/10 bg-[#2b2b2b] px-2 py-1.5 text-[10px] text-white/80 shadow-xl">
                                  {priceTooltip}
                                </span>
                              )}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] text-white/50">{copy.quoteRequest}</span>
                            <span
                              className="flex h-4 w-4 shrink-0 cursor-help items-center justify-center rounded-full border border-white/20 bg-white/5 text-[10px] text-white/50"
                              title={priceTooltip}
                            >
                              ?
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Më shumë → faqja e shërbimit */}
                      <div className="mt-3">
                        <LocaleLink
                          href={`/services/${anchor}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#c8a55c] transition hover:text-[#d4b86a]"
                        >
                          {copy.more}
                          <span>→</span>
                        </LocaleLink>
                      </div>
                    </div>
                  </div>
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
          {activePackageTab === 0 ? (
            PACKAGE_GROUPS.map((groupKey) => (
              <div key={groupKey}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#c8a55c]/90">
                  {packageFilterTabs[PACKAGE_GROUPS.indexOf(groupKey)].label}
                </h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  {packagesByGroup[groupKey].map((pkg) => (
                    <div
                      key={`${groupKey}-${pkg.title}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#c8a55c]/20 md:p-6"
                    >
                      <p className="text-xs font-medium uppercase tracking-wider text-[#c8a55c]">{pkg.subtitle}</p>
                      <h5 className="mt-2 text-lg font-semibold text-white">{pkg.title}</h5>
                      <p className="mt-2 text-sm font-semibold text-[#c8a55c]">{pkg.price}</p>
                      <ul className="mt-4 space-y-2">
                        {pkg.points.map((point) => (
                          <li key={point} className="flex items-center gap-2 text-sm text-white/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#c8a55c]" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5">
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
            ))
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {packagesByGroup[PACKAGE_GROUPS[activePackageTab - 1]].map((pkg) => (
                <div
                  key={pkg.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#c8a55c]/20 md:p-6"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-[#c8a55c]">{pkg.subtitle}</p>
                  <h5 className="mt-2 text-lg font-semibold text-white">{pkg.title}</h5>
                  <p className="mt-2 text-sm font-semibold text-[#c8a55c]">{pkg.price}</p>
                  <ul className="mt-4 space-y-2">
                    {pkg.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-white/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#c8a55c]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
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
          )}
        </div>
      </div>
    </section>
  );
}
