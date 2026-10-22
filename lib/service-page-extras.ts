import type { Locale } from "@/lib/services-data";
import type { ServiceSlug } from "@/lib/services-data";
import { PROJECTS_DELIVERED } from "@/lib/business-facts";

/** Outcome-focused one-liner under H1 (not feature list). */
/** Hero + gallery images per service slug (local files; the first one is the cover). */
export const SERVICE_IMAGES: Partial<Record<ServiceSlug, string[]>> = {
  "website-landing": [
    "/images/services/website/website-cover.jpg",
    "/images/services/website/website-1.jpg",
    "/images/services/website/website-2.jpg",
  ],
  ecommerce: [
    "/images/services/e-commerce/e-commerce-cover.jpg",
    "/images/services/e-commerce/e-commerce-1.jpg",
    "/images/services/e-commerce/e-commerce-2.jpg",
  ],
  maintenance: [
    "/images/services/maintenance/maintenance-cover.jpg",
  ],
  "social-media": [
    "/images/services/social-media/social-media-cover.jpg",
    "/images/services/social-media/social-media-1.jpg",
    "/images/services/social-media/social-media-2.jpg",
  ],
  content: [
    "/images/services/content-creation/content-creation-cover.jpg",
    "/images/services/content-creation/content-creation-1.jpg",
    "/images/services/content-creation/content-creation-2.jpg",
  ],
  strategy: [
    "/images/services/digital-marketing/digital-marketing-cover.jpg",
    "/images/services/digital-marketing/digital-marketing-1.jpg",
    "/images/services/digital-marketing/digital-marketing-2.jpg",
  ],
  ads: [
    "/images/services/ads/ads-cover.jpg",
    "/images/services/ads/ads-1.jpg",
    "/images/services/ads/ads-2.jpg",
  ],
  consulting: [
    "/images/services/consulting/consulting-cover.jpg",
    "/images/services/consulting/consulting-1.jpg",
    "/images/services/consulting/consulting-2.jpg",
  ],
  branding: [
    "/images/services/branding/branding-cover.jpg",
    "/images/services/branding/branding-1.jpg",
    "/images/services/branding/branding-2.jpg",
  ],
  training: [
    "/images/services/consulting/consulting-cover.jpg",
    "/images/services/digital-marketing/digital-marketing-1.jpg",
    "/images/services/social-media/social-media-1.jpg",
  ],
};

export const SERVICE_HERO_SUBLINE: Record<
  ServiceSlug,
  Record<Locale, string>
> = {
  "social-media": {
    sq: "Më shumë dukshmëri dhe angazhim, që të ktheni vëmendjen në klientë.",
    en: "Stronger visibility and engagement, so attention turns into real inquiries.",
    de: "Mehr Sichtbarkeit und Engagement, damit Aufmerksamkeit zu echten Anfragen wird.",
  },
  content: {
    sq: "Materiale që përputhen me brand-in dhe nxisin veprim, jo vetëm “postime”.",
    en: "Creative that matches your brand and drives action, not just pretty posts.",
    de: "Kreativität, die zur Marke passt und Handlung auslöst, nicht nur schöne Posts.",
  },
  strategy: {
    sq: "Drejtim i qartë marketingu: prioritete, mesazh dhe hapa që maten.",
    en: "Clear direction: priorities, messaging, and measurable next steps.",
    de: "Klare Ausrichtung: Prioritäten, Messaging und messbare nächste Schritte.",
  },
  branding: {
    sq: "Një identitet që duket profesional dhe mbetet në mendje, kudo ku shfaqeni.",
    en: "An identity that looks premium and stays consistent everywhere you show up.",
    de: "Eine Identität, die professionell wirkt und überall konsistent bleibt.",
  },
  ads: {
    sq: "Reklama të strukturuara për lead-e dhe shitje, me optimizim të vazhdueshëm.",
    en: "Campaigns built for leads and sales, with ongoing optimisation.",
    de: "Kampagnen für Leads und Umsatz, mit laufender Optimierung.",
  },
  consulting: {
    sq: "Vendime më të shpejta dhe më të mira, me një plan që mund ta zbatoni.",
    en: "Faster, smarter decisions, with a plan you can actually execute.",
    de: "Schnellere, bessere Entscheidungen, mit einem Plan, den Sie umsetzen können.",
  },
  training: {
    sq: "Aftësi praktike për ekipin ose individin, të aplikueshme menjëherë.",
    en: "Practical skills for teams or individuals, ready to apply immediately.",
    de: "Praxisnahe Skills für Teams oder Einzelpersonen, sofort anwendbar.",
  },
  "website-landing": {
    sq: "Një faqe e shpejtë dhe e besueshme që shndërron vizitorë në kontakte.",
    en: "A fast, credible site that turns visitors into conversations.",
    de: "Eine schnelle, vertrauenswürdige Site, die Besucher in Gespräche verwandelt.",
  },
  ecommerce: {
    sq: "Dyqan online që e bën blerjen të thjeshtë dhe rrit shitjet.",
    en: "An online store that makes buying easy and lifts sales.",
    de: "Ein Shop, der Kaufen einfach macht und den Umsatz steigert.",
  },
  saas: {
    sq: "Produkte digitale të ndërtuara për shkallëzim, siguri dhe përvojë përdoruesi.",
    en: "Digital products built for scale, security, and user experience.",
    de: "Digitale Produkte für Skalierung, Sicherheit und User Experience.",
  },
  maintenance: {
    sq: "Faqe e përditësuar, e shpejtë dhe e sigurt, pa surpriza teknike.",
    en: "A site that stays fast, secure, and up to date, without technical surprises.",
    de: "Eine Website, die schnell, sicher und aktuell bleibt, ohne technische Überraschungen.",
  },
};

/** Short trust strip under CTAs (project count from lib/business-facts). */
export const SERVICE_PAGE_TRUST_LINE: Record<Locale, string> = {
  sq: `${PROJECTS_DELIVERED} projekte · ekip në Tiranë · përgjigje brenda 24 orëve`,
  en: `${PROJECTS_DELIVERED} projects · Tirana-based team · reply within 24 hours`,
  de: `${PROJECTS_DELIVERED} Projekte · Team in Tirana · Antwort innerhalb von 24 Std.`,
};

/** The business problem each service solves (replaces a generic paragraph shared by all pages). */
export const SERVICE_PROBLEM: Record<ServiceSlug, Record<Locale, string>> = {
  "social-media": {
    sq: "Profilet që postojnë rrallë ose pa plan nuk ndërtojnë besim dhe nuk sjellin kërkesa. Shumë biznese e dinë këtë, por nuk kanë kohë ta menaxhojnë çdo javë.",
    en: "Profiles that post rarely or without a plan do not build trust or bring enquiries. Most businesses know this but lack the time to manage it every week.",
    de: "Profile, die selten oder ohne Plan posten, bauen kein Vertrauen auf und bringen keine Anfragen. Vielen Unternehmen fehlt die Zeit, das jede Woche zu betreuen.",
  },
  content: {
    sq: "Fotot dhe videot e improvizuara e bëjnë një biznes të duket më pak profesional se sa është. Pa materiale cilësore, edhe reklamat e mira performojnë dobët.",
    en: "Improvised photos and videos make a business look less professional than it is. Without quality creative, even well-targeted ads underperform.",
    de: "Improvisierte Fotos und Videos lassen ein Unternehmen weniger professionell wirken, als es ist. Ohne gute Inhalte bleiben auch gut ausgesteuerte Anzeigen schwach.",
  },
  strategy: {
    sq: "Kur marketingu bëhet pa prioritete, buxheti shpërndahet në shumë kanale dhe është e vështirë të dihet çfarë po funksionon.",
    en: "When marketing has no clear priorities, budget is spread across too many channels and it is hard to tell what is working.",
    de: "Ohne klare Prioritäten verteilt sich das Budget auf zu viele Kanäle, und es ist schwer zu erkennen, was funktioniert.",
  },
  branding: {
    sq: "Një logo e paqartë ose materiale që nuk përputhen mes tyre e bëjnë biznesin të duket më i vogël dhe më pak i besueshëm se konkurrentët.",
    en: "An unclear logo or materials that do not match each other make a business look smaller and less trustworthy than its competitors.",
    de: "Ein unklares Logo oder uneinheitliche Materialien lassen ein Unternehmen kleiner und weniger vertrauenswürdig wirken als die Konkurrenz.",
  },
  ads: {
    sq: "Postimet e promovuara pa strukturë dhe matje harxhojnë buxhet pa sjellë klientë. Fushatat kanë nevojë për synim, testim dhe optimizim të vazhdueshëm.",
    en: "Boosted posts without structure or tracking spend budget without bringing customers. Campaigns need targeting, testing and ongoing optimisation.",
    de: "Beworbene Beiträge ohne Struktur und Tracking verbrauchen Budget, ohne Kunden zu bringen. Kampagnen brauchen Targeting, Tests und laufende Optimierung.",
  },
  consulting: {
    sq: "Ndonjëherë nuk nevojitet një agjenci e plotë, por një mendim i jashtëm për të vendosur çfarë të bëni më pas dhe çfarë të ndaloni.",
    en: "Sometimes you do not need a full agency, just an outside view to decide what to do next and what to stop doing.",
    de: "Manchmal braucht es keine komplette Agentur, sondern eine externe Sicht, um zu entscheiden, was als Nächstes zu tun ist und was nicht.",
  },
  training: {
    sq: "Ekipet që menaxhojnë vetë rrjetet sociale shpesh mësojnë me provë dhe gabim. Një trajnim praktik shkurton këtë kohë dhe krijon një mënyrë pune të përbashkët.",
    en: "Teams that run their own social media often learn by trial and error. Practical training shortens that time and gives the team a shared way of working.",
    de: "Teams, die Social Media selbst betreuen, lernen oft durch Ausprobieren. Ein praxisnahes Training verkürzt diese Zeit und schafft eine gemeinsame Arbeitsweise.",
  },
  "website-landing": {
    sq: "Një website i ngadaltë, i vjetëruar ose që nuk shpjegon qartë ofertën i largon vizitorët para se të kontaktojnë.",
    en: "A slow, outdated website, or one that does not explain the offer clearly, loses visitors before they get in touch.",
    de: "Eine langsame, veraltete Website oder eine, die das Angebot nicht klar erklärt, verliert Besucher, bevor sie Kontakt aufnehmen.",
  },
  ecommerce: {
    sq: "Shitja vetëm përmes mesazheve në rrjete sociale kufizon sa porosi mund të menaxhoni. Një dyqan online i lejon klientët të blejnë vetë, në çdo orë.",
    en: "Selling only through social media messages limits how many orders you can handle. An online store lets customers buy on their own, at any hour.",
    de: "Verkauf nur über Social-Media-Nachrichten begrenzt, wie viele Bestellungen Sie bewältigen können. Ein Online-Shop lässt Kunden jederzeit selbst kaufen.",
  },
  saas: {
    sq: "Kur proceset e biznesit mbështeten në tabela dhe mjete të ndara, ose kur keni një ide produkti, nevojitet software i ndërtuar për rastin tuaj.",
    en: "When business processes rely on spreadsheets and disconnected tools, or when you have a product idea, you need software built for your case.",
    de: "Wenn Abläufe auf Tabellen und getrennten Tools beruhen oder Sie eine Produktidee haben, braucht es Software, die für Ihren Fall gebaut ist.",
  },
  maintenance: {
    sq: "Website-et pa përditësime bëhen më të ngadalta dhe më të cenueshme. Problemet zakonisht vihen re vetëm kur faqja ka rënë ose klientët ankohen.",
    en: "Websites without updates become slower and more vulnerable. Problems are usually noticed only when the site is down or customers complain.",
    de: "Websites ohne Updates werden langsamer und angreifbarer. Probleme fallen meist erst auf, wenn die Seite ausfällt oder Kunden sich beschweren.",
  },
};

/** Service-specific call to action label. */
export const SERVICE_CTA: Record<ServiceSlug, Record<Locale, string>> = {
  "social-media": { sq: "Diskutoni rrjetet tuaja sociale", en: "Discuss your social media", de: "Ihr Social Media besprechen" },
  content: { sq: "Kërkoni ofertë për përmbajtje", en: "Request a content quote", de: "Content-Angebot anfragen" },
  strategy: { sq: "Diskutoni objektivat e marketingut", en: "Discuss your marketing goals", de: "Ihre Marketingziele besprechen" },
  branding: { sq: "Diskutoni identitetin e brand-it", en: "Discuss your brand identity", de: "Ihre Markenidentität besprechen" },
  ads: { sq: "Diskutoni objektivat e fushatës", en: "Discuss your campaign goals", de: "Ihre Kampagnenziele besprechen" },
  consulting: { sq: "Kërkoni një konsulencë", en: "Book a consultation", de: "Beratung anfragen" },
  training: { sq: "Shiko programet", en: "View the programmes", de: "Programme ansehen" },
  "website-landing": { sq: "Diskutoni projektin e website-it", en: "Discuss your website project", de: "Ihr Website-Projekt besprechen" },
  ecommerce: { sq: "Planifikoni dyqanin tuaj online", en: "Plan your online store", de: "Ihren Online-Shop planen" },
  saas: { sq: "Diskutoni idenë e produktit", en: "Discuss your product idea", de: "Ihre Produktidee besprechen" },
  maintenance: { sq: "Kërkoni ofertë mirëmbajtjeje", en: "Get a maintenance quote", de: "Wartungsangebot anfragen" },
};

/** Training has its own programmes and registration; every other service goes to the quote form. */
export function getServiceCtaHref(slug: ServiceSlug): string {
  return slug === "training" ? "/trainings" : `/contact?service=${slug}`;
}

const CLIENT_INPUTS: Record<"website" | "ecommerce" | "marketing" | "branding" | "training", Record<Locale, string>> = {
  website: {
    sq: "Logoja dhe materialet e brand-it, tekstet ose informacionet kryesore, fotot nëse i keni, dhe disa website që ju pëlqejnë si referencë.",
    en: "Your logo and brand assets, texts or key information, photos if you have them, and a few websites you like as a reference.",
    de: "Logo und Markenmaterial, Texte oder Kerninformationen, vorhandene Fotos und einige Websites, die Ihnen als Referenz gefallen.",
  },
  ecommerce: {
    sq: "Lista e produkteve me çmime, foto dhe përshkrime, metodat e pagesës dhe transportit që doni, dhe logoja e materialet e brand-it.",
    en: "A product list with prices, photos and descriptions, the payment and shipping methods you want, and your logo and brand assets.",
    de: "Eine Produktliste mit Preisen, Fotos und Beschreibungen, gewünschte Zahlungs- und Versandarten sowie Logo und Markenmaterial.",
  },
  marketing: {
    sq: "Qëllimet dhe audienca juaj, akses në llogaritë e rrjeteve sociale ose të reklamave, materialet e brand-it dhe aprovim në kohë të planit.",
    en: "Your goals and target audience, access to your social media or ad accounts, brand materials and timely approval of the plan.",
    de: "Ihre Ziele und Zielgruppe, Zugang zu Social-Media- oder Werbekonten, Markenmaterial und eine zeitnahe Freigabe des Plans.",
  },
  branding: {
    sq: "Informacion për biznesin, vlerat dhe audiencën, konkurrentët nga të cilët doni të dalloheni, dhe çdo material vizual ekzistues.",
    en: "Information about your business, values and audience, the competitors you want to stand apart from, and any existing visual material.",
    de: "Informationen zu Unternehmen, Werten und Zielgruppe, Wettbewerber, von denen Sie sich abheben möchten, und vorhandenes Bildmaterial.",
  },
  training: {
    sq: "Niveli aktual i pjesëmarrësve, çfarë doni të arrini me trajnimin dhe orari i preferuar (në grup ose 1:1).",
    en: "The participants’ current level, what you want to achieve with the training and your preferred schedule (group or 1:1).",
    de: "Den aktuellen Stand der Teilnehmenden, Ihre Ziele für das Training und den gewünschten Zeitplan (Gruppe oder 1:1).",
  },
};

/** What the client is expected to provide, by service category. */
export function getServiceClientInputs(locale: Locale, slug: ServiceSlug): string {
  if (slug === "ecommerce" || slug === "branding" || slug === "training") return CLIENT_INPUTS[slug][locale];
  if (slug === "website-landing" || slug === "saas" || slug === "maintenance") return CLIENT_INPUTS.website[locale];
  return CLIENT_INPUTS.marketing[locale];
}

export function getServiceCategoryKicker(locale: Locale, slug: ServiceSlug): string {
  const marketing: ServiceSlug[] = [
    "social-media",
    "content",
    "strategy",
    "ads",
    "consulting",
    "training",
  ];
  if (marketing.includes(slug)) {
    return locale === "sq"
      ? "Marketing digjital"
      : locale === "de"
        ? "Digitales Marketing"
        : "Digital marketing";
  }
  if (slug === "branding") {
    return locale === "sq" ? "Brand & identitet" : locale === "de" ? "Branding" : "Brand & identity";
  }
  return locale === "sq"
    ? "Website & teknologji"
    : locale === "de"
      ? "Website & Technologie"
      : "Website & technology";
}
