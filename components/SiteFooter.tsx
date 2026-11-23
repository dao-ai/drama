"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_SECONDARY, isNavActive } from "@/lib/nav";

export default function SiteFooter() {
  const pathname = usePathname();
  return (
    <footer className="border-t border-line py-9 pb-14 text-[13px] text-dim print:hidden">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-x-8 gap-y-5 px-4 sm:px-6">
        <div>
          <div className="mb-1">🎞️ 漫剧工坊 · 竖屏漫剧制作教学站</div>
          <div className="text-[12px] text-dim/80">内容依据本工作区 SOP 与《退婚夜》样片实践整理 · 2026-11</div>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {NAV_SECONDARY.map((it) => {
            const active = isNavActive(pathname, it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={
                  "transition " +
                  (active ? "text-white" : "text-muted hover:text-mist")
                }
              >
                {it.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
