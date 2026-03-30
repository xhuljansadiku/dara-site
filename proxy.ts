import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "./i18n";
import { routing } from "./i18n/routing";
import { SITE_URL } from "@/lib/seo-utils";

const intlProxy = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  if (hostname.startsWith("www.") && !hostname.includes("localhost")) {
    const nonWwwHost = hostname.replace(/^www\./, "");
    const proto = request.nextUrl.protocol;
    const redirectUrl = `${proto}//${nonWwwHost}${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  if (pathname === "/") {
    return NextResponse.redirect(`${SITE_URL}/${defaultLocale}`, 301);
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
