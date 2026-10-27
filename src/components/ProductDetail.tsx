import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronRight, Clock, MapPin, Minus, Phone, Users } from 'lucide-react';
import type { SiteContent } from '@/config/site';
import type { ProductItem } from '@/types';

/** 서비스 상세 페이지 본문 (/services/[slug]). 글은 모두 관리자 [문구 수정] > 상품 카드에서 고칩니다. */
export default function ProductDetail({ content, product }: { content: SiteContent; product: ProductItem }) {
  const { products, areas, contact } = content;
  const others = products.items.filter((p) => p.slug !== product.slug);

  return (
    <article className="mx-auto max-w-6xl px-5 pt-28 pb-20 sm:px-6 sm:pt-32 lg:px-8 lg:pb-28">
      {/* 위치 표시 */}
      <nav aria-label="현재 위치" className="mb-6 flex items-center gap-1 text-sm text-slate-500">
        <Link href="/" className="rounded transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
          홈
        </Link>
        <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        <Link href="/#products" className="rounded transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
          {products.title2}
        </Link>
        <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        <span className="font-semibold text-slate-900">{product.name}</span>
      </nav>

      {/* 사진 + 이름·가격 */}
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div
          className="aspect-[4/3] rounded-3xl bg-slate-100 bg-cover bg-center"
          style={product.image ? { backgroundImage: `url('${product.image}')` } : undefined}
          role="img"
          aria-label={product.name}
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-[36px] leading-[1.15] font-bold tracking-[-0.04em] text-balance text-slate-900 break-keep sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-pretty text-slate-600 break-keep sm:text-lg">{product.summary}</p>

          <div className="mt-7 rounded-3xl bg-blue-50 p-6">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-[32px] font-bold tracking-[-0.03em] text-blue-700">{product.price}</span>
              {product.priceBasis && <span className="text-sm font-medium text-slate-600">{product.priceBasis}</span>}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-medium text-slate-700">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-blue-700" strokeWidth={1.75} />
                {products.durationLabel} {product.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4 text-blue-700" strokeWidth={1.75} />
                {products.crewLabel} {product.crew}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#contact"
              data-track="click_quote"
              className="inline-flex min-h-13 flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-700 px-6 py-4 text-base font-semibold text-white shadow-ambient-sm transition-colors duration-300 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              {products.detailCta}
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
            <a
              href={contact.phoneTel}
              data-track="click_phone"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 py-4 text-base font-semibold text-slate-800 transition-colors duration-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <Phone className="h-4 w-4 text-blue-700" strokeWidth={1.75} />
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* 설명 */}
      {product.detail && (
        <p className="mt-16 max-w-3xl text-[17px] leading-[1.8] text-pretty text-slate-700 break-keep">{product.detail}</p>
      )}

      {/* 포함 / 불포함 */}
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200/90 p-7">
          <h2 className="text-lg font-bold text-slate-900">{products.includesLabel}</h2>
          <ul className="mt-4 space-y-2.5">
            {product.includes.map((it) => (
              <li key={it} className="flex items-start gap-2.5 text-[15px] text-slate-700 break-keep">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" strokeWidth={2} />
                {it}
              </li>
            ))}
          </ul>
        </div>
        {product.excludes.length > 0 && (
          <div className="rounded-3xl border border-slate-200/90 bg-slate-50 p-7">
            <h2 className="text-lg font-bold text-slate-900">{products.excludesLabel}</h2>
            <ul className="mt-4 space-y-2.5">
              {product.excludes.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-[15px] text-slate-600 break-keep">
                  <Minus className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" strokeWidth={2} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 이런 분께 */}
      {product.recommendFor.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{products.detailRecommendLabel}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {product.recommendFor.map((r) => (
              <li key={r} className="rounded-2xl bg-slate-50 p-5 text-[15px] leading-relaxed text-slate-700 break-keep">
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 서비스 지역 */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{products.detailAreasLabel}</h2>
        <div className="mt-5 space-y-4">
          {areas.groups.map((g) => (
            <div key={g.id} className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <p className="flex w-20 flex-shrink-0 items-center gap-1.5 pt-1 text-sm font-bold text-slate-900">
                <MapPin className="h-4 w-4 text-blue-700" strokeWidth={1.75} />
                {g.name}
              </p>
              <p className="text-[15px] leading-relaxed text-slate-600 break-keep">{g.districts.join(' · ')}</p>
            </div>
          ))}
          <p className="text-sm text-slate-500 break-keep">{areas.note}</p>
        </div>
      </section>

      {/* 다른 상품 */}
      {others.length > 0 && (
        <section className="mt-16 border-t border-slate-100 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{products.detailOtherLabel}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/services/${p.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 px-5 py-4 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <span>
                    <span className="block font-semibold text-slate-900">{p.name}</span>
                    <span className="text-sm text-slate-500">{p.price}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-700" strokeWidth={1.75} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
