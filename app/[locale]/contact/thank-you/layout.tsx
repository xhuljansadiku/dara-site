import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo-utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = (["sq", "en", "de"].includes(locale) ? locale : "en") as "sq" | "en" | "de";

  const title =
    currentLocale === "sq" ? "Faleminderit për kontaktin" : currentLocale === "de" ? "Danke für Ihre Nachricht" : "Thanks for contacting DARA";
  const description =
    currentLocale === "sq"
      ? "Faqe konfirmimi pas dërgimit të formularit të kontaktit."
      : currentLocale === "de"
        ? "Bestätigungsseite nach dem Absenden des Kontaktformulars."
        : "Confirmation page shown after submitting the contact form.";

  return buildLocalizedMetadata({
    locale: currentLocale,
    path: "/contact/thank-you",
    title,
    description,
    noIndex: true,
  });
}

export default function ContactThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
