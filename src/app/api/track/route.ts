import { recordEvent } from '@/lib/store';

const TYPES = new Set(['view', 'section_view', 'click_phone', 'click_kakao', 'click_quote', 'submit_quote']);

export async function POST(request: Request) {
  try {
    const { type, label } = (await request.json()) as { type?: string; label?: string };
    if (!type || !TYPES.has(type)) return new Response(null, { status: 400 });
    const safeLabel = typeof label === 'string' ? label.slice(0, 60) : undefined;
    await recordEvent(type, safeLabel);
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
