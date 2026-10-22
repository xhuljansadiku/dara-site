import type { CSSProperties } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

export const domainOf = (url?: string) => url?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") ?? "";

/** Seconds to scroll a full-page capture top to bottom; 0 for a plain screenshot. */
const scrollSeconds = (site: Project) =>
  site.pageShot ? Math.min(12, Math.max(3, (site.pageShot.height / site.pageShot.width) * 1.6)) : 0;

/**
 * The site's full-page capture (or its screenshot), cropped to the frame. While the nearest `.group` is hovered it
 * scrolls to the bottom of the page. `className` must position the frame, e.g. "relative aspect-[16/10]" or "absolute inset-0".
 */
export function SitePagePreview({ site, sizes, className }: { site: Project; sizes: string; className: string }) {
  return (
    <span className={`block overflow-hidden bg-neutral-900 ${className}`}>
      <Image
        src={site.pageShot?.src ?? site.thumbnail ?? ""}
        alt=""
        fill
        sizes={sizes}
        className="site-page-scroll object-cover"
        style={{ "--scroll-time": `${scrollSeconds(site)}s` } as CSSProperties}
      />
    </span>
  );
}

/** Slim browser bar with the site's domain. */
export function BrowserBar({ site }: { site: Project }) {
  return (
    <span className="flex items-center gap-1.5 border-b border-white/10 bg-neutral-800 px-3 py-2" aria-hidden>
      <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
      <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
      <span className="h-2 w-2 rounded-full bg-[#28C840]" />
      <span className="ml-2 truncate rounded-md bg-black/40 px-2 py-0.5 text-[10px] text-white/55">{domainOf(site.websiteUrl)}</span>
    </span>
  );
}
