import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "./i18n";
import { routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);
const NON_LOCALIZED_ALLOWED_PATHS = new Set(["/opengraph-image"]);

export default function proxy(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;
  const baseHeaders = new Headers(request.headers);

  if (hostname.startsWith("www.") && !hostname.includes("localhost")) {
    const nonWwwHost = hostname.replace(/^www\./, "");
    const proto = request.nextUrl.protocol;
    const redirectUrl = `${proto}//${nonWwwHost}${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Let Next.js metadata image route resolve directly.
  if (pathname === "/opengraph-image" || pathname.startsWith("/opengraph-image/")) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const rewriteUrl = new URL(`/${defaultLocale}${request.nextUrl.search}`, request.url);
    baseHeaders.set("x-next-locale", defaultLocale);
    baseHeaders.set("x-pathname", pathname);
    return NextResponse.rewrite(rewriteUrl, {
      request: { headers: baseHeaders },
    });
  }

  const hasLocalePrefix = /^\/(sq|en|de)(\/|$)/.test(pathname);
  if (!hasLocalePrefix && !NON_LOCALIZED_ALLOWED_PATHS.has(pathname)) {
    // Keep public URL stable (no 308) while serving the default locale route.
    const rewriteUrl = new URL(`/${defaultLocale}${pathname}${request.nextUrl.search}`, request.url);
    baseHeaders.set("x-next-locale", defaultLocale);
    baseHeaders.set("x-pathname", pathname);
    return NextResponse.rewrite(rewriteUrl, {
      request: { headers: baseHeaders },
    });
  }

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

  return intlProxy(modifiedRequest);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
