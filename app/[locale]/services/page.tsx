// app/[locale]/services/page.tsx
import LocaleLink from "@/components/site/LocaleLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social Media Management, Content Creation, Digital Marketing Strategy, Branding, Ads Management, Marketing Consulting, Training — and custom websites, e-commerce & SaaS.",
};

const services = [
  {
    title: "Social Media Management",
    desc: "Complete social media management including content strategy, post creation, planning and performance analysis to increase brand presence and engagement.",
    price: "From €250 / month",
  },
  {
    title: "Content Creation",
    desc: "Photos, videos, reels and creative materials designed to reflect the brand identity and attract the right audience in a professional and modern way.",
  },
  {
    title: "Digital Marketing Strategy",
    desc: "Business analysis and building a personalized strategy for real growth — brand positioning, objectives, marketing plan and concrete ideas for development.",
    price: "From €300 / strategy",
  },
  {
    title: "Branding & Visual Identity",
    desc: "Creation or refresh of brand identity — logo, visual guidelines, communication tone and professional image for a strong presence in the market.",
  },
  {
    title: "Ads Management",
    desc: "Creation and optimization of advertising campaigns in Meta & Google to increase sales, leads and brand recognition through strategic targeting.",
    price: "From €150 / month (not including advertising budget)",
  },
  {
    title: "Marketing Consulting",
    desc: "Strategic consulting for businesses or individuals who want to increase performance, clarify marketing direction and make smarter decisions.",
    price: "From €80 / session",
  },
  {
    title: "Marketing & Social Media Training",
    desc: "Practical training for businesses and individuals who want to learn marketing, social networks and digital strategies in a concrete and applicable way.",
    price: "From €250 / program",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#c8a55c]/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]">Services</p>

        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
          Services built for <span className="text-[#c8a55c]">results</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          From social media and content to strategy, branding, ads, consulting and training—we combine
          what you need to grow.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LocaleLink
            href="/contact"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#c8a55c] px-5 font-medium text-black hover:bg-[#b6944f] sm:w-auto"
          >
            Get a quote
          </LocaleLink>

          <LocaleLink
            href="/work"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            View our work
          </LocaleLink>
        </div>
      </section>

      {/* SERVICE GRID */}
      <section className="py-12 md:py-16">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">What we offer</h2>
        <p className="mt-2 max-w-2xl text-white/60">
          Modular services—choose what fits your needs.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#c8a55c]/30"
            >
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>

              {s.price && (
                <p className="mt-4 text-sm font-medium text-[#c8a55c]">
                  Indicative price: {s.price}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* WEBSITE, E-COMMERCE & SAAS */}
        <div className="mt-8 rounded-2xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-6 md:p-8">
          <h3 className="text-lg font-medium text-[#c8a55c]">+ Custom digital products</h3>
          <p className="mt-2 text-white/70">
            Website, e-commerce and SaaS (Software as a Service) — customized software products for
            private use or companies.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-6 md:p-10">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Ready to grow? <span className="text-[#c8a55c]">Let&apos;s talk.</span>
          </h2>

          <p className="mt-2 max-w-2xl text-white/70">
            Tell us your goal (leads / sales / brand) and we&apos;ll return with a clear plan.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#c8a55c] px-5 font-medium text-black hover:bg-[#b6944f] sm:w-auto"
            >
              Get a quote
            </LocaleLink>

            <LocaleLink
              href="/"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
            >
              Back to Home
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
