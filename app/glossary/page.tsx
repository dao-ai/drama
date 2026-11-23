import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "术语表",
  description: "漫剧与 AI 短剧常用名词解释：剧本叙事、视觉一致性、分镜生成、音频剪辑、成本与规格口径。",
};

type Term = { name: string; en?: string; def: string };
type Group = { id: string; title: string; kicker: string; terms: Term[] };

const GROUPS: Group[] = [
  {
    id: "story",
    title: "剧本与叙事",
    kicker: "Story",
    terms: [
      { name: "Logline", en: "一句话梗概", def: "一句话说清主角、核心冲突和看点，是立项一页纸企划的核心。" },
      { name: "钩子", en: "Hook", def: "让人停下来看下一秒的悬念或冲突点。前 3 秒要有一个，之后每 15–20 秒安排一次信息增量。" },
      { name: "冷开场", def: "片头 0:00–0:03 直接上冲突或异常，不做铺垫，先把人留住。" },
      { name: "节拍", en: "Beat", def: "单集里一个有明确功能的叙事段落；节拍表按时间码拆出功能、画面、台词、音效和钩子。" },
      { name: "结尾扣", def: "集尾留下指向下一集具体事件的悬念，而不是笼统的“欲知后事”。" },
      { name: "付费卡点", def: "短剧投流或解锁前的关键悬念位置，决定用户是否愿意继续看下一集、继续付费。" },
      { name: "分集大纲", def: "把全剧拆成逐集事件与转折点的总表，先于单集剧本完成，用于控制长线节奏。" },
    ],
  },
  {
    id: "visual",
    title: "视觉与一致性",
    kicker: "Visual",
    terms: [
      { name: "角色锁定", en: "Character Lock", def: "用三视图 + 固定参考图 + 固定 seed + 同一段外貌描述，让角色跨镜头、跨集不变脸。" },
      { name: "参考图", en: "Reference / cref", def: "定妆后作为后续生成基准的角色图或场景图，是一致性约束的一部分。" },
      { name: "外貌锚点", def: "角色身上必须复现的固定特征（痣、戒指、发缝、疤痕等），生成后逐项核对是否还在。" },
      { name: "一致性", def: "角色、场景、道具在不同镜头和集数间保持可辨认的同一状态；出现走形、换脸就是漂移失败。" },
      { name: "风格前缀", def: "全剧统一复制的一段画风描述（画幅、材质、光线、颗粒），写进每条提示词，中途不换。" },
      { name: "场景底板", def: "不带人物、可反复复用的背景图，保证多个镜头发生在同一个空间里。" },
      { name: "资产库", def: "角色、场景、道具三类可复用素材的归档集合，跨集调用，避免重复抽卡。" },
    ],
  },
  {
    id: "shot",
    title: "分镜与生成",
    kicker: "Storyboard",
    terms: [
      { name: "分镜表", def: "把剧本拆成逐镜的执行表：镜号、景别、画面、台词、时长、动效方式、提示词。" },
      { name: "景别", def: "镜头的取景范围（特写 / 近景 / 中景 / 全景），控制信息量和生成难度。" },
      { name: "关键帧", def: "一个镜头的静态主画面；多数漫剧镜头以关键帧加局部动效呈现，而不是整段视频。" },
      { name: "A/B/C 镜头分级", def: "按是否需要视频分档：A 级必须生成视频，B 级用关键帧 + 2D 动效，C 级用平面或字幕卡。" },
      { name: "首尾帧", def: "图生视频时给定的起始画面与结束画面，用来控制动作的起点和终点。" },
      { name: "文生视频", en: "T2V", def: "仅凭文字提示词生成视频片段。" },
      { name: "图生视频", en: "I2V", def: "以关键帧或参考图为起点生成动态片段，人物和构图更可控。" },
      { name: "2D 动效", def: "对静态关键帧做推拉、视差、呼吸、表情切换等局部运动，成本低于真实视频生成。" },
      { name: "提示词", en: "Prompt", def: "投喂生成模型的完整描述，包含风格前缀、主体、动作、镜头和光线。" },
      { name: "种子", en: "Seed", def: "生成随机数的固定起点；固定 seed 有助于复现结果和维持一致性。" },
    ],
  },
  {
    id: "audio",
    title: "音频与剪辑",
    kicker: "Audio",
    terms: [
      { name: "口型对齐", def: "画面嘴部与配音节奏匹配。漫剧多数镜头不逐帧对口型，目标是可接受、不出戏。" },
      { name: "混音", def: "把配音、BGM、音效平衡到同一轨成片，保证对白清晰、音乐不压人声。" },
      { name: "字幕安全区", def: "画面下方预留的字幕区域；单行字数、描边和位置有规格，避免字幕溢出或被遮挡。" },
    ],
  },
  {
    id: "cost",
    title: "成本与项目",
    kicker: "Cost",
    terms: [
      { name: "样片", def: "正式批量前先做的一集或几个测试镜头，用来验证画风、角色一致性和单集真实成本。" },
      { name: "返工率", def: "生成结果不合格、需要重做的比例。实际成本 = 单价 ×（1 + 返工率），先按 20–40% 起点预留。" },
      { name: "三镜测试", def: "用 3 个测试镜头对比不同画风或模型的一致性与成本，跑过再定档、再批量。" },
    ],
  },
  {
    id: "spec",
    title: "平台与规格",
    kicker: "Spec",
    terms: [
      { name: "竖屏 9:16", def: "手机全屏画幅，本站规格基线为 1080×1920，25/30fps。" },
      { name: "漫剧 / 动态漫画", en: "Motion Comic", def: "以静态关键帧加局部动效和配音呈现的竖屏剧集，区别于全片真人或全片视频生成。" },
    ],
  },
];

const TABLE_CLASS =
  "my-[18px] mb-6 overflow-x-auto rounded-2xl border border-line [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-[13.5px] [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_th]:bg-white/[0.04] [&_th]:px-3.5 [&_th]:py-[11px] [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.06em] [&_th]:text-muted [&_td]:border-b [&_td]:border-line [&_td]:px-3.5 [&_td]:py-[11px] [&_td]:text-left [&_td]:align-top [&_tbody_tr:hover]:bg-white/[0.02] [&_tr:last-child_td]:border-0";

export default function GlossaryPage() {
  return (
    <div className="mx-auto grid max-w-[1160px] gap-12 px-4 py-12 pb-20 sm:px-6 lg:grid-cols-[220px_1fr] lg:items-start">
      <aside className="sticky top-[88px] hidden text-[13.5px] lg:block" data-toc>
        <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-dim">本页目录</div>
        {GROUPS.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="block py-1.5 text-muted transition hover:text-mist ">
            {g.title}
          </a>
        ))}
      </aside>

      <div className="doc-main">
        <h1>术语表</h1>
        <p className="sub">
          站内反复出现的名词统一在这里解释。口径以本站流程和样片实践为准，遇到新说法可以对照着看。
        </p>

        {GROUPS.map((g) => (
          <section key={g.id}>
            <h2 id={g.id}>{g.title}</h2>
            <div className={TABLE_CLASS}>
              <table>
                <thead>
                  <tr><th>术语</th><th>解释</th></tr>
                </thead>
                <tbody>
                  {g.terms.map((t) => (
                    <tr key={t.name}>
                      <td>
                        <b>{t.name}</b>
                        {t.en && <div className="mt-0.5 text-[12px] text-dim">{t.en}</div>}
                      </td>
                      <td className="text-muted">{t.def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
