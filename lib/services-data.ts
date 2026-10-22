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

/**
 * Lowest published starting price (EUR) per service - used to filter budget options in the
 * contact form. Must match the "From …" prices below and the entry packages in packages-data.
 * Content creation has no published price (quote on request), so it does not filter budgets.
 */
export const SERVICE_MIN_PRICE_EUR: Record<ServiceSlug, number> = {
  "social-media": 250,
  content: 0,
  strategy: 500,
  branding: 250, // Logo package
  ads: 250,
  consulting: 100,
  training: 250,
  "website-landing": 300,
  ecommerce: 800,
  saas: 4000,
  maintenance: 150,
};

export const SERVICE_DETAILS_BY_LOCALE: Record<Locale, ServiceDetail[]> = {
  sq: [
    {
      title: "Menaxhim i rrjeteve sociale",
      desc: "Postojmë për ju çdo javë, me plan dhe raport.",
      price: "Nga 250€ / muaj",
    },
    {
      title: "Krijim përmbajtjeje",
      desc: "Foto, video dhe grafika që ju bëjnë të dukeni mirë.",
      price: "Ofertë sipas nevojës",
    },
    {
      title: "Strategji marketingu digjital",
      desc: "Një plan i qartë: kujt i flisni, çfarë thoni, çfarë bëni.",
      price: "Nga 500€ / strategji",
    },
    {
      title: "Branding & identitet vizual",
      desc: "Logo, ngjyra dhe fonte që ju përfaqësojnë.",
      price: "Nga 500€",
    },
    {
      title: "Menaxhim reklamash\n(Meta & Google)",
      desc: "Reklama në Meta dhe Google që sjellin klientë.",
      price: "Nga 250€ / muaj (pa buxhetin e reklamës)",
    },
    {
      title: "Konsulencë marketingu",
      desc: "Një bisedë 1:1 kur ju duhet një mendim i qartë.",
      price: "Nga 100€ / seancë",
    },
    {
      title: "Trajnime marketingu & rrjete sociale",
      desc: "Mësoni marketing duke e bërë vetë.",
      price: "Nga 250€ / program",
    },
    {
      title: "Krijim website & web design",
      desc: "Një website i shpejtë që i kthen vizitorët në klientë.",
      price: "Nga 300€",
    },
    {
      title: "Krijim dyqan online (webshop / e-commerce)",
      desc: "Dyqan online ku klientët blejnë vetë.",
      price: "Nga 800€",
    },
    {
      title: "SaaS & aplikacione",
      desc: "Aplikacione dhe platforma sipas idesë suaj.",
      price: "Nga 4.000€",
    },
    {
      title: "Mirëmbajtje website & optimizim",
      desc: "E mbajmë faqen tuaj të shpejtë, të sigurt dhe online.",
      price: "Nga 150€ / muaj",
    },
  ],
  en: [
    {
      title: "Social Media Management",
      desc: "We post for you every week, with a plan and a report.",
      price: "From €250/month",
    },
    {
      title: "Content Creation",
      desc: "Photos, videos and graphics that make you look good.",
      price: "Quote on request",
    },
    {
      title: "Digital Marketing Strategy",
      desc: "A clear plan: who you talk to, what you say, what you do.",
      price: "From €500/strategy",
    },
    {
      title: "Branding & Visual Identity",
      desc: "A logo, colours and fonts that represent you.",
      price: "From €500",
    },
    {
      title: "Ads Management (Meta & Google)",
      desc: "Meta and Google ads that bring customers.",
      price: "From €250/month (ad spend not included)",
    },
    {
      title: "Marketing Consulting",
      desc: "A 1:1 chat when you need a clear opinion.",
      price: "From €100/session",
    },
    {
      title: "Marketing & Social Media Training",
      desc: "Learn marketing by doing it yourself.",
      price: "From €250/program",
    },
    {
      title: "Website & landing pages",
      desc: "A fast website that turns visitors into customers.",
      price: "From €300",
    },
    {
      title: "E-commerce",
      desc: "An online store where customers buy on their own.",
      price: "From €800",
    },
    {
      title: "SaaS & applications",
      desc: "Apps and platforms built around your idea.",
      price: "From €4,000",
    },
    {
      title: "Maintenance & Optimization",
      desc: "We keep your site fast, safe and online.",
      price: "From €150/month",
    },
  ],
  de: [
    {
      title: "Social Media Management",
      desc: "Wir posten jede Woche für Sie, mit Plan und Bericht.",
      price: "Ab 250€ / Monat",
    },
    {
      title: "Content Creation",
      desc: "Fotos, Videos und Grafiken, mit denen Sie gut aussehen.",
      price: "Angebot auf Anfrage",
    },
    {
      title: "Digitale Marketingstrategie",
      desc: "Ein klarer Plan: wen Sie ansprechen, was Sie sagen, was Sie tun.",
      price: "Ab 500€ / Strategie",
    },
    {
      title: "Branding & visuelle Identität",
      desc: "Logo, Farben und Schriften, die Sie repräsentieren.",
      price: "Ab 500€",
    },
    {
      title: "Ads Management\n(Meta & Google)",
      desc: "Meta- und Google-Anzeigen, die Kunden bringen.",
      price: "Ab 250€ / Monat (exkl. Media‑Budget)",
    },
    {
      title: "Marketing‑Beratung",
      desc: "Ein 1:1-Gespräch, wenn Sie eine klare Meinung brauchen.",
      price: "Ab 100€ / Session",
    },
    {
      title: "Marketing‑ & Social‑Media‑Trainings",
      desc: "Marketing lernen, indem Sie es selbst tun.",
      price: "Ab 250€ / Programm",
    },
    {
      title: "Website & Landingpages",
      desc: "Eine schnelle Website, die Besucher zu Kunden macht.",
      price: "Ab 300€",
    },
    {
      title: "E-Commerce",
      desc: "Ein Online-Shop, in dem Kunden selbst kaufen.",
      price: "Ab 800€",
    },
    {
      title: "SaaS & Anwendungen",
      desc: "Apps und Plattformen nach Ihrer Idee.",
      price: "Ab 4.000€",
    },
    {
      title: "Wartung & Optimierung",
      desc: "Wir halten Ihre Seite schnell, sicher und online.",
      price: "Ab 150€ / Monat",
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
