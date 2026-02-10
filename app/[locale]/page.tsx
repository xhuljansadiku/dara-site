// app/[locale]/page.tsx - Matches Dara Marketing EU PDF structure
import NewsletterForm from "@/components/NewsletterForm";
import LocaleLink from "@/components/site/LocaleLink";

const services = [
  {
    title: "Digital Marketing Strategy",
    desc: "Tailored strategies to meet the unique needs of your business.",
  },
  {
    title: "Social Media Design",
    desc: "Content creation, community management, and growth strategies for platforms like Instagram, Facebook, TikTok and LinkedIn.",
  },
  {
    title: "Paid Advertising (Meta Ads & Google Ads)",
    desc: "Targeted advertising to boost your brand visibility and drive conversions.",
  },
  {
    title: "Branding",
    desc: "Crafting strong, consistent, and recognizable brand identities.",
  },
  {
    title: "Creative Content Creation",
    desc: "Visual designs, copywriting, and storytelling to engage and attract customers.",
  },
  {
    title: "SEO & Web Design",
    desc: "Enhancing your website's performance and ranking to attract organic traffic.",
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
      {/* HERO - PDF: Dare To Be Different / Dara Marketing Agency */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-40px] top-40 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">
            Dara Marketing Agency
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-7xl">
            Dare to be{" "}
            <span className="text-yellow-400">different</span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <a href="https://instagram.com/daramarketing.eu" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
              @daramarketing.eu
            </a>
            <span className="text-white/30">|</span>
            <a href="https://instagram.com/daramarketing.al" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
              @daramarketing.al
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-6 font-medium text-black hover:bg-yellow-300 sm:w-auto"
            >
              Contact us
            </LocaleLink>

            <LocaleLink
              href="#services"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-white/90 hover:border-white/25 hover:bg-white/10 sm:w-auto"
            >
              Services
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* ABOUT - PDF: HELLO! MY NAME IS RED */}
      <section id="about" className="py-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">About me</p>

        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
          Hello! My name is <span className="text-yellow-400">Red</span>
        </h2>

        <div className="mt-6 max-w-2xl space-y-4 text-base text-white/70 md:text-lg">
          <p>
            I&apos;m Red, the founder of DARA Marketing Agency, a creative mind with a deep passion for
            marketing and business. With 5 years of experience, I&apos;ve learned that success comes not from
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
      </section>

      {/* SERVICES - PDF: SERVICES */}
      <section id="services" className="py-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">Services</p>

        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
          What we <span className="text-yellow-400">offer</span>
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-400/30"
            >
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.desc}</p>
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
        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/80">Previous projects</p>

        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
          Our <span className="text-yellow-400">work</span>
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-yellow-400/30"
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
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-8 md:p-12">
          <h2 className="text-2xl font-semibold md:text-4xl">
            Let&apos;s work together and create <span className="text-yellow-400">something great</span>
          </h2>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
            <a href="mailto:daramarketing.eu@gmail.com" className="hover:text-yellow-400">
              daramarketing.eu@gmail.com
            </a>
            <span className="text-white/30">|</span>
            <a href="https://instagram.com/daramarketing.al" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
              @daramarketing.al
            </a>
            <span className="text-white/30">|</span>
            <a href="https://instagram.com/daramarketing.eu" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
              @daramarketing.eu
            </a>
            <span className="text-white/30">|</span>
            <a href="tel:+355688009988" className="hover:text-yellow-400">
              +355 68 800 9988
            </a>
          </div>

          <div className="mt-8 max-w-xl">
            <NewsletterForm />
          </div>

          <p className="mt-3 text-xs text-white/50">No spam. Unsubscribe anytime.</p>

          <div className="mt-6">
            <LocaleLink
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-6 font-medium text-black hover:bg-yellow-300"
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
