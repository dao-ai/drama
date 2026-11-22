# 漫剧工坊 · Next.js 版

竖屏漫剧制作教学站，Next.js 16（App Router）+ TypeScript，全站静态预渲染。

## 开发
```bash
cd web
npm install
npm run dev     # http://127.0.0.1:4180
```

## 构建与生产
```bash
npm run build
npm run start   # 4180
```

## 路由
| 路由 | 内容 |
|---|---|
| `/` | 首页：八阶段总览、三条铁律、E1 案例、七天样片计划 |
| `/workflow` | 八阶段详解、阶段交接物、成本结构 |
| `/story` | 单集六拍、节拍时间码生成器、前三集法则、钩子清单 |
| `/visual` | 三层锁定法、锚点、三视图、提示词拼装器 |
| `/storyboard` | A/B/C 镜头分级、动效菜单、成本计算器 |
| `/checklist` | 36 项上线检查，localStorage 保存 |

## 结构
- `app/*/page.tsx` 六个路由，服务端组件，内容静态渲染
- `components/tools/` 四个交互组件（client）：BeatPlanner / PromptBuilder / CostCalculator / Checklist
- `components/ClientFX.tsx` 渐进增强：滚动浮现、目录高亮、复制、折叠
- `app/globals.css` 全站样式，沿用原静态站设计
- `../site/` 原纯静态版本，保留作对照与降级

## 数据
内容来自 `../pipeline/playbook.md`、`../prompts/`、`../storyboard/S01E01.md`。
成本计算器默认单价为占位示例，接供应商报价后替换 `components/tools/CostCalculator.tsx` 的 initial 数组。
