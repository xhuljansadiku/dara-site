// app/[locale]/process/page.tsx

const steps = [
  {
    n: "01",
    title: "Audit & Discovery",
    desc: "E kuptojmë biznesin, ofertën, audiencën, dhe ku po humbin konvertimet.",
    bullets: ["Audit website + funnel", "Konkurrenca & positioning", "KPI + objektiva", "Plan 7–30 ditë"],
  },
  {
    n: "02",
    title: "Strategy & Assets",
    desc: "Ndërtojmë planin dhe asetet që e bëjnë marketingun të performojë realisht.",
    bullets: ["Landing pages / UX", "Tracking (events + pixels)", "Creative & copy", "Content calendar"],
  },
  {
    n: "03",
    title: "Launch & Testing",
    desc: "Nisim me strukturë, jo “random ads”. Pastaj testojmë për fitues.",
    bullets: ["Campaign structure", "A/B testing", "Budget allocation", "Offer iterations"],
  },
  {
    n: "04",
    title: "Optimize & Scale",
    desc: "Optimizojmë çdo javë dhe skalojmë vetëm atë që sjell rezultat.",
    bullets: ["Weekly reporting", "CRO improvements", "Scale winners", "New creative cycles"],
  },
];

const deliverables = [
  { a: "Plan & KPI", b: "Objektiva të qarta + roadmap" },
  { a: "Design/UX", b: "Pages që konvertojnë" },
  { a: "Tracking", b: "Evente + atribim bazik" },
  { a: "Ads/Content", b: "Creative + copy + cadence" },
  { a: "Optimization", b: "Testim & përmirësim i vazhdueshëm" },
];

export default function ProcessPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">Process</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Proces i qartë, ekzekutim{" "}
          <span className="text-yellow-400">i fortë</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          Pa fjalë të kota. Ne ndërtojmë sistem: audit → asetet → launch → optimizim & scale.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300"
          >
            Kërko audit
          </a>
          <a
            href="/services"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
          >
            Shërbimet
          </a>
        </div>
      </section>

      {/* DELIVERABLES STRIP */}
      <section className="py-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-white/60">Deliverables</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {deliverables.map((d) => (
              <div
                key={d.a}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
              >
                <span className="text-sm">{d.a}</span>
                <span className="text-xs text-white/60">{d.b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Hapat
        </h2>
        <p className="mt-2 max-w-2xl text-white/60">
          Çdo hap ka output të qartë, që të mos ketë konfuzion.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-400/30"
            >
              <p className="text-xs text-yellow-400/90">{s.n}</p>
              <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>

              <div className="mt-5 h-px bg-white/10" />

              <ul className="mt-4 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6 md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Gati për rritje? <span className="text-yellow-400">Let’s talk.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">
            Na trego çfarë synon dhe ku je sot. Të kthejmë me një plan të shkurtër.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300"
            >
              Kontakt
            </a>
            <a
              href="/work"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
            >
              Shiko work
            </a>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
