"use client";

import { useEffect, useRef, useState } from "react";

/** Only sections listed here get a dot; other ids on the page are ignored. */
const LABELS: Record<string, Record<string, string>> = {
  sq: { hero: "Kreu", values: "Si punojmë", services: "Shërbime", work: "Projektet", reviews: "Review", about: "Rreth nesh", trainings: "Trajnime", team: "Ekipi", faq: "FAQ", "contact-cta": "Kontakt" },
  en: { hero: "Home", values: "How we work", services: "Services", work: "Projects", reviews: "Reviews", about: "About", trainings: "Training", team: "Team", faq: "FAQ", "contact-cta": "Contact" },
  de: { hero: "Start", values: "Arbeitsweise", services: "Leistungen", work: "Referenzen", reviews: "Bewertungen", about: "Über uns", trainings: "Training", team: "Team", faq: "FAQ", "contact-cta": "Kontakt" },
};
const NAV_LABEL: Record<string, { nav: string; goTo: string }> = {
  sq: { nav: "Seksionet e faqes", goTo: "Shko te" },
  en: { nav: "Page sections", goTo: "Go to" },
  de: { nav: "Seitenabschnitte", goTo: "Gehe zu" },
};

type Props = { locale: string };

export default function SectionDots({ locale }: Props) {
  const [sections, setSections] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState("");
  const labels = LABELS[locale] ?? LABELS.en;
  const navLabel = NAV_LABEL[locale] ?? NAV_LABEL.en;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const els = (Array.from(document.querySelectorAll("section[id]")) as HTMLElement[]).filter((el) => labels[el.id]);
    if (els.length === 0) return;

    // Register sections after paint (DOM is only known on the client).
    const frame = requestAnimationFrame(() => {
      setSections(els.map((el) => ({ id: el.id, label: labels[el.id] })));
      setActive(els[0].id);
    });

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
    return () => {
      cancelAnimationFrame(frame);
      observerRef.current?.disconnect();
    };
  }, [labels]);

  if (sections.length < 2) return null;

  return (
    <nav className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 xl:flex" aria-label={navLabel.nav}>
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ block: "start" })}
          title={s.label}
          aria-label={`${navLabel.goTo}: ${s.label}`}
          aria-current={active === s.id ? "true" : undefined}
          className="group flex h-6 w-6 items-center justify-center rounded-full"
        >
          <span
            className={`section-dot block h-2 w-2 rounded-full bg-gray-300 transition-all group-hover:bg-[#B89D5E] ${active === s.id ? "active" : ""}`}
            aria-hidden
          />
        </button>
      ))}
    </nav>
  );
}
