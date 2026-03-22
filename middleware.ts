import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "./i18n";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // 1. www -> non-www 301 redirect (canonical domain, skip localhost)
  if (hostname.startsWith("www.") && !hostname.includes("localhost")) {
    const nonWwwHost = hostname.replace(/^www\./, "");
    const proto = request.nextUrl.protocol;
    const redirectUrl = `${proto}//${nonWwwHost}${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // 2. Root path "/" - pass through to app/page.tsx (neutral homepage, no redirect to /en)
  if (pathname === "/") {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-next-locale", defaultLocale);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // 3. All other paths - use intl middleware with localeDetection: false
  const locale = pathname.startsWith("/sq")
    ? "sq"
    : pathname.startsWith("/de")
      ? "de"
      : pathname.startsWith("/en")
        ? "en"
        : defaultLocale;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-next-locale", locale);
  requestHeaders.set("x-pathname", pathname);

  const modifiedRequest = new NextRequest(request.url, {
    headers: requestHeaders,
  });

  return intlMiddleware(modifiedRequest);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
