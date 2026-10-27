'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, RotateCcw, Coffee, Sparkles, CheckCircle2, Receipt, HandCoins } from 'lucide-react';
import { siteConfig } from '@/config/site';

const ICON_MAP = {
  ShieldCheck,
  CreditCard,
  RotateCcw,
  Coffee,
  Receipt,
  HandCoins,
};

export default function TrustBadges() {
  const badges = siteConfig.trustBadges;

  return (
    <section className="py-6 sm:py-7 bg-gradient-to-b from-white via-slate-50/70 to-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        
        {/* Sleek Certificate Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200/60 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/30 flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-sm sm:text-base">
                프리미어 클린 4대 고객 안심 보증 서약제
              </span>
              <span className="hidden md:inline text-slate-300 mx-2">|</span>
              <span className="hidden md:inline text-xs text-slate-500 font-medium">
                파손·선금·A/S·추가금 우려를 법적·금전적으로 100% 사전 차단합니다
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />
            <span>본사 직영 공식 보증</span>
          </div>
        </div>

        {/* 4 Guarantees Strip: Divided Horizontal Row on Desktop, 2x2 Grid on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0 lg:divide-x lg:divide-slate-200/80">
          {badges.map((item, index) => {
            const IconComponent = ICON_MAP[item.iconName as keyof typeof ICON_MAP] || ShieldCheck;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-white lg:bg-transparent rounded-2xl lg:rounded-none p-3.5 sm:p-4 lg:px-5 lg:py-2 border lg:border-none border-slate-200/70 hover:bg-white lg:hover:bg-slate-100/60 transition-all duration-200 flex items-start gap-3.5"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 flex items-center justify-center flex-shrink-0 shadow-sm border border-blue-100/60">
                  <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                </div>

                {/* Text Block */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-black text-blue-700 bg-blue-100/70 group-hover:bg-blue-600 group-hover:text-white px-2 py-0.5 rounded-md transition-colors">
                      {item.badge}
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[11px] sm:text-xs font-bold text-blue-600 mt-0.5 break-keep">
                    {item.subtitle}
                  </p>

                  <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2 hidden sm:block font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

