'use client';

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { api } from './api';
import { Card, Notice, PageTitle } from './ui';

type Stats = {
  days: number;
  totals: { views: number; quotes: number; quoteRate: number; phoneClicks: number; kakaoClicks: number; quoteClicks: number };
  daily: { day: string; views: number; quotes: number }[];
  sections: { name: string; count: number }[];
  quoteTypes: { name: string; count: number }[];
};

const RANGES = [
  { days: 1, label: '오늘' },
  { days: 7, label: '최근 7일' },
  { days: 30, label: '최근 30일' },
  { days: 90, label: '최근 90일' },
];

/** 날짜별 방문자(진한 파랑)·견적 신청(연한 파랑) 막대 */
function DailyChart({ daily }: { daily: Stats['daily'] }) {
  const max = Math.max(1, ...daily.map((d) => d.views));
  return (
    <div>
      <div className="flex h-44 items-end gap-[3px]" role="img" aria-label="날짜별 방문자와 견적 신청 막대그래프">
        {daily.map((d) => (
          <div key={d.day} className="group relative flex h-full flex-1 flex-col justify-end" title={`${d.day} 방문 ${d.views} · 견적 ${d.quotes}`}>
            <div className="w-full rounded-t-[3px] bg-blue-700" style={{ height: `${(d.views / max) * 100}%`, minHeight: d.views ? 2 : 0 }} />
            <div className="absolute bottom-0 w-full rounded-t-[3px] bg-sky-300" style={{ height: `${(d.quotes / max) * 100}%`, minHeight: d.quotes ? 3 : 0 }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>{daily[0]?.day.slice(5)}</span>
        <span>{daily[daily.length - 1]?.day.slice(5)}</span>
      </div>
      <div className="mt-2 flex gap-4 text-xs text-slate-600">
        <span className="inline-flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-sm bg-blue-700" /> 방문자</span>
        <span className="inline-flex items-center gap-1.5"><i className="inline-block h-2.5 w-2.5 rounded-sm bg-sky-300" /> 견적 신청</span>
      </div>
    </div>
  );
}

function Bars({ rows, unit }: { rows: { name: string; count: number }[]; unit: string }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  if (rows.length === 0) return <p className="text-sm text-slate-400">아직 기록이 없어요.</p>;
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.name} className="grid grid-cols-[96px_1fr_52px] items-center gap-3 text-sm">
          <span className="truncate text-slate-700">{r.name}</span>
          <span className="h-2.5 rounded-full bg-slate-100">
            <span className="block h-full rounded-full bg-blue-700" style={{ width: `${(r.count / max) * 100}%` }} />
          </span>
          <span className="text-right font-semibold text-slate-700">
            {r.count.toLocaleString()}
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function StatsPanel() {
  const [days, setDays] = useState(30);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Stats>(`/api/admin/stats?days=${days}`)
      .then(setStats)
      .catch((e) => setError(e.message));
  }, [days]);

  const kpis = stats
    ? [
        { label: '방문자', value: `${stats.totals.views.toLocaleString()}명`, note: '같은 사람이 한 번 들어온 건 1명으로 셉니다' },
        { label: '견적 신청', value: `${stats.totals.quotes.toLocaleString()}건`, note: `방문자의 ${stats.totals.quoteRate}%` },
        { label: '전화 버튼 누름', value: `${stats.totals.phoneClicks.toLocaleString()}번`, note: '휴대폰에서 누르면 바로 전화가 걸려요' },
        { label: '카톡 버튼 누름', value: `${stats.totals.kakaoClicks.toLocaleString()}번`, note: `견적 버튼 누름 ${stats.totals.quoteClicks.toLocaleString()}번` },
      ]
    : [];

  return (
    <div>
      <PageTitle
        title="통계"
        sub="홈페이지가 직접 세는 숫자예요. 이름·전화번호 같은 개인 정보는 기록하지 않아요."
        action={
          <div className="flex gap-1 rounded-xl bg-white p-1 shadow-ambient-sm">
            {RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setDays(r.days)}
                className={`min-h-10 cursor-pointer rounded-lg px-3 text-sm font-semibold ${days === r.days ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        }
      />
      {error && <Notice tone="error">{error}</Notice>}
      {!stats || stats.days !== days ? (
        <Loader2 className="h-6 w-6 animate-spin text-blue-700" />
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {kpis.map((k) => (
              <Card key={k.label} className="p-4 sm:p-5">
                <p className="text-sm font-semibold text-slate-500">{k.label}</p>
                <p className="mt-1.5 text-2xl font-extrabold tracking-[-0.03em] sm:text-[28px]">{k.value}</p>
                <p className="mt-1 text-xs text-slate-500">{k.note}</p>
              </Card>
            ))}
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <Card>
              <p className="mb-4 text-sm font-bold">날짜별 방문자 · 견적 신청</p>
              <DailyChart daily={stats.daily} />
            </Card>
            <div className="space-y-5">
              <Card>
                <p className="mb-4 text-sm font-bold">많이 본 섹션</p>
                <Bars rows={stats.sections} unit="명" />
              </Card>
              <Card>
                <p className="mb-4 text-sm font-bold">서비스별 견적 신청</p>
                <Bars rows={stats.quoteTypes} unit="건" />
              </Card>
            </div>
          </div>
          {stats.totals.views === 0 && (
            <Notice>아직 쌓인 기록이 없어요. 홈페이지에 손님이 들어오면 여기에 숫자가 쌓이기 시작합니다.</Notice>
          )}
        </div>
      )}
    </div>
  );
}
