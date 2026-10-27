'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, Check, ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/mockData';

export default function Services() {
  const [activeTab, setActiveTab] = useState<'home' | 'commercial'>('home');

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      const headerOffset = 75;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const homeService = SERVICES_DATA.find((s) => s.category === 'home') || SERVICES_DATA[0];
  const commercialService = SERVICES_DATA.find((s) => s.category === 'commercial') || SERVICES_DATA[1];

  return (
    <section id="services" className="pt-8 sm:pt-12 lg:pt-14 pb-20 lg:pb-28 2xl:pb-36 bg-white relative">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        
        {/* Section Header with Proper Korean Typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wider uppercase border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" strokeWidth={1.75} />
            <span>50:50 DUAL MASTER CARE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-[-0.03em] break-keep">
            주거와 비즈니스, <br className="hidden sm:inline" />
            <span className="text-blue-700 inline-block">모든 공간의 최상위 클리닝</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 break-keep max-w-2xl mx-auto leading-relaxed font-normal">
            프리미어 클린은 프리미엄 주거 홈클리닝과 오피스·상가 상업공간 관리를 동등한 100% 직영 마스터 공정으로 완성합니다.
          </p>
        </div>

        {/* Mobile View: Clean Segmented Tab Switcher */}
        <div className="flex justify-center mb-8 lg:hidden">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-inner w-full max-w-md">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer break-keep ${
                activeTab === 'home'
                  ? 'bg-blue-700 text-white shadow-ambient-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" strokeWidth={1.75} />
              <span>홈클리닝 (50%)</span>
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer break-keep ${
                activeTab === 'commercial'
                  ? 'bg-blue-700 text-white shadow-ambient-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" strokeWidth={1.75} />
              <span>사업장 클리닝 (50%)</span>
            </button>
          </div>
        </div>

        {/* Desktop View: 50:50 Side-by-Side Dual Grid Showcase */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 2xl:gap-12">
          
          {/* 1. 홈클리닝 (50%) */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl overflow-hidden shadow-ambient-md hover:shadow-ambient-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative h-64 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url('${homeService.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    주거 전문 마스터
                  </span>
                </div>
                <div className="absolute bottom-5 left-6 right-6 text-white space-y-1">
                  <span className="text-xs uppercase tracking-wider text-sky-300 font-semibold">HOME CLEANING</span>
                  <h3 className="text-2xl font-bold tracking-tight">{homeService.title}</h3>
                </div>
              </div>

              <div className="p-7 space-y-6 bg-white">
                <p className="text-sm text-slate-600 break-keep leading-relaxed font-normal">
                  {homeService.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-700">주요 케어 영역</h4>
                  <div className="flex flex-wrap gap-2">
                    {homeService.highlights.map((h) => (
                      <span key={h} className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-xl border border-blue-100">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-900">시공 핵심 체크포인트</h4>
                  {homeService.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" strokeWidth={2.5} />
                      </div>
                      <span className="text-xs text-slate-700 font-normal break-keep">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium">공간 면적 및 상태 맞춤 산출</span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-ambient-sm transition-all cursor-pointer"
              >
                <span>홈클리닝 견적 신청</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
              </motion.button>
            </div>
          </div>

          {/* 2. 사업장 클리닝 (50%) */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl overflow-hidden shadow-ambient-md hover:shadow-ambient-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative h-64 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url('${commercialService.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    비즈니스 전문 마스터
                  </span>
                </div>
                <div className="absolute bottom-5 left-6 right-6 text-white space-y-1">
                  <span className="text-xs uppercase tracking-wider text-sky-300 font-semibold">COMMERCIAL CLEANING</span>
                  <h3 className="text-2xl font-bold tracking-tight">{commercialService.title}</h3>
                </div>
              </div>

              <div className="p-7 space-y-6 bg-white">
                <p className="text-sm text-slate-600 break-keep leading-relaxed font-normal">
                  {commercialService.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-700">주요 케어 영역</h4>
                  <div className="flex flex-wrap gap-2">
                    {commercialService.highlights.map((h) => (
                      <span key={h} className="px-3 py-1 bg-indigo-50 text-indigo-800 text-xs font-semibold rounded-xl border border-indigo-100">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-900">시공 핵심 체크포인트</h4>
                  {commercialService.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" strokeWidth={2.5} />
                      </div>
                      <span className="text-xs text-slate-700 font-normal break-keep">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium">세금계산서 100% · 정기 관리</span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-ambient-sm transition-all cursor-pointer"
              >
                <span>사업장 견적 신청</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
              </motion.button>
            </div>
          </div>

        </div>

        {/* Mobile View: Dynamic Single Card Switcher */}
        <div className="block lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-ambient-sm space-y-5 p-5"
            >
              <div
                className="relative h-48 rounded-2xl overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url('${activeTab === 'home' ? homeService.image : commercialService.image}')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[10px] font-semibold text-sky-300 uppercase tracking-wider">
                    {activeTab === 'home' ? 'Home Cleaning' : 'Commercial Cleaning'}
                  </span>
                  <h3 className="text-lg font-bold">
                    {activeTab === 'home' ? homeService.title : commercialService.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {(activeTab === 'home' ? homeService.highlights : commercialService.highlights).map((h) => (
                    <span key={h} className="px-2.5 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-lg">
                      {h}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  {(activeTab === 'home' ? homeService.features : commercialService.features).slice(0, 4).map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-slate-700 font-normal break-keep">
                      <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <p className="text-xs text-slate-500 font-medium text-center">공간 상태에 따른 맞춤 상담을 제공합니다</p>
                <button
                  onClick={scrollToContact}
                  className="w-full py-3.5 rounded-xl bg-blue-700 text-white font-semibold text-sm shadow-ambient-sm active:scale-98 transition-all"
                >
                  맞춤 견적 상담 받기
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
