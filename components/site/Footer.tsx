// components/site/Footer.tsx
import Image from "next/image";
import LocaleLink from "@/components/site/LocaleLink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#1f1f1f]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)_minmax(0,1.2fr)]">
          {/* Brand */}
          <div>
            <div className="flex flex-col items-start gap-2">
              <Image
                src="/logo.png"
                alt="DARA Marketing Agency"
                width={150}
                height={48}
                className="h-9 w-auto object-contain sm:h-10 md:h-11"
              />
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">Marketing Agency</p>
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/60">
              Dare to be different. We partner with brands that want bold strategy, premium content and measurable
              growth.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Strategy", "Social Media", "Paid Ads", "Branding", "Web & E‑commerce"].map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Pages</p>
              <ul className="mt-4 grid gap-2 text-sm text-white/60">
                <li>
                  <LocaleLink className="hover:text-white" href="/">
                    Home
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white" href="/services">
                    Services
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white" href="/work">
                    Work
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white" href="/process">
                    Process
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white" href="/about">
                    About
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white" href="/contact">
                    Contact
                  </LocaleLink>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Legal</p>
              <ul className="mt-4 grid gap-2 text-sm text-white/60">
                <li>
                  <LocaleLink className="hover:text-white" href="/privacy">
                    Privacy policy
                  </LocaleLink>
                </li>
                <li>
                  <LocaleLink className="hover:text-white" href="/terms">
                    Terms & conditions
                  </LocaleLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact / CTA */}
          <div className="rounded-3xl border border-[#c8a55c]/25 bg-[#c8a55c]/5 p-6 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c8a55c]">Let&apos;s work together</p>
            <p className="mt-3 font-display text-xl font-semibold">
              Ready to grow with a{" "}
              <span className="text-[#c8a55c]">strategic marketing partner</span>?
            </p>

            <div className="mt-4 space-y-2 text-sm text-white/80">
              <p>
                <a className="hover:text-[#c8a55c]" href="mailto:daramarketing.eu@gmail.com">
                  daramarketing.eu@gmail.com
                </a>
              </p>
              <p>
                <a className="hover:text-[#c8a55c]" href="tel:+355688009988">
                  +355 68 800 9988
                </a>
              </p>
              <p>
                <a
                  className="hover:text-[#c8a55c]"
                  href="https://maps.google.com/?q=Rruga+Donika+Kastrioti,+Bllok,+Tirane,+Albania"
                  target="_blank"
                  rel="noreferrer"
                >
                  Rruga Donika Kastrioti, Bllok, Tiranë, Albania
                </a>
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <LocaleLink
                href="/contact"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-[#c8a55c] px-5 text-sm font-medium text-black hover:bg-[#b6944f]"
              >
                Get a quote
              </LocaleLink>

            <LocaleLink
              href="/work"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-sm text-white/90 hover:border-white/25 hover:bg-white/10"
            >
              View work
            </LocaleLink>
            </div>

            <p className="mt-4 text-xs text-white/50">
              No long-term lock‑ins. Clear strategy, transparent reporting, real results.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/70">
              <a
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2 hover:border-[#c8a55c]/50 hover:text-[#c8a55c]"
                href="https://instagram.com/daramarketing.eu"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2 hover:border-[#c8a55c]/50 hover:text-[#c8a55c]"
                href="https://facebook.com/daramarketing.eu"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <a
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2 hover:border-[#c8a55c]/50 hover:text-[#c8a55c]"
                href="https://linkedin.com/company/daramarketing"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} DARA. All rights reserved.</p>
          <p className="text-white/40">Dare to be different.</p>
        </div>
      </div>
    </footer>
  );
}
