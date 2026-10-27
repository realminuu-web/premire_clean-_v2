'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock, Users } from 'lucide-react';
import { scrollToId, useContent } from '@/components/ContentProvider';
import SectionHeading from '@/components/SectionHeading';
import type { ProductItem } from '@/types';

type Labels = { durationLabel: string; crewLabel: string; includesLabel: string; excludesLabel: string; more: string };

function ProductCard({ product, labels, index }: { product: ProductItem; labels: Labels; index: number }) {
  const shown = product.includes.slice(0, 3);
  const rest = product.includes.length - shown.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
      className="w-[82%] flex-shrink-0 snap-start sm:w-auto"
    >
      <Link
        href={`/services/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-ambient-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-ambient-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {product.image && (
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${product.image}')` }}
              role="img"
              aria-label={product.name}
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{product.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-pretty text-slate-600 break-keep">{product.summary}</p>

          <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
            <span className="text-2xl font-bold tracking-[-0.03em] text-blue-700">{product.price}</span>
            {product.priceBasis && <span className="text-xs font-medium text-slate-500">{product.priceBasis}</span>}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.75} />
              {labels.durationLabel} {product.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.75} />
              {labels.crewLabel} {product.crew}
            </span>
          </div>

          <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold text-slate-900">{labels.includesLabel}</p>
            <ul className="space-y-1">
              {shown.map((it) => (
                <li key={it} className="flex items-start gap-2 text-sm text-slate-700 break-keep">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" strokeWidth={2} />
                  {it}
                </li>
              ))}
            </ul>
            {rest > 0 && <p className="pl-6 text-xs text-slate-500">외 {rest}가지</p>}
          </div>

          {product.excludes.length > 0 && (
            <p className="mt-3 text-xs leading-relaxed text-slate-500 break-keep">
              <span className="font-semibold text-slate-600">{labels.excludesLabel}</span> · {product.excludes.join(', ')}
            </p>
          )}

          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-blue-700">
            {labels.more}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/** 상품 카드: 가격·시간·인원·포함/불포함을 한눈에 보고, 누르면 상세 페이지로 (관리자 [문구 수정] > 상품 카드) */
export default function Products() {
  const { products } = useContent();

  return (
    <section id="products" className="relative bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-5 sm:px-6 lg:px-8 2xl:px-12">
        <SectionHeading title1={products.title1} title2={products.title2} description={products.description} />

        {/* 휴대폰: 옆으로 넘기는 한 줄 / 태블릿 이상: 격자 */}
        <div className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-7">
          {products.items.map((p, i) => (
            <ProductCard key={p.id} product={p} labels={products} index={i} />
          ))}

          {/* 마지막 칸: 목록에 없는 청소 문의 */}
          <div className="flex w-[82%] flex-shrink-0 snap-start flex-col justify-between rounded-3xl bg-blue-50 p-6 sm:w-auto sm:p-7">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-balance text-slate-900 break-keep">{products.otherTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-slate-600 break-keep">{products.otherDescription}</p>
            </div>
            <button
              type="button"
              data-track="click_quote"
              onClick={() => scrollToId('#contact')}
              className="mt-6 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-ambient-sm transition-colors duration-300 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              {products.otherCta}
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
