"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      raf = requestAnimationFrame(animateRing);
    };

    const onEnterLink = () => {
      dot.style.transform += " scale(2.5)";
      ring.style.opacity = "0.5";
      ring.style.transform += " scale(1.6)";
    };

    const onLeaveLink = () => {
      ring.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animateRing);

    const links = document.querySelectorAll("a, button, [role=button]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="custom-cursor h-2 w-2 rounded-full bg-[#B89D5E] transition-transform duration-75"
        aria-hidden
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="custom-cursor h-9 w-9 rounded-full border border-[#B89D5E]/60 transition-opacity duration-200"
        aria-hidden
      />
    </>
  );
}
