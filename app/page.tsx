import Image from "next/image";
import Link from "next/link";

const LANGUAGE_OPTIONS = [
  { href: "/sq", code: "SQ", label: "Shqip", note: "Vazhdo në shqip" },
  { href: "/en", code: "EN", label: "English", note: "Continue in English" },
  { href: "/de", code: "DE", label: "Deutsch", note: "Weiter auf Deutsch" },
] as const;

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function RootPage() {
  return (
    <main className="relative isolate min-h-screen min-h-[100dvh] overflow-hidden px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10">
      {/* Full-bleed: public/hero-bg-dara.png (z-0 layers — negative z was hidden behind main bg) */}
      <div className="absolute inset-0 z-0 bg-[#0a0c10]" aria-hidden>
        <Image
          src="/hero-bg-dara.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] max-sm:scale-100 sm:scale-105 sm:object-center motion-safe:transition-transform motion-safe:duration-[20s] motion-safe:ease-out"
        />
      </div>

      {/* Cinematic overlays (above image, below content) */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(184,157,94,0.12),transparent_55%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/35 to-black/65" aria-hidden />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[min(100%,48rem)] bg-gradient-to-r from-black/70 via-black/35 to-transparent sm:w-[min(100%,52rem)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:h-56"
        aria-hidden
      />

      {/* Soft gold ambience */}
      <div
        className="pointer-events-none absolute -left-24 top-1/4 z-[1] h-72 w-72 rounded-full bg-[#B89D5E]/15 blur-[100px] motion-safe:animate-pulse motion-safe:duration-[4s]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 z-[1] h-64 w-64 rounded-full bg-[#B89D5E]/10 blur-[90px] motion-safe:animate-pulse motion-safe:duration-[5s] motion-safe:delay-1000"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] max-w-6xl flex-col">
        {/* Top bar */}
        <header className="animate-fade-in-up flex shrink-0 flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <Link
            href="/en"
            className="group flex items-center gap-3 rounded-lg outline-offset-4 transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89D5E]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c10]"
          >
            <span className="relative h-11 w-[7.5rem] shrink-0 sm:h-12 sm:w-[8.25rem]">
              <Image
                src="/logo.png"
                alt="DARA Marketing Agency"
                fill
                className="object-contain object-left drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
                sizes="(max-width: 640px) 140px, 160px"
                priority
              />
            </span>
          </Link>
          <p className="font-display text-[11px] font-medium uppercase tracking-[0.35em] text-white/45 sm:text-xs">
            dara.al
          </p>
        </header>

        {/* Hero + language picker */}
        <div className="flex flex-1 flex-col items-center justify-center py-12 sm:py-16 md:py-20">
          <div className="w-full max-w-3xl text-center">
            <p className="animate-fade-in-up animate-fade-in-up-delay-1 font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-[#d4c49a] md:text-xs">
              DARA Marketing Agency
            </p>

            <h1 className="animate-fade-in-up animate-fade-in-up-delay-2 mt-5 font-display text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-white md:mt-6">
              <span className="block">Dare to be</span>
              <span className="mt-1 block bg-gradient-to-r from-[#e8d9a8] via-[#B89D5E] to-[#8a7344] bg-clip-text text-transparent">
                different
              </span>
            </h1>

            <div
              className="animate-fade-in-up animate-fade-in-up-delay-3 mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#B89D5E]/80 to-transparent md:mt-7"
              aria-hidden
            />

            <div className="animate-fade-in-up animate-fade-in-up-delay-3 mx-auto mt-6 max-w-lg space-y-1.5 text-base leading-relaxed text-white/70 md:text-lg">
              <p className="text-pretty">· Zgjidh gjuhën tënde</p>
              <p className="text-pretty">· Choose your language</p>
              <p className="text-pretty">· Wählen Sie Ihre Sprache</p>
            </div>
          </div>

          <div className="mt-12 grid w-full max-w-4xl grid-cols-3 gap-2 sm:mt-14 sm:gap-5">
            {LANGUAGE_OPTIONS.map((option, i) => (
              <Link
                key={option.href}
                href={option.href}
                className={`animate-fade-in-up group relative min-w-0 overflow-hidden rounded-[1rem] border border-white/12 bg-white/[0.07] p-3 text-center shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)] backdrop-blur-md transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89D5E]/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0c10] motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#B89D5E]/45 motion-safe:hover:bg-white/[0.11] motion-safe:hover:shadow-[0_32px_70px_-30px_rgba(184,157,94,0.22)] sm:rounded-[1.35rem] sm:p-6 sm:text-left ${
                  i === 0
                    ? "animate-fade-in-up-delay-4"
                    : i === 1
                      ? "animate-fade-in-up-delay-5"
                      : "[animation-delay:0.55s]"
                }`}
              >
                <span
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(184,157,94,0.12) 0%, transparent 45%, rgba(255,255,255,0.04) 100%)",
                  }}
                />
                <div className="relative flex items-center justify-center gap-3 sm:items-start sm:justify-between">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-black/25 font-display text-[10px] font-bold tracking-widest text-[#d4c49a] transition group-hover:border-[#B89D5E]/40 group-hover:text-white sm:h-11 sm:w-11 sm:rounded-2xl sm:text-sm">
                    {option.code}
                  </span>
                  <ArrowIcon className="mt-1 hidden shrink-0 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-[#B89D5E] sm:block" />
                </div>
                <div className="relative mt-2 text-center sm:mt-5 sm:text-left">
                  <div className="font-display text-[0.8125rem] font-semibold leading-tight tracking-tight text-white sm:text-xl md:text-[1.35rem]">
                    {option.label}
                  </div>
                  <div className="mt-1.5 text-[10px] leading-snug text-white/55 sm:mt-2 sm:text-sm">{option.note}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <footer className="animate-fade-in-up shrink-0 pb-2 text-center [animation-delay:0.65s]">
          <p className="text-[11px] text-white/35 sm:text-xs">© {new Date().getFullYear()} DARA · dara.al</p>
        </footer>
      </div>
    </main>
  );
}
