// app/[locale]/layout.tsx - Locale-specific shell (no <html>/<body>)
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

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
      <main className="mx-auto max-w-6xl px-4">{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
