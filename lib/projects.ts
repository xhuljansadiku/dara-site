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

// ----------------------
// Local & External Thumbnails
// ----------------------

const THUMBNAILS = [
  "/images/projects/social-media/albalink/albalink_international_6.webp",
  "/images/projects/social-media/am_services/am_services_8.webp",
  "/images/projects/social-media/arome.edit/arome.edit_1.webp",
  "/images/projects/social-media/bos_cleaners/bos_cleaners_6.webp",
  "/images/projects/social-media/brows_by_anila/brows_by_anila_3.jpeg",
  "/images/projects/social-media/churros/churros_1.jpeg",
  "/images/projects/social-media/ddstore/ddstore_5.webp",
  "/images/projects/social-media/dtec/dtec_4.webp",
  "/images/projects/social-media/gentjana/gentjana_4.webp",
  "/images/projects/social-media/la_campagna/la_campagna_chard/la_campagna_chard_9.jpeg",
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
  { title: "Gentjana Marku", tag: "Social Media", desc: "Personal brand management.", category: "social-media", thumbnail: THUMBNAILS[8] },
  { title: "La Campagna", tag: "Social Media", desc: "Menaxhim për disa biznese.", category: "social-media", thumbnail: THUMBNAILS[9] },

  // --- Brand Identity ---
  { title: "Albalink International", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/ai.png" },
  { title: "Altana Longevity Concept", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/alc.png" },
  { title: "Arome Edit", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/ae.png" },
  { title: "Gentjana Marku — Avokate", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/gma.png" },
  { title: "Klajdi Hidrosanitare", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/klajdi-h.png" },
  { title: "Marku Real Estate", tag: "Brand Identity", desc: "Logo dhe identitet vizual.", category: "brand", thumbnail: "/images/projects/brand/mre.png" },

  // --- Website ---
  {
    title: "ESM GROUP",
    tag: "Website",
    desc: "Website korporativ për kompani ndërtimi dhe montimi strukturash metalike.",
    category: "website",
    thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
  },
  {
    title: "Palushi Brothers",
    tag: "Website",
    desc: "Website për kompani ndërtimi dhe rinovimi në Londër, që prezanton shërbimet, projektet dhe kontaktin për klientët e banimit dhe komerciale.",
    category: "website",
    thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
  }
  ,
  {
    title: "HAUSWERK Niederbayern",
    tag: "Website",
    desc: "Website për shërbime objektesh pastrim, mirëmbajtje dhe kujdes shtëpie/zyre në Niederbayern, me prezantim të shërbimeve dhe kontakt për oferta.",
    category: "website",
    thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
  }
  ,
  {
    title: "Bardhi Wellness",
    tag: "Website",
    desc: "Platformë online trajnimi dhe nutricioni me plane të personalizuara, rezultate klientësh dhe paketë abonimi për shëndet dhe fitnes.",
    category: "website",
    thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
  }
  ,
  {
    title: "Besi's Imbiss",
    tag: "Website",
    desc: "Website për Imbiss lokal në Weiden in der Oberpfalz me menu ushqimesh, orare dhe kontakt për porosi ose vizitë në vend.",
    category: "website",
    thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
  }
  ,
];

// ----------------------
// 🇬🇧 ENGLISH
// ----------------------

const projectsEn: Project[] = projectsSq.map((p) => ({
  ...p,
  desc:
    p.category === "brand"
      ? "Logo and brand identity."
      : p.category === "website"
      ? "Website design and development."
      : "Social media management and strategy.",
}));

// ----------------------
// 🇩🇪 GERMAN
// ----------------------

const projectsDe: Project[] = projectsSq.map((p) => ({
  ...p,
  desc:
    p.category === "brand"
      ? "Logo und Markenidentität."
      : p.category === "website"
      ? "Webdesign und Entwicklung."
      : "Social-Media-Management und Strategie.",
}));

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
