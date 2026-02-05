"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const LOCALES = ["sq", "en", "de"] as const;
type Locale = (typeof LOCALES)[number];

export default function Navbar() {
  const t = useTranslations("nav");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = (segments[0] as Locale) || "sq";

  function switchLocale(nextLocale: Locale) {
    const rest = LOCALES.includes(segments[0] as Locale) ? segments.slice(1) : segments;

    const nextPath = "/" + [nextLocale, ...rest].join("/");

    const qs = searchParams.toString();
   router.push(`${nextPath}${qs ? `?${qs}` : ""}`);

  }

  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <div className="text-lg font-semibold tracking-wide">DARA</div>

      <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
        <a className="hover:text-white" href="#services">{t("services")}</a>
        <a className="hover:text-white" href="#works">{t("works")}</a>
        <a className="hover:text-white" href="#training">{t("training")}</a>
        <a className="hover:text-white" href="#contact">{t("contact")}</a>
      </nav>

      <div className="flex items-center gap-3">
        <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
          {LOCALES.map((l) => {
            const active = l === currentLocale;
            return (
              <button
                key={l}
                type="button"
                onClick={() => switchLocale(l)}
                className={[
                  "rounded-full px-3 py-1 text-xs uppercase tracking-wider",
                  active ? "bg-[#c8a96a] text-black" : "text-white/70 hover:text-white",
                ].join(" ")}
                aria-current={active ? "true" : "false"}
              >
                {l}
              </button>
            );
          })}
        </div>

        <a
          href="#contact"
          className="rounded-full border border-[#c8a96a]/60 px-4 py-2 text-sm text-[#c8a96a] hover:border-[#c8a96a] hover:text-[#e2c37a]"
        >
          {t("bookCall")}
        </a>
      </div>
    </header>
  );
}
