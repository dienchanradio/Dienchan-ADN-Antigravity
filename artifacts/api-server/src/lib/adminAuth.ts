import { createHmac, timingSafeEqual } from "node:crypto";
import type { Request, RequestHandler } from "express";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not configured.");
  return value;
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function equalSignature(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function encode(value: object): string {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function decode(value: string): { email: string; exp: number } | null {
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as {
      email?: unknown;
      exp?: unknown;
    };
    if (typeof parsed.email !== "string" || typeof parsed.exp !== "number") return null;
    if (parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return { email: parsed.email, exp: parsed.exp };
  } catch {
    return null;
  }
}

function readCookie(req: Request): string | null {
  const header = req.headers.cookie ?? "";
  const entry = header.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${COOKIE_NAME}=`));
  return entry ? decodeURIComponent(entry.slice(COOKIE_NAME.length + 1)) : null;
}

export function getAdminSession(req: Request): { email: string; exp: number } | null {
  const token = readCookie(req);
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !equalSignature(signature, sign(payload))) return null;
  return decode(payload);
}

export const requireAdmin: RequestHandler = (req, res, next) => {
  if (!getAdminSession(req)) {
    res.status(401).json({ error: "Vui lòng đăng nhập quản trị viên để tiếp tục." });
    return;
  }
  next();
};

export function setAdminSession(res: { setHeader: (name: string, value: string) => void }, email: string): void {
  const payload = encode({ email, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS });
  const token = `${payload}.${sign(payload)}`;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}${secure}`);
}

export function clearAdminSession(res: { setHeader: (name: string, value: string) => void }): void {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

export function adminCredentialsConfigured(): boolean {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET);
}

export function adminEmail(): string {
  return process.env.ADMIN_EMAIL ?? "";
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}