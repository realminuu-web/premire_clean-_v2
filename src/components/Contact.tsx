'use client';

import React, { useState } from 'react';
import { Send, Phone, Clock, ShieldAlert, CheckCircle2, Home, Building2, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendInquiryEmail } from '@/lib/emailjs';
import { InquiryFormData } from '@/types';
import { siteConfig } from '@/config/site';

const SPACE_SIZES = [
  '원룸/투룸 (15평 이하)',
  '20평형대 (20~29평)',
  '30평형대 (30~39평)',
  '40평형대 이상 (40평~)',
  '사무실 / 상업 매장',
];

// Helper to auto-format Korean phone numbers (e.g. 010-1234-5678)
function formatKoreanPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  if (digits.length < 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

export default function Contact() {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    serviceType: 'home',
    spaceSize: '30평형대 (30~39평)',
    serviceDate: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    simulated?: boolean;
  } | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatKoreanPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.name.trim()) {
      setValidationError('고객명(또는 업체명)을 입력해 주세요.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      setValidationError('올바른 연락처 번호(9~11자리 숫자)를 입력해 주세요. 예: 010-1234-5678');
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await sendInquiryEmail(formData);
      setSubmitResult(res);

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1d4ed8', '#38bdf8', '#60a5fa', '#93c5fd'],
        });
      } catch {
        // Confetti fallback
      }

      // Reset form after a brief period
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          serviceType: 'home',
          spaceSize: '30평형대 (30~39평)',
          serviceDate: '',
          message: '',
        });
      }, 2000);
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : '전송 중 문제가 발생했습니다.';
      setSubmitResult({
        success: false,
        message: errMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 2xl:py-36 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 text-sky-300 text-xs font-semibold uppercase tracking-wider border border-blue-800/60">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>FAST QUOTE & CONSULTATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] break-keep">
            1:1 무료 맞춤 견적 및{' '}
            <span className="text-sky-400 inline-block">작업 요청</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto break-keep text-center leading-relaxed font-normal">
            {siteConfig.contact.formSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Contact Info & Brand Trust (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-7 text-white shadow-ambient-md border border-slate-800 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-semibold tracking-wider text-sky-400">
                  고객 상담 센터
                </span>
                <h3 className="text-2xl font-bold tracking-tight">전화 직통 상담</h3>
                <a
                  href={siteConfig.contact.phoneTel}
                  className="inline-block text-3xl sm:text-4xl font-bold text-white tracking-tight hover:text-sky-300 transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300 font-normal">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.75} />
                  <span>상담 시간: {siteConfig.contact.operatingHours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.75} />
                  <span>문자 상담 및 야간 접수 가능 (순차 회신)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-sky-400 flex-shrink-0" strokeWidth={1.75} />
                  <span>100% 무료 A/S 보장 (3일 이내 무상 재방문)</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Process Card */}
            <div className="bg-slate-800/60 rounded-3xl p-6 border border-slate-700/60 space-y-4">
              <h4 className="font-bold text-sm text-white">
                견적 및 시공 진행 순서
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    1
                  </span>
                  <div>
                    <strong className="text-white font-semibold">온라인 견적 접수</strong>
                    <p className="text-[11px] text-slate-400 font-normal">폼 작성 후 30분 내 유선/카톡 전문 상담</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    2
                  </span>
                  <div>
                    <strong className="text-white font-semibold">예약 확정 및 배정</strong>
                    <p className="text-[11px] text-slate-400 font-normal">지역별 100% 한국인 직영 마스터팀 배정</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    3
                  </span>
                  <div>
                    <strong className="text-white font-semibold">시공 및 현장 동행 검수</strong>
                    <p className="text-[11px] text-slate-400 font-normal">전문가용 안심 장비 시공 후 고객 직접 확인</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Interactive Form (8 Cols) - Elevated Pure White Card */}
          <div className="lg:col-span-8 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-ambient-lg">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Service Type Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  서비스 유형 선택 <span className="text-blue-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: 'home' })}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                      formData.serviceType === 'home'
                        ? 'bg-blue-700 text-white shadow-ambient-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Home className="w-4 h-4" strokeWidth={1.75} />
                    <span>홈클리닝 (입주/이사/거주)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: 'commercial' })}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                      formData.serviceType === 'commercial'
                        ? 'bg-blue-700 text-white shadow-ambient-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4" strokeWidth={1.75} />
                    <span>사업장 (사무실/상가)</span>
                  </button>
                </div>
              </div>

              {/* Space Size Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  공간 면적 / 평수
                </label>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  {SPACE_SIZES.map((size, idx) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setFormData({ ...formData, spaceSize: size })}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                        idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                      } ${
                        formData.spaceSize === size
                          ? 'bg-blue-700 text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    고객명 / 업체명 <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="홍길동"
                    required
                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white shadow-inner font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    연락처 <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="010-1234-5678"
                    required
                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white shadow-inner font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Service Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  희망 시공 일자 (선택)
                </label>
                <input
                  type="date"
                  value={formData.serviceDate}
                  onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white shadow-inner text-slate-700 font-medium"
                />
              </div>

              {/* Detailed Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  문의 내용 및 요청사항
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  placeholder="상세 위치(아파트명 또는 상가 위치), 특이사항(곰팡이, 스티커 제거, 인테리어 분진 등)을 적어주시면 더욱 정밀한 견적이 가능합니다."
                  className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white shadow-inner text-slate-900 font-normal leading-relaxed"
                />
              </div>

              {/* Validation Warning */}
              {validationError && (
                <div className="p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" strokeWidth={1.75} />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Submit Notification Toast */}
              {submitResult && (
                <div
                  className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                    submitResult.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" strokeWidth={1.75} />
                  <span>{submitResult.message}</span>
                </div>
              )}

              {/* Submit Button (1분 만에 안심 맞춤 견적 신청하기) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-base sm:text-lg shadow-ambient-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-5 h-5" strokeWidth={1.75} />
                <span>{isSubmitting ? '견적 요청 전송 중...' : '1분 만에 안심 맞춤 견적 신청하기'}</span>
              </button>

              {/* Required Guarantee Footer Note (기획서 명시) */}
              <p className="text-center text-xs text-slate-400 font-normal">
                ※ 100% A/S 보장을 위해 청소일 기준 3일 이내 계약 범위 촬영 사진이 필요합니다.
              </p>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
