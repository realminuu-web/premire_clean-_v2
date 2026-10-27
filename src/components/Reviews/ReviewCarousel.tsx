'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { ReviewItem } from '@/types';
import { useContent } from '@/components/ContentProvider';
import BeforeAfterPhoto from './BeforeAfterPhoto';

interface ReviewCarouselProps {
  reviews: ReviewItem[];
}

export default function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const { reviewsSection: t } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 💡 최신 등록된 후기 최대 10개까지 슬라이드로 자동 순환 (나머지는 DB에 보관)
  const displayReviews = (reviews && reviews.length > 0)
    ? reviews.slice(0, 10)
    : [];

  // Auto-scroll timer
  useEffect(() => {
    if (isPaused || displayReviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, displayReviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
  };

  if (!displayReviews || displayReviews.length === 0) return null;

  const current = displayReviews[currentIndex] || displayReviews[0];
  const photoToShow = current.afterImage || current.beforeImage;

  return (
    <div
      className="relative bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-5 sm:p-8 2xl:p-10 shadow-ambient-md overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Luminous Background Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header of the Carousel */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" strokeWidth={1.75} />
              <span>{t.carouselBadge} (최신 {displayReviews.length}건)</span>
            </span>
            <span className="text-xs font-semibold text-slate-400">
              ({currentIndex + 1} / {displayReviews.length})
            </span>
          </div>
          <h4 className="text-lg sm:text-2xl font-bold text-slate-900 mt-1.5 tracking-tight break-keep">
            {t.carouselTitle}
          </h4>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label="이전 후기"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label="다음 후기"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Review Card Body with AnimatePresence */}
      <div className="relative z-10 py-5 min-h-[260px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id || currentIndex}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
          >
            {/* Review text & metadata (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Star rating & service type */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < current.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                      strokeWidth={1.75}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-amber-600 ml-1">
                  {current.rating}.0
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-2">
                  | {current.serviceType}
                </span>
              </div>

              {/* Quote icon & text */}
              <div className="relative">
                <Quote className="absolute -top-3 -left-3 w-7 h-7 sm:w-8 sm:h-8 text-blue-100 pointer-events-none -z-0 opacity-80" strokeWidth={1.75} />
                <p className="relative z-10 text-sm sm:text-lg text-slate-800 font-medium leading-relaxed break-keep">
                  &ldquo;{current.content}&rdquo;
                </p>
              </div>

              {/* 📱 MOBILE ONLY: 사진이 모바일에서도 크게 잘 보이도록 배치! */}
              {photoToShow && (
                <div className="block lg:hidden pt-1">
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/70 to-transparent" />
                    <BeforeAfterPhoto
                      key={`m-${current.id}`}
                      before={current.beforeImage}
                      after={current.afterImage}
                      beforeLabel={t.beforeTag}
                      afterLabel={t.afterTag}
                      singleLabel={t.photoBadge}
                    />
                    <div className="absolute bottom-2.5 left-3 right-16 text-white">
                      <span className="text-[11px] font-semibold truncate block">{current.serviceType} 완료</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Author & Verification */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center font-bold text-white text-sm sm:text-base shadow-ambient-sm flex-shrink-0">
                  {current.author.slice(0, 1)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-sm sm:text-base text-slate-900">{current.author}</span>
                    <span className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" strokeWidth={1.75} />
                      {t.verifiedBadge}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-normal">{current.location} · {current.date}</p>
                </div>
              </div>

            </div>

            {/* 💻 DESKTOP ONLY: 우측 사진 프리뷰 (4 cols) */}
            <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center">
              {photoToShow ? (
                <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <BeforeAfterPhoto
                    key={`d-${current.id}`}
                    before={current.beforeImage}
                    after={current.afterImage}
                    beforeLabel={t.beforeTag}
                    afterLabel={t.afterTag}
                    singleLabel={t.photoBadge}
                  />
                  <div className="absolute bottom-3 left-3 right-16 text-white">
                    <span className="text-[11px] font-semibold uppercase text-sky-300">{t.photoEyebrow}</span>
                    <p className="text-xs font-semibold truncate">{current.serviceType}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-[280px] aspect-[4/3] rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                  <span>{t.noPhoto}</span>
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots Indicator */}
      <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] sm:text-xs text-slate-400 font-normal">
          {t.pauseHint}
        </span>
        <div className="flex items-center gap-1.5">
          {displayReviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === currentIndex
                  ? 'w-6 sm:w-7 bg-blue-700'
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`${i + 1}번째 후기 보기`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
