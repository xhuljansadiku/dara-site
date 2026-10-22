import type { Locale } from "@/lib/services-data";

export type Pkg = {
  title: string;
  subtitle: string;
  price: string;
  priceOriginal?: string;
  badge?: string;
  cta?: "quote" | "consult";
  points: string[];
};

export type PackageGroup =
  | "marketing"
  | "brand"
  | "training"
  | "websiteLanding"
  | "ecommerce"
  | "saas"
  | "maintenance";

export const PACKAGE_GROUPS: PackageGroup[] = [
  "marketing",
  "brand",
  "training",
  "websiteLanding",
  "ecommerce",
  "saas",
  "maintenance",
];

export const PACKAGE_GROUP_LABELS: Record<Locale, Record<PackageGroup, string>> = {
  sq: {
    marketing: "Marketing",
    brand: "Brand",
    training: "Trajnime",
    websiteLanding: "Website & Landing Page",
    ecommerce: "E-commerce",
    saas: "SaaS & Aplikacione",
    maintenance: "Mirëmbajtje",
  },
  en: {
    marketing: "Marketing",
    brand: "Brand",
    training: "Training",
    websiteLanding: "Website & Landing Page",
    ecommerce: "E-commerce",
    saas: "SaaS & Applications",
    maintenance: "Maintenance",
  },
  de: {
    marketing: "Marketing",
    brand: "Marke",
    training: "Training",
    websiteLanding: "Website & Landing Page",
    ecommerce: "E-Commerce",
    saas: "SaaS & Anwendungen",
    maintenance: "Wartung",
  },
};

export type PackageFilterTab = { label: string; groups: PackageGroup[] };

export const PACKAGE_FILTER_TABS_BY_LOCALE: Record<Locale, PackageFilterTab[]> = {
  sq: [
    { label: "Të gjitha", groups: [] },
    { label: "Marketing", groups: ["marketing"] },
    { label: "Brand", groups: ["brand"] },
    { label: "Trajnime", groups: ["training"] },
    { label: "Website", groups: ["websiteLanding", "ecommerce", "saas"] },
    { label: "Mirëmbajtje", groups: ["maintenance"] },
  ],
  en: [
    { label: "All", groups: [] },
    { label: "Marketing", groups: ["marketing"] },
    { label: "Brand", groups: ["brand"] },
    { label: "Training", groups: ["training"] },
    { label: "Website", groups: ["websiteLanding", "ecommerce", "saas"] },
    { label: "Maintenance", groups: ["maintenance"] },
  ],
  de: [
    { label: "Alle", groups: [] },
    { label: "Marketing", groups: ["marketing"] },
    { label: "Marke", groups: ["brand"] },
    { label: "Training", groups: ["training"] },
    { label: "Website", groups: ["websiteLanding", "ecommerce", "saas"] },
    { label: "Wartung", groups: ["maintenance"] },
  ],
};

export const PACKAGES_BY_GROUP_AND_LOCALE: Record<
  Locale,
  Record<PackageGroup, Pkg[]>
> = {
  sq: {
    marketing: [
      { title: "Starter", subtitle: "Social + Content", price: "Nga 250€/muaj", points: ["Rrjete sociale", "Përmbajtje bazë", "Raportim mujor"] },
      { title: "Growth", subtitle: "+ Reklama", price: "Nga 500€/muaj", points: ["Starter +", "Meta/Google Ads", "Strategji e personalizuar"] },
      { title: "Scale", subtitle: "Paketë e plotë", price: "Ofertë", points: ["Growth +", "Konsulencë", "Optimizim i vazhdueshëm"] },
    ],
    brand: [
      { title: "Logo", subtitle: "Identitet bazë", price: "Nga 250€", points: ["Koncept logo", "2–3 drejtime", "Formatet e nevojshme"] },
      { title: "Brand Pack", subtitle: "Paketë e plotë", price: "Nga 500€", points: ["Logo +", "Paletë ngjyrash", "Style guide bazë"] },
      { title: "Full Brand", subtitle: "Identitet i plotë", price: "Ofertë", points: ["Brand Pack +", "Tone of voice", "Aplikime (kartëvizita, etj.)"] },
    ],
    training: [
      { title: "Trajnime SMM", subtitle: "1 muaj", price: "250€", points: ["1 muaj (3 herë në javë)", "12 mësime / tema", "Praktike"] },
      { title: "Trajnim SMM 1:1", subtitle: "1 muaj", price: "500€", points: ["Mësime", "Praktike", "Intensiv"] },
    ],
    websiteLanding: [
      { title: "Landing Page", subtitle: "Një faqe", price: "300€", priceOriginal: "500€", points: ["1 faqe (one-page)", "Template profesional", "Responsive (mobile)", "Form kontaktimi", "SEO bazë"] },
      { title: "Business Website", subtitle: "Multi-faqe", price: "800€", priceOriginal: "1.000€", badge: "Paketa më e zgjedhur", points: ["Deri 5–7 faqe", "Dizajn i personalizuar", "Strukturë SEO bazë", "Integrim analytics", "Panel administrimi"] },
      { title: "Premium Website", subtitle: "Dizajn unik", price: "Nga 2.000€", points: ["Dizajn unik (UI/UX)", "SEO i optimizuar", "Integrime marketingu", "Optimizim performance", "Trajnim përdorimi"] },
    ],
    ecommerce: [
      { title: "Basic Shop", subtitle: "Dyqan bazë", price: "800€", priceOriginal: "1.200€", points: ["Deri 30 produkte", "Pagesë online", "Setup transporti", "SEO bazë"] },
      { title: "Standard Shop", subtitle: "Dyqan i optimizuar", price: "Nga 1.500€", badge: "Paketa më e zgjedhur", points: ["Deri 150 produkte", "Faqe kategori të optimizuara", "Email automation bazë", "Optimizim performance"] },
      { title: "Premium Shop", subtitle: "Dyqan premium", price: "Nga 4.000€", points: ["Produkte pa limit", "UX i personalizuar", "Automatizime marketingu", "Integrime ERP/CRM", "Optimizim konvertimi"] },
    ],
    saas: [
      { title: "Software i Personalizuar", subtitle: "SaaS & Aplikacione", price: "Ofertë e personalizuar", cta: "consult", points: ["MVP, SaaS & aplikacione", "Dizajn & zhvillim i plotë", "Integrime & API", "Support pas launch"] },
    ],
    maintenance: [
      { title: "Bazë", subtitle: "Website, E-commerce, SaaS", price: "Nga 150€/muaj", points: ["Updates dhe backups", "Monitoring bazë", "Support email", "Siguri bazë", "Website, E-commerce dhe SaaS"] },
      { title: "Standard", subtitle: "+ Optimizim", price: "Nga 300€/muaj", points: ["Bazë +", "Optimizim shpejtësie", "SEO monitoring", "Raportim mujor", "Mirëmbajtje E-commerce dhe SaaS"] },
      { title: "Premium", subtitle: "Paketë e plotë", price: "Ofertë", points: ["Standard +", "Mirëmbajtje e plotë E-commerce", "Mirëmbajtje SaaS dhe aplikacione", "Optimizim i vazhdueshëm", "Support prioritet"] },
    ],
  },
  en: {
    marketing: [
      { title: "Starter", subtitle: "Social + Content", price: "From €250/mo", points: ["Social media", "Basic content", "Monthly reporting"] },
      { title: "Growth", subtitle: "+ Ads", price: "From €500/mo", points: ["Starter +", "Meta/Google ads", "Custom strategy"] },
      { title: "Scale", subtitle: "Full package", price: "On request", points: ["Growth +", "Consulting", "Ongoing optimization"] },
    ],
    brand: [
      { title: "Logo", subtitle: "Basic identity", price: "From €250", points: ["Logo concept", "2–3 directions", "Required formats"] },
      { title: "Brand Pack", subtitle: "Full package", price: "From €500", points: ["Logo +", "Colour palette", "Basic style guide"] },
      { title: "Full Brand", subtitle: "Complete identity", price: "On request", points: ["Brand Pack +", "Tone of voice", "Applications (cards, etc.)"] },
    ],
    training: [
      { title: "SMM Training", subtitle: "1 month", price: "€250", points: ["1 month (3 times per week)", "12 lessons / topics", "Practical exercises"] },
      { title: "SMM 1:1 Training", subtitle: "1 month", price: "€500", points: ["Lessons", "Practical exercises", "Intensive"] },
    ],
    websiteLanding: [
      { title: "Landing Page", subtitle: "Single page", price: "€300", priceOriginal: "€500", points: ["1 page (one-page)", "Professional template", "Responsive (mobile)", "Contact form", "Basic SEO"] },
      { title: "Business Website", subtitle: "Multi-page", price: "€800", priceOriginal: "€1,000", badge: "Most popular package", points: ["Up to 5–7 pages", "Custom design", "Basic SEO structure", "Analytics integration", "Admin panel"] },
      { title: "Premium Website", subtitle: "Unique design", price: "From €2,000", points: ["Unique design (UI/UX)", "Optimised SEO", "Marketing integrations", "Performance optimisation", "Usage training"] },
    ],
    ecommerce: [
      { title: "Basic Shop", subtitle: "Basic store", price: "€800", priceOriginal: "€1,200", points: ["Up to 30 products", "Online payment", "Shipping setup", "Basic SEO"] },
      { title: "Standard Shop", subtitle: "Optimised store", price: "From €1,500", badge: "Most popular package", points: ["Up to 150 products", "Optimised category pages", "Basic email automation", "Performance optimisation"] },
      { title: "Premium Shop", subtitle: "Premium store", price: "From €4,000", points: ["Unlimited products", "Custom UX", "Marketing automation", "ERP/CRM integrations", "Conversion optimisation"] },
    ],
    saas: [
      { title: "Custom Software", subtitle: "SaaS & Applications", price: "Custom quote", cta: "consult", points: ["MVP, SaaS & applications", "Full design & development", "Integrations & API", "Post-launch support"] },
    ],
    maintenance: [
      { title: "Basic", subtitle: "Website, E-commerce, SaaS", price: "From €150/mo", points: ["Updates and backups", "Basic monitoring", "Email support", "Basic security", "Website, E-commerce and SaaS"] },
      { title: "Standard", subtitle: "+ Optimization", price: "From €300/mo", points: ["Basic +", "Speed optimization", "SEO monitoring", "Monthly reporting", "E-commerce and SaaS maintenance"] },
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
      { title: "Logo", subtitle: "Basis-Identität", price: "Ab 250€", points: ["Logo-Konzept", "2–3 Richtungen", "Erforderliche Formate"] },
      { title: "Brand Pack", subtitle: "Vollpaket", price: "Ab 500€", points: ["Logo +", "Farbpalette", "Basis-Styleguide"] },
      { title: "Full Brand", subtitle: "Komplette Identität", price: "Auf Anfrage", points: ["Brand Pack +", "Tone of Voice", "Anwendungen (Karten etc.)"] },
    ],
    training: [
      { title: "SMM Training", subtitle: "1 Monat", price: "250€", points: ["1 Monat (3× pro Woche)", "12 Lektionen / Themen", "Praktische Übungen"] },
      { title: "SMM 1:1 Training", subtitle: "1 Monat", price: "500€", points: ["Lektionen", "Praktische Übungen", "Intensiv"] },
    ],
    websiteLanding: [
      { title: "Landing Page", subtitle: "Eine Seite", price: "300€", priceOriginal: "500€", points: ["1 Seite (One-Page)", "Professionelles Template", "Responsive (Mobile)", "Kontaktformular", "Basis-SEO"] },
      { title: "Business Website", subtitle: "Mehrseitig", price: "800€", priceOriginal: "1.000€", badge: "Beliebtestes Paket", points: ["Bis 5–7 Seiten", "Individuelles Design", "Basis-SEO-Struktur", "Analytics-Integration", "Admin-Panel"] },
      { title: "Premium Website", subtitle: "Einzigartiges Design", price: "Ab 2.000€", points: ["Einzigartiges Design (UI/UX)", "Optimiertes SEO", "Marketing-Integrationen", "Performance-Optimierung", "Nutzerschulung"] },
    ],
    ecommerce: [
      { title: "Basic Shop", subtitle: "Basis-Shop", price: "800€", priceOriginal: "1.200€", points: ["Bis 30 Produkte", "Online-Zahlung", "Versand-Setup", "Basis-SEO"] },
      { title: "Standard Shop", subtitle: "Optimierter Shop", price: "Ab 1.500€", badge: "Beliebtestes Paket", points: ["Bis 150 Produkte", "Optimierte Kategorieseiten", "Basis E-Mail-Automatisierung", "Performance-Optimierung"] },
      { title: "Premium Shop", subtitle: "Premium-Shop", price: "Ab 4.000€", points: ["Unbegrenzte Produkte", "Individuelles UX", "Marketing-Automatisierung", "ERP/CRM-Integrationen", "Conversion-Optimierung"] },
    ],
    saas: [
      { title: "individuelle Software", subtitle: "SaaS & Anwendungen", price: "Individuelles Angebot", cta: "consult", points: ["MVP, SaaS & Anwendungen", "Vollständiges Design & Entwicklung", "Integrationen & API", "Support nach Launch"] },
    ],
    maintenance: [
      { title: "Basis", subtitle: "Website, E-Commerce, SaaS", price: "Ab 150€/Monat", points: ["Updates und Backups", "Basis-Monitoring", "E-Mail-Support", "Basis-Sicherheit", "Website, E-Commerce und SaaS"] },
      { title: "Standard", subtitle: "+ Optimierung", price: "Ab 300€/Monat", points: ["Basis +", "Geschwindigkeitsoptimierung", "SEO-Monitoring", "Monatsreporting", "E-Commerce- und SaaS-Wartung"] },
      { title: "Premium", subtitle: "Vollpaket", price: "Auf Anfrage", points: ["Standard +", "Vollständige E-Commerce-Wartung", "SaaS- und Anwendungs-Wartung", "Laufende Optimierung", "Prioritäts-Support"] },
    ],
  },
};

/**
 * Billing / exclusion notes shown under a package group. Only facts stated elsewhere on the
 * site are listed here (ad spend: ads service price note; monthly billing: "/month" prices).
 */
export const PACKAGE_GROUP_NOTES: Record<Locale, Partial<Record<PackageGroup, string>>> = {
  sq: {
    marketing: "Çmimet janë mujore. Buxheti i reklamave në Meta/Google nuk përfshihet dhe paguhet veçmas nga ju.",
    maintenance: "Çmimet janë mujore.",
  },
  en: {
    marketing: "Prices are monthly. Meta/Google ad spend is not included and is paid separately by you.",
    maintenance: "Prices are monthly.",
  },
  de: {
    marketing: "Monatliche Preise. Das Werbebudget für Meta/Google ist nicht enthalten und wird separat von Ihnen bezahlt.",
    maintenance: "Monatliche Preise.",
  },
};

const PACKAGE_GROUP_SERVICE: Record<Exclude<PackageGroup, "training">, string> = {
  marketing: "social-media",
  brand: "branding",
  websiteLanding: "website-landing",
  ecommerce: "ecommerce",
  saas: "saas",
  maintenance: "maintenance",
};

/** Where a package CTA leads: training has its own registration; everything else preselects the service. */
export function getPackageCtaHref(group: PackageGroup, index: number): string {
  if (group === "training") return `/trainings/register?training=${index === 1 ? "smm-1-1" : "smm"}`;
  return `/contact?service=${PACKAGE_GROUP_SERVICE[group]}`;
}
