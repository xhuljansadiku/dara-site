// app/[locale]/services/page.tsx
import LocaleLink from "@/components/site/LocaleLink";
import {
  SERVICE_SLUGS,
  SERVICE_DETAILS_BY_LOCALE,
  type Locale,
} from "@/lib/services-data";
import type { Metadata } from "next";
import { use } from "react";

const HERO_BY_LOCALE: Record<
  Locale,
  { kicker: string; title: string; titleAccent: string; subtitle: string; getQuote: string; viewWork: string }
> = {
  sq: {
    kicker: "Shërbimet",
    title: "Shërbime për ",
    titleAccent: "rezultate",
    subtitle: "Nga rrjete sociale dhe përmbajtje te strategjia, branding, reklama, konsulencë dhe trajnime — kombinojmë çfarë ju nevojitet për të rritur.",
    getQuote: "Merr ofertë",
    viewWork: "Shiko punën",
  },
  en: {
    kicker: "Services",
    title: "Services built for ",
    titleAccent: "results",
    subtitle: "From social media and content to strategy, branding, ads, consulting and training—we combine what you need to grow.",
    getQuote: "Get a quote",
    viewWork: "View our work",
  },
  de: {
    kicker: "Leistungen",
    title: "Leistungen für ",
    titleAccent: "Erfolge",
    subtitle: "Von Social Media und Content über Strategie, Branding, Ads, Beratung und Training—wir kombinieren, was Sie zum Wachstum brauchen.",
    getQuote: "Angebot anfragen",
    viewWork: "Referenzen ansehen",
  },
};

const SECTION_BY_LOCALE: Record<
  Locale,
  { heading: string; subheading: string; priceLabel: string; readMore: string }
> = {
  sq: {
    heading: "Çfarë ofrojmë",
    subheading: "Shërbime modulare — zgjidhni çfarë ju përshtatet.",
    priceLabel: "Çmim referues",
    readMore: "Lexo më shumë",
  },
  en: {
    heading: "What we offer",
    subheading: "Modular services—choose what fits your needs.",
    priceLabel: "Indicative price",
    readMore: "Read more",
  },
  de: {
    heading: "Was wir anbieten",
    subheading: "Modulare Leistungen—wählen Sie, was zu Ihnen passt.",
    priceLabel: "Richtpreis",
    readMore: "Mehr erfahren",
  },
};

const CTA_BY_LOCALE: Record<
  Locale,
  { title: string; titleAccent: string; subtitle: string; getQuote: string; backHome: string }
> = {
  sq: {
    title: "Gati për rritje? ",
    titleAccent: "Le të flasim.",
    subtitle: "Na tregoni qëllimin (lead / shitje / brand) dhe ju kthejmë me një plan të qartë.",
    getQuote: "Merr ofertë",
    backHome: "Kthehu në kryefaqe",
  },
  en: {
    title: "Ready to grow? ",
    titleAccent: "Let's talk.",
    subtitle: "Tell us your goal (leads / sales / brand) and we'll return with a clear plan.",
    getQuote: "Get a quote",
    backHome: "Back to home",
  },
  de: {
    title: "Bereit zu wachsen? ",
    titleAccent: "Lass uns reden.",
    subtitle: "Nennen Sie uns Ihr Ziel (Leads / Verkäufe / Marke) und wir melden uns mit einem klaren Plan.",
    getQuote: "Angebot anfragen",
    backHome: "Zur Startseite",
  },
};

type Props = { params: Promise<{ locale: string }> };

export default function ServicesPage({ params }: Props) {
  const { locale: localeParam } = use(params);
  const locale: Locale = ["sq", "en", "de"].includes(localeParam)
    ? (localeParam as Locale)
    : "sq";

  const hero = HERO_BY_LOCALE[locale];
  const section = SECTION_BY_LOCALE[locale];
  const cta = CTA_BY_LOCALE[locale];
  const services = SERVICE_DETAILS_BY_LOCALE[locale];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">
          {hero.kicker}
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          {hero.title}
          <span className="text-[#c8a55c]">{hero.titleAccent}</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          {hero.subtitle}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LocaleLink
            href="/contact"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#c8a55c] px-5 font-medium text-black transition hover:bg-[#b6944f] sm:w-auto"
          >
            {hero.getQuote}
          </LocaleLink>
          <LocaleLink
            href="/work"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-white/90 transition hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            {hero.viewWork}
          </LocaleLink>
        </div>
      </section>

      {/* SERVICE GRID */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">{section.heading}</h2>
        <p className="mt-2 max-w-2xl text-white/60">{section.subheading}</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {SERVICE_SLUGS.map((slug, i) => {
            const s = services[i];
            if (!s) return null;
            return (
              <LocaleLink
                key={slug}
                href={`/services/${slug}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition hover:border-[#c8a55c]/25 hover:bg-white/[0.08]"
              >
                <h3 className="text-lg font-medium text-white/95 group-hover:text-[#c8a55c]/90">
                  {s.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/60">{s.desc}</p>
                {s.price && (
                  <p className="mt-4 text-sm font-medium text-[#c8a55c]">
                    {section.priceLabel}: {s.price}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#c8a55c]/80 group-hover:text-[#c8a55c]">
                  {section.readMore}
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </span>
              </LocaleLink>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-6 md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            {cta.title}
            <span className="text-[#c8a55c]">{cta.titleAccent}</span>
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">{cta.subtitle}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#c8a55c] px-5 font-medium text-black transition hover:bg-[#b6944f] sm:w-auto"
            >
              {cta.getQuote}
            </LocaleLink>
            <LocaleLink
              href="/"
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-white/90 transition hover:border-white/25 hover:bg-white/10 sm:w-auto"
            >
              {cta.backHome}
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}

const META_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  sq: {
    title: "Shërbimet",
    description:
      "Menaxhim rrjeteve sociale, krijim përmbajtjeje, strategji, branding, reklama, konsulencë, trajnime — website & landing, e-commerce dhe SaaS të personalizuar.",
  },
  en: {
    title: "Services",
    description:
      "Social Media Management, Content Creation, Strategy, Branding, Ads, Consulting, Training — website & landing pages, e-commerce and custom SaaS.",
  },
  de: {
    title: "Leistungen",
    description:
      "Social-Media-Management, Content-Erstellung, Strategie, Branding, Ads, Beratung, Training — Website & Landingpages, E-Commerce und individuelle SaaS.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = ["sq", "en", "de"].includes(localeParam) ? (localeParam as Locale) : "sq";
  const meta = META_BY_LOCALE[locale];
  return { title: meta.title, description: meta.description };
}
