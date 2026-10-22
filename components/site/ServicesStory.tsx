"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";

type Locale = "sq" | "en" | "de";

export type StoryGroup = {
  name: string;
  icon: ReactNode;
  img: string;
  items: { slug: string; title: string; sub: string; price: string; href: string }[];
};

type Props = {
  locale: Locale;
  headingId: string;
  kicker: string;
  titleBefore: string;
  titleHighlight: string;
  groups: StoryGroup[];
  priceNote: string;
  quoteLabel: string;
};

const COUNT: Record<Locale, (n: number) => string> = {
  sq: (n) => (n === 1 ? "1 shërbim" : `${n} shërbime`),
  en: (n) => (n === 1 ? "1 service" : `${n} services`),
  de: (n) => (n === 1 ? "1 Leistung" : `${n} Leistungen`),
};

const pad = (n: number) => String(n).padStart(2, "0");
/** Drops a trailing note in brackets, e.g. "(pa buxhetin e reklamës)", for the compact price column. */
const shortPrice = (price: string) => price.replace(/\s*\([^)]*\)\s*$/, "");

/**
 * Desktop: the block pins for one screen of scroll per category, and the category, its services and the photo
 * change as you scroll (the dots jump to a category). Phones and tablets: the categories one after another.
 */
export default function ServicesStory({ locale, headingId, kicker, titleBefore, titleHighlight, groups, priceNote, quoteLabel }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = outerRef.current;
      if (!el || !window.matchMedia("(min-width: 1024px)").matches) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(0.999, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      setStep(Math.floor(p * groups.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [groups.length]);

  const goTo = (i: number) => {
    const el = outerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((el.offsetHeight - window.innerHeight) * (i + 0.5)) / groups.length, behavior: "smooth" });
  };

  const group = groups[step] ?? groups[0];
  if (!group) return null;

  const heading = (id?: string) => (
    <div>
      <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
        <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
        {kicker}
      </span>
      <h2 id={id} className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-neutral-950 md:text-6xl">
        {titleBefore}
        <span className="text-[#8a7344]">{titleHighlight}</span>
      </h2>
    </div>
  );

  const list = (g: StoryGroup) => (
    <ul className="mt-6 border-t border-neutral-950/10">
      {g.items.map((s) => (
        <li key={s.slug} className="border-b border-neutral-950/10">
          <LocaleLink href={s.href} className="group flex items-center justify-between gap-4 py-3.5">
            <span>
              <span className="block font-semibold text-neutral-950 transition group-hover:text-[#8a7344]">{s.title}</span>
              {/* Short laptop screens: keep the pinned block within one screen by dropping the one-liners. */}
              <span className="mt-0.5 block text-sm text-neutral-500 lg:[@media(max-height:820px)]:hidden">{s.sub}</span>
            </span>
            <span className="shrink-0 text-right text-sm font-semibold text-[#6b5a38]">{shortPrice(s.price)}</span>
          </LocaleLink>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop: pinned, one category per screen of scroll */}
      <div ref={outerRef} className="relative hidden lg:block" style={{ height: `${groups.length * 100}svh` }}>
        <div className="sticky top-0 flex h-[100svh] items-center">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-14 px-8 pt-16">
            <div>
              {heading(headingId)}
              <div className="mt-8 flex items-center gap-3">
                {groups.map((g, i) => (
                  <button
                    key={g.name}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={g.name}
                    aria-current={i === step || undefined}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? "w-14 bg-[#B89D5E]" : "w-6 bg-neutral-950/15 hover:bg-neutral-950/30"}`}
                  />
                ))}
                <span className="ml-2 font-display text-sm tabular-nums text-neutral-500">
                  {pad(step + 1)} / {pad(groups.length)}
                </span>
              </div>
              <div key={group.name} className="animate-packages-tab-enter">
                <p className="mt-8 flex items-center gap-3 font-display text-4xl font-bold uppercase leading-none text-neutral-950">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-950 text-[#d1b780]">{group.icon}</span>
                  {group.name}
                </p>
                {list(group)}
              </div>
            </div>
            <div className="relative aspect-[4/5] max-h-[78svh] overflow-hidden rounded-[2rem] bg-neutral-200 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.45)]">
              {groups.map((g, i) => (
                <Image
                  key={g.name}
                  src={g.img}
                  alt=""
                  fill
                  sizes="45vw"
                  className={`object-cover transition-all duration-700 ${i === step ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                />
              ))}
              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-neutral-950">{COUNT[locale](group.items.length)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phones and tablets: the categories one after another */}
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 md:px-8 md:pt-24 lg:hidden">
        {heading()}
        {groups.map((g) => (
          <div key={g.name} className="mt-12">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
              <Image src={g.img} alt="" fill sizes="100vw" className="object-cover" />
            </div>
            <p className="mt-6 flex items-center gap-3 font-display text-3xl font-bold uppercase text-neutral-950">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-[#d1b780]">{g.icon}</span>
              {g.name}
            </p>
            {list(g)}
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 pt-10 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="max-w-xl text-xs leading-relaxed text-neutral-600">{priceNote}</p>
        <LocaleLink
          href="/contact"
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-neutral-950 px-7 text-sm font-semibold text-white transition hover:bg-[#B89D5E] hover:text-neutral-950"
        >
          {quoteLabel}
        </LocaleLink>
      </div>
    </>
  );
}
