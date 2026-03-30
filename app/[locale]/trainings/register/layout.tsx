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
    currentLocale === "sq"
      ? "Regjistrohu për trajnime"
      : currentLocale === "de"
        ? "Für Trainings anmelden"
        : "Register for training";
  const description =
    currentLocale === "sq"
      ? "Formular regjistrimi për trajnimet e DARA Marketing Agency."
      : currentLocale === "de"
        ? "Anmeldeformular für die Trainings der DARA Marketing Agency."
        : "Registration form for DARA Marketing Agency training programmes.";

  return buildLocalizedMetadata({
    locale: currentLocale,
    path: "/trainings/register",
    title,
    description,
    noIndex: true,
  });
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
