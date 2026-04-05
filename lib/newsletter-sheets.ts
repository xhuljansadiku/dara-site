/**
 * Append newsletter signup to Google Sheets via a deployed Google Apps Script web app URL.
 * Set GOOGLE_SHEETS_NEWSLETTER_URL to the web app URL. Optional: GOOGLE_SHEETS_NEWSLETTER_SECRET
 * (same value stored in the script’s Script properties) to reject random POSTs.
 */

const TIMEOUT_MS = 12_000;

export type SheetsAppendResult = { ok: true } | { ok: false; error: string };

export async function appendNewsletterEmailToSheets(email: string): Promise<SheetsAppendResult> {
  const url = process.env.GOOGLE_SHEETS_NEWSLETTER_URL;
  if (!url?.trim()) {
    return { ok: false, error: "SHEETS_URL_MISSING" };
  }

  const secret = process.env.GOOGLE_SHEETS_NEWSLETTER_SECRET;
  const body: Record<string, string> = {
    email,
    subscribedAt: new Date().toISOString(),
  };
  if (secret) body.secret = secret;

  try {
    const res = await fetch(url.trim(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } | null = null;
    try {
      parsed = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      parsed = null;
    }

    if (!res.ok) {
      console.error("NEWSLETTER_SHEETS_HTTP:", res.status, text.slice(0, 300));
      return { ok: false, error: "SHEETS_HTTP" };
    }

    if (parsed?.ok !== true) {
      console.error(
        "NEWSLETTER_SHEETS_BAD_RESPONSE:",
        parsed?.ok === false ? parsed.error : "not_json_or_missing_ok",
        text.slice(0, 400)
      );
      return { ok: false, error: parsed?.ok === false ? (parsed.error ?? "SHEETS_REJECTED") : "SHEETS_BAD_RESPONSE" };
    }

    return { ok: true };
  } catch (e) {
    console.error("NEWSLETTER_SHEETS_FETCH:", e);
    return { ok: false, error: "SHEETS_FETCH" };
  }
}

export function isGoogleSheetsNewsletterConfigured(): boolean {
  return !!process.env.GOOGLE_SHEETS_NEWSLETTER_URL?.trim();
}
