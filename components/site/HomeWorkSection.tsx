"use client";

import { useState } from "react";
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import ImageLightbox from "@/components/site/ImageLightbox";
import WebsiteMarquee from "@/components/site/WebsiteMarquee";
import {
  PROJECTS_BY_LOCALE,
  SOCIAL_MEDIA_BOARDS,
  SOCIAL_MEDIA_GALLERY_IMAGES,
  WORK_FILTER_TABS_BY_LOCALE,
  WORK_INTRO_BY_LOCALE,
} from "@/lib/projects";
import { PROJECTS_DELIVERED } from "@/lib/business-facts";

const HALF = Math.ceil(SOCIAL_MEDIA_BOARDS.length / 2);
const ROWS = [SOCIAL_MEDIA_BOARDS.slice(0, HALF), SOCIAL_MEDIA_BOARDS.slice(HALF)];

type Props = {
  locale: "sq" | "en" | "de";
};

/** Two rows of social media mockups drifting in opposite directions (paused on hover), then a row of the live websites. */
export default function HomeWorkSection({ locale }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const websites = PROJECTS_BY_LOCALE[locale].filter((p) => p.category === "website" && p.websiteUrl);
  const websiteLabel = WORK_FILTER_TABS_BY_LOCALE[locale].find((t) => t.key === "website")?.label ?? "Website";
  const total = SOCIAL_MEDIA_GALLERY_IMAGES.length;

  const kicker =
    locale === "sq" ? "Disa projekte" : locale === "de" ? "Ausgewählte Projekte" : "Previous projects";
  const [titleStart, titleAccent] =
    locale === "sq" ? ["Puna jonë", "e zgjedhur"] : locale === "de" ? ["Unsere", "Arbeiten"] : ["Our", "work"];
  const viewAll =
    locale === "sq"
      ? "Shiko të gjitha projektet"
      : locale === "de"
        ? "Alle Projekte ansehen"
        : "View all projects";
  const intro = WORK_INTRO_BY_LOCALE[locale];
  const projectsWord =
    locale === "sq" ? "projekte të realizuara" : locale === "de" ? "realisierte Projekte" : "projects delivered";

  return (
    <section id="work" className="overflow-hidden bg-neutral-950 py-16 text-white md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">
          <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
          {kicker}
        </span>
        <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-7xl">
          {titleStart} <span className="text-[#d1b780]">{titleAccent}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/65">{intro}</p>
      </div>

      <div className="mt-12 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] md:space-y-5">
        {ROWS.map((row, r) => (
          <div key={r} className="work-marquee-row">
            {/* Two copies plus a trailing gap, so shifting by -50% loops without a jump. */}
            <div className={`work-marquee flex w-max gap-4 pr-4 md:gap-5 md:pr-5 ${r % 2 ? "work-marquee-reverse" : ""}`}>
              {[0, 1].map((copy) =>
                row.map((board) => (
                  <button
                    key={`${copy}-${board.img}`}
                    type="button"
                    onClick={() => setLightboxIndex(Math.max(0, SOCIAL_MEDIA_GALLERY_IMAGES.indexOf(board.img)))}
                    aria-hidden={copy === 1 || undefined}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="group relative aspect-video w-[17rem] shrink-0 overflow-hidden rounded-xl bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B89D5E] md:w-[24rem]"
                  >
                    <Image
                      src={board.img}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 17rem, 24rem"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-8 text-left text-sm font-semibold transition group-hover:translate-y-0 group-focus-visible:translate-y-0">
                      {board.name}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {websites.length > 0 && (
        <div className="mt-14 md:mt-16">
          <p className="px-4 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">{websiteLabel}</p>
          <div className="mt-6">
            <WebsiteMarquee sites={websites} />
          </div>
        </div>
      )}

      <div className="mt-14 flex flex-col items-center gap-4 px-4 sm:flex-row sm:justify-center md:mt-20">
        <LocaleLink
          href="/work"
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#B89D5E] px-7 text-sm font-semibold text-neutral-950 transition hover:bg-[#d4bd85]"
        >
          {viewAll}
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </LocaleLink>
        <span className="text-sm text-white/50">
          {PROJECTS_DELIVERED} {projectsWord}
        </span>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={SOCIAL_MEDIA_GALLERY_IMAGES}
          currentIndex={lightboxIndex}
          alt="Project"
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i === null ? null : (i - 1 + total) % total))}
          onNext={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % total))}
        />
      )}
    </section>
  );
}
