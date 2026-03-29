import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold tracking-wide">
          <span className="text-gray-900">YOUR</span>
          <span className="text-[#B89D5E]">AGENCY</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-gray-900/80 md:flex">
          <Link href="#services" className="hover:text-gray-900">Shërbime</Link>
          <Link href="#work" className="hover:text-gray-900">Punë</Link>
          <Link href="#process" className="hover:text-gray-900">Procesi</Link>
          <Link href="#faq" className="hover:text-gray-900">FAQ</Link>
        </nav>

        <Link
          href="#contact"
          className="rounded-xl bg-[#B89D5E] px-4 py-2 text-sm font-medium text-black hover:bg-[#9a8a52]"
        >
          Merr ofertë
        </Link>
      </div>
    </header>
  );
}
