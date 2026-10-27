import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const alt = `${siteConfig.brand.name} | ${siteConfig.brand.slogan}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 40%, #1e3a8a 100%)',
          color: '#ffffff',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '22px',
                fontWeight: 800,
              }}
            >
              P
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.03em' }}>
                PREMIER <span style={{ color: '#38bdf8' }}>CLEAN</span>
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
                프리미엄 100% 직영 마스터케어
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: '999px',
              backgroundColor: 'rgba(37, 99, 235, 0.25)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38bdf8',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            고객 만족도 99% (누적 12,800건)
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '960px' }}>
          <h1
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '48px',
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            <span>보이지 않는 곳까지 완벽하게,</span>
            <span style={{ color: '#60a5fa' }}>프리미어 클린이 기준을 만듭니다.</span>
          </h1>
          <p
            style={{
              display: 'flex',
              fontSize: '22px',
              color: '#cbd5e1',
              margin: 0,
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
            }}
          >
            입주 / 이사 / 거주 / 사무실 100% 한국인 직영 시공 및 멸균 정밀 매뉴얼
          </p>
        </div>

        {/* Bottom Trust Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                fontSize: '15px',
                fontWeight: 700,
                color: '#e2e8f0',
              }}
            >
              KB손해보험 5억 보증
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                fontSize: '15px',
                fontWeight: 700,
                color: '#e2e8f0',
              }}
            >
              100% 안심 후불제
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                fontSize: '15px',
                fontWeight: 700,
                color: '#e2e8f0',
              }}
            >
              3일 무상 A/S 보장
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '18px',
              fontWeight: 800,
              color: '#38bdf8',
              letterSpacing: '-0.02em',
            }}
          >
            상담 직통 {siteConfig.contact.phone}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
