import type { Metadata } from "next";

const META_BY_LOCALE: Record<string, { title: string; description: string; h1: string; intro: string }> = {
  sq: {
    title: "Kushte dhe rregulla",
    description: "Kushtet e përdorimit të website-it DARA Marketing Agency. Shërbime web design, krijim website dhe marketingu digjital.",
    h1: "Kushte dhe rregulla",
    intro: "Duke përdorur këtë website, ju pranoni kushtet dhe rregullat e mëposhtme.",
  },
  en: {
    title: "Terms & Conditions",
    description: "Terms of use for DARA Marketing Agency website. Web design, website creation and digital marketing services.",
    h1: "Terms & Conditions",
    intro: "By using this website, you accept the following terms and rules.",
  },
  de: {
    title: "Allgemeine Geschäftsbedingungen",
    description: "Nutzungsbedingungen der Website der DARA Marketing Agency.",
    h1: "AGB",
    intro: "Durch die Nutzung dieser Website akzeptieren Sie die folgenden Bedingungen.",
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

export default async function TermsPage({
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
          <h2 className="text-xl font-semibold text-gray-900">1. Përdorimi i website-it</h2>
          <p className="mt-2 text-gray-600">
            Website-i përdoret vetëm për qëllime informative dhe komunikimi
            me DARA. Ndalohet përdorimi për qëllime të paligjshme.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">2. Shërbimet</h2>
          <p className="mt-2 text-gray-600">
            Të gjitha shërbimet ofrohen sipas marrëveshjes individuale me klientin.
            Asnjë rezultat specifik nuk garantohet pa kontratë të shkruar.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">3. Pronësia intelektuale</h2>
          <p className="mt-2 text-gray-600">
            Të gjitha materialet, dizajni dhe përmbajtja në këtë website janë
            pronë e DARA dhe nuk mund të kopjohen pa leje.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">4. Kufizimi i përgjegjësisë</h2>
          <p className="mt-2">
            DARA nuk mban përgjegjësi për dëme direkte ose indirekte që mund
            të lindin nga përdorimi i website-it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">5. Ndryshime</h2>
          <p className="mt-2 text-gray-600">
            Këto kushte mund të përditësohen në çdo kohë pa njoftim paraprak.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">6. Juridiksioni</h2>
          <p className="mt-2 text-gray-600">
            Këto kushte rregullohen sipas ligjeve të Bashkimit Europian.
          </p>
        </div>
        </div>
      </section>

      <div className="h-10" />
    </>
  );
}
