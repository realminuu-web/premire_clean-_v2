'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import type { SiteContent } from '@/config/site';
import type { ReviewItem } from '@/types';

type SiteData = { content: SiteContent; reviews: ReviewItem[] };

const SiteDataContext = createContext<SiteData | null>(null);

/** 관리자 페이지에서 고친 글과 올린 후기를 모든 섹션에 나눠 줍니다. */
export function ContentProvider({
  content,
  reviews,
  children,
}: SiteData & { children: ReactNode }) {
  return (
    <SiteDataContext value={{ content, reviews }}>
      {/* 기기에서 '동작 줄이기'를 켠 손님에게는 움직임을 끕니다 */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SiteDataContext>
  );
}

function useSiteData(): SiteData {
  const data = useContext(SiteDataContext);
  if (!data) throw new Error('useContent must be used inside <ContentProvider>');
  return data;
}

export function useContent(): SiteContent {
  return useSiteData().content;
}

export function useReviews(): ReviewItem[] {
  return useSiteData().reviews;
}

export function scrollToId(id: string, offset = 75) {
  const el = document.querySelector(id);
  // 상세 페이지처럼 그 섹션이 없는 곳에서는 홈페이지의 그 위치로 갑니다
  if (!el) {
    window.location.href = `/${id}`;
    return;
  }
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
