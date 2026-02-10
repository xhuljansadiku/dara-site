// app/[locale]/page.tsx - Localised home page for sq/en/de
import Image from "next/image";
import { use } from "react";
import NewsletterForm from "@/components/NewsletterForm";
import LocaleLink from "@/components/site/LocaleLink";

type Locale = "sq" | "en" | "de";

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; titleA: string; titleB: string; desc: string; ctaPrimary: string; ctaSecondary: string }
> = {
  sq: {
    kicker: "DARA MARKETING AGENCY",
    titleA: "Guxo të jesh",
    titleB: "ndryshe",
    desc: "Ndihmojmë bizneset të kthejnë ndjekësit në shitje përmes strategjisë, përmbajtjes dhe marketingut me performancë.",
    ctaPrimary: "Na kontakto",
    ctaSecondary: "Shërbimet",
  },
  en: {
    kicker: "DARA MARKETING AGENCY",
    titleA: "Dare to be",
    titleB: "different",
    desc: "We bring brand stories to life through bold strategies and results‑oriented marketing.",
    ctaPrimary: "Contact us",
    ctaSecondary: "Services",
  },
  de: {
    kicker: "DARA MARKETING AGENCY",
    titleA: "Wage es,",
    titleB: "anders zu sein",
    desc: "Wir bringen Marken mit mutigen Strategien und ergebnisorientiertem Marketing nach vorne.",
    ctaPrimary: "Kontaktiere uns",
    ctaSecondary: "Leistungen",
  },
};

const ABOUT_BY_LOCALE: Record<Locale, { kicker: string; title: string; paragraphs: string[]; readMore: string }> = {
  sq: {
    kicker: "Rreth meje",
    title: "Përshëndetje! Unë jam Red",
    paragraphs: [
      "Jam Red, themeluese e DARA Marketing Agency, një mendje kreative me pasion të thellë për marketingun dhe biznesin. Me 7 vite eksperiencë kam mësuar se suksesi nuk vjen nga ndjekja e rregullave, por nga guximi për të qenë ndryshe.",
      "E udhëhequr nga filozofia “Guxo të jesh ndryshe”, besoj se çdo brand ka një histori unike për të treguar. Misioni im është ta sjell këtë histori në jetë përmes strategjive të guximshme dhe kreative. Për mua, marketingu nuk është thjesht profesion — është mënyra për të krijuar ndikim real dhe për të sfiduar të zakonshmen.",
      "Gjithmonë në kërkim të mundësive të reja, kombinoj intuitën, kreativitetin dhe një vizion të qartë për të ndihmuar bizneset të rriten dhe të kthehen në histori suksesi.",
    ],
    readMore: "Lexo më shumë",
  },
  en: {
    kicker: "About me",
    title: "Hello! My name is Red",
    paragraphs: [
      "I'm Red, the founder of DARA Marketing Agency, a creative mind with a deep passion for marketing and business. With 7 years of experience, I've learned that success doesn't come from following the rules, but from daring to be different.",
      "Driven by the philosophy “Dare to be Different”, I believe every brand has a unique story to tell. My mission is to bring those stories to life through bold and innovative strategies. For me, marketing is more than a profession — it's a way to create real impact and challenge the ordinary.",
      "Always seeking new opportunities, I combine intuition, creativity and a clear vision to help businesses grow and turn into success stories.",
    ],
    readMore: "Read more",
  },
  de: {
    kicker: "Über mich",
    title: "Hallo! Ich bin Red",
    paragraphs: [
      "Ich bin Red, Gründerin der DARA Marketing Agency, ein kreativer Kopf mit großer Leidenschaft für Marketing und Business. Mit 7 Jahren Erfahrung habe ich gelernt, dass echter Erfolg nicht daraus entsteht, Regeln zu folgen, sondern den Mut zu haben, anders zu sein.",
      "Geleitet von der Philosophie „Wage es, anders zu sein“ glaube ich, dass jede Marke eine einzigartige Geschichte zu erzählen hat. Meine Mission ist es, diese Geschichten durch mutige und innovative Strategien zum Leben zu erwecken. Für mich ist Marketing mehr als ein Beruf – es ist eine Art, echten Impact zu schaffen und das Gewohnte zu hinterfragen.",
      "Stets auf der Suche nach neuen Chancen kombiniere ich Intuition, Kreativität und eine klare Vision, um Unternehmen beim Wachsen zu unterstützen und sie in Erfolgsgeschichten zu verwandeln.",
    ],
    readMore: "Mehr erfahren",
  },
};

const SERVICES_BY_LOCALE: Record<Locale, { title: string; desc: string; price?: string }[]> = {
  sq: [
    {
      title: "Menaxhim i rrjeteve sociale",
      desc: "Strategji përmbajtjeje, krijim postimesh, planifikim dhe analizë performance për rritje të prezencës dhe angazhimit.",
      price: "Nga 250€ / muaj",
    },
    {
      title: "Krijim përmbajtjeje",
      desc: "Foto, video, reels dhe materiale kreative që reflektojnë identitetin e brand-it dhe tërheqin audiencën e duhur.",
    },
    {
      title: "Strategji marketingu digjital",
      desc: "Analizë biznesi dhe ndërtim strategjie të personalizuar për rritje reale — pozicionim, objektiva dhe ide konkrete zhvillimi.",
      price: "Nga 300€ / strategji",
    },
    {
      title: "Branding & identitet vizual",
      desc: "Krijim ose rifreskim i identitetit të brand-it — logo, udhëzues vizual, tone komunikimi dhe imazh profesional.",
    },
    {
      title: "Menaxhim reklamash (Meta & Google)",
      desc: "Krijim dhe optimizim fushatash reklamash në Meta & Google për rritje shitjesh, lead‑esh dhe njohje brand-i.",
      price: "Nga 150€ / muaj (pa buxhetin e reklamës)",
    },
    {
      title: "Konsulencë marketingu",
      desc: "Konsulencë strategjike për biznese ose individë që duan të rrisin performancën dhe të qartësojnë drejtimin e marketingut.",
      price: "Nga 80€ / seancë",
    },
    {
      title: "Trajnime marketingu & rrjete sociale",
      desc: "Trajnime praktike për biznese dhe individë që duan të mësojnë marketingun, rrjetet sociale dhe strategjitë digjitale.",
      price: "Nga 250€ / program",
    },
    {
      title: "Website, E‑commerce & SaaS",
      desc: "Website, e‑commerce dhe produkte software të personalizuara për individë ose kompani.",
    },
  ],
  en: [
    {
      title: "Social Media Management",
      desc: "Content strategy, post creation, planning and performance analysis to increase brand presence and engagement.",
      price: "From €250/month",
    },
    {
      title: "Content Creation",
      desc: "Photos, videos, reels and creative materials to reflect brand identity and attract the right audience.",
    },
    {
      title: "Digital Marketing Strategy",
      desc: "Business analysis and personalized strategy for real growth — positioning, objectives and concrete ideas.",
      price: "From €300/strategy",
    },
    {
      title: "Branding & Visual Identity",
      desc: "Logo, visual guidelines, communication tone and professional image for a strong market presence.",
    },
    {
      title: "Ads Management (Meta & Google)",
      desc: "Creation and optimisation of Meta & Google campaigns to increase sales, leads and brand recognition.",
      price: "From €150/month (ad spend not included)",
    },
    {
      title: "Marketing Consulting",
      desc: "Strategic consulting to increase performance, clarify direction and make smarter decisions.",
      price: "From €80/session",
    },
    {
      title: "Marketing & Social Media Training",
      desc: "Practical training on marketing, social media and digital strategies in an applicable, hands‑on way.",
      price: "From €250/program",
    },
    {
      title: "Website, E‑commerce & SaaS",
      desc: "Custom websites, e‑commerce and software products for individuals or companies.",
    },
  ],
  de: [
    {
      title: "Social Media Management",
      desc: "Content‑Strategie, Beitragserstellung, Planung und Performance‑Analyse, um Reichweite und Engagement der Marke zu steigern.",
      price: "Ab 250€ / Monat",
    },
    {
      title: "Content Creation",
      desc: "Fotos, Videos, Reels und kreative Inhalte, die die Markenidentität widerspiegeln und die richtige Zielgruppe anziehen.",
    },
    {
      title: "Digitale Marketingstrategie",
      desc: "Business‑Analyse und individuelle Strategie für echtes Wachstum – Positionierung, Ziele und konkrete Maßnahmen.",
      price: "Ab 300€ / Strategie",
    },
    {
      title: "Branding & visuelle Identität",
      desc: "Entwicklung oder Refresh der Markenidentität – Logo, Styleguide, Tonalität und professionelles Markenbild.",
    },
    {
      title: "Ads Management (Meta & Google)",
      desc: "Erstellung und Optimierung von Kampagnen auf Meta & Google, um Verkäufe, Leads und Markenbekanntheit zu steigern.",
      price: "Ab 150€ / Monat (exkl. Media‑Budget)",
    },
    {
      title: "Marketing‑Beratung",
      desc: "Strategische Beratung für Unternehmen oder Einzelpersonen, die ihre Performance steigern und ihren Marketingkurs klären möchten.",
      price: "Ab 80€ / Session",
    },
    {
      title: "Marketing‑ & Social‑Media‑Trainings",
      desc: "Praxisnahe Trainings für Unternehmen und Einzelpersonen zu Marketing, Social Media und digitalen Strategien.",
      price: "Ab 250€ / Programm",
    },
    {
      title: "Website, E‑Commerce & SaaS",
      desc: "Individuelle Websites, E‑Commerce‑Lösungen und Softwareprodukte für Privatpersonen oder Unternehmen.",
    },
  ],
};

const PROJECTS_BY_LOCALE: Record<Locale, { title: string; tag: string; desc: string }[]> = {
  sq: [
    {
      title: "Don Mare Hotel & Restaurant",
      tag: "Social Media",
      desc: "Hotel dhe restorant komod në Dhërmi. Ndërtuam prezencën në rrjetet sociale për të tërhequr klientë të rinj.",
    },
    {
      title: "355 Black",
      tag: "Social Media",
      desc: "Dyqan telefoni dhe aksesorësh në Tiranë. Rritëm prezencën në rrjete sociale dhe angazhimin e audiencës.",
    },
    {
      title: "Aia Hotel & Apartments",
      tag: "Social Media",
      desc: "Hotel & apartamente në Tiranë. Forcuam prezencën e tyre digjitale për më shumë rezervime.",
    },
    {
      title: "Zorada",
      tag: "Social Media",
      desc: "Brand bizhuterish premium. Krijuam përmbajtje që thekson elegancën dhe ekskluzivitetin.",
    },
    {
      title: "City Fitness Club",
      tag: "Social Media",
      desc: "Palestër në Tiranë. Ndërtuam sistem përmbajtjeje që angazhon dhe sjell anëtarë të rinj.",
    },
    {
      title: "Cara Dental Clinic",
      tag: "Social Media",
      desc: "Klinikë dentare në Tiranë. Ndihmuam në rritjen e besueshmërisë dhe kërkesave të pacientëve online.",
    },
    {
      title: "Premium International Real Estate",
      tag: "Social Media",
      desc: "Agjenci për prona luksoze. Krijuam prezencë që flet me klientët me vlerë të lartë.",
    },
    {
      title: "Nova Real Estate",
      tag: "Social Media",
      desc: "Agjenci imobiliare. Përmirësuam komunikimin vizual dhe gjenerimin e lead‑eve.",
    },
    {
      title: "Icon Store",
      tag: "Social Media",
      desc: "Dyqan mode & aksesorësh. Rritëm reach dhe shitjet përmes përmbajtjes kreative.",
    },
    {
      title: "DD Store",
      tag: "Social Media",
      desc: "Veshje për gra. Optimizuam komunikimin vizual për audiencën femërore.",
    },
    {
      title: "KOA Consulting",
      tag: "Social Media & Logo",
      desc: "Kompani konsulence financiare. Krijuam identitet vizual dhe komunikim profesional.",
    },
    {
      title: "Endis Store",
      tag: "Brand Identity",
      desc: "Dyqan me produkte premium. Ndërtuam identitet të fortë brand‑i dhe prezencë online.",
    },
    {
      title: "Taxi Service Dhermi",
      tag: "Web Design",
      desc: "Shërbim taksie në Dhërmi. Krijuam website të thjeshtë dhe miqësor për rezervime online.",
    },
  ],
  en: [
    {
      title: "Don Mare Hotel & Restaurant",
      tag: "Social Media",
      desc: "A cosy hotel and restaurant in Dhermi. We shaped their social presence to attract new guests.",
    },
    {
      title: "355 Black",
      tag: "Social Media",
      desc: "Mobile phones & accessories store in Tirana. We improved their social media presence and engagement.",
    },
    {
      title: "Aia Hotel & Apartments",
      tag: "Social Media",
      desc: "Hotel & apartments in Tirana. We strengthened their digital presence to drive more bookings.",
    },
    {
      title: "Zorada",
      tag: "Social Media",
      desc: "Premium jewellery brand. We created content that highlights their unique and elegant pieces.",
    },
    {
      title: "City Fitness Club",
      tag: "Social Media",
      desc: "Fitness club in Tirana. We built a content system that engages and brings in new members.",
    },
    {
      title: "Cara Dental Clinic",
      tag: "Social Media",
      desc: "Dental clinic in Tirana. We helped increase trust and patient enquiries through social media.",
    },
    {
      title: "Premium International Real Estate",
      tag: "Social Media",
      desc: "Luxury real estate agency. We strengthened their presence towards high‑value clients.",
    },
    {
      title: "Nova Real Estate",
      tag: "Social Media",
      desc: "Real estate agency. We improved their visual communication and lead generation.",
    },
    {
      title: "Icon Store",
      tag: "Social Media",
      desc: "Fashion & lifestyle store. We increased reach and sales through creative content.",
    },
    {
      title: "DD Store",
      tag: "Social Media",
      desc: "Women’s clothing store. We optimised their content for a fashion‑forward audience.",
    },
    {
      title: "KOA Consulting",
      tag: "Social Media & Logo",
      desc: "Financial consulting company. We created their visual identity and professional presence.",
    },
    {
      title: "Endis Store",
      tag: "Brand Identity",
      desc: "Premium products store. We developed a strong brand identity and online presence.",
    },
    {
      title: "Taxi Service Dhermi",
      tag: "Web Design",
      desc: "Taxi service in Dhermi. We designed an easy‑to‑use website for online bookings.",
    },
  ],
  de: [
    {
      title: "Don Mare Hotel & Restaurant",
      tag: "Social Media",
      desc: "Gemütliches Hotel und Restaurant in Dhërmi. Wir haben ihren Social‑Media‑Auftritt für mehr Gäste optimiert.",
    },
    {
      title: "355 Black",
      tag: "Social Media",
      desc: "Handy‑ und Zubehörshop in Tirana. Wir haben ihre Präsenz und das Engagement in sozialen Medien gesteigert.",
    },
    {
      title: "Aia Hotel & Apartments",
      tag: "Social Media",
      desc: "Hotel & Apartments in Tirana. Wir haben ihre digitale Präsenz gestärkt, um mehr Buchungen zu erzielen.",
    },
    {
      title: "Zorada",
      tag: "Social Media",
      desc: "Premium‑Schmuckmarke. Wir entwickelten Content, der die Eleganz und Einzigartigkeit der Stücke zeigt.",
    },
    {
      title: "City Fitness Club",
      tag: "Social Media",
      desc: "Fitnessstudio in Tirana. Wir bauten ein Content‑System auf, das Mitglieder gewinnt und bindet.",
    },
    {
      title: "Cara Dental Clinic",
      tag: "Social Media",
      desc: "Zahnklinik in Tirana. Wir erhöhten Vertrauen und Anfragen durch gezieltes Social‑Media‑Marketing.",
    },
    {
      title: "Premium International Real Estate",
      tag: "Social Media",
      desc: "Agentur für Luxusimmobilien. Wir stärkten die Marke gegenüber anspruchsvollen Käufern und Investoren.",
    },
    {
      title: "Nova Real Estate",
      tag: "Social Media",
      desc: "Immobilienagentur. Wir verbesserten die visuelle Kommunikation und Lead‑Generierung.",
    },
    {
      title: "Icon Store",
      tag: "Social Media",
      desc: "Mode‑ und Lifestyle‑Store. Wir steigerten Reichweite und Verkäufe mit kreativem Content.",
    },
    {
      title: "DD Store",
      tag: "Social Media",
      desc: "Mode für Frauen. Wir optimierten den Auftritt für eine modebewusste Zielgruppe.",
    },
    {
      title: "KOA Consulting",
      tag: "Social Media & Logo",
      desc: "Beratungsunternehmen im Finanzbereich. Wir entwickelten ihre visuelle Identität und Online‑Präsenz.",
    },
    {
      title: "Endis Store",
      tag: "Brand Identity",
      desc: "Store für Premium‑Produkte. Wir bauten eine starke Markenidentität und Social‑Media‑Präsenz auf.",
    },
    {
      title: "Taxi Service Dhermi",
      tag: "Webdesign",
      desc: "Taxi‑Service in Dhërmi. Wir gestalteten eine benutzerfreundliche Website für Online‑Buchungen.",
    },
  ],
};

const CTA_BY_LOCALE: Record<Locale, { title: string; subtitle: string; button: string }> = {
  sq: {
    title: "Le të punojmë bashkë dhe të krijojmë diçka të madhe",
    subtitle: "Na shkruaj për një audit të shpejtë ose për një plan konkret rritjeje.",
    button: "Na kontakto",
  },
  en: {
    title: "Let’s work together and create something great",
    subtitle: "Reach out for a quick audit or a clear growth plan tailored to your business.",
    button: "Get in touch",
  },
  de: {
    title: "Lass uns gemeinsam etwas Großartiges aufbauen",
    subtitle: "Melde dich für ein schnelles Audit oder einen klaren Wachstumsplan für dein Unternehmen.",
    button: "Kontaktiere uns",
  },
};

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeFromParams } = use(params);
  const currentLocale = (localeFromParams as Locale) || "sq";
  const locale: Locale = ["sq", "en", "de"].includes(currentLocale) ? currentLocale : "sq";

  const hero = HERO_BY_LOCALE[locale];
  const about = ABOUT_BY_LOCALE[locale];
  const services = SERVICES_BY_LOCALE[locale];
  const projects = PROJECTS_BY_LOCALE[locale];
  const cta = CTA_BY_LOCALE[locale];

  return (
    <>
      {/* HERO - Dare To Be Different / Dara Marketing Agency */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#c8a55c]/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#c8a55c]/5 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-px w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#c8a55c]/30 to-transparent" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.25em] text-[#c8a55c]">
            {hero.kicker}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
            DARA Marketing Agency
          </p>

          <h1 className="mt-8 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            {hero.titleA} <span className="text-[#c8a55c]">{hero.titleB}</span>
          </h1>

          <p className="mt-6 text-base text-white/60 md:text-lg">{hero.desc}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <a href="https://instagram.com/daramarketing.eu" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c] transition-colors">
              @daramarketing.eu
            </a>
            <span className="text-white/30">|</span>
            <a href="https://instagram.com/daramarketing.al" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c] transition-colors">
              @daramarketing.al
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#c8a55c] px-8 font-medium text-black hover:bg-[#b6944f] sm:w-auto"
            >
              {hero.ctaPrimary}
            </LocaleLink>

            <LocaleLink
              href="#services"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 text-white/90 backdrop-blur hover:border-[#c8a55c]/40 hover:bg-white/10 sm:w-auto"
            >
              {hero.ctaSecondary}
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* ABOUT - HELLO! MY NAME IS RED */}
      <section id="about" className="py-12 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]">{about.kicker}</p>

            <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
              {about.title}
            </h2>

            <div className="mt-6 space-y-4 text-base text-white/70 md:text-lg">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <LocaleLink
                href="/about"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
              >
                {about.readMore}
              </LocaleLink>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl md:max-w-sm">
              <Image
                src="/red-portrait.png"
                alt="Red - Founder of DARA Marketing Agency"
                width={400}
                height={500}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">
          {locale === "sq" ? "Shërbime" : locale === "de" ? "Leistungen" : "Services"}
        </p>

        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
          {locale === "sq" && (
            <>
              Çfarë{" "}
              <span className="text-[#c8a55c]">
                ofrojmë
              </span>
            </>
          )}
          {locale === "en" && (
            <>
              What we <span className="text-[#c8a55c]">offer</span>
            </>
          )}
          {locale === "de" && (
            <>
              Was wir <span className="text-[#c8a55c]">anbieten</span>
            </>
          )}
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#c8a55c]/30"
            >
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>
              {s.price && (
                <p className="mt-4 text-sm font-medium text-[#c8a55c]">
                  {locale === "sq"
                    ? "Çmim orientues:"
                    : locale === "de"
                    ? "Ungefährer Preis:"
                    : "Indicative:"}{" "}
                  {s.price}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <LocaleLink
            href="/services"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
          >
            {locale === "sq"
              ? "Shiko të gjitha shërbimet"
              : locale === "de"
              ? "Alle Leistungen ansehen"
              : "View all services"}
          </LocaleLink>
        </div>
      </section>

      {/* PREVIOUS PROJECTS */}
      <section id="work" className="py-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">
          {locale === "sq" ? "Disa projekte" : locale === "de" ? "Ausgewählte Projekte" : "Previous projects"}
        </p>

        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
          {locale === "sq" && (
            <>
              Puna jonë <span className="text-[#c8a55c]">e zgjedhur</span>
            </>
          )}
          {locale === "en" && (
            <>
              Our <span className="text-[#c8a55c]">work</span>
            </>
          )}
          {locale === "de" && (
            <>
              Unsere <span className="text-[#c8a55c]">Arbeiten</span>
            </>
          )}
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#c8a55c]/30"
            >
              <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60">
                {p.tag}
              </span>
              <h3 className="mt-3 font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-white/60">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <LocaleLink
            href="/work"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
          >
            {locale === "sq"
              ? "Shiko të gjitha projektet"
              : locale === "de"
              ? "Alle Projekte ansehen"
              : "View all projects"}
          </LocaleLink>
        </div>
      </section>

      {/* CTA - LET'S WORK TOGETHER */}
      <section className="py-12 md:py-20">
        <div className="rounded-3xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-8 md:p-12">
          <h2 className="text-2xl font-semibold md:text-4xl">
            {cta.title}
          </h2>

          <div className="mt-4 text-sm text-white/80">
            <p>{cta.subtitle}</p>
          </div>

          <div className="mt-6 space-y-2 text-sm text-white/80">
            <p>
              <a href="mailto:daramarketing.eu@gmail.com" className="hover:text-[#c8a55c]">daramarketing.eu@gmail.com</a>
              {" · "}
              <a href="tel:+355688009988" className="hover:text-[#c8a55c]">+355 68 800 9988</a>
            </p>
            <p>
              <a
                href="https://maps.google.com/?q=Rruga+Donika+Kastrioti,+Bllok,+Tirane,+Albania"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#c8a55c]"
              >
                Rruga Donika Kastrioti, Bllok, Tirane, Albania
              </a>
            </p>
            <p>
              <a href="https://instagram.com/daramarketing.eu" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c]">Instagram</a>
              {" · "}
              <a href="https://facebook.com/daramarketing.eu" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c]">Facebook</a>
              {" · "}
              <a href="https://linkedin.com/company/daramarketing" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c]">LinkedIn</a>
            </p>
          </div>

          <div className="mt-8 max-w-xl">
            <NewsletterForm />
          </div>

          <p className="mt-3 text-xs text-white/50">No spam. Unsubscribe anytime.</p>

          <div className="mt-6">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#c8a55c] px-6 font-medium text-black hover:bg-[#b6944f]"
            >
              {cta.button}
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
