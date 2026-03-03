"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NOT_FOUND_COPY, getLocaleFromPathname } from "@/lib/error-copy";

export default function NotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname ?? "");
  const copy = NOT_FOUND_COPY[locale];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#444444] px-4 text-gray-900">
      <h1 className="text-4xl font-semibold">{copy.title}</h1>
      <p className="mt-2 text-gray-900/70">{copy.desc}</p>
      <Link
        href={`/${locale}`}
        className="mt-6 rounded-full bg-[#c8a55c] px-6 py-3 font-medium text-black transition hover:bg-[#e2c37a]"
      >
        {copy.goHome}
      </Link>
    </div>
  );
}
