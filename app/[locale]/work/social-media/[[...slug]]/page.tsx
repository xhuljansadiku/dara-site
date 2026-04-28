import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates, buildLocalePath, type SiteLocale } from "@/lib/seo-utils";

type Locale = "sq" | "en" | "de";

const COPY: Record<Locale, { title: string; message: string; cta: string }> = {
  sq: {
    title: "Kjo faqe është zhvendosur",
    message: "Rastet e social media janë konsoliduar te portfolio kryesore.",
    cta: "Shiko portfolio",
  },
  en: {
    title: "This page has moved",
    message: "Social media case studies are consolidated under the main work page.",
    cta: "View portfolio",
  },
  de: {
    title: "Diese Seite wurde verschoben",
    message: "Social-Media-Projekte wurden auf der Hauptseite \"Arbeiten\" zusammengefasst.",
    cta: "Portfolio ansehen",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = (["sq", "en", "de"].includes(locale) ? locale : "en") as SiteLocale;
  const { canonical, languages } = buildAlternates("/work", currentLocale);

  return {
    title: "Work",
    description: "Legacy social media project path.",
    alternates: { canonical, languages },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export default async function LegacySocialMediaWorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (["sq", "en", "de"].includes(locale) ? locale : "en") as Locale;
  const copy = COPY[currentLocale];

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-neutral-950">{copy.title}</h1>
      <p className="mt-3 text-neutral-600">{copy.message}</p>
      <Link
        href={buildLocalePath(currentLocale, "/work")}
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white hover:bg-neutral-800"
      >
        {copy.cta}
      </Link>
    </section>
  );
}
