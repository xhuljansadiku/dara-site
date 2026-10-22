import AnimateIn from "@/components/site/AnimateIn";
import { GOOGLE_MAPS_PLACE_URL, GOOGLE_REVIEWS, formatReviewerName } from "@/lib/google-reviews";
import type { Locale } from "@/lib/services-data";

const COPY: Record<
  Locale,
  { kicker: string; title: string; subtitle: string; viewOnGoogle: string; client: string; training: string; stars: string }
> = {
  sq: {
    kicker: "Review nga Google",
    title: "Çfarë thonë klientët dhe pjesëmarrësit",
    subtitle: "Vlerësime publike në Google, nga klientë të agjencisë dhe nga pjesëmarrës në trajnimet tona.",
    viewOnGoogle: "Shiko të gjitha në Google",
    client: "Klient",
    training: "Pjesëmarrës në trajnim",
    stars: "yje nga 5",
  },
  en: {
    kicker: "Google reviews",
    title: "What clients and participants say",
    subtitle: "Public Google reviews from agency clients and from participants in our training programmes.",
    viewOnGoogle: "View all on Google",
    client: "Client",
    training: "Training participant",
    stars: "out of 5 stars",
  },
  de: {
    kicker: "Google-Bewertungen",
    title: "Was Kunden und Teilnehmende sagen",
    subtitle: "Öffentliche Google-Bewertungen von Agenturkunden und von Teilnehmenden unserer Trainings.",
    viewOnGoogle: "Alle bei Google ansehen",
    client: "Kunde",
    training: "Trainings-Teilnehmer",
    stars: "von 5 Sternen",
  },
};

/** Client reviews first: they are the relevant proof for agency enquiries. */
const ORDERED_REVIEWS = [
  ...GOOGLE_REVIEWS.filter((r) => r.source === "client"),
  ...GOOGLE_REVIEWS.filter((r) => r.source === "training"),
];

export default function GoogleReviewsSection({ locale }: { locale: Locale }) {
  const copy = COPY[locale];

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-neutral-950 p-6 shadow-2xl shadow-black/25 ring-1 ring-white/10 md:rounded-[2rem] md:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#B89D5E]/12 blur-3xl" aria-hidden />

          <div className="relative mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d1b780]">{copy.kicker}</span>
              <h2 id="reviews-heading" className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
                {copy.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">{copy.subtitle}</p>
            </div>
            <a
              href={GOOGLE_MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full max-w-xs shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/15 focus-visible:outline-white sm:w-auto"
            >
              {copy.viewOnGoogle}
              <span aria-hidden>↗</span>
            </a>
          </div>

          <ul className="relative columns-1 gap-4 md:columns-2 lg:columns-3">
            {ORDERED_REVIEWS.map((review, idx) => (
              <li key={`${review.firstName}-${idx}`} className="mb-4 break-inside-avoid">
                <AnimateIn delay={Math.min(idx, 5) * 60}>
                  <figure className="flex flex-col rounded-2xl bg-white p-6 shadow-xl shadow-black/20">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[#8a7344]" role="img" aria-label={`${review.rating} ${copy.stars}`}>
                        {"★".repeat(review.rating)}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          review.source === "client"
                            ? "bg-neutral-950 text-white"
                            : "bg-[#B89D5E]/15 text-[#5c4c2c] ring-1 ring-[#B89D5E]/30"
                        }`}
                      >
                        {review.source === "client" ? copy.client : copy.training}
                      </span>
                    </div>
                    <blockquote className="mt-4 text-sm leading-relaxed text-neutral-700">
                      <p>{review.text[locale]}</p>
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-neutral-100 pt-4">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white"
                        aria-hidden
                      >
                        {review.firstName.charAt(0)}
                        {review.lastName?.charAt(0) ?? ""}
                      </span>
                      <span className="font-semibold text-neutral-950">
                        {formatReviewerName(review.firstName, review.lastName)}
                      </span>
                    </figcaption>
                  </figure>
                </AnimateIn>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
