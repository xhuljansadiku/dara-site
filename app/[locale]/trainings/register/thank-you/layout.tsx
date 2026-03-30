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
    currentLocale === "sq" ? "Regjistrimi u dërgua" : currentLocale === "de" ? "Anmeldung gesendet" : "Registration sent";
  const description =
    currentLocale === "sq"
      ? "Faqe konfirmimi pas regjistrimit për trajnim."
      : currentLocale === "de"
        ? "Bestätigungsseite nach dem Senden einer Trainingsanmeldung."
        : "Confirmation page shown after submitting a training registration.";

  return buildLocalizedMetadata({
    locale: currentLocale,
    path: "/trainings/register/thank-you",
    title,
    description,
    noIndex: true,
  });
}

export default function TrainingRegisterThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
