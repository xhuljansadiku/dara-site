import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "@/i18n";

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locales.includes((locale ?? defaultLocale) as (typeof locales)[number])
    ? (locale ?? defaultLocale)
    : defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default,
  };
});
