import React from 'react';

/**
 * 모든 섹션 맨 위 제목 묶음 (큰 제목 2줄 + 설명).
 * 섹션마다 제각각이던 여백·글자 크기·줄바꿈을 한 곳에서 맞춥니다.
 * - 제목은 text-balance: 두 줄의 길이를 비슷하게 맞춰 한 글자만 다음 줄로 넘어가는 일을 막습니다.
 * - 설명은 text-pretty + keep-all: 단어 중간에서 끊기거나 마지막 줄에 한 단어만 남는 일을 줄입니다.
 */
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
    <div className={`mx-auto max-w-3xl text-center ${flush ? '' : 'mb-12 lg:mb-16'}`}>
      <h2
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
      </h2>
      {description && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty break-keep sm:text-base ${
            dark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
