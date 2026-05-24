"use client";

import Image from "next/image";
import { useState } from "react";
import AnimateIn from "@/components/site/AnimateIn";
import ImageLightbox from "@/components/site/ImageLightbox";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
};

export default function BrandProjectGallery({ projects }: Props) {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const images = projects.map((p) => p.thumbnail).filter((src): src is string => !!src);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <AnimateIn key={project.title} delay={idx * 60}>
            <button
              type="button"
              onClick={() => {
                if (!project.thumbnail) return;
                const index = images.indexOf(project.thumbnail);
                if (index >= 0) setLightbox({ images, index });
              }}
              className="group flex w-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.14)] focus:outline-none"
            >
              {/* Logo area */}
              <div className="relative flex aspect-video w-full items-center justify-center bg-stone-50 transition duration-300 group-hover:bg-stone-100/80">
                <div className="absolute inset-0 rounded-t-2xl bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(184,157,94,0.07),transparent)]" />
                {project.thumbnail && (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={220}
                    height={130}
                    className="relative max-h-28 w-auto object-contain transition duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Info row */}
              <div className="flex items-center justify-between px-4 py-3.5">
                <div className="min-w-0 text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b5a38]">
                    Brand Identity
                  </p>
                  <h3 className="mt-0.5 truncate text-base font-semibold tracking-tight text-neutral-950">
                    {project.title}
                  </h3>
                </div>
                <span className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-sm text-white transition duration-300 group-hover:bg-[#B89D5E]">
                  ↗
                </span>
              </div>

              {/* Bottom label */}
              <div className="border-t border-neutral-100 px-4 py-2.5 text-left">
                <span className="text-xs font-medium text-neutral-400 transition group-hover:text-[#B89D5E]">
                  Shiko logon
                </span>
              </div>
            </button>
          </AnimateIn>
        ))}
      </div>

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          alt="Brand"
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
    </>
  );
}
