"use client";

import { useState } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import type { Project, ProjectCategory } from "@/lib/projects";
import type { FilterTab } from "@/lib/projects";

type Props = {
  locale: "sq" | "en" | "de";
  projects: Project[];
  filterTabs: FilterTab[];
};

export default function WorkContent({ locale, projects, filterTabs }: Props) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const heroLabels =
    locale === "sq"
      ? { kicker: "Puna", title: "Projektet", titleAccent: "e kaluara", desc: "Zgjedhje e markave që kemi ndihmuar të rriten përmes social media, brandingut dhe web dizajnit.", startProject: "Nis një projekt", ourServices: "Shërbimet tona" }
      : locale === "de"
      ? { kicker: "Arbeit", title: "Ausgewählte", titleAccent: "Projekte", desc: "Eine Auswahl von Marken, die wir durch Social Media, Branding und Webdesign zum Wachstum verholfen haben.", startProject: "Projekt starten", ourServices: "Unsere Leistungen" }
      : { kicker: "Work", title: "Previous", titleAccent: "projects", desc: "A selection of brands we've helped grow through social media, branding, and web design.", startProject: "Start a project", ourServices: "Our services" };

  const ctaLabels =
    locale === "sq"
      ? { title: "Le të punojmë së bashku dhe të krijojmë", accent: "diçka të madhe", desc: "Na thuaj objektivin dhe ne do të kthehemi me një plan të qartë.", contact: "Na kontakto", backHome: "Kthehu në fillim" }
      : locale === "de"
      ? { title: "Lass uns zusammenarbeiten und etwas", accent: "Großartiges schaffen", desc: "Erzähl uns dein Ziel und wir kommen mit einem klaren Plan zurück.", contact: "Kontaktiere uns", backHome: "Zurück zur Startseite" }
      : { title: "Let's work together and create", accent: "something great", desc: "Tell us your goal and we'll return with a clear plan.", contact: "Contact us", backHome: "Back to Home" };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">{heroLabels.kicker}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          {heroLabels.title} <span className="text-yellow-400">{heroLabels.titleAccent}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">{heroLabels.desc}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LocaleLink href="/contact" className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 sm:w-auto">
            {heroLabels.startProject}
          </LocaleLink>
          <LocaleLink href="/services" className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto">
            {heroLabels.ourServices}
          </LocaleLink>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="py-6">
        <div className="-mx-4 overflow-x-auto px-4">
          <div className="flex w-max flex-nowrap gap-2 whitespace-nowrap">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === tab.key ? "bg-yellow-400 text-black" : "border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((c) => (
            <div key={c.title} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-yellow-400/30">
              <div className="aspect-[4/3] w-full bg-gradient-to-b from-white/10 to-white/5" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{c.title}</p>
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60">{c.tag}</span>
                </div>
                <p className="mt-2 text-sm text-white/60">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6 md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            {ctaLabels.title} <span className="text-yellow-400">{ctaLabels.accent}</span>.
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">{ctaLabels.desc}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink href="/contact" className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 sm:w-auto">
              {ctaLabels.contact}
            </LocaleLink>
            <LocaleLink href="/" className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto">
              {ctaLabels.backHome}
            </LocaleLink>
          </div>
        </div>
      </section>
      <div className="h-8" />
    </>
  );
}
