import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ClientFX from "@/components/ClientFX";

export const metadata: Metadata = {
  title: {
    default: "漫剧工坊 · 竖屏漫剧制作教学",
    template: "%s · 漫剧工坊",
  },
  description:
    "从 logline 到 80 集成片：竖屏漫剧的八阶段生产流程、剧本节拍、角色锁定、分镜与成本计算。",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='88'%3E%F0%9F%8E%9E%EF%B8%8F%3C/text%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="js">
      <body>
        <div className="progress" />
        <SiteNav />
        {children}
        <SiteFooter />
        <ClientFX />
      </body>
    </html>
  );
}
