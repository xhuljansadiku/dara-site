// app/[locale]/page.tsx - Localised home page for sq/en/de
import Image from "next/image";
import { use } from "react";
import NewsletterForm from "@/components/NewsletterForm";
import LocaleLink from "@/components/site/LocaleLink";
import ServicesSection from "@/components/site/ServicesSection";
import HomeWorkSection from "@/components/site/HomeWorkSection";

type Locale = "sq" | "en" | "de";

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; titleA: string; titleB: string; desc: string; ctaPrimary: string; ctaSecondary: string }
> = {
  sq: {
    kicker: "DARA MARKETING AGENCY",
    titleA: "Guxo të jesh",
    titleB: "ndryshe",
    desc: "Ndihmojmë bizneset të kthejnë ndjekësit në shitje përmes strategjisë, përmbajtjes dhe marketingut me performancë.",
    ctaPrimary: "Na kontakto",
    ctaSecondary: "Shërbimet",
  },
  en: {
    kicker: "DARA MARKETING AGENCY",
    titleA: "Dare to be",
    titleB: "different",
    desc: "We bring brand stories to life through bold strategies and results‑oriented marketing.",
    ctaPrimary: "Contact us",
    ctaSecondary: "Services",
  },
  de: {
    kicker: "DARA MARKETING AGENCY",
    titleA: "Wage es,",
    titleB: "anders zu sein",
    desc: "Wir bringen Marken mit mutigen Strategien und ergebnisorientiertem Marketing nach vorne.",
    ctaPrimary: "Kontaktiere uns",
    ctaSecondary: "Leistungen",
  },
};

const ABOUT_BY_LOCALE: Record<Locale, { kicker: string; title: string; paragraphs: string[]; readMore: string }> = {
  sq: {
    kicker: "Rreth nesh",
    title: "Ne jemi DARA.",
    paragraphs: [
      "DARA Marketing Agency është agjencia juaj e marketingut, themeluar më 1 maj 2022. Ndihmojmë bizneset të rriten përmes strategjive krijuese dhe marketingut të orientuar nga rezultatet.",
      "E udhëhequr nga filozofia “Guxo të jesh ndryshe”, besojmë se çdo brand ka një histori unike. Misioni ynë është t’ua sjellim këto histori në jetë përmes strategjive të guximshme dhe përmbajtjes që konverton.",
      "Punojmë me biznese lokale dhe ndërkombëtare, duke kombinuar kreativitetin, analizën dhe një qasje praktike për të arritur rritje të matshme.",
    ],
    readMore: "Lexo më shumë",
  },
  en: {
    kicker: "About us",
    title: "We are DARA.",
    paragraphs: [
      "DARA Marketing Agency is your marketing partner, established on 1 May 2022. We help businesses grow through creative strategies and results-oriented marketing.",
      "Driven by the philosophy “Dare to be Different”, we believe every brand has a unique story. Our mission is to bring those stories to life through bold strategies and content that converts.",
      "We work with local and international businesses, combining creativity, analysis and a hands-on approach to deliver measurable growth.",
    ],
    readMore: "Read more",
  },
  de: {
    kicker: "Über uns",
    title: "Wir sind DARA.",
    paragraphs: [
      "DARA Marketing Agency ist Ihre Marketing-Partnerin, gegründet am 1. Mai 2022. Wir helfen Unternehmen beim Wachstum durch kreative Strategien und ergebnisorientiertes Marketing.",
      "Geleitet von der Philosophie „Wage es, anders zu sein“, glauben wir, dass jede Marke eine einzigartige Geschichte hat. Unsere Mission ist es, diese Geschichten durch mutige Strategien und konvertierenden Content zum Leben zu erwecken.",
      "Wir arbeiten mit lokalen und internationalen Unternehmen und verbinden Kreativität, Analyse und einen praxisnahen Ansatz für messbares Wachstum.",
    ],
    readMore: "Mehr erfahren",
  },
};

const ABOUT_STATS_BY_LOCALE: Record<Locale, string[]> = {
  sq: ["7+ vite eksperiencë", "50+ biznese të punuara", "EU, AL, treg ndërkombëtar"],
  en: ["7+ years experience", "50+ businesses worked with", "EU, AL, international market"],
  de: ["7+ Jahre Erfahrung", "50+ betreute Unternehmen", "EU, AL, internationaler Markt"],
};

const SERVICES_BY_LOCALE: Record<Locale, { title: string; desc: string; price?: string }[]> = {
  sq: [
    {
      title: "Menaxhim i rrjeteve sociale",
      desc: "Strategji përmbajtjeje, krijim postimesh, planifikim dhe analizë performance për rritje të prezencës dhe angazhimit.",
      price: "Nga 250€ / muaj",
    },
    {
      title: "Krijim përmbajtjeje",
      desc: "Foto, video, reels dhe materiale kreative që reflektojnë identitetin e brand-it dhe tërheqin audiencën e duhur.",
    },
    {
      title: "Strategji marketingu digjital",
      desc: "Analizë biznesi dhe ndërtim strategjie të personalizuar për rritje reale — pozicionim, objektiva dhe ide konkrete zhvillimi.",
      price: "Nga 300€ / strategji",
    },
    {
      title: "Branding & identitet vizual",
      desc: "Krijim ose rifreskim i identitetit të brand-it — logo, udhëzues vizual, tone komunikimi dhe imazh profesional.",
    },
    {
      title: "Menaxhim reklamash (Meta & Google)",
      desc: "Krijim dhe optimizim fushatash reklamash në Meta & Google për rritje shitjesh, lead‑esh dhe njohje brand-i.",
      price: "Nga 150€ / muaj (pa buxhetin e reklamës)",
    },
    {
      title: "Konsulencë marketingu",
      desc: "Konsulencë strategjike për biznese ose individë që duan të rrisin performancën dhe të qartësojnë drejtimin e marketingut.",
      price: "Nga 80€ / seancë",
    },
    {
      title: "Trajnime marketingu & rrjete sociale",
      desc: "Trajnime praktike për biznese dhe individë që duan të mësojnë marketingun, rrjetet sociale dhe strategjitë digjitale.",
      price: "Nga 250€ / program",
    },
    {
      title: "Website, E‑commerce & SaaS",
      desc: "Website, e‑commerce dhe produkte software të personalizuara për individë ose kompani.",
    },
  ],
  en: [
    {
      title: "Social Media Management",
      desc: "Content strategy, post creation, planning and performance analysis to increase brand presence and engagement.",
      price: "From €250/month",
    },
    {
      title: "Content Creation",
      desc: "Photos, videos, reels and creative materials to reflect brand identity and attract the right audience.",
    },
    {
      title: "Digital Marketing Strategy",
      desc: "Business analysis and personalized strategy for real growth — positioning, objectives and concrete ideas.",
      price: "From €300/strategy",
    },
    {
      title: "Branding & Visual Identity",
      desc: "Logo, visual guidelines, communication tone and professional image for a strong market presence.",
    },
    {
      title: "Ads Management (Meta & Google)",
      desc: "Creation and optimisation of Meta & Google campaigns to increase sales, leads and brand recognition.",
      price: "From €150/month (ad spend not included)",
    },
    {
      title: "Marketing Consulting",
      desc: "Strategic consulting to increase performance, clarify direction and make smarter decisions.",
      price: "From €80/session",
    },
    {
      title: "Marketing & Social Media Training",
      desc: "Practical training on marketing, social media and digital strategies in an applicable, hands‑on way.",
      price: "From €250/program",
    },
    {
      title: "Website, E‑commerce & SaaS",
      desc: "Custom websites, e‑commerce and software products for individuals or companies.",
    },
  ],
  de: [
    {
      title: "Social Media Management",
      desc: "Content‑Strategie, Beitragserstellung, Planung und Performance‑Analyse, um Reichweite und Engagement der Marke zu steigern.",
      price: "Ab 250€ / Monat",
    },
    {
      title: "Content Creation",
      desc: "Fotos, Videos, Reels und kreative Inhalte, die die Markenidentität widerspiegeln und die richtige Zielgruppe anziehen.",
    },
    {
      title: "Digitale Marketingstrategie",
      desc: "Business‑Analyse und individuelle Strategie für echtes Wachstum – Positionierung, Ziele und konkrete Maßnahmen.",
      price: "Ab 300€ / Strategie",
    },
    {
      title: "Branding & visuelle Identität",
      desc: "Entwicklung oder Refresh der Markenidentität – Logo, Styleguide, Tonalität und professionelles Markenbild.",
    },
    {
      title: "Ads Management (Meta & Google)",
      desc: "Erstellung und Optimierung von Kampagnen auf Meta & Google, um Verkäufe, Leads und Markenbekanntheit zu steigern.",
      price: "Ab 150€ / Monat (exkl. Media‑Budget)",
    },
    {
      title: "Marketing‑Beratung",
      desc: "Strategische Beratung für Unternehmen oder Einzelpersonen, die ihre Performance steigern und ihren Marketingkurs klären möchten.",
      price: "Ab 80€ / Session",
    },
    {
      title: "Marketing‑ & Social‑Media‑Trainings",
      desc: "Praxisnahe Trainings für Unternehmen und Einzelpersonen zu Marketing, Social Media und digitalen Strategien.",
      price: "Ab 250€ / Programm",
    },
    {
      title: "Website, E‑Commerce & SaaS",
      desc: "Individuelle Websites, E‑Commerce‑Lösungen und Softwareprodukte für Privatpersonen oder Unternehmen.",
    },
  ],
};
// 4 service groups: strategy → content & campaigns → brand → training & build
const SERVICE_GROUP_INDICES = [
  [2, 5], // Strategy & planning (Digital Strategy, Consulting)
  [0, 1, 4], // Content & campaigns (Social, Content, Ads)
  [3], // Brand & identity (Branding)
  [6, 7], // Training & build (Training, Website)
] as const;

const SERVICE_GROUP_LABELS: Record<Locale, [string, string, string, string]> = {
  sq: ["Strategji dhe planifikim", "Përmbajtje dhe fusha", "Brand dhe identitet", "Trajnime dhe ndërtim"],
  en: ["Strategy & planning", "Content & campaigns", "Brand & identity", "Training & build"],
  de: ["Strategie & Planung", "Content & Kampagnen", "Marke & Identität", "Training & Umsetzung"],
};

// Simple filter tabs for services: Marketing, Brand, Trajnime, Website
const FILTER_TABS_BY_LOCALE: Record<Locale, { label: string; indices: number[] }[]> = {
  sq: [
    { label: "Marketing", indices: [0, 1, 2, 4, 5] }, // social, content, strategy, ads, consulting
    { label: "Brand", indices: [3] },
    { label: "Trajnime", indices: [6] },
    { label: "Website", indices: [7] },
  ],
  en: [
    { label: "Marketing", indices: [0, 1, 2, 4, 5] },
    { label: "Brand", indices: [3] },
    { label: "Training", indices: [6] },
    { label: "Website", indices: [7] },
  ],
  de: [
    { label: "Marketing", indices: [0, 1, 2, 4, 5] },
    { label: "Brand", indices: [3] },
    { label: "Training", indices: [6] },
    { label: "Website", indices: [7] },
  ],
};

const SERVICE_ANCHORS = ["social-media", "content", "strategy", "branding", "ads", "consulting", "training", "website"] as const;

const PRICE_TOOLTIP_BY_LOCALE: Record<Locale, string> = {
  sq: "Çmimi varet nga scope-i dhe kohëzgjatja. Na kontaktoni për ofertë të personalizuar.",
  en: "Price depends on scope and duration. Contact us for a tailored quote.",
  de: "Der Preis hängt von Umfang und Dauer ab. Kontaktieren Sie uns für ein individuelles Angebot.",
};

const RESULT_BY_SERVICE_INDEX: Record<Locale, Record<number, string>> = {
  sq: { 0: "+40% angazhim mesatar", 4: "Më shumë lead dhe konvertime" },
  en: { 0: "+40% avg. engagement", 4: "More leads & conversions" },
  de: { 0: "+40 % durchschn. Engagement", 4: "Mehr Leads & Konversionen" },
};

type Pkg = { title: string; subtitle: string; price: string; points: string[] };
type PackageGroup = "marketing" | "brand" | "training" | "website";

const PACKAGES_BY_GROUP_AND_LOCALE: Record<Locale, Record<PackageGroup, Pkg[]>> = {
  sq: {
    marketing: [
      { title: "Starter", subtitle: "Social + Content", price: "Nga 250€/muaj", points: ["Rrjete sociale", "Përmbajtje bazë", "Raportim mujor"] },
      { title: "Growth", subtitle: "+ Reklama", price: "Nga 500€/muaj", points: ["Starter +", "Meta/Google Ads", "Strategji e personalizuar"] },
      { title: "Scale", subtitle: "Paketë e plotë", price: "Ofertë", points: ["Growth +", "Konsulencë", "Optimizim i vazhdueshëm"] },
    ],
    brand: [
      { title: "Logo", subtitle: "Identitet bazë", price: "Nga 300€", points: ["Koncept logo", "2–3 drejtime", "Formatet e nevojshme"] },
      { title: "Brand Pack", subtitle: "Paketë e plotë", price: "Nga 600€", points: ["Logo +", "Paletë ngjyrash", "Style guide bazë"] },
      { title: "Full Brand", subtitle: "Identitet i plotë", price: "Ofertë", points: ["Brand Pack +", "Tone of voice", "Aplikime (kartëvizita, etj.)"] },
    ],
    training: [
      { title: "1 Ditë", subtitle: "Workshop", price: "Nga 250€", points: ["1 sesion", "Materiale digitale", "Pyetje-përgjigje"] },
      { title: "2 Ditë", subtitle: "Program i plotë", price: "Nga 450€", points: ["2 ditë", "Ushtrime praktike", "Rekomandime pas trajnimit"] },
      { title: "Custom", subtitle: "Për ekipin tuaj", price: "Ofertë", points: ["Modulet e nevojshme", "Kohëzgjatje fleksibël", "Ndjekje opsionale"] },
    ],
    website: [
      { title: "Landing", subtitle: "Një faqe", price: "Nga 400€", points: ["1 faqe konvertuese", "Dizajn i përshtatshëm", "SEO bazë"] },
      { title: "Website", subtitle: "Multi-faqe", price: "Nga 800€", points: ["5–8 faqe", "Forma kontakt", "Mobile-friendly"] },
      { title: "E-commerce / SaaS", subtitle: "Projekt i dedikuar", price: "Ofertë", points: ["Dyqan online ose app", "Integrime", "Mbështetje"] },
    ],
  },
  en: {
    marketing: [
      { title: "Starter", subtitle: "Social + Content", price: "From €250/mo", points: ["Social media", "Basic content", "Monthly reporting"] },
      { title: "Growth", subtitle: "+ Ads", price: "From €500/mo", points: ["Starter +", "Meta/Google ads", "Custom strategy"] },
      { title: "Scale", subtitle: "Full package", price: "On request", points: ["Growth +", "Consulting", "Ongoing optimization"] },
    ],
    brand: [
      { title: "Logo", subtitle: "Basic identity", price: "From €300", points: ["Logo concept", "2–3 directions", "Required formats"] },
      { title: "Brand Pack", subtitle: "Full package", price: "From €600", points: ["Logo +", "Colour palette", "Basic style guide"] },
      { title: "Full Brand", subtitle: "Complete identity", price: "On request", points: ["Brand Pack +", "Tone of voice", "Applications (cards, etc.)"] },
    ],
    training: [
      { title: "1 Day", subtitle: "Workshop", price: "From €250", points: ["1 session", "Digital materials", "Q&A"] },
      { title: "2 Days", subtitle: "Full programme", price: "From €450", points: ["2 days", "Practical exercises", "Post-training recommendations"] },
      { title: "Custom", subtitle: "For your team", price: "On request", points: ["Required modules", "Flexible duration", "Optional follow-up"] },
    ],
    website: [
      { title: "Landing", subtitle: "Single page", price: "From €400", points: ["1 conversion page", "Responsive design", "Basic SEO"] },
      { title: "Website", subtitle: "Multi-page", price: "From €800", points: ["5–8 pages", "Contact form", "Mobile-friendly"] },
      { title: "E-commerce / SaaS", subtitle: "Dedicated project", price: "On request", points: ["Online store or app", "Integrations", "Support"] },
    ],
  },
  de: {
    marketing: [
      { title: "Starter", subtitle: "Social + Content", price: "Ab 250€/Monat", points: ["Social Media", "Basis-Content", "Monatsreporting"] },
      { title: "Growth", subtitle: "+ Ads", price: "Ab 500€/Monat", points: ["Starter +", "Meta/Google Ads", "Individuelle Strategie"] },
      { title: "Scale", subtitle: "Vollpaket", price: "Auf Anfrage", points: ["Growth +", "Beratung", "Laufende Optimierung"] },
    ],
    brand: [
      { title: "Logo", subtitle: "Basis-Identität", price: "Ab 300€", points: ["Logo-Konzept", "2–3 Richtungen", "Erforderliche Formate"] },
      { title: "Brand Pack", subtitle: "Vollpaket", price: "Ab 600€", points: ["Logo +", "Farbpalette", "Basis-Styleguide"] },
      { title: "Full Brand", subtitle: "Komplette Identität", price: "Auf Anfrage", points: ["Brand Pack +", "Tone of Voice", "Anwendungen (Karten etc.)"] },
    ],
    training: [
      { title: "1 Tag", subtitle: "Workshop", price: "Ab 250€", points: ["1 Session", "Digitale Unterlagen", "Frage-Antwort"] },
      { title: "2 Tage", subtitle: "Vollprogramm", price: "Ab 450€", points: ["2 Tage", "Praktische Übungen", "Empfehlungen danach"] },
      { title: "Custom", subtitle: "Für Ihr Team", price: "Auf Anfrage", points: ["Benötigte Module", "Flexible Dauer", "Optionale Nachbetreuung"] },
    ],
    website: [
      { title: "Landing", subtitle: "Eine Seite", price: "Ab 400€", points: ["1 Conversion-Seite", "Responsives Design", "Basis-SEO"] },
      { title: "Website", subtitle: "Mehrseitig", price: "Ab 800€", points: ["5–8 Seiten", "Kontaktformular", "Mobile-friendly"] },
      { title: "E-Commerce / SaaS", subtitle: "Dediziertes Projekt", price: "Auf Anfrage", points: ["Online-Shop oder App", "Integrationen", "Support"] },
    ],
  },
};

const TESTIMONIAL_BY_LOCALE: Record<Locale, { quote: string; name: string; role: string }> = {
  sq: {
    quote: "DARA na ndihmoi të strukturojmë rrjetet tona sociale dhe të rrisnim shitjet. Profesionale dhe të fokusuara te rezultatet.",
    name: "Klient i kënaqur",
    role: "Biznes lokale",
  },
  en: {
    quote: "DARA helped us structure our social presence and increase sales. Professional and focused on results.",
    name: "Happy client",
    role: "Local business",
  },
  de: {
    quote: "DARA hat uns geholfen, unseren Social-Media-Auftritt zu strukturieren und den Umsatz zu steigern. Professionell und ergebnisorientiert.",
    name: "Zufriedener Kunde",
    role: "Lokales Unternehmen",
  },
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
  }
> = {
  sq: {
    sectionKicker: "Shërbime",
    sectionTitleBefore: "Çfarë ",
    sectionTitleHighlight: "ofrojmë",
    sectionIntro: "Të organizuara sipas qasjes: strategji → përmbajtje → brand → trajnime dhe ndërtim.",
    allServices: "Të gjitha",
    from: "Nga",
    quoteRequest: "Ofertë sipas nevojës",
    more: "Më shumë",
    requestQuoteForGroup: "Kërko ofertë për këto shërbime",
    packagesTitle: "Paketa",
  },
  en: {
    sectionKicker: "Services",
    sectionTitleBefore: "What we ",
    sectionTitleHighlight: "offer",
    sectionIntro: "Organised by approach: strategy → content → brand → training & build.",
    allServices: "All",
    from: "From",
    quoteRequest: "Quote on request",
    more: "More",
    requestQuoteForGroup: "Request quote for these services",
    packagesTitle: "Packages",
  },
  de: {
    sectionKicker: "Leistungen",
    sectionTitleBefore: "Was wir ",
    sectionTitleHighlight: "anbieten",
    sectionIntro: "Strukturiert nach Ansatz: Strategie → Content → Marke → Training & Umsetzung.",
    allServices: "Alle",
    from: "Ab",
    quoteRequest: "Angebot auf Anfrage",
    more: "Mehr",
    requestQuoteForGroup: "Angebot für diese Leistungen",
    packagesTitle: "Pakete",
  },
};

const CTA_BY_LOCALE: Record<
  Locale,
  { title: string; subtitle: string; button: string; whyTitle: string; whyBullets: string[]; newsletterNote: string }
> = {
  sq: {
    title: "Le të punojmë bashkë dhe të krijojmë diçka të madhe",
    subtitle: "Na shkruaj për një audit të shpejtë ose për një plan konkret rritjeje.",
    button: "Na kontakto",
    whyTitle: "Pse DARA?",
    whyBullets: [
      "Strategji e personalizuar, jo modele të gatshme",
      "Fokus te rezultatet dhe raportimi transparent",
      "Ekip me përvojë — 7+ vjet në marketingu",
    ],
    newsletterNote: "Pa spam. Çdoherë mund të çabonësh.",
  },
  en: {
    title: "Let’s work together and create something great",
    subtitle: "Reach out for a quick audit or a clear growth plan tailored to your business.",
    button: "Get in touch",
    whyTitle: "Why DARA?",
    whyBullets: [
      "Tailored strategy, not one-size-fits-all",
      "Focus on results and transparent reporting",
      "Experienced team — 7+ years in marketing",
    ],
    newsletterNote: "No spam. Unsubscribe anytime.",
  },
  de: {
    title: "Lass uns gemeinsam etwas Großartiges aufbauen",
    subtitle: "Melde dich für ein schnelles Audit oder einen klaren Wachstumsplan für dein Unternehmen.",
    button: "Kontaktiere uns",
    whyTitle: "Warum DARA?",
    whyBullets: [
      "Maßgeschneiderte Strategie, keine Standardlösung",
      "Fokus auf Ergebnisse und transparentes Reporting",
      "Erfahrenes Team — 7+ Jahre im Marketing",
    ],
    newsletterNote: "Kein Spam. Jederzeit abmelden.",
  },
};

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeFromParams } = use(params);
  const currentLocale = (localeFromParams as Locale) || "sq";
  const locale: Locale = ["sq", "en", "de"].includes(currentLocale) ? currentLocale : "sq";

  const hero = HERO_BY_LOCALE[locale];
  const about = ABOUT_BY_LOCALE[locale];
  const aboutStats = ABOUT_STATS_BY_LOCALE[locale];
  const services = SERVICES_BY_LOCALE[locale];
  const serviceGroupLabels = SERVICE_GROUP_LABELS[locale];
  const cta = CTA_BY_LOCALE[locale];

  return (
    <>
      {/* HERO — pa bg, i pastër */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-4 py-24 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {hero.titleA}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#c8a55c]">{hero.titleB}</span>
              <span className="absolute bottom-1 left-0 right-0 z-0 h-3 -translate-y-0.5 bg-[#c8a55c]/25 md:bottom-1.5 md:h-4" aria-hidden />
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
            {hero.desc}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#c8a55c] px-7 font-semibold text-black transition hover:bg-[#b6944f]"
            >
              {hero.ctaPrimary}
            </LocaleLink>
            <LocaleLink
              href="#services"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 font-medium text-white/80 transition hover:border-[#c8a55c]/50 hover:text-white"
            >
              {hero.ctaSecondary}
            </LocaleLink>
          </div>
        </div>

        <div className="mt-20 flex items-center gap-4 md:mt-24">
          <Image
            src="/logo.png"
            alt="DARA Marketing Agency"
            width={120}
            height={38}
            className="h-8 w-auto opacity-70"
          />
          <span className="h-px w-12 bg-white/20" aria-hidden />
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Marketing Agency
          </span>
        </div>
      </section>

      {/* ABOUT US — new design */}
      <section id="about" className="relative py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(160deg,transparent_0%,rgba(200,165,92,0.04)_50%,transparent_100%)]" />
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <span className="inline-block rounded-full border border-[#c8a55c]/30 bg-[#c8a55c]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#c8a55c]">
                {about.kicker}
              </span>
              <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl xl:text-5xl">
                {about.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
                {about.paragraphs[0]}
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
                {about.paragraphs[1]}
              </p>
              {about.paragraphs[2] && (
                <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
                  {about.paragraphs[2]}
                </p>
              )}
              <div className="mt-8">
                <LocaleLink
                  href="/about"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#c8a55c] px-8 font-medium text-black transition hover:bg-[#b6944f]"
                >
                  {about.readMore}
                </LocaleLink>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {aboutStats.map((stat) => (
                  <div
                    key={stat}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white/90"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#c8a55c]" />
                    <span>{stat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative lg:pl-4">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 shadow-2xl lg:aspect-auto lg:min-h-[380px]">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                  alt="DARA Marketing Agency — team and collaboration"
                  width={900}
                  height={600}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -left-2 -top-2 -z-10 h-full w-full rounded-2xl border-2 border-[#c8a55c]/20 lg:-left-4 lg:-top-4" />
            </div>
          </div>
        </div>
      </section>

      <ServicesSection
        locale={locale}
        services={services}
        groupIndices={SERVICE_GROUP_INDICES}
        groupLabels={serviceGroupLabels}
        filterTabs={FILTER_TABS_BY_LOCALE[locale]}
        serviceAnchors={SERVICE_ANCHORS}
        priceTooltip={PRICE_TOOLTIP_BY_LOCALE[locale]}
        resultByIndex={RESULT_BY_SERVICE_INDEX[locale]}
        packagesByGroup={PACKAGES_BY_GROUP_AND_LOCALE[locale]}
        packageFilterTabs={FILTER_TABS_BY_LOCALE[locale]}
        testimonial={TESTIMONIAL_BY_LOCALE[locale]}
        copy={SERVICES_SECTION_COPY[locale]}
      />

      <HomeWorkSection locale={locale} />

      {/* OUR TEAM - fake për momentin */}
      <section id="team" className="py-12 md:py-20">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">
            {locale === "sq" ? "Ekipi ynë" : locale === "de" ? "Unser Team" : "Our Team"}
          </p>
          <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
            {locale === "sq" ? (
              <>Njerëzit pas <span className="text-[#c8a55c]">DARA</span></>
            ) : locale === "de" ? (
              <>Die Menschen hinter <span className="text-[#c8a55c]">DARA</span></>
            ) : (
              <>The people behind <span className="text-[#c8a55c]">DARA</span></>
            )}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/70">
            {locale === "sq"
              ? "Profesionistë të marketingut dhe krijuesit që sjellin brandet në jetë."
              : locale === "de"
              ? "Marketingprofis und Kreative, die Marken zum Leben erwecken."
              : "Marketing professionals and creatives who bring brands to life."}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Ana K.", role: locale === "sq" ? "Themelues & Strategji" : locale === "de" ? "Gründerin & Strategie" : "Founder & Strategy", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=480&h=600&fit=crop" },
            { name: "Marko D.", role: locale === "sq" ? "Kreativ & Design" : locale === "de" ? "Kreativ & Design" : "Creative & Design", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&h=600&fit=crop" },
            { name: "Ela R.", role: locale === "sq" ? "Social Media & Përmbajtje" : locale === "de" ? "Social Media & Content" : "Social Media & Content", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=480&h=600&fit=crop" },
          ].map((member) => (
            <div
              key={member.name}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-[#c8a55c]/30 hover:shadow-[0_0_40px_rgba(200,165,92,0.08)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h3 className="font-medium text-white/95">{member.name}</h3>
                <p className="mt-1 text-sm text-[#c8a55c]/90">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA - LET'S WORK TOGETHER */}
      <section className="py-12 md:py-20">
        <div className="rounded-3xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-semibold md:text-4xl">
                {cta.title}
              </h2>
              <p className="mt-4 text-sm text-white/80">{cta.subtitle}</p>
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c8a55c]/90">
                  {cta.whyTitle}
                </h3>
                <ul className="mt-4 space-y-3">
                  {cta.whyBullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm text-white/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8a55c]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-2 text-sm text-white/80">
                <p>
                  <a href="mailto:daramarketing.eu@gmail.com" className="hover:text-[#c8a55c]">daramarketing.eu@gmail.com</a>
                  {" · "}
                  <a href="tel:+355688009988" className="hover:text-[#c8a55c]">+355 68 800 9988</a>
                </p>
                <p>
                  <a
                    href="https://maps.google.com/?q=Rruga+Donika+Kastrioti,+Bllok,+Tirane,+Albania"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#c8a55c]"
                  >
                    Rruga Donika Kastrioti, Bllok, Tirane, Albania
                  </a>
                </p>
                <p>
                  <a href="https://instagram.com/daramarketing.eu" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c]">Instagram</a>
                  {" · "}
                  <a href="https://facebook.com/daramarketing.eu" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c]">Facebook</a>
                  {" · "}
                  <a href="https://linkedin.com/company/daramarketing" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c]">LinkedIn</a>
                </p>
              </div>
              <div className="max-w-sm">
                <NewsletterForm />
                <p className="mt-3 text-xs text-white/50">{cta.newsletterNote}</p>
              </div>
              <LocaleLink
                href="/contact"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#c8a55c] px-6 font-medium text-black transition hover:bg-[#b6944f] sm:w-auto"
              >
                {cta.button}
              </LocaleLink>
            </div>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
