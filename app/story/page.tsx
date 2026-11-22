import type { Metadata } from "next";
import BeatPlanner from "@/components/tools/BeatPlanner";

export const metadata: Metadata = {
  title: "剧本与节拍",
  description: "竖屏漫剧的剧本方法：三层结构、单集六拍、前三集法则、钩子类型与台词规则。",
};

export default function Page() {
  return (
<div className="wrap doc">
  <aside className="toc">
    <div className="t">本页目录</div>
    <a href="#unit">单集是基本单位</a>
    <a href="#layers">三层结构</a>
    <a href="#sixbeats">单集六拍</a>
    <a href="#beatcalc">节拍时间码生成器</a>
    <a href="#first3">前三集法则</a>
    <a href="#hooks">钩子类型清单</a>
    <a href="#dialogue">台词四条规则</a>
    <a href="#check">信息点检查表</a>
    <a href="#traps">四种废稿模式</a>
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
    <div className="note">
      <span className="label">写之前先问</span>
      这一集，观众<b>必须知道</b>的三件事是什么？如果超过三件，拆集；如果少于一件，这集可以删。
    </div>

    <h2 id="layers">三层结构：全剧、单元、单集</h2>
    <div className="grid grid-3" style={{ margin: "18px 0 24px" }}>
      <div className="card"><h3>全剧</h3><p>一条主线悬念贯穿到底（旧案、身世、复仇目标）。每 10 集给一次大反转，每 20 集换一次赌注。</p></div>
      <div className="card"><h3>单元（3 集）</h3><p>三集一个完整循环：起（新麻烦）→ 承（升级）→ 转（打脸/反转）。第 3 集结尾抛下一个循环的引子。</p></div>
      <div className="card"><h3>单集</h3><p>六拍结构，自成一个情绪闭环，但结尾必须留扣。单集可以独立被刷到，所以开头不能依赖上一集。</p></div>
    </div>
    <p>很多剧死在「只有单集没有单元」：每集都在吵，但三集过去什么也没推进。检验方法——<strong>把第 3 集的结尾和第 1 集的开头对比，世界有没有变化？</strong></p>

    <h2 id="sixbeats">单集六拍</h2>
    <p>这是经过验证的默认结构，90% 的集都可以套。熟练之后再打破它。</p>
    <BeatPlanner />

    <h2 id="beatcalc">节拍时间码生成器</h2>
    <p>输入你这一集的时长，直接得到可用的时间码表。写分镜时按这个切，比凭感觉靠谱。</p>
    <div className="tool" id="beat-calc">
      <h3>单集节拍分配</h3>
      <p className="hint">按六拍比例自动计算时间码，末端自动对齐总时长。</p>
      <div className="fields" style={{ gridTemplateColumns: "220px 1fr" }}>
        <div className="field">
          <label>单集时长（秒）</label>
          <input id="beat-dur" type="number" min="30" max="300" step="1" value="110" />
        </div>
        <div className="field" style={{ alignSelf: "end", paddingBottom: "10px" }}>
          <span id="beat-info" style={{ color: "var(--muted)", fontSize: "13.5px" }}></span>
        </div>
      </div>
      <div className="beats" id="beat-out"></div>
    </div>

    <h2 id="first3">前三集法则</h2>
    <p>平台给每部剧的流量窗口非常短。前三集决定它能不能进入推荐池，所以这三集的任务是固定的：</p>
    <div className="tablewrap">
      <table>
        <thead><tr><th>集</th><th>任务</th><th>必须出现</th></tr></thead>
        <tbody>
          <tr><td><b>E1</b></td><td>立人物 + 强冲突 + 长线钩子</td><td>主角的身份反差、一个当众的爆点、一个指向全剧的悬念</td></tr>
          <tr><td><b>E2</b></td><td>扩大赌注</td><td>反扑（网暴/封号/抢证据），主角第一次真正的损失</td></tr>
          <tr><td><b>E3</b></td><td>关系升级 + 新威胁</td><td>盟友关系变化（协议、交易、绑定），反派启动更高一级的手段</td></tr>
        </tbody>
      </table>
    </div>
    <div className="note red">
      <span className="label">样片实例</span>
      《退婚夜》：E1 婚礼抢麦爆料 → 未婚夫反手递 U 盘 → 反派启动 B 计划；E2 全网网暴、直播间被封，备用号反杀；E3 鸿门宴逼交证据，协议结婚换弟弟安全。三集各自闭环，又共同推进主线。
    </div>

    <h2 id="hooks">钩子类型清单</h2>
    <p>结尾扣不要每次都一样。下面八种轮着用，观众才不会疲劳：</p>
    <div className="grid grid-2" style={{ margin: "16px 0 24px" }}>
      <div className="card"><h3>① 新威胁</h3><p>「那就让她，跟她爸妈一样。」——反派升级手段，直接指向下一集的危险。</p></div>
      <div className="card"><h3>② 新身份</h3><p>主角亮出隐藏身份或新账号，观众想看这个身份怎么用。</p></div>
      <div className="card"><h3>③ 新证据</h3><p>U 盘、录音、档案袋。物件本身要能被画面拍到，别只靠台词说。</p></div>
      <div className="card"><h3>④ 关系反转</h3><p>盟友其实是利用，敌人其实是保护。一句台词就能翻盘。</p></div>
      <div className="card"><h3>⑤ 倒计时</h3><p>「三天后开庭」「今晚十二点前」。给下一集一个硬期限。</p></div>
      <div className="card"><h3>⑥ 误认/错位</h3><p>观众知道而角色不知道，制造「你倒是回头看看」的焦躁。</p></div>
      <div className="card"><h3>⑦ 代价显形</h3><p>赢了这一局，但弟弟/朋友/证据出事了。爽完立刻给痛。</p></div>
      <div className="card"><h3>⑧ 冷句收尾</h3><p>不说话，一个眼神或一个动作，配乐戛然而止。最省成本，也最吃演技。</p></div>
    </div>

    <h2 id="dialogue">台词四条规则</h2>
    <ol>
      <li><strong>口语化</strong>：写完读一遍，读着别扭就重写。配音演员不会替你救书面语。</li>
      <li><strong>一句一个信息</strong>：单句不超过 20 字，长句拆成两句，方便切镜和配音。</li>
      <li><strong>少用旁白</strong>：能用画面交代的，绝不用旁白。旁白只用于时间跳跃和内心反差。</li>
      <li><strong>留一句能截图的</strong>：每集至少一句「金句」，能被观众截图发出去。这句通常放在反转或结尾扣。</li>
    </ol>
    <div className="codebox">
      <button className="copy">复制</button>
      <pre><code>❌ 书面：她心中五味杂陈，想起了六年前那场改变一切的车祸。
✅ 口语：六年了。你们连一句真话都不肯给我。

❌ 过长：你以为你今天站在这里说这些话就能改变什么吗？
✅ 拆句：你以为站在这儿说两句，就能翻盘？</code></pre>
    </div>

    <h2 id="check">信息点检查表</h2>
    <p>每集写完，用这张表过一遍。任何一项打不了勾，都别进分镜。</p>
    <div className="tablewrap">
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
    <div className="grid grid-2">
      <div className="card"><h3>① 前情提要式开场</h3><p>用 20 秒交代「她本是豪门千金」。观众不是来看说明书的，直接把她扔进冲突里。</p></div>
      <div className="card"><h3>② 情绪没有出口</h3><p>主角一直受气，到结尾还没还手。爽剧可以延迟满足，但不能整集都是憋屈。</p></div>
      <div className="card"><h3>③ 反派降智</h3><p>为了让主角赢，反派突然犯低级错误。反派的每一步都该有合理动机，主角赢在信息差，不是对手蠢。</p></div>
      <div className="card"><h3>④ 结尾扣是空话</h3><p>「接下来，会发生什么呢？」——这不是钩子，是偷懒。要给出具体的人、事、物。</p></div>
    </div>
  </div>
</div>
  );
}
