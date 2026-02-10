"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, hp: "" }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setMsg(`❌ Error ${res.status}: ${data?.error ?? "UNKNOWN"}`);
        setLoading(false);
        return;
      }

      setMsg(data?.exists ? "✅ You are already subscribed." : "✅ You’re subscribed.");
      setEmail("");
    } catch {
      setMsg("❌ Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="Email address"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#c8a96a]/60"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-[#c8a96a] px-5 py-3 text-sm font-medium text-black hover:bg-[#e2c37a] disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Subscribe"}
        </button>
      </form>

      {msg && <p className="mt-3 text-sm text-white/70">{msg}</p>}
    </div>
  );
}
