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
    <main className="wrap page-head">
      <div className="sec-head">
        <div className="kicker">Library</div>
        <h1>报价库</h1>
        <p>
          保存的成本方案都在本机浏览器里。勾选 2–3 个做对比，第一个勾选的作为基准；改一个参数就能看出成本差在哪。
        </p>
      </div>
      <ProjectsClient />
      <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link className="btn btn-ghost" href="/storyboard#calc">
          去调新方案
        </Link>
      </div>
    </main>
  );
}
