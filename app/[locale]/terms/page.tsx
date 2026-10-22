import LegalDocumentBody from "@/components/site/LegalDocumentBody";
import { TERMS_BY_LOCALE, type LegalLocale } from "@/lib/legal-pages-content";
import { buildAlternates } from "@/lib/seo-utils";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (["sq", "en", "de"].includes(locale) ? locale : "sq") as LegalLocale;
  const meta = TERMS_BY_LOCALE[l].meta;
  const { canonical, languages } = buildAlternates("terms", l);
  const titleSuffix = " | DARA";
  return {
    title: meta.title, // root template adds the brand suffix
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title + titleSuffix,
      description: meta.description,
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = (["sq", "en", "de"].includes(locale) ? locale : "sq") as LegalLocale;
  const { meta, sections } = TERMS_BY_LOCALE[l];

  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-stone-50 via-white to-stone-50/50 py-14 md:py-20">
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
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#B89D5E]/12 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 md:text-left lg:px-8">
          <span className="inline-flex items-center rounded-full border border-[#B89D5E]/30 bg-[#B89D5E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b5a38]">
            {l === "sq" ? "Kushte" : l === "de" ? "AGB" : "Terms"}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
            {meta.h1}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600 md:mx-0">{meta.intro}</p>
          <div className="mx-auto mt-8 h-px w-16 rounded-full bg-gradient-to-r from-[#B89D5E] to-transparent md:mx-0" />
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(184,157,94,0.06)_0%,transparent_50%)]" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
          <LegalDocumentBody sections={sections} />
        </div>
      </section>

      <div className="h-10" />
    </>
  );
}
