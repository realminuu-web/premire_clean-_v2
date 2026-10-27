'use client';

import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useContent } from '@/components/ContentProvider';

export default function Footer() {
  const { footer, contact, company, header } = useContent();
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 justify-between">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
             <span className="font-bold text-lg text-white tracking-tight">
                {header.logoMain} <span className="text-blue-500">{header.logoAccent}</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm break-keep font-normal">
              {footer.description}
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
              <span>{company.insuranceNotice}</span>
            </div>
          </div>

          {/* Nav Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-semibold text-white text-sm">{footer.quickTitle}</h5>
            <ul className="space-y-2 text-xs font-normal">
              {footer.quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href.startsWith('#') ? `/${link.href}` : link.href} className="hover:text-white transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="font-semibold text-white text-sm">{footer.contactTitle}</h5>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.75} />
                <a href={contact.phoneTel} data-track="click_phone" className="text-white font-bold text-sm hover:text-blue-400 transition-colors">
                  {contact.phone}
                </a>
                <span className="text-slate-500 font-normal">({contact.operatingHours})</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.75} />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors font-medium">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" strokeWidth={1.75} />
                <span className="break-keep font-normal">{company.address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Business Registration Details & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1 text-center md:text-left break-keep font-normal">
            <p>
              {company.corporateName} | 대표자: {company.ceo} | 사업자등록번호: {company.businessNumber} | 통신판매업신고: {company.telecomSalesNumber}
            </p>
            <p>
              개인정보보호책임자: {company.privacyOfficer} | 직영 교육원: {company.trainingCenter}
            </p>
          </div>

          <div className="flex items-center gap-2 text-center md:text-right font-normal">
            <span>{footer.copyright}</span>
            <span className="text-slate-800">|</span>
            <a href="/admin" className="text-slate-600 hover:text-slate-400 text-xs transition-colors" rel="nofollow">
              관리자
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
