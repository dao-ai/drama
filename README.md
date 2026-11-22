# 漫剧工坊 · 竖屏漫剧制作教学站

Next.js 16（App Router）+ TypeScript，静态导出（`output: export`），部署在 GitHub Pages。讲的是竖屏漫剧从立项到分发的完整生产流程，附可用的计算与报价工具。

线上地址：https://dao-ai.github.io/drama/

## 本地开发

```bash
npm install
npm run dev       # http://127.0.0.1:4180
```

## 构建与预览

```bash
npm run build     # 产出 out/
npm run preview   # 用静态服务器跑 out/，4180
```

## 部署

推送到 `main` 后由 GitHub Actions（`.github/workflows/deploy.yml`）自动构建并发布到 Pages。

构建时注入 `NEXT_PUBLIC_BASE_PATH=/drama`，对应 `https://dao-ai.github.io/drama/`。如果换仓库名或自定义域名，改这个环境变量和 `next.config.mjs` 的 basePath 即可。

## 路由

| 路由 | 内容 |
|---|---|
| `/` | 首页：八阶段总览、三条铁律、E1 案例、七天样片计划 |
| `/workflow/` | 八阶段详解、阶段交接物、成本结构 |
| `/story/` | 单集六拍、节拍时间码生成器、前三集法则、钩子清单 |
| `/visual/` | 三层锁定法、锚点、三视图、提示词拼装器 |
| `/storyboard/` | A/B/C 镜头分级、动效菜单、成本计算器 |
| `/tools/` | AI 工具选型：文本/图像/视频/语音对比、三档组合、三镜测试法 |
| `/resources/` | 学习资源：外部教程、官方工具、海外课程，带标签与点评 |
| `/checklist/` | 36 项上线检查，localStorage 保存 |
| `/quote/` | 制作报价单：明细、合计、打印/PDF、下载 CSV |
| `/projects/` | 报价库：保存的方案、多版本对比、删除 |

## 数据说明

全站无后端：

- 检查表、报价库、翻译工作台草稿都存在浏览器 `localStorage`
- 报价单参数走 URL，可分享、可刷新
- 换设备或清缓存会丢数据；需要多端同步再接后端

## 样式
- Tailwind CSS v4（PostCSS 插件），设计 token 定义在 `app/globals.css` 的 `@theme` 里
- 首页、导航、页脚、学习资源卡片已全部使用 utility class；长文排版、表格、工具面板等剩余样式收在 `@layer components`，按页逐步迁

## 样式守则

- 视觉样式一律用 Tailwind utility；`app/globals.css` 只保留 token、base、容器、`.doc-main` 排版、手机 mock、打印
- 新增自定义组件类会被 `scripts/check-css.mjs` 拦下（白名单在脚本顶部）
- `npm run build` 前会自动跑 `prebuild` 校验；本地可单独跑 `npm run lint:css`
- 确需新增组件类：先改 ALLOWED 并写明原因，再提交

## 结构

- `app/*/page.tsx` 路由页面
- `components/tools/` BeatPlanner / PromptBuilder / CostCalculator / Checklist
- `components/` SiteNav、QuoteView、ProjectList、ProjectsClient、ClientFX 等
- `lib/estimate.ts` 计价模型（页面、CSV 共用）
- `lib/local-projects.ts` 报价库本地存储
- `lib/srt.ts` 字幕解析与检查（翻译工作台预留，尚未接入页面）
- `app/globals.css` 全站样式与 A4 打印样式

## 内容来源

八阶段 SOP、角色锁定提示词、分镜表与成本口径来自实际短剧项目的制作文档整理。
