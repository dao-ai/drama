"use client";

import { useEffect, useMemo, useState } from "react";

type Group = { key: string; title: string; icon: string; items: string[] };

const GROUPS: Group[] = [
  {
    key: "sample",
    title: "样片验证（D1–D7）",
    icon: "🧪",
    items: [
      "D1 一页纸企划已定：平台、对标 3 部、logline、受众、预算上限写清",
      "D2 人物小传 + 前三集大纲 + E1 镜头级剧本完成，可直接拆分镜",
      "D3 风格测试 3 镜通过，统一风格前缀写死，不再逐集即兴改画风",
      "D4 主演三视图与锚点确认，参考图与 seed 已锁定进角色卡",
      "D5 关键帧完成 ≥80%，每张记录模型 / 参数 / 耗时 / 费用",
      "D6 仅 A 级镜头生视频，配音、音效与 2D 动效粗剪成型",
      "D7 精剪、字幕、封面导出，成本表与改进清单已复盘",
    ],
  },
  {
    key: "script",
    title: "剧本",
    icon: "✍️",
    items: [
      "前 3 秒有冲突、异常或强反差，且不依赖上一集",
      "主角身份与动机在本集内各交代一次",
      "每集结尾的扣指向下一集的具体事件（人/事/物）",
      "每 15–20 秒有一次信息增量，没有重复台词",
      "至少一句可被截图传播的台词",
      "台词已朗读过，单句不超过 20 字，无书面腔",
    ],
  },
  {
    key: "visual",
    title: "视觉开发",
    icon: "🎨",
    items: [
      "统一风格前缀已写死，全剧所有提示词一致",
      "每个主演出过四视图，肩宽/头身比/眼距一致",
      "角色锚点齐备且左右正确（痣、疤、戒指、手串）",
      "每个主演有 3 档表情参考图（常态/压迫/破防）",
      "主要场景有空白底板，可复用换光",
      "参考图与 seed 已写入角色卡，生成时不再改动",
    ],
  },
  {
    key: "shot",
    title: "分镜与生成",
    icon: "🎬",
    items: [
      "分镜表七列齐全，可直接派活",
      "A 级镜头不超过总镜数的 30%",
      "大屏/转账/聊天界面全部走平面，不做生成",
      "所有关键帧通过一致性、手部、人脸三项验收",
      "视频单段 3–6 秒，时长够剪且不浪费",
      "生成记录表完整（镜号/模型/seed/耗时/费用）",
      "返工率在 20–40% 区间，未通过的不混进正片",
    ],
  },
  {
    key: "audio",
    title: "音频",
    icon: "🔊",
    items: [
      "角色音色表已定，同一角色全剧同一音色",
      "配音按镜号分段，情绪标注与画面同向",
      "BGM 有情绪分类，反转处有留白或断点",
      "音效点已标（纸张/椅子/快门/电流/心跳）",
      "混音：对白 -6dB 基准，BGM ducking 生效，峰值 ≤ -1dBTP",
    ],
  },
  {
    key: "edit",
    title: "剪辑包装",
    icon: "✂️",
    items: [
      "单镜 2–5 秒，无超过 6 秒的静止镜头",
      "反转处有静音一拍或节奏断点",
      "字幕在安全区内，单行 ≤ 14 字，无溢出",
      "全剧字体、字号、描边统一",
      "封面与标题含冲突句或身份反差",
      "导出 1080×1920，25/30fps 统一，命名规范",
    ],
  },
  {
    key: "launch",
    title: "上线与复盘",
    icon: "📈",
    items: [
      "准备 3 版封面/标题用于 A/B 测试",
      "发布前用手机外放完整看一遍（不是戴耳机）",
      "3s 完播、完播率、追更率已记录",
      "掉量集已定位到具体秒数与镜号",
      "下一批改进项具体到「哪一集哪一镜怎么改」",
      "投流预算与回收模型已确认，未超制作预算",
    ],
  },
];

const KEY = "manju-checklist-v1";

export default function Checklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(done));
    } catch {}
  }, [done, loaded]);

  const total = useMemo(() => GROUPS.reduce((n, g) => n + g.items.length, 0), []);
  const count = useMemo(
    () =>
      GROUPS.reduce(
        (n, g) => n + g.items.filter((_, i) => done[g.key + "-" + i]).length,
        0
      ),
    [done]
  );

  const toggle = (k: string) => setDone((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <>
      <div className="mb-6 mt-1 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-md bg-white/[0.07]">
          <i
            className="block h-full rounded-md bg-gradient-to-r from-flame to-gold transition-[width] duration-300"
            style={{ width: (count / total) * 100 + "%" }}
          />
        </div>
        <b className="whitespace-nowrap text-sm tabular-nums text-gold">
          {count} / {total} 项完成
        </b>
        <button
          className="rounded-lg border border-white/15 bg-transparent px-3.5 py-1.5 text-[13px] text-mist transition hover:bg-white/5"
          onClick={() => setDone({})}
        >
          重置
        </button>
      </div>

      {GROUPS.map((g) => {
        const c = g.items.filter((_, i) => done[g.key + "-" + i]).length;
        return (
          <section key={g.key} className="p-0">
            <h2 id={"g-" + g.key}>{g.title}</h2>
            <div className="mb-4 overflow-hidden rounded-2xl border border-line bg-panel">
              <div className="flex items-center gap-2.5 bg-white/[0.03] px-5 py-3.5 text-[15px] font-bold">
                <span>{g.icon}</span>
                {g.title}
                <span className="ml-auto text-xs tabular-nums text-muted">
                  {c}/{g.items.length}
                </span>
              </div>
              <div className="px-2.5 pb-3 pt-2">
                {g.items.map((t, i) => {
                  const k = g.key + "-" + i;
                  return (
                    <label
                      className="flex cursor-pointer items-start gap-[11px] rounded-lg px-2.5 py-2.5 text-[14.5px] text-[#c6c2cd] transition hover:bg-white/[0.035]"
                      key={k}
                    >
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={!!done[k]}
                        onChange={() => toggle(k)}
                      />
                      <span className="mt-1 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] border-[1.5px] border-white/25 text-[11px] text-transparent transition peer-checked:border-flame peer-checked:bg-flame peer-checked:text-white">
                        ✓
                      </span>
                      <span className="leading-relaxed peer-checked:text-dim peer-checked:line-through">
                        {t}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
