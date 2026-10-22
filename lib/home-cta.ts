type Locale = "sq" | "en" | "de";

/** Copy for the homepage closing "let us talk" section. */
export const CTA_BY_LOCALE: Record<
  Locale,
  {
    title: string;
    titleAccent: string;
    subtitle: string;
    button: string;
    stepsTitle: string;
    steps: string[];
    needTitle: string;
    need: string;
    newsletterNote: string;
  }
> = {
  sq: {
    title: "Le të flasim për",
    titleAccent: "projektin tuaj",
    subtitle: "Kërkoni ofertë për një website, dyqan online, fushatë ose audit të prezencës suaj digjitale.",
    button: "Kërko ofertë",
    stepsTitle: "Çfarë ndodh pasi dërgoni kërkesën",
    steps: [
      "Plotësoni formularin e shkurtër (rreth 2 minuta).",
      "Ju kthejmë përgjigje brenda 24 orëve, me pyetje nëse na mungon diçka.",
      "Merrni një plan të shkurtër me scope-in, afatet dhe ofertën. Pa angazhim.",
    ],
    needTitle: "Çfarë na ndihmon",
    need: "Linku i website-it ose rrjeteve sociale, qëllimi kryesor dhe, nëse e keni, një buxhet orientues.",
    newsletterNote: "Pa spam. Çabonohuni kur të doni.",
  },
  en: {
    title: "Let’s talk about",
    titleAccent: "your project",
    subtitle: "Request a quote for a website, online store, campaign or an audit of your digital presence.",
    button: "Request a quote",
    stepsTitle: "What happens after you send a request",
    steps: [
      "Fill in the short form (about 2 minutes).",
      "We reply within 24 hours, with questions if anything is missing.",
      "You receive a short plan with scope, timeline and a quote. No commitment.",
    ],
    needTitle: "What helps us",
    need: "A link to your website or social profiles, your main goal and, if you have one, an indicative budget.",
    newsletterNote: "No spam. Unsubscribe anytime.",
  },
  de: {
    title: "Sprechen wir über",
    titleAccent: "Ihr Projekt",
    subtitle: "Fragen Sie ein Angebot für Website, Online-Shop, Kampagne oder ein Audit Ihres digitalen Auftritts an.",
    button: "Angebot anfragen",
    stepsTitle: "Was nach Ihrer Anfrage passiert",
    steps: [
      "Sie füllen das kurze Formular aus (ca. 2 Minuten).",
      "Wir melden uns innerhalb von 24 Stunden, mit Rückfragen, falls etwas fehlt.",
      "Sie erhalten einen kurzen Plan mit Umfang, Zeitrahmen und Angebot. Unverbindlich.",
    ],
    needTitle: "Was uns hilft",
    need: "Ein Link zu Ihrer Website oder Ihren Social-Media-Profilen, Ihr Hauptziel und, falls vorhanden, ein Budgetrahmen.",
    newsletterNote: "Kein Spam. Jederzeit abmelden.",
  },
};

export const CONTACT_LABEL: Record<Locale, string> = { sq: "Kontakt", en: "Contact", de: "Kontakt" };
