"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const LOCALES = ["sq", "en", "de"] as const;

export default function Navbar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = String(params?.locale ?? "en");

  const [open, setOpen] = useState(false);

  const items: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Process", href: "/process" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  function withLocale(href: string) {
    const normalized = href.startsWith("/") ? href : `/${href}`;
    return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
  }

  function isActive(href: string) {
    // pathname p.sh: /sq/services
    const target = withLocale(href);
    if (href === "/") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname === target || pathname.startsWith(`${target}/`);
  }

  function switchLocale(nextLocale: string) {
    // e mban path-in aktual, vetëm ndërron locale
    // pathname: /sq/services -> /en/services
    const parts = (pathname || `/${locale}`).split("/").filter(Boolean);
    if (parts.length === 0) return `/${nextLocale}`;

    // parts[0] supozohet locale
    parts[0] = nextLocale;
    return `/${parts.join("/")}`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        <Link href={`/${locale}`} className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="DARA Marketing Agency"
            width={100}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/60 md:inline">
            Dare to be different
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => {
            const active = isActive(it.href);
            return (
              <Link
                key={it.href}
                href={withLocale(it.href)}
                className={[
                  "rounded-xl px-3 py-2 text-sm transition",
                  active
                    ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                    : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent",
                ].join(" ")}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language switch (desktop) */}
          <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 md:flex">
            {LOCALES.map((l) => {
              const active = l === locale;
              return (
                <Link
                  key={l}
                  href={switchLocale(l)}
                  className={[
                    "rounded-lg px-2.5 py-1 text-xs font-medium transition",
                    active ? "bg-yellow-400 text-black" : "text-white/70 hover:text-white",
                  ].join(" ")}
                >
                  {l.toUpperCase()}
                </Link>
              );
            })}
          </div>

          {/* CTA (desktop) */}
          <Link
            href={withLocale("/contact")}
            className="hidden h-10 items-center justify-center rounded-xl bg-yellow-400 px-4 text-sm font-medium text-black hover:bg-yellow-300 md:inline-flex"
          >
            Merr ofertë
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="grid gap-2">
              {items.map((it) => {
                const active = isActive(it.href);
                return (
                  <Link
                    key={it.href}
                    href={withLocale(it.href)}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition",
                      active
                        ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-400"
                        : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
                    ].join(" ")}
                  >
                    <span>{it.label}</span>
                    <span className="text-white/40">→</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile language */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-white/60">Language</p>
              <div className="mt-2 flex gap-2">
                {LOCALES.map((l) => {
                  const active = l === locale;
                  return (
                    <Link
                      key={l}
                      href={switchLocale(l)}
                      onClick={() => setOpen(false)}
                      className={[
                        "flex-1 rounded-xl px-3 py-2 text-center text-xs font-medium transition",
                        active ? "bg-yellow-400 text-black" : "border border-white/10 text-white/80 hover:bg-white/10",
                      ].join(" ")}
                    >
                      {l.toUpperCase()}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile CTA */}
            <Link
              href={withLocale("/contact")}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300"
            >
              Merr ofertë
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
