// lib/projects.ts – Projects data and filter config for Work section

export type Locale = "sq" | "en" | "de";

export type ProjectCategory = "social-media" | "brand" | "website";

export type Project = {
  title: string;
  tag: string;
  desc: string;
  category: ProjectCategory;
  thumbnail?: string;
};

// Unsplash thumbnails (used for social-media projects)
const THUMBNAILS = [
  "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
];

// ----------------------
// 🇦🇱 ALBANIAN
// ----------------------

const projectsSq: Project[] = [
  // --- Social Media ---
  { title: "Albalink", tag: "Social Media", desc: "Menaxhim dhe rritje e prezencës në rrjetet sociale.", category: "social-media", thumbnail: THUMBNAILS[0] },
  { title: "Am Services", tag: "Social Media", desc: "Strategji dhe përmbajtje për rritje të audiencës.", category: "social-media", thumbnail: THUMBNAILS[1] },
  { title: "Arome.edit", tag: "Social Media", desc: "Identitet vizual dhe përmbajtje kreative.", category: "social-media", thumbnail: THUMBNAILS[2] },
  { title: "Bos Cleaners", tag: "Social Media", desc: "Ndërtim i prezencës online.", category: "social-media", thumbnail: THUMBNAILS[3] },
  { title: "Brows By Anila", tag: "Social Media", desc: "Menaxhim rrjetesh për brand bukurie.", category: "social-media", thumbnail: THUMBNAILS[4] },
  { title: "Churros", tag: "Social Media", desc: "Strategji për brand ushqimi.", category: "social-media", thumbnail: THUMBNAILS[5] },
  { title: "DDstore", tag: "Social Media", desc: "Marketing për e-commerce.", category: "social-media", thumbnail: THUMBNAILS[6] },
  { title: "DTEC", tag: "Social Media", desc: "Komunikim për brand teknologjie.", category: "social-media", thumbnail: THUMBNAILS[7] },
  { title: "Gentjana", tag: "Social Media", desc: "Personal brand management.", category: "social-media", thumbnail: THUMBNAILS[8] },
  { title: "La Campagna 5 biznese", tag: "Social Media", desc: "Menaxhim për disa biznese.", category: "social-media", thumbnail: THUMBNAILS[9] },

  // --- Brand Identity (LOCAL PNG LOGOS) ---
  { title: "Albalink International", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/ai.png" },
  { title: "Altana Longevity Concept", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/alc.png" },
  { title: "Arome Edit", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/ae.png" },
  { title: "Gentjana Marku — Avokate", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/gma.png" },
  { title: "Klajdi Hidrosanitare", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/klajdi-h.png" },
  { title: "Marku Real Estate", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/mre.png" },
];

// ----------------------
// 🇬🇧 ENGLISH
// ----------------------

const projectsEn: Project[] = [
  ...projectsSq.map((p) => ({
    ...p,
    desc:
      p.category === "brand"
        ? "Logo and brand identity."
        : "Social media management and strategy.",
  })),
];

// ----------------------
// 🇩🇪 GERMAN
// ----------------------

const projectsDe: Project[] = [
  ...projectsSq.map((p) => ({
    ...p,
    desc:
      p.category === "brand"
        ? "Logo und Markenidentität."
        : "Social-Media-Management und Strategie.",
  })),
];

export const PROJECTS_BY_LOCALE: Record<Locale, Project[]> = {
  sq: projectsSq,
  en: projectsEn,
  de: projectsDe,
};

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
