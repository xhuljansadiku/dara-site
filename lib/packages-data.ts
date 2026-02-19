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
    maintenance: "Mirembajtje",
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
    { label: "Mirembajtje", groups: ["maintenance"] },
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
      { title: "Logo", subtitle: "Identitet bazë", price: "Nga 300€", points: ["Koncept logo", "2–3 drejtime", "Formatet e nevojshme"] },
      { title: "Brand Pack", subtitle: "Paketë e plotë", price: "Nga 600€", points: ["Logo +", "Paletë ngjyrash", "Style guide bazë"] },
      { title: "Full Brand", subtitle: "Identitet i plotë", price: "Ofertë", points: ["Brand Pack +", "Tone of voice", "Aplikime (kartëvizita, etj.)"] },
    ],
    training: [
      { title: "Trajnime SMM", subtitle: "1 muaj", price: "250€", points: ["1 muaj (3 herë në javë)", "12 mësime / tema", "Praktike"] },
      { title: "Trajnim SMM 1:1", subtitle: "1 muaj", price: "600€", points: ["Mësime", "Praktike", "Intensiv"] },
    ],
    websiteLanding: [
      { title: "Landing Page", subtitle: "Një faqe", price: "400€", priceOriginal: "450€", points: ["1 faqe (one-page)", "Template profesional", "Responsive (mobile)", "Form kontaktimi", "SEO bazë", "1 rishikim"] },
      { title: "Business Website", subtitle: "Multi-faqe", price: "900€", priceOriginal: "1,200€", badge: "Paketa më e zgjedhur", points: ["Deri 5–7 faqe", "Dizajn i personalizuar", "Strukturë SEO bazë", "Integrim analytics", "Panel administrimi", "2 rishikime"] },
      { title: "Premium Website", subtitle: "Dizajn unik", price: "Nga 1,800€", points: ["Dizajn unik (UI/UX)", "SEO i optimizuar", "Integrime marketingu", "Optimizim performance", "Trajnim përdorimi", "3 rishikime"] },
    ],
    ecommerce: [
      { title: "Basic Shop", subtitle: "Dyqan bazë", price: "1,200€", priceOriginal: "1,500€", points: ["Deri 30 produkte", "Pagesë online", "Setup transporti", "SEO bazë", "1 rishikim"] },
      { title: "Standard Shop", subtitle: "Dyqan i optimizuar", price: "Nga 2,200€", badge: "Paketa më e zgjedhur", points: ["Deri 150 produkte", "Faqe kategori të optimizuara", "Email automation bazë", "Optimizim performance", "2 rishikime"] },
      { title: "Premium Shop", subtitle: "Dyqan premium", price: "Nga 4,000€", points: ["Produkte pa limit", "UX i personalizuar", "Automatizime marketingu", "Integrime ERP/CRM", "Optimizim konvertimi"] },
    ],
    saas: [
      { title: "MVP", subtitle: "Minimum viable", price: "Nga 4,000€", cta: "consult", points: ["Funksionalitet bazë", "Login & role përdoruesish", "Panel administrimi", "Deploy & setup"] },
      { title: "Growth", subtitle: "Sistem i zgjerueshëm", price: "Nga 8,000€", badge: "Paketa më e zgjedhur", cta: "consult", points: ["Multi-user system", "API integrime", "Dashboard analitik", "Strukturë scalable", "Siguri e avancuar"] },
      { title: "Enterprise", subtitle: "Zgjidhje e plotë", price: "Ofertë e personalizuar", cta: "consult", points: ["Arkitekturë e plotë", "Integrime të avancuara", "Infrastrukturë scalable", "Support pas launch"] },
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
      { title: "SMM Training", subtitle: "1 month", price: "€250", points: ["1 month (3 times per week)", "12 lessons / topics", "Practical exercises"] },
      { title: "SMM 1:1 Training", subtitle: "1 month", price: "€600", points: ["Lessons", "Practical exercises", "Intensive"] },
    ],
    websiteLanding: [
      { title: "Landing Page", subtitle: "Single page", price: "€400", priceOriginal: "€450", points: ["1 page (one-page)", "Professional template", "Responsive (mobile)", "Contact form", "Basic SEO", "1 revision"] },
      { title: "Business Website", subtitle: "Multi-page", price: "€900", priceOriginal: "€1,200", badge: "Most popular package", points: ["Up to 5–7 pages", "Custom design", "Basic SEO structure", "Analytics integration", "Admin panel", "2 revisions"] },
      { title: "Premium Website", subtitle: "Unique design", price: "From €1,800", points: ["Unique design (UI/UX)", "Optimised SEO", "Marketing integrations", "Performance optimisation", "Usage training", "3 revisions"] },
    ],
    ecommerce: [
      { title: "Basic Shop", subtitle: "Basic store", price: "€1,200", priceOriginal: "€1,500", points: ["Up to 30 products", "Online payment", "Shipping setup", "Basic SEO", "1 revision"] },
      { title: "Standard Shop", subtitle: "Optimised store", price: "From €2,200", badge: "Most popular package", points: ["Up to 150 products", "Optimised category pages", "Basic email automation", "Performance optimisation", "2 revisions"] },
      { title: "Premium Shop", subtitle: "Premium store", price: "From €4,000", points: ["Unlimited products", "Custom UX", "Marketing automation", "ERP/CRM integrations", "Conversion optimisation"] },
    ],
    saas: [
      { title: "MVP", subtitle: "Minimum viable", price: "From €4,000", cta: "consult", points: ["Basic functionality", "Login & user roles", "Admin panel", "Deploy & setup"] },
      { title: "Growth", subtitle: "Scalable system", price: "From €8,000", badge: "Most popular package", cta: "consult", points: ["Multi-user system", "API integrations", "Analytics dashboard", "Scalable structure", "Advanced security"] },
      { title: "Enterprise", subtitle: "Full solution", price: "Custom quote", cta: "consult", points: ["Full architecture", "Advanced integrations", "Scalable infrastructure", "Post-launch support"] },
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
      { title: "SMM Training", subtitle: "1 Monat", price: "250€", points: ["1 Monat (3× pro Woche)", "12 Lektionen / Themen", "Praktische Übungen"] },
      { title: "SMM 1:1 Training", subtitle: "1 Monat", price: "600€", points: ["Lektionen", "Praktische Übungen", "Intensiv"] },
    ],
    websiteLanding: [
      { title: "Landing Page", subtitle: "Eine Seite", price: "400€", priceOriginal: "450€", points: ["1 Seite (One-Page)", "Professionelles Template", "Responsive (Mobile)", "Kontaktformular", "Basis-SEO", "1 Überarbeitung"] },
      { title: "Business Website", subtitle: "Mehrseitig", price: "900€", priceOriginal: "1.200€", badge: "Beliebtestes Paket", points: ["Bis 5–7 Seiten", "Individuelles Design", "Basis-SEO-Struktur", "Analytics-Integration", "Admin-Panel", "2 Überarbeitungen"] },
      { title: "Premium Website", subtitle: "Einzigartiges Design", price: "Ab 1.800€", points: ["Einzigartiges Design (UI/UX)", "Optimiertes SEO", "Marketing-Integrationen", "Performance-Optimierung", "Nutzerschulung", "3 Überarbeitungen"] },
    ],
    ecommerce: [
      { title: "Basic Shop", subtitle: "Basis-Shop", price: "1.200€", priceOriginal: "1.500€", points: ["Bis 30 Produkte", "Online-Zahlung", "Versand-Setup", "Basis-SEO", "1 Überarbeitung"] },
      { title: "Standard Shop", subtitle: "Optimierter Shop", price: "Ab 2.200€", badge: "Beliebtestes Paket", points: ["Bis 150 Produkte", "Optimierte Kategorieseiten", "Basis E-Mail-Automatisierung", "Performance-Optimierung", "2 Überarbeitungen"] },
      { title: "Premium Shop", subtitle: "Premium-Shop", price: "Ab 4.000€", points: ["Unbegrenzte Produkte", "Individuelles UX", "Marketing-Automatisierung", "ERP/CRM-Integrationen", "Conversion-Optimierung"] },
    ],
    saas: [
      { title: "MVP", subtitle: "Minimum viable", price: "Ab 4.000€", cta: "consult", points: ["Basis-Funktionalität", "Login & Benutzerrollen", "Admin-Panel", "Deploy & Setup"] },
      { title: "Growth", subtitle: "Skalierbares System", price: "Ab 8.000€", badge: "Beliebtestes Paket", cta: "consult", points: ["Multi-User-System", "API-Integrationen", "Analytics-Dashboard", "Skalierbare Struktur", "Erweiterte Sicherheit"] },
      { title: "Enterprise", subtitle: "Vollständige Lösung", price: "Individuelles Angebot", cta: "consult", points: ["Vollständige Architektur", "Erweiterte Integrationen", "Skalierbare Infrastruktur", "Support nach Launch"] },
    ],
    maintenance: [
      { title: "Basis", subtitle: "Website, E-Commerce, SaaS", price: "Ab 100€/Monat", points: ["Updates und Backups", "Basis-Monitoring", "E-Mail-Support", "Basis-Sicherheit", "Website, E-Commerce und SaaS"] },
      { title: "Standard", subtitle: "+ Optimierung", price: "Ab 200€/Monat", points: ["Basis +", "Geschwindigkeitsoptimierung", "SEO-Monitoring", "Monatsreporting", "E-Commerce- und SaaS-Wartung"] },
      { title: "Premium", subtitle: "Vollpaket", price: "Auf Anfrage", points: ["Standard +", "Vollständige E-Commerce-Wartung", "SaaS- und Anwendungs-Wartung", "Laufende Optimierung", "Prioritäts-Support"] },
    ],
  },
};
