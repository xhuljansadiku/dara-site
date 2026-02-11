"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function AnimateIn({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          t = setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => {
      if (t) clearTimeout(t);
      obs.disconnect();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`animate-reveal ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
