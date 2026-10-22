"use client";

import { useEffect, useRef } from "react";

type Props = {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
};

/**
 * Renders the final value on the server (so crawlers, no-JS and reduced-motion users never
 * see "0+"), then replays the count from 0 when the number scrolls into view.
 */
export default function CountUp({ end, duration = 1800, suffix = "", prefix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const render = (n: number) => {
      el.textContent = `${prefix}${n}${suffix}`;
    };
    // Only animate numbers that start below the fold; visible ones keep their value.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    render(0);
    let frame = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        obs.disconnect();
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          render(Math.round((1 - Math.pow(1 - progress, 3)) * end));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(frame);
      render(end);
    };
  }, [end, duration, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}
      {end}
      {suffix}
    </span>
  );
}
