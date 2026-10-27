'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { getAt, setAt, type Field } from '@/config/editorSchema';
import { allKeywords } from '@/lib/seo';
import type { ContentDraft } from './AdminApp';
import { SaveBar } from './AdminApp';
import { Card, ImageInput, inputCls, PageTitle } from './ui';

const FIELDS: Field[] = [
  { path: 'seo.title', label: '검색 제목', loc: '📍 네이버·구글 검색 결과의 파란 제목, 카톡으로 링크를 보낼 때 제목. 40자 안쪽이 좋아요' },
  {
    path: 'seo.description',
    label: '검색 설명',
    loc: '📍 검색 결과 제목 아래 회색 두 줄. 80자 안쪽, "어디서 · 무엇을 · 어떻게"가 들어가면 좋아요',
    kind: 'textarea',
  },
  {
    path: 'seo.aiSummary',
    label: 'AI 검색용 회사 소개',
    loc: '📍 화면에는 안 보이고 ChatGPT·Perplexity 같은 AI가 읽는 소개. 꾸밈말보다 사실만 분명하게 쓰면 인용되기 좋아요',
    kind: 'textarea',
  },
  { path: 'seo.siteUrl', label: '홈페이지 주소', loc: '📍 도메인을 사면 여기에 적으세요 (예: https://premierclean.co.kr)' },
  { path: 'seo.naverVerification', label: '네이버 서치어드바이저 인증키', loc: '📍 네이버 서치어드바이저 > 사이트 등록 > HTML 태그 방식의 content="…" 안 글자' },
  { path: 'seo.googleVerification', label: '구글 서치콘솔 인증키', loc: '📍 구글 서치콘솔 > 속성 추가 > HTML 태그 방식의 content="…" 안 글자' },
  { path: 'company.addressRegion', label: '주소 시·도 (검색엔진용)', loc: '📍 화면에는 안 보임. 예: 서울특별시' },
  { path: 'company.addressLocality', label: '주소 구·시 (검색엔진용)', loc: '📍 화면에는 안 보임. 예: 강남구' },
];

function TagEditor({ label, loc, values, onChange }: { label: string; loc: string; values: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState('');
  const add = () => {
    const parts = input.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length) onChange([...new Set([...values, ...parts])]);
    setInput('');
  };
  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-bold">{label}</p>
        <p className="text-[13px] text-slate-500">{loc}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {values.map((v) => (
          <span key={v} className="inline-flex items-center gap-1 rounded-full bg-blue-50 py-1 pl-3 pr-1.5 text-sm font-semibold text-blue-700">
            {v}
            <button type="button" onClick={() => onChange(values.filter((x) => x !== v))} className="cursor-pointer rounded-full p-0.5 hover:bg-blue-100" aria-label={`${v} 지우기`}>
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className={inputCls}
          placeholder="추가할 태그 (쉼표로 여러 개)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
        />
        <button type="button" onClick={add} className="min-h-11 flex-shrink-0 cursor-pointer rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white">
          추가
        </button>
      </div>
    </div>
  );
}

export default function SeoPanel({ draft }: { draft: ContentDraft }) {
  const c = draft.content;
  const set = (path: string, v: unknown) => draft.update(setAt(c, path, v));
  const combos = allKeywords(c).length - c.seo.keywords.length;

  return (
    <div>
      <PageTitle
        title="검색 노출"
        sub="네이버·구글 검색과 ChatGPT·Perplexity 같은 AI 검색에 잘 나오도록 하는 설정이에요."
      />

      <Card className="mb-5">
        <p className="mb-3 text-xs font-semibold text-slate-500">검색 결과 미리보기</p>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500">{c.seo.siteUrl.replace(/^https?:\/\//, '')}</p>
          <p className="mt-1 text-lg font-medium text-[#1a0dab]">{c.seo.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{c.seo.description}</p>
        </div>
      </Card>

      <Card className="mb-5 space-y-6">
        {FIELDS.map((f) => (
          <div key={f.path} className="space-y-1.5">
            <label className="text-sm font-bold">{f.label}</label>
            <p className="text-[13px] text-slate-500">{f.loc}</p>
            {f.kind === 'textarea' ? (
              <textarea className={inputCls} rows={4} value={String(getAt(c, f.path) ?? '')} onChange={(e) => set(f.path, e.target.value)} />
            ) : (
              <input className={inputCls} value={String(getAt(c, f.path) ?? '')} onChange={(e) => set(f.path, e.target.value)} />
            )}
          </div>
        ))}
        <div className="space-y-1.5">
          <label className="text-sm font-bold">카톡 공유 썸네일 사진</label>
          <p className="text-[13px] text-slate-500">📍 카톡·문자로 홈페이지 링크를 보낼 때 보이는 사진. 비워 두면 자동으로 만든 썸네일을 써요 (가로 1200 × 세로 630 권장)</p>
          <ImageInput value={c.seo.ogImage} onChange={(v) => set('seo.ogImage', v)} label="썸네일" />
        </div>
      </Card>

      <Card className="mb-5 space-y-8">
        <TagEditor
          label="검색 태그 (키워드)"
          loc="📍 화면에는 안 보이고 검색엔진에 알려 주는 단어. 손님이 실제로 검색할 말로 적어요"
          values={c.seo.keywords}
          onChange={(v) => set('seo.keywords', v)}
        />
        <TagEditor
          label="서비스 지역"
          loc="📍 어디서 일하는지 검색엔진·AI에 알려 줍니다. '서울 강남구'처럼 적어요"
          values={c.seo.areas}
          onChange={(v) => set('seo.areas', v)}
        />
        <TagEditor
          label="지역 조합에 쓸 서비스"
          loc={`📍 서비스 지역과 합쳐 "강남구 입주청소" 같은 태그를 자동으로 만들어요. 지금 자동 태그 ${combos}개`}
          values={c.seo.areaKeywordServices}
          onChange={(v) => set('seo.areaKeywordServices', v)}
        />
      </Card>

      <Card>
        <p className="mb-2 text-sm font-bold">자동으로 해 두는 것</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
          <li>업체 정보(상호·전화·주소·영업시간·서비스 지역·서비스 종류)를 검색엔진과 AI가 읽는 형식으로 넣어요.</li>
          <li>자주 묻는 질문을 검색 결과와 AI 답변에 인용되기 좋은 형식으로 넣어요.</li>
          <li>ChatGPT·Claude·Perplexity·구글·네이버(Yeti)·다음 검색 로봇이 홈페이지를 읽을 수 있게 허용해요. 관리자 페이지는 막아요.</li>
          <li>
            AI용 요약 파일 <a href="/llms.txt" target="_blank" className="text-blue-700 underline">/llms.txt</a> 를 자동으로 만들어요.
          </li>
          <li>
            사이트 지도 <a href="/sitemap.xml" target="_blank" className="text-blue-700 underline">/sitemap.xml</a> 과 로봇 안내{' '}
            <a href="/robots.txt" target="_blank" className="text-blue-700 underline">/robots.txt</a> 도 자동이에요.
          </li>
        </ul>
      </Card>
      <SaveBar draft={draft} />
    </div>
  );
}
