"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/services-data";

type FaqItem = { q: string; a: string };

const FAQ_BY_LOCALE: Record<Locale, FaqItem[]> = {
  sq: [
    { q: "Sa kohë duhet për të filluar?", a: "Pas kërkesës sënde, kontaktojmë brenda 24 orëve. Fillimi varet nga lloji i projektit — disa projekte nisin brenda 1–2 javëve." },
    { q: "Si paguhet?", a: "Oferta përfshin çmimin dhe kushtet e pagesës. Zakonisht kërkohet një depozitë fillestare, pjesa tjetër pas përfundimit ose sipas fazeve." },
    { q: "A punoni me biznese jashtë Shqipërisë?", a: "Po. Punojmë me klientë në Shqipëri, Gjermani, UK dhe më gjerë. Komunikojmë në shqip, anglisht dhe gjermanisht." },
    { q: "Çfarë ndryshon DARA nga agjencitë e tjera?", a: "Fokusohemi në strategji të qarta, rezultate të matshme dhe përmbajtje që reflekton identitetin e brand-it. Punojmë me ekip të vogël, të fokusuar dhe me përvojë." },
    { q: "A ofroni konsultime të shkurtra?", a: "Po. Ofrojmë sesione konsulencë 1-on-1 (60–90 min) për të qartësuar drejtimin e marketingut pa angazhim afatgjatë." },
  ],
  en: [
    { q: "How long until we can start?", a: "After your request, we respond within 24 hours. Start date depends on the project type — some projects begin within 1–2 weeks." },
    { q: "How is payment handled?", a: "The quote includes price and payment terms. Usually an initial deposit is required, the rest upon completion or by phase." },
    { q: "Do you work with businesses outside Albania?", a: "Yes. We work with clients in Albania, Germany, UK and beyond. We communicate in Albanian, English and German." },
    { q: "What makes DARA different from other agencies?", a: "We focus on clear strategy, measurable results and content that reflects your brand identity. We work with a small, focused, experienced team." },
    { q: "Do you offer short consulting sessions?", a: "Yes. We offer 1-on-1 consulting sessions (60–90 min) to clarify your marketing direction without long-term commitment." },
  ],
  de: [
    { q: "Wie lange dauert es bis zum Start?", a: "Nach Ihrer Anfrage melden wir uns innerhalb von 24 Stunden. Der Starttermin hängt vom Projekttyp ab — manche Projekte beginnen innerhalb von 1–2 Wochen." },
    { q: "Wie funktioniert die Zahlung?", a: "Das Angebot enthält Preis und Zahlungsbedingungen. Üblicherweise wird eine Anzahlung verlangt, der Rest bei Fertigstellung oder nach Phasen." },
    { q: "Arbeiten Sie mit Unternehmen außerhalb Albaniens?", a: "Ja. Wir arbeiten mit Kunden in Albanien, Deutschland, UK und darüber hinaus. Wir kommunizieren auf Albanisch, Englisch und Deutsch." },
    { q: "Was unterscheidet DARA von anderen Agenturen?", a: "Wir konzentrieren uns auf klare Strategie, messbare Ergebnisse und Content, der Ihre Markenidentität widerspiegelt. Wir arbeiten mit einem kleinen, fokussierten, erfahrenen Team." },
    { q: "Bieten Sie kurze Beratungssitzungen an?", a: "Ja. Wir bieten 1-zu-1-Beratungssitzungen (60–90 Min.) zur Klärung Ihrer Marketing-Richtung ohne langfristige Bindung." },
  ],
};

export default function FaqPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "sq";
  const faqs = FAQ_BY_LOCALE[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const title = locale === "sq" ? "Pyetje të shpeshta" : locale === "de" ? "Häufige Fragen" : "Frequently asked questions";
  const subtitle = locale === "sq"
    ? "Përgjigje të shpejta për pyetjet më të bëra."
    : locale === "de"
    ? "Schnelle Antworten auf die häufigsten Fragen."
    : "Quick answers to the most common questions.";

  return (
    <section className="py-14 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">FAQ</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-xl text-white/70">{subtitle}</p>

      <div className="mt-10 space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-white/5"
            >
              <span className="font-medium text-white">{faq.q}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-[#c8a55c] transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="border-t border-white/10 px-6 py-4 text-white/70">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
