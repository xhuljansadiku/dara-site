import { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { SERVICE_SLUGS } from "@/lib/services-data";
import { TRAININGS } from "@/lib/trainings-data";
import { INDEXABLE_STATIC_PATHS, X_DEFAULT_LOCALE, buildAbsoluteUrl, buildLocalePath } from "@/lib/seo-utils";

const indexableTrainingPaths = TRAININGS.filter((training) => !training.comingSoon).map((training) => `/trainings/${training.slug}`);
const indexableServicePaths = SERVICE_SLUGS.map((slug) => `/services/${slug}`);
const indexablePaths = [...INDEXABLE_STATIC_PATHS, ...indexableServicePaths, ...indexableTrainingPaths];

export default function sitemap(): MetadataRoute.Sitemap {
  try {
    const now = new Date();
    return locales.flatMap((locale) =>
      indexablePaths.map((path) => {
        const languages = Object.fromEntries(
          locales.map((candidateLocale) => [candidateLocale, buildAbsoluteUrl(buildLocalePath(candidateLocale, path))])
        );
        const isCorePage =
          path === "" ||
          path === "/services" ||
          path === "/work" ||
          path === "/trainings" ||
          path === "/packages";

        return {
          url: buildAbsoluteUrl(buildLocalePath(locale, path)),
          lastModified: now,
          changeFrequency: isCorePage ? "weekly" : "monthly",
          alternates: {
            languages: {
              ...languages,
              "x-default": buildAbsoluteUrl(buildLocalePath(X_DEFAULT_LOCALE, path)),
            },
          },
        };
      })
    );
  } catch {
    // Keep sitemap endpoint healthy even if upstream data has an unexpected shape.
    return locales.map((locale) => ({
      url: buildAbsoluteUrl(buildLocalePath(locale, "")),
      lastModified: new Date(),
      changeFrequency: "weekly",
    }));
  }
}
