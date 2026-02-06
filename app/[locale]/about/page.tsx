// app/[locale]/about/page.tsx

const stats = [
  { k: "Focus", v: "Web + Ads + Content" },
  { k: "Delivery", v: "Sprint-e javore" },
  { k: "Goal", v: "Konvertime & Growth" },
];

const values = [
  {
    title: "Performance first",
    desc: "Gjithçka matet: konvertime, CPL/CPA, engagement, revenue.",
  },
  {
    title: "Premium design",
    desc: "Estetikë clean (black/gold) + UX që i çon user-at te veprimi.",
  },
  {
    title: "Consistency",
    desc: "Ndërtojmë sistem content + ads që vazhdon, jo “boom & bust”.",
  },
  {
    title: "Fast execution",
    desc: "Sprint-e të shkurtra + feedback loops të shpejta.",
  },
  {
    title: "Transparency",
    desc: "Raportim i qartë, pa “mystery metrics”.",
  },
  {
    title: "Long-term thinking",
    desc: "Brand + performance = rritje e qëndrueshme.",
  },
];

const steps = [
  {
    n: "01",
    title: "Audit",
    desc: "Analizojmë website-in, ofertën, konkurrencën dhe funnel-in.",
  },
  {
    n: "02",
    title: "Build",
    desc: "Ndërtojmë asetet: landing pages, creatives, content plan, tracking.",
  },
  {
    n: "03",
    title: "Scale",
    desc: "Testojmë, optimizojmë dhe skalojmë me raporte të rregullta.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-[-90px] left-20 h-72 w-72 rounded-full bg-yellow-400/5 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">About</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Ne ndërtojmë <span className="text-yellow-400">rritje reale</span> me web + marketing
        </h1>

        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          DARA është ekip i fokusuar te performance: website që konverton, ads që sjellin klientë
          dhe content që ndërton brand. Pa zhurmë. Me rezultat.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/60">{s.k}</p>
              <p className="mt-1 font-medium">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300"
          >
            Kontakt
          </a>
          <a
            href="/services"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
          >
            Shërbimet
          </a>
        </div>
      </section>

      {/* STORY + PANEL */}
      <section className="py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-semibold md:text-3xl">Si punojmë</h2>
            <p className="mt-3 text-white/70">
              Çdo projekt nis me audit dhe një objektiv të qartë. Pastaj ndërtojmë asetet (website,
              landing pages, creatives, content) dhe i optimizojmë me testim të vazhdueshëm.
            </p>

            <div className="mt-6 h-px bg-white/10" />

            <ul className="mt-6 grid gap-3 text-sm text-white/70">
              {[
                "Audit → plan → ekzekutim",
                "UX/UI premium + konvertime",
                "Tracking + KPI të qarta",
                "Raportim & optimizim çdo javë",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-white/60">What you get</p>
            <h3 className="mt-3 text-xl font-semibold">
              Një sistem që sjell kërkesa & shitje
            </h3>
            <p className="mt-3 text-sm text-white/70">
              Nuk bëjmë thjesht “website të bukur”. Qëllimi është një sistem: pages të forta + ads/content
              + optimizim — që sjell lead-e/shitje.
            </p>

            <div className="mt-6 grid gap-3">
              {[
                { a: "Website / Landing pages", b: "Fast + SEO + conversion" },
                { a: "Ads & Creative", b: "Testim dhe skalim" },
                { a: "Content strategy", b: "Konsistencë & brand" },
              ].map((r) => (
                <div
                  key={r.a}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                >
                  <span className="text-sm">{r.a}</span>
                  <span className="text-xs text-white/60">{r.b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">Vlerat tona</h2>
        <p className="mt-2 max-w-2xl text-white/60">
          Standard premium + ekzekutim i shpejtë + transparencë.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-medium">{v.title}</h3>
              <p className="mt-2 text-sm text-white/60">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS STRIP */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Procesi ynë në 3 hapa
        </h2>
        <p className="mt-2 max-w-2xl text-white/60">
          Qartësi nga dita 1 — dhe optimizim deri te rezultati.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs text-yellow-400/90">{s.n}</p>
              <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6 md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Po fillojmë? <span className="text-yellow-400">Let’s build.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">
            Dërgo objektivin tënd (lead-e / shitje / brand). Të kthejmë një plan të qartë.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300"
            >
              Kontakt
            </a>
            <a
              href="/services"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
            >
              Shërbimet
            </a>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
