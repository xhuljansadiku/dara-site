// lib/projects.ts – Projects data and filter config for Work section

export type Locale = "sq" | "en" | "de";

export type ProjectCategory = "social-media" | "brand" | "website";

export type Project = { title: string; tag: string; desc: string; category: ProjectCategory };

const projectsSq: Project[] = [
  { title: "Don Mare Hotel & Restaurant", tag: "Social Media", desc: "Hotel dhe restorant komod në Dhërmi. Ndërtuam prezencën në rrjetet sociale për të tërhequr klientë të rinj.", category: "social-media" },
  { title: "355 Black", tag: "Social Media", desc: "Dyqan telefoni dhe aksesorësh në Tiranë. Rritëm prezencën në rrjete sociale dhe angazhimin e audiencës.", category: "social-media" },
  { title: "Aia Hotel & Apartments", tag: "Social Media", desc: "Hotel & apartamente në Tiranë. Forcuam prezencën e tyre digjitale për më shumë rezervime.", category: "social-media" },
  { title: "Zorada", tag: "Social Media", desc: "Brand bizhuterish premium. Krijuam përmbajtje që thekson elegancën dhe ekskluzivitetin.", category: "social-media" },
  { title: "City Fitness Club", tag: "Social Media", desc: "Palestër në Tiranë. Ndërtuam sistem përmbajtjeje që angazhon dhe sjell anëtarë të rinj.", category: "social-media" },
  { title: "Cara Dental Clinic", tag: "Social Media", desc: "Klinikë dentare në Tiranë. Ndihmuam në rritjen e besueshmërisë dhe kërkesave të pacientëve online.", category: "social-media" },
  { title: "Premium International Real Estate", tag: "Social Media", desc: "Agjenci për prona luksoze. Krijuam prezencë që flet me klientët me vlerë të lartë.", category: "social-media" },
  { title: "Nova Real Estate", tag: "Social Media", desc: "Agjenci imobiliare. Përmirësuam komunikimin vizual dhe gjenerimin e lead‑eve.", category: "social-media" },
  { title: "Icon Store", tag: "Social Media", desc: "Dyqan mode & aksesorësh. Rritëm reach dhe shitjet përmes përmbajtjes kreative.", category: "social-media" },
  { title: "DD Store", tag: "Social Media", desc: "Veshje për gra. Optimizuam komunikimin vizual për audiencën femërore.", category: "social-media" },
  { title: "KOA Consulting", tag: "Social Media & Logo", desc: "Kompani konsulence financiare. Krijuam identitet vizual dhe komunikim profesional.", category: "social-media" },
  { title: "Endis Store", tag: "Brand Identity", desc: "Dyqan me produkte premium. Ndërtuam identitet të fortë brand‑i dhe prezencë online.", category: "brand" },
  { title: "Taxi Service Dhermi", tag: "Web Design", desc: "Shërbim taksie në Dhërmi. Krijuam website të thjeshtë dhe miqësor për rezervime online.", category: "website" },
];

const projectsEn: Project[] = [
  { title: "Don Mare Hotel & Restaurant", tag: "Social Media", desc: "A cosy hotel and restaurant in Dhermi. We shaped their social presence to attract new guests.", category: "social-media" },
  { title: "355 Black", tag: "Social Media", desc: "Mobile phones & accessories store in Tirana. We improved their social media presence and engagement.", category: "social-media" },
  { title: "Aia Hotel & Apartments", tag: "Social Media", desc: "Hotel & apartments in Tirana. We strengthened their digital presence to drive more bookings.", category: "social-media" },
  { title: "Zorada", tag: "Social Media", desc: "Premium jewellery brand. We created content that highlights their unique and elegant pieces.", category: "social-media" },
  { title: "City Fitness Club", tag: "Social Media", desc: "Fitness club in Tirana. We built a content system that engages and brings in new members.", category: "social-media" },
  { title: "Cara Dental Clinic", tag: "Social Media", desc: "Dental clinic in Tirana. We helped increase trust and patient enquiries through social media.", category: "social-media" },
  { title: "Premium International Real Estate", tag: "Social Media", desc: "Luxury real estate agency. We strengthened their presence towards high‑value clients.", category: "social-media" },
  { title: "Nova Real Estate", tag: "Social Media", desc: "Real estate agency. We improved their visual communication and lead generation.", category: "social-media" },
  { title: "Icon Store", tag: "Social Media", desc: "Fashion & lifestyle store. We increased reach and sales through creative content.", category: "social-media" },
  { title: "DD Store", tag: "Social Media", desc: "Women's clothing store. We optimised their content for a fashion‑forward audience.", category: "social-media" },
  { title: "KOA Consulting", tag: "Social Media & Logo", desc: "Financial consulting company. We created their visual identity and professional presence.", category: "social-media" },
  { title: "Endis Store", tag: "Brand Identity", desc: "Premium products store. We developed a strong brand identity and online presence.", category: "brand" },
  { title: "Taxi Service Dhermi", tag: "Web Design", desc: "Taxi service in Dhermi. We designed an easy‑to‑use website for online bookings.", category: "website" },
];

const projectsDe: Project[] = [
  { title: "Don Mare Hotel & Restaurant", tag: "Social Media", desc: "Gemütliches Hotel und Restaurant in Dhërmi. Wir haben ihren Social‑Media‑Auftritt für mehr Gäste optimiert.", category: "social-media" },
  { title: "355 Black", tag: "Social Media", desc: "Handy‑ und Zubehörshop in Tirana. Wir haben ihre Präsenz und das Engagement in sozialen Medien gesteigert.", category: "social-media" },
  { title: "Aia Hotel & Apartments", tag: "Social Media", desc: "Hotel & Apartments in Tirana. Wir haben ihre digitale Präsenz gestärkt, um mehr Buchungen zu erzielen.", category: "social-media" },
  { title: "Zorada", tag: "Social Media", desc: "Premium‑Schmuckmarke. Wir entwickelten Content, der die Eleganz und Einzigartigkeit der Stücke zeigt.", category: "social-media" },
  { title: "City Fitness Club", tag: "Social Media", desc: "Fitnessstudio in Tirana. Wir bauten ein Content‑System auf, das Mitglieder gewinnt und bindet.", category: "social-media" },
  { title: "Cara Dental Clinic", tag: "Social Media", desc: "Zahnklinik in Tirana. Wir erhöhten Vertrauen und Anfragen durch gezieltes Social‑Media‑Marketing.", category: "social-media" },
  { title: "Premium International Real Estate", tag: "Social Media", desc: "Agentur für Luxusimmobilien. Wir stärkten die Marke gegenüber anspruchsvollen Käufern und Investoren.", category: "social-media" },
  { title: "Nova Real Estate", tag: "Social Media", desc: "Immobilienagentur. Wir verbesserten die visuelle Kommunikation und Lead‑Generierung.", category: "social-media" },
  { title: "Icon Store", tag: "Social Media", desc: "Mode‑ und Lifestyle‑Store. Wir steigerten Reichweite und Verkäufe mit kreativem Content.", category: "social-media" },
  { title: "DD Store", tag: "Social Media", desc: "Mode für Frauen. Wir optimierten den Auftritt für eine modebewusste Zielgruppe.", category: "social-media" },
  { title: "KOA Consulting", tag: "Social Media & Logo", desc: "Beratungsunternehmen im Finanzbereich. Wir entwickelten ihre visuelle Identität und Online‑Präsenz.", category: "social-media" },
  { title: "Endis Store", tag: "Brand Identity", desc: "Store für Premium‑Produkte. Wir bauten eine starke Markenidentität und Social‑Media‑Präsenz auf.", category: "brand" },
  { title: "Taxi Service Dhermi", tag: "Webdesign", desc: "Taxi‑Service in Dhërmi. Wir gestalteten eine benutzerfreundliche Website für Online‑Buchungen.", category: "website" },
];

export const PROJECTS_BY_LOCALE: Record<Locale, Project[]> = {
  sq: projectsSq,
  en: projectsEn,
  de: projectsDe,
};

export type FilterTab = { key: ProjectCategory | "all"; label: string };

export const WORK_FILTER_TABS_BY_LOCALE: Record<Locale, FilterTab[]> = {
  sq: [
    { key: "all", label: "Të gjitha" },
    { key: "social-media", label: "Social Media" },
    { key: "brand", label: "Brand Identity" },
    { key: "website", label: "Website" },
  ],
  en: [
    { key: "all", label: "All" },
    { key: "social-media", label: "Social Media" },
    { key: "brand", label: "Brand Identity" },
    { key: "website", label: "Website" },
  ],
  de: [
    { key: "all", label: "Alle" },
    { key: "social-media", label: "Social Media" },
    { key: "brand", label: "Brand Identity" },
    { key: "website", label: "Website" },
  ],
};
