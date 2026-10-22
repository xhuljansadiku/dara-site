import type { Metadata } from "next";
import { locales } from "@/i18n";

export type SiteLocale = (typeof locales)[number];

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al").replace(/\/+$/, "");
export const X_DEFAULT_LOCALE: SiteLocale = "en";

export const INDEXABLE_STATIC_PATHS = [
  "",
  "/about",
  "/team",
  "/contact",
  "/careers",
  "/packages",
  "/process",
  "/privacy",
  "/services",
  "/services/marketing",
  "/services/website",
  "/terms",
  "/trainings",
  "/work",
  "/faq",
] as const;

export function normalizePath(path: string) {
  if (!path || path === "/") return "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.replace(/\/+$/, "");
}

export function buildAbsoluteUrl(path: string) {
  const normalized = normalizePath(path);
  return normalized ? `${SITE_URL}${normalized}` : SITE_URL;
}

export function stripLocaleFromPathname(pathname: string) {
  const normalized = normalizePath(pathname);
  const segments = normalized.split("/").filter(Boolean);

  if (segments.length > 0 && locales.includes(segments[0] as SiteLocale)) {
    const withoutLocale = segments.slice(1).join("/");
    return withoutLocale ? `/${withoutLocale}` : "";
  }

  return normalized;
}

export function buildLocalePath(locale: SiteLocale, path: string) {
  const normalized = normalizePath(path);
  return normalized ? `/${locale}${normalized}` : `/${locale}`;
}

export function buildAlternates(path: string, currentLocale: SiteLocale) {
  const normalized = normalizePath(path);
  const canonical = buildAbsoluteUrl(buildLocalePath(currentLocale, normalized));

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, buildAbsoluteUrl(buildLocalePath(locale, normalized))])
  ) as Record<SiteLocale, string>;

  return {
    canonical,
    languages: {
      ...languages,
      "x-default": buildAbsoluteUrl(buildLocalePath(X_DEFAULT_LOCALE, normalized)),
    },
  };
}

type LocalizedMetadataInput = {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
};

export function buildLocalizedMetadata({
  locale,
  path,
  title,
  description,
  image = "/opengraph-image",
  noIndex = false,
}: LocalizedMetadataInput): Metadata {
  // The root layout's title template appends "| DARA Marketing Agency"; strip a brand suffix
  // here so pages never render it twice. Social cards keep the full title.
  const pageTitle = title.replace(/\s*\|\s*DARA(\s+Marketing Agency)?\s*$/i, "");
  const alternates = buildAlternates(path, locale);
  const url = buildAbsoluteUrl(buildLocalePath(locale, path));
  const ogLocale = locale === "sq" ? "sq_AL" : locale === "de" ? "de_DE" : "en_GB";
  const alternateLocale = locales
    .filter((candidate) => candidate !== locale)
    .map((candidate) => (candidate === "sq" ? "sq_AL" : candidate === "de" ? "de_DE" : "en_GB"));

  return {
    title: pageTitle,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url,
      siteName: "DARA Marketing Agency",
      type: "website",
      locale: ogLocale,
      alternateLocale,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
        },
  };
}
