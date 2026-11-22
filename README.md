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
| `/quote` | 制作报价单：明细、合计、打印/PDF、下载 CSV（不在导航中） |
| `/api/estimate` | GET/POST 成本估算，支持 `format=csv` 导出 |
| `/projects` | 报价库：保存的方案、多版本对比、删除 |
| `/api/projects` | GET 列表 / POST 保存 / DELETE 删除（`data/estimates.json`） |

## 报价单与 API
- 分镜页计算器底部「生成报价单」→ `/quote?frames=…&episodes=…`，参数直接进 URL，可分享/收藏
- 报价页支持浏览器打印或存 PDF（A4 打印样式已处理），也提供 CSV 下载（带 BOM，Excel 直接打开）
- API：
  ```bash
  curl "http://127.0.0.1:4180/api/estimate?frames=36&episodes=80"
  curl -X POST -H 'content-type: application/json' -d '{"frames":40,"episodes":60}' \
       http://127.0.0.1:4180/api/estimate
  curl -OJ "http://127.0.0.1:4180/api/estimate?format=csv"
  ```
- 计价逻辑集中在 `lib/estimate.ts`，页面、API、CSV 共用一套计算，改单价只改一处

## 报价库
- 报价页「保存到报价库」→ 写入 `web/data/estimates.json`（已 gitignore）
- `/projects` 勾选 2–3 个方案对比，第一个勾选为基准，成本项显示百分比差异
- 文件存储 + 串行写入，适合单机单用户；多实例或多人需要换 SQLite/Postgres
- 最多保留 200 条，超出丢弃最旧

## 结构
- `app/*/page.tsx` 六个路由，服务端组件，内容静态渲染
- `components/tools/` 四个交互组件（client）：BeatPlanner / PromptBuilder / CostCalculator / Checklist
- `components/ClientFX.tsx` 渐进增强：滚动浮现、目录高亮、复制、折叠
- `app/globals.css` 全站样式，沿用原静态站设计
- `../site/` 原纯静态版本，保留作对照与降级

## 数据
内容来自 `../pipeline/playbook.md`、`../prompts/`、`../storyboard/S01E01.md`。
成本计算器默认单价为占位示例，接供应商报价后替换 `components/tools/CostCalculator.tsx` 的 initial 数组。
