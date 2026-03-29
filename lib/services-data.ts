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
  "maintenance",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceDetail = { title: string; desc: string; price?: string };

/** Minimum price (EUR) per service - used to filter budget options in contact form. Values align with BUDGET_TIERS_EUR. */
export const SERVICE_MIN_PRICE_EUR: Record<ServiceSlug, number> = {
  "social-media": 250,
  content: 100,
  strategy: 250,
  branding: 500,
  ads: 100,
  consulting: 100,
  training: 250,
  "website-landing": 250,
  ecommerce: 1000,
  saas: 4000,
  maintenance: 100,
};

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
      price: "Ofertë sipas nevojës",
    },
    {
      title: "Strategji marketingu digjital",
      desc: "Marketing digital shqip: analizë biznesi, strategji të personalizuar për rritje, pozicionim dhe objektiva të matshme. Ideal për agjencitë dhe kompani që duan drejtim të qartë.",
      price: "Nga 500€ / strategji",
    },
    {
      title: "Branding & identitet vizual",
      desc: "Krijim ose rifreskim identiteti të brand-it: logo, udhëzues vizual, tone komunikimi. Imazh profesional për kompani dhe biznese në Shqipëri.",
      price: "Nga 500€",
    },
    {
      title: "Menaxhim reklamash (Meta & Google)",
      desc: "Krijim dhe optimizim fushatash reklamash në Meta & Google për rritje shitjesh, lead‑esh dhe njohje brand-i.",
      price: "Nga 250€ / muaj (pa buxhetin e reklamës)",
    },
    {
      title: "Konsulencë marketingu",
      desc: "Konsulencë strategjike për biznese ose individë që duan të rrisin performancën dhe të qartësojnë drejtimin e marketingut.",
      price: "Nga 100€ / seancë",
    },
    {
      title: "Trajnime marketingu & rrjete sociale",
      desc: "Trajnime praktike për biznese dhe individë që duan të mësojnë marketingun, rrjetet sociale dhe strategjitë digjitale.",
      price: "Nga 250€ / program",
    },
    {
      title: "Krijim website & web design",
      desc: "Website dhe landing page për biznese në Shqipëri: Dizajn modern, shpejtësi dhe përvojë përdoruesi që ndërtojnë besim. Nga faqe njëfaqëshe deri te site shumëfaqëshe, forma kontaktësh dhe bazë SEO e qartë. Për kompani, profesionistë të lirë, klinika, restorante dhe projekte në ndërtim.",
      price: "Nga 500€",
    },
    {
      title: "Krijim dyqan online (webshop / e-commerce)",
      desc: "Krijim webshop për biznese: dyqan online me produkte, inventar, pagesë me kartë dhe dorëzim. Zhvillim website e-commerce për kompani shqiptare. Shitje në internet me profesionalizëm.",
      price: "Nga 1.000€",
    },
    {
      title: "SaaS & aplikacione",
      desc: "Aplikacione, platforma ose produkte software të personalizuara për biznese ose përdorues.",
      price: "Nga 4.000€",
    },
    {
      title: "Mirembajtje website & optimizim",
      desc: "Mirembajtje website dhe dyqan online: përditësime, backups, siguri. Optimizim website të vjetra – shpejtësi, SEO, modernizim. Monitoring dhe support teknik për biznese në Shqipëri.",
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
      price: "Quote on request",
    },
    {
      title: "Digital Marketing Strategy",
      desc: "Business analysis and personalized strategy for real growth , positioning, objectives and concrete ideas.",
      price: "From €500/strategy",
    },
    {
      title: "Branding & Visual Identity",
      desc: "Logo, visual guidelines, communication tone and professional image for a strong market presence.",
      price: "From €500",
    },
    {
      title: "Ads Management (Meta & Google)",
      desc: "Creation and optimisation of Meta & Google campaigns to increase sales, leads and brand recognition.",
      price: "From €250/month (ad spend not included)",
    },
    {
      title: "Marketing Consulting",
      desc: "Strategic consulting to increase performance, clarify direction and make smarter decisions.",
      price: "From €100/session",
    },
    {
      title: "Marketing & Social Media Training",
      desc: "Practical training on marketing, social media and digital strategies in an applicable, hands‑on way.",
      price: "From €250/program",
    },
    {
      title: "Website & landing pages",
      desc: "Websites and landing pages for businesses in Albania: Modern design, speed and UX that build trust. From single landing pages to multi-page sites, contact forms and a clear SEO foundation. Ideal for companies, independent professionals, clinics, hospitality and construction.",
      price: "From €500",
    },
    {
      title: "E-commerce",
      desc: "Online store with products, inventory, payment and delivery , tailored solution for selling online.",
      price: "From €1,000",
    },
    {
      title: "SaaS & applications",
      desc: "Custom applications, platforms or software products for businesses or end users.",
      price: "From €4,000",
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
      price: "Angebot auf Anfrage",
    },
    {
      title: "Digitale Marketingstrategie",
      desc: "Business‑Analyse und individuelle Strategie für echtes Wachstum – Positionierung, Ziele und konkrete Maßnahmen.",
      price: "Ab 500€ / Strategie",
    },
    {
      title: "Branding & visuelle Identität",
      desc: "Entwicklung oder Refresh der Markenidentität – Logo, Styleguide, Tonalität und professionelles Markenbild.",
      price: "Ab 500€",
    },
    {
      title: "Ads Management (Meta & Google)",
      desc: "Erstellung und Optimierung von Kampagnen auf Meta & Google, um Verkäufe, Leads und Markenbekanntheit zu steigern.",
      price: "Ab 250€ / Monat (exkl. Media‑Budget)",
    },
    {
      title: "Marketing‑Beratung",
      desc: "Strategische Beratung für Unternehmen oder Einzelpersonen, die ihre Performance steigern und ihren Marketingkurs klären möchten.",
      price: "Ab 100€ / Session",
    },
    {
      title: "Marketing‑ & Social‑Media‑Trainings",
      desc: "Praxisnahe Trainings für Unternehmen und Einzelpersonen zu Marketing, Social Media und digitalen Strategien.",
      price: "Ab 250€ / Programm",
    },
    {
      title: "Website & Landingpages",
      desc: "Websites und Landingpages für Unternehmen in Albanien: Modernes Design, Performance und UX, die Vertrauen schaffen. Von One-Page-Landingpages bis zu mehrseitigen Sites, Kontaktformularen und klarer SEO-Basis. Für KMU, freie Berufe, Praxen, Gastronomie und Bauprojekte.",
      price: "Ab 500€",
    },
    {
      title: "E-Commerce",
      desc: "Online-Shop mit Produkten, Lager, Zahlung und Versand , maßgeschneiderte Lösung für den Verkauf im Internet.",
      price: "Ab 1.000€",
    },
    {
      title: "SaaS & Anwendungen",
      desc: "Individuelle Anwendungen, Plattformen oder Softwareprodukte für Unternehmen oder Endnutzer.",
      price: "Ab 4.000€",
    },
    {
      title: "Wartung & Optimierung",
      desc: "Website- und E-Commerce-Wartung (Updates, Backups, Sicherheit), Optimierung alter Websites (Geschwindigkeit, SEO, Modernisierung), Monitoring und Support.",
      price: "Ab 100€ / Monat",
    },
  ],
};

/** Service groups for navbar - Website, Marketing, Branding, Training */
export const SERVICE_GROUPS = [
  {
    id: "website" as const,
    slugs: ["website-landing", "ecommerce", "saas", "maintenance"] as ServiceSlug[],
  },
  {
    id: "marketing" as const,
    slugs: ["social-media", "content", "strategy", "ads", "consulting"] as ServiceSlug[],
  },
  {
    id: "branding" as const,
    slugs: ["branding"] as ServiceSlug[],
  },
  {
    id: "training" as const,
    slugs: ["training"] as ServiceSlug[],
  },
] as const;

export const SERVICE_GROUP_LABELS: Record<Locale, Record<(typeof SERVICE_GROUPS)[number]["id"], string>> = {
  sq: {
    website: "Website",
    marketing: "Marketing",
    branding: "Branding",
    training: "Trajnime marketing",
  },
  en: {
    website: "Website",
    marketing: "Marketing",
    branding: "Branding",
    training: "Marketing Training",
  },
  de: {
    website: "Website",
    marketing: "Marketing",
    branding: "Branding",
    training: "Marketing-Training",
  },
};

export function getServiceNavItems(locale: Locale): { slug: ServiceSlug; label: string }[] {
  const details = SERVICE_DETAILS_BY_LOCALE[locale];
  return SERVICE_SLUGS.map((slug, i) => ({ slug, label: details[i]?.title ?? slug }));
}

export function getServiceGroupNavItems(
  locale: Locale
): { id: string; label: string; items: { slug: ServiceSlug; label: string }[] }[] {
  const allItems = getServiceNavItems(locale);
  const slugToItem = Object.fromEntries(allItems.map((it) => [it.slug, it]));
  const labels = SERVICE_GROUP_LABELS[locale];

  return SERVICE_GROUPS.map((group) => ({
    id: group.id,
    label: labels[group.id],
    items: group.slugs.map((slug) => slugToItem[slug] ?? { slug, label: slug }).filter(Boolean),
  }));
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
