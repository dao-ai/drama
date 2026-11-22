"use client";

import { useEffect, useMemo, useState } from "react";
import { estimate, yuan, yuanWan, type EstimateInput } from "@/lib/estimate";
import { todayParts } from "@/lib/download";

const PAPER =
  "mx-auto max-w-[900px] rounded-[18px] bg-[#f7f5f0] p-[44px_46px] text-[#1a1a1f] shadow-[0_30px_80px_rgba(0,0,0,0.5)] max-sm:p-[26px_18px] print:max-w-none print:rounded-none print:p-0 print:shadow-none [&_h1]:mb-2 [&_h1]:text-[26px] [&_h1]:leading-[1.3] [&_h1]:tracking-[-0.01em] [&_h1]:text-[#111] [&_table]:w-full [&_table]:min-w-0 [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:border-b [&_th]:border-[#d8d2c6] [&_th]:bg-[#ece8df] [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-xs [&_th]:tracking-[0.04em] [&_th]:text-[#4a463d] [&_td]:border-b [&_td]:border-[#e2ddd2] [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top [&_td]:text-[#2a2823] [&_tr:last-child_td]:border-0 [&_tbody_tr:hover]:bg-transparent";

export default function QuoteSheet({ input }: { input: EstimateInput }) {
  const [date, setDate] = useState<{ iso: string; cn: string } | null>(null);
  useEffect(() => setDate(todayParts()), []);
  const r = useMemo(() => estimate(input), [input]);
  const quoteNo = date ? "MJ-" + date.iso + "-01" : "MJ-——";

  return (
    <div className={PAPER}>
      <div className="mb-7 flex items-start justify-between gap-5 border-b-2 border-[#1a1a1f] pb-[18px] max-sm:flex-col">
        <div className="flex items-center gap-2.5 text-xl font-extrabold [&_span]:text-[11px] [&_span]:font-semibold [&_span]:tracking-[0.18em] [&_span]:text-[#8a8578]">
          🎞️ 漫剧工坊 <span>MANJU WORKSHOP</span>
        </div>
        <div className="text-right text-xs leading-[1.8] tabular-nums text-[#6b675e] max-sm:text-left">
          报价编号 {quoteNo}
          <br />
          日期 {date ? date.cn : "—"}
        </div>
      </div>

      <h1>{input.project}</h1>
      <p className="mb-[26px] mt-0 text-sm text-[#6b675e]">
        竖屏漫剧 · 9:16 · {input.episodes} 集 × {input.epLen} 秒 · 成片约{" "}
        {r.hours.toFixed(1)} 小时
      </p>

      <table>
        <thead>
          <tr>
            <th>项目</th>
            <th>明细</th>
            <th className="whitespace-nowrap text-right tabular-nums">数量</th>
            <th className="whitespace-nowrap text-right tabular-nums">单价</th>
            <th className="whitespace-nowrap text-right tabular-nums">金额</th>
          </tr>
        </thead>
        <tbody>
          {r.lines.map((l) => (
            <tr key={l.label}>
              <td>{l.label}</td>
              <td className="text-xs text-[#8a8578]">{l.detail}</td>
              <td className="whitespace-nowrap text-right tabular-nums">
                {l.qty.toFixed(1)} {l.unit}
              </td>
              <td className="whitespace-nowrap text-right tabular-nums">¥{l.unitPrice.toFixed(2)}</td>
              <td className="whitespace-nowrap text-right tabular-nums">{yuan(l.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-[22px] flex flex-wrap items-baseline justify-between gap-4 border-t-2 border-[#1a1a1f] pt-[18px] [&_.l]:text-xs [&_.l]:tracking-[0.1em] [&_.l]:text-[#6b675e] [&_b]:text-3xl [&_b]:tracking-[-0.01em] max-sm:[&_b]:text-2xl [&_em]:ml-1.5 [&_em]:text-[13px] [&_em]:font-medium [&_em]:not-italic [&_em]:text-[#6b675e]">
        <span className="l">全剧合计（{input.episodes} 集）</span>
        <b>
          {yuanWan(r.total)}
          <em>单集 {yuan(r.perEp)}</em>
        </b>
      </div>

      <div className="mt-[22px] grid grid-cols-3 gap-4 max-sm:grid-cols-1 [&>div]:border-t [&>div]:border-[#d8d2c6] [&>div]:pt-2.5 [&_span]:mb-0.5 [&_span]:block [&_span]:text-[11px] [&_span]:text-[#8a8578] [&_b]:text-base [&_b]:tabular-nums">
        <div>
          <span>单集成本</span>
          <b>{yuan(r.perEp)}</b>
        </div>
        <div>
          <span>每分钟成片</span>
          <b>{yuan(r.perMinute)}</b>
        </div>
        <div>
          <span>关键帧成本占比</span>
          <b>{r.frameShare.toFixed(0)}%</b>
        </div>
      </div>

      <p className="mt-6 border-l-[3px] border-gold pl-3.5 text-xs leading-[1.8] text-[#6b675e]">
        计价假设：{input.frames} 镜/集，返工率 {input.rework}%，视频{" "}
        {input.vidSegs} 段 × {input.vidSec} 秒/集，配音/剪辑 {yuan(input.audio)}
        /集。本报价不含投流、平台分成与人力成本；单价为当前占位示例，以供应商最终报价为准。
      </p>

      {r.warnings.length > 0 && (
        <div className="mt-3.5 text-xs leading-[1.7] text-[#9a3b33]">
          {r.warnings.map((w) => (
            <div key={w}>· {w}</div>
          ))}
        </div>
      )}
    </div>
  );
}
