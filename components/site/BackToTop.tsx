"use client";

import { useState, useEffect } from "react";

const WHATSAPP_HOVER: Record<string, string> = {
  sq: "Na shkruaj në WhatsApp",
  en: "Chat on WhatsApp",
  de: "Auf WhatsApp schreiben",
};

const BUBBLE_MSG: Record<string, string> = {
  sq: "Përshëndetje! 👋\nSi mund t'ju ndihmojmë?",
  en: "Hello! 👋\nHow can we help you?",
  de: "Hallo! 👋\nWie können wir Ihnen helfen?",
};

export default function BackToTop({ locale = "sq" }: { locale?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const whatsAppHover = WHATSAPP_HOVER[locale] ?? WHATSAPP_HOVER.en;
  const bubbleMsg = BUBBLE_MSG[locale] ?? BUBBLE_MSG.en;

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Show bubble after 8s
  useEffect(() => {
    if (bubbleDismissed) return;
    const t = setTimeout(() => setShowBubble(true), 8000);
    return () => clearTimeout(t);
  }, [bubbleDismissed]);

  // Auto-hide bubble after 6s
  useEffect(() => {
    if (!showBubble) return;
    const t = setTimeout(() => setShowBubble(false), 6000);
    return () => clearTimeout(t);
  }, [showBubble]);

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-8 left-8 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 shadow-lg shadow-gray-900/25 transition-all duration-300 hover:scale-110 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            aria-label="Back to top"
          >
            <svg className="h-5 w-5 text-white transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      )}

      {/* WhatsApp + bubble */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 md:bottom-8 md:right-8">
        {/* Speech bubble */}
        {showBubble && !bubbleDismissed && (
          <div className="animate-float-up relative max-w-[220px] rounded-2xl rounded-br-none bg-white px-4 py-3 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06]">
            <button
              onClick={() => { setShowBubble(false); setBubbleDismissed(true); }}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[10px] text-gray-600 transition hover:bg-gray-300"
              aria-label="Close"
            >
              ✕
            </button>
            <p className="whitespace-pre-line text-xs leading-relaxed text-gray-800">{bubbleMsg}</p>
          </div>
        )}

        <a
          href="https://wa.me/355688009988"
          target="_blank"
          rel="noreferrer"
          title={whatsAppHover}
          onClick={() => { setShowBubble(false); setBubbleDismissed(true); }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/25 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
          aria-label={whatsAppHover}
        >
          <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
