import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

/**
 * 관리자 로그인. 비밀번호는 서버의 환경 변수 ADMIN_PASSWORD 에만 둡니다
 * (예전처럼 홈페이지 코드 안에 넣지 않으므로 손님이 볼 수 없습니다).
 * 개발 중(npm run dev)에 ADMIN_PASSWORD 를 안 넣었으면 임시 비밀번호 0000 을 씁니다.
 */
const COOKIE = 'pc_admin';
const SESSION_HOURS = 12;

function adminPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (pw) return pw;
  return process.env.NODE_ENV === 'production' ? null : '0000';
}

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || `pc-session:${adminPassword() ?? ''}`;
}

function sign(value: string) {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function isPasswordConfigured() {
  return adminPassword() !== null;
}

export function checkPassword(input: string): boolean {
  const pw = adminPassword();
  return pw !== null && safeEqual(input.trim(), pw);
}

export async function startSession() {
  const exp = String(Date.now() + SESSION_HOURS * 3600_000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;
  const [exp, sig] = raw.split('.');
  if (!exp || !sig || !safeEqual(sig, sign(exp))) return false;
  return Number(exp) > Date.now();
}

/** 관리자 API 맨 앞에서 부릅니다. 로그인 안 했으면 401 응답을 돌려줍니다. */
export async function denyUnlessAdmin(): Promise<Response | null> {
  return (await isAdmin()) ? null : Response.json({ error: '로그인이 필요합니다.' }, { status: 401 });
}

// 비밀번호 무작위 대입을 막는 간단한 잠금 (같은 주소에서 10분에 8번 틀리면 잠시 막음)
const attempts = new Map<string, { count: number; until: number }>();
export function tooManyAttempts(ip: string): boolean {
  const a = attempts.get(ip);
  return Boolean(a && a.count >= 8 && a.until > Date.now());
}
export function noteFailedAttempt(ip: string) {
  const a = attempts.get(ip);
  const fresh = !a || a.until < Date.now();
  attempts.set(ip, { count: fresh ? 1 : a.count + 1, until: Date.now() + 10 * 60_000 });
}
export function clearAttempts(ip: string) {
  attempts.delete(ip);
}
