// app/page.tsx
// Redirect root ("/") to the default locale homepage.

import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { defaultLocale } from "@/i18n";

export const metadata: Metadata = {
  title: "DARA · Dare to be Different",
  description:
    "DARA Marketing Agency. We bring brand stories to life through bold strategies, digital marketing, and creative content.",
};

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
