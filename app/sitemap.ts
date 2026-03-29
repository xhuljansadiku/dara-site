import { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { SERVICE_SLUGS } from "@/lib/services-data";
import { TRAINING_SLUGS } from "@/lib/trainings-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al";

const staticPaths = [
  "",
  "/about",
  "/team",
  "/contact",
  "/contact/thank-you",
  "/careers",
  "/careers/thank-you",
  "/packages",
  "/process",
  "/privacy",
  "/services",
  "/services/marketing",
  "/services/website",
  "/terms",
  "/trainings",
  "/trainings/register",
  "/trainings/register/thank-you",
  "/work",
  "/work/brand",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    // Root (neutral language selector) - x-default for hreflang
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  for (const locale of locales) {
    for (const path of staticPaths) {
      const url = path ? `/${locale}${path}` : `/${locale}`;
      entries.push({
        url: `${BASE}${url}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }
    for (const slug of SERVICE_SLUGS) {
      entries.push({
        url: `${BASE}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
    for (const slug of TRAINING_SLUGS) {
      entries.push({
        url: `${BASE}/${locale}/trainings/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  return entries;
}
