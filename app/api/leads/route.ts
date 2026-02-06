export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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
    const body = await req.json();

    // honeypot
    const hp = clean(body.hp, 200);
    if (hp) return NextResponse.json({ ok: true, bot: true });

    const name = clean(body.name, 120);
    const email = clean(body.email, 200).toLowerCase();
    const company = clean(body.company, 200);
    const budget = clean(body.budget, 60);
    const message = clean(body.message, 4000);

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

    return NextResponse.json({ ok: true, saved: true });
  } catch (e) {
    console.error("LEADS_ERROR:", e);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
