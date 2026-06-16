// app/[locale]/contact/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NewsletterForm from "@/components/NewsletterForm";
import { trackEvent } from "@/lib/analytics";
import { SERVICE_SLUGS, SERVICE_DETAILS_BY_LOCALE, SERVICE_MIN_PRICE_EUR, type Locale } from "@/lib/services-data";
import { BUDGET_OPTIONS, BUDGET_TIERS_EUR } from "@/lib/budget-prices";
import { GENERIC_ERROR_MESSAGES, NETWORK_ERROR_MESSAGES } from "@/lib/api-errors";

// Services shown in contact form (exclude training - has its own form at /trainings/register)
const CONTACT_SERVICE_SLUGS = SERVICE_SLUGS.filter((s) => s !== "training");
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

type Status = "idle" | "loading" | "success" | "error";
type Step = 1 | 2 | 3 | 4 | 5;

export default function ContactPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as Locale) || "sq";
  const formPanelRef = useRef<HTMLDivElement | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const formLoadedAt = useRef<number>(Date.now());
  const [captchaLeft, setCaptchaLeft] = useState<number>(() => Math.floor(Math.random() * 9) + 2);
  const [captchaRight, setCaptchaRight] = useState<number>(() => Math.floor(Math.random() * 9) + 2);
  const [captchaOp, setCaptchaOp] = useState<"+" | "-" | "×">(() => {
    const ops = ["+", "-", "×"] as const;
    return ops[Math.floor(Math.random() * ops.length)];
  });
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "",
    websiteType: "",
    websitePages: "",
    websiteSEO: "",
    websiteFeatures: "",
    ecommerceProducts: "",
    ecommercePayment: "",
    ecommerceShipping: "",
    socialMediaPlatforms: "",
    socialMediaFrequency: "",
    otherServiceDetails: "",
    budget: "",
    message: "",
  });

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const selectedServiceSlugs = formData.service
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);
  const primaryService = selectedServiceSlugs[0] ?? "";
  const captchaA = captchaOp === "-" ? Math.max(captchaLeft, captchaRight) : captchaLeft;
  const captchaB = captchaOp === "-" ? Math.min(captchaLeft, captchaRight) : captchaRight;
  const captchaExpected =
    captchaOp === "+" ? captchaA + captchaB :
    captchaOp === "-" ? captchaA - captchaB :
    captchaA * captchaB;

  const regenerateCaptcha = () => {
    const ops = ["+", "-", "×"] as const;
    setCaptchaLeft(Math.floor(Math.random() * 9) + 2);
    setCaptchaRight(Math.floor(Math.random() * 9) + 2);
    setCaptchaOp(ops[Math.floor(Math.random() * ops.length)]);
  };

  const handleInputChange = (name: string, value: string) => {
    // For name field, only allow letters and spaces (no numbers or special characters)
    if (name === "name") {
      const filteredValue = value.replace(/[^a-zA-ZëçÇË\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: filteredValue }));
    } else if (name === "service") {
      // When service changes, reset budget if it's now below service minimum
      const serviceMin = value ? SERVICE_MIN_PRICE_EUR[value as keyof typeof SERVICE_MIN_PRICE_EUR] ?? 0 : 0;
      setFormData((prev) => {
        let newBudget = prev.budget;
        if (prev.budget) {
          const budgetIdx = BUDGET_OPTIONS[locale].indexOf(prev.budget);
          if (budgetIdx >= 0 && BUDGET_TIERS_EUR[budgetIdx] < serviceMin) {
            newBudget = "";
          }
        }
        return { ...prev, service: value, budget: newBudget };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleServiceSelection = (slug: string) => {
    setFormData((prev) => {
      const current = prev.service
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
      let newBudget = prev.budget;

      if (newBudget) {
        const budgetIdx = BUDGET_OPTIONS[locale].indexOf(newBudget);
        const maxMin = next.reduce((max, item) => {
          const min = SERVICE_MIN_PRICE_EUR[item as keyof typeof SERVICE_MIN_PRICE_EUR] ?? 0;
          return Math.max(max, min);
        }, 0);
        if (budgetIdx >= 0 && BUDGET_TIERS_EUR[budgetIdx] < maxMin) {
          newBudget = "";
        }
      }

      return {
        ...prev,
        service: next.join(","),
        budget: newBudget,
      };
    });
  };

  const getFilteredBudgetOptions = () => {
    const opts = BUDGET_OPTIONS[locale];
    if (!selectedServiceSlugs.length) return opts;
    const serviceMin = selectedServiceSlugs.reduce((max, slug) => {
      const min = SERVICE_MIN_PRICE_EUR[slug as keyof typeof SERVICE_MIN_PRICE_EUR] ?? 0;
      return Math.max(max, min);
    }, 0);
    return opts.filter((_, i) => i === 0 || BUDGET_TIERS_EUR[i] >= serviceMin);
  };

  const handleNext = (e?: React.MouseEvent) => {
    // Prevent form submission if called from button click
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Prevent double navigation
    if (isNavigating) return;
    
    if (currentStep === 1) {
      if (!formData.name || formData.name.trim().length < 2) {
        setError(locale === "sq" ? "Plotëso emrin (të paktën 2 karaktere)." : locale === "de" ? "Bitte geben Sie einen Namen ein (mindestens 2 Zeichen)." : "Please enter your name (at least 2 characters).");
        return;
      }
      if (!formData.email || !isValidEmail(formData.email.trim())) {
        setError(locale === "sq" ? "Plotëso një email të vlefshëm." : locale === "de" ? "Bitte geben Sie eine gültige E-Mail-Adresse ein." : "Please enter a valid email address.");
        return;
      }
      if (!formData.phone.trim()) {
        setError(locale === "sq" ? "Plotëso numrin e telefonit." : locale === "de" ? "Bitte geben Sie eine Telefonnummer ein." : "Please enter a phone number.");
        return;
      }
    }
    if (currentStep === 2) {
      if (!selectedServiceSlugs.length) {
        setError(locale === "sq" ? "Zgjidh një shërbim." : locale === "de" ? "Bitte wählen Sie einen Service." : "Please select a service.");
        return;
      }
    }
    setError(null);
    setIsNavigating(true);
    // Only increment by 1 step at a time
    if (currentStep < 5) {
      const nextStep = (currentStep === 2 && shouldSkipDetailsStep ? 4 : currentStep + 1) as Step;
      setCurrentStep(nextStep);
      // Reset navigation flag after a short delay
      setTimeout(() => setIsNavigating(false), 300);
    } else {
      setIsNavigating(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => {
        if (prev === 4 && shouldSkipDetailsStep) return 2;
        return (prev - 1) as Step;
      });
      setError(null);
    }
  };

  async function onLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    
    // Only submit if we're on step 5 (review step)
    if (currentStep !== 5) {
      // If not on step 5, prevent submission and do nothing
      // Navigation should only happen via the Next/Review buttons
      return;
    }

    if (Date.now() - formLoadedAt.current < 4000) {
      setStatus("success");
      router.push(`/${locale}/contact/thank-you`);
      return;
    }

    if (Number(captchaAnswer.trim()) !== captchaExpected) {
      setStatus("error");
      setError(
        locale === "sq"
          ? "Verifikimi anti-robot nuk është i saktë. Ju lutem provoni përsëri."
          : locale === "de"
            ? "Die Anti-Bot-Prüfung ist nicht korrekt. Bitte versuchen Sie es erneut."
            : "The anti-bot check is incorrect. Please try again."
      );
      setCaptchaAnswer("");
      regenerateCaptcha();
      return;
    }
    
    setStatus("loading");
    setError(null);

    // Build message from form data
    let messageParts: string[] = [];
    
    if (selectedServiceSlugs.length) {
      const serviceTitle = selectedServiceSlugs
        .map((item) => {
          const itemIndex = SERVICE_SLUGS.findIndex((serviceSlug) => serviceSlug === item);
          return SERVICE_DETAILS_BY_LOCALE[locale]?.[itemIndex]?.title || item;
        })
        .join(", ");
      messageParts.push(`${locale === "sq" ? "Shërbimi" : locale === "de" ? "Leistung" : "Service"}: ${serviceTitle}`);
    }

    if (primaryService === "website-landing") {
      if (formData.websiteType) messageParts.push(`${locale === "sq" ? "Lloji" : locale === "de" ? "Typ" : "Type"}: ${formData.websiteType}`);
      if (formData.websitePages) messageParts.push(`${locale === "sq" ? "Numri i faqeve" : locale === "de" ? "Anzahl Seiten" : "Number of pages"}: ${formData.websitePages}`);
      if (formData.websiteSEO) messageParts.push(`SEO: ${formData.websiteSEO}`);
      if (formData.websiteFeatures) messageParts.push(`${locale === "sq" ? "Funksione" : locale === "de" ? "Funktionen" : "Features"}: ${formData.websiteFeatures}`);
    }

    if (primaryService === "ecommerce") {
      if (formData.ecommerceProducts) messageParts.push(`${locale === "sq" ? "Numri i produkteve" : locale === "de" ? "Anzahl Produkte" : "Number of products"}: ${formData.ecommerceProducts}`);
      if (formData.ecommercePayment) messageParts.push(`${locale === "sq" ? "Pagesa" : locale === "de" ? "Zahlung" : "Payment"}: ${formData.ecommercePayment}`);
      if (formData.ecommerceShipping) messageParts.push(`${locale === "sq" ? "Transport" : locale === "de" ? "Versand" : "Shipping"}: ${formData.ecommerceShipping}`);
    }

    if (primaryService === "social-media") {
      if (formData.socialMediaPlatforms) messageParts.push(`${locale === "sq" ? "Platforma" : locale === "de" ? "Plattformen" : "Platforms"}: ${formData.socialMediaPlatforms}`);
      if (formData.socialMediaFrequency) messageParts.push(`${locale === "sq" ? "Frekuenca" : locale === "de" ? "Häufigkeit" : "Frequency"}: ${formData.socialMediaFrequency}`);
    }

    if (primaryService && primaryService !== "website-landing" && primaryService !== "ecommerce" && primaryService !== "social-media") {
      if (formData.otherServiceDetails) {
        messageParts.push(`${locale === "sq" ? "Detaje" : locale === "de" ? "Details" : "Details"}: ${formData.otherServiceDetails}`);
      }
    }

    if (formData.budget) messageParts.push(`${locale === "sq" ? "Buxheti" : locale === "de" ? "Budget" : "Budget"}: ${formData.budget}`);
    if (formData.message) messageParts.push(`${locale === "sq" ? "Mesazh shtesë" : locale === "de" ? "Zusätzliche Nachricht" : "Additional message"}: ${formData.message}`);

    const fullMessage = messageParts.join("\n");

    const hpInput = (e.target as HTMLFormElement).elements.namedItem("hp") as HTMLInputElement | null;
    const hp = hpInput?.value?.trim() ?? "";

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      budget: formData.budget.trim(),
      message: fullMessage || formData.message.trim(),
      hp,
      locale,
    };

    // Validate required fields
    if (!payload.name || payload.name.trim().length < 2) {
      setStatus("error");
      setError(locale === "sq" ? "Plotëso emrin (të paktën 2 karaktere)." : locale === "de" ? "Bitte geben Sie einen Namen ein (mindestens 2 Zeichen)." : "Please enter your name (at least 2 characters).");
      return;
    }
    
    if (!payload.email || !isValidEmail(payload.email)) {
      setStatus("error");
      setError(locale === "sq" ? "Plotëso një email të vlefshëm." : locale === "de" ? "Bitte geben Sie eine gültige E-Mail-Adresse ein." : "Please enter a valid email address.");
      return;
    }
    
    if (!payload.message || payload.message.trim().length < 10) {
      setStatus("error");
      setError(locale === "sq" ? "Mesazhi duhet të jetë të paktën 10 karaktere." : locale === "de" ? "Die Nachricht muss mindestens 10 Zeichen lang sein." : "Message must be at least 10 characters long.");
      return;
    }

    try {
      const serviceTitle = selectedServiceSlugs
        .map((item) => {
          const itemIndex = SERVICE_SLUGS.findIndex((serviceSlug) => serviceSlug === item);
          return SERVICE_DETAILS_BY_LOCALE[locale]?.[itemIndex]?.title || item;
        })
        .join(", ");

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          company: payload.company,
          service: serviceTitle,
          budget: payload.budget,
          message: payload.message,
          locale: payload.locale,
          source: "website-contact-form",
          _subject: `[DARA Contact] ${payload.name}`,
          _gotcha: hp,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const formspreeError =
          Array.isArray(data?.errors) && typeof data.errors[0]?.message === "string"
            ? data.errors[0].message
            : GENERIC_ERROR_MESSAGES[locale];
        setStatus("error");
        setError(formspreeError);
        return;
      }

      setStatus("success");
      trackEvent("Contact Form Submit");
      router.push(`/${locale}/contact/thank-you`);
    } catch {
      setStatus("error");
      setError(NETWORK_ERROR_MESSAGES[locale]);
    }
  }

  const serviceIndex = primaryService ? SERVICE_SLUGS.findIndex((slug) => slug === primaryService) : -1;
  const selectedService = serviceIndex >= 0 ? SERVICE_DETAILS_BY_LOCALE[locale]?.[serviceIndex] : null;
  const shouldSkipDetailsStep = selectedServiceSlugs.length > 1;
  const stepTitles =
    locale === "sq"
      ? ["Profili", "Shërbimi", "Detajet", "Buxheti", "Konfirmimi"]
      : locale === "de"
      ? ["Profil", "Service", "Details", "Budget", "Bestätigung"]
      : ["Profile", "Service", "Details", "Budget", "Review"];

  useEffect(() => {
    if (!formPanelRef.current) return;

    const top = formPanelRef.current.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: "smooth",
    });
  }, [currentStep]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#faf7f1_0%,#f5efe4_44%,#ffffff_100%)] py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[10%] top-20 h-56 w-56 rounded-full bg-[#B89D5E]/16 blur-3xl" />
          <div className="absolute right-[8%] top-10 h-64 w-64 rounded-full bg-[#0f172a]/8 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(90deg,rgba(184,157,94,0.12),transparent_35%,rgba(15,23,42,0.08))]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="flex justify-center">
        <div className="max-w-4xl text-center">
        <span className="inline-flex items-center rounded-full border border-[#B89D5E]/30 bg-white/75 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b5a38] backdrop-blur">
          {locale === "sq" ? "Kontakt" : locale === "de" ? "Kontakt" : "Contact"}
        </span>
        <h1 className="mt-6 font-display text-4xl font-bold leading-[0.98] tracking-tight text-[#111827] md:text-6xl">
          {locale === "sq" ? (
            <>Le të flasim për <span className="text-gray-900">rritjen</span> tënde</>
          ) : locale === "de" ? (
            <>Lass uns über dein <span className="text-gray-900">Wachstum</span> sprechen</>
          ) : (
            <>Let&apos;s turn your request into a clear action plan.</>
          )}
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
          {locale === "sq"
            ? "Dërgo një mesazh dhe kthehemi me një plan të shkurtër: çfarë bëjmë, sa zgjat dhe çfarë rezultati synojmë."
            : locale === "de"
            ? "Senden Sie eine Nachricht und wir melden uns mit einem kurzen Plan: was wir tun, wie lange es dauert und welches Ergebnis wir anstreben."
            : "Send a message and we'll get back with a short plan: what we do, how long it takes and what result we aim for."}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b7355]">
              {locale === "sq" ? "Përgjigje" : locale === "de" ? "Antwort" : "Response"}
            </p>
            <p className="mt-2 text-lg font-semibold text-[#111827]">
              {locale === "sq" ? "Brenda 24 orëve" : locale === "de" ? "Innerhalb von 24 Std." : "Within 24h"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b7355]">
              {locale === "sq" ? "Formati" : locale === "de" ? "Format" : "Format"}
            </p>
            <p className="mt-2 text-lg font-semibold text-[#111827]">
              {locale === "sq" ? "5 hapa të shkurtër" : locale === "de" ? "5 kurze Schritte" : "5 short steps"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b7355]">
              {locale === "sq" ? "Rezultati" : locale === "de" ? "Ergebnis" : "Outcome"}
            </p>
            <p className="mt-2 text-lg font-semibold text-[#111827]">
              {locale === "sq" ? "Plan + ofertë" : locale === "de" ? "Plan + Angebot" : "Plan + quote"}
            </p>
          </div>
        </div>
        </div>
        <div className="hidden">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d1b780]">
            {locale === "sq" ? "Si punojmë" : locale === "de" ? "How we work" : "How we work"}
          </p>
          <div className="mt-5 space-y-4">
            {[
              locale === "sq"
                ? "Ti zgjedh shërbimin dhe na jep kontekstin bazë."
                : locale === "de"
                ? "Sie wählen den Service und geben uns den Grundkontext."
                : "You choose the service and give us the basic context.",
              locale === "sq"
                ? "Ne filtrojmë kërkesën dhe të kthehemi me drejtim konkret."
                : locale === "de"
                ? "Wir filtern die Anfrage und kommen mit klarer Richtung zurück."
                : "We filter the request and come back with a concrete direction.",
              locale === "sq"
                ? "Nëse ka fit, vazhdojmë me call, ofertë ose audit."
                : locale === "de"
                ? "Wenn es passt, gehen wir weiter mit Call, Angebot oder Audit."
                : "If it’s a fit, we move forward with a call, quote, or audit.",
            ].map((item, index) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d1b780]/40 bg-[#d1b780]/10 text-sm font-semibold text-[#f2dfb8]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-7 text-white/82">{item}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
        </div>
      </section>

      {/* GRID */}
      <section className="relative pb-16 md:pb-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(184,157,94,0.12),transparent_42%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_360px]">
          {/* LEFT: Form */}
          <div>
            <div ref={formPanelRef} className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]">
              <div className="border-b border-stone-200/80 bg-[linear-gradient(135deg,#111827_0%,#1f2937_70%,#374151_100%)] px-6 py-6 text-white md:px-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
              <h2 className="text-xl font-semibold tracking-tight text-white md:text-3xl">
                {locale === "sq" ? "Kërko ofertë" : locale === "de" ? "Angebot anfragen" : "Request quote"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-white/70">
                {locale === "sq" 
                  ? "Plotëso detajet (1–2 min). (E-maili përdoret vetëm për kontakt.)"
                  : locale === "de"
                  ? "Füllen Sie die Details aus (1–2 Min). (E-Mail wird nur für Kontakt verwendet.)"
                  : "Fill in the details (1–2 min). (Email is used for contact only.)"}
              </p>

                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    {locale === "sq" ? "Hapi aktiv" : locale === "de" ? "Aktiver Schritt" : "Current step"}
                  </p>
                  <p className="mt-1 text-lg font-semibold">{String(currentStep).padStart(2, "0")} / 05</p>
                </div>
              </div>

              {/* Step Indicator */}
              <div className="mt-6 grid gap-3 md:grid-cols-5">
                {stepTitles.map((title, index) => {
                  const stepNumber = index + 1;
                  const isActive = currentStep === stepNumber;
                  const isComplete = currentStep > stepNumber;
                  const isDisabled = stepNumber === 3 && shouldSkipDetailsStep;
                  return (
                    <div
                      key={title}
                      className={`rounded-2xl border px-4 py-3 transition ${
                        isDisabled
                          ? "border-white/8 bg-white/[0.03] opacity-45"
                          :
                        isActive
                          ? "border-[#d1b780]/50 bg-[#d1b780]/14"
                          : isComplete
                          ? "border-white/20 bg-white/8"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${isActive ? "text-[#f2dfb8]" : "text-white/50"}`}>
                        {String(stepNumber).padStart(2, "0")}
                      </p>
                      <p className={`mt-2 text-sm font-medium ${isActive ? "text-white" : isComplete ? "text-white/90" : "text-white/65"}`}>
                        {title}
                        {isDisabled ? ` ${locale === "sq" ? "• skip" : locale === "de" ? "• skip" : "• skip"}` : ""}
                      </p>
                    </div>
                  );
                })}
              </div>

              </div>

              <form onSubmit={onLeadSubmit} className="px-6 py-6 md:px-8 md:py-8" onKeyDown={(e) => {
                // Prevent form submission on Enter key unless we're on step 5
                if (e.key === "Enter" && currentStep !== 5) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}>
                <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true" />
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <ControlledField
                        label={locale === "sq" ? "Emri*" : locale === "de" ? "Name*" : "Name*"}
                        name="name"
                        value={formData.name}
                        onChange={(v: string) => handleInputChange("name", v)}
                        placeholder={locale === "sq" ? "Arben" : locale === "de" ? "Max" : "John"}
                        required={true}
                        minLength={2}
                        maxLength={120}
                        pattern="[a-zA-ZëçÇË\s]+"
                        locale={locale}
                      />
                      <ControlledField
                        label={locale === "sq" ? "Nr. telefoni*" : locale === "de" ? "Telefon*" : "Phone*"}
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(v) => handleInputChange("phone", v)}
                        placeholder="+355 68 800 9988"
                        required={true}
                        maxLength={50}
                        locale={locale}
                      />
                      <ControlledField
                        label={locale === "sq" ? "Email*" : locale === "de" ? "E-Mail*" : "Email*"}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(v) => handleInputChange("email", v)}
                        placeholder="you@business.com"
                        required={true}
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}"
                        maxLength={200}
                        locale={locale}
                      />
                    </div>
                    <ControlledField
                      label={locale === "sq" ? "Biznesi (nëse keni një të tillë)" : locale === "de" ? "Unternehmen (falls Sie eines haben)" : "Business (if you have one)"}
                      name="company"
                      value={formData.company}
                      onChange={(v) => handleInputChange("company", v)}
                      placeholder="DARA"
                      locale={locale}
                    />
                  </div>
                )}

                {/* Step 2: Service Selection */}
                {currentStep === 2 && (
                  <div className="grid gap-5">
                    <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#8b7355]">
                        {locale === "sq" ? "Hyrje" : locale === "de" ? "Einführung" : "Introduction"}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-stone-600">
                        {locale === "sq"
                          ? "Na duhen vetëm të dhënat bazë që të dimë me kë po flasim dhe ku të të kthejmë përgjigje."
                          : locale === "de"
                          ? "Wir brauchen nur die Grunddaten, um zu wissen, mit wem wir sprechen und wohin wir antworten."
                          : "We only need the essentials to know who we’re talking to and where to reply."}
                      </p>
                    </div>
                    <MultiServiceSelectField
                      label={locale === "sq" ? "Zgjidh shërbimin*" : locale === "de" ? "Service wählen*" : "Select service*"}
                      values={selectedServiceSlugs}
                      onToggle={toggleServiceSelection}
                      required={true}
                      locale={locale}
                      options={CONTACT_SERVICE_SLUGS.map((slug) => {
                        const serviceIndex = SERVICE_SLUGS.indexOf(slug);
                        const service = SERVICE_DETAILS_BY_LOCALE[locale]?.[serviceIndex];
                        return {
                          value: slug,
                          label: service?.title ?? slug,
                          description: service?.price,
                        };
                      })}
                    />
                  </div>
                )}

                {/* Step 3: Conditional Fields */}
                {currentStep === 3 && !shouldSkipDetailsStep && (
                  <div className="grid gap-4">
                    {!selectedServiceSlugs.length && (
                      <p className="text-sm text-gray-600">
                        {locale === "sq" ? "Ju lutem zgjidhni një shërbim në hapin e mëparshëm." : locale === "de" ? "Bitte wählen Sie einen Service im vorherigen Schritt." : "Please select a service in the previous step."}
                      </p>
                    )}
                    {primaryService === "website-landing" && (
                      <>
                        <ControlledSelectField
                          label={locale === "sq" ? "Lloji i website" : locale === "de" ? "Website-Typ" : "Website type"}
                          name="websiteType"
                          value={formData.websiteType}
                          onChange={(v) => handleInputChange("websiteType", v)}
                          locale={locale}
                          options={
                            locale === "sq"
                              ? ["Landing page", "Website me disa faqe", "Të dyja"]
                              : locale === "de"
                              ? ["Landingpage", "Mehrseitige Website", "Beides"]
                              : ["Landing page", "Multi-page website", "Both"]
                          }
                        />
                        <ControlledSelectField
                          label={locale === "sq" ? "Numri i faqeve (përafërsisht)" : locale === "de" ? "Anzahl Seiten (ca.)" : "Number of pages (approx.)"}
                          name="websitePages"
                          value={formData.websitePages}
                          onChange={(v) => handleInputChange("websitePages", v)}
                          locale={locale}
                          options={["1-3", "4-7", "8-15", "15+"]}
                        />
                        <ControlledSelectField
                          label="SEO"
                          name="websiteSEO"
                          value={formData.websiteSEO}
                          onChange={(v) => handleInputChange("websiteSEO", v)}
                          locale={locale}
                          options={
                            locale === "sq"
                              ? ["Po, duhet SEO", "Jo, jo tani", "Nuk jam i sigurt"]
                              : locale === "de"
                              ? ["Ja, SEO benötigt", "Nein, nicht jetzt", "Nicht sicher"]
                              : ["Yes, need SEO", "No, not now", "Not sure"]
                          }
                        />
                        <ControlledField
                          label={locale === "sq" ? "Funksione të veçanta (opsional)" : locale === "de" ? "Besondere Funktionen (optional)" : "Special features (optional)"}
                          name="websiteFeatures"
                          value={formData.websiteFeatures}
                          onChange={(v) => handleInputChange("websiteFeatures", v)}
                          placeholder={locale === "sq" ? "P.sh. blog, forma kontakt, integrim CRM..." : locale === "de" ? "z.B. Blog, Kontaktformular, CRM-Integration..." : "E.g. blog, contact form, CRM integration..."}
                          locale={locale}
                        />
                      </>
                    )}

                    {primaryService === "ecommerce" && (
                      <>
                        <ControlledSelectField
                          label={locale === "sq" ? "Numri i produkteve (përafërsisht)" : locale === "de" ? "Anzahl Produkte (ca.)" : "Number of products (approx.)"}
                          name="ecommerceProducts"
                          value={formData.ecommerceProducts}
                          onChange={(v) => handleInputChange("ecommerceProducts", v)}
                          locale={locale}
                          options={["1-20", "21-50", "51-100", "100+"]}
                        />
                        <ControlledSelectField
                          label={locale === "sq" ? "Metoda e pagesës" : locale === "de" ? "Zahlungsmethode" : "Payment method"}
                          name="ecommercePayment"
                          value={formData.ecommercePayment}
                          onChange={(v) => handleInputChange("ecommercePayment", v)}
                          locale={locale}
                          options={
                            locale === "sq"
                              ? ["Kartë krediti", "PayPal", "Të dyja", "Tjetër"]
                              : locale === "de"
                              ? ["Kreditkarte", "PayPal", "Beides", "Andere"]
                              : ["Credit card", "PayPal", "Both", "Other"]
                          }
                        />
                        <ControlledSelectField
                          label={locale === "sq" ? "Transport" : locale === "de" ? "Versand" : "Shipping"}
                          name="ecommerceShipping"
                          value={formData.ecommerceShipping}
                          onChange={(v) => handleInputChange("ecommerceShipping", v)}
                          locale={locale}
                          options={
                            locale === "sq"
                              ? ["Vetëm Shqipëri", "Shqipëri + EU", "Ndërkombëtar", "Nuk jam i sigurt"]
                              : locale === "de"
                              ? ["Nur Albanien", "Albanien + EU", "International", "Nicht sicher"]
                              : ["Albania only", "Albania + EU", "International", "Not sure"]
                          }
                        />
                      </>
                    )}

                    {primaryService === "social-media" && (
                      <>
                        <ControlledField
                          label={locale === "sq" ? "Platforma (p.sh. Instagram, Facebook, LinkedIn)" : locale === "de" ? "Plattformen (z.B. Instagram, Facebook, LinkedIn)" : "Platforms (e.g. Instagram, Facebook, LinkedIn)"}
                          name="socialMediaPlatforms"
                          value={formData.socialMediaPlatforms}
                          onChange={(v) => handleInputChange("socialMediaPlatforms", v)}
                          placeholder="Instagram, Facebook"
                          locale={locale}
                        />
                        <ControlledSelectField
                          label={locale === "sq" ? "Frekuenca e postimeve" : locale === "de" ? "Posting-Häufigkeit" : "Posting frequency"}
                          name="socialMediaFrequency"
                          value={formData.socialMediaFrequency}
                          onChange={(v) => handleInputChange("socialMediaFrequency", v)}
                          locale={locale}
                          options={
                            locale === "sq"
                              ? ["1-2 herë/javë", "3-5 herë/javë", "Çdo ditë", "Më shumë"]
                              : locale === "de"
                              ? ["1-2x/Woche", "3-5x/Woche", "Täglich", "Mehr"]
                              : ["1-2x/week", "3-5x/week", "Daily", "More"]
                          }
                        />
                      </>
                    )}

                    {primaryService && primaryService !== "website-landing" && primaryService !== "ecommerce" && primaryService !== "social-media" && (
                      <ControlledTextArea
                        label={locale === "sq" ? "Detaje shtesë për këtë shërbim" : locale === "de" ? "Zusätzliche Details zu diesem Service" : "Additional details for this service"}
                        name="otherServiceDetails"
                        value={formData.otherServiceDetails}
                        onChange={(v) => handleInputChange("otherServiceDetails", v)}
                        placeholder={locale === "sq" ? "Shkruaj detajet që na ndihmojnë..." : locale === "de" ? "Schreiben Sie Details, die uns helfen..." : "Write details that help us..."}
                        rows={4}
                      />
                    )}
                  </div>
                )}

                {/* Step 4: Budget & Message */}
                {currentStep === 4 && (
                  <div className="grid gap-4">
                    <ControlledSelectField
                      label={locale === "sq" ? "Buxheti" : locale === "de" ? "Budget" : "Budget"}
                      name="budget"
                      value={formData.budget}
                      onChange={(v) => handleInputChange("budget", v)}
                      locale={locale}
                      options={getFilteredBudgetOptions()}
                    />
                    <ControlledTextArea
                      label={locale === "sq" ? "Mesazh shtesë (opsional)" : locale === "de" ? "Zusätzliche Nachricht (optional)" : "Additional message (optional)"}
                      name="message"
                      value={formData.message}
                      onChange={(v) => handleInputChange("message", v)}
                      placeholder={locale === "sq" ? "P.sh. objektiva, deadline, preferenca..." : locale === "de" ? "z.B. Ziele, Deadline, Präferenzen..." : "E.g. goals, deadline, preferences..."}
                      rows={5}
                    />
                  </div>
                )}

                {/* Step 5: Review */}
                {currentStep === 5 && (
                  <div className="grid gap-4">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        {locale === "sq" ? "Përmbledhje e kërkesës" : locale === "de" ? "Zusammenfassung der Anfrage" : "Request Summary"}
                      </h3>
                      <div className="grid gap-3 text-sm">
                        <ReviewRow
                          label={locale === "sq" ? "Emri" : locale === "de" ? "Name" : "Name"}
                          value={formData.name}
                        />
                        <ReviewRow
                          label={locale === "sq" ? "Email" : locale === "de" ? "E-Mail" : "Email"}
                          value={formData.email}
                        />
                        {formData.company && (
                          <ReviewRow
                            label={locale === "sq" ? "Biznesi" : locale === "de" ? "Unternehmen" : "Business"}
                            value={formData.company}
                          />
                        )}
                        {selectedServiceSlugs.length > 0 && (
                          <ReviewRow
                            label={locale === "sq" ? "Shërbimi" : locale === "de" ? "Leistung" : "Service"}
                            value={selectedServiceSlugs
                              .map((slug) => {
                                const itemIndex = SERVICE_SLUGS.findIndex((serviceSlug) => serviceSlug === slug);
                                return SERVICE_DETAILS_BY_LOCALE[locale]?.[itemIndex]?.title || slug;
                              })
                              .join(", ")}
                          />
                        )}
                        {primaryService === "website-landing" && (
                          <>
                            {formData.websiteType && (
                              <ReviewRow
                                label={locale === "sq" ? "Lloji i website" : locale === "de" ? "Website-Typ" : "Website type"}
                                value={formData.websiteType}
                              />
                            )}
                            {formData.websitePages && (
                              <ReviewRow
                                label={locale === "sq" ? "Numri i faqeve" : locale === "de" ? "Anzahl Seiten" : "Number of pages"}
                                value={formData.websitePages}
                              />
                            )}
                            {formData.websiteSEO && (
                              <ReviewRow
                                label="SEO"
                                value={formData.websiteSEO}
                              />
                            )}
                            {formData.websiteFeatures && (
                              <ReviewRow
                                label={locale === "sq" ? "Funksione" : locale === "de" ? "Funktionen" : "Features"}
                                value={formData.websiteFeatures}
                              />
                            )}
                          </>
                        )}
                        {primaryService === "ecommerce" && (
                          <>
                            {formData.ecommerceProducts && (
                              <ReviewRow
                                label={locale === "sq" ? "Numri i produkteve" : locale === "de" ? "Anzahl Produkte" : "Number of products"}
                                value={formData.ecommerceProducts}
                              />
                            )}
                            {formData.ecommercePayment && (
                              <ReviewRow
                                label={locale === "sq" ? "Pagesa" : locale === "de" ? "Zahlung" : "Payment"}
                                value={formData.ecommercePayment}
                              />
                            )}
                            {formData.ecommerceShipping && (
                              <ReviewRow
                                label={locale === "sq" ? "Transport" : locale === "de" ? "Versand" : "Shipping"}
                                value={formData.ecommerceShipping}
                              />
                            )}
                          </>
                        )}
                        {primaryService === "social-media" && (
                          <>
                            {formData.socialMediaPlatforms && (
                              <ReviewRow
                                label={locale === "sq" ? "Platforma" : locale === "de" ? "Plattformen" : "Platforms"}
                                value={formData.socialMediaPlatforms}
                              />
                            )}
                            {formData.socialMediaFrequency && (
                              <ReviewRow
                                label={locale === "sq" ? "Frekuenca" : locale === "de" ? "Häufigkeit" : "Frequency"}
                                value={formData.socialMediaFrequency}
                              />
                            )}
                          </>
                        )}
                        {primaryService && primaryService !== "website-landing" && primaryService !== "ecommerce" && primaryService !== "social-media" && formData.otherServiceDetails && (
                          <ReviewRow
                            label={locale === "sq" ? "Detaje" : locale === "de" ? "Details" : "Details"}
                            value={formData.otherServiceDetails}
                          />
                        )}
                        {formData.budget && (
                          <ReviewRow
                            label={locale === "sq" ? "Buxheti" : locale === "de" ? "Budget" : "Budget"}
                            value={formData.budget}
                          />
                        )}
                        {formData.message && (
                          <ReviewRow
                            label={locale === "sq" ? "Mesazh shtesë" : locale === "de" ? "Zusätzliche Nachricht" : "Additional message"}
                            value={formData.message}
                          />
                        )}
                      </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-gray-800">
                          {locale === "sq" ? "Shkruaj shumën" : locale === "de" ? "Summe eingeben" : "Enter the sum"}
                        </span>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex h-11 items-center rounded-xl border border-stone-300 bg-white px-4 text-base font-semibold text-stone-900">
                            {captchaA} {captchaOp} {captchaB} = ?
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            required
                            value={captchaAnswer}
                            onChange={(e) => {
                              const next = e.target.value.replace(/[^\d]/g, "");
                              setCaptchaAnswer(next);
                            }}
                            placeholder={locale === "sq" ? "Shkruaj shumën" : locale === "de" ? "Summe eingeben" : "Enter the sum"}
                            className="h-11 w-36 rounded-xl border border-stone-300 bg-white px-3 text-stone-900 outline-none transition focus:border-[#B89D5E] focus:ring-4 focus:ring-[#B89D5E]/10"
                            aria-label={locale === "sq" ? "Përgjigjja e verifikimit anti-robot" : locale === "de" ? "Antwort der Anti-Bot-Verifizierung" : "Anti-bot verification answer"}
                          />
                        </div>
                      </label>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <p className="text-sm text-gray-700">
                        {locale === "sq"
                          ? "Ju lutem kontrolloni të gjitha të dhënat para dërgimit. Pas dërgimit, do të kontaktojmë së shpejti."
                          : locale === "de"
                          ? "Bitte überprüfen Sie alle Daten vor dem Senden. Nach dem Senden werden wir uns bald melden."
                          : "Please review all data before sending. After sending, we'll contact you soon."}
                      </p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-[0_16px_36px_-28px_rgba(220,38,38,0.65)]">
                    {error ?? (locale === "sq" ? "Diçka shkoi keq." : locale === "de" ? "Etwas ist schief gelaufen." : "Something went wrong.")}
                  </p>
                )}

                {/* Navigation Buttons */}
                {currentStep <= 5 && (
                  <div className="mt-8 flex flex-col gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:items-center">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex h-12 items-center justify-center rounded-2xl border border-stone-300 px-5 font-medium text-stone-800 transition hover:border-stone-900 hover:bg-stone-50"
                      >
                        {locale === "sq" ? "Kthehu" : locale === "de" ? "Zurück" : "Back"}
                      </button>
                    )}
                    {currentStep === 1 || currentStep === 2 || currentStep === 3 ? (
                      <button
                        type="button"
                        onClick={(e) => handleNext(e)}
                        className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#111827] px-6 font-medium text-white transition hover:bg-[#1f2937] sm:ml-auto"
                      >
                        {currentStep === 2 && shouldSkipDetailsStep
                          ? locale === "sq"
                            ? "Vazhdo te buxheti"
                            : locale === "de"
                            ? "Weiter zum Budget"
                            : "Continue to budget"
                          : locale === "sq"
                          ? "Vazhdo"
                          : locale === "de"
                          ? "Weiter"
                          : "Next"}
                      </button>
                    ) : currentStep === 4 ? (
                      <button
                        type="button"
                        onClick={(e) => handleNext(e)}
                        className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#111827] px-6 font-medium text-white transition hover:bg-[#1f2937] sm:ml-auto"
                      >
                        {locale === "sq" ? "Kontrollo" : locale === "de" ? "Überprüfen" : "Review"}
                      </button>
                    ) : currentStep === 5 ? (
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#b7924a] px-6 font-medium text-white transition hover:bg-[#a88543] disabled:opacity-60 sm:ml-auto"
                      >
                        {status === "loading"
                          ? locale === "sq" ? "Duke dërguar..." : locale === "de" ? "Wird gesendet..." : "Sending..."
                          : locale === "sq" ? "Dërgo" : locale === "de" ? "Senden" : "Send"}
                      </button>
                    ) : null}
                  </div>
                )}

                {currentStep <= 5 && (
                  <p className="mt-4 text-xs leading-6 text-stone-500">
                    {locale === "sq"
                      ? "Duke dërguar, pranon të të kontaktojmë për këtë kërkesë."
                      : locale === "de"
                      ? "Durch Senden stimmen Sie zu, dass wir Sie für diese Anfrage kontaktieren."
                      : "By sending, you agree that we may contact you for this request."}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] md:p-8">
              <h3 className="text-lg font-semibold text-gray-900">
                {locale === "sq" ? "Info e shpejtë" : locale === "de" ? "Schnellinfo" : "Quick info"}
              </h3>

              <div className="mt-5 grid gap-3 text-sm">
                <InfoRow
                  k={locale === "sq" ? "Email" : locale === "de" ? "E-Mail" : "Email"}
                  v="daramarketing.eu@gmail.com"
                  href="mailto:daramarketing.eu@gmail.com"
                />
                <InfoRow k={locale === "sq" ? "Telefoni" : locale === "de" ? "Telefon" : "Phone"} v="+355 68 800 9988" href="tel:+355688009988" className="min-w-0" />
                <InfoRow
                  k={locale === "sq" ? "Përgjigje" : locale === "de" ? "Antwort" : "Response"}
                  v={locale === "sq" ? "Brenda 24 orëve" : locale === "de" ? "Innerhalb von 24 Std." : "Within 24h"}
                />
              </div>

              <div className="mt-5 text-center">
                <p className="text-sm font-semibold text-gray-700">
                  {locale === "sq" ? "Social" : locale === "de" ? "Social" : "Social"}
                </p>
                <div className="mt-2 flex items-center justify-center gap-4">
                  <a
                    className="text-gray-600 hover:text-gray-900 transition"
                    href="https://www.instagram.com/daramarketing.al/?hl=en"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    className="text-gray-600 hover:text-gray-900 transition"
                    href="https://www.facebook.com/profile.php?id=100082700976706"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    className="text-gray-600 hover:text-gray-900 transition"
                    href="https://www.linkedin.com/company/dara-marketing-agency-al/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-gray-200" />

              <h4 className="mt-6 text-sm font-semibold text-gray-700">
                {locale === "sq" ? "Preferon newsletter?" : locale === "de" ? "Newsletter bevorzugt?" : "Prefer newsletter?"}
              </h4>
              <p className="mt-2 text-sm text-gray-600">
                {locale === "sq"
                  ? "Merr tips javore për content, growth dhe ads."
                  : locale === "de"
                  ? "Wöchentliche Tipps zu Content, Growth und Ads."
                  : "Get weekly tips on content, growth and ads."}
              </p>

              <div className="mt-4">
                <NewsletterForm locale={locale} />
              </div>

              <p className="mt-3 text-xs text-gray-500">
                {locale === "sq" ? "Pa spam. Çabohu kur të duash." : locale === "de" ? "Kein Spam. Jederzeit abmelden." : "No spam. Unsubscribe anytime."}
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#B89D5E]/25 bg-[linear-gradient(180deg,rgba(184,157,94,0.14),rgba(184,157,94,0.05))] p-6 shadow-[0_24px_80px_-45px_rgba(184,157,94,0.55)]">
              <p className="text-sm font-medium text-gray-700">
                <span className="text-[#B89D5E]">
                  {locale === "sq" ? "Tip:" : locale === "de" ? "Tipp:" : "Tip:"}
                </span>{" "}
                {locale === "sq"
                  ? "Nëse ke link të website-it aktual ose IG/TikTok, shkruaje te mesazhi. Na ndihmon për audit."
                  : locale === "de"
                  ? "Wenn Sie einen Link zu Ihrer aktuellen Website oder IG/TikTok haben, schreiben Sie ihn in die Nachricht. Hilft uns beim Audit."
                  : "If you have a link to your current website or IG/TikTok, add it to the message. It helps us with the audit."}
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#111827]/10 bg-[#111827] p-6 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.65)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d1b780]">
                {locale === "sq" ? "Snapshot" : locale === "de" ? "Snapshot" : "Snapshot"}
              </p>
              <div className="mt-4 space-y-4 text-sm text-white/78">
                <div className="flex items-start justify-between gap-4">
                  <span>{locale === "sq" ? "Shërbimi" : locale === "de" ? "Service" : "Service"}</span>
                  <span className="text-right font-medium text-white">{selectedService?.title ?? (locale === "sq" ? "Jo i zgjedhur" : locale === "de" ? "Nicht gewählt" : "Not selected")}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span>{locale === "sq" ? "Buxheti" : locale === "de" ? "Budget" : "Budget"}</span>
                  <span className="text-right font-medium text-white">{formData.budget || "—"}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span>{locale === "sq" ? "Statusi" : locale === "de" ? "Status" : "Status"}</span>
                  <span className="text-right font-medium text-white">
                    {status === "loading"
                      ? locale === "sq"
                        ? "Duke dërguar"
                        : locale === "de"
                        ? "Wird gesendet"
                        : "Sending"
                      : status === "error"
                      ? locale === "sq"
                        ? "Kërkon vëmendje"
                        : locale === "de"
                        ? "Benötigt Aufmerksamkeit"
                        : "Needs attention"
                      : locale === "sq"
                      ? "Në progres"
                      : locale === "de"
                      ? "In Bearbeitung"
                      : "In progress"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <div className="h-10" />
    </>
  );
}

/* ----------------- helpers (must be in same file or imported) ----------------- */

function ControlledField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  pattern,
  minLength,
  maxLength,
  locale = "sq",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  locale?: string;
}) {
  const isRequired = required || label.includes("*");
  
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={isRequired}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        className="h-12 rounded-2xl border border-stone-200 bg-stone-50/50 px-4 text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-[#B89D5E] focus:bg-white focus:ring-4 focus:ring-[#B89D5E]/10 invalid:border-red-400/60"
        title={pattern && name === "name" ? (locale === "sq" ? "Vetëm shkronja dhe hapësira" : locale === "de" ? "Nur Buchstaben und Leerzeichen" : "Only letters and spaces") : undefined}
      />
    </label>
  );
}

function ControlledTextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  minLength,
  maxLength = 4000,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}) {
  const isRequired = required || label.includes("*");
  
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={isRequired}
        minLength={minLength}
        maxLength={maxLength}
        className="rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-[#B89D5E] focus:bg-white focus:ring-4 focus:ring-[#B89D5E]/10 invalid:border-red-400/60"
      />
    </label>
  );
}

function ControlledSelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  locale = "sq",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  locale?: string;
}) {
  const [open, setOpen] = useState(false);
  const isRequired = required || label.includes("*");
  const placeholder = isRequired ? (locale === "sq" ? "Zgjidh..." : locale === "de" ? "Wählen..." : "Select...") : label;

  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="relative">
        <input type="hidden" name={name} value={value} required={isRequired} />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="flex h-12 w-full items-center justify-between rounded-2xl border border-stone-200 bg-stone-50/50 px-4 text-left text-stone-900 outline-none transition focus:border-[#B89D5E] focus:bg-white focus:ring-4 focus:ring-[#B89D5E]/10"
        >
          <span className={value ? "" : "text-gray-500"}>{value || placeholder}</span>
          <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-xl">
            {options.map((o) => (
              <button
                key={o}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(o);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  value === o ? "bg-gray-900 text-white" : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    </label>
  );
}

function ServiceSelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  locale = "sq",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string }>;
  required?: boolean;
  locale?: string;
}) {
  const [open, setOpen] = useState(false);
  const isRequired = required || label.includes("*");
  const placeholder = isRequired ? (locale === "sq" ? "Zgjidh..." : locale === "de" ? "Wahlen..." : "Select...") : label;
  const selectedOption = options.find((option) => option.value === value);

  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="relative">
        <input type="hidden" name={name} value={value} required={isRequired} />
        <button
          type="button"
          onClick={() => setOpen((openState) => !openState)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="flex min-h-14 w-full items-center justify-between rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-left text-stone-900 outline-none transition focus:border-[#B89D5E] focus:bg-white focus:ring-4 focus:ring-[#B89D5E]/10"
        >
          <div className="min-w-0">
            <div className={selectedOption ? "font-medium text-gray-900" : "text-gray-500"}>
              {selectedOption ? selectedOption.label : placeholder}
            </div>
            {selectedOption?.description ? (
              <div className="mt-1 text-xs text-gray-500">{selectedOption.description}</div>
            ) : null}
          </div>
          <svg className={`ml-3 h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-72 overflow-auto rounded-2xl border border-stone-200 bg-white py-1 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)]">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full px-4 py-3 text-left transition-colors ${
                  value === option.value ? "bg-gray-900 text-white" : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <div className="font-medium">{option.label}</div>
                {option.description ? (
                  <div className={`mt-1 text-xs ${value === option.value ? "text-white/80" : "text-gray-500"}`}>
                    {option.description}
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        )}
      </div>
    </label>
  );
}

function MultiServiceSelectField({
  label,
  values,
  onToggle,
  options,
  required = false,
  locale = "sq",
}: {
  label: string;
  values: string[];
  onToggle: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string }>;
  required?: boolean;
  locale?: string;
}) {
  const isRequired = required || label.includes("*");
  const selectedLabels = options.filter((option) => values.includes(option.value)).map((option) => option.label);

  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="rounded-[1.6rem] border border-stone-200 bg-stone-50/60 p-3">
        <input type="hidden" name="service" value={values.join(",")} required={isRequired} />
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedLabels.length ? selectedLabels.map((item) => (
            <span key={item} className="inline-flex items-center rounded-full bg-[#111827] px-3 py-1.5 text-xs font-medium text-white">
              {item}
            </span>
          )) : (
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs text-stone-500 ring-1 ring-stone-200">
              {locale === "sq" ? "Zgjidh një ose më shumë shërbime" : locale === "de" ? "Wählen Sie einen oder mehrere Services" : "Choose one or more services"}
            </span>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {options.map((option) => {
            const isSelected = values.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onToggle(option.value)}
                className={`rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? "border-[#B89D5E]/55 bg-[#111827] text-white shadow-[0_18px_36px_-24px_rgba(15,23,42,0.65)]"
                    : "border-stone-200 bg-white text-stone-900 hover:border-[#B89D5E]/40 hover:bg-stone-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description ? (
                      <div className={`mt-1 text-xs ${isSelected ? "text-white/75" : "text-stone-500"}`}>
                        {option.description}
                      </div>
                    ) : null}
                  </div>
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                    isSelected ? "border-[#d1b780]/40 bg-[#d1b780]/15 text-[#f3dfb5]" : "border-stone-300 text-stone-400"
                  }`}>
                    {isSelected ? "OK" : "+"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-stone-500">
          {locale === "sq" ? "Nëse zgjedh më shumë se një shërbim, detajet do t'i diskutojmë më pas." : locale === "de" ? "Wenn Sie mehr als einen Service wählen, besprechen wir die Details später." : "If you select more than one service, we’ll discuss the details later."}
        </p>
      </div>
    </label>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-3 last:border-0 last:pb-0">
      <span className="text-stone-500">{label}:</span>
      <span className="text-right font-medium text-stone-900">{value}</span>
    </div>
  );
}

function InfoRow({ k, v, href, className = "" }: { k: string; v: string; href?: string; className?: string }) {
  return (
    <div className={`flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-stone-50/70 px-4 py-3 ${className}`}>
      <span className="shrink-0 whitespace-nowrap text-stone-500">{k}</span>
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="truncate whitespace-nowrap text-right font-medium text-stone-900 hover:text-stone-700">
          {v}
        </a>
      ) : (
        <span className="truncate whitespace-nowrap font-medium text-stone-900">{v}</span>
      )}
    </div>
  );
}

