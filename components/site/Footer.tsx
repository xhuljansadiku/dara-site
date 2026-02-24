// components/site/Footer.tsx
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import BackToTop from "@/components/site/BackToTop";
import { getServiceNavItems } from "@/lib/services-data";
import type { Locale } from "@/lib/services-data";
import { PACKAGE_FILTER_TABS_BY_LOCALE } from "@/lib/packages-data";
import { TRAININGS } from "@/lib/trainings-data";

const FOOTER_BY_LOCALE: Record<
  Locale,
  {
    tagline: string;
    desc: string;
    copyright: string;
    servicesTitle: string;
    packagesTitle: string;
    trainingsTitle: string;
    linksTitle: string;
    addressTitle: string;
    contactTitle: string;
    followUs: string;
    whatsAppHover: string;
    links: { home: string; about: string; services: string; packages: string; trainings: string; work: string; team: string; contact: string; faq: string };
    legal: { privacy: string; terms: string };
  }
> = {
  sq: {
    tagline: "Marketing Agency",
    desc: "Guxo të jesh ndryshe. Bashkëpunojmë me marka që duan strategji të guximshme, përmbajtje premium dhe rritje të matshme.",
    copyright: "Copyright © {year} DARA. Të gjitha të drejtat e rezervuara.",
    servicesTitle: "Shërbimet",
    packagesTitle: "Paketa",
    trainingsTitle: "Trajnime",
    linksTitle: "Links",
    addressTitle: "Adresa",
    contactTitle: "Kontakti",
    followUs: "Na ndiqni",
    whatsAppHover: "Na shkruaj në WhatsApp",
    links: {
      home: "Kreu",
      about: "Rreth nesh", 
      services: "Shërbimet", 
      packages: "Paketa", 
      trainings: "Trajnime", 
      work: "Punët", 
      team: "Ekipi", 
      contact: "Kontakt",
      faq: "FAQ",
    },
    legal: { privacy: "Politika e privatësisë", terms: "Kushtet dhe kushtet" },
  },
  en: {
    tagline: "Marketing Agency",
    desc: "Dare to be different. We partner with brands that want bold strategy, premium content and measurable growth.",
    copyright: "Copyright © {year} DARA. All rights reserved.",
    servicesTitle: "Services",
    packagesTitle: "Packages",
    trainingsTitle: "Training",
    linksTitle: "Links",
    addressTitle: "Address",
    contactTitle: "Contact",
    followUs: "Follow us",
    whatsAppHover: "Chat on WhatsApp",
    links: {
      home: "Home",
      about: "About", 
      services: "Services", 
      packages: "Packages", 
      trainings: "Training", 
      work: "Work", 
      team: "Team", 
      contact: "Contact",
      faq: "FAQ",
    },
    legal: { privacy: "Privacy policy", terms: "Terms & conditions" },
  },
  de: {
    tagline: "Marketing Agentur",
    desc: "Wage es, anders zu sein. Wir arbeiten mit Marken, die mutige Strategie, Premium-Content und messbares Wachstum wollen.",
    copyright: "Copyright © {year} DARA. Alle Rechte vorbehalten.",
    servicesTitle: "Leistungen",
    packagesTitle: "Pakete",
    trainingsTitle: "Training",
    linksTitle: "Links",
    addressTitle: "Adresse",
    contactTitle: "Kontakt",
    followUs: "Folge uns",
    whatsAppHover: "Auf WhatsApp schreiben",
    links: {
      home: "Startseite",
      about: "Über uns", 
      services: "Leistungen", 
      packages: "Pakete", 
      trainings: "Training", 
      work: "Referenzen", 
      team: "Team", 
      contact: "Kontakt",
      faq: "FAQ",
    },
    legal: { privacy: "Datenschutz", terms: "AGB" },
  },
};

export default function Footer({ locale }: { locale: string }) {
  const currentLocale = (["sq", "en", "de"].includes(locale) ? locale : "en") as Locale;
  const t = FOOTER_BY_LOCALE[currentLocale] ?? FOOTER_BY_LOCALE.en;
  const serviceNavItems = getServiceNavItems(currentLocale);
  const packageTabs = PACKAGE_FILTER_TABS_BY_LOCALE[currentLocale].filter((tab) => tab.groups.length > 0);
  const trainings = TRAININGS;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#151515]">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#c8a55c]/[0.03] via-transparent to-[#c8a55c]/[0.02]" aria-hidden />
      {/* Top accent line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a55c]/40 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20 lg:py-24">
        {/* Row 1: Brand | Services | Packages */}
        <div className="grid gap-10 md:gap-12 lg:grid-cols-3 lg:gap-x-0">
          {/* Column 1: Brand */}
          <div className="border-b border-white/[0.06] pb-10 md:border-b-0 md:pb-0 lg:border-r lg:border-white/[0.06] lg:pr-12">
            <Image
              src="/logo.png"
              alt="DARA Marketing Agency"
              width={180}
              height={56}
              className="h-12 w-auto object-contain sm:h-14"
            />
            <p className="mt-3 text-base font-medium text-white/70">{t.tagline}</p>
            <div className="mt-2 h-px w-12 bg-[#c8a55c]/40" aria-hidden />
            <p className="mt-4 text-base leading-relaxed text-white/55 max-w-sm">{t.desc}</p>
            
            {/* Social Media */}
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">{t.followUs}</p>
              <div className="flex gap-2">
                <a
                  href="https://instagram.com/daramarketing.eu"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-[#c8a55c]/50 hover:bg-[#c8a55c]/10"
                >
                  <svg className="h-5 w-5 text-white/70 transition-colors hover:text-[#c8a55c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/daramarketing.eu"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-[#c8a55c]/50 hover:bg-[#c8a55c]/10"
                >
                  <svg className="h-5 w-5 text-white/70 transition-colors hover:text-[#c8a55c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/daramarketing"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-[#c8a55c]/50 hover:bg-[#c8a55c]/10"
                >
                  <svg className="h-5 w-5 text-white/70 transition-colors hover:text-[#c8a55c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="border-b border-white/[0.06] pb-10 md:border-b-0 md:pb-0 lg:border-r lg:border-white/[0.06] lg:px-12">
            <h3 className="mb-5 border-b border-[#c8a55c]/30 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a55c]/90">
              {t.servicesTitle}
            </h3>
            <ul className="space-y-3 text-base text-white/60">
              {serviceNavItems.map(({ slug, label }) => (
                <li key={slug}>
                  <LocaleLink
                    href={`/services/${slug}`}
                    className="transition-colors duration-200 hover:text-[#c8a55c]"
                  >
                    {label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Packages */}
          <div className="lg:pl-12">
            <h3 className="mb-5 border-b border-[#c8a55c]/30 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a55c]/90">
              {t.packagesTitle}
            </h3>
            <ul className="space-y-3 text-base text-white/60">
              <li>
                <LocaleLink href="/packages" className="transition-colors duration-200 hover:text-[#c8a55c]">
                  {t.links.packages}
                </LocaleLink>
              </li>
              {packageTabs.map((tab) => (
                <li key={tab.label}>
                  <LocaleLink href="/packages" className="transition-colors duration-200 hover:text-[#c8a55c]">
                    {tab.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider between rows */}
        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

        {/* Row 2: Trainings | Links | Contact */}
        <div className="grid gap-10 md:gap-12 lg:grid-cols-3 lg:gap-x-0">
          {/* Column 4: Trainings */}
          <div className="border-b border-white/[0.06] pb-10 md:border-b-0 md:pb-0 lg:border-r lg:border-white/[0.06] lg:pr-12">
            <h3 className="mb-5 border-b border-[#c8a55c]/30 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a55c]/90">
              {t.trainingsTitle}
            </h3>
            <ul className="space-y-3 text-base text-white/60">
              <li>
                <LocaleLink href="/trainings" className="transition-colors duration-200 hover:text-[#c8a55c]">
                  {t.links.trainings}
                </LocaleLink>
              </li>
              {trainings.map((training) => (
                <li key={training.slug}>
                  <LocaleLink
                    href={`/trainings/${training.slug}`}
                    className="transition-colors duration-200 hover:text-[#c8a55c]"
                  >
                    {training.title[currentLocale]}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Links */}
          <div className="lg:border-r lg:border-white/[0.06] lg:px-12">
            <h3 className="mb-5 border-b border-[#c8a55c]/30 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a55c]/90">
              {t.linksTitle}
            </h3>
            <ul className="space-y-3 text-base text-white/60">
              <li>
                <LocaleLink
                  href="/"
                  className="transition-colors duration-200 hover:text-[#c8a55c]"
                >
                  {t.links.home}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/about"
                  className="transition-colors duration-200 hover:text-[#c8a55c]"
                >
                  {t.links.about}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/services"
                  className="transition-colors duration-200 hover:text-[#c8a55c]"
                >
                  {t.links.services}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/work"
                  className="transition-colors duration-200 hover:text-[#c8a55c]"
                >
                  {t.links.work}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/contact"
                  className="transition-colors duration-200 hover:text-[#c8a55c]"
                >
                  {t.links.contact}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/faq"
                  className="transition-colors duration-200 hover:text-[#c8a55c]"
                >
                  {t.links.faq}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/privacy"
                  className="transition-colors duration-200 hover:text-[#c8a55c]"
                >
                  {t.legal.privacy}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink
                  href="/terms"
                  className="transition-colors duration-200 hover:text-[#c8a55c]"
                >
                  {t.legal.terms}
                </LocaleLink>
              </li>
            </ul>
          </div>

          {/* Column 6: Contact */}
          <div className="lg:pl-12">
            <h3 className="mb-5 border-b border-[#c8a55c]/30 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a55c]/90">
              {t.addressTitle}
            </h3>
            <ul className="mb-8 space-y-3 text-base text-white/60">
              <li>
                <a
                  href="https://maps.google.com/?q=Rruga+Donika+Kastrioti,+Bllok,+Tirane,+Albania"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 hover:text-[#c8a55c]"
                >
                  Rruga Donika Kastrioti, Bllok, Tiranë, Albania
                </a>
              </li>
            </ul>
            <h3 className="mb-5 border-b border-[#c8a55c]/30 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a55c]/90">
              {t.contactTitle}
            </h3>
            <ul className="space-y-3 text-base text-white/60">
              <li className="flex items-center gap-3">
                <a
                  href="tel:+355688009988"
                  className="transition-colors duration-200 hover:text-[#c8a55c]"
                >
                  +355 68 800 9988
                </a>
                <a
                  href="https://wa.me/355688009988"
                  target="_blank"
                  rel="noreferrer"
                  title={t.whatsAppHover}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] transition-all hover:scale-110 hover:shadow-[0_0_16px_rgba(37,211,102,0.5)] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                  aria-label={t.whatsAppHover}
                >
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="mailto:daramarketing.eu@gmail.com"
                  className="transition-colors duration-200 hover:text-[#c8a55c]"
                >
                  daramarketing.eu@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - Separate at the bottom */}
        <div className="mt-16 lg:mt-20 flex flex-col items-center gap-4 border-t border-white/[0.08] pt-10">
          <div className="h-px w-24 bg-[#c8a55c]/50" aria-hidden />
          <p className="text-center text-sm text-white/40">
            {t.copyright.replace("{year}", String(year))}
          </p>
        </div>
      </div>
      
      {/* Back to Top + WhatsApp floating buttons */}
      <BackToTop locale={currentLocale} />
    </footer>
  );
}
