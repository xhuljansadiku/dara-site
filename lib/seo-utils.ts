/**
 * SEO utilities: hreflang, canonical, Open Graph alternates.
 */
const LOCALES = ["sq", "en", "de"] as const;
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al";

/** Map locale to hreflang value (sq -> sq, en -> en, de -> de) */
const LOCALE_TO_HREFLANG: Record<string, string> = {
  sq: "sq",
  en: "en",
  de: "de",
};

export type Locale = (typeof LOCALES)[number];

/**
 * Generate alternates (canonical + hreflang) for a path.
 * @param path - Path without leading slash, e.g. "about" or "services/ads"
 * @param currentLocale - Current locale (sq, en, de)
 */
export function getAlternates(
  path: string,
  currentLocale: string
): { canonical: string; languages: Record<string, string> } {
  const pathNorm = path.startsWith("/") ? path.slice(1) : path;
  const pathPart = pathNorm ? `/${pathNorm}` : "";

  const canonical = `${BASE}/${currentLocale}${pathPart}`;
  const languages: Record<string, string> = {};

  for (const loc of LOCALES) {
    const url = `${BASE}/${loc}${pathPart}`;
    languages[LOCALE_TO_HREFLANG[loc] ?? loc] = url;
  }

  return { canonical, languages };
}

/**
 * Build Metadata alternates object for Next.js.
 */
export function buildAlternates(
  path: string,
  currentLocale: string
): { canonical: string; languages: Record<string, string> } {
  return getAlternates(path, currentLocale);
}
