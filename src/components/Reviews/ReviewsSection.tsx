'use client';

import React from 'react';
import { Sparkles, Star } from 'lucide-react';
import ReviewCarousel from './ReviewCarousel';
import { useContent, useReviews } from '@/components/ContentProvider';

export default function ReviewsSection() {
  const { reviewsSection } = useContent();
  // 관리자 페이지 [시공 후기]에서 올린 후기 (없으면 예시 후기)
  const reviews = useReviews();

  return (
    <section id="reviews" className="py-20 lg:py-28 2xl:py-36 bg-slate-50 relative">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-10 lg:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>{reviewsSection.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-[-0.03em] break-keep">
            {reviewsSection.title1}{' '}
            <span className="text-blue-700 inline-block">{reviewsSection.title2}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto break-keep leading-relaxed font-normal">
            {reviewsSection.description}
          </p>

          {reviewsSection.ratingText && (
            <div className="inline-flex items-center gap-2 pt-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" strokeWidth={1.75} />
                ))}
              </div>
              <span>{reviewsSection.ratingText}</span>
            </div>
          )}
        </div>

        <div>
          <ReviewCarousel reviews={reviews} />
        </div>
      </div>
    </section>
  );
}
