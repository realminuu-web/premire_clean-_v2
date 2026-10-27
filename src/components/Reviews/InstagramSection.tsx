'use client';

import React from 'react';
import InstagramFeed from './InstagramFeed';
import { useContent } from '@/components/ContentProvider';
import SectionHeading from '@/components/SectionHeading';

export default function InstagramSection() {
  const { instagram } = useContent();
  return (
    <section id="instagram" className="py-20 sm:py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-5 sm:px-6 lg:px-8 2xl:px-12">
        <SectionHeading title1={instagram.title1} title2={instagram.title2} description={instagram.description} />
        {/* 인스타그램 공식 피드 카드 (관리자 [섹션 순서·숨기기]에서 켜면 보임) */}
        <InstagramFeed />
      </div>
    </section>
  );
}
