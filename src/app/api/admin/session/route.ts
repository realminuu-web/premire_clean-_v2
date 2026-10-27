import {
  checkPassword,
  clearAttempts,
  endSession,
  isAdmin,
  isPasswordConfigured,
  noteFailedAttempt,
  startSession,
  tooManyAttempts,
} from '@/lib/auth';
import { storageMode } from '@/lib/store';

function clientIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
}

/** 로그인 상태 확인 */
export async function GET() {
  return Response.json({
    loggedIn: await isAdmin(),
    passwordConfigured: isPasswordConfigured(),
    storage: storageMode(),
    devPassword: process.env.NODE_ENV !== 'production' && !process.env.ADMIN_PASSWORD,
  });
}

/** 로그인 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  if (tooManyAttempts(ip)) {
    return Response.json({ error: '비밀번호를 여러 번 틀렸습니다. 10분 뒤에 다시 해 주세요.' }, { status: 429 });
  }
  if (!isPasswordConfigured()) {
    return Response.json(
      { error: '관리자 비밀번호가 아직 설정되지 않았습니다. ADMIN_GUIDE.md 의 [처음 설정]을 따라 주세요.' },
      { status: 503 },
    );
  }
  const { password } = (await request.json().catch(() => ({}))) as { password?: string };
  if (!password || !checkPassword(password)) {
    noteFailedAttempt(ip);
    return Response.json({ error: '비밀번호가 맞지 않습니다.' }, { status: 401 });
  }
  clearAttempts(ip);
  await startSession();
  return Response.json({ ok: true });
}

/** 로그아웃 */
export async function DELETE() {
  await endSession();
  return Response.json({ ok: true });
}
