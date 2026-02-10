"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const LOCALES = ["sq", "en", "de"] as const;

const BRAND_GOLD = "#c8a55c";
const BRAND_GOLD_HOVER = "#b6944f";

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
    const target = withLocale(href);
    if (href === "/") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname === target || pathname.startsWith(`${target}/`);
  }

  function switchLocale(nextLocale: string) {
    const parts = (pathname || `/${locale}`).split("/").filter(Boolean);
    if (parts.length === 0) return `/${nextLocale}`;
    parts[0] = nextLocale;
    return `/${parts.join("/")}`;
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur"
      style={{ backgroundColor: "rgba(68, 68, 68, 0.9)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Brand: DARA + MARKETING AGENCY (subtitle) */}
        <Link href={`/${locale}`} className="flex flex-col items-center gap-0.5" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="DARA"
            width={140}
            height={44}
            className="h-8 w-auto object-contain sm:h-9 md:h-10"
            priority
          />
          <span className="text-[9px] uppercase tracking-[0.12em] text-white/50 sm:text-[10px]">
            Marketing Agency
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
                    ? "border"
                    : "border border-transparent text-white/70 hover:bg-white/5 hover:text-white",
                ].join(" ")}
                style={
                  active
                    ? { backgroundColor: `${BRAND_GOLD}20`, color: BRAND_GOLD, borderColor: `${BRAND_GOLD}40` }
                    : {}
                }
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 md:flex">
            {LOCALES.map((l) => {
              const active = l === locale;
              return (
                <Link
                  key={l}
                  href={switchLocale(l)}
                  className={[
                    "rounded-lg px-2.5 py-1 text-xs font-medium transition",
                    active ? "text-black" : "text-white/70 hover:text-white",
                  ].join(" ")}
                  style={active ? { backgroundColor: BRAND_GOLD } : {}}
                >
                  {l.toUpperCase()}
                </Link>
              );
            })}
          </div>

          <Link
            href={withLocale("/contact")}
            className="hidden h-10 items-center justify-center rounded-xl px-4 text-sm font-medium text-black md:inline-flex"
            style={{ backgroundColor: BRAND_GOLD }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = BRAND_GOLD_HOVER;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = BRAND_GOLD;
            }}
          >
            Get a quote
          </Link>

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
        <div className="border-t border-white/10 md:hidden" style={{ backgroundColor: "#444444" }}>
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
                      active ? "border-white/30" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
                    ].join(" ")}
                    style={active ? { backgroundColor: `${BRAND_GOLD}20`, color: BRAND_GOLD } : {}}
                  >
                    <span>{it.label}</span>
                    <span className="text-white/40">→</span>
                  </Link>
                );
              })}
            </div>

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
                        active ? "text-black" : "border border-white/10 text-white/80 hover:bg-white/10",
                      ].join(" ")}
                      style={active ? { backgroundColor: BRAND_GOLD } : {}}
                    >
                      {l.toUpperCase()}
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link
              href={withLocale("/contact")}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl px-5 font-medium text-black"
              style={{ backgroundColor: BRAND_GOLD }}
            >
              Get a quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
