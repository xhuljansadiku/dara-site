// app/[locale]/services/website/page.tsx - Website services category page
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import { getServiceBySlug } from "@/lib/services-data";
import type { Locale } from "@/lib/services-data";
import type { Metadata } from "next";
import { use, type ReactNode } from "react";
import { buildLocalizedMetadata } from "@/lib/seo-utils";

type Props = { params: Promise<{ locale: string }> };

const WEBSITE_SLUGS = ["website-landing", "ecommerce", "saas", "maintenance"] as const;

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; title: string; subtitle: string; getQuote: string; allServices: string }
> = {
  sq: {
    kicker: "Website",
    title: "Website & Teknologji",
    subtitle:
      "Nga faqe landing dhe website te dyqane online, aplikacione dhe mirembajtje. Zgjidhje që përshtaten me nevojat e biznesit tuaj.",
    getQuote: "Merr ofertë",
    allServices: "Të gjitha shërbimet",
  },
  en: {
    kicker: "Website",
    title: "Website & Technology",
    subtitle:
      "From landing pages and websites to online stores, applications and maintenance. Solutions that fit your business needs.",
    getQuote: "Get a quote",
    allServices: "All services",
  },
  de: {
    kicker: "Website",
    title: "Website & Technologie",
    subtitle:
      "Von Landingpages und Websites bis zu Online-Shops, Anwendungen und Wartung. Lösungen, die zu Ihren Geschäftsanforderungen passen.",
    getQuote: "Angebot anfragen",
    allServices: "Alle Leistungen",
  },
};

/** Local assets where available (faster loads, consistent with detail pages) */
const SERVICE_IMAGES: Record<(typeof WEBSITE_SLUGS)[number], string> = {
  "website-landing": "/images/services/website/website-cover.jpg",
  ecommerce: "/images/services/e-commerce/e-commerce-cover.jpg",
  saas: "/images/services/website/website-1.jpg",
  maintenance: "/images/services/maintenance/maintenance-cover.jpg",
};

const SECTION_INTRO_BY_LOCALE: Record<Locale, { kicker: string; title: string }> = {
  sq: { kicker: "Oferta", title: "Zgjidhja e duhur për çdo fazë" },
  en: { kicker: "Offerings", title: "The right build for every stage" },
  de: { kicker: "Angebot", title: "Die passende Lösung für jede Phase" },
};

const CTA_BY_LOCALE: Record<
  Locale,
  { line1: ReactNode; getQuote: string; allServices: string; backHome: string }
> = {
  sq: {
    line1: (
      <>
        Gati të filloni?
        <br />
        <span className="text-neutral-950">Na kontaktoni për një ofertë.</span>
      </>
    ),
    getQuote: "Merr ofertë",
    allServices: "Të gjitha shërbimet",
    backHome: "Kthehu në kryefaqe",
  },
  en: {
    line1: (
      <>
        Ready to get started? <span className="text-neutral-950">Contact us for a tailored quote.</span>
      </>
    ),
    getQuote: "Get a quote",
    allServices: "All services",
    backHome: "Back to home",
  },
  de: {
    line1: (
      <>
        Bereit loszulegen?
        <br />
        <span className="text-neutral-950">Kontaktieren Sie uns für ein Angebot.</span>
      </>
    ),
    getQuote: "Angebot anfragen",
    allServices: "Alle Leistungen",
    backHome: "Zur Startseite",
  },
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
    title: "Çfarë mbulon ky hub website",
    paragraphs: [
      "Kjo faqe shërben si hyrja kryesore për shërbimet e DARA që lidhen me krijim website, web design, landing pages, webshop, SaaS dhe mirëmbajtje website. Në vend që të mbajë përmbajtje të përgjithshme dhe të paqartë, ajo e ndan kërkimin sipas nevojës reale të biznesit dhe të çon te faqja përkatëse e dedikuar.",
      "Ky dallim është i rëndësishëm sepse një kompani që kërkon një landing page për lead generation nuk ka të njëjtat prioritete me një biznes që kërkon krijim dyqan online ose optimizim të një website ekzistues. Prandaj kjo faqe është ndërtuar si hub me internal links të forta drejt shërbimeve individuale dhe drejt kontaktit.",
    ],
    faqTitle: "Pyetje të shpeshta për faqet website",
    faqs: [
      { q: "A është kjo faqe e njëjtë me krijim website?", a: "Jo. Kjo është faqe kategori. Secili shërbim si website, e-commerce ose maintenance ka faqen e vet me detaje dhe canonical të veçantë." },
      { q: "A mund të nis me landing page dhe ta zgjeroj më vonë?", a: "Po. Ky është një rast i zakonshëm dhe ne e planifikojmë strukturën që të mund të zgjerohet." },
      { q: "Po nëse kam një website ekzistues?", a: "Atëherë zakonisht faqeja Maintenance & Optimization ose një audit fillestar është pika e duhur e nisjes." },
    ],
    contact: "Kërko ofertë",
    otherServices: "Shiko edhe Marketing",
  },
  en: {
    title: "What this website hub covers",
    paragraphs: [
      "This page is the main entry point for DARA's website-related services, including website design, landing pages, e-commerce builds, SaaS products, and maintenance. Instead of treating all web needs as one generic offer, it breaks them into clearer paths and routes users to the page that matches the actual business requirement.",
      "That distinction matters because a company that needs a lead-generation landing page is solving a different problem from a brand launching an online store or a business modernising an existing site. For that reason this page acts as a hub, with stronger internal links into dedicated service pages and into the contact flow.",
    ],
    faqTitle: "Website hub FAQ",
    faqs: [
      { q: "Is this the same as the website service page?", a: "No. This is a category page. Each service, such as website builds, e-commerce, or maintenance, has its own dedicated page and self-referencing canonical." },
      { q: "Can we start with a landing page and expand later?", a: "Yes. That is a common route, and we structure the build so it can grow into a broader site." },
      { q: "What if I already have a website?", a: "Then the maintenance and optimisation page, or a technical audit, is usually the best first step." },
    ],
    contact: "Request a quote",
    otherServices: "Explore Marketing",
  },
  de: {
    title: "Was dieser Website-Hub abdeckt",
    paragraphs: [
      "Diese Seite ist der zentrale Einstieg in die Website-Leistungen von DARA: Website-Erstellung, Landingpages, E-Commerce, SaaS und Wartung. Statt alle Anforderungen unter einem generischen Angebot zusammenzufassen, leitet sie den Nutzer in die Detailseite mit der passenden Suchintention weiter.",
      "Das ist wichtig, weil ein Unternehmen mit Fokus auf Lead-Generierung andere Prioritäten hat als ein Shop-Projekt oder die Modernisierung einer bestehenden Website. Deshalb fungiert diese Seite als Hub mit klaren internen Links zu den einzelnen Leistungsseiten und zur Kontaktanfrage.",
    ],
    faqTitle: "FAQ zum Website-Hub",
    faqs: [
      { q: "Ist diese Seite identisch mit der Website-Leistungsseite?", a: "Nein. Dies ist eine Kategorieseite. Jede Leistung wie Website, E-Commerce oder Wartung hat ihre eigene Detailseite mit eigener Canonical-URL." },
      { q: "Kann man mit einer Landingpage starten und später erweitern?", a: "Ja. Das ist ein häufiger Weg, und wir planen die Struktur so, dass sie später ausgebaut werden kann." },
      { q: "Was, wenn bereits eine Website existiert?", a: "Dann ist meist die Seite Wartung & Optimierung oder ein technisches Audit der richtige Einstieg." },
    ],
    contact: "Angebot anfragen",
    otherServices: "Marketing ansehen",
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
    path: "/services/website",
    title: meta.title,
    description: meta.description,
  });
}

export default function WebsiteServicesPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  const hero = HERO_BY_LOCALE[locale];
  const sectionIntro = SECTION_INTRO_BY_LOCALE[locale];
  const cta = CTA_BY_LOCALE[locale];
  const seoContent = SEO_CONTENT_BY_LOCALE[locale];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-stone-50 via-white to-stone-50/50 py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#B89D5E]/12 blur-3xl" />
          <div className="absolute right-[-20%] top-1/3 h-72 w-72 rounded-full bg-[#B89D5E]/12 blur-3xl" />
          <div className="absolute bottom-0 left-[-10%] h-56 w-56 rounded-full bg-stone-200/50 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-[#B89D5E]/30 bg-[#B89D5E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#6b5a38]">
            {hero.kicker}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg leading-relaxed text-neutral-600">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 w-full max-w-md items-center justify-center rounded-2xl bg-neutral-950 px-8 font-semibold text-white shadow-sm transition hover:bg-neutral-800 sm:mx-auto sm:w-auto md:mx-0"
            >
              {hero.getQuote}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-12 w-full max-w-md items-center justify-center rounded-2xl border-2 border-stone-300 bg-white/80 px-8 font-medium text-neutral-900 backdrop-blur-sm transition hover:border-neutral-950 hover:bg-stone-50 sm:mx-auto sm:w-auto md:mx-0"
            >
              {hero.allServices}
            </LocaleLink>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-neutral-950">{seoContent.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-600 md:text-[15px]">
                {seoContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-stone-200/90 bg-stone-50 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-neutral-950">{seoContent.faqTitle}</h2>
              <div className="mt-4 space-y-4">
                {seoContent.faqs.map((faq) => (
                  <div key={faq.q}>
                    <h3 className="text-sm font-semibold text-neutral-950">{faq.q}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{faq.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <LocaleLink
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  {seoContent.contact}
                </LocaleLink>
                <LocaleLink
                  href="/services/marketing"
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-stone-300 bg-white px-6 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950 hover:bg-stone-50"
                >
                  {seoContent.otherServices}
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="relative py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(184,157,94,0.08)_0%,transparent_55%)]" aria-hidden />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center md:mx-0 md:mb-14 md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b5a38]">
              {sectionIntro.kicker}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">
              {sectionIntro.title}
            </h2>
            <div className="mx-auto mt-4 h-px w-16 rounded-full bg-gradient-to-r from-[#B89D5E] to-transparent md:mx-0" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {WEBSITE_SLUGS.map((slug, idx) => {
              const service = getServiceBySlug(locale, slug);
              if (!service) return null;
              const imgSrc = SERVICE_IMAGES[slug];
              const isImageLeft = idx % 2 === 0;

              return (
                <AnimateIn key={slug} delay={idx * 80}>
                  <LocaleLink
                    href={`/services/${slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-sm ring-1 ring-black/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B89D5E]/35 hover:shadow-xl hover:ring-[#B89D5E]/15 md:flex-row"
                  >
                    <div
                      className={`relative h-48 w-full shrink-0 overflow-hidden md:h-auto md:min-h-[220px] md:w-72 ${
                        isImageLeft ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <Image
                        src={imgSrc}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 288px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/25 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-neutral-950/10" />
                      <span
                        className={`absolute left-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/95 text-xs font-semibold tabular-nums text-[#6b5a38] shadow-sm ring-1 ring-stone-200/80 ${
                          isImageLeft ? "md:left-4" : "md:right-4 md:left-auto"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div
                      className={`flex flex-1 flex-col justify-center p-6 text-center md:p-8 md:text-left ${
                        isImageLeft ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <h3 className="text-xl font-semibold tracking-tight text-neutral-950 transition-colors group-hover:text-[#B89D5E]">
                        {service.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                        {service.desc}
                      </p>
                      {service.price && (
                        <p className="mt-3 text-sm font-medium text-neutral-900">{service.price}</p>
                      )}
                      <span className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[#6b5a38] transition group-hover:gap-2 md:justify-start">
                        {locale === "sq"
                          ? "Lexo më shumë"
                          : locale === "de"
                            ? "Mehr erfahren"
                            : "Read more"}
                        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </div>
                  </LocaleLink>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone-200/80 bg-gradient-to-b from-stone-50/60 to-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-stone-200/90 bg-white p-6 text-center shadow-sm ring-1 ring-black/[0.03] md:p-10">
            <h2 className="max-w-xl text-xl font-semibold leading-snug text-neutral-800 md:max-w-none md:text-2xl">
              {cta.line1}
            </h2>
            <div className="flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2.5">
              <LocaleLink
                href="/contact"
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-neutral-950 px-6 font-medium text-white transition hover:bg-neutral-800 sm:w-auto"
              >
                {cta.getQuote}
              </LocaleLink>
              <LocaleLink
                href="/services"
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl border-2 border-stone-300 bg-white px-6 font-medium text-neutral-900 transition hover:border-neutral-950 hover:bg-stone-50 sm:w-auto"
              >
                {cta.allServices}
              </LocaleLink>
              <LocaleLink
                href="/"
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl border-2 border-stone-300 bg-white px-6 font-medium text-neutral-900 transition hover:border-neutral-950 hover:bg-stone-50 sm:w-auto"
              >
                {cta.backHome}
              </LocaleLink>
            </div>
          </div>
        </div>
      </section>

      <div className="h-4" />
    </>
  );
}
