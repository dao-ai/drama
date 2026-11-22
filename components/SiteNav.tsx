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
  { href: "/projects", label: "报价库" },
  { href: "/checklist", label: "上线清单" },
];

export default function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="topbar">
      <div className="inner">
        <Link className="brand" href="/">
          <span className="mark">🎞️</span>
          <span>
            漫剧工坊
            <small>MANJU WORKSHOP</small>
          </span>
        </Link>
        <nav className="nav">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={pathname === it.href ? "on" : undefined}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
