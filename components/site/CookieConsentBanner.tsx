"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LocaleLink from "@/components/site/LocaleLink";
import {
  COOKIE_CONSENT_BY_LOCALE,
  COOKIE_STORAGE_KEY,
  type StoredConsent,
} from "@/lib/cookie-consent-copy";
import type { Locale } from "@/lib/services-data";

function readStored(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed && (parsed.choice === "all" || parsed.choice === "essential") && typeof parsed.at === "number") {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function writeStored(choice: "all" | "essential") {
  const payload: StoredConsent = { choice, at: Date.now() };
  window.localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(
    new CustomEvent("dara-cookie-consent", {
      detail: { analytics: choice === "all", choice },
    })
  );
}

export default function CookieConsentBanner() {
  const params = useParams();
  const localeParam = params?.locale;
  const locale: Locale =
    localeParam === "sq" || localeParam === "en" || localeParam === "de" ? localeParam : "sq";

  const copy = COOKIE_CONSENT_BY_LOCALE[locale];
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (readStored()) return;
    setVisible(true);
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, []);

  function handleChoice(choice: "all" | "essential") {
    writeStored(choice);
    setEntered(false);
    window.setTimeout(() => setVisible(false), 280);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div
        className={`absolute inset-0 bg-neutral-950/55 backdrop-blur-[2px] transition-opacity duration-300 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />

      <div
        className={`relative w-full max-w-[min(100%,28rem)] overflow-hidden rounded-3xl border border-stone-200/90 bg-gradient-to-b from-white to-stone-50/95 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.06] transition-all duration-300 ease-out sm:max-w-lg ${
          entered ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-6 opacity-0 sm:translate-y-4 sm:scale-[0.98]"
        }`}
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#B89D5E]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#B89D5E]/12 blur-2xl" />

        <div className="relative px-5 pb-5 pt-6 sm:px-7 sm:pb-6 sm:pt-7">
          <div className="flex items-start gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#B89D5E]/15 ring-1 ring-[#B89D5E]/25"
              aria-hidden
            >
              <svg className="h-6 w-6 text-[#6b5a38]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M21.598 11.064a2.012 2.012 0 00-1.186-1.186 8.018 8.018 0 00-6.176-7.351 8.025 8.025 0 00-8.25 8.25 8.018 8.018 0 007.351 6.176 2.012 2.012 0 001.186-1.186 2.45 2.45 0 01.146-.45 2.451 2.451 0 012.523-1.588 2.45 2.45 0 011.588 2.523 2.45 2.45 0 01-.45.146 2.012 2.012 0 00-1.186 1.186 8.018 8.018 0 007.351 6.176 8.025 8.025 0 008.25-8.25 8.018 8.018 0 00-7.351-6.176zM8.25 10.5a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm4.5 3a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm3-4.5a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm3 4.5a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b5a38]">DARA</p>
              <h2 id="cookie-consent-title" className="mt-1 font-display text-xl font-bold tracking-tight text-neutral-950">
                {copy.title}
              </h2>
            </div>
          </div>

          <p id="cookie-consent-desc" className="mt-4 text-sm leading-relaxed text-neutral-600">
            {copy.intro}
          </p>

          <ul className="mt-3 space-y-1.5 text-sm text-neutral-600">
            {copy.bullets.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89D5E]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs font-medium text-neutral-500">{copy.chooseHint}</p>

          <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-end">
            <button
              type="button"
              onClick={() => handleChoice("essential")}
              className="order-2 inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:border-neutral-950 hover:bg-stone-50 sm:order-1"
            >
              {copy.rejectOptional}
            </button>
            <button
              type="button"
              onClick={() => handleChoice("all")}
              className="order-1 inline-flex min-h-11 items-center justify-center rounded-2xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 sm:order-2"
            >
              {copy.acceptAll}
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-neutral-500 sm:text-left">
            <LocaleLink
              href="/privacy"
              className="font-medium text-[#6b5a38] underline decoration-[#B89D5E]/50 underline-offset-2 transition hover:decoration-[#B89D5E]"
            >
              {copy.privacyLabel}
            </LocaleLink>
          </p>
        </div>
      </div>
    </div>
  );
}
