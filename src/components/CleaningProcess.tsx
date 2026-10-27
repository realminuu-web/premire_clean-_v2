'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed,
  Droplets,
  AppWindow,
  Archive,
  Wind,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Split,
  AlertTriangle,
} from 'lucide-react';
import { scrollToId, useContent } from '@/components/ContentProvider';
import SectionHeading from '@/components/SectionHeading';

const ZONE_ICONS = {
  kitchen: UtensilsCrossed,
  bathroom: Droplets,
  window: AppWindow,
  storage: Archive,
  'floor-air': Wind,
};

type ViewMode = 'after' | 'before' | 'split';

export default function CleaningProcess() {
  const { process, cleaningManualZones: zones } = useContent();
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

  const scrollToContact = () => scrollToId('#contact');

  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-10 lg:space-y-12 relative z-10">
        <SectionHeading flush title1={process.title1} title2={process.title2} description={process.description} />

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
                <span>{process.beforeButton}</span>
              </button>
              <button
                onClick={() => setViewMode('after')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'after'
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{process.afterButton}</span>
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
                <span>{process.splitButton}</span>
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
                        <span>{process.afterLabel}</span>
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
                    <span>{process.beforeLabel}</span>
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
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white/90 text-xs px-3 py-1 rounded-full pointer-events-none font-medium">
              {process.hint}
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
                <span>{process.directNote}</span>
              </div>

              <button
                data-track="click_quote"
                onClick={scrollToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-ambient-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>{process.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
