'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { useContent } from '@/components/ContentProvider';

export default function FaqSection() {
  const { faqSection, faqList: faqs, contact } = useContent();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 2xl:py-36 bg-white relative">
      <div className="max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 2xl:space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-100">
            <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>{faqSection.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-[-0.03em] break-keep">
            {faqSection.title1} <br className="hidden sm:inline" />
            <span className="text-blue-700 inline-block">{faqSection.title2}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto break-keep leading-relaxed font-normal">
            {faqSection.description}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-blue-50/30 border-blue-200/90 shadow-ambient-sm'
                    : 'bg-slate-50/60 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-md flex-shrink-0">
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight break-keep">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-blue-700 text-white rotate-180'
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" strokeWidth={2} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-700 leading-relaxed font-normal break-keep border-t border-blue-100/60 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Help Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-ambient-md flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-semibold text-sky-400 flex items-center justify-center sm:justify-start gap-1">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>{faqSection.helpEyebrow}</span>
            </span>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight">{faqSection.helpTitle}</h4>
            <p className="text-xs text-slate-300 break-keep font-normal">
              {faqSection.helpDescription}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={contact.phoneTel}
              data-track="click_phone"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-3 rounded-xl transition-all shadow-ambient-sm active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>{contact.phone}</span>
            </a>
            <a
              href={contact.kakaoChatUrl}
              data-track="click_kakao"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FEE500] hover:bg-yellow-400 text-[#3C1E1E] text-xs font-bold px-4 py-3 rounded-xl transition-all shadow-ambient-sm active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" strokeWidth={1.75} />
              <span>{faqSection.kakaoButton}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
