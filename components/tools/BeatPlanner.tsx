"use client";

import { useMemo, useState } from "react";

const plan = [
  { name: "冷开场", p: 0.04, desc: "冲突/异常，3 秒内成立", hot: true },
  { name: "铺垫", p: 0.2, desc: "交代关系与目标，别超过 20 秒" },
  { name: "冲突升级", p: 0.28, desc: "正反打，压迫感递增", hot: true },
  { name: "反转", p: 0.24, desc: "信息揭露，静音一拍再爆", hot: true },
  { name: "后果", p: 0.15, desc: "反应镜头，情绪落地" },
  { name: "结尾扣", p: 0.09, desc: "指向下一集，戛然而止", hot: true },
];

function fmt(s: number) {
  const t = Math.max(0, Math.round(s));
  const m = Math.floor(t / 60);
  const ss = t % 60;
  return m + ":" + (ss < 10 ? "0" : "") + ss;
}

export default function BeatPlanner() {
  const [duration, setDuration] = useState(110);
  const total = Math.min(Math.max(Number.isFinite(duration) ? duration : 110, 30), 300);

  const rows = useMemo(() => {
    let t = 0;
    return plan.map((b, i) => {
      const seg =
        i === plan.length - 1
          ? Math.round(total) - t
          : Math.round(total * b.p);
      const row = { ...b, start: t, end: t + seg, seg };
      t += seg;
      return row;
    });
  }, [total]);

  return (
    <>
      <div className="tool">
        <h3>单集节拍分配</h3>
        <p className="hint">按六拍比例自动计算时间码，末端自动对齐总时长。</p>
        <div className="fields" style={{ gridTemplateColumns: "220px 1fr" }}>
          <div className="field">
            <label htmlFor="beat-dur">单集时长（秒）</label>
            <input
              id="beat-dur"
              type="number"
              min={30}
              max={300}
              step={1}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
          <div className="field" style={{ alignSelf: "end", paddingBottom: 10 }}>
            <span style={{ color: "var(--muted)", fontSize: 13.5 }}>
              约 {Math.round(total / 18)} 次信息增量 · 每 15–20 秒必须给一次新信息
            </span>
          </div>
        </div>
        <div className="beats">
          {rows.map((r) => (
            <div className={"beat" + (r.hot ? " hot" : "")} key={r.name}>
              <div className="tc">
                {fmt(r.start)}–{fmt(r.end)}
              </div>
              <div className="nm">{r.name}</div>
              <span className="track">
                <i style={{ width: Math.round(r.p * 100) + "%" }} />
              </span>
              <div className="desc">{r.desc}</div>
            </div>
          ))}
          <div className="beat">
            <div className="tc">{fmt(total)}</div>
            <div className="nm">总时长</div>
            <span className="track">
              <i
                style={{
                  width: "100%",
                  background: "linear-gradient(90deg,#4fd1c5,#d9a441)",
                }}
              />
            </span>
            <div className="desc">约 {Math.round(total / 18)} 次信息增量</div>
          </div>
        </div>
      </div>
      <p style={{ marginTop: 16, color: "var(--dim)", fontSize: 13 }}>
        金色条 = 必须留钩子的位置。结尾扣的时长可以压缩到 2 秒，但绝不能没有。
      </p>
    </>
  );
}
