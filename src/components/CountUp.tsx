'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * "12,840" 같은 숫자를 0부터 그 숫자까지 한 번 올라가게 보여 줍니다.
 * 숫자가 아닌 글자가 섞여 있거나 '동작 줄이기'를 켠 손님에게는 그대로 보여 줍니다.
 */
export default function CountUp({ value, duration = 1400, delay = 300 }: { value: string; duration?: number; delay?: number }) {
  const reduce = useReducedMotion();
  const target = /^[\d,]+$/.test(value.trim()) ? Number(value.replace(/,/g, '')) : null;
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (target === null || reduce) return;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      start ||= now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // 처음엔 빠르게, 끝에서 천천히
      setShown(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [target, reduce, duration, delay]);

  if (target === null || reduce || shown === null) {
    // 숫자가 올라가기 전(첫 화면이 나타나는 동안)과 검색엔진에는 최종 숫자를 그대로 보여 줍니다
    return <span className={shown === null && target !== null && !reduce ? 'opacity-0' : undefined}>{value}</span>;
  }
  return (
    <span aria-label={value} className="tabular-nums">
      {shown.toLocaleString('ko-KR')}
    </span>
  );
}
