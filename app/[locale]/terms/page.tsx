export default function TermsPage() {
  return (
    <>
      <section className="py-14 md:py-20">
        <h1 className="text-4xl md:text-6xl font-semibold">
          Terms & <span className="text-yellow-400">Conditions</span>
        </h1>

        <p className="mt-6 max-w-3xl text-white/70">
          Duke përdorur këtë website, ju pranoni kushtet dhe rregullat e mëposhtme.
        </p>
      </section>

      <section className="py-12 md:py-16 max-w-3xl space-y-8 text-white/70">
        <div>
          <h2 className="text-xl font-semibold text-white">1. Përdorimi i website-it</h2>
          <p className="mt-2">
            Website-i përdoret vetëm për qëllime informative dhe komunikimi
            me DARA. Ndalohet përdorimi për qëllime të paligjshme.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">2. Shërbimet</h2>
          <p className="mt-2">
            Të gjitha shërbimet ofrohen sipas marrëveshjes individuale me klientin.
            Asnjë rezultat specifik nuk garantohet pa kontratë të shkruar.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">3. Pronësia intelektuale</h2>
          <p className="mt-2">
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
          <h2 className="text-xl font-semibold text-white">5. Ndryshime</h2>
          <p className="mt-2">
            Këto kushte mund të përditësohen në çdo kohë pa njoftim paraprak.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">6. Juridiksioni</h2>
          <p className="mt-2">
            Këto kushte rregullohen sipas ligjeve të Bashkimit Europian.
          </p>
        </div>
      </section>

      <div className="h-10" />
    </>
  );
}
