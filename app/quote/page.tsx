import type { Metadata } from "next";
import Link from "next/link";
import { estimate, parseInput, toQuery, yuan, yuanWan } from "@/lib/estimate";
import PrintButton from "@/components/PrintButton";
import SaveProject from "@/components/SaveProject";

export const metadata: Metadata = {
  title: "制作报价单",
  robots: { index: false, follow: false },
};

function today() {
  const d = new Date();
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { iso: get("year") + get("month") + get("day"), cn: `${get("year")} 年 ${get("month")} 月 ${get("day")} 日` };
}

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const input = parseInput(sp);
  const r = estimate(input);
  const d = today();
  const quoteNo = `MJ-${d.iso}-01`;

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
            日期 {d.cn}
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
        <Link className="btn btn-ghost" href={"/storyboard?" + toQuery(input) + "#calc"}>
          调整参数
        </Link>
        <a
          className="btn btn-ghost"
          href={"/api/estimate?" + toQuery(input) + "&format=csv"}
        >
          下载 CSV
        </a>
        <PrintButton />
      </div>
    </main>
  );
}
