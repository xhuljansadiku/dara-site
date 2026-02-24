"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import ImageLightbox from "@/components/site/ImageLightbox";
import ProjectCard from "@/components/site/ProjectCard";
import type { Project, ProjectCategory } from "@/lib/projects";
import type { FilterTab } from "@/lib/projects";

type Props = {
  locale: "sq" | "en" | "de";
  projects: Project[];
  filterTabs: FilterTab[];
};

export default function WorkContent({ locale, projects, filterTabs }: Props) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const ctaLabels =
    locale === "sq"
      ? { title: "Le të punojmë së bashku dhe të krijojmë", accent: "diçka të madhe", desc: "Na thuaj objektivin dhe ne do të kthehemi me një plan të qartë.", contact: "Na kontakto", backHome: "Kthehu në fillim" }
      : locale === "de"
      ? { title: "Lass uns zusammenarbeiten und etwas", accent: "Großartiges schaffen", desc: "Erzähl uns dein Ziel und wir kommen mit einem klaren Plan zurück.", contact: "Kontaktiere uns", backHome: "Zurück zur Startseite" }
      : { title: "Let's work together and create", accent: "something great", desc: "Tell us your goal and we'll return with a clear plan.", contact: "Contact us", backHome: "Back to Home" };

  return (
    <>
      {/* HEADER SECTION - Same as HomeWorkSection */}
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
        </div>

        {/* FILTER TABS */}
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

        {/* GRID WITH THUMBNAILS */}
        <div className="mt-10 grid min-h-0 grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
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
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-6 md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            {ctaLabels.title} <span className="text-[#c8a55c]">{ctaLabels.accent}</span>.
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">{ctaLabels.desc}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink href="/contact" className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#c8a55c] px-5 font-medium text-black hover:bg-[#b6944f] sm:w-auto">
              {ctaLabels.contact}
            </LocaleLink>
            <LocaleLink href="/" className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto">
              {ctaLabels.backHome}
            </LocaleLink>
          </div>
        </div>
      </section>
      <div className="h-8" />
    </>
  );
}
