import type { Locale } from "@/lib/services-data";

export type CookieConsentCopy = {
  title: string;
  intro: string;
  bullets: string[];
  /** Shpjegim i shkurtër: duhet një klikim për të vazhduar. */
  chooseHint: string;
  acceptAll: string;
  /** Refuzon cookie-t opsionale (analitika); mbeten vetëm ato të nevojshme. */
  rejectOptional: string;
  privacyLabel: string;
};

export const COOKIE_CONSENT_BY_LOCALE: Record<Locale, CookieConsentCopy> = {
  sq: {
    title: "Përdorim cookies",
    intro:
      "Duhet të zgjidhni eksplicitisht: ose pranoni të gjitha cookies (përfshirë statistika anonime), ose i refuzoni ato opsionale. Në këtë rast përdoren vetëm cookies thelbësore për funksionimin e faqes dhe sigurinë.",
    bullets: [
      "Cookies thelbësore: sesion, siguri, preferenca gjuhë",
      "Opsionale (vetëm me pranim): matje anonime për përmirësimin e faqes",
    ],
    chooseHint: "Për të vazhduar me faqen, zgjidhni një nga dy opsionet më poshtë.",
    acceptAll: "Pranoj të gjitha",
    rejectOptional: "Vetëm të nevojshmet",
    privacyLabel: "Politika e privatësisë",
  },
  en: {
    title: "We use cookies",
    intro:
      "Please choose explicitly: accept all cookies (including anonymous analytics), or refuse optional cookies. In that case we only use essential cookies required for the site to work and for security.",
    bullets: [
      "Essential cookies: session, security, language preference",
      "Optional (only if you accept): anonymous insights to improve the site",
    ],
    chooseHint: "To continue using the site, choose one of the two options below.",
    acceptAll: "Accept all",
    rejectOptional: "Essential only",
    privacyLabel: "Privacy policy",
  },
  de: {
    title: "Wir verwenden Cookies",
    intro:
      "Bitte treffen Sie eine ausdrückliche Wahl: alle Cookies akzeptieren (einschließlich anonymer Statistik) oder optionale Cookies ablehnen. Dann verwenden wir nur notwendige Cookies für Betrieb und Sicherheit der Website.",
    bullets: [
      "Notwendige Cookies: Sitzung, Sicherheit, Spracheinstellung",
      "Optional (nur bei Zustimmung): anonyme Nutzungsdaten zur Verbesserung",
    ],
    chooseHint: "Um die Website weiter zu nutzen, wählen Sie eine der beiden Optionen.",
    acceptAll: "Alle akzeptieren",
    rejectOptional: "Nur notwendige",
    privacyLabel: "Datenschutzerklärung",
  },
};

export const COOKIE_STORAGE_KEY = "dara_cookie_consent_v1";

export type StoredConsent = {
  choice: "all" | "essential";
  at: number;
};
