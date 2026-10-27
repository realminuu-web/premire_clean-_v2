'use client';

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Camera } from 'lucide-react';

type Props = {
  before?: string;
  after?: string;
  beforeLabel: string;
  afterLabel: string;
  singleLabel: string; // 사진이 한 장뿐일 때 붙는 표시
  /** 청소 전 ↔ 청소 후가 바뀌는 간격 (ms) */
  flipAfter?: number;
};

const tag = 'absolute top-2.5 z-10 flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md transition-opacity duration-700';

/**
 * 후기 사진. 전·후 사진이 둘 다 있으면 "청소 전"을 잠깐 보여 준 뒤 부드럽게 "청소 후"로 바뀝니다.
 * 기기에서 '동작 줄이기'를 켠 손님에게는 바뀌는 대신 전·후를 나란히 보여 줍니다.
 */
export default function BeforeAfterPhoto({ before, after, beforeLabel, afterLabel, singleLabel, flipAfter = 2500 }: Props) {
  const reduce = useReducedMotion();
  const [showAfter, setShowAfter] = useState(false);
  const both = Boolean(before && after);

  // 전 → 후 → 전 … 을 계속 반복합니다 (후기가 넘어가면 다시 '전'부터)
  useEffect(() => {
    if (!both || reduce) return;
    const timer = setInterval(() => setShowAfter((v) => !v), flipAfter);
    return () => clearInterval(timer);
  }, [both, reduce, flipAfter]);

  if (!both) {
    const only = after || before;
    if (!only) return null;
    return (
      <div className="absolute inset-0">
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${only}')` }} />
        <div className={`${tag} left-2.5 bg-blue-700/90`}>
          <Camera className="h-3 w-3 text-sky-200" strokeWidth={1.75} />
          <span>{after ? singleLabel : beforeLabel}</span>
        </div>
      </div>
    );
  }

  if (reduce) {
    return (
      <div className="absolute inset-0 grid grid-cols-2 gap-0.5 bg-white">
        <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${before}')` }}>
          <span className={`${tag} left-2.5 bg-slate-900/85`}>{beforeLabel}</span>
        </div>
        <div className="relative bg-cover bg-center" style={{ backgroundImage: `url('${after}')` }}>
          <span className={`${tag} right-2.5 bg-blue-700/90`}>{afterLabel}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0" aria-label={`${beforeLabel} · ${afterLabel} 사진`} role="img">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${before}')` }} />
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out ${showAfter ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url('${after}')` }}
      />
      <span className={`${tag} left-2.5 bg-slate-900/85 ${showAfter ? 'opacity-0' : 'opacity-100'}`}>{beforeLabel}</span>
      <span className={`${tag} right-2.5 bg-blue-700/90 ${showAfter ? 'opacity-100' : 'opacity-0'}`}>{afterLabel}</span>
      {/* 지금 전/후 중 어디인지 알려 주는 막대 두 개 */}
      <div className="absolute bottom-2.5 right-3 z-10 flex gap-1.5">
        <i className={`block h-1 w-5 rounded-full transition-colors duration-700 ${showAfter ? 'bg-white/45' : 'bg-white'}`} />
        <i className={`block h-1 w-5 rounded-full transition-colors duration-700 ${showAfter ? 'bg-white' : 'bg-white/45'}`} />
      </div>
    </div>
  );
}
