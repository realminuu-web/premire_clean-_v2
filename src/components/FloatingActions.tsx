'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '@/components/ContentProvider';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { contact, mobileBar } = useContent();
  const kakaoUrl = contact.kakaoChatUrl;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-30 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="pointer-events-auto w-11 h-11 rounded-full bg-white text-slate-700 shadow-lg border border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-all flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="맨 위로 이동"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* KakaoTalk Floating Button with Pulse Effect (Desktop Only - Mobile has MobileStickyBar) */}
      <div className="hidden md:block relative group pointer-events-auto">
        
        {/* Tooltip bubble on desktop */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-bold rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {mobileBar.kakaoTooltip}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900/90" />
        </div>


        {/* Main Kakao Floating Action Button */}
        <a
          href={kakaoUrl}
          data-track="click_kakao"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#FEE500] text-[#3C1E1E] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="카카오톡 1:1 상담"
        >
          {/* Kakao Speech Bubble Silhouette */}
          <MessageCircle className="w-7 h-7 fill-[#3C1E1E] text-[#3C1E1E]" />
        </a>

      </div>

    </div>
  );
}
