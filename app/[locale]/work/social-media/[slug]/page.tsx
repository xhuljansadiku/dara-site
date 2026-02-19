import LocaleLink from "@/components/site/LocaleLink";
import SocialMediaProjectGallery from "@/components/site/SocialMediaProjectGallery";
import {
  getSocialMediaProjectBySlug,
  SOCIAL_MEDIA_SLUGS,
} from "@/lib/projects";
import type { Locale } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales: Locale[] = ["sq", "en", "de"];
  return locales.flatMap((locale) =>
    SOCIAL_MEDIA_SLUGS.map((slug) => ({ locale, slug }))
  );
}

const CTA_BY_LOCALE: Record<
  Locale,
  { backToWork: string; allProjects: string; backHome: string }
> = {
  sq: { backToWork: "Kthehu te punët", allProjects: "Të gjitha projektet", backHome: "Kthehu në kryefaqe" },
  en: { backToWork: "Back to work", allProjects: "All projects", backHome: "Back to home" },
  de: { backToWork: "Zurück zu Arbeiten", allProjects: "Alle Projekte", backHome: "Zur Startseite" },
};

export default function SocialMediaProjectPage({ params }: Props) {
  const { locale: localeParam, slug } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  const project = getSocialMediaProjectBySlug(slug, locale);
  if (!project || !project.images?.length) notFound();

  const cta = CTA_BY_LOCALE[locale];
  const images = project.images;

  return (
    <>
      <section className="relative overflow-hidden py-8 md:py-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
        </div>

        <LocaleLink
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#c8a55c] transition hover:text-[#d4b86a]"
        >
          ← {cta.backToWork}
        </LocaleLink>

        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">
          {project.tag}
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          {project.title}
        </h1>

        <p className="mt-4 max-w-2xl text-base text-white/80">
          {project.desc}
        </p>
      </section>

      <section className="py-8 md:py-12">
        <SocialMediaProjectGallery images={images} projectTitle={project.title} />
      </section>

      <section className="py-8">
        <div className="flex flex-wrap gap-3">
          <LocaleLink
            href="/work"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#c8a55c] px-6 font-medium text-black transition hover:bg-[#b6944f]"
          >
            {cta.allProjects}
          </LocaleLink>
          <LocaleLink
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-white/90 transition hover:border-white/25 hover:bg-white/10"
          >
            {cta.backHome}
          </LocaleLink>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return (async () => {
    const { locale: localeParam, slug } = await params;
    const locale: Locale = ["sq", "en", "de"].includes(localeParam)
      ? (localeParam as Locale)
      : "sq";
    const project = getSocialMediaProjectBySlug(slug, locale);
    if (!project) return { title: "Project" };
    return {
      title: project.title,
      description: project.desc,
    };
  })();
}
