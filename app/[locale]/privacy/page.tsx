import type { Metadata } from "next";

const META_BY_LOCALE: Record<string, { title: string; description: string; h1: string; intro: string }> = {
  sq: {
    title: "Politika e privatësisë",
    description: "Si DARA mbledh, përdor dhe mbron të dhënat personale të vizitorëve dhe klientëve. Agjenci marketingu në Tiranë.",
    h1: "Politika e privatësisë",
    intro: "Kjo faqe shpjegon se si DARA mbledh, përdor dhe mbron të dhënat personale të vizitorëve dhe klientëve.",
  },
  en: {
    title: "Privacy Policy",
    description: "How DARA collects, uses and protects personal data of visitors and clients.",
    h1: "Privacy Policy",
    intro: "This page explains how DARA collects, uses and protects the personal data of visitors and clients.",
  },
  de: {
    title: "Datenschutzerklärung",
    description: "Wie DARA personenbezogene Daten von Besuchern und Kunden erhebt, nutzt und schützt.",
    h1: "Datenschutzerklärung",
    intro: "Diese Seite erklärt, wie DARA personenbezogene Daten von Besuchern und Kunden erhebt, nutzt und schützt.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = ["sq", "en", "de"].includes(locale) ? locale : "sq";
  const meta = META_BY_LOCALE[l];
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = ["sq", "en", "de"].includes(locale) ? locale : "sq";
  const meta = META_BY_LOCALE[l];
  return (
    <>
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900">
          {meta.h1}
        </h1>

        <p className="mt-6 max-w-3xl text-gray-600">
          {meta.intro}
        </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">1. Të dhënat që mbledhim</h2>
          <p className="mt-2 text-gray-600">
            Ne mbledhim vetëm informacionin që na dërgon vetë përdoruesi përmes formave
            të kontaktit ose newsletter-it (emër, email, mesazh, biznes).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">2. Si i përdorim të dhënat</h2>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Për t’ju kontaktuar lidhur me kërkesën tuaj</li>
            <li>Për të ofruar shërbimet tona</li>
            <li>Për komunikim marketingu (vetëm me pëlqim)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">3. Cookies</h2>
          <p className="mt-2 text-gray-600">
            Website-i mund të përdorë cookies bazike për funksionim dhe analytics.
            Nuk përdorim cookies invasive ose tracking pa arsye.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">4. Ruajtja e të dhënave</h2>
          <p className="mt-2 text-gray-600">
            Të dhënat ruhen në mënyrë të sigurt dhe nuk shpërndahen me palë të treta,
            përveç rasteve kur kërkohet ligjërisht.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">5. Të drejtat tuaja</h2>
          <p className="mt-2">
            Ju keni të drejtë të kërkoni akses, korrigjim ose fshirje të të dhënave
            tuaja personale në çdo kohë.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">6. Kontakt</h2>
          <p className="mt-2 text-gray-600">
            Për çdo pyetje lidhur me privatësinë, na kontaktoni në:
            <br />
            <span className="text-gray-900 font-medium">hello@dara.agency</span>
          </p>
        </div>
        </div>
      </section>

      <div className="h-10" />
    </>
  );
}
