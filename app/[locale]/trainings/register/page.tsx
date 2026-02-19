"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LocaleLink from "@/components/site/LocaleLink";
import { TRAININGS, type Locale } from "@/lib/trainings-data";
import { useRecaptchaToken } from "@/components/RecaptchaProvider";
import { trackEvent } from "@/lib/analytics";
import { getApiErrorMessage, NETWORK_ERROR_MESSAGES } from "@/lib/api-errors";

type Status = "idle" | "loading" | "success" | "error";

const COPY: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    trainingLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    selectTraining: string;
  }
> = {
  sq: {
    title: "Rregjistrohu për trajnime",
    subtitle: "Plotëso formularin dhe do të kontaktojmë për detajet e regjistrimit.",
    nameLabel: "Emri*",
    emailLabel: "Email*",
    trainingLabel: "Trajnimi që të intereson*",
    messageLabel: "Mesazh (opsional)",
    messagePlaceholder: "Pyetje ose shënime...",
    submit: "Dërgo kërkesën",
    selectTraining: "Zgjidh trajnimin...",
  },
  en: {
    title: "Register for trainings",
    subtitle: "Fill in the form and we'll contact you with registration details.",
    nameLabel: "Name*",
    emailLabel: "Email*",
    trainingLabel: "Training of interest*",
    messageLabel: "Message (optional)",
    messagePlaceholder: "Questions or notes...",
    submit: "Submit request",
    selectTraining: "Select training...",
  },
  de: {
    title: "Für Trainings anmelden",
    subtitle: "Füllen Sie das Formular aus und wir melden uns mit den Anmeldedetails.",
    nameLabel: "Name*",
    emailLabel: "E-Mail*",
    trainingLabel: "Gewünschtes Training*",
    messageLabel: "Nachricht (optional)",
    messagePlaceholder: "Fragen oder Anmerkungen...",
    submit: "Anfrage senden",
    selectTraining: "Training wählen...",
  },
};

export default function TrainingRegisterPage() {
  const params = useParams();
  const router = useRouter();
  const { getToken } = useRecaptchaToken();
  const locale = (params?.locale as Locale) || "sq";
  const copy = COPY[locale];

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    training: "",
    message: "",
  });

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus("loading");

    const hpInput = (e.target as HTMLFormElement).elements.namedItem("hp") as HTMLInputElement | null;
    const hpValue = hpInput?.value?.trim() ?? "";

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus("error");
      setError(locale === "sq" ? "Plotëso emrin (të paktën 2 karaktere)." : locale === "de" ? "Bitte geben Sie einen Namen ein." : "Please enter your name (at least 2 characters).");
      return;
    }
    if (!formData.email.trim() || !isValidEmail(formData.email.trim())) {
      setStatus("error");
      setError(locale === "sq" ? "Plotëso një email të vlefshëm." : locale === "de" ? "Bitte geben Sie eine gültige E-Mail ein." : "Please enter a valid email.");
      return;
    }
    if (!formData.training) {
      setStatus("error");
      setError(locale === "sq" ? "Zgjidh një trajnim." : locale === "de" ? "Bitte wählen Sie ein Training." : "Please select a training.");
      return;
    }

    const training = TRAININGS.find((t) => t.slug === formData.training);
    const trainingTitle = training ? training.title[locale] : formData.training;
    const fullMessage = `${locale === "sq" ? "Regjistrim për trajnim" : locale === "de" ? "Anmeldung für Training" : "Training registration"}: ${trainingTitle}\n${formData.message.trim() ? `\n${formData.message.trim()}` : ""}`;

    const recaptchaToken = await getToken("training_register");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: fullMessage.trim(),
          hp: hpValue,
          recaptchaToken,
          locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setError(getApiErrorMessage(data?.error, locale));
        return;
      }

      trackEvent("Training Register Submit");
      router.push(`/${locale}/trainings/register/thank-you`);
    } catch {
      setStatus("error");
      setError(NETWORK_ERROR_MESSAGES[locale]);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">
          {locale === "sq" ? "Trajnime" : locale === "de" ? "Training" : "Training"}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/70">
          {copy.subtitle}
        </p>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-xl">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true" />
              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm text-white/70">{copy.nameLabel}</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value.replace(/[^a-zA-ZëçÇË\s]/g, "") }))}
                    placeholder={locale === "sq" ? "Emri juaj" : locale === "de" ? "Ihr Name" : "Your name"}
                    className="h-11 rounded-xl border border-white/15 bg-black/40 px-4 text-white placeholder:text-white/40 outline-none focus:border-[#c8a55c]/40"
                    required
                    minLength={2}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm text-white/70">{copy.emailLabel}</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@email.com"
                    className="h-11 rounded-xl border border-white/15 bg-black/40 px-4 text-white placeholder:text-white/40 outline-none focus:border-[#c8a55c]/40"
                    required
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm text-white/70">{copy.trainingLabel}</span>
                  <select
                    value={formData.training}
                    onChange={(e) => setFormData((p) => ({ ...p, training: e.target.value }))}
                    className="h-11 rounded-xl border border-white/15 bg-black/40 px-4 text-white outline-none focus:border-[#c8a55c]/40"
                    required
                  >
                    <option value="">{copy.selectTraining}</option>
                    {TRAININGS.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.title[locale]} {t.comingSoon ? `(${locale === "sq" ? "Së shpejti" : locale === "de" ? "Demnächst" : "Coming soon"})` : ""}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm text-white/70">{copy.messageLabel}</span>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder={copy.messagePlaceholder}
                    rows={4}
                    className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#c8a55c]/40"
                  />
                </label>
              </div>

              {error && (
                <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-[#c8a55c] to-[#b6944f] py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
              >
                {status === "loading"
                  ? locale === "sq"
                    ? "Duke dërguar..."
                    : locale === "de"
                    ? "Wird gesendet..."
                    : "Sending..."
                  : copy.submit}
              </button>
            </form>
        </div>
      </section>
    </>
  );
}
