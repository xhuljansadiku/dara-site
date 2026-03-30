// app/[locale]/services/marketing/page.tsx - Marketing services category page
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import { getServiceBySlug } from "@/lib/services-data";
import type { Locale } from "@/lib/services-data";
import type { Metadata } from "next";
import { use } from "react";
import { buildLocalizedMetadata } from "@/lib/seo-utils";

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

const SEO_CONTENT_BY_LOCALE: Record<
  Locale,
  {
    title: string;
    paragraphs: string[];
    faqTitle: string;
    faqs: { q: string; a: string }[];
    contact: string;
    otherServices: string;
  }
> = {
  sq: {
    title: "Çfarë mbulon kjo faqe marketingu",
    paragraphs: [
      "Kjo faqe është krijuar si hub për të gjitha shërbimet e marketingut që ofron DARA: menaxhim i rrjeteve sociale, krijim përmbajtjeje, strategji marketingu digjital, reklama Meta & Google dhe konsulencë. Qëllimi është të shmangim përmbajtjen e dyfishuar dhe t'i japim secilit shërbim një hyrje të qartë drejt faqes së vet të dedikuar.",
      "Në praktikë, bizneset rrallë kanë nevojë vetëm për një postim ose vetëm për një reklamë. Ata kanë nevojë për një sistem ku strategjia, përmbajtja, shpërndarja dhe optimizimi punojnë bashkë. Pikërisht për këtë arsye kjo faqe lidh çdo kategori me një faqe më të thelluar dhe me rrugë të qarta drejt kontaktit ose shërbimeve të tjera.",
    ],
    faqTitle: "Pyetje të shpeshta për marketingun",
    faqs: [
      { q: "A mund të marr vetëm reklama pa menaxhim rrjetesh sociale?", a: "Po. Faqet e detajuara të Ads Management dhe Consulting shpjegojnë qartë kur ka kuptim të punohet vetëm me paid media." },
      { q: "A ofroni strategji para nisjes së ekzekutimit?", a: "Po. Strategjia është zakonisht hapi i parë për të qartësuar audiencën, ofertën, kanalet dhe KPI-të." },
      { q: "Si e zgjedhim shërbimin e duhur?", a: "Nëse nuk je i sigurt, faqja e kontaktit është rruga më e mirë. Ne e filtrojmë nevojën dhe propozojmë kombinimin e duhur të shërbimeve." },
    ],
    contact: "Na kontakto",
    otherServices: "Shiko edhe Website",
  },
  en: {
    title: "What this marketing hub covers",
    paragraphs: [
      "This page works as the central entry point for DARA's marketing services: social media management, content creation, digital marketing strategy, Meta and Google Ads management, and consulting. It exists to give each topic a clear route into its own detailed page instead of forcing multiple search intents into one thin destination.",
      "In real projects, businesses rarely need only one isolated tactic. They need a connected system where strategy, messaging, creative production, distribution, and optimisation support the same commercial goal. That is why this page is designed as a hub with internal links to deeper pages and to the contact flow.",
    ],
    faqTitle: "Marketing hub FAQ",
    faqs: [
      { q: "Can I hire DARA just for ads management?", a: "Yes. The dedicated ads page explains how standalone paid media support works and when it makes sense." },
      { q: "Do you provide strategy before execution?", a: "Yes. Strategy is often the first step so goals, audience, channels, and KPIs are aligned before rollout." },
      { q: "What if I'm not sure which service fits?", a: "Use the contact page and we will map the need to the right service or service combination." },
    ],
    contact: "Contact us",
    otherServices: "Explore Website",
  },
  de: {
    title: "Was dieser Marketing-Hub abdeckt",
    paragraphs: [
      "Diese Seite ist der zentrale Einstieg in die Marketing-Leistungen von DARA: Social Media Management, Content Creation, digitale Marketingstrategie, Meta- und Google-Ads sowie Beratung. Sie bündelt das Thema nicht oberflächlich, sondern führt jede Suchintention gezielt auf eine passende Detailseite weiter.",
      "In der Praxis brauchen Unternehmen selten nur eine isolierte Maßnahme. Sie brauchen ein System, in dem Strategie, Botschaft, Creatives, Distribution und Optimierung zusammenarbeiten. Genau deshalb ist diese Seite als Hub mit internen Links zu tieferen Leistungsseiten und zur Kontaktanfrage aufgebaut.",
    ],
    faqTitle: "FAQ zum Marketing-Hub",
    faqs: [
      { q: "Kann ich DARA nur für Ads buchen?", a: "Ja. Auf der Ads-Seite erklären wir, wie ein eigenständiges Paid-Media-Setup aussieht und wann es sinnvoll ist." },
      { q: "Gibt es Strategie vor der Umsetzung?", a: "Ja. Strategie ist oft der erste Schritt, damit Zielgruppe, Kanäle, Angebot und KPIs sauber definiert sind." },
      { q: "Was, wenn ich nicht weiß, welche Leistung passt?", a: "Dann ist die Kontaktseite der beste Einstieg. Wir ordnen Ihren Bedarf dem passenden Leistungs-Setup zu." },
    ],
    contact: "Kontakt",
    otherServices: "Website ansehen",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";
  const meta = META_BY_LOCALE[locale];
  return buildLocalizedMetadata({
    locale,
    path: "/services/marketing",
    title: meta.title,
    description: meta.description,
  });
}

export default function MarketingServicesPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  const hero = HERO_BY_LOCALE[locale];
  const seoContent = SEO_CONTENT_BY_LOCALE[locale];

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

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900">{seoContent.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600 md:text-[15px]">
                {seoContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900">{seoContent.faqTitle}</h2>
              <div className="mt-4 space-y-4">
                {seoContent.faqs.map((faq) => (
                  <div key={faq.q}>
                    <h3 className="text-sm font-semibold text-gray-900">{faq.q}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <LocaleLink
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-gray-900 px-6 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  {seoContent.contact}
                </LocaleLink>
                <LocaleLink
                  href="/services/website"
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-gray-300 bg-white px-6 text-sm font-semibold text-gray-900 transition hover:border-gray-900 hover:bg-gray-50"
                >
                  {seoContent.otherServices}
                </LocaleLink>
              </div>
            </div>
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
