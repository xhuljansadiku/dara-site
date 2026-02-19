/**
 * Track custom events for Plausible Analytics.
 * Call after successful form submissions, CTA clicks, etc.
 */
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(eventName: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (window.plausible) {
    window.plausible(eventName, props ? { props } : undefined);
  }
  // Google Analytics 4
  if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", eventName, props);
  }
}
