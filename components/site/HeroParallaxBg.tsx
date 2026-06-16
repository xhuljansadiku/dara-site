"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroParallaxBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.22}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-10 scale-[1.18] will-change-transform"
      aria-hidden
    >
      <Image
        src="/hero-bg-dara.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
