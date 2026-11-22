"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_TERMS,
  formatSrt,
  parseSrt,
  runChecks,
  termsCsv,
  timeToSec,
  type Cue,
  type Term,
} from "@/lib/srt";

const KEY = "manju-translate-v1";

const SAMPLE = `1
00:00:00,000 --> 00:00:04,000
苏国强（画外）：签了，上台念。

2
00:00:04,000 --> 00:00:07,000
苏念：爸，今天是我的婚礼。

3
00:00:07,000 --> 00:00:12,000
苏国强：你爸妈的车祸，卷宗在我这。

4
00:00:12,000 --> 00:00:16,000
苏念：行。

5
00:00:16,000 --> 00:00:20,000
司仪（画外）：有请新娘入场。

6
00:00:20,000 --> 00:00:24,000
苏念：愿意。愿意请大家看个东西。

7
00:00:24,000 --> 00:00:27,000
苏念：念神在线，第一爆。`;

function download(name: string, content: string, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Translator() {
  const [cues, setCues] = useState<Cue[]>([]);
  const [terms, setTerms] = useState<Term[]>(DEFAULT_TERMS);
  const [target, setTarget] = useState<"en" | "zh">("en");
  const [raw, setRaw] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        const data = JSON.parse(saved) as {
          cues?: Cue[];
          terms?: Term[];
          target?: "en" | "zh";
        };
        if (Array.isArray(data.cues)) setCues(data.cues);
        if (Array.isArray(data.terms)) setTerms(data.terms);
        if (data.target === "en" || data.target === "zh") setTarget(data.target);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ cues, terms, target }));
    } catch {}
  }, [cues, terms, target, loaded]);

  const issues = useMemo(() => runChecks(cues, terms, target), [cues, terms, target]);
  const byCue = useMemo(() => {
    const map = new Map<number, typeof issues>();
    issues.forEach((it) => {
      const arr = map.get(it.index) ?? [];
      arr.push(it);
      map.set(it.index, arr);
    });
    return map;
  }, [issues]);

  const translated = cues.filter((c) => c.tgt.trim()).length;
  const errors = issues.filter((i) => i.level === "error").length;

  const doImport = (text: string) => {
    const parsed = parseSrt(text);
    if (!parsed.length) {
      window.alert("没解析出字幕。支持标准 SRT，或每行一句台词。");
      return;
    }
    if (cues.length && !window.confirm("导入会清空当前译文，继续？")) return;
    setCues(parsed);
  };

  const setTgt = (i: number, value: string) => {
    setCues((prev) => prev.map((c, idx) => (idx === i ? { ...c, tgt: value } : c)));
  };

  const addTerm = () => setTerms((prev) => [...prev, { src: "", tgt: "" }]);
  const setTerm = (i: number, key: "src" | "tgt", v: string) =>
    setTerms((prev) =>
      prev.map((t, idx) =>
        idx === i ? (key === "src" ? { ...t, src: v } : { ...t, tgt: v }) : t
      )
    );
  const delTerm = (i: number) => setTerms((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="rounded-[20px] border border-white/15 bg-gradient-to-br from-[#17171f] to-[#0e0e14] p-[26px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] [&_h3]:mb-1 [&_h3]:mt-0 [&_h3]:text-[19px] [&_.hint]:mb-[22px] [&_.hint]:mt-0 [&_.hint]:text-[13.5px] [&_.hint]:text-muted translator">
      <h3>字幕翻译工作台</h3>
      <p className="hint">
        导入 SRT → 逐行写译文 → 术语与时长自动检查 → 导出。译文保存在本机浏览器。
      </p>

      <div className="tr-grid">
        <div>
          <label className="tr-label" htmlFor="tr-raw">
            导入字幕（SRT 或逐行台词）
          </label>
          <textarea
            id="tr-raw"
            className="tr-textarea"
            rows={5}
            value={raw}
            placeholder={"1\n00:00:01,000 --> 00:00:04,000\n苏念：签了，上台念。"}
            onChange={(e) => setRaw(e.target.value)}
          />
          <div className="tr-row">
            <button className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-gradient-to-br from-[#e8544f] to-[#c3332f] px-[22px] py-3 text-[15px] font-semibold text-white shadow-[0_10px_26px_rgba(224,67,63,0.28)] transition hover:-translate-y-px hover:shadow-[0_14px_32px_rgba(224,67,63,0.36)]" onClick={() => doImport(raw)}>
              解析并导入
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-[22px] py-3 text-[15px] font-semibold text-mist transition hover:bg-white/[0.07]"
              onClick={() => {
                setRaw(SAMPLE);
                doImport(SAMPLE);
              }}
            >
              载入示例
            </button>
            <select
              className="tr-select"
              value={target}
              onChange={(e) => setTarget(e.target.value as "en" | "zh")}
              aria-label="目标语言"
            >
              <option value="en">译成英文</option>
              <option value="zh">译成中文</option>
            </select>
          </div>
        </div>

        <div>
          <div className="tr-termhead">
            <label className="tr-label">术语表</label>
            <button className="linkbtn" onClick={addTerm}>
              + 添加
            </button>
          </div>
          <div className="term-list">
            {terms.map((t, i) => (
              <div className="term-row" key={i}>
                <input
                  value={t.src}
                  placeholder="源词"
                  onChange={(e) => setTerm(i, "src", e.target.value)}
                />
                <span className="term-arrow">→</span>
                <input
                  value={t.tgt}
                  placeholder="译名"
                  onChange={(e) => setTerm(i, "tgt", e.target.value)}
                />
                <button className="term-del" onClick={() => delTerm(i)} aria-label="删除术语">
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            className="linkbtn"
            onClick={() => download("manju-terms.csv", termsCsv(terms), "text/csv;charset=utf-8")}
          >
            导出术语 CSV
          </button>
        </div>
      </div>

      {cues.length > 0 && (
        <>
          <div className="tr-status">
            <span>共 {cues.length} 条</span>
            <span>已译 {translated}</span>
            <span className={errors ? "bad" : "good"}>
              {errors ? errors + " 个必改问题" : "无必改问题"}
            </span>
            <span>{issues.length} 条提示</span>
          </div>

          <div className="cue-list">
            {cues.map((c, i) => {
              const list = byCue.get(i) ?? [];
              const dur = c.start ? timeToSec(c.end) - timeToSec(c.start) : 0;
              return (
                <div className="cue" key={i}>
                  <div className="cue-side">
                    <span className="cue-no">{i + 1}</span>
                    <span className="cue-time">
                      {c.start ? c.start.slice(3, 8) + " · " + dur.toFixed(1) + "s" : "无时轴"}
                    </span>
                  </div>
                  <div className="cue-src">{c.src}</div>
                  <div className="cue-tgt">
                    <textarea
                      value={c.tgt}
                      rows={2}
                      placeholder={target === "en" ? "English line…" : "中文译文…"}
                      onChange={(e) => setTgt(i, e.target.value)}
                    />
                    {list.length > 0 && (
                      <div className="cue-issues">
                        {list.slice(0, 3).map((it, k) => (
                          <span key={k} className={"issue " + it.level}>
                            {it.text}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="tr-row" style={{ marginTop: 18 }}>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-gradient-to-br from-[#e8544f] to-[#c3332f] px-[22px] py-3 text-[15px] font-semibold text-white shadow-[0_10px_26px_rgba(224,67,63,0.28)] transition hover:-translate-y-px hover:shadow-[0_14px_32px_rgba(224,67,63,0.36)]"
              onClick={() => download("manju-bilingual.srt", formatSrt(cues, "bilingual"))}
            >
              导出双语 SRT
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-[22px] py-3 text-[15px] font-semibold text-mist transition hover:bg-white/[0.07]"
              onClick={() => download("manju-target.srt", formatSrt(cues, "target"))}
            >
              导出译文 SRT
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-[22px] py-3 text-[15px] font-semibold text-mist transition hover:bg-white/[0.07]"
              onClick={() => {
                if (window.confirm("清空全部译文？源文和时轴保留。")) {
                  setCues((prev) => prev.map((c) => ({ ...c, tgt: "" })));
                }
              }}
            >
              清空译文
            </button>
          </div>
        </>
      )}
    </div>
  );
}
