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
      document.querySelectorAll<HTMLAnchorElement>(".toc a[href^='#']")
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

    const onClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;
      const btn = target.closest(".copy") as HTMLButtonElement | null;
      if (btn) {
        const box = btn.closest(".codebox");
        const code = box?.querySelector("code, pre");
        if (!code) return;
        const text = (code as HTMLElement).innerText;
        const done = () => {
          const old = btn.textContent;
          btn.textContent = "已复制 ✓";
          btn.classList.add("ok");
          window.setTimeout(() => {
            btn.textContent = old;
            btn.classList.remove("ok");
          }, 1600);
        };
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(text).then(done, () => fallback(text, done));
        } else fallback(text, done);
      }

    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      io?.disconnect();
      io2?.disconnect();
    };
  }, []);

  return null;
}

function fallback(text: string, cb: () => void) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    cb();
  } catch {}
  document.body.removeChild(ta);
}
