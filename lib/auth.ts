import { cookies } from "next/headers";
import crypto from "crypto";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET environment variable is not set");
}
const AUTH_SECRET = process.env.AUTH_SECRET;
const COOKIE_NAME = "dashboard_session";

interface AuthUser {
  email: string;
  name: string;
}

// Passwords stored as "scrypt_hash:salt" — generated with crypto.scrypt(password, salt, 64)
const USERS: (AuthUser & { passwordHash: string })[] = [
  {
    email: "ayoub@xanael.es",
    passwordHash: "77070bb24a228ed49817140e412b89a707c3ffa0bbacfa49a5e4fd4b7d266dbb69746f04ca1f9e1004ba485d18328433d5e24fc64b718bf9328c9179dc7fb0e6:f87e19f21bb1154a054c529e3451dd2d",
    name: "Ayoub",
  },
  {
    email: "carlos@xanael.es",
    passwordHash: "c90841f8201348899b33922cf2f216611ce41bf06d8b2262e68edba084e39c8bcd331e7aa1cb64ecba736775815b4ecd99eb9e394097c04b7a5e9e5d207e9c6f:8017e9be6f062d4986992b7fdda1815d",
    name: "Carlos",
  },
];

const VALID_EMAILS = new Set(USERS.map((u) => u.email));

function sign(payload: string): string {
  return crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
}

async function verifyPasswordHash(password: string, storedHash: string): Promise<boolean> {
  const [hash, salt] = storedHash.split(":");
  if (!hash || !salt) return false;
  return new Promise((resolve) => {
    crypto.scrypt(password, salt, 64, (err, derived) => {
      if (err) return resolve(false);
      try {
        resolve(crypto.timingSafeEqual(derived, Buffer.from(hash, "hex")));
      } catch {
        resolve(false);
      }
    });
  });
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
    const user = JSON.parse(Buffer.from(payload, "base64").toString("utf-8")) as AuthUser;
    if (!user?.email || !VALID_EMAILS.has(user.email)) return null;
    return user;
  } catch {
    return null;
  }
}

export async function validateCredentials(
  email: string,
  password: string
): Promise<AuthUser | null> {
  const userRecord = USERS.find((u) => u.email === email);
  if (!userRecord) return null;
  const valid = await verifyPasswordHash(password, userRecord.passwordHash);
  if (!valid) return null;
  return { email: userRecord.email, name: userRecord.name };
}

export async function getSessionUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie) return null;
  return verifySession(cookie.value);
}

export { COOKIE_NAME };
