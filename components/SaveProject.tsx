"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { EstimateInput } from "@/lib/estimate";
import { addProject } from "@/lib/local-projects";

export default function SaveProject({ input }: { input: EstimateInput }) {
  const [name, setName] = useState(input.project);
  const [edited, setEdited] = useState(false);
  const [state, setState] = useState<"idle" | "done">("idle");

  // 用户未手动改名时，跟随报价里的项目名；手动改过则保留
  useEffect(() => {
    if (!edited) setName(input.project);
  }, [input.project, edited]);

  if (state === "done") {
    return (
      <div className="mx-auto mt-[18px] max-w-[900px] text-right text-sm text-teal [&_a]:text-gold">
        已保存到本机报价库 · <Link href="/projects">查看 / 对比 →</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-[18px] flex max-w-[900px] flex-wrap items-center justify-end gap-2.5">
      <input
        className="w-[300px] max-w-full rounded-[10px] border border-white/15 bg-[#0b0b10] px-3 py-2.5 text-sm text-white outline-none transition focus:border-flame/60 focus:ring-[3px] focus:ring-flame/10"
        value={name}
        maxLength={60}
        aria-label="方案名称"
        onChange={(e) => {
          setName(e.target.value);
          setEdited(true);
        }}
      />
      <button
        className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-gradient-to-br from-[#e8544f] to-[#c3332f] px-[22px] py-3 text-[15px] font-semibold text-white shadow-[0_10px_26px_rgba(224,67,63,0.28)] transition hover:-translate-y-px hover:shadow-[0_14px_32px_rgba(224,67,63,0.36)]"
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
