"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_INPUT,
  estimate,
  parseInput,
  toCsv,
  toQuery,
  yuan,
  yuanWan,
  type EstimateInput,
} from "@/lib/estimate";
import PrintButton from "@/components/PrintButton";
import SaveProject from "@/components/SaveProject";

function todayParts() {
  const d = new Date();
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    iso: get("year") + get("month") + get("day"),
    cn: `${get("year")} 年 ${get("month")} 月 ${get("day")} 日`,
  };
}

export default function QuoteView() {
  const [input, setInput] = useState<EstimateInput>(DEFAULT_INPUT);
  const [date, setDate] = useState<{ iso: string; cn: string } | null>(null);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.toString()) {
      setInput(parseInput(Object.fromEntries(sp.entries())));
    }
    setDate(todayParts());
  }, []);

  const r = useMemo(() => estimate(input), [input]);
  const quoteNo = date ? "MJ-" + date.iso + "-01" : "MJ-——";

  const downloadCsv = () => {
    const blob = new Blob([toCsv(input, r)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manju-estimate.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="wrap quote-wrap">
      <div className="quote">
        <div className="q-head">
          <div className="q-brand">
            🎞️ 漫剧工坊 <span>MANJU WORKSHOP</span>
          </div>
          <div className="q-meta">
            报价编号 {quoteNo}
            <br />
            日期 {date ? date.cn : "—"}
          </div>
        </div>

        <h1>{input.project}</h1>
        <p className="q-sub">
          竖屏漫剧 · 9:16 · {input.episodes} 集 × {input.epLen} 秒 · 成片约{" "}
          {r.hours.toFixed(1)} 小时
        </p>

        <table>
          <thead>
            <tr>
              <th>项目</th>
              <th>明细</th>
              <th className="q-num">数量</th>
              <th className="q-num">单价</th>
              <th className="q-num">金额</th>
            </tr>
          </thead>
          <tbody>
            {r.lines.map((l) => (
              <tr key={l.label}>
                <td>{l.label}</td>
                <td className="q-detail">{l.detail}</td>
                <td className="q-num">
                  {l.qty.toFixed(1)} {l.unit}
                </td>
                <td className="q-num">¥{l.unitPrice.toFixed(2)}</td>
                <td className="q-num">{yuan(l.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="q-total">
          <span className="l">全剧合计（{input.episodes} 集）</span>
          <b>
            {yuanWan(r.total)}
            <em>单集 {yuan(r.perEp)}</em>
          </b>
        </div>

        <div className="q-grid">
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

        <p className="q-note">
          计价假设：{input.frames} 镜/集，返工率 {input.rework}%，视频{" "}
          {input.vidSegs} 段 × {input.vidSec} 秒/集，配音/剪辑 {yuan(input.audio)}
          /集。本报价不含投流、平台分成与人力成本；单价为当前占位示例，以供应商最终报价为准。
        </p>

        {r.warnings.length > 0 && (
          <div className="q-warn">
            {r.warnings.map((w) => (
              <div key={w}>· {w}</div>
            ))}
          </div>
        )}
      </div>

      <SaveProject input={input} />

      <div className="q-actions">
        <Link className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-[22px] py-3 text-[15px] font-semibold text-mist transition hover:bg-white/[0.07]" href={"/storyboard?" + toQuery(input) + "#calc"}>
          调整参数
        </Link>
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-[22px] py-3 text-[15px] font-semibold text-mist transition hover:bg-white/[0.07]" onClick={downloadCsv}>
          下载 CSV
        </button>
        <PrintButton />
      </div>
    </main>
  );
}
