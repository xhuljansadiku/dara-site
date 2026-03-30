import { MetadataRoute } from "next";

const baseUrl = "https://dara.al";

const locales = ["en", "sq", "de"] as const;

const staticRoutes = [
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
  "/work/brand",
  "/faq",
] as const;

const serviceRoutes = [
  "/services/social-media",
  "/services/content",
  "/services/strategy",
  "/services/branding",
  "/services/ads",
  "/services/consulting",
  "/services/training",
  "/services/website-landing",
  "/services/ecommerce",
  "/services/saas",
  "/services/maintenance",
] as const;

const trainingRoutes = [
  "/trainings/smm",
  "/trainings/smm-1-1",
] as const;

const routes = locales.flatMap((locale) =>
  [...staticRoutes, ...serviceRoutes, ...trainingRoutes].map((route) => ({
    url: `${baseUrl}/${locale}${route}`,
    lastModified: new Date(),
  }))
);

export default function sitemap(): MetadataRoute.Sitemap {
  return routes;
}
