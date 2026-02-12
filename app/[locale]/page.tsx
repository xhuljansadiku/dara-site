// app/[locale]/page.tsx - Localised home page for sq/en/de
import Image from "next/image";
import { use } from "react";
import NewsletterForm from "@/components/NewsletterForm";
import LocaleLink from "@/components/site/LocaleLink";
import ServicesSection from "@/components/site/ServicesSection";
import HomeWorkSection from "@/components/site/HomeWorkSection";
import AnimateIn from "@/components/site/AnimateIn";
import { getYearsOfExperienceFormatted } from "@/lib/experience";

type Locale = "sq" | "en" | "de";

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; titleA: string; titleB: string; desc: string; ctaPrimary: string; ctaSecondary: string; scrollHint: string; socialProof: string }
> = {
  sq: {
    kicker: "DARA MARKETING AGENCY",
    titleA: "Guxo të jesh",
    titleB: "ndryshe",
    desc: "Ndihmojmë bizneset të kthejnë ndjekësit në shitje përmes strategjisë, përmbajtjes dhe marketingut me performancë.",
    ctaPrimary: "Merr analizë falas",
    ctaSecondary: "Shërbimet",
    scrollHint: "Zbulo më shumë",
    socialProof: "100+ biznese të kënaqura",
  },
  en: {
    kicker: "DARA MARKETING AGENCY",
    titleA: "Dare to be",
    titleB: "different",
    desc: "We bring brand stories to life through bold strategies and results‑oriented marketing.",
    ctaPrimary: "Get a free audit",
    ctaSecondary: "Services",
    scrollHint: "Scroll to explore",
    socialProof: "Trusted by 100+ businesses",
  },
  de: {
    kicker: "DARA MARKETING AGENCY",
    titleA: "Wage es,",
    titleB: "anders zu sein",
    desc: "Wir bringen Marken mit mutigen Strategien und ergebnisorientiertem Marketing nach vorne.",
    ctaPrimary: "Kostenloses Audit",
    ctaSecondary: "Leistungen",
    scrollHint: "Mehr entdecken",
    socialProof: "100+ Unternehmen vertrauen uns",
  },
};

const ABOUT_BY_LOCALE: Record<Locale, { kicker: string; title: string; paragraphs: string[]; readMore: string }> = {
  sq: {
    kicker: "Rreth nesh",
    title: "Ne jemi DARA.",
    paragraphs: [
      "DARA Marketing Agency është agjencia juaj e marketingut, themeluar më 2020. Ndihmojmë bizneset të rriten përmes strategjive krijuese dhe marketingut të orientuar nga rezultatet.",
      "E udhëhequr nga filozofia “Guxo të jesh ndryshe”, besojmë se çdo brand ka një histori unike. Misioni ynë është t’ua sjellim këto histori në jetë përmes strategjive të guximshme dhe përmbajtjes që konverton.",
      "Punojmë me biznese lokale dhe ndërkombëtare, duke kombinuar kreativitetin, analizën dhe një qasje praktike për të arritur rritje të matshme.",
    ],
    readMore: "Lexo më shumë",
  },
  en: {
    kicker: "About us",
    title: "We are DARA.",
    paragraphs: [
      "DARA Marketing Agency is your marketing partner, established in 2020. We help businesses grow through creative strategies and results-oriented marketing.",
      "Driven by the philosophy “Dare to be Different”, we believe every brand has a unique story. Our mission is to bring those stories to life through bold strategies and content that converts.",
      "We work with local and international businesses, combining creativity, analysis and a hands-on approach to deliver measurable growth.",
    ],
    readMore: "Read more",
  },
  de: {
    kicker: "Über uns",
    title: "Wir sind DARA.",
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
    { value: "100+", label: "biznese të punuara" },
    { value: "AL, EU", label: "treg ndërkombëtar" },
  ],
  en: [
    { value: "", label: "years experience" }, // Will be replaced dynamically
    { value: "100+", label: "businesses worked with" },
    { value: "AL, EU", label: "international market" },
  ],
  de: [
    { value: "", label: "Jahre Erfahrung" }, // Will be replaced dynamically
    { value: "100+", label: "betreute Unternehmen" },
    { value: "AL, EU", label: "internationaler Markt" },
  ],
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
      desc: "Analizë biznesi dhe ndërtim strategjie të personalizuar për rritje reale  pozicionim, objektiva dhe ide konkrete zhvillimi.",
      price: "Nga 300€ / strategji",
    },
    {
      title: "Branding & identitet vizual",
      desc: "Krijim ose rifreskim i identitetit të brand-it  logo, udhëzues vizual, tone komunikimi dhe imazh profesional.",
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
      title: "Website & faqe uljeje",
      desc: "Faqe një-faqe (landing) ose website me disa faqe  prezencë profesionale, forma kontakt, SEO.",
      price: "Nga 400€",
    },
    {
      title: "E-commerce",
      desc: "Dyqan online me produkte, inventar, pagesë dhe dorëzim  zgjidhje e përshtatshme për shitje në internet.",
      price: "Ofertë",
    },
    {
      title: "SaaS & aplikacione",
      desc: "Aplikacione, platforma ose produkte software të personalizuara për biznese ose përdorues.",
      price: "Ofertë",
    },
    {
      title: "Mirembajtje & Optimizim",
      desc: "Mirembajtje website dhe e-commerce (updates, backups, siguri), optimizim website të vjetra (shpejtësi, SEO, modernizim), monitoring dhe support.",
      price: "Nga 100€ / muaj",
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
      desc: "Business analysis and personalized strategy for real growth  positioning, objectives and concrete ideas.",
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
      title: "Website & landing pages",
      desc: "Single-page (landing) or multi-page website  professional presence, contact forms, SEO.",
      price: "From €400",
    },
    {
      title: "E-commerce",
      desc: "Online store with products, inventory, payment and delivery  tailored solution for selling online.",
      price: "On request",
    },
    {
      title: "SaaS & applications",
      desc: "Custom applications, platforms or software products for businesses or end users.",
      price: "On request",
    },
    {
      title: "Maintenance & Optimization",
      desc: "Website and e-commerce maintenance (updates, backups, security), optimization of old websites (speed, SEO, modernization), monitoring and support.",
      price: "From €100/month",
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
      title: "Website & Landingpages",
      desc: "Einzelseiten (Landing) oder mehrseitige Website  professioneller Auftritt, Kontaktformulare, SEO.",
      price: "Ab 400€",
    },
    {
      title: "E-Commerce",
      desc: "Online-Shop mit Produkten, Lager, Zahlung und Versand  maßgeschneiderte Lösung für den Verkauf im Internet.",
      price: "Auf Anfrage",
    },
    {
      title: "SaaS & Anwendungen",
      desc: "Individuelle Anwendungen, Plattformen oder Softwareprodukte für Unternehmen oder Endnutzer.",
      price: "Auf Anfrage",
    },
    {
      title: "Wartung & Optimierung",
      desc: "Website- und E-Commerce-Wartung (Updates, Backups, Sicherheit), Optimierung alter Websites (Geschwindigkeit, SEO, Modernisierung), Monitoring und Support.",
      price: "Ab 100€ / Monat",
    },
  ],
};
// 4 service groups: strategy → content & campaigns → brand → training & build
const SERVICE_GROUP_INDICES = [
  [2, 5], // Strategy & planning (Digital Strategy, Consulting)
  [0, 1, 4], // Content & campaigns (Social, Content, Ads)
  [3], // Brand & identity (Branding)
  [6, 7, 8, 9, 10], // Training & build (Training, Website & landing, E-commerce, SaaS, Maintenance)
] as const;

const SERVICE_GROUP_LABELS: Record<Locale, [string, string, string, string]> = {
  sq: ["Strategji dhe planifikim", "Përmbajtje dhe fusha", "Brand dhe identitet", "Trajnime dhe ndërtim"],
  en: ["Strategy & planning", "Content & campaigns", "Brand & identity", "Training & build"],
  de: ["Strategie & Planung", "Content & Kampagnen", "Marke & Identität", "Training & Umsetzung"],
};

// Simple filter tabs for services: Marketing, Brand, Trajnime, Website, Mirembajtje
const FILTER_TABS_BY_LOCALE: Record<Locale, { label: string; indices: number[] }[]> = {
  sq: [
    { label: "Marketing", indices: [0, 1, 2, 4, 5] }, // social, content, strategy, ads, consulting
    { label: "Brand", indices: [3] },
    { label: "Trajnime", indices: [6] },
    { label: "Website", indices: [7, 8, 9] }, // website-landing, ecommerce, saas
    { label: "Mirembajtje", indices: [10] }, // maintenance
  ],
  en: [
    { label: "Marketing", indices: [0, 1, 2, 4, 5] },
    { label: "Brand", indices: [3] },
    { label: "Training", indices: [6] },
    { label: "Website", indices: [7, 8, 9] },
    { label: "Maintenance", indices: [10] },
  ],
  de: [
    { label: "Marketing", indices: [0, 1, 2, 4, 5] },
    { label: "Brand", indices: [3] },
    { label: "Training", indices: [6] },
    { label: "Website", indices: [7, 8, 9] },
    { label: "Wartung", indices: [10] },
  ],
};

const SERVICE_ANCHORS = ["social-media", "content", "strategy", "branding", "ads", "consulting", "training", "website-landing", "ecommerce", "saas", "maintenance"] as const;

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
type PackageGroup = "marketing" | "brand" | "training" | "website" | "maintenance";

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
    maintenance: [
      { title: "Bazë", subtitle: "Website, E-commerce, SaaS", price: "Nga 100€/muaj", points: ["Updates dhe backups", "Monitoring bazë", "Support email", "Siguri bazë", "Website, E-commerce dhe SaaS"] },
      { title: "Standard", subtitle: "+ Optimizim", price: "Nga 200€/muaj", points: ["Bazë +", "Optimizim shpejtësie", "SEO monitoring", "Raportim mujor", "Mirembajtje E-commerce dhe SaaS"] },
      { title: "Premium", subtitle: "Paketë e plotë", price: "Ofertë", points: ["Standard +", "Mirembajtje e plotë E-commerce", "Mirembajtje SaaS dhe aplikacione", "Optimizim i vazhdueshëm", "Support prioritet"] },
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
    maintenance: [
      { title: "Basic", subtitle: "Website, E-commerce, SaaS", price: "From €100/mo", points: ["Updates and backups", "Basic monitoring", "Email support", "Basic security", "Website, E-commerce and SaaS"] },
      { title: "Standard", subtitle: "+ Optimization", price: "From €200/mo", points: ["Basic +", "Speed optimization", "SEO monitoring", "Monthly reporting", "E-commerce and SaaS maintenance"] },
      { title: "Premium", subtitle: "Full package", price: "On request", points: ["Standard +", "Full E-commerce maintenance", "SaaS and applications maintenance", "Ongoing optimization", "Priority support"] },
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
    maintenance: [
      { title: "Basis", subtitle: "Website, E-Commerce, SaaS", price: "Ab 100€/Monat", points: ["Updates und Backups", "Basis-Monitoring", "E-Mail-Support", "Basis-Sicherheit", "Website, E-Commerce und SaaS"] },
      { title: "Standard", subtitle: "+ Optimierung", price: "Ab 200€/Monat", points: ["Basis +", "Geschwindigkeitsoptimierung", "SEO-Monitoring", "Monatsreporting", "E-Commerce- und SaaS-Wartung"] },
      { title: "Premium", subtitle: "Vollpaket", price: "Auf Anfrage", points: ["Standard +", "Vollständige E-Commerce-Wartung", "SaaS- und Anwendungs-Wartung", "Laufende Optimierung", "Prioritäts-Support"] },
    ],
  },
};

const TESTIMONIAL_BY_LOCALE: Record<Locale, { quote: string; name: string; role: string; company?: string }> = {
  sq: {
    quote: "DARA na ndihmoi të strukturojmë rrjetet tona sociale dhe të rrisnim shitjet. Profesionale dhe të fokusuara te rezultatet.",
    name: "Ana M.",
    role: "Menaxhere",
    company: "Don Mare Hotel",
  },
  en: {
    quote: "DARA helped us structure our social presence and increase sales. Professional and focused on results.",
    name: "Ana M.",
    role: "Manager",
    company: "Don Mare Hotel",
  },
  de: {
    quote: "DARA hat uns geholfen, unseren Social-Media-Auftritt zu strukturieren und den Umsatz zu steigern. Professionell und ergebnisorientiert.",
    name: "Ana M.",
    role: "Managerin",
    company: "Don Mare Hotel",
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
    packagesKicker: string;
    packagesTitleBefore: string;
    packagesTitleHighlight: string;
    packagesIntro: string;
    packagesAll: string;
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
    packagesKicker: "Paketa",
    packagesTitleBefore: "Paketa për ",
    packagesTitleHighlight: "çdo nevojë",
    packagesIntro: "Zgjidhje të gatshme për marketing, brand, trajnime dhe website  paketa që përshtaten me biznesin tuaj.",
    packagesAll: "Të gjitha",
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
    packagesKicker: "Packages",
    packagesTitleBefore: "Packages for ",
    packagesTitleHighlight: "every need",
    packagesIntro: "Ready-made solutions for marketing, brand, training and website  packages that fit your business.",
    packagesAll: "All",
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
    packagesKicker: "Pakete",
    packagesTitleBefore: "Pakete für ",
    packagesTitleHighlight: "jeden Bedarf",
    packagesIntro: "Fertige Lösungen für Marketing, Marke, Training und Website  Pakete, die zu Ihrem Unternehmen passen.",
    packagesAll: "Alle",
  },
};

const CTA_BY_LOCALE: Record<
  Locale,
  { title: string; subtitle: string; button: string; whyTitle: string; whyBullets: string[]; newsletterNote: string }
> = {
  sq: {
    title: "Le të punojmë bashkë dhe të krijojmë diçka të madhe",
    subtitle: "Na shkruaj për një audit të shpejtë ose për një plan konkret rritjeje.",
    button: "Merr analizë falas",
    whyTitle: "Pse DARA?",
    whyBullets: [
      "Strategji e personalizuar, jo modele të gatshme",
      "Fokus te rezultatet dhe raportimi transparent",
      "Ekip me përvojë", // Years will be added dynamically
    ],
    newsletterNote: "Pa spam. Çdoherë mund të çabonësh.",
  },
  en: {
    title: "Let’s work together and create something great",
    subtitle: "Reach out for a quick audit or a clear growth plan tailored to your business.",
    button: "Get a free audit",
    whyTitle: "Why DARA?",
    whyBullets: [
      "Tailored strategy, not one-size-fits-all",
      "Focus on results and transparent reporting",
      "Experienced team", // Years will be added dynamically
    ],
    newsletterNote: "No spam. Unsubscribe anytime.",
  },
  de: {
    title: "Lass uns gemeinsam etwas Großartiges aufbauen",
    subtitle: "Melde dich für ein schnelles Audit oder einen klaren Wachstumsplan für dein Unternehmen.",
    button: "Kostenloses Audit anfragen",
    whyTitle: "Warum DARA?",
    whyBullets: [
      "Maßgeschneiderte Strategie, keine Standardlösung",
      "Fokus auf Ergebnisse und transparentes Reporting",
      "Erfahrenes Team", // Years will be added dynamically
    ],
    newsletterNote: "Kein Spam. Jederzeit abmelden.",
  },
};

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "DARA Marketing Agency  Guxo të jesh ndryshe",
    description: "DARA Marketing Agency. Ndihmojmë bizneset të rriten përmes strategjive krijuese, marketingu digjital dhe përmbajtjes që konverton. 7+ vite përvojë, 100+ biznese.",
  },
  en: {
    title: "DARA Marketing Agency  Dare to be Different",
    description: "DARA Marketing Agency. We bring brand stories to life through bold strategies, digital marketing, and creative content. 7+ years experience, 100+ businesses.",
  },
  de: {
    title: "DARA Marketing Agency  Wage es, anders zu sein",
    description: "DARA Marketing Agency. Wir bringen Marken mit mutigen Strategien und ergebnisorientiertem Marketing nach vorne. 7+ Jahre Erfahrung, 100+ Unternehmen.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = (["sq", "en", "de"].includes(locale) ? locale : "en") as Locale;
  const meta = META_BY_LOCALE[l];
  const yearsExp = getYearsOfExperienceFormatted();
  // Replace years in description dynamically
  const description = meta.description.replace(/7\+/, yearsExp);
  const base = "https://daramarketing.eu";
  const path = l === "en" ? "" : `/${l}`;
  const url = `${base}${path}`;
  return {
    title: meta.title,
    description,
    openGraph: {
      title: meta.title,
      description,
      url,
      siteName: "DARA Marketing Agency",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: meta.title, description },
  };
}

// Use shared utility function for years of experience

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
  const serviceGroupLabels = SERVICE_GROUP_LABELS[locale];
  const cta = CTA_BY_LOCALE[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    name: "DARA Marketing Agency",
    url: "https://daramarketing.eu",
    description: "We bring brand stories to life through bold strategies and results-oriented marketing.",
    address: { "@type": "PostalAddress", streetAddress: "Rruga Donika Kastrioti, Bllok", addressLocality: "Tirana", addressCountry: "AL" },
    email: "daramarketing.eu@gmail.com",
    telephone: "+355688009988",
    sameAs: ["https://instagram.com/daramarketing.eu", "https://facebook.com/daramarketing.eu", "https://linkedin.com/company/daramarketing"],
    foundingDate: "2020-01-01",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 3 },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* HERO  background, scroll indicator, social proof, fade-in */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-4 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(200,165,92,0.08)_0%,transparent_60%)]" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-60" aria-hidden />

        <div className="mx-auto w-full max-w-3xl">
          <h1 className="animate-fade-in-up text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {hero.titleA}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#c8a55c]">{hero.titleB}</span>
              <span className="absolute bottom-1 left-0 right-0 z-0 h-3 -translate-y-0.5 bg-[#c8a55c]/25 md:bottom-1.5 md:h-4" aria-hidden />
            </span>
          </h1>
          <p className="animate-fade-in-up animate-fade-in-up-delay-1 mt-8 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
            {hero.desc}
          </p>
          <div className="animate-fade-in-up animate-fade-in-up-delay-2 mt-12 flex flex-wrap items-center gap-4">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#c8a55c] px-7 font-semibold text-black transition hover:bg-[#b6944f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a55c]"
            >
              {hero.ctaPrimary}
            </LocaleLink>
            <LocaleLink
              href="#services"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 font-medium text-white/80 transition hover:border-[#c8a55c]/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a55c]"
            >
              {hero.ctaSecondary}
            </LocaleLink>
          </div>
          <p className="animate-fade-in-up animate-fade-in-up-delay-3 mt-8 text-sm text-white/50">
            {hero.socialProof}
          </p>
        </div>

        <div className="animate-fade-in-up animate-fade-in-up-delay-4 mt-20 flex items-center gap-4 md:mt-24">
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

        <a
          href="#about"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs font-medium tracking-wider hover:text-[#c8a55c]/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a55c] focus-visible:rounded"
          aria-label={hero.scrollHint}
        >
          {hero.scrollHint}
          <svg className="h-5 w-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>

      {/* ABOUT US  scroll animations, stats visuals */}
      <section id="about" className="relative py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(160deg,transparent_0%,rgba(200,165,92,0.04)_50%,transparent_100%)]" />
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <AnimateIn>
                <span className="inline-block rounded-full border border-[#c8a55c]/30 bg-[#c8a55c]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#c8a55c]">
                  {about.kicker}
                </span>
              </AnimateIn>
              <AnimateIn delay={50}>
                <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl xl:text-5xl">
                  {about.title}
                </h2>
              </AnimateIn>
              <AnimateIn delay={100}>
                <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
                  {about.paragraphs[0]}
                </p>
              </AnimateIn>
              <AnimateIn delay={150}>
                <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
                  {about.paragraphs[1]}
                </p>
              </AnimateIn>
              {about.paragraphs[2] && (
                <AnimateIn delay={200}>
                  <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
                    {about.paragraphs[2]}
                  </p>
                </AnimateIn>
              )}
              <AnimateIn delay={250}>
                <div className="mt-10 flex flex-wrap gap-6 sm:gap-8">
                  {aboutStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <span className="text-3xl font-bold text-[#c8a55c] md:text-4xl">{stat.value}</span>
                      <span className="mt-0.5 text-sm text-white/70">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </AnimateIn>
              <AnimateIn delay={300}>
                <div className="mt-10">
                  <LocaleLink
                    href="/about"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#c8a55c] px-8 font-medium text-black transition hover:bg-[#b6944f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a55c]"
                  >
                    {about.readMore}
                  </LocaleLink>
                </div>
              </AnimateIn>
            </div>
            <AnimateIn delay={100}>
              <div className="relative lg:pl-4">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 shadow-2xl lg:aspect-auto lg:min-h-[380px]">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                    alt="DARA Marketing Agency  team and collaboration"
                    width={900}
                    height={600}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -left-2 -top-2 -z-10 h-full w-full rounded-2xl border-2 border-[#c8a55c]/20 lg:-left-4 lg:-top-4" aria-hidden />
              </div>
            </AnimateIn>
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

      {/* OUR TEAM  bios on hover, social links structure */}
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
            { name: "Ana K.", role: locale === "sq" ? "Themelues & Strategji" : locale === "de" ? "Gründerin & Strategie" : "Founder & Strategy", bio: locale === "sq" ? `${yearsExperienceFormatted} vjet në marketingu. Ekspertë në strategji dhe rritje të bizneseve.` : locale === "de" ? `${yearsExperienceFormatted} Jahre im Marketing. Experte für Strategie und Unternehmenswachstum.` : `${yearsExperienceFormatted} years in marketing. Expert in strategy and business growth.`, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=480&h=600&fit=crop", linkedin: "#", instagram: "#" },
            { name: "Marko D.", role: locale === "sq" ? "Kreativ & Design" : locale === "de" ? "Kreativ & Design" : "Creative & Design", bio: locale === "sq" ? "Krijues vizual me përvojë në branding dhe përmbajtje." : locale === "de" ? "Visueller Kreativer mit Erfahrung in Branding und Content." : "Visual creative with experience in branding and content.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&h=600&fit=crop", linkedin: "#", instagram: "#" },
            { name: "Ela R.", role: locale === "sq" ? "Social Media & Përmbajtje" : locale === "de" ? "Social Media & Content" : "Social Media & Content", bio: locale === "sq" ? "Specialist në rrjetet sociale dhe strategji përmbajtjeje." : locale === "de" ? "Spezialistin für Social Media und Content-Strategie." : "Specialist in social media and content strategy.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=480&h=600&fit=crop", linkedin: "#", instagram: "#" },
          ].map((member) => (
            <div
              key={member.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-[#c8a55c]/30 hover:shadow-[0_0_40px_rgba(200,165,92,0.08)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm text-white/90">{member.bio}</p>
                  <div className="mt-4 flex gap-3">
                    <a href={member.linkedin} className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-[#c8a55c]" aria-label="LinkedIn"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                    <a href={member.instagram} className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-[#c8a55c]" aria-label="Instagram"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-medium text-white/95">{member.name}</h3>
                <p className="mt-1 text-sm text-[#c8a55c]/90">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Modern Redesign */}
      <section className="py-16 md:py-24" aria-labelledby="cta-heading">
        <div className="relative overflow-hidden rounded-3xl border border-[#c8a55c]/30 bg-gradient-to-br from-[#1a1a1a] via-[#1f1f1f] to-[#1a1a1a] p-8 shadow-2xl shadow-black/50 md:p-12 lg:p-16">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#c8a55c]/10 via-transparent to-[#c8a55c]/5 opacity-50" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c8a55c]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#c8a55c]/5 blur-3xl" />
          
          <div className="relative z-10">
            {/* Trusted By Section */}
            <div className="mb-12 text-center">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a55c]">
                {locale === "sq" ? "NA BESOJNË" : locale === "de" ? "VERTRAUEN UNS" : "TRUSTED BY"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                {["Don Mare Hotel", "Zorada", "City Fitness", "Cara Dental", "Nova Real Estate"].map((name) => (
                  <span key={name} className="text-sm font-medium text-white/70 transition-colors hover:text-[#c8a55c]">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left Column - CTA Content */}
              <div className="space-y-8">
                <div>
                  <h2 id="cta-heading" className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                    {cta.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
                    {cta.subtitle}
                  </p>
                </div>

                {/* Why DARA Section */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#c8a55c]">
                    {cta.whyTitle}
                  </h3>
                  <ul className="space-y-4">
                    {cta.whyBullets.map((bullet, idx) => {
                      const displayBullet = idx === 2 && (bullet.includes("Ekip") || bullet.includes("team") || bullet.includes("Team"))
                        ? locale === "sq"
                          ? `Ekip me përvojë ${yearsExperienceFormatted} vjet në marketingu`
                          : locale === "de"
                          ? `Erfahrenes Team ${yearsExperienceFormatted} Jahre im Marketing`
                          : `Experienced team ${yearsExperienceFormatted} years in marketing`
                        : bullet;
                      return (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c8a55c]/20">
                            <svg className="h-3 w-3 text-[#c8a55c]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm leading-relaxed text-white/90 md:text-base">{displayBullet}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* CTA Button */}
                <LocaleLink
                  href="/contact"
                  className="group relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#c8a55c] to-[#b6944f] px-8 font-semibold text-black shadow-lg shadow-[#c8a55c]/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c8a55c]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a55c] sm:w-auto"
                >
                  <span className="relative z-10">{cta.button}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </LocaleLink>
              </div>

              {/* Right Column - Contact & Newsletter */}
              <div className="flex flex-col gap-8 lg:justify-between">
                {/* Contact Section */}
                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8a55c]">
                    {locale === "sq" ? "KONTAKT" : locale === "de" ? "KONTAKT" : "CONTACT"}
                  </h4>
                  <div className="space-y-4 text-sm text-white/80">
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 shrink-0 text-[#c8a55c]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:daramarketing.eu@gmail.com" className="transition-colors hover:text-[#c8a55c] focus-visible:underline">
                        daramarketing.eu@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 shrink-0 text-[#c8a55c]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+355688009988" className="transition-colors hover:text-[#c8a55c] focus-visible:underline">
                        +355 68 800 9988
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#c8a55c]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <a
                        href="https://maps.google.com/?q=Rruga+Donika+Kastrioti,+Bllok,+Tirane,+Albania"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-[#c8a55c] focus-visible:underline"
                      >
                        Rruga Donika Kastrioti, Bllok, Tiranë, Albania
                      </a>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <a 
                        href="https://instagram.com/daramarketing.eu" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-[#c8a55c]/50 hover:bg-[#c8a55c]/10"
                        aria-label="Instagram"
                      >
                        <svg className="h-5 w-5 text-white/70 transition-colors hover:text-[#c8a55c]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://facebook.com/daramarketing.eu" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-[#c8a55c]/50 hover:bg-[#c8a55c]/10"
                        aria-label="Facebook"
                      >
                        <svg className="h-5 w-5 text-white/70 transition-colors hover:text-[#c8a55c]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://linkedin.com/company/daramarketing" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-[#c8a55c]/50 hover:bg-[#c8a55c]/10"
                        aria-label="LinkedIn"
                      >
                        <svg className="h-5 w-5 text-white/70 transition-colors hover:text-[#c8a55c]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Newsletter Section */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#c8a55c]">
                    {locale === "sq" ? "NEWSLETTER" : locale === "de" ? "NEWSLETTER" : "NEWSLETTER"}
                  </h4>
                  <NewsletterForm />
                  <p className="mt-4 flex items-center gap-2 text-xs text-white/50">
                    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {cta.newsletterNote} · GDPR compliant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
