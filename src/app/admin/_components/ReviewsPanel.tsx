'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import type { StoredReview } from '@/types';
import { api } from './api';
import { Button, Card, ImageInput, inputCls, Notice, PageTitle, Toggle } from './ui';

type Form = Pick<StoredReview, 'author' | 'location' | 'serviceType' | 'content' | 'beforeImage' | 'afterImage' | 'rating' | 'date' | 'published'>;

const EMPTY: Form = {
  author: '',
  location: '',
  serviceType: '',
  content: '',
  beforeImage: '',
  afterImage: '',
  rating: 5,
  date: '',
  published: true,
};

const SERVICE_SUGGESTIONS = ['신축 입주청소', '이사 청소', '거주 청소', '사무실 정기청소', '상가·매장 청소', '건물 청소', '준공 청소'];

function ReviewForm({ initial, onCancel, onSaved }: { initial: Form & { id?: string }; onCancel: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Form>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      if (initial.id) await api(`/api/admin/reviews/${initial.id}`, { method: 'PUT', json: form });
      else await api('/api/admin/reviews', { method: 'POST', json: form });
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장하지 못했습니다.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="mb-5">
      <form onSubmit={submit} className="space-y-5">
        <h2 className="text-lg font-bold">{initial.id ? '후기 고치기' : '새 후기 올리기'}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-sm font-bold">청소 후 사진</p>
            <p className="mb-2 text-[13px] text-slate-500">📍 홈페이지 후기 칸에 크게 보이는 사진</p>
            <ImageInput value={form.afterImage} onChange={(v) => set('afterImage', v)} label="청소 후 사진" />
          </div>
          <div>
            <p className="mb-1.5 text-sm font-bold">청소 전 사진 (선택)</p>
            <p className="mb-2 text-[13px] text-slate-500">📍 청소 후 사진이 없을 때 대신 보여요</p>
            <ImageInput value={form.beforeImage} onChange={(v) => set('beforeImage', v)} label="청소 전 사진" />
          </div>
        </div>
        <label className="block">
          <span className="text-sm font-bold">후기 내용</span>
          <span className="block text-[13px] text-slate-500">📍 후기 칸 가운데 큰 따옴표 글. 손님이 한 말 그대로 적어 주세요</span>
          <textarea className={`${inputCls} mt-1.5`} rows={4} value={form.content} onChange={(e) => set('content', e.target.value)} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold">고객 이름 (가려서)</span>
            <span className="block text-[13px] text-slate-500">📍 예: 김*현 고객님, 이*진 대표님</span>
            <input className={`${inputCls} mt-1.5`} value={form.author} onChange={(e) => set('author', e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm font-bold">지역 · 평수</span>
            <span className="block text-[13px] text-slate-500">📍 예: 서울 송파구 (32평)</span>
            <input className={`${inputCls} mt-1.5`} value={form.location} onChange={(e) => set('location', e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm font-bold">서비스</span>
            <span className="block text-[13px] text-slate-500">📍 별 옆과 사진 아래에 보여요</span>
            <input className={`${inputCls} mt-1.5`} list="service-suggestions" value={form.serviceType} onChange={(e) => set('serviceType', e.target.value)} />
            <datalist id="service-suggestions">
              {SERVICE_SUGGESTIONS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </label>
          <label className="block">
            <span className="text-sm font-bold">작업 날짜 (선택)</span>
            <span className="block text-[13px] text-slate-500">📍 비워 두면 오늘 날짜로 들어가요. 예: 2026.10.12</span>
            <input className={`${inputCls} mt-1.5`} value={form.date} onChange={(e) => set('date', e.target.value)} />
          </label>
          <label className="block">
            <span className="text-sm font-bold">별점</span>
            <select className={`${inputCls} mt-1.5`} value={form.rating} onChange={(e) => set('rating', Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {'★'.repeat(n)} ({n}점)
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-3 pt-6">
            <Toggle on={form.published} onChange={(v) => set('published', v)} label="홈페이지에 보이기" />
            <span className="text-sm font-semibold">{form.published ? '홈페이지에 보이기' : '숨겨 두기'}</span>
          </div>
        </div>
        {error && <Notice tone="error">{error}</Notice>}
        <div className="flex gap-2">
          <Button type="submit" disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} 저장하기
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel}>
            취소
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default function ReviewsPanel() {
  const [reviews, setReviews] = useState<StoredReview[] | null>(null);
  const [editing, setEditing] = useState<(Form & { id?: string }) | null>(null);
  const [error, setError] = useState('');

  const load = () =>
    api<{ reviews: StoredReview[] }>('/api/admin/reviews')
      .then((d) => setReviews(d.reviews))
      .catch((e) => setError(e.message));

  useEffect(() => {
    load();
  }, []);

  const togglePublished = async (r: StoredReview) => {
    await api(`/api/admin/reviews/${r.id}`, { method: 'PUT', json: { published: !r.published } }).catch((e) => setError(e.message));
    load();
  };
  const remove = async (r: StoredReview) => {
    if (!confirm(`"${r.content.slice(0, 20)}…" 후기를 지울까요? 지우면 되돌릴 수 없어요.`)) return;
    await api(`/api/admin/reviews/${r.id}`, { method: 'DELETE' }).catch((e) => setError(e.message));
    load();
  };

  return (
    <div>
      <PageTitle
        title="시공 후기"
        sub="여기서 올린 후기가 홈페이지 '실제 고객 시공 후기' 칸에 사진과 함께 바로 나옵니다. 최신 후기가 맨 앞이에요."
        action={
          !editing && (
            <Button onClick={() => setEditing({ ...EMPTY })}>
              <Plus className="h-4 w-4" /> 후기 올리기
            </Button>
          )
        }
      />
      {error && (
        <div className="mb-4">
          <Notice tone="error">{error}</Notice>
        </div>
      )}
      {editing && (
        <ReviewForm
          key={editing.id ?? 'new'}
          initial={editing}
          onCancel={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
      {reviews === null ? (
        <Loader2 className="h-6 w-6 animate-spin text-blue-700" />
      ) : reviews.length === 0 ? (
        <Notice>
          아직 올린 후기가 없어요. 지금 홈페이지에는 <b>예시 후기 4개</b>가 보이고 있어요. 첫 후기를 올리면 예시 후기 대신 올린 후기만 보입니다.
        </Notice>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <Card key={r.id} className={`flex flex-col gap-4 sm:flex-row sm:items-center ${r.published ? '' : 'opacity-60'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.afterImage || r.beforeImage || '/next.svg'}
                alt=""
                className="h-24 w-full flex-shrink-0 rounded-xl bg-slate-100 object-cover sm:h-20 sm:w-28"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-[15px] leading-snug text-slate-800">“{r.content}”</p>
                <p className="mt-1 text-sm text-slate-500">
                  {r.author} · {r.location} · {r.serviceType} · {r.date}
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <Toggle on={r.published} onChange={() => togglePublished(r)} label="홈페이지에 보이기" />
                <span className="w-9 text-xs font-semibold text-slate-500">{r.published ? '보임' : '숨김'}</span>
                <button onClick={() => setEditing({ ...r })} className="cursor-pointer rounded-lg p-2.5 text-slate-600 hover:bg-slate-100" aria-label="고치기">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => remove(r)} className="cursor-pointer rounded-lg p-2.5 text-rose-600 hover:bg-rose-50" aria-label="지우기">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
