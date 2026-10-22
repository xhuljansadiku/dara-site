import LocaleLink from "@/components/site/LocaleLink";
import type { Locale, ServiceSlug } from "@/lib/services-data";

export type HomeServiceStripItem = { slug: ServiceSlug; title: string; num: number };

type Props = {
  locale: Locale;
  items: HomeServiceStripItem[];
};

const LABEL: Record<Locale, string> = {
  sq: "Të gjitha shërbimet",
  en: "All services",
  de: "Alle Leistungen",
};

/** Homepage service index: compact numbered links (minimal vertical space). */
export default function HomeServicesStrip({ locale, items }: Props) {
  return (
    <nav
      id="services-overview"
      className="scroll-mt-20 border-y border-gray-200/80 bg-gradient-to-b from-stone-50/40 to-white py-4"
      aria-label={LABEL[locale]}
    >
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2.5 px-4 sm:gap-x-5 sm:px-6 md:gap-x-8 lg:gap-x-10">
        {items.map((item) => (
          <li key={item.slug}>
            <LocaleLink
              href={`/services/${item.slug}`}
              className="group inline-flex min-h-9 max-w-full items-center gap-1.5 rounded-full border border-transparent px-2 py-1 text-center text-gray-600 transition-colors hover:border-[#B89D5E]/15 hover:bg-[#B89D5E]/10 hover:text-gray-900"
            >
              <span className="font-mono text-[11px] font-semibold tabular-nums text-[#8a7344]" aria-hidden>
                {String(item.num).padStart(2, "0")}
              </span>
              <span className="text-[13px] font-medium leading-snug text-gray-800 group-hover:text-gray-950 sm:text-sm">
                {item.title.replace(/\s*\n\s*/g, " ")}
              </span>
            </LocaleLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
