'use client';

import React from 'react';
import { Heart, MessageCircle, BadgeCheck, ExternalLink } from 'lucide-react';
import { useContent } from '@/components/ContentProvider';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramFeed() {
  const siteConfig = useContent();
  const maxPosts = siteConfig.instagram?.instagramMaxPosts || 1;
  const allPosts = siteConfig.instagram?.posts || [];
  const visiblePosts = allPosts.slice(0, Math.min(Math.max(maxPosts, 1), 6));

  const isSinglePost = visiblePosts.length === 1;
  const singlePost = visiblePosts[0] || allPosts[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 2xl:p-10 shadow-ambient-sm space-y-6">
      
      {/* Instagram Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <div className="w-full h-full rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-base sm:text-lg">
                PC
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-base sm:text-lg text-slate-900">
                {siteConfig.contact.instagramHandle}
              </h4>
              <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-600 text-white" strokeWidth={1.75} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">
              {siteConfig.brand.name} 공식 계정 · 생생한 시공 비포&애프터 현장 스토리
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-600 mt-1 font-medium">
              <span>게시물 <strong className="text-slate-900 font-semibold">1,240</strong></span>
              <span>팔로워 <strong className="text-slate-900 font-semibold">18.5K</strong></span>
              <span>팔로잉 <strong className="text-slate-900 font-semibold">42</strong></span>
            </div>
          </div>
        </div>

        <a
          href={siteConfig.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 hover:opacity-95 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-ambient-sm transition-all cursor-pointer active:scale-95"
        >
          <InstagramIcon className="w-4 h-4" />
          <span>인스타그램 바로가기</span>
          <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
        </a>

      </div>

      {/* 🖼️ CASE 1: 1개 메인 화보형 강조 뷰 (기본 추천 설정) */}
      {isSinglePost && singlePost && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/80">
          <a
            href={singlePost.postUrl || siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden shadow-sm group block cursor-pointer"
          >
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${singlePost.image}')` }}
            />
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <span>최신 현장 하이라이트</span>
              <ExternalLink className="w-3 h-3 text-slate-300" strokeWidth={1.75} />
            </div>
          </a>

          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1 text-rose-500">
                <Heart className="w-4 h-4 fill-rose-500" strokeWidth={1.75} />
                좋아요 {singlePost.likes}개
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                댓글 {singlePost.comments}개
              </span>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-normal break-keep">
              &ldquo;{singlePost.caption}&rdquo;
            </p>

            <div className="pt-2">
              <a
                href={singlePost.postUrl || siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
              >
                <span>인스타그램에서 이 게시물 바로보기</span>
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 🖼️ CASE 2: 2개~6개 멀티 그리드 뷰 (siteConfig에서 숫자 2~6 설정 시 자동 작동) */}
      {!isSinglePost && (
        <div
          className={`grid gap-3 sm:gap-4 ${
            visiblePosts.length === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : visiblePosts.length === 3
              ? 'grid-cols-1 sm:grid-cols-3'
              : visiblePosts.length === 4
              ? 'grid-cols-2 sm:grid-cols-4'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
          }`}
        >
          {visiblePosts.map((post) => (
            <a
              key={post.id}
              href={post.postUrl || siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-inner cursor-pointer block border border-slate-200/60"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url('${post.image}')` }}
              />

              {/* Hover Dark Overlay with stats and caption snippet */}
              <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 text-white">
                <div className="flex items-center justify-center gap-3 h-full">
                  <div className="flex items-center gap-1 text-xs font-semibold">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" strokeWidth={1.75} />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold">
                    <MessageCircle className="w-4 h-4 fill-white text-white" strokeWidth={1.75} />
                    <span>{post.comments}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-200 line-clamp-2 leading-tight">
                    {post.caption}
                  </p>
                  <p className="text-[9px] text-blue-300 font-medium flex items-center gap-1">
                    <span>인스타그램에서 보기</span>
                    <ExternalLink className="w-2.5 h-2.5" strokeWidth={1.75} />
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Bottom Subtitle / Tag */}
      <div className="text-center pt-2">
        <p className="text-[11px] text-slate-400 font-normal">
          #프리미어클린 #입주청소 #이사청소 #사무실청소 #청소의기준 태그로 고객님들의 실시간 후기를 확인해 보세요.
        </p>
      </div>

    </div>
  );
}
