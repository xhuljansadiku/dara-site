// app/[locale]/services/website/page.tsx - Website services category page
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import { getServiceGroupNavItems, getServiceBySlug } from "@/lib/services-data";
import type { Locale } from "@/lib/services-data";
import type { Metadata } from "next";
import { use } from "react";

type Props = { params: Promise<{ locale: string }> };

const WEBSITE_SLUGS = ["website-landing", "ecommerce", "saas", "maintenance"] as const;

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; title: string; subtitle: string; getQuote: string; allServices: string }
> = {
  sq: {
    kicker: "Website",
    title: "Website & Teknologji",
    subtitle: "Nga faqe landing dhe website te dyqane online, aplikacione dhe mirembajtje. Zgjidhje që përshtaten me nevojat e biznesit tuaj.",
    getQuote: "Merr ofertë",
    allServices: "Të gjitha shërbimet",
  },
  en: {
    kicker: "Website",
    title: "Website & Technology",
    subtitle: "From landing pages and websites to online stores, applications and maintenance. Solutions that fit your business needs.",
    getQuote: "Get a quote",
    allServices: "All services",
  },
  de: {
    kicker: "Website",
    title: "Website & Technologie",
    subtitle: "Von Landingpages und Websites bis zu Online-Shops, Anwendungen und Wartung. Lösungen, die zu Ihren Geschäftsanforderungen passen.",
    getQuote: "Angebot anfragen",
    allServices: "Alle Leistungen",
  },
};

const SERVICE_IMAGES: Record<(typeof WEBSITE_SLUGS)[number], string> = {
  "website-landing":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  ecommerce:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  saas:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  maintenance:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
};

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Website & Teknologji | DARA Marketing Agency",
    description:
      "Website, landing pages, e-commerce, SaaS dhe mirembajtje. Zgjidhje profesionale për prezencën tuaj online.",
  },
  en: {
    title: "Website & Technology | DARA Marketing Agency",
    description:
      "Website, landing pages, e-commerce, SaaS and maintenance. Professional solutions for your online presence.",
  },
  de: {
    title: "Website & Technologie | DARA Marketing Agency",
    description:
      "Website, Landingpages, E-Commerce, SaaS und Wartung. Professionelle Lösungen für Ihre Online-Präsenz.",
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

export default function WebsiteServicesPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  const hero = HERO_BY_LOCALE[locale];
  const groups = getServiceGroupNavItems(locale);
  const websiteGroup = groups.find((g) => g.id === "website");
  const items = websiteGroup?.items ?? [];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(200,165,92,0.12)_0%,transparent_60%)]" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            {hero.kicker}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gray-900 px-8 font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
            >
              {hero.getQuote}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-300 px-8 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50 sm:w-auto"
            >
              {hero.allServices}
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* 4 SERVICES */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {WEBSITE_SLUGS.map((slug, idx) => {
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
                      className={`flex flex-1 flex-col justify-center p-6 md:p-8 ${
                        isImageLeft ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <span className="font-mono text-xs tabular-nums text-gray-500">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h2 className="mt-1 text-xl font-semibold text-gray-900 group-hover:text-[#c8a55c] transition-colors">
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
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
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
