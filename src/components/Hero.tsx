'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { scrollToId, useContent } from '@/components/ContentProvider';

/** 제목을 쉼표 뒤에서 줄바꿈하고, 강조할 글자만 파랗게 칠합니다. */
function HeroTitle({ title, highlight }: { title: string; highlight: string }) {
  const lines = title.split(/,\s*/);
  const paint = (text: string) => {
    if (!highlight || !text.includes(highlight)) return text;
    const [before, ...rest] = text.split(highlight);
    return (
      <>
        {before}
        <span className="text-sky-300">{highlight}</span>
        {rest.join(highlight)}
      </>
    );
  };
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {paint(line)}
          {i < lines.length - 1 ? ',' : ''}
        </span>
      ))}
    </>
  );
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const { hero } = useContent();

  return (
    <section
      id="hero"
      aria-label="첫 화면"
      className="relative h-svh min-h-[600px] w-full overflow-hidden bg-slate-900 text-white"
    >
      {/* 화면 가득한 선명한 사진 */}
      {/* eslint-disable-next-line @next/next/no-img-element -- 관리자가 올린 사진 주소를 그대로 씁니다 */}
      <img
        src={hero.backgroundImage}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* 글자가 잘 읽히도록 왼쪽·아래만 살짝 어둡게 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(2_6_23/0.72)_0%,rgb(2_6_23/0.42)_45%,rgb(2_6_23/0.04)_80%)] max-md:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(0deg,rgb(2_6_23/0.82)_0%,rgb(2_6_23/0.25)_50%,rgb(2_6_23/0.45)_100%)] md:bg-[linear-gradient(0deg,rgb(2_6_23/0.55)_0%,transparent_45%,rgb(2_6_23/0.35)_100%)]"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl 2xl:max-w-[1680px] flex-col justify-end px-5 pb-32 sm:px-8 md:pb-20 lg:px-12 lg:pb-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <motion.h1
              {...rise(0.05)}
              className="text-[34px] leading-[1.18] font-extrabold tracking-[-0.045em] break-keep sm:text-5xl lg:text-6xl xl:text-[68px] 2xl:text-7xl"
            >
              <HeroTitle title={hero.title} highlight={hero.highlight} />
            </motion.h1>

            {/* 휴대폰: 제목 아래 누적 시공 */}
            <motion.div
              {...rise(0.15)}
              className="mt-6 flex items-baseline gap-2 border-t border-white/25 pt-5 md:hidden"
            >
              <span className="text-sm font-medium text-white/85">{hero.countLabel}</span>
              <span className="text-[28px] font-extrabold tracking-[-0.03em]">{hero.completedCleanCount}</span>
              <span className="text-sm text-white/85">{hero.countUnit}</span>
            </motion.div>

            <motion.div {...rise(0.2)} className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
              <button
                type="button"
                data-track="click_quote"
                onClick={() => scrollToId('#contact')}
                className="group inline-flex min-h-14 cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-blue-700 px-8 text-base font-bold text-white transition-colors duration-200 hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
              >
                <span>{hero.primaryCta}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => scrollToId('#reviews')}
                className="inline-flex min-h-14 cursor-pointer items-center justify-center rounded-2xl border border-white/55 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
              >
                {hero.secondaryCta}
              </button>
            </motion.div>
          </div>

          {/* 컴퓨터: 오른쪽 아래 누적 시공 */}
          <motion.div {...rise(0.3)} className="hidden text-right md:block">
            <p className="text-sm font-semibold text-white/85 lg:text-base">{hero.countLabel}</p>
            <p className="mt-2 text-6xl font-extrabold tracking-[-0.04em] lg:text-7xl">
              {hero.completedCleanCount}
              <span className="ml-1.5 text-xl font-semibold text-white/85 lg:text-2xl">{hero.countUnit}</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
