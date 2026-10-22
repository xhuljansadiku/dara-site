import LocaleLink from "@/components/site/LocaleLink";
import { CONTACT } from "@/lib/business-facts";
import { CTA_BY_LOCALE } from "@/lib/home-cta";

type Locale = "sq" | "en" | "de";

/** Homepage closing call to action: a dark bar with the promise on the left and two ways to start on the right. */
export default function HomeContactCta({ locale }: { locale: Locale }) {
  const cta = CTA_BY_LOCALE[locale];
  return (
    <section id="contact-cta" aria-labelledby="cta-heading" className="bg-[#f4f1ea] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-8 rounded-[2rem] bg-neutral-950 p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 id="cta-heading" className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-tight md:text-6xl">
              {cta.title} <span className="text-[#d1b780]">{cta.titleAccent}</span>
            </h2>
            <p className="mt-4 max-w-lg text-white/65">{cta.subtitle}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <LocaleLink
              href="/contact"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#B89D5E] px-8 text-base font-semibold text-neutral-950 transition hover:bg-[#d4bd85]"
            >
              {cta.button}
              <span aria-hidden className="transition group-hover:translate-x-1">
                →
              </span>
            </LocaleLink>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 px-8 text-base font-semibold transition hover:border-[#25D366] hover:text-[#25D366]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
