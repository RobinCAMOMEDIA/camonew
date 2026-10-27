"use client";

import { useEffect } from "react";

// The CAMO cursor: a small orange square that follows the pointer and swells
// over anything clickable; it turns ink over orange grounds
// ([data-ground="orange"]). Fine pointers only. Styles: `.x-cursor` in site.css.
export function SiteCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = document.createElement("div");
    cursor.className = "x-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursor);

    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      raf = 0,
      started = false;

    const frame = () => {
      cx += (x - cx) * 0.35;
      cy += (y - cy) * 0.35;
      // `translate`, not `transform`: it is applied after the CSS `scale`,
      // so shrinking the square never scales its position along with it.
      cursor.style.translate = `${cx}px ${cy}px`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.2 ? requestAnimationFrame(frame) : 0;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!started) {
        cx = x;
        cy = y;
        started = true;
      }
      const t = e.target as HTMLElement | null;
      cursor.classList.toggle(
        "is-hover",
        !!t?.closest?.("a, button, [role='button'], input, select, textarea, label"),
      );
      cursor.classList.toggle(
        "is-on-orange",
        !!t?.closest?.("[data-ground='orange'], .cn-menu.is-open"),
      );
      if (!raf) raf = requestAnimationFrame(frame);
    };

    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      cursor.remove();
    };
  }, []);

  return null;
}
