"use client";

import { useEffect } from "react";

/** 渐进增强：滚动浮现、目录高亮、复制按钮、阶段折叠 */
export default function ClientFX() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".progress");
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (bar) bar.style.width = (p * 100).toFixed(2) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const rvs = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  e.target.classList.add("in");
                  io?.unobserve(e.target);
                }
              });
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
          )
        : null;
    rvs.forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

    const tocLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-toc] a[href^='#']")
    );
    let io2: IntersectionObserver | null = null;
    if (tocLinks.length && typeof IntersectionObserver !== "undefined") {
      const map = new Map<string, HTMLAnchorElement>();
      tocLinks.forEach((a) => {
        const id = a.getAttribute("href")!.slice(1);
        const el = document.getElementById(id);
        if (el) map.set(id, a);
      });
      io2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && map.has(e.target.id)) {
              tocLinks.forEach((a) => a.classList.remove("on"));
              map.get(e.target.id)!.classList.add("on");
            }
          });
        },
        { rootMargin: "-15% 0px -70% 0px" }
      );
      map.forEach((_, id) => {
        const el = document.getElementById(id);
        if (el) io2!.observe(el);
      });
    }


    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      io2?.disconnect();
    };
  }, []);

  return null;
}
