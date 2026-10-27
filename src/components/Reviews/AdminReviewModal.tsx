'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, CheckCircle, Upload, Star, AlertCircle, Camera, Sparkles } from 'lucide-react';
import { verifyAdminPassword, createReview } from '@/lib/supabase';
import { ReviewItem } from '@/types';

interface AdminReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewCreated: (review: ReviewItem) => void;
}

export default function AdminReviewModal({
  isOpen,
  onClose,
  onReviewCreated,
}: AdminReviewModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Form State
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState('신축 입주청소');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [beforeImage, setBeforeImage] = useState(
    'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80'
  );
  const [afterImage, setAfterImage] = useState(
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isResizing, setIsResizing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 💡 [HTML5 Canvas 자동 리사이징 & 압축 함수]
  // 5~10MB 고화질 사진도 모바일 및 웹에 최적화된 800px / 0.82 JPEG (~70KB)로 자동 압축하여 저장합니다!
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'after' | 'before') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsResizing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          if (target === 'after') {
            setAfterImage(compressedDataUrl);
          } else {
            setBeforeImage(compressedDataUrl);
          }
        }
        setIsResizing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPassword(password)) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('비밀번호가 일치하지 않습니다. (기본값: 0000)');
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) {
      alert('고객명과 후기 내용을 모두 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const saved = await createReview({
        author,
        location: location || '서울 경기권',
        serviceType,
        rating,
        content,
        beforeImage,
        afterImage,
      });

      setSuccessMessage('후기가 성공적으로 등록되었습니다! 메인 슬라이드에 즉시 반영됩니다.');
      onReviewCreated(saved);

      setTimeout(() => {
        setSuccessMessage('');
        setIsAuthenticated(false);
        setPassword('');
        setAuthor('');
        setLocation('');
        setContent('');
        onClose();
      }, 1400);
    } catch (err) {
      console.error(err);
      alert('후기 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-ambient-lg border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" strokeWidth={1.75} />
            <span className="font-semibold text-sm">관리자 후기 등록 (Light Admin)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {!isAuthenticated ? (
            /* Step 1: Password Verification */
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="text-center space-y-2 py-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 mx-auto flex items-center justify-center shadow-inner">
                  <Lock className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  관리자 비밀번호를 입력해 주세요
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  기본 비밀번호는 <code className="bg-slate-100 text-blue-600 px-1.5 py-0.5 rounded font-mono font-semibold">0000</code> 입니다. (site.ts에서 변경 가능)
                </p>
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 4자리 입력"
                  maxLength={10}
                  className="w-full text-center tracking-widest text-lg font-bold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  autoFocus
                />
                {passwordError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-500 mt-2 justify-center font-medium">
                    <AlertCircle className="w-4 h-4" strokeWidth={1.75} />
                    <span>{passwordError}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-ambient-sm transition-all active:scale-95 cursor-pointer"
              >
                비밀번호 확인
              </button>
            </form>
          ) : (
            /* Step 2: Review Upload Form */
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {successMessage ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{successMessage}</h4>
                  <p className="text-xs text-slate-500 font-normal">메인 화면 슬라이드에 최신 1순위로 즉시 노출됩니다.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
                      <span>인증 완료: 최신 10건 슬라이드 자동 반영</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">DB 영구 저장</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">고객명</label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="예: 송*호 고객님"
                        required
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">시공 장소 및 평수</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="예: 서울 송파구 34평"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">서비스 유형</label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                      >
                        <option value="신축 입주청소">신축 입주청소</option>
                        <option value="구축 이사청소">구축 이사청소</option>
                        <option value="거주 딥클리닝">거주 딥클리닝</option>
                        <option value="사업장/사무실 정기">사업장/사무실 정기</option>
                        <option value="상가 오픈 청소">상가 오픈 청소</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">만족도 평점</label>
                      <div className="flex items-center gap-1 pt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setRating(s)}
                            className="p-1 focus:outline-none cursor-pointer"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                s <= rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }`}
                              strokeWidth={1.75}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 📸 1. 시공 후 현장 사진 (After) - 파일 업로드 & 자동 리사이징 */}
                  <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-800">
                        📸 시공 후 현장 사진 (After - 모바일/PC 노출)
                      </label>
                      {isResizing && (
                        <span className="text-[10px] text-blue-700 font-semibold animate-pulse">
                          자동 리사이징 압축 중...
                        </span>
                      )}
                    </div>

                    {/* Preview Thumbnail */}
                    {afterImage && (
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-300 flex-shrink-0 bg-slate-200">
                          <img
                            src={afterImage}
                            alt="시공 후 미리보기"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-[11px] text-slate-500">
                          <span className="text-emerald-700 font-semibold block">✓ 사진 준비 완료 (모바일 최적화)</span>
                          <span className="text-slate-400">대용량 사진도 800px로 자동 리사이징됩니다.</span>
                        </div>
                      </div>
                    )}

                    {/* File Upload Button */}
                    <div className="flex items-center gap-2">
                      <label className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold cursor-pointer transition-all active:scale-95 shadow-sm">
                        <Camera className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>사진 파일 선택 (또는 촬영)</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'after')}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Direct URL Fallback */}
                    <input
                      type="text"
                      value={afterImage}
                      onChange={(e) => setAfterImage(e.target.value)}
                      placeholder="또는 이미지 인터넷 주소(URL) 직접 입력"
                      className="w-full text-[11px] px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">고객 후기 내용</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={3}
                      placeholder="청소 완료 후 고객님의 만족도 및 주요 시공 내용..."
                      required
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || isResizing}
                      className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white font-semibold text-sm shadow-ambient-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" strokeWidth={1.75} />
                      <span>{isSubmitting ? '업로드 등록 중...' : '작업 후기 등록하기'}</span>
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
