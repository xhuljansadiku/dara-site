import LocaleLink from "@/components/site/LocaleLink";
import MarketingVideo from "@/components/site/MarketingVideo";
import { ABOUT_BY_LOCALE, ABOUT_STATS_BY_LOCALE } from "@/lib/home-about";

type Locale = "sq" | "en" | "de";

/** Homepage "About us": the agency video fills the section, with the copy and the key numbers on top. */
export default function HomeAboutSection({ locale, years }: { locale: Locale; years: string }) {
  const about = ABOUT_BY_LOCALE[locale];
  const raw = ABOUT_STATS_BY_LOCALE[locale];
  const stats = [{ value: years, label: raw[0].label }, ...raw.slice(1)];

  return (
    <section id="about" aria-labelledby="about-heading" className="relative isolate overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <MarketingVideo src="/video/about-dara.mp4" className="h-full w-full object-cover opacity-60" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/25" aria-hidden />
      <div className="mx-auto flex min-h-[90svh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 md:px-8">
        <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">
          <span className="h-px w-8 bg-gradient-to-r from-[#B89D5E]/80 to-transparent" aria-hidden />
          {about.kicker}
        </span>
        <div className="mt-5 max-w-2xl">
          <h2 id="about-heading" className="font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight md:text-8xl">
            {about.titlePrefix}
            <span className="text-[#d1b780]">{about.titleAccent}</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80">{about.paragraphs[0]}</p>
          <p className="mt-4 leading-relaxed text-white/60">{about.paragraphs[1]}</p>
        </div>
        <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <dt className="mt-1 text-xs text-white/70">{s.label}</dt>
              <dd className="font-display text-3xl font-bold text-[#d1b780] md:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <LocaleLink
            href="/about"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#B89D5E] px-7 text-sm font-semibold text-neutral-950 transition hover:bg-[#d4bd85]"
          >
            {about.readMore}
            <span aria-hidden className="transition group-hover:translate-x-0.5">
              →
            </span>
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
