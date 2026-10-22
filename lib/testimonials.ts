import type { Locale } from "@/lib/services-data";

export type Testimonial = {
  quote: Record<Locale, string>;
  name: string;
  role: Record<Locale, string>;
  company: string;
  /**
   * Only verified testimonials are rendered. Set to true once the owner confirms the quote is
   * genuine, the client authorised its use, and (for numeric results) the period and metric.
   * None of these companies appear in the portfolio, so they are hidden until confirmed.
   */
  verified: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: {
      sq: "DARA na ndihmoi të strukturojmë rrjetet tona sociale dhe të rrisnim shitjet. Profesionale dhe të fokusuara te rezultatet.",
      en: "DARA helped us structure our social presence and increase sales. Professional and focused on results.",
      de: "DARA hat uns geholfen, unseren Social-Media-Auftritt zu strukturieren und den Umsatz zu steigern. Professionell und ergebnisorientiert.",
    },
    name: "Ana M.",
    role: { sq: "Menaxhere", en: "Manager", de: "Managerin" },
    company: "Don Mare Hotel",
    verified: false,
  },
  {
    quote: {
      sq: "Krijuan website-in tonë nga zero dhe e lansuam brenda 3 javësh. Shpejtësia dhe cilësia ishin mbi pritshmëritë.",
      en: "They built our website from scratch and launched it within 3 weeks. Speed and quality exceeded our expectations.",
      de: "Sie haben unsere Website von Grund auf erstellt und innerhalb von 3 Wochen gelauncht. Geschwindigkeit und Qualität übertrafen unsere Erwartungen.",
    },
    name: "Genci V.",
    role: { sq: "Pronar", en: "Owner", de: "Inhaber" },
    company: "VizionTech",
    verified: false,
  },
  {
    quote: {
      sq: "Pas 2 muajsh bashkëpunim, shitjet tona online u rritën me 38%. Rekomandoj DARA-n pa hezitim.",
      en: "After 2 months of collaboration, our online sales grew by 38%. I recommend DARA without hesitation.",
      de: "Nach 2 Monaten Zusammenarbeit stiegen unsere Online-Verkäufe um 38 %. Ich empfehle DARA ohne Zögern.",
    },
    name: "Blerinda H.",
    role: { sq: "Drejtoreshë", en: "Director", de: "Direktorin" },
    company: "Estetika Blerinda",
    verified: false,
  },
];

export function getVerifiedTestimonials(locale: Locale) {
  return TESTIMONIALS.filter((t) => t.verified).map((t) => ({
    quote: t.quote[locale],
    name: t.name,
    role: t.role[locale],
    company: t.company,
  }));
}
