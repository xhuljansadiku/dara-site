import { getRequestConfig } from "next-intl/server";

const locales = ["sq", "en", "de"] as const;

export default getRequestConfig(async ({ locale }) => {
  const safeLocale: string = locales.includes((locale ?? "sq") as (typeof locales)[number]) ? (locale ?? "sq") : "sq";
        
  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default,
  };
});
