import type { Metadata } from "next";
import Checklist from "@/components/tools/Checklist";

export const metadata: Metadata = {
  title: "上线检查表",
  description: "竖屏漫剧从剧本到上线的逐项检查表，勾选状态自动保存在本地。",
};

export default function Page() {
  return (
<div className="mx-auto grid max-w-[1160px] gap-12 px-4 py-12 pb-20 sm:px-6 lg:grid-cols-[220px_1fr] lg:items-start">
  <aside className="sticky top-[88px] hidden text-[13.5px] lg:block" data-toc>
    <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-dim">本页目录</div>
    <a href="#progress" className="block py-1.5 text-muted transition hover:text-mist ">完成进度</a>
    <a href="#g-script" className="block py-1.5 text-muted transition hover:text-mist ">剧本</a>
    <a href="#g-visual" className="block py-1.5 text-muted transition hover:text-mist ">视觉开发</a>
    <a href="#g-shot" className="block py-1.5 text-muted transition hover:text-mist ">分镜与生成</a>
    <a href="#g-audio" className="block py-1.5 text-muted transition hover:text-mist ">音频</a>
    <a href="#g-edit" className="block py-1.5 text-muted transition hover:text-mist ">剪辑包装</a>
    <a href="#g-launch" className="block py-1.5 text-muted transition hover:text-mist ">上线与复盘</a>
    <a href="#metrics" className="block py-1.5 text-muted transition hover:text-mist pl-3 text-[12.5px] text-dim">指标口径</a>
  </aside>

  <div className="doc-main">
    <h1>上线检查表</h1>
    <p className="sub">发布前逐项过。勾选状态保存在本机浏览器，换设备不同步。任何一项没过，都不要点发布——补一集比删一条差评便宜。</p>

    <h2 id="progress">完成进度</h2>
<Checklist />

<h2 id="metrics">指标口径</h2>
    <div className="tablewrap">
      <table>
        <thead><tr><th>指标</th><th>定义</th><th>看什么</th></tr></thead>
        <tbody>
          <tr><td>3s 完播率</td><td>看完前 3 秒的比例</td><td>钩子是否成立，低于 60% 先改开头</td></tr>
          <tr><td>完播率</td><td>看完单集的比例</td><td>节奏与信息密度</td></tr>
          <tr><td>追更率</td><td>看完后点开下一集的比例</td><td>结尾扣是否够硬</td></tr>
          <tr><td>付费转化</td><td>卡点集的付费人数 / 触达人数</td><td>卡点位置与情绪峰值是否对齐</td></tr>
          <tr><td>ROI</td><td>流水 / 投流花费</td><td>决定是否放量</td></tr>
        </tbody>
      </table>
    </div>
    <div className="my-5 rounded-xl border border-gold/30 bg-gold/10 px-[18px] py-4 text-[14.5px] leading-[1.75] text-[#e8dcc4] [&_b]:text-gold">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] opacity-80">复盘纪律</span>
      一次只改一个变量。同时换封面、换开头、换卡点，你永远不知道是哪个起了作用。
    </div>
  </div>
</div>
  );
}
