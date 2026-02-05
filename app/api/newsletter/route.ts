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
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const hp = String(body.hp ?? "").trim();

    if (hp) return NextResponse.json({ ok: true, bot: true });

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "INVALID_EMAIL" }, { status: 400 });
    }

    await fs.mkdir(DATA_DIR, { recursive: true });

    let list: Array<{ email: string; createdAt: string }> = [];
    try {
      const raw = await fs.readFile(FILE_PATH, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) list = parsed;
    } catch {
      // no file yet
    }

    const exists = list.some((x) => x.email === email);
    if (!exists) {
      list.push({ email, createdAt: new Date().toISOString() });
      await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), "utf8");
    }

    return NextResponse.json({ ok: true, saved: true, exists });
  } catch (e) {
    console.error("NEWSLETTER_ERROR:", e);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
