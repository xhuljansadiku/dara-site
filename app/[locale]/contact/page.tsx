// app/[locale]/contact/page.tsx
"use client";

import { useState } from "react";
import NewsletterForm from "@/components/NewsletterForm";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      budget: String(fd.get("budget") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      hp: String(fd.get("hp") ?? "").trim(), // honeypot
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setError("Plotëso emrin, email-in dhe mesazhin.");
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
        setError(data?.error ? String(data.error) : "Diçka shkoi keq. Provo prap.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Provo prap.");
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
              <h2 className="text-xl font-semibold">Kërko ofertë</h2>
              <p className="mt-2 text-sm text-white/60">
                Plotëso detajet — 1–2 min. (E-maili përdoret vetëm për kontakt.)
              </p>

              <form onSubmit={onLeadSubmit} className="mt-6 grid gap-4">
                {/* honeypot */}
                <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Emri*" name="name" placeholder="Xhuljan" />
                  <Field label="Email*" name="email" placeholder="you@business.com" type="email" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Biznesi" name="company" placeholder="DARA" />
                  <SelectField
                    label="Buxheti"
                    name="budget"
                    options={["Nuk jam i sigurt", "€300–€700", "€700–€1500", "€1500+"]}
                  />
                </div>

                <TextArea
                  label="Çfarë do të arrijmë?*"
                  name="message"
                  placeholder="P.sh. 30 lead/muaj, rritje shitjesh, website i ri, e-commerce..."
                  rows={5}
                />

                {status === "error" && (
                  <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error ?? "Diçka shkoi keq."}
                  </p>
                )}

                {status === "success" && (
                  <p className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-200">
                    U dërgua! Do të kontaktojmë së shpejti.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 disabled:opacity-60"
                >
                  {status === "loading" ? "Duke dërguar..." : "Dërgo"}
                </button>

                <p className="text-xs text-white/50">
                  Duke dërguar, pranon të të kontaktojmë për këtë kërkesë.
                </p>
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
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    className="text-sm text-[#c8a55c] hover:underline"
                    href="https://instagram.com/daramarketing.eu"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                  <span className="text-white/30">|</span>
                  <a
                    className="text-sm text-[#c8a55c] hover:underline"
                    href="https://facebook.com/daramarketing.eu"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                  <span className="text-white/30">|</span>
                  <a
                    className="text-sm text-[#c8a55c] hover:underline"
                    href="https://linkedin.com/company/daramarketing"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
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

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-white/70">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-11 rounded-xl border border-white/15 bg-black/40 px-4 text-white placeholder:text-white/40 outline-none focus:border-yellow-400/40"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-white/70">{label}</span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-yellow-400/40"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-white/70">{label}</span>
      <select
        name={name}
        className="h-11 rounded-xl border border-white/15 bg-black/40 px-4 text-white outline-none focus:border-yellow-400/40"
        defaultValue={options[0]}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
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
