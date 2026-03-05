"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { locales as LOCALES, defaultLocale } from "@/i18n";
import { getServiceGroupNavItems } from "@/lib/services-data";
import type { Locale } from "@/lib/services-data";

type NavItem = { label: string; href: string; hasDropdown?: boolean; serviceGroupId?: string };

const NAV_TRANSLATIONS: Record<
  (typeof LOCALES)[number],
  {
    tagline: string;
    services: string;
    viewAllServices: string;
    packages: string;
    trainings: string;
    about: string;
    works: string;
    careers: string;
    faq: string;
    team: string;
    contact: string;
    getQuote: string;
    language: string;
  }
> = {
  sq: {
    tagline: "Marketing Agency",
    services: "Shërbime",
    viewAllServices: "Të gjitha shërbimet",
    packages: "Paketa",
    trainings: "Trajnime",
    about: "Rreth nesh",
    works: "Punët",
    careers: "Karrierë",
    faq: "FAQ",
    team: "Ekipi",
    contact: "Kontakt",
    getQuote: "Merr ofertë",
    language: "Gjuha",
  },
  en: {
    tagline: "Marketing Agency",
    services: "Services",
    viewAllServices: "All services",
    packages: "Packages",
    trainings: "Training",
    about: "About",
    works: "Work",
    careers: "Careers",
    faq: "FAQ",
    team: "Team",
    contact: "Contact",
    getQuote: "Get a quote",
    language: "Language",
  },
  de: {
    tagline: "Marketing Agency",
    services: "Leistungen",
    viewAllServices: "Alle Leistungen",
    packages: "Pakete",
    trainings: "Training",
    about: "Über uns",
    works: "Referenzen",
    careers: "Karriere",
    faq: "FAQ",
    team: "Team",
    contact: "Kontakt",
    getQuote: "Angebot anfragen",
    language: "Sprache",
  },
};

export default function Navbar() {
  const pathname = usePathname() || "/";
  const params = useParams();

  // Derive current locale from params or path, fall back to defaultLocale
  const pathParts = pathname.split("/").filter(Boolean);
  let locale = typeof params?.locale === "string" ? String(params.locale) : pathParts[0];
  if (!LOCALES.includes((locale ?? "") as (typeof LOCALES)[number])) {
    locale = defaultLocale;
  }
  const nav = NAV_TRANSLATIONS[locale as (typeof LOCALES)[number]] ?? NAV_TRANSLATIONS[defaultLocale];

  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const [marketingOpen, setMarketingOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileWebsiteOpen, setMobileWebsiteOpen] = useState(false);
  const [mobileMarketingOpen, setMobileMarketingOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const websiteRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = (fn: () => void, delay = 120) => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(fn, delay);
  };

  const LOCALE_FLAGS: Record<(typeof LOCALES)[number], { flagSrc: string; label: string }> = {
    sq: { flagSrc: "https://flagcdn.com/w40/al.png", label: "Shqip" },
    en: { flagSrc: "https://flagcdn.com/w40/gb.png", label: "English" },
    de: { flagSrc: "https://flagcdn.com/w40/de.png", label: "Deutsch" },
  };

  const currentLocale = (LOCALES.includes((locale ?? "") as (typeof LOCALES)[number])
    ? locale
    : defaultLocale) as Locale;
  const serviceGroups = useMemo(() => getServiceGroupNavItems(currentLocale), [currentLocale]);

  const items: NavItem[] = useMemo(
    () => [
      { label: serviceGroups[0]?.label ?? "Website", href: "/services", hasDropdown: true, serviceGroupId: "website" },
      { label: serviceGroups[1]?.label ?? "Marketing", href: "/services", hasDropdown: true, serviceGroupId: "marketing" },
      { label: serviceGroups[2]?.label ?? "Branding", href: "/services/branding" },
      { label: nav.packages, href: "/packages" },
      { label: nav.trainings, href: "/trainings" },
      { label: nav.works, href: "/work" },
      { label: nav.about, href: "/about", hasDropdown: true },
    ],
    [nav, serviceGroups]
  );

  const aboutDropdownItems = useMemo(
    () => [
      { label: nav.about, href: "/about" },
      // { label: nav.team, href: "/team" }, // TODO: shtohet më vonë
      { label: nav.careers, href: "/careers" },
      { label: nav.faq, href: "/faq" },
    ],
    [nav]
  );

  const isServicesActive = pathname === withLocale("/services") || pathname.startsWith(withLocale("/services/"));
  const isWebsiteActive =
    pathname.includes("/services/website") ||
    ["website-landing", "ecommerce", "saas", "maintenance"].some((s) =>
      pathname.includes(`/services/${s}`)
    );
  const isMarketingActive =
    pathname.includes("/services/marketing") ||
    ["social-media", "content", "strategy", "ads", "consulting"].some((s) =>
      pathname.includes(`/services/${s}`)
    );
  const isAboutActive =
    pathname === withLocale("/about") ||
    pathname === withLocale("/careers") ||
    pathname === withLocale("/faq");

  useEffect(() => {
    if (!websiteOpen) return;
    function handleClick(e: MouseEvent) {
      if (websiteRef.current && !websiteRef.current.contains(e.target as Node)) setWebsiteOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [websiteOpen]);

  useEffect(() => {
    if (!marketingOpen) return;
    function handleClick(e: MouseEvent) {
      if (marketingRef.current && !marketingRef.current.contains(e.target as Node)) setMarketingOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [marketingOpen]);

  useEffect(() => {
    if (!aboutOpen) return;
    function handleClick(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [aboutOpen]);

  // Kur menuja mobile mbyllet, mbyll edhe nënmenunë
  useEffect(() => {
    if (!open) {
      setMobileAboutOpen(false);
      setMobileWebsiteOpen(false);
      setMobileMarketingOpen(false);
    }
  }, [open]);

  useEffect(() => () => clearCloseTimeout(), []);

  useEffect(() => {
    if (!langDropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) setLangDropdownOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [langDropdownOpen]);

  function withLocale(href: string) {
    const normalized = href.startsWith("/") ? href : `/${href}`;
    return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
  }

  function isActive(href: string) {
    const target = withLocale(href);
    if (href === "/") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname === target || pathname.startsWith(`${target}/`);
  }

  function switchLocale(nextLocale: string) {
    const parts = pathname.split("/").filter(Boolean);

    if (parts.length === 0) {
      return `/${nextLocale}`;
    }

    // If first segment is a locale, replace it; otherwise, prepend
    if (LOCALES.includes(parts[0] as (typeof LOCALES)[number])) {
      parts[0] = nextLocale;
      return `/${parts.join("/")}`;
    }

    return `/${nextLocale}/${parts.join("/")}`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/80 bg-gray-900/70 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-2 md:h-20">
        {/* Brand: DARA + MARKETING AGENCY (subtitle) */}
        <Link href={`/${locale}`} className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex flex-col items-center gap-0.5">
            <Image
              src="/logo.png"
              alt="DARA"
              width={150}
              height={48}
              className="h-9 w-auto object-contain sm:h-10 md:h-11"
              priority
            />
            <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.16em] text-gray-400 sm:text-[10px]">
              {nav.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 rounded-full border border-gray-700 bg-gray-900/50 px-2 py-1 md:flex">
          {items.map((it, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            if (it.href === "/about" && it.hasDropdown) {
              return (
                <div
                  key="about"
                  ref={aboutRef}
                  className="relative"
                  onMouseEnter={() => {
                    clearCloseTimeout();
                    setWebsiteOpen(false);
                    setMarketingOpen(false);
                    setAboutOpen(true);
                  }}
                  onMouseLeave={() => scheduleClose(() => setAboutOpen(false))}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setWebsiteOpen(false);
                      setMarketingOpen(false);
                      setAboutOpen((o) => !o);
                    }}
                    className={[
                      "relative flex flex-col items-center gap-0 rounded-full px-3.5 py-2 text-sm transition-colors",
                      isAboutActive ? "text-[#c8a55c]" : "text-gray-300 hover:text-white",
                    ].join(" ")}
                    aria-expanded={aboutOpen}
                    aria-haspopup="true"
                  >
                    <span className="text-[10px] font-medium text-gray-500">{num}</span>
                    <span className="relative z-10 flex items-center gap-0.5 whitespace-nowrap">
                      {it.label}
                      <span className="ml-0.5 text-[10px] opacity-70">▾</span>
                    </span>
                    {isAboutActive && (
                      <span className="absolute inset-x-2 -bottom-1 h-[2px] rounded-full bg-[#c8a55c]" />
                    )}
                  </button>
                  {aboutOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-2xl border border-gray-200 bg-white py-2 shadow-xl">
                      {aboutDropdownItems.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={withLocale(href)}
                          onClick={() => setAboutOpen(false)}
                          className="block whitespace-nowrap px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            if (it.serviceGroupId === "website" && it.hasDropdown) {
              const group = serviceGroups[0];
              if (!group) return null;
              return (
                <div
                  key="website"
                  ref={websiteRef}
                  className="relative"
                  onMouseEnter={() => {
                    clearCloseTimeout();
                    setAboutOpen(false);
                    setMarketingOpen(false);
                    setWebsiteOpen(true);
                  }}
                  onMouseLeave={() => scheduleClose(() => setWebsiteOpen(false))}
                >
                  <Link
                    href={withLocale("/services/website")}
                    className={[
                      "relative flex flex-col items-center gap-0 rounded-full px-3.5 py-2 text-sm transition-colors",
                      isWebsiteActive ? "text-[#c8a55c]" : "text-gray-300 hover:text-white",
                    ].join(" ")}
                    aria-expanded={websiteOpen}
                    aria-haspopup="true"
                  >
                    <span className="text-[10px] font-medium text-gray-500">{num}</span>
                    <span className="relative z-10 flex items-center gap-0.5 whitespace-nowrap">
                      {group.label}
                      <span className="ml-0.5 text-[10px] opacity-70">▾</span>
                    </span>
                    {isWebsiteActive && (
                      <span className="absolute inset-x-2 -bottom-1 h-[2px] rounded-full bg-[#c8a55c]" />
                    )}
                  </Link>
                  {websiteOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 min-w-[260px] rounded-2xl border border-gray-200 bg-white py-2 shadow-xl">
                      {group.items.map(({ slug, label }) => (
                        <Link
                          key={slug}
                          href={withLocale(`/services/${slug}`)}
                          onClick={() => setWebsiteOpen(false)}
                          className="block whitespace-nowrap px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            if (it.serviceGroupId === "marketing" && it.hasDropdown) {
              const group = serviceGroups[1];
              if (!group) return null;
              return (
                <div
                  key="marketing"
                  ref={marketingRef}
                  className="relative"
                  onMouseEnter={() => {
                    clearCloseTimeout();
                    setAboutOpen(false);
                    setWebsiteOpen(false);
                    setMarketingOpen(true);
                  }}
                  onMouseLeave={() => scheduleClose(() => setMarketingOpen(false))}
                >
                  <Link
                    href={withLocale("/services/marketing")}
                    className={[
                      "relative flex flex-col items-center gap-0 rounded-full px-3.5 py-2 text-sm transition-colors",
                      isMarketingActive ? "text-[#c8a55c]" : "text-gray-300 hover:text-white",
                    ].join(" ")}
                    aria-expanded={marketingOpen}
                    aria-haspopup="true"
                  >
                    <span className="text-[10px] font-medium text-gray-500">{num}</span>
                    <span className="relative z-10 flex items-center gap-0.5 whitespace-nowrap">
                      {group.label}
                      <span className="ml-0.5 text-[10px] opacity-70">▾</span>
                    </span>
                    {isMarketingActive && (
                      <span className="absolute inset-x-2 -bottom-1 h-[2px] rounded-full bg-[#c8a55c]" />
                    )}
                  </Link>
                  {marketingOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 min-w-[280px] rounded-2xl border border-gray-200 bg-white py-2 shadow-xl">
                      {group.items.map(({ slug, label }) => (
                        <Link
                          key={slug}
                          href={withLocale(`/services/${slug}`)}
                          onClick={() => setMarketingOpen(false)}
                          className="block whitespace-nowrap px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            const active = isActive(it.href);
            return (
              <Link
                key={it.href}
                href={withLocale(it.href)}
                className={[
                  "relative flex flex-col items-center gap-0 rounded-full px-3.5 py-2 text-sm transition-colors",
                  active ? "text-[#c8a55c]" : "text-gray-300 hover:text-white",
                ].join(" ")}
              >
                <span className="text-[10px] font-medium text-gray-500">{num}</span>
                <span className="relative z-10 whitespace-nowrap">{it.label}</span>
                {active && (
                  <span className="absolute inset-x-2 -bottom-1 h-[2px] rounded-full bg-[#c8a55c]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div ref={langDropdownRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setLangDropdownOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border border-gray-600 bg-gray-800 px-3 py-2 text-sm font-medium text-white transition hover:border-gray-500 hover:bg-gray-700"
              aria-expanded={langDropdownOpen}
              aria-haspopup="true"
              aria-label={nav.language}
            >
              {LOCALE_FLAGS[locale as (typeof LOCALES)[number]] && (
                <Image
                  src={LOCALE_FLAGS[locale as (typeof LOCALES)[number]].flagSrc}
                  alt=""
                  width={24}
                  height={18}
                  className="h-4 w-6 rounded-sm object-cover"
                />
              )}
              <span className="text-xs">{LOCALE_FLAGS[locale as (typeof LOCALES)[number]]?.label ?? locale.toUpperCase()}</span>
              <svg className={`h-4 w-4 text-gray-400 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-xl border border-gray-700 bg-gray-900 py-1 shadow-xl">
                {LOCALES.map((l) => {
                  const active = l === locale;
                  const info = LOCALE_FLAGS[l];
                  return (
                    <Link
                      key={l}
                      href={switchLocale(l)}
                      onClick={() => setLangDropdownOpen(false)}
                      className={[
                        "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                        active ? "bg-gray-800 text-white font-medium" : "text-gray-300 hover:bg-gray-800 hover:text-white",
                      ].join(" ")}
                    >
                      <Image src={info.flagSrc} alt="" width={24} height={18} className="h-4 w-6 shrink-0 rounded-sm object-cover" />
                      <span>{info.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href={withLocale("/contact")}
            className="hidden h-10 shrink-0 items-center justify-center rounded-full bg-[#c8a55c] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b08d45] md:inline-flex md:whitespace-nowrap"
          >
            {nav.getQuote}
          </Link>

          <button
            onClick={() => setOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-gray-800 text-white hover:bg-gray-700 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-gray-800 bg-black md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-5">
            <div className="grid gap-2">
              {items.map((it) => {
                if (it.href === "/about" && it.hasDropdown) {
                  return (
                    <div
                      key="about-mobile"
                      className={`space-y-1 ${mobileAboutOpen ? "border-b border-gray-700 pb-3 mb-2" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setMobileAboutOpen((o) => !o)}
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium uppercase tracking-wider text-white hover:bg-gray-800"
                        aria-expanded={mobileAboutOpen}
                        aria-controls="mobile-about-list"
                        id="mobile-about-button"
                      >
                        <span>{nav.about}</span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-800 text-lg font-medium text-white" aria-hidden>
                          {mobileAboutOpen ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        id="mobile-about-list"
                        role="region"
                        aria-labelledby="mobile-about-button"
                        className={`overflow-hidden transition-all duration-200 ${mobileAboutOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="space-y-1 pt-1">
                          {aboutDropdownItems.map(({ href, label }) => (
                            <Link
                              key={href}
                              href={withLocale(href)}
                              onClick={() => { setOpen(false); setMobileAboutOpen(false); }}
                              className={[
                                "flex items-center justify-between rounded-2xl px-4 py-2.5 pl-6 text-sm transition-colors",
                                pathname === withLocale(href)
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-800",
                              ].join(" ")}
                            >
                              <span>{label}</span>
                              <span className="text-gray-500">→</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                if (it.serviceGroupId === "website" && it.hasDropdown) {
                  const group = serviceGroups[0];
                  if (!group) return null;
                  return (
                    <div
                      key="website-mobile"
                      className={`space-y-1 ${mobileWebsiteOpen ? "border-b border-gray-700 pb-3 mb-2" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setMobileWebsiteOpen((o) => !o)}
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium uppercase tracking-wider text-white hover:bg-gray-800"
                        aria-expanded={mobileWebsiteOpen}
                        aria-controls="mobile-website-list"
                        id="mobile-website-button"
                      >
                        <span>{group.label}</span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-800 text-lg font-medium text-white" aria-hidden>
                          {mobileWebsiteOpen ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        id="mobile-website-list"
                        role="region"
                        aria-labelledby="mobile-website-button"
                        className={`overflow-hidden transition-all duration-200 ${mobileWebsiteOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="space-y-1 pt-1">
                          {group.items.map(({ slug, label }) => (
                            <Link
                              key={slug}
                              href={withLocale(`/services/${slug}`)}
                              onClick={() => { setOpen(false); setMobileWebsiteOpen(false); }}
                              className={[
                                "flex items-center justify-between rounded-2xl px-4 py-2.5 pl-6 text-sm transition-colors",
                                pathname === withLocale(`/services/${slug}`)
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-800",
                              ].join(" ")}
                            >
                              <span>{label}</span>
                              <span className="text-gray-500">→</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                if (it.serviceGroupId === "marketing" && it.hasDropdown) {
                  const group = serviceGroups[1];
                  if (!group) return null;
                  return (
                    <div
                      key="marketing-mobile"
                      className={`space-y-1 ${mobileMarketingOpen ? "border-b border-gray-700 pb-3 mb-2" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setMobileMarketingOpen((o) => !o)}
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium uppercase tracking-wider text-white hover:bg-gray-800"
                        aria-expanded={mobileMarketingOpen}
                        aria-controls="mobile-marketing-list"
                        id="mobile-marketing-button"
                      >
                        <span>{group.label}</span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-800 text-lg font-medium text-white" aria-hidden>
                          {mobileMarketingOpen ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        id="mobile-marketing-list"
                        role="region"
                        aria-labelledby="mobile-marketing-button"
                        className={`overflow-hidden transition-all duration-200 ${mobileMarketingOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="space-y-1 pt-1">
                          {group.items.map(({ slug, label }) => (
                            <Link
                              key={slug}
                              href={withLocale(`/services/${slug}`)}
                              onClick={() => { setOpen(false); setMobileMarketingOpen(false); }}
                              className={[
                                "flex items-center justify-between rounded-2xl px-4 py-2.5 pl-6 text-sm transition-colors",
                                pathname === withLocale(`/services/${slug}`)
                                  ? "bg-gray-800 text-white"
                                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-800",
                              ].join(" ")}
                            >
                              <span>{label}</span>
                              <span className="text-gray-500">→</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                const active = isActive(it.href);
                return (
                  <Link
                    key={it.href}
                    href={withLocale(it.href)}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors",
                      active
                        ? "bg-gray-800 text-white"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-800",
                    ].join(" ")}
                  >
                    <span>{it.label}</span>
                    <span className="text-gray-500">→</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-gray-700 bg-gray-800/50 p-3">
              <div className="flex-1">
                <p className="text-xs text-gray-400">{nav.language}</p>
                <div className="mt-2 flex gap-2">
                {LOCALES.map((l) => {
                  const active = l === locale;
                  const info = LOCALE_FLAGS[l];
                  return (
                    <Link
                      key={l}
                      href={switchLocale(l)}
                      onClick={() => setOpen(false)}
                      className={[
                        "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-center text-xs font-medium transition-colors",
                        active
                          ? "bg-white text-black"
                          : "border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white",
                      ].join(" ")}
                    >
                      <Image src={info.flagSrc} alt="" width={24} height={18} className="h-4 w-6 shrink-0 rounded-sm object-cover" />
                      <span>{info.label}</span>
                    </Link>
                  );
                })}
                </div>
              </div>
            </div>

            <Link
              href={withLocale("/contact")}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#c8a55c] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b08d45] whitespace-nowrap"
            >
              {nav.getQuote}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
