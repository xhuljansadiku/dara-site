"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

type Locale = "sq" | "en" | "de";

const COPY: Record<Locale, { placeholder: string; submit: string; submitting: string; success: string; alreadySubscribed: string; captchaError: string; networkError: string; invalidEmail: string; serverError: string; rateLimited: string }> = {
  sq: {
    placeholder: "Adresa email",
    submit: "Abonohu",
    submitting: "Duke dërguar...",
    success: "U abonove!",
    alreadySubscribed: "Je tashmë i abonuar.",
    captchaError: "Verifikimi anti-spam dështoi. Rifresko dhe provo prap.",
    networkError: "Gabim rrjeti. Provo prap.",
    invalidEmail: "Plotëso një email të vlefshëm.",
    serverError: "Diçka shkoi keq. Provo prap.",
    rateLimited: "Shumë kërkesa. Provo prap pas disa minutash.",
  },
  en: {
    placeholder: "Email address",
    submit: "Subscribe",
    submitting: "Submitting...",
    success: "You're subscribed!",
    alreadySubscribed: "You are already subscribed.",
    captchaError: "Anti-spam verification failed. Refresh and try again.",
    networkError: "Network error. Try again.",
    invalidEmail: "Please enter a valid email address.",
    serverError: "Something went wrong. Please try again.",
    rateLimited: "Too many requests. Please try again in a few minutes.",
  },
  de: {
    placeholder: "E-Mail-Adresse",
    submit: "Abonnieren",
    submitting: "Wird gesendet...",
    success: "Sie sind angemeldet!",
    alreadySubscribed: "Sie sind bereits angemeldet.",
    captchaError: "Anti-Spam-Prüfung fehlgeschlagen. Seite neu laden.",
    networkError: "Netzwerkfehler. Bitte erneut versuchen.",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    serverError: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",
    rateLimited: "Zu viele Anfragen. Bitte in ein paar Minuten erneut versuchen.",
  },
};

export default function NewsletterForm({ locale: localeProp }: { locale?: Locale }) {
  const params = useParams();
  const locale = (localeProp ?? (params?.locale as Locale) ?? "sq") as Locale;
  const copy = COPY[locale];

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const hpInput = (e.target as HTMLFormElement).elements.namedItem("hp") as HTMLInputElement | null;
    const hp = hpInput?.value?.trim() ?? "";

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, hp }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const errCode = data?.error;
        const err =
          errCode === "CAPTCHA_FAILED"
            ? copy.captchaError
            : errCode === "INVALID_EMAIL"
              ? copy.invalidEmail
              : errCode === "RATE_LIMITED"
                ? copy.rateLimited
                : errCode === "SERVER_ERROR" || errCode === "INVALID_JSON" || errCode === "INVALID_BODY" || errCode === "INVALID_CONTENT_TYPE"
                  ? copy.serverError
                  : copy.serverError;
        setMsg(`❌ ${err}`);
        setLoading(false);
        return;
      }

      setMsg(data?.exists ? `✅ ${copy.alreadySubscribed}` : `✅ ${copy.success}`);
      setEmail("");
      trackEvent("Newsletter Subscribe");
    } catch {
      setMsg(`❌ ${copy.networkError}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          name="hp"
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
          aria-hidden="true"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder={copy.placeholder}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#c8a96a]/60"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-[#c8a96a] px-5 py-3 text-sm font-medium text-black hover:bg-[#e2c37a] disabled:opacity-70"
        >
          {loading ? copy.submitting : copy.submit}
        </button>
      </form>

      {msg && <p className="mt-3 text-sm text-white/70">{msg}</p>}
    </div>
  );
}
