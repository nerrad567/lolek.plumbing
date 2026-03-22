import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname starts with a supported locale
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // If no locale prefix, rewrite to /en internally (keeps URL clean)
  if (!hasLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon\\.ico).*)"],
};
