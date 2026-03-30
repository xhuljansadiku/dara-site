import { promises as fs } from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { INDEXABLE_STATIC_PATHS, buildAbsoluteUrl, buildLocalePath } from "@/lib/seo-utils";
import { SERVICE_SLUGS } from "@/lib/services-data";
import { TRAININGS, TRAINING_SLUGS } from "@/lib/trainings-data";

type RouteDefinition = {
  path: string;
  sourceFiles: string[];
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

const WORKSPACE_ROOT = process.cwd();

const STATIC_ROUTE_FILES: Record<(typeof INDEXABLE_STATIC_PATHS)[number], string[]> = {
  "": ["app/[locale]/page.tsx", "app/[locale]/layout.tsx"],
  "/about": ["app/[locale]/about/page.tsx"],
  "/team": ["app/[locale]/team/page.tsx"],
  "/contact": ["app/[locale]/contact/layout.tsx", "app/[locale]/contact/page.tsx"],
  "/careers": ["app/[locale]/careers/layout.tsx", "app/[locale]/careers/page.tsx"],
  "/packages": ["app/[locale]/packages/page.tsx"],
  "/process": ["app/[locale]/process/page.tsx"],
  "/privacy": ["app/[locale]/privacy/page.tsx"],
  "/services": ["app/[locale]/services/page.tsx", "components/site/ServicesPageContent.tsx", "lib/services-data.ts"],
  "/services/marketing": ["app/[locale]/services/marketing/page.tsx", "lib/services-data.ts"],
  "/services/website": ["app/[locale]/services/website/page.tsx", "lib/services-data.ts"],
  "/terms": ["app/[locale]/terms/page.tsx"],
  "/trainings": ["app/[locale]/trainings/page.tsx", "lib/trainings-data.ts"],
  "/work": ["app/[locale]/work/page.tsx", "lib/projects.ts"],
  "/work/brand": ["app/[locale]/work/brand/page.tsx", "lib/projects.ts"],
  "/faq": ["app/[locale]/faq/layout.tsx", "app/[locale]/faq/page.tsx", "lib/faq-data.ts"],
};

const SERVICE_ROUTE_FILES = [
  "app/[locale]/services/[slug]/page.tsx",
  "components/site/ServicePageLayout.tsx",
  "lib/services-data.ts",
  "lib/services-page-content.ts",
  "lib/service-page-faq.ts",
  "lib/service-page-extras.ts",
];

const TRAINING_ROUTE_FILES = [
  "app/[locale]/trainings/[slug]/page.tsx",
  "lib/trainings-data.ts",
];

async function getLastModified(sourceFiles: string[]) {
  const timestamps = await Promise.all(
    sourceFiles.map(async (file) => {
      try {
        const stats = await fs.stat(path.join(WORKSPACE_ROOT, file));
        return stats.mtime;
      } catch {
        return new Date(0);
      }
    })
  );

  return timestamps.reduce((latest, current) => (current > latest ? current : latest), new Date(0));
}

function makeRoute(route: RouteDefinition) {
  return route;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: RouteDefinition[] = [
    ...INDEXABLE_STATIC_PATHS.map((routePath) => makeRoute({
      path: routePath,
      sourceFiles: STATIC_ROUTE_FILES[routePath],
      changeFrequency: routePath === "" ? "weekly" : "monthly",
      priority: routePath === "" ? 1 : routePath === "/services" || routePath === "/work" || routePath === "/about" ? 0.9 : 0.8,
    })),
    ...SERVICE_SLUGS.map((slug) => makeRoute({
      path: `/services/${slug}`,
      sourceFiles: SERVICE_ROUTE_FILES,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...TRAINING_SLUGS.filter((slug) => !TRAININGS.find((training) => training.slug === slug)?.comingSoon).map((slug) => makeRoute({
      path: `/trainings/${slug}`,
      sourceFiles: TRAINING_ROUTE_FILES,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];

  const entries = await Promise.all(
    locales.flatMap((locale) =>
      routes.map(async (route) => ({
        url: buildAbsoluteUrl(buildLocalePath(locale, route.path)),
        lastModified: await getLastModified(route.sourceFiles),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      }))
    )
  );

  return entries.sort((a, b) => a.url.localeCompare(b.url));
}
