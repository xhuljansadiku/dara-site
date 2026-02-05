export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "newsletter.json");

export async function POST(req: Request) {
  try {
    // 1️⃣ Content-Type validation
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "INVALID_CONTENT_TYPE" },
        { status: 415 }
      );
    }

    // 2️⃣ Safe body parsing
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "INVALID_JSON" },
        { status: 400 }
      );
    }

    // 3️⃣ Shape + type validation
    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { ok: false, error: "INVALID_BODY" },
        { status: 400 }
      );
    }

    const email = typeof body.email === "string"
      ? body.email.trim().toLowerCase()
      : "";

    const hp = typeof body.hp === "string"
      ? body.hp.trim()
      : "";

    // 4️⃣ Honeypot (bots)
    if (hp) {
      return NextResponse.json({ ok: true, bot: true });
    }

    // 5️⃣ Email validation
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "INVALID_EMAIL" },
        { status: 400 }
      );
    }

    // 6️⃣ Ensure data dir
    await fs.mkdir(DATA_DIR, { recursive: true });

    let list: Array<{ email: string; createdAt: string }> = [];

    try {
      const raw = await fs.readFile(FILE_PATH, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) list = parsed;
    } catch {
      // file does not exist yet → OK
    }

    const exists = list.some((x) => x.email === email);

    if (!exists) {
      list.push({
        email,
        createdAt: new Date().toISOString(),
      });

      await fs.writeFile(
        FILE_PATH,
        JSON.stringify(list, null, 2),
        "utf8"
      );
    }

    return NextResponse.json({
      ok: true,
      saved: !exists,
      exists,
    });
  } catch (e) {
    console.error("NEWSLETTER_ERROR:", e);
    return NextResponse.json(
      { ok: false, error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
