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
      <div className="grid min-h-0 grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <AnimateIn key={project.title} delay={idx * 60}>
            <button
              type="button"
              onClick={() => {
                if (!project.thumbnail) return;
                const index = images.indexOf(project.thumbnail);
                if (index >= 0) setLightbox({ images, index });
              }}
              className="card card-lift flex w-full flex-col items-center p-8 text-left focus:outline-none focus:ring-2 focus:ring-[#c8a55c] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
            >
              <div className="relative flex h-40 w-full items-center justify-center bg-white/5 rounded-xl">
                {project.thumbnail && (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={200}
                    height={120}
                    className="max-h-32 w-auto object-contain"
                  />
                )}
              </div>
              <h3 className="mt-4 text-center font-medium text-white/95">{project.title}</h3>
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
