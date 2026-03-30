import type { Metadata } from "next";
import { buildLocalizedMetadata, SITE_URL, type SiteLocale } from "@/lib/seo-utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = (["sq", "en", "de"].includes(locale) ? locale : "en") as SiteLocale;
  const titles: Record<string, string> = {
    sq: "Kontakt | DARA Marketing Agency",
    en: "Contact | DARA Marketing Agency",
    de: "Kontakt | DARA Marketing Agency",
  };
  const descriptions: Record<string, string> = {
    sq: "Kontaktoni DARA për ofertë website, webshop, audit ose plan marketingu. Agjenci web design Tiranë. Përgjigje brenda 24 orëve.",
    en: "Contact DARA Marketing Agency for a quote, audit or growth plan. We help businesses grow with digital marketing strategies.",
    de: "Kontaktieren Sie DARA Marketing Agency für ein Angebot, Audit oder Wachstumsplan. Wir helfen Unternehmen mit digitalem Marketing zu wachsen.",
  };
  return buildLocalizedMetadata({
    locale: currentLocale,
    path: "/contact",
    title: titles[currentLocale] ?? titles.en,
    description: descriptions[currentLocale] ?? descriptions.en,
  });
}

export default function ContactLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <ContactStructuredData params={params} />
      {children}
    </>
  );
}

async function ContactStructuredData({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const contactSchema = {
    "@context": "https://schema.org",
      "@type": "ContactPage",
    name: locale === "sq" ? "Kontakt" : locale === "de" ? "Kontakt" : "Contact",
    url: `${SITE_URL}/${locale}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: "DARA Marketing Agency",
      url: SITE_URL,
      telephone: "+355688009988",
      email: "daramarketing.eu@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rruga Donika Kastrioti",
        addressLocality: "Tirana",
        addressCountry: "AL",
      },
    },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "sq" ? "Kryefaqe" : locale === "de" ? "Startseite" : "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "sq" ? "Kontakt" : locale === "de" ? "Kontakt" : "Contact", item: `${SITE_URL}/${locale}/contact` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
    </>
  );
}
