import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "学习资源",
  description:
    "漫剧与 AI 短剧的学习资源清单：中文全流程教程、视频课、官方文档、海外课程与社区，带标签和一句话点评。",
};

type Item = {
  title: string;
  href: string;
  tags: string[];
  note: string;
  best: string;
};

const CN_TEXT: Item[] = [
  {
    title: "AI 漫剧怎么做？零基础 7 天完整教程",
    href: "https://zhuanlan.zhihu.com/p/2071923064758183746",
    tags: ["免费", "中文", "图文", "云端"],
    note: "选题 → 剧本 → 分镜 → 角色 → 生成 → 剪辑 → 发布，一张完整地图。文中带工具推广，注意甄别。",
    best: "第一次了解全流程",
  },
  {
    title: "2026 零基础本地 AI 漫剧完整实操",
    href: "https://developer.aliyun.com/article/1753591",
    tags: ["免费", "中文", "图文", "本地"],
    note: "Qwen 写分镜 + ComfyUI 锁角色 + LTX 图生微动画 + 本地 TTS + ffmpeg 合成，8G 显卡可跑。",
    best: "想完全本地化、零 API 成本",
  },
  {
    title: "一场戏走完 6 道工序",
    href: "https://developer.cloud.tencent.cn/article/2754229",
    tags: ["免费", "中文", "图文"],
    note: "少见地强调每步验收标准和退回机制，思路和本站最接近。",
    best: "想建立验收意识",
  },
  {
    title: "AI 漫剧全流程实战：剧本改编、分镜与本地生成",
    href: "https://developer.aliyun.com/article/1771007",
    tags: ["免费", "中文", "图文", "本地"],
    note: "含可直接复制的提示词、分镜拆解和合规避坑，工程味重。",
    best: "动手前找提示词模板",
  },
];

const CN_VIDEO: Item[] = [
  {
    title: "全 37 集：AI 漫剧制作教程合集",
    href: "https://www.bilibili.com/video/BV1ExyazDE4p/",
    tags: ["免费", "中文", "视频"],
    note: "操作演示完整，适合跟着做一遍；倍速看，跳过闲聊段落。",
    best: "看别人怎么点按钮",
  },
];

const OFFICIAL: Item[] = [
  {
    title: "Runway Academy",
    href: "https://academy.runwayml.com/",
    tags: ["免费", "英文", "视频/图文"],
    note: "镜头语言、运镜、AI 视频基础讲得扎实，不限于 Runway 自家工具。",
    best: "补镜头语言，不只学工具",
  },
  {
    title: "即梦 AI",
    href: "https://jimeng.jianying.com/",
    tags: ["官方", "中文", "云端"],
    note: "中文场景和文字生成强，帮助中心更新快；适合关键帧批量与封面物料。",
    best: "中文出图与素材",
  },
  {
    title: "可灵 AI",
    href: "https://klingai.com/",
    tags: ["官方", "中文", "云端"],
    note: "人物动作和镜头语言稳，首尾帧好用；官方社区有大量实操案例。",
    best: "A 级镜头生成",
  },
  {
    title: "新片场",
    href: "https://www.xinpianchang.com/",
    tags: ["中文", "社区/课程"],
    note: "影视创作者社区，有付费课程和大量成片案例，适合补传统视听语言。",
    best: "看行业成片与制作幕后",
  },
];

const OVERSEAS: Item[] = [
  {
    title: "Curious Refuge",
    href: "https://curiousrefuge.com/",
    tags: ["付费", "英文", "课程"],
    note: "体系化的 AI 电影制作课程，从提示词到成片项目制，价格不低。",
    best: "想系统学 AI 影视制作",
  },
  {
    title: "Civitai",
    href: "https://civitai.com/",
    tags: ["免费", "英文", "社区"],
    note: "模型、LoRA、工作流和参数都在这里；部分网络环境访问不稳。",
    best: "找角色 LoRA 与 ComfyUI 工作流",
  },
];

function Group({ title, kicker, items }: { title: string; kicker: string; items: Item[] }) {
  return (
    <section style={{ padding: "0 0 8px" }}>
      <div className="kicker" style={{ marginBottom: 10 }}>{kicker} · {title}</div>
      <div className="res-list">
        {items.map((it) => (
          <a className="res-item" key={it.href} href={it.href} target="_blank" rel="noreferrer">
            <div className="res-top">
              <h3>{it.title}</h3>
              <span className="res-go">↗</span>
            </div>
            <div className="res-tags">
              {it.tags.map((t) => (
                <span className="pill" key={t}>{t}</span>
              ))}
            </div>
            <p>{it.note}</p>
            <div className="res-best">适合：{it.best}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <div className="wrap doc">
      <aside className="toc">
        <div className="t">本页目录</div>
        <a href="#how">怎么用这份清单</a>
        <a href="#cn-text">中文 · 全流程图文</a>
        <a href="#cn-video">中文 · 视频</a>
        <a href="#official">官方工具</a>
        <a href="#overseas">海外课程与社区</a>
        <a href="#filter">四条筛选手册</a>
        <a href="#gap">还缺什么</a>
      </aside>

      <div className="doc-main">
        <h1>学习资源</h1>
        <p className="sub">
          外部教程很多，但质量参差、更新快、常带引流。这里只留有明确产出的，按用途分组，每条给一句话点评。
        </p>
        <p style={{ color: "var(--dim)", fontSize: 13 }}>
          更新于 2026-11-22 · 链接和内容可能变化，打不开时按标题搜索
        </p>

        <h2 id="how">怎么用这份清单</h2>
        <ol>
          <li><b>先建立地图</b>：读一篇全流程图文，不求记住操作，只求知道有哪几道工序。</li>
          <li><b>再做一遍</b>：跟一个视频系列做 1 分钟样片，允许做得丑，重点是跑通。</li>
          <li><b>然后验收</b>：用 <Link href="/tools" style={{ color: "var(--gold)" }}>三镜测试</Link> 和 <Link href="/checklist" style={{ color: "var(--gold)" }}>上线清单</Link> 检查，找出卡点。</li>
          <li><b>最后算账</b>：把单价填进 <Link href="/storyboard#calc" style={{ color: "var(--gold)" }}>成本计算器</Link>，再决定要不要批量。</li>
        </ol>
        <div className="note">
          <span className="label">提醒</span>
          教程里的「一键成片」通常只适合验证，不适合量产。真做 80 集，卡人的不是生成，是<b>一致性、返工和排期</b>。
        </div>

        <h2 id="cn-text">中文 · 全流程图文</h2>
        <Group title="先把流程跑通" kicker="Free · Chinese" items={CN_TEXT} />

        <h2 id="cn-video">中文 · 视频</h2>
        <Group title="跟着做一遍" kicker="Video" items={CN_VIDEO} />

        <h2 id="official">官方工具</h2>
        <Group title="更新最快，但只讲自家" kicker="Official" items={OFFICIAL} />

        <h2 id="overseas">海外课程与社区</h2>
        <Group title="体系和资源更深" kicker="English" items={OVERSEAS} />

        <h2 id="filter">四条筛选手册</h2>
        <div className="grid grid-2">
          <div className="card">
            <h3>① 看有没有验收标准</h3>
            <p>只说「这样效果更好」的是经验；说「过不了就退回哪一步」的才是流程。</p>
          </div>
          <div className="card">
            <h3>② 看有没有成本口径</h3>
            <p>不提单价、返工率、单集成本的教程，学完也不知道能不能量产。</p>
          </div>
          <div className="card">
            <h3>③ 看发布日期</h3>
            <p>AI 工具三个月一代。2024 年的工作流放到 2026 年，参数基本要重调。</p>
          </div>
          <div className="card">
            <h3>④ 看有没有带货</h3>
            <p>不是不能看，是要把「工具推荐」和「方法」分开，方法可以学，工具自己比价。</p>
          </div>
        </div>

        <h2 id="gap">还缺什么</h2>
        <p>
          现有内容集中在「怎么操作」和「怎么变现」，缺三样：<b>可验收的流程</b>、<b>可复用的角色资产</b>、<b>真实的成本模型</b>。
          这三样正好是本站的重点：<Link href="/workflow" style={{ color: "var(--gold)" }}>八阶段关卡</Link>、
          <Link href="/visual" style={{ color: "var(--gold)" }}>角色锁定</Link>、
          <Link href="/storyboard#calc" style={{ color: "var(--gold)" }}>成本计算</Link>。
        </p>
        <div className="note">
          <span className="label">建议</span>
          别收藏一堆教程。选一条主线，做出 1 分钟样片，再回来对清单——这比看完 37 集更有用。
        </div>
      </div>
    </div>
  );
}
