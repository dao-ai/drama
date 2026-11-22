"use client";

import Link from "next/link";
import { useState } from "react";
import type { EstimateInput } from "@/lib/estimate";
import { addProject } from "@/lib/local-projects";

export default function SaveProject({ input }: { input: EstimateInput }) {
  const [name, setName] = useState(input.project);
  const [state, setState] = useState<"idle" | "done">("idle");

  if (state === "done") {
    return (
      <div className="save-done">
        已保存到本机报价库 · <Link href="/projects">查看 / 对比 →</Link>
      </div>
    );
  }

  return (
    <div className="save-row">
      <input
        className="save-name"
        value={name}
        maxLength={60}
        aria-label="方案名称"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={() => {
          addProject(name, input);
          setState("done");
        }}
      >
        保存到报价库
      </button>
    </div>
  );
}
