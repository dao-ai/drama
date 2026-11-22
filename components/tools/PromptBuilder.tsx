"use client";

import { useMemo, useState } from "react";

const STYLE =
  "vertical 9:16 cinematic keyframe, semi-realistic Chinese urban drama animation, glossy skin, detailed fabric, volumetric light, shallow depth of field, subtle film grain";
const NEG =
  "extra fingers, deformed hands, text artifacts, watermark, duplicate face, plastic skin, overexposed, wide-angle distortion";

type Character = {
  id: string;
  name: string;
  body: string;
  expr: string[];
};

const CHARS: Character[] = [
  {
    id: "sunian",
    name: "苏念 · 女主",
    body: "Su Nian, 24-year-old Chinese woman, cold pale skin, long straight center-parted black hair, small mole at the outer corner of her right eye, red lips, silver band ring on her left ring finger, white mermaid wedding dress with bare shoulders",
    expr: [
      "polite fake smile, eyes not smiling",
      "cold blank stare, chin slightly lifted",
      "composure cracking, eyes red, tears held back",
    ],
  },
  {
    id: "luzhi",
    name: "陆执 · 男主",
    body: "Lu Zhi, 27-year-old Chinese man, 185 cm, short slicked-back black hair, high brow ridge, faint scar on his left eyebrow tail, dark grey three-piece suit with black shirt, no glasses, cold expression",
    expr: [
      "cold neutral expression",
      "faint mocking half-smile",
      "controlled anger, jaw tight",
    ],
  },
  {
    id: "sumanman",
    name: "苏曼曼 · 反派",
    body: "Su Manman, 22-year-old Chinese woman, chestnut-brown long wavy hair, tear mole under her right eye, pink satin evening gown, diamond earrings",
    expr: [
      "sweet harmless smile",
      "crying face, mascara smeared",
      "cold cruel smile, eyes dry",
    ],
  },
  {
    id: "suguoqiang",
    name: "苏国强 · 父亲",
    body: "Su Guoqiang, 52-year-old Chinese man, balding crown, gold-rimmed glasses, dark charcoal suit, agarwood bead bracelet on his left wrist",
    expr: [
      "authoritative frown",
      "furious shouting, veins bulging",
      "guilty panic, eyes darting",
    ],
  },
];

const EXPR_LABEL = ["假笑 / 常态", "冷脸 / 压迫", "破防 / 失控"];

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return { copied, copy };
}

export default function PromptBuilder() {
  const [charId, setCharId] = useState(CHARS[0].id);
  const [type, setType] = useState("turn");
  const [exprIndex, setExprIndex] = useState(0);

  const char = CHARS.find((c) => c.id === charId) ?? CHARS[0];

  const prompt = useMemo(() => {
    let body: string;
    if (type === "turn") {
      body =
        "character turnaround sheet, full body, front view, three-quarter view, side view, back view, neutral standing pose, " +
        char.body +
        ", plain light grey studio background, even soft lighting, no props, consistent proportions, high detail face";
    } else if (type === "bust") {
      body =
        "bust portrait, " +
        char.body +
        ", " +
        char.expr[exprIndex] +
        ", plain dark grey background, soft key light";
    } else {
      body =
        char.body +
        ", full body, standing in a grand hotel banquet hall with crystal chandeliers, warm gold ambient light, cinematic composition";
    }
    return STYLE + ",\n" + body;
  }, [char, type, exprIndex]);

  const main = useCopy();
  const neg = useCopy();

  return (
    <div className="tool">
      <h3>角色提示词拼装</h3>
      <p className="hint">选择角色与用途，自动套用统一风格前缀与外貌锚点。</p>
      <div className="fields">
        <div className="field">
          <label htmlFor="pg-char">角色</label>
          <select
            id="pg-char"
            value={charId}
            onChange={(e) => setCharId(e.target.value)}
          >
            {CHARS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="pg-type">用途</label>
          <select
            id="pg-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="turn">三视图（角色锁定）</option>
            <option value="bust">半身表情（三档）</option>
            <option value="scene">全身入戏（场景镜头）</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="pg-expr">表情档（半身用）</label>
          <select
            id="pg-expr"
            value={exprIndex}
            disabled={type !== "bust"}
            style={{ opacity: type === "bust" ? 1 : 0.45 }}
            onChange={(e) => setExprIndex(Number(e.target.value))}
          >
            {char.expr.map((_, i) => (
              <option key={i} value={i}>
                表情 {i + 1} · {EXPR_LABEL[i]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="codebox" style={{ marginTop: 18 }}>
        <button className="copy" onClick={() => main.copy(prompt)}>
          {main.copied ? "已复制 ✓" : "复制"}
        </button>
        <pre>
          <code>{prompt}</code>
        </pre>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "110px 1fr",
          gap: 14,
          alignItems: "start",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "var(--dim)",
            letterSpacing: ".08em",
            paddingTop: 14,
          }}
        >
          负向提示词
        </div>
        <div className="codebox" style={{ marginTop: 8 }}>
          <button className="copy" onClick={() => neg.copy(NEG)}>
            {neg.copied ? "已复制 ✓" : "复制"}
          </button>
          <pre>
            <code>{NEG}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
