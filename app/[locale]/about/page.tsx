// app/[locale]/about/page.tsx
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DARA",
  description:
    "DARA Marketing Agency — established May 1, 2022. Helping businesses grow through creative strategies and results-oriented marketing.",
};

const differentiators = [
  {
    title: "Personalized strategies",
    desc: "Not copy-paste models — every business gets a tailored approach.",
  },
  {
    title: "Focus on real results",
    desc: "Business growth and measurable outcomes, not vanity metrics.",
  },
  {
    title: "Modern creativity + strategic analysis",
    desc: "Creative ideas backed by data-driven insights.",
  },
  {
    title: "Direct communication",
    desc: "Close collaboration and transparent partnership with every client.",
  },
  {
    title: "Business mentality",
    desc: "Not just posts on social networks — we think like business owners.",
  },
  {
    title: "Energy & hands-on approach",
    desc: "We roll up our sleeves and dive deep into every project.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-[-90px] left-20 h-72 w-72 rounded-full bg-[#c8a55c]/5 blur-3xl" />
        </div>

        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]">About</p>

            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Hello! My name is <span className="text-[#c8a55c]">Red</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          I&apos;m Red, the founder of DARA Marketing Agency, a creative mind with a deep passion for
          marketing and business. With <strong>7 years of experience</strong>, I&apos;ve learned that success
          comes not from following the rules but from daring to be different.
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

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { k: "Red", v: "7 years" },
            { k: "DARA", v: "Est. May 1, 2022" },
            { k: "Philosophy", v: "Dare to be Different" },
            { k: "Focus", v: "Results & growth" },
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
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#c8a55c] px-5 font-medium text-black hover:bg-[#b6944f] sm:w-auto"
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
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl md:max-w-sm">
              <Image
                src="/red-portrait.png"
                alt="Red - Founder of DARA Marketing Agency"
                width={400}
                height={500}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-12 md:py-16">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Mission & Vision</h2>
        <p className="mt-2 max-w-2xl text-white/60">
          What we stand for and where we&apos;re headed.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h3 className="text-lg font-medium text-[#c8a55c]">Mission</h3>
            <p className="mt-3 text-white/70">
              To help businesses grow and position themselves strongly in the market through creative
              strategies and results-oriented marketing.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h3 className="text-lg font-medium text-[#c8a55c]">Vision</h3>
            <p className="mt-3 text-white/70">
              To become one of the most trusted and innovative marketing agencies in the Albanian
              market and beyond, by building strong brands and real success stories.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="py-12 md:py-16">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">
          What makes us <span className="text-[#c8a55c]">different</span>
        </h2>
        <p className="mt-2 max-w-2xl text-white/60">
          Why businesses choose DARA over other agencies.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d) => (
            <div
              key={d.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#c8a55c]/30"
            >
              <h3 className="text-lg font-medium">{d.title}</h3>
              <p className="mt-2 text-sm text-white/60">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section className="py-12 md:py-16">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">
          Target <span className="text-[#c8a55c]">audience</span>
        </h2>
        <p className="mt-2 max-w-2xl text-white/60">
          Who we work with and why we&apos;re the right fit.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-medium text-[#c8a55c]">Ideal client</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>• Businesses that want serious growth and a professional online presence</li>
              <li>• Brands that want to build a strong identity and long-term strategy</li>
              <li>• Entrepreneurs that understand the value of marketing and investing in a brand</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-medium text-[#c8a55c]">Local or online</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>• Local businesses that want to grow and modernize</li>
              <li>• Online business & e-commerce</li>
              <li>• Personal brands and professionals that want a strong digital presence</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-medium text-[#c8a55c]">Industries</h3>
            <ul className="mt-3 space-y-1 text-sm text-white/70">
              <li>• Beauty & Aesthetics</li>
              <li>• Professional services</li>
              <li>• Hospitality & Restaurants</li>
              <li>• Retail & E-commerce</li>
              <li>• Construction & Real Estate</li>
              <li>• Personal Branding & Influencers</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-6 md:col-span-2 lg:col-span-3">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-base font-medium text-[#c8a55c]">Primary: B2B</h3>
                <p className="mt-1 text-sm text-white/70">
                  Marketing services for businesses and companies.
                </p>
              </div>
              <div>
                <h3 className="text-base font-medium text-[#c8a55c]">Secondary: B2C</h3>
                <p className="mt-1 text-sm text-white/70">
                  Personal branding, influencer marketing, consulting for individuals & entrepreneurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-6 md:p-10">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Let&apos;s work together and create <span className="text-[#c8a55c]">something great</span>.
          </h2>
          <p className="mt-2 max-w-2xl text-white/70">
            Share your vision and objectives. We&apos;ll get back with a clear plan.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#c8a55c] px-5 font-medium text-black hover:bg-[#b6944f] sm:w-auto"
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
