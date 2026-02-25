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
    "h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-white placeholder:text-white/40 outline-none transition focus:border-[#c8a55c]/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#c8a55c]/20";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#c8a55c]/[0.06] blur-[120px]" />
        </div>
        <div className="mx-auto max-w-3xl">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c8a55c]">
            {copy.kicker}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.5rem] leading-[1.1]">
            {copy.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/60 max-w-2xl">
            {copy.subtitle}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Sidebar - Open positions */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c8a55c]">
                {locale === "sq" ? "Pozicionet e hapura" : locale === "de" ? "Offene Stellen" : "Open positions"}
              </h3>
              <ul className="mt-8 space-y-3">
                {roles.map((role, idx) => (
                  <li
                    key={role}
                    className="flex items-center gap-4 rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-4 transition hover:border-[#c8a55c]/20 hover:bg-white/[0.04]"
                  >
                    <span className="font-mono text-xs tabular-nums text-[#c8a55c]/90">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-white/95">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12"
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
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  {copy.formTitle}
                </h2>
                <p className="mt-2 text-sm text-white/55">{copy.formSubtitle}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="grid gap-2 sm:col-span-1">
                  <span className="text-sm font-medium text-white/80">{copy.nameLabel}</span>
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
                  <span className="text-sm font-medium text-white/80">{copy.emailLabel}</span>
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
                  <span className="text-sm font-medium text-white/80">{copy.phoneLabel}</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+355 6X XXX XXXX"
                    className={inputClass}
                  />
                </label>
                <div className="sm:col-span-2">
                  <span className="block text-sm font-medium text-white/80 mb-3">{copy.roleLabel}</span>
                  <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={copy.roleLabel}>
                    {roles.map((role) => (
                      <label
                        key={role}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition ${
                          formData.role === role
                            ? "border-[#c8a55c]/50 bg-[#c8a55c]/15"
                            : "border-white/[0.08] bg-white/[0.04] hover:border-[#c8a55c]/30 hover:bg-white/[0.06]"
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
                        <span className="font-medium text-white">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CV Upload - PDF only */}
                <div className="sm:col-span-2">
                  <span className="block text-sm font-medium text-white/80 mb-3">{copy.cvLabel}</span>
                  <div
                    onClick={() => cvInputRef.current?.click()}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition ${
                      cvFile
                        ? "border-[#c8a55c]/40 bg-[#c8a55c]/10"
                        : "border-white/[0.12] bg-white/[0.02] hover:border-[#c8a55c]/30 hover:bg-white/[0.04]"
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
                        <svg className="h-12 w-12 text-[#c8a55c]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-3 font-medium text-white">{cvFile.name}</p>
                        <p className="mt-1 text-xs text-white/50">
                          {(cvFile.size / 1024).toFixed(1)} KB
                        </p>
                        <p className="mt-2 text-xs text-[#c8a55c]/80">
                          {locale === "sq" ? "Kliko për të ndryshuar" : locale === "de" ? "Klicken zum Ändern" : "Click to change"}
                        </p>
                      </>
                    ) : (
                      <>
                        <svg className="h-12 w-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-3 text-sm font-medium text-white/80">
                          {locale === "sq" ? "Ngarko CV-në tënde" : locale === "de" ? "CV hochladen" : "Upload your CV"}
                        </p>
                        <p className="mt-1 text-xs text-white/50">{copy.cvHint}</p>
                      </>
                    )}
                  </div>
                </div>

                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-sm font-medium text-white/80">{copy.messageLabel}</span>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder={copy.messagePlaceholder}
                    rows={5}
                    className={inputClass + " min-h-[140px] resize-y py-3"}
                    required
                    minLength={10}
                  />
                </label>
              </div>

              {error && (
                <p className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-10 w-full rounded-xl bg-[#c8a55c] py-4 font-semibold text-black shadow-[0_0_40px_rgba(200,165,92,0.15)] transition hover:bg-[#d4b86a] hover:shadow-[0_0_50px_rgba(200,165,92,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
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
      </section>
    </>
  );
}
