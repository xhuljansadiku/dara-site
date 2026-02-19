export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendLeadNotification, sendAutoReplyToLead } from "@/lib/email";
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

type Lead = {
  name: string;
  email: string;
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

    // reCAPTCHA v3
    const recaptchaToken = typeof obj.recaptchaToken === "string" ? obj.recaptchaToken : "";
    const captchaValid = await verifyRecaptcha(recaptchaToken);
    if (!captchaValid) {
      return NextResponse.json({ ok: false, error: "CAPTCHA_FAILED" }, { status: 400 });
    }

    const name = clean(obj.name, 120);
    const email = clean(obj.email, 200).toLowerCase();
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

    await fs.mkdir(DATA_DIR, { recursive: true });

    let list: Lead[] = [];
    try {
      const raw = await fs.readFile(FILE_PATH, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) list = parsed as Lead[];
    } catch {
      // no file yet
    }

    const lead: Lead = {
      name,
      email,
      company: company || undefined,
      budget: budget || undefined,
      message,
      createdAt: new Date().toISOString(),
    };

    list.push(lead);
    await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), "utf8");

    // Send email notification (non-blocking; don't fail if email fails)
    sendLeadNotification(lead).catch((err) => console.error("LEAD_EMAIL_ERROR:", err));

    // Auto-reply to client (non-blocking)
    const locale = ["sq", "en", "de"].includes(clean(obj.locale, 5)) ? clean(obj.locale, 5) : "en";
    sendAutoReplyToLead({ name, email }, locale).catch((err) => console.error("AUTO_REPLY_ERROR:", err));

    return NextResponse.json({ ok: true, saved: true });
  } catch (e) {
    console.error("LEADS_ERROR:", e);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
