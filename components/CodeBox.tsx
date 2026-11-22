"use client";

import { useRef, useState, type ReactNode } from "react";

export default function CodeBox({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = ref.current?.querySelector("code, pre")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      ref={ref}
      className={
        "relative my-4 [&_pre]:m-0 [&_pre]:overflow-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-line [&_pre]:bg-[#0c0c11] [&_pre]:px-[18px] [&_pre]:py-[18px] [&_pre]:font-mono [&_pre]:text-[12.5px] [&_pre]:leading-[1.75] [&_pre]:text-[#b9c6c4] " +
        className
      }
    >
      <button
        type="button"
        onClick={copy}
        className={
          "absolute right-2.5 top-2.5 rounded-[7px] border border-white/15 bg-white/[0.07] px-2.5 py-1 text-[11.5px] text-muted transition hover:bg-white/[0.14] hover:text-white " +
          (copied ? "border-teal/40 text-teal" : "")
        }
      >
        {copied ? "已复制 ✓" : "复制"}
      </button>
      {children}
    </div>
  );
}
