import type { Metadata } from "next";
import CodeBox from "@/components/CodeBox";
import BeatPlanner from "@/components/tools/BeatPlanner";

export const metadata: Metadata = {
  title: "剧本与节拍",
  description: "竖屏漫剧的剧本方法：三层结构、单集六拍、前三集法则、钩子类型与台词规则。",
};

export default function Page() {
  return (
<div className="mx-auto grid max-w-[1160px] gap-12 px-4 py-12 pb-20 sm:px-6 lg:grid-cols-[220px_1fr] lg:items-start">
  <aside className="sticky top-[88px] hidden text-[13.5px] lg:block" data-toc>
    <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-dim">本页目录</div>
    <a href="#unit" className="block py-1.5 text-muted transition hover:text-mist ">单集是基本单位</a>
    <a href="#pipeline" className="block py-1.5 text-muted transition hover:text-mist ">剧本产出链路</a>
    <a href="#layers" className="block py-1.5 text-muted transition hover:text-mist ">三层结构</a>
    <a href="#sixbeats" className="block py-1.5 text-muted transition hover:text-mist ">单集六拍</a>
    <a href="#beatcalc" className="block py-1.5 text-muted transition hover:text-mist ">节拍时间码生成器</a>
    <a href="#beattable" className="block py-1.5 text-muted transition hover:text-mist ">节拍表模板</a>
    <a href="#genre" className="block py-1.5 text-muted transition hover:text-mist ">题材赛道定位</a>
    <a href="#first3" className="block py-1.5 text-muted transition hover:text-mist ">前三集法则</a>
    <a href="#hooks" className="block py-1.5 text-muted transition hover:text-mist ">钩子类型清单</a>
    <a href="#dialogue" className="block py-1.5 text-muted transition hover:text-mist ">台词四条规则</a>
    <a href="#check" className="block py-1.5 text-muted transition hover:text-mist ">信息点检查表</a>
    <a href="#traps" className="block py-1.5 text-muted transition hover:text-mist ">四种废稿模式</a>
  </aside>

  <div className="doc-main">
    <h1>剧本与节拍</h1>
    <p className="sub">竖屏漫剧的剧本不是「小说改短」，而是一套按秒计算的信息投放系统。观众平均 3 秒决定去留，所以每一秒都要有理由存在。</p>

    <h2 id="unit">单集是基本单位</h2>
    <p>先记住三个数字：</p>
    <ul>
      <li><strong>60–120 秒</strong>：单集时长。首集可以到 150 秒，因为要立人物、给背景、下钩子。</li>
      <li><strong>25–45 镜</strong>：单集镜头数。平均 3–5 秒一镜，低于 25 镜会显得拖，高于 45 镜预算会炸。</li>
      <li><strong>每 15–20 秒</strong>：必须有一次信息增量。没有新信息，观众的手指就会动。</li>
    </ul>
    <div className="my-5 rounded-xl border border-gold/30 bg-gold/10 px-[18px] py-4 text-[14.5px] leading-[1.75] text-[#e8dcc4] [&_b]:text-gold">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] opacity-80">写之前先问</span>
      这一集，观众<b>必须知道</b>的三件事是什么？如果超过三件，拆集；如果少于一件，这集可以删。
    </div>

    <h2 id="pipeline">剧本产出链路</h2>
    <p>从一句话到可拍剧本分四步，上一步没过关卡，不进下一步。</p>
    <div className="my-[18px] mb-6 overflow-x-auto rounded-2xl border border-line [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_th]:bg-white/[0.04] [&_th]:px-3.5 [&_th]:py-[11px] [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.06em] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:px-3.5 [&_td]:py-[11px] [&_td]:text-left [&_td]:align-top [&_tbody_tr:hover]:bg-white/[0.02] [&_tr:last-child_td]:border-0 [&_td.num]:whitespace-nowrap [&_td.num]:tabular-nums">
      <table>
        <thead><tr><th>步骤</th><th>产出物</th><th>关卡</th></tr></thead>
        <tbody>
          <tr><td><b>① 一句话梗概</b><br/>logline</td><td>谁 + 处境 + 目标 + 长线悬念</td><td>不看剧名也能听懂，能让人追问「然后呢」</td></tr>
          <tr><td><b>② 人物小传</b></td><td>主角目标 / 性格 / 软肋 / 小动作；对手动机与筹码；辅助功能；关系网；秘密表</td><td>每个主要角色都有想要的东西和阻碍；秘密能逐集解锁</td></tr>
          <tr><td><b>③ 分集大纲</b></td><td>每集钩子 / 反转 / 结尾扣；3 集一循环；全剧长线节点</td><td>第 3 集结尾和第 1 集开头比，世界确实有变化</td></tr>
          <tr><td><b>④ 单集剧本</b></td><td>六拍拆到镜头级台词与画面</td><td>过一遍「信息点检查表」，再进分镜</td></tr>
        </tbody>
      </table>
    </div>
    <CodeBox>
<pre><code>logline 模板：
〔身份〕在〔处境〕中，为〔目标〕必须〔行动〕，否则〔代价〕；背后还藏着〔长线悬念〕。

示例：被豪门当棋子养了六年的养女，在自己婚礼上开直播掀桌；她要的不是退婚，是六年前父母车祸的真相。</code></pre>
    </CodeBox>
    <div className="my-5 rounded-xl border border-gold/30 bg-gold/10 px-[18px] py-4 text-[14.5px] leading-[1.75] text-[#e8dcc4] [&_b]:text-gold">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] opacity-80">要点</span>
      人物先于情节：主角想要什么、怕失去什么立不住，后面的钩子和反转都撑不住。
    </div>

    <h2 id="layers">三层结构：全剧、单元、单集</h2>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ margin: "18px 0 24px" }}>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>全剧</h3><p>一条主线悬念贯穿到底（旧案、身世、复仇目标）。每 10 集给一次大反转，每 20 集换一次赌注。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>单元（3 集）</h3><p>三集一个完整循环：起（新麻烦）→ 承（升级）→ 转（打脸/反转）。第 3 集结尾抛下一个循环的引子。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>单集</h3><p>六拍结构，自成一个情绪闭环，但结尾必须留扣。单集可以独立被刷到，所以开头不能依赖上一集。</p></div>
    </div>
    <p>很多剧死在「只有单集没有单元」：每集都在吵，但三集过去什么也没推进。检验方法——<strong>把第 3 集的结尾和第 1 集的开头对比，世界有没有变化？</strong></p>

    <h2 id="sixbeats">单集六拍</h2>
    <p>这是经过验证的默认结构，90% 的集都可以套。熟练之后再打破它。</p>
    <div className="my-[18px] mb-6 overflow-x-auto rounded-2xl border border-line [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_th]:bg-white/[0.04] [&_th]:px-3.5 [&_th]:py-[11px] [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.06em] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:px-3.5 [&_td]:py-[11px] [&_td]:text-left [&_td]:align-top [&_tbody_tr:hover]:bg-white/[0.02] [&_tr:last-child_td]:border-0 [&_td.num]:whitespace-nowrap [&_td.num]:tabular-nums">
      <table>
        <thead><tr><th>拍</th><th>占比</th><th>功能</th><th>写法要点</th></tr></thead>
        <tbody>
          <tr><td>冷开场</td><td className="num">4%</td><td>冲突或异常，3 秒内成立</td><td>不要交代背景，直接给一个「不对劲」的画面或一句威胁</td></tr>
          <tr><td>铺垫</td><td className="num">20%</td><td>交代关系、目标、代价</td><td>每句台词都要带信息，删掉寒暄</td></tr>
          <tr><td>冲突升级</td><td className="num">28%</td><td>施压、反抗、再加码</td><td>正反打，压迫方每次多给一个筹码</td></tr>
          <tr><td>反转</td><td className="num">24%</td><td>信息揭露，攻守易位</td><td>静音一拍再爆，让观众先愣一下</td></tr>
          <tr><td>后果</td><td className="num">15%</td><td>反应镜头，情绪落地</td><td>给配角反应，比主角自己说更有效</td></tr>
          <tr><td>结尾扣</td><td className="num">9%</td><td>指向下一集的具体事件</td><td>新威胁/新身份/新证据，三者选一</td></tr>
        </tbody>
      </table>
    </div>
    <p style={{ marginTop: "16px", color: "var(--dim)", fontSize: "13px" }}>表内占比是起点区间，不是硬性公式：按题材和单集时长微调，再用自己样片的完播率、掉点位置反向修正。</p>

    <h2 id="beatcalc">节拍时间码生成器</h2>
    <p>输入你这一集的时长，直接得到可用的时间码表。写分镜时按这个切，比凭感觉靠谱。</p>
    <BeatPlanner />
    <p style={{ marginTop: "16px", color: "var(--dim)", fontSize: "13px" }}>金色条 = 必须留钩子的位置。结尾扣的时长可以压缩到 2 秒，但绝不能没有。</p>

    <h2 id="beattable">节拍表模板</h2>
    <p>时间码定下来后，用这张表把每一拍的画面、台词、音效和钩子填出来。它是剧本到分镜之间的底稿，一行一拍，空着的格子就是还没想清楚的地方。</p>
    <div className="my-[18px] mb-6 overflow-x-auto rounded-2xl border border-line [&_table]:w-full [&_table]:min-w-[640px] [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_th]:bg-white/[0.04] [&_th]:px-3.5 [&_th]:py-[11px] [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.06em] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:px-3.5 [&_td]:py-[11px] [&_td]:text-left [&_td]:align-top [&_tbody_tr:hover]:bg-white/[0.02] [&_tr:last-child_td]:border-0 [&_td.num]:whitespace-nowrap [&_td.num]:tabular-nums">
      <table>
        <thead><tr><th>时间码</th><th>功能</th><th>画面 / 景别</th><th>台词 / 旁白</th><th>音效 / BGM</th><th>钩子</th></tr></thead>
        <tbody>
          <tr><td className="num">0:00–0:03</td><td>冷开场</td><td>特写</td><td>一句冲突台词</td><td>重音效</td><td>是</td></tr>
          <tr><td className="num">0:03–0:15</td><td>铺垫</td><td>中景</td><td>交代关系</td><td>低铺底</td><td>否</td></tr>
          <tr><td className="num">0:15–0:35</td><td>冲突升级</td><td>正反打</td><td>对抗台词</td><td>节奏加快</td><td>小钩子</td></tr>
          <tr><td className="num">0:35–0:55</td><td>反转</td><td>推镜</td><td>信息揭露</td><td>静音一拍</td><td>是</td></tr>
          <tr><td className="num">0:55–1:10</td><td>后果</td><td>全景</td><td>反应</td><td>情绪音乐</td><td>否</td></tr>
          <tr><td className="num">1:10–1:20</td><td>结尾扣</td><td>特写</td><td>悬念台词</td><td>戛然而止</td><td>强钩子</td></tr>
        </tbody>
      </table>
    </div>
    <ul>
      <li>前 3 秒是否有冲突或异常？</li>
      <li>每 15–20 秒是否有一次信息增量？</li>
      <li>结尾扣是否指向下一集的具体事件？</li>
      <li>单集镜头数是否在预算内（常见 25–45 镜）？</li>
    </ul>

    <h2 id="genre">题材赛道定位</h2>
    <p>先选赛道再写本子。把核心爽点和主角配置对齐，再判断你的题材能不能套进去。</p>
    <div className="my-[18px] mb-6 overflow-x-auto rounded-2xl border border-line [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_th]:bg-white/[0.04] [&_th]:px-3.5 [&_th]:py-[11px] [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.06em] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:px-3.5 [&_td]:py-[11px] [&_td]:text-left [&_td]:align-top [&_tbody_tr:hover]:bg-white/[0.02] [&_tr:last-child_td]:border-0 [&_td.num]:whitespace-nowrap [&_td.num]:tabular-nums">
      <table>
        <thead><tr><th>赛道</th><th>核心爽点</th><th>主角配置</th></tr></thead>
        <tbody>
          <tr><td><b>复仇逆袭</b></td><td>受辱后翻盘、当众打脸</td><td>被压到谷底，握有底牌或证据</td></tr>
          <tr><td><b>马甲身份</b></td><td>隐藏高手 / 富豪 / 大佬揭晓</td><td>表面弱势，关键时刻亮身份</td></tr>
          <tr><td><b>赘婿 / 萌宝</b></td><td>家庭关系反转</td><td>萌宝助攻，或身份牵绊</td></tr>
          <tr><td><b>神医 / 战神</b></td><td>专业碾压</td><td>被轻视的强者出手救人、镇场</td></tr>
          <tr><td><b>穿越 / 重生</b></td><td>信息差预知</td><td>带记忆重来，借机改命</td></tr>
        </tbody>
      </table>
    </div>
    <ul>
      <li><strong>先看有没有已验证需求</strong>：拆 2–3 部同赛道爆款，标注钩子、反转、情绪值，再决定是否进场。</li>
      <li><strong>爽点密度优先于题材新颖</strong>：不硬写自己不熟的赛道。</li>
      <li><strong>元素别堆太多</strong>：一部剧主打一个主赛道，再加一个叠加元素（如复仇 + 马甲 + 直播），元素过多主线会散。</li>
    </ul>

    <h2 id="first3">前三集法则</h2>
    <p>平台给每部剧的流量窗口非常短。前三集决定它能不能进入推荐池，所以这三集的任务是固定的：</p>
    <div className="my-[18px] mb-6 overflow-x-auto rounded-2xl border border-line [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_th]:bg-white/[0.04] [&_th]:px-3.5 [&_th]:py-[11px] [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.06em] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:px-3.5 [&_td]:py-[11px] [&_td]:text-left [&_td]:align-top [&_tbody_tr:hover]:bg-white/[0.02] [&_tr:last-child_td]:border-0 [&_td.num]:whitespace-nowrap [&_td.num]:tabular-nums">
      <table>
        <thead><tr><th>集</th><th>任务</th><th>必须出现</th></tr></thead>
        <tbody>
          <tr><td><b>E1</b></td><td>立人物 + 强冲突 + 长线钩子</td><td>主角的身份反差、一个当众的爆点、一个指向全剧的悬念</td></tr>
          <tr><td><b>E2</b></td><td>扩大赌注</td><td>反扑（网暴/封号/抢证据），主角第一次真正的损失</td></tr>
          <tr><td><b>E3</b></td><td>关系升级 + 新威胁</td><td>盟友关系变化（协议、交易、绑定），反派启动更高一级的手段</td></tr>
        </tbody>
      </table>
    </div>
    <div className="my-5 rounded-xl border border-flame/30 bg-flame/10 px-[18px] py-4 text-[14.5px] leading-[1.75] text-[#f0cfcd] [&_b]:text-[#ff8a80]">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] opacity-80">样片实例</span>
      《退婚夜》：E1 婚礼抢麦爆料 → 未婚夫反手递 U 盘 → 反派启动 B 计划；E2 全网网暴、直播间被封，备用号反杀；E3 鸿门宴逼交证据，协议结婚换弟弟安全。三集各自闭环，又共同推进主线。
    </div>

    <h2 id="hooks">钩子类型清单</h2>
    <p>结尾扣不要每次都一样。下面八种轮着用，观众才不会疲劳：</p>
    <div className="grid gap-4 sm:grid-cols-2" style={{ margin: "16px 0 24px" }}>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>① 新威胁</h3><p>「那就让她，跟她爸妈一样。」——反派升级手段，直接指向下一集的危险。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>② 新身份</h3><p>主角亮出隐藏身份或新账号，观众想看这个身份怎么用。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>③ 新证据</h3><p>U 盘、录音、档案袋。物件本身要能被画面拍到，别只靠台词说。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>④ 关系反转</h3><p>盟友其实是利用，敌人其实是保护。一句台词就能翻盘。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>⑤ 倒计时</h3><p>「三天后开庭」「今晚十二点前」。给下一集一个硬期限。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>⑥ 误认/错位</h3><p>观众知道而角色不知道，制造「你倒是回头看看」的焦躁。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>⑦ 代价显形</h3><p>赢了这一局，但弟弟/朋友/证据出事了。爽完立刻给痛。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>⑧ 冷句收尾</h3><p>不说话，一个眼神或一个动作，配乐戛然而止。最省成本，也最吃演技。</p></div>
    </div>

    <h2 id="dialogue">台词四条规则</h2>
    <ol>
      <li><strong>口语化</strong>：写完读一遍，读着别扭就重写。配音演员不会替你救书面语。</li>
      <li><strong>一句一个信息</strong>：单句不超过 20 字，长句拆成两句，方便切镜和配音。</li>
      <li><strong>少用旁白</strong>：能用画面交代的，绝不用旁白。旁白只用于时间跳跃和内心反差。</li>
      <li><strong>留一句能截图的</strong>：每集至少一句「金句」，能被观众截图发出去。这句通常放在反转或结尾扣。</li>
    </ol>
    <CodeBox>
<pre><code>❌ 书面：她心中五味杂陈，想起了六年前那场改变一切的车祸。
✅ 口语：六年了。你们连一句真话都不肯给我。

❌ 过长：你以为你今天站在这里说这些话就能改变什么吗？
✅ 拆句：你以为站在这儿说两句，就能翻盘？</code></pre>
</CodeBox>

    <h2 id="check">信息点检查表</h2>
    <p>每集写完，用这张表过一遍。任何一项打不了勾，都别进分镜。</p>
    <div className="my-[18px] mb-6 overflow-x-auto rounded-2xl border border-line [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_th]:bg-white/[0.04] [&_th]:px-3.5 [&_th]:py-[11px] [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.06em] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:px-3.5 [&_td]:py-[11px] [&_td]:text-left [&_td]:align-top [&_tbody_tr:hover]:bg-white/[0.02] [&_tr:last-child_td]:border-0 [&_td.num]:whitespace-nowrap [&_td.num]:tabular-nums">
      <table>
        <thead><tr><th>检查项</th><th>标准</th></tr></thead>
        <tbody>
          <tr><td>前 3 秒</td><td>有冲突、异常或强反差，且不依赖上一集</td></tr>
          <tr><td>身份</td><td>主角是谁、靠什么吃饭，一集内各交代一次</td></tr>
          <tr><td>动机</td><td>这集要什么？得不到会怎样？</td></tr>
          <tr><td>关系</td><td>至少一组关系发生变化（哪怕只是态度）</td></tr>
          <tr><td>信息增量</td><td>每 15–20 秒一次，且是「新」信息不是重复</td></tr>
          <tr><td>结尾扣</td><td>指向下一集的具体事件，而不是抽象感慨</td></tr>
          <tr><td>可截图句</td><td>至少一句，独立成句也能看懂</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="traps">四种废稿模式</h2>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>① 前情提要式开场</h3><p>用 20 秒交代「她本是豪门千金」。观众不是来看说明书的，直接把她扔进冲突里。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>② 情绪没有出口</h3><p>主角一直受气，到结尾还没还手。爽剧可以延迟满足，但不能整集都是憋屈。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>③ 反派降智</h3><p>为了让主角赢，反派突然犯低级错误。反派的每一步都该有合理动机，主角赢在信息差，不是对手蠢。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>④ 结尾扣是空话</h3><p>「接下来，会发生什么呢？」——这不是钩子，是偷懒。要给出具体的人、事、物。</p></div>
    </div>
  </div>
</div>
  );
}
