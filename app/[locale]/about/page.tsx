// app/[locale]/about/page.tsx
import LocaleLink from "@/components/site/LocaleLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DARA",
  description:
    "Meet Red, founder of DARA Marketing Agency. Dare to be different — bringing brand stories to life through bold strategies.",
};

const values = [
  {
    title: "Dare to be Different",
    desc: "Every brand has a unique story to tell. We believe success comes not from following the rules but from daring to stand out.",
  },
  {
    title: "Real impact",
    desc: "Marketing is more than a profession—it's a way to create real impact and challenge the ordinary.",
  },
  {
    title: "Intuition + Creativity",
    desc: "Combining intuition, creativity, and clear vision to help businesses grow and transform into success stories.",
  },
  {
    title: "Bold strategies",
    desc: "Bringing brand stories to life through bold and innovative marketing strategies.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-[-90px] left-20 h-72 w-72 rounded-full bg-yellow-400/5 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">About</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Hello! My name is <span className="text-yellow-400">Red</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          I&apos;m Red, the founder of DARA Marketing Agency, a creative mind with a deep passion for
          marketing and business. With 5 years of experience, I&apos;ve learned that success comes not
          from following the rules but from daring to be different.
        </p>

        <p className="mt-4 max-w-2xl text-base text-white/70">
          Driven by the philosophy of &quot;Dare to be Different&quot;, I believe every brand has a unique
          story to tell. My mission is to bring those stories to life through bold and innovative
          strategies. For me, marketing is more than just a profession—it&apos;s a way to create real
          impact and challenge the ordinary.
        </p>

        <p className="mt-4 max-w-2xl text-base text-white/70">
          Always seeking new opportunities, I combine intuition, creativity, and a clear vision to
          help businesses grow and transform into success stories.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { k: "Experience", v: "5+ years" },
            { k: "Philosophy", v: "Dare to be Different" },
            { k: "Focus", v: "Brand stories + growth" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/60">{s.k}</p>
              <p className="mt-1 font-medium">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LocaleLink
            href="/contact"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 sm:w-auto"
          >
            Let&apos;s work together
          </LocaleLink>

          <LocaleLink
            href="/services"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            Our services
          </LocaleLink>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">What drives us</h2>
        <p className="mt-2 max-w-2xl text-white/60">
          The values that guide DARA and every project we take on.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-medium">{v.title}</h3>
              <p className="mt-2 text-sm text-white/60">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6 md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Let&apos;s work together and create <span className="text-yellow-400">something great</span>.
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">
            Share your vision and objectives. We&apos;ll get back with a clear plan.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 sm:w-auto"
            >
              Contact us
            </LocaleLink>

            <LocaleLink
              href="/work"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
            >
              View our work
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
