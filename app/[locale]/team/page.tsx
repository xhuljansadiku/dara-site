// app/[locale]/team/page.tsx (Ekipi / Team)
import type { Metadata } from "next";
import LocaleLink from "@/components/site/LocaleLink";
import TeamMemberAvatar from "@/components/site/TeamMemberAvatar";
import { buildAlternates } from "@/lib/seo-utils";
import { getTeamMembersForLocale } from "@/lib/team-members";

type Locale = "sq" | "en" | "de";

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Ekipi | DARA Marketing Agency",
    description:
      "Njihni ekipin DARA në Tiranë: strategji, kreativitet dhe marketing digjital për biznese në Shqipëri.",
  },
  en: {
    title: "Team | DARA Marketing Agency",
    description:
      "Meet the DARA team: marketing, strategy and creative professionals helping brands grow.",
  },
  de: {
    title: "Team | DARA Marketing Agency",
    description:
      "Lernen Sie das DARA-Team kennen: Marketing, Strategie und Kreativität für wachsende Marken.",
  },
};

const COPY: Record<
  Locale,
  { kicker: string; h1a: string; h1b: string; intro: string; cta: string; ctaContact: string }
> = {
  sq: {
    kicker: "Ekipi ynë",
    h1a: "Njerëzit pas",
    h1b: "DARA",
    intro: "Profesionistë të marketingut dhe krijuesit që sjellin brandet në jetë.",
    cta: "Dëshiron të bashkohesh me ne?",
    ctaContact: "Shiko karrierën",
  },
  en: {
    kicker: "Our team",
    h1a: "The people behind",
    h1b: "DARA",
    intro: "Marketing professionals and creatives who bring brands to life.",
    cta: "Want to join us?",
    ctaContact: "View careers",
  },
  de: {
    kicker: "Unser Team",
    h1a: "Die Menschen hinter",
    h1b: "DARA",
    intro: "Marketingprofis und Kreative, die Marken zum Leben erwecken.",
    cta: "Möchtest du dabei sein?",
    ctaContact: "Karriere",
  },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = (["sq", "en", "de"].includes(localeParam) ? localeParam : "sq") as Locale;
  const meta = META_BY_LOCALE[locale];
  const { canonical, languages } = buildAlternates("team", locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function TeamPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (["sq", "en", "de"].includes(localeParam) ? localeParam : "sq") as Locale;
  const t = COPY[locale];
  const members = getTeamMembersForLocale(locale);

  return (
    <>
      {/* Hero — aligned with /careers */}
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-[#B89D5E]/30 bg-[#B89D5E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#6b5a38]">
              {t.kicker}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-neutral-950 md:text-5xl lg:text-[3.5rem]">
              <span className="block">{t.h1a}</span>
              <span className="block text-neutral-950">{t.h1b}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 whitespace-pre-line">
              {t.intro}
            </p>
            <div className="mx-auto mt-8 h-px w-16 rounded-full bg-gradient-to-r from-[#B89D5E] to-transparent" />
          </div>
        </div>
      </section>

      <div className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="grid min-h-0 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div key={member.name} className="card card-lift group relative overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                <TeamMemberAvatar
                  name={member.name}
                  img={member.img}
                  initials={member.initials}
                  variant="card"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  photoObjectPosition={member.photoObjectPosition}
                  photoGrayscale={member.photoGrayscale}
                  photoScale={member.photoScale}
                />
                <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm text-white">{member.bio}</p>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-medium text-gray-900/95">{member.name}</h2>
                <p className="mt-1 text-sm text-gray-900/90">{member.role}</p>
              </div>
            </div>
          ))}
          </div>

          <div className="mt-14 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center md:p-10">
            <p className="text-lg font-semibold text-gray-900">{t.cta}</p>
            <LocaleLink
              href="/careers"
              className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-gray-900 px-8 font-semibold text-white transition hover:bg-gray-800"
            >
              {t.ctaContact}
            </LocaleLink>
          </div>
        </div>
      </div>
    </>
  );
}
