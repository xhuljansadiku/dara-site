import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "./i18n";
import { routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);
const NON_LOCALIZED_ALLOWED_PATHS = new Set(["/opengraph-image"]);

export default function proxy(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  if (hostname.startsWith("www.") && !hostname.includes("localhost")) {
    const nonWwwHost = hostname.replace(/^www\./, "");
    const proto = request.nextUrl.protocol;
    const redirectUrl = `${proto}//${nonWwwHost}${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  if (pathname === "/") {
    const redirectUrl = new URL(`/${defaultLocale}${request.nextUrl.search}`, request.url);
    return NextResponse.redirect(redirectUrl, 308);
  }

  const hasLocalePrefix = /^\/(sq|en|de)(\/|$)/.test(pathname);
  if (!hasLocalePrefix && !NON_LOCALIZED_ALLOWED_PATHS.has(pathname)) {
    const redirectUrl = new URL(`/${defaultLocale}${pathname}${request.nextUrl.search}`, request.url);
    return NextResponse.redirect(redirectUrl, 308);
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
