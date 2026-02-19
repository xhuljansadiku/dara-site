/** Localized copy for error and 404 pages */
import { defaultLocale } from "@/i18n";

export type Locale = "sq" | "en" | "de";

export const ERROR_COPY: Record<Locale, { title: string; desc: string; tryAgain: string; goHome: string }> = {
  sq: {
    title: "Diçka shkoi keq",
    desc: "Ndodhi një gabim. Provo prap.",
    tryAgain: "Provo prap",
    goHome: "Kthehu në kryefaqe",
  },
  en: {
    title: "Something went wrong",
    desc: "An error occurred. Please try again.",
    tryAgain: "Try again",
    goHome: "Go to home",
  },
  de: {
    title: "Etwas ist schief gelaufen",
    desc: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    tryAgain: "Erneut versuchen",
    goHome: "Zur Startseite",
  },
};

export const NOT_FOUND_COPY: Record<Locale, { title: string; desc: string; goHome: string }> = {
  sq: {
    title: "404",
    desc: "Faqja nuk u gjet.",
    goHome: "Kthehu në kryefaqe",
  },
  en: {
    title: "404",
    desc: "Page not found.",
    goHome: "Go to home",
  },
  de: {
    title: "404",
    desc: "Seite nicht gefunden.",
    goHome: "Zur Startseite",
  },
};

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment === "sq" || segment === "en" || segment === "de") return segment;
  return defaultLocale as Locale;
}
