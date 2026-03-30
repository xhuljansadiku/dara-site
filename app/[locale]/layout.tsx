// app/[locale]/layout.tsx - Locale-specific shell (no <html>/<body>)
import type { Metadata } from "next";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CookieConsentBanner from "@/components/site/CookieConsentBanner";
import { buildAlternates, stripLocaleFromPathname, type SiteLocale } from "@/lib/seo-utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = (["sq", "en", "de"].includes(locale) ? locale : "en") as SiteLocale;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const localizedPath = stripLocaleFromPathname(pathname);
  const { canonical, languages } = buildAlternates(localizedPath, currentLocale);

  return {
    alternates: {
      canonical,
      languages,
    },
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
      <Navbar />
      <main className="min-h-screen w-full overflow-x-hidden">{children}</main>
      <Footer locale={locale} />
      <CookieConsentBanner />
    </NextIntlClientProvider>
  );
}
