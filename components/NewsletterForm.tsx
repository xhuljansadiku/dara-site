"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

type Locale = "sq" | "en" | "de";

const COPY: Record<
  Locale,
  {
    placeholder: string;
    submit: string;
    submitting: string;
    success: string;
    alreadySubscribed: string;
    captchaError: string;
    networkError: string;
    invalidEmail: string;
    serverError: string;
    rateLimited: string;
    smtpNotConfigured: string;
    emailFailed: string;
    sheetsFailed: string;
  }
> = {
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
    smtpNotConfigured: "Abonimi nuk është aktivizuar në server. Na kontaktoni ose provoni më vonë.",
    emailFailed: "Dërgimi dështoi. Provo prap pas pak.",
    sheetsFailed: "Ruajtja në Google Sheets dështoi. Provo prap ose na kontakto.",
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
    smtpNotConfigured: "Newsletter is not configured on the server yet. Please contact us or try again later.",
    emailFailed: "Delivery failed. Please try again shortly.",
    sheetsFailed: "Could not save to Google Sheets. Try again or contact us.",
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
    smtpNotConfigured: "Der Newsletter ist auf dem Server noch nicht eingerichtet. Bitte kontaktieren Sie uns oder versuchen Sie es später erneut.",
    emailFailed: "Zustellung fehlgeschlagen. Bitte kurz darauf erneut versuchen.",
    sheetsFailed: "Speichern in Google Sheets fehlgeschlagen. Bitte erneut versuchen.",
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
                : errCode === "SMTP_NOT_CONFIGURED"
                  ? copy.smtpNotConfigured
                  : errCode === "EMAIL_FAILED"
                    ? copy.emailFailed
                    : errCode === "SHEETS_FAILED"
                      ? copy.sheetsFailed
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
          className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          {loading ? copy.submitting : copy.submit}
        </button>
      </form>

      {msg && <p className="mt-3 text-sm text-gray-600">{msg}</p>}
    </div>
  );
}
