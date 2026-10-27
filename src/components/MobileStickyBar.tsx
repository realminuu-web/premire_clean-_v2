'use client';

import React from 'react';
import { Phone, MessageCircle, Send } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function MobileStickyBar() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <aside
      aria-label="모바일 빠른 상담 및 견적 신청"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-3 py-2 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* 1. Phone Consultation (min-h-[48px] thumb target) */}
        <a
          href={siteConfig.contact.phoneTel}
          className="flex flex-col items-center justify-center min-h-[48px] py-1.5 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition-all active:scale-95 cursor-pointer border border-slate-200/80"
        >
          <Phone className="w-4 h-4 text-blue-700 mb-0.5" strokeWidth={1.75} />
          <span>전화 상담</span>
        </a>

        {/* 2. KakaoTalk 1:1 Chat (min-h-[48px] thumb target) */}
        <a
          href={siteConfig.contact.kakaoChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[48px] py-1.5 px-1 rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-[#3C1E1E] font-bold text-[11px] transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current mb-0.5" strokeWidth={1.75} />
          <span>카톡 1:1</span>
        </a>

        {/* 3. Fast Quote Request (min-h-[48px] thumb target) */}
        <button
          onClick={scrollToContact}
          className="flex flex-col items-center justify-center min-h-[48px] py-1.5 px-1 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-[11px] transition-all active:scale-95 cursor-pointer shadow-ambient-sm"
        >
          <Send className="w-4 h-4 text-sky-200 mb-0.5" strokeWidth={1.75} />
          <span>견적 신청</span>
        </button>

      </div>
    </aside>
  );
}
