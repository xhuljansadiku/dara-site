"use client";

import Image from "next/image";

type Props = {
  images: string[];
  onOpenImage: (index: number) => void;
};

/** Grid of portfolio images only (no titles, links, or tags). */
export default function SocialMediaWorkGallery({ images, onOpenImage }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, index) => (
        <button
          key={src}
          type="button"
          onClick={() => onOpenImage(index)}
          className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-100 ring-1 ring-black/[0.04] transition hover:border-[#B89D5E]/35 hover:shadow-lg hover:shadow-[#B89D5E]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B89D5E]"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </button>
      ))}
    </div>
  );
}
