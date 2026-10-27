'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed,
  Droplets,
  AppWindow,
  Archive,
  Wind,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Split,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

const ZONE_ICONS = {
  kitchen: UtensilsCrossed,
  bathroom: Droplets,
  window: AppWindow,
  storage: Archive,
  'floor-air': Wind,
};

type ViewMode = 'after' | 'before' | 'split';

export default function CleaningProcess() {
  const zones = siteConfig.cleaningManualZones;
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('after');

  const currentZone = zones[activeZoneIndex] || zones[0];
  const Icon = ZONE_ICONS[currentZone.id as keyof typeof ZONE_ICONS] || UtensilsCrossed;

  const handlePrevZone = () => {
    setActiveZoneIndex((prev) => (prev === 0 ? zones.length - 1 : prev - 1));
  };

  const handleNextZone = () => {
    setActiveZoneIndex((prev) => (prev + 1) % zones.length);
  };

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

  return (
    <section id="process" className="py-20 lg:py-28 2xl:py-36 bg-slate-50 relative overflow-hidden">
      {/* Background Subtle Gradient Spheres */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sky-100/30 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>BEFORE & AFTER SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-[-0.03em] break-keep">
            결과로 증명하는 <br className="hidden sm:inline" />
            <span className="text-blue-700 inline-block">구역별 비포 & 애프터</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto break-keep leading-relaxed font-normal">
            보이지 않는 구석과 찌든 때까지 복원하는 프리미어 클린의 실제 시공 전·후 현장입니다.
          </p>
        </div>

        {/* 1. Zone Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {zones.map((item, idx) => {
            const ZoneIcon = ZONE_ICONS[item.id as keyof typeof ZONE_ICONS] || UtensilsCrossed;
            const isActive = idx === activeZoneIndex;

            return (
              <button
                key={item.id}
                onClick={() => setActiveZoneIndex(idx)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-ambient-sm scale-[1.02]'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 shadow-sm'
                }`}
              >
                <ZoneIcon className={`w-4 h-4 ${isActive ? 'text-sky-200' : 'text-blue-600'}`} strokeWidth={1.75} />
                <span>{item.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Streamlined Magazine Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-ambient-md overflow-hidden p-4 sm:p-6 lg:p-8 space-y-5">
          
          {/* Card Top: Zone Info & One-Touch View Switcher Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {currentZone.tag}
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {currentZone.zone} ({activeZoneIndex + 1}/{zones.length})
              </span>
            </div>

            {/* 💡 원터치 버튼식 전/후 뷰어 스위처 (모바일 스크롤 간섭 0%) */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 shadow-inner self-start sm:self-auto">
              <button
                onClick={() => setViewMode('before')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'before'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.75} />
                <span>시공 전 (BEFORE)</span>
              </button>
              <button
                onClick={() => setViewMode('after')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'after'
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-200" strokeWidth={1.75} />
                <span>시공 후 (AFTER)</span>
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'split'
                    ? 'bg-indigo-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Split className="w-3.5 h-3.5 text-indigo-200" strokeWidth={1.75} />
                <span>반반 비교</span>
              </button>
            </div>
          </div>

          {/* Photo Showcase Frame */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[2.4/1] rounded-2xl overflow-hidden bg-slate-900 shadow-inner border border-slate-200/80 group">
            
            <AnimatePresence mode="wait">
              {viewMode === 'after' && (
                <motion.div
                  key={`after-${currentZone.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${currentZone.afterImage}')` }}
                >
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-blue-700/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-200" strokeWidth={1.75} />
                    <span>AFTER (정밀 멸균 시공 완료)</span>
                  </div>
                </motion.div>
              )}

              {viewMode === 'before' && (
                <motion.div
                  key={`before-${currentZone.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${currentZone.beforeImage}')` }}
                >
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-slate-900/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.75} />
                    <span>BEFORE (시공 전 오염 상태)</span>
                  </div>
                </motion.div>
              )}

              {viewMode === 'split' && (
                <motion.div
                  key={`split-${currentZone.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex"
                >
                  {/* Left Half: BEFORE */}
                  <div
                    className="w-1/2 h-full bg-cover bg-center relative border-r-2 border-white shadow-xl"
                    style={{ backgroundImage: `url('${currentZone.beforeImage}')` }}
                  >
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-slate-900/85 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                      <span>BEFORE</span>
                    </div>
                  </div>
                  {/* Right Half: AFTER */}
                  <div
                    className="w-1/2 h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url('${currentZone.afterImage}')` }}
                  >
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-blue-700/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                      <span>AFTER</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Left & Right Quick Zone Navigation Arrows */}
            <button
              onClick={handlePrevZone}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
              aria-label="이전 구역 보기"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              onClick={handleNextZone}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
              aria-label="다음 구역 보기"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </button>

            {/* Tap Hint for Mobile */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white/90 text-[11px] px-3 py-1 rounded-full pointer-events-none font-medium">
              상단 버튼을 눌러 시공 전/후를 비교해 보세요
            </div>
          </div>

          {/* Card Bottom: Punchy Editorial Caption & Fast Quote Button (공정/장비 긴 설명 제거!) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-blue-700" strokeWidth={1.75} />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {currentZone.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed break-keep">
                {currentZone.summary}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 pt-2 sm:pt-0">
              <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-blue-700" strokeWidth={1.75} />
                <span>100% 직영팀 직접 시공</span>
              </div>

              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-ambient-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>이 구역 맞춤 견적 문의</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
