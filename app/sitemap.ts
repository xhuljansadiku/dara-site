import { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { SERVICE_SLUGS } from "@/lib/services-data";
import { TRAININGS } from "@/lib/trainings-data";
import { INDEXABLE_STATIC_PATHS, X_DEFAULT_LOCALE, buildAbsoluteUrl, buildLocalePath } from "@/lib/seo-utils";

const indexableTrainingPaths = TRAININGS.filter((training) => !training.comingSoon).map((training) => `/trainings/${training.slug}`);
const indexableServicePaths = SERVICE_SLUGS.map((slug) => `/services/${slug}`);
const indexablePaths = [...INDEXABLE_STATIC_PATHS, ...indexableServicePaths, ...indexableTrainingPaths];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    indexablePaths.map((path) => {
      const languages = Object.fromEntries(
        locales.map((candidateLocale) => [candidateLocale, buildAbsoluteUrl(buildLocalePath(candidateLocale, path))])
      );

      return {
        url: buildAbsoluteUrl(buildLocalePath(locale, path)),
        alternates: {
          languages: {
            ...languages,
            "x-default": buildAbsoluteUrl(buildLocalePath(X_DEFAULT_LOCALE, path)),
          },
        },
      };
    })
  );
}
