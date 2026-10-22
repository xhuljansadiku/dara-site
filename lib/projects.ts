// lib/projects.ts – Projects data and filter config for Work section

export type Locale = "sq" | "en" | "de";

export type ProjectCategory = "social-media" | "website";

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
  /** Full-page capture of the live site at 1440px wide; website cards scroll through it on hover. */
  pageShot?: PageShot;
};

export type PageShot = { src: string; width: number; height: number };

// ----------------------
// Social Media: single gallery (images only in UI; no detail pages)
// ----------------------

const socialMediaImage = (n: number) => `/images/projects/social-media/${n}.png`;

/** Portfolio mockups in `public/images/projects/social-media/`, with the client name printed on each image. */
export const SOCIAL_MEDIA_BOARDS = [
  { name: "Don Mare", img: socialMediaImage(1) },
  { name: "Beachmaster", img: socialMediaImage(2) },
  { name: "355 Black", img: socialMediaImage(3) },
  { name: "D-Tec Albania", img: socialMediaImage(4) },
  { name: "AIA Hotel & Apartments", img: socialMediaImage(5) },
  { name: "La Campagna Paulton", img: socialMediaImage(6) },
  { name: "Chard", img: socialMediaImage(7) },
  { name: "La Campagna Warminster", img: socialMediaImage(8) },
  { name: "La Campagna Stonehouse", img: socialMediaImage(9) },
  { name: "The Winford Arms", img: socialMediaImage(10) },
  { name: "Churros by Keira", img: socialMediaImage(11) },
  { name: "City Fitness Club", img: socialMediaImage(12) },
  { name: "Premium International Real Estate", img: socialMediaImage(13) },
  { name: "Altana Longevity Concept", img: socialMediaImage(14) },
  { name: "Brows by Anila", img: socialMediaImage(15) },
  { name: "Zorada", img: socialMediaImage(16) },
  { name: "DDStore", img: socialMediaImage(18) },
  { name: "AM Services", img: socialMediaImage(19) },
  { name: "Av. Gentjana Marku", img: socialMediaImage(20) },
  { name: "BOS Cleaners", img: socialMediaImage(21) },
  { name: "Marku Real Estate", img: socialMediaImage(22) },
  { name: "Albalink", img: socialMediaImage(23) },
];

/** Gallery order: every mockup, with 1.png moved to the end. */
export const SOCIAL_MEDIA_GALLERY_IMAGES = [...SOCIAL_MEDIA_BOARDS.slice(1), SOCIAL_MEDIA_BOARDS[0]].map((b) => b.img);

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

  // --- Website (no internal page, link directly to URL) ---
  { title: "Taxi Dhermi Official", tag: "Website", desc: "Website oficial për shërbimin e taksi dhe transportit në Dhërmj, me informacion për rrugët, rezervime dhe kontakt.", category: "website", thumbnail: "/images/projects/website/taxidhermi.png", websiteUrl: "https://www.taxidhermiofficial.com/", pageShot: { src: "/images/projects/website/taxidhermi-full.jpg", width: 1440, height: 5025 } },
  { title: "O2 Antiage", tag: "Website", desc: "Website për klinikë estetike dhe antiaging, me prezantim të trajtimeve, ekipit dhe rezervimeve online.", category: "website", thumbnail: "/images/projects/website/o2antiage.png", websiteUrl: "https://www.o2antiage.com/", pageShot: { src: "/images/projects/website/o2antiage-full.jpg", width: 1440, height: 9000 } },
  { title: "Cutaj Construction", tag: "Website", desc: "Website profesional për kompani ndërtimi dhe rinovimi në Londër, me prezantim të projekteve, shërbimeve dhe kontaktit.", category: "website", thumbnail: "/images/projects/website/cutaj-construction.png", websiteUrl: "https://www.cutajconstruction.co.uk/" },
];

// ----------------------
// 🇬🇧 ENGLISH
// ----------------------

const projectsEn: Project[] = [
  { ...projectsSq[0], desc: "Management and growth of social media presence." },
  { ...projectsSq[1], desc: "Official website for taxi and transport service in Dhermi, with route information, bookings and contact." },
  { ...projectsSq[2], desc: "Website for an aesthetic and anti-aging clinic, presenting treatments, team and online bookings." },
  { ...projectsSq[3], desc: "Professional website for a construction and renovation company in London, showcasing projects, services and contact." },
];

const projectsDe: Project[] = [
  { ...projectsSq[0], desc: "Management und Steigerung der Social-Media-Präsenz." },
  { ...projectsSq[1], desc: "Offizielle Website für den Taxi- und Transportservice in Dhermi mit Streckeninformationen, Buchungen und Kontakt." },
  { ...projectsSq[2], desc: "Website für eine Ästhetik- und Anti-Aging-Klinik mit Darstellung von Behandlungen, Team und Online-Buchung." },
  { ...projectsSq[3], desc: "Professionelle Website für ein Bau- und Renovierungsunternehmen in London mit Präsentation von Projekten, Leistungen und Kontakt." },
];

export const PROJECTS_BY_LOCALE: Record<Locale, Project[]> = {
  sq: projectsSq,
  en: projectsEn,
  de: projectsDe,
};

/** No per-project URLs; gallery lives on /work. */
export const SOCIAL_MEDIA_SLUGS: string[] = [];

export type FilterTab = { key: ProjectCategory | "all"; label: string };

/** Intro under "Puna jonë e zgjedhur", shared by the homepage section and /work. */
export const WORK_INTRO_BY_LOCALE: Record<Locale, string> = {
  sq: "Rrjete sociale që tërheqin vëmendjen, website që i kthejnë vizitorët në klientë dhe identitete vizuale që mbahen mend. Për biznese nga Shqipëria deri në Britani dhe Kanada.",
  en: "Social media that gets noticed, websites that turn visitors into customers and visual identities people remember. For businesses from Albania to the UK and Canada.",
  de: "Social Media, die auffällt, Websites, die Besucher zu Kunden machen, und visuelle Identitäten, die im Gedächtnis bleiben. Für Unternehmen von Albanien bis Großbritannien und Kanada.",
};

export const WORK_FILTER_TABS_BY_LOCALE: Record<Locale, FilterTab[]> = {
  sq: [
    { key: "all", label: "Të gjitha" },
    { key: "social-media", label: "Social Media" },
    { key: "website", label: "Website" },
  ],
  en: [
    { key: "all", label: "All" },
    { key: "social-media", label: "Social Media" },
    { key: "website", label: "Website" },
  ],
  de: [
    { key: "all", label: "Alle" },
    { key: "social-media", label: "Social Media" },
    { key: "website", label: "Website" },
  ],
};
