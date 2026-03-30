/**
 * Email sending via Nodemailer (SMTP).
 * Set SMTP_USER + SMTP_PASS. Defaults: Gmail (smtp.gmail.com:587).
 * Resend: use their SMTP host/port and credentials from the Resend dashboard.
 */
import nodemailer from "nodemailer";

const TO_EMAIL = process.env.NOTIFICATION_TO_EMAIL ?? process.env.SMTP_USER ?? "daramarketing.eu@gmail.com";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const isConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL ?? "DARA Website <daramarketing.eu@gmail.com>";

export function isSmtpConfigured(): boolean {
  return isConfigured;
}

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!isConfigured) {
    console.warn("SMTP not configured, lead saved to file only, no email sent");
    return { ok: true };
  }

  const html = `
    <h2>Lead i ri nga faqja</h2>
    <p><strong>Emri:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    ${lead.phone ? `<p><strong>Telefoni:</strong> ${escapeHtml(lead.phone)}</p>` : ""}
    ${lead.company ? `<p><strong>Biznesi:</strong> ${escapeHtml(lead.company)}</p>` : ""}
    ${lead.budget ? `<p><strong>Buxheti:</strong> ${escapeHtml(lead.budget)}</p>` : ""}
    <p><strong>Mesazhi:</strong></p>
    <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${escapeHtml(lead.message)}</pre>
    <p style="color:#888;font-size:12px;margin-top:20px;">Dërguar nga DARA website , ${new Date().toISOString()}</p>
  `;

  try {
    console.info("LEAD_EMAIL_ATTEMPT:", {
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: `[DARA] Lead i ri: ${lead.name}`,
      hasPhone: Boolean(lead.phone),
      hasCompany: Boolean(lead.company),
      hasBudget: Boolean(lead.budget),
    });
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: lead.email,
      subject: `[DARA] Lead i ri: ${lead.name}`,
      html,
    });
    console.info("LEAD_EMAIL_SENT:", {
      to: TO_EMAIL,
      subject: `[DARA] Lead i ri: ${lead.name}`,
    });
    return { ok: true };
  } catch (err) {
    console.error("SMTP_ERROR:", err);
    return { ok: false, error: String(err) };
  }
}

const AUTO_REPLY_HTML = (name: string, locale: string) => {
  const copy: Record<string, { subject: string; title: string; body: string; footer: string }> = {
    sq: {
      subject: "Faleminderit , DARA Marketing Agency",
      title: "Faleminderit për mesazhin!",
      body: "Kemi marrë kërkesën tënde dhe do të kontaktojmë brenda 24 orëve.",
      footer: "DARA Marketing Agency , Dare to be Different",
    },
    en: {
      subject: "Thank you , DARA Marketing Agency",
      title: "Thank you for your message!",
      body: "We've received your request and will get back to you within 24 hours.",
      footer: "DARA Marketing Agency , Dare to be Different",
    },
    de: {
      subject: "Vielen Dank , DARA Marketing Agency",
      title: "Vielen Dank für Ihre Nachricht!",
      body: "Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden.",
      footer: "DARA Marketing Agency , Dare to be Different",
    },
  };
  const c = copy[locale] ?? copy.en;
  return `
    <h2>${c.title}</h2>
    <p>${name ? `Hi ${escapeHtml(name)},` : "Hi,"}</p>
    <p>${c.body}</p>
    <p style="color:#888;font-size:12px;margin-top:24px;">${c.footer}</p>
  `;
};

export async function sendAutoReplyToLead(lead: { name: string; email: string }, locale = "en"): Promise<{ ok: boolean; error?: string }> {
  if (!isConfigured) return { ok: true };
  const copy = { sq: "Faleminderit", en: "Thank you", de: "Vielen Dank" };
  const subject = `${copy[locale as keyof typeof copy] ?? copy.en} , DARA Marketing Agency`;
  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: lead.email,
      subject,
      html: AUTO_REPLY_HTML(lead.name, locale),
    });
    return { ok: true };
  } catch (err) {
    console.error("AUTO_REPLY_ERROR:", err);
    return { ok: false, error: String(err) };
  }
}

export async function sendJobNotification(job: {
  name: string;
  email: string;
  role: string;
  phone?: string;
  message: string;
  cvAttachment?: { filename: string; content: Buffer };
}): Promise<{ ok: boolean; error?: string }> {
  if (!isConfigured) {
    console.warn("SMTP not configured — job notification cannot be sent");
    return { ok: false, error: "SMTP_NOT_CONFIGURED" };
  }

  const html = `
    <h2>Aplikim i ri për pune</h2>
    <p><strong>Emri:</strong> ${escapeHtml(job.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(job.email)}</p>
    <p><strong>Pozicioni:</strong> ${escapeHtml(job.role)}</p>
    ${job.phone ? `<p><strong>Telefoni:</strong> ${escapeHtml(job.phone)}</p>` : ""}
    <p><strong>Mesazhi:</strong></p>
    <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${escapeHtml(job.message)}</pre>
    ${job.cvAttachment ? `<p><strong>CV:</strong> ${escapeHtml(job.cvAttachment.filename)} (bashkangjitur)</p>` : ""}
    <p style="color:#888;font-size:12px;margin-top:20px;">Dërguar nga DARA website (Karriere) , ${new Date().toISOString()}</p>
  `;

  const attachments = job.cvAttachment
    ? [{ filename: job.cvAttachment.filename, content: job.cvAttachment.content }]
    : undefined;

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `[DARA Karriere] Aplikim: ${job.name} – ${job.role}`,
      html,
      attachments,
    });
    return { ok: true };
  } catch (err) {
    console.error("SMTP_ERROR:", err);
    return { ok: false, error: "EMAIL_FAILED" };
  }
}

export async function sendNewsletterNotification(email: string, isNew: boolean): Promise<{ ok: boolean; error?: string }> {
  if (!isConfigured) {
    console.warn("SMTP not configured, newsletter saved to file only, no email sent");
    return { ok: true };
  }

  const subject = isNew ? "[DARA] Abonim i ri newsletter" : "[DARA] Abonim newsletter (email ekzistues)";
  const html = `
    <h2>${isNew ? "Abonim i ri" : "Abonim (email ekzistues)"}</h2>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p style="color:#888;font-size:12px;margin-top:20px;">Dërguar nga DARA website , ${new Date().toISOString()}</p>
  `;

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
    });
    return { ok: true };
  } catch (err) {
    console.error("SMTP_ERROR:", err);
    return { ok: false, error: String(err) };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
} 
