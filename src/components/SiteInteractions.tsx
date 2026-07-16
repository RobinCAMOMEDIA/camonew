"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Ports the global animations/interactions from the original js/main.js:
// scroll-reveal, work-card tilt, service-card glow, about counter, live clock,
// hero parallax, custom cursor and the (placeholder) language toggle.
// Re-runs on route change so newly-rendered .reveal elements get observed.
export function SiteInteractions() {
  const pathname = usePathname();

  // Per-navigation: reveal observer + counters (must re-bind to new DOM nodes).
  useEffect(() => {
    const revealEls = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale",
    );
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    // About stats counter animation.
    const animateCounter = (el: Element, target: number, suffix = "") => {
      let current = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const step = () => {
        current += increment;
        if (current >= target) {
          el.textContent = target + suffix;
          return;
        }
        el.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(step);
      };
      step();
    };

    const statNumbers = document.querySelectorAll(".about__stat-number");
    let statsAnimated = false;
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach((stat) => {
              const text = stat.textContent ?? "";
              const numericMatch = text.match(/(\d+)/);
              if (numericMatch) {
                const number = parseInt(numericMatch[1]);
                const suffix = text.replace(numericMatch[1], "");
                stat.textContent = "0" + suffix;
                animateCounter(stat, number, suffix);
              }
            });
            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    const aboutSection = document.getElementById("about");
    if (aboutSection) statsObserver.observe(aboutSection);

    return () => {
      revealObserver.disconnect();
      statsObserver.disconnect();
    };
  }, [pathname]);

  // Mount-once: tilt, glow, clock, parallax, cursor, lang toggle.
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // Work-card tilt + service-card glow (event delegation so it survives
    // route changes without re-binding).
    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest(".work-card") as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      }
      const service = target.closest(".service-card") as HTMLElement | null;
      if (service) {
        const rect = service.getBoundingClientRect();
        service.style.setProperty(
          "--mouse-x",
          `${((e.clientX - rect.left) / rect.width) * 100}%`,
        );
        service.style.setProperty(
          "--mouse-y",
          `${((e.clientY - rect.top) / rect.height) * 100}%`,
        );
      }
      // Hero: reveal the background grid + orange glow under the cursor.
      // The CSS reads --hero-mouse-x/y for both the grid mask and the glow.
      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          hero.style.setProperty(
            "--hero-mouse-x",
            `${((e.clientX - rect.left) / rect.width) * 100}%`,
          );
          hero.style.setProperty(
            "--hero-mouse-y",
            `${((e.clientY - rect.top) / rect.height) * 100}%`,
          );
        }
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest?.(".work-card") as HTMLElement | null;
      if (card && !card.contains(e.relatedTarget as Node)) {
        card.style.transform = "";
      }
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseout", onMouseOut);
    cleanups.push(() => document.removeEventListener("mousemove", onMouseMove));
    cleanups.push(() => document.removeEventListener("mouseout", onMouseOut));

    // Live clock widget (home hero).
    const clockEl = document.getElementById("hero-clock");
    let clockTimer: ReturnType<typeof setInterval> | undefined;
    if (clockEl) {
      const update = () => {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, "0");
        const m = String(now.getMinutes()).padStart(2, "0");
        const s = String(now.getSeconds()).padStart(2, "0");
        clockEl.textContent = `${h}:${m}:${s} [CET]`;
      };
      update();
      clockTimer = setInterval(update, 1000);
      cleanups.push(() => clockTimer && clearInterval(clockTimer));
    }

    // NOTE: the old hero grid parallax (scale + translateY-down + fade on
    // scroll) was removed — the pinned HeroScroll animation now owns the hero
    // scroll motion, gliding the video wall left only (no downward drift, no
    // early fade). The vertical CULTURE/AGENCY watermarks are hidden in the
    // split hero, so their parallax is gone too.

    // Subtle custom cursor (desktop only).
    if (window.matchMedia("(pointer: fine)").matches) {
      const cursor = document.createElement("div");
      cursor.style.cssText = `position:fixed;width:20px;height:20px;border:1.5px solid rgba(255,125,0,0.35);border-radius:2px;pointer-events:none;z-index:9998;transition:transform 0.15s cubic-bezier(0.16,1,0.3,1),width 0.2s ease,height 0.2s ease,border-color 0.2s ease;mix-blend-mode:difference;`;
      document.body.appendChild(cursor);
      let cx = 0,
        cy = 0,
        curX = 0,
        curY = 0,
        raf = 0;
      const onMove = (e: MouseEvent) => {
        cx = e.clientX;
        cy = e.clientY;
      };
      document.addEventListener("mousemove", onMove);
      const animate = () => {
        curX += (cx - curX) * 0.12;
        curY += (cy - curY) * 0.12;
        cursor.style.left = `${curX - 10}px`;
        cursor.style.top = `${curY - 10}px`;
        raf = requestAnimationFrame(animate);
      };
      animate();
      cleanups.push(() => {
        document.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(raf);
        cursor.remove();
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
