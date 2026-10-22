// app/[locale]/page.tsx - Localised home page for sq/en/de
import type { ReactNode } from "react";
import { use } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import ServicesSection from "@/components/site/ServicesSection";
import TrainingsSection from "@/components/site/TrainingsSection";
import HomeWorkSection from "@/components/site/HomeWorkSection";
import HomeTeamSection from "@/components/site/HomeTeamSection";
import HomeFaqSection from "@/components/site/HomeFaqSection";
import ValuePillarIcon from "@/components/site/ValuePillarIcon";
import HomeServicesStrip from "@/components/site/HomeServicesStrip";
import AnimateIn from "@/components/site/AnimateIn";
import GoogleReviewsSection from "@/components/site/GoogleReviewsSection";
import HeroParallaxBg from "@/components/site/HeroParallaxBg";
import TypewriterHero from "@/components/site/TypewriterHero";
import SectionDots from "@/components/site/SectionDots";
import { getYearsOfExperienceFormatted } from "@/lib/experience";
import {
  PACKAGES_BY_GROUP_AND_LOCALE,
  PACKAGE_GROUP_LABELS,
} from "@/lib/packages-data";
import { SERVICE_DETAILS_BY_LOCALE, SERVICE_SLUGS } from "@/lib/services-data";
import { buildLocalizedMetadata } from "@/lib/seo-utils";
import { CONTACT, PROJECTS_DELIVERED } from "@/lib/business-facts";
import HomeAboutSection from "@/components/site/HomeAboutSection";
import HomeContactCta from "@/components/site/HomeContactCta";
import { getVerifiedTestimonials } from "@/lib/testimonials";

type Locale = "sq" | "en" | "de";

const HERO_BY_LOCALE: Record<
  Locale,
  {
    kicker: string;
    titleA: string;
    titleB: string;
    desc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollHint: string;
    /** Trust line: first sentence, linked word(s) → /work, then rest of second sentence */
    socialProof: { beforeLink: string; linkText: string; afterLink: string };
  }
> = {
  sq: {
    kicker: "Agjenci marketingu & web · Tiranë",
    titleA: "Guxo të jesh",
    titleB: "ndryshe",
    desc: "Ndërtojmë website dhe dyqane online, menaxhojmë rrjetet sociale dhe reklamat në Meta & Google për biznese në Shqipëri dhe Europë, me objektiva të qarta dhe raportim të rregullt.",
    ctaPrimary: "Kërko ofertë",
    ctaSecondary: "Shiko shërbimet",
    scrollHint: "Zbulo më shumë",
    socialProof: {
      beforeLink: `${PROJECTS_DELIVERED} projekte të realizuara.`,
      linkText: "Shiko punët tona",
      afterLink: ".",
    },
  },
  en: {
    kicker: "Marketing & web agency · Tirana",
    titleA: "Dare to be",
    titleB: "different",
    desc: "We build websites and online stores, and run social media and Meta & Google ads for businesses in Albania and Europe, with clear objectives and regular reporting.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "View services",
    scrollHint: "Scroll to explore",
    socialProof: {
      beforeLink: `${PROJECTS_DELIVERED} projects delivered.`,
      linkText: "See our work",
      afterLink: ".",
    },
  },
  de: {
    kicker: "Marketing- & Web-Agentur · Tirana",
    titleA: "Wage es,",
    titleB: "anders zu sein",
    desc: "Wir erstellen Websites und Online-Shops und betreuen Social Media sowie Meta- & Google-Ads für Unternehmen in Albanien und Europa, mit klaren Zielen und regelmäßigem Reporting.",
    ctaPrimary: "Angebot anfragen",
    ctaSecondary: "Leistungen ansehen",
    scrollHint: "Mehr entdecken",
    socialProof: {
      beforeLink: `${PROJECTS_DELIVERED} umgesetzte Projekte.`,
      linkText: "Unsere Arbeiten ansehen",
      afterLink: ".",
    },
  },
};

const VALUE_PILLARS_HEADER: Record<
  Locale,
  { kicker: string; heading: string; tagline?: { brand: string; rest: string } }
> = {
  sq: {
    kicker: "Pse DARA",
    heading: "Si punojmë me ju",
  },
  en: {
    kicker: "Why DARA",
    heading: "How we work with you",
  },
  de: {
    kicker: "Warum DARA",
    heading: "So arbeiten wir mit Ihnen",
  },
};

type ValuePillar = { title: string; desc: ReactNode };

/** Concrete working principles (each one is backed by the process and packages pages). */
const VALUE_PILLARS_BY_LOCALE: Record<Locale, ValuePillar[]> = {
  sq: [
    { title: "Plan i personalizuar", desc: "Çdo plan nis nga biznesi, audienca dhe qëllimi juaj, jo nga një model i gatshëm." },
    { title: "Proces i qartë", desc: "Hapa të përcaktuar, aprovime nga ju në çdo fazë dhe afate të shkruara në ofertë." },
    { title: "Raportim transparent", desc: "Raporte të rregullta për çfarë u bë dhe si performoi, që të dini ku shkon buxheti." },
    { title: "Objektiva të matshme", desc: "KPI-të vendosen që në fillim, që progresi të matet kundrejt qëllimeve tuaja." },
  ],
  en: [
    { title: "Tailored plan", desc: "Every plan starts from your business, audience and goal, not a ready-made template." },
    { title: "Clear process", desc: "Defined steps, your approval at each stage and timelines written into the quote." },
    { title: "Transparent reporting", desc: "Regular reports on what was done and how it performed, so you know where the budget goes." },
    { title: "Measurable objectives", desc: "KPIs are agreed at the start, so progress is measured against your goals." },
  ],
  de: [
    { title: "Individueller Plan", desc: "Jeder Plan beginnt bei Ihrem Unternehmen, Ihrer Zielgruppe und Ihrem Ziel, nicht bei einer Vorlage." },
    { title: "Klarer Prozess", desc: "Definierte Schritte, Ihre Freigabe in jeder Phase und Zeitpläne im Angebot." },
    { title: "Transparentes Reporting", desc: "Regelmäßige Berichte darüber, was umgesetzt wurde und wie es lief, damit Sie wissen, wohin das Budget fließt." },
    { title: "Messbare Ziele", desc: "KPIs werden zu Beginn festgelegt, damit Fortschritt an Ihren Zielen gemessen wird." },
  ],
};

// Shërbimet dhe çmimet nga services-data (burim i vetëm për faqen e shërbimeve dhe kryefaqen)
const SERVICES_BY_LOCALE = SERVICE_DETAILS_BY_LOCALE;
// Service categories (indices into SERVICE_SLUGS). Training has its own section and journey.
const FILTER_TABS_BY_LOCALE: Record<Locale, { label: string; indices: number[] }[]> = {
  sq: [
    { label: "Website & teknologji", indices: [7, 8, 9, 10] }, // website, ecommerce, saas, maintenance
    { label: "Marketing & rritje", indices: [0, 1, 2, 4, 5] }, // social, content, strategy, ads, consulting
    { label: "Branding", indices: [3] },
  ],
  en: [
    { label: "Website & technology", indices: [7, 8, 9, 10] },
    { label: "Marketing & growth", indices: [0, 1, 2, 4, 5] },
    { label: "Branding", indices: [3] },
  ],
  de: [
    { label: "Website & Technologie", indices: [7, 8, 9, 10] },
    { label: "Marketing & Wachstum", indices: [0, 1, 2, 4, 5] },
    { label: "Branding", indices: [3] },
  ],
};

const SERVICE_ANCHORS = ["social-media", "content", "strategy", "branding", "ads", "consulting", "training", "website-landing", "ecommerce", "saas", "maintenance"] as const;

const PRICE_TOOLTIP_BY_LOCALE: Record<Locale, string> = {
  sq: "Çmimi varet nga scope-i dhe kohëzgjatja. Na kontaktoni për ofertë të personalizuar.",
  en: "Price depends on scope and duration. Contact us for a tailored quote.",
  de: "Der Preis hängt von Umfang und Dauer ab. Kontaktieren Sie uns für ein individuelles Angebot.",
};

const SERVICES_SECTION_COPY: Record<
  Locale,
  {
    sectionKicker: string;
    sectionTitleBefore: string;
    sectionTitleHighlight: string;
    sectionIntro: string;
    allServices: string;
    from: string;
    quoteRequest: string;
    more: string;
    requestQuoteForGroup: string;
    packagesTitle: string;
    packagesKicker: string;
    packagesTitleBefore: string;
    packagesTitleHighlight: string;
    packagesIntro: string;
    packagesAll: string;
    comparePackages: string;
  }
> = {
  sq: {
    sectionKicker: "Shërbime",
    sectionTitleBefore: "Çfarë ",
    sectionTitleHighlight: "ofrojmë",
    sectionIntro: "Zgjidhni kategorinë që ju intereson. Çdo shërbim ka faqen e vet me çfarë përfshin, procesin dhe çmimin fillestar.",
    allServices: "Të gjitha",
    from: "Nga",
    quoteRequest: "Ofertë sipas nevojës",
    more: "Më shumë",
    requestQuoteForGroup: "Kërko ofertë",
    packagesTitle: "Paketa",
    packagesKicker: "Paketa",
    packagesTitleBefore: "Paketa për ",
    packagesTitleHighlight: "çdo nevojë",
    packagesIntro: "Zgjidhje të gatshme për marketing, brand, trajnime dhe website. Paketa që përshtaten me biznesin tuaj.",
    packagesAll: "Të gjitha",
    comparePackages: "Krahaso të gjitha paketat",
  },
  en: {
    sectionKicker: "Services",
    sectionTitleBefore: "What we ",
    sectionTitleHighlight: "offer",
    sectionIntro: "Pick the area you need. Each service has its own page with what is included, the process and the starting price.",
    allServices: "All",
    from: "From",
    quoteRequest: "Quote on request",
    more: "More",
    requestQuoteForGroup: "Request a quote",
    packagesTitle: "Packages",
    packagesKicker: "Packages",
    packagesTitleBefore: "Packages for ",
    packagesTitleHighlight: "every need",
    packagesIntro: "Ready-made solutions for marketing, brand, training and website. Packages that fit your business.",
    packagesAll: "All",
    comparePackages: "Compare all packages",
  },
  de: {
    sectionKicker: "Leistungen",
    sectionTitleBefore: "Was wir ",
    sectionTitleHighlight: "anbieten",
    sectionIntro: "Wählen Sie den Bereich, den Sie brauchen. Jede Leistung hat eine eigene Seite mit Umfang, Ablauf und Einstiegspreis.",
    allServices: "Alle",
    from: "Ab",
    quoteRequest: "Angebot auf Anfrage",
    more: "Mehr",
    requestQuoteForGroup: "Angebot anfragen",
    packagesTitle: "Pakete",
    packagesKicker: "Pakete",
    packagesTitleBefore: "Pakete für ",
    packagesTitleHighlight: "jeden Bedarf",
    packagesIntro: "Fertige Lösungen für Marketing, Marke, Training und Website. Pakete, die zu Ihrem Unternehmen passen.",
    packagesAll: "Alle",
    comparePackages: "Alle Pakete vergleichen",
  },
};


const CAREER_BY_LOCALE: Record<Locale, { text: string; cta: string }> = {
  sq: { text: "Dëshironi të punoni me ne? Shikoni pozicionet dhe mundësitë e bashkëpunimit.", cta: "Karrierë" },
  en: { text: "Want to work with us? See open positions and collaboration opportunities.", cta: "Careers" },
  de: { text: "Sie möchten mit uns arbeiten? Offene Stellen und Kooperationsmöglichkeiten ansehen.", cta: "Karriere" },
};

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "DARA · Krijim website, web design Tirana & marketing digjital shqip",
    description:
      "Agjenci marketingu në Tiranë: krijim website, webshop, branding, menaxhim rrjetesh sociale dhe reklamash Meta & Google. Çmime fillestare transparente dhe përgjigje brenda 24 orëve.",
  },
  en: {
    title: "DARA Marketing Agency · Dare to be Different",
    description:
      "Marketing and web agency in Tirana: websites, online stores, branding, social media and Meta & Google ads for businesses in Albania and Europe. Transparent starting prices.",
  },
  de: {
    title: "DARA Marketing Agency · Wage es, anders zu sein",
    description:
      "Marketing- und Web-Agentur in Tirana: Websites, Online-Shops, Branding, Social Media sowie Meta- & Google-Ads für Unternehmen in Albanien und Europa. Transparente Einstiegspreise.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = (["sq", "en", "de"].includes(locale) ? locale : "en") as Locale;
  const meta = META_BY_LOCALE[l];
  return buildLocalizedMetadata({
    locale: l,
    path: "",
    title: meta.title,
    description: meta.description,
  });
}


export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeFromParams } = use(params);
  const currentLocale = (localeFromParams as Locale) || "sq";
  const locale: Locale = ["sq", "en", "de"].includes(currentLocale) ? currentLocale : "sq";

  const yearsExperienceFormatted = getYearsOfExperienceFormatted();
  const hero = HERO_BY_LOCALE[locale];
  const services = SERVICES_BY_LOCALE[locale];
  const career = CAREER_BY_LOCALE[locale];
  const pillarsHeader = VALUE_PILLARS_HEADER[locale];
  const pillars = VALUE_PILLARS_BY_LOCALE[locale];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al";
  const jsonLdByLocale: Record<Locale, string> = {
    sq: "Agjenci marketingu në Tiranë, Shqipëri: krijim website, web design, dyqan online, branding dhe marketing digjital. Website profesionale për kompani shqiptare.",
    en: "Marketing and web agency in Tirana, Albania: websites, online stores, branding, social media and paid advertising.",
    de: "Marketing- und Web-Agentur in Tirana, Albanien: Websites, Online-Shops, Branding, Social Media und Online-Werbung.",
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "@id": `${siteUrl}/#organization`,
    name: "DARA Marketing Agency",
    alternateName: locale === "sq" ? "DARA Agjenci Marketingu dhe Web Design" : undefined,
    url: siteUrl,
    inLanguage: locale === "sq" ? "sq" : locale === "de" ? "de" : "en",
    description: jsonLdByLocale[locale],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rruga Donika Kastrioti",
      addressLocality: "Tirana",
      addressRegion: "Tirana",
      addressCountry: "AL",
    },
    areaServed: { "@type": "Country", name: "Albania" },
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    sameAs: [CONTACT.social.instagram, CONTACT.social.facebook, CONTACT.social.linkedin],
    foundingDate: "2020-01-01",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 6 },
    priceRange: "€€",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* HERO - full viewport, bold typography + readability scrim */}
      <section id="hero" className="relative isolate flex min-h-screen min-h-[100dvh] flex-col justify-center overflow-hidden px-4 py-24 sm:px-6 md:px-8 sm:py-24 md:py-32">
        <HeroParallaxBg />
        {/* Global light dim: keeps astronaut/clouds vivid */}
        <div className="absolute inset-0 -z-10 bg-black/30" aria-hidden />
        {/* Left column scrim: max contrast for copy without flattening full image */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[min(100%,40rem)] bg-gradient-to-r from-black/55 via-black/25 to-transparent sm:w-[min(100%,46rem)]"
          aria-hidden
        />
        {/* Bottom edge: light black scrim for trust line + scroll */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[rgba(0,0,0,0.3)] via-[rgba(0,0,0,0.12)] to-transparent sm:h-52"
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-5xl text-center lg:text-left">
          <p className="animate-fade-in-up text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.65)] md:text-xs">
            {hero.kicker}
          </p>
          <h1 className="animate-fade-in-up animate-fade-in-up-delay-1 mt-4 font-display text-[3.35rem] font-bold leading-[0.92] tracking-tight text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.45),0_1px_3px_rgba(0,0,0,0.85)] sm:text-6xl md:text-7xl lg:text-8xl">
            {hero.titleA}{" "}
            <TypewriterHero locale={locale} initialWord={hero.titleB} />
          </h1>
          <p className="animate-fade-in-up animate-fade-in-up-delay-2 mx-auto mt-8 max-w-[38rem] text-[15px] leading-[1.75] text-white/95 [text-shadow:0_1px_20px_rgba(0,0,0,0.55)] lg:mx-0 md:text-lg lg:text-xl">
            {hero.desc}
          </p>
          <div className="animate-fade-in-up animate-fade-in-up-delay-3 mx-auto mt-12 flex w-full max-w-xl flex-col gap-3 lg:mx-0 lg:max-w-none lg:flex-row lg:flex-wrap lg:items-center lg:gap-4">
            <LocaleLink
              href="/contact"
              className="inline-flex h-14 min-h-[3.5rem] w-full min-w-0 items-center justify-center rounded-full border-2 border-[#B89D5E] bg-[#B89D5E] px-8 py-0 text-sm font-semibold text-neutral-950 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.45)] transition-all duration-300 sm:px-10 hover:border-white hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:w-auto"
            >
              {hero.ctaPrimary}
            </LocaleLink>
            <LocaleLink
              href="/services"
              className="inline-flex h-14 min-h-[3.5rem] w-full min-w-0 items-center justify-center rounded-full border-2 border-white/70 bg-black/30 px-8 py-0 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 sm:px-10 hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:w-auto"
            >
              {hero.ctaSecondary}
            </LocaleLink>
          </div>
          <p className="animate-fade-in-up animate-fade-in-up-delay-4 mx-auto mt-9 max-w-xl text-sm font-medium leading-[1.65] text-white/90 [text-shadow:2px_2px_10px_rgba(0,0,0,0.7)] lg:mx-0">
            {hero.socialProof.beforeLink}{" "}
            <LocaleLink
              href="/work"
              className="font-semibold text-[#e8cf8a] underline decoration-[#e8cf8a]/70 underline-offset-2 transition hover:text-white"
            >
              {hero.socialProof.linkText}
            </LocaleLink>
            {hero.socialProof.afterLink}
          </p>
        </div>

        <a
          href="#services-overview"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-[11px] font-medium tracking-wider text-white/85 [text-shadow:0_1px_16px_rgba(0,0,0,0.75)] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus-visible:rounded"
        >
          {hero.scrollHint}
          <svg className="h-5 w-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>

      {/* All services: compact numbered links (direct path to every service page) */}
      <HomeServicesStrip
        locale={locale}
        items={services.map((s, idx) => ({
          slug: SERVICE_SLUGS[idx],
          title: s.title,
          num: idx + 1,
        }))}
      />

      {/* How we work: concrete principles instead of abstract values */}
      <section id="values" aria-labelledby="values-heading" className="relative bg-gradient-to-b from-stone-50/90 via-white to-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center md:mb-14">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-[#6b5a38]">
              {pillarsHeader.kicker}
            </p>
            <h2 id="values-heading" className="mt-4 font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {pillarsHeader.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {pillars.map((pillar, idx) => (
              <AnimateIn key={pillar.title} delay={idx * 80} className="h-full min-h-0">
                <div className="card-glow flex h-full min-h-0 flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-7 text-center shadow-[0_2px_24px_-12px_rgba(0,0,0,0.06)] md:items-start md:text-left">
                  <ValuePillarIcon index={idx} />
                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-gray-900">{pillar.title}</h3>
                  <div className="mt-3 flex-1 text-[15px] leading-relaxed text-gray-600">{pillar.desc}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection
        locale={locale}
        services={services}
        filterTabs={FILTER_TABS_BY_LOCALE[locale]}
        serviceAnchors={SERVICE_ANCHORS}
        priceTooltip={PRICE_TOOLTIP_BY_LOCALE[locale]}
        packagesByGroup={PACKAGES_BY_GROUP_AND_LOCALE[locale]}
        packageGroupLabels={PACKAGE_GROUP_LABELS[locale]}
        testimonials={getVerifiedTestimonials(locale)}
        copy={SERVICES_SECTION_COPY[locale]}
      />

      {/* Proof: real portfolio, then public reviews */}
      <HomeWorkSection locale={locale} />
      <GoogleReviewsSection locale={locale} />

      <HomeAboutSection locale={locale} years={yearsExperienceFormatted} />

      {/* Training is a separate journey from agency services */}
      <TrainingsSection locale={locale} />

      <HomeTeamSection locale={locale} />

      <HomeFaqSection locale={locale} />

      <HomeContactCta locale={locale} />
      {/* Careers: kept secondary to the client enquiry journey */}
      <aside className="mx-auto mb-10 max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-stone-50 px-6 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-neutral-700">{career.text}</p>
          <LocaleLink
            href="/careers"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
          >
            {career.cta}
            <span aria-hidden>→</span>
          </LocaleLink>
        </div>
      </aside>

      <SectionDots locale={locale} />
    </>
  );
}
