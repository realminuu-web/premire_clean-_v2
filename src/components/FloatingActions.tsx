'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToId, useContent } from '@/components/ContentProvider';

/**
 * 오른쪽 아래 따라다니는 버튼: 위로가기 · 견적 문의 · 카톡.
 * 견적 문의·카톡은 컴퓨터·태블릿에서만 (휴대폰은 화면 맨 아래 고정 버튼이 있음).
 * 견적 신청 칸이 화면에 보이는 동안에는 견적 문의 버튼을 숨겨 신청서를 가리지 않게 합니다.
 */
export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const { contact, mobileBar } = useContent();
  const kakaoUrl = contact.kakaoChatUrl;

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 350);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const target = document.getElementById('contact');
    const observer = target
      ? new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), { threshold: 0.2 })
      : null;
    if (target && observer) observer.observe(target);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-30 flex flex-col items-end gap-3 pointer-events-none">
      {/* 맨 위로 */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pointer-events-auto w-11 h-11 rounded-full bg-white text-slate-700 shadow-lg border border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-all flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="맨 위로 이동"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 견적 문의 (컴퓨터·태블릿) */}
      <AnimatePresence>
        {!contactInView && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            data-track="click_quote"
            onClick={() => scrollToId('#contact')}
            className="pointer-events-auto hidden md:inline-flex h-13 items-center gap-2 rounded-full bg-blue-700 pl-4 pr-5 text-[15px] font-bold text-white shadow-[0_12px_26px_rgb(29_78_216/0.35)] hover:bg-blue-800 active:scale-95 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Send className="w-4.5 h-4.5" strokeWidth={2} />
            <span>{mobileBar.floatingQuote}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 카카오톡 (컴퓨터·태블릿) */}
      <div className="hidden md:block relative group pointer-events-auto">
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-bold rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {mobileBar.kakaoTooltip}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900/90" />
        </div>
        <a
          href={kakaoUrl}
          data-track="click_kakao"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#FEE500] text-[#3C1E1E] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="카카오톡 1:1 상담"
        >
          <MessageCircle className="w-7 h-7 fill-[#3C1E1E] text-[#3C1E1E]" />
        </a>
      </div>
    </div>
  );
}
