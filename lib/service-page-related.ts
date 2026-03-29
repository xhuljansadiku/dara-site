import type { ServiceSlug } from "@/lib/services-data";

const MARKETING: ServiceSlug[] = [
  "social-media",
  "content",
  "strategy",
  "ads",
  "consulting",
  "training",
];
const WEBSITE: ServiceSlug[] = ["website-landing", "ecommerce", "saas", "maintenance"];

/** Up to 3 internal links for SEO + discovery (same cluster, exclude self). */
export function getRelatedServiceSlugs(slug: ServiceSlug, max = 3): ServiceSlug[] {
  if (slug === "branding") {
    return (["social-media", "content", "strategy"] as ServiceSlug[]).slice(0, max);
  }
  if (MARKETING.includes(slug)) {
    return MARKETING.filter((s) => s !== slug).slice(0, max);
  }
  return WEBSITE.filter((s) => s !== slug).slice(0, max);
}
