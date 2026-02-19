/**
 * Email sending via Resend.
 * Set RESEND_API_KEY in .env.local to enable.
 */
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const TO_EMAIL = "daramarketing.eu@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "DARA Website <onboarding@resend.dev>";

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — lead saved to file only, no email sent");
    return { ok: true };
  }

  const html = `
    <h2>Lead i ri nga faqja</h2>
    <p><strong>Emri:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    ${lead.company ? `<p><strong>Biznesi:</strong> ${escapeHtml(lead.company)}</p>` : ""}
    ${lead.budget ? `<p><strong>Buxheti:</strong> ${escapeHtml(lead.budget)}</p>` : ""}
    <p><strong>Mesazhi:</strong></p>
    <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${escapeHtml(lead.message)}</pre>
    <p style="color:#888;font-size:12px;margin-top:20px;">Dërguar nga DARA website — ${new Date().toISOString()}</p>
  `;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    subject: `[DARA] Lead i ri: ${lead.name}`,
    html,
  });

  if (error) {
    console.error("RESEND_ERROR:", error);
    return { ok: false, error: String(error) };
  }
  return { ok: true };
}

const AUTO_REPLY_HTML = (name: string, locale: string) => {
  const copy: Record<string, { subject: string; title: string; body: string; footer: string }> = {
    sq: {
      subject: "Faleminderit — DARA Marketing Agency",
      title: "Faleminderit për mesazhin!",
      body: "Kemi marrë kërkesën tënde dhe do të kontaktojmë brenda 24 orëve.",
      footer: "DARA Marketing Agency — Dare to be Different",
    },
    en: {
      subject: "Thank you — DARA Marketing Agency",
      title: "Thank you for your message!",
      body: "We've received your request and will get back to you within 24 hours.",
      footer: "DARA Marketing Agency — Dare to be Different",
    },
    de: {
      subject: "Vielen Dank — DARA Marketing Agency",
      title: "Vielen Dank für Ihre Nachricht!",
      body: "Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden.",
      footer: "DARA Marketing Agency — Dare to be Different",
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
  if (!resend) return { ok: true };
  const copy = { sq: "Faleminderit", en: "Thank you", de: "Vielen Dank" };
  const subject = `${copy[locale as keyof typeof copy] ?? copy.en} — DARA Marketing Agency`;
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [lead.email],
    subject,
    html: AUTO_REPLY_HTML(lead.name, locale),
  });
  if (error) {
    console.error("AUTO_REPLY_ERROR:", error);
    return { ok: false, error: String(error) };
  }
  return { ok: true };
}

export async function sendNewsletterNotification(email: string, isNew: boolean): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — newsletter saved to file only, no email sent");
    return { ok: true };
  }

  const subject = isNew ? "[DARA] Abonim i ri newsletter" : "[DARA] Abonim newsletter (email ekzistues)";
  const html = `
    <h2>${isNew ? "Abonim i ri" : "Abonim (email ekzistues)"}</h2>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p style="color:#888;font-size:12px;margin-top:20px;">Dërguar nga DARA website — ${new Date().toISOString()}</p>
  `;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    subject,
    html,
  });

  if (error) {
    console.error("RESEND_ERROR:", error);
    return { ok: false, error: String(error) };
  }
  return { ok: true };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
