export type Locale = "sq" | "en" | "de";

export const CAREER_ROLES_BY_LOCALE: Record<Locale, string[]> = {
  sq: ["Graphic Design", "Video Maker", "Social Media Manager"],
  en: ["Graphic Design", "Video Maker", "Social Media Manager"],
  de: ["Grafikdesign", "Video Maker", "Social Media Manager"],
};

export const CAREER_COPY_BY_LOCALE: Record<
  Locale,
  {
    kicker: string;
    title: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    roleLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    cvLabel: string;
    cvHint: string;
    cvRequired: string;
    cvFormatError: string;
    cvSizeError: string;
    submit: string;
    selectRole: string;
  }
> = {
  sq: {
    kicker: "Karrierë",
    title: "Po zgjerojmë ekipin",
    subtitle: "Po kërkojmë njerëz të talentuar për të bashkëpunuar me ne. Apliko për një nga pozicionet e hapura.",
    formTitle: "Apliko tani",
    formSubtitle: "Plotëso formularin dhe do të kontaktojmë së shpejti.",
    nameLabel: "Emri*",
    emailLabel: "Email*",
    phoneLabel: "Telefoni",
    roleLabel: "Pozicioni*",
    messageLabel: "Letër motivimi / Shënime*",
    messagePlaceholder: "Përshkruaj përvojën tënde dhe pse do të donit të bashkëpunosh me ne.",
    cvLabel: "CV (PDF)*",
    cvHint: "Vetëm format PDF. Maks. 5 MB.",
    cvRequired: "Ngarko CV-në tënde (PDF).",
    cvFormatError: "Vetëm skedarë PDF janë të lejuar.",
    cvSizeError: "Skedari është shumë i madh. Maks. 5 MB.",
    submit: "Dërgo aplikimin",
    selectRole: "Zgjidh pozicionin...",
  },
  en: {
    kicker: "Careers",
    title: "We are expanding our team",
    subtitle: "We are looking for talented people to join us. Apply for one of our open positions.",
    formTitle: "Apply now",
    formSubtitle: "Fill in the form and we'll get back to you soon.",
    nameLabel: "Name*",
    emailLabel: "Email*",
    phoneLabel: "Phone",
    roleLabel: "Position*",
    messageLabel: "Cover letter / Notes*",
    messagePlaceholder: "Describe your experience and why you'd like to work with us.",
    cvLabel: "CV (PDF)*",
    cvHint: "PDF format only. Max 5 MB.",
    cvRequired: "Please upload your CV (PDF).",
    cvFormatError: "Only PDF files are allowed.",
    cvSizeError: "File is too large. Max 5 MB.",
    submit: "Submit application",
    selectRole: "Select position...",
  },
  de: {
    kicker: "Karriere",
    title: "Wir erweitern unser Team",
    subtitle: "Wir suchen talentierte Menschen für unser Team. Bewerben Sie sich für eine unserer offenen Stellen.",
    formTitle: "Jetzt bewerben",
    formSubtitle: "Füllen Sie das Formular aus und wir melden uns bald.",
    nameLabel: "Name*",
    emailLabel: "E-Mail*",
    phoneLabel: "Telefon",
    roleLabel: "Position*",
    messageLabel: "Anschreiben / Notizen*",
    messagePlaceholder: "Beschreiben Sie Ihre Erfahrung und warum Sie mit uns arbeiten möchten.",
    cvLabel: "CV (PDF)*",
    cvHint: "Nur PDF-Format. Max 5 MB.",
    cvRequired: "Bitte laden Sie Ihren CV (PDF) hoch.",
    cvFormatError: "Nur PDF-Dateien sind erlaubt.",
    cvSizeError: "Datei ist zu groß. Max 5 MB.",
    submit: "Bewerbung senden",
    selectRole: "Position wählen...",
  },
};
