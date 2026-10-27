'use client';

import React from 'react';
import InstagramFeed from './InstagramFeed';
import { useContent } from '@/components/ContentProvider';

export default function InstagramSection() {
  const { instagram } = useContent();
  return (
    <section id="instagram" className="py-20 lg:py-28 2xl:py-36 bg-white relative">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-10 lg:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-[-0.03em] break-keep">
            {instagram.title1} <br className="hidden sm:inline" />
            <span className="text-blue-700 inline-block">{instagram.title2}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto break-keep leading-relaxed font-normal">
            {instagram.description}
          </p>
        </div>

        {/* 인스타그램 공식 피드 카드 (siteConfig에서 1개~6개 표시 개수 자유 조절) */}
        <div>
          <InstagramFeed />
        </div>

      </div>
    </section>
  );
}
