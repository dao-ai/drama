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
      <div className="rounded-[20px] border border-white/15 bg-gradient-to-br from-[#17171f] to-[#0e0e14] p-[26px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] [&_h3]:mb-1 [&_h3]:mt-0 [&_h3]:text-[19px] [&_.hint]:mb-[22px] [&_.hint]:mt-0 [&_.hint]:text-[13.5px] [&_.hint]:text-muted">
        <h3>单集节拍分配</h3>
        <p className="hint">按六拍比例自动计算时间码，末端自动对齐总时长。</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 [&_label]:mb-[7px] [&_label]:block [&_label]:text-xs [&_label]:tracking-[0.06em] [&_label]:text-muted [&_input]:w-full [&_input]:rounded-[10px] [&_input]:border [&_input]:border-white/15 [&_input]:bg-[#0b0b10] [&_input]:px-3 [&_input]:py-[10px] [&_input]:text-[15px] [&_input]:text-white [&_input]:outline-none [&_input]:transition [&_select]:w-full [&_select]:rounded-[10px] [&_select]:border [&_select]:border-white/15 [&_select]:bg-[#0b0b10] [&_select]:px-3 [&_select]:py-[10px] [&_select]:text-[15px] [&_select]:text-white [&_select]:outline-none [&_select]:transition [&_input:focus]:border-flame/60 [&_input:focus]:ring-[3px] [&_input:focus]:ring-flame/10 [&_select:focus]:border-flame/60 [&_select:focus]:ring-[3px] [&_select:focus]:ring-flame/10" style={{ gridTemplateColumns: "220px 1fr" }}>
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

    </>
  );
}
