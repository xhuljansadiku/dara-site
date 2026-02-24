/**
 * Central config for budget tiers and price ranges.
 * Used by: contact form (budget dropdown), services, packages.
 * Tiers: €100 → €250 → €500 → €1.000 → €2.000 → €4.000+
 */

import type { Locale } from "@/lib/services-data";

/** Budget tier boundaries in EUR (min of each range). Index 0 = "Not sure". */
export const BUDGET_TIERS_EUR = [0, 100, 250, 500, 1000, 2000, 4000] as const;

/** Budget option labels per locale */
export const BUDGET_OPTIONS: Record<Locale, string[]> = {
  sq: [
    "Nuk jam i sigurt",
    "€100–€250",
    "€250–€500",
    "€500–€1.000",
    "€1.000–€2.000",
    "€2.000–€4.000",
    "€4.000+",
  ],
  en: [
    "Not sure",
    "€100–€250",
    "€250–€500",
    "€500–€1,000",
    "€1,000–€2,000",
    "€2,000–€4,000",
    "€4,000+",
  ],
  de: [
    "Nicht sicher",
    "€100–€250",
    "€250–€500",
    "€500–€1.000",
    "€1.000–€2.000",
    "€2.000–€4.000",
    "€4.000+",
  ],
};

/** Format EUR for display (Albanian/German: 1.000; English: 1,000) */
export function formatEur(n: number, locale: Locale): string {
  const s = n.toLocaleString(locale === "en" ? "en-US" : "de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return `€${s}`;
}
