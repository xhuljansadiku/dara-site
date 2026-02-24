// app/[locale]/team/page.tsx - Team page, localized sq/en/de
import Image from "next/image";
import { use } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import { getYearsOfExperienceFormatted } from "@/lib/experience";
import type { Metadata } from "next";

type Locale = "sq" | "en" | "de";

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; title: string; titleAccent: string; subtitle: string; backHome: string; ctaContact: string }
> = {
  sq: {
    kicker: "Ekipi ynë",
    title: "Njerëzit pas ",
    titleAccent: "DARA",
    subtitle: "Profesionistë të marketingut dhe krijuesit që sjellin brandet në jetë.",
    backHome: "Kthehu në kryefaqe",
    ctaContact: "Na kontakto",
  },
  en: {
    kicker: "Our Team",
    title: "The people behind ",
    titleAccent: "DARA",
    subtitle: "Marketing professionals and creatives who bring brands to life.",
    backHome: "Back to home",
    ctaContact: "Contact us",
  },
  de: {
    kicker: "Unser Team",
    title: "Die Menschen hinter ",
    titleAccent: "DARA",
    subtitle: "Marketingprofis und Kreative, die Marken zum Leben erwecken.",
    backHome: "Zur Startseite",
    ctaContact: "Kontaktiere uns",
  },
};

const TEAM_MEMBERS = [
  {
    name: "Ana K.",
    roleSq: "Themelues & Strategji",
    roleEn: "Founder & Strategy",
    roleDe: "Gründerin & Strategie",
    bioSq: "vjet në marketingu. Ekspertë në strategji dhe rritje të bizneseve.",
    bioEn: "years in marketing. Expert in strategy and business growth.",
    bioDe: "Jahre im Marketing. Experte für Strategie und Unternehmenswachstum.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=480&h=600&fit=crop",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Marko D.",
    roleSq: "Kreativ & Design",
    roleEn: "Creative & Design",
    roleDe: "Kreativ & Design",
    bioSq: "Krijues vizual me përvojë në branding dhe përmbajtje.",
    bioEn: "Visual creative with experience in branding and content.",
    bioDe: "Visueller Kreativer mit Erfahrung in Branding und Content.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&h=600&fit=crop",
    linkedin: "#",
    instagram: "#",
  },
  {
    name: "Ela R.",
    roleSq: "Social Media & Përmbajtje",
    roleEn: "Social Media & Content",
    roleDe: "Social Media & Content",
    bioSq: "Specialist në rrjetet sociale dhe strategji përmbajtjeje.",
    bioEn: "Specialist in social media and content strategy.",
    bioDe: "Spezialistin für Social Media und Content-Strategie.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=480&h=600&fit=crop",
    linkedin: "#",
    instagram: "#",
  },
];

type Props = { params: Promise<{ locale: string }> };

export default function TeamPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam) ? (localeParam as Locale) : "sq";
  const hero = HERO_BY_LOCALE[locale];
  const yearsExperienceFormatted = getYearsOfExperienceFormatted();

  const getRole = (m: (typeof TEAM_MEMBERS)[0]) =>
    locale === "sq" ? m.roleSq : locale === "de" ? m.roleDe : m.roleEn;
  const getBio = (m: (typeof TEAM_MEMBERS)[0]) => {
    const bio = locale === "sq" ? m.bioSq : locale === "de" ? m.bioDe : m.bioEn;
    return m.name === "Ana K." ? `${yearsExperienceFormatted} ${bio}` : bio;
  };

  return (
    <>
      <section className="relative overflow-hidden py-8 md:py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
        </div>

        <LocaleLink
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#c8a55c] transition hover:text-[#d4b86a]"
        >
          ← {hero.backHome}
        </LocaleLink>

        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">{hero.kicker}</p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          {hero.title}
          <span className="text-[#c8a55c]">{hero.titleAccent}</span>
        </h1>

        <p className="mt-4 max-w-2xl text-base text-white/80">{hero.subtitle}</p>
      </section>

      <section className="py-8 md:py-12">
        <div className="grid min-h-0 grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member, idx) => (
            <AnimateIn key={member.name} delay={idx * 80}>
              <div className="card card-lift group relative overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-sm text-white/90">{getBio(member)}</p>
                    <div className="mt-4 flex gap-3">
                      <a
                        href={member.linkedin}
                        className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-[#c8a55c]"
                        aria-label="LinkedIn"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href={member.instagram}
                        className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-[#c8a55c]"
                        aria-label="Instagram"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-white/95">{member.name}</h3>
                  <p className="mt-1 text-sm text-[#c8a55c]/90">{getRole(member)}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="flex flex-wrap gap-3">
          <LocaleLink
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#c8a55c] px-6 font-medium text-black transition hover:bg-[#b6944f]"
          >
            {hero.ctaContact}
          </LocaleLink>
          <LocaleLink
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-white/90 transition hover:border-white/25 hover:bg-white/10"
          >
            {hero.backHome}
          </LocaleLink>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = ["sq", "en", "de"].includes(localeParam) ? localeParam : "sq";
  return {
    title: locale === "sq" ? "Ekipi" : locale === "de" ? "Team" : "Team",
    description:
      locale === "sq"
        ? "Njihuni me ekipin e DARA — profesionistët e marketingut që sjellin brandet në jetë."
        : locale === "de"
        ? "Lernen Sie das DARA-Team kennen — Marketingprofis, die Marken zum Leben erwecken."
        : "Meet the DARA team — marketing professionals who bring brands to life.",
  };
}
