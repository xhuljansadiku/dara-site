import { getYearsOfExperienceFormatted } from "@/lib/experience";

export type TeamLocale = "sq" | "en" | "de";

export type TeamMemberPublic = {
  name: string;
  role: string;
  bio: string;
  /** Profile photo; omit when using `initials` */
  img?: string;
  /** Monogram when no photo (logo-gold avatar) */
  initials?: string;
  /**
   * CSS object-position for portrait crop (uniform framing across team).
   * @example "center 32%" (focal point from top of source image)
   */
  photoObjectPosition?: string;
  /** Desaturate photo for a consistent editorial look (default true when img set) */
  photoGrayscale?: boolean;
  /** Slight zoom (>1) when source framing is wider / subject looks “far” */
  photoScale?: number;
  /** Public profile links (shown on homepage team cards when both set) */
  linkedin?: string;
  instagram?: string;
};

/**
 * Shared roster for homepage Team section and /team page (keep in sync).
 */
export function getTeamMembersForLocale(locale: TeamLocale): TeamMemberPublic[] {
  const yearsExperienceFormatted = getYearsOfExperienceFormatted();

  return [
    {
      name: "Redvina M.",
      role: "Founder",
      bio:
        locale === "sq"
          ? `Themeluese e DARA. ${yearsExperienceFormatted} vjet në marketing, strategji dhe udhëheqje ekipi.`
          : locale === "de"
            ? `Gründerin von DARA. ${yearsExperienceFormatted} Jahre Erfahrung in Marketing, Strategie und Teamführung.`
            : `Founder of DARA. ${yearsExperienceFormatted} years in marketing, strategy, and team leadership.`,
      img: "/team/redvina-m.png",
      photoGrayscale: true,
      linkedin: "https://www.linkedin.com/in/redvina-marini/",
      instagram: "https://www.instagram.com/redvinamarini/?hl=en",
    },
    {
      name: "Reli M.",
      role: "Content Creator & Videographer",
      bio:
        locale === "sq"
          ? "Video, skenar dhe vizual që përçojnë mesazhin e brandit qartë dhe me ritëm."
          : locale === "de"
            ? "Video, Skript und Visuals, die die Markenbotschaft klar und mit Rhythmus transportieren."
            : "Video, scripts, and visuals that carry the brand message with clarity and pace.",
      img: "/team/reli-m.jpeg",
      photoGrayscale: true,
    },
    {
      name: "Xhulian S.",
      role: "Web & App Developer",
      bio:
        locale === "sq"
          ? "Zhvillon dhe mirëmban faqe dhe aplikacione, nga UI deri te integrimet."
          : locale === "de"
            ? "Entwickelt und betreut Websites und Apps, von UI bis zu Integrationen."
            : "Builds and maintains websites and apps, from UI to integrations.",
      img: "/team/xhulian-s.png",
      photoGrayscale: true,
    },
    {
      name: "Sabina T.",
      role: "Account Manager",
      bio:
        locale === "sq"
          ? "Lidhja mes klientëve dhe ekipit: brief, plan dhe follow-up deri në rezultat."
          : locale === "de"
            ? "Die Schnittstelle zwischen Kunden und Team: Briefing, Planung und Follow-up bis zum Ergebnis."
            : "The bridge between clients and the team: briefs, planning, and follow-through to results.",
      initials: "ST",
    },
    {
      name: "Suada K.",
      role: "Content Creator & Social Media Manager",
      bio:
        locale === "sq"
          ? "Përmbajtje për platforma, kalendar editorial dhe komunikim me komunitetin."
          : locale === "de"
            ? "Content für Plattformen, Redaktionsplan und Dialog mit der Community."
            : "Platform content, editorial calendars, and community-facing communication.",
      initials: "SK",
    },
    {
      name: "Adelaida B.",
      role: "Content Creator & Social Media Manager",
      bio:
        locale === "sq"
          ? "Strategji përmbajtjeje, trende dhe prezencë e qëndrueshme në rrjetet sociale."
          : locale === "de"
            ? "Content-Strategie, Trends und eine konsistente Präsenz in den sozialen Netzwerken."
            : "Content strategy, trends, and a consistent social presence across channels.",
      initials: "AB",
    },
  ];
}
