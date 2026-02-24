/** Localized messages for API error codes */
export type Locale = "sq" | "en" | "de";

export const API_ERROR_MESSAGES: Record<
  string,
  Record<Locale, string>
> = {
  CAPTCHA_FAILED: {
    sq: "Verifikimi anti-spam dështoi. Rifresko faqen dhe provo prap.",
    en: "Anti-spam verification failed. Refresh the page and try again.",
    de: "Anti-Spam-Prüfung fehlgeschlagen. Seite neu laden und erneut versuchen.",
  },
  INVALID_NAME: {
    sq: "Emri duhet të jetë të paktën 2 karaktere.",
    en: "Name must be at least 2 characters.",
    de: "Der Name muss mindestens 2 Zeichen haben.",
  },
  INVALID_EMAIL: {
    sq: "Plotëso një email të vlefshëm.",
    en: "Please enter a valid email address.",
    de: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  },
  INVALID_MESSAGE: {
    sq: "Mesazhi duhet të jetë të paktën 10 karaktere.",
    en: "Message must be at least 10 characters long.",
    de: "Die Nachricht muss mindestens 10 Zeichen lang sein.",
  },
  INVALID_ROLE: {
    sq: "Zgjidh pozicionin për të cilin aplikon.",
    en: "Please select the position you're applying for.",
    de: "Bitte wählen Sie die Position, für die Sie sich bewerben.",
  },
  INVALID_CV: {
    sq: "Ngarko CV-në në format PDF (maks. 5 MB).",
    en: "Please upload your CV in PDF format (max 5 MB).",
    de: "Bitte laden Sie Ihren CV im PDF-Format hoch (max 5 MB).",
  },
  INVALID_CONTENT_TYPE: {
    sq: "Lloji i kërkesës nuk është i vlefshëm.",
    en: "Invalid request content type.",
    de: "Ungültiger Anfragetyp.",
  },
  INVALID_JSON: {
    sq: "Të dhënat e dërguara nuk janë të vlefshme.",
    en: "Invalid data sent.",
    de: "Ungültige Daten gesendet.",
  },
  INVALID_BODY: {
    sq: "Të dhënat e dërguara nuk janë të vlefshme.",
    en: "Invalid request body.",
    de: "Ungültiger Anfragetext.",
  },
  SERVER_ERROR: {
    sq: "Diçka shkoi keq. Provo prap.",
    en: "Something went wrong. Please try again.",
    de: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
  },
  RATE_LIMITED: {
    sq: "Shumë kërkesa. Provo prap pas disa minutash.",
    en: "Too many requests. Please try again in a few minutes.",
    de: "Zu viele Anfragen. Bitte versuchen Sie es in ein paar Minuten erneut.",
  },
};

export const NETWORK_ERROR_MESSAGES: Record<Locale, string> = {
  sq: "Gabim rrjeti. Provo prap.",
  en: "Network error. Please try again.",
  de: "Netzwerkfehler. Bitte versuchen Sie es erneut.",
};

export const GENERIC_ERROR_MESSAGES: Record<Locale, string> = {
  sq: "Diçka shkoi keq. Provo prap.",
  en: "Something went wrong. Please try again.",
  de: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
};

export function getApiErrorMessage(
  errorCode: string | undefined,
  locale: Locale
): string {
  if (!errorCode) return GENERIC_ERROR_MESSAGES[locale];
  const msg = API_ERROR_MESSAGES[errorCode]?.[locale];
  return msg ?? GENERIC_ERROR_MESSAGES[locale];
}
