// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Site",
  description: "…",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
