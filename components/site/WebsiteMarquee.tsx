import { BrowserBar, SitePagePreview, domainOf } from "@/components/site/website-preview";
import type { Project } from "@/lib/projects";

/** A row of website windows drifting sideways like the social media rows; hovering pauses it and scrolls that page. */
export default function WebsiteMarquee({ sites }: { sites: Project[] }) {
  return (
    <div className="work-marquee-row [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      {/* Four copies plus a trailing gap: shifting by -50% loops without a jump and never shows an empty edge. */}
      <div className="work-marquee flex w-max gap-5 pr-5" style={{ animationDuration: "80s" }}>
        {[0, 1, 2, 3].map((copy) =>
          sites.map((site) => (
            <a
              key={`${copy}-${site.title}`}
              href={site.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={copy > 0 || undefined}
              tabIndex={copy > 0 ? -1 : undefined}
              className="group block w-[20rem] shrink-0 focus-visible:outline-none md:w-[30rem]"
            >
              <span className="block overflow-hidden rounded-2xl ring-1 ring-white/10 transition group-hover:ring-[#B89D5E]/60 group-focus-visible:ring-2 group-focus-visible:ring-[#B89D5E]">
                <BrowserBar site={site} />
                <SitePagePreview site={site} sizes="(max-width: 768px) 20rem, 30rem" className="relative aspect-[16/10]" />
              </span>
              <span className="mt-4 flex items-center justify-between gap-3 px-1">
                <span className="truncate font-display text-xl font-semibold uppercase">{site.title}</span>
                <span className="shrink-0 text-xs text-white/45 transition group-hover:text-[#d1b780]">
                  {domainOf(site.websiteUrl)} ↗
                </span>
              </span>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
