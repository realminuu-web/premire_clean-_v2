'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '@/components/ContentProvider';
import SectionHeading from '@/components/SectionHeading';

/** 팀 소개: 팀원 카드 + 큰 현장 사진 + 약속 3줄 (모두 관리자 [문구 수정] > 팀 소개에서 고침) */
export default function Team() {
  const { team } = useContent();

  return (
    <section id="team" className="py-20 sm:py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl 2xl:max-w-[1680px] 3xl:max-w-[1920px] mx-auto px-5 sm:px-6 lg:px-8 2xl:px-12">
        <SectionHeading title1={team.title1} title2={team.title2} description={team.description} />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 2xl:gap-8">
          {team.members.map((m, idx) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-ambient-md"
            >
              <div
                className="aspect-[4/5] bg-slate-100 bg-cover bg-center"
                style={m.photo ? { backgroundImage: `url('${m.photo}')` } : undefined}
                role="img"
                aria-label={`${m.name} ${m.role}`}
              />
              <div className="p-4 sm:p-5 lg:p-6">
                <span className="inline-block rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {m.role}
                </span>
                <h3 className="mt-2.5 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{m.name}</h3>
                <p className="mt-0.5 text-xs font-semibold text-slate-500 sm:text-sm">{m.career}</p>
                <p className="mt-3 hidden text-sm leading-relaxed text-pretty text-slate-600 break-keep sm:block">{m.intro}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {(team.photo || team.promises.length > 0) && (
          <div className="mt-10 grid gap-4 sm:gap-6 lg:mt-12 lg:grid-cols-[1.3fr_1fr]">
            {team.photo && (
              <div
                className="min-h-56 rounded-3xl bg-slate-200 bg-cover bg-center sm:min-h-72"
                style={{ backgroundImage: `url('${team.photo}')` }}
                role="img"
                aria-label={team.promiseTitle}
              />
            )}
            <div className="rounded-3xl border border-slate-200/90 bg-slate-50 p-7 sm:p-9">
              <h3 className="text-xl font-bold leading-snug tracking-tight text-balance text-slate-900 break-keep sm:text-2xl">
                {team.promiseTitle}
              </h3>
              <ul className="mt-5 space-y-3">
                {team.promises.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-slate-700 break-keep">
                    <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-700 ring-4 ring-blue-100" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
