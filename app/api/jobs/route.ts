export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { checkRateLimit } from "@/lib/rate-limit";
import { writeFileWithRetry } from "@/lib/fs-retry";
import { isSmtpConfigured, sendAutoReplyToLead, sendJobNotification } from "@/lib/email";

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

/**
 * Most production hosts (Vercel, Netlify, many Node panels) have a read-only app directory.
 * Opt into local JSON/CV files with JOBS_PERSIST_TO_DISK=1 (e.g. VPS with writable ./data).
 */
function shouldSkipDiskPersistence(): boolean {
  if (process.env.JOBS_PERSIST_TO_DISK === "1") return false;
  if (process.env.JOBS_EMAIL_ONLY === "1") return true;
  if (process.env.VERCEL) return true;
  if (process.env.NETLIFY) return true;
  if (process.env.AWS_LAMBDA_FUNCTION_NAME) return true;
  if (process.env.NODE_ENV === "production") return true;
  return false;
}

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

function redirectWithError(req: Request, formData: FormData | null, errorCode: string, status = 303) {
  const raw = clean(formData?.get("errorRedirectTo"), 300);
  if (!raw || !raw.startsWith("/")) {
    return NextResponse.json({ ok: false, error: errorCode }, { status });
  }
  const location = new URL(raw, req.url);
  location.searchParams.set("error", errorCode);
  return NextResponse.redirect(location, status);
}

function redirectWithSuccess(req: Request, formData: FormData | null) {
  const raw = clean(formData?.get("redirectTo"), 300);
  if (!raw || !raw.startsWith("/")) {
    return NextResponse.json({ ok: true, saved: true, emailed: true });
  }
  return NextResponse.redirect(new URL(raw, req.url), 303);
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: "METHOD_NOT_ALLOWED",
      message:
        "Use POST (multipart) from the careers form. Opening this URL in a browser does not submit an application.",
    },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function POST(req: Request) {
  let parsedFormData: FormData | null = null;
  try {
    const rateLimit = checkRateLimit(req);
    if (!rateLimit.ok) {
      return redirectWithError(req, null, "RATE_LIMITED", 303);
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ ok: false, error: "INVALID_CONTENT_TYPE" }, { status: 415 });
    }

    let formData: FormData;
    try {
      formData = await req.formData();
      parsedFormData = formData;
    } catch (e) {
      console.error("JOBS_FORMDATA_PARSE:", e);
      return NextResponse.json({ ok: false, error: "INVALID_MULTIPART" }, { status: 400 });
    }

    const hp = clean(formData.get("hp"), 200);
    if (hp) return redirectWithSuccess(req, formData);

    const name = clean(formData.get("name"), 120);
    const email = clean(formData.get("email"), 200).toLowerCase();
    const role = clean(formData.get("role"), 100);
    const phone = clean(formData.get("phone"), 50) || undefined;
    const message = clean(formData.get("message"), 4000);
    const locale = ["sq", "en", "de"].includes(clean(formData.get("locale"), 5))
      ? clean(formData.get("locale"), 5)
      : "en";

    if (!name || name.length < 2) {
      return redirectWithError(req, formData, "INVALID_NAME");
    }
    if (!isValidEmail(email)) {
      return redirectWithError(req, formData, "INVALID_EMAIL");
    }
    if (!role || role.length < 2) {
      return redirectWithError(req, formData, "INVALID_ROLE");
    }
    if (!message || message.length < 10) {
      return redirectWithError(req, formData, "INVALID_MESSAGE");
    }

    const cvUpload = getCvUpload(formData);
    if (!cvUpload) {
      return redirectWithError(req, formData, "INVALID_CV");
    }
    const { blob: cvBlob, filename: cvOriginalName } = cvUpload;
    const nameLower = cvOriginalName.toLowerCase();
    if (cvBlob.type !== PDF_MIME && !nameLower.endsWith(".pdf")) {
      return redirectWithError(req, formData, "INVALID_CV");
    }
    if (cvBlob.size > MAX_CV_SIZE) {
      return redirectWithError(req, formData, "INVALID_CV");
    }

    const timestamp = Date.now();
    const safeName = name.replace(/[^a-zA-ZëçÇË\s]/g, "").replace(/\s+/g, "-").slice(0, 30) || "applicant";
    const cvFilename = `CV_${safeName}_${timestamp}.pdf`;
    let buffer: Buffer;
    try {
      const arrayBuffer = await cvBlob.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } catch (e) {
      console.error("JOBS_CV_BUFFER:", e);
      return redirectWithError(req, formData, "INVALID_CV");
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

    if (!shouldSkipDiskPersistence()) {
      try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.mkdir(CV_DIR, { recursive: true });
        const cvPath = path.join(CV_DIR, cvFilename);
        await writeFileWithRetry(cvPath, buffer);

        let list: JobApplication[] = [];
        try {
          const raw = await fs.readFile(FILE_PATH, "utf8");
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) list = parsed as JobApplication[];
        } catch {
          // no file yet
        }
        list.push(job);
        await writeFileWithRetry(FILE_PATH, JSON.stringify(list, null, 2));
      } catch (e) {
        console.error("JOBS_DISK_ERROR:", e);
      }
    } else {
      console.info("JOBS: skipping local disk (Vercel/serverless); applications rely on email.");
    }

    if (!isSmtpConfigured()) {
      return redirectWithError(req, formData, "SMTP_NOT_CONFIGURED");
    }

    const notify = await sendJobNotification({
      ...job,
      cvAttachment: { filename: cvFilename, content: buffer },
    });

    if (!notify.ok) {
      return redirectWithError(req, formData, notify.error === "SMTP_NOT_CONFIGURED" ? "SMTP_NOT_CONFIGURED" : "EMAIL_FAILED");
    }

    const auto = await sendAutoReplyToLead({ name, email }, locale);
    if (!auto.ok) {
      console.error("AUTO_REPLY_ERROR:", auto.error);
    }

    return redirectWithSuccess(req, formData);
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error("JOBS_ERROR:", err.message, err.stack);
    return redirectWithError(req, parsedFormData, "SERVER_ERROR");
  }
}
