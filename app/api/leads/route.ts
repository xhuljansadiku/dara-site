export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isSmtpConfigured, sendLeadNotification, sendAutoReplyToLead } from "@/lib/email";
import { appendLeadToSheets, isGoogleSheetsLeadsConfigured } from "@/lib/leads-sheets";
import { checkRateLimit } from "@/lib/rate-limit";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(s: unknown, max = 2000) {
  return String(s ?? "")
    .trim()
    .slice(0, max);
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "leads.json");

/**
 * Most production/serverless hosts expose a read-only app filesystem.
 * Persist to local JSON only when explicitly enabled or in local development.
 */
function shouldSkipDiskPersistence(): boolean {
  if (process.env.LEADS_PERSIST_TO_DISK === "1") return false;
  if (process.env.LEADS_EMAIL_ONLY === "1") return true;
  if (process.env.VERCEL) return true;
  if (process.env.NETLIFY) return true;
  if (process.env.AWS_LAMBDA_FUNCTION_NAME) return true;
  if (process.env.NODE_ENV === "production") return true;
  return false;
}

type Lead = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  message: string;
  createdAt: string;
};

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
      return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
    }

    const obj = body as Record<string, unknown>;

    // honeypot
    const hp = clean(obj.hp, 200);
    if (hp) return NextResponse.json({ ok: true, bot: true });

    const name = clean(obj.name, 120);
    const email = clean(obj.email, 200).toLowerCase();
    const phone = clean(obj.phone, 50);
    const company = clean(obj.company, 200);
    const budget = clean(obj.budget, 60);
    const message = clean(obj.message, 4000);

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "INVALID_NAME" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "INVALID_EMAIL" }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ ok: false, error: "INVALID_MESSAGE" }, { status: 400 });
    }

    const lead: Lead = {
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      budget: budget || undefined,
      message,
      createdAt: new Date().toISOString(),
    };

    let persistedToDisk = false;
    if (!shouldSkipDiskPersistence()) {
      try {
        await fs.mkdir(DATA_DIR, { recursive: true });

        let list: Lead[] = [];
        try {
          const raw = await fs.readFile(FILE_PATH, "utf8");
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) list = parsed as Lead[];
        } catch {
          // no file yet
        }

        list.push(lead);
        await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), "utf8");
        persistedToDisk = true;
      } catch (err) {
        console.error("LEADS_DISK_ERROR:", err);
      }
    } else {
      console.info("LEADS: skipping local disk (Vercel/serverless); relying on email delivery.");
    }

    const sheetsConfigured = isGoogleSheetsLeadsConfigured();
    const smtpConfigured = isSmtpConfigured();

    if (!smtpConfigured && !sheetsConfigured && !persistedToDisk) {
      console.error("LEADS_NO_DELIVERY_METHOD");
      return NextResponse.json(
        { ok: false, error: "NO_DELIVERY_METHOD", saved: false },
        { status: 503 }
      );
    }

    // Save to Google Sheets (blocking — primary backup)
    if (sheetsConfigured) {
      const sheetsResult = await appendLeadToSheets(lead);
      if (!sheetsResult.ok) {
        console.error("LEADS_SHEETS_ERROR:", sheetsResult.error);
      } else {
        console.info("LEADS_SHEETS_OK");
      }
    }

    // Send email notification
    let emailed = false;
    if (smtpConfigured) {
      console.log("LEADS_ROUTE_NOTIFY_START:", {
        email,
        phone: phone || null,
        company: company || null,
        budget: budget || null,
      });
      const notify = await sendLeadNotification(lead);
      console.log("LEADS_ROUTE_NOTIFY_RESULT:", notify);
      if (!notify.ok) {
        console.error("LEAD_EMAIL_ERROR:", notify.error);
        // Don't fail if Sheets succeeded
        if (!sheetsConfigured && !persistedToDisk) {
          return NextResponse.json(
            { ok: false, error: "EMAIL_FAILED", saved: persistedToDisk },
            { status: 502 }
          );
        }
      } else {
        emailed = true;
      }
    }

    // Auto-reply to client (non-blocking)
    const locale = ["sq", "en", "de"].includes(clean(obj.locale, 5)) ? clean(obj.locale, 5) : "en";
    if (smtpConfigured) {
      sendAutoReplyToLead({ name, email }, locale).catch((err) => console.error("AUTO_REPLY_ERROR:", err));
    }

    return NextResponse.json({ ok: true, saved: persistedToDisk || shouldSkipDiskPersistence(), emailed, sheets: sheetsConfigured });
  } catch (e) {
    console.error("LEADS_ERROR:", e);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
