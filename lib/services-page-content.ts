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
    benefits: "Çfarë fitoni",
    howWeWork: "Si punojmë",
    priceNote: "Çmimi",
    workGallery: "Në pamje",
    faq: "Pyetje të shpeshta",
    relatedServices: "Shërbime të lidhura",
    midCta: "Gati për ofertë?",
  },
  en: {
    whatIncluded: "What's included",
    whoIsItFor: "Who it's for",
    benefits: "What you gain",
    howWeWork: "How we work",
    priceNote: "Pricing",
    workGallery: "In pictures",
    faq: "FAQ",
    relatedServices: "Related services",
    midCta: "Ready for a quote?",
  },
  de: {
    whatIncluded: "Was enthalten ist",
    whoIsItFor: "Für wen",
    benefits: "Ihr Nutzen",
    howWeWork: "So arbeiten wir",
    priceNote: "Preis",
    workGallery: "Einblicke",
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
      whatIncluded: ["Plan mujor me postime", "Postime, reels dhe stories", "Raport i thjeshtë çdo muaj"],
      whoIsItFor: ["Biznese që postojnë rrallë", "Ata që s’kanë kohë ta bëjnë vetë"],
      benefits: ["Profil aktiv dhe i rregullt", "Më shumë mesazhe nga klientët", "Ju merreni me biznesin, ne me postimet"],
      howWeWork: ["Flasim 30 minuta për biznesin tuaj", "Ju dërgojmë planin e muajit", "Postojmë dhe ju tregojmë rezultatet"],
      priceNote: "Varet nga sa rrjete dhe sa postime ju duhen.",
    },
    en: {
      whatIncluded: ["A monthly posting plan", "Posts, reels and stories", "A simple report every month"],
      whoIsItFor: ["Businesses that rarely post", "People with no time to do it themselves"],
      benefits: ["An active, consistent profile", "More messages from customers", "You run the business, we run the posts"],
      howWeWork: ["A 30-minute chat about your business", "We send you the month’s plan", "We post and show you the results"],
      priceNote: "Depends on how many channels and posts you need.",
    },
    de: {
      whatIncluded: ["Ein monatlicher Redaktionsplan", "Posts, Reels und Stories", "Ein einfacher Monatsbericht"],
      whoIsItFor: ["Unternehmen, die selten posten", "Alle ohne Zeit, es selbst zu machen"],
      benefits: ["Ein aktives, regelmäßiges Profil", "Mehr Anfragen von Kunden", "Sie führen das Geschäft, wir die Posts"],
      howWeWork: ["30 Minuten Gespräch über Ihr Unternehmen", "Wir schicken den Monatsplan", "Wir posten und zeigen die Ergebnisse"],
      priceNote: "Je nach Kanälen und Anzahl der Posts.",
    },
  },
  content: {
    sq: {
      whatIncluded: ["Foto për rrjete dhe website", "Video të shkurtra dhe reels", "Grafika me ngjyrat e brand-it"],
      whoIsItFor: ["Biznese pa fotograf ose videograf", "Kur lansoni produkt ose fushatë"],
      benefits: ["Dukeni po aq mirë sa jeni", "Reklamat performojnë më mirë", "Materiale gati për çdo rrjet"],
      howWeWork: ["Na tregoni çfarë doni të tregoni", "Xhirojmë dhe montojmë", "Ju dorëzojmë skedarët gati"],
      priceNote: "Ofertë sipas asaj që duhet xhiruar.",
    },
    en: {
      whatIncluded: ["Photos for social and web", "Short videos and reels", "Graphics in your brand colours"],
      whoIsItFor: ["Businesses without a photographer", "Product launches and campaigns"],
      benefits: ["Look as good as you are", "Ads perform better", "Files ready for every channel"],
      howWeWork: ["Tell us what you want to show", "We shoot and edit", "You get ready-to-post files"],
      priceNote: "Quoted on what needs to be shot.",
    },
    de: {
      whatIncluded: ["Fotos für Social Media und Web", "Kurze Videos und Reels", "Grafiken in Ihren Markenfarben"],
      whoIsItFor: ["Unternehmen ohne Fotografen", "Produktlaunches und Kampagnen"],
      benefits: ["So gut aussehen, wie Sie sind", "Anzeigen funktionieren besser", "Dateien für jeden Kanal"],
      howWeWork: ["Sie sagen uns, was Sie zeigen wollen", "Wir drehen und schneiden", "Sie bekommen fertige Dateien"],
      priceNote: "Angebot je nach Drehaufwand.",
    },
  },
  strategy: {
    sq: {
      whatIncluded: ["Ku jeni sot dhe çfarë po humbni", "Kujt i flisni dhe me çfarë mesazhi", "Plan me hapa për 3–6 muajt e ardhshëm"],
      whoIsItFor: ["Biznese që bëjnë marketing pa plan", "Kur shpenzoni, por s’shihni rezultat"],
      benefits: ["E dini saktë çfarë të bëni", "Më pak para të humbura", "Të gjithë në ekip në të njëjtën linjë"],
      howWeWork: ["Analizojmë biznesin dhe konkurrencën", "Ju prezantojmë planin", "E rregullojmë bashkë derisa të jetë i qartë"],
    },
    en: {
      whatIncluded: ["Where you are today and what you’re missing", "Who you talk to and what you say", "A step-by-step plan for the next 3–6 months"],
      whoIsItFor: ["Businesses marketing without a plan", "When you spend but see no results"],
      benefits: ["You know exactly what to do", "Less money wasted", "The whole team on the same page"],
      howWeWork: ["We look at your business and competitors", "We present the plan", "We refine it together until it’s clear"],
    },
    de: {
      whatIncluded: ["Wo Sie heute stehen und was fehlt", "Wen Sie ansprechen und womit", "Ein Plan in Schritten für 3–6 Monate"],
      whoIsItFor: ["Unternehmen, die ohne Plan werben", "Wenn Sie ausgeben, aber nichts sehen"],
      benefits: ["Sie wissen genau, was zu tun ist", "Weniger verschwendetes Geld", "Das ganze Team auf einer Linie"],
      howWeWork: ["Wir analysieren Unternehmen und Wettbewerb", "Wir stellen den Plan vor", "Wir schärfen ihn gemeinsam"],
    },
  },
  branding: {
    sq: {
      whatIncluded: ["Logo në 2–3 drejtime", "Ngjyrat dhe fontet tuaja", "Udhëzues i shkurtër si t’i përdorni"],
      whoIsItFor: ["Biznese të reja", "Kur logoja e vjetër s’ju përfaqëson më"],
      benefits: ["Dukeni profesionalë kudo", "Njihen më lehtë", "Gjithçka duket si një brand i vetëm"],
      howWeWork: ["Bisedojmë për biznesin dhe shijen tuaj", "Ju tregojmë 2–3 ide", "E përsosim atë që zgjidhni"],
      priceNote: "Vetëm logo nga 250€.",
    },
    en: {
      whatIncluded: ["A logo in 2–3 directions", "Your colours and fonts", "A short guide on using them"],
      whoIsItFor: ["New businesses", "When the old logo no longer fits"],
      benefits: ["Look professional everywhere", "Easier to recognise", "Everything feels like one brand"],
      howWeWork: ["We talk about your business and taste", "We show you 2–3 ideas", "We polish the one you pick"],
      priceNote: "Logo only from €250.",
    },
    de: {
      whatIncluded: ["Ein Logo in 2–3 Richtungen", "Ihre Farben und Schriften", "Eine kurze Anleitung zur Nutzung"],
      whoIsItFor: ["Neue Unternehmen", "Wenn das alte Logo nicht mehr passt"],
      benefits: ["Überall professionell auftreten", "Leichter wiedererkannt werden", "Alles wirkt wie eine Marke"],
      howWeWork: ["Wir sprechen über Unternehmen und Geschmack", "Wir zeigen 2–3 Ideen", "Wir verfeinern Ihre Wahl"],
      priceNote: "Nur Logo ab 250€.",
    },
  },
  ads: {
    sq: {
      whatIncluded: ["Reklama në Facebook, Instagram dhe Google", "Tekstet dhe vizualet e reklamave", "Raport çdo muaj: sa shpenzuat, çfarë fituat"],
      whoIsItFor: ["Biznese që duan klientë të rinj shpejt", "Kur keni provuar vetë dhe s’ka funksionuar"],
      benefits: ["Reklama që i shohin njerëzit e duhur", "Buxheti shkon aty ku sjell rezultat", "E dini sa ju kushton një klient"],
      howWeWork: ["Vendosim qëllimin dhe buxhetin", "Nisim reklamat", "I përmirësojmë çdo javë"],
      priceNote: "Buxheti i reklamave paguhet veçmas.",
    },
    en: {
      whatIncluded: ["Ads on Facebook, Instagram and Google", "Ad copy and visuals", "A monthly report: what you spent, what you got"],
      whoIsItFor: ["Businesses that want new customers fast", "When you tried it yourself and it didn’t work"],
      benefits: ["Ads seen by the right people", "Budget goes where it pays off", "You know what a customer costs you"],
      howWeWork: ["We set the goal and budget", "We launch the ads", "We improve them every week"],
      priceNote: "Ad spend is paid separately.",
    },
    de: {
      whatIncluded: ["Anzeigen auf Facebook, Instagram und Google", "Texte und Visuals der Anzeigen", "Monatsbericht: was ausgegeben, was erreicht"],
      whoIsItFor: ["Unternehmen, die schnell Neukunden wollen", "Wenn es selbst nicht geklappt hat"],
      benefits: ["Anzeigen bei den richtigen Leuten", "Budget dort, wo es sich lohnt", "Sie wissen, was ein Kunde kostet"],
      howWeWork: ["Wir legen Ziel und Budget fest", "Wir starten die Anzeigen", "Wir verbessern sie jede Woche"],
      priceNote: "Das Werbebudget zahlen Sie separat.",
    },
  },
  consulting: {
    sq: {
      whatIncluded: ["Një seancë 1:1 për marketingun tuaj", "Përgjigje për pyetjet që keni", "Hapat e ardhshëm me shkrim"],
      whoIsItFor: ["Pronarë që duan një mendim të dytë", "Ekipe që marrin vendim të madh"],
      benefits: ["Qartësi në pak kohë", "Shmangni gabime të shtrenjta", "Dini nga t’ia nisni nesër"],
      howWeWork: ["Na dërgoni pyetjet para seancës", "Flasim bashkë", "Ju dërgojmë përmbledhjen"],
    },
    en: {
      whatIncluded: ["A 1:1 session on your marketing", "Answers to your questions", "Next steps in writing"],
      whoIsItFor: ["Owners who want a second opinion", "Teams facing a big decision"],
      benefits: ["Clarity in little time", "Avoid costly mistakes", "Know where to start tomorrow"],
      howWeWork: ["Send us your questions beforehand", "We talk it through", "You get a written summary"],
    },
    de: {
      whatIncluded: ["Eine 1:1-Sitzung zu Ihrem Marketing", "Antworten auf Ihre Fragen", "Nächste Schritte schriftlich"],
      whoIsItFor: ["Inhaber, die eine zweite Meinung wollen", "Teams vor einer großen Entscheidung"],
      benefits: ["Klarheit in kurzer Zeit", "Teure Fehler vermeiden", "Wissen, wo Sie morgen anfangen"],
      howWeWork: ["Schicken Sie uns vorab Ihre Fragen", "Wir sprechen darüber", "Sie erhalten eine Zusammenfassung"],
    },
  },
  training: {
    sq: {
      whatIncluded: ["Mësime praktike për social media", "Ushtrime me rrjetet tuaja", "Certifikatë në fund"],
      whoIsItFor: ["Kush do të menaxhojë vetë rrjetet", "Ekipe që duan të mësojnë bashkë"],
      benefits: ["Mësoni duke punuar", "E aplikoni menjëherë", "S’varet më gjithçka nga dikush tjetër"],
      howWeWork: ["Zgjidhni programin", "Ndiqni mësimet", "Merrni ndihmë edhe pas trajnimit"],
    },
    en: {
      whatIncluded: ["Hands-on social media lessons", "Exercises on your own channels", "A certificate at the end"],
      whoIsItFor: ["Anyone who wants to run their own channels", "Teams who want to learn together"],
      benefits: ["Learn by doing", "Use it straight away", "No longer depend on someone else"],
      howWeWork: ["Pick the programme", "Follow the lessons", "Get help after the training too"],
    },
    de: {
      whatIncluded: ["Praxisnahe Social-Media-Lektionen", "Übungen mit Ihren eigenen Kanälen", "Ein Zertifikat am Ende"],
      whoIsItFor: ["Alle, die ihre Kanäle selbst führen wollen", "Teams, die gemeinsam lernen wollen"],
      benefits: ["Lernen durch Tun", "Sofort anwendbar", "Nicht mehr von anderen abhängig"],
      howWeWork: ["Programm wählen", "Lektionen besuchen", "Auch danach Unterstützung bekommen"],
    },
  },
  "website-landing": {
    sq: {
      whatIncluded: ["Dizajn i bërë për biznesin tuaj", "Funksionon mirë në telefon", "Formular kontakti dhe SEO bazë"],
      whoIsItFor: ["Biznese pa website", "Kur website-i i vjetër ju turpëron"],
      benefits: ["Klientët ju gjejnë në Google", "Ju kontaktojnë më lehtë", "Dukeni seriozë që në shikim të parë"],
      howWeWork: ["Na tregoni biznesin dhe shembuj që ju pëlqejnë", "Ju tregojmë dizajnin", "E ndërtojmë dhe e publikojmë"],
      priceNote: "Website me disa faqe nga 800€.",
    },
    en: {
      whatIncluded: ["A design made for your business", "Works well on phones", "Contact form and basic SEO"],
      whoIsItFor: ["Businesses without a website", "When the old site embarrasses you"],
      benefits: ["Customers find you on Google", "They contact you more easily", "You look serious at first glance"],
      howWeWork: ["Tell us about your business and sites you like", "We show you the design", "We build it and go live"],
      priceNote: "Multi-page website from €800.",
    },
    de: {
      whatIncluded: ["Ein Design für Ihr Unternehmen", "Funktioniert gut auf dem Handy", "Kontaktformular und Basis-SEO"],
      whoIsItFor: ["Unternehmen ohne Website", "Wenn die alte Seite peinlich ist"],
      benefits: ["Kunden finden Sie bei Google", "Sie werden leichter kontaktiert", "Sie wirken auf Anhieb seriös"],
      howWeWork: ["Erzählen Sie uns von Ihrem Unternehmen", "Wir zeigen das Design", "Wir bauen und veröffentlichen"],
      priceNote: "Website mit mehreren Seiten ab 800€.",
    },
  },
  ecommerce: {
    sq: {
      whatIncluded: ["Dyqan me produktet tuaja", "Pagesë online dhe transport", "Panel ku i menaxhoni vetë porositë"],
      whoIsItFor: ["Kush shet vetëm me mesazhe në Instagram", "Dyqane fizike që duan të shesin online"],
      benefits: ["Shisni edhe kur flini", "Më pak mesazhe, më shumë porosi", "Klientët blejnë vetë, pa pritur"],
      howWeWork: ["Na dërgoni produktet dhe çmimet", "Ngremë dyqanin", "Ju mësojmë ta përdorni"],
      priceNote: "Varet nga sa produkte keni.",
    },
    en: {
      whatIncluded: ["A store with your products", "Online payment and shipping", "A panel to manage orders yourself"],
      whoIsItFor: ["Anyone selling only through Instagram DMs", "Physical shops that want to sell online"],
      benefits: ["Sell while you sleep", "Fewer messages, more orders", "Customers buy on their own, no waiting"],
      howWeWork: ["Send us your products and prices", "We build the store", "We show you how to run it"],
      priceNote: "Depends on how many products you have.",
    },
    de: {
      whatIncluded: ["Ein Shop mit Ihren Produkten", "Online-Zahlung und Versand", "Ein Panel für Ihre Bestellungen"],
      whoIsItFor: ["Wer nur über Instagram-Nachrichten verkauft", "Läden, die online verkaufen wollen"],
      benefits: ["Verkaufen, während Sie schlafen", "Weniger Nachrichten, mehr Bestellungen", "Kunden kaufen selbst, ohne Warten"],
      howWeWork: ["Schicken Sie uns Produkte und Preise", "Wir bauen den Shop", "Wir zeigen Ihnen, wie er läuft"],
      priceNote: "Je nach Anzahl der Produkte.",
    },
  },
  saas: {
    sq: {
      whatIncluded: ["Aplikacion ose platformë sipas idesë suaj", "Dizajn dhe programim i plotë", "Mbështetje pas publikimit"],
      whoIsItFor: ["Kush ka një ide produkti", "Biznese që punojnë me shumë tabela Excel"],
      benefits: ["Një mjet që bën saktë atë që ju duhet", "Më pak punë me dorë", "Rritet bashkë me biznesin"],
      howWeWork: ["Nisim nga versioni më i thjeshtë", "E testojmë me përdorues realë", "Shtojmë funksione hap pas hapi"],
      priceNote: "Oferta pas një bisede për idenë.",
    },
    en: {
      whatIncluded: ["An app or platform built on your idea", "Full design and development", "Support after launch"],
      whoIsItFor: ["Anyone with a product idea", "Businesses running on too many spreadsheets"],
      benefits: ["A tool that does exactly what you need", "Less manual work", "It grows with your business"],
      howWeWork: ["We start with the simplest version", "We test it with real users", "We add features step by step"],
      priceNote: "Quoted after a chat about the idea.",
    },
    de: {
      whatIncluded: ["Eine App oder Plattform nach Ihrer Idee", "Komplettes Design und Entwicklung", "Support nach dem Launch"],
      whoIsItFor: ["Alle mit einer Produktidee", "Unternehmen mit zu vielen Excel-Tabellen"],
      benefits: ["Ein Tool, das genau das tut, was Sie brauchen", "Weniger Handarbeit", "Wächst mit Ihrem Unternehmen"],
      howWeWork: ["Wir starten mit der einfachsten Version", "Wir testen mit echten Nutzern", "Wir ergänzen Schritt für Schritt"],
      priceNote: "Angebot nach einem Gespräch über die Idee.",
    },
  },
  maintenance: {
    sq: {
      whatIncluded: ["Përditësime dhe backup", "Kontroll sigurie dhe shpejtësie", "Ndihmë kur diçka nuk shkon"],
      whoIsItFor: ["Kush ka website ose dyqan online", "Kur s’keni njeri teknik në ekip"],
      benefits: ["Faqja nuk bie", "Hapet shpejt", "Një problem më pak për ju"],
      howWeWork: ["Kontrollojmë faqen tuaj", "E mbajmë çdo muaj", "Ju njoftojmë për çdo gjë të rëndësishme"],
    },
    en: {
      whatIncluded: ["Updates and backups", "Security and speed checks", "Help when something breaks"],
      whoIsItFor: ["Anyone with a website or online store", "When there’s no tech person on the team"],
      benefits: ["Your site stays up", "It loads fast", "One less thing to worry about"],
      howWeWork: ["We check your site", "We look after it every month", "We tell you about anything important"],
    },
    de: {
      whatIncluded: ["Updates und Backups", "Sicherheits- und Speed-Checks", "Hilfe, wenn etwas nicht geht"],
      whoIsItFor: ["Alle mit Website oder Online-Shop", "Wenn niemand Technisches im Team ist"],
      benefits: ["Die Seite bleibt online", "Sie lädt schnell", "Eine Sorge weniger"],
      howWeWork: ["Wir prüfen Ihre Seite", "Wir pflegen sie jeden Monat", "Wir melden alles Wichtige"],
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
