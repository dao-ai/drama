"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toQuery, yuan, yuanWan, type EstimateInput } from "@/lib/estimate";

export type ProjectView = {
  id: string;
  name: string;
  createdAt: string;
  input: EstimateInput;
  perEp: number;
  total: number;
  perMinute: number;
  frameShare: number;
};

function when(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

const ROWS: {
  key: string;
  label: string;
  value: (p: ProjectView) => string;
  raw?: (p: ProjectView) => number;
  unit?: string;
}[] = [
  { key: "episodes", label: "集数", value: (p) => String(p.input.episodes) },
  { key: "epLen", label: "单集时长", value: (p) => p.input.epLen + " 秒" },
  { key: "frames", label: "镜数 / 集", value: (p) => String(p.input.frames) },
  { key: "rework", label: "返工率", value: (p) => p.input.rework + "%" },
  { key: "vid", label: "视频秒数 / 集", value: (p) => p.input.vidSegs * p.input.vidSec + " 秒" },
  { key: "perEp", label: "单集成本", value: (p) => yuan(p.perEp), raw: (p) => p.perEp, unit: "元" },
  { key: "total", label: "全剧合计", value: (p) => yuanWan(p.total), raw: (p) => p.total, unit: "元" },
  { key: "perMinute", label: "每分钟成片", value: (p) => yuan(p.perMinute), raw: (p) => p.perMinute, unit: "元" },
  { key: "share", label: "关键帧占比", value: (p) => p.frameShare.toFixed(0) + "%" },
];

export default function ProjectList({
  projects,
  onDelete,
}: {
  projects: ProjectView[];
  onDelete: (id: string) => void;
}) {
  const [picked, setPicked] = useState<string[]>([]);

  const selected = useMemo(
    () =>
      picked
        .map((id) => projects.find((p) => p.id === id))
        .filter((p): p is ProjectView => Boolean(p)),
    [projects, picked]
  );
  const base = selected[0];

  const toggle = (id: string) => {
    setPicked((prev) => {
      if (prev.includes(id)) return prev.filter((v) => v !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const remove = (id: string) => {
    if (!window.confirm("删除这个报价？操作不可撤销。")) return;
    onDelete(id);
    setPicked((prev) => prev.filter((v) => v !== id));
  };

  if (projects.length === 0) {
    return (
      <div className="my-5 rounded-xl border border-gold/30 bg-gold/10 px-[18px] py-4 text-[14.5px] leading-[1.75] text-[#e8dcc4] [&_b]:text-gold">
        <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] opacity-80">还没有报价</span>
        去 <Link href="/storyboard#calc" style={{ color: "var(--gold)" }}>分镜页的成本计算器</Link>{" "}
        调好参数，点「生成报价单」，在报价页点「保存到报价库」。
      </div>
    );
  }

  return (
    <>
      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: 44 }}>对比</th>
              <th>项目</th>
              <th>保存时间</th>
              <th className="q-num">集数</th>
              <th className="q-num">单集</th>
              <th className="q-num">全剧</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>
                  <input
                    type="checkbox"
                    aria-label={"选择 " + p.name}
                    checked={picked.includes(p.id)}
                    onChange={() => toggle(p.id)}
                    style={{ width: 16, height: 16, accentColor: "#e0433f" }}
                  />
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div style={{ color: "var(--dim)", fontSize: 12 }}>
                    {p.input.frames} 镜 · 返工 {p.input.rework}% · 视频{" "}
                    {p.input.vidSegs}×{p.input.vidSec}s
                  </div>
                </td>
                <td style={{ color: "var(--muted)", fontSize: 13 }}>
                  {when(p.createdAt)}
                </td>
                <td className="q-num">{p.input.episodes}</td>
                <td className="q-num">{yuan(p.perEp)}</td>
                <td className="q-num" style={{ color: "var(--gold)", fontWeight: 700 }}>
                  {yuanWan(p.total)}
                </td>
                <td style={{ whiteSpace: "nowrap", textAlign: "right" }}>
                  <Link
                    href={"/quote?" + toQuery(p.input)}
                    style={{ color: "var(--gold)", fontSize: 13, marginRight: 12 }}
                  >
                    打开
                  </Link>
                  <button onClick={() => remove(p.id)} className="linkbtn">
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="proj-hint">
        勾选 2–3 个方案做对比，最多 3 个。第一个勾选的作为基准。
      </div>

      {selected.length >= 2 && base && (
        <div className="tablewrap" style={{ marginTop: 16 }}>
          <table>
            <thead>
              <tr>
                <th>指标</th>
                {selected.map((p) => (
                  <th key={p.id} className="q-num">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key}>
                  <td>{row.label}</td>
                  {selected.map((p) => {
                    const raw = row.raw?.(p);
                    const baseRaw = row.raw?.(base);
                    let delta: string | null = null;
                    if (raw !== undefined && baseRaw !== undefined && p.id !== base.id) {
                      if (baseRaw === 0) delta = raw === 0 ? "持平" : "—";
                      else {
                        const d = ((raw - baseRaw) / baseRaw) * 100;
                        delta = (d > 0 ? "+" : "") + d.toFixed(1) + "%";
                      }
                    }
                    return (
                      <td key={p.id} className="q-num">
                        {row.value(p)}
                        {delta && (
                          <span
                            className={
                              "delta " + (delta.startsWith("+") ? "up" : "down")
                            }
                          >
                            {delta}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
