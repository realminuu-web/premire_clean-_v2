'use client';

import React from 'react';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 justify-between">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-sky-200" strokeWidth={1.75} />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                PREMIER <span className="text-blue-500">CLEAN</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm break-keep font-normal">
              {siteConfig.brand.name}은 100% 한국인 직영 마스터팀으로 운영되는 프리미엄 청소 전문 기업입니다. 타협 없는 시공과 공인된 친환경 기술로 새로운 주거·업무 환경의 기준을 만듭니다.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
              <span>{siteConfig.company.insuranceNotice}</span>
            </div>
          </div>

          {/* Nav Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-semibold text-white text-sm">바로가기</h5>
            <ul className="space-y-2 text-xs font-normal">
              <li>
                <a href="#about" className="hover:text-white transition-colors">회사소개 및 핵심가치</a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">구역별 완전 탈거공정</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">홈클리닝 & 사업장 서비스</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">비포 & 애프터 작업후기</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">자주 묻는 질문 (FAQ)</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">1:1 맞춤 견적 신청</a>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="font-semibold text-white text-sm">고객센터 & 상담 문의</h5>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.75} />
                <a href={siteConfig.contact.phoneTel} className="text-white font-bold text-sm hover:text-blue-400 transition-colors">
                  {siteConfig.contact.phone}
                </a>
                <span className="text-slate-500 font-normal">({siteConfig.contact.operatingHours})</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.75} />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors font-medium">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" strokeWidth={1.75} />
                <span className="break-keep font-normal">{siteConfig.company.address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Business Registration Details & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="space-y-1 text-center md:text-left break-keep font-normal">
            <p>
              {siteConfig.company.corporateName} | 대표자: {siteConfig.company.ceo} | 사업자등록번호: {siteConfig.company.businessNumber} | 통신판매업신고: {siteConfig.company.telecomSalesNumber}
            </p>
            <p>
              개인정보보호책임자: {siteConfig.company.privacyOfficer} | 직영 교육원: {siteConfig.company.trainingCenter}
            </p>
          </div>

          <div className="flex items-center gap-2 text-center md:text-right font-normal">
            <span>&copy; 2026 {siteConfig.brand.englishName}. All rights reserved.</span>
            <span className="text-slate-800">|</span>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-admin-modal'))}
              className="text-slate-600 hover:text-slate-400 text-[10px] transition-colors cursor-pointer"
              title="관리자 모드"
            >
              관리자
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
