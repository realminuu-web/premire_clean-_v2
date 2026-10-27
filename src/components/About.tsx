'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users2,
  Leaf,
  Layers,
  Camera,
  ThumbsUp,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useContent } from '@/components/ContentProvider';

const ICON_MAP = {
  Users2,
  Leaf,
  Layers,
  Camera,
  ThumbsUp,
  RotateCcw,
  Sparkles,
  ShieldCheck,
};

export default function About() {
  const { about, coreValues: values } = useContent();
  const [activeTab, setActiveTab] = useState(0);

  const activeValue = values[activeTab] || values[0];
  const ActiveIcon = ICON_MAP[activeValue.iconName as keyof typeof ICON_MAP] || Users2;

  const handlePrev = () => {
    setActiveTab((prev) => (prev === 0 ? values.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev === values.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="about" className="py-20 lg:py-28 2xl:py-32 bg-white relative overflow-hidden">
      {/* Decorative blurred background lights */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10 space-y-10 lg:space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" strokeWidth={2} />
            <span>{about.eyebrow}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight break-keep">
            {about.title1}{' '}
            <span className="text-blue-700 inline-block">{about.title2}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed break-keep max-w-2xl mx-auto">
            {about.description}
          </p>
        </div>

        {/* 📱 Mobile View: Button-Tab Switcher (스크롤 단축 & 원터치 전환) */}
        <div className="block lg:hidden space-y-5">
          
          {/* Tab Button Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {values.map((val, idx) => {
              const TabIcon = ICON_MAP[val.iconName as keyof typeof ICON_MAP] || Users2;
              const isActive = idx === activeTab;

              return (
                <button
                  key={val.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-md shadow-blue-700/25 scale-[1.02]'
                      : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-200' : 'text-blue-600'}`} strokeWidth={1.75} />
                  <span className="truncate">{val.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card Body with Spring Animation (Compact height!) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeValue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`bg-white rounded-3xl p-6 sm:p-7 border ${activeValue.border} shadow-ambient-md space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeValue.gradient} flex items-center justify-center text-white shadow-md shadow-blue-500/20`}
                    >
                      <ActiveIcon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {activeValue.badge}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        {activeValue.title}
                      </h3>
                    </div>
                  </div>

                  {/* Left / Right mini navigation buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrev}
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer active:scale-95"
                      aria-label="이전 약속"
                    >
                      <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer active:scale-95"
                      aria-label="다음 약속"
                    >
                      <ChevronRight className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>

                <p className="text-xs font-semibold text-blue-600">
                  {activeValue.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal break-keep">
                  {activeValue.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5 text-blue-700 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" strokeWidth={2} />
                    <span>{activeValue.highlight}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {activeTab + 1} / {values.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* 💻 Desktop View: 4-Column Side-by-Side Grid (1줄로 시원하게 배치) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 2xl:gap-8">
          {values.map((item, idx) => {
            const Icon = ICON_MAP[item.iconName as keyof typeof ICON_MAP] || Users2;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group bg-white rounded-3xl p-7 border ${item.border} shadow-ambient-sm hover:shadow-ambient-md transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg 2xl:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors break-keep">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 mt-1 break-keep">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs 2xl:text-sm text-slate-600 leading-relaxed font-normal break-keep">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500 group-hover:text-blue-700 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" strokeWidth={2} />
                  <span>{item.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
