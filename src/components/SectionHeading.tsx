'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * 모든 섹션 맨 위 제목 묶음 (큰 제목 2줄 + 설명).
 * 섹션마다 제각각이던 여백·글자 크기·줄바꿈을 한 곳에서 맞춥니다.
 * - 제목은 text-balance: 두 줄의 길이를 비슷하게 맞춰 한 글자만 다음 줄로 넘어가는 일을 막습니다.
 * - 설명은 text-pretty + keep-all: 단어 중간에서 끊기거나 마지막 줄에 한 단어만 남는 일을 줄입니다.
 * - 화면에 처음 들어올 때 한 번만 살짝 떠오르며 나타납니다 ('동작 줄이기'를 켠 손님은 바로 보임).
 */
const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function SectionHeading({
  title1,
  title2,
  description,
  dark = false,
  flush = false,
}: {
  title1: string;
  title2?: string;
  description?: string;
  dark?: boolean;
  /** 부모가 이미 위아래 간격(space-y)을 주는 곳에서는 아래 여백을 빼요 */
  flush?: boolean;
}) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${flush ? '' : 'mb-10 lg:mb-12'}`}>
      <motion.h2
        {...fadeIn(0)}
        className={`text-[28px] leading-[1.25] font-bold tracking-[-0.035em] text-balance break-keep sm:text-4xl lg:text-5xl lg:leading-[1.2] ${
          dark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title1}
        {title2 && (
          <>
            <br />
            <span className={dark ? 'text-sky-400' : 'text-blue-700'}>{title2}</span>
          </>
        )}
      </motion.h2>
      {description && (
        <motion.p
          {...fadeIn(0.08)}
          className={`mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty break-keep sm:text-base ${
            dark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
