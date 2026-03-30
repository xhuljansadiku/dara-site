import Link from "next/link";

const LANGUAGE_OPTIONS = [
  { href: "/sq", label: "Shqip", note: "Vazhdo në shqip" },
  { href: "/en", label: "English", note: "Continue in English" },
  { href: "/de", label: "Deutsch", note: "Weiter auf Deutsch" },
] as const;

export default function RootPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#faf7f1_0%,#f5efe4_44%,#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-20 h-56 w-56 rounded-full bg-[#B89D5E]/16 blur-3xl" />
        <div className="absolute right-[10%] top-12 h-64 w-64 rounded-full bg-[#111827]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <section className="w-full max-w-2xl rounded-[2rem] border border-stone-200/80 bg-white/92 p-8 text-center shadow-[0_30px_100px_-40px_rgba(15,23,42,0.35)] backdrop-blur md:p-12">
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
