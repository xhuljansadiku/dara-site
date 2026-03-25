"use client";

import { useParams } from "next/navigation";
import HomeFaqSection from "@/components/site/HomeFaqSection";
import type { Locale } from "@/lib/services-data";

export default function FaqPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "sq";
  return <HomeFaqSection locale={locale} variant="page" />;
}
