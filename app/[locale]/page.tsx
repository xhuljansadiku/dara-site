// app/[locale]/page.tsx - Localised home page for sq/en/de
import type { ReactNode } from "react";
import { use } from "react";
import NewsletterForm from "@/components/NewsletterForm";
import LocaleLink from "@/components/site/LocaleLink";
import ServicesSection from "@/components/site/ServicesSection";
import TrainingsSection from "@/components/site/TrainingsSection";
import HomeWorkSection from "@/components/site/HomeWorkSection";
import HomeTeamSection from "@/components/site/HomeTeamSection";
import HomeFaqSection from "@/components/site/HomeFaqSection";
import ValuePillarIcon from "@/components/site/ValuePillarIcon";
import HomeServicesStrip from "@/components/site/HomeServicesStrip";
import AnimateIn from "@/components/site/AnimateIn";
import MarketingVideo from "@/components/site/MarketingVideo";
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

const ABOUT_BY_LOCALE: Record<
  Locale,
  { kicker: string; titlePrefix: string; titleAccent: string; paragraphs: string[]; readMore: string }
> = {
  sq: {
    kicker: "Rreth nesh",
    titlePrefix: "Ne jemi ",
    titleAccent: "DARA.",
    paragraphs: [
      "DARA Marketing Agency është agjencia juaj e marketingut, themeluar më 2020. Ndihmojmë bizneset të rriten përmes strategjive krijuese dhe marketingut të orientuar nga rezultatet.",
      "E udhëhequr nga filozofia “Guxo të jesh ndryshe”, besojmë se çdo brand ka një histori unike. Misioni ynë është t’ua sjellim këto histori në jetë përmes strategjive të guximshme dhe përmbajtjes që konverton.",
      "Punojmë me biznese lokale dhe ndërkombëtare, duke kombinuar kreativitetin, analizën dhe një qasje praktike për të arritur rritje të matshme.",
    ],
    readMore: "Lexo më shumë",
  },
  en: {
    kicker: "About us",
    titlePrefix: "We are ",
    titleAccent: "DARA.",
    paragraphs: [
      "DARA Marketing Agency is your marketing partner, established in 2020. We help businesses grow through creative strategies and results-oriented marketing.",
      "Driven by the philosophy “Dare to be Different”, we believe every brand has a unique story. Our mission is to bring those stories to life through bold strategies and content that converts.",
      "We work with local and international businesses, combining creativity, analysis and a hands-on approach to deliver measurable growth.",
    ],
    readMore: "Read more",
  },
  de: {
    kicker: "Über uns",
    titlePrefix: "Wir sind ",
    titleAccent: "DARA.",
    paragraphs: [
      "DARA Marketing Agency ist Ihre Marketing-Partnerin, gegründet im Jahr 2020. Wir helfen Unternehmen beim Wachstum durch kreative Strategien und ergebnisorientiertes Marketing.",
      "Geleitet von der Philosophie „Wage es, anders zu sein“, glauben wir, dass jede Marke eine einzigartige Geschichte hat. Unsere Mission ist es, diese Geschichten durch mutige Strategien und konvertierenden Content zum Leben zu erwecken.",
      "Wir arbeiten mit lokalen und internationalen Unternehmen und verbinden Kreativität, Analyse und einen praxisnahen Ansatz für messbares Wachstum.",
    ],
    readMore: "Mehr erfahren",
  },
};

const ABOUT_STATS_BY_LOCALE: Record<Locale, { value: string; label: string }[]> = {
  sq: [
    { value: "", label: "vite eksperiencë" }, // Will be replaced dynamically
    { value: PROJECTS_DELIVERED, label: "projekte të realizuara" },
    { value: "AL, EU", label: "klientë në Shqipëri dhe Europë" },
  ],
  en: [
    { value: "", label: "years experience" }, // Will be replaced dynamically
    { value: PROJECTS_DELIVERED, label: "projects delivered" },
    { value: "AL, EU", label: "clients in Albania and Europe" },
  ],
  de: [
    { value: "", label: "Jahre Erfahrung" }, // Will be replaced dynamically
    { value: PROJECTS_DELIVERED, label: "umgesetzte Projekte" },
    { value: "AL, EU", label: "Kunden in Albanien und Europa" },
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

const CTA_BY_LOCALE: Record<
  Locale,
  {
    title: string;
    titleAccent: string;
    subtitle: string;
    button: string;
    stepsTitle: string;
    steps: string[];
    needTitle: string;
    need: string;
    newsletterNote: string;
  }
> = {
  sq: {
    title: "Le të flasim për",
    titleAccent: "projektin tuaj",
    subtitle: "Kërkoni ofertë për një website, dyqan online, fushatë ose audit të prezencës suaj digjitale.",
    button: "Kërko ofertë",
    stepsTitle: "Çfarë ndodh pasi dërgoni kërkesën",
    steps: [
      "Plotësoni formularin e shkurtër (rreth 2 minuta).",
      "Ju kthejmë përgjigje brenda 24 orëve, me pyetje nëse na mungon diçka.",
      "Merrni një plan të shkurtër me scope-in, afatet dhe ofertën. Pa angazhim.",
    ],
    needTitle: "Çfarë na ndihmon",
    need: "Linku i website-it ose rrjeteve sociale, qëllimi kryesor dhe, nëse e keni, një buxhet orientues.",
    newsletterNote: "Pa spam. Çabonohuni kur të doni.",
  },
  en: {
    title: "Let’s talk about",
    titleAccent: "your project",
    subtitle: "Request a quote for a website, online store, campaign or an audit of your digital presence.",
    button: "Request a quote",
    stepsTitle: "What happens after you send a request",
    steps: [
      "Fill in the short form (about 2 minutes).",
      "We reply within 24 hours, with questions if anything is missing.",
      "You receive a short plan with scope, timeline and a quote. No commitment.",
    ],
    needTitle: "What helps us",
    need: "A link to your website or social profiles, your main goal and, if you have one, an indicative budget.",
    newsletterNote: "No spam. Unsubscribe anytime.",
  },
  de: {
    title: "Sprechen wir über",
    titleAccent: "Ihr Projekt",
    subtitle: "Fragen Sie ein Angebot für Website, Online-Shop, Kampagne oder ein Audit Ihres digitalen Auftritts an.",
    button: "Angebot anfragen",
    stepsTitle: "Was nach Ihrer Anfrage passiert",
    steps: [
      "Sie füllen das kurze Formular aus (ca. 2 Minuten).",
      "Wir melden uns innerhalb von 24 Stunden, mit Rückfragen, falls etwas fehlt.",
      "Sie erhalten einen kurzen Plan mit Umfang, Zeitrahmen und Angebot. Unverbindlich.",
    ],
    needTitle: "Was uns hilft",
    need: "Ein Link zu Ihrer Website oder Ihren Social-Media-Profilen, Ihr Hauptziel und, falls vorhanden, ein Budgetrahmen.",
    newsletterNote: "Kein Spam. Jederzeit abmelden.",
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

const CONTACT_LABEL: Record<Locale, string> = { sq: "Kontakt", en: "Contact", de: "Kontakt" };

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeFromParams } = use(params);
  const currentLocale = (localeFromParams as Locale) || "sq";
  const locale: Locale = ["sq", "en", "de"].includes(currentLocale) ? currentLocale : "sq";

  const yearsExperienceFormatted = getYearsOfExperienceFormatted();
  const hero = HERO_BY_LOCALE[locale];
  const about = ABOUT_BY_LOCALE[locale];
  const aboutStatsRaw = ABOUT_STATS_BY_LOCALE[locale];
  // Replace the first stat (experience) with dynamic value
  const aboutStats = [
    { value: yearsExperienceFormatted, label: aboutStatsRaw[0].label },
    ...aboutStatsRaw.slice(1),
  ];
  const services = SERVICES_BY_LOCALE[locale];
  const cta = CTA_BY_LOCALE[locale];
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

      {/* ABOUT US */}
      <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden py-16 sm:py-20 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fafafa_0%,#f4f4f5_45%,#fafafa_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white p-5 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.03] sm:rounded-[2rem] sm:p-6 md:p-10 lg:p-12">
            <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
              <AnimateIn delay={100}>
                <div className="relative order-2 flex justify-center lg:order-1">
                  <div className="relative w-full max-w-[280px] sm:max-w-[300px]">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[1.35rem] bg-neutral-950 shadow-2xl shadow-black/25 ring-2 ring-neutral-950/10 ring-offset-4 ring-offset-white">
                      <MarketingVideo src="/video/about-dara.mp4" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>
              </AnimateIn>
              <div className="order-1 text-center lg:order-2 lg:text-left">
                <span className="inline-flex items-center justify-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500 lg:justify-start">
                  <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
                  {about.kicker}
                </span>
                <h2 id="about-heading" className="mt-4 font-display text-2xl font-semibold tracking-tight text-neutral-950 sm:mt-5 sm:text-3xl md:text-4xl xl:text-[2.75rem] xl:leading-[1.1]">
                  <span>{about.titlePrefix}</span>
                  <span className="text-gradient-gold">{about.titleAccent}</span>
                </h2>
                {about.paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={`${idx === 0 ? "mt-5 text-neutral-800" : "mt-4 text-neutral-600"} text-base leading-[1.7] md:text-lg`}
                  >
                    {paragraph}
                  </p>
                ))}
                <dl className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10 lg:justify-start">
                  {aboutStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex min-w-[140px] flex-1 flex-col-reverse rounded-2xl border-[0.5px] border-neutral-300/70 bg-neutral-50/90 px-4 py-3.5 text-center sm:min-w-[160px] sm:px-5 lg:text-left"
                    >
                      <dt className="mt-1 block text-xs font-medium text-neutral-600">{stat.label}</dt>
                      <dd className="block text-2xl font-bold tabular-nums text-neutral-950 sm:text-3xl md:text-4xl">
                        {/* Plain value: a count-up shows "0+" to crawlers that render without scrolling. */}
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-10 flex justify-center lg:justify-start">
                  <LocaleLink
                    href="/about"
                    className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full border border-neutral-950 bg-white px-8 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:bg-neutral-950 hover:text-white sm:w-auto sm:max-w-none"
                  >
                    {about.readMore}
                  </LocaleLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training is a separate journey from agency services */}
      <TrainingsSection locale={locale} />

      <HomeTeamSection locale={locale} />

      <HomeFaqSection locale={locale} />

      {/* Final CTA: what happens next + contact details */}
      <section id="contact-cta" className="relative py-16 md:py-24" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white shadow-[0_24px_64px_-32px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.04] sm:rounded-[2rem]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#B89D5E]/8 via-transparent to-transparent" aria-hidden />
            <div className="relative z-10 px-5 py-10 md:px-12 md:py-16 lg:px-16">
              <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
                {/* Left - CTA */}
                <div className="text-center lg:text-left">
                  <h2 id="cta-heading" className="font-display text-3xl font-bold leading-[1.15] text-neutral-950 md:text-4xl lg:text-[2.75rem]">
                    {cta.title} <span className="text-gradient-gold">{cta.titleAccent}</span>
                  </h2>
                  <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-600 lg:mx-0">{cta.subtitle}</p>
                  <h3 className="mt-8 text-sm font-semibold text-neutral-950">{cta.stepsTitle}</h3>
                  <ol className="mx-auto mt-4 w-full max-w-md space-y-3 text-left lg:mx-0 lg:max-w-none">
                    {cta.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-xs font-semibold text-white">
                          {idx + 1}
                        </span>
                        <span className="min-w-0 pt-0.5 text-sm leading-snug text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mx-auto mt-6 max-w-md rounded-xl bg-stone-50 px-4 py-3 text-left text-sm text-neutral-600 lg:mx-0 lg:max-w-none">
                    <span className="font-semibold text-neutral-900">{cta.needTitle}:</span> {cta.need}
                  </p>
                  <div className="mt-8 flex justify-center lg:justify-start">
                    <LocaleLink
                      href="/contact"
                      className="inline-flex h-12 w-full max-w-sm items-center justify-center rounded-full bg-neutral-950 px-8 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 sm:w-auto"
                    >
                      {cta.button}
                    </LocaleLink>
                  </div>
                </div>

                {/* Right - Contact & Newsletter (secondary) */}
                <div className="space-y-10">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-900">{CONTACT_LABEL[locale]}</h3>
                    <ul className="mt-5 space-y-4 text-sm">
                      <li>
                        <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-gray-900/80 transition hover:text-gray-900">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100" aria-hidden>
                            <svg className="h-4 w-4 text-gray-900/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </span>
                          <span className="min-w-0 break-words">{CONTACT.email}</span>
                        </a>
                      </li>
                      <li className="flex flex-wrap items-center gap-3">
                        <a href={`tel:${CONTACT.phoneE164}`} className="flex items-center gap-3 text-gray-900/80 transition hover:text-gray-900">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100" aria-hidden>
                            <svg className="h-4 w-4 text-gray-900/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </span>
                          {CONTACT.phoneDisplay}
                        </a>
                        <a
                          href={CONTACT.whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-9 items-center rounded-full bg-[#25D366]/15 px-3 text-xs font-semibold text-[#0b5c2c] ring-1 ring-[#25D366]/40 transition hover:bg-[#25D366]/25"
                        >
                          WhatsApp
                        </a>
                      </li>
                      <li>
                        <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-900/80 transition hover:text-gray-900">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100" aria-hidden>
                            <svg className="h-4 w-4 text-gray-900/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </span>
                          <span className="min-w-0">{CONTACT.address}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-900">Newsletter</h3>
                    <NewsletterForm locale={locale} />
                    <p className="mt-3 text-xs text-gray-600">{cta.newsletterNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
