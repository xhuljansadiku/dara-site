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
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-0.5";

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
      className={`relative aspect-[4/3] overflow-hidden ${isImageGallery ? "cursor-pointer" : ""}`}
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
            ? "object-contain transition duration-500 group-hover:scale-110"
            : "object-cover transition duration-500 group-hover:scale-110"
        }
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
      {/* Tag on image */}
      <span className="absolute left-4 top-4 rounded-lg bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-900 shadow-sm border border-gray-200">
        {p.tag}
      </span>
    </div>
  );

  const cardContent = (
    <>
      {imageSection}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-2">{p.desc}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:text-[#1e222a]">
          <span>{viewLabel}</span>
          <span className="transition group-hover:translate-x-1">→</span>
        </div>
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
