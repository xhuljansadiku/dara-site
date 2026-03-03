"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ERROR_COPY, getLocaleFromPathname } from "@/lib/error-copy";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname ?? "");
  const copy = ERROR_COPY[locale];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#444444] px-4 text-gray-900">
      <h1 className="text-4xl font-semibold">{copy.title}</h1>
      <p className="mt-2 text-gray-900/70">{copy.desc}</p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={reset}
          className="rounded-full border border-white/20 px-6 py-3 font-medium transition hover:bg-white/5"
        >
          {copy.tryAgain}
        </button>
        <Link
          href={`/${locale}`}
          className="rounded-full bg-[white] px-6 py-3 font-medium text-black transition hover:bg-[white/90]"
        >
          {copy.goHome}
        </Link>
      </div>
    </div>
  );
}
