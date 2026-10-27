'use client';

/**
 * 통계용 기록. 이름·전화번호 같은 개인 정보는 보내지 않습니다.
 * 같은 방문(브라우저 탭) 안에서 같은 기록은 한 번만 셉니다.
 */
export type TrackType =
  | 'view'
  | 'section_view'
  | 'click_phone'
  | 'click_kakao'
  | 'click_quote'
  | 'submit_quote';

export function track(type: TrackType, label?: string, { once = false } = {}) {
  if (typeof window === 'undefined') return;
  if (once) {
    const key = `pc_track_${type}_${label ?? ''}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // 사생활 보호 모드 등에서는 그냥 셉니다
    }
  }
  const body = JSON.stringify({ type, label });
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }));
    return;
  }
  fetch('/api/track', { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(
    () => {},
  );
}
