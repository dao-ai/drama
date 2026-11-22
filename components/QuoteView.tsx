"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DEFAULT_INPUT, parseInput, toQuery, type EstimateInput } from "@/lib/estimate";
import { downloadEstimateCsv } from "@/lib/download";
import PrintButton from "@/components/PrintButton";
import SaveProject from "@/components/SaveProject";
import QuoteSheet from "@/components/QuoteSheet";

const GHOST =
  "inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-[22px] py-3 text-[15px] font-semibold text-mist transition hover:bg-white/[0.07]";

export default function QuoteView() {
  const [input, setInput] = useState<EstimateInput>(DEFAULT_INPUT);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.toString()) {
      setInput(parseInput(Object.fromEntries(sp.entries())));
    }
  }, []);

  return (
    <main className="wrap py-12 pb-[90px] print:py-0">
      <QuoteSheet input={input} />

      <SaveProject input={input} />

      <div className="mx-auto mt-[22px] flex max-w-[900px] flex-wrap justify-end gap-3 print:hidden">
        <Link className={GHOST} href={"/storyboard?" + toQuery(input) + "#calc"}>
          调整参数
        </Link>
        <button className={GHOST} onClick={() => downloadEstimateCsv(input)}>
          下载 CSV
        </button>
        <PrintButton />
      </div>
    </main>
  );
}
