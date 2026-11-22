export type Cue = { start: string; end: string; src: string; tgt: string };
export type Term = { src: string; tgt: string };
export type Issue = { index: number; level: "error" | "warn"; text: string };

const TIME = /(\d{1,2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(\d{1,2}:\d{2}:\d{2}[,.]\d{3})/;

export function parseSrt(input: string): Cue[] {
  const text = input.replace(/\r\n/g, "\n").replace(/^\uFEFF/, "").trim();
  if (!text) return [];
  const blocks = text.split(/\n{2,}/);
  const cues: Cue[] = [];
  for (const block of blocks) {
    const lines = block.split("\n");
    const timeIdx = lines.findIndex((l) => TIME.test(l));
    if (timeIdx === -1) continue;
    const m = lines[timeIdx].match(TIME)!;
    const body = lines.slice(timeIdx + 1).join("\n").trim();
    if (!body) continue;
    cues.push({
      start: m[1].replace(".", ","),
      end: m[2].replace(".", ","),
      src: body,
      tgt: "",
    });
  }
  if (cues.length === 0) {
    return text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => ({ start: "", end: "", src: l, tgt: "" }));
  }
  return cues;
}

export function timeToSec(t: string) {
  const m = t.match(/(\d{1,2}):(\d{2}):(\d{2})[,.](\d{3})/);
  if (!m) return 0;
  return +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000;
}

export function formatSrt(cues: Cue[], mode: "bilingual" | "target") {
  const out: string[] = [];
  cues.forEach((c, i) => {
    const body = mode === "bilingual" ? c.src + "\n" + (c.tgt || " ") : c.tgt || c.src;
    if (c.start && c.end) {
      out.push(String(i + 1));
      out.push(c.start + " --> " + c.end);
      out.push(body);
      out.push("");
    } else {
      out.push(body);
    }
  });
  return out.join("\n");
}

function digits(s: string) {
  return new Set(s.match(/\d+/g) ?? []);
}

export function runChecks(
  cues: Cue[],
  terms: Term[],
  target: "en" | "zh"
): Issue[] {
  const issues: Issue[] = [];
  const maxLen = target === "en" ? 84 : 32;
  const hardLen = target === "en" ? 120 : 48;

  cues.forEach((c, i) => {
    if (!c.src.trim()) return;
    if (!c.tgt.trim()) {
      issues.push({ index: i, level: "error", text: "译文为空" });
      return;
    }
    const dur = timeToSec(c.end) - timeToSec(c.start);
    if (c.start && dur > 7) issues.push({ index: i, level: "warn", text: "镜头超过 7 秒，考虑拆行" });
    if (c.start && dur < 0.8) issues.push({ index: i, level: "warn", text: "时长不足 0.8 秒，观众读不完" });

    const len = c.tgt.replace(/\s/g, " ").trim().length;
    if (len > hardLen) issues.push({ index: i, level: "error", text: "译文过长（" + len + " 字符）" });
    else if (len > maxLen) issues.push({ index: i, level: "warn", text: "译文偏长（" + len + " 字符），建议拆行" });

    const srcNums = digits(c.src);
    const tgtNums = digits(c.tgt);
    for (const n of srcNums) {
      if (!tgtNums.has(n)) {
        issues.push({ index: i, level: "warn", text: "数字 " + n + " 未出现在译文" });
        break;
      }
    }

    for (const t of terms) {
      if (!t.src || !t.tgt) continue;
      if (c.src.includes(t.src) && !c.tgt.toLowerCase().includes(t.tgt.toLowerCase())) {
        issues.push({ index: i, level: "warn", text: "术语「" + t.src + "」未按词表译为「" + t.tgt + "」" });
      }
    }

    if (target === "en" && /[，。！？；：]$/.test(c.tgt.trim())) {
      issues.push({ index: i, level: "warn", text: "英文行尾用了中文标点" });
    }
  });

  return issues;
}

export function termsCsv(terms: Term[]) {
  const esc = (s: string) => (/[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s);
  return "\uFEFF" + ["源词,译名", ...terms.map((t) => esc(t.src) + "," + esc(t.tgt))].join("\r\n");
}

export const DEFAULT_TERMS: Term[] = [
  { src: "苏念", tgt: "Su Nian" },
  { src: "陆执", tgt: "Lu Zhi" },
  { src: "苏曼曼", tgt: "Su Manman" },
  { src: "苏国强", tgt: "Su Guoqiang" },
  { src: "念神", tgt: "Nian Shen" },
  { src: "养女", tgt: "adopted daughter" },
  { src: "退婚", tgt: "call off the wedding" },
  { src: "彩礼", tgt: "bride price" },
  { src: "U盘", tgt: "USB drive" },
  { src: "直播", tgt: "livestream" },
  { src: "卷宗", tgt: "case file" },
  { src: "保镖", tgt: "bodyguard" },
];
