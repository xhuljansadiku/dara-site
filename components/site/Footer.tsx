// components/site/Footer.tsx
import LocaleLink from "@/components/site/LocaleLink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-semibold tracking-wide">
              <span className="text-white">DA</span>
              <span className="text-yellow-400">RA</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-white/60">
              Dare to be different. We bring brand stories to life through bold strategies,
              digital marketing, and creative content.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Social Media", "Ads", "Branding", "Web Design"].map((x) => (
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
              <p className="text-sm font-semibold text-white">Pages</p>
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
              <p className="text-sm font-semibold text-white">Contact</p>
              <ul className="mt-4 grid gap-2 text-sm text-white/60">
                <li>
                  <a className="hover:text-white" href="mailto:daramarketing.eu@gmail.com">
                    daramarketing.eu@gmail.com
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="tel:+355688009988">
                    +355 68 800 9988
                  </a>
                </li>
                <li className="text-white/40">EU</li>
              </ul>

              <div className="mt-5">
                <p className="text-sm font-semibold text-white">Social</p>
                <div className="mt-3 flex gap-3">
                  <a
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:text-white"
                    href="https://instagram.com/daramarketing.eu"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @daramarketing.eu
                  </a>
                  <a
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:text-white"
                    href="https://instagram.com/daramarketing.al"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @daramarketing.al
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-6">
            <p className="text-sm text-white/70">Ready to grow?</p>
            <p className="mt-2 text-xl font-semibold">
              Let’s work together and create <span className="text-yellow-400">something great</span>.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <LocaleLink
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-5 font-medium text-black hover:bg-yellow-300"
              >
                Merr ofertë
              </LocaleLink>

              <LocaleLink
                href="/work"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 text-white/90 hover:border-white/25 hover:bg-white/10"
              >
                Shiko work
              </LocaleLink>
            </div>

            <p className="mt-4 text-xs text-white/50">No spam. Clear communication. Real results.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} DARA. All rights reserved.</p>
          <div className="flex gap-4">
            <LocaleLink className="hover:text-white" href="/privacy">
              Privacy
            </LocaleLink>
            <LocaleLink className="hover:text-white" href="/terms">
              Terms
            </LocaleLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
