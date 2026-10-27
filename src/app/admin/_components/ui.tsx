'use client';

import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import { uploadImage } from './api';

export const inputCls =
  'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 shadow-inner focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white p-5 shadow-ambient-sm sm:p-6 ${className}`}>{children}</div>;
}

export function PageTitle({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.03em] text-slate-900">{title}</h1>
        {sub && <p className="mt-1 text-sm leading-relaxed text-slate-500">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'danger' }) {
  const look = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800',
    ghost: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
    danger: 'border border-rose-200 bg-white text-rose-700 hover:bg-rose-50',
  }[variant];
  return (
    <button
      {...props}
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${look} ${className}`}
    >
      {children}
    </button>
  );
}

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors ${
        on ? 'bg-blue-700' : 'bg-slate-300'
      }`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

/** 사진 고르기 → 자동으로 줄여서 올리고 주소를 돌려줍니다. */
export function ImageInput({ value, onChange, label }: { value: string; onChange: (url: string) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const pick = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      onChange(await uploadImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : '사진을 올리지 못했습니다.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="relative flex h-24 w-32 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 hover:border-blue-400"
          aria-label={`${label} 고르기`}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <ImagePlus className="h-6 w-6" />
          )}
          {busy && (
            <span className="absolute inset-0 flex items-center justify-center bg-white/70">
              <Loader2 className="h-5 w-5 animate-spin text-blue-700" />
            </span>
          )}
        </button>
        <div className="text-sm text-slate-500">
          <button type="button" onClick={() => ref.current?.click()} className="cursor-pointer font-semibold text-blue-700 underline">
            {value ? '사진 바꾸기' : '사진 고르기'}
          </button>
          <p className="mt-1 text-xs">휴대폰 사진 그대로 올려도 자동으로 줄여서 저장해요.</p>
          {value && (
            <button type="button" onClick={() => onChange('')} className="mt-1 cursor-pointer text-xs text-slate-400 underline">
              사진 빼기
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-rose-700">{error}</p>}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
    </div>
  );
}

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'warn' | 'ok' | 'error'; children: React.ReactNode }) {
  const look = {
    info: 'bg-blue-50 text-blue-900 border-blue-100',
    warn: 'bg-amber-50 text-amber-900 border-amber-200',
    ok: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    error: 'bg-rose-50 text-rose-900 border-rose-200',
  }[tone];
  return <div className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${look}`}>{children}</div>;
}
