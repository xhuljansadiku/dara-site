export default function PrivacyPage() {
  return (
    <>
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900">
          Privacy <span className="text-gray-900">Policy</span>
        </h1>

        <p className="mt-6 max-w-3xl text-gray-600">
          Kjo faqe shpjegon se si DARA mbledh, përdor dhe mbron të dhënat personale
          të vizitorëve dhe klientëve.
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
          <h2 className="text-xl font-semibold text-white">5. Të drejtat tuaja</h2>
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
