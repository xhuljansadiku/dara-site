// components/site/Footer.tsx
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import BackToTop from "@/components/site/BackToTop";

type Locale = "sq" | "en" | "de";

const FOOTER_BY_LOCALE: Record<
  Locale,
  {
    tagline: string;
    desc: string;
    copyright: string;
    servicesTitle: string;
    linksTitle: string;
    addressTitle: string;
    contactTitle: string;
    followUs: string;
    services: string[];
    links: { home: string; about: string; services: string; packages: string; trainings: string; work: string; team: string; contact: string };
    legal: { privacy: string; terms: string };
  }
> = {
  sq: {
    tagline: "Marketing Agency",
    desc: "Guxo të jesh ndryshe. Bashkëpunojmë me marka që duan strategji të guximshme, përmbajtje premium dhe rritje të matshme.",
    copyright: "Copyright © {year} DARA. Të gjitha të drejtat e rezervuara.",
    servicesTitle: "Shërbimet",
    linksTitle: "Links",
    addressTitle: "Adresa",
    contactTitle: "Kontakti",
    followUs: "Na ndiqni",
    services: [
      "Menaxhim i rrjeteve sociale",
      "Krijim përmbajtjeje",
      "Strategji marketingu",
      "Branding & Identitet",
      "Menaxhim reklamash",
      "Website & E-commerce",
      "Konsulencë marketingu",
      "Trajnime",
      "Mirembajtje & Optimizim",
    ],
    links: { 
      home: "Kreu", 
      about: "Rreth nesh", 
      services: "Shërbimet", 
      packages: "Paketa", 
      trainings: "Trajnime", 
      work: "Punët", 
      team: "Ekipi", 
      contact: "Kontakt" 
    },
    legal: { privacy: "Politika e privatësisë", terms: "Kushtet dhe kushtet" },
  },
  en: {
    tagline: "Marketing Agency",
    desc: "Dare to be different. We partner with brands that want bold strategy, premium content and measurable growth.",
    copyright: "Copyright © {year} DARA. All rights reserved.",
    servicesTitle: "Services",
    linksTitle: "Links",
    addressTitle: "Address",
    contactTitle: "Contact",
    followUs: "Follow us",
    services: [
      "Social Media Management",
      "Content Creation",
      "Marketing Strategy",
      "Branding & Identity",
      "Ads Management",
      "Website & E-commerce",
      "Marketing Consulting",
      "Training",
      "Maintenance & Optimization",
    ],
    links: { 
      home: "Home", 
      about: "About", 
      services: "Services", 
      packages: "Packages", 
      trainings: "Training", 
      work: "Work", 
      team: "Team", 
      contact: "Contact" 
    },
    legal: { privacy: "Privacy policy", terms: "Terms & conditions" },
  },
  de: {
    tagline: "Marketing Agentur",
    desc: "Wage es, anders zu sein. Wir arbeiten mit Marken, die mutige Strategie, Premium-Content und messbares Wachstum wollen.",
    copyright: "Copyright © {year} DARA. Alle Rechte vorbehalten.",
    servicesTitle: "Leistungen",
    linksTitle: "Links",
    addressTitle: "Adresse",
    contactTitle: "Kontakt",
    followUs: "Folge uns",
    services: [
      "Social Media Management",
      "Content-Erstellung",
      "Marketing-Strategie",
      "Branding & Identität",
      "Anzeigenverwaltung",
      "Website & E-Commerce",
      "Marketing-Beratung",
      "Training",
      "Wartung & Optimierung",
    ],
    links: { 
      home: "Startseite", 
      about: "Über uns", 
      services: "Leistungen", 
      packages: "Pakete", 
      trainings: "Training", 
      work: "Referenzen", 
      team: "Team", 
      contact: "Kontakt" 
    },
    legal: { privacy: "Datenschutz", terms: "AGB" },
  },
};

export default function Footer({ locale }: { locale: string }) {
  const t = FOOTER_BY_LOCALE[(locale as Locale) || "en"] ?? FOOTER_BY_LOCALE.en;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="DARA Marketing Agency"
              width={150}
              height={48}
              className="h-10 w-auto object-contain sm:h-11"
            />
            <p className="mt-2 text-sm text-white/60">{t.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{t.desc}</p>
            
            {/* Social Media */}
            <div className="mt-6">
              <p className="mb-3 text-xs text-white/50">{t.followUs}</p>
              <div className="flex gap-2">
                <a
                  href="https://instagram.com/daramarketing.eu"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-[#c8a55c]/50 hover:bg-[#c8a55c]/10"
                >
                  <svg className="h-4 w-4 text-white/70 transition-colors hover:text-[#c8a55c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/daramarketing.eu"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-[#c8a55c]/50 hover:bg-[#c8a55c]/10"
                >
                  <svg className="h-4 w-4 text-white/70 transition-colors hover:text-[#c8a55c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/daramarketing"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:border-[#c8a55c]/50 hover:bg-[#c8a55c]/10"
                >
                  <svg className="h-4 w-4 text-white/70 transition-colors hover:text-[#c8a55c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
              {t.servicesTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              {t.services.map((service) => (
                <li key={service}>
                  <LocaleLink
                    href="/services"
                    className="transition-colors hover:text-[#c8a55c]"
                  >
                    {service}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
              {t.linksTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <LocaleLink
                  href="/"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  {t.links.home}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/about"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  {t.links.about}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/services"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  {t.links.services}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/packages"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  {t.links.packages}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/trainings"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  {t.links.trainings}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/work"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  {t.links.work}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/#team"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  {t.links.team}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/contact"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  {t.links.contact}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/privacy"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  {t.legal.privacy}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/terms"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  {t.legal.terms}
                </LocaleLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
              {t.addressTitle}
            </h3>
            <ul className="mb-6 space-y-2.5 text-sm text-white/60">
              <li>
                <a
                  href="https://maps.google.com/?q=Rruga+Donika+Kastrioti,+Bllok,+Tirane,+Albania"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  Rruga Donika Kastrioti, Bllok, Tiranë, Albania
                </a>
              </li>
            </ul>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
              {t.contactTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <a
                  href="tel:+355688009988"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  +355 68 800 9988
                </a>
              </li>
              <li>
                <a
                  href="mailto:daramarketing.eu@gmail.com"
                  className="transition-colors hover:text-[#c8a55c]"
                >
                  daramarketing.eu@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - Separate at the bottom */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-white/50">
            {t.copyright.replace("{year}", String(year))}
          </p>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </footer>
  );
}
