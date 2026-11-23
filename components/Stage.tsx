"use client";

import { useState, type ReactNode } from "react";

export function Stage({
  no,
  title,
  meta,
  anchor,
  children,
}: {
  no: string;
  title: string;
  meta: string;
  anchor?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div
      id={anchor}
      className="my-4 scroll-mt-[88px] overflow-hidden rounded-2xl border border-line bg-panel"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3.5 border border-transparent bg-transparent bg-gradient-to-r from-flame/10 to-transparent px-[22px] py-[18px] text-left"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-flame/15 text-[13px] font-extrabold text-[#ff8a80]">
          {no}
        </span>
        <h3 className="m-0 text-[17px] font-bold">{title}</h3>
        <span className="ml-auto hidden text-xs whitespace-nowrap text-dim sm:block">{meta}</span>
      </button>
      {open && <div className="border-t border-line px-[22px] pb-[22px] pt-4">{children}</div>}
    </div>
  );
}

export function Row({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-dashed border-white/5 py-2.5 last:border-0 sm:grid-cols-[88px_1fr] sm:gap-3.5">
      <div className="pt-0.5 text-[12.5px] tracking-[0.08em] text-dim">{k}</div>
      <div className="text-[14.5px] leading-[1.75] text-[#c8c4cf]">{children}</div>
    </div>
  );
}
