"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { locales as LOCALES, defaultLocale } from "@/i18n";
import { getServiceNavItems } from "@/lib/services-data";
import type { Locale } from "@/lib/services-data";

type NavItem = { label: string; href: string };

const NAV_TRANSLATIONS: Record<
  (typeof LOCALES)[number],
  {
    tagline: string;
    home: string;
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
    home: "Kreu",
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
    home: "Home",
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
    home: "Startseite",
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const LOCALE_FLAGS: Record<(typeof LOCALES)[number], { flagSrc: string; label: string }> = {
    sq: { flagSrc: "https://flagcdn.com/w40/al.png", label: "Shqip" },
    en: { flagSrc: "https://flagcdn.com/w40/gb.png", label: "English" },
    de: { flagSrc: "https://flagcdn.com/w40/de.png", label: "Deutsch" },
  };

  const currentLocale = (LOCALES.includes((locale ?? "") as (typeof LOCALES)[number])
    ? locale
    : defaultLocale) as Locale;
  const serviceNavItems = useMemo(() => getServiceNavItems(currentLocale), [currentLocale]);

  const items: NavItem[] = useMemo(
    () => [
      { label: nav.home, href: "/" },
      { label: nav.about, href: "/about" },
      { label: nav.services, href: "/services" },
      { label: nav.packages, href: "/packages" },
      { label: nav.trainings, href: "/trainings" },
      { label: nav.works, href: "/work" },
      { label: nav.careers, href: "/careers" },
      { label: nav.faq, href: "/faq" },
      { label: nav.contact, href: "/contact" },
    ],
    [nav]
  );

  const isServicesActive = pathname === withLocale("/services") || pathname.startsWith(withLocale("/services/"));

  useEffect(() => {
    if (!servicesOpen) return;
    function handleClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [servicesOpen]);

  // Kur menuja mobile mbyllet, mbyll edhe nënmenunë e shërbimeve
  useEffect(() => {
    if (!open) setMobileServicesOpen(false);
  }, [open]);

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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white backdrop-blur-xl">
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
            <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.16em] text-gray-900/60 sm:text-[10px]">
              {nav.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-1 md:flex">
          {items.map((it) => {
            if (it.href === "/services") {
              return (
                <div key="services" ref={servicesRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setServicesOpen((o) => !o)}
                    className={[
                      "relative flex items-center gap-0.5 rounded-full px-3.5 py-1.5 text-sm transition-colors",
                      isServicesActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900",
                    ].join(" ")}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {isServicesActive && (
                      <span className="absolute inset-x-2 -bottom-1 h-[2px] rounded-full bg-gray-900" />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{it.label}</span>
                    <span className="relative z-10 ml-0.5 text-[10px] opacity-70">▾</span>
                  </button>
                  {servicesOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-2xl border border-gray-200 bg-white py-2 shadow-xl">
                      <Link
                        href={withLocale("/services")}
                        onClick={() => setServicesOpen(false)}
                        className="block border-b border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-white/5"
                      >
                        {nav.viewAllServices}
                      </Link>
                      {serviceNavItems.map(({ slug, label }) => (
                        <Link
                          key={slug}
                          href={withLocale(`/services/${slug}`)}
                          onClick={() => setServicesOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-900/85 hover:bg-white/5 hover:text-gray-900"
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
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  active ? "text-gray-900" : "text-gray-600 hover:text-gray-900",
                ].join(" ")}
              >
{active && (
                <span className="absolute inset-x-2 -bottom-1 h-[2px] rounded-full bg-gray-900" />
              )}
                <span className="relative z-10 whitespace-nowrap">{it.label}</span>
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
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition hover:border-gray-300 hover:bg-gray-50"
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
              <svg className={`h-4 w-4 text-gray-900/60 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-xl border border-gray-200 bg-white py-1 shadow-xl">
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
                        active ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
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
            className="hidden h-10 shrink-0 items-center justify-center rounded-full bg-[#1e222a] px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[#2a3039] md:inline-flex md:whitespace-nowrap"
          >
            {nav.getQuote}
          </Link>

          <button
            onClick={() => setOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/30 text-gray-900/80 hover:bg-white/40 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-gray-200 bg-white/95 md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-5">
            <div className="grid gap-2">
              {items.map((it) => {
                if (it.href === "/services") {
                  return (
                    <div
                      key="services-mobile"
                      className={`space-y-1 ${mobileServicesOpen ? "border-b border-gray-200 pb-3 mb-2" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((o) => !o)}
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-900/90 hover:bg-gray-100"
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services-list"
                        id="mobile-services-button"
                      >
                        <span>{nav.services}</span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg font-medium text-gray-900/90" aria-hidden>
                          {mobileServicesOpen ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        id="mobile-services-list"
                        role="region"
                        aria-labelledby="mobile-services-button"
                        className={`overflow-hidden transition-all duration-200 ${mobileServicesOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="space-y-1 pt-1">
                          <Link
                            href={withLocale("/services")}
                            onClick={() => { setOpen(false); setMobileServicesOpen(false); }}
                            className={[
                              "flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors",
                              pathname === withLocale("/services")
                                ? "bg-gray-100 text-gray-900"
                                : "bg-white/5 text-gray-900/80 hover:bg-gray-100",
                            ].join(" ")}
                          >
                            <span>{nav.viewAllServices}</span>
                            <span className="text-gray-900/40">→</span>
                          </Link>
                          {serviceNavItems.map(({ slug, label }) => (
                            <Link
                              key={slug}
                              href={withLocale(`/services/${slug}`)}
                              onClick={() => { setOpen(false); setMobileServicesOpen(false); }}
                              className={[
                                "flex items-center justify-between rounded-2xl px-4 py-2.5 pl-6 text-sm transition-colors",
                                pathname === withLocale(`/services/${slug}`)
                                  ? "bg-gray-100 text-gray-900"
                                  : "bg-white/5 text-gray-900/80 hover:bg-gray-100",
                              ].join(" ")}
                            >
                              <span>{label}</span>
                              <span className="text-gray-900/40">→</span>
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
                        ? "bg-gray-100 text-gray-900"
                        : "bg-white/5 text-gray-900/80 hover:bg-gray-100",
                    ].join(" ")}
                  >
                    <span>{it.label}</span>
                    <span className="text-gray-900/40">→</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/30 p-3">
              <div className="flex-1">
                <p className="text-xs text-gray-900/60">{nav.language}</p>
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
                          ? "bg-[#1e222a] text-white"
                          : "border border-gray-200 text-gray-700 hover:bg-gray-100",
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
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#1e222a] px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[#2a3039] whitespace-nowrap"
            >
              {nav.getQuote}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
