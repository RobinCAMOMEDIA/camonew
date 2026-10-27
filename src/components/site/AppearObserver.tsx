"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Adds `.is-in` to every [data-appear] element the first time it scrolls into
// view. The actual motion lives in CSS (short, 0.5–0.9s). Re-binds on route
// change. Without JS the CSS never hides anything (see `.js-appear` gate).
export function AppearObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js-appear");
    const els = document.querySelectorAll<HTMLElement>("[data-appear]:not(.is-in)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
