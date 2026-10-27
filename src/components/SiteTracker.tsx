'use client';

import { useEffect } from 'react';
import { track } from '@/lib/track';

/**
 * 방문 1회, 섹션을 처음 본 순간, 전화·카톡·견적 버튼 누름을 셉니다.
 * 버튼은 data-track="click_phone" 같은 표시로 구분합니다.
 */
export default function SiteTracker({ sectionIds }: { sectionIds: string[] }) {
  useEffect(() => {
    track('view', undefined, { once: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            track('section_view', entry.target.id, { once: true });
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.35 },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]');
      const type = target?.dataset.track;
      if (type === 'click_phone' || type === 'click_kakao' || type === 'click_quote') track(type);
    };
    document.addEventListener('click', onClick);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', onClick);
    };
  }, [sectionIds]);

  return null;
}
