import type { Metadata } from "next";
import CostCalculator from "@/components/tools/CostCalculator";

export const metadata: Metadata = {
  title: "分镜、动效与成本",
  description: "漫剧分镜表写法、A/B/C 镜头分级、动效菜单、生成顺序与单集成本计算器。",
};

export default function Page() {
  return (
<div className="mx-auto grid max-w-[1160px] gap-12 px-4 py-12 pb-20 sm:px-6 lg:grid-cols-[220px_1fr] lg:items-start">
  <aside className="sticky top-[88px] hidden text-[13.5px] lg:block" data-toc>
    <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-dim">本页目录</div>
    <a href="#sheet" className="block py-1.5 text-muted transition hover:text-mist ">分镜表字段</a>
    <a href="#level" className="block py-1.5 text-muted transition hover:text-mist ">A/B/C 镜头分级</a>
    <a href="#motion" className="block py-1.5 text-muted transition hover:text-mist ">动效菜单</a>
    <a href="#example" className="block py-1.5 text-muted transition hover:text-mist ">分镜示例</a>
    <a href="#gen" className="block py-1.5 text-muted transition hover:text-mist ">生成顺序</a>
    <a href="#record" className="block py-1.5 text-muted transition hover:text-mist ">生成记录与返工</a>
    <a href="#calc" className="block py-1.5 text-muted transition hover:text-mist ">单集成本计算器</a>
    <a href="#fps" className="block py-1.5 text-muted transition hover:text-mist ">导出规格</a>
  </aside>

  <div className="doc-main">
    <h1>分镜、动效与成本</h1>
    <p className="sub">分镜表不是美术文档，是预算表。每一行都在花钱，所以每一行都要能被追问：这一镜删掉会怎样？</p>

    <h2 id="sheet">分镜表字段</h2>
    <p>一张能直接派活的分镜表，至少要有这七列。少一列，执行时就要回来问一次。</p>
    <div className="tablewrap">
      <table>
        <thead><tr><th>字段</th><th>写法</th><th>作用</th></tr></thead>
        <tbody>
          <tr><td><b>镜号</b></td><td>1, 2, 3… 全剧唯一</td><td>对齐素材、音频、返工记录</td></tr>
          <tr><td><b>时长</b></td><td>4s</td><td>决定视频生成成本与剪辑节奏</td></tr>
          <tr><td><b>景别</b></td><td>特写/近景/中景/全景</td><td>控制信息量与生成难度</td></tr>
          <tr><td><b>画面/动作</b></td><td>一句话说清「谁在哪做什么」</td><td>写提示词的依据</td></tr>
          <tr><td><b>台词</b></td><td>角色名 + 台词，或「无台词」</td><td>配音与字幕来源</td></tr>
          <tr><td><b>动效方式</b></td><td>视频 / 关键帧+推 / 视差 / 平面</td><td>直接决定这一镜的单价</td></tr>
          <tr><td><b>提示词</b></td><td>完整英文，含风格前缀</td><td>可直接投喂生成</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="level">A/B/C 镜头分级</h2>
    <p>全部生成视频，成本会翻三倍；全部用静帧，观众会觉得是 PPT。正确的做法是分级。</p>
    <div className="grid grid-3" style={{ margin: "18px 0 24px" }}>
      <div className="card">
        <div><span className="pill red">A 级</span></div>
        <h3>必须视频</h3>
        <p>情绪转折、关键动作、群像场面。3–6 秒，全剧不超过总镜数的 30%。</p>
      </div>
      <div className="card">
        <div><span className="pill gold">B 级</span></div>
        <h3>关键帧 + 2D 动效</h3>
        <p>对话、反应、氛围。推拉、呼吸、视差就能撑住，是性价比最高的档位。</p>
      </div>
      <div className="card">
        <div><span className="pill">C 级</span></div>
        <h3>平面 / 字幕卡</h3>
        <p>大屏、转账记录、聊天界面、时间地点卡。直接做平面设计，不生成。</p>
      </div>
    </div>
    <div className="note">
      <span className="label">判断口诀</span>
      这一镜里<b>有没有人物动作或表情变化</b>？有 → A；只有镜头运动 → B；只有信息 → C。
    </div>

    <h2 id="motion">动效菜单（B 级镜头的九种做法）</h2>
    <div className="tablewrap">
      <table>
        <thead><tr><th>动效</th><th>做法</th><th>适合</th></tr></thead>
        <tbody>
          <tr><td>轻推</td><td>画面 100% → 106%，3 秒</td><td>情绪递进、揭示</td></tr>
          <tr><td>轻拉</td><td>画面 108% → 100%</td><td>结尾、孤立感</td></tr>
          <tr><td>呼吸</td><td>缩放 100% ↔ 101.5%，循环</td><td>对话中的静止镜头</td></tr>
          <tr><td>视差</td><td>前景/人物/背景分层，位移不同</td><td>走动、宴会厅、街景</td></tr>
          <tr><td>摇移</td><td>整图左右平移 5–8%</td><td>群像、环境交代</td></tr>
          <tr><td>震屏</td><td>2–4px 随机位移，0.2 秒</td><td>拍桌、怒吼、撞击</td></tr>
          <tr><td>速度线</td><td>叠加放射/横向线条</td><td>冲刺、惊觉、打击</td></tr>
          <tr><td>拟声字</td><td>手写体音效字弹入</td><td>漫画感强调</td></tr>
          <tr><td>光效</td><td>屏幕光、闪光、扫光</td><td>大屏亮起、手机屏幕</td></tr>
        </tbody>
      </table>
    </div>
    <p>同一集里动效不要超过四种，否则会显得廉价。情绪最强的两三个点用「震屏 + 静音一拍」，其余保持克制。</p>

    <h2 id="example">分镜示例（《退婚夜》E1 前四镜）</h2>
    <div className="tablewrap">
      <table>
        <thead><tr><th>镜</th><th>时长</th><th>景别</th><th>画面</th><th>台词</th><th>动效</th></tr></thead>
        <tbody>
          <tr><td className="num">1</td><td className="num">4s</td><td>特写</td><td>肥手把退婚声明拍在梳妆台，口红滚落</td><td>苏国强（画外）：签了，上台念。</td><td>关键帧 + 轻推</td></tr>
          <tr><td className="num">2</td><td className="num">3s</td><td>近景</td><td>镜中苏念，口红停在唇边，眼神没有波动</td><td>苏念：爸，今天是我的婚礼。</td><td>关键帧 + 镜面微动</td></tr>
          <tr><td className="num">3</td><td className="num">5s</td><td>近景</td><td>苏国强俯身，与镜中的她并列</td><td>苏国强：你爸妈的车祸，卷宗在我这。</td><td>关键帧 + 呼吸</td></tr>
          <tr><td className="num">4</td><td className="num">4s</td><td>特写</td><td>签字，笔尖划破纸，银戒指硌手</td><td>苏念：行。</td><td>关键帧 + 轻推</td></tr>
        </tbody>
      </table>
    </div>
    <p>注意这四镜没有一镜是视频：全靠关键帧 + 2D 动效，但信息密度和压迫感都在。整集 36 镜里只有 9 镜是 A 级。</p>

    <h2 id="gen">生成顺序：先锁，再批量</h2>
    <ol>
      <li><strong>风格测试 3 镜</strong>：同一场景三个不同景别，确认画风、光线、质感。</li>
      <li><strong>角色三视图</strong>：每个主演出四视图，选正面做参考图。</li>
      <li><strong>锁参考图 + seed</strong>：把这组参数写进角色卡，后面不许改。</li>
      <li><strong>批量关键帧</strong>：按分镜顺序出图，每张记录镜号、模型、参数、耗时、费用。</li>
      <li><strong>选镜生视频</strong>：只给 A 级镜头做图生视频，单段 3–6 秒，宁短勿长。</li>
      <li><strong>返工队列</strong>：不合格的单独排队重出，不混进正片，避免后面剪辑时才发现。</li>
    </ol>
    <div className="note red">
      <span className="label">顺序错了会怎样</span>
      先批量出图再锁角色 → 前面几十张全废；先做视频再改分镜 → 视频白生成。生成是不可逆的支出，<b>所有决定都要在按下生成之前做完</b>。
    </div>

    <h2 id="record">生成记录与返工</h2>
    <p>每次生成记一行。这不是形式主义——它是你唯一能算出「单集真实成本」的数据来源。</p>
    <div className="tablewrap">
      <table>
        <thead><tr><th>镜号</th><th>模型</th><th>seed</th><th>参考图</th><th>耗时</th><th>费用</th><th>结果</th></tr></thead>
        <tbody>
          <tr><td className="num">E1-02</td><td>—</td><td className="num">184672</td><td>sunian_front_v3</td><td className="num">18s</td><td className="num">¥0.80</td><td>通过</td></tr>
          <tr><td className="num">E1-03</td><td>—</td><td className="num">184672</td><td>sunian_front_v3</td><td className="num">22s</td><td className="num">¥0.80</td><td>返工：手部</td></tr>
          <tr><td className="num">E1-03r</td><td>—</td><td className="num">184672</td><td>sunian_front_v3</td><td className="num">19s</td><td className="num">¥0.80</td><td>通过</td></tr>
        </tbody>
      </table>
    </div>
    <p>返工率按 <strong>20–40%</strong> 预留。如果连续几集返工率低于 10%，多半不是技术变好了，是你在放低验收标准。</p>

    <h2 id="calc">单集成本计算器</h2>
    <p>把供应商报价填进去，得到单集与全剧成本。默认值是占位示例，<strong>拿到真实报价后必须替换</strong>。</p>
    <CostCalculator />
    <p style={{ marginTop: "14px", color: "var(--dim)", fontSize: "13px" }}>注意：此计算不含投流、剧本人力与平台分成。投流通常按流水分成另算，别混进制作成本里自我安慰。</p>

    <h2 id="fps">导出规格</h2>
    <div className="tablewrap">
      <table>
        <thead><tr><th>项目</th><th>规格</th></tr></thead>
        <tbody>
          <tr><td>画幅</td><td>1080 × 1920（9:16）</td></tr>
          <tr><td>帧率</td><td>25 或 30 fps，全剧统一</td></tr>
          <tr><td>编码</td><td>H.264，8–12 Mbps，音频 AAC 192kbps</td></tr>
          <tr><td>字幕</td><td>安全区内，单行 ≤ 14 字，关键词描边</td></tr>
          <tr><td>命名</td><td><code>S01E001_场景_版本.mp4</code></td></tr>
          <tr><td>音量</td><td>对白 -6dB 基准，峰值 ≤ -1dBTP</td></tr>
        </tbody>
      </table>
    </div>
    <p>规格不统一，后面投流平台会二次压缩，画质和字幕都会更难看。导出前统一一次，比事后补救便宜。</p>
  </div>
</div>
  );
}
