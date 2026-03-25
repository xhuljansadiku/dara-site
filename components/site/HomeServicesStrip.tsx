import LocaleLink from "@/components/site/LocaleLink";
import type { ServiceSlug } from "@/lib/services-data";

export type HomeServiceStripItem = { slug: ServiceSlug; title: string; num: number };

type Props = {
  items: HomeServiceStripItem[];
};

/** Homepage service index: compact numbered links (minimal vertical space). */
export default function HomeServicesStrip({ items }: Props) {
  return (
    <section
      className="border-y border-gray-200/80 bg-gradient-to-b from-stone-50/40 to-white py-3.5 md:py-4"
      aria-label="Services overview"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1.5 sm:gap-x-5 sm:gap-y-2 md:gap-x-8 md:gap-y-2 lg:gap-x-10 xl:gap-x-12">
          {items.map((item) => (
            <LocaleLink
              key={item.slug}
              href={`/services/${item.slug}`}
              className="group inline-flex max-w-full items-baseline gap-1.5 rounded-md px-1 py-0.5 text-gray-600 transition-colors hover:bg-[#c8a55c]/10 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a55c]/50 md:px-2 md:py-1"
            >
              <span className="font-mono text-[10px] font-semibold tabular-nums text-[#b89550] group-hover:text-[#8a6d32] sm:text-[11px]">
                {String(item.num).padStart(2, "0")}
              </span>
              <span className="text-[13px] font-medium leading-snug text-gray-800 group-hover:text-gray-950 sm:text-sm">
                {item.title}
              </span>
            </LocaleLink>
          ))}
        </div>
      </div>
    </section>
  );
}
