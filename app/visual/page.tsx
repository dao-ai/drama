import type { Metadata } from "next";
import CodeBox from "@/components/CodeBox";
import PromptBuilder from "@/components/tools/PromptBuilder";

export const metadata: Metadata = {
  title: "视觉开发与角色锁定",
  description: "漫剧角色一致性方法：风格前缀、外貌锚点、三视图、固定 seed、场景底板与提示词生成器。",
};

export default function Page() {
  return (
<div className="mx-auto grid max-w-[1160px] gap-12 px-4 py-12 pb-20 sm:px-6 lg:grid-cols-[220px_1fr] lg:items-start">
  <aside className="sticky top-[88px] hidden text-[13.5px] lg:block" data-toc>
    <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-dim">本页目录</div>
    <a href="#problem" className="block py-1.5 text-muted transition hover:text-mist ">一致性为什么难</a>
    <a href="#three" className="block py-1.5 text-muted transition hover:text-mist ">三层锁定法</a>
    <a href="#anchor" className="block py-1.5 text-muted transition hover:text-mist ">锚点设计</a>
    <a href="#turnaround" className="block py-1.5 text-muted transition hover:text-mist ">三视图规范</a>
    <a href="#expressions" className="block py-1.5 text-muted transition hover:text-mist ">表情三档</a>
    <a href="#promptgen" className="block py-1.5 text-muted transition hover:text-mist ">提示词生成器</a>
    <a href="#scene" className="block py-1.5 text-muted transition hover:text-mist ">场景底板</a>
    <a href="#negative" className="block py-1.5 text-muted transition hover:text-mist ">负向提示词</a>
    <a href="#fail" className="block py-1.5 text-muted transition hover:text-mist ">六种典型翻车</a>
  </aside>

  <div className="doc-main">
    <h1>视觉开发与角色锁定</h1>
    <p className="sub">观众能原谅画风普通，不能原谅女主每集换脸。这一页讲的是怎么把「同一个人」这件事变成可执行的参数，而不是靠运气抽卡。</p>

    <h2 id="problem">一致性为什么难</h2>
    <p>生成模型没有「记忆」。它每次都在根据文字重新想象一张脸。你写「24 岁冷白皮黑长直」，它每次给你的「冷白皮」都不是同一个色号，「黑长直」的发缝位置也不一样。</p>
    <p>所以一致性不能靠描述，要靠<strong>约束</strong>：同一段固定文本 + 同一张参考图 + 同一个种子。三者缺一，就会漂移。</p>

    <h2 id="three">三层锁定法</h2>
    <div className="grid grid-3" style={{ margin: "18px 0 26px" }}>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]">
        <div className="ico">🎨</div>
        <h3>第一层：风格前缀</h3>
        <p>所有提示词共用的开头，锁定画风、光线、质感。写死，不改，不即兴发挥。</p>
      </div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]">
        <div className="ico">📍</div>
        <h3>第二层：外貌锚点</h3>
        <p>每张图都重复同一段外貌描述，并且带 2–3 个可验证的锚点：痣、疤、戒指、发缝。</p>
      </div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]">
        <div className="ico">🔒</div>
        <h3>第三层：参考图 + seed</h3>
        <p>选定一张正面图作为参考，固定 seed。后续所有镜头都从这张图出发，而不是从文字重新开始。</p>
      </div>
    </div>

    <h3>统一风格前缀（直接复制）</h3>
    <CodeBox>
<pre><code>vertical 9:16 cinematic keyframe, semi-realistic Chinese urban drama animation, glossy skin, detailed fabric, volumetric light, shallow depth of field, subtle film grain</code></pre>
</CodeBox>
    <p>这段前缀决定了「看起来像同一部剧」。换画风就整体换，不要一集换一个。前缀之后才是镜头内容，顺序是：<code>风格 → 景别 → 角色 → 动作 → 场景 → 光线 → 情绪</code>。</p>

    <h2 id="anchor">锚点设计</h2>
    <p>好的锚点必须满足三条：<strong>能画出来、左右不对称、不随表情消失</strong>。下面是一组实际在用的锚点：</p>
    <div className="my-[18px] mb-6 overflow-x-auto rounded-2xl border border-line [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_th]:bg-white/[0.04] [&_th]:px-3.5 [&_th]:py-[11px] [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.06em] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:px-3.5 [&_td]:py-[11px] [&_td]:text-left [&_td]:align-top [&_tbody_tr:hover]:bg-white/[0.02] [&_tr:last-child_td]:border-0 [&_td.num]:whitespace-nowrap [&_td.num]:tabular-nums">
      <table>
        <thead><tr><th>角色</th><th>锚点</th><th>为什么选它</th></tr></thead>
        <tbody>
          <tr><td>苏念</td><td>右眼尾小痣 · 左手无名指银戒 · 中分发缝</td><td>三个锚点分布在脸、手、发型，任一景别至少能看到一个</td></tr>
          <tr><td>陆执</td><td>左眉尾浅疤 · 背头 · 深灰三件套</td><td>疤痕是强身份标记，服装是低成本识别符</td></tr>
          <tr><td>苏曼曼</td><td>右眼下方泪痣 · 栗棕长卷发 · 粉色缎面裙</td><td>与女主的黑长直形成高对比，同框不混</td></tr>
          <tr><td>苏国强</td><td>左手沉香手串 · 金丝眼镜 · 地中海</td><td>手串能在手部特写里出现，补足年龄识别</td></tr>
        </tbody>
      </table>
    </div>
    <div className="my-5 rounded-xl border border-gold/30 bg-gold/10 px-[18px] py-4 text-[14.5px] leading-[1.75] text-[#e8dcc4] [&_b]:text-gold">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] opacity-80">规则</span>
      锚点一旦确定，就写进角色卡，<b>每一条提示词都带上</b>。不要因为这一镜拍不到手就省略——省略一次，模型就会开始自由发挥。
    </div>

    <h2 id="turnaround">三视图规范</h2>
    <p>三视图不是给观众看的，是给模型看的。它的作用是提供一份「全身比例 + 服装结构」的权威参考。</p>
    <ul>
      <li><strong>四视图</strong>：正面、四分之三、侧面、背面，同一站姿，中性表情。</li>
      <li><strong>纯色背景</strong>：浅灰影棚，柔光，无道具、无文字。</li>
      <li><strong>全身入画</strong>：从头顶到脚底，不裁切，比例一致。</li>
      <li><strong>服装完整</strong>：纽扣、领口、鞋型都要清楚，后续换装也基于这套结构改。</li>
    </ul>
    <div className="my-5 rounded-xl border border-gold/30 bg-gold/10 px-[18px] py-4 text-[14.5px] leading-[1.75] text-[#e8dcc4] [&_b]:text-gold">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] opacity-80">验收</span>
      把四张视图并排，看<b>肩宽、头身比、眼距、发际线</b>是否一致。有一项明显漂移，重出，不要凑合。
    </div>

    <h2 id="expressions">表情三档：够用就好</h2>
    <p>不需要做表情包全集。三个档位覆盖 80% 的剧情：</p>
    <div className="grid grid-3" style={{ margin: "18px 0 24px" }}>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>① 常态 / 假笑</h3><p>社交状态。用于铺垫、试探、装乖。眼睛不笑是关键。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>② 冷脸 / 压迫</h3><p>掌控状态。用于反击、谈判、亮底牌。下巴微抬，眼神直视。</p></div>
      <div className="relative rounded-2xl border border-line bg-gradient-to-br from-panel to-[#101017] p-[22px] transition duration-200 hover:-translate-y-0.5 hover:border-white/15 [&_h3]:mb-2 [&_h3]:mt-2.5 [&_h3]:text-[17px] [&_h3]:font-bold [&_p]:m-0 [&_p]:text-sm [&_p]:leading-[1.7] [&_p]:text-muted [&_.ico]:text-[22px]"><h3>③ 破防 / 失控</h3><p>情绪爆点。用于反转之后的后果拍。眼红、忍泪、表情裂开。</p></div>
    </div>
    <p>每档出一张半身参考，深灰背景、柔光。后面所有镜头从这三张里选最接近的做参考图，比每次文字描述稳得多。</p>

    <h2 id="promptgen">提示词生成器</h2>
    <p>选角色、选类型，直接生成带风格前缀的完整提示词。这就是「角色卡 + 前缀」的合体，改镜头内容时只改最后一段。</p>
    <PromptBuilder />

    <h2 id="scene">场景底板：空镜复用</h2>
    <p>场景要出「空镜底板」，不带人。后续所有该场景的镜头，都是「底板 + 角色 + 换光」。这样宴会厅只画一次，就能用 20 集。</p>
    <CodeBox>
<pre><code>grand hotel banquet hall with crystal chandeliers, round tables with white linens, warm gold ambient light, empty hall before guests arrive, flower-decorated stage, red carpet aisle, symmetrical vertical composition</code></pre>
</CodeBox>
    <p>同一底板上做变体，比重新生成便宜得多：</p>
    <ul>
      <li><strong>满座版</strong>：加 <code>crowd of well-dressed guests seated at round tables, photographers near the aisle</code></li>
      <li><strong>死寂版</strong>：加 <code>guests frozen in shock, desaturated color, harsh blue LED screen light</code></li>
      <li><strong>夜晚版</strong>：把主光换成 <code>cold blue moonlight through tall windows, single spotlight on stage</code></li>
    </ul>
    <div className="my-5 rounded-xl border border-gold/30 bg-gold/10 px-[18px] py-4 text-[14.5px] leading-[1.75] text-[#e8dcc4] [&_b]:text-gold">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] opacity-80">省钱技巧</span>
      大屏内容（转账记录、学历查询页、直播界面、录音波形）<b>全部做平面设计图</b>，不做生成。它们是信息载体，不是美术资产，做平面又快又准。
    </div>

    <h2 id="negative">负向提示词</h2>
    <p>负向提示词是护栏，不是装饰。每次生成都带上，尤其是人物特写。</p>
    <CodeBox>
<pre><code>extra fingers, deformed hands, text artifacts, watermark, duplicate face, plastic skin, overexposed, wide-angle distortion</code></pre>
</CodeBox>
    <p>按项目追加：古装加 <code>modern clothing, zipper, wristwatch</code>；群像加 <code>cloned faces, identical twins, merged bodies</code>。</p>

    <h2 id="fail">六种典型翻车</h2>
    <div className="my-[18px] mb-6 overflow-x-auto rounded-2xl border border-line [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_th]:bg-white/[0.04] [&_th]:px-3.5 [&_th]:py-[11px] [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.06em] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:px-3.5 [&_td]:py-[11px] [&_td]:text-left [&_td]:align-top [&_tbody_tr:hover]:bg-white/[0.02] [&_tr:last-child_td]:border-0 [&_td.num]:whitespace-nowrap [&_td.num]:tabular-nums">
      <table>
        <thead><tr><th>现象</th><th>原因</th><th>修法</th></tr></thead>
        <tbody>
          <tr><td>每张脸都不一样</td><td>没有参考图，只靠文字</td><td>锁参考图 + seed，文字只做补充</td></tr>
          <tr><td>手部畸形</td><td>手部特写占比过高</td><td>改景别、加负向、必要时用手部替身图</td></tr>
          <tr><td>画面里有乱码文字</td><td>提示词里要求了文字</td><td>不在图里生成文字，后期贴字幕/贴图</td></tr>
          <tr><td>多人同框变克隆人</td><td>没控人数和位置</td><td>明确 <code>two people, one on the left, one on the right</code></td></tr>
          <tr><td>镜面反射穿帮</td><td>模型不理解镜面</td><td>镜面镜头单独生成，或改成背身 + 反打</td></tr>
          <tr><td>服装每集变</td><td>描述里省略了服装细节</td><td>服装写进角色卡，逐条复制</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
}
