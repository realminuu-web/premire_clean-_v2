import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { defaultContent, type SiteContent } from '@/config/site';
import { OLD_DEFAULTS } from '@/config/copyUpdates';
import { getAt, setAt } from '@/config/editorSchema';
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

/**
 * 기본값 + 관리자 저장분을 합칩니다.
 * 섹션 순서는 관리자가 저장한 순서를 쓰되, 그 뒤에 새로 생긴 섹션(예: 팀 소개)은
 * 기본값에서 바로 앞에 있던 섹션 뒤에 끼워 넣어 사라지지 않게 합니다.
 */
export function buildContent(override: unknown): SiteContent {
  const defaults = defaultContent();
  let content = mergeContent(defaults, override ?? {});
  // 사장님이 손대지 않은 칸(예전 기본값 그대로)은 새 기본 문구로 바꿉니다
  for (const { path, old } of OLD_DEFAULTS) {
    if (JSON.stringify(getAt(content, path)) === JSON.stringify(old)) {
      content = setAt(content, path, structuredClone(getAt(defaults, path)));
    }
  }
  const order = content.sectionOrder.filter((id) => defaults.sectionOrder.includes(id));
  defaults.sectionOrder.forEach((id, i) => {
    if (order.includes(id)) return;
    const prev = defaults.sectionOrder[i - 1];
    const at = prev ? order.indexOf(prev) + 1 : 0;
    order.splice(at, 0, id);
  });
  return { ...content, sectionOrder: order };
}

/** 홈페이지에 보일 글·사진 (기본값 + 관리자 수정분) */
export async function getContent(): Promise<SiteContent> {
  'use cache';
  cacheTag(CONTENT_TAG);
  cacheLife('max');
  return buildContent(await readKV<Partial<SiteContent>>(CONTENT_KEY));
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
