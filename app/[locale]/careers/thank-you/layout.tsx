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
    currentLocale === "sq" ? "Faleminderit për aplikimin" : currentLocale === "de" ? "Danke für Ihre Bewerbung" : "Thanks for your application";
  const description =
    currentLocale === "sq"
      ? "Faqe konfirmimi pas dërgimit të aplikimit për karrierë."
      : currentLocale === "de"
        ? "Bestätigungsseite nach dem Absenden einer Bewerbung."
        : "Confirmation page shown after submitting a careers application.";

  return buildLocalizedMetadata({
    locale: currentLocale,
    path: "/careers/thank-you",
    title,
    description,
    noIndex: true,
  });
}

export default function CareersThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
