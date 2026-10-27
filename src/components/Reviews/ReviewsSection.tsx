'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Star } from 'lucide-react';
import ReviewCarousel from './ReviewCarousel';
import { fetchReviews } from '@/lib/supabase';
import { ReviewItem } from '@/types';
import { INITIAL_REVIEWS } from '@/lib/mockData';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);

  useEffect(() => {
    async function loadReviews() {
      const data = await fetchReviews();
      if (data && data.length > 0) {
        setReviews(data);
      }
    }
    loadReviews();
  }, []);

  return (
    <section id="reviews" className="py-20 lg:py-28 2xl:py-36 bg-slate-50 relative">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-10 lg:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>REAL VERIFIED CUSTOMER REVIEWS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-[-0.03em] break-keep">
            결과로 증명하는{' '}
            <span className="text-blue-700 inline-block">실제 고객 시공 후기</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto break-keep leading-relaxed font-normal">
            100% 한국인 직영 마스터팀이 현장에서 직접 시공하고 고객님과 동행 검수를 마친 실제 후기입니다.
          </p>

          <div className="inline-flex items-center gap-2 pt-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" strokeWidth={1.75} />
              ))}
            </div>
            <span>고객 평점 4.98 / 5.0 만점 기준</span>
          </div>
        </div>

        {/* 단일화된 실제 고객 시공 후기 슬라이드 캐러셀 */}
        <div>
          <ReviewCarousel reviews={reviews} />
        </div>

      </div>
    </section>
  );
}
