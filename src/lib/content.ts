import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { defaultContent, type SiteContent } from '@/config/site';
import type { ReviewItem, StoredReview } from '@/types';
import { readKV } from './store';

export const CONTENT_KEY = 'content';
export const REVIEWS_KEY = 'reviews';
export const CONTENT_TAG = 'site-content';
export const REVIEWS_TAG = 'site-reviews';

type Plain = Record<string, unknown>;

function isPlain(v: unknown): v is Plain {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** 기본값 위에 관리자가 저장한 값을 덮어씁니다. 목록(배열)은 통째로 바꿉니다. */
export function mergeContent<T>(base: T, override: unknown): T {
  if (!isPlain(base) || !isPlain(override)) {
    return (override === undefined ? base : override) as T;
  }
  const out: Plain = { ...base };
  for (const [k, v] of Object.entries(override)) {
    if (!(k in base)) continue; // 기본값에 없는 옛 항목은 버립니다
    out[k] = isPlain(base[k]) ? mergeContent(base[k], v) : v;
  }
  return out as T;
}

/** 홈페이지에 보일 글·사진 (기본값 + 관리자 수정분) */
export async function getContent(): Promise<SiteContent> {
  'use cache';
  cacheTag(CONTENT_TAG);
  cacheLife('max');
  const override = await readKV<Partial<SiteContent>>(CONTENT_KEY);
  return mergeContent(defaultContent(), override ?? {});
}

export async function getStoredReviews(): Promise<StoredReview[]> {
  return (await readKV<StoredReview[]>(REVIEWS_KEY)) ?? [];
}

/** 홈페이지 후기 칸에 보일 후기. 관리자가 올린 후기가 없으면 예시 후기를 보여 줍니다. */
export async function getPublicReviews(): Promise<ReviewItem[]> {
  'use cache';
  cacheTag(REVIEWS_TAG);
  cacheLife('max');
  const stored = await getStoredReviews();
  const published = stored.filter((r) => r.published);
  if (published.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return published.map(({ published: _p, createdAt: _c, ...review }) => review);
  }
  return (await getContent()).reviews;
}
