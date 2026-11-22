"use client";

import { useEffect, useState } from "react";
import ProjectList, { type ProjectView } from "./ProjectList";
import { estimate } from "@/lib/estimate";
import { loadProjects, removeProject } from "@/lib/local-projects";

export default function ProjectsClient() {
  const [views, setViews] = useState<ProjectView[] | null>(null);

  const load = () => {
    const list = loadProjects();
    setViews(
      list.map((p) => {
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
      })
    );
  };

  useEffect(load, []);

  if (views === null) {
    return <p className="mt-3 text-[13px] text-dim">读取本机报价…</p>;
  }

  return (
    <ProjectList
      projects={views}
      onDelete={(id) => {
        removeProject(id);
        load();
      }}
    />
  );
}
