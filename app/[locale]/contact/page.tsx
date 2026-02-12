// app/[locale]/contact/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import NewsletterForm from "@/components/NewsletterForm";
import { SERVICE_SLUGS, SERVICE_DETAILS_BY_LOCALE, type Locale } from "@/lib/services-data";

type Status = "idle" | "loading" | "success" | "error";
type Step = 1 | 2 | 3 | 4 | 5 | 6;

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "sq";
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    name: "",
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

  const handleInputChange = (name: string, value: string) => {
    // For name field, only allow letters and spaces (no numbers or special characters)
    if (name === "name") {
      // Allow only letters (including Albanian characters like ë, ç, etc.) and spaces
      const filteredValue = value.replace(/[^a-zA-ZëçÇË\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: filteredValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
    }
    if (currentStep === 2) {
      if (!formData.service) {
        setError(locale === "sq" ? "Zgjidh një shërbim." : locale === "de" ? "Bitte wählen Sie einen Service." : "Please select a service.");
        return;
      }
    }
    setError(null);
    setIsNavigating(true);
    // Only increment by 1 step at a time
    if (currentStep < 6) {
      const nextStep = (currentStep + 1) as Step;
      setCurrentStep(nextStep);
      // Reset navigation flag after a short delay
      setTimeout(() => setIsNavigating(false), 300);
    } else {
      setIsNavigating(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
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
    
    setStatus("loading");
    setError(null);

    // Build message from form data
    let messageParts: string[] = [];
    
    if (formData.service) {
      const serviceIndex = SERVICE_SLUGS.indexOf(formData.service as any);
      const serviceTitle = SERVICE_DETAILS_BY_LOCALE[locale]?.[serviceIndex]?.title || formData.service;
      messageParts.push(`${locale === "sq" ? "Shërbimi" : locale === "de" ? "Service" : "Service"}: ${serviceTitle}`);
    }

    if (formData.service === "website-landing") {
      if (formData.websiteType) messageParts.push(`${locale === "sq" ? "Lloji" : locale === "de" ? "Typ" : "Type"}: ${formData.websiteType}`);
      if (formData.websitePages) messageParts.push(`${locale === "sq" ? "Numri i faqeve" : locale === "de" ? "Anzahl Seiten" : "Number of pages"}: ${formData.websitePages}`);
      if (formData.websiteSEO) messageParts.push(`SEO: ${formData.websiteSEO}`);
      if (formData.websiteFeatures) messageParts.push(`${locale === "sq" ? "Funksione" : locale === "de" ? "Funktionen" : "Features"}: ${formData.websiteFeatures}`);
    }

    if (formData.service === "ecommerce") {
      if (formData.ecommerceProducts) messageParts.push(`${locale === "sq" ? "Numri i produkteve" : locale === "de" ? "Anzahl Produkte" : "Number of products"}: ${formData.ecommerceProducts}`);
      if (formData.ecommercePayment) messageParts.push(`${locale === "sq" ? "Pagesa" : locale === "de" ? "Zahlung" : "Payment"}: ${formData.ecommercePayment}`);
      if (formData.ecommerceShipping) messageParts.push(`${locale === "sq" ? "Transport" : locale === "de" ? "Versand" : "Shipping"}: ${formData.ecommerceShipping}`);
    }

    if (formData.service === "social-media") {
      if (formData.socialMediaPlatforms) messageParts.push(`${locale === "sq" ? "Platforma" : locale === "de" ? "Plattformen" : "Platforms"}: ${formData.socialMediaPlatforms}`);
      if (formData.socialMediaFrequency) messageParts.push(`${locale === "sq" ? "Frekuenca" : locale === "de" ? "Häufigkeit" : "Frequency"}: ${formData.socialMediaFrequency}`);
    }

    if (formData.service && formData.service !== "website-landing" && formData.service !== "ecommerce" && formData.service !== "social-media") {
      if (formData.otherServiceDetails) {
        messageParts.push(`${locale === "sq" ? "Detaje" : locale === "de" ? "Details" : "Details"}: ${formData.otherServiceDetails}`);
      }
    }

    if (formData.budget) messageParts.push(`${locale === "sq" ? "Buxheti" : locale === "de" ? "Budget" : "Budget"}: ${formData.budget}`);
    if (formData.message) messageParts.push(`${locale === "sq" ? "Mesazh shtesë" : locale === "de" ? "Zusätzliche Nachricht" : "Additional message"}: ${formData.message}`);

    const fullMessage = messageParts.join("\n");

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      budget: formData.budget.trim(),
      message: fullMessage || formData.message.trim(),
      hp: "", // honeypot
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
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setError(data?.error ? String(data.error) : locale === "sq" ? "Diçka shkoi keq. Provo prap." : locale === "de" ? "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut." : "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setCurrentStep(6);
    } catch {
      setStatus("error");
      setError(locale === "sq" ? "Network error. Provo prap." : locale === "de" ? "Netzwerkfehler. Bitte versuchen Sie es erneut." : "Network error. Please try again.");
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Le të flasim për <span className="text-yellow-400">rritjen</span> tënde
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          Dërgo një mesazh dhe kthehemi me një plan të shkurtër: çfarë bëjmë, sa zgjat dhe çfarë
          rezultati synojmë.
        </p>
      </section>

      {/* GRID */}
      <section className="py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-5">
          {/* LEFT: Form */}
          <div className="md:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="text-xl font-semibold">
                {locale === "sq" ? "Kërko ofertë" : locale === "de" ? "Angebot anfragen" : "Request quote"}
              </h2>
              <p className="mt-2 text-sm text-white/60">
                {locale === "sq" 
                  ? "Plotëso detajet — 1–2 min. (E-maili përdoret vetëm për kontakt.)"
                  : locale === "de"
                  ? "Füllen Sie die Details aus — 1–2 Min. (E-Mail wird nur für Kontakt verwendet.)"
                  : "Fill in the details — 1–2 min. (Email is used for contact only.)"}
              </p>

              {/* Step Indicator */}
              <div className="mt-6 flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className={`h-2 flex-1 rounded-full transition ${
                        currentStep >= step ? "bg-[#c8a55c]" : "bg-white/10"
                      }`}
                    />
                    {step < 6 && (
                      <div className={`h-2 w-2 rounded-full transition ${
                        currentStep > step ? "bg-[#c8a55c]" : "bg-white/10"
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={onLeadSubmit} className="mt-6" onKeyDown={(e) => {
                // Prevent form submission on Enter key unless we're on step 5
                if (e.key === "Enter" && currentStep !== 5) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}>
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
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
                  <div className="grid gap-4">
                    <label className="grid gap-2">
                      <span className="text-sm text-white/70">
                        {locale === "sq" ? "Zgjidh shërbimin*" : locale === "de" ? "Service wählen*" : "Select service*"}
                      </span>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {SERVICE_SLUGS.map((slug) => {
                          const serviceIndex = SERVICE_SLUGS.indexOf(slug);
                          const service = SERVICE_DETAILS_BY_LOCALE[locale]?.[serviceIndex];
                          if (!service) return null;
                          return (
                            <button
                              key={slug}
                              type="button"
                              onClick={() => handleInputChange("service", slug)}
                              className={`rounded-xl border p-4 text-left transition ${
                                formData.service === slug
                                  ? "border-[#c8a55c] bg-[#c8a55c]/10"
                                  : "border-white/15 bg-black/40 hover:border-white/25"
                              }`}
                            >
                              <div className="font-medium text-white">{service.title}</div>
                              {service.price && (
                                <div className="mt-1 text-xs text-[#c8a55c]">{service.price}</div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </label>
                  </div>
                )}

                {/* Step 3: Conditional Fields */}
                {currentStep === 3 && (
                  <div className="grid gap-4">
                    {!formData.service && (
                      <p className="text-sm text-white/60">
                        {locale === "sq" ? "Ju lutem zgjidhni një shërbim në hapin e mëparshëm." : locale === "de" ? "Bitte wählen Sie einen Service im vorherigen Schritt." : "Please select a service in the previous step."}
                      </p>
                    )}
                    {formData.service === "website-landing" && (
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

                    {formData.service === "ecommerce" && (
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

                    {formData.service === "social-media" && (
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

                    {formData.service && formData.service !== "website-landing" && formData.service !== "ecommerce" && formData.service !== "social-media" && (
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
                      options={
                        locale === "sq"
                          ? ["Nuk jam i sigurt", "€300–€700", "€700–€1500", "€1500+"]
                          : locale === "de"
                          ? ["Nicht sicher", "€300–€700", "€700–€1500", "€1500+"]
                          : ["Not sure", "€300–€700", "€700–€1500", "€1500+"]
                      }
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
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <h3 className="mb-4 text-lg font-semibold text-white">
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
                        {formData.service && (
                          <ReviewRow
                            label={locale === "sq" ? "Shërbimi" : locale === "de" ? "Service" : "Service"}
                            value={SERVICE_DETAILS_BY_LOCALE[locale]?.[SERVICE_SLUGS.indexOf(formData.service as any)]?.title || formData.service}
                          />
                        )}
                        {formData.service === "website-landing" && (
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
                        {formData.service === "ecommerce" && (
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
                        {formData.service === "social-media" && (
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
                        {formData.service && formData.service !== "website-landing" && formData.service !== "ecommerce" && formData.service !== "social-media" && formData.otherServiceDetails && (
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
                    <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-4">
                      <p className="text-sm text-white/80">
                        {locale === "sq"
                          ? "Ju lutem kontrolloni të gjitha të dhënat para dërgimit. Pas dërgimit, do të kontaktojmë së shpejti."
                          : locale === "de"
                          ? "Bitte überprüfen Sie alle Daten vor dem Senden. Nach dem Senden werden wir uns bald melden."
                          : "Please review all data before sending. After sending, we'll contact you soon."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 6: Success */}
                {currentStep === 6 && status === "success" && (
                  <div className="text-center py-8">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 mb-4">
                      <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {locale === "sq" ? "U dërgua!" : locale === "de" ? "Gesendet!" : "Sent!"}
                    </h3>
                    <p className="text-white/70">
                      {locale === "sq" ? "Do të kontaktojmë së shpejti." : locale === "de" ? "Wir werden uns bald melden." : "We'll contact you soon."}
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error ?? (locale === "sq" ? "Diçka shkoi keq." : locale === "de" ? "Etwas ist schief gelaufen." : "Something went wrong.")}
                  </p>
                )}

                {/* Navigation Buttons */}
                {currentStep < 6 && status !== "success" && (
                  <div className="mt-6 flex items-center gap-3">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 font-medium text-white hover:bg-white/10"
                      >
                        {locale === "sq" ? "Kthehu" : locale === "de" ? "Zurück" : "Back"}
                      </button>
                    )}
                    {currentStep === 1 || currentStep === 2 || currentStep === 3 ? (
                      <button
                        type="button"
                        onClick={(e) => handleNext(e)}
                        className="ml-auto inline-flex h-11 items-center justify-center rounded-xl bg-[#c8a55c] px-5 font-medium text-black hover:bg-[#b6944f]"
                      >
                        {locale === "sq" ? "Vazhdo" : locale === "de" ? "Weiter" : "Next"}
                      </button>
                    ) : currentStep === 4 ? (
                      <button
                        type="button"
                        onClick={(e) => handleNext(e)}
                        className="ml-auto inline-flex h-11 items-center justify-center rounded-xl bg-[#c8a55c] px-5 font-medium text-black hover:bg-[#b6944f]"
                      >
                        {locale === "sq" ? "Kontrollo" : locale === "de" ? "Überprüfen" : "Review"}
                      </button>
                    ) : currentStep === 5 ? (
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="ml-auto inline-flex h-11 items-center justify-center rounded-xl bg-[#c8a55c] px-5 font-medium text-black hover:bg-[#b6944f] disabled:opacity-60"
                      >
                        {status === "loading"
                          ? locale === "sq" ? "Duke dërguar..." : locale === "de" ? "Wird gesendet..." : "Sending..."
                          : locale === "sq" ? "Dërgo" : locale === "de" ? "Senden" : "Send"}
                      </button>
                    ) : null}
                  </div>
                )}

                {currentStep < 6 && (
                  <p className="mt-4 text-xs text-white/50">
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
          <div className="md:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="text-lg font-semibold">Quick info</h3>

              <div className="mt-5 grid gap-3 text-sm">
                <InfoRow
                  k="Email"
                  v="daramarketing.eu@gmail.com"
                  href="mailto:daramarketing.eu@gmail.com"
                />
                <InfoRow k="Phone" v="+355 68 800 9988" href="tel:+355688009988" />
                <InfoRow
                  k="Address"
                  v="Rruga Donika Kastrioti, Bllok, Tirane, Albania"
                  href="https://maps.google.com/?q=Rruga+Donika+Kastrioti,+Bllok,+Tirane,+Albania"
                />
                <InfoRow k="Response" v="Within 24h" />
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-white/80">Social</p>
                <div className="mt-2 flex items-center gap-3">
                  <a
                    className="text-white/70 hover:text-[#c8a55c] transition"
                    href="https://instagram.com/daramarketing.eu"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    className="text-white/70 hover:text-[#c8a55c] transition"
                    href="https://facebook.com/daramarketing.eu"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    className="text-white/70 hover:text-[#c8a55c] transition"
                    href="https://linkedin.com/company/daramarketing"
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

              <div className="mt-6 h-px w-full bg-white/10" />

              <h4 className="mt-6 text-sm font-semibold text-white/80">Preferon newsletter?</h4>
              <p className="mt-2 text-sm text-white/60">Merr tips javore për content, growth dhe ads.</p>

              <div className="mt-4">
                <NewsletterForm />
              </div>

              <p className="mt-3 text-xs text-white/50">No spam. Unsubscribe anytime.</p>
            </div>

            <div className="mt-6 rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6">
              <p className="text-sm text-white/70">
                <span className="text-yellow-400">Tip:</span> Nëse ke link të website-it aktual ose
                IG/TikTok, shkruaje te mesazhi — na ndihmon për audit.
              </p>
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
      <span className="text-sm text-white/70">{label}</span>
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
        className="h-11 rounded-xl border border-white/15 bg-black/40 px-4 text-white placeholder:text-white/40 outline-none focus:border-[#c8a55c]/40 invalid:border-red-500/50"
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
      <span className="text-sm text-white/70">{label}</span>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={isRequired}
        minLength={minLength}
        maxLength={maxLength}
        className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#c8a55c]/40 invalid:border-red-500/50"
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
  const isRequired = required || label.includes("*");
  
  return (
    <label className="grid gap-2">
      <span className="text-sm text-white/70">{label}</span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
        className="h-11 rounded-xl border border-white/15 bg-black/40 px-4 text-white outline-none focus:border-[#c8a55c]/40 invalid:border-red-500/50"
      >
        <option value="">{isRequired ? (locale === "sq" ? "Zgjidh..." : locale === "de" ? "Wählen..." : "Select...") : label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <span className="text-white/60">{label}:</span>
      <span className="text-right text-white">{value}</span>
    </div>
  );
}

function InfoRow({ k, v, href }: { k: string; v: string; href?: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
      <span className="text-white/60">{k}</span>
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="text-right text-white hover:text-[#c8a55c]">
          {v}
        </a>
      ) : (
        <span className="text-white">{v}</span>
      )}
    </div>
  );
}
