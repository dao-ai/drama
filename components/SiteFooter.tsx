import Link from "next/link";
import { NAV_SECONDARY } from "@/lib/nav";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line py-9 pb-14 text-[13px] text-dim print:hidden">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-x-8 gap-y-5 px-4 sm:px-6">
        <div>
          <div className="mb-1">🎞️ 漫剧工坊 · 竖屏漫剧制作教学站</div>
          <div className="text-[12px] text-dim/80">内容依据本工作区 SOP 与《退婚夜》样片实践整理 · 2026-11</div>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {NAV_SECONDARY.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="text-muted transition hover:text-mist"
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
