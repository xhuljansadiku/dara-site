export default function TermsPage() {
  return (
    <>
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900">
          Terms & <span className="text-gray-900">Conditions</span>
        </h1>

        <p className="mt-6 max-w-3xl text-gray-600">
          Duke përdorur këtë website, ju pranoni kushtet dhe rregullat e mëposhtme.
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
          <h2 className="text-xl font-semibold text-white">4. Kufizimi i përgjegjësisë</h2>
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
