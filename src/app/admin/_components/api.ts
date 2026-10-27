'use client';

/** 관리자 화면 → 서버 요청. 실패하면 서버가 보낸 한국어 안내를 그대로 보여 줍니다. */
export async function api<T>(url: string, init?: RequestInit & { json?: unknown }): Promise<T> {
  const { json, ...rest } = init ?? {};
  const res = await fetch(url, {
    ...rest,
    headers: json !== undefined ? { 'Content-Type': 'application/json', ...rest.headers } : rest.headers,
    body: json !== undefined ? JSON.stringify(json) : rest.body,
    cache: 'no-store',
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    if (res.status === 401) window.dispatchEvent(new Event('admin-logged-out'));
    throw new Error(data.error || '요청을 처리하지 못했습니다. 잠시 뒤 다시 해 주세요.');
  }
  return data;
}

/** 휴대폰 사진을 긴 변 1600px JPG 로 줄인 뒤 올립니다. */
export async function uploadImage(file: File): Promise<string> {
  const resized = await shrink(file);
  const form = new FormData();
  form.append('file', resized);
  const { url } = await api<{ url: string }>('/api/admin/upload', { method: 'POST', body: form });
  return url;
}

async function shrink(file: File, max = 1600): Promise<File> {
  if (!file.type.startsWith('image/')) throw new Error('사진 파일만 올릴 수 있습니다.');
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.85));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch {
    return file; // 브라우저가 못 읽는 형식(HEIC 등)은 그대로 보냅니다
  }
}
