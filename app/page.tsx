import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "漫剧工坊 · 竖屏漫剧制作教学",
  description: "从 logline 到 80 集成片：竖屏漫剧的八阶段生产流程、剧本节拍、角色锁定、分镜与成本计算。",
};

export default function Page() {
  return (
<main className="wrap">

  <section className="hero">
    <div>
      <div className="eyebrow">竖屏 1080×1920 · AI 辅助生产</div>
      <h1>从一句 logline<br />到 <em>80 集成片</em></h1>
      <p className="lede">漫剧不是「画得好看」就行。它是一条工业流水线：剧本 → 视觉开发 → 分镜 → 生成 → 音频 → 剪辑 → 分发。这个站把每个阶段的<strong>输入、产出、关卡和成本</strong>拆开给你看，附可用的提示词与计算器。</p>
      <div className="btnrow">
        <Link className="btn btn-primary" href="/workflow">开始八阶段 →</Link>
        <a className="btn btn-ghost" href="#case">看一集怎么落地</a>
      </div>
    </div>
    <div>
      <div className="phone">
        <div className="screen">
          <span className="tag">EP 01</span>
          <span className="frame-label">9:16 · 00:04</span>
          <div className="look">苏念 · 近景</div>
          <div className="line">「愿意。<br />愿意请大家看个东西。」</div>
          <div className="sub">婚礼现场 · 第 8 镜 · 4s</div>
          <div className="bar"><i></i></div>
        </div>
      </div>
    </div>
  </section>

  <div className="stats rv">
    <div className="stat"><b>8</b><span>生产阶段，每段都有验收关卡</span></div>
    <div className="stat"><b>25–45</b><span>单集镜头数（漫剧预算区间）</span></div>
    <div className="stat"><b>20–40<em>%</em></b><span>预算里必须留出的返工率</span></div>
    <div className="stat"><b>60–120<em>s</em></b><span>单集时长，首集可到 150s</span></div>
  </div>

  <section>
    <div className="sec-head rv">
      <div className="kicker">Pipeline</div>
      <h2>八阶段流水线</h2>
      <p>顺序不能乱。上游一个错误，下游要花十倍返工。每个阶段只对一件事负责。</p>
    </div>
    <div className="pipe rv">
      <div className="p"><b>S0</b><span>立项</span></div>
      <div className="p"><b>S1</b><span>剧本</span></div>
      <div className="p"><b>S2</b><span>视觉开发</span></div>
      <div className="p"><b>S3</b><span>分镜</span></div>
      <div className="p"><b>S4</b><span>生成</span></div>
      <div className="p"><b>S5</b><span>音频</span></div>
      <div className="p"><b>S6</b><span>剪辑包装</span></div>
      <div className="p"><b>S7</b><span>分发复盘</span></div>
    </div>

    <div className="grid grid-4" style={{ marginTop: "26px" }}>
      <Link className="card stage-card rv" href="/workflow#s0"><span className="no">S0</span><div className="ico">🎯</div><h3>立项</h3><p>赛道、平台、预算、形态。一页纸决定这剧值不值得做。</p></Link>
      <Link className="card stage-card rv" href="/story"><span className="no">S1</span><div className="ico">✍️</div><h3>剧本</h3><p>logline → 人物小传 → 分集大纲 → 单集剧本。前三集定生死。</p></Link>
      <Link className="card stage-card rv" href="/visual"><span className="no">S2</span><div className="ico">🎨</div><h3>视觉开发</h3><p>画风、三视图、角色锚点、场景底板。一致性优先于精致度。</p></Link>
      <Link className="card stage-card rv" href="/storyboard"><span className="no">S3</span><div className="ico">🎬</div><h3>分镜</h3><p>镜号、时长、景别、台词、动效方式。分镜就是预算表。</p></Link>
      <Link className="card stage-card rv" href="/storyboard#gen"><span className="no">S4</span><div className="ico">🧩</div><h3>生成</h3><p>风格测试 → 锁 seed → 批量关键帧 → 只给必要的镜头做视频。</p></Link>
      <Link className="card stage-card rv" href="/workflow#s5"><span className="no">S5</span><div className="ico">🔊</div><h3>音频</h3><p>音色表、语速、情绪、BGM、音效、混音。声音决定「贵不贵」。</p></Link>
      <Link className="card stage-card rv" href="/workflow#s6"><span className="no">S6</span><div className="ico">✂️</div><h3>剪辑包装</h3><p>前 3 秒、字幕安全区、封面标题。成片在这里定型。</p></Link>
      <Link className="card stage-card rv" href="/workflow#s7"><span className="no">S7</span><div className="ico">📈</div><h3>分发复盘</h3><p>完播、追更、付费、ROI。掉量要能归因到具体结构。</p></Link>
    </div>
  </section>

  <section>
    <div className="sec-head rv">
      <div className="kicker">Principles</div>
      <h2>三条铁律，先记住再开工</h2>
      <p>这三条能挡掉 80% 的废片。它们不是审美问题，是成本问题。</p>
    </div>
    <div className="grid grid-3">
      <div className="card rv">
        <div className="ico">🪝</div>
        <h3>钩子先行</h3>
        <p>前 3 秒没有冲突或异常，后面拍得再好也没人看。每集结尾必须留扣，且这个扣要指向下一集的具体事件，不是「欲知后事如何」。</p>
      </div>
      <div className="card rv">
        <div className="ico">🧬</div>
        <h3>一致性优先于精致度</h3>
        <p>观众能忍受画风普通，不能忍受女主每集换一张脸。角色锚点（痣、疤、戒指）+ 固定 seed + 参考图，比堆参数有用。</p>
      </div>
      <div className="card rv">
        <div className="ico">🧪</div>
        <h3>先样片，再批量</h3>
        <p>用 1 集验证画风、一致性、单集成本。样片成本 × 集数 ≤ 预算，才允许开机。否则做到第 20 集才发现超支，只能砍质量。</p>
      </div>
    </div>
  </section>

  <section id="case">
    <div className="sec-head rv">
      <div className="kicker">Case · EP01</div>
      <h2>一集是怎么做出来的</h2>
      <p>用样片《退婚夜，我直播爆了豪门黑料》第一集拆一遍：137 秒、36 镜、4 个场景、6 个主要角色。</p>
    </div>

    <div className="tablewrap rv">
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

    <div className="note rv">
      <span className="label">为什么这集能当模板</span>
      <b>强冲突开场 + 当代马甲（爆料号）+ 长线悬念（父母旧案）</b>。三种钩子叠在一集里，任何一类观众都能被抓住一个。但它仍然只用 4 个场景——爽点靠结构，不靠烧钱。
    </div>
  </section>

  <section>
    <div className="sec-head rv">
      <div className="kicker">First 7 Days</div>
      <h2>七天做出可验证的样片</h2>
      <p>不要一上来写 80 集。先跑完这条闭环，拿到三个数字：单集成本、返工率、完播率。</p>
    </div>
    <div className="tablewrap rv">
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
    <div className="btnrow rv">
      <Link className="btn btn-primary" href="/storyboard#calc">算一下你的单集成本 →</Link>
      <Link className="btn btn-ghost" href="/checklist">打开上线检查表</Link>
    </div>
  </section>

</main>
  );
}
