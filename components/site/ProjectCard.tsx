"use client";

import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import type { Project } from "@/lib/projects";

const THUMBNAIL_FALLBACK = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop";

type Props = {
  project: Project;
  locale: "sq" | "en" | "de";
  setLightbox: (v: { images: string[]; index: number } | null) => void;
};

export default function ProjectCard({ project: p, locale, setLightbox }: Props) {
  const viewLabel = locale === "sq" ? "Shiko projektin" : locale === "de" ? "Projekt ansehen" : "View project";
  const visitLabel = locale === "sq" ? "Vizito faqen" : locale === "de" ? "Website besuchen" : "Visit site";

  const cardClass =
    "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_4px_24px_-16px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-[#B89D5E]/40 hover:shadow-[0_24px_48px_-24px_rgba(184,157,94,0.12)]";

  const isImageGallery = p.category === "social-media" || p.category === "brand";
  const galleryImages =
    p.category === "social-media" && p.images?.length ? p.images : p.thumbnail ? [p.thumbnail] : [];
  const thumbnailIndex =
    p.images?.length && p.thumbnail ? Math.max(0, p.images.indexOf(p.thumbnail)) : 0;

  const openLightbox = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (galleryImages.length) setLightbox({ images: galleryImages, index: thumbnailIndex });
  };

  // ── Website card ─────────────────────────────────────────────────────────
  if (p.category === "website" && p.websiteUrl) {
    const displayUrl = p.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return (
      <a
        href={p.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.14)]"
      >
        {/* Browser chrome */}
        <div className="flex shrink-0 items-center gap-1.5 border-b border-neutral-100 bg-neutral-50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <div className="ml-2 flex flex-1 items-center gap-1.5 overflow-hidden rounded-md bg-neutral-200/70 px-2.5 py-[5px]">
            <svg className="h-2.5 w-2.5 shrink-0 text-neutral-400" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8zm5 .5a3 3 0 106 0 3 3 0 00-6 0z" clipRule="evenodd" />
            </svg>
            <span className="truncate text-[10px] leading-none text-neutral-500">{displayUrl}</span>
          </div>
        </div>

        {/* Screenshot */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={p.thumbnail ?? THUMBNAIL_FALLBACK}
            alt={p.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Info row */}
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b5a38]">
              {p.tag}
            </p>
            <h3 className="mt-0.5 truncate text-base font-semibold tracking-tight text-neutral-950">
              {p.title}
            </h3>
          </div>
          <span className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-sm text-white transition duration-300 group-hover:bg-[#B89D5E]">
            ↗
          </span>
        </div>

        {/* Visit label */}
        <div className="border-t border-neutral-100 px-4 py-2.5">
          <span className="text-xs font-medium text-neutral-400 transition group-hover:text-[#B89D5E]">
            {visitLabel}
          </span>
        </div>
      </a>
    );
  }

  // ── Brand card ────────────────────────────────────────────────────────────
  if (p.category === "brand") {
    return (
      <LocaleLink
        href="/work/brand"
        className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.14)]"
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-stone-50">
          <Image
            src={p.thumbnail ?? THUMBNAIL_FALLBACK}
            alt={p.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Info row */}
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b5a38]">
              {p.tag}
            </p>
            <h3 className="mt-0.5 truncate text-base font-semibold tracking-tight text-neutral-950">
              {p.title}
            </h3>
          </div>
          <span className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-sm text-white transition duration-300 group-hover:bg-[#B89D5E]">
            →
          </span>
        </div>

        {/* Bottom label */}
        <div className="border-t border-neutral-100 px-4 py-2.5">
          <span className="text-xs font-medium text-neutral-400 transition group-hover:text-[#B89D5E]">
            {viewLabel}
          </span>
        </div>
      </LocaleLink>
    );
  }

  // ── Social Media card (Instagram-style post) ─────────────────────────────
  const viewAllLabel =
    locale === "sq" ? "Shiko të gjitha postimet" : locale === "de" ? "Alle Beiträge ansehen" : "View all posts";

  return (
    <button
      type="button"
      onClick={openLightbox}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white text-left shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.14)]"
    >
      {/* Post header */}
      <div className="flex items-center gap-2.5 px-3.5 py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#B89D5E] to-[#6b5a38]">
          <span className="text-[11px] font-bold text-white">D</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold leading-none text-neutral-950">dara.agency</p>
          <p className="mt-0.5 text-[11px] text-neutral-400">Tiranë, Albania</p>
        </div>
        <svg className="h-5 w-5 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
        </svg>
      </div>

      {/* Square image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={p.thumbnail ?? THUMBNAIL_FALLBACK}
          alt={p.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Actions row */}
      <div className="px-3.5 pt-3">
        <div className="flex items-center gap-3.5">
          {/* Heart */}
          <svg className="h-6 w-6 text-neutral-800 transition group-hover:text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {/* Comment */}
          <svg className="h-6 w-6 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {/* Share */}
          <svg className="h-6 w-6 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          {/* Bookmark */}
          <svg className="ml-auto h-6 w-6 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        <p className="mt-2.5 text-[13px] font-semibold text-neutral-950">1,248 likes</p>
        <p className="mt-0.5 text-[13px] leading-snug text-neutral-700">
          <span className="font-semibold">dara.agency</span>{" "}
          <span className="text-neutral-500">{p.desc}</span>
        </p>
      </div>

      {/* View all */}
      <div className="mt-3 border-t border-neutral-100 px-3.5 py-2.5">
        <span className="text-xs font-medium text-neutral-400 transition group-hover:text-[#B89D5E]">
          {viewAllLabel} →
        </span>
      </div>
    </button>
  );
}
