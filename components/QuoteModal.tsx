"use client";

import Link from "next/link";
import { useEffect } from "react";
import { toQuery, type EstimateInput } from "@/lib/estimate";
import { downloadEstimateCsv } from "@/lib/download";
import PrintButton from "@/components/PrintButton";
import SaveProject from "@/components/SaveProject";
import QuoteSheet from "@/components/QuoteSheet";

const GHOST =
  "inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-3.5 py-2 text-[13px] font-semibold text-mist transition hover:bg-white/10";

export default function QuoteModal({
  input,
  onClose,
}: {
  input: EstimateInput;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="报价单预览"
      className="fixed inset-0 z-[70] overflow-y-auto bg-black/70 p-4 backdrop-blur-sm print:static print:overflow-visible print:bg-transparent print:p-0"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="关闭"
        onClick={onClose}
        className="fixed right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-ink-soft text-lg text-mist transition hover:bg-white/10 print:hidden"
      >
        ✕
      </button>

      <div
        className="relative mx-auto my-4 w-full max-w-[980px] print:my-0 print:max-w-none"
        onClick={(e) => e.stopPropagation()}
      >
        <QuoteSheet input={input} />

        <div className="mt-4 print:hidden">
          <SaveProject input={input} />
        </div>

        <div className="mt-3 flex flex-wrap justify-end gap-2 print:hidden">
          <Link className={GHOST} href={"/quote?" + toQuery(input)}>
            独立页打开
          </Link>
          <button className={GHOST} onClick={() => downloadEstimateCsv(input)}>
            下载 CSV
          </button>
          <PrintButton />
          <button className={GHOST} onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
