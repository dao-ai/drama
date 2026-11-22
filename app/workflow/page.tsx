import type { Metadata } from "next";
import Link from "next/link";
import { Row, Stage } from "@/components/Stage";

export const metadata: Metadata = {
  title: "八阶段全流程",
  description: "竖屏漫剧从立项到分发的八个阶段：输入、产出、验收关卡、常见坑与成本结构。",
};

export default function Page() {
  return (
<div className="mx-auto grid max-w-[1160px] gap-12 px-4 py-12 pb-20 sm:px-6 lg:grid-cols-[220px_1fr] lg:items-start">
  <aside className="sticky top-[88px] hidden text-[13.5px] lg:block" data-toc>
    <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-dim">本页目录</div>
    <a href="#handoff" className="block py-1.5 text-muted transition hover:text-mist ">阶段交接物</a>
    <a href="#s0" className="block py-1.5 text-muted transition hover:text-mist ">S0 立项</a>
    <a href="#s1" className="block py-1.5 text-muted transition hover:text-mist ">S1 剧本</a>
    <a href="#s2" className="block py-1.5 text-muted transition hover:text-mist ">S2 视觉开发</a>
    <a href="#s3" className="block py-1.5 text-muted transition hover:text-mist ">S3 分镜</a>
    <a href="#s4" className="block py-1.5 text-muted transition hover:text-mist ">S4 生成</a>
    <a href="#s5" className="block py-1.5 text-muted transition hover:text-mist ">S5 音频</a>
    <a href="#s6" className="block py-1.5 text-muted transition hover:text-mist ">S6 剪辑包装</a>
    <a href="#s7" className="block py-1.5 text-muted transition hover:text-mist ">S7 分发复盘</a>
    <a href="#ratio" className="block py-1.5 text-muted transition hover:text-mist pl-3 text-[12.5px] text-dim">成本结构</a>
  </aside>

  <div className="doc-main">
    <h1>八阶段全流程</h1>
    <p className="sub">每个阶段只对一件事负责，并且必须交出下游能直接用的东西。点标题可折叠。判断标准不是「做完了」，而是「关卡过了」。</p>

    <h2 id="handoff">先看交接物</h2>
    <p>流水线卡住，90% 是因为上游交的东西下游用不了。下面这张表是全流程的「接口定义」。</p>
    <div className="tablewrap">
      <table>
        <thead><tr><th>阶段</th><th>交给下游的东西</th><th>下游拿它干什么</th></tr></thead>
        <tbody>
          <tr><td>S0 立项</td><td>一页纸企划</td><td>定集数、时长、画风档位</td></tr>
          <tr><td>S1 剧本</td><td>镜头级单集剧本</td><td>拆分镜</td></tr>
          <tr><td>S2 视觉</td><td>角色卡 + 场景底板 + 风格前缀</td><td>写每镜提示词</td></tr>
          <tr><td>S3 分镜</td><td>分镜表（含生成方式）</td><td>排生成任务与预算</td></tr>
          <tr><td>S4 生成</td><td>关键帧 + A 级视频片段</td><td>粗剪</td></tr>
          <tr><td>S5 音频</td><td>配音 + BGM + 音效</td><td>精剪与混音</td></tr>
          <tr><td>S6 剪辑</td><td>成片 + 封面 + 标题</td><td>发布</td></tr>
          <tr><td>S7 复盘</td><td>改进项（具体到集与镜）</td><td>下一批 S1 的输入</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="s0">阶段详解</h2>
    
<Stage no="S0" title="立项：先算账，再谈创意" meta="1–2 天 · 一页纸">
<Row k="输入">赛道候选、目标平台、可用预算、周期、能调动的产能（写手/美术/剪辑各几人）。</Row>
<Row k="做什么">① 定形态：竖屏漫剧 / 动态漫 / 真人短剧，三者的成本结构和观众预期完全不同；② 验证需求：目标平台上找至少 3 部同类爆款，记录它们的开头、集数、更新节奏；③ 拆成本：按「单集成本 × 集数 + 投流」倒推预算；④ 定集数与单集时长（常见 60–120 秒 × 60–100 集）。</Row>
<Row k="产出">一页纸企划：logline、受众画像、3 部对标、成本上限、排期、回收路径。</Row>
<Row k="关卡"><b>赛道是否有已验证需求？预算能否覆盖全剧而不是只够前十集？</b>两个问题有一个答不上来，就不要进 S1。</Row>
<Row k="常见坑">先做画面后想分发；对标只看爆款不看成本结构；把「AI 能生成」误当成「观众会看」。</Row>
<Row k="成本结构（示意）">剧本 8% · 视觉开发 12% · 生成 38% · 音频 14% · 剪辑 12% · 投流与运营 16%。比例会随画风和镜头数变化，但「生成」永远是最大头。</Row>
</Stage>
    
<Stage no="S1" title="剧本：前三集定生死" meta="3–5 天 · 可拍脚本">
<Row k="输入">一页纸企划。</Row>
<Row k="做什么">① 一句话 logline；② 人物小传，含外貌锚点（痣/疤/戒指这类能被画面验证的细节）；③ 全剧分集大纲，标出每 3 集的小打脸、每 10 集的大反转；④ 前 10 集成稿，其中第 1 集必须写到镜头级。</Row>
<Row k="产出">人物小传 + 分集大纲 + 单集剧本（镜头级：镜号、时长、景别、画面、台词、音效）。</Row>
<Row k="关卡"><b>前三集每集至少有 1 个钩子；每集结尾的扣指向下一集的具体事件；每集有 1 句能被截图传播的台词。</b></Row>
<Row k="常见坑">用旁白交代背景（观众划走）；台词文绉绉（配音一读就假）；一集塞三条主线（信息过载）。</Row>
<Row k="单集结构">冷开场 3–5s → 铺垫 → 冲突升级 → 反转 → 后果 → 结尾扣。详细节拍与时间码见 <Link href="/story" style={{ color: "var(--gold)" }}>剧本页</Link>。</Row>
</Stage>
    
<Stage no="S2" title="视觉开发：把角色钉死" meta="2–3 天 · 角色圣经">
<Row k="输入">剧本里所有出场角色与场景清单。</Row>
<Row k="做什么">① 选画风并写死一段「风格前缀」；② 每个角色出三视图（正/四分之三/侧/背），选定一张正面做参考图；③ 每个主演出 3 档表情（常态/压迫/破防）；④ 主要场景出底板（空镜，不带人）；⑤ 定色彩规范：主色、辅色、禁用色。</Row>
<Row k="产出">角色卡（外貌描述 + 锚点 + 正负向提示词 + seed）、场景底板、风格板。</Row>
<Row k="关卡"><b>同一角色在不同镜头、不同表情下是否一眼可辨？锚点是否每张都在？</b>做不到就回炉，不要进 S3。</Row>
<Row k="常见坑">三视图比例不一致；只锁脸不锁服装；场景每集重画（应该复用底板 + 局部换光）。</Row>
<Row k="一致性手段">参考图 + 固定 seed 是底线；角色锁提示词是纪律；LoRA/角色训练是加分项，不是必需项。</Row>
</Stage>
    
<Stage no="S3" title="分镜：分镜表就是预算表" meta="1 天/集 · 逐镜可执行">
<Row k="输入">单集剧本、角色卡、场景底板。</Row>
<Row k="做什么">① 把剧本拆成 25–45 个镜头，平均 3–5 秒/镜；② 每镜写清景别、画面、台词、时长；③ 给每镜标生成方式：A 视频 / B 关键帧 + 2D 动效 / C 平面或字幕卡；④ 估算关键帧数量与返工余量。</Row>
<Row k="产出">分镜表：镜号 / 时长 / 景别 / 画面 / 关键帧提示词 / 台词 / 动效方式。</Row>
<Row k="关卡"><b>镜头数是否匹配预算？有没有哪一镜删掉不影响信息？</b>删不掉的才留。</Row>
<Row k="镜头分级">A 级：情绪转折、动作、群像，值得生成 3–6 秒视频；B 级：对话与反应，关键帧 + 推拉/呼吸/视差即可；C 级：大屏、转账记录、聊天界面，直接做平面图。一般 A 级不超过总镜数的 30%。</Row>
<Row k="常见坑">每镜都想做成视频（成本翻三倍）；镜头语言全是中景（节奏平）；忘记给字幕留安全区。</Row>
</Stage>
    
<Stage no="S4" title="生成：先锁，再批量" meta="2–4 天/集 · 关键帧与视频">
<Row k="输入">分镜表、角色卡、场景底板。</Row>
<Row k="做什么">① 风格测试 3 镜，确认画风与提示词前缀；② 出角色三视图并锁参考图 + seed；③ 批量出关键帧，逐张记录模型/参数/耗时/费用；④ 只给 A 级镜头生成视频；⑤ 不合格的进返工队列，不混进正片。</Row>
<Row k="产出">每镜关键帧、A 级镜头视频片段、生成记录表。</Row>
<Row k="关卡"><b>一致性、手部/人脸瑕疵、时长是否够剪。</b>三条有一不过，就不要进入 S5。</Row>
<Row k="返工预算">按 20–40% 准备。分镜 36 镜，实际要出 45–50 张关键帧。低于 20% 说明你在降低标准，不是效率高。</Row>
<Row k="常见坑">一条提示词塞三件事（拆开）；先批量后锁角色（全废）；多人同框不控人数（生成一屋子克隆人）。</Row>
</Stage>
    
<Stage no="S5" title="音频：声音决定「贵不贵」" meta="1 天/集 · 混音完成">
<Row k="输入">粗剪画面、台词表。</Row>
<Row k="做什么">① 建角色音色表：音色、语速、情绪档；② 配音按镜号分段录，方便对齐；③ 铺 BGM（压迫/悬疑/爽感/温情/荒诞 五类够用）；④ 标音效点：纸张、椅子倒地、快门、电流、心跳；⑤ 混音。</Row>
<Row k="产出">配音轨、BGM、音效、混音成品。</Row>
<Row k="关卡"><b>对白是否清晰？口型是否可接受？情绪是否跟画面同向？</b></Row>
<Row k="混音基准">对白 -6dB 为基准；BGM 比对白低 12–18dB 并在台词处 ducking；整体峰值不超过 -1dBTP；导出前用手机外放试听一遍。</Row>
<Row k="口型策略">漫剧不必逐帧对口型。用「局部口型 + 表情切换 + 镜头切走」三招，成本降一个量级，观众感知差异很小。</Row>
</Stage>
    
<Stage no="S6" title="剪辑与包装：前 3 秒定完播" meta="1 天/集 · 可发布成片">
<Row k="输入">画面、音频、字幕文本。</Row>
<Row k="做什么">① 按节拍表粗剪，单镜 2–5 秒；② 反转处静音一拍再爆；③ 加字幕：安全区内、单行 ≤ 14 字、关键词描边；④ 做封面与标题；⑤ 导出 1080×1920 / 25 或 30fps / H.264。</Row>
<Row k="产出">单集成片、封面、标题、简介。</Row>
<Row k="关卡"><b>前 3 秒是否抓人？字幕是否溢出安全区？音量是否标准化？</b></Row>
<Row k="命名规范">S01E001_场景_版本.mp4。别用「最终版2真的最终」，三周后你会哭。</Row>
<Row k="常见坑">开头放 logo 或空镜（等于自杀）；字幕挡住脸；一集里三种字体。</Row>
</Stage>
    
<Stage no="S7" title="分发与复盘：把数据变成下一批的剧本" meta="持续 · 每批一次">
<Row k="输入">成片、投放素材、平台数据。</Row>
<Row k="做什么">① 按平台规则发布，准备 3 版封面/标题做 A/B；② 记录 3s 完播、完播率、追更率、付费转化、ROI；③ 掉量集回看分镜，定位是第几秒掉的；④ 输出下一批的改进项，一次只改一个变量。</Row>
<Row k="产出">投放记录、指标看板、复盘文档。</Row>
<Row k="关卡"><b>完播率与追更率是否达标？下一批具体改什么？</b>答不出具体改哪一集哪一镜，就等于没复盘。</Row>
<Row k="归因方法">掉在 0–3 秒 → 钩子问题；掉在 15–30 秒 → 铺垫太长；掉在结尾 → 扣不够硬；完播高但追更低 → 单集自洽但长线没拉力。</Row>
</Stage>

    <h2 id="ratio">成本结构：钱到底花在哪</h2>
    <p>下面是一集 110 秒、36 镜的漫剧的典型成本分布（比例示意，具体单价随供应商变化）。注意两件事：<strong>生成是大头</strong>，<strong>返工是隐性大头</strong>。</p>
    <div className="tablewrap">
      <table>
        <thead><tr><th>环节</th><th>占比</th><th>可控手段</th></tr></thead>
        <tbody>
          <tr><td>剧本与大纲</td><td className="num">8%</td><td>一次写对，比改十次便宜</td></tr>
          <tr><td>视觉开发</td><td className="num">12%</td><td>角色卡复用全剧，摊薄到每集几乎为零</td></tr>
          <tr><td>生成（关键帧 + 视频）</td><td className="num">38%</td><td>控制 A 级镜头比例、降低返工率</td></tr>
          <tr><td>音频</td><td className="num">14%</td><td>音色表固定，批量录</td></tr>
          <tr><td>剪辑包装</td><td className="num">12%</td><td>模板化字幕与封面</td></tr>
          <tr><td>投流与运营</td><td className="num">16%</td><td>先测 3 版素材，再放量</td></tr>
        </tbody>
      </table>
    </div>
    <div className="my-5 rounded-xl border border-gold/30 bg-gold/10 px-[18px] py-4 text-[14.5px] leading-[1.75] text-[#e8dcc4] [&_b]:text-gold">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] opacity-80">算账顺序</span>
      先算<b>单集生成成本</b>（见 <Link href="/storyboard#calc" style={{ color: "var(--gold)" }}>成本计算器</Link>），乘以集数，再加上音频、剪辑、投流。如果总数超过预算，优先砍 A 级镜头比例和集数，<b>不要砍角色一致性</b>。
    </div>
  </div>
</div>
  );
}
