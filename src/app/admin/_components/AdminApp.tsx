'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart3, ExternalLink, LayoutList, Loader2, LogOut, MessageSquareQuote, Search, Type } from 'lucide-react';
import type { SiteContent } from '@/config/site';
import { api } from './api';
import { Button, inputCls, Notice } from './ui';
import ReviewsPanel from './ReviewsPanel';
import StatsPanel from './StatsPanel';
import ContentPanel from './ContentPanel';
import SeoPanel from './SeoPanel';
import SectionsPanel from './SectionsPanel';

type Session = { loggedIn: boolean; passwordConfigured: boolean; storage: 'supabase' | 'local'; devPassword: boolean };
type Tab = 'reviews' | 'stats' | 'content' | 'seo' | 'sections';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'reviews', label: '시공 후기', icon: MessageSquareQuote },
  { id: 'stats', label: '통계', icon: BarChart3 },
  { id: 'content', label: '문구 수정', icon: Type },
  { id: 'seo', label: '검색 노출', icon: Search },
  { id: 'sections', label: '섹션 순서·숨기기', icon: LayoutList },
];

export type ContentDraft = {
  content: SiteContent;
  defaults: SiteContent;
  update: (next: SiteContent) => void;
  save: () => Promise<void>;
  reset: () => Promise<void>;
  dirty: boolean;
  saving: boolean;
  message: { tone: 'ok' | 'error'; text: string } | null;
};

function Login({ session, onDone }: { session: Session; onDone: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('/api/admin/session', { method: 'POST', json: { password } });
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인하지 못했습니다.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-3xl bg-white p-8 shadow-ambient-lg">
        <div>
          <p className="text-sm font-semibold text-blue-700">PREMIER CLEAN</p>
          <h1 className="mt-1 text-2xl font-bold tracking-[-0.03em]">관리자 로그인</h1>
        </div>
        {!session.passwordConfigured && (
          <Notice tone="warn">관리자 비밀번호가 아직 설정되지 않았습니다. ADMIN_GUIDE.md 의 [처음 설정]을 따라 주세요.</Notice>
        )}
        {session.devPassword && (
          <Notice tone="info">지금은 개발 화면이라 임시 비밀번호 0000 으로 들어갈 수 있어요. 실제 홈페이지에서는 따로 정한 비밀번호를 씁니다.</Notice>
        )}
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">비밀번호</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputCls} mt-1.5`}
            autoFocus
          />
        </label>
        {error && <Notice tone="error">{error}</Notice>}
        <Button type="submit" disabled={busy || !password} className="w-full">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} 로그인
        </Button>
        <Link href="/" className="block text-center text-sm text-slate-500 underline">
          홈페이지로 돌아가기
        </Link>
      </form>
    </main>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [tab, setTab] = useState<Tab>('reviews');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saved, setSaved] = useState<string>('');
  const [defaults, setDefaults] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<ContentDraft['message']>(null);

  const loadSession = useCallback(async () => {
    setSession(await api<Session>('/api/admin/session'));
  }, []);

  useEffect(() => {
    api<Session>('/api/admin/session')
      .then(setSession)
      .catch(() => setSession({ loggedIn: false, passwordConfigured: true, storage: 'local', devPassword: false }));
    const out = () => setSession((s) => (s ? { ...s, loggedIn: false } : s));
    window.addEventListener('admin-logged-out', out);
    return () => window.removeEventListener('admin-logged-out', out);
  }, []);

  useEffect(() => {
    if (!session?.loggedIn) return;
    api<{ content: SiteContent; defaults: SiteContent }>('/api/admin/content')
      .then((d) => {
        setContent(d.content);
        setDefaults(d.defaults);
        setSaved(JSON.stringify(d.content));
      })
      .catch((e) => setMessage({ tone: 'error', text: e.message }));
  }, [session?.loggedIn]);

  const dirty = content !== null && JSON.stringify(content) !== saved;

  // 저장하지 않고 창을 닫으려 하면 한 번 물어봅니다
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-blue-700" />
      </main>
    );
  }
  if (!session.loggedIn) return <Login session={session} onDone={loadSession} />;

  const draft: ContentDraft | null =
    content && defaults
      ? {
          content,
          defaults,
          dirty,
          saving,
          message,
          update: (next) => {
            setContent(next);
            setMessage(null);
          },
          save: async () => {
            setSaving(true);
            try {
              const d = await api<{ content: SiteContent }>('/api/admin/content', { method: 'PUT', json: { content } });
              setContent(d.content);
              setSaved(JSON.stringify(d.content));
              setMessage({ tone: 'ok', text: '저장했어요. 홈페이지에 바로 반영됩니다.' });
            } catch (e) {
              setMessage({ tone: 'error', text: e instanceof Error ? e.message : '저장하지 못했습니다.' });
            } finally {
              setSaving(false);
            }
          },
          reset: async () => {
            if (!confirm('관리자 페이지에서 고친 글을 모두 지우고 처음 기본값으로 되돌릴까요?')) return;
            const d = await api<{ content: SiteContent }>('/api/admin/content', { method: 'DELETE' });
            setContent(d.content);
            setSaved(JSON.stringify(d.content));
            setMessage({ tone: 'ok', text: '기본값으로 되돌렸어요.' });
          },
        }
      : null;

  const logout = async () => {
    await api('/api/admin/session', { method: 'DELETE' }).catch(() => {});
    setSession({ ...session, loggedIn: false });
  };

  const switchTab = (next: Tab) => {
    if (dirty && !['content', 'seo', 'sections'].includes(next) && !confirm('저장하지 않은 수정 내용이 있어요. 그래도 이동할까요?')) return;
    setTab(next);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 lg:grid lg:grid-cols-[220px_1fr]">
      {/* 왼쪽 메뉴 (휴대폰은 위쪽 가로 메뉴) */}
      <aside className="sticky top-0 z-20 border-b border-slate-200 bg-white lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-4 py-3 lg:block lg:px-5 lg:py-6">
          <div>
            <p className="text-base font-extrabold tracking-tight">PREMIER CLEAN</p>
            <p className="text-xs font-semibold text-slate-400">관리자</p>
          </div>
          <div className="flex gap-2 lg:mt-5 lg:flex-col">
            <a href="/" target="_blank" className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm text-slate-500 hover:bg-slate-100">
              <ExternalLink className="h-4 w-4" /> <span className="hidden sm:inline">홈페이지 보기</span>
            </a>
            <button onClick={logout} className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-2 text-sm text-slate-500 hover:bg-slate-100">
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">로그아웃</span>
            </button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => switchTab(id)}
              className={`flex min-h-11 flex-shrink-0 cursor-pointer items-center gap-2 rounded-xl px-3.5 text-sm font-semibold transition-colors ${
                tab === id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {session.storage === 'local' && (
          <div className="mb-5">
            <Notice tone="warn">
              지금은 이 컴퓨터에만 저장되는 <b>미리보기 모드</b>예요. 실제 홈페이지에 올리기 전에 Supabase(온라인 저장소)를 연결해야 모든
              손님에게 보입니다. (ADMIN_GUIDE.md [처음 설정] 참고)
            </Notice>
          </div>
        )}
        {tab === 'reviews' && <ReviewsPanel />}
        {tab === 'stats' && <StatsPanel />}
        {['content', 'seo', 'sections'].includes(tab) &&
          (draft ? (
            <>
              {tab === 'content' && <ContentPanel draft={draft} />}
              {tab === 'seo' && <SeoPanel draft={draft} />}
              {tab === 'sections' && <SectionsPanel draft={draft} />}
            </>
          ) : message ? (
            <Notice tone="error">{message.text}</Notice>
          ) : (
            <Loader2 className="h-6 w-6 animate-spin text-blue-700" />
          ))}
      </main>
    </div>
  );
}

/** 저장 막대 (문구 수정·검색 노출·섹션 화면 아래에 붙음) */
export function SaveBar({ draft }: { draft: ContentDraft }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-6 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={draft.save} disabled={!draft.dirty || draft.saving}>
          {draft.saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {draft.dirty ? '저장하기' : '저장됨'}
        </Button>
        {draft.dirty && <span className="text-sm text-amber-700">저장하지 않은 수정이 있어요</span>}
        {draft.message && (
          <span className={`text-sm ${draft.message.tone === 'ok' ? 'text-emerald-700' : 'text-rose-700'}`}>{draft.message.text}</span>
        )}
      </div>
    </div>
  );
}
