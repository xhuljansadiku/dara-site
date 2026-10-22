"use client";

import { useEffect, useId, useRef, useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import { PACKAGE_GROUPS, PACKAGE_GROUP_NOTES, getPackageCtaHref, type PackageGroup, type Pkg } from "@/lib/packages-data";

type Locale = "sq" | "en" | "de";

const UI: Record<
  Locale,
  {
    groups: string;
    pickLevel: string;
    newHere: string;
    recommended: string;
    save: (amount: string) => string;
    cta: Record<"quote" | "consult" | "register", string>;
  }
> = {
  sq: {
    groups: "Kategoritë e paketave",
    pickLevel: "Zgjidhni nivelin",
    newHere: "E re",
    recommended: "Rekomandohet",
    save: (x) => `Kurseni ${x}`,
    cta: { quote: "Kërko ofertë", consult: "Kërko konsultim", register: "Regjistrohu" },
  },
  en: {
    groups: "Package categories",
    pickLevel: "Choose the level",
    newHere: "New",
    recommended: "Recommended",
    save: (x) => `Save ${x}`,
    cta: { quote: "Get a quote", consult: "Request consultation", register: "Register" },
  },
  de: {
    groups: "Paketkategorien",
    pickLevel: "Stufe wählen",
    newHere: "Neu",
    recommended: "Empfohlen",
    save: (x) => `Sie sparen ${x}`,
    cta: { quote: "Angebot anfragen", consult: "Beratung anfragen", register: "Anmelden" },
  },
};

type Props = {
  locale: Locale;
  packagesByGroup: Record<PackageGroup, Pkg[]>;
  groupLabels: Record<PackageGroup, string>;
  copy: { kicker: string; titleBefore: string; titleHighlight: string; intro: string; compare: string };
};

const NUMBER = /\d{1,3}(?:[.,]\d{3})+|\d+/;
/** "Nga 1.500€/muaj" → 1500. Prices on request have no amount. */
const amountOf = (price: string) => {
  const m = price.match(NUMBER);
  return m ? Number(m[0].replace(/[.,]/g, "")) : null;
};
const numberFormat = (locale: Locale) => (locale === "en" ? "en-GB" : "de-DE");
const money = (locale: Locale, n: number) => (locale === "en" ? `€${n.toLocaleString("en-GB")}` : `${n.toLocaleString("de-DE")}€`);
/** Swaps the amount inside a price label for an animated value, keeping "Nga", "€" and "/muaj". */
function withAmount(price: string, value: number | null, locale: Locale) {
  const m = price.match(NUMBER);
  if (!m || m.index === undefined || value === null) return price;
  return price.slice(0, m.index) + value.toLocaleString(numberFormat(locale)) + price.slice(m.index + m[0].length);
}
const savingOf = (p: Pkg) => {
  const now = amountOf(p.price);
  const was = p.priceOriginal ? amountOf(p.priceOriginal) : null;
  return now !== null && was !== null && was > now ? was - now : null;
};
/** The package with a badge, or the middle one of three. */
const featuredIndex = (pkgs: Pkg[]) => {
  const b = pkgs.findIndex((p) => p.badge);
  return b >= 0 ? b : pkgs.length === 3 ? 1 : 0;
};
/**
 * What a package includes. A first point like "Starter +" means it contains the previous level, so that level's
 * points are listed first (dimmed) and this package's own points are what is new.
 */
function includes(pkgs: Pkg[], i: number): { earlier: string[]; added: string[] } {
  const [first = "", ...rest] = pkgs[i].points;
  const base = /\+\s*$/.test(first) ? first.replace(/\s*\+\s*$/, "") : null;
  if (i > 0 && base && base === pkgs[i - 1].title) {
    const prev = includes(pkgs, i - 1);
    return { earlier: [...prev.earlier, ...prev.added], added: rest };
  }
  return { earlier: [], added: pkgs[i].points };
}

/** Counts towards `target` (straight to it with reduced motion). */
function useCountUp(target: number | null, ms = 650) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (target === null) {
      from.current = null;
      return;
    }
    const start = from.current ?? target;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = duration ? Math.min(1, (t - t0) / duration) : 1;
      const v = Math.round(start + (target - start) * (1 - Math.pow(1 - k, 3)));
      from.current = v;
      setValue(v);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return target === null ? null : value;
}

function Check({ gold = false }: { gold?: boolean }) {
  return (
    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${gold ? "bg-[#B89D5E] text-neutral-950" : "bg-white/10 text-[#d1b780]"}`} aria-hidden>
      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </span>
  );
}

/**
 * Homepage packages: pick a category, then a level with the slider (or the level buttons). One card shows the
 * chosen package; its price counts to the new amount and the points it adds over the previous level light up.
 */
export default function PackagesLevels({ locale, packagesByGroup, groupLabels, copy }: Props) {
  const ui = UI[locale];
  const sliderId = useId();
  const groups = PACKAGE_GROUPS.filter((g) => packagesByGroup[g]?.length);
  const [group, setGroup] = useState<PackageGroup>(groups[0] ?? "marketing");
  const pkgs = packagesByGroup[group] ?? [];
  const [level, setLevel] = useState(() => featuredIndex(pkgs));
  const pick = Math.min(level, Math.max(0, pkgs.length - 1));
  const p = pkgs[pick];
  const amount = useCountUp(p ? amountOf(p.price) : null);
  if (!p) return null;

  const fi = featuredIndex(pkgs);
  const { earlier, added } = includes(pkgs, pick);
  const save = savingOf(p);
  const note = PACKAGE_GROUP_NOTES[locale][group];
  const ctaLabel = group === "training" ? ui.cta.register : ui.cta[p.cta ?? "quote"];

  const chooseGroup = (g: PackageGroup) => {
    setGroup(g);
    // Each category opens on its popular package.
    setLevel(featuredIndex(packagesByGroup[g] ?? []));
  };

  return (
    <div>
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
          <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
          {copy.kicker}
        </span>
        <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-neutral-950 md:text-6xl">
          {copy.titleBefore}
          <span className="text-[#8a7344]">{copy.titleHighlight}</span>
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">{copy.intro}</p>
      </div>

      <div role="group" aria-label={ui.groups} className="mt-8 flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            aria-pressed={group === g}
            onClick={() => chooseGroup(g)}
            className={`min-h-10 rounded-full border px-4 text-sm font-medium transition ${
              group === g ? "border-neutral-950 bg-neutral-950 text-white" : "border-neutral-950/15 bg-white text-neutral-700 hover:border-neutral-950"
            }`}
          >
            {groupLabels[g]}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
        <div>
          {pkgs.length > 1 && (
            <>
              <label htmlFor={sliderId} className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                {ui.pickLevel}
              </label>
              <input
                id={sliderId}
                type="range"
                min={0}
                max={pkgs.length - 1}
                step={1}
                value={pick}
                onChange={(e) => setLevel(Number(e.target.value))}
                aria-valuetext={p.title}
                className="mt-5 h-2 w-full cursor-pointer accent-[#B89D5E]"
              />
            </>
          )}
          <div className={`mt-4 grid gap-2 ${pkgs.length >= 3 ? "grid-cols-3" : pkgs.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {pkgs.map((x, i) => (
              <button
                key={x.title}
                type="button"
                aria-pressed={pick === i}
                onClick={() => setLevel(i)}
                className={`rounded-2xl border px-3 py-3 text-left transition ${pick === i ? "border-neutral-950 bg-neutral-950 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-950"}`}
              >
                <span className="block font-display text-lg font-bold uppercase leading-tight">{x.title}</span>
                <span className={`block text-xs ${pick === i ? "text-[#d1b780]" : "text-neutral-500"}`}>{x.price}</span>
                {i === fi && pkgs.length > 1 && (
                  <span className={`mt-1 block text-[10px] font-semibold ${pick === i ? "text-white/70" : "text-[#8a7344]"}`}>★ {x.badge ?? ui.recommended}</span>
                )}
              </button>
            ))}
          </div>
          {note && <p className="mt-6 text-sm leading-relaxed text-neutral-600">{note}</p>}
          <LocaleLink href="/packages" className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-neutral-950 hover:text-[#8a7344]">
            {copy.compare}
            <span aria-hidden className="transition group-hover:translate-x-0.5">
              →
            </span>
          </LocaleLink>
        </div>

        <article aria-live="polite" className="rounded-[2rem] bg-neutral-950 p-8 text-white shadow-[0_40px_90px_-45px_rgba(0,0,0,0.6)] md:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
            {groupLabels[group]} · {p.subtitle}
          </p>
          <h3 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">{p.title}</h3>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-3">
            <span className="font-display text-4xl font-bold tabular-nums text-[#d1b780] md:text-5xl">{withAmount(p.price, amount, locale)}</span>
            {p.priceOriginal && <span className="text-lg text-white/40 line-through">{p.priceOriginal}</span>}
          </div>
          {save !== null && <span className="mt-3 inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">{ui.save(money(locale, save))}</span>}
          <ul className="mt-7 space-y-2.5">
            {earlier.map((pt) => (
              <li key={`e-${pt}`} className="flex gap-3 text-sm text-white/45">
                <Check />
                {pt}
              </li>
            ))}
            {added.map((pt) => (
              <li key={`${group}-${pick}-${pt}`} className="animate-packages-tab-enter flex items-start gap-3 text-sm text-white">
                <Check gold />
                <span>
                  {pt}
                  {earlier.length > 0 && (
                    <span className="ml-2 rounded-full bg-[#B89D5E]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#e3cf9c]">{ui.newHere}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <LocaleLink
            href={getPackageCtaHref(group, pick)}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#B89D5E] px-7 text-sm font-semibold text-neutral-950 transition hover:bg-[#d4bd85]"
          >
            {ctaLabel}
          </LocaleLink>
        </article>
      </div>
    </div>
  );
}
