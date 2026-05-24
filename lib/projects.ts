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
// Social Media: single gallery (images only in UI; no detail pages)
// ----------------------

/** All portfolio mockups in `public/images/projects/social-media/` (1.png … 23.png). */
export const SOCIAL_MEDIA_GALLERY_IMAGES = [
  ...Array.from({ length: 22 }, (_, i) => `/images/projects/social-media/${i + 2}.png`),
  `/images/projects/social-media/1.png`,
];

// ----------------------
// 🇦🇱 ALBANIAN
// ----------------------

const projectsSq: Project[] = [
  // --- Social Media (gallery only; see SOCIAL_MEDIA_GALLERY_IMAGES) ---
  {
    title: "Social Media",
    tag: "Social Media",
    desc: "Menaxhim dhe rritje e prezencës në rrjetet sociale.",
    category: "social-media",
    thumbnail: SOCIAL_MEDIA_GALLERY_IMAGES[0],
    images: SOCIAL_MEDIA_GALLERY_IMAGES,
  },

  // --- Brand Identity (single page with all logos) ---
  { title: "Albalink International", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/ai.png" },
  { title: "Altana Longevity Concept", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/alc.png" },
  { title: "Arome Edit", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/ae.png" },
  { title: "Gentjana Marku , Avokate", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/gma.png" },
  { title: "Klajdi Hidrosanitare", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/klajdi-h.png" },
  { title: "Marku Real Estate", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/mre.png" },

  // --- Website (no internal page, link directly to URL) ---
  { title: "Taxi Dhermi Official", tag: "Website", desc: "Website oficial për shërbimin e taksi dhe transportit në Dhërmj, me informacion për rrugët, rezervime dhe kontakt.", category: "website", thumbnail: "/images/projects/website/taxidhermi.png", websiteUrl: "https://www.taxidhermiofficial.com/" },
  { title: "O2 Antiage", tag: "Website", desc: "Website për klinikë estetike dhe antiaging, me prezantim të trajtimeve, ekipit dhe rezervimeve online.", category: "website", thumbnail: "/images/projects/website/o2antiage.png", websiteUrl: "https://www.o2antiage.com/" },
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
  { ...projectsSq[7], desc: "Official website for taxi and transport service in Dhermi, with route information, bookings and contact." },
  { ...projectsSq[8], desc: "Website for an aesthetic and anti-aging clinic, presenting treatments, team and online bookings." },
];

const projectsDe: Project[] = [
  { ...projectsSq[0], desc: "Management und Steigerung der Social-Media-Präsenz." },
  { ...projectsSq[1], desc: "Logo und visuelle Identität." },
  { ...projectsSq[2], desc: "Logo und visuelle Identität." },
  { ...projectsSq[3], desc: "Logo und visuelle Identität." },
  { ...projectsSq[4], desc: "Logo und visuelle Identität." },
  { ...projectsSq[5], desc: "Logo und visuelle Identität." },
  { ...projectsSq[6], desc: "Logo und visuelle Identität." },
  { ...projectsSq[7], desc: "Offizielle Website für den Taxi- und Transportservice in Dhermi mit Streckeninformationen, Buchungen und Kontakt." },
  { ...projectsSq[8], desc: "Website für eine Ästhetik- und Anti-Aging-Klinik mit Darstellung von Behandlungen, Team und Online-Buchung." },
];

export const PROJECTS_BY_LOCALE: Record<Locale, Project[]> = {
  sq: projectsSq,
  en: projectsEn,
  de: projectsDe,
};

export const BRAND_PROJECTS: Project[] = projectsSq.filter((p) => p.category === "brand");

/** No per-project URLs; gallery lives on /work. */
export const SOCIAL_MEDIA_SLUGS: string[] = [];

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
