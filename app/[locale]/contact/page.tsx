// app/[locale]/contact/page.tsx
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { SERVICE_SLUGS, SERVICE_DETAILS_BY_LOCALE, SERVICE_MIN_PRICE_EUR, type Locale } from "@/lib/services-data";
import { BUDGET_OPTIONS, BUDGET_TIERS_EUR } from "@/lib/budget-prices";
import { GENERIC_ERROR_MESSAGES, NETWORK_ERROR_MESSAGES } from "@/lib/api-errors";
import { CONTACT, RESPONSE_TIME } from "@/lib/business-facts";
import NewsletterForm from "@/components/NewsletterForm";

// Services shown in contact form (exclude training - has its own form at /trainings/register)
const CONTACT_SERVICE_SLUGS = SERVICE_SLUGS.filter((s) => s !== "training");
/** Pseudo-service for visitors who do not know yet which service they need. */
const NOT_SURE = "not-sure";
const LEADS_ENDPOINT = "/api/leads";

type Status = "idle" | "loading" | "error";
type Captcha = { a: number; b: number; op: "+" | "-" | "×" };

/** Simple arithmetic check, created when the visitor reaches the last question. */
function makeCaptcha(): Captcha {
  const ops = ["+", "-", "×"] as const;
  const x = Math.floor(Math.random() * 9) + 2;
  const y = Math.floor(Math.random() * 9) + 2;
  const op = ops[Math.floor(Math.random() * ops.length)];
  return op === "-" ? { a: Math.max(x, y), b: Math.min(x, y), op } : { a: x, b: y, op };
}

function solveCaptcha({ a, b, op }: Captcha) {
  return op === "+" ? a + b : op === "-" ? a - b : a * b;
}

/**
 * A budget tier fits a service if the service can start within it, i.e. the tier's upper bound
 * is above the starting price (e.g. "€500–€1,000" fits a shop from €800). Index 0 = "Not sure".
 */
function budgetTierFits(tierIndex: number, minPrice: number) {
  if (tierIndex === 0) return true;
  const upper = BUDGET_TIERS_EUR[tierIndex + 1] ?? Number.POSITIVE_INFINITY;
  return upper > minPrice;
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const T = {
  sq: {
    kicker: "Kontakt",
    title: "Le të flasim për",
    accent: "projektin tuaj",
    intro: "Disa pyetje të shkurtra, si në chat. Ju kthejmë përgjigje me një plan dhe çmim.",
    reply: "Përgjigje",
    notSure: "Nuk jam i sigurt ende",
    q: {
      name: "Përshëndetje! 👋 Si ju quajnë?",
      email: "Kënaqësi, {name}! Në cilin email t’ju shkruajmë?",
      phone: "Dhe një numër telefoni, nëse duhet t’ju telefonojmë?",
      company: "Si quhet biznesi juaj? (nëse keni)",
      service: "Me çfarë mund t’ju ndihmojmë? Mund të zgjidhni më shumë se një.",
      websiteType: "Çfarë lloj website ju duhet?",
      websitePages: "Sa faqe përafërsisht?",
      websiteSEO: "Ju duhet edhe SEO?",
      websiteFeatures: "Ndonjë funksion të veçantë? (p.sh. blog, rezervime, CRM)",
      ecommerceProducts: "Sa produkte keni përafërsisht?",
      ecommercePayment: "Si do të paguajnë klientët?",
      ecommerceShipping: "Ku do të dërgoni porositë?",
      socialMediaPlatforms: "Në cilat rrjete? (p.sh. Instagram, Facebook, TikTok)",
      socialMediaFrequency: "Sa shpesh doni të postoni?",
      otherServiceDetails: "Na tregoni pak për këtë shërbim.",
      notSureDetails: "Çfarë doni të arrini? (p.sh. më shumë klientë, shitje online, website të ri)",
      budget: "Keni një buxhet orientues?",
      message: "Diçka tjetër që duhet ta dimë? (opsional)",
      review: "Faleminderit! Ja çfarë na shkruat:",
      captcha: "Një kontroll i shpejtë që jeni njeri: sa bën {q}?",
    },
    ph: {
      name: "Emri juaj",
      email: "ju@biznesi.com",
      phone: "+355 6X XXX XXXX",
      company: "Emri i biznesit",
      text: "Shkruani këtu…",
      captcha: "Përgjigja",
    },
    skip: "Kapërce",
    next: "Vazhdo",
    back: "Mbrapa",
    send: "Dërgo kërkesën",
    sending: "Po dërgohet…",
    edit: "Ndrysho",
    errName: "Shkruani emrin (të paktën 2 shkronja).",
    errEmail: "Ky email nuk duket i saktë.",
    errPhone: "Shkruani numrin e telefonit.",
    errService: "Zgjidhni të paktën një shërbim.",
    errCaptcha: "Përgjigja nuk është e saktë. Provoni përsëri.",
    errMessage: "Na shkruani pak më shumë (të paktën 10 shkronja).",
    or: "Preferoni të na shkruani direkt?",
    labels: { name: "Emri", email: "Email", phone: "Telefoni", company: "Biznesi", service: "Shërbimi", budget: "Buxheti", message: "Mesazhi", details: "Detaje", type: "Lloji", pages: "Faqe", products: "Produkte", payment: "Pagesa", shipping: "Transport", platforms: "Rrjetet", frequency: "Frekuenca" },
    opts: {
      websiteType: ["Landing page", "Website me disa faqe", "Të dyja"],
      websiteSEO: ["Po, duhet SEO", "Jo, jo tani", "Nuk jam i sigurt"],
      ecommercePayment: ["Kartë krediti", "PayPal", "Të dyja", "Tjetër"],
      ecommerceShipping: ["Vetëm Shqipëri", "Shqipëri + EU", "Ndërkombëtar", "Nuk jam i sigurt"],
      socialMediaFrequency: ["1-2 herë/javë", "3-5 herë/javë", "Çdo ditë", "Më shumë"],
    },
  },
  en: {
    kicker: "Contact",
    title: "Let’s talk about",
    accent: "your project",
    intro: "A few short questions, like a chat. We’ll reply with a plan and a price.",
    reply: "Reply",
    notSure: "Not sure yet",
    q: {
      name: "Hi! 👋 What’s your name?",
      email: "Nice to meet you, {name}! Which email should we write to?",
      phone: "And a phone number, in case we need to call?",
      company: "What’s your business called? (if you have one)",
      service: "What can we help with? You can pick more than one.",
      websiteType: "What kind of website do you need?",
      websitePages: "Roughly how many pages?",
      websiteSEO: "Do you need SEO as well?",
      websiteFeatures: "Any special features? (e.g. blog, bookings, CRM)",
      ecommerceProducts: "Roughly how many products?",
      ecommercePayment: "How will customers pay?",
      ecommerceShipping: "Where will you ship orders?",
      socialMediaPlatforms: "Which channels? (e.g. Instagram, Facebook, TikTok)",
      socialMediaFrequency: "How often do you want to post?",
      otherServiceDetails: "Tell us a little about it.",
      notSureDetails: "What do you want to achieve? (e.g. more customers, online sales, a new website)",
      budget: "Do you have a rough budget?",
      message: "Anything else we should know? (optional)",
      review: "Thank you! Here’s what you told us:",
      captcha: "A quick check that you’re human: what is {q}?",
    },
    ph: {
      name: "Your name",
      email: "you@business.com",
      phone: "+355 6X XXX XXXX",
      company: "Business name",
      text: "Type here…",
      captcha: "Answer",
    },
    skip: "Skip",
    next: "Continue",
    back: "Back",
    send: "Send request",
    sending: "Sending…",
    edit: "Edit",
    errName: "Please enter your name (at least 2 letters).",
    errEmail: "That email doesn’t look right.",
    errPhone: "Please enter a phone number.",
    errService: "Pick at least one service.",
    errCaptcha: "That answer isn’t right. Please try again.",
    errMessage: "Please tell us a bit more (at least 10 letters).",
    or: "Prefer to write to us directly?",
    labels: { name: "Name", email: "Email", phone: "Phone", company: "Business", service: "Service", budget: "Budget", message: "Message", details: "Details", type: "Type", pages: "Pages", products: "Products", payment: "Payment", shipping: "Shipping", platforms: "Channels", frequency: "Frequency" },
    opts: {
      websiteType: ["Landing page", "Multi-page website", "Both"],
      websiteSEO: ["Yes, need SEO", "No, not now", "Not sure"],
      ecommercePayment: ["Credit card", "PayPal", "Both", "Other"],
      ecommerceShipping: ["Albania only", "Albania + EU", "International", "Not sure"],
      socialMediaFrequency: ["1-2x/week", "3-5x/week", "Daily", "More"],
    },
  },
  de: {
    kicker: "Kontakt",
    title: "Sprechen wir über",
    accent: "Ihr Projekt",
    intro: "Ein paar kurze Fragen, wie im Chat. Wir antworten mit Plan und Preis.",
    reply: "Antwort",
    notSure: "Noch nicht sicher",
    q: {
      name: "Hallo! 👋 Wie heißen Sie?",
      email: "Schön, {name}! An welche E-Mail dürfen wir schreiben?",
      phone: "Und eine Telefonnummer, falls wir anrufen sollen?",
      company: "Wie heißt Ihr Unternehmen? (falls vorhanden)",
      service: "Wobei können wir helfen? Mehrere Antworten möglich.",
      websiteType: "Welche Art Website brauchen Sie?",
      websitePages: "Wie viele Seiten ungefähr?",
      websiteSEO: "Brauchen Sie auch SEO?",
      websiteFeatures: "Besondere Funktionen? (z. B. Blog, Buchungen, CRM)",
      ecommerceProducts: "Wie viele Produkte ungefähr?",
      ecommercePayment: "Wie sollen Kunden bezahlen?",
      ecommerceShipping: "Wohin versenden Sie?",
      socialMediaPlatforms: "Welche Kanäle? (z. B. Instagram, Facebook, TikTok)",
      socialMediaFrequency: "Wie oft möchten Sie posten?",
      otherServiceDetails: "Erzählen Sie uns kurz davon.",
      notSureDetails: "Was möchten Sie erreichen? (z. B. mehr Kunden, Online-Verkauf, neue Website)",
      budget: "Haben Sie ein ungefähres Budget?",
      message: "Noch etwas, das wir wissen sollten? (optional)",
      review: "Danke! Das haben Sie uns geschrieben:",
      captcha: "Kurzer Check, dass Sie ein Mensch sind: Was ist {q}?",
    },
    ph: {
      name: "Ihr Name",
      email: "sie@firma.de",
      phone: "+49 …",
      company: "Firmenname",
      text: "Hier schreiben…",
      captcha: "Antwort",
    },
    skip: "Überspringen",
    next: "Weiter",
    back: "Zurück",
    send: "Anfrage senden",
    sending: "Wird gesendet…",
    edit: "Ändern",
    errName: "Bitte geben Sie Ihren Namen ein (mindestens 2 Buchstaben).",
    errEmail: "Diese E-Mail sieht nicht richtig aus.",
    errPhone: "Bitte geben Sie eine Telefonnummer ein.",
    errService: "Bitte wählen Sie mindestens eine Leistung.",
    errCaptcha: "Die Antwort ist nicht richtig. Bitte erneut versuchen.",
    errMessage: "Bitte schreiben Sie etwas mehr (mindestens 10 Zeichen).",
    or: "Lieber direkt schreiben?",
    labels: { name: "Name", email: "E-Mail", phone: "Telefon", company: "Unternehmen", service: "Leistung", budget: "Budget", message: "Nachricht", details: "Details", type: "Typ", pages: "Seiten", products: "Produkte", payment: "Zahlung", shipping: "Versand", platforms: "Kanäle", frequency: "Häufigkeit" },
    opts: {
      websiteType: ["Landingpage", "Mehrseitige Website", "Beides"],
      websiteSEO: ["Ja, SEO benötigt", "Nein, nicht jetzt", "Nicht sicher"],
      ecommercePayment: ["Kreditkarte", "PayPal", "Beides", "Andere"],
      ecommerceShipping: ["Nur Albanien", "Albanien + EU", "International", "Nicht sicher"],
      socialMediaFrequency: ["1-2x/Woche", "3-5x/Woche", "Täglich", "Mehr"],
    },
  },
} as const;
type Copy = (typeof T)[Locale];

type Data = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string[];
  websiteType: string;
  websitePages: string;
  websiteSEO: string;
  websiteFeatures: string;
  ecommerceProducts: string;
  ecommercePayment: string;
  ecommerceShipping: string;
  socialMediaPlatforms: string;
  socialMediaFrequency: string;
  otherServiceDetails: string;
  budget: string;
  message: string;
};
type Field = Exclude<keyof Data, "service">;

/** One question of the chat. `choices` shows buttons, otherwise a text box; optional questions can be skipped. */
type Question =
  | { key: "service"; kind: "services" }
  | { key: Field; kind: "text" | "email" | "tel" | "textarea"; optional?: boolean; ph: string }
  | { key: Field; kind: "choices"; choices: readonly string[]; optional?: boolean };

function serviceLabel(slug: string, locale: Locale, c: Copy) {
  if (slug === NOT_SURE) return c.notSure;
  const index = SERVICE_SLUGS.findIndex((s) => s === slug);
  return SERVICE_DETAILS_BY_LOCALE[locale]?.[index]?.title.replace(/\s*\n\s*/g, " ") || slug;
}

/** The questions to ask for the current answers: service-specific ones only when a single service is picked. */
function questionsFor(d: Data, c: Copy, budgets: string[]): Question[] {
  const q: Question[] = [
    { key: "name", kind: "text", ph: c.ph.name },
    { key: "email", kind: "email", ph: c.ph.email },
    { key: "phone", kind: "tel", ph: c.ph.phone },
    { key: "company", kind: "text", optional: true, ph: c.ph.company },
    { key: "service", kind: "services" },
  ];
  const only = d.service.length === 1 ? d.service[0] : "";
  if (only === "website-landing") {
    q.push(
      { key: "websiteType", kind: "choices", choices: c.opts.websiteType, optional: true },
      { key: "websitePages", kind: "choices", choices: ["1-3", "4-7", "8-15", "15+"], optional: true },
      { key: "websiteSEO", kind: "choices", choices: c.opts.websiteSEO, optional: true },
      { key: "websiteFeatures", kind: "text", optional: true, ph: c.ph.text }
    );
  } else if (only === "ecommerce") {
    q.push(
      { key: "ecommerceProducts", kind: "choices", choices: ["1-20", "21-50", "51-100", "100+"], optional: true },
      { key: "ecommercePayment", kind: "choices", choices: c.opts.ecommercePayment, optional: true },
      { key: "ecommerceShipping", kind: "choices", choices: c.opts.ecommerceShipping, optional: true }
    );
  } else if (only === "social-media") {
    q.push(
      { key: "socialMediaPlatforms", kind: "text", optional: true, ph: "Instagram, Facebook" },
      { key: "socialMediaFrequency", kind: "choices", choices: c.opts.socialMediaFrequency, optional: true }
    );
  } else if (only) {
    q.push({ key: "otherServiceDetails", kind: "textarea", optional: only !== NOT_SURE, ph: c.ph.text });
  }
  q.push({ key: "budget", kind: "choices", choices: budgets, optional: true }, { key: "message", kind: "textarea", optional: true, ph: c.ph.text });
  return q;
}

const EMPTY: Data = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: [],
  websiteType: "",
  websitePages: "",
  websiteSEO: "",
  websiteFeatures: "",
  ecommerceProducts: "",
  ecommercePayment: "",
  ecommerceShipping: "",
  socialMediaPlatforms: "",
  socialMediaFrequency: "",
  otherServiceDetails: "",
  budget: "",
  message: "",
};

export default function ContactPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as Locale) || "sq";
  const c = T[locale] ?? T.sq;
  // Service pages link here with ?service=<slug> so the visitor does not have to choose again.
  const requested = useSearchParams().get("service") ?? "";
  const [data, setData] = useState<Data>(() => ({
    ...EMPTY,
    service: [...CONTACT_SERVICE_SLUGS, NOT_SURE].includes(requested) ? [requested] : [],
  }));
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [captcha, setCaptcha] = useState<Captcha | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const formLoadedAt = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const started = useRef(false);

  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  // Budgets below the starting price of the chosen services are not offered.
  const minPrice = data.service.reduce((max, s) => Math.max(max, SERVICE_MIN_PRICE_EUR[s as keyof typeof SERVICE_MIN_PRICE_EUR] ?? 0), 0);
  const budgets = BUDGET_OPTIONS[locale].filter((_, i) => budgetTierFits(i, minPrice));
  const questions = questionsFor(data, c, budgets);
  const atReview = step >= questions.length;
  const current = questions[step];

  // Keep the newest message in view and the cursor in the text box (not on first load).
  useEffect(() => {
    if (!started.current) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    inputRef.current?.focus({ preventScroll: true });
  }, [step]);

  const prompt = (key: Question["key"]) =>
    key === "otherServiceDetails" && data.service[0] === NOT_SURE ? c.q.notSureDetails : c.q[key].replace("{name}", data.name.split(" ")[0] || "");

  const shown = (q: Question): string => {
    if (q.key === "service") return data.service.map((s) => serviceLabel(s, locale, c)).join(", ");
    return data[q.key];
  };

  const goNext = () => {
    started.current = true;
    setError(null);
    setDraft("");
    // The anti-bot sum is created when the visitor reaches the summary.
    if (step + 1 >= questions.length) setCaptcha(makeCaptcha());
    setStep((s) => s + 1);
  };

  const answerText = (e?: FormEvent) => {
    e?.preventDefault();
    if (!current || current.kind === "services" || current.kind === "choices") return;
    let value = draft.trim();
    if (current.key === "name") {
      value = value.replace(/[^\p{L}\p{M}\s'’.-]/gu, "").trim();
      if (value.length < 2) return setError(c.errName);
    }
    if (current.key === "email" && !isValidEmail(value)) return setError(c.errEmail);
    if (current.key === "phone" && !value) return setError(c.errPhone);
    if (!value && !current.optional) return;
    setData((d) => ({ ...d, [current.key]: value }));
    goNext();
  };

  const choose = (key: Field, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    goNext();
  };

  const toggleService = (slug: string) =>
    setData((d) => {
      const next = d.service.includes(slug) ? d.service.filter((s) => s !== slug) : [...d.service.filter((s) => s !== NOT_SURE || slug === NOT_SURE), slug];
      const cleaned = slug === NOT_SURE ? [NOT_SURE] : next.filter((s) => s !== NOT_SURE);
      return { ...d, service: cleaned };
    });

  const back = () => {
    setError(null);
    setCaptcha(null);
    setStep((s) => Math.max(0, s - 1));
    const prev = questions[Math.max(0, step - 1)];
    setDraft(prev && prev.key !== "service" ? data[prev.key] : "");
  };

  /** Jump back to a question from the summary. */
  const editAt = (i: number) => {
    setError(null);
    setCaptcha(null);
    setStep(i);
    const q = questions[i];
    setDraft(q && q.key !== "service" ? data[q.key] : "");
  };

  function buildMessage() {
    const L = c.labels;
    const parts: string[] = [];
    if (data.service.length) parts.push(`${L.service}: ${data.service.map((s) => serviceLabel(s, locale, c)).join(", ")}`);
    const add = (label: string, v: string) => v && parts.push(`${label}: ${v}`);
    add(L.type, data.websiteType);
    add(L.pages, data.websitePages);
    add("SEO", data.websiteSEO);
    add(L.details, data.websiteFeatures);
    add(L.products, data.ecommerceProducts);
    add(L.payment, data.ecommercePayment);
    add(L.shipping, data.ecommerceShipping);
    add(L.platforms, data.socialMediaPlatforms);
    add(L.frequency, data.socialMediaFrequency);
    add(L.details, data.otherServiceDetails);
    add(L.budget, data.budget);
    add(L.message, data.message);
    return parts.join("\n");
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!atReview || status === "loading") return;
    // Bot trap: a human cannot answer every question this quickly, so nothing is sent.
    if (Date.now() - formLoadedAt.current < 4000) {
      router.push(`/${locale}/contact/thank-you`);
      return;
    }
    if (!captcha || Number(captchaAnswer.trim()) !== solveCaptcha(captcha)) {
      setError(c.errCaptcha);
      setCaptchaAnswer("");
      setCaptcha(makeCaptcha());
      return;
    }
    const message = buildMessage();
    if (message.length < 10) {
      setError(c.errMessage);
      return;
    }
    const hp = ((e.currentTarget.elements.namedItem("hp") as HTMLInputElement | null)?.value ?? "").trim();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch(LEADS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          company: data.company.trim(),
          budget: data.budget.trim(),
          message,
          hp,
          locale,
        }),
      });
      if (!res.ok) {
        setStatus("error");
        setError(GENERIC_ERROR_MESSAGES[locale]);
        return;
      }
      trackEvent("Contact Form Submit");
      router.push(`/${locale}/contact/thank-you`);
    } catch {
      setStatus("error");
      setError(NETWORK_ERROR_MESSAGES[locale]);
    }
  }

  const us = (text: string, k: string) => (
    <div key={k} className="animate-packages-tab-enter flex justify-start">
      <p className="max-w-[85%] whitespace-pre-line rounded-3xl rounded-bl-md bg-white/10 px-5 py-3 text-[15px] text-white">{text}</p>
    </div>
  );
  const you = (text: string, k: string, i: number) => (
    <div key={k} className="animate-packages-tab-enter flex justify-end">
      <button type="button" onClick={() => editAt(i)} title={c.edit} className="max-w-[85%] rounded-3xl rounded-br-md bg-[#B89D5E] px-5 py-3 text-left text-[15px] text-neutral-950 transition hover:bg-[#d4bd85]">
        {text || "—"}
      </button>
    </div>
  );

  const chip = (on: boolean) =>
    `min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? "border-[#B89D5E] bg-[#B89D5E] text-neutral-950" : "border-white/15 text-white/85 hover:border-white/45"}`;
  const box = "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-[15px] text-white placeholder:text-white/40 outline-none transition focus:border-[#B89D5E]";

  return (
    <section className="min-h-[100svh] bg-neutral-950 px-4 pb-16 pt-28 text-white md:pb-24 md:pt-32">
      <div className="mx-auto max-w-2xl">
        <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">
          <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
          {c.kicker}
        </span>
        <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-6xl">
          {c.title} <span className="text-[#d1b780]">{c.accent}</span>
        </h1>
        <p className="mt-5 text-white/65">
          {c.intro} {c.reply}: {RESPONSE_TIME[locale].toLowerCase()}.
        </p>

        <form onSubmit={submit} className="relative mt-10 space-y-3 rounded-[2rem] bg-white/[0.04] p-4 ring-1 ring-white/10 sm:p-6 md:p-7" aria-live="polite">
          {/* Bot trap: hidden from people, filled in by bots. */}
          <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true" />

          {questions.slice(0, Math.min(step, questions.length)).map((q, i) => (
            <div key={`${q.key}-${i}`} className="space-y-3">
              {us(prompt(q.key), `q-${q.key}`)}
              {you(shown(q), `a-${q.key}`, i)}
            </div>
          ))}

          {!atReview && current && (
            <>
              {us(prompt(current.key), `q-${current.key}-now`)}
              <div className="pt-2">
                {current.kind === "services" ? (
                  <div className="space-y-4">
                    <div role="group" aria-label={c.labels.service} className="flex flex-wrap gap-2">
                      {[...CONTACT_SERVICE_SLUGS, NOT_SURE].map((s) => (
                        <button key={s} type="button" aria-pressed={data.service.includes(s)} onClick={() => toggleService(s)} className={chip(data.service.includes(s))}>
                          {serviceLabel(s, locale, c)}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => (data.service.length ? goNext() : setError(c.errService))}
                      className="h-12 rounded-xl bg-[#B89D5E] px-6 text-sm font-semibold text-neutral-950 transition hover:bg-[#d4bd85]"
                    >
                      {c.next} →
                    </button>
                  </div>
                ) : current.kind === "choices" ? (
                  <div role="group" aria-label={prompt(current.key)} className="flex flex-wrap gap-2">
                    {current.choices.map((o) => (
                      <button key={o} type="button" aria-pressed={data[current.key] === o} onClick={() => choose(current.key, o)} className={chip(data[current.key] === o)}>
                        {o}
                      </button>
                    ))}
                    {current.optional && (
                      <button type="button" onClick={() => choose(current.key, "")} className="min-h-11 rounded-full px-4 text-sm text-white/55 hover:text-white">
                        {c.skip}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    {current.kind === "textarea" ? (
                      <textarea
                        ref={inputRef}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder={current.ph}
                        rows={3}
                        className={`${box} py-3`}
                      />
                    ) : (
                      <input
                        ref={inputRef}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            answerText();
                          }
                        }}
                        type={current.kind}
                        inputMode={current.kind === "tel" ? "tel" : undefined}
                        autoComplete={current.key === "name" ? "name" : current.key === "email" ? "email" : current.key === "phone" ? "tel" : current.key === "company" ? "organization" : "off"}
                        placeholder={current.ph}
                        className={`${box} h-12`}
                      />
                    )}
                    <div className="flex gap-2">
                      {current.optional && !draft.trim() ? (
                        <button type="button" onClick={() => answerText()} className="h-12 shrink-0 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white/75 hover:border-white/45">
                          {c.skip}
                        </button>
                      ) : (
                        <button type="button" onClick={() => answerText()} className="h-12 shrink-0 rounded-xl bg-[#B89D5E] px-5 text-sm font-semibold text-neutral-950 transition hover:bg-[#d4bd85]">
                          {c.next} →
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {atReview && (
            <>
              {us(c.q.review, "review")}
              <dl className="animate-packages-tab-enter grid gap-1 rounded-2xl bg-white/[0.05] p-4 text-sm ring-1 ring-white/10">
                {(
                  [
                    [c.labels.name, data.name],
                    [c.labels.email, data.email],
                    [c.labels.phone, data.phone],
                    [c.labels.company, data.company],
                    [c.labels.service, data.service.map((s) => serviceLabel(s, locale, c)).join(", ")],
                    [c.labels.budget, data.budget],
                  ] as const
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-white/50">{k}</dt>
                      <dd className="text-right font-medium">{v}</dd>
                    </div>
                  ))}
              </dl>
              {captcha && us(c.q.captcha.replace("{q}", `${captcha.a} ${captcha.op} ${captcha.b}`), "captcha")}
              <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                <input
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value.replace(/[^\d-]/g, ""))}
                  inputMode="numeric"
                  placeholder={c.ph.captcha}
                  aria-label={c.ph.captcha}
                  className={`${box} h-12 sm:max-w-[10rem]`}
                />
                <button type="submit" disabled={status === "loading"} className="h-12 flex-1 rounded-xl bg-[#B89D5E] px-6 text-sm font-semibold text-neutral-950 transition hover:bg-[#d4bd85] disabled:opacity-60">
                  {status === "loading" ? c.sending : `${c.send} →`}
                </button>
              </div>
            </>
          )}

          {error && (
            <p role="alert" className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}
          {step > 0 && (
            <button type="button" onClick={back} className="text-sm text-white/45 hover:text-white">
              ← {c.back}
            </button>
          )}
          <div ref={bottomRef} />
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-white/50">{c.or}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
              WhatsApp
            </a>
            <a href={`tel:${CONTACT.phoneE164}`} className="text-white/80 hover:text-white">
              {CONTACT.phoneDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="text-white/80 hover:text-white">
              {CONTACT.email}
            </a>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/55">
            <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
            <a href={CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
            <a href={CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
            <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">{CONTACT.address}</a>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-md rounded-2xl bg-white p-5 text-neutral-950">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em]">Newsletter</p>
          <NewsletterForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
