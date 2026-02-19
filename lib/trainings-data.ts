export type Locale = "sq" | "en" | "de";

export type TrainingSlug = "smm" | "smm-1-1" | "web-developer" | "bazat-e-tik";

export type Training = {
  slug: TrainingSlug;
  title: Record<Locale, string>;
  shortDesc: Record<Locale, string>;
  price: string;
  duration: Record<Locale, string>;
  stats: { value: string; label: Record<Locale, string> }[];
  highlights: Record<Locale, string[]>;
  fullDescription: Record<Locale, string[]>;
  comingSoon?: boolean;
};

export const TRAININGS: Training[] = [
  {
    slug: "smm",
    title: {
      sq: "Trajnime SMM",
      en: "SMM Training",
      de: "SMM Training",
    },
    shortDesc: {
      sq: "Mëso Social Media Marketing nga ekspertët. 12 tema, praktike dhe ndjekje.",
      en: "Learn Social Media Marketing from experts. 12 topics, practical exercises and follow-up.",
      de: "Lernen Sie Social Media Marketing von Experten. 12 Themen, praktische Übungen und Nachbetreuung.",
    },
    price: "250€",
    duration: {
      sq: "1 muaj (3 herë në javë)",
      en: "1 month (3 times per week)",
      de: "1 Monat (3× pro Woche)",
    },
    stats: [
      { value: "50+", label: { sq: "studente", en: "students", de: "Teilnehmer" } },
      { value: "12", label: { sq: "mësime", en: "lessons", de: "Lektionen" } },
      { value: "1", label: { sq: "muaj", en: "month", de: "Monat" } },
    ],
    highlights: {
      sq: ["12 tema të plota", "Ushtrime praktike", "Materiale për studim", "Ndjekje pas trajnimit"],
      en: ["12 complete topics", "Practical exercises", "Study materials", "Post-training follow-up"],
      de: ["12 vollständige Themen", "Praktische Übungen", "Lernmaterialien", "Nachbetreuung"],
    },
    fullDescription: {
      sq: [
        "Trajnimi SMM është programi ynë më i zgjedhur për të mësuar Social Media Marketing nga zero. Përfshin 12 mësime të strukturuara që mbulojnë të gjitha aspektet e nevojshme: nga krijimi i strategjisë deri te menaxhimi i përditshëm të rrjetave sociale.",
        "Çdo sesion zgjat rreth 2 orë dhe zhvillohet 3 herë në javë. Kombinon teori dhe praktikë — çdo mësim përfundon me ushtrime që mund të aplikosh menjëherë në biznesin tënd.",
        "Pas përfundimit të trajnimit, ofrojmë 2 javë ndjekje për pyetje dhe rekomandime. Materialet e studimit përfshijnë prezantime, template dhe udhëzues praktik.",
      ],
      en: [
        "The SMM Training is our most popular programme for learning Social Media Marketing from scratch. It includes 12 structured lessons covering all necessary aspects: from strategy creation to daily social media management.",
        "Each session lasts about 2 hours and takes place 3 times per week. It combines theory and practice — every lesson ends with exercises you can apply immediately to your business.",
        "After completing the training, we offer 2 weeks of follow-up for questions and recommendations. Study materials include presentations, templates and a practical guide.",
      ],
      de: [
        "Das SMM-Training ist unser beliebtestes Programm zum Erlernen von Social Media Marketing von Grund auf. Es umfasst 12 strukturierte Lektionen, die alle notwendigen Aspekte abdecken: von der Strategieerstellung bis zum täglichen Social-Media-Management.",
        "Jede Sitzung dauert etwa 2 Stunden und findet 3-mal pro Woche statt. Es verbindet Theorie und Praxis — jede Lektion endet mit Übungen, die Sie sofort in Ihrem Unternehmen anwenden können.",
        "Nach Abschluss des Trainings bieten wir 2 Wochen Nachbetreuung für Fragen und Empfehlungen. Die Lernmaterialien umfassen Präsentationen, Vorlagen und einen praktischen Leitfaden.",
      ],
    },
  },
  {
    slug: "smm-1-1",
    title: {
      sq: "Trajnim SMM 1:1",
      en: "SMM 1:1 Training",
      de: "SMM 1:1 Training",
    },
    shortDesc: {
      sq: "Trajnim personalizuar një-për-një. Fokus intensiv në nevojat e tua specifike.",
      en: "Personalised one-on-one training. Intensive focus on your specific needs.",
      de: "Personalisierte Einzelbetreuung. Intensiver Fokus auf Ihre spezifischen Bedürfnisse.",
    },
    price: "600€",
    duration: {
      sq: "1 muaj intensiv",
      en: "1 month intensive",
      de: "1 Monat intensiv",
    },
    stats: [
      { value: "1:1", label: { sq: "kohë e plotë", en: "full attention", de: "volle Aufmerksamkeit" } },
      { value: "100%", label: { sq: "personalizuar", en: "customised", de: "individuell" } },
      { value: "1", label: { sq: "muaj", en: "month", de: "Monat" } },
    ],
    highlights: {
      sq: ["Mësime të personalizuara", "Praktike intensive", "Orar fleksibël", "Fokus në biznesin tënd"],
      en: ["Customised lessons", "Intensive practice", "Flexible schedule", "Focus on your business"],
      de: ["Individuelle Lektionen", "Intensive Praxis", "Flexibler Zeitplan", "Fokus auf Ihr Unternehmen"],
    },
    fullDescription: {
      sq: [
        "Trajnimi SMM 1:1 është dizajnuar për ata që duan një eksperiencë më të thellë dhe të personalizuar. Punojmë direkt me ty, duke u fokusuar 100% në biznesin dhe qëllimet e tua.",
        "Programi përfshin mësime, praktike intensive dhe ndjekje të vazhdueshme. Kohëzgjatja dhe orari përshtaten sipas disponibilitetit tënd.",
        "Ideale për sipërmarrës, menaxherë dhe profesionistë që duan të zotërojnë SMM shpejt dhe me rezultate të matshme.",
      ],
      en: [
        "The SMM 1:1 Training is designed for those who want a deeper, more personalised experience. We work directly with you, focusing 100% on your business and goals.",
        "The programme includes lessons, intensive practice and ongoing follow-up. Duration and schedule are adapted to your availability.",
        "Ideal for entrepreneurs, managers and professionals who want to master SMM quickly with measurable results.",
      ],
      de: [
        "Das SMM 1:1 Training ist für diejenigen konzipiert, die eine tiefere, personalisiertere Erfahrung wünschen. Wir arbeiten direkt mit Ihnen und konzentrieren uns zu 100 % auf Ihr Unternehmen und Ihre Ziele.",
        "Das Programm umfasst Lektionen, intensive Praxis und laufende Nachbetreuung. Dauer und Zeitplan werden an Ihre Verfügbarkeit angepasst.",
        "Ideal für Unternehmer, Manager und Fachleute, die SMM schnell mit messbaren Ergebnissen beherrschen möchten.",
      ],
    },
  },
  {
    slug: "web-developer",
    comingSoon: true,
    title: {
      sq: "Kurs Web Developer",
      en: "Web Developer Course",
      de: "Web-Entwickler-Kurs",
    },
    shortDesc: {
      sq: "Mëso të ndërtosh faqe web dhe aplikacione moderne. HTML, CSS, JavaScript dhe më shumë.",
      en: "Learn to build modern websites and applications. HTML, CSS, JavaScript and more.",
      de: "Lernen Sie, moderne Websites und Anwendungen zu erstellen. HTML, CSS, JavaScript und mehr.",
    },
    price: "Ofertë",
    duration: {
      sq: "Program i plotë",
      en: "Full programme",
      de: "Vollständiges Programm",
    },
    stats: [
      { value: "50+", label: { sq: "projekte", en: "projects", de: "Projekte" } },
      { value: "12+", label: { sq: "module", en: "modules", de: "Module" } },
      { value: "3", label: { sq: "muaj", en: "months", de: "Monate" } },
    ],
    highlights: {
      sq: ["HTML, CSS, JavaScript", "React / Next.js", "Projekte praktike", "Portfolio profesional"],
      en: ["HTML, CSS, JavaScript", "React / Next.js", "Practical projects", "Professional portfolio"],
      de: ["HTML, CSS, JavaScript", "React / Next.js", "Praktische Projekte", "Professionelles Portfolio"],
    },
    fullDescription: {
      sq: [
        "Kursi Web Developer të përgatit për të punuar si zhvillues web profesional. Mbulon teknologjitë më të kërkuara: HTML5, CSS3, JavaScript, React dhe Next.js.",
        "Çdo modul përfundon me një projekt praktik që mund ta shtosh në portofolin tënd. Mëso nga zero deri në nivel të avancuar.",
        "Pas përfundimit, do të kesh aftësi për të krijuar faqe web, landing pages dhe aplikacione moderne. Ideale për karrierë në tech ose për projekte të veta.",
      ],
      en: [
        "The Web Developer Course prepares you to work as a professional web developer. It covers the most in-demand technologies: HTML5, CSS3, JavaScript, React and Next.js.",
        "Each module ends with a practical project you can add to your portfolio. Learn from scratch to advanced level.",
        "Upon completion, you will have the skills to create websites, landing pages and modern applications. Ideal for a career in tech or for your own projects.",
      ],
      de: [
        "Der Web-Entwickler-Kurs bereitet Sie auf die Arbeit als professioneller Webentwickler vor. Er deckt die gefragtesten Technologien ab: HTML5, CSS3, JavaScript, React und Next.js.",
        "Jedes Modul endet mit einem praktischen Projekt, das Sie zu Ihrem Portfolio hinzufügen können. Lernen Sie von Grund auf bis zum fortgeschrittenen Niveau.",
        "Nach Abschluss haben Sie die Fähigkeiten, Websites, Landing Pages und moderne Anwendungen zu erstellen. Ideal für eine Karriere in der Tech-Branche oder für eigene Projekte.",
      ],
    },
  },
  {
    slug: "bazat-e-tik",
    comingSoon: true,
    title: {
      sq: "Bazat e TIK-ut",
      en: "ICT Basics",
      de: "ICT-Grundlagen",
    },
    shortDesc: {
      sq: "Mëso bazat e teknologjisë së informacionit dhe komunikimit. Kompjuteri, interneti dhe aplikacionet.",
      en: "Learn the basics of information and communication technology. Computer, internet and applications.",
      de: "Lernen Sie die Grundlagen der Informations- und Kommunikationstechnologie. Computer, Internet und Anwendungen.",
    },
    price: "Së shpejti",
    duration: {
      sq: "Së shpejti",
      en: "Coming soon",
      de: "Demnächst",
    },
    stats: [
      { value: "—", label: { sq: "module", en: "modules", de: "Module" } },
      { value: "—", label: { sq: "orë", en: "hours", de: "Stunden" } },
      { value: "—", label: { sq: "nivel", en: "level", de: "Niveau" } },
    ],
    highlights: {
      sq: ["Kompjuteri dhe sistemi operativ", "Internet dhe siguria", "Aplikacione zyrtare", "Përdorim praktik"],
      en: ["Computer and operating system", "Internet and security", "Office applications", "Practical use"],
      de: ["Computer und Betriebssystem", "Internet und Sicherheit", "Office-Anwendungen", "Praktische Nutzung"],
    },
    fullDescription: {
      sq: [
        "Trajnimi Bazat e TIK-ut u drejtohet fillestarëve që duan të mësojnë përdorimin e kompjuterit dhe teknologjisë së informacionit.",
        "Mbulon tematikat themelore: sistemi operativ, interneti, siguria në linjë dhe aplikacionet e zakonshme zyrtare.",
        "Programi do të nisë së shpejti. Regjistrohu për të marrë njoftim kur të hapet.",
      ],
      en: [
        "The ICT Basics training is aimed at beginners who want to learn how to use computers and information technology.",
        "It covers fundamental topics: operating system, internet, online security and common office applications.",
        "The programme will start soon. Register to be notified when it opens.",
      ],
      de: [
        "Das ICT-Grundlagen-Training richtet sich an Anfänger, die den Umgang mit Computern und Informationstechnologie lernen möchten.",
        "Es deckt grundlegende Themen ab: Betriebssystem, Internet, Onlinesicherheit und gängige Office-Anwendungen.",
        "Das Programm startet demnächst. Melden Sie sich an, um benachrichtigt zu werden, wenn es beginnt.",
      ],
    },
  },
];

export const TRAINING_SLUGS: TrainingSlug[] = TRAININGS.map((t) => t.slug);

export function getTrainingBySlug(slug: string): Training | undefined {
  return TRAININGS.find((t) => t.slug === slug);
}
