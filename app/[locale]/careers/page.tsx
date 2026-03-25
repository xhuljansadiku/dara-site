"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { getApiErrorMessage, NETWORK_ERROR_MESSAGES } from "@/lib/api-errors";
import { CAREER_COPY_BY_LOCALE, CAREER_ROLES_BY_LOCALE, type Locale } from "@/lib/careers-data";

type Status = "idle" | "loading" | "success" | "error";

const MAX_CV_SIZE = 5 * 1024 * 1024; // 5 MB

export default function CareersPage() {
  const params = useParams();
  const router = useRouter();
  const cvInputRef = useRef<HTMLInputElement>(null);
  const locale = (params?.locale as Locale) || "sq";
  const copy = CAREER_COPY_BY_LOCALE[locale];
  const roles = CAREER_ROLES_BY_LOCALE[locale];

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
  });

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) {
      setCvFile(null);
      return;
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError(copy.cvFormatError);
      setCvFile(null);
      e.target.value = "";
      return;
    }
    if (file.size > MAX_CV_SIZE) {
      setError(copy.cvSizeError);
      setCvFile(null);
      e.target.value = "";
      return;
    }
    setCvFile(file);
  };

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
    if (!formData.role) {
      setStatus("error");
      setError(locale === "sq" ? "Zgjidh pozicionin." : locale === "de" ? "Bitte wählen Sie eine Position." : "Please select a position.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus("error");
      setError(locale === "sq" ? "Mesazhi duhet të jetë të paktën 10 karaktere." : locale === "de" ? "Die Nachricht muss mindestens 10 Zeichen haben." : "Message must be at least 10 characters.");
      return;
    }
    if (!cvFile) {
      setStatus("error");
      setError(copy.cvRequired);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", formData.name.trim());
      fd.append("email", formData.email.trim());
      fd.append("phone", formData.phone.trim() || "");
      fd.append("role", formData.role.trim());
      fd.append("message", formData.message.trim());
      fd.append("cv", cvFile);
      fd.append("hp", hpValue);
      fd.append("locale", locale);

      const res = await fetch("/api/jobs", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setError(getApiErrorMessage(data?.error, locale));
        return;
      }

      trackEvent("Career Apply Submit");
      router.push(`/${locale}/careers/thank-you`);
    } catch {
      setStatus("error");
      setError(NETWORK_ERROR_MESSAGES[locale]);
    }
  };

  const inputClass =
    "h-12 w-full rounded-2xl border-2 border-stone-200 bg-white px-4 text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-[#c8a55c] focus:ring-2 focus:ring-[#c8a55c]/25";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-stone-50 via-white to-stone-50/50 py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/12 blur-3xl" />
          <div className="absolute right-[-15%] top-1/3 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-[#c8a55c]/30 bg-[#c8a55c]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6d32]">
              {copy.kicker}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-neutral-950 md:text-5xl lg:text-[3.5rem]">
              {copy.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              {copy.subtitle}
            </p>
            <div className="mx-auto mt-8 h-px w-16 rounded-full bg-gradient-to-r from-[#c8a55c] to-transparent" />
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="relative py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(200,165,92,0.08)_0%,transparent_55%)]" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Sidebar - Open positions */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-3xl border border-stone-200/90 bg-white p-6 shadow-sm ring-1 ring-black/[0.03] md:p-8">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8a6d32]">
                {locale === "sq" ? "Pozicionet e hapura" : locale === "de" ? "Offene Stellen" : "Open positions"}
              </h3>
              <ul className="mt-8 space-y-3">
                {roles.map((role, idx) => (
                  <li
                    key={role}
                    className="flex items-center gap-4 rounded-2xl border border-stone-200/90 bg-stone-50/80 px-5 py-4 transition hover:border-[#c8a55c]/35 hover:bg-[#c8a55c]/5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c8a55c]/15 font-mono text-xs font-semibold tabular-nums text-[#8a6d32] ring-1 ring-[#c8a55c]/20">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-neutral-900">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-stone-200/90 bg-white p-8 shadow-sm ring-1 ring-black/[0.03] md:p-12"
            >
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                className="absolute h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
                aria-hidden
              />
              <div className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6d32]">
                  {locale === "sq" ? "Aplikim" : locale === "de" ? "Bewerbung" : "Application"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                  {copy.formTitle}
                </h2>
                <p className="mt-2 text-sm text-neutral-600">{copy.formSubtitle}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="grid gap-2 sm:col-span-1">
                  <span className="text-sm font-medium text-neutral-700">{copy.nameLabel}</span>
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
                  />
                </label>
                <label className="grid gap-2 sm:col-span-1">
                  <span className="text-sm font-medium text-neutral-700">{copy.emailLabel}</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@email.com"
                    className={inputClass}
                    required
                  />
                </label>
                <label className="grid gap-2 sm:col-span-1">
                  <span className="text-sm font-medium text-gray-700">{copy.phoneLabel}</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+355 6X XXX XXXX"
                    className={inputClass}
                  />
                </label>
                <div className="sm:col-span-2">
                  <span className="mb-3 block text-sm font-medium text-neutral-700">{copy.roleLabel}</span>
                  <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={copy.roleLabel}>
                    {roles.map((role) => (
                      <label
                        key={role}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 transition ${
                          formData.role === role
                            ? "border-[#c8a55c]/50 bg-[#c8a55c]/10 ring-1 ring-[#c8a55c]/25"
                            : "border-stone-200 bg-stone-50/80 hover:border-[#c8a55c]/35 hover:bg-[#c8a55c]/5"
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={formData.role === role}
                          onChange={() => setFormData((p) => ({ ...p, role }))}
                          className="sr-only"
                          required
                        />
                        <span className="font-mono text-xs tabular-nums text-[#c8a55c]">
                          {String(roles.indexOf(role) + 1).padStart(2, "0")}
                        </span>
                        <span className="font-medium text-neutral-900">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CV Upload - PDF only */}
                <div className="sm:col-span-2">
                  <span className="mb-3 block text-sm font-medium text-neutral-700">{copy.cvLabel}</span>
                  <div
                    onClick={() => cvInputRef.current?.click()}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition ${
                      cvFile
                        ? "border-[#c8a55c]/45 bg-[#c8a55c]/10"
                        : "border-stone-200 bg-stone-50/80 hover:border-[#c8a55c]/40 hover:bg-[#c8a55c]/5"
                    }`}
                  >
                    <input
                      ref={cvInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleCvChange}
                      className="hidden"
                    />
                    {cvFile ? (
                      <>
                        <svg className="h-12 w-12 text-[#8a6d32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-3 font-medium text-neutral-900">{cvFile.name}</p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {(cvFile.size / 1024).toFixed(1)} KB
                        </p>
                        <p className="mt-2 text-xs text-neutral-600">
                          {locale === "sq" ? "Kliko për të ndryshuar" : locale === "de" ? "Klicken zum Ändern" : "Click to change"}
                        </p>
                      </>
                    ) : (
                      <>
                        <svg className="h-12 w-12 text-[#c8a55c]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-3 text-sm font-medium text-neutral-800">
                          {locale === "sq" ? "Ngarko CV-në tënde" : locale === "de" ? "CV hochladen" : "Upload your CV"}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">{copy.cvHint}</p>
                      </>
                    )}
                  </div>
                </div>

                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-sm font-medium text-neutral-700">{copy.messageLabel}</span>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder={copy.messagePlaceholder}
                    rows={5}
                    className={`${inputClass} min-h-[140px] resize-y py-3`}
                    required
                    minLength={10}
                  />
                </label>
              </div>

              {error && (
                <p className="mt-6 rounded-2xl border border-red-200/90 bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-100">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-10 w-full rounded-2xl bg-neutral-950 py-4 font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
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
        </div>
        </div>
      </section>
    </>
  );
}
