import { denyUnlessAdmin } from '@/lib/auth';
import { saveImage } from '@/lib/store';

/** 후기·첫 화면 사진 올리기 (휴대폰 사진은 관리자 화면에서 먼저 줄여서 보냅니다) */
export async function POST(request: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  try {
    const file = (await request.formData()).get('file');
    if (!(file instanceof File)) throw new Error('사진을 골라 주세요.');
    return Response.json({ url: await saveImage(file) });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : '사진을 올리지 못했습니다.' }, { status: 400 });
  }
}
