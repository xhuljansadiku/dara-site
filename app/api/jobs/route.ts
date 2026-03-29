export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { checkRateLimit } from "@/lib/rate-limit";
import { writeFileWithRetry } from "@/lib/fs-retry";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(s: unknown, max = 2000) {
  return String(s ?? "")
    .trim()
    .slice(0, max);
}

const DATA_DIR = path.join(process.cwd(), "data");
const CV_DIR = path.join(DATA_DIR, "cvs");
const FILE_PATH = path.join(DATA_DIR, "jobs.json");
const MAX_CV_SIZE = 5 * 1024 * 1024; // 5 MB
const PDF_MIME = "application/pdf";

function getCvUpload(formData: FormData): { blob: Blob; filename: string } | null {
  const v = formData.get("cv");
  if (v == null || typeof v !== "object") return null;
  if (!(v instanceof Blob)) return null;
  if (v.size === 0) return null;
  const filename = v instanceof File && v.name ? v.name : "document.pdf";
  return { blob: v, filename };
}

type JobApplication = {
  name: string;
  email: string;
  role: string;
  phone?: string;
  message: string;
  cvFilename?: string;
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
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ ok: false, error: "INVALID_CONTENT_TYPE" }, { status: 415 });
    }

    let formData: FormData;
    try {
      formData = await req.formData();
    } catch (e) {
      console.error("JOBS_FORMDATA_PARSE:", e);
      return NextResponse.json({ ok: false, error: "INVALID_MULTIPART" }, { status: 400 });
    }

    const hp = clean(formData.get("hp"), 200);
    if (hp) return NextResponse.json({ ok: true, bot: true });

    const name = clean(formData.get("name"), 120);
    const email = clean(formData.get("email"), 200).toLowerCase();
    const role = clean(formData.get("role"), 100);
    const phone = clean(formData.get("phone"), 50) || undefined;
    const message = clean(formData.get("message"), 4000);
    const locale = ["sq", "en", "de"].includes(clean(formData.get("locale"), 5))
      ? clean(formData.get("locale"), 5)
      : "en";

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "INVALID_NAME" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "INVALID_EMAIL" }, { status: 400 });
    }
    if (!role || role.length < 2) {
      return NextResponse.json({ ok: false, error: "INVALID_ROLE" }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ ok: false, error: "INVALID_MESSAGE" }, { status: 400 });
    }

    const cvUpload = getCvUpload(formData);
    if (!cvUpload) {
      return NextResponse.json({ ok: false, error: "INVALID_CV" }, { status: 400 });
    }
    const { blob: cvBlob, filename: cvOriginalName } = cvUpload;
    const nameLower = cvOriginalName.toLowerCase();
    if (cvBlob.type !== PDF_MIME && !nameLower.endsWith(".pdf")) {
      return NextResponse.json({ ok: false, error: "INVALID_CV" }, { status: 400 });
    }
    if (cvBlob.size > MAX_CV_SIZE) {
      return NextResponse.json({ ok: false, error: "INVALID_CV" }, { status: 400 });
    }

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(CV_DIR, { recursive: true });

    const timestamp = Date.now();
    const safeName = name.replace(/[^a-zA-ZëçÇË\s]/g, "").replace(/\s+/g, "-").slice(0, 30) || "applicant";
    const cvFilename = `CV_${safeName}_${timestamp}.pdf`;
    const cvPath = path.join(CV_DIR, cvFilename);
    const arrayBuffer = await cvBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(cvPath, buffer, "binary");

    let list: JobApplication[] = [];
    try {
      const raw = await fs.readFile(FILE_PATH, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) list = parsed as JobApplication[];
    } catch {
      // no file yet
    }

    const job: JobApplication = {
      name,
      email,
      role,
      phone,
      message,
      cvFilename,
      createdAt: new Date().toISOString(),
    };

    list.push(job);
    await writeFileWithRetry(FILE_PATH, JSON.stringify(list, null, 2));

    void import("@/lib/email")
      .then(({ sendJobNotification, sendAutoReplyToLead }) => {
        sendJobNotification({
          ...job,
          cvAttachment: { filename: cvFilename, content: buffer },
        }).catch((err) => console.error("JOB_EMAIL_ERROR:", err));

        sendAutoReplyToLead({ name, email }, locale).catch((err) =>
          console.error("AUTO_REPLY_ERROR:", err)
        );
      })
      .catch((err) => console.error("EMAIL_IMPORT_ERROR:", err));

    return NextResponse.json({ ok: true, saved: true });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error("JOBS_ERROR:", err.message, err.stack);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
