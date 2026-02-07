// app/[locale]/services/page.tsx
import LocaleLink from "@/components/site/LocaleLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Marketing & ads, websites, e-commerce dhe content creation për rritje reale.",
};

const services = [
  {
    title: "Marketing & Ads",
    desc: "Strategji, Meta/Google ads, funnels dhe optimizim për konvertime.",
    includes: ["Audit & KPI", "Tracking setup", "Creative + copy", "A/B testing", "Weekly reporting"],
    idealFor: "Biznese që duan lead-e/shitje të qëndrueshme.",
  },
  {
    title: "Websites & Landing Pages",
    desc: "Website modern, i shpejtë, i optimizuar për SEO dhe shitje.",
    includes: ["UX/UI design", "SEO basics", "Performance", "Lead capture", "Deployment"],
    idealFor: "Brand-e që duan prezencë premium + konvertime.",
  },
  {
    title: "E-commerce",
    desc: "Shop setup, pages produkti që shesin, checkout & automatizime.",
    includes: ["Shop setup", "Product pages", "Checkout flow", "Email automations", "CRO tweaks"],
    idealFor: "Dyqane që duan rritje të shitjeve online.",
  },
  {
    title: "Content Creation",
    desc: "Reels/TikTok, photo/video, copywriting dhe kalendar content-i.",
    includes: ["Content plan", "Short-form video", "UGC style", "Copywriting", "Posting cadence"],
    idealFor: "Biznese që duan brand + reach me konsistencë.",
  },
];

const packages = [
  {
    name: "Starter",
    price: "€399/mo",
    note: "Për fillim të shpejtë",
    items: ["1 fokus (Ads ose Content)", "1 raport/javë", "Optimizim bazik", "Support email"],
  },
  {
    name: "Growth",
    price: "€799/mo",
    note: "Më i kërkuari",
    highlight: true,
    items: ["Ads + Content", "Tracking + KPI", "2 raportime/javë", "Creative sprint", "Prioritet support"],
  },
  {
    name: "Scale",
    price: "€1499/mo",
    note: "Për rritje agresive",
    items: ["Full funnel", "CRO + landing pages", "Weekly strategy call", "Advanced testing", "Dedicated support"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">Services</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Shërbime të ndërtuara për <span className="text-yellow-400">rezultate</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          Zgjidh një shërbim ose një paketë — ne e kombinojmë sipas objektivave:
          lead-e, shitje, rritje audience, ose prezencë premium.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LocaleLink
            href="/contact"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 sm:w-auto"
          >
            Merr ofertë
          </LocaleLink>

          <a
            href="#packages"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            Shiko paketat
          </a>
        </div>
      </section>

      {/* SERVICE GRID */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">Çfarë ofrojmë</h2>
        <p className="mt-2 max-w-2xl text-white/60">
          Shërbime modulare — të kombinuara për performancë dhe konvertime.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-400/30"
            >
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>

              <div className="mt-5 h-px bg-white/10" />

              <p className="mt-4 text-xs uppercase tracking-widest text-white/50">Përfshin</p>

              <ul className="mt-3 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                {s.includes.map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
                    {x}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs text-white/60">Ideal për</p>
                <p className="mt-1 text-sm">{s.idealFor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="py-12 md:py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">Paketa</h2>
        <p className="mt-2 max-w-2xl text-white/60">
          Nis me një paketë — e përshtasim sipas industrisë dhe buxhetit.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-6 ${
                p.highlight ? "border-yellow-400/40 bg-yellow-400/10" : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">{p.name}</h3>
                  <p className="mt-1 text-sm text-white/60">{p.note}</p>
                </div>
                {p.highlight && (
                  <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-medium text-black">
                    Best
                  </span>
                )}
              </div>

              <p className="mt-6 text-3xl font-semibold">{p.price}</p>

              <div className="mt-5 h-px bg-white/10" />

              <ul className="mt-5 grid gap-2 text-sm text-white/75">
                {p.items.map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
                    {x}
                  </li>
                ))}
              </ul>

              <LocaleLink
                href="/contact"
                className={`mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl px-5 font-medium ${
                  p.highlight
                    ? "bg-yellow-400 text-black hover:bg-yellow-300"
                    : "border border-white/15 bg-white/5 text-white/90 hover:border-white/25 hover:bg-white/10"
                }`}
              >
                Zgjidh {p.name}
              </LocaleLink>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6 md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Gati për rritje? <span className="text-yellow-400">Le të flasim.</span>
          </h2>

          <p className="mt-2 max-w-2xl text-white/70">
            Na trego objektivin (lead-e / shitje / brand) dhe të kthejmë një plan të qartë.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 sm:w-auto"
            >
              Merr ofertë
            </LocaleLink>

            <LocaleLink
              href="/"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
            >
              Kthehu te Home
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
