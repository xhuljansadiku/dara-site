import type { Locale } from "@/lib/services-data";
import { SERVICE_SLUGS, type ServiceSlug } from "@/lib/services-data";

export type ServicePageContent = {
  whatIncluded: string[];
  whoIsItFor: string[];
  benefits: string[];
  howWeWork: string[];
  priceNote?: string;
  /** Optional service-specific FAQs (merge/replace handled on page). */
  faq?: { q: string; a: string }[];
};

// Section labels by locale (shared across all services)
export const SECTION_LABELS_BY_LOCALE: Record<
  Locale,
  {
    whatIncluded: string;
    whoIsItFor: string;
    benefits: string;
    howWeWork: string;
    priceNote: string;
    workGallery: string;
    faq: string;
    relatedServices: string;
    midCta: string;
  }
> = {
  sq: {
    whatIncluded: "Çfarë përfshin",
    whoIsItFor: "Për kë është",
    benefits: "Rezultate & vlerë",
    howWeWork: "Si punojmë",
    priceNote: "Çmime & ofertë",
    workGallery: "Shembuj pune",
    faq: "Pyetje të shpeshta",
    relatedServices: "Shërbime të lidhura",
    midCta: "Gati për ofertë?",
  },
  en: {
    whatIncluded: "What's included",
    whoIsItFor: "Who it's for",
    benefits: "Results & value",
    howWeWork: "How we work",
    priceNote: "Pricing & quote",
    workGallery: "Work & visuals",
    faq: "FAQ",
    relatedServices: "Related services",
    midCta: "Ready for a quote?",
  },
  de: {
    whatIncluded: "Was enthalten ist",
    whoIsItFor: "Für wen",
    benefits: "Ergebnisse & Nutzen",
    howWeWork: "So arbeiten wir",
    priceNote: "Preise & Angebot",
    workGallery: "Arbeiten & Einblicke",
    faq: "FAQ",
    relatedServices: "Passende Leistungen",
    midCta: "Bereit für ein Angebot?",
  },
};

// Content per service per locale. Index = SERVICE_SLUGS order.
type ContentByLocale = Record<Locale, ServicePageContent>;

const CONTENT: Record<ServiceSlug, ContentByLocale> = {
  "social-media": {
    sq: {
      whatIncluded: [
        "Strategji përmbajtjeje të përshtatshme me brand-in dhe audiencën",
        "Krijim dhe planifikim postimesh (Instagram, Facebook, LinkedIn, etj.)",
        "Kalendar përmbajtjeje mujor dhe koordinim me ekipin tuaj",
        "Raportim performancash (reach, angazhim, klikime) dhe rekomandime",
        "Përgjigje ndaj komenteve dhe mesazheve (opsional)",
      ],
      whoIsItFor: [
        "Biznese dhe marka që duan prezencë të qëndrueshme në rrjetet sociale",
        "Startup-e dhe SME që nuk kanë kohë për ta menaxhuar vetë",
        "Profesionistë dhe oferta shërbimesh që duan të ndërtojnë autoritet",
      ],
      benefits: [
        "Rritje e dukshmërisë dhe e njohjes së brand-it",
        "Angazhim më i lartë me audiencën dhe lidhje më të fortë",
        "Kohë e kursyer , ne kujdesemi për planifikimin dhe ekzekutimin",
      ],
      howWeWork: [
        "Bisedë fillestare për të kuptuar qëllimet, tonin dhe audiencën",
        "Përcaktim i platformave dhe i llojit të përmbajtjes",
        "Kalendar mujor dhe aprovim me ju",
        "Publikim dhe raportim të rregullt me përmirësime",
      ],
      priceNote:
        "Çmimi varet nga numri i platformave, frekuenca e postimeve dhe nevoja për krijim kreativ.\nOferta të personalizuar sipas buxhetit.",
    },
    en: {
      whatIncluded: [
        "Content strategy aligned with your brand and target audience",
        "Creation and scheduling of posts (Instagram, Facebook, LinkedIn, etc.)",
        "Monthly content calendar and coordination with your team",
        "Performance reporting (reach, engagement, clicks) and recommendations",
        "Community management and reply to comments/messages (optional)",
      ],
      whoIsItFor: [
        "Businesses and brands that want a consistent social media presence",
        "Startups and SMEs that don't have time to manage it in-house",
        "Professionals and service providers building authority and trust",
      ],
      benefits: [
        "Increased brand visibility and recognition",
        "Stronger engagement and connection with your audience",
        "Time saved , we handle planning and execution",
      ],
      howWeWork: [
        "Initial call to understand goals, tone and audience",
        "Define platforms and content mix",
        "Monthly calendar and approval with you",
        "Regular publishing and reporting with ongoing improvements",
      ],
      priceNote:
        "Price depends on number of platforms, posting frequency and creative production needs.\nTailored quotes based on your budget.",
    },
    de: {
      whatIncluded: [
        "Content-Strategie abgestimmt auf Marke und Zielgruppe",
        "Erstellung und Planung von Beiträgen (Instagram, Facebook, LinkedIn usw.)",
        "Monatlicher Content-Kalender und Abstimmung mit Ihrem Team",
        "Performance-Reports (Reichweite, Engagement, Klicks) und Empfehlungen",
        "Community-Management und Antworten auf Kommentare/Nachrichten (optional)",
      ],
      whoIsItFor: [
        "Unternehmen und Marken mit Bedarf an präsenter Social-Media-Präsenz",
        "Startups und KMU ohne Kapazität für eigenes Social-Media-Management",
        "Freelancer und Dienstleister, die Sichtbarkeit und Vertrauen aufbauen wollen",
      ],
      benefits: [
        "Höhere Sichtbarkeit und Wiedererkennung der Marke",
        "Stärkeres Engagement und bessere Beziehung zur Zielgruppe",
        "Zeitersparnis , wir übernehmen Planung und Umsetzung",
      ],
      howWeWork: [
        "Auftaktgespräch zu Zielen, Tonalität und Zielgruppe",
        "Festlegung der Kanäle und des Content-Mix",
        "Monatlicher Kalender und Freigabe mit Ihnen",
        "Regelmäßige Veröffentlichung und Reporting mit Anpassungen",
      ],
      priceNote:
        "Der Preis hängt von Kanälen, Posting-Frequenz und Kreativumfang ab.\nIndividuelle Angebote nach Budget.",
    },
  },
  content: {
    sq: {
      whatIncluded: [
        "Foto profesionale ose të stilizuara për rrjetet sociale dhe website",
        "Video të shkurtra, reels dhe storie për Instagram/Facebook",
        "Grafikë dhe vizuale të brand-uara (postime, stories, cover)",
        "Copy i shkurtër ose i zgjatur sipas nevojës",
        "Paketë e gatshme për fushatë ose lansim produkti",
      ],
      whoIsItFor: [
        "Marka që duan përmbajtje me cilësi të lartë pa ekip të brendshëm",
        "Biznese që lansojnë produkt të ri ose fushatë",
        "Agjenci dhe biznese që kanë nevojë për kreativ të jashtëm",
      ],
      benefits: [
        "Përmbajtje që reflekton identitetin e brand-it dhe tërheq audiencën",
        "Kohë dhe burime të kursyera , prodhim profesional i gatshëm",
        "Reels dhe video që rrisin arritjen organike",
      ],
      howWeWork: [
        "Kuptim i brief-it, tonit dhe referencave vizuale",
        "Koncept dhe skripte (nëse nevojitet)",
        "Prodhimi (foto/video/grafikë) dhe montim",
        "Dorëzim në formate të përshtatshme për çdo kanal",
      ],
    },
    en: {
      whatIncluded: [
        "Professional or styled photography for social and web",
        "Short-form video, reels and stories for Instagram/Facebook",
        "On-brand graphics and visuals (posts, stories, covers)",
        "Short or long copy as needed",
        "Ready-made content packs for campaigns or product launches",
      ],
      whoIsItFor: [
        "Brands that want high-quality content without an in-house creative team",
        "Businesses launching a new product or campaign",
        "Agencies and companies needing external creative capacity",
      ],
      benefits: [
        "Content that reflects your brand identity and attracts the right audience",
        "Time and resources saved with ready-made professional production",
        "Reels and video that boost organic reach",
      ],
      howWeWork: [
        "Brief, tone and visual references aligned",
        "Concept and scripts (where needed)",
        "Production (photo/video/graphics) and editing",
        "Delivery in formats suited to each channel",
      ],
    },
    de: {
      whatIncluded: [
        "Professionelle oder inszenierte Fotos für Social und Web",
        "Kurzvideos, Reels und Stories für Instagram/Facebook",
        "Markenkonforme Grafiken und Visuals (Posts, Stories, Covers)",
        "Kurzer oder längerer Copy je nach Bedarf",
        "Fertige Content-Pakete für Kampagnen oder Produktlaunches",
      ],
      whoIsItFor: [
        "Marken, die hochwertigen Content ohne eigenes Kreativ-Team wollen",
        "Unternehmen mit Produkt- oder Kampagnen-Launch",
        "Agenturen und Firmen mit Bedarf an externer Kreativ-Kapazität",
      ],
      benefits: [
        "Content, der Ihre Marke widerspiegelt und die richtige Zielgruppe anspricht",
        "Zeit- und Ressourcenersparnis durch fertige professionelle Produktion",
        "Reels und Video für mehr organische Reichweite",
      ],
      howWeWork: [
        "Abstimmung von Briefing, Tonalität und Referenzen",
        "Konzept und Skripte (wo nötig)",
        "Produktion (Foto/Video/Grafik) und Schnitt",
        "Auslieferung in kanalgerechten Formaten",
      ],
    },
  },
  strategy: {
    sq: {
      whatIncluded: [
        "Audit i shkurtër i situatës aktuale (website, social, konkurrentë)",
        "Përcaktim i qëllimeve dhe KPI-ve të matshme",
        "Strategji marketingu digjital të shkruar (dokument 15–30 faqe)",
        "Roadmap 6–12 muaj me prioritete dhe hapa konkrete",
        "Rekomandime për buxhet, kanale dhe përmbajtje",
      ],
      whoIsItFor: [
        "Biznese që nuk kanë ende strategji të qartë marketingu",
        "Kompani që duan të riorientojnë ose skalojnë marketingu",
        "Startup-e që po përgatiten për rritje",
      ],
      benefits: [
        "Drejtim i qartë , e dini se çfarë të bëni dhe në çfarë radhe",
        "Objektiva të matshme dhe raportim të fokusuar",
        "Shmangie të “të bësh gjithçka” pa prioritete",
      ],
      howWeWork: [
        "Mbledhje e të dhënave dhe bisedë për qëllimet",
        "Analizë e konkurrentëve dhe e tregut",
        "Draft strategjie dhe prezantim",
        "Përfundim dhe dorëzim i dokumentit + sesion pyetje-përgjigje",
      ],
      priceNote: "Çmimi për strategji të plotë.\nOferta të shkurtra (quick audit) sipas kërkesës.",
    },
    en: {
      whatIncluded: [
        "Short audit of current situation (website, social, competitors)",
        "Clear goals and measurable KPIs",
        "Written digital marketing strategy (15–30 page document)",
        "6–12 month roadmap with priorities and concrete steps",
        "Recommendations on budget, channels and content",
      ],
      whoIsItFor: [
        "Businesses that don't yet have a clear marketing strategy",
        "Companies wanting to reorient or scale their marketing",
        "Startups preparing for growth",
      ],
      benefits: [
        "Clear direction , you know what to do and in what order",
        "Measurable objectives and focused reporting",
        "Avoid spreading efforts without priorities",
      ],
      howWeWork: [
        "Data gathering and goal-setting session",
        "Competitor and market analysis",
        "Strategy draft and presentation",
        "Final document and handover plus Q&A session",
      ],
      priceNote: "Price for full strategy.\nShort audits (quick audit) available on request.",
    },
    de: {
      whatIncluded: [
        "Kurzes Audit der aktuellen Situation (Website, Social, Wettbewerb)",
        "Klare Ziele und messbare KPIs",
        "Verschriftlichte digitale Marketingstrategie (Dokument 15–30 Seiten)",
        "Roadmap 6–12 Monate mit Prioritäten und konkreten Schritten",
        "Empfehlungen zu Budget, Kanälen und Content",
      ],
      whoIsItFor: [
        "Unternehmen ohne klare Marketingstrategie",
        "Firmen, die Marketing neu ausrichten oder skalieren wollen",
        "Startups in der Wachstumsvorbereitung",
      ],
      benefits: [
        "Klarer Kurs , Sie wissen, was wann zu tun ist",
        "Messbare Ziele und fokussiertes Reporting",
        "Kein „alles gleichzeitig“ ohne Prioritäten",
      ],
      howWeWork: [
        "Datensammlung und Zielgespräch",
        "Wettbewerbs- und Marktanalyse",
        "Strategie-Entwurf und Präsentation",
        "Finales Dokument, Übergabe und Q&A",
      ],
      priceNote: "Preis für vollständige Strategie.\nKurze Audits auf Anfrage.",
    },
  },
  branding: {
    sq: {
      whatIncluded: [
        "Workshop ose biseda për vlerat, audiencën dhe diferencimin",
        "Koncept logo dhe variante (2–3 drejtime)",
        "Paletë ngjyrash, tipografi dhe udhëzues vizual (style guide)",
        "Tone of voice dhe rekomandime për copy",
        "Aplikime: kartëvizitë, header social, template dokumentesh (sipas nevojës)",
      ],
      whoIsItFor: [
        "Biznese të reja që po krijojnë identitetin nga e para",
        "Marka që duan të rifreskojnë imazhin pa humbur njohjen",
        "Profesionistë që duan të duken të qëndrueshëm dhe besueshëm",
      ],
      benefits: [
        "Identitet i qartë dhe i njohur në treg",
        "Koherencë në të gjitha prekjet me klientin",
        "Baza e fortë për të gjitha fushatat dhe përmbajtjen",
      ],
      howWeWork: [
        "Discovery: vlera, audiencë, konkurrentë",
        "Koncepte logo dhe direksione vizuale",
        "Përzgjedhje dhe rafinim",
        "Style guide dhe aplikime sipas paketës",
      ],
    },
    en: {
      whatIncluded: [
        "Workshop or calls on values, audience and differentiation",
        "Logo concept and variants (2–3 directions)",
        "Colour palette, typography and visual guidelines (style guide)",
        "Tone of voice and copy recommendations",
        "Applications: business cards, social headers, document templates (as needed)",
      ],
      whoIsItFor: [
        "New businesses building their identity from scratch",
        "Brands refreshing their look without losing recognition",
        "Professionals who want a consistent, trustworthy image",
      ],
      benefits: [
        "Clear, recognizable identity in the market",
        "Consistency across every touchpoint with the customer",
        "Strong foundation for all campaigns and content",
      ],
      howWeWork: [
        "Discovery: values, audience, competitors",
        "Logo concepts and visual directions",
        "Selection and refinement",
        "Style guide and applications per package",
      ],
    },
    de: {
      whatIncluded: [
        "Workshop oder Gespräche zu Werten, Zielgruppe und Differenzierung",
        "Logo-Konzept und Varianten (2–3 Richtungen)",
        "Farbpalette, Typografie und visuelle Richtlinien (Style Guide)",
        "Tone of Voice und Copy-Empfehlungen",
        "Anwendungen: Visitenkarten, Social-Header, Dokumentenvorlagen (nach Bedarf)",
      ],
      whoIsItFor: [
        "Neue Unternehmen, die ihre Marke von Grund auf aufbauen",
        "Marken mit Refresh ohne Verlust der Wiedererkennung",
        "Freelancer und Experten mit Bedarf an einheitlichem, vertrauenswürdigem Auftritt",
      ],
      benefits: [
        "Klare, wiedererkennbare Marke am Markt",
        "Konsistenz über alle Kundenkontakte",
        "Starke Basis für alle Kampagnen und Inhalte",
      ],
      howWeWork: [
        "Discovery: Werte, Zielgruppe, Wettbewerb",
        "Logo-Konzepte und visuelle Richtungen",
        "Auswahl und Verfeinerung",
        "Style Guide und Anwendungen je nach Paket",
      ],
    },
  },
  ads: {
    sq: {
      whatIncluded: [
        "Konfigurim kampanjash në Meta (Facebook/Instagram) dhe/ose Google (Search, Display, YouTube)",
        "Krijim ose përshtatje kreativeve dhe copy për reklama",
        "Targeting i audiencës dhe teste A/B",
        "Menaxhim buxheti dhe optimizim i vazhdueshëm",
        "Raportim performancash (konvertime, CPA, ROAS) dhe rekomandime",
      ],
      whoIsItFor: [
        "Biznese që duan të rrisin shitjet ose lead-et me reklama të strukturuara",
        "Marka që kanë tashmë website (landing pages) dhe duan trafik të kualifikuar",
        "Kompani që duan të testojnë treg të ri ose produkt të ri me buxhet të kontrolluar",
      ],
      benefits: [
        "Trafic i synuar dhe konvertime të matshme",
        "Optimizim i vazhdueshëm për rezultate më të mira",
        "Transparencë e plotë mbi buxhetin dhe performancën",
      ],
      howWeWork: [
        "Kuptim i qëllimit (shitje, lead, brand) dhe buxhetit",
        "Konfigurim pixel/konversionet dhe strukturë kampanjash",
        "Lansim dhe monitorim ditor",
        "Raportim mujor dhe përshtatje strategjie",
      ],
      priceNote:
        "Çmimi i shërbimit nuk përfshin buxhetin e reklamës (Meta/Google).\nBuxheti vendoset nga ju dhe menaxhohet nga ne.",
    },
    en: {
      whatIncluded: [
        "Campaign setup on Meta (Facebook/Instagram) and/or Google (Search, Display, YouTube)",
        "Creation or adaptation of ad creatives and copy",
        "Audience targeting and A/B testing",
        "Budget management and ongoing optimisation",
        "Performance reporting (conversions, CPA, ROAS) and recommendations",
      ],
      whoIsItFor: [
        "Businesses that want to grow sales or leads with structured paid campaigns",
        "Brands with a website or landing page who need qualified traffic",
        "Companies testing a new market or product with a controlled budget",
      ],
      benefits: [
        "Targeted traffic and measurable conversions",
        "Ongoing optimisation for better results",
        "Full transparency on spend and performance",
      ],
      howWeWork: [
        "Understand goal (sales, leads, brand) and budget",
        "Pixel/conversion setup and campaign structure",
        "Launch and daily monitoring",
        "Monthly reporting and strategy adjustments",
      ],
      priceNote:
        "Service fee does not include ad spend (Meta/Google).\nYou set the budget; we manage it.",
    },
    de: {
      whatIncluded: [
        "Kampagnen-Setup auf Meta (Facebook/Instagram) und/oder Google (Search, Display, YouTube)",
        "Erstellung oder Anpassung von Anzeigen-Kreativen und Copy",
        "Zielgruppen-Targeting und A/B-Tests",
        "Budget-Steuerung und laufende Optimierung",
        "Performance-Reporting (Conversions, CPA, ROAS) und Empfehlungen",
      ],
      whoIsItFor: [
        "Unternehmen, die mit bezahlten Kampagnen Verkäufe oder Leads steigern wollen",
        "Marken mit Website oder Landingpage, die qualifizierten Traffic brauchen",
        "Firmen, die neuen Markt oder neues Produkt mit kontrolliertem Budget testen",
      ],
      benefits: [
        "Gezielter Traffic und messbare Conversions",
        "Laufende Optimierung für bessere Ergebnisse",
        "Volle Transparenz über Ausgaben und Performance",
      ],
      howWeWork: [
        "Ziel (Verkauf, Leads, Marke) und Budget klären",
        "Pixel/Conversion-Setup und Kampagnen-Struktur",
        "Launch und tägliches Monitoring",
        "Monatliches Reporting und Anpassungen",
      ],
      priceNote:
        "Die Leistungsgebühr enthält nicht das Media-Budget (Meta/Google).\nSie legen das Budget fest, wir verwalten es.",
    },
  },
  consulting: {
    sq: {
      whatIncluded: [
        "Sesion 1‑on‑1 (në person ose online) 60–90 min",
        "Analizë e shkurtër e situatës tuaj (materiale të parapara nëse nevojiten)",
        "Rekomandime të konkreta dhe prioritizuar",
        "Dokument i shkurtër me hapat e rekomanduar (opsional)",
        "Mundësi për ndjekje pas disa javësh për të parë ecurinë",
      ],
      whoIsItFor: [
        "Pronarë biznesi ose drejtues që duan të qartësojnë drejtimin e marketingut",
        "Ekipet që kanë nevojë për opinion të jashtëm dhe best practices",
        "Profesionistë që duan të investojnë në marketingu por nuk e dinë nga të fillojnë",
      ],
      benefits: [
        "Klarësi dhe prioritete të qarta për veprimet e ardhshme",
        "Përvojë e jashtme pa angazhim afatgjatë",
        "Fokus në vendime praktike, jo teori të thatë",
      ],
      howWeWork: [
        "Ju dërgonit përshkrim të shkurtër dhe (opsional) materiale para sesionit",
        "Sesion me pyetje, analizë dhe rekomandime",
        "Përmbledhje me hapat e rekomanduar (me email ose dokument)",
      ],
    },
    en: {
      whatIncluded: [
        "One-to-one session (in person or online) 60–90 min",
        "Short analysis of your situation (pre-read materials if needed)",
        "Concrete, prioritised recommendations",
        "Short written summary with next steps (optional)",
        "Optional follow-up session after a few weeks to review progress",
      ],
      whoIsItFor: [
        "Business owners or managers who want to clarify their marketing direction",
        "Teams that need an external view and best practices",
        "Professionals who want to invest in marketing but don't know where to start",
      ],
      benefits: [
        "Clarity and clear priorities for what to do next",
        "External expertise without long-term commitment",
        "Focus on practical decisions, not theory",
      ],
      howWeWork: [
        "You send a short brief and (optional) materials before the session",
        "Session with questions, analysis and recommendations",
        "Summary with recommended next steps (by email or document)",
      ],
    },
    de: {
      whatIncluded: [
        "1-zu-1-Session (vor Ort oder online) 60–90 Min.",
        "Kurze Analyse Ihrer Situation (optional Vorab-Material)",
        "Konkrete, priorisierte Empfehlungen",
        "Kurze schriftliche Zusammenfassung mit nächsten Schritten (optional)",
        "Optionale Folgesession nach einigen Wochen zur Fortschrittskontrolle",
      ],
      whoIsItFor: [
        "Geschäftsführer oder Verantwortliche, die ihre Marketing-Richtung klären wollen",
        "Teams, die eine Außenperspektive und Best Practices brauchen",
        "Profis, die in Marketing investieren wollen, aber nicht wissen, wo sie anfangen sollen",
      ],
      benefits: [
        "Klarheit und klare Prioritäten für die nächsten Schritte",
        "Externe Expertise ohne langfristige Bindung",
        "Fokus auf praktische Entscheidungen, keine graue Theorie",
      ],
      howWeWork: [
        "Sie schicken vorab eine kurze Beschreibung und optional Material",
        "Session mit Fragen, Analyse und Empfehlungen",
        "Zusammenfassung mit nächsten Schritten (per E-Mail oder Dokument)",
      ],
    },
  },
  training: {
    sq: {
      whatIncluded: [
        "Program trajnimi i përshtatur (1–2 ditë ose modul javor)",
        "Materiale të printuara ose digitale për pjesëmarrësit",
        "Ushtrime praktike dhe shembuj nga tregu lokal/ndërkombëtar",
        "Sesion pyetje-përgjigje dhe rekomandime për pas trajnimit",
        "Mundësi për ndjekje (opsional) për të siguruar zbatimin",
      ],
      whoIsItFor: [
        "Ekipet e marketingut që duan të përditësojnë njohuritë",
        "Pronarë biznesi që duan të kuptojnë bazat e marketingut digjital",
        "Kompani që duan të reduktojnë varësinë nga konsulentë të jashtëm",
      ],
      benefits: [
        "Njohuri të zbatueshme menjëherë, jo vetëm teori",
        "Ekipi i njëjtë që punon me klientë , përvojë reale",
        "Kurs i përshtatshëm për nevojat dhe nivelin e ekipit",
      ],
      howWeWork: [
        "Kuptim i qëllimeve dhe nivelit të pjesëmarrësve",
        "Përshtatje e programit (social media, ads, strategji, etj.)",
        "Zbatim i trajnimit (në lokacion ose online)",
        "Materiale dhe rekomandime për pas trajnimit",
      ],
      priceNote: "Çmimi varet nga kohëzgjatja, numri i pjesëmarrësve dhe lloji i programit. Oferta sipas nevojës.",
    },
    en: {
      whatIncluded: [
        "Tailored training programme (1–2 days or weekly modules)",
        "Printed or digital materials for participants",
        "Practical exercises and examples from local and international markets",
        "Q&A and recommendations for after the training",
        "Optional follow-up to support implementation",
      ],
      whoIsItFor: [
        "Marketing teams who want to update their skills",
        "Business owners who want to understand digital marketing basics",
        "Companies that want to rely less on external consultants",
      ],
      benefits: [
        "Immediately applicable knowledge, not just theory",
        "Same team that works with real clients , real-world experience",
        "Content tailored to your team's level and needs",
      ],
      howWeWork: [
        "Understand participants' goals and level",
        "Customise programme (social media, ads, strategy, etc.)",
        "Deliver training (on-site or online)",
        "Materials and post-training recommendations",
      ],
      priceNote: "Price depends on duration, number of participants and type of programme. Quote on request.",
    },
    de: {
      whatIncluded: [
        "Maßgeschneidertes Trainingsprogramm (1–2 Tage oder wöchentliche Module)",
        "Unterlagen in Druck oder digital für Teilnehmer",
        "Praktische Übungen und Beispiele aus dem Markt",
        "Frage-Antwort-Runde und Empfehlungen für die Zeit nach dem Training",
        "Optionale Nachbetreuung zur Umsetzungsunterstützung",
      ],
      whoIsItFor: [
        "Marketing-Teams, die ihr Know-how auffrischen wollen",
        "Geschäftsführer, die die Grundlagen des Digital Marketing verstehen wollen",
        "Unternehmen, die unabhängiger von externen Beratern werden wollen",
      ],
      benefits: [
        "Sofort anwendbares Wissen, keine reine Theorie",
        "Dasselbe Team, das mit echten Kunden arbeitet , Praxisnähe",
        "Inhalt und Niveau an Ihr Team angepasst",
      ],
      howWeWork: [
        "Ziele und Niveau der Teilnehmer klären",
        "Programm anpassen (Social Media, Ads, Strategie usw.)",
        "Durchführung vor Ort oder online",
        "Unterlagen und Empfehlungen für danach",
      ],
      priceNote: "Preis abhängig von Dauer, Teilnehmerzahl und Art des Programms. Angebot auf Anfrage.",
    },
  },
  "website-landing": {
    sq: {
      whatIncluded: [
        "Landing page ose website shumëfaqëshe, me strukturë të qartë për qëllime dhe konvertim",
        "Dizajn modern, responsive dhe performancë e mirë në mobile dhe desktop",
        "Bazë SEO teknike, forma kontaktësh dhe thirrje në veprim (CTA) të definuara",
        "Përputhje me identitetin vizual të brand-it dhe integrim me kanalet tuaja digitale",
        "Hosting, mbështetje teknike dhe (opsionale) mirëmbajtje pas lansimit",
      ],
      whoIsItFor: [
        "Kompani dhe profesionistë në Shqipëri që duan një prezencë online të besueshme dhe të përditësuar",
        "Biznese që lançojnë fushata dhe duan një landing page të fokusuar për lead-e",
        "Shërbime B2B, mirëqenie, gastronomi dhe ndërtim që duan një faqe të qartë prezantuese",
      ],
      benefits: [
        "Një website që komunikon vlerën e ofertës dhe e udhëheq vizitorin drejt kontaktit",
        "Shpejtësi në dorëzim dhe çmime të strukturuara sipas kompleksitetit të projektit",
        "Ekip që bashkon web design, UX dhe marketing digjital në një proces të vetëm",
      ],
      howWeWork: [
        "Takim fillestar për objektiva, audiencë dhe përmbajtje",
        "Propozim strukture dhe dizajni (wireframe / mockup) për aprovim",
        "Zhvillim, test dhe përmirësime përpara lansimit publik",
        "Lansim, matje bazë dhe (opsionale) paketë mirëmbajtjeje",
      ],
      priceNote:
        "Landing page nga 500€;\nWebsite biznesi nga 1.000€;\nWebsite premium për kompani nga 2.000€.\nOfertë e personalizuar pas një takimi konsultativ.",
    },
    en: {
      whatIncluded: [
        "Landing page or multi-page site with a clear structure for goals and conversion",
        "Modern responsive design with strong performance on mobile and desktop",
        "Technical SEO foundation, contact forms and defined calls to action (CTAs)",
        "Alignment with your visual identity and integration with your digital channels",
        "Hosting, technical support and (optional) maintenance after launch",
      ],
      whoIsItFor: [
        "Companies and professionals who need a credible, up-to-date online presence",
        "Businesses running campaigns that need a focused landing page for leads",
        "B2B, services, healthcare, hospitality and construction sectors that need a clear showcase site",
      ],
      benefits: [
        "A site that communicates your offer clearly and guides visitors toward contact",
        "Predictable delivery and pricing tiers matched to project complexity",
        "A team that combines web design, UX and digital marketing in one process",
      ],
      howWeWork: [
        "Kickoff on objectives, audience and content",
        "Structure and design proposal (wireframe/mockup) for approval",
        "Build, QA and refinements before public launch",
        "Launch, baseline tracking and (optional) maintenance package",
      ],
      priceNote:
        "Landing page from €500;\nBusiness website from €1,000;\nPremium corporate site from €2,000.\nCustom quote after a consultation.",
    },
    de: {
      whatIncluded: [
        "Landingpage oder mehrseitige Website mit klarer Struktur für Ziele und Conversion",
        "Modernes, responsives Design mit guter Performance auf Mobile und Desktop",
        "Technische SEO-Basis, Kontaktformulare und definierte Calls-to-Action (CTAs)",
        "Abstimmung mit Ihrer visuellen Identität und Anbindung an Ihre digitalen Kanäle",
        "Hosting, technischer Support und (optional) Wartung nach dem Launch",
      ],
      whoIsItFor: [
        "Unternehmen und Selbstständige, die einen glaubwürdigen, aktuellen Auftritt brauchen",
        "Marken mit Kampagnen, die eine fokussierte Landingpage für Leads benötigen",
        "B2B, Dienstleistung, Gesundheit, Gastgewerbe und Bau mit Bedarf an einer klaren Showcase-Site",
      ],
      benefits: [
        "Eine Site, die Ihr Angebot klar macht und Besucher zum Kontakt führt",
        "Planbare Umsetzung und Preisstufen passend zur Komplexität",
        "Ein Team, das Webdesign, UX und digitales Marketing in einem Prozess verbindet",
      ],
      howWeWork: [
        "Kick-off zu Zielen, Zielgruppe und Inhalten",
        "Struktur- und Designvorschlag (Wireframe/Mockup) zur Freigabe",
        "Entwicklung, QA und Feinschliff vor dem Go-live",
        "Launch, Basis-Tracking und (optional) Wartungspaket",
      ],
      priceNote:
        "Landingpage ab 500€;\nBusiness-Website ab 1.000€;\nPremium-Website ab 2.000€.\nIndividuelles Angebot nach einem Beratungsgespräch.",
    },
  },
  ecommerce: {
    sq: {
      whatIncluded: [
        "Krijim webshop: dyqan online me katalog produktesh dhe kategorii",
        "Pagesë me kartë, PayPal dhe menaxhim porosish",
        "Inventar, variante produktesh, zbritje dhe kupon",
        "Dizajn responsive dhe SEO për dyqan online",
        "Integrime transport dhe CRM sipas nevojës",
      ],
      whoIsItFor: [
        "Kompani shqiptare që duan të shesin online",
        "Biznese me produkte fizike ose dixhitale – krijim dyqan online",
        "Marka që nisin shitjen në internet në Shqipëri dhe më gjerë",
      ],
      benefits: [
        "Dyqan online i gatshëm për të konvertuar vizitorët në blerës",
        "Zgjidhje e përshtatshme për madhësinë e katalogut – nga pak produkte te shumë",
        "Ekip që kupton si zhvillim website ashtu edhe marketing për e-commerce",
      ],
      howWeWork: [
        "Bisedë për produktet, inventarin, pagesën dhe transportin",
        "Strukturë dyqani, katalog dhe funksione (wireframe)",
        "Zhvillim webshop, testim dhe integrim pagesash",
        "Lansim dhe mbështetje – mirembajtje website sipas nevojës",
      ],
      priceNote:
        "Krijim webshop bazë nga 1.000€;\nstandard nga 2.000€;\npremium nga 4.000€.\nOferta e personalizuar pas diskutimit.",
    },
    en: {
      whatIncluded: [
        "Online store with product catalogue and categories",
        "Payment (card, wallet) and order management",
        "Inventory, product variants and discounts",
        "Mobile-friendly design and e-commerce SEO",
        "Integrations (shipping, CRM) as needed",
      ],
      whoIsItFor: [
        "Brands that want to sell online with e-commerce",
        "Businesses with physical or digital products",
        "Startups launching online sales",
      ],
      benefits: [
        "A store ready to convert visitors into buyers",
        "Solution scaled to catalogue size and volume",
        "Support from a team that understands marketing too",
      ],
      howWeWork: [
        "Discussion of products, inventory and payment scenarios",
        "Store structure, catalogue and features (wireframe)",
        "Development, testing and payment integration",
        "Launch and ongoing support",
      ],
      priceNote:
        "Basic Shop from €1,000;\nStandard Shop from €2,000;\nPremium Shop from €4,000.\nQuote after discussion.",
    },
    de: {
      whatIncluded: [
        "Online-Shop mit Produktkatalog und Kategorien",
        "Zahlung (Karte, Wallet) und Bestellverwaltung",
        "Lager, Produktvarianten und Rabatte",
        "Mobile-optimiertes Design und E-Commerce-SEO",
        "Integrationen (Versand, CRM) nach Bedarf",
      ],
      whoIsItFor: [
        "Marken, die online mit E-Commerce verkaufen wollen",
        "Unternehmen mit physischen oder digitalen Produkten",
        "Startups, die den Online-Verkauf starten",
      ],
      benefits: [
        "Ein Shop, der Besucher in Käufer verwandelt",
        "Lösung angepasst an Kataloggröße und Volumen",
        "Unterstützung von einem Team, das auch Marketing versteht",
      ],
      howWeWork: [
        "Gespräch zu Produkten, Lager und Zahlungsszenarien",
        "Shop-Struktur, Katalog und Funktionen (Wireframe)",
        "Entwicklung, Test und Zahlungsintegration",
        "Launch und laufender Support",
      ],
      priceNote:
        "Basic Shop ab 1.000€;\nStandard Shop ab 2.000€;\nPremium Shop ab 4.000€.\nAngebot nach Gespräch.",
    },
  },
  saas: {
    sq: {
      whatIncluded: [
        "Aplikacione ose platforma të personalizuara (web / mobile)",
        "Portale për klientë, menaxhim projektesh ose përdoruesish",
        "Integrime me shërbime të jashtme (pagesa, email, API)",
        "Dizajn UX/UI dhe zhvillim të përshtatshëm për nevojat tuaja",
        "Hosting, mbështetje dhe përditësime sipas marrëveshjes",
      ],
      whoIsItFor: [
        "Kompani ose startup-e me nevojë për zgjidhje software të personalizuar",
        "Biznese që duan portal për klientë ose ekip",
        "Projekte me logjikë unike që nuk mbulojnë produktet e gatshme",
      ],
      benefits: [
        "Zgjidhje e ndërtuar për workflow-in dhe proceset tuaja",
        "Kontroll i plotë mbi funksionalitetin dhe të dhënat",
        "Një partner teknik që kupton edhe biznesin dhe marketingu",
      ],
      howWeWork: [
        "Bisedë për problemet, përdoruesit dhe funksionet e nevojshme",
        "Specifikim dhe propozime arkitekture (wireframe / flow)",
        "Zhvillim në faza, testim dhe përsëritje",
        "Lansim dhe mbështetje / evolucion i vazhdueshëm",
      ],
      priceNote:
        "MVP nga 4,000€;\nGrowth nga 8,000€;\nEnterprise ofertë e personalizuar.\nOferta pas workshop fillestar.",
    },
    en: {
      whatIncluded: [
        "Custom applications or platforms (web / mobile)",
        "Portals for clients, project or user management",
        "Integrations with external services (payment, email, API)",
        "UX/UI design and development tailored to your needs",
        "Hosting, support and updates as agreed",
      ],
      whoIsItFor: [
        "Companies or startups that need custom software solutions",
        "Businesses that want a portal for clients or team",
        "Projects with unique logic that off-the-shelf products don't cover",
      ],
      benefits: [
        "Solution built around your workflow and processes",
        "Full control over functionality and data",
        "A technical partner who understands business and marketing too",
      ],
      howWeWork: [
        "Discussion of problems, users and required features",
        "Specification and architecture proposals (wireframe/flow)",
        "Phased development, testing and iteration",
        "Launch and ongoing support / evolution",
      ],
      priceNote:
        "MVP from €4,000;\nGrowth from €8,000;\nEnterprise custom quote.\nQuote after initial workshop.",
    },
    de: {
      whatIncluded: [
        "Individuelle Anwendungen oder Plattformen (Web / Mobile)",
        "Portale für Kunden, Projekt- oder Nutzerverwaltung",
        "Integrationen mit externen Diensten (Zahlung, E-Mail, API)",
        "UX/UI-Design und Entwicklung nach Ihren Anforderungen",
        "Hosting, Support und Updates nach Vereinbarung",
      ],
      whoIsItFor: [
        "Firmen oder Startups mit Bedarf an maßgeschneiderten Software-Lösungen",
        "Unternehmen, die ein Portal für Kunden oder Team brauchen",
        "Projekte mit einzigartiger Logik, die Standardprodukte nicht abdecken",
      ],
      benefits: [
        "Lösung, die zu Ihrem Workflow und Ihren Prozessen passt",
        "Volle Kontrolle über Funktionalität und Daten",
        "Ein technischer Partner, der auch Business und Marketing versteht",
      ],
      howWeWork: [
        "Gespräch zu Problemen, Nutzern und gewünschten Funktionen",
        "Spezifikation und Architektur-Vorschläge (Wireframe/Flow)",
        "Entwicklung in Phasen, Test und Iteration",
        "Launch und laufender Support / Weiterentwicklung",
      ],
      priceNote:
        "MVP ab 4.000€;\nGrowth ab 8.000€;\nEnterprise individuelles Angebot.\nAngebot nach erstem Workshop.",
    },
  },
  maintenance: {
    sq: {
      whatIncluded: [
        "Mirembajtje website: përditësime, backups, siguri dhe patches",
        "Mirembajtje dyqan online (webshop): inventar, porosi, pagesa",
        "Optimizim website të vjetra – shpejtësi, SEO, modernizim, responsive",
        "Monitoring dhe raportim i performancës",
        "Support teknik dhe përditësime të rregullta për kompani",
      ],
      whoIsItFor: [
        "Biznese në Shqipëri me website ose webshop që duan mirembajtje të vazhdueshme",
        "Kompani me website të vjetra që duan optimizim dhe përditësim",
        "Marka që duan website-in gjithmonë të përditësuar dhe të sigurt",
      ],
      benefits: [
        "Website i sigurt dhe i përditësuar – pa probleme teknike",
        "Performancë më e mirë dhe shpejtësi më e lartë – më mirë për SEO",
        "Pa stres – ne kujdesemi për të gjitha detajet teknike",
      ],
      howWeWork: [
        "Audit fillestar i website ose webshop-it tuaj",
        "Plan mirembajtjeje mujor (updates, backups, monitoring)",
        "Raportim mujor dhe rekomandime për optimizime",
        "Support i vazhdueshëm për çdo problem ose nevojë",
      ],
      priceNote: "Mirembajtje website nga 100€/muaj.\nOptimizime dhe projekte më të mëdha sipas nevojës.",
    },
    en: {
      whatIncluded: [
        "Website maintenance (updates, backups, security, patches)",
        "E-commerce maintenance (inventory sync, order management, payment fixes)",
        "Old website optimization (speed, SEO, modernization, responsive)",
        "Performance monitoring and reporting",
        "Technical support and regular updates",
      ],
      whoIsItFor: [
        "Businesses with websites or e-commerce that need ongoing maintenance",
        "Companies with old websites that want optimization and modernization",
        "Brands that want their website always updated and secure",
      ],
      benefits: [
        "Secure and updated website , no technical issues",
        "Better performance and higher speed",
        "No stress , we handle all technical details",
      ],
      howWeWork: [
        "Initial audit of your website/e-commerce",
        "Monthly maintenance plan (updates, backups, monitoring)",
        "Monthly reporting and optimization recommendations",
        "Ongoing support for any issue or need",
      ],
      priceNote: "From €120/month for basic maintenance.\nOptimizations and larger projects as needed.",
    },
    de: {
      whatIncluded: [
        "Website-Wartung (Updates, Backups, Sicherheit, Patches)",
        "E-Commerce-Wartung (Lager-Synchronisation, Bestellverwaltung, Zahlungsfehlerbehebung)",
        "Optimierung alter Websites (Geschwindigkeit, SEO, Modernisierung, Responsive)",
        "Performance-Monitoring und Berichterstattung",
        "Technischer Support und regelmäßige Updates",
      ],
      whoIsItFor: [
        "Unternehmen mit Websites oder E-Commerce, die laufende Wartung brauchen",
        "Firmen mit alten Websites, die Optimierung und Modernisierung wollen",
        "Marken, die ihre Website immer aktualisiert und sicher haben wollen",
      ],
      benefits: [
        "Sichere und aktualisierte Website , keine technischen Probleme",
        "Bessere Performance und höhere Geschwindigkeit",
        "Kein Stress , wir kümmern uns um alle technischen Details",
      ],
      howWeWork: [
        "Erstes Audit Ihrer Website/E-Commerce",
        "Monatlicher Wartungsplan (Updates, Backups, Monitoring)",
        "Monatliche Berichte und Optimierungsempfehlungen",
        "Laufender Support bei jedem Problem oder Bedarf",
      ],
      priceNote: "Ab 120€/Monat für Basis-Wartung.\nOptimierungen und größere Projekte nach Bedarf.",
    },
  },
};

export function getServicePageContent(
  locale: Locale,
  slug: string
): ServicePageContent | null {
  const index = SERVICE_SLUGS.indexOf(slug as ServiceSlug);
  if (index === -1) return null;
  const content = CONTENT[SERVICE_SLUGS[index]][locale];
  return content ?? null;
}
