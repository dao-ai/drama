import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI 工具与模型选型",
  description:
    "竖屏漫剧的 AI 工具选型：文本、图像、视频、语音四类模型的强弱、成本档与组合方案，附三镜测试法。",
};

const COST = {
  low: "¥",
  mid: "¥¥",
  high: "¥¥¥",
};

function Cost({ level }: { level: "low" | "mid" | "high" }) {
  return (
    <span
      className="pill"
      title={
        level === "low" ? "低：单集可控在几十元级" : level === "mid" ? "中：单集百元级" : "高：单集数百元起"
      }
    >
      {COST[level]}
    </span>
  );
}

export default function ToolsPage() {
  return (
    <div className="wrap doc">
      <aside className="toc">
        <div className="t">本页目录</div>
        <a href="#rule">三条选型原则</a>
        <a href="#text">文本 / 剧本</a>
        <a href="#image">图像 / 关键帧</a>
        <a href="#video">视频 / 动效</a>
        <a href="#voice">语音 / 配音</a>
        <a href="#combo">三档组合</a>
        <a href="#test">三镜测试法</a>
        <a href="#buy">采购检查表</a>
        <a href="#trap">四个选型陷阱</a>
      </aside>

      <div className="doc-main">
        <h1>AI 工具与模型选型</h1>
        <p className="sub">
          选型不是选最强，是选「在你的镜头组合下返工最少」的那一个。本页按生产环节拆，给相对定位和测试方法，不追榜单。
        </p>

        <div className="note">
          <span className="label">先说清楚</span>
          模型能力和价格几乎每季度都在变，具体单价以供应商官网为准。这里给的是<b>选型框架、相对强弱和验证方法</b>，
          拿去做采购决策前，必须用你自己的角色和场景跑一遍样片。
        </div>

        <h2 id="rule">三条选型原则</h2>
        <div className="grid grid-3" style={{ margin: "18px 0 26px" }}>
          <div className="card">
            <div className="ico">🎯</div>
            <h3>先定环节，再定模型</h3>
            <p>同一个模型在关键帧和视频上表现完全不同。先明确这一环要解决什么，再比工具。</p>
          </div>
          <div className="card">
            <div className="ico">🔁</div>
            <h3>看返工率，不看 demo</h3>
            <p>官方 demo 都是精选。真正的成本 = 单价 × (1 + 返工率)。返工率高的便宜模型，往往更贵。</p>
          </div>
          <div className="card">
            <div className="ico">🧩</div>
            <h3>组合优于单点</h3>
            <p>没有一家通吃。常见做法是「一家出图、一家生视频、一家配音」，用文件交接。</p>
          </div>
        </div>

        <h2 id="text">文本 / 剧本</h2>
        <p>剧本环节的差异主要在中文语感、长上下文和结构稳定性。写 80 集大纲时，长上下文比单集文笔更重要。</p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr><th>模型</th><th>强项</th><th>短板</th><th>适合</th><th>成本</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><b>DeepSeek</b></td>
                <td>中文口语、爽点密度、价格低</td>
                <td>超长跨度设定容易漂</td>
                <td>分集大纲、台词初稿、批量改写</td>
                <td><Cost level="low" /></td>
              </tr>
              <tr>
                <td><b>Claude</b></td>
                <td>长文结构、人物一致性、对白节奏</td>
                <td>价格高、中文偶尔书面</td>
                <td>全剧大纲、人物小传、关键集精修</td>
                <td><Cost level="high" /></td>
              </tr>
              <tr>
                <td><b>GPT</b></td>
                <td>通用能力强、工具链成熟</td>
                <td>中文爽文语感偏保守</td>
                <td>结构梳理、检查表、批量格式化</td>
                <td><Cost level="mid" /></td>
              </tr>
              <tr>
                <td><b>Gemini</b></td>
                <td>多模态、长上下文</td>
                <td>中文创作风格不稳定</td>
                <td>读分镜图/表格、跨文档整理</td>
                <td><Cost level="mid" /></td>
              </tr>
              <tr>
                <td><b>Qwen / 开源</b></td>
                <td>中文、可私有部署、便宜</td>
                <td>需要自己搭和调</td>
                <td>批量生成、内部工具</td>
                <td><Cost level="low" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="note">
          <span className="label">用法</span>
          大纲用长上下文模型，单集台词用中文语感最好的模型，最后人工过一遍「能不能读出口」。别让一个模型干完所有事。
        </div>

        <h2 id="image">图像 / 关键帧</h2>
        <p>漫剧最关键的一环。判断标准只有三个：<b>角色一致性、手部/人脸、画面内文字</b>。风格好看是加分项，不是决定项。</p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr><th>工具</th><th>强项</th><th>短板</th><th>适合</th><th>成本</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Nano Banana（Gemini 图像）</b></td>
                <td>多图参考、角色一致性、自然语言改图</td>
                <td>精细构图控制弱、批量工作流少</td>
                <td>角色定妆、跨镜一致性、换装</td>
                <td><Cost level="mid" /></td>
              </tr>
              <tr>
                <td><b>Seedream（即梦）</b></td>
                <td>中文场景理解、海报级文字、速度快</td>
                <td>极端写实和手部偶有瑕疵</td>
                <td>关键帧批量、封面、大屏物料</td>
                <td><Cost level="low" /></td>
              </tr>
              <tr>
                <td><b>Flux + Kontext / LoRA</b></td>
                <td>局部编辑、可训练角色、可私有部署</td>
                <td>要工作流和调参能力</td>
                <td>长期项目、角色锁定、批量返工</td>
                <td><Cost level="mid" /></td>
              </tr>
              <tr>
                <td><b>Midjourney</b></td>
                <td>氛围、光影、风格统一</td>
                <td>一致性靠 cref/sref，文字差</td>
                <td>风格板、概念图、封面</td>
                <td><Cost level="mid" /></td>
              </tr>
              <tr>
                <td><b>Ideogram</b></td>
                <td>画面内文字排版</td>
                <td>人物一致性一般</td>
                <td>标题卡、截图道具、UI 画面</td>
                <td><Cost level="mid" /></td>
              </tr>
              <tr>
                <td><b>SD + LoRA（本地）</b></td>
                <td>完全可控、无审查、边际成本低</td>
                <td>部署与调参成本高</td>
                <td>长剧、需要固定角色的批量生产</td>
                <td><Cost level="low" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="video">视频 / 动效</h2>
        <p>漫剧不需要「全片视频」。只有 A 级镜头值得生成，判断标准是：<b>有没有人物动作或表情变化</b>。其余用关键帧 + 2D 动效。</p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr><th>工具</th><th>强项</th><th>短板</th><th>适合</th><th>成本</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Kling（可灵）</b></td>
                <td>人物动作、镜头语言、首尾帧、中文提示词</td>
                <td>长镜头稳定性一般</td>
                <td>情绪转折、动作镜头、双人对峙</td>
                <td><Cost level="mid" /></td>
              </tr>
              <tr>
                <td><b>Veo（Google）</b></td>
                <td>原生音频、物理与运镜、画面质感</td>
                <td>价格高、地区与配额限制</td>
                <td>关键爆点、预告片、需要同期声</td>
                <td><Cost level="high" /></td>
              </tr>
              <tr>
                <td><b>Runway</b></td>
                <td>参考一致性、编辑工具链完整</td>
                <td>单段时长短、成本偏高</td>
                <td>角色参考生成、局部重绘、广告感镜头</td>
                <td><Cost level="high" /></td>
              </tr>
              <tr>
                <td><b>Sora</b></td>
                <td>物理真实、叙事连贯、音频</td>
                <td>可用性与成本不稳定</td>
                <td>高概念镜头、海外投放素材</td>
                <td><Cost level="high" /></td>
              </tr>
              <tr>
                <td><b>Hailuo（海螺）</b></td>
                <td>人物表情、性价比、出片快</td>
                <td>复杂运镜弱</td>
                <td>对话反应、情绪特写</td>
                <td><Cost level="low" /></td>
              </tr>
              <tr>
                <td><b>Wan（通义万相）/ 开源</b></td>
                <td>可本地、可 LoRA、单价低</td>
                <td>质量上限和稳定性有限</td>
                <td>大批量 B 级镜头、成本敏感项目</td>
                <td><Cost level="low" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="note red">
          <span className="label">成本提醒</span>
          视频按秒计价，返工一次就是双倍。先用 3 段测试镜头验证「人物不崩、时长够剪」，再放量。
        </div>

        <h2 id="voice">语音 / 配音</h2>
        <p>漫剧的「贵不贵」很大程度由声音决定。选型看四点：中文自然度、情绪控制、克隆稳定性、商用授权。</p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr><th>工具</th><th>强项</th><th>短板</th><th>适合</th><th>成本</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><b>ElevenLabs</b></td>
                <td>情感细腻、多语种、声音设计</td>
                <td>中文偶有口音、价格高</td>
                <td>出海多语版本、旁白、角色音</td>
                <td><Cost level="high" /></td>
              </tr>
              <tr>
                <td><b>MiniMax Speech</b></td>
                <td>中文自然、情绪标签、价格低</td>
                <td>小语种覆盖一般</td>
                <td>中文正片、批量配音</td>
                <td><Cost level="low" /></td>
              </tr>
              <tr>
                <td><b>Fish Audio</b></td>
                <td>克隆快、便宜、上手简单</td>
                <td>长文本稳定性一般</td>
                <td>样片、临时角色、低成本项目</td>
                <td><Cost level="low" /></td>
              </tr>
              <tr>
                <td><b>Azure / Google TTS</b></td>
                <td>稳定、合规、批量接口成熟</td>
                <td>情感表现平</td>
                <td>旁白、系统音、企业项目</td>
                <td><Cost level="mid" /></td>
              </tr>
              <tr>
                <td><b>CosyVoice / IndexTTS（本地）</b></td>
                <td>免费、可私有、可微调</td>
                <td>需要显卡和部署</td>
                <td>长期项目、隐私要求高</td>
                <td><Cost level="low" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="combo">三档组合</h2>
        <p>别从「最强模型」开始配，从「这个项目的预算和返工容忍度」开始配。</p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr><th>档位</th><th>组合</th><th>单集成本量级</th><th>适合</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><b>验证档</b></td>
                <td>DeepSeek 写本 + Seedream 出图 + Hailuo/Wan 生视频 + MiniMax 配音</td>
                <td className="num">¥ 几十</td>
                <td>样片、试水、批量前验证</td>
              </tr>
              <tr>
                <td><b>量产档</b></td>
                <td>Claude/DeepSeek + Nano Banana 定妆 + Flux Kontext 批量 + Kling + ElevenLabs/MiniMax</td>
                <td className="num">¥ 100–300</td>
                <td>稳定更新的正片</td>
              </tr>
              <tr>
                <td><b>精品档</b></td>
                <td>Claude 精修 + SD/Flux LoRA 私有角色 + Veo/Sora 关键镜头 + ElevenLabs v3</td>
                <td className="num">¥ 300+</td>
                <td>出海、预告片、品牌项目</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ color: "var(--dim)", fontSize: 13 }}>
          金额是量级参考，不含投流和人力。真实数字用 <Link href="/storyboard#calc" style={{ color: "var(--gold)" }}>成本计算器</Link> 按你的镜头数算。
        </p>

        <h2 id="test">三镜测试法</h2>
        <p>任何模型在进入产线前，先跑这 3 个镜头。全部通过再谈批量。</p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr><th>测试镜</th><th>内容</th><th>通过标准</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><b>镜头 A</b></td>
                <td>同一角色，特写 / 中景 / 全景各一张</td>
                <td>脸、发型、服装锚点一致；手部无畸形</td>
              </tr>
              <tr>
                <td><b>镜头 B</b></td>
                <td>同一场景，暖光与冷光各一张</td>
                <td>空间结构不变，只变光；背景不漂</td>
              </tr>
              <tr>
                <td><b>镜头 C</b></td>
                <td>一段 4 秒人物动作或表情变化</td>
                <td>不崩脸、不变装、时长够剪、口型可接受</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>同时记录：单镜耗时、单镜费用、返工次数。三个数字出来，模型的好坏就不用争了。</p>

        <h2 id="buy">采购检查表</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr><th>项目</th><th>要问清楚</th></tr>
            </thead>
            <tbody>
              <tr><td>商用授权</td><td>生成内容能否商用、能否用于投流、是否需要署名</td></tr>
              <tr><td>并发与排队</td><td>高峰期限流吗？批量 50 张要多久</td></tr>
              <tr><td>数据留存</td><td>上传的参考图会不会被用于训练，能否关闭</td></tr>
              <tr><td>失败计费</td><td>生成失败、被审核拦截是否扣费</td></tr>
              <tr><td>发票与对公</td><td>能否开票、是否支持对公转账</td></tr>
              <tr><td>版本稳定性</td><td>模型升级会不会改变画风，能否锁定旧版本</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="trap">四个选型陷阱</h2>
        <div className="grid grid-2">
          <div className="card">
            <h3>① 用榜单代替测试</h3>
            <p>榜单测的是通用审美，不是你的角色。你的女主在 A 模型上可能比榜一更稳。</p>
          </div>
          <div className="card">
            <h3>② 只看单价不看返工</h3>
            <p>便宜 30% 但返工多一倍，实际成本更高。把返工率写进报价模型再比。</p>
          </div>
          <div className="card">
            <h3>③ 忽视中文提示词</h3>
            <p>团队用中文写提示词，模型对中文理解差就会多一层翻译损耗和歧义。</p>
          </div>
          <div className="card">
            <h3>④ 把所有环节押在一家</h3>
            <p>一家涨价或限流，整条线停摆。关键环节至少留一个备选。</p>
          </div>
        </div>

        <div className="note">
          <span className="label">下一步</span>
          选完模型，把单价填进 <Link href="/storyboard#calc" style={{ color: "var(--gold)" }}>成本计算器</Link>，
          再回 <Link href="/visual" style={{ color: "var(--gold)" }}>视觉开发</Link> 把角色锚点定死。工具只是变量，流程才是常量。
        </div>
      </div>
    </div>
  );
}
