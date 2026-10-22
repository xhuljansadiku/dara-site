import type { Locale } from "@/lib/services-data";
import type { ServiceSlug } from "@/lib/services-data";
import type { ServicePageContent } from "@/lib/services-page-content";

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

const SERVICE_FAQ_TEMPLATES: Record<
  Locale,
  { cost: (title: string) => string; included: (title: string) => string; noPrice: string; adSpend: { q: string; a: string } }
> = {
  sq: {
    cost: (title) => `Sa kushton shërbimi “${title}”?`,
    included: (title) => `Çfarë përfshin “${title}”?`,
    noPrice: "Çmimi jepet sipas nevojës, pas një bisede të shkurtër për qëllimin dhe volumin e punës.",
    adSpend: {
      q: "A përfshihet buxheti i reklamave në çmim?",
      a: "Jo. Tarifa e menaxhimit nuk përfshin buxhetin që paguhet te Meta ose Google. Buxhetin e vendosni ju.",
    },
  },
  en: {
    cost: (title) => `How much does ${title} cost?`,
    included: (title) => `What is included in ${title}?`,
    noPrice: "Pricing is quoted per project, after a short conversation about your goal and the volume of work.",
    adSpend: {
      q: "Is ad spend included in the price?",
      a: "No. The management fee does not include the budget paid to Meta or Google. You set that budget.",
    },
  },
  de: {
    cost: (title) => `Was kostet ${title}?`,
    included: (title) => `Was ist bei ${title} enthalten?`,
    noPrice: "Der Preis wird pro Projekt nach einem kurzen Gespräch über Ziel und Umfang angeboten.",
    adSpend: {
      q: "Ist das Werbebudget im Preis enthalten?",
      a: "Nein. Die Management-Gebühr enthält nicht das Budget, das an Meta oder Google gezahlt wird. Dieses Budget legen Sie fest.",
    },
  },
};

/**
 * Service-specific FAQ built only from facts already on the page (price, price note, inclusions),
 * followed by the general questions. Used for both the visible FAQ and its JSON-LD.
 */
export function getServiceFaq(
  locale: Locale,
  slug: ServiceSlug,
  title: string,
  price: string | undefined,
  content: ServicePageContent
): { q: string; a: string }[] {
  if (content.faq?.length) return content.faq;
  const t = SERVICE_FAQ_TEMPLATES[locale];
  const priceNote = content.priceNote?.replace(/\s*[;\n]\s*/g, ". ").replace(/\.\.\s*/g, ". ").trim();
  const costAnswer = [price, priceNote].filter(Boolean).join(". ").replace(/\.\./g, ".") || t.noPrice;
  return [
    { q: t.cost(title), a: costAnswer },
    { q: t.included(title), a: `${content.whatIncluded.join("; ")}.` },
    ...(slug === "ads" ? [t.adSpend] : []),
    ...DEFAULT_SERVICE_FAQ[locale],
  ];
}
