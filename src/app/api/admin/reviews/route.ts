import { denyUnlessAdmin } from '@/lib/auth';
import { getStoredReviews } from '@/lib/content';
import { addReview } from '@/lib/reviews';

export async function GET() {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  return Response.json({ reviews: await getStoredReviews() });
}

export async function POST(request: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;
  try {
    const review = await addReview((await request.json()) as Record<string, unknown>);
    return Response.json({ review }, { status: 201 });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : '저장하지 못했습니다.' }, { status: 400 });
  }
}
