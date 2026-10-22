"use client";

import PackagesLevels from "@/components/site/PackagesLevels";
import ServicesStory, { type StoryGroup } from "@/components/site/ServicesStory";
import type { Pkg, PackageGroup } from "@/lib/packages-data";
import { SERVICE_HERO_SUBLINE, SERVICE_IMAGES } from "@/lib/service-page-extras";
import type { ServiceSlug } from "@/lib/services-data";

type Locale = "sq" | "en" | "de";
type Service = { title: string; desc: string; price?: string };

const GROUP_ICONS = [
  <svg key="0" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
];

type Props = {
  locale: Locale;
  services: Service[];
  filterTabs: { label: string; indices: number[] }[];
  serviceAnchors: readonly string[];
  priceTooltip: string;
  packagesByGroup: Record<PackageGroup, Pkg[]>;
  packageGroupLabels: Record<PackageGroup, string>;
  /** Verified testimonials only (see lib/testimonials.ts). */
  testimonials: { quote: string; name: string; role: string; company?: string }[];
  copy: {
    sectionKicker: string;
    sectionTitleBefore: string;
    sectionTitleHighlight: string;
    sectionIntro: string;
    quoteRequest: string;
    more: string;
    requestQuoteForGroup: string;
    packagesKicker: string;
    packagesTitleBefore: string;
    packagesTitleHighlight: string;
    packagesIntro: string;
    comparePackages: string;
  };
};

export default function ServicesSection({
  locale,
  services,
  filterTabs,
  serviceAnchors,
  priceTooltip,
  packagesByGroup,
  packageGroupLabels,
  testimonials,
  copy,
}: Props) {
  // One pinned step per service category; each category shows the cover photo of its first service.
  const storyGroups: StoryGroup[] = filterTabs.map((tab, t) => {
    const items = tab.indices.map((i) => {
      const slug = serviceAnchors[i] as ServiceSlug;
      return {
        slug,
        title: services[i].title.replace(/\s*\n\s*/g, " "),
        sub: SERVICE_HERO_SUBLINE[slug]?.[locale] ?? services[i].desc,
        price: services[i].price ?? copy.quoteRequest,
        href: `/services/${slug}`,
      };
    });
    const cover = items[0] ? SERVICE_IMAGES[items[0].slug]?.[0] : undefined;
    return { name: tab.label, icon: GROUP_ICONS[t % GROUP_ICONS.length], img: cover ?? "/images/services/website/website-cover.jpg", items };
  });

  return (
    // overflow-x-clip (not hidden) so the pinned services block can stick to the viewport.
    <section id="services" aria-labelledby="services-heading" className="relative overflow-x-clip bg-[#f4f1ea] pb-16 md:pb-24">
      <ServicesStory
        locale={locale}
        headingId="services-heading"
        kicker={copy.sectionKicker}
        titleBefore={copy.sectionTitleBefore}
        titleHighlight={copy.sectionTitleHighlight}
        groups={storyGroups}
        priceNote={priceTooltip}
        quoteLabel={copy.requestQuoteForGroup}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
        {testimonials.length > 0 && (
          <div className="mt-10 space-y-4 rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
            {testimonials.map((t, i) => (
              <figure key={i} className={i > 0 ? "border-t border-neutral-200 pt-4" : ""}>
                <blockquote className="text-sm italic leading-relaxed text-neutral-800">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-2 text-xs font-medium text-neutral-950">
                  {t.name}, {t.role}
                  {t.company && ` · ${t.company}`}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {/* Packages: pick a category and a level; one card shows the package */}
        <div className="mt-16 md:mt-24">
          <PackagesLevels
            locale={locale}
            packagesByGroup={packagesByGroup}
            groupLabels={packageGroupLabels}
            copy={{
              kicker: copy.packagesKicker,
              titleBefore: copy.packagesTitleBefore,
              titleHighlight: copy.packagesTitleHighlight,
              intro: copy.packagesIntro,
              compare: copy.comparePackages,
            }}
          />
        </div>
      </div>
    </section>
  );
}
