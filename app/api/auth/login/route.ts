import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createSessionValue, COOKIE_NAME } from "@/lib/auth";

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxAttempts = 10;

  const record = loginAttempts.get(ip);
  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }
  if (record.count >= maxAttempts) {
    return { allowed: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }
  record.count++;
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const rateCheck = checkLoginRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera antes de volver a intentarlo." },
      {
        status: 429,
        headers: { "Retry-After": String(rateCheck.retryAfter ?? 900) },
      }
    );
  }

  const { email, password } = await req.json();

  const user = validateCredentials(email, password);
  if (!user) {
    return NextResponse.json(
      { error: "Credenciales incorrectas" },
      { status: 401 }
    );
  }

  const sessionValue = createSessionValue(user);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
