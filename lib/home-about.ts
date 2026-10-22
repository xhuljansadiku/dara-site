import { PROJECTS_DELIVERED } from "@/lib/business-facts";

type Locale = "sq" | "en" | "de";

/** Copy for the homepage "Rreth nesh / About us" section. */
export const ABOUT_BY_LOCALE: Record<
  Locale,
  { kicker: string; titlePrefix: string; titleAccent: string; paragraphs: string[]; readMore: string }
> = {
  sq: {
    kicker: "Rreth nesh",
    titlePrefix: "Ne jemi ",
    titleAccent: "DARA.",
    paragraphs: [
      "DARA Marketing Agency është agjencia juaj e marketingut, themeluar më 2020. Ndihmojmë bizneset të rriten përmes strategjive krijuese dhe marketingut të orientuar nga rezultatet.",
      "E udhëhequr nga filozofia “Guxo të jesh ndryshe”, besojmë se çdo brand ka një histori unike. Misioni ynë është t’ua sjellim këto histori në jetë përmes strategjive të guximshme dhe përmbajtjes që konverton.",
      "Punojmë me biznese lokale dhe ndërkombëtare, duke kombinuar kreativitetin, analizën dhe një qasje praktike për të arritur rritje të matshme.",
    ],
    readMore: "Lexo më shumë",
  },
  en: {
    kicker: "About us",
    titlePrefix: "We are ",
    titleAccent: "DARA.",
    paragraphs: [
      "DARA Marketing Agency is your marketing partner, established in 2020. We help businesses grow through creative strategies and results-oriented marketing.",
      "Driven by the philosophy “Dare to be Different”, we believe every brand has a unique story. Our mission is to bring those stories to life through bold strategies and content that converts.",
      "We work with local and international businesses, combining creativity, analysis and a hands-on approach to deliver measurable growth.",
    ],
    readMore: "Read more",
  },
  de: {
    kicker: "Über uns",
    titlePrefix: "Wir sind ",
    titleAccent: "DARA.",
    paragraphs: [
      "DARA Marketing Agency ist Ihre Marketing-Partnerin, gegründet im Jahr 2020. Wir helfen Unternehmen beim Wachstum durch kreative Strategien und ergebnisorientiertes Marketing.",
      "Geleitet von der Philosophie „Wage es, anders zu sein“, glauben wir, dass jede Marke eine einzigartige Geschichte hat. Unsere Mission ist es, diese Geschichten durch mutige Strategien und konvertierenden Content zum Leben zu erwecken.",
      "Wir arbeiten mit lokalen und internationalen Unternehmen und verbinden Kreativität, Analyse und einen praxisnahen Ansatz für messbares Wachstum.",
    ],
    readMore: "Mehr erfahren",
  },
};

/** The first value (years of experience) is filled in at render time. */
export const ABOUT_STATS_BY_LOCALE: Record<Locale, { value: string; label: string }[]> = {
  sq: [
    { value: "", label: "vite eksperiencë" }, // Will be replaced dynamically
    { value: PROJECTS_DELIVERED, label: "projekte të realizuara" },
    { value: "AL + 🌍", label: "klientë në Shqipëri dhe në gjithë botën" },
  ],
  en: [
    { value: "", label: "years experience" }, // Will be replaced dynamically
    { value: PROJECTS_DELIVERED, label: "projects delivered" },
    { value: "AL + 🌍", label: "clients in Albania and around the world" },
  ],
  de: [
    { value: "", label: "Jahre Erfahrung" }, // Will be replaced dynamically
    { value: PROJECTS_DELIVERED, label: "umgesetzte Projekte" },
    { value: "AL + 🌍", label: "Kunden in Albanien und weltweit" },
  ],
};

/** The agency motto, as used in the about copy. */
export const MOTTO_BY_LOCALE: Record<Locale, string> = {
  sq: "Guxo të jesh ndryshe",
  en: "Dare to be different",
  de: "Wage es, anders zu sein",
};
