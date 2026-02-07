// app/[locale]/layout.tsx
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    default: "DARA — Web, Marketing & Growth",
    template: "%s | DARA",
  },
  description:
    "Premium websites, e-commerce që shet, dhe marketing/content që sjell klientë realë.",
  openGraph: {
    title: "DARA — Web, Marketing & Growth",
    description:
      "Premium websites, e-commerce që shet, dhe marketing/content që sjell klientë realë.",
    type: "website",
  },
};


export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body className="min-h-screen bg-black text-white antialiased">
        <NextIntlClientProvider locale={params.locale}>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
