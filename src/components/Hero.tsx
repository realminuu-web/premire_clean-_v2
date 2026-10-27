'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Star, ThumbsUp, Sparkle } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex items-center justify-center pt-20 sm:pt-24 pb-6 md:pb-8 overflow-hidden bg-slate-50">
      {/* Bright, Sunlit Modern Clean Interior Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-10000"
          style={{
            backgroundImage: `url('${siteConfig.hero.backgroundImage}')`,
          }}
        />
        {/* Bright, airy White & Sky-Blue Gradient Overlay for ultimate cleanliness and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/88 to-white/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-white/40" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-100/70 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 3xl:px-16 w-full pt-6 pb-6 md:pt-10 md:pb-8 lg:pt-12 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Main Content (Left 7-8 Cols) */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" strokeWidth={2} />
              <span className="tracking-tight">홈클리닝 & 상업공간 100% 직영 마스터 솔루션</span>
            </motion.div>

            {/* Main Headlines with Toss/Apple Style Clarity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.14] break-keep">
                주거부터 비즈니스까지, <br className="hidden sm:inline" />
                <span className="text-blue-700 underline decoration-blue-200 decoration-wavy decoration-2 underline-offset-8">
                  {siteConfig.brand.name}
                </span>
                이 기준을 만듭니다.
              </h1>

              <p className="text-base sm:text-xl 2xl:text-2xl font-bold text-slate-800 break-keep leading-snug">
                &ldquo;{siteConfig.brand.subSlogan}&rdquo;
              </p>
              
              <p className="text-sm sm:text-base 2xl:text-lg text-slate-600 max-w-2xl break-keep leading-relaxed font-normal">
                보이지 않는 서랍 안쪽 분진까지. <strong className="text-blue-700 font-semibold">100% 한국인 본사 정규 크루</strong>가
                한 치의 타협 없이 완벽한 청결을 완성합니다.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                onClick={() => scrollToSection('#contact')}
                className="group inline-flex items-center justify-center gap-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-ambient-md hover:shadow-ambient-lg transition-all duration-200 cursor-pointer"
              >
                <span>1분 만에 맞춤 견적 받기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                onClick={() => scrollToSection('#reviews')}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-base px-7 py-4 rounded-2xl shadow-ambient-sm hover:shadow-ambient-md transition-all duration-200 cursor-pointer"
              >
                <span>비포 & 애프터 후기</span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              </motion.button>
            </motion.div>

            {/* Key Trust Checkpoints */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-slate-700 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={2} />
                <span className="break-keep">100% 한국인 직영</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={2} />
                <span className="break-keep">고객 만족도 {siteConfig.hero.satisfactionRate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={2} />
                <span className="break-keep">친환경 생분해 세제</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={2} />
                <span className="break-keep">KB손해보험 5억 보상</span>
              </div>
            </motion.div>

          </div>

          {/* Right Highlight Card (Right 4-5 Cols) - Clean, bright luxury card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-ambient-lg space-y-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-100 rounded-full blur-2xl pointer-events-none" />

              {/* Top rating header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100/70">
                    <ThumbsUp className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900 tracking-tight">
                      고객 만족도 {siteConfig.hero.satisfactionRate} 달성
                    </span>
                    <p className="text-[11px] text-slate-500 font-medium">실제 검수 고객 추천 의향 1위</p>
                  </div>
                </div>
                <div className="flex items-center text-amber-500 text-xs font-bold gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/80">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{siteConfig.hero.ratingScore} / 5.0</span>
                </div>
              </div>

              {/* Progress Count */}
              <div className="space-y-2">
                <div className="text-xs text-blue-600 font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkle className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>지금까지 진행한 누적 시공</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {siteConfig.hero.completedCleanCount}<span className="text-lg font-normal text-slate-500"> 건 완료</span>
                </div>
                <p className="text-xs text-slate-600 break-keep leading-relaxed font-normal">
                  오늘 하루도 {siteConfig.hero.activeTeamsToday}팀의 직영 전문가들이 수도권 전역에서 꼼꼼하고 정직한 프리미엄 청소를 시공하고 있습니다.
                </p>
              </div>

              {/* KB손해보험 5억 원 배상책임 인증 */}
              <div className="pt-2">
                <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900 text-sm">KB손해보험 5억 원 영업배상책임</p>
                    <p className="text-slate-600 text-[11px] break-keep font-normal">
                      작업 중 기물 파손 사고에 대비해 100% 실손 보상 체계에 공식 가입되어 있습니다.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
