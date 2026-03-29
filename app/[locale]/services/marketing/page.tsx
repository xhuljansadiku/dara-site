// app/[locale]/services/marketing/page.tsx - Marketing services category page
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import { getServiceBySlug } from "@/lib/services-data";
import type { Locale } from "@/lib/services-data";
import type { Metadata } from "next";
import { use } from "react";

type Props = { params: Promise<{ locale: string }> };

const MARKETING_SLUGS = ["social-media", "content", "strategy", "ads", "consulting"] as const;

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; title: string; subtitle: string; getQuote: string; allServices: string }
> = {
  sq: {
    kicker: "Marketing",
    title: "Marketing Digjital",
    subtitle:
      "Nga rrjete sociale dhe përmbajtje deri te strategji, reklama dhe konsulencë.\nRritje reale për biznesin tuaj.",
    getQuote: "Merr ofertë",
    allServices: "Të gjitha shërbimet",
  },
  en: {
    kicker: "Marketing",
    title: "Digital Marketing",
    subtitle: "From social media and content to strategy, ads and consulting. Real growth for your business.",
    getQuote: "Get a quote",
    allServices: "All services",
  },
  de: {
    kicker: "Marketing",
    title: "Digitales Marketing",
    subtitle:
      "Von Social Media und Content bis Strategie, Werbung und Beratung.\nEchtes Wachstum für Ihr Unternehmen.",
    getQuote: "Angebot anfragen",
    allServices: "Alle Leistungen",
  },
};

const SERVICE_IMAGES: Record<(typeof MARKETING_SLUGS)[number], string> = {
  "social-media":
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  content:
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
  strategy:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  ads:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  consulting:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
};

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Marketing Digjital | DARA Marketing Agency",
    description:
      "Rrjete sociale, përmbajtje, strategji, reklama dhe konsulencë. Zgjidhje profesionale për rritjen e biznesit.",
  },
  en: {
    title: "Digital Marketing | DARA Marketing Agency",
    description:
      "Social media, content, strategy, ads and consulting. Professional solutions for business growth.",
  },
  de: {
    title: "Digitales Marketing | DARA Marketing Agency",
    description:
      "Social Media, Content, Strategie, Werbung und Beratung. Professionelle Lösungen für Unternehmenswachstum.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";
  const meta = META_BY_LOCALE[locale];
  return { title: meta.title, description: meta.description };
}

export default function MarketingServicesPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  const hero = HERO_BY_LOCALE[locale];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(184,157,94,0.12)_0%,transparent_60%)]" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            {hero.kicker}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-4 mx-auto max-w-2xl whitespace-pre-line text-lg text-gray-600">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex w-full flex-col items-stretch gap-4 sm:flex-row sm:justify-center">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 w-full max-w-md items-center justify-center rounded-full bg-gray-900 px-8 font-semibold text-white transition hover:bg-gray-800 sm:mx-auto sm:w-auto"
            >
              {hero.getQuote}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-12 w-full max-w-md items-center justify-center rounded-full border-2 border-gray-300 px-8 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50 sm:mx-auto sm:w-auto"
            >
              {hero.allServices}
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* 5 SERVICES */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {MARKETING_SLUGS.map((slug, idx) => {
              const service = getServiceBySlug(locale, slug);
              if (!service) return null;
              const imgSrc = SERVICE_IMAGES[slug];
              const isImageLeft = idx % 2 === 0;

              return (
                <AnimateIn key={slug} delay={idx * 80}>
                  <LocaleLink
                    href={`/services/${slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-lg md:flex-row"
                  >
                    <div
                      className={`relative h-48 w-full shrink-0 md:h-56 md:w-72 ${
                        isImageLeft ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <Image
                        src={imgSrc}
                        alt=""
                        fill
                        className="object-cover transition group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 288px"
                      />
                    </div>
                    <div
                      className={`flex flex-1 flex-col justify-center p-6 text-center md:p-8 md:text-left ${
                        isImageLeft ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <span className="font-mono text-xs tabular-nums text-gray-500">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h2 className="mt-1 text-xl font-semibold text-gray-900 transition-colors group-hover:text-[#B89D5E]">
                        {service.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                        {service.desc}
                      </p>
                      {service.price && (
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          {service.price}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-gray-600 transition-colors group-hover:text-gray-900 md:justify-start">
                        {locale === "sq"
                          ? "Lexo më shumë"
                          : locale === "de"
                          ? "Mehr erfahren"
                          : "Read more"}
                        <span className="transition group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </LocaleLink>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
