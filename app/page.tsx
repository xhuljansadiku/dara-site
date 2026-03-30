import Link from "next/link";

const LANGUAGE_OPTIONS = [
  { href: "/sq", label: "Shqip", note: "Vazhdo në shqip" },
  { href: "/en", label: "English", note: "Continue in English" },
  { href: "/de", label: "Deutsch", note: "Weiter auf Deutsch" },
] as const;

export default function RootPage() {
  return (
    <main className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-[#111827] px-4 py-24 sm:px-6 sm:py-24 md:py-32">
      <img
        src="/hero-bg-dara.png"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        aria-hidden
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-black/30" aria-hidden />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[min(100%,40rem)] bg-gradient-to-r from-black/55 via-black/25 to-transparent sm:w-[min(100%,46rem)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[rgba(0,0,0,0.3)] via-[rgba(0,0,0,0.12)] to-transparent sm:h-52"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] max-w-5xl items-center justify-center">
        <section className="w-full max-w-2xl rounded-[2rem] border border-white/15 bg-white/88 p-8 text-center shadow-[0_30px_100px_-40px_rgba(15,23,42,0.55)] backdrop-blur md:p-12">
          <span className="inline-flex items-center rounded-full border border-[#B89D5E]/30 bg-[#B89D5E]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b5a38]">
            DARA Marketing Agency
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-neutral-950 md:text-6xl">
            Zgjidh gjuhën
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-neutral-600 md:text-lg">
            Choose your language.
            <br />
            Wählen Sie Ihre Sprache.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {LANGUAGE_OPTIONS.map((option) => (
              <Link
                key={option.href}
                href={option.href}
                className="group rounded-3xl border border-stone-200 bg-stone-50/70 px-5 py-6 text-left transition hover:border-[#B89D5E]/45 hover:bg-white hover:shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)]"
              >
                <div className="text-lg font-semibold text-neutral-950">{option.label}</div>
                <div className="mt-2 text-sm text-neutral-500">{option.note}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
