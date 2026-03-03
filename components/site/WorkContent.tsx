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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
              {locale === "sq" ? "Disa projekte" : locale === "de" ? "Ausgewählte Projekte" : "Previous projects"}
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              {locale === "sq" && (
                <>
                  Puna jonë <span className="text-gray-900">e zgjedhur</span>
                </>
              )}
              {locale === "en" && (
                <>
                  Our <span className="text-gray-900">work</span>
                </>
              )}
              {locale === "de" && (
                <>
                  Unsere <span className="text-gray-900">Arbeiten</span>
                </>
              )}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-gray-600">
              {locale === "sq"
                ? "Projekte të ndryshme nga strategji dhe social media deri te brand dhe trajnime."
                : locale === "de"
                ? "Verschiedene Projekte von Strategie und Social Media bis Brand und Schulungen."
                : "From strategy and social media to brand and training. A selection of what we deliver."}
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
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GRID WITH THUMBNAILS */}
        <div className="mt-10 grid min-h-0 grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl text-gray-900">
            {ctaLabels.title} <span className="text-gray-900">{ctaLabels.accent}</span>.
          </h2>
          <p className="mt-2 max-w-2xl text-gray-600">{ctaLabels.desc}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink href="/contact" className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gray-900 px-5 font-medium text-white hover:bg-gray-800 sm:w-auto">
              {ctaLabels.contact}
            </LocaleLink>
            <LocaleLink href="/" className="inline-flex h-11 w-full items-center justify-center rounded-xl border-2 border-gray-300 px-5 font-medium text-gray-900 hover:border-gray-900 hover:bg-gray-50 sm:w-auto">
              {ctaLabels.backHome}
            </LocaleLink>
          </div>
        </div>
        </div>
      </section>
      <div className="h-8" />
    </>
  );
}
