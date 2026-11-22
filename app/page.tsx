import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "漫剧工坊 · 竖屏漫剧制作教学",
  description: "从 logline 到 80 集成片：竖屏漫剧的八阶段生产流程、剧本节拍、角色锁定、分镜与成本计算。",
};

const stages = [
  { no: "S0", icon: "🎯", title: "立项", desc: "赛道、平台、预算、形态。一页纸决定这剧值不值得做。", href: "/workflow#s0" },
  { no: "S1", icon: "✍️", title: "剧本", desc: "logline → 人物小传 → 分集大纲 → 单集剧本。前三集定生死。", href: "/story" },
  { no: "S2", icon: "🎨", title: "视觉开发", desc: "画风、三视图、角色锚点、场景底板。一致性优先于精致度。", href: "/visual" },
  { no: "S3", icon: "🎬", title: "分镜", desc: "镜号、时长、景别、台词、动效方式。分镜就是预算表。", href: "/storyboard" },
  { no: "S4", icon: "🧩", title: "生成", desc: "风格测试 → 锁 seed → 批量关键帧 → 只给必要的镜头做视频。", href: "/storyboard#gen" },
  { no: "S5", icon: "🔊", title: "音频", desc: "音色表、语速、情绪、BGM、音效、混音。声音决定「贵不贵」。", href: "/workflow#s5" },
  { no: "S6", icon: "✂️", title: "剪辑包装", desc: "前 3 秒、字幕安全区、封面标题。成片在这里定型。", href: "/workflow#s6" },
  { no: "S7", icon: "📈", title: "分发复盘", desc: "完播、追更、付费、ROI。掉量要能归因到具体结构。", href: "/workflow#s7" },
];

const principles = [
  {
    icon: "🪝",
    title: "钩子先行",
    desc: "前 3 秒没有冲突或异常，后面拍得再好也没人看。每集结尾必须留扣，且这个扣要指向下一集的具体事件，不是「欲知后事如何」。",
  },
  {
    icon: "🧬",
    title: "一致性优先于精致度",
    desc: "观众能忍受画风普通，不能忍受女主每集换一张脸。角色锚点（痣、疤、戒指）+ 固定 seed + 参考图，比堆参数有用。",
  },
  {
    icon: "🧪",
    title: "先样片，再批量",
    desc: "用 1 集验证画风、一致性、单集成本。样片成本 × 集数 ≤ 预算，才允许开机。否则做到第 20 集才发现超支，只能砍质量。",
  },
];

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2.5 text-xs font-bold uppercase tracking-[0.2em] text-flame">{children}</div>
  );
}

function SectionHead({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rv mb-8 max-w-[760px]">
      <Kicker>{kicker}</Kicker>
      <h2 className="m-0 mb-3 text-[clamp(26px,3vw,38px)] font-bold leading-tight tracking-[-0.02em]">{title}</h2>
      <p className="m-0 text-base text-muted">{children}</p>
    </div>
  );
}

export default function Page() {
  return (
    <main className="wrap">
      <section className="grid gap-9 py-[52px] pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:py-[76px]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-[5px] text-xs uppercase tracking-[0.18em] text-gold">
            竖屏 1080×1920 · AI 辅助生产
          </div>
          <h1 className="m-0 mb-5 text-[clamp(34px,4.4vw,58px)] font-extrabold leading-[1.14] tracking-[-0.02em]">
            从一句 logline
            <br />
            到 <em className="bg-gradient-to-r from-[#ff6b5e] via-flame to-gold bg-clip-text not-italic text-transparent">80 集成片</em>
          </h1>
          <p className="m-0 mb-8 max-w-[620px] text-[17.5px] text-[#b9b5c1]">
            漫剧不是「画得好看」就行。它是一条工业流水线：剧本 → 视觉开发 → 分镜 → 生成 → 音频 → 剪辑 → 分发。这个站把每个阶段的
            <strong>输入、产出、关卡和成本</strong>拆开给你看，附可用的提示词与计算器。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-gradient-to-br from-[#e8544f] to-[#c3332f] px-[22px] py-3 text-[15px] font-semibold text-white shadow-[0_10px_26px_rgba(224,67,63,0.28)] transition hover:-translate-y-px hover:shadow-[0_14px_32px_rgba(224,67,63,0.36)]" href="/workflow">开始八阶段 →</Link>
            <a className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-[22px] py-3 text-[15px] font-semibold text-mist transition hover:bg-white/[0.07]" href="#case">看一集怎么落地</a>
          </div>
        </div>
        <div>
          <div className="phone">
            <div className="screen">
              <span className="tag">EP 01</span>
              <span className="frame-label">9:16 · 00:04</span>
              <div className="look">苏念 · 近景</div>
              <div className="line">
                「愿意。
                <br />
                愿意请大家看个东西。」
              </div>
              <div className="sub">婚礼现场 · 第 8 镜 · 4s</div>
              <div className="bar"><i /></div>
            </div>
          </div>
        </div>
      </section>

      <div className="rv mt-[26px] mb-2.5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        <div className="bg-ink-soft p-5">
          <b className="block text-2xl font-extrabold tracking-[-0.01em]">8</b>
          <span className="text-xs text-muted">生产阶段，每段都有验收关卡</span>
        </div>
        <div className="bg-ink-soft p-5">
          <b className="block text-2xl font-extrabold tracking-[-0.01em]">25–45</b>
          <span className="text-xs text-muted">单集镜头数（漫剧预算区间）</span>
        </div>
        <div className="bg-ink-soft p-5">
          <b className="block text-2xl font-extrabold tracking-[-0.01em]">
            20–40<em className="ml-0.5 text-sm font-semibold not-italic text-gold">%</em>
          </b>
          <span className="text-xs text-muted">预算里必须留出的返工率</span>
        </div>
        <div className="bg-ink-soft p-5">
          <b className="block text-2xl font-extrabold tracking-[-0.01em]">
            60–120<em className="ml-0.5 text-sm font-semibold not-italic text-gold">s</em>
          </b>
          <span className="text-xs text-muted">单集时长，首集可到 150s</span>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <SectionHead kicker="Pipeline" title="八阶段流水线">
          顺序不能乱。上游一个错误，下游要花十倍返工。每个阶段只对一件事负责。
        </SectionHead>
        <div className="rv mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {["立项", "剧本", "视觉开发", "分镜", "生成", "音频", "剪辑包装", "分发复盘"].map((name, i) => (
            <div className="relative rounded-xl border border-line bg-ink-soft px-2.5 py-3.5 text-center" key={name}>
              <b className="mb-1 block text-xs tracking-[0.08em] text-gold">S{i}</b>
              <span className="text-xs text-muted">{name}</span>
              {i < 7 && (
                <span className="absolute -right-[7px] top-1/2 hidden h-px w-1.5 bg-white/15 lg:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-[26px] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s) => (
            <Link className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px] rv group relative" href={s.href} key={s.no}>
              <span className="absolute right-[18px] top-4 text-xs font-extrabold tracking-widest text-dim transition group-hover:text-flame">
                {s.no}
              </span>
              <div className="ico">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <SectionHead kicker="Principles" title="三条铁律，先记住再开工">
          这三条能挡掉 80% 的废片。它们不是审美问题，是成本问题。
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px] rv" key={p.title}>
              <div className="ico">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="case" className="py-12 sm:py-16">
        <SectionHead kicker="Case · EP01" title="一集是怎么做出来的">
          用样片《退婚夜，我直播爆了豪门黑料》第一集拆一遍：137 秒、36 镜、4 个场景、6 个主要角色。
        </SectionHead>

        <div className="my-[18px] mb-6 overflow-x-auto rounded-2xl border border-line [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_th]:bg-white/[0.04] [&_th]:px-3.5 [&_th]:py-[11px] [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.06em] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:px-3.5 [&_td]:py-[11px] [&_td]:text-left [&_td]:align-top [&_tbody_tr:hover]:bg-white/[0.02] [&_tr:last-child_td]:border-0 [&_td.num]:whitespace-nowrap [&_td.num]:tabular-nums rv">
          <table>
            <thead><tr><th>环节</th><th>本集做法</th><th>省成本的关键动作</th></tr></thead>
            <tbody>
              <tr><td><b>剧本</b></td><td>36 镜分镜脚本，单集 137 秒，结尾扣「B 计划」</td><td>先写信息点检查表，再写台词</td></tr>
              <tr><td><b>视觉</b></td><td>6 个角色三视图 + 3 档表情，5 张场景底板</td><td>同一批素材跨集复用，不做一次性角色</td></tr>
              <tr><td><b>分镜</b></td><td>36 镜里只有 9 段需要真视频，其余关键帧 + 2D 动效</td><td>大屏内容全做平面图，不生成视频</td></tr>
              <tr><td><b>生成</b></td><td>风格测试 3 镜 → 锁参考图/seed → 40–50 张关键帧</td><td>群像用同一张底图 + 局部动效</td></tr>
              <tr><td><b>后期</b></td><td>配音 + BGM + 9 处音效点，字幕单行 ≤ 14 字</td><td>第 3/15/21/27 句做截图传播点</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rv my-5 rounded-xl border border-gold/30 bg-gold/10 px-[18px] py-4 text-[14.5px] leading-[1.75] text-[#e8dcc4] [&_b]:text-gold">
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] opacity-80">为什么这集能当模板</span>
          <b>强冲突开场 + 当代马甲（爆料号）+ 长线悬念（父母旧案）</b>。三种钩子叠在一集里，任何一类观众都能被抓住一个。但它仍然只用 4 个场景——爽点靠结构，不靠烧钱。
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <SectionHead kicker="First 7 Days" title="七天做出可验证的样片">
          不要一上来写 80 集。先跑完这条闭环，拿到三个数字：单集成本、返工率、完播率。
        </SectionHead>
        <div className="my-[18px] mb-6 overflow-x-auto rounded-2xl border border-line [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_th]:bg-white/[0.04] [&_th]:px-3.5 [&_th]:py-[11px] [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.06em] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:px-3.5 [&_td]:py-[11px] [&_td]:text-left [&_td]:align-top [&_tbody_tr:hover]:bg-white/[0.02] [&_tr:last-child_td]:border-0 [&_td.num]:whitespace-nowrap [&_td.num]:tabular-nums rv">
          <table>
            <thead><tr><th>天</th><th>任务</th><th>当天必须交付</th></tr></thead>
            <tbody>
              <tr><td className="num">D1</td><td>定赛道、平台、对标 3 部，写一页纸企划</td><td>logline + 受众 + 预算上限</td></tr>
              <tr><td className="num">D2</td><td>人物小传 + 前三集大纲 + 第 1 集成稿</td><td>可拍的分镜脚本</td></tr>
              <tr><td className="num">D3</td><td>风格测试 3 镜，选定画风与统一提示词前缀</td><td>风格样张（3 张）</td></tr>
              <tr><td className="num">D4</td><td>角色三视图 + 锚点确认 + 锁 seed</td><td>角色卡（含负向提示词）</td></tr>
              <tr><td className="num">D5</td><td>批量关键帧，记录每张的模型/参数/耗时</td><td>分镜关键帧 80% 完成</td></tr>
              <tr><td className="num">D6</td><td>选镜生视频 + 2D 动效，配音与音效</td><td>粗剪版</td></tr>
              <tr><td className="num">D7</td><td>精剪、字幕、封面，导出并复盘成本</td><td>成片 + 成本表 + 改进清单</td></tr>
            </tbody>
          </table>
        </div>
        <div className="rv mt-4 flex flex-wrap gap-3">
          <Link className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-gradient-to-br from-[#e8544f] to-[#c3332f] px-[22px] py-3 text-[15px] font-semibold text-white shadow-[0_10px_26px_rgba(224,67,63,0.28)] transition hover:-translate-y-px hover:shadow-[0_14px_32px_rgba(224,67,63,0.36)]" href="/storyboard#calc">算一下你的单集成本 →</Link>
          <Link className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-[22px] py-3 text-[15px] font-semibold text-mist transition hover:bg-white/[0.07]" href="/checklist">打开上线检查表</Link>
        </div>
      </section>
    </main>
  );
}
