// app/[locale]/layout.tsx - Locale-specific shell (no <html>/<body>)
import type { Metadata } from "next";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CookieConsentBanner from "@/components/site/CookieConsentBanner";
import { buildAlternates } from "@/lib/seo-utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const pathParts = pathname.split("/").filter(Boolean);
  const pathRest = pathParts.slice(1).join("/");
  const { canonical, languages } = buildAlternates(pathRest, locale);

  return {
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      locale: locale === "sq" ? "sq_AL" : locale === "de" ? "de_DE" : "en_GB",
      alternateLocale: locale === "sq" ? ["en_GB", "de_DE"] : locale === "de" ? ["sq_AL", "en_GB"] : ["sq_AL", "de_DE"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Tell next-intl which locale is active for this request
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale} />
      <CookieConsentBanner />
    </NextIntlClientProvider>
  );
}
