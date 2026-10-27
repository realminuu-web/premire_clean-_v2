'use client';

import React, { useState } from 'react';
import { Send, Phone, Clock, ShieldAlert, CheckCircle2, Home, Building2, AlertCircle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import confetti from 'canvas-confetti';
import { sendInquiryEmail } from '@/lib/emailjs';
import { InquiryFormData } from '@/types';
import { useContent } from '@/components/ContentProvider';
import { track } from '@/lib/track';

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
  const { contact, contactSection: t } = useContent();
  const SPACE_SIZES = t.sizes;
  const defaultSize = SPACE_SIZES[2] ?? SPACE_SIZES[0] ?? '';
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    serviceType: 'home',
    spaceSize: defaultSize,
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
      setValidationError(t.errorName);
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      setValidationError(t.errorPhone);
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await sendInquiryEmail(formData);
      setSubmitResult(res);
      // 통계: 견적 신청 1건 (이름·전화번호는 보내지 않고 서비스 종류만)
      track('submit_quote', formData.serviceType);

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
          spaceSize: defaultSize,
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
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-blue-50 text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-5 sm:px-6 lg:px-8 2xl:px-12 relative z-10">
        <SectionHeading title1={t.title1} title2={t.title2} description={contact.formSubtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left Contact Info & Brand Trust (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-blue-700 rounded-3xl p-7 text-white shadow-ambient-md space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-wider text-blue-100">
                  {t.centerLabel}
                </span>
                <h3 className="text-2xl font-bold tracking-tight">{t.phoneTitle}</h3>
                <a
                  href={contact.phoneTel}
                  data-track="click_phone"
                  className="inline-block text-3xl sm:text-4xl font-bold text-white tracking-tight hover:text-blue-100 transition-colors"
                >
                  {contact.phone}
                </a>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/20 text-xs text-blue-50 font-normal">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-blue-200 flex-shrink-0" strokeWidth={1.75} />
                  <span>{t.hoursPrefix} {contact.operatingHours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-200 flex-shrink-0" strokeWidth={1.75} />
                  <span>{t.smsNote}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-blue-200 flex-shrink-0" strokeWidth={1.75} />
                  <span>{t.asNote}</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Process Card */}
            <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-ambient-sm space-y-4">
              <h4 className="font-bold text-sm text-slate-900">
                {t.stepsTitle}
              </h4>
              <div className="space-y-3 text-xs text-slate-600">
                {t.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                      {i + 1}
                    </span>
                    <div>
                      <strong className="text-slate-900 font-semibold">{step.title}</strong>
                      <p className="text-[11px] text-slate-500 font-normal">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Interactive Form (8 Cols) - Elevated Pure White Card */}
          <div className="lg:col-span-8 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 border border-blue-100 shadow-ambient-lg">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Service Type Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  {t.typeLabel} <span className="text-blue-600">*</span>
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
                    <span>{t.typeHome}</span>
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
                    <span>{t.typeCommercial}</span>
                  </button>
                </div>
              </div>

              {/* Space Size Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  {t.sizeLabel}
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
                    {t.nameLabel} <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                    required
                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white shadow-inner font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.phoneLabel} <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder={t.phonePlaceholder}
                    required
                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white shadow-inner font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Service Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.dateLabel}
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
                  {t.messageLabel}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  placeholder={t.messagePlaceholder}
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
                <span>{isSubmitting ? t.submitting : t.submit}</span>
              </button>

              {/* Required Guarantee Footer Note (기획서 명시) */}
              <p className="text-center text-xs text-slate-400 font-normal">
                {t.footnote}
              </p>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
