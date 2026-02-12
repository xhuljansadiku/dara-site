// components/site/Footer.tsx
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";

type Locale = "sq" | "en" | "de";

const FOOTER_BY_LOCALE: Record<
  Locale,
  {
    tagline: string;
    desc: string;
    tags: string[];
    pagesTitle: string;
    legalTitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaSubtitleHighlight: string;
    getQuote: string;
    viewWork: string;
    note: string;
    copyright: string;
    slogan: string;
    links: { home: string; about: string; services: string; packages: string; work: string; team: string; contact: string };
    legal: { privacy: string; terms: string };
    social: { instagram: string; facebook: string; linkedin: string };
  }
> = {
  sq: {
    tagline: "Marketing Agency",
    desc: "Guxo të jesh ndryshe. Bashkëpunojmë me marka që duan strategji të guximshme, përmbajtje premium dhe rritje të matshme.",
    tags: ["Strategji", "Rrjete sociale", "Reklama", "Branding", "Web & E‑commerce"],
    pagesTitle: "Faqet",
    legalTitle: "Legjale",
    ctaTitle: "Le të punojmë bashkë",
    ctaSubtitle: "Gati për rritje me një partner strategjik marketingu?",
    ctaSubtitleHighlight: "partner strategjik marketingu",
    getQuote: "Merr ofertë",
    viewWork: "Shiko punën",
    note: "Pa angazhim afatgjatë. Strategji e qartë, raportim transparent, rezultate reale.",
    copyright: "© {year} DARA. Të gjitha të drejtat e rezervuara.",
    slogan: "Guxo të jesh ndryshe.",
    links: { home: "Kreu", about: "Rreth nesh", services: "Shërbimet", packages: "Paketa", work: "Punët", team: "Ekipi", contact: "Kontakt" },
    legal: { privacy: "Politika e privatësisë", terms: "Kushtet dhe kushtet" },
    social: { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn" },
  },
  en: {
    tagline: "Marketing Agency",
    desc: "Dare to be different. We partner with brands that want bold strategy, premium content and measurable growth.",
    tags: ["Strategy", "Social Media", "Paid Ads", "Branding", "Web & E‑commerce"],
    pagesTitle: "Pages",
    legalTitle: "Legal",
    ctaTitle: "Let's work together",
    ctaSubtitle: "Ready to grow with a strategic marketing partner?",
    ctaSubtitleHighlight: "strategic marketing partner",
    getQuote: "Get a quote",
    viewWork: "View work",
    note: "No long-term lock-ins. Clear strategy, transparent reporting, real results.",
    copyright: "© {year} DARA. All rights reserved.",
    slogan: "Dare to be different.",
    links: { home: "Home", about: "About", services: "Services", packages: "Packages", work: "Work", team: "Team", contact: "Contact" },
    legal: { privacy: "Privacy policy", terms: "Terms & conditions" },
    social: { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn" },
  },
  de: {
    tagline: "Marketing Agentur",
    desc: "Wage es, anders zu sein. Wir arbeiten mit Marken, die mutige Strategie, Premium-Content und messbares Wachstum wollen.",
    tags: ["Strategie", "Social Media", "Paid Ads", "Branding", "Web & E‑Commerce"],
    pagesTitle: "Seiten",
    legalTitle: "Rechtliches",
    ctaTitle: "Lass uns zusammenarbeiten",
    ctaSubtitle: "Bereit zu wachsen mit einem strategischen Marketing-Partner?",
    ctaSubtitleHighlight: "strategischen Marketing-Partner",
    getQuote: "Angebot anfragen",
    viewWork: "Referenzen",
    note: "Keine langfristigen Verträge. Klare Strategie, transparentes Reporting, echte Ergebnisse.",
    copyright: "© {year} DARA. Alle Rechte vorbehalten.",
    slogan: "Wage es, anders zu sein.",
    links: { home: "Startseite", about: "Über uns", services: "Leistungen", packages: "Pakete", work: "Referenzen", team: "Team", contact: "Kontakt" },
    legal: { privacy: "Datenschutz", terms: "AGB" },
    social: { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn" },
  },
};

export default function Footer({ locale }: { locale: string }) {
  const t = FOOTER_BY_LOCALE[(locale as Locale) || "en"] ?? FOOTER_BY_LOCALE.en;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#1f1f1f]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 text-center md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)_minmax(0,1.2fr)] md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <Image
                src="/logo.png"
                alt="DARA Marketing Agency"
                width={150}
                height={48}
                className="h-9 w-auto object-contain sm:h-10 md:h-11"
              />
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">{t.tagline}</p>
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/60">{t.desc}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
              {t.tags.map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-8 sm:grid-cols-2 md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">{t.pagesTitle}</p>
              <ul className="mt-4 grid gap-2 text-sm text-white/60">
                <li><LocaleLink className="hover:text-white" href="/">{t.links.home}</LocaleLink></li>
                <li><LocaleLink className="hover:text-white" href="/about">{t.links.about}</LocaleLink></li>
                <li><LocaleLink className="hover:text-white" href="/services">{t.links.services}</LocaleLink></li>
                <li><LocaleLink className="hover:text-white" href="/packages">{t.links.packages}</LocaleLink></li>
                <li><LocaleLink className="hover:text-white" href="/work">{t.links.work}</LocaleLink></li>
                <li><LocaleLink className="hover:text-white" href="/#team">{t.links.team}</LocaleLink></li>
                <li><LocaleLink className="hover:text-white" href="/contact">{t.links.contact}</LocaleLink></li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">{t.legalTitle}</p>
              <ul className="mt-4 grid gap-2 text-sm text-white/60">
                <li><LocaleLink className="hover:text-white" href="/privacy">{t.legal.privacy}</LocaleLink></li>
                <li><LocaleLink className="hover:text-white" href="/terms">{t.legal.terms}</LocaleLink></li>
              </ul>
            </div>
          </div>

          {/* Contact / CTA */}
          <div className="flex flex-col items-center rounded-3xl border border-[#c8a55c]/25 bg-[#c8a55c]/5 p-6 text-center md:items-start md:text-left md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c8a55c]">{t.ctaTitle}</p>
            <p className="mt-3 font-display text-xl font-semibold">
              {t.ctaSubtitle.replace(
                t.ctaSubtitleHighlight,
                `\0${t.ctaSubtitleHighlight}\0`
              ).split("\0").map((part, i) =>
                part === t.ctaSubtitleHighlight ? (
                  <span key={i} className="text-[#c8a55c]">{part}</span>
                ) : (
                  part
                )
              )}
            </p>

            <div className="mt-4 space-y-2 text-sm text-white/80">
              <p>
                <a className="hover:text-[#c8a55c]" href="mailto:daramarketing.eu@gmail.com">
                  daramarketing.eu@gmail.com
                </a>
              </p>
              <p>
                <a className="hover:text-[#c8a55c]" href="tel:+355688009988">
                  +355 68 800 9988
                </a>
              </p>
              <p>
                <a
                  className="hover:text-[#c8a55c]"
                  href="https://maps.google.com/?q=Rruga+Donika+Kastrioti,+Bllok,+Tirane,+Albania"
                  target="_blank"
                  rel="noreferrer"
                >
                  Rruga Donika Kastrioti, Bllok, Tiranë, Albania
                </a>
              </p>
            </div>

            <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <LocaleLink
                href="/contact"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-[#c8a55c] px-5 text-sm font-medium text-black hover:bg-[#b6944f] sm:flex-initial"
              >
                {t.getQuote}
              </LocaleLink>
              <LocaleLink
                href="/work"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm text-white/90 hover:border-white/25 hover:bg-white/10 sm:flex-initial"
              >
                {t.viewWork}
              </LocaleLink>
            </div>

            <p className="mt-4 text-xs text-white/50">{t.note}</p>

            <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                className="rounded-full border border-white/10 bg-black/30 p-2.5 hover:border-[#c8a55c]/50 hover:text-[#c8a55c] transition"
                href="https://instagram.com/daramarketing.eu"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                className="rounded-full border border-white/10 bg-black/30 p-2.5 hover:border-[#c8a55c]/50 hover:text-[#c8a55c] transition"
                href="https://facebook.com/daramarketing.eu"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                className="rounded-full border border-white/10 bg-black/30 p-2.5 hover:border-[#c8a55c]/50 hover:text-[#c8a55c] transition"
                href="https://linkedin.com/company/daramarketing"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-center text-xs text-white/50 md:flex-row md:items-center md:justify-between md:text-left">
          <p>{t.copyright.replace("{year}", String(year))}</p>
          <p className="text-white/40">{t.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
