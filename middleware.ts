import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const AUTH_SECRET = process.env.AUTH_SECRET ?? "xanael-dashboard-secret-2026";

async function isValidSession(value: string): Promise<boolean> {
  try {
    const dot = value.indexOf(".");
    if (dot === -1) return false;
    const payload = value.slice(0, dot);
    const signature = value.slice(dot + 1);
    if (!payload || !signature) return false;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(AUTH_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const expected = Array.from(new Uint8Array(sigBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Timing-safe comparison
    if (expected.length !== signature.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Dashboard protection — no i18n
  if (pathname.startsWith("/dashboard")) {
    const session = req.cookies.get("dashboard_session");
    if (!session?.value || !(await isValidSession(session.value))) {
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
