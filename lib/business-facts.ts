import type { Locale } from "@/lib/services-data";

/**
 * Single source of truth for public business facts (contact details + claims).
 * Any number shown on the site as a company achievement must come from here, so a
 * change (or a correction by the owner) updates every page and language at once.
 */
export const CONTACT = {
  email: "daramarketing.eu@gmail.com",
  phoneDisplay: "+355 68 800 9988",
  phoneE164: "+355688009988",
  whatsappUrl: "https://wa.me/355688009988",
  address: "Rruga Donika Kastrioti, Tiranë - Albania",
  mapsUrl: "https://maps.google.com/?q=Rruga+Donika+Kastrioti,+Tirane+-+Albania",
  social: {
    instagram: "https://www.instagram.com/daramarketing.al/?hl=en",
    facebook: "https://www.facebook.com/profile.php?id=100082700976706",
    linkedin: "https://www.linkedin.com/company/dara-marketing-agency-al/",
  },
} as const;

/**
 * Projects delivered. The site previously showed both "100+" and "50+"; the lower
 * figure is used until the owner confirms the real number (see audit notes).
 */
export const PROJECTS_DELIVERED = "50+";

/** Training participants, as stated on the training pages. Owner to confirm. */
export const TRAINING_PARTICIPANTS = "50+";

/** First reply to an enquiry (stated on contact page, FAQ and auto-reply email). */
export const RESPONSE_TIME: Record<Locale, string> = {
  sq: "Brenda 24 orëve",
  en: "Within 24 hours",
  de: "Innerhalb von 24 Std.",
};
