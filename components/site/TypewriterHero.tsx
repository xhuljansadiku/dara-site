"use client";

import { useEffect, useState } from "react";

const WORDS_BY_LOCALE: Record<string, string[]> = {
  sq: ["ndryshe", "kreativ", "unik", "i suksesshëm"],
  en: ["different", "bold", "creative", "unique", "successful"],
  de: ["anders zu sein", "mutig zu sein", "kreativ zu sein", "einzigartig", "erfolgreich"],
};

type Props = { locale: string; initialWord: string };

export default function TypewriterHero({ locale, initialWord }: Props) {
  const words = WORDS_BY_LOCALE[locale] ?? WORDS_BY_LOCALE.en;

  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState(initialWord);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(initialWord.length);
  const [paused, setPaused] = useState(true);

  // Start deleting after 2s pause on first word (never for users who prefer reduced motion)
  useEffect(() => {
    if (!paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setPaused(false), 2000);
    return () => clearTimeout(t);
  }, [paused]);

  useEffect(() => {
    if (paused) return;
    const current = words[wordIndex];
    const delay = isDeleting ? 55 : 95;

    const timer = setTimeout(() => {
      if (isDeleting) {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          const next = (wordIndex + 1) % words.length;
          setWordIndex(next);
          setCharIndex(0);
        }
      } else {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, words, paused]);

  return (
    <span className="block text-[#d1b780] [text-shadow:0_2px_28px_rgba(0,0,0,0.45)]">
      {/* Stable accessible name for the H1; the animated word is decorative. */}
      <span className="sr-only">{initialWord}</span>
      <span aria-hidden>
        {displayed}
        <span className="typewriter-cursor" />
      </span>
    </span>
  );
}
