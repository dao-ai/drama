// 防止组件类回潮：globals.css 只允许保留容器、排版、手机 mock 与打印样式。
// 新增视觉样式请用 Tailwind utility；确有必要时，把类名加进 ALLOWED 并说明原因。
import { readFileSync } from "node:fs";

const ALLOWED = new Set([
  "js",
  "wrap",
  "doc-main",
  "sub", // 文档副标题（.doc-main .sub）
  "progress",
  "rv",
  // phone mock 内部
  "on",
  "in",
]);

const raw = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/^@import.*$/gm, "");
const css = raw;

const found = new Map();
const re = /\.(-?[_a-zA-Z][\w-]*)/g;
for (const m of css.matchAll(re)) {
  const name = m[1];
  if (!found.has(name)) {
    const line = css.slice(0, m.index).split("\n").length;
    found.set(name, line);
  }
}

const extra = [...found].filter(([name]) => !ALLOWED.has(name));
if (extra.length) {
  console.error("globals.css 里出现了不在白名单的自定义类：");
  for (const [name, line] of extra) {
    console.error("  ." + name + "  (line " + line + ")");
  }
  console.error("");
  console.error("新增样式请用 Tailwind utility；确需保留组件类，请更新 scripts/check-css.mjs 的 ALLOWED 并写明原因。");
  process.exit(1);
}

console.log("css guard ok: " + found.size + " classes, all allowed");
