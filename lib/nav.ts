export type NavItem = { href: string; label: string };

/** 顶部导航：教学主线路径 */
export const NAV_PRIMARY: NavItem[] = [
  { href: "/", label: "首页" },
  { href: "/workflow", label: "全流程" },
  { href: "/story", label: "剧本" },
  { href: "/visual", label: "视觉 / 提示词" },
  { href: "/storyboard", label: "分镜 / 成本" },
  { href: "/checklist", label: "上线清单" },
];

/** 页脚导航：参考资料与个人工作台 */
export const NAV_SECONDARY: NavItem[] = [
  { href: "/tools", label: "工具选型" },
  { href: "/resources", label: "学习资源" },
  { href: "/projects", label: "报价库" },
];

/** 归一化路径后判断是否当前页（兼容有无尾斜杠） */
export function isNavActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  const norm = (p: string) => p.replace(/\/+$/, "") || "/";
  return norm(pathname) === norm(href);
}
