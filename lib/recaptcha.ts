/**
 * reCAPTCHA v3 server-side verification.
 * Set RECAPTCHA_SECRET_KEY in .env.local to enable.
 */
export async function verifyRecaptcha(token: string | null | undefined): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  // Skip if not set or placeholder (6Lxxxxx, 6L..., etc.)
  if (
    !secret ||
    secret.length < 20 ||
    secret.includes("xxxxx") ||
    secret.endsWith("...")
  ) {
    if (secret) console.warn("RECAPTCHA_SECRET_KEY looks like placeholder , captcha verification skipped");
    return true;
  }
  if (!token || typeof token !== "string") {
    return false;
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    const data = (await res.json()) as { success?: boolean; score?: number };
    // score >= 0.5 is typically considered human
    return Boolean(data.success) && (data.score ?? 0) >= 0.5;
  } catch (e) {
    console.error("RECAPTCHA_VERIFY_ERROR:", e);
    return false;
  }
}
