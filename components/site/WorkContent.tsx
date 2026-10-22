"use client";

import { useState } from "react";
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import ImageLightbox from "@/components/site/ImageLightbox";
import WebsiteMarquee from "@/components/site/WebsiteMarquee";
import { SOCIAL_MEDIA_BOARDS, WORK_INTRO_BY_LOCALE } from "@/lib/projects";
import type { FilterTab, Project, ProjectCategory } from "@/lib/projects";
import { PROJECTS_DELIVERED } from "@/lib/business-facts";

type Props = {
  locale: "sq" | "en" | "de";
  projects: Project[];
  filterTabs: FilterTab[];
};

const BOARD_IMAGES = SOCIAL_MEDIA_BOARDS.map((b) => b.img);

function GroupHeader({ id, title, count, note, tone = "light" }: { id: string; title: string; count: number; note?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={`flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-end sm:justify-between ${dark ? "border-white/10" : "border-gray-200"}`}>
      <h2 id={id} className={`font-display text-3xl font-bold uppercase tracking-tight md:text-4xl ${dark ? "text-white" : "text-gray-900"}`}>
        {title}
        <span className={`ml-3 align-super text-sm font-semibold tabular-nums ${dark ? "text-[#d1b780]" : "text-[#6b5a38]"}`}>{count}</span>
      </h2>
      {note && <p className={`text-sm ${dark ? "text-white/55" : "text-gray-500"}`}>{note}</p>}
    </div>
  );
}

export default function WorkContent({ locale, projects, filterTabs }: Props) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const websites = projects.filter((p) => p.category === "website" && p.websiteUrl);
  const counts: Partial<Record<ProjectCategory, number>> = {
    "social-media": SOCIAL_MEDIA_BOARDS.length,
    website: websites.length,
  };
  const label = (key: ProjectCategory) => filterTabs.find((t) => t.key === key)?.label ?? key;
  const shows = (key: ProjectCategory) => activeFilter === "all" || activeFilter === key;
  const total = BOARD_IMAGES.length;

  const copy =
    locale === "sq"
      ? {
          kicker: "Portfolio",
          titleStart: "Puna jonë",
          titleAccent: "e zgjedhur",
          filters: "Filtro projektet",
          projectsWord: "projekte të realizuara",
          view: "Shiko",
          websiteNote: "Faqe live që mund t'i hapni direkt.",
        }
      : locale === "de"
        ? {
            kicker: "Portfolio",
            titleStart: "Unsere",
            titleAccent: "Arbeiten",
            filters: "Projekte filtern",
            projectsWord: "realisierte Projekte",
            view: "Ansehen",
            websiteNote: "Live-Websites, die Sie direkt öffnen können.",
          }
        : {
            kicker: "Portfolio",
            titleStart: "Our",
            titleAccent: "work",
            filters: "Filter projects",
            projectsWord: "projects delivered",
            view: "View",
            websiteNote: "Live sites you can open right now.",
          };

  const ctaLabels =
    locale === "sq"
      ? { title: "Le të punojmë së bashku dhe të krijojmë", accent: "diçka të madhe", desc: "Na thuaj objektivin dhe ne do të kthehemi me një plan të qartë.", contact: "Na kontakto", backHome: "Kthehu në fillim" }
      : locale === "de"
      ? { title: "Lass uns zusammenarbeiten und etwas", accent: "Großartiges schaffen", desc: "Erzähl uns dein Ziel und wir kommen mit einem klaren Plan zurück.", contact: "Kontaktiere uns", backHome: "Zurück zur Startseite" }
      : { title: "Let's work together and create", accent: "something great", desc: "Tell us your goal and we'll return with a clear plan.", contact: "Contact us", backHome: "Back to Home" };

  return (
    <>
      {/* HEADER + FILTERS */}
      <section id="work" className="pb-10 pt-10 md:pb-14 md:pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
              {copy.kicker}
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-gray-900 md:text-7xl">
              {copy.titleStart} <span className="text-[#B89D5E]">{copy.titleAccent}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">{WORK_INTRO_BY_LOCALE[locale]}</p>
            <p className="mt-4 text-sm font-semibold text-[#6b5a38]">
              {PROJECTS_DELIVERED} {copy.projectsWord}
            </p>
          </div>

          <div role="group" aria-label={copy.filters} className="mt-10 flex flex-wrap justify-center gap-2">
            {filterTabs.map((tab) => {
              const on = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`inline-flex h-11 items-center gap-2 rounded-xl border px-5 text-sm font-medium transition ${
                    on ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                  {tab.key !== "all" && counts[tab.key] !== undefined && (
                    <span className={`text-xs tabular-nums ${on ? "text-[#d1b780]" : "text-gray-400"}`}>{counts[tab.key]}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 md:space-y-24 md:px-8">
        {/* SOCIAL MEDIA: every mockup with its client name, opens in the lightbox */}
        {shows("social-media") && (
          <section aria-labelledby="work-social">
            <GroupHeader
              id="work-social"
              title={label("social-media")}
              count={SOCIAL_MEDIA_BOARDS.length}
              note={projects.find((p) => p.category === "social-media")?.desc}
            />
            <ul className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {SOCIAL_MEDIA_BOARDS.map((board, i) => (
                <li key={board.img}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="group block w-full rounded-2xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B89D5E]"
                  >
                    <span className="relative block aspect-video overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-black/5 transition group-hover:ring-[#B89D5E]/60">
                      <Image
                        src={board.img}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="mt-3 flex items-center justify-between gap-3">
                      <span className="truncate font-semibold text-gray-900">{board.name}</span>
                      <span className="shrink-0 text-xs font-medium text-gray-400 transition group-hover:text-[#6b5a38]" aria-hidden>
                        {copy.view} →
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* WEBSITE: the same moving row as on the homepage, on a dark panel */}
        {shows("website") && websites.length > 0 && (
          <section aria-labelledby="work-web" className="overflow-hidden rounded-[2rem] bg-neutral-950 py-10 text-white md:py-14">
            <div className="px-4 sm:px-6 md:px-8">
              <GroupHeader id="work-web" title={label("website")} count={websites.length} note={copy.websiteNote} tone="dark" />
            </div>
            <div className="mt-10">
              <WebsiteMarquee sites={websites} />
            </div>
          </section>
        )}

      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={BOARD_IMAGES}
          currentIndex={lightboxIndex}
          alt="Project"
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i === null ? null : (i - 1 + total) % total))}
          onNext={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % total))}
        />
      )}

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-neutral-950 px-6 py-12 text-center text-white md:px-12 md:py-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#B89D5E]/20 blur-3xl" aria-hidden />
            <h2 className="relative mx-auto max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl">
              {ctaLabels.title} <span className="text-[#d1b780]">{ctaLabels.accent}</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-white/65">{ctaLabels.desc}</p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LocaleLink
                href="/contact"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#B89D5E] px-8 text-sm font-semibold text-neutral-950 transition hover:bg-[#d4bd85] sm:w-auto"
              >
                {ctaLabels.contact}
                <span aria-hidden className="transition group-hover:translate-x-0.5">
                  →
                </span>
              </LocaleLink>
              <LocaleLink
                href="/"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition hover:border-white/50 sm:w-auto"
              >
                {ctaLabels.backHome}
              </LocaleLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
