"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BrandSelect from "@/components/site/BrandSelect";
import LocaleLink from "@/components/site/LocaleLink";
import { TRAININGS, type Locale } from "@/lib/trainings-data";
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
    backToTrainings: string;
    formTitle: string;
    benefits: string[];
  }
> = {
  sq: {
    title: "Regjistrohu për trajnime",
    subtitle:
      "Plotëso formularin dhe ekipi ynë do të të kontaktojë me hapat e ardhshëm, orarin dhe pagesën.",
    nameLabel: "Emri*",
    emailLabel: "Email*",
    trainingLabel: "Trajnimi që të intereson*",
    messageLabel: "Mesazh (opsional)",
    messagePlaceholder: "Pyetje ose shënime…",
    submit: "Dërgo kërkesën",
    selectTraining: "Zgjidh trajnimin…",
    backToTrainings: "Kthehu te trajnimet",
    formTitle: "Të dhënat e regjistrimit",
    benefits: [
      "Përgjigje e shpejtë nga ekipi ynë",
      "Zgjidh programin që të përshtatet",
      "Pa angazhim, diskutojmë së bashku",
    ],
  },
  en: {
    title: "Register for trainings",
    subtitle:
      "Send your details and our team will follow up with next steps, schedule, and pricing.",
    nameLabel: "Name*",
    emailLabel: "Email*",
    trainingLabel: "Training of interest*",
    messageLabel: "Message (optional)",
    messagePlaceholder: "Questions or notes…",
    submit: "Submit request",
    selectTraining: "Select training…",
    backToTrainings: "Back to trainings",
    formTitle: "Your registration details",
    benefits: [
      "Quick reply from our team",
      "Choose the programme that fits you",
      "No commitment until we connect",
    ],
  },
  de: {
    title: "Für Trainings anmelden",
    subtitle:
      "Senden Sie Ihre Daten, wir melden uns mit den nächsten Schritten, Terminen und Kosten.",
    nameLabel: "Name*",
    emailLabel: "E-Mail*",
    trainingLabel: "Gewünschtes Training*",
    messageLabel: "Nachricht (optional)",
    messagePlaceholder: "Fragen oder Anmerkungen…",
    submit: "Anfrage senden",
    selectTraining: "Training wählen…",
    backToTrainings: "Zurück zu Trainings",
    formTitle: "Ihre Anmeldedaten",
    benefits: [
      "Schnelle Rückmeldung vom Team",
      "Passendes Programm wählen",
      "Unverbindlich, wir sprechen zuerst",
    ],
  },
};

const inputClass =
  "h-12 w-full rounded-2xl border border-neutral-200/90 bg-white px-4 text-[15px] text-neutral-950 shadow-sm outline-none ring-0 transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-[#B89D5E]/60 focus:shadow-[0_0_0_3px_rgba(184,157,94,0.15)]";

export default function TrainingRegisterPage() {
  const params = useParams();
  const router = useRouter();
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

    const hpInput = (e.target as HTMLFormElement).elements.namedItem("hp") as HTMLInputElement | null;
    const hpValue = hpInput?.value?.trim() ?? "";

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError(
        locale === "sq"
          ? "Plotëso emrin (të paktën 2 karaktere)."
          : locale === "de"
            ? "Bitte geben Sie einen Namen ein."
            : "Please enter your name (at least 2 characters)."
      );
      return;
    }
    if (!formData.email.trim() || !isValidEmail(formData.email.trim())) {
      setError(
        locale === "sq"
          ? "Plotëso një email të vlefshëm."
          : locale === "de"
            ? "Bitte geben Sie eine gültige E-Mail ein."
            : "Please enter a valid email."
      );
      return;
    }
    if (!formData.training) {
      setError(
        locale === "sq"
          ? "Zgjidh një trajnim."
          : locale === "de"
            ? "Bitte wählen Sie ein Training."
            : "Please select a training."
      );
      return;
    }

    const training = TRAININGS.find((t) => t.slug === formData.training);
    const trainingTitle = training ? training.title[locale] : formData.training;
    const fullMessage = `${locale === "sq" ? "Regjistrim për trajnim" : locale === "de" ? "Anmeldung für Training" : "Training registration"}: ${trainingTitle}\n${formData.message.trim() ? `\n${formData.message.trim()}` : ""}`;

    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: fullMessage.trim(),
          hp: hpValue,
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
      <div className="relative overflow-hidden border-b border-neutral-200/80 bg-gradient-to-b from-neutral-50 via-white to-[#fafafa]">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45] [mask-image:linear-gradient(180deg,white,transparent)]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(184,157,94,0.12)_0%,transparent_55%)]" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#B89D5E]/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-neutral-200/40 blur-3xl" aria-hidden />

        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-14 lg:px-8">
          <LocaleLink
            href="/trainings"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-0.5" aria-hidden>
              ←
            </span>
            {copy.backToTrainings}
          </LocaleLink>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="text-center lg:col-span-5 lg:text-left">
              <span className="inline-flex items-center justify-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500 lg:justify-start">
                <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
                {locale === "sq" ? "Trajnime" : locale === "de" ? "Training" : "Training"}
              </span>
              <h1 className="mt-5 bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-900 bg-clip-text font-display text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
                {copy.title}
              </h1>
              <p className="mt-4 mx-auto max-w-md text-[17px] leading-relaxed text-neutral-600 lg:mx-0">{copy.subtitle}</p>

              <ul className="mx-auto mt-10 max-w-[18rem] space-y-4 text-left lg:mx-0 lg:max-w-none">
                {copy.benefits.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-sm leading-snug text-neutral-700"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B89D5E]/15 text-[#B89D5E] ring-1 ring-[#B89D5E]/25"
                      aria-hidden
                    >
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-[1.75rem] border border-neutral-200/90 bg-white p-6 shadow-[0_8px_40px_-24px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.04] md:p-8 lg:p-10">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[1.75rem] bg-gradient-to-r from-transparent via-[#B89D5E]/70 to-transparent opacity-90"
                  aria-hidden
                />
                <h2 className="font-display text-lg font-semibold text-neutral-950">{copy.formTitle}</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  {locale === "sq"
                    ? "Fushat me * janë të detyrueshme."
                    : locale === "de"
                      ? "Mit * markierte Felder sind Pflicht."
                      : "Fields marked * are required."}
                </p>

                <form onSubmit={handleSubmit} className="mt-8">
                  <input
                    type="text"
                    name="hp"
                    tabIndex={-1}
                    autoComplete="off"
                    className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
                    aria-hidden="true"
                  />
                  <div className="grid gap-5">
                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-neutral-800">{copy.nameLabel}</span>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value.replace(/[^a-zA-ZëçÇË\s]/g, "") }))
                        }
                        placeholder={locale === "sq" ? "Emri juaj" : locale === "de" ? "Ihr Name" : "Your name"}
                        className={inputClass}
                        required
                        minLength={2}
                        autoComplete="name"
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-neutral-800">{copy.emailLabel}</span>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        placeholder="you@email.com"
                        className={inputClass}
                        required
                        autoComplete="email"
                      />
                    </label>
                    <div className="grid gap-2">
                      <label htmlFor="training-register-select" className="text-sm font-medium text-neutral-800">
                        {copy.trainingLabel}
                      </label>
                      <BrandSelect
                        id="training-register-select"
                        value={formData.training}
                        onChange={(v) => setFormData((p) => ({ ...p, training: v }))}
                        options={TRAININGS.map((t) => ({
                          value: t.slug,
                          label: `${t.title[locale]}${
                            t.comingSoon
                              ? ` (${locale === "sq" ? "Së shpejti" : locale === "de" ? "Demnächst" : "Coming soon"})`
                              : ""
                          }`,
                        }))}
                        placeholder={copy.selectTraining}
                      />
                    </div>
                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-neutral-800">{copy.messageLabel}</span>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        placeholder={copy.messagePlaceholder}
                        rows={4}
                        className={`${inputClass} min-h-[120px] resize-y py-3`}
                      />
                    </label>
                  </div>

                  {error && (
                    <div
                      className="mt-5 rounded-2xl border border-red-200/80 bg-red-50/90 px-4 py-3 text-sm text-red-800"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-8 flex h-12 w-full items-center justify-center rounded-2xl bg-neutral-950 px-6 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition-[background-color,box-shadow,transform] duration-300 ease-out hover:bg-neutral-800 hover:shadow-xl hover:shadow-neutral-900/25 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading"
                      ? locale === "sq"
                        ? "Duke dërguar…"
                        : locale === "de"
                          ? "Wird gesendet…"
                          : "Sending…"
                      : copy.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-10 md:h-14" />
    </>
  );
}
