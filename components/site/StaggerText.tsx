"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  wordDelay?: number;
};

export default function StaggerText({ text, className = "", wordDelay = 80 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-stagger"
          style={visible ? { animationDelay: `${i * wordDelay}ms` } : {}}
          aria-hidden={i > 0}
          data-visible={visible ? "true" : "false"}
        >
          {visible ? (
            <span
              className="word-stagger visible"
              style={{ animationDelay: `${i * wordDelay}ms` }}
            >
              {word}
            </span>
          ) : (
            <span className="opacity-0">{word}</span>
          )}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
