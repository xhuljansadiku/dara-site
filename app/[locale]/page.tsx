"use client";

import { useTranslations } from "next-intl";
import NewsletterForm from "../../components/NewsletterForm";

export default function Home() {
  const t = useTranslations();

  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-xs tracking-[0.35em] text-[#c8a96a]">
              {t("hero.kicker")}
            </p>

            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              {t("hero.titleA")}{" "}
              <span className="text-[#c8a96a]">{t("hero.titleB")}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
              {t("hero.desc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-[#c8a96a] px-6 py-3 text-sm font-medium text-black hover:bg-[#e2c37a]"
              >
                {t("hero.ctaPrimary")}
              </a>
              <a
                href="#works"
                className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/90 hover:border-white/30"
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8">
            <div className="aspect-[4/5] w-full rounded-2xl bg-white/5" />
            <p className="mt-4 text-sm text-white/60">
              (B&W visual me gold accents)
            </p>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <h2 className="text-2xl font-semibold">Newsletter</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Get weekly tips on content strategy, growth and performance marketing.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
