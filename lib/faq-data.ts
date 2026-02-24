import type { Locale } from "@/lib/services-data";

export type FaqItem = { q: string; a: string };

export const FAQ_BY_LOCALE: Record<Locale, FaqItem[]> = {
  sq: [
    { q: "Sa kohë duhet për të filluar?", a: "Pas kërkesës sënde, kontaktojmë brenda 24 orëve. Fillimi varet nga lloji i projektit , disa projekte nisin brenda 1–2 javëve." },
    { q: "Si paguhet?", a: "Oferta përfshin çmimin dhe kushtet e pagesës. Zakonisht kërkohet një depozitë fillestare, pjesa tjetër pas përfundimit ose sipas fazeve." },
    { q: "A punoni me biznese jashtë Shqipërisë?", a: "Po. Punojmë me klientë në Shqipëri, Gjermani, UK dhe më gjerë. Komunikojmë në shqip, anglisht dhe gjermanisht." },
    { q: "Çfarë ndryshon DARA nga agjencitë e tjera?", a: "Fokusohemi në strategji të qarta, rezultate të matshme dhe përmbajtje që reflekton identitetin e brand-it. Punojmë me ekip të vogël, të fokusuar dhe me përvojë." },
    { q: "A ofroni konsultime të shkurtra?", a: "Po. Ofrojmë sesione konsulencë 1-on-1 (60–90 min) për të qartësuar drejtimin e marketingut pa angazhim afatgjatë." },
    { q: "A mund të ndërtojmë një website ose dyqan online?", a: "Po. Ofrojmë website, faqe uljeje (landing pages) dhe dyqane e-commerce. Çdo projekt fillon me konsultim për të kuptuar nevojat tuaja." },
    { q: "Sa kohë zgjat një projekt tipik?", a: "Varet nga shërbimi: një logo 2–3 javë, website 4–8 javë, strategji marketingu 2–4 javë. Japim afate të qarta në ofertë." },
    { q: "A punoni me biznese të vogla?", a: "Po. Punojmë me startup-e, SME dhe korporata. Kemi paketa për çdo buxhet , nga konsultime të shkurtra deri te angazhime mujore." },
    { q: "Çfarë platformash përdorni për social media?", a: "Punojmë me Instagram, Facebook, LinkedIn, TikTok dhe YouTube , sipas kuadrit të brand-it tuaj dhe audiencës së synuar." },
    { q: "A ofroni trajnime për ekipet?", a: "Po. Ofrojmë trajnime SMM dhe web development , si grupe ashtu edhe 1-on-1. Trajnimet janë praktike dhe të orientuara nga rezultatet." },
  ],
  en: [
    { q: "How long until we can start?", a: "After your request, we respond within 24 hours. Start date depends on the project type , some projects begin within 1–2 weeks." },
    { q: "How is payment handled?", a: "The quote includes price and payment terms. Usually an initial deposit is required, the rest upon completion or by phase." },
    { q: "Do you work with businesses outside Albania?", a: "Yes. We work with clients in Albania, Germany, UK and beyond. We communicate in Albanian, English and German." },
    { q: "What makes DARA different from other agencies?", a: "We focus on clear strategy, measurable results and content that reflects your brand identity. We work with a small, focused, experienced team." },
    { q: "Do you offer short consulting sessions?", a: "Yes. We offer 1-on-1 consulting sessions (60–90 min) to clarify your marketing direction without long-term commitment." },
    { q: "Can you build a website or online store?", a: "Yes. We offer websites, landing pages and e-commerce stores. Every project starts with a consultation to understand your needs." },
    { q: "How long does a typical project take?", a: "Depends on the service: a logo 2–3 weeks, website 4–8 weeks, marketing strategy 2–4 weeks. We give clear timelines in the quote." },
    { q: "Do you work with small businesses?", a: "Yes. We work with startups, SMEs and corporates. We have packages for every budget , from short consultations to monthly retainers." },
    { q: "What platforms do you use for social media?", a: "We work with Instagram, Facebook, LinkedIn, TikTok and YouTube , depending on your brand and target audience." },
    { q: "Do you offer training for teams?", a: "Yes. We offer SMM and web development training , both group and 1-on-1. Training is practical and results-oriented." },
  ],
  de: [
    { q: "Wie lange dauert es bis zum Start?", a: "Nach Ihrer Anfrage melden wir uns innerhalb von 24 Stunden. Der Starttermin hängt vom Projekttyp ab , manche Projekte beginnen innerhalb von 1–2 Wochen." },
    { q: "Wie funktioniert die Zahlung?", a: "Das Angebot enthält Preis und Zahlungsbedingungen. Üblicherweise wird eine Anzahlung verlangt, der Rest bei Fertigstellung oder nach Phasen." },
    { q: "Arbeiten Sie mit Unternehmen außerhalb Albaniens?", a: "Ja. Wir arbeiten mit Kunden in Albanien, Deutschland, UK und darüber hinaus. Wir kommunizieren auf Albanisch, Englisch und Deutsch." },
    { q: "Was unterscheidet DARA von anderen Agenturen?", a: "Wir konzentrieren uns auf klare Strategie, messbare Ergebnisse und Content, der Ihre Markenidentität widerspiegelt. Wir arbeiten mit einem kleinen, fokussierten, erfahrenen Team." },
    { q: "Bieten Sie kurze Beratungssitzungen an?", a: "Ja. Wir bieten 1-zu-1-Beratungssitzungen (60–90 Min.) zur Klärung Ihrer Marketing-Richtung ohne langfristige Bindung." },
    { q: "Können Sie eine Website oder einen Online-Shop erstellen?", a: "Ja. Wir bieten Websites, Landing Pages und E-Commerce-Shops. Jedes Projekt beginnt mit einer Beratung, um Ihre Bedürfnisse zu verstehen." },
    { q: "Wie lange dauert ein typisches Projekt?", a: "Hängt vom Service ab: Logo 2–3 Wochen, Website 4–8 Wochen, Marketingstrategie 2–4 Wochen. Wir geben klare Zeitrahmen im Angebot." },
    { q: "Arbeiten Sie mit kleinen Unternehmen?", a: "Ja. Wir arbeiten mit Startups, KMU und Konzernen. Wir haben Pakete für jedes Budget , von kurzen Beratungen bis zu monatlichen Retainern." },
    { q: "Welche Plattformen nutzen Sie für Social Media?", a: "Wir arbeiten mit Instagram, Facebook, LinkedIn, TikTok und YouTube , je nach Ihrer Marke und Zielgruppe." },
    { q: "Bieten Sie Schulungen für Teams an?", a: "Ja. Wir bieten SMM- und Web-Entwicklungs-Schulungen , sowohl in Gruppen als auch 1-zu-1. Die Schulungen sind praxisnah und ergebnisorientiert." },
  ],
};
