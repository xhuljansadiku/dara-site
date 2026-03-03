"use client";

import Image from "next/image";
import { useState } from "react";
import AnimateIn from "@/components/site/AnimateIn";
import ImageLightbox from "@/components/site/ImageLightbox";

type Props = {
  images: string[];
  projectTitle: string;
};

export default function SocialMediaProjectGallery({ images, projectTitle }: Props) {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <>
      <div className="grid min-h-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, idx) => (
          <AnimateIn key={src} delay={idx * 50}>
            <button
              type="button"
              onClick={() => setLightbox({ images, index: idx })}
              className="card card-lift group relative aspect-[4/3] w-full overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-[white] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
            >
              <Image
                src={src}
                alt={`${projectTitle} - ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain transition duration-300 group-hover:scale-105"
              />
            </button>
          </AnimateIn>
        ))}
      </div>

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          alt={projectTitle}
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
