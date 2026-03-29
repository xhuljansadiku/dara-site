import type { Metadata } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
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
  const title = titles[locale] ?? titles.en;
  const description = descriptions[locale] ?? descriptions.en;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE}/${locale}/contact`,
    },
  };
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
    url: `${BASE}/${locale}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${BASE}/#organization`,
      name: "DARA Marketing Agency",
      url: BASE,
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
      { "@type": "ListItem", position: 1, name: locale === "sq" ? "Kryefaqe" : locale === "de" ? "Startseite" : "Home", item: `${BASE}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "sq" ? "Kontakt" : locale === "de" ? "Kontakt" : "Contact", item: `${BASE}/${locale}/contact` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
    </>
  );
}
