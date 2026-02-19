"use client";

import { createContext, useContext } from "react";
import { ReCaptchaProvider, useReCaptcha } from "next-recaptcha-v3";

const rawKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
// Treat placeholder or invalid keys as "no captcha" (6Lxxxxx, 6L..., empty, or too short)
const siteKey =
  rawKey &&
  rawKey.length > 20 &&
  !rawKey.includes("xxxxx") &&
  !rawKey.endsWith("...")
    ? rawKey
    : "";

type RecaptchaContextValue = { getToken: (action: string) => Promise<string> };
const RecaptchaContext = createContext<RecaptchaContextValue>({
  getToken: async () => "",
});

function RecaptchaInner({ children }: { children: React.ReactNode }) {
  const { executeRecaptcha } = useReCaptcha();
  const value: RecaptchaContextValue = {
    getToken: async (action) => {
      try {
        return await executeRecaptcha(action);
      } catch (e) {
        console.warn("reCAPTCHA getToken failed:", e);
        return "";
      }
    },
  };
  return (
    <RecaptchaContext.Provider value={value}>{children}</RecaptchaContext.Provider>
  );
}

export function useRecaptchaToken() {
  return useContext(RecaptchaContext);
}

export default function RecaptchaProviderWrap({ children }: { children: React.ReactNode }) {
  if (!siteKey) {
    return (
      <RecaptchaContext.Provider value={{ getToken: async () => "" }}>
        {children}
      </RecaptchaContext.Provider>
    );
  }
  return (
    <ReCaptchaProvider reCaptchaKey={siteKey} useRecaptchaNet>
      <RecaptchaInner>{children}</RecaptchaInner>
    </ReCaptchaProvider>
  );
}
