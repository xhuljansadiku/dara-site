"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import ImageLightbox from "@/components/site/ImageLightbox";
import ProjectCard from "@/components/site/ProjectCard";
import SocialMediaWorkGallery from "@/components/site/SocialMediaWorkGallery";
import { PROJECTS_BY_LOCALE, SOCIAL_MEDIA_GALLERY_IMAGES, WORK_FILTER_TABS_BY_LOCALE } from "@/lib/projects";
import type { ProjectCategory } from "@/lib/projects";

const HOME_PROJECTS_LIMIT = 6;
const HOME_SM_IMAGE_PREVIEW = 6;

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

  const projectsForCards = projects.filter((p) => {
    if (p.category === "social-media") return false;
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });
  const displayCardProjects = projectsForCards.slice(
    0,
    activeFilter === "all" ? 4 : HOME_PROJECTS_LIMIT
  );
  const hasMore = projectsForCards.length > (activeFilter === "all" ? 4 : HOME_PROJECTS_LIMIT);

  const showSmGallery = activeFilter === "all" || activeFilter === "social-media";
  const smGalleryImages =
    activeFilter === "social-media"
      ? SOCIAL_MEDIA_GALLERY_IMAGES
      : SOCIAL_MEDIA_GALLERY_IMAGES.slice(0, HOME_SM_IMAGE_PREVIEW);

  const kicker =
    locale === "sq" ? "Disa projekte" : locale === "de" ? "Ausgewählte Projekte" : "Previous projects";
  const viewAll =
    locale === "sq"
      ? "Shiko të gjitha projektet"
      : locale === "de"
        ? "Alle Projekte ansehen"
        : "View all projects";
  const intro =
    locale === "sq"
      ? "Projekte të ndryshme nga strategji dhe social media deri te brand dhe trajnime."
      : locale === "de"
        ? "Verschiedene Projekte von Strategie und Social Media bis Brand und Schulungen."
        : "From strategy and social media to brand and training. A selection of what we deliver.";

  return (
    <section id="work" className="relative overflow-hidden py-14 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_50%,#fafafa_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.38] [mask-image:linear-gradient(180deg,white,transparent)]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div className="min-w-0 w-full sm:flex-1">
            <span className="inline-flex items-center justify-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500 sm:justify-start">
              <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
              {kicker}
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
              {locale === "sq" && (
                <>
                  Puna jonë{" "}
                  <span className="bg-gradient-to-r from-[#B89D5E] to-[#6b5a38] bg-clip-text text-transparent">
                    e zgjedhur
                  </span>
                </>
              )}
              {locale === "en" && (
                <>
                  Our{" "}
                  <span className="bg-gradient-to-r from-[#B89D5E] to-[#6b5a38] bg-clip-text text-transparent">
                    work
                  </span>
                </>
              )}
              {locale === "de" && (
                <>
                  Unsere{" "}
                  <span className="bg-gradient-to-r from-[#B89D5E] to-[#6b5a38] bg-clip-text text-transparent">
                    Arbeiten
                  </span>
                </>
              )}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-[15px] leading-relaxed text-neutral-600 sm:mx-0 sm:max-w-none">{intro}</p>
          </div>
          <LocaleLink
            href="/work"
            className="group inline-flex h-11 w-full max-w-xs shrink-0 items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white px-5 text-sm font-semibold text-neutral-950 shadow-sm ring-1 ring-black/[0.04] transition hover:border-[#B89D5E]/50 hover:bg-[#B89D5E]/10/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 sm:w-auto sm:max-w-none"
          >
            {viewAll}
            <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
          </LocaleLink>
        </div>

        <div className="mt-8 w-full overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-full justify-center sm:justify-start">
          <div
            className="inline-flex min-w-min flex-wrap gap-0 rounded-2xl bg-neutral-200/60 p-1.5 ring-1 ring-black/[0.04] backdrop-blur-sm"
            role="tablist"
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeFilter === tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`whitespace-nowrap rounded-[0.65rem] px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeFilter === tab.key
                    ? "bg-white text-neutral-950 shadow-sm ring-1 ring-black/[0.06]"
                    : "text-neutral-600 hover:text-neutral-950"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          </div>
        </div>

      {showSmGallery && (
        <div className="mt-10">
          <SocialMediaWorkGallery
            images={smGalleryImages}
            onOpenImage={(index) =>
              setLightbox({ images: SOCIAL_MEDIA_GALLERY_IMAGES, index })
            }
          />
        </div>
      )}

      {displayCardProjects.length > 0 && (
        <div className="mt-10 grid min-h-0 grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {displayCardProjects.map((p) => (
            <ProjectCard key={p.title} project={p} locale={locale} setLightbox={setLightbox} />
          ))}
        </div>
      )}

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
        <div className="mt-10 text-center">
          <LocaleLink
            href="/work"
            className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-8 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition hover:bg-neutral-800"
          >
            {locale === "sq" ? "Shiko më shumë" : locale === "de" ? "Mehr anzeigen" : "View more"}
          </LocaleLink>
        </div>
      )}
      </div>
    </section>
  );
}
