// app/[locale]/services/page.tsx
import LocaleLink from "@/components/site/LocaleLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital Marketing Strategy, Social Media Design, Paid Advertising, Branding, Creative Content, SEO & Web Design.",
};

const services = [
  {
    title: "Digital Marketing Strategy",
    desc: "Tailored strategies to meet the unique needs of your business.",
    includes: ["Audit & KPI", "Tracking setup", "Creative + copy", "A/B testing", "Weekly reporting"],
    idealFor: "Businesses seeking clear direction and measurable growth.",
  },
  {
    title: "Social Media Design",
    desc: "Content creation, community management, and growth strategies for platforms like Instagram, Facebook, TikTok and LinkedIn.",
    includes: ["Content plan", "Community management", "Growth strategies", "Platform optimization"],
    idealFor: "Brands wanting to expand reach and engagement.",
  },
  {
    title: "Paid Advertising (Meta Ads & Google Ads)",
    desc: "Targeted advertising to boost your brand visibility and drive conversions.",
    includes: ["Meta Ads", "Google Ads", "Retargeting", "Conversion tracking"],
    idealFor: "Businesses ready to scale with paid acquisition.",
  },
  {
    title: "Branding",
    desc: "Crafting strong, consistent, and recognizable brand identities.",
    includes: ["Logo design", "Visual identity", "Brand guidelines", "Consistent messaging"],
    idealFor: "Startups and established brands refreshing their image.",
  },
  {
    title: "Creative Content Creation",
    desc: "Visual designs, copywriting, and storytelling to engage and attract customers.",
    includes: ["Photo & video", "Copywriting", "Storytelling", "Reels & TikTok"],
    idealFor: "Brands needing content that converts.",
  },
  {
    title: "SEO & Web Design",
    desc: "Enhancing your website's performance and ranking to attract organic traffic.",
    includes: ["SEO basics", "Web design", "Performance", "Lead capture"],
    idealFor: "Businesses wanting a strong online presence.",
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
          Services built for <span className="text-yellow-400">results</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          From digital strategy to social media, paid ads, branding, content, and web design—we combine
          what you need to grow.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LocaleLink
            href="/contact"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 sm:w-auto"
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
        <h2 className="text-2xl font-semibold md:text-3xl">What we offer</h2>
        <p className="mt-2 max-w-2xl text-white/60">
          Modular services—combined for performance and conversions.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-400/30"
            >
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>

              <div className="mt-5 h-px bg-white/10" />

              <p className="mt-4 text-xs uppercase tracking-widest text-white/50">Includes</p>

              <ul className="mt-3 grid gap-2 text-sm text-white/70 sm:grid-cols-1">
                {s.includes.map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400/70" />
                    {x}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs text-white/60">Ideal for</p>
                <p className="mt-1 text-sm">{s.idealFor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6 md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Ready to grow? <span className="text-yellow-400">Let&apos;s talk.</span>
          </h2>

          <p className="mt-2 max-w-2xl text-white/70">
            Tell us your goal (leads / sales / brand) and we&apos;ll return with a clear plan.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 sm:w-auto"
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
