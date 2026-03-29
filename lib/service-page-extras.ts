import type { Locale } from "@/lib/services-data";
import type { ServiceSlug } from "@/lib/services-data";

/** Outcome-focused one-liner under H1 (not feature list). */
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

/** Short trust strip under CTAs. */
export const SERVICE_PAGE_TRUST_LINE: Record<Locale, string> = {
  sq: "50+ projekte · ekip në Tiranë · përgjigje e shpejtë",
  en: "50+ projects · Tirana-based team · fast response",
  de: "50+ Projekte · Team in Tirana · schnelle Rückmeldung",
};

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
