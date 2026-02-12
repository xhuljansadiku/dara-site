// app/[locale]/about/page.tsx - About us (company-focused), localized sq/en/de
import Image from "next/image";
import { use } from "react";
import LocaleLink from "@/components/site/LocaleLink";
import AnimateIn from "@/components/site/AnimateIn";
import type { Metadata } from "next";
import { getYearsOfExperienceFormatted } from "@/lib/experience";

type Locale = "sq" | "en" | "de";

export const metadata: Metadata = {
  title: "About DARA",
  description:
    "DARA Marketing Agency — established in 2020. Helping businesses grow through creative strategies and results-oriented marketing.",
};

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
      "DARA Marketing Agency është agjencia juaj e marketingut — themeluar më 2020. Ndihmojmë bizneset të rriten përmes strategjive krijuese dhe marketingut të orientuar nga rezultatet.",
      "E udhëhequr nga filozofia “Guxo të jesh ndryshe”, besojmë se çdo brand ka një histori unike. Misioni ynë është t’ua sjellim këto histori në jetë përmes strategjive të guximshme dhe përmbajtjes që konverton.",
      "Ekipi ynë kombinojnë kreativitetin, përvojën dhe një qasje praktike për të ndihmuar bizneset lokale dhe ndërkombëtare të bëhen histori suksesi.",
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
      "DARA Marketing Agency is your marketing partner — established in 2020. We help businesses grow through creative strategies and results-oriented marketing.",
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
      "DARA Marketing Agency ist Ihre Marketing-Partnerin — gegründet im Jahr 2020. Wir helfen Unternehmen beim Wachstum durch kreative Strategien und ergebnisorientiertes Marketing.",
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
    sectionDesc: "Proces i qartë me hapa të përcaktuar — nga audit te optimizim dhe rritje.",
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
    sectionDesc: "Clear process with defined steps — from audit to optimization and growth.",
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
    sectionDesc: "Klarer Prozess mit definierten Schritten — vom Audit bis zur Optimierung und zum Wachstum.",
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
      "Të ndihmojmë bizneset të rriten dhe të pozicionohen fort në treg përmes strategjive krijuese dhe marketingut të orientuar nga rezultatet.",
    visionTitle: "Vizioni",
    visionText:
      "Të bëhemi një nga agjencitë më të besuara dhe inovative të marketingut në tregun shqiptar dhe më gjerë, duke ndërtuar marka të forta dhe histori reale suksesi.",
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
      { title: "Strategji të personalizuara", desc: "Jo modele kopjimi — çdo biznes merr një qasje të përshtatur." },
      { title: "Fokus te rezultatet reale", desc: "Rritje biznesi dhe rezultate të matshme, jo metrika të zbrazëta." },
      { title: "Kreativitet modern + analizë strategjike", desc: "Ide kreative mbështetur nga të dhëna dhe insight." },
      { title: "Komunikim i drejtpërdrejtë", desc: "Bashkëpunim i ngushtë dhe partneritet transparent me çdo klient." },
      { title: "Mendësi biznesi", desc: "Jo vetëm postime në rrjetet sociale — mendojmë si pronarë biznesi." },
      { title: "Energji & qasje praktike", desc: "Futemi thellë në çdo projekt dhe punojmë me duar." },
    ],
  },
  en: {
    sectionTitle: "What makes us different",
    sectionDesc: "Why businesses choose DARA over other agencies.",
    items: [
      { title: "Personalized strategies", desc: "Not copy-paste models — every business gets a tailored approach." },
      { title: "Focus on real results", desc: "Business growth and measurable outcomes, not vanity metrics." },
      { title: "Modern creativity + strategic analysis", desc: "Creative ideas backed by data-driven insights." },
      { title: "Direct communication", desc: "Close collaboration and transparent partnership with every client." },
      { title: "Business mentality", desc: "Not just posts on social networks — we think like business owners." },
      { title: "Energy & hands-on approach", desc: "We roll up our sleeves and dive deep into every project." },
    ],
  },
  de: {
    sectionTitle: "Was uns unterscheidet",
    sectionDesc: "Warum Unternehmen DARA wählen.",
    items: [
      { title: "Individuelle Strategien", desc: "Kein Copy-Paste — jedes Unternehmen erhält einen maßgeschneiderten Ansatz." },
      { title: "Fokus auf echte Ergebnisse", desc: "Wachstum und messbare Ergebnisse, keine Eitelkeits-Metriken." },
      { title: "Moderne Kreativität + strategische Analyse", desc: "Kreative Ideen mit datengetriebenen Insights." },
      { title: "Direkte Kommunikation", desc: "Enge Zusammenarbeit und transparente Partnerschaft mit jedem Kunden." },
      { title: "Business-Denke", desc: "Nicht nur Social-Media-Posts — wir denken wie Unternehmer." },
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
    subtitle: "Ndani vizionin dhe objektivat. Do të kthehemi me një plan të qartë.",
    contact: "Na kontakto",
    viewWork: "Shiko punën tonë",
  },
  en: {
    titleRest: "Let's work together and create ",
    titleHighlight: "something great.",
    subtitle: "Share your vision and objectives. We'll get back with a clear plan.",
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
      {/* HERO - We are DARA Marketing */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#c8a55c]/[0.04] to-transparent" />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#c8a55c]">
              {hero.kicker}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {hero.title.includes(" ") ? (
                <>
                  {hero.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-[#c8a55c]">{hero.title.split(" ").slice(-1)[0]}</span>
                </>
              ) : (
                <span className="text-[#c8a55c]">{hero.title}</span>
              )}
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/70 md:text-lg">
              {hero.paragraphs.map((p, idx) => (
                <p key={idx} className="max-w-2xl">{p}</p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {hero.stats.map((s) => (
                <div
                  key={s.k}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#c8a55c]/30"
                >
                  <p className="text-xs text-white/60">{s.k}</p>
                  <p className="mt-1 font-medium text-white/90">{s.v}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <LocaleLink
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#c8a55c] px-6 font-medium text-black shadow-[0_0_24px_rgba(200,165,92,0.25)] transition hover:bg-[#b6944f] sm:w-auto"
              >
                {hero.ctaContact}
              </LocaleLink>
              <LocaleLink
                href="/work"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-white/90 transition hover:border-[#c8a55c]/40 hover:bg-white/10 sm:w-auto"
              >
                {hero.ctaWork}
              </LocaleLink>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl lg:aspect-[5/4] lg:rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                alt="DARA Marketing Agency — team and collaboration"
                width={900}
                height={600}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-3/4 w-full rounded-3xl bg-[#c8a55c]/10 blur-2xl" />
          </div>
        </div>
      </section>

      {/* PROCESS - How we work */}
      <section id="process" className="py-14 md:py-20">
        <AnimateIn delay={0}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#c8a55c]">
            {process.sectionTitle}
          </p>
        </AnimateIn>
        <AnimateIn delay={100}>
          <h2 className="mt-4 font-display text-2xl font-semibold md:text-3xl lg:text-4xl">
            {process.sectionTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-white/60">{process.sectionDesc}</p>
        </AnimateIn>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, idx) => (
            <AnimateIn key={step.n} delay={idx * 100}>
              <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition-all duration-300 hover:border-[#c8a55c]/30 hover:bg-gradient-to-br hover:from-white/[0.1] hover:to-white/[0.05] hover:shadow-[0_0_30px_rgba(200,165,92,0.1)]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-3xl font-bold text-[#c8a55c]/30">{step.n}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#c8a55c]/20 to-transparent ml-4" />
                </div>
                <h3 className="text-lg font-semibold text-white/95 transition group-hover:text-[#c8a55c]/90">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{step.desc}</p>
                <ul className="mt-5 space-y-2">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-xs text-white/60">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c8a55c]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#c8a55c]/0 to-[#c8a55c]/0 transition group-hover:from-[#c8a55c]/5 group-hover:to-transparent" />
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-14 md:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#c8a55c]">
          {missionVision.sectionTitle}
        </p>
        <p className="mt-2 max-w-2xl text-white/60">{missionVision.sectionDesc}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-[#c8a55c]/20 md:p-8">
            <h3 className="text-lg font-semibold text-[#c8a55c]">{missionVision.missionTitle}</h3>
            <p className="mt-4 leading-relaxed text-white/70">{missionVision.missionText}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-[#c8a55c]/20 md:p-8">
            <h3 className="text-lg font-semibold text-[#c8a55c]">{missionVision.visionTitle}</h3>
            <p className="mt-4 leading-relaxed text-white/70">{missionVision.visionText}</p>
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="py-14 md:py-20">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">
          {differentiators.sectionTitle.includes(" ") ? (
            <>
              {differentiators.sectionTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#c8a55c]">{differentiators.sectionTitle.split(" ").slice(-1)[0]}</span>
            </>
          ) : (
            <span className="text-[#c8a55c]">{differentiators.sectionTitle}</span>
          )}
        </h2>
        <p className="mt-2 max-w-2xl text-white/60">{differentiators.sectionDesc}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.items.map((d) => (
            <div
              key={d.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-0.5 hover:border-[#c8a55c]/30 hover:shadow-lg"
            >
              <h3 className="text-lg font-medium text-white/90">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section className="py-12 md:py-16">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">
          {target.sectionTitle.includes(" ") ? (
            <>
              {target.sectionTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#c8a55c]">{target.sectionTitle.split(" ").slice(-1)[0]}</span>
            </>
          ) : (
            <span className="text-[#c8a55c]">{target.sectionTitle}</span>
          )}
        </h2>
        <p className="mt-2 max-w-2xl text-white/60">{target.sectionDesc}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-medium text-[#c8a55c]">{target.idealTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {target.idealItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-medium text-[#c8a55c]">{target.localTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {target.localItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-medium text-[#c8a55c]">{target.industriesTitle}</h3>
            <ul className="mt-3 space-y-1 text-sm text-white/70">
              {target.industriesItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-6 md:col-span-2 lg:col-span-3">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-base font-medium text-[#c8a55c]">{target.b2bTitle}</h3>
                <p className="mt-1 text-sm text-white/70">{target.b2bDesc}</p>
              </div>
              <div>
                <h3 className="text-base font-medium text-[#c8a55c]">{target.b2cTitle}</h3>
                <p className="mt-1 text-sm text-white/70">{target.b2cDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-6 md:p-10">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            {cta.titleRest}
            <span className="text-[#c8a55c]">{cta.titleHighlight}</span>
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">{cta.subtitle}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#c8a55c] px-5 font-medium text-black hover:bg-[#b6944f] sm:w-auto"
            >
              {cta.contact}
            </LocaleLink>
            <LocaleLink
              href="/work"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
            >
              {cta.viewWork}
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
