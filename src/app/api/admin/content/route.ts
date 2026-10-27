import { revalidateTag } from 'next/cache';
import { defaultContent, type SiteContent } from '@/config/site';
import { denyUnlessAdmin } from '@/lib/auth';
import { CONTENT_KEY, CONTENT_TAG, mergeContent } from '@/lib/content';
import { readKV, writeKV } from '@/lib/store';

async function currentContent() {
  return mergeContent(defaultContent(), (await readKV<Partial<SiteContent>>(CONTENT_KEY)) ?? {});
}

/** 지금 홈페이지 글 + 기본값 */
export async function GET() {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  return Response.json({ content: await currentContent(), defaults: defaultContent() });
}

/** 관리자가 고친 글 저장 → 홈페이지에 바로 반영 */
export async function PUT(request: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  const body = (await request.json().catch(() => null)) as { content?: unknown } | null;
  if (!body?.content || typeof body.content !== 'object') {
    return Response.json({ error: '저장할 내용이 비어 있습니다.' }, { status: 400 });
  }
  // 기본값에 있는 항목만 남깁니다 (엉뚱한 값이 섞여 들어오지 않도록)
  const next = mergeContent(defaultContent(), body.content);
  await writeKV(CONTENT_KEY, next);
  revalidateTag(CONTENT_TAG, { expire: 0 });
  return Response.json({ content: next });
}

/** 기본값으로 되돌리기 */
export async function DELETE() {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  await writeKV(CONTENT_KEY, null);
  revalidateTag(CONTENT_TAG, { expire: 0 });
  return Response.json({ content: defaultContent() });
}
