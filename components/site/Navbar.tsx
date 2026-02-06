"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

const locales = ["sq", "en", "de"] as const;

export default function Navbar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const [mobileOpen, setMobileOpen] = useState(false);

  const pathWithoutLocale =
    pathname?.replace(`/${locale}`, "") || "/";

  const isActive = (href: string) =>
    pathWithoutLocale === href ||
    (href !== "/" && pathWithoutLocale.startsWith(href));

  const nav = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/process" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* LOGO */}
        <Link
          href={`/${locale}`}
          className="text-lg font-semibold tracking-wide"
        >
          <span className="text-white">DA</span>
          <span className="text-yellow-400">RA</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={`/${locale}${n.href}`}
              className={`text-sm transition ${
                isActive(n.href)
                  ? "text-yellow-400"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-4 md:flex">
          {/* LANGUAGE SWITCH */}
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}${pathWithoutLocale}`}
                className={`rounded-md px-2 py-1 text-xs font-medium transition ${
                  l === locale
                    ? "bg-yellow-400 text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`/${locale}/contact`}
            className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-300"
          >
            Merr ofertë
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg border border-white/10 bg-white/5 p-2 md:hidden"
        >
          <span className="block h-0.5 w-5 bg-white" />
          <span className="mt-1 block h-0.5 w-5 bg-white" />
          <span className="mt-1 block h-0.5 w-5 bg-white" />
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="space-y-4 px-4 py-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={`/${locale}${n.href}`}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm ${
                  isActive(n.href)
                    ? "text-yellow-400"
                    : "text-white/80"
                }`}
              >
                {n.label}
              </Link>
            ))}

            <div className="flex gap-2 pt-3">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}${pathWithoutLocale}`}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium ${
                    l === locale
                      ? "bg-yellow-400 text-black"
                      : "border border-white/15 text-white/70"
                  }`}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>

            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 font-medium text-black"
            >
              Merr ofertë
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
