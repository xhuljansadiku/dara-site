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
    sq: "Një profil që poston rrallë nuk sjell klientë. Shumica e dinë, por s’kanë kohë.",
    en: "A profile that rarely posts doesn’t bring customers. Most know it, but have no time.",
    de: "Ein Profil, das selten postet, bringt keine Kunden. Die meisten wissen es, haben aber keine Zeit.",
  },
  "content": {
    sq: "Fotot e bëra me nxitim ju bëjnë të dukeni më pak seriozë se sa jeni.",
    en: "Rushed photos make you look less serious than you are.",
    de: "Schnelle Handyfotos lassen Sie weniger seriös wirken, als Sie sind.",
  },
  "strategy": {
    sq: "Pa plan, marketingu bëhet me hamendje dhe paratë shkojnë dëm.",
    en: "Without a plan, marketing is guesswork and money gets wasted.",
    de: "Ohne Plan ist Marketing Raterei, und Geld geht verloren.",
  },
  "branding": {
    sq: "Kur logoja dhe ngjyrat ndryshojnë kudo, njerëzit nuk ju mbajnë mend.",
    en: "When your logo and colours change everywhere, people don’t remember you.",
    de: "Wenn Logo und Farben überall anders sind, erinnert sich niemand an Sie.",
  },
  "ads": {
    sq: "Shumë njerëz \"boost\"-ojnë postime dhe humbin para pa marrë klientë.",
    en: "Many people boost posts and lose money without getting customers.",
    de: "Viele bewerben Posts und verlieren Geld, ohne Kunden zu gewinnen.",
  },
  "consulting": {
    sq: "Ndonjëherë ju duhet vetëm dikush që ta shohë gjendjen nga jashtë.",
    en: "Sometimes you just need someone to look at it from the outside.",
    de: "Manchmal braucht es nur jemanden, der von außen draufschaut.",
  },
  "training": {
    sq: "Nëse rrjetet varen nga dikush tjetër, çdo ndryshim ju ngadalëson.",
    en: "If your channels depend on someone else, every change slows you down.",
    de: "Wenn Ihre Kanäle von anderen abhängen, bremst jede Änderung.",
  },
  "website-landing": {
    sq: "Një website i ngadaltë ose i paqartë i largon klientët para se t’ju shkruajnë.",
    en: "A slow or unclear website sends customers away before they contact you.",
    de: "Eine langsame oder unklare Website vertreibt Kunden, bevor sie schreiben.",
  },
  "ecommerce": {
    sq: "Shitja vetëm me mesazhe ju ha kohën dhe ju humbet porosi.",
    en: "Selling only through messages eats your time and loses orders.",
    de: "Nur über Nachrichten zu verkaufen kostet Zeit und Bestellungen.",
  },
  "saas": {
    sq: "Kur biznesi mbahet me tabela Excel, gabimet dhe vonesat shtohen.",
    en: "When a business runs on spreadsheets, mistakes and delays pile up.",
    de: "Wenn ein Unternehmen mit Excel läuft, häufen sich Fehler und Verzögerungen.",
  },
  "maintenance": {
    sq: "Një faqe pa përditësime ngadalësohet dhe bie pikërisht kur s’e prisni.",
    en: "A site without updates slows down and breaks right when you don’t expect it.",
    de: "Eine Seite ohne Updates wird langsam und fällt genau dann aus, wenn Sie es nicht erwarten.",
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
    sq: "Logoja, pak tekst për biznesin dhe 2–3 website që ju pëlqejnë.",
    en: "Your logo, a little text about the business and 2–3 sites you like.",
    de: "Ihr Logo, etwas Text zum Unternehmen und 2–3 Websites, die Ihnen gefallen.",
  },
  ecommerce: {
    sq: "Lista e produkteve me çmime dhe foto.",
    en: "Your product list with prices and photos.",
    de: "Ihre Produktliste mit Preisen und Fotos.",
  },
  marketing: {
    sq: "Linket e rrjeteve tuaja dhe çfarë doni të arrini.",
    en: "Links to your channels and what you want to achieve.",
    de: "Links zu Ihren Kanälen und was Sie erreichen wollen.",
  },
  branding: {
    sq: "Emri i biznesit dhe disa shembuj që ju pëlqejnë.",
    en: "Your business name and a few examples you like.",
    de: "Ihr Firmenname und ein paar Beispiele, die Ihnen gefallen.",
  },
  training: {
    sq: "Vetëm dëshirën për të mësuar.",
    en: "Just the will to learn.",
    de: "Nur die Lust zu lernen.",
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
