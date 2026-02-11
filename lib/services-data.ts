import { locales } from "@/i18n";

export type Locale = (typeof locales)[number];

export const SERVICE_SLUGS = [
  "social-media",
  "content",
  "strategy",
  "branding",
  "ads",
  "consulting",
  "training",
  "website-landing",
  "ecommerce",
  "saas",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceDetail = { title: string; desc: string; price?: string };

export const SERVICE_DETAILS_BY_LOCALE: Record<Locale, ServiceDetail[]> = {
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
      title: "Website & faqe uljeje",
      desc: "Faqe një-faqe (landing) ose website me disa faqe — prezencë profesionale, forma kontakt, SEO.",
      price: "Nga 400€",
    },
    {
      title: "E-commerce",
      desc: "Dyqan online me produkte, inventar, pagesë dhe dorëzim — zgjidhje e përshtatshme për shitje në internet.",
      price: "Ofertë",
    },
    {
      title: "SaaS & aplikacione",
      desc: "Aplikacione, platforma ose produkte software të personalizuara për biznese ose përdorues.",
      price: "Ofertë",
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
      title: "Website & landing pages",
      desc: "Single-page (landing) or multi-page website — professional presence, contact forms, SEO.",
      price: "From €400",
    },
    {
      title: "E-commerce",
      desc: "Online store with products, inventory, payment and delivery — tailored solution for selling online.",
      price: "On request",
    },
    {
      title: "SaaS & applications",
      desc: "Custom applications, platforms or software products for businesses or end users.",
      price: "On request",
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
      desc: "Einzelseiten (Landing) oder mehrseitige Website — professioneller Auftritt, Kontaktformulare, SEO.",
      price: "Ab 400€",
    },
    {
      title: "E-Commerce",
      desc: "Online-Shop mit Produkten, Lager, Zahlung und Versand — maßgeschneiderte Lösung für den Verkauf im Internet.",
      price: "Auf Anfrage",
    },
    {
      title: "SaaS & Anwendungen",
      desc: "Individuelle Anwendungen, Plattformen oder Softwareprodukte für Unternehmen oder Endnutzer.",
      price: "Auf Anfrage",
    },
  ],
};

export function getServiceNavItems(locale: Locale): { slug: ServiceSlug; label: string }[] {
  const details = SERVICE_DETAILS_BY_LOCALE[locale];
  return SERVICE_SLUGS.map((slug, i) => ({ slug, label: details[i]?.title ?? slug }));
}

export function getServiceBySlug(
  locale: Locale,
  slug: string
): { slug: ServiceSlug; title: string; desc: string; price?: string } | null {
  const index = SERVICE_SLUGS.indexOf(slug as ServiceSlug);
  if (index === -1) return null;
  const detail = SERVICE_DETAILS_BY_LOCALE[locale]?.[index];
  if (!detail) return null;
  return { slug: slug as ServiceSlug, ...detail };
}
