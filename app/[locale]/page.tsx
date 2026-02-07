// app/[locale]/page.tsx
import NewsletterForm from "@/components/NewsletterForm";
import LocaleLink from "@/components/site/LocaleLink";

const services = [
  {
    title: "Marketing & Ads",
    desc: "Strategji, Meta/Google ads, funnels dhe optimizim për konvertime.",
    points: ["KPI & tracking", "Creative + copy", "A/B testing", "Weekly reporting"],
  },
  {
    title: "Websites & Landing Pages",
    desc: "Website modern, i shpejtë, i optimizuar për SEO dhe shitje.",
    points: ["UX/UI premium", "SEO basics", "Fast performance", "Lead capture"],
  },
  {
    title: "E-commerce",
    desc: "Shop setup, pages produkti që shesin, checkout & automatizime.",
    points: ["Product pages", "Checkout flow", "Email automations", "Conversion boosts"],
  },
  {
    title: "Content Creation",
    desc: "Reels/TikTok, photo/video, copywriting dhe kalendar content-i.",
    points: ["Content plan", "Short-form video", "UGC style", "Posting cadence"],
  },
];

const process = [
  { n: "01", title: "Audit & Plan", desc: "Analizojmë brand-in, audiencën dhe vendosim KPI + roadmap." },
  { n: "02", title: "Build & Launch", desc: "Ndërtojmë asetet (website/ads/content) dhe i lançojmë me kujdes." },
  { n: "03", title: "Optimize", desc: "Testim, raportim dhe përmirësim çdo javë për rritje të qëndrueshme." },
];

const faqs = [
  { q: "Sa kohë merr një website?", a: "Landing page zakonisht 3–7 ditë; website më i madh 2–4 javë (varet nga përmbajtja)." },
  { q: "A bëni edhe e-commerce?", a: "Po. Setup i plotë + pages produkti, checkout, automatizime dhe optimizim për konvertime." },
  { q: "A mund të punojmë vetëm për content?", a: "Po. Mund të merrni paketë vetëm për content creation ose vetëm për ads." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-12 md:py-20">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-[-80px] left-20 h-72 w-72 rounded-full bg-yellow-400/5 blur-3xl" />
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* left */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">
              DARA Marketing Agency
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Rritje reale për biznesin tënd —{" "}
              <span className="text-yellow-400">me web + marketing</span> që konverton.
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/70 md:text-lg">
              Ndërtojmë website premium, e-commerce që shet, dhe content/ads që sjell klientë.
              Fokus te rezultatet, jo te “postimet”.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LocaleLink
                href="/contact"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 sm:w-auto"
              >
                Merr ofertë
              </LocaleLink>

              <LocaleLink
                href="/services"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
              >
                Shiko shërbimet
              </LocaleLink>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { k: "Fast delivery", v: "Sprint-e të shkurtra" },
                { k: "Premium design", v: "Black/Gold aesthetic" },
                { k: "Performance", v: "SEO + speed" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs text-white/60">{x.k}</p>
                  <p className="mt-1 font-medium">{x.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* right mock */}
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_120px_rgba(0,0,0,0.7)]">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5">
                <div className="flex items-center justify-between">
                  <div className="h-2.5 w-24 rounded-full bg-white/10" />
                  <div className="flex gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="h-3 w-2/3 rounded-full bg-white/10" />
                  <div className="h-3 w-5/6 rounded-full bg-white/10" />
                  <div className="h-24 w-full rounded-2xl bg-white/5" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-14 rounded-2xl bg-white/5" />
                    <div className="h-14 rounded-2xl bg-white/5" />
                    <div className="h-14 rounded-2xl bg-white/5" />
                  </div>
                </div>

                <p className="mt-4 text-xs text-white/50">(Preview / case study mock)</p>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-8 left-10 h-24 w-24 rounded-full bg-yellow-400/10 blur-2xl" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 md:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Shërbime që sjellin <span className="text-yellow-400">konvertime</span>
            </h2>
            <p className="mt-2 max-w-2xl text-white/60">
              Zgjidh paketën që të duhet — ose e kombinojmë sipas objektivave të biznesit.
            </p>
          </div>

          <LocaleLink
            href="/services"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            Shiko të gjitha
          </LocaleLink>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-400/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{s.desc}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                  Pro
                </div>
              </div>

              <div className="mt-5 h-px w-full bg-white/10 group-hover:bg-yellow-400/20" />

              <ul className="mt-4 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Proces i thjeshtë, ekzekutim <span className="text-yellow-400">i fortë</span>
        </h2>
        <p className="mt-2 max-w-2xl text-white/60">
          Qartësi, shpejtësi dhe fokus te rezultati. Pa fjalë të kota.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {process.map((p) => (
            <div key={p.n} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs text-yellow-400/90">{p.n}</p>
              <h3 className="mt-2 text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-white/60">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORK / PROOF */}
      <section className="py-12 md:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Work / Proof</h2>
            <p className="mt-2 text-white/60">
              Vendos 3–6 case studies ose screenshots kur t’i kesh gati.
            </p>
          </div>

          <LocaleLink
            href="/work"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            Shiko punët
          </LocaleLink>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5"
            >
              <div className="aspect-[4/3] w-full bg-black/20" />
              <div className="p-5">
                <p className="text-sm font-medium">Case Study #{i}</p>
                <p className="mt-1 text-sm text-white/60">
                  Growth snapshot / rezultati kryesor.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">FAQ</h2>

        <div className="mt-8 grid gap-4">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer list-none font-medium">
                <span className="text-white">{f.q}</span>
                <span className="ml-2 text-yellow-400">—</span>
              </summary>
              <p className="mt-3 text-sm text-white/60">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6 md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Ready to grow? <span className="text-yellow-400">Let’s talk.</span>
          </h2>

          <p className="mt-2 max-w-2xl text-white/70">
            Na shkruaj për një audit të shpejtë ose lër email për update/oferta.
          </p>

          <div className="mt-6 max-w-xl">
            <NewsletterForm />
          </div>

          <p className="mt-3 text-xs text-white/50">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
