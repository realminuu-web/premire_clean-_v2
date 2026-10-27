'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { scrollToId, useContent } from '@/components/ContentProvider';
import SectionHeading from '@/components/SectionHeading';

/** 증명 자료: 사업자 조회·보험 증명서·네이버 후기처럼 손님이 직접 확인할 수 있는 카드 */
export default function Proof() {
  const { proof, company } = useContent();
  const bizNo = company.businessNumber.replace(/\D/g, '');

  return (
    <section id="proof" className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-5 sm:px-6 lg:px-8 2xl:px-12">
        <SectionHeading title1={proof.title1} title2={proof.title2} description={proof.description} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-7">
          {proof.items.map((item, i) => {
            const href = item.href.replace('{사업자번호}', bizNo);
            const inPage = href.startsWith('#');
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-ambient-sm"
              >
                {item.image && (
                  <div
                    className="aspect-[4/3] bg-slate-100 bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.image}')` }}
                    role="img"
                    aria-label={item.title}
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="self-start rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">{item.label}</span>
                  <h3 className="mt-3 text-lg font-bold tracking-tight text-balance text-slate-900 break-keep">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-slate-600 break-keep">{item.description}</p>
                  {href && item.linkLabel && (
                    <a
                      href={href}
                      {...(inPage
                        ? { onClick: (e: React.MouseEvent) => (e.preventDefault(), scrollToId(href)) }
                        : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="mt-auto inline-flex items-center gap-1 self-start pt-5 text-sm font-semibold text-blue-700 underline-offset-4 transition-colors hover:text-blue-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                    >
                      {item.linkLabel}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
