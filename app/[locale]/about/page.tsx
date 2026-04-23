// app/[locale]/about/page.tsx - About us (company-focused), localized sq/en/de
import { use } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import MarketingVideo from "@/components/site/MarketingVideo";
import type { Metadata } from "next";
import { getYearsOfExperienceFormatted } from "@/lib/experience";
import { buildLocalizedMetadata } from "@/lib/seo-utils";

type Locale = "sq" | "en" | "de";

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Rreth nesh | Agjenci marketingu & web design Tiranë",
    description:
      "DARA Marketing Agency – agjenci marketingu në Tiranë, Shqipëri. Themeluar 2020. Krijim website, web design, branding dhe marketing digjital për kompani shqiptare dhe ndërkombëtare.",
  },
  en: {
    title: "About DARA",
    description:
      "DARA Marketing Agency. Established in 2020. Helping businesses grow through creative strategies and results-oriented marketing.",
  },
  de: {
    title: "Über uns",
    description:
      "DARA Marketing Agency. Gegründet 2020. Wir helfen Unternehmen durch kreative Strategien und ergebnisorientiertes Marketing zu wachsen.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (["sq", "en", "de"].includes(locale) ? locale : "en") as Locale;
  const meta = META_BY_LOCALE[l];
  return buildLocalizedMetadata({
    locale: l,
    path: "/about",
    title: meta.title,
    description: meta.description,
  });
}

const HERO_BY_LOCALE: Record<
  Locale,
  {
    kicker: string;
    title: string;
    paragraphs: string[];
    stats: { k: string; v: string }[];
    ctaWork: string;
    ctaContact: string;
  }
> = {
  sq: {
    kicker: "Rreth nesh",
    title: "Ne jemi DARA Marketing",
    paragraphs: [
      "DARA Marketing Agency është agjenci marketingu dhe web design në Tiranë, Shqipëri. Themeluar më 2020. Ndihmojmë kompanitë shqiptare dhe ndërkombëtare me krijim website, branding dhe marketing digjital që konverton.",
      "E udhëhequr nga filozofia “Guxo të jesh ndryshe”, besojmë se çdo brand ka një histori unike. Misioni ynë është t’ua sjellim këto histori në jetë përmes strategjive të guximshme dhe përmbajtjes që konverton.",
      "Ekipi ynë kombinojnë kreativitetin, përvojën dhe një qasje praktike për të ndihmuar bizneset në Shqipëri dhe më gjerë të bëhen histori suksesi.",
    ],
    stats: [
      { k: "Themeluar", v: "2020" },
      { k: "DARA", v: "Guxo të jesh ndryshe" },
      { k: "Fokus", v: "Rezultatet & rritja" },
      { k: "Ekipi", v: "" }, // Will be replaced dynamically
    ],
    ctaWork: "Shiko punën tonë",
    ctaContact: "Na kontakto",
  },
  en: {
    kicker: "About us",
    title: "We are DARA Marketing",
    paragraphs: [
      "DARA Marketing Agency is your marketing partner. Established in 2020. We help businesses grow through creative strategies and results-oriented marketing.",
      "Driven by the philosophy “Dare to be Different”, we believe every brand has a unique story. Our mission is to bring those stories to life through bold strategies and content that converts.",
      "Our team combines creativity, experience and a hands-on approach to help local and international businesses become success stories.",
    ],
    stats: [
      { k: "Established", v: "2020" },
      { k: "DARA", v: "Dare to be different" },
      { k: "Focus", v: "Results & growth" },
      { k: "Team", v: "" }, // Will be replaced dynamically
    ],
    ctaWork: "View our work",
    ctaContact: "Contact us",
  },
  de: {
    kicker: "Über uns",
    title: "Wir sind DARA Marketing",
    paragraphs: [
      "DARA Marketing Agency ist Ihre Marketing-Partnerin. Gegründet im Jahr 2020. Wir helfen Unternehmen beim Wachstum durch kreative Strategien und ergebnisorientiertes Marketing.",
      "Geleitet von der Philosophie „Wage es, anders zu sein“, glauben wir, dass jede Marke eine einzigartige Geschichte hat. Unsere Mission ist es, diese Geschichten durch mutige Strategien und konvertierenden Content zum Leben zu erwecken.",
      "Unser Team verbindet Kreativität, Erfahrung und einen praxisnahen Ansatz, um lokale und internationale Unternehmen zu Erfolgsgeschichten zu machen.",
    ],
    stats: [
      { k: "Gegründet", v: "2020" },
      { k: "DARA", v: "Wage es, anders zu sein" },
      { k: "Fokus", v: "Ergebnisse & Wachstum" },
      { k: "Team", v: "" }, // Will be replaced dynamically
    ],
    ctaWork: "Unsere Arbeiten",
    ctaContact: "Kontaktiere uns",
  },
};

const PROCESS_BY_LOCALE: Record<
  Locale,
  { sectionTitle: string; sectionDesc: string; steps: Array<{ n: string; title: string; desc: string; bullets: string[] }> }
> = {
  sq: {
    sectionTitle: "Si punojmë",
    sectionDesc: "Proces i qartë me hapa të përcaktuar. Nga audit te optimizim dhe rritje.",
    steps: [
      {
        n: "01",
        title: "Audit & Discovery",
        desc: "E kuptojmë biznesin, ofertën, audiencën, dhe ku po humbin konvertimet.",
        bullets: ["Audit website + funnel", "Konkurrenca & positioning", "KPI + objektiva", "Plan 7–30 ditë"],
      },
      {
        n: "02",
        title: "Strategy & Assets",
        desc: "Ndërtojmë planin dhe asetet që e bëjnë marketingun të performojë realisht.",
        bullets: ["Landing pages / UX", "Tracking (events + pixels)", "Creative & copy", "Content calendar"],
      },
      {
        n: "03",
        title: "Launch & Testing",
        desc: "Nisim me strukturë, jo \"random ads\". Pastaj testojmë për fitues.",
        bullets: ["Campaign structure", "A/B testing", "Budget allocation", "Offer iterations"],
      },
      {
        n: "04",
        title: "Optimize & Scale",
        desc: "Optimizojmë çdo javë dhe skalojmë vetëm atë që sjell rezultat.",
        bullets: ["Weekly reporting", "CRO improvements", "Scale winners", "New creative cycles"],
      },
    ],
  },
  en: {
    sectionTitle: "How we work",
    sectionDesc: "Clear process with defined steps. From audit to optimization and growth.",
    steps: [
      {
        n: "01",
        title: "Audit & Discovery",
        desc: "We understand your business, offer, audience, and where conversions are lost.",
        bullets: ["Website + funnel audit", "Competition & positioning", "KPI & objectives", "7–30 day plan"],
      },
      {
        n: "02",
        title: "Strategy & Assets",
        desc: "We build the plan and assets that make marketing perform in the real world.",
        bullets: ["Landing pages / UX", "Tracking (events + pixels)", "Creative & copy", "Content calendar"],
      },
      {
        n: "03",
        title: "Launch & Testing",
        desc: "We launch with structure, not random ads. Then we test for winners.",
        bullets: ["Campaign structure", "A/B testing", "Budget allocation", "Offer iterations"],
      },
      {
        n: "04",
        title: "Optimize & Scale",
        desc: "We optimize every week and scale only what delivers results.",
        bullets: ["Weekly reporting", "CRO improvements", "Scale winners", "New creative cycles"],
      },
    ],
  },
  de: {
    sectionTitle: "Wie wir arbeiten",
    sectionDesc: "Klarer Prozess mit definierten Schritten. Vom Audit bis zur Optimierung und zum Wachstum.",
    steps: [
      {
        n: "01",
        title: "Audit & Discovery",
        desc: "Wir verstehen Ihr Geschäft, Ihr Angebot, die Zielgruppe und wo Konversionen verloren gehen.",
        bullets: ["Website- + Funnel-Audit", "Wettbewerb & Positionierung", "KPI & Ziele", "7–30 Tage Plan"],
      },
      {
        n: "02",
        title: "Strategy & Assets",
        desc: "Wir erstellen den Plan und die Assets, die Marketing in der Praxis wirksam machen.",
        bullets: ["Landing Pages / UX", "Tracking (Events + Pixels)", "Creative & Copy", "Content-Kalender"],
      },
      {
        n: "03",
        title: "Launch & Testing",
        desc: "Wir starten mit Struktur, keine zufälligen Ads. Dann testen wir auf Gewinner.",
        bullets: ["Kampagnenstruktur", "A/B-Tests", "Budgetverteilung", "Angebots-Iterationen"],
      },
      {
        n: "04",
        title: "Optimize & Scale",
        desc: "Wir optimieren wöchentlich und skalieren nur, was Ergebnisse liefert.",
        bullets: ["Wöchentliches Reporting", "CRO-Verbesserungen", "Gewinner skalieren", "Neue Creative-Zyklen"],
      },
    ],
  },
};

const MISSION_VISION_BY_LOCALE: Record<
  Locale,
  { sectionTitle: string; sectionDesc: string; missionTitle: string; missionText: string; visionTitle: string; visionText: string }
> = {
  sq: {
    sectionTitle: "Misioni dhe Vizioni",
    sectionDesc: "Çfarë përfaqësojmë dhe ku po shkojmë.",
    missionTitle: "Misioni",
    missionText:
      "Të ndihmojmë bizneset në Shqipëri dhe më gjerë të rriten dhe të pozicionohen fort në treg përmes krijim website, web design, branding dhe marketingut digjital të orientuar nga rezultatet.",
    visionTitle: "Vizioni",
    visionText:
      "Të bëhemi një nga agjencitë më të besuara të web design dhe marketingut në tregun shqiptar, duke ndërtuar website profesionale, marka të forta dhe histori reale suksesi për kompanitë tona.",
  },
  en: {
    sectionTitle: "Mission & Vision",
    sectionDesc: "What we stand for and where we're headed.",
    missionTitle: "Mission",
    missionText:
      "To help businesses grow and position themselves strongly in the market through creative strategies and results-oriented marketing.",
    visionTitle: "Vision",
    visionText:
      "To become one of the most trusted and innovative marketing agencies in the Albanian market and beyond, by building strong brands and real success stories.",
  },
  de: {
    sectionTitle: "Mission & Vision",
    sectionDesc: "Wofür wir stehen und wohin wir uns entwickeln.",
    missionTitle: "Mission",
    missionText:
      "Unternehmen beim Wachstum zu unterstützen und sie durch kreative Strategien und ergebnisorientiertes Marketing stark am Markt zu positionieren.",
    visionTitle: "Vision",
    visionText:
      "Eine der vertrauenswürdigsten und innovativsten Marketingagenturen im albanischen Markt und darüber hinaus zu werden – durch starke Marken und echte Erfolgsgeschichten.",
  },
};

const DIFFERENTIATORS_BY_LOCALE: Record<Locale, { sectionTitle: string; sectionDesc: string; items: { title: string; desc: string }[] }> = {
  sq: {
    sectionTitle: "Çfarë na bën të ndryshëm",
    sectionDesc: "Pse bizneset zgjedhin DARA ndaj agjencive të tjera.",
    items: [
      { title: "Strategji të personalizuara", desc: "Jo modele kopjimi. Çdo biznes merr një qasje të përshtatur." },
      { title: "Fokus te rezultatet reale", desc: "Rritje biznesi dhe rezultate të matshme, jo metrika të zbrazëta." },
      { title: "Kreativitet modern + analizë strategjike", desc: "Ide kreative mbështetur nga të dhëna dhe insight." },
      { title: "Komunikim i drejtpërdrejtë", desc: "Bashkëpunim i ngushtë dhe partneritet transparent me çdo klient." },
      { title: "Mendësi biznesi", desc: "Jo vetëm postime në rrjetet sociale. Mendojmë si pronarë biznesi." },
      { title: "Energji & qasje praktike", desc: "Futemi thellë në çdo projekt dhe punojmë me duar." },
    ],
  },
  en: {
    sectionTitle: "What makes us different",
    sectionDesc: "Why businesses choose DARA over other agencies.",
    items: [
      { title: "Personalized strategies", desc: "Not copy-paste models. Every business gets a tailored approach." },
      { title: "Focus on real results", desc: "Business growth and measurable outcomes, not vanity metrics." },
      { title: "Modern creativity + strategic analysis", desc: "Creative ideas backed by data-driven insights." },
      { title: "Direct communication", desc: "Close collaboration and transparent partnership with every client." },
      { title: "Business mentality", desc: "Not just posts on social networks. We think like business owners." },
      { title: "Energy & hands-on approach", desc: "We roll up our sleeves and dive deep into every project." },
    ],
  },
  de: {
    sectionTitle: "Was uns unterscheidet",
    sectionDesc: "Warum Unternehmen DARA wählen.",
    items: [
      { title: "Individuelle Strategien", desc: "Kein Copy-Paste. Jedes Unternehmen erhält einen maßgeschneiderten Ansatz." },
      { title: "Fokus auf echte Ergebnisse", desc: "Wachstum und messbare Ergebnisse, keine Eitelkeits-Metriken." },
      { title: "Moderne Kreativität + strategische Analyse", desc: "Kreative Ideen mit datengetriebenen Insights." },
      { title: "Direkte Kommunikation", desc: "Enge Zusammenarbeit und transparente Partnerschaft mit jedem Kunden." },
      { title: "Business-Denke", desc: "Nicht nur Social-Media-Posts. Wir denken wie Unternehmer." },
      { title: "Energie & Praxisnähe", desc: "Wir packen mit an und tauchen tief in jedes Projekt ein." },
    ],
  },
};

const TARGET_BY_LOCALE: Record<
  Locale,
  {
    sectionTitle: string;
    sectionDesc: string;
    idealTitle: string;
    idealItems: string[];
    localTitle: string;
    localItems: string[];
    industriesTitle: string;
    industriesItems: string[];
    b2bTitle: string;
    b2bDesc: string;
    b2cTitle: string;
    b2cDesc: string;
  }
> = {
  sq: {
    sectionTitle: "Audienca objektiv",
    sectionDesc: "Me kë punojmë dhe pse jemi zgjedhja e duhur.",
    idealTitle: "Klienti ideal",
    idealItems: [
      "Biznese që duan rritje serioze dhe prezencë profesionale online",
      "Brande që duan të ndërtojnë identitet të fortë dhe strategji afatgjatë",
      "Sipërmarrës që kuptojnë vlerën e marketingut dhe të investimit në brand",
    ],
    localTitle: "Lokal ose online",
    localItems: [
      "Biznese lokale që duan të rriten dhe të modernizohen",
      "Biznes online & e-commerce",
      "Brande personale dhe profesionistë që duan prezencë digjitale të fortë",
    ],
    industriesTitle: "Industritë",
    industriesItems: [
      "Bukuri & Estetikë",
      "Shërbime profesionale",
      "Hotelieri & Restorante",
      "Tregti & E-commerce",
      "Ndërtim & Pasuri të paluajtshme",
      "Personal Branding & Influencerë",
      "Dentist & Stomatologji",
      "Farmaci & Shëndetësi",
      "Avokati & Konsulencë juridike",
      "Arkitekt & Dizajn",
      "Edukim & Trajnime",
      "Teknologji & Software",
      "Modë & Tekstil",
      "Automobila & Transport",
      "Evente & Catering",
      "Fotografi & Video",
      "Fitness & Sport",
      "Agjenshi udhëtimi",
      "Sigurime & Financa",
      "Restorante & Kafe",
      "Spital & Klinika",
      "Imobiliare",
      "Marketing & Reklama",
      "Startup & SME",
      "Korporata",
      "NGO & Fondacione",
      "Muzikë & Art",
      "Gastronomi",
      "Wellness & Spa",
      "Veterinari",
      "Bujqësi",
      "Energji",
      "Logjistikë",
      "IT & Web",
      "Konsumatorë",
      "B2B",
      "B2C",
    ],
    b2bTitle: "Kryesor: B2B",
    b2bDesc: "Shërbime marketingu për biznese dhe kompani.",
    b2cTitle: "Dytësor: B2C",
    b2cDesc: "Personal branding, marketing influencerësh, konsulencë për individë dhe sipërmarrës.",
  },
  en: {
    sectionTitle: "Target audience",
    sectionDesc: "Who we work with and why we're the right fit.",
    idealTitle: "Ideal client",
    idealItems: [
      "Businesses that want serious growth and a professional online presence",
      "Brands that want to build a strong identity and long-term strategy",
      "Entrepreneurs that understand the value of marketing and investing in a brand",
    ],
    localTitle: "Local or online",
    localItems: [
      "Local businesses that want to grow and modernize",
      "Online business & e-commerce",
      "Personal brands and professionals that want a strong digital presence",
    ],
    industriesTitle: "Industries",
    industriesItems: [
      "Beauty & Aesthetics",
      "Professional services",
      "Hospitality & Restaurants",
      "Retail & E-commerce",
      "Construction & Real Estate",
      "Personal Branding & Influencers",
      "Dental & Orthodontics",
      "Pharmacy & Healthcare",
      "Legal & Consulting",
      "Architecture & Design",
      "Education & Training",
      "Technology & Software",
      "Fashion & Textile",
      "Automotive & Transport",
      "Events & Catering",
      "Photography & Video",
      "Fitness & Sports",
      "Travel agencies",
      "Insurance & Finance",
      "Restaurants & Cafes",
      "Hospitals & Clinics",
      "Real estate",
      "Marketing & Advertising",
      "Startups & SMEs",
      "Corporates",
      "NGOs & Foundations",
      "Music & Arts",
      "Gastronomy",
      "Wellness & Spa",
      "Veterinary",
      "Agriculture",
      "Energy",
      "Logistics",
      "IT & Web",
      "Consumer",
      "B2B",
      "B2C",
    ],
    b2bTitle: "Primary: B2B",
    b2bDesc: "Marketing services for businesses and companies.",
    b2cTitle: "Secondary: B2C",
    b2cDesc: "Personal branding, influencer marketing, consulting for individuals & entrepreneurs.",
  },
  de: {
    sectionTitle: "Zielgruppe",
    sectionDesc: "Mit wem wir arbeiten und warum wir passen.",
    idealTitle: "Idealer Kunde",
    idealItems: [
      "Unternehmen, die ernsthaft wachsen und professionell online präsent sein wollen",
      "Marken, die eine starke Identität und Langfriststrategie aufbauen wollen",
      "Unternehmer, die den Wert von Marketing und Markeninvestition verstehen",
    ],
    localTitle: "Lokal oder online",
    localItems: [
      "Lokale Unternehmen, die wachsen und modernisieren wollen",
      "Online-Business & E-Commerce",
      "Personal Brands und Profis mit starker digitaler Präsenz",
    ],
    industriesTitle: "Branchen",
    industriesItems: [
      "Beauty & Ästhetik",
      "Professionelle Dienstleistungen",
      "Gastgewerbe & Restaurants",
      "Einzelhandel & E-Commerce",
      "Bau & Immobilien",
      "Personal Branding & Influencer",
      "Zahnmedizin & Kieferorthopädie",
      "Apotheke & Gesundheitswesen",
      "Recht & Beratung",
      "Architektur & Design",
      "Bildung & Training",
      "Technologie & Software",
      "Mode & Textil",
      "Automobil & Transport",
      "Events & Catering",
      "Fotografie & Video",
      "Fitness & Sport",
      "Reisebüros",
      "Versicherung & Finanzen",
      "Restaurants & Cafés",
      "Krankenhäuser & Kliniken",
      "Immobilien",
      "Marketing & Werbung",
      "Startups & KMU",
      "Konzerne",
      "NGOs & Stiftungen",
      "Musik & Kunst",
      "Gastronomie",
      "Wellness & Spa",
      "Tierarzt",
      "Landwirtschaft",
      "Energie",
      "Logistik",
      "IT & Web",
      "Verbraucher",
      "B2B",
      "B2C",
    ],
    b2bTitle: "Primär: B2B",
    b2bDesc: "Marketingdienstleistungen für Unternehmen.",
    b2cTitle: "Sekundär: B2C",
    b2cDesc: "Personal Branding, Influencer-Marketing, Beratung für Einzelpersonen & Unternehmer.",
  },
};

const CTA_BY_LOCALE: Record<Locale, { titleRest: string; titleHighlight: string; subtitle: string; contact: string; viewWork: string }> = {
  sq: {
    titleRest: "Le të punojmë bashkë dhe të krijojmë ",
    titleHighlight: "diçka të madhe.",
    subtitle: "Ndani vizionin dhe objektivat.\nDo të kthehemi me një plan të qartë.",
    contact: "Na kontakto",
    viewWork: "Shiko punën tonë",
  },
  en: {
    titleRest: "Let's work together and create ",
    titleHighlight: "something great.",
    subtitle: "Share your vision and objectives.\nWe'll get back with a clear plan.",
    contact: "Contact us",
    viewWork: "View our work",
  },
  de: {
    titleRest: "Lass uns gemeinsam ",
    titleHighlight: "etwas Großartiges schaffen.",
    subtitle: "Teilen Sie Ihre Vision und Ziele. Wir melden uns mit einem klaren Plan.",
    contact: "Kontaktiere uns",
    viewWork: "Unsere Arbeiten",
  },
};

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeFromParams } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeFromParams as Locale) ? (localeFromParams as Locale) : "sq";

  const yearsExpFormatted = getYearsOfExperienceFormatted();
  const heroRaw = HERO_BY_LOCALE[locale];
  // Replace experience stat dynamically
  const hero = {
    ...heroRaw,
    stats: heroRaw.stats.map((stat) =>
      stat.k === "Ekipi" || stat.k === "Team"
        ? {
            ...stat,
            v:
              locale === "sq"
                ? `${yearsExpFormatted} vite përvojë`
                : locale === "de"
                ? `${yearsExpFormatted} Jahre Erfahrung`
                : `${yearsExpFormatted} years experience`,
          }
        : stat
    ),
  };
  const process = PROCESS_BY_LOCALE[locale];
  const missionVision = MISSION_VISION_BY_LOCALE[locale];
  const differentiators = DIFFERENTIATORS_BY_LOCALE[locale];
  const target = TARGET_BY_LOCALE[locale];
  const cta = CTA_BY_LOCALE[locale];

  return (
    <>
      {/* HERO - Full-width modern hero */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="grid items-center gap-10 sm:gap-14 md:gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="relative order-1 text-center lg:order-2 lg:text-left">
              <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                {hero.kicker}
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl xl:text-7xl">
                {hero.title.includes(" ") ? (
                  <>
                    {hero.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-gray-900">
                      {hero.title.split(" ").slice(-1)[0]}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-900">
                    {hero.title}
                  </span>
                )}
              </h1>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-gray-600 md:text-lg">
                {hero.paragraphs.map((p, idx) => (
                  <p key={idx} className="mx-auto max-w-xl lg:mx-0">{p}</p>
                ))}
              </div>

              {/* Stats - horizontal bar */}
              <div className="mt-10 flex flex-wrap justify-center gap-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:gap-10 md:p-8 lg:justify-start">
                {hero.stats.map((s) => (
                  <div key={s.k} className="flex flex-col text-center lg:text-left">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">{s.k}</span>
                    <span className="mt-1 text-lg font-bold text-gray-900 md:text-xl">{s.v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
                <LocaleLink
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gray-900 px-8 font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
                >
                  {hero.ctaContact}
                </LocaleLink>
                <LocaleLink
                  href="/work"
                  className="inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-300 px-8 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50 sm:w-auto"
                >
                  {hero.ctaWork}
                </LocaleLink>
              </div>
            </div>

            <div className="relative order-2 lg:order-1 flex justify-center items-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
                <div className="aspect-[9/16] overflow-hidden rounded-[1.75rem] border-4 border-gray-900/10 bg-black shadow-2xl shadow-gray-900/10">
                  <MarketingVideo src="/video/about-dara.mp4" className="h-full w-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-sm font-medium text-white">DARA Marketing Agency</p>
                    <p className="text-xs text-white/90">{hero.stats[1]?.v}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS - Modern grid */}
      <section id="process" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="text-center">
            <AnimateIn delay={0}>
              <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                {process.sectionTitle}
              </span>
            </AnimateIn>
            <AnimateIn delay={100}>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                {process.sectionTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{process.sectionDesc}</p>
            </AnimateIn>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step, idx) => (
              <AnimateIn key={step.n} delay={idx * 80}>
                <div className="card card-lift group relative flex h-full flex-col overflow-hidden p-6 text-center lg:text-left">
                  <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{step.desc}</p>
                  <ul className="mx-auto mt-6 max-w-[16rem] space-y-2 text-left lg:mx-0 lg:max-w-none">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="text-center lg:text-left">
              <AnimateIn delay={0}>
                <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                  {missionVision.sectionTitle}
                </span>
              </AnimateIn>
              <AnimateIn delay={100}>
                <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  {missionVision.sectionTitle}
                </h2>
                <p className="mt-4 text-lg text-gray-600">{missionVision.sectionDesc}</p>
              </AnimateIn>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <AnimateIn delay={150}>
                <div className="card card-lift relative overflow-hidden p-8 text-center lg:text-left">
                  <div className="relative">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 mx-auto lg:mx-0">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{missionVision.missionTitle}</h3>
                    <p className="mt-4 leading-relaxed text-gray-600">{missionVision.missionText}</p>
                  </div>
                </div>
              </AnimateIn>
              <AnimateIn delay={200}>
                <div className="card card-lift relative overflow-hidden p-8 text-center lg:text-left">
                  <div className="relative">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 mx-auto lg:mx-0">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{missionVision.visionTitle}</h3>
                    <p className="mt-4 leading-relaxed text-gray-600">{missionVision.visionText}</p>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="text-center">
            <AnimateIn delay={0}>
              <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                {differentiators.sectionTitle}
              </span>
            </AnimateIn>
            <AnimateIn delay={100}>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                {differentiators.sectionTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{differentiators.sectionDesc}</p>
            </AnimateIn>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.items.map((d, idx) => (
              <AnimateIn key={d.title} delay={idx * 60}>
                <div className="card card-lift group relative flex h-full flex-col p-6 text-center">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white transition group-hover:bg-gray-800 mx-auto">
                    <span className="text-lg font-bold">{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{d.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{d.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="text-center">
            <AnimateIn delay={0}>
              <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                {target.sectionTitle}
              </span>
            </AnimateIn>
            <AnimateIn delay={100}>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                {target.sectionTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{target.sectionDesc}</p>
            </AnimateIn>
          </div>

          <div className="mt-16 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <AnimateIn delay={150}>
                <div className="card h-full p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{target.idealTitle}</h3>
                  <ul className="mx-auto mt-4 max-w-[17rem] space-y-3 text-left lg:mx-0 lg:max-w-none">
                    {target.idealItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
              <AnimateIn delay={200}>
                <div className="card h-full p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{target.localTitle}</h3>
                  <ul className="mx-auto mt-4 max-w-[17rem] space-y-3 text-left lg:mx-0 lg:max-w-none">
                    {target.localItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            </div>
            <AnimateIn delay={250}>
              <div className="card p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900">{target.industriesTitle}</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {target.industriesItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 transition hover:border-gray-300 hover:bg-gray-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn delay={300}>
              <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-8 md:p-10">
                <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900">
                    <span className="text-lg font-bold text-white">B2B</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{target.b2bTitle}</h3>
                    <p className="mt-2 text-gray-600">{target.b2bDesc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900">
                    <span className="text-lg font-bold text-white">B2C</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{target.b2cTitle}</h3>
                    <p className="mt-2 text-gray-600">{target.b2cDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-10 md:p-16 lg:p-20">
            <div className="relative text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                {cta.titleRest}
                <span className="text-gray-900">{cta.titleHighlight}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-lg text-gray-600">{cta.subtitle}</p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <LocaleLink
                  href="/contact"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-gray-900 px-10 font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
                >
                  {cta.contact}
                </LocaleLink>
                <LocaleLink
                  href="/work"
                  className="inline-flex h-14 items-center justify-center rounded-full border-2 border-gray-300 px-10 font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-50 sm:w-auto"
                >
                  {cta.viewWork}
                </LocaleLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
