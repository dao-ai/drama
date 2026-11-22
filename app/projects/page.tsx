import type { Metadata } from "next";
import Link from "next/link";
import ProjectsClient from "@/components/ProjectsClient";

export const metadata: Metadata = {
  title: "报价库",
  description: "保存在本机的漫剧成本方案，支持多版本对比。",
  robots: { index: false, follow: false },
};

export default function ProjectsPage() {
  return (
    <main className="wrap py-14 pb-20">
      <div className="mb-7 max-w-[760px] [&_h1]:mb-3 [&_h1]:text-[clamp(30px,3.6vw,44px)] [&_h1]:leading-tight [&_h1]:tracking-[-0.02em] [&_p]:m-0 [&_p]:text-base [&_p]:text-muted">
        <div className="mb-2.5 text-xs font-bold uppercase tracking-[0.2em] text-flame">Library</div>
        <h1>报价库</h1>
        <p>
          保存的成本方案都在本机浏览器里。勾选 2–3 个做对比，第一个勾选的作为基准；改一个参数就能看出成本差在哪。
        </p>
      </div>
      <ProjectsClient />
      <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-[22px] py-3 text-[15px] font-semibold text-mist transition hover:bg-white/[0.07]" href="/storyboard#calc">
          去调新方案
        </Link>
      </div>
    </main>
  );
}
