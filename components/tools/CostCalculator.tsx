"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Field = {
  key: string;
  label: string;
  value: string;
  min?: number;
  max?: number;
  step?: number;
};

const initial: Field[] = [
  { key: "frames", label: "单集镜头数", value: "36", min: 1 },
  { key: "framePrice", label: "关键帧单价（元/张）", value: "0.8", min: 0, step: 0.1 },
  { key: "rework", label: "返工率（%）", value: "30", min: 0, max: 200 },
  { key: "vidSegs", label: "视频段数 / 集", value: "9", min: 0 },
  { key: "vidSec", label: "平均段长（秒）", value: "4", min: 0, step: 0.5 },
  { key: "vidPrice", label: "视频单价（元/秒）", value: "2.5", min: 0, step: 0.1 },
  { key: "episodes", label: "集数", value: "80", min: 1 },
  { key: "epLen", label: "单集时长（秒）", value: "110", min: 10 },
  { key: "audio", label: "配音/剪辑等（元/集）", value: "40", min: 0 },
];

function money(n: number) {
  if (!Number.isFinite(n)) return "—";
  if (n >= 10000) {
    return (n / 10000).toFixed(n >= 100000 ? 1 : 2) + " 万";
  }
  return Math.round(n).toLocaleString("zh-CN");
}

export default function CostCalculator() {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(initial.map((f) => [f.key, f.value]))
  );
  const [project, setProject] = useState("《退婚夜，我直播爆了豪门黑料》");

  // 从报价单“调整参数”回来时回填
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (!sp.toString()) return;
    setValues((prev) => {
      const next = { ...prev };
      initial.forEach((f) => {
        const v = sp.get(f.key);
        if (v !== null) next[f.key] = v;
      });
      return next;
    });
    const p = sp.get("project");
    if (p) setProject(p);
  }, []);

  const calc = useMemo(() => {
    const num = (k: string, d: number) => {
      const v = parseFloat(values[k] ?? "");
      return Number.isFinite(v) && v >= 0 ? v : d;
    };
    const frames = num("frames", 36);
    const fp = num("framePrice", 0.8);
    const rw = num("rework", 30) / 100;
    const segs = num("vidSegs", 9);
    const sec = num("vidSec", 4);
    const vp = num("vidPrice", 2.5);
    const eps = num("episodes", 80);
    const len = num("epLen", 110);
    const audio = num("audio", 40);

    const frameCost = frames * (1 + rw) * fp;
    const vidCost = segs * sec * vp;
    const perEp = frameCost + vidCost + audio;
    const total = perEp * eps;
    const minutes = (len * eps) / 60;
    const share = perEp > 0 ? Math.round((frameCost / perEp) * 100) : 0;

    return {
      perEp,
      total,
      perMin: total / Math.max(minutes, 0.01),
      hours: minutes / 60,
      frameCost,
      vidCost,
      share,
    };
  }, [values]);

  return (
    <div className="tool">
      <h3>成本估算</h3>
      <p className="hint">关键帧与视频分开计价；返工率已计入关键帧成本。</p>
      <div className="fields">
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="cost-project">项目名</label>
          <input
            id="cost-project"
            type="text"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
        </div>
        {initial.map((f) => (
          <div className="field" key={f.key}>
            <label htmlFor={"cost-" + f.key}>{f.label}</label>
            <input
              id={"cost-" + f.key}
              type="number"
              min={f.min}
              max={f.max}
              step={f.step}
              value={values[f.key]}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [f.key]: e.target.value }))
              }
            />
          </div>
        ))}
      </div>
      <div className="results">
        <div className="res">
          <span>单集成本</span>
          <b>
            {money(calc.perEp)}
            <i>元/集</i>
          </b>
        </div>
        <div className="res">
          <span>全剧成本</span>
          <b>
            {money(calc.total)}
            <i>元/全剧</i>
          </b>
        </div>
        <div className="res">
          <span>每分钟成片</span>
          <b>
            {money(calc.perMin)}
            <i>元/分钟</i>
          </b>
        </div>
        <div className="res">
          <span>全剧成片时长</span>
          <b>
            {calc.hours.toFixed(1)}
            <i>小时成片</i>
          </b>
        </div>
      </div>
      <div className="results" style={{ marginTop: 12 }}>
        <div className="res">
          <span>关键帧成本 / 集</span>
          <b>
            {money(calc.frameCost)}
            <i>元/集</i>
          </b>
        </div>
        <div className="res">
          <span>视频成本 / 集</span>
          <b>
            {money(calc.vidCost)}
            <i>元/集</i>
          </b>
        </div>
        <div className="res">
          <span>关键帧占比</span>
          <b>
            {calc.share}
            <i>%</i>
          </b>
        </div>
        <div className="res">
          <span>建议</span>
          <b style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>
            超预算先砍 A 级镜头
          </b>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 20,
          flexWrap: "wrap",
        }}
      >
        <Link
          className="btn btn-primary"
          href={
            "/quote?" +
            new URLSearchParams({ ...values, project }).toString()
          }
        >
          生成报价单 →
        </Link>
      </div>
    </div>
  );
}
