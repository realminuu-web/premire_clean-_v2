import 'server-only';
import { randomUUID } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import type { StoredReview } from '@/types';
import { getStoredReviews, REVIEWS_KEY, REVIEWS_TAG } from './content';
import { writeKV } from './store';

const TEXT_LIMITS = { author: 30, location: 60, serviceType: 40, content: 600 } as const;

/** 관리자 화면에서 온 값을 정리합니다 (빈칸·너무 긴 글·이상한 사진 주소 막기) */
export function cleanReviewInput(input: Record<string, unknown>) {
  const text = (key: keyof typeof TEXT_LIMITS) => String(input[key] ?? '').trim().slice(0, TEXT_LIMITS[key]);
  const image = (key: string) => {
    const v = String(input[key] ?? '').trim();
    return v.startsWith('/uploads/') || v.startsWith('https://') ? v : '';
  };
  const review = {
    author: text('author'),
    location: text('location'),
    serviceType: text('serviceType'),
    content: text('content'),
    beforeImage: image('beforeImage'),
    afterImage: image('afterImage'),
    rating: Math.min(5, Math.max(1, Number(input.rating) || 5)),
    date: String(input.date ?? '').trim().slice(0, 20),
    published: input.published !== false,
  };
  if (!review.content) throw new Error('후기 내용을 적어 주세요.');
  if (!review.author) throw new Error('고객 이름을 적어 주세요. (예: 김*현 고객님)');
  return review;
}

async function save(list: StoredReview[]) {
  await writeKV(REVIEWS_KEY, list);
  revalidateTag(REVIEWS_TAG, { expire: 0 });
}

function today() {
  return new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' })
    .format(new Date())
    .replace(/\.\s?/g, '.')
    .replace(/\.$/, '');
}

export async function addReview(input: Record<string, unknown>): Promise<StoredReview> {
  const clean = cleanReviewInput(input);
  const review: StoredReview = {
    ...clean,
    id: randomUUID(),
    date: clean.date || today(),
    verified: true,
    createdAt: new Date().toISOString(),
  };
  await save([review, ...(await getStoredReviews())]);
  return review;
}

export async function updateReview(id: string, input: Record<string, unknown>): Promise<StoredReview> {
  const list = await getStoredReviews();
  const index = list.findIndex((r) => r.id === id);
  if (index < 0) throw new Error('후기를 찾을 수 없습니다.');
  const clean = cleanReviewInput({ ...list[index], ...input });
  const updated: StoredReview = { ...list[index], ...clean, date: clean.date || list[index].date };
  list[index] = updated;
  await save(list);
  return updated;
}

export async function deleteReview(id: string) {
  await save((await getStoredReviews()).filter((r) => r.id !== id));
}
