"use client";

import { useEffect, useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";

const LABEL: Record<string, string> = {
  sq: "Kërko ofertë",
  en: "Request a quote",
  de: "Angebot anfragen",
};

type Props = { locale: string };

export default function FloatingCTA({ locale }: Props) {
  const [visible, setVisible] = useState(false);
  const label = LABEL[locale] ?? LABEL.en;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="animate-float-up fixed bottom-24 right-8 z-40 hidden lg:block">
      <LocaleLink
        href="/contact"
        className="group flex h-12 items-center gap-2 rounded-full bg-[#B89D5E] px-5 text-sm font-semibold text-neutral-950 shadow-[0_8px_32px_-8px_rgba(184,157,94,0.55)] transition-all hover:bg-[#cbb27a] hover:shadow-[0_12px_40px_-8px_rgba(184,157,94,0.65)] hover:scale-105"
      >
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {label}
      </LocaleLink>
    </div>
  );
}
