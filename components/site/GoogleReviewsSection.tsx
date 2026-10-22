"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { GOOGLE_MAPS_PLACE_URL, GOOGLE_REVIEWS, formatReviewerName, type GoogleReview } from "@/lib/google-reviews";
import type { Locale } from "@/lib/services-data";

const COPY: Record<
  Locale,
  {
    kicker: string;
    title: string;
    titleHighlight: string;
    /** Highlight used on the trainings page, where participants are the audience. */
    titleHighlightTraining: string;
    subtitle: string;
    viewOnGoogle: string;
    client: string;
    training: string;
    stars: string;
    onGoogle: string;
    prev: string;
    next: string;
    swipe: string;
  }
> = {
  sq: {
    kicker: "Review nga Google",
    title: "Çfarë thonë",
    titleHighlight: "klientët",
    titleHighlightTraining: "pjesëmarrësit",
    subtitle: "Vlerësime publike në Google, nga klientë të agjencisë dhe nga pjesëmarrës në trajnimet tona.",
    viewOnGoogle: "Shiko të gjitha në Google",
    client: "Klient",
    training: "Pjesëmarrës në trajnim",
    stars: "yje nga 5",
    onGoogle: "në Google",
    prev: "Review e mëparshme",
    next: "Review tjetër",
    swipe: "Rrëshqitni kartën ose shtypni shigjetat",
  },
  en: {
    kicker: "Google reviews",
    title: "What our",
    titleHighlight: "clients say",
    titleHighlightTraining: "participants say",
    subtitle: "Public Google reviews from agency clients and from participants in our training programmes.",
    viewOnGoogle: "View all on Google",
    client: "Client",
    training: "Training participant",
    stars: "out of 5 stars",
    onGoogle: "on Google",
    prev: "Previous review",
    next: "Next review",
    swipe: "Swipe the card or use the arrows",
  },
  de: {
    kicker: "Google-Bewertungen",
    title: "Was unsere",
    titleHighlight: "Kunden sagen",
    titleHighlightTraining: "Teilnehmenden sagen",
    subtitle: "Öffentliche Google-Bewertungen von Agenturkunden und von Teilnehmenden unserer Trainings.",
    viewOnGoogle: "Alle bei Google ansehen",
    client: "Kunde",
    training: "Trainings-Teilnehmer",
    stars: "von 5 Sternen",
    onGoogle: "bei Google",
    prev: "Vorherige Bewertung",
    next: "Nächste Bewertung",
    swipe: "Karte wischen oder Pfeile nutzen",
  },
};
type Copy = (typeof COPY)["en"];

type Audience = "agency" | "training";

/** The reviews that matter most to the audience come first: clients for agency pages, participants for trainings. */
const REVIEWS_BY_AUDIENCE: Record<Audience, GoogleReview[]> = {
  agency: [...GOOGLE_REVIEWS.filter((r) => r.source === "client"), ...GOOGLE_REVIEWS.filter((r) => r.source === "training")],
  training: [...GOOGLE_REVIEWS.filter((r) => r.source === "training"), ...GOOGLE_REVIEWS.filter((r) => r.source === "client")],
};

const AVATAR = ["bg-[#B89D5E] text-neutral-950", "bg-neutral-800 text-[#d1b780]", "bg-[#5c4c2c] text-white", "bg-[#e3cf9c] text-neutral-950"];

/** How far (px) the top card must be dragged before it goes to the back of the deck. */
const SWIPE_THRESHOLD = 80;

function GoogleG({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Stars({ n, copy }: { n: number; copy: Copy }) {
  return (
    <span className="flex gap-0.5 text-[#d1b780]" role="img" aria-label={`${n} ${copy.stars}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={`h-4 w-4 ${i < n ? "" : "opacity-25"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.2 3.7a1 1 0 00.95.69h3.89c.97 0 1.37 1.24.59 1.81l-3.15 2.29a1 1 0 00-.36 1.12l1.2 3.7c.3.92-.75 1.69-1.54 1.12l-3.15-2.29a1 1 0 00-1.17 0l-3.15 2.29c-.78.57-1.83-.2-1.54-1.12l1.2-3.7a1 1 0 00-.36-1.12L2.42 9.13c-.78-.57-.38-1.81.59-1.81h3.89a1 1 0 00.95-.69l1.2-3.7z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * The reviews as a deck of cards: drag the top card sideways (or use the arrows) and it goes to the back,
 * revealing the next one. The cards behind peek out, slightly turned.
 */
export default function GoogleReviewsSection({ locale, audience = "agency" }: { locale: Locale; audience?: Audience }) {
  const copy = COPY[locale];
  const ORDERED_REVIEWS = REVIEWS_BY_AUDIENCE[audience];
  const [order, setOrder] = useState(() => ORDERED_REVIEWS.map((_, i) => i));
  const [dx, setDx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const start = useRef<number | null>(null);

  const advance = (dir: 1 | -1) => {
    if (leaving) return;
    if (dir === -1) {
      setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
      setDx(0);
      return;
    }
    // Fly the top card out, then move it to the back.
    setLeaving(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setLeaving(false);
        setDx(0);
      },
      reduced ? 0 : 320
    );
  };
  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    start.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent) => {
    if (start.current !== null) setDx(e.clientX - start.current);
  };
  const onUp = () => {
    if (start.current === null) return;
    start.current = null;
    setDragging(false);
    if (Math.abs(dx) > SWIPE_THRESHOLD) advance(dx < 0 ? 1 : -1);
    else setDx(0);
  };

  const top = ORDERED_REVIEWS[order[0]];
  const arrow = "flex h-12 w-12 items-center justify-center rounded-full border border-neutral-950/15 bg-white text-neutral-950 transition hover:border-neutral-950";

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:px-8 lg:grid-cols-2">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
            <GoogleG className="h-3.5 w-3.5" />
            {copy.kicker}
          </span>
          <h2 id="reviews-heading" className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight text-neutral-950 md:text-6xl">
            {copy.title} <span className="text-[#8a7344]">{audience === "training" ? copy.titleHighlightTraining : copy.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">{copy.subtitle}</p>
          <a
            href={GOOGLE_MAPS_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            <GoogleG />
            {copy.viewOnGoogle}
            <span aria-hidden>↗</span>
          </a>
        </div>

        <div>
          <div className="relative mx-auto h-[27rem] w-full max-w-md touch-pan-y select-none">
            {order
              .slice(0, 4)
              .reverse()
              .map((ri) => {
                const pos = order.indexOf(ri);
                const r = ORDERED_REVIEWS[ri];
                const isTop = pos === 0;
                const x = isTop ? (leaving ? -520 : dx) : 0;
                return (
                  <div
                    key={ri}
                    onPointerDown={isTop ? onDown : undefined}
                    onPointerMove={isTop ? onMove : undefined}
                    onPointerUp={isTop ? onUp : undefined}
                    onPointerCancel={isTop ? onUp : undefined}
                    aria-hidden={!isTop || undefined}
                    className={`absolute inset-0 ${isTop ? "cursor-grab active:cursor-grabbing" : ""} ${dragging && isTop ? "" : "transition-transform duration-300 ease-out"}`}
                    style={{
                      transform: `translate(${x}px, ${pos * 22}px) rotate(${isTop ? x / 18 : pos % 2 ? 2.5 : -2.5}deg) scale(${1 - pos * 0.05})`,
                      zIndex: 10 - pos,
                      opacity: pos > 2 ? 0 : 1,
                    }}
                  >
                    <figure className="flex h-full flex-col rounded-[1.75rem] bg-neutral-950 p-7 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] md:p-8">
                      <div className="flex items-center justify-between">
                        <Stars n={r.rating} copy={copy} />
                        <span className="flex items-center gap-2 text-xs text-white/50">
                          <GoogleG />
                          {copy.onGoogle}
                        </span>
                      </div>
                      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-white/85">
                        <p className="line-clamp-10">{r.text[locale]}</p>
                      </blockquote>
                      <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${AVATAR[ri % AVATAR.length]}`} aria-hidden>
                          {r.firstName.charAt(0)}
                          {r.lastName?.charAt(0) ?? ""}
                        </span>
                        <span>
                          <span className="block font-semibold">{formatReviewerName(r.firstName, r.lastName)}</span>
                          <span className="block text-xs text-white/50">{r.source === "client" ? copy.client : copy.training}</span>
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                );
              })}
          </div>
          <div className="mt-12 flex items-center justify-center gap-4">
            <button type="button" onClick={() => advance(-1)} aria-label={copy.prev} className={arrow}>
              ←
            </button>
            <p className="min-w-16 text-center font-display text-sm tabular-nums text-neutral-500" aria-live="polite">
              <span className="sr-only">{formatReviewerName(top.firstName, top.lastName)}: </span>
              {String(order[0] + 1).padStart(2, "0")} / {String(ORDERED_REVIEWS.length).padStart(2, "0")}
            </p>
            <button type="button" onClick={() => advance(1)} aria-label={copy.next} className={arrow}>
              →
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-neutral-400">{copy.swipe}</p>
        </div>
      </div>
    </section>
  );
}
