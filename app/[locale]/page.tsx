// app/[locale]/page.tsx - Matches Dara Marketing EU PDF structure
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";
import LocaleLink from "@/components/site/LocaleLink";

const services = [
  {
    title: "Social Media Management",
    desc: "Content strategy, post creation, planning and performance analysis to increase brand presence and engagement.",
    price: "From €250/month",
  },
  {
    title: "Content Creation",
    desc: "Photos, videos, reels and creative materials to reflect brand identity and attract the right audience.",
  },
  {
    title: "Digital Marketing Strategy",
    desc: "Business analysis and personalized strategy for real growth — positioning, objectives and concrete ideas.",
    price: "From €300/strategy",
  },
  {
    title: "Branding & Visual Identity",
    desc: "Logo, visual guidelines, communication tone and professional image for a strong market presence.",
  },
  {
    title: "Ads Management",
    desc: "Creation and optimization of Meta & Google campaigns to increase sales, leads and brand recognition.",
    price: "From €150/month",
  },
  {
    title: "Marketing Consulting",
    desc: "Strategic consulting to increase performance, clarify direction and make smarter decisions.",
    price: "From €80/session",
  },
  {
    title: "Marketing & Social Media Training",
    desc: "Practical training on marketing, social networks and digital strategies in an applicable way.",
    price: "From €250/program",
  },
  {
    title: "Website, E-commerce & SaaS",
    desc: "Customized websites, e-commerce and software products for private use or companies.",
  },
];

const projects = [
  { title: "Don Mare Hotel & Restaurant", tag: "Social Media", desc: "A cozy hotel in Dhermi Village. We collaborated to shape their social media presence to target new customers." },
  { title: "355 Black", tag: "Social Media", desc: "A dynamic mobile phone and accessories company in Tirana. We collaborated to enhance their social media presence and drive engagement." },
  { title: "Aia Hotel & Apartments", tag: "Social Media", desc: "Located in Tirana, offering comfortable accommodations. We worked together to strengthen their social media presence." },
  { title: "Zorada", tag: "Social Media", desc: "A premium jewelry brand. We collaborated to elevate their social media presence, attracting jewelry lovers." },
  { title: "City Fitness Club", tag: "Social Media", desc: "Located in Tirana. We partnered to boost their social media presence, engaging fitness enthusiasts." },
  { title: "Cara Dental Clinic", tag: "Social Media", desc: "Located in Tirana. We worked together to enhance their social media presence, attracting new patients." },
  { title: "Premium International Real Estate", tag: "Social Media", desc: "We collaborated to strengthen their social media presence, targeting high-end buyers and investors worldwide." },
  { title: "Nova Real Estate", tag: "Social Media", desc: "We partnered to enhance their social media presence, attracting potential buyers and investors." },
  { title: "Icon Store", tag: "Social Media", desc: "We collaborated to boost their social media presence, engaging fashion enthusiasts." },
  { title: "DD Store", tag: "Social Media", desc: "Women's clothing and accessories. We worked together to enhance their social media presence." },
  { title: "KOA Consulting", tag: "Social Media & Logo", desc: "We collaborated to strengthen their social media presence and create their logo." },
  { title: "Endis Store", tag: "Brand Identity", desc: "We partnered to elevate their social media presence and establish a strong brand identity." },
  { title: "Taxi Service Dhermi", tag: "Web Design", desc: "We collaborated on web design to create an engaging, user-friendly website for booking rides online." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO - Dare To Be Different / Dara Marketing Agency */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#c8a55c]/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#c8a55c]/5 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-px w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#c8a55c]/30 to-transparent" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.25em] text-[#c8a55c]">
            DARA
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">Marketing Agency</p>

          <h1 className="mt-8 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Dare to be{" "}
            <span className="text-[#c8a55c]">different</span>
          </h1>

          <p className="mt-6 text-base text-white/60 md:text-lg">
            We bring brand stories to life through bold strategies and results-oriented marketing.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <a href="https://instagram.com/daramarketing.eu" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c] transition-colors">
              @daramarketing.eu
            </a>
            <span className="text-white/30">|</span>
            <a href="https://instagram.com/daramarketing.al" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c] transition-colors">
              @daramarketing.al
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#c8a55c] px-8 font-medium text-black hover:bg-[#b6944f] sm:w-auto"
            >
              Contact us
            </LocaleLink>

            <LocaleLink
              href="#services"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 text-white/90 backdrop-blur hover:border-[#c8a55c]/40 hover:bg-white/10 sm:w-auto"
            >
              Services
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* ABOUT - PDF: HELLO! MY NAME IS RED */}
      <section id="about" className="py-12 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]">About me</p>

            <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
              Hello! My name is <span className="text-[#c8a55c]">Red</span>
            </h2>

            <div className="mt-6 space-y-4 text-base text-white/70 md:text-lg">
          <p>
            I&apos;m Red, the founder of DARA Marketing Agency, a creative mind with a deep passion for
            marketing and business. With 7 years of experience, I&apos;ve learned that success comes not from
            following the rules but from daring to be different.
          </p>
          <p>
            Driven by the philosophy of &quot;Dare to be Different&quot;, I believe every brand has a unique story to tell.
            My mission is to bring those stories to life through bold and innovative strategies. For me,
            marketing is more than just a profession—it&apos;s a way to create real impact and challenge the
            ordinary.
          </p>
          <p>
            Always seeking new opportunities, I combine intuition, creativity, and a clear vision to help
            businesses grow and transform into success stories.
          </p>
        </div>

        <div className="mt-8 flex gap-3">
          <LocaleLink
            href="/about"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
          >
            Read more
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

      {/* SERVICES - PDF: SERVICES */}
      <section id="services" className="py-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">Services</p>

        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
          What we <span className="text-[#c8a55c]">offer</span>
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#c8a55c]/30"
            >
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>
              {"price" in s && s.price && (
                <p className="mt-4 text-sm font-medium text-[#c8a55c]">Indicative: {s.price}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <LocaleLink
            href="/services"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
          >
            View all services
          </LocaleLink>
        </div>
      </section>

      {/* PREVIOUS PROJECTS - PDF: PREVIOUS PROJECTS */}
      <section id="work" className="py-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-[#c8a55c]/80">Previous projects</p>

        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
          Our <span className="text-[#c8a55c]">work</span>
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#c8a55c]/30"
            >
              <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60">
                {p.tag}
              </span>
              <h3 className="mt-3 font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-white/60">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <LocaleLink
            href="/work"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
          >
            View all projects
          </LocaleLink>
        </div>
      </section>

      {/* CTA - PDF: LET'S WORK TOGETHER AND CREATE SOMETHING GREAT */}
      <section className="py-12 md:py-20">
        <div className="rounded-3xl border border-[#c8a55c]/20 bg-[#c8a55c]/5 p-8 md:p-12">
          <h2 className="text-2xl font-semibold md:text-4xl">
            Let&apos;s work together and create <span className="text-[#c8a55c]">something great</span>
          </h2>

          <div className="mt-6 space-y-2 text-sm text-white/80">
            <p>
              <a href="mailto:daramarketing.eu@gmail.com" className="hover:text-[#c8a55c]">daramarketing.eu@gmail.com</a>
              {" · "}
              <a href="tel:+355688009988" className="hover:text-[#c8a55c]">+355 68 800 9988</a>
            </p>
            <p>
              <a
                href="https://maps.google.com/?q=Rruga+Donika+Kastrioti,+Bllok,+Tirane,+Albania"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#c8a55c]"
              >
                Rruga Donika Kastrioti, Bllok, Tirane, Albania
              </a>
            </p>
            <p>
              <a href="https://instagram.com/daramarketing.eu" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c]">Instagram</a>
              {" · "}
              <a href="https://facebook.com/daramarketing.eu" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c]">Facebook</a>
              {" · "}
              <a href="https://linkedin.com/company/daramarketing" target="_blank" rel="noreferrer" className="hover:text-[#c8a55c]">LinkedIn</a>
            </p>
          </div>

          <div className="mt-8 max-w-xl">
            <NewsletterForm />
          </div>

          <p className="mt-3 text-xs text-white/50">No spam. Unsubscribe anytime.</p>

          <div className="mt-6">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#c8a55c] px-6 font-medium text-black hover:bg-[#b6944f]"
            >
              Get in touch
            </LocaleLink>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </>
  );
}
