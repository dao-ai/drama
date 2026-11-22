# 漫剧工坊 · 竖屏漫剧制作教学站

Next.js 16（App Router）+ TypeScript，全站静态预渲染，附成本与报价工具。讲的是竖屏漫剧从立项到分发的完整生产流程。

## 本地运行

```bash
npm install
npm run dev     # http://127.0.0.1:4180
```

## 构建与生产

```bash
npm run build
npm run start   # 4180
```

## 部署

Vercel 导入仓库，Root Directory 保持默认，Build Command 用 `npm run build`。

注意：报价库当前用 `data/estimates.json` 文件存储，Serverless 环境文件系统只读/临时，部署后保存会失败。要上线用，把 `lib/store.ts` 换成 Vercel Postgres / Supabase 即可，接口不用改。

## 路由

| 路由 | 内容 |
|---|---|
| `/` | 首页：八阶段总览、三条铁律、E1 案例、七天样片计划 |
| `/workflow` | 八阶段详解、阶段交接物、成本结构 |
| `/story` | 单集六拍、节拍时间码生成器、前三集法则、钩子清单 |
| `/visual` | 三层锁定法、锚点、三视图、提示词拼装器 |
| `/storyboard` | A/B/C 镜头分级、动效菜单、成本计算器 |
| `/checklist` | 36 项上线检查，localStorage 保存 |
| `/quote` | 制作报价单：明细、合计、打印/PDF、下载 CSV |
| `/projects` | 报价库：保存的方案、多版本对比、删除 |
| `/api/estimate` | GET/POST 成本估算，支持 `format=csv` |
| `/api/projects` | GET 列表 / POST 保存 / DELETE 删除 |

## 结构

- `app/*/page.tsx` 路由页面（服务端组件，内容静态渲染）
- `components/tools/` 交互组件：BeatPlanner / PromptBuilder / CostCalculator / Checklist
- `components/` 导航、页脚、ClientFX、报价库列表、保存按钮
- `lib/estimate.ts` 计价模型（页面、API、CSV 共用）
- `lib/store.ts` 报价文件存储
- `lib/srt.ts` 字幕解析与检查（翻译工作台预留，尚未接入页面）
- `app/globals.css` 全站样式与 A4 打印样式

## 内容来源

八阶段 SOP、角色锁定提示词、分镜表与成本口径来自实际短剧项目的制作文档整理。
