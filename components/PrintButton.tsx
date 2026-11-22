"use client";

export default function PrintButton() {
  return (
    <button className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-gradient-to-br from-[#e8544f] to-[#c3332f] px-[22px] py-3 text-[15px] font-semibold text-white shadow-[0_10px_26px_rgba(224,67,63,0.28)] transition hover:-translate-y-px hover:shadow-[0_14px_32px_rgba(224,67,63,0.36)]" onClick={() => window.print()}>
      打印 / 存为 PDF
    </button>
  );
}
