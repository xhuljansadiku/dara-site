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

const SM_ALBALINK = {
  slug: "albalink",
  images: [
    "/images/projects/social-media/albalink/albalink_international_1.jpg",
    "/images/projects/social-media/albalink/albalink_international_2.webp",
    "/images/projects/social-media/albalink/albalink_international_3.webp",
    "/images/projects/social-media/albalink/albalink_international_4.webp",
    "/images/projects/social-media/albalink/albalink_international_5.webp",
    "/images/projects/social-media/albalink/albalink_international_6.webp",
    "/images/projects/social-media/albalink/albalink_international_7.webp",
    "/images/projects/social-media/albalink/albalink_international_9.webp",
    "/images/projects/social-media/albalink/albalink_international_10.webp",
  ],
};
const SM_AM_SERVICES = {
  slug: "am-services",
  images: [
    "/images/projects/social-media/am_services/am_services_1.jpg",
    "/images/projects/social-media/am_services/am_services_2.jpg",
    "/images/projects/social-media/am_services/am_services_3.webp",
    "/images/projects/social-media/am_services/am_services_4.webp",
    "/images/projects/social-media/am_services/am_services_5.webp",
    "/images/projects/social-media/am_services/am_services_6.webp",
    "/images/projects/social-media/am_services/am_services_7.webp",
    "/images/projects/social-media/am_services/am_services_8.webp",
    "/images/projects/social-media/am_services/am_services_9.webp",
  ],
};
const SM_AROME = {
  slug: "arome-edit",
  images: [
    "/images/projects/social-media/arome.edit/arome.edit_1.webp",
    "/images/projects/social-media/arome.edit/arome.edit_2.webp",
    "/images/projects/social-media/arome.edit/arome.edit_3.webp",
    "/images/projects/social-media/arome.edit/arome.edit_4.webp",
    "/images/projects/social-media/arome.edit/arome.edit_5.webp",
    "/images/projects/social-media/arome.edit/arome.edit_6.webp",
    "/images/projects/social-media/arome.edit/arome.edit_7.webp",
    "/images/projects/social-media/arome.edit/arome.edit_8.webp",
    "/images/projects/social-media/arome.edit/arome.edit_9.webp",
  ],
};
const SM_BOS = {
  slug: "bos-cleaners",
  images: [
    "/images/projects/social-media/bos_cleaners/bos_cleaners_1.jpg",
    "/images/projects/social-media/bos_cleaners/bos_cleaners_2.jpg",
    "/images/projects/social-media/bos_cleaners/bos_cleaners_3.webp",
    "/images/projects/social-media/bos_cleaners/bos_cleaners_4.webp",
    "/images/projects/social-media/bos_cleaners/bos_cleaners_5.webp",
    "/images/projects/social-media/bos_cleaners/bos_cleaners_6.webp",
    "/images/projects/social-media/bos_cleaners/bos_cleaners_7.webp",
    "/images/projects/social-media/bos_cleaners/bos_cleaners_8.webp",
    "/images/projects/social-media/bos_cleaners/bos_cleaners_9.webp",
  ],
};
const SM_BROWS = {
  slug: "brows-by-anila",
  images: [
    "/images/projects/social-media/brows_by_anila/brows_by_anila_1.jpeg",
    "/images/projects/social-media/brows_by_anila/brows_by_anila_2.jpeg",
    "/images/projects/social-media/brows_by_anila/brows_by_anila_3.jpeg",
    "/images/projects/social-media/brows_by_anila/brows_by_anila_4.jpeg",
    "/images/projects/social-media/brows_by_anila/brows_by_anila_5.jpeg",
    "/images/projects/social-media/brows_by_anila/brows_by_anila_6.jpeg",
    "/images/projects/social-media/brows_by_anila/brows_by_anila_7.jpeg",
    "/images/projects/social-media/brows_by_anila/brows_by_anila_8.jpeg",
    "/images/projects/social-media/brows_by_anila/brows_by_anila_9.jpeg",
  ],
};
const SM_CHURROS = {
  slug: "churros",
  images: [
    "/images/projects/social-media/churros/churros_1.jpeg",
    "/images/projects/social-media/churros/churros_2.jpeg",
    "/images/projects/social-media/churros/churros_3.jpeg",
    "/images/projects/social-media/churros/churros_4.jpeg",
    "/images/projects/social-media/churros/churros_5.jpeg",
    "/images/projects/social-media/churros/churros_6.jpeg",
    "/images/projects/social-media/churros/churros_7.jpeg",
    "/images/projects/social-media/churros/churros_8.jpeg",
    "/images/projects/social-media/churros/churros_9.jpeg",
    "/images/projects/social-media/churros/churros_10.jpeg",
  ],
};
const SM_DDSTORE = {
  slug: "ddstore",
  images: [
    "/images/projects/social-media/ddstore/ddstore_1.webp",
    "/images/projects/social-media/ddstore/ddstore_2.webp",
    "/images/projects/social-media/ddstore/ddstore_3.webp",
    "/images/projects/social-media/ddstore/ddstore_4.webp",
    "/images/projects/social-media/ddstore/ddstore_5.webp",
    "/images/projects/social-media/ddstore/ddstore_6.webp",
    "/images/projects/social-media/ddstore/ddstore_7.webp",
    "/images/projects/social-media/ddstore/ddstore_8.jpg",
    "/images/projects/social-media/ddstore/ddstore_9.jpg",
  ],
};
const SM_DTEC = {
  slug: "dtec",
  images: [
    "/images/projects/social-media/dtec/dtec_1.webp",
    "/images/projects/social-media/dtec/dtec_2.webp",
    "/images/projects/social-media/dtec/dtec_3.webp",
    "/images/projects/social-media/dtec/dtec_4.webp",
    "/images/projects/social-media/dtec/dtec_5.webp",
    "/images/projects/social-media/dtec/dtec_6.webp",
    "/images/projects/social-media/dtec/dtec_7.webp",
    "/images/projects/social-media/dtec/dtec_8.webp",
    "/images/projects/social-media/dtec/dtec_9.webp",
  ],
};
const SM_GENTJANA = {
  slug: "gentjana-marku",
  images: [
    "/images/projects/social-media/gentjana/gentjana_1.jpg",
    "/images/projects/social-media/gentjana/gentjana_2.webp",
    "/images/projects/social-media/gentjana/gentjana_3.webp",
    "/images/projects/social-media/gentjana/gentjana_4.webp",
    "/images/projects/social-media/gentjana/gentjana_5.webp",
    "/images/projects/social-media/gentjana/gentjana_6.webp",
    "/images/projects/social-media/gentjana/gentjana_7.webp",
    "/images/projects/social-media/gentjana/gentjana_8.webp",
    "/images/projects/social-media/gentjana/gentjana_9.webp",
  ],
};
const SM_LA_CAMPAGNA = {
  slug: "la-campagna",
  images: [
    "/images/projects/social-media/la_campagna/la_campagna_chard/la_campagna_chard_1.jpeg",
    "/images/projects/social-media/la_campagna/la_campagna_chard/la_campagna_chard_2.jpeg",
    "/images/projects/social-media/la_campagna/la_campagna_chard/la_campagna_chard_3.jpeg",
    "/images/projects/social-media/la_campagna/la_campagna_chard/la_campagna_chard_4.jpeg",
    "/images/projects/social-media/la_campagna/la_campagna_chard/la_campagna_chard_5.jpeg",
    "/images/projects/social-media/la_campagna/la_campagna_chard/la_campagna_chard_6.jpeg",
    "/images/projects/social-media/la_campagna/la_campagna_chard/la_campagna_chard_7.jpeg",
    "/images/projects/social-media/la_campagna/la_campagna_chard/la_campagna_chard_8.jpeg",
    "/images/projects/social-media/la_campagna/la_campagna_chard/la_campagna_chard_9.jpeg",
  ],
};

// ----------------------
// 🇦🇱 ALBANIAN
// ----------------------

const projectsSq: Project[] = [
  // --- Social Media (each has own page with multiple images) ---
  { title: "Albalink", tag: "Social Media", desc: "Menaxhim dhe rritje e prezencës në rrjetet sociale.", category: "social-media", thumbnail: SM_ALBALINK.images[5], slug: SM_ALBALINK.slug, images: SM_ALBALINK.images },
  { title: "Am Services", tag: "Social Media", desc: "Strategji dhe përmbajtje për rritje të audiencës.", category: "social-media", thumbnail: SM_AM_SERVICES.images[7], slug: SM_AM_SERVICES.slug, images: SM_AM_SERVICES.images },
  { title: "Arome.edit", tag: "Social Media", desc: "Identitet vizual dhe përmbajtje kreative.", category: "social-media", thumbnail: SM_AROME.images[0], slug: SM_AROME.slug, images: SM_AROME.images },
  { title: "Bos Cleaners", tag: "Social Media", desc: "Ndërtim i prezencës online.", category: "social-media", thumbnail: SM_BOS.images[5], slug: SM_BOS.slug, images: SM_BOS.images },
  { title: "Brows By Anila", tag: "Social Media", desc: "Menaxhim rrjetesh për brand bukurie.", category: "social-media", thumbnail: SM_BROWS.images[2], slug: SM_BROWS.slug, images: SM_BROWS.images },
  { title: "Churros", tag: "Social Media", desc: "Strategji për brand ushqimi.", category: "social-media", thumbnail: SM_CHURROS.images[0], slug: SM_CHURROS.slug, images: SM_CHURROS.images },
  { title: "DDstore", tag: "Social Media", desc: "Marketing për e-commerce.", category: "social-media", thumbnail: SM_DDSTORE.images[4], slug: SM_DDSTORE.slug, images: SM_DDSTORE.images },
  { title: "DTEC", tag: "Social Media", desc: "Komunikim për brand teknologjie.", category: "social-media", thumbnail: SM_DTEC.images[3], slug: SM_DTEC.slug, images: SM_DTEC.images },
  { title: "Gentjana Marku", tag: "Social Media", desc: "Personal brand management.", category: "social-media", thumbnail: SM_GENTJANA.images[3], slug: SM_GENTJANA.slug, images: SM_GENTJANA.images },
  { title: "La Campagna", tag: "Social Media", desc: "Menaxhim për disa biznese.", category: "social-media", thumbnail: SM_LA_CAMPAGNA.images[8], slug: SM_LA_CAMPAGNA.slug, images: SM_LA_CAMPAGNA.images },

  // --- Brand Identity (single page with all logos) ---
  { title: "Albalink International", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/ai.png" },
  { title: "Altana Longevity Concept", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/alc.png" },
  { title: "Arome Edit", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/ae.png" },
  { title: "Gentjana Marku — Avokate", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/gma.png" },
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
  { ...projectsSq[1], desc: "Strategy and content for audience growth." },
  { ...projectsSq[2], desc: "Visual identity and creative content." },
  { ...projectsSq[3], desc: "Building online presence." },
  { ...projectsSq[4], desc: "Social media management for beauty brand." },
  { ...projectsSq[5], desc: "Strategy for food brand." },
  { ...projectsSq[6], desc: "Marketing for e-commerce." },
  { ...projectsSq[7], desc: "Communication for technology brand." },
  { ...projectsSq[8], desc: "Personal brand management." },
  { ...projectsSq[9], desc: "Management for multiple businesses." },
  { ...projectsSq[10], desc: "Logo and visual identity." },
  { ...projectsSq[11], desc: "Logo and visual identity." },
  { ...projectsSq[12], desc: "Logo and visual identity." },
  { ...projectsSq[13], desc: "Logo and visual identity." },
  { ...projectsSq[14], desc: "Logo and visual identity." },
  { ...projectsSq[15], desc: "Logo and visual identity." },
  { ...projectsSq[16], desc: "Corporate website for construction and metal structure assembly company." },
  { ...projectsSq[17], desc: "Website for construction and renovation company in London, presenting services, projects and contact for residential and commercial clients." },
  { ...projectsSq[18], desc: "Website for property cleaning, maintenance and care services in Niederbayern, with service presentation and contact for quotes." },
  { ...projectsSq[19], desc: "Online training and nutrition platform with personalised plans, client results and health and fitness subscription package." },
  { ...projectsSq[20], desc: "Website for local Imbiss in Weiden in der Oberpfalz with food menu, opening hours and contact for orders or on-site visits." },
];

const projectsDe: Project[] = [
  { ...projectsSq[0], desc: "Management und Steigerung der Social-Media-Präsenz." },
  { ...projectsSq[1], desc: "Strategie und Content für Reichweitenwachstum." },
  { ...projectsSq[2], desc: "Visuelle Identität und kreative Inhalte." },
  { ...projectsSq[3], desc: "Aufbau der Online-Präsenz." },
  { ...projectsSq[4], desc: "Social-Media-Management für Beauty-Marke." },
  { ...projectsSq[5], desc: "Strategie für Food-Brand." },
  { ...projectsSq[6], desc: "Marketing für E-Commerce." },
  { ...projectsSq[7], desc: "Kommunikation für Technologie-Marke." },
  { ...projectsSq[8], desc: "Personal-Brand-Management." },
  { ...projectsSq[9], desc: "Management für mehrere Unternehmen." },
  { ...projectsSq[10], desc: "Logo und visuelle Identität." },
  { ...projectsSq[11], desc: "Logo und visuelle Identität." },
  { ...projectsSq[12], desc: "Logo und visuelle Identität." },
  { ...projectsSq[13], desc: "Logo und visuelle Identität." },
  { ...projectsSq[14], desc: "Logo und visuelle Identität." },
  { ...projectsSq[15], desc: "Logo und visuelle Identität." },
  { ...projectsSq[16], desc: "Unternehmenswebsite für Bau- und Metallbauunternehmen." },
  { ...projectsSq[17], desc: "Website für Bau- und Renovierungsunternehmen in London mit Darstellung von Leistungen, Projekten und Kontakt für Wohn- und Gewerbekunden." },
  { ...projectsSq[18], desc: "Website für Objektreinigung, Wartung und Pflege in Niederbayern mit Leistungspräsentation und Kontakt für Angebote." },
  { ...projectsSq[19], desc: "Online-Trainings- und Ernährungsplattform mit personalisierten Plänen, Kundenergebnissen und Abo-Paket für Gesundheit und Fitness." },
  { ...projectsSq[20], desc: "Website für lokalen Imbiss in Weiden in der Oberpfalz mit Speisekarte, Öffnungszeiten und Kontakt für Bestellungen oder Vor-Ort-Besuche." },
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
