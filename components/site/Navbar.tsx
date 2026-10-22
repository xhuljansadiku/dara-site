"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { locales as LOCALES, defaultLocale } from "@/i18n";
import { getServiceGroupNavItems } from "@/lib/services-data";
import type { Locale } from "@/lib/services-data";

type MenuId = "services" | "about" | "lang";

const NAV_TRANSLATIONS: Record<
  Locale,
  {
    tagline: string;
    services: string;
    viewAllServices: string;
    overview: string;
    packages: string;
    trainings: string;
    about: string;
    aboutUs: string;
    works: string;
    careers: string;
    faq: string;
    team: string;
    getQuote: string;
    language: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    groups: { website: string; marketing: string; branding: string };
  }
> = {
  sq: {
    tagline: "Marketing Agency",
    services: "Shërbime",
    viewAllServices: "Të gjitha shërbimet",
    overview: "Përmbledhje",
    packages: "Paketa",
    trainings: "Trajnime",
    about: "Rreth nesh",
    aboutUs: "Kush jemi",
    works: "Projektet",
    careers: "Karrierë",
    faq: "Pyetje të shpeshta",
    team: "Ekipi",
    getQuote: "Kërko ofertë",
    language: "Gjuha",
    openMenu: "Hap menunë",
    closeMenu: "Mbyll menunë",
    mainNav: "Navigimi kryesor",
    groups: { website: "Website & teknologji", marketing: "Marketing & rritje", branding: "Branding" },
  },
  en: {
    tagline: "Marketing Agency",
    services: "Services",
    viewAllServices: "All services",
    overview: "Overview",
    packages: "Packages",
    trainings: "Training",
    about: "About",
    aboutUs: "About us",
    works: "Projects",
    careers: "Careers",
    faq: "FAQ",
    team: "Team",
    getQuote: "Request a quote",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    groups: { website: "Website & technology", marketing: "Marketing & growth", branding: "Branding" },
  },
  de: {
    tagline: "Marketing Agency",
    services: "Leistungen",
    viewAllServices: "Alle Leistungen",
    overview: "Übersicht",
    packages: "Pakete",
    trainings: "Training",
    about: "Über uns",
    aboutUs: "Über DARA",
    works: "Referenzen",
    careers: "Karriere",
    faq: "FAQ",
    team: "Team",
    getQuote: "Angebot anfragen",
    language: "Sprache",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    mainNav: "Hauptnavigation",
    groups: { website: "Website & Technologie", marketing: "Marketing & Wachstum", branding: "Branding" },
  },
};

const LOCALE_FLAGS: Record<Locale, { flagSrc: string; label: string }> = {
  sq: { flagSrc: "https://flagcdn.com/w40/al.png", label: "Shqip" },
  en: { flagSrc: "https://flagcdn.com/w40/gb.png", label: "English" },
  de: { flagSrc: "https://flagcdn.com/w40/de.png", label: "Deutsch" },
};

/** Hub page per service group (branding has a single service page). */
const GROUP_HUB: Record<string, string> = {
  website: "/services/website",
  marketing: "/services/marketing",
  branding: "/services/branding",
};

export default function Navbar() {
  const pathname = usePathname() || "/";
  const params = useParams();

  const pathParts = pathname.split("/").filter(Boolean);
  const rawLocale = typeof params?.locale === "string" ? String(params.locale) : pathParts[0];
  const locale: Locale = LOCALES.includes((rawLocale ?? "") as Locale) ? (rawLocale as Locale) : defaultLocale;
  const nav = NAV_TRANSLATIONS[locale];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"services" | "about" | null>(null);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Partial<Record<MenuId, HTMLButtonElement | null>>>({});
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Menu opened by hover: the click that usually follows should keep it open, not toggle it shut. */
  const openedByHover = useRef<MenuId | null>(null);

  // Branding is a single page, so it sits in the services panel rather than the training group.
  const serviceGroups = getServiceGroupNavItems(locale).filter((g) => g.id !== "training");

  useEffect(() => {
    // The bar stays in place; scrolling only switches it to the solid background.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on outside click and on Escape (returning focus to the trigger).
  useEffect(() => {
    if (!openMenu && !mobileOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openMenu) {
        triggerRefs.current[openMenu]?.focus();
        setOpenMenu(null);
      } else if (mobileOpen) {
        setMobileOpen(false);
        setMobileSection(null);
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu, mobileOpen]);

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  }, []);

  function withLocale(href: string) {
    const normalized = href.startsWith("/") ? href : `/${href}`;
    return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
  }

  function isCurrent(href: string) {
    return pathname === withLocale(href);
  }

  function isSection(href: string) {
    const target = withLocale(href);
    return pathname === target || pathname.startsWith(`${target}/`);
  }

  /** Keep the same page when switching language (all routes exist in every locale). */
  function switchLocale(nextLocale: string) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return `/${nextLocale}`;
    if (LOCALES.includes(parts[0] as Locale)) {
      parts[0] = nextLocale;
      return `/${parts.join("/")}`;
    }
    return `/${nextLocale}/${parts.join("/")}`;
  }

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  };

  const hoverOpen = (id: MenuId) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (openMenu !== id) openedByHover.current = id;
    setOpenMenu(id);
  };
  const toggleMenu = (id: MenuId) => {
    if (openedByHover.current === id && openMenu === id) {
      openedByHover.current = null;
      return;
    }
    openedByHover.current = null;
    setOpenMenu((m) => (m === id ? null : id));
  };
  const hoverClose = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setOpenMenu(null), 150);
  };
  /** Close a dropdown when keyboard focus moves outside it. */
  const blurClose = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenMenu(null);
  };

  const aboutItems = [
    { label: nav.aboutUs, href: "/about" },
    { label: nav.team, href: "/team" },
    { label: nav.careers, href: "/careers" },
    { label: nav.faq, href: "/faq" },
  ];
  const topLinks = [
    { label: nav.works, href: "/work" },
    { label: nav.packages, href: "/packages" },
    { label: nav.trainings, href: "/trainings" },
  ];

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";
  const servicesActive = isSection("/services");
  const aboutActive = aboutItems.some((it) => isSection(it.href));

  const desktopTrigger = (active: boolean) =>
    `relative flex min-h-11 items-center gap-1 rounded-full px-3.5 text-sm transition-colors ${
      active ? "text-[#d1b780]" : "text-gray-200 hover:text-white"
    }`;
  const activeBar = <span className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-[#B89D5E]" aria-hidden />;
  const chevron = (open: boolean) => (
    <svg className={`h-3.5 w-3.5 opacity-70 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
  const panelLink = (href: string, label: string, extra = "") => (
    <Link
      key={href}
      href={withLocale(href)}
      onClick={closeAll}
      aria-current={isCurrent(href) ? "page" : undefined}
      className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 hover:text-gray-950 ${
        isCurrent(href) ? "bg-gray-100 font-medium text-gray-950" : "text-gray-700"
      } ${extra}`}
    >
      {label}
    </Link>
  );

  return (
    <>
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <div
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border pl-5 pr-2 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500 md:h-16 ${
          scrolled || !isHome
            ? "border-white/10 bg-gray-950/[0.92] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.6)]"
            : "border-white/[0.08] bg-gray-950/55 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.6)]"
        }`}
      >
        <Link href={`/${locale}`} className="flex min-w-0 items-center" onClick={closeAll}>
          <span className="flex flex-col items-center gap-0.5">
            <Image src="/logo.png" alt="DARA" width={150} height={48} className="h-7 w-auto object-contain md:h-8" priority />
            <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.14em] text-gray-300 sm:text-[10px]">{nav.tagline}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label={nav.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            <li>
              <div
                className="relative"
                onMouseEnter={() => hoverOpen("services")}
                onMouseLeave={hoverClose}
                onBlur={blurClose}
              >
                <button
                  ref={(el) => {
                    triggerRefs.current.services = el;
                  }}
                  type="button"
                  aria-expanded={openMenu === "services"}
                  aria-controls="nav-services-panel"
                  onClick={() => toggleMenu("services")}
                  className={desktopTrigger(servicesActive)}
                >
                  {nav.services}
                  {chevron(openMenu === "services")}
                  {servicesActive && activeBar}
                </button>
                <div
                  id="nav-services-panel"
                  hidden={openMenu !== "services"}
                  className="absolute left-0 top-full z-50 pt-2"
                >
                  <div className="grid w-[min(46rem,calc(100vw-2rem))] grid-cols-3 gap-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl">
                    {serviceGroups.map((group) => (
                      <div key={group.id}>
                        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b5a38]">
                          {nav.groups[group.id as keyof typeof nav.groups] ?? group.label}
                        </p>
                        <ul>
                          {group.id !== "branding" && (
                            <li>{panelLink(GROUP_HUB[group.id], nav.overview, "font-medium")}</li>
                          )}
                          {group.items.map(({ slug, label }) => (
                            <li key={slug}>{panelLink(`/services/${slug}`, label.replace(/\s*\n\s*/g, " "))}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="col-span-3 border-t border-gray-100 pt-3">
                      {panelLink("/services", `${nav.viewAllServices} →`, "inline-block font-semibold text-gray-950")}
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {topLinks.map((it) => {
              const active = isSection(it.href);
              return (
                <li key={it.href}>
                  <Link
                    href={withLocale(it.href)}
                    aria-current={isCurrent(it.href) ? "page" : undefined}
                    className={desktopTrigger(active)}
                  >
                    {it.label}
                    {active && activeBar}
                  </Link>
                </li>
              );
            })}
            <li>
              <div className="relative" onMouseEnter={() => hoverOpen("about")} onMouseLeave={hoverClose} onBlur={blurClose}>
                <button
                  ref={(el) => {
                    triggerRefs.current.about = el;
                  }}
                  type="button"
                  aria-expanded={openMenu === "about"}
                  aria-controls="nav-about-panel"
                  onClick={() => toggleMenu("about")}
                  className={desktopTrigger(aboutActive)}
                >
                  {nav.about}
                  {chevron(openMenu === "about")}
                  {aboutActive && activeBar}
                </button>
                <div id="nav-about-panel" hidden={openMenu !== "about"} className="absolute right-0 top-full z-50 pt-2">
                  <ul className="min-w-[13rem] rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                    {aboutItems.map((it) => (
                      <li key={it.href}>{panelLink(it.href, it.label)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Language switcher (same page in the selected language) */}
          <div className="relative" onBlur={blurClose}>
            <button
              ref={(el) => {
                triggerRefs.current.lang = el;
              }}
              type="button"
              onClick={() => {
                // On phones the language list and the menu would overlap: opening one closes the other.
                setMobileOpen(false);
                setMobileSection(null);
                toggleMenu("lang");
              }}
              className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-gray-600 bg-gray-800 px-3 text-sm font-medium text-white transition hover:border-gray-500 hover:bg-gray-700"
              aria-expanded={openMenu === "lang"}
              aria-controls="nav-lang-panel"
              aria-label={`${nav.language}: ${LOCALE_FLAGS[locale].label}`}
            >
              <Image src={LOCALE_FLAGS[locale].flagSrc} alt="" width={24} height={18} className="h-4 w-6 rounded-sm object-cover" />
              <span className="hidden text-xs xl:inline">{LOCALE_FLAGS[locale].label}</span>
            </button>
            <ul
              id="nav-lang-panel"
              hidden={openMenu !== "lang"}
              className="absolute right-0 top-full z-50 mt-1 min-w-[9rem] rounded-xl border border-gray-700 bg-gray-900 py-1 shadow-xl"
            >
              {LOCALES.map((l) => (
                <li key={l}>
                  <Link
                    href={switchLocale(l)}
                    hrefLang={l}
                    lang={l}
                    onClick={closeAll}
                    aria-current={l === locale ? "true" : undefined}
                    className={`flex min-h-11 items-center gap-3 px-4 text-sm transition-colors ${
                      l === locale ? "bg-gray-800 font-medium text-white" : "text-gray-200 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Image src={LOCALE_FLAGS[l].flagSrc} alt="" width={24} height={18} className="h-4 w-6 shrink-0 rounded-sm object-cover" />
                    {LOCALE_FLAGS[l].label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={withLocale("/contact")}
            className="hidden h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#B89D5E] px-5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-[#cbb27a] lg:inline-flex"
          >
            {nav.getQuote}
          </Link>

          <button
            type="button"
            onClick={() => {
              setMobileOpen((s) => !s);
              setMobileSection(null);
              setOpenMenu(null);
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-600 bg-gray-800 text-white hover:bg-gray-700 lg:hidden"
            aria-label={mobileOpen ? nav.closeMenu : nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label={nav.mainNav}
          className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-6xl overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-gray-950/95 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-5">
            <ul className="grid gap-2">
              <li>
                <button
                  type="button"
                  onClick={() => setMobileSection((s) => (s === "services" ? null : "services"))}
                  className="flex min-h-12 w-full items-center justify-between rounded-2xl bg-gray-800/60 px-4 text-left text-sm font-medium text-white"
                  aria-expanded={mobileSection === "services"}
                  aria-controls="mobile-services"
                >
                  {nav.services}
                  {chevron(mobileSection === "services")}
                </button>
                <div id="mobile-services" hidden={mobileSection !== "services"} className="mt-2 space-y-4 rounded-2xl bg-gray-900 p-3">
                  {serviceGroups.map((group) => (
                    <div key={group.id}>
                      <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#d1b780]">
                        {nav.groups[group.id as keyof typeof nav.groups] ?? group.label}
                      </p>
                      <ul>
                        {[
                          ...(group.id !== "branding" ? [{ href: GROUP_HUB[group.id], label: nav.overview }] : []),
                          ...group.items.map(({ slug, label }) => ({ href: `/services/${slug}`, label: label.replace(/\s*\n\s*/g, " ") })),
                        ].map((it) => (
                          <li key={it.href}>
                            <Link
                              href={withLocale(it.href)}
                              onClick={closeAll}
                              aria-current={isCurrent(it.href) ? "page" : undefined}
                              className={`flex min-h-11 items-center rounded-xl px-3 text-sm ${
                                isCurrent(it.href) ? "bg-gray-800 text-white" : "text-gray-200 hover:bg-gray-800"
                              }`}
                            >
                              {it.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link
                    href={withLocale("/services")}
                    onClick={closeAll}
                    className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-white hover:bg-gray-800"
                  >
                    {nav.viewAllServices} →
                  </Link>
                </div>
              </li>
              {topLinks.map((it) => (
                <li key={it.href}>
                  <Link
                    href={withLocale(it.href)}
                    onClick={closeAll}
                    aria-current={isCurrent(it.href) ? "page" : undefined}
                    className={`flex min-h-12 items-center rounded-2xl px-4 text-sm font-medium ${
                      isSection(it.href) ? "bg-gray-700 text-white" : "bg-gray-800/60 text-gray-100 hover:bg-gray-800"
                    }`}
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setMobileSection((s) => (s === "about" ? null : "about"))}
                  className="flex min-h-12 w-full items-center justify-between rounded-2xl bg-gray-800/60 px-4 text-left text-sm font-medium text-white"
                  aria-expanded={mobileSection === "about"}
                  aria-controls="mobile-about"
                >
                  {nav.about}
                  {chevron(mobileSection === "about")}
                </button>
                <ul id="mobile-about" hidden={mobileSection !== "about"} className="mt-2 rounded-2xl bg-gray-900 p-3">
                  {aboutItems.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={withLocale(it.href)}
                        onClick={closeAll}
                        aria-current={isCurrent(it.href) ? "page" : undefined}
                        className={`flex min-h-11 items-center rounded-xl px-3 text-sm ${
                          isCurrent(it.href) ? "bg-gray-800 text-white" : "text-gray-200 hover:bg-gray-800"
                        }`}
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <Link
              href={withLocale("/contact")}
              onClick={closeAll}
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#B89D5E] px-5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-[#cbb27a]"
            >
              {nav.getQuote}
            </Link>
          </div>
        </nav>
      )}
    </header>
    {/* Spacer so page content starts below the floating bar (the homepage hero sits underneath it). */}
    {!isHome && <div className="h-[4.25rem] md:h-[4.75rem]" aria-hidden />}
    </>
  );
}
