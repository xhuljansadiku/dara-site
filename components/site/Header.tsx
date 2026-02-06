import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold tracking-wide">
          <span className="text-white">YOUR</span>
          <span className="text-yellow-400">AGENCY</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
          <Link href="#services" className="hover:text-white">Shërbime</Link>
          <Link href="#work" className="hover:text-white">Punë</Link>
          <Link href="#process" className="hover:text-white">Procesi</Link>
          <Link href="#faq" className="hover:text-white">FAQ</Link>
        </nav>

        <Link
          href="#contact"
          className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-300"
        >
          Merr ofertë
        </Link>
      </div>
    </header>
  );
}
