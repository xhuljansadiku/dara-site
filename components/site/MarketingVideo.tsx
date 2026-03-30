"use client";

import { getMediaUrl } from "@/lib/media";

type MarketingVideoProps = {
  src: string;
  className?: string;
};

export default function MarketingVideo({ src, className }: MarketingVideoProps) {
  return (
    <video
      src={getMediaUrl(src)}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className={className}
    />
  );
}
