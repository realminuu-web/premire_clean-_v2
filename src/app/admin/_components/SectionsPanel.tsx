'use client';

import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { SECTION_LABELS } from '@/config/editorSchema';
import type { SectionId } from '@/types';
import type { ContentDraft } from './AdminApp';
import { SaveBar } from './AdminApp';
import { Card, Notice, PageTitle, Toggle } from './ui';

export default function SectionsPanel({ draft }: { draft: ContentDraft }) {
  const { sectionOrder, visibility } = draft.content;

  const move = (i: number, d: number) => {
    const next = [...sectionOrder];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    draft.update({ ...draft.content, sectionOrder: next });
  };
  const toggle = (id: SectionId, on: boolean) => draft.update({ ...draft.content, visibility: { ...visibility, [id]: on } });

  return (
    <div>
      <PageTitle title="섹션 순서 · 숨기기" sub="홈페이지 위에서 아래 순서예요. 화살표로 순서를 바꾸고, 스위치를 끄면 그 섹션이 숨겨지고 아래 섹션이 올라옵니다." />
      <div className="mb-4">
        <Notice>맨 위 메뉴 줄과 맨 아래 회사 정보는 항상 보여요. 첫 화면은 맨 위에 두는 걸 추천해요.</Notice>
      </div>
      <Card className="divide-y divide-slate-100 p-0 sm:p-0">
        {sectionOrder.map((id, i) => {
          const on = visibility[id] !== false;
          return (
            <div key={id} className={`flex items-center gap-3 px-4 py-3 sm:px-5 ${on ? '' : 'bg-slate-50'}`}>
              <span className="w-6 text-sm font-bold text-slate-400">{i + 1}</span>
              <span className={`flex-1 text-[15px] font-semibold ${on ? 'text-slate-900' : 'text-slate-400 line-through'}`}>
                {SECTION_LABELS[id] ?? id}
              </span>
              <span className={`text-xs font-semibold ${on ? 'text-blue-700' : 'text-slate-400'}`}>{on ? '보임' : '숨김'}</span>
              <Toggle on={on} onChange={(v) => toggle(id, v)} label={`${SECTION_LABELS[id]} 보이기`} />
              <div className="flex">
                <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="cursor-pointer rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30" aria-label="위로">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" disabled={i === sectionOrder.length - 1} onClick={() => move(i, 1)} className="cursor-pointer rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30" aria-label="아래로">
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </Card>
      <SaveBar draft={draft} />
    </div>
  );
}
