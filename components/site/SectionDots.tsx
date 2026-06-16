"use client";

import { useEffect, useRef, useState } from "react";

const LABELS: Record<string, Record<string, string>> = {
  sq: { hero: "Kreu", values: "Vlerat", about: "Rreth nesh", services: "Shërbime", team: "Ekipi", careers: "Karrierë", faq: "FAQ" },
  en: { hero: "Home", values: "Values", about: "About", services: "Services", team: "Team", careers: "Careers", faq: "FAQ" },
  de: { hero: "Start", values: "Werte", about: "Über uns", services: "Leistungen", team: "Team", careers: "Karriere", faq: "FAQ" },
};

type Props = { locale: string };

export default function SectionDots({ locale }: Props) {
  const [sections, setSections] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState("");
  const labels = LABELS[locale] ?? LABELS.en;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("section[id]")) as HTMLElement[];
    if (els.length === 0) return;

    const found = els.map((el) => ({
      id: el.id,
      label: labels[el.id] ?? el.id,
    }));
    setSections(found);
    if (found[0]) setActive(found[0].id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { threshold: 0.35, rootMargin: "-10% 0px -10% 0px" }
    );

    els.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [labels]);

  if (sections.length < 2) return null;

  return (
    <nav
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
      aria-label="Section navigation"
    >
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
          title={s.label}
          aria-label={`Go to ${s.label}`}
          className={`section-dot h-2 w-2 rounded-full bg-gray-300 transition-all hover:bg-[#B89D5E] ${active === s.id ? "active" : ""}`}
        />
      ))}
    </nav>
  );
}
