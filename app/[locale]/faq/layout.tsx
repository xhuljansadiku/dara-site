import type { Metadata } from "next";
import { FAQ_BY_LOCALE } from "@/lib/faq-data";
import { buildAlternates } from "@/lib/seo-utils";

type Locale = "sq" | "en" | "de";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (["sq", "en", "de"].includes(locale) ? locale : "sq") as Locale;
  const { canonical, languages } = buildAlternates("faq", l);

  const title =
    l === "sq" ? "Pyetje të shpeshta" : l === "de" ? "Häufige Fragen" : "Frequently asked questions";
  const description =
    l === "sq"
      ? "Përgjigje të shpejta për pyetjet më të bëra rreth DARA Marketing Agency."
      : l === "de"
        ? "Schnelle Antworten auf die häufigsten Fragen zu DARA Marketing Agency."
        : "Quick answers to the most common questions about DARA Marketing Agency.";

  return {
    title,
    description,
    alternates: { canonical, languages },
  };
}

export default async function FaqLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = (["sq", "en", "de"].includes(locale) ? locale : "sq") as Locale;
  const faqs = FAQ_BY_LOCALE[l];

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dara.al";

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: l === "sq" ? "Kryefaqe" : l === "de" ? "Startseite" : "Home", item: `${base}/${l}` },
      { "@type": "ListItem", position: 2, name: l === "sq" ? "Pyetje të shpeshta" : l === "de" ? "Häufige Fragen" : "FAQ", item: `${base}/${l}/faq` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
