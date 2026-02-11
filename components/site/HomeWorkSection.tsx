"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import { PROJECTS_BY_LOCALE, WORK_FILTER_TABS_BY_LOCALE } from "@/lib/projects";
import type { ProjectCategory } from "@/lib/projects";

type Props = {
  locale: "sq" | "en" | "de";
};

export default function HomeWorkSection({ locale }: Props) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");
  const projects = PROJECTS_BY_LOCALE[locale];
  const filterTabs = WORK_FILTER_TABS_BY_LOCALE[locale];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="py-12 md:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">
            {locale === "sq" ? "Disa projekte" : locale === "de" ? "Ausgewählte Projekte" : "Previous projects"}
          </p>
          <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
            {locale === "sq" && (
              <>
                Puna jonë <span className="text-[#c8a55c]">e zgjedhur</span>
              </>
            )}
            {locale === "en" && (
              <>
                Our <span className="text-[#c8a55c]">work</span>
              </>
            )}
            {locale === "de" && (
              <>
                Unsere <span className="text-[#c8a55c]">Arbeiten</span>
              </>
            )}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/70">
            {locale === "sq"
              ? "Projekte të ndryshme nga strategji dhe social media deri te brand dhe trajnime."
              : locale === "de"
              ? "Verschiedene Projekte von Strategie und Social Media bis Brand und Schulungen."
              : "From strategy and social media to brand and training — a selection of what we deliver."}
          </p>
        </div>
        <LocaleLink
          href="/work"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[#c8a55c] transition hover:text-[#d4b86a]"
        >
          {locale === "sq"
            ? "Shiko të gjitha projektet"
            : locale === "de"
            ? "Alle Projekte ansehen"
            : "View all projects"}
          <span aria-hidden>→</span>
        </LocaleLink>
      </div>

      {/* Filter tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveFilter(tab.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeFilter === tab.key
                ? "bg-[#c8a55c] text-black"
                : "border border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:bg-white/5 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((p) => (
          <LocaleLink
            key={p.title}
            href="/work"
            className="group block rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition hover:border-[#c8a55c]/25 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(200,165,92,0.06)]"
          >
            <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60">
              {p.tag}
            </span>
            <h3 className="mt-3 font-medium text-white/95 group-hover:text-[#c8a55c]/90">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-white/60 line-clamp-2">{p.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#c8a55c]/80 group-hover:text-[#c8a55c]">
              {locale === "sq" ? "Shiko projektin" : locale === "de" ? "Projekt ansehen" : "View project"}
              <span className="transition group-hover:translate-x-0.5">→</span>
            </span>
          </LocaleLink>
        ))}
      </div>
    </section>
  );
}
