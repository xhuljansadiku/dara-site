"use client";

import LocaleLink from "@/components/site/LocaleLink";
import TeamMemberAvatar from "@/components/site/TeamMemberAvatar";
import { getTeamMembersForLocale } from "@/lib/team-members";

type Locale = "sq" | "en" | "de";

type Props = { locale: Locale };

export default function HomeTeamSection({ locale }: Props) {
  const members = getTeamMembersForLocale(locale);

  const kicker =
    locale === "sq" ? "Ekipi ynë" : locale === "de" ? "Unser Team" : "Our Team";
  const title =
    locale === "sq"
      ? "Skuadra"
      : locale === "de"
        ? "Mannschaft"
        : "Squad";
  const intro =
    locale === "sq"
      ? "Strategji, dizajn, përmbajtje dhe performancë, së bashku për një rezultat të përbashkët."
      : locale === "de"
        ? "Strategie, Design, Content und Performance, gemeinsam für ein gemeinsames Ergebnis."
        : "Strategy, design, content, and performance, together for one shared outcome.";
  const cta =
    locale === "sq" ? "Më shumë rreth ekipit" : locale === "de" ? "Mehr über das Team" : "More about the team";

  return (
    <section id="team" className="relative overflow-hidden py-16 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_50%,#fafafa_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.38] [mask-image:linear-gradient(180deg,white,transparent)]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#B89D5E]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-neutral-300/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center justify-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
            <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
            {kicker}
            <span className="hidden h-px w-8 bg-gradient-to-l from-[#B89D5E]/80 to-transparent sm:block" aria-hidden />
          </span>
          <h2 className="mt-5 bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-900 bg-clip-text font-display text-4xl font-bold leading-[1.1] tracking-tight text-transparent md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-[17px]">{intro}</p>
          <div className="mt-8 flex justify-center">
            <LocaleLink
              href="/team"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white px-6 text-sm font-semibold text-neutral-950 shadow-sm ring-1 ring-black/[0.04] transition hover:border-[#B89D5E]/50 hover:bg-[#B89D5E]/10/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
            >
              {cta}
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-950 transition group-hover:border-[#B89D5E]/50 group-hover:bg-white"
                aria-hidden
              >
                <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </LocaleLink>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-y-20">
          {members.map((member, index) => (
            <div
              key={member.name}
              className={`relative ${index % 3 === 1 ? "lg:translate-y-8" : ""}`}
            >
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                <div
                  className={`relative h-[5.5rem] w-[5.5rem] overflow-hidden rounded-full bg-white p-1 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.2)] ring-2 ${
                    member.initials ? "ring-[#B89D5E]/50" : "ring-white"
                  }`}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <TeamMemberAvatar
                      name={member.name}
                      img={member.img}
                      initials={member.initials}
                      variant="circle"
                      sizes="(max-width: 1024px) 50vw, 88px"
                      photoObjectPosition={member.photoObjectPosition}
                      photoGrayscale={member.photoGrayscale}
                      photoScale={member.photoScale}
                    />
                  </div>
                </div>
                <span
                  className="font-display absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-black/[0.06] bg-neutral-950 text-[10px] font-bold text-white shadow-md"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <article className="relative rounded-3xl border border-black/[0.06] bg-white/95 px-5 pb-7 pt-14 text-center shadow-[0_8px_32px_-20px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.03] backdrop-blur-[2px] transition duration-300 hover:-translate-y-1 hover:border-[#B89D5E]/35 hover:shadow-[0_24px_48px_-24px_rgba(184,157,94,0.12)]">
                <div
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#B89D5E]/40 to-transparent"
                  aria-hidden
                />
                <h3 className="font-display text-xl font-bold tracking-tight text-neutral-950">{member.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">{member.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{member.bio}</p>
                {member.linkedin && member.instagram ? (
                  <div className="mt-5 flex justify-center gap-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-600 transition hover:border-[#B89D5E]/50 hover:bg-[#B89D5E]/10/80 hover:text-neutral-950"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-600 transition hover:border-[#B89D5E]/50 hover:bg-[#B89D5E]/10/80 hover:text-neutral-950"
                      aria-label="Instagram"
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                ) : null}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
