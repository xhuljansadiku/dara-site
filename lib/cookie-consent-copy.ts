import type { Locale } from "@/lib/services-data";

export type CookieConsentCopy = {
  title: string;
  intro: string;
  bullets: string[];
  acceptAll: string;
  essentialOnly: string;
  privacyLabel: string;
};

export const COOKIE_CONSENT_BY_LOCALE: Record<Locale, CookieConsentCopy> = {
  sq: {
    title: "Përdorim cookies",
    intro:
      "Përdorim cookies dhe teknologji të ngjashme për funksionimin e faqes, sigurinë dhe (me pëlqimin tuaj) statistika të përgjithshme. Duke vazhduar pa zgjedhur, aplikohen vetëm cookies të nevojshme.",
    bullets: [
      "Cookies thelbësore: sesion, siguri, preferenca gjuhë",
      "Me pëlqim: matje anonime për përmirësimin e faqes",
    ],
    acceptAll: "Pranoj të gjitha",
    essentialOnly: "Vetëm të nevojshmet",
    privacyLabel: "Politika e privatësisë",
  },
  en: {
    title: "We use cookies",
    intro:
      "We use cookies and similar technologies for the site to work, for security, and (with your consent) for basic analytics. If you continue without choosing, only essential cookies apply.",
    bullets: [
      "Essential cookies: session, security, language preference",
      "With consent: anonymous usage insights to improve the site",
    ],
    acceptAll: "Accept all",
    essentialOnly: "Essential only",
    privacyLabel: "Privacy policy",
  },
  de: {
    title: "Wir verwenden Cookies",
    intro:
      "Wir setzen Cookies und ähnliche Technologien für den Betrieb der Website, die Sicherheit und – mit Ihrer Einwilligung – für einfache Statistiken. Ohne Auswahl gelten nur notwendige Cookies.",
    bullets: [
      "Notwendige Cookies: Sitzung, Sicherheit, Spracheinstellung",
      "Mit Einwilligung: anonyme Nutzungsdaten zur Verbesserung der Website",
    ],
    acceptAll: "Alle akzeptieren",
    essentialOnly: "Nur notwendige",
    privacyLabel: "Datenschutzerklärung",
  },
};

export const COOKIE_STORAGE_KEY = "dara_cookie_consent_v1";

export type StoredConsent = {
  choice: "all" | "essential";
  at: number;
};
