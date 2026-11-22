import type { Metadata } from "next";
import { estimate } from "@/lib/estimate";
import { listProjects } from "@/lib/store";
import ProjectList, { type ProjectView } from "@/components/ProjectList";

export const metadata: Metadata = {
  title: "报价库",
  description: "保存的漫剧成本方案，支持多版本对比。",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const saved = await listProjects();
  const projects: ProjectView[] = saved.map((p) => {
    const r = estimate(p.input);
    return {
      id: p.id,
      name: p.name,
      createdAt: p.createdAt,
      input: p.input,
      perEp: r.perEp,
      total: r.total,
      perMinute: r.perMinute,
      frameShare: r.frameShare,
    };
  });

  return (
    <main className="wrap page-head">
      <div className="sec-head">
        <div className="kicker">Library</div>
        <h1>报价库</h1>
        <p>
          保存的成本方案都在这里。勾选 2–3 个做对比，第一个作为基准；改一个参数就能看出成本差在哪。
        </p>
      </div>
      <ProjectList projects={projects} />
      <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a className="btn btn-ghost" href="/storyboard#calc">
          去调新方案
        </a>
        <a className="btn btn-ghost" href="/projects">
          刷新列表
        </a>
      </div>
    </main>
  );
}
