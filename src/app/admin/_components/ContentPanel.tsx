'use client';

import React, { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ExternalLink, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { editorGroups, getAt, setAt, type Field, type ItemsField } from '@/config/editorSchema';
import type { ContentDraft } from './AdminApp';
import { SaveBar } from './AdminApp';
import { Button, Card, ImageInput, inputCls, Notice, PageTitle } from './ui';

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  if (field.kind === 'image') return <ImageInput value={String(value ?? '')} onChange={onChange} label={field.label} />;
  if (field.kind === 'lines') {
    const text = Array.isArray(value) ? value.join('\n') : '';
    return (
      <textarea
        className={inputCls}
        rows={Math.max(3, text.split('\n').length + 1)}
        value={text}
        onChange={(e) => onChange(e.target.value.split('\n').map((l) => l.trim()).filter(Boolean))}
      />
    );
  }
  if (field.kind === 'textarea') {
    return <textarea className={inputCls} rows={3} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} />;
  }
  return <input className={inputCls} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} />;
}

function FieldRow({ field, draft, path }: { field: Field; draft: ContentDraft; path: string }) {
  const value = getAt(draft.content, path);
  const original = getAt(draft.defaults, path);
  const changed = original !== undefined && JSON.stringify(value) !== JSON.stringify(original);
  return (
    <div className="space-y-1.5" id={`field-${path}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <label className="text-sm font-bold text-slate-900">{field.label}</label>
          {field.loc && <p className="text-[13px] leading-snug text-slate-500">{field.loc}</p>}
        </div>
        {changed && (
          <button
            type="button"
            onClick={() => draft.update(setAt(draft.content, path, structuredClone(original)))}
            className="inline-flex flex-shrink-0 cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-slate-100"
            title="이 칸만 처음 기본값으로"
          >
            <RotateCcw className="h-3.5 w-3.5" /> 기본값
          </button>
        )}
      </div>
      <FieldInput field={field} value={value} onChange={(v) => draft.update(setAt(draft.content, path, v))} />
    </div>
  );
}

function ItemsEditor({ item, draft }: { item: ItemsField; draft: ContentDraft }) {
  const list = (getAt(draft.content, item.path) as Record<string, unknown>[]) ?? [];
  const setList = (next: Record<string, unknown>[]) => draft.update(setAt(draft.content, item.path, next));
  const move = (i: number, d: number) => {
    const next = [...list];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    setList(next);
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-bold text-slate-900">{item.label}</p>
        <p className="text-[13px] text-slate-500">{item.loc}</p>
      </div>
      {list.map((_, i) => (
        <div key={i} className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-blue-700">
              {item.itemName} {i + 1}
            </span>
            {item.addable && (
              <div className="flex gap-1">
                <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-white disabled:opacity-30" aria-label="위로">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" disabled={i === list.length - 1} onClick={() => move(i, 1)} className="cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-white disabled:opacity-30" aria-label="아래로">
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => confirm(`${item.itemName} ${i + 1}을(를) 지울까요?`) && setList(list.filter((__, j) => j !== i))}
                  className="cursor-pointer rounded-lg p-2 text-rose-600 hover:bg-white"
                  aria-label="지우기"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          {item.fields.map((f) => (
            <FieldRow key={f.path} field={f} draft={draft} path={`${item.path}.${i}.${f.path}`} />
          ))}
        </div>
      ))}
      {item.addable && (
        <Button
          variant="ghost"
          type="button"
          onClick={() => setList([...list, { ...item.template, id: `${item.itemName}-${Date.now()}` }])}
        >
          <Plus className="h-4 w-4" /> {item.itemName} 추가
        </Button>
      )}
    </div>
  );
}

function matches(text: string, q: string) {
  return text.toLowerCase().includes(q.toLowerCase());
}

export default function ContentPanel({ draft }: { draft: ContentDraft }) {
  const [active, setActive] = useState(editorGroups[1].id);
  const [query, setQuery] = useState('');

  // 검색: 칸 이름·위치 설명·지금 글자에서 찾습니다
  const results = useMemo(() => {
    if (!query.trim()) return null;
    const found: { group: string; field: Field; path: string }[] = [];
    for (const g of editorGroups) {
      for (const it of g.items) {
        if (it.kind === 'items') {
          const list = (getAt(draft.content, it.path) as unknown[]) ?? [];
          list.forEach((_, i) =>
            it.fields.forEach((f) => {
              const p = `${it.path}.${i}.${f.path}`;
              if (matches(`${f.label} ${it.label} ${JSON.stringify(getAt(draft.content, p))}`, query)) {
                found.push({ group: g.title, field: { ...f, label: `${it.itemName} ${i + 1} · ${f.label}` }, path: p });
              }
            }),
          );
        } else if (matches(`${it.label} ${it.loc} ${JSON.stringify(getAt(draft.content, it.path))}`, query)) {
          found.push({ group: g.title, field: it, path: it.path });
        }
      }
    }
    return found;
  }, [query, draft.content]);

  const group = editorGroups.find((g) => g.id === active) ?? editorGroups[0];

  return (
    <div>
      <PageTitle
        title="문구 수정"
        sub="홈페이지의 모든 글자를 여기서 고칩니다. 홈페이지 위에서 아래 순서로 묶여 있고, 칸마다 📍 어디에 보이는 글자인지 적어 두었어요."
        action={
          <Button variant="ghost" onClick={draft.reset}>
            <RotateCcw className="h-4 w-4" /> 전체 기본값으로
          </Button>
        }
      />

      <input
        className={`${inputCls} mb-5`}
        placeholder="🔍 고칠 글자를 검색하세요 (예: 전화번호, 후불제, 견적)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results ? (
        <Card className="space-y-6">
          <p className="text-sm text-slate-500">&ldquo;{query}&rdquo; 검색 결과 {results.length}개</p>
          {results.map((r) => (
            <div key={r.path}>
              <p className="mb-1 text-xs font-semibold text-blue-700">{r.group}</p>
              <FieldRow field={r.field} draft={draft} path={r.path} />
            </div>
          ))}
        </Card>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[230px_1fr]">
          {/* 홈페이지 지도: 지금 고치는 위치가 노랗게 표시됩니다 */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <p className="mb-2 text-xs font-semibold text-slate-500">홈페이지 위 → 아래</p>
            <div className="flex gap-1.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {editorGroups.map((g, i) => (
                <button
                  key={g.id}
                  onClick={() => setActive(g.id)}
                  className={`flex min-h-11 flex-shrink-0 cursor-pointer items-center gap-2 rounded-xl px-3 text-left text-sm font-semibold transition-colors ${
                    g.id === active ? 'bg-amber-100 text-slate-900 ring-2 ring-amber-300' : 'bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs text-slate-400">{i + 1}</span>
                  {g.title}
                </button>
              ))}
            </div>
          </div>

          <Card className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold">{group.title}</h2>
              <a href={`/${group.anchor}`} target="_blank" className="inline-flex items-center gap-1 text-sm text-blue-700 underline">
                홈페이지에서 이 위치 보기 <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            {group.note && <Notice>{group.note}</Notice>}
            {group.items.map((it) =>
              it.kind === 'items' ? (
                <ItemsEditor key={it.path} item={it} draft={draft} />
              ) : (
                <FieldRow key={it.path} field={it} draft={draft} path={it.path} />
              ),
            )}
          </Card>
        </div>
      )}
      <SaveBar draft={draft} />
    </div>
  );
}
