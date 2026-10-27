'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, Check, ArrowRight } from 'lucide-react';
import { scrollToId, useContent } from '@/components/ContentProvider';
import type { ServiceDetail } from '@/types';

function ServiceCard({ service, tone, areasLabel, checkLabel }: {
  service: ServiceDetail;
  tone: 'blue' | 'indigo';
  areasLabel: string;
  checkLabel: string;
}) {
  const blue = tone === 'blue';
  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-3xl overflow-hidden shadow-ambient-md hover:shadow-ambient-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative h-64 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url('${service.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          <div className="absolute top-5 left-5">
            <span className={`${blue ? 'bg-blue-700' : 'bg-indigo-700'} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm`}>
              {service.badge}
            </span>
          </div>
          <div className="absolute bottom-5 left-6 right-6 text-white space-y-1">
            <span className="text-xs tracking-wider text-sky-300 font-semibold">{service.eyebrow}</span>
            <h3 className="text-2xl font-bold tracking-tight">{service.title}</h3>
          </div>
        </div>

        <div className="p-7 space-y-6 bg-white">
          <p className="text-sm text-slate-600 break-keep leading-relaxed font-normal">{service.description}</p>

          <div className="space-y-3">
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${blue ? 'text-blue-700' : 'text-indigo-700'}`}>{areasLabel}</h4>
            <div className="flex flex-wrap gap-2">
              {service.highlights.map((h) => (
                <span
                  key={h}
                  className={`px-3 py-1 text-xs font-semibold rounded-xl border ${
                    blue ? 'bg-blue-50 text-blue-800 border-blue-100' : 'bg-indigo-50 text-indigo-800 border-indigo-100'
                  }`}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-semibold text-slate-900">{checkLabel}</h4>
            {service.features.map((f) => (
              <div key={f} className="flex items-start gap-2.5">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    blue ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  <Check className="w-2.5 h-2.5" strokeWidth={2.5} />
                </div>
                <span className="text-xs text-slate-700 font-normal break-keep">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-4">
        <span className="text-xs text-slate-500 font-medium">{service.footerNote}</span>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-track="click_quote"
          onClick={() => scrollToId('#contact')}
          className={`inline-flex items-center gap-2 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-ambient-sm transition-all cursor-pointer ${
            blue ? 'bg-blue-700 hover:bg-blue-800' : 'bg-indigo-700 hover:bg-indigo-800'
          }`}
        >
          <span>{service.cta}</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
        </motion.button>
      </div>
    </div>
  );
}

export default function Services() {
  const { services } = useContent();
  const [activeTab, setActiveTab] = useState<'home' | 'commercial'>('home');
  const active = activeTab === 'home' ? services.home : services.commercial;

  return (
    <section id="services" className="py-20 lg:py-28 2xl:py-36 bg-white relative">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-[-0.03em] break-keep">
            {services.title1} <br className="hidden sm:inline" />
            <span className="text-blue-700 inline-block">{services.title2}</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 break-keep max-w-2xl mx-auto leading-relaxed font-normal">
            {services.description}
          </p>
        </div>

        {/* Mobile: Segmented Tab Switcher */}
        <div className="flex justify-center mb-8 lg:hidden">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-inner w-full max-w-md">
            {(['home', 'commercial'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer break-keep ${
                  activeTab === tab ? 'bg-blue-700 text-white shadow-ambient-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'home' ? <Home className="w-4 h-4" strokeWidth={1.75} /> : <Building2 className="w-4 h-4" strokeWidth={1.75} />}
                <span>{tab === 'home' ? services.tabHome : services.tabCommercial}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Side-by-Side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 2xl:gap-12">
          <ServiceCard service={services.home} tone="blue" areasLabel={services.areasLabel} checkLabel={services.checkLabel} />
          <ServiceCard
            service={services.commercial}
            tone="indigo"
            areasLabel={services.areasLabel}
            checkLabel={services.checkLabel}
          />
        </div>

        {/* Mobile: Single Card Switcher */}
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
                style={{ backgroundImage: `url('${active.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[10px] font-semibold text-sky-300 uppercase tracking-wider">{active.eyebrow}</span>
                  <h3 className="text-lg font-bold">{active.title}</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {active.highlights.map((h) => (
                    <span key={h} className="px-2.5 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-lg">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="space-y-2 pt-2">
                  {active.features.slice(0, 4).map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-slate-700 font-normal break-keep">
                      <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <p className="text-xs text-slate-500 font-medium text-center">{services.mobileNote}</p>
                <button
                  data-track="click_quote"
                  onClick={() => scrollToId('#contact')}
                  className="w-full py-3.5 rounded-xl bg-blue-700 text-white font-semibold text-sm shadow-ambient-sm transition-all"
                >
                  {services.mobileCta}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
