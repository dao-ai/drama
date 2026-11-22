"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "首页" },
  { href: "/workflow", label: "全流程" },
  { href: "/story", label: "剧本" },
  { href: "/visual", label: "视觉 / 提示词" },
  { href: "/storyboard", label: "分镜 / 成本" },
  { href: "/tools", label: "工具选型" },
  { href: "/resources", label: "学习资源" },
  { href: "/projects", label: "报价库" },
  { href: "/checklist", label: "上线清单" },
];

export default function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-xl print:hidden">
      <div className="mx-auto flex h-14 max-w-[1160px] items-center gap-3 px-4 sm:h-16 sm:gap-7 sm:px-6">
        <Link className="flex items-center gap-2.5 font-bold tracking-wide whitespace-nowrap" href="/">
          <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-gradient-to-br from-flame to-[#8f2421] text-[17px] shadow-[0_6px_18px_rgba(224,67,63,0.3)]">
            🎞️
          </span>
          <span>
            漫剧工坊
            <small className="hidden text-[11px] font-medium tracking-[0.14em] text-muted sm:block">
              MANJU WORKSHOP
            </small>
          </span>
        </Link>
        <nav className="ml-auto flex gap-0 overflow-x-auto [scrollbar-width:none] sm:gap-1">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={
                "whitespace-nowrap rounded-full px-2.5 py-1.5 text-[12.5px] transition sm:px-3.5 sm:text-sm " +
                (pathname === it.href
                  ? "bg-flame/15 text-white shadow-[inset_0_0_0_1px_rgba(224,67,63,0.35)]"
                  : "text-muted hover:bg-white/5 hover:text-mist")
              }
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
