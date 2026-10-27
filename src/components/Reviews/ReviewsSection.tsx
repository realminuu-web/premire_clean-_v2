'use client';

import React from 'react';
import { Star } from 'lucide-react';
import ReviewCarousel from './ReviewCarousel';
import { useContent, useReviews } from '@/components/ContentProvider';
import SectionHeading from '@/components/SectionHeading';

export default function ReviewsSection() {
  const { reviewsSection } = useContent();
  // 관리자 페이지 [시공 후기]에서 올린 후기 (없으면 예시 후기)
  const reviews = useReviews();

  return (
    <section id="reviews" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-5 sm:px-6 lg:px-8 2xl:px-12">
        <SectionHeading title1={reviewsSection.title1} title2={reviewsSection.title2} description={reviewsSection.description} />

        {reviewsSection.ratingText && (
          <div className="-mt-4 mb-10 flex justify-center lg:-mt-6 lg:mb-12">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-4 py-2 rounded-full">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" strokeWidth={1.75} />
                ))}
              </div>
              <span>{reviewsSection.ratingText}</span>
            </div>
          </div>
        )}

        <ReviewCarousel reviews={reviews} />
      </div>
    </section>
  );
}
