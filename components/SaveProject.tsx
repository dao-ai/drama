"use client";

import Link from "next/link";
import { useState } from "react";
import type { EstimateInput } from "@/lib/estimate";

export default function SaveProject({ input }: { input: EstimateInput }) {
  const [name, setName] = useState(input.project);
  const [state, setState] = useState<"idle" | "saving" | "done" | "error">("idle");

  const save = async () => {
    setState("saving");
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, ...input }),
      });
      if (!res.ok) throw new Error("save failed");
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="save-done">
        已保存到报价库 · <Link href="/projects">查看 / 对比 →</Link>
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
      <button className="btn btn-primary" onClick={save} disabled={state === "saving"}>
        {state === "saving" ? "保存中…" : "保存到报价库"}
      </button>
      {state === "error" && <span className="save-err">保存失败，检查服务后再试</span>}
    </div>
  );
}
