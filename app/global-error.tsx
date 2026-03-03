"use client";

import { ERROR_COPY } from "@/lib/error-copy";
import { defaultLocale } from "@/i18n";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Global error has no pathname access; use default locale
  const copy = ERROR_COPY[defaultLocale as "sq" | "en" | "de"];

  return (
    <html lang={defaultLocale}>
      <body style={{ margin: 0, padding: "2rem", background: "#000", color: "#fff", fontFamily: "system-ui" }}>
        <div style={{ maxWidth: "32rem", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem" }}>{copy.title}</h1>
          <p style={{ opacity: 0.8, marginTop: "0.5rem" }}>{copy.desc}</p>
          <button
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              background: "#fff",
              color: "#000",
              border: "none",
              borderRadius: "9999px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {copy.tryAgain}
          </button>
          <a
            href={`/${defaultLocale}`}
            style={{
              display: "inline-block",
              marginTop: "1rem",
              marginLeft: "0.5rem",
              padding: "0.75rem 1.5rem",
              background: "#fff",
              color: "#000",
              textDecoration: "none",
              borderRadius: "9999px",
              fontWeight: 500,
            }}
          >
            {copy.goHome}
          </a>
        </div>
      </body>
    </html>
  );
}
