export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isSmtpConfigured, sendNewsletterNotification } from "@/lib/email";
import { appendNewsletterEmailToSheets, isGoogleSheetsNewsletterConfigured } from "@/lib/newsletter-sheets";
import { checkRateLimit } from "@/lib/rate-limit";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "newsletter.json");

/**
 * Local JSON file only when disk is writable (dev / VPS). Hosted serverless → skip disk.
 * Not tied to a single host: NODE_ENV + common PaaS envs.
 */
function shouldSkipDiskPersistence(): boolean {
  if (process.env.NEWSLETTER_PERSIST_TO_DISK === "1") return false;
  if (process.env.NEWSLETTER_EMAIL_ONLY === "1") return true;
  if (process.env.LEADS_PERSIST_TO_DISK === "1") return false;
  if (process.env.LEADS_EMAIL_ONLY === "1") return true;
  if (process.env.NETLIFY) return true;
  if (process.env.AWS_LAMBDA_FUNCTION_NAME) return true;
  if (process.env.NODE_ENV === "production") return true;
  return false;
}

async function syncSheetsIfConfigured(email: string): Promise<{ ok: boolean; error?: string }> {
  if (!isGoogleSheetsNewsletterConfigured()) {
    return { ok: true };
  }
  const result = await appendNewsletterEmailToSheets(email);
  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  return { ok: true };
}

export async function POST(req: Request) {
  try {
    const rateLimit = checkRateLimit(req);
    if (!rateLimit.ok) {
      return NextResponse.json(
        { ok: false, error: "RATE_LIMITED" },
        { status: 429, headers: rateLimit.retryAfter ? { "Retry-After": String(rateLimit.retryAfter) } : undefined }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ ok: false, error: "INVALID_CONTENT_TYPE" }, { status: 415 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
    }

    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ ok: false, error: "INVALID_BODY" }, { status: 400 });
    }

    const obj = body as Record<string, unknown>;
    const email = typeof obj.email === "string" ? obj.email.trim().toLowerCase() : "";
    const hp = typeof obj.hp === "string" ? obj.hp.trim() : "";

    if (hp) {
      return NextResponse.json({ ok: true, bot: true });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "INVALID_EMAIL" }, { status: 400 });
    }

    let exists = false;
    let savedToDisk = false;

    if (!shouldSkipDiskPersistence()) {
      try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        let list: Array<{ email: string; createdAt: string }> = [];
        try {
          const raw = await fs.readFile(FILE_PATH, "utf8");
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) list = parsed;
        } catch {
          /* no file yet */
        }
        exists = list.some((x) => x.email === email);
        if (!exists) {
          list.push({ email, createdAt: new Date().toISOString() });
          await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), "utf8");
        }
        savedToDisk = true;
      } catch (err) {
        console.error("NEWSLETTER_DISK_ERROR:", err);
      }
    } else {
      console.info("NEWSLETTER: skipping local disk; using SMTP and/or Google Sheets.");
    }

    const smtpOk = isSmtpConfigured();
    const sheetsOk = isGoogleSheetsNewsletterConfigured();
    /** Njoftim me email te admin vetëm kur nuk ke Google Sheets; me Sheets → vetëm rreshti në fletë. */
    const wantAdminEmail = smtpOk && !sheetsOk;
    const mustDeliverRemotely = shouldSkipDiskPersistence() || !savedToDisk;

    if (mustDeliverRemotely) {
      if (!wantAdminEmail && !sheetsOk) {
        console.error("NEWSLETTER_SMTP_OR_SHEETS_REQUIRED");
        return NextResponse.json({ ok: false, error: "SMTP_NOT_CONFIGURED" }, { status: 503 });
      }
      if (sheetsOk) {
        const sheet = await syncSheetsIfConfigured(email);
        if (!sheet.ok) {
          return NextResponse.json({ ok: false, error: "SHEETS_FAILED" }, { status: 502 });
        }
      }
      if (wantAdminEmail) {
        const notify = await sendNewsletterNotification(email, !exists);
        if (!notify.ok) {
          return NextResponse.json({ ok: false, error: "EMAIL_FAILED" }, { status: 502 });
        }
      }
      return NextResponse.json({ ok: true, saved: !exists, exists });
    }

    if (sheetsOk && !exists) {
      const sheet = await syncSheetsIfConfigured(email);
      if (!sheet.ok) {
        console.error("NEWSLETTER_SHEETS_ERROR:", sheet.error);
      }
    }

    if (wantAdminEmail) {
      sendNewsletterNotification(email, !exists).catch((err) => console.error("NEWSLETTER_EMAIL_ERROR:", err));
    }

    return NextResponse.json({ ok: true, saved: !exists, exists });
  } catch (e) {
    console.error("NEWSLETTER_ERROR:", e);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
