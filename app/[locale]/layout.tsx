import "../globals.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "../../components/Navbar";
import type { Metadata } from "next";


const locales = ["sq", "en", "de"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = ["sq", "en", "de"].includes(locale as string)
    ? locale
    : "sq";

  const messages = (await import(`../../messages/${safeLocale}.json`)).default;

  return {
    title: messages.seo.title,
    description: messages.seo.description,
    openGraph: {
      title: messages.seo.title,
      description: messages.seo.description,
      locale: safeLocale,
      siteName: "DARA Marketing Agency",
    },
    alternates: {
      languages: {
        sq: "/sq",
        en: "/en",
        de: "/de",
      },
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

  if (!locales.includes(locale as any)) notFound();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-[#0b0b0b] text-white antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
