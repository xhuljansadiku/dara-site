// app/[locale]/work/page.tsx
import LocaleLink from "@/components/site/LocaleLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Previous projects: Don Mare Hotel, 355 Black, Aia Hotel, Zorada, City Fitness, Cara Dental, Premium Real Estate, Nova Real Estate, Icon Store, DD Store, KOA Consulting, Endis Store, Taxi Service Dhermi.",
};

const projects = [
  {
    title: "Don Mare Hotel & Restaurant",
    tag: "Social Media",
    desc: "A cozy hotel in Dhermi Village offering hotel, restaurant and beach bar services. We collaborated to shape their social media presence to target new customers.",
  },
  {
    title: "355 Black",
    tag: "Social Media",
    desc: "A dynamic mobile phone and accessories company in Tirana. We collaborated to enhance their social media presence and drive engagement, targeting tech enthusiasts and mobile users.",
  },
  {
    title: "Aia Hotel & Apartments",
    tag: "Social Media",
    desc: "Located in Tirana, offering comfortable accommodations and modern amenities. We worked together to strengthen their social media presence, attracting travelers and locals to book stays.",
  },
  {
    title: "Zorada",
    tag: "Social Media",
    desc: "A premium jewelry brand offering unique and elegant designs. We collaborated to elevate their social media presence, attracting jewelry lovers and showcasing their exclusive collections.",
  },
  {
    title: "City Fitness Club",
    tag: "Social Media",
    desc: "Located in Tirana, offering state-of-the-art gym facilities and personalized fitness programs. We partnered to boost their social media presence, engaging fitness enthusiasts.",
  },
  {
    title: "Cara Dental Clinic",
    tag: "Social Media",
    desc: "Located in Tirana, providing top-quality dental care. We worked together to enhance their social media presence, attracting new patients and promoting their expertise in dental health.",
  },
  {
    title: "Premium International Real Estate",
    tag: "Social Media",
    desc: "Offers luxurious properties and exclusive real estate services. We collaborated to strengthen their social media presence, targeting high-end buyers and investors worldwide.",
  },
  {
    title: "Nova Real Estate",
    tag: "Social Media",
    desc: "Specializes in high-quality properties and real estate services. We partnered to enhance their social media presence, attracting potential buyers and investors.",
  },
  {
    title: "Icon Store",
    tag: "Social Media",
    desc: "Offers a curated selection of fashion, accessories, and lifestyle products. We collaborated to boost their social media presence, engaging fashion enthusiasts and promoting their collections.",
  },
  {
    title: "DD Store",
    tag: "Social Media",
    desc: "Offers a stylish collection of women's clothing and accessories. We worked together to enhance their social media presence, attracting fashion-forward women.",
  },
  {
    title: "KOA Consulting",
    tag: "Social Media & Logo",
    desc: "Provides expert financial services and strategic advice. We collaborated to strengthen their social media presence and create their logo, targeting businesses seeking professional financial guidance.",
  },
  {
    title: "Endis Store",
    tag: "Brand Identity",
    desc: "Offers a wide range of premium products with a focus on branding and quality. We partnered to elevate their social media presence and establish a strong brand identity.",
  },
  {
    title: "Taxi Service Dhermi",
    tag: "Web Design",
    desc: "Offers reliable transportation in the Dhermi area. We collaborated on web design to create an engaging, user-friendly website that promotes their services and makes it easy for customers to book rides online.",
  },
];

const tags = ["All", "Social Media", "Brand Identity", "Web Design"] as const;

export default function WorkPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">Work</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Previous <span className="text-yellow-400">projects</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
          A selection of brands we&apos;ve helped grow through social media, branding, and web design.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LocaleLink
            href="/contact"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 sm:w-auto"
          >
            Start a project
          </LocaleLink>

          <LocaleLink
            href="/services"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            Our services
          </LocaleLink>
        </div>
      </section>

      {/* TAG BAR */}
      <section className="py-6">
        <div className="-mx-4 overflow-x-auto px-4">
          <div className="flex w-max flex-nowrap gap-2 whitespace-nowrap">
            {tags.map((f) => (
              <span
                key={f}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((c) => (
            <div
              key={c.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-yellow-400/30"
            >
              <div className="aspect-[4/3] w-full bg-gradient-to-b from-white/10 to-white/5" />

              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{c.title}</p>
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60">
                    {c.tag}
                  </span>
                </div>

                <p className="mt-2 text-sm text-white/60">{c.desc}</p>
              </div>
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
            Tell us your goal and we&apos;ll return with a clear plan.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300 sm:w-auto"
            >
              Contact us
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
