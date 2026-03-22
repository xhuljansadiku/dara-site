const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al";

export default async function AboutLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: locale === "sq" ? "Rreth nesh" : locale === "de" ? "Über uns" : "About us",
    url: `${BASE}/${locale}/about`,
    description: "DARA Marketing Agency. Established in 2020. Helping businesses grow through creative strategies and results-oriented marketing.",
    mainEntity: {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "DARA Marketing Agency",
      url: BASE,
      foundingDate: "2020",
      description: "We bring brand stories to life through bold strategies and results-oriented marketing.",
    },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "sq" ? "Kryefaqe" : locale === "de" ? "Startseite" : "Home", item: `${BASE}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "sq" ? "Rreth nesh" : locale === "de" ? "Über uns" : "About us", item: `${BASE}/${locale}/about` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      {children}
    </>
  );
}
