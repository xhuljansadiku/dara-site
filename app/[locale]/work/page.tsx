// app/[locale]/work/page.tsx

const cases = [
  {
    title: "E-commerce growth",
    tag: "E-commerce",
    metric: "+32% conversion rate",
    desc: "Optimizim product page + checkout flow + email automations.",
  },
  {
    title: "Lead gen funnel",
    tag: "Marketing",
    metric: "CPL ↓ 28%",
    desc: "Landing page + Meta ads creatives + A/B testing i vazhdueshëm.",
  },
  {
    title: "Brand content system",
    tag: "Content",
    metric: "+3.1x reach",
    desc: "Content plan, reels format, consistency + hooks/copy.",
  },
  {
    title: "Website redesign",
    tag: "Web",
    metric: "Speed 95+",
    desc: "UI refresh, SEO basics, performance optimizations.",
  },
  {
    title: "Shop setup",
    tag: "E-commerce",
    metric: "AOV ↑ 14%",
    desc: "Bundle offers, upsells, PDP improvements.",
  },
  {
    title: "Local service leads",
    tag: "Marketing",
    metric: "Calls ↑ 41%",
    desc: "Google ads + landing + tracking + weekly iteration.",
  },
];

const filters = ["All", "Web", "Marketing", "E-commerce", "Content"] as const;

export default function WorkPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">Work</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Disa punë & rezultate <span className="text-yellow-400">të zgjedhura</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          Këtu vendosim case studies reale. Për momentin janë placeholders, por struktura është gati.
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

      {/* FILTER BAR (UI only) */}
      <section className="py-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <span
              key={f}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
            >
              {f}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-white/40">
          (Filter UI placeholder — kur të duash e bëjmë funksional me state)
        </p>
      </section>

      {/* GRID */}
      <section className="py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((c) => (
            <div
              key={c.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-yellow-400/30"
            >
              {/* thumbnail placeholder */}
              <div className="aspect-[4/3] w-full bg-gradient-to-b from-white/10 to-white/5" />

              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{c.title}</p>
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60">
                    {c.tag}
                  </span>
                </div>

                <p className="mt-2 text-sm text-white/60">{c.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-yellow-400">
                    {c.metric}
                  </span>
                  <span className="text-xs text-white/50">View →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6 md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Do rezultate si këto? <span className="text-yellow-400">Let’s talk.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">
            Na trego çfarë synon (lead-e / shitje / brand). Të kthejmë me një plan të qartë.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300"
            >
              Kontakt
            </a>
            <a
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
            >
              Kthehu te Home
            </a>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
