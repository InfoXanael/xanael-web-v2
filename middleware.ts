import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Dashboard protection — no i18n
  if (pathname.startsWith("/dashboard")) {
    const session = req.cookies.get("dashboard_session");
    if (!session?.value) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // Skip i18n for login and api
  if (pathname.startsWith("/login") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Redirect bare / to /es
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/es", req.url));
  }

  // Handle i18n for all other public routes
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
