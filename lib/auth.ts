import { cookies } from "next/headers";
import crypto from "crypto";

const AUTH_SECRET = process.env.AUTH_SECRET || "xanael-dashboard-secret-2026";
const COOKIE_NAME = "dashboard_session";

interface AuthUser {
  email: string;
  name: string;
}

const USERS: (AuthUser & { password: string })[] = [
  { email: "ayoub@xanael.es", password: "xanael2026ayoub", name: "Ayoub" },
  { email: "carlos@xanael.es", password: "xanael2026carlos", name: "Carlos" },
];

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payload)
    .digest("hex");
}

export function createSessionValue(user: AuthUser): string {
  const payload = Buffer.from(JSON.stringify(user)).toString("base64");
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySession(value: string): AuthUser | null {
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;
  if (sign(payload) !== signature) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

export function validateCredentials(
  email: string,
  password: string
): AuthUser | null {
  const user = USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) return null;
  return { email: user.email, name: user.name };
}

export async function getSessionUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie) return null;
  return verifySession(cookie.value);
}

export { COOKIE_NAME };
