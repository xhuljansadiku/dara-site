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
  const cardClass =
    "group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] transition hover:border-[#c8a55c]/25 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(200,165,92,0.06)]";

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

  const imageSection = (
    <div
      className={`relative aspect-[4/3] overflow-hidden bg-white/5 ${isImageGallery ? "cursor-pointer" : ""}`}
      onClick={isImageGallery ? openLightbox : undefined}
      role={isImageGallery ? "button" : undefined}
      tabIndex={isImageGallery ? 0 : undefined}
      onKeyDown={
        isImageGallery
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(e as unknown as React.MouseEvent);
              }
            }
          : undefined
      }
    >
      <Image
        src={p.thumbnail ?? THUMBNAIL_FALLBACK}
        alt={p.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={
          isImageGallery
            ? "object-contain transition duration-300 group-hover:scale-105"
            : "object-cover transition duration-300 group-hover:scale-105"
        }
      />
    </div>
  );

  const cardContent = (
    <>
      {imageSection}
      <div className="p-5">
        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60">
          {p.tag}
        </span>
        <h3 className="mt-3 font-medium text-white/95 group-hover:text-[#c8a55c]/90">{p.title}</h3>
        <p className="mt-2 text-sm text-white/60 line-clamp-2">{p.desc}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#c8a55c]/80 group-hover:text-[#c8a55c]">
          {viewLabel}
          <span className="transition group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </>
  );

  if (p.category === "website" && p.websiteUrl) {
    return (
      <a href={p.websiteUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {cardContent}
      </a>
    );
  }
  if (p.category === "brand") {
    return (
      <LocaleLink href="/work/brand" className={cardClass}>
        {cardContent}
      </LocaleLink>
    );
  }
  if (p.category === "social-media" && p.slug) {
    return (
      <LocaleLink href={`/work/social-media/${p.slug}`} className={cardClass}>
        {cardContent}
      </LocaleLink>
    );
  }
  return (
    <LocaleLink href="/work" className={cardClass}>
      {cardContent}
    </LocaleLink>
  );
}
