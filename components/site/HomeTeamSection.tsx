"use client";

import { useState } from "react";
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import { getTeamMembersForLocale, type TeamMemberPublic } from "@/lib/team-members";

type Locale = "sq" | "en" | "de";

type Props = { locale: Locale };

const COPY: Record<Locale, { kicker: string; title: string; titleHighlight: string; intro: string; cta: string; founder: string }> = {
  sq: {
    kicker: "Ekipi ynë",
    title: "Njerëzit pas",
    titleHighlight: "DARA",
    intro: "Strategji, dizajn, përmbajtje dhe performancë, së bashku për një rezultat të përbashkët.",
    cta: "Më shumë rreth ekipit",
    founder: "Themeluese",
  },
  en: {
    kicker: "Our team",
    title: "The people behind",
    titleHighlight: "DARA",
    intro: "Strategy, design, content, and performance, together for one shared outcome.",
    cta: "More about the team",
    founder: "Founder",
  },
  de: {
    kicker: "Unser Team",
    title: "Die Menschen hinter",
    titleHighlight: "DARA",
    intro: "Strategie, Design, Content und Performance, gemeinsam für ein gemeinsames Ergebnis.",
    cta: "Mehr über das Team",
    founder: "Gründerin",
  },
};

/** Photo when there is one, otherwise a gold monogram. */
function Face({ m, className, sizes, text }: { m: TeamMemberPublic; className: string; sizes: string; text: string }) {
  return (
    <span className={`relative block overflow-hidden bg-neutral-900 ${className}`}>
      {m.img ? (
        <Image src={m.img} alt="" fill sizes={sizes} className="object-cover grayscale transition duration-700 group-hover:grayscale-0" style={{ objectPosition: m.photoObjectPosition ?? "center 25%" }} />
      ) : (
        <span className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2e2820] to-neutral-950 font-display font-bold text-[#d1b780] ${text}`}>{m.initials}</span>
      )}
    </span>
  );
}

/** The founder in the middle and the team around her; hovering or tapping a person shows their role and bio. */
export default function HomeTeamSection({ locale }: Props) {
  const copy = COPY[locale];
  const [lead, ...rest] = getTeamMembersForLocale(locale);
  const [activeName, setActiveName] = useState(lead.name);
  const active = [lead, ...rest].find((m) => m.name === activeName) ?? lead;

  return (
    <section id="team" aria-labelledby="team-heading" className="overflow-hidden bg-neutral-950 py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">
            <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
            {copy.kicker}
          </span>
          <h2 id="team-heading" className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-6xl">
            {copy.title} <span className="text-[#d1b780]">{copy.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/65">{copy.intro}</p>
          <div key={active.name} className="animate-packages-tab-enter mt-10 rounded-[1.5rem] bg-white/[0.05] p-6 ring-1 ring-white/10" aria-live="polite">
            <p className="font-display text-3xl font-bold uppercase">{active.name}</p>
            <p className="text-sm text-[#d1b780]">{active.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{active.bio}</p>
          </div>
          <div className="mt-8">
            <LocaleLink href="/team" className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#B89D5E] px-7 text-sm font-semibold text-neutral-950 transition hover:bg-[#d4bd85]">
              {copy.cta}
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                →
              </span>
            </LocaleLink>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
          <span className="absolute inset-[12%] rounded-full border border-dashed border-white/15" aria-hidden />
          <button
            type="button"
            onClick={() => setActiveName(lead.name)}
            onPointerEnter={() => setActiveName(lead.name)}
            aria-pressed={active.name === lead.name}
            aria-label={`${lead.name}, ${copy.founder}`}
            className="group absolute left-1/2 top-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2"
          >
            <Face m={lead} className={`aspect-square rounded-full ring-4 ${active.name === lead.name ? "ring-[#B89D5E]" : "ring-white/10"}`} sizes="200px" text="text-4xl" />
            <span className="mt-2 block text-center text-xs font-semibold text-[#d1b780]">{copy.founder}</span>
          </button>
          {rest.map((m, i) => {
            const angle = (i / rest.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <button
                key={m.name}
                type="button"
                onClick={() => setActiveName(m.name)}
                onPointerEnter={() => setActiveName(m.name)}
                aria-pressed={active.name === m.name}
                aria-label={`${m.name}, ${m.role}`}
                className="group absolute w-[20%] -translate-x-1/2 -translate-y-1/2 transition hover:scale-110"
                style={{ left: `${50 + Math.cos(angle) * 38}%`, top: `${50 + Math.sin(angle) * 38}%` }}
              >
                <Face m={m} className={`aspect-square rounded-full ring-2 ${active.name === m.name ? "ring-[#B89D5E]" : "ring-white/15"}`} sizes="120px" text="text-xl" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
