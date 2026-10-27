'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import InstagramFeed from './InstagramFeed';
import { siteConfig } from '@/config/site';

export default function InstagramSection() {
  return (
    <section id="instagram" className="py-20 lg:py-28 2xl:py-36 bg-white relative">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 space-y-10 lg:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" strokeWidth={1.75} />
            <span>OFFICIAL INSTAGRAM STORY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-[-0.03em] break-keep">
            생생한 현장 실사, <br className="hidden sm:inline" />
            <span className="text-blue-700 inline-block">공식 인스타그램 피드</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto break-keep leading-relaxed font-normal">
            매일 업데이트되는 {siteConfig.brand.name} 직영 마스터팀의 리얼 시공 과정과 비포&애프터 스토리를 만나보세요.
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
