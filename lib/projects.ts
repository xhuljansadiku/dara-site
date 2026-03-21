// lib/projects.ts – Projects data and filter config for Work section

export type Locale = "sq" | "en" | "de";

export type ProjectCategory = "social-media" | "brand" | "website";

export type Project = {
  slug?: string;
  title: string;
  tag: string;
  desc: string;
  category: ProjectCategory;
  thumbnail?: string;
  /** Multiple images for social media project pages */
  images?: string[];
  /** External URL for website projects - links directly, no internal page */
  websiteUrl?: string;
};

// ----------------------
// Social Media: slug + images per project
// ----------------------

const TEST_IMG = "/images/projects/social-media/test2.jpeg";

const SM_PROJECT_1 = {
  slug: "project-1",
  images: [TEST_IMG],
};

// ----------------------
// 🇦🇱 ALBANIAN
// ----------------------

const projectsSq: Project[] = [
  // --- Social Media (1 project) ---
  { title: "Project 1", tag: "Social Media", desc: "Menaxhim dhe rritje e prezencës në rrjetet sociale.", category: "social-media", thumbnail: TEST_IMG, slug: SM_PROJECT_1.slug, images: SM_PROJECT_1.images },

  // --- Brand Identity (single page with all logos) ---
  { title: "Albalink International", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/ai.png" },
  { title: "Altana Longevity Concept", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/alc.png" },
  { title: "Arome Edit", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/ae.png" },
  { title: "Gentjana Marku , Avokate", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/gma.png" },
  { title: "Klajdi Hidrosanitare", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/klajdi-h.png" },
  { title: "Marku Real Estate", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/mre.png" },

  // --- Website (no internal page, link directly to URL) ---
  { title: "ESM GROUP", tag: "Website", desc: "Website korporativ për kompani ndërtimi dhe montimi strukturash metalike.", category: "website", thumbnail: "/images/projects/website/esm-project.png", websiteUrl: "https://esm-group.eu/" },
  { title: "Palushi Brothers", tag: "Website", desc: "Website për kompani ndërtimi dhe rinovimi në Londër, që prezanton shërbimet, projektet dhe kontaktin për klientët e banimit dhe komerciale.", category: "website", thumbnail: "/images/projects/website/pb.png", websiteUrl: "https://palushibrothers.co.uk" },
  { title: "HAUSWERK Niederbayern", tag: "Website", desc: "Website për shërbime objektesh pastrim, mirëmbajtje dhe kujdes shtëpie/zyre në Niederbayern, me prezantim të shërbimeve dhe kontakt për oferta.", category: "website", thumbnail: "/images/projects/website/hn.png", websiteUrl: "https://hauswerk-niederbayern.de" },
  { title: "Bardhi Wellness", tag: "Website", desc: "Platformë online trajnimi dhe nutricioni me plane të personalizuara, rezultate klientësh dhe paketë abonimi për shëndet dhe fitnes.", category: "website", thumbnail: "/images/projects/website/bw.png", websiteUrl: "https://www.bardhiwellness.com/" },
  { title: "Besi's Imbiss", tag: "Website", desc: "Website për Imbiss lokal në Weiden in der Oberpfalz me menu ushqimesh, orare dhe kontakt për porosi ose vizitë në vend.", category: "website", thumbnail: "/images/projects/website/bi.png", websiteUrl: "https://besis-imbiss.de" },
];

// ----------------------
// 🇬🇧 ENGLISH
// ----------------------

const projectsEn: Project[] = [
  { ...projectsSq[0], desc: "Management and growth of social media presence." },
  { ...projectsSq[1], desc: "Logo and visual identity." },
  { ...projectsSq[2], desc: "Logo and visual identity." },
  { ...projectsSq[3], desc: "Logo and visual identity." },
  { ...projectsSq[4], desc: "Logo and visual identity." },
  { ...projectsSq[5], desc: "Logo and visual identity." },
  { ...projectsSq[6], desc: "Logo and visual identity." },
  { ...projectsSq[7], desc: "Corporate website for construction and metal structure assembly company." },
  { ...projectsSq[8], desc: "Website for construction and renovation company in London, presenting services, projects and contact for residential and commercial clients." },
  { ...projectsSq[9], desc: "Website for property cleaning, maintenance and care services in Niederbayern, with service presentation and contact for quotes." },
  { ...projectsSq[10], desc: "Online training and nutrition platform with personalised plans, client results and health and fitness subscription package." },
  { ...projectsSq[11], desc: "Website for local Imbiss in Weiden in der Oberpfalz with food menu, opening hours and contact for orders or on-site visits." },
];

const projectsDe: Project[] = [
  { ...projectsSq[0], desc: "Management und Steigerung der Social-Media-Präsenz." },
  { ...projectsSq[1], desc: "Logo und visuelle Identität." },
  { ...projectsSq[2], desc: "Logo und visuelle Identität." },
  { ...projectsSq[3], desc: "Logo und visuelle Identität." },
  { ...projectsSq[4], desc: "Logo und visuelle Identität." },
  { ...projectsSq[5], desc: "Logo und visuelle Identität." },
  { ...projectsSq[6], desc: "Logo und visuelle Identität." },
  { ...projectsSq[7], desc: "Unternehmenswebsite für Bau- und Metallbauunternehmen." },
  { ...projectsSq[8], desc: "Website für Bau- und Renovierungsunternehmen in London mit Darstellung von Leistungen, Projekten und Kontakt für Wohn- und Gewerbekunden." },
  { ...projectsSq[9], desc: "Website für Objektreinigung, Wartung und Pflege in Niederbayern mit Leistungspräsentation und Kontakt für Angebote." },
  { ...projectsSq[10], desc: "Online-Trainings- und Ernährungsplattform mit personalisierten Plänen, Kundenergebnissen und Abo-Paket für Gesundheit und Fitness." },
  { ...projectsSq[11], desc: "Website für lokalen Imbiss in Weiden in der Oberpfalz mit Speisekarte, Öffnungszeiten und Kontakt für Bestellungen oder Vor-Ort-Besuche." },
];

export const PROJECTS_BY_LOCALE: Record<Locale, Project[]> = {
  sq: projectsSq,
  en: projectsEn,
  de: projectsDe,
};

export const BRAND_PROJECTS: Project[] = projectsSq.filter((p) => p.category === "brand");

export const SOCIAL_MEDIA_SLUGS = projectsSq
  .filter((p): p is Project & { slug: string } => p.category === "social-media" && !!p.slug)
  .map((p) => p.slug);

export function getSocialMediaProjectBySlug(slug: string, locale: Locale): Project | undefined {
  const idx = projectsSq.findIndex((p) => p.category === "social-media" && p.slug === slug);
  if (idx === -1) return undefined;
  return PROJECTS_BY_LOCALE[locale][idx];
}

export type FilterTab = { key: ProjectCategory | "all"; label: string };

export const WORK_FILTER_TABS_BY_LOCALE: Record<Locale, FilterTab[]> = {
  sq: [
    { key: "all", label: "Të gjitha" },
    { key: "social-media", label: "Social Media" },
    { key: "brand", label: "Brand Identity" },
    { key: "website", label: "Website" },
  ],
  en: [
    { key: "all", label: "All" },
    { key: "social-media", label: "Social Media" },
    { key: "brand", label: "Brand Identity" },
    { key: "website", label: "Website" },
  ],
  de: [
    { key: "all", label: "Alle" },
    { key: "social-media", label: "Social Media" },
    { key: "brand", label: "Brand Identity" },
    { key: "website", label: "Website" },
  ],
};
