import type { Locale } from "@/lib/services-data";

/** Conversion-focused defaults; service pages can override via `content.faq`. */
export const DEFAULT_SERVICE_FAQ: Record<Locale, { q: string; a: string }[]> = {
  sq: [
    {
      q: "Sa shpejt marr një ofertë?",
      a: "Zakonisht brenda 24–48 orëve pas mesazhit tuaj, me përshkrim të qartë të scope-it dhe çmimit fillestar.",
    },
    {
      q: "A punoni me biznese të vogla?",
      a: "Po, nga startup deri te marka të establisuara. Propozimi përshtatet sipas objektivit dhe buxhetit.",
    },
    {
      q: "Çfarë duhet të përgatis para se të fillojmë?",
      a: "Mjafton një përshkrim të shkurtër të biznesit dhe qëllimit (lead, shitje, brand). Ne e strukturojmë pjesën tjetër në një thirrje fillestare.",
    },
  ],
  en: [
    {
      q: "How fast do I get a quote?",
      a: "Usually within 24–48 hours after your message, with a clear scope outline and a starting price indication.",
    },
    {
      q: "Do you work with small businesses?",
      a: "Yes, from startups to established brands. The proposal is tailored to your goal and budget.",
    },
    {
      q: "What do I need before we start?",
      a: "A short business summary and your goal (leads, sales, brand). We structure the rest on an intro call.",
    },
  ],
  de: [
    {
      q: "Wie schnell erhalte ich ein Angebot?",
      a: "In der Regel innerhalb von 24–48 Stunden nach Ihrer Nachricht, mit klarer Scope-Skizze und Preisrahmen.",
    },
    {
      q: "Arbeitet ihr mit kleinen Unternehmen?",
      a: "Ja, von Startups bis etablierten Marken. Das Angebot wird an Ziel und Budget angepasst.",
    },
    {
      q: "Was brauche ich vor dem Start?",
      a: "Eine kurze Unternehmensbeschreibung und Ihr Ziel (Leads, Verkauf, Marke). Den Rest strukturieren wir im Erstgespräch.",
    },
  ],
};
