"use client";

import Image from "next/image";
import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import type { Project, ProjectCategory } from "@/lib/projects";
import type { FilterTab } from "@/lib/projects";

const THUMBNAIL_FALLBACK = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop";

type Props = {
  locale: "sq" | "en" | "de";
  projects: Project[];
  filterTabs: FilterTab[];
};

export default function WorkContent({ locale, projects, filterTabs }: Props) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");

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
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
            <LocaleLink
              key={p.title}
              href="/work"
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] transition hover:border-[#c8a55c]/25 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(200,165,92,0.06)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                <Image
                  src={p.thumbnail ?? THUMBNAIL_FALLBACK}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
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
              </div>
            </LocaleLink>
          ))}
        </div>
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
