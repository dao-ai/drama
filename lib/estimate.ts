export type EstimateInput = {
  project: string;
  frames: number;
  framePrice: number;
  rework: number;
  vidSegs: number;
  vidSec: number;
  vidPrice: number;
  episodes: number;
  epLen: number;
  audio: number;
};

export const DEFAULT_INPUT: EstimateInput = {
  project: "《退婚夜，我直播爆了豪门黑料》",
  frames: 36,
  framePrice: 0.8,
  rework: 30,
  vidSegs: 9,
  vidSec: 4,
  vidPrice: 2.5,
  episodes: 80,
  epLen: 110,
  audio: 40,
};

export type Line = {
  label: string;
  detail: string;
  qty: number;
  unit: string;
  unitPrice: number;
  amount: number;
};

export type EstimateResult = {
  lines: Line[];
  perEp: number;
  total: number;
  totalMinutes: number;
  perMinute: number;
  hours: number;
  frameShare: number;
  warnings: string[];
};

function num(v: string | undefined, fallback: number, min = 0, max = Infinity) {
  const n = Number.parseFloat(v ?? "");
  if (!Number.isFinite(n)) return fallback;
  return Math.min(Math.max(n, min), max);
}

export function parseInput(
  sp: Record<string, string | string[] | undefined>
): EstimateInput {
  const get = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };
  return {
    project: (get("project") || DEFAULT_INPUT.project).slice(0, 60),
    frames: Math.round(num(get("frames"), DEFAULT_INPUT.frames, 1, 500)),
    framePrice: num(get("framePrice"), DEFAULT_INPUT.framePrice, 0, 1000),
    rework: num(get("rework"), DEFAULT_INPUT.rework, 0, 200),
    vidSegs: Math.round(num(get("vidSegs"), DEFAULT_INPUT.vidSegs, 0, 500)),
    vidSec: num(get("vidSec"), DEFAULT_INPUT.vidSec, 0, 60),
    vidPrice: num(get("vidPrice"), DEFAULT_INPUT.vidPrice, 0, 1000),
    episodes: Math.round(num(get("episodes"), DEFAULT_INPUT.episodes, 1, 500)),
    epLen: num(get("epLen"), DEFAULT_INPUT.epLen, 10, 600),
    audio: num(get("audio"), DEFAULT_INPUT.audio, 0, 100000),
  };
}

export function estimate(i: EstimateInput): EstimateResult {
  const frameQty = i.frames * (1 + i.rework / 100);
  const frameAmount = frameQty * i.framePrice;
  const vidQty = i.vidSegs * i.vidSec;
  const vidAmount = vidQty * i.vidPrice;
  const perEp = frameAmount + vidAmount + i.audio;
  const total = perEp * i.episodes;
  const totalMinutes = (i.epLen * i.episodes) / 60;

  const lines: Line[] = [
    {
      label: "关键帧生成",
      detail: `${i.frames} 镜/集 × 返工 ${i.rework}%`,
      qty: Math.round(frameQty * 10) / 10,
      unit: "张",
      unitPrice: i.framePrice,
      amount: frameAmount,
    },
    {
      label: "视频生成",
      detail: `${i.vidSegs} 段/集 × ${i.vidSec} 秒`,
      qty: Math.round(vidQty * 10) / 10,
      unit: "秒",
      unitPrice: i.vidPrice,
      amount: vidAmount,
    },
    {
      label: "配音 / 剪辑 / 混音",
      detail: "按集计价",
      qty: 1,
      unit: "集",
      unitPrice: i.audio,
      amount: i.audio,
    },
  ];

  const warnings: string[] = [];
  if (i.rework < 10) warnings.push("返工率低于 10%，确认验收标准没有放水。");
  if (frameAmount / Math.max(perEp, 0.01) > 0.55)
    warnings.push("关键帧成本占比偏高，优先减少镜头数或降低 A 级镜头比例。");
  if (i.episodes > 100) warnings.push("集数超过 100，先确认预算能覆盖全剧而不是只够前十集。");
  if (i.vidSegs * i.vidSec > i.epLen * 0.6)
    warnings.push("视频秒数超过单集时长的 60%，成本结构偏重，考虑用 2D 动效替代 B 级镜头。");

  return {
    lines,
    perEp,
    total,
    totalMinutes,
    perMinute: total / Math.max(totalMinutes, 0.01),
    hours: totalMinutes / 60,
    frameShare: perEp > 0 ? (frameAmount / perEp) * 100 : 0,
    warnings,
  };
}

export function yuan(n: number) {
  return "¥" + Math.round(n).toLocaleString("zh-CN");
}

export function yuanWan(n: number) {
  if (n >= 10000) return (n / 10000).toFixed(n >= 100000 ? 1 : 2) + " 万元";
  return yuan(n);
}

export function toQuery(i: EstimateInput) {
  const p = new URLSearchParams();
  Object.entries(i).forEach(([k, v]) => p.set(k, String(v)));
  return p.toString();
}

function cell(v: string | number) {
  const s = String(v);
  const needQuote = s.includes(',') || s.includes('"') || s.includes('\n');
  return needQuote ? '"' + s.replace(/"/g, '""') + '"' : s;
}

export function toCsv(i: EstimateInput, r: EstimateResult) {
  const head = ["项目", "明细", "数量", "单位", "单价(元)", "金额(元)"];
  const lines = r.lines.map((l) => [
    l.label,
    l.detail,
    l.qty.toFixed(1),
    l.unit,
    l.unitPrice.toFixed(2),
    Math.round(l.amount).toString(),
  ]);
  const rows = [
    ["项目", i.project],
    ["规格", `竖屏漫剧 9:16 · ${i.episodes} 集 × ${i.epLen} 秒`],
    [],
    head,
    ...lines,
    [],
    ["单集成本", Math.round(r.perEp).toString()],
    ["全剧合计", Math.round(r.total).toString()],
    ["每分钟成片", Math.round(r.perMinute).toString()],
    ["全剧成片时长(小时)", r.hours.toFixed(1)],
    [],
    ["备注", "不含投流、平台分成与人力成本；单价以供应商最终报价为准。"],
  ];
  // BOM so Excel opens Chinese correctly
  return "\uFEFF" + rows.map((row) => row.map(cell).join(",")).join("\r\n");
}
