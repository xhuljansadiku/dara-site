"use client";

import { useParams } from "next/navigation";
import { CAREER_COPY_BY_LOCALE, CAREER_ROLES_BY_LOCALE, type Locale } from "@/lib/careers-data";

const CAREERS_EMAIL = "daramarketing.eu@gmail.com";

export default function CareersPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "sq";
  const copy = CAREER_COPY_BY_LOCALE[locale];
  const roles = CAREER_ROLES_BY_LOCALE[locale];

  const emailTitle =
    locale === "sq" ? "Dërgo aplikimin me email" : locale === "de" ? "Bewerbung per E-Mail senden" : "Send your application by email";
  const emailText =
    locale === "sq"
      ? "Na dërgo CV-në dhe një prezantim të shkurtër te adresa më poshtë."
      : locale === "de"
      ? "Senden Sie Ihren Lebenslauf und eine kurze Vorstellung an die folgende Adresse."
      : "Send your CV and a short introduction to the email address below.";

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-stone-50 via-white to-stone-50/50 py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-[#B89D5E]/12 blur-3xl" />
          <div className="absolute right-[-15%] top-1/3 h-72 w-72 rounded-full bg-[#B89D5E]/12 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-[#B89D5E]/30 bg-[#B89D5E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#6b5a38]">
              {copy.kicker}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-neutral-950 md:text-5xl lg:text-[3.5rem]">
              {copy.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-neutral-600">
              {copy.subtitle}
            </p>
            <div className="mx-auto mt-8 h-px w-16 rounded-full bg-gradient-to-r from-[#B89D5E] to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(184,157,94,0.08)_0%,transparent_55%)]" aria-hidden />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-sm ring-1 ring-black/[0.03] md:p-8">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#6b5a38]">
              {locale === "sq" ? "Pozicionet e hapura" : locale === "de" ? "Offene Stellen" : "Open positions"}
            </h2>

            <ul className="mt-8 space-y-3">
              {roles.map((role, idx) => (
                <li
                  key={role}
                  className="flex items-center gap-4 rounded-2xl border border-stone-200/90 bg-stone-50/80 px-5 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#B89D5E]/15 font-mono text-xs font-semibold tabular-nums text-[#6b5a38] ring-1 ring-[#B89D5E]/20">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-neutral-900">{role}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-[#B89D5E]/25 bg-[#B89D5E]/8 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5a38]">{emailTitle}</p>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{emailText}</p>
              <a
                href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Job Application - DARA")}`}
                className="mt-4 inline-flex items-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                {CAREERS_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
