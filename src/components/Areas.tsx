'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { scrollToId, useContent } from '@/components/ContentProvider';
import SectionHeading from '@/components/SectionHeading';

/** 서비스 지역: 서울·경기 묶음별 구·시 목록 (이 목록이 검색엔진용 지역이기도 함) */
export default function Areas() {
  const { areas } = useContent();

  return (
    <section id="areas" className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-5 sm:px-6 lg:px-8 2xl:px-12">
        <SectionHeading title1={areas.title1} title2={areas.title2} description={areas.description} />

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 lg:gap-6">
          {areas.groups.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-3xl border border-slate-200/90 bg-slate-50 p-6 sm:p-8"
            >
              <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
                <MapPin className="h-5 w-5 text-blue-700" strokeWidth={1.75} />
                {g.name}
                <span className="text-sm font-medium text-slate-500">{g.districts.length}곳</span>
              </h3>
              {/* 칸 너비를 똑같이 맞춰 줄마다 버블이 반듯하게 정렬되게 합니다 */}
              <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                {g.districts.map((d) => (
                  <li key={d} className="truncate rounded-full border border-slate-200 bg-white px-2 py-2 text-center text-sm font-medium text-slate-700">
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-5xl flex-col items-start gap-4 rounded-3xl bg-blue-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="text-[15px] leading-relaxed text-pretty text-slate-700 break-keep">{areas.note}</p>
          <button
            type="button"
            data-track="click_quote"
            onClick={() => scrollToId('#contact')}
            className="inline-flex min-h-12 flex-shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-ambient-sm transition-colors duration-300 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            {areas.cta}
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
