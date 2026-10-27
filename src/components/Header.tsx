'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, Menu, X, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import AdminReviewModal from './Reviews/AdminReviewModal';

const NAV_LINKS = [
  { name: '회사소개', href: '#about' },
  { name: '구역별 정밀공정', href: '#process' },
  { name: '서비스 안내', href: '#services' },
  { name: '작업 후기', href: '#reviews' },
  { name: '자주 묻는 질문', href: '#faq' },
  { name: '무료 견적문의', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenAdmin = () => setIsAdminModalOpen(true);
    window.addEventListener('open-admin-modal', handleOpenAdmin);
    return () => window.removeEventListener('open-admin-modal', handleOpenAdmin);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 75;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 180);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-ambient-sm border-b border-slate-200/80 py-3.5'
            : 'bg-white/80 backdrop-blur-sm py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 group transition-transform active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-ambient-sm group-hover:shadow-blue-500/30 transition-all">
                <Sparkles className="w-5 h-5 text-sky-200" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  PREMIER <span className="text-blue-700">CLEAN</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase -mt-0.5">
                  {siteConfig.brand.name} · 직영 마스터케어
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7 2xl:gap-9">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm 2xl:text-base font-semibold text-slate-600 hover:text-blue-700 transition-colors relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop Right CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={siteConfig.contact.phoneTel}
                className="flex items-center gap-2 text-xs 2xl:text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors py-2 px-3.5 rounded-full hover:bg-slate-100"
              >
                <Phone className="w-3.5 h-3.5 text-blue-700" strokeWidth={1.75} />
                <span>{siteConfig.contact.phone} (상담 직통)</span>
              </a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-xs 2xl:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-ambient-sm transition-all cursor-pointer"
              >
                <span>무료 견적 받기</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="text-xs font-semibold bg-blue-700 text-white px-3 py-1.5 rounded-lg shadow-sm"
              >
                견적문의
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-blue-700 focus:outline-none rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="메뉴 열기"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={1.75} /> : <Menu className="w-6 h-6" strokeWidth={1.75} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 overflow-hidden shadow-ambient-md"
            >
              <div className="px-5 pt-3 pb-6 space-y-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-800 text-xs font-medium rounded-lg mb-3">
                  <ShieldCheck className="w-4 h-4 text-blue-700 flex-shrink-0" strokeWidth={1.75} />
                  <span>100% 한국인 직영팀 · 100% 무료 A/S 보장</span>
                </div>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-700 hover:text-blue-700 hover:bg-blue-50/50 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
                  <a
                    href={siteConfig.contact.phoneTel}
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50 active:scale-98 transition-all"
                  >
                    <Phone className="w-4 h-4 text-blue-700" strokeWidth={1.75} />
                    전화 상담 {siteConfig.contact.phone}
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, '#contact')}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-ambient-sm active:scale-98 transition-all"
                  >
                    빠른 무료 견적 신청하기
                    <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                </div>

                {/* 🔒 은닉된 관리자 모드 버튼 (일반 고객에게 띄지 않게 배치) */}
                <div className="pt-2 text-center">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsAdminModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 transition-colors py-1 px-3 rounded-md hover:bg-slate-100 cursor-pointer"
                  >
                    <Lock className="w-3 h-3" strokeWidth={1.75} />
                    <span>관리자 모드</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Admin Review Upload Modal with Password Authentication */}
      <AdminReviewModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onReviewCreated={() => {
          setIsAdminModalOpen(false);
          window.location.reload();
        }}
      />
    </>
  );
}
