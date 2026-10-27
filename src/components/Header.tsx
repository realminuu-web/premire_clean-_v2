'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToId, useContent } from '@/components/ContentProvider';

export default function Header() {
  const { header, contact, sectionOrder, visibility } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 첫 화면 사진이 맨 위에 있을 때만, 사진 위에 투명하게 겹칩니다.
  const overHero = sectionOrder.find((id) => visibility[id] !== false) === 'hero';
  const transparent = overHero && !isScrolled && !mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => scrollToId(href), 180);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent py-4 border-b border-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-ambient-sm border-b border-slate-200/80 py-3.5'
      }`}
    >
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group transition-transform active:scale-95">
           <div className="flex flex-col">
              <span
                className={`font-bold text-xl tracking-tight transition-colors ${
                  transparent ? 'text-white' : 'text-slate-900 group-hover:text-blue-700'
                }`}
              >
                {header.logoMain}{' '}
                <span className={transparent ? 'text-sky-300' : 'text-blue-700'}>{header.logoAccent}</span>
              </span>
              <span
                className={`hidden sm:block text-[10px] font-semibold tracking-wider -mt-0.5 ${
                  transparent ? 'text-white/75' : 'text-slate-500'
                }`}
              >
                {header.logoSub}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 2xl:gap-9">
            {header.nav.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm 2xl:text-base font-semibold transition-colors relative py-1 group ${
                  transparent ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-blue-700'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full ${
                    transparent ? 'bg-white' : 'bg-blue-700'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={contact.phoneTel}
              data-track="click_phone"
              className={`flex items-center gap-2 text-xs 2xl:text-sm font-semibold transition-colors py-2 px-3.5 rounded-full ${
                transparent ? 'text-white hover:bg-white/15' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              <Phone className={`w-3.5 h-3.5 ${transparent ? 'text-white' : 'text-blue-700'}`} strokeWidth={1.75} />
              <span>
                {contact.phone} {header.phoneSuffix}
              </span>
            </a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              href="#contact"
              data-track="click_quote"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`inline-flex items-center gap-2 text-xs 2xl:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-ambient-sm transition-colors cursor-pointer ${
                transparent ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
            >
              <span>{header.desktopCta}</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#contact"
              data-track="click_quote"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm ${
                transparent ? 'bg-white text-blue-700' : 'bg-blue-700 text-white'
              }`}
            >
              {header.mobileCta}
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none rounded-lg transition-colors ${
                transparent ? 'text-white hover:bg-white/15' : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100'
              }`}
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={mobileMenuOpen}
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
                <span>{header.mobileNotice}</span>
              </div>
              {header.nav.map((link) => (
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
                  href={contact.phoneTel}
                  data-track="click_phone"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50 transition-all"
                >
                  <Phone className="w-4 h-4 text-blue-700" strokeWidth={1.75} />
                  {header.mobilePhonePrefix} {contact.phone}
                </a>
                <a
                  href="#contact"
                  data-track="click_quote"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-ambient-sm transition-all"
                >
                  {header.mobileQuote}
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
