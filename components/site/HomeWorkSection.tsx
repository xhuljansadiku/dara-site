"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import ImageLightbox from "@/components/site/ImageLightbox";
import ProjectCard from "@/components/site/ProjectCard";
import { PROJECTS_BY_LOCALE, WORK_FILTER_TABS_BY_LOCALE } from "@/lib/projects";
import type { ProjectCategory } from "@/lib/projects";

const HOME_PROJECTS_LIMIT = 6;
const THUMBNAIL_FALLBACK = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop";

type Props = {
  locale: "sq" | "en" | "de";
};

export default function HomeWorkSection({ locale }: Props) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const projects = PROJECTS_BY_LOCALE[locale];
  const filterTabs = WORK_FILTER_TABS_BY_LOCALE[locale];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const displayProjects = filteredProjects.slice(0, HOME_PROJECTS_LIMIT);
  const hasMore = filteredProjects.length > HOME_PROJECTS_LIMIT;

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
              : "From strategy and social media to brand and training. A selection of what we deliver."}
          </p>
        </div>
        <LocaleLink
          href="/work"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[#c8a55c] transition hover:text-[#d4b86a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a55c] focus-visible:rounded"
        >
          {locale === "sq"
            ? "Shiko të gjitha projektet"
            : locale === "de"
            ? "Alle Projekte ansehen"
            : "View all projects"}
          <span aria-hidden>→</span>
        </LocaleLink>
      </div>

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

      <div className="mt-10 grid min-h-0 grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayProjects.map((p) => (
          <ProjectCard key={p.title} project={p} locale={locale} setLightbox={setLightbox} />
        ))}
      </div>

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          alt="Project"
          onClose={() => setLightbox(null)}
          onPrev={() =>
            setLightbox((prev) =>
              prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null
            )
          }
          onNext={() =>
            setLightbox((prev) =>
              prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null
            )
          }
        />
      )}
      {hasMore && (
        <div className="mt-8 text-center">
          <LocaleLink
            href="/work"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-medium text-white/80 transition hover:border-[#c8a55c]/50 hover:text-[#c8a55c]"
          >
            {locale === "sq" ? "Shiko më shumë" : locale === "de" ? "Mehr anzeigen" : "View more"}
          </LocaleLink>
        </div>
      )}
    </section>
  );
}
