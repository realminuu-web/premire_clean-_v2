import { denyUnlessAdmin } from '@/lib/auth';
import { deleteReview, updateReview } from '@/lib/reviews';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Ctx) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  try {
    const review = await updateReview((await params).id, (await request.json()) as Record<string, unknown>);
    return Response.json({ review });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : '저장하지 못했습니다.' }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  await deleteReview((await params).id);
  return Response.json({ ok: true });
}
