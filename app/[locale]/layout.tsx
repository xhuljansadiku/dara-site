// app/[locale]/layout.tsx - Locale-specific shell (no <html>/<body>)
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CookieConsentBanner from "@/components/site/CookieConsentBanner";
import ReadingProgress from "@/components/site/ReadingProgress";
import FloatingCTA from "@/components/site/FloatingCTA";
import PageTransition from "@/components/site/PageTransition";
import { type SiteLocale } from "@/lib/seo-utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = (["sq", "en", "de"].includes(locale) ? locale : "en") as SiteLocale;

  return {
    openGraph: {
      locale: currentLocale === "sq" ? "sq_AL" : currentLocale === "de" ? "de_DE" : "en_GB",
      alternateLocale:
        currentLocale === "sq" ? ["en_GB", "de_DE"] : currentLocale === "de" ? ["sq_AL", "en_GB"] : ["sq_AL", "de_DE"],
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
      <ReadingProgress />
      <Navbar />
      <main className="min-h-screen w-full overflow-x-clip">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer locale={locale} />
      <CookieConsentBanner />
      <FloatingCTA locale={locale} />
    </NextIntlClientProvider>
  );
}
