"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// ---------------------------------------------------------------------------
// VIBE LAYER (TEMP preview, ?v=4): the motion world of the site.
// · inertial smooth scrolling (Lenis, expo ease)
// · a slow, living glow behind every page (WebGL, low-res → soft) with a
//   static film grain on that background layer only
// · type and frames sit on a drum: they tilt in from below and away at the top
// ?v=4 switches it on for the session, any other ?v= switches it off.
// Reduced motion: none of it, the plain site stays.
// ---------------------------------------------------------------------------

const BG_FRAG = `precision mediump float;
uniform vec2 r;uniform float t;uniform float s;
float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
float b(vec2 u,vec2 c,float k){vec2 d=u-c;return exp(-dot(d,d)/k);}
void main(){
  float a=r.x/r.y;
  vec2 u=gl_FragCoord.xy/r;u.x*=a;
  vec3 ink=vec3(.043,.039,.035);
  vec3 org=vec3(1.,.49,0.);
  vec3 ember=vec3(.42,.13,.02);
  vec2 c1=vec2(a*(.86+.1*sin(t*.11+s*3.1)),.04+.12*cos(t*.13+s*2.));
  vec2 c2=vec2(a*(.08+.12*cos(t*.09+s*2.4)),.96+.06*sin(t*.12));
  vec2 c3=vec2(a*(.5+.32*sin(t*.05+s*4.)),.5+.3*cos(t*.07+s*3.3));
  vec3 col=ink+org*(.15*b(u,c1,.16)+.05*b(u,c2,.12))+ember*.16*b(u,c3,.22);
  col+=(h(gl_FragCoord.xy+t)-.5)/255.;
  gl_FragColor=vec4(col,1.);
}`;

const CURVE_SEL = ".x-h2, .x-lead, [data-appear], [data-curve]";
const CURVE_SKIP = "header, footer, [role='dialog'], .hb, .hs, .xc__card, .cto, .consent";

export function VibeLayer() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);
  const bgRef = useRef<HTMLCanvasElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // session switch
  useEffect(() => {
    try {
      const v = new URLSearchParams(window.location.search).get("v");
      if (v === "4") sessionStorage.setItem("camo-vibe", "1");
      else if (v) sessionStorage.removeItem("camo-vibe");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setOn(sessionStorage.getItem("camo-vibe") === "1" && !reduce);
    } catch {
      setOn(false);
    }
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("vibe", on);
    if (!on) return;
    // film grain tile: random light and dark specks, drawn once
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() < 0.5 ? 0 : 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = Math.random() * (v ? 12 : 22);
    }
    ctx.putImageData(img, 0, 0);
    document.documentElement.style.setProperty("--vibe-grain", `url(${c.toDataURL("image/png")})`);
    return () => {
      document.documentElement.style.removeProperty("--vibe-grain");
    };
  }, [on]);

  // smooth scroll
  useEffect(() => {
    if (!on) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      allowNestedScroll: true,
      anchors: true,
    });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // menu / overlays lock the body: pause the smooth scroll meanwhile
    const mo = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [on]);

  // new page starts at the top
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  // living background
  useEffect(() => {
    const canvas = bgRef.current;
    if (!on || !canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;
    const sh = (type: number, src: string) => {
      const x = gl.createShader(type)!;
      gl.shaderSource(x, src);
      gl.compileShader(x);
      return x;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, BG_FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, "r"), uT = gl.getUniformLocation(prog, "t"), uS = gl.getUniformLocation(prog, "s");
    let raf = 0;
    let sm = 0;
    const t0 = performance.now();
    const frame = () => {
      // drawn at a fraction of the screen: the upscale keeps it soft
      const w = Math.round(window.innerWidth / 6), h = Math.round(window.innerHeight / 6);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      sm += (window.scrollY / max - sm) * 0.05;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uR, w, h);
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.uniform1f(uS, sm);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  // the drum: elements tilt with their distance to the screen centre
  useEffect(() => {
    if (!on) return;
    type Item = { el: HTMLElement; top: number; h: number };
    let items: Item[] = [];
    const measure = () => {
      items.forEach((it) => it.el.style.removeProperty("--vt"));
      const found = Array.from(document.querySelectorAll<HTMLElement>(CURVE_SEL)).filter(
        (el) => !el.closest(CURVE_SKIP),
      );
      const set = new Set(found);
      items = found
        .filter((el) => {
          // only the outermost element of a nested pair moves
          let p = el.parentElement;
          while (p) {
            if (set.has(p)) return false;
            p = p.parentElement;
          }
          return true;
        })
        .map((el) => {
          el.setAttribute("data-vc", "");
          const r = el.getBoundingClientRect();
          return { el, top: r.top + window.scrollY, h: r.height };
        })
        .filter((it) => it.h < window.innerHeight * 0.95);
    };
    let raf = 0;
    const frame = () => {
      const vh = window.innerHeight, y = window.scrollY;
      for (const it of items) {
        const c = it.top + it.h / 2 - y;
        const n = (c - vh / 2) / (vh / 2);
        if (n < -1.6 || n > 1.6) continue;
        const k = Math.max(-1.25, Math.min(1.25, n));
        const rx = -k * 24;
        const z = -Math.abs(k) * Math.abs(k) * 140;
        it.el.style.setProperty("--vt", `perspective(1100px) translate3d(0, ${(k * 18).toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rx.toFixed(2)}deg)`);
      }
      raf = requestAnimationFrame(frame);
    };
    // measure after the page has laid out
    const t = window.setTimeout(() => {
      measure();
      raf = requestAnimationFrame(frame);
    }, 120);
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
      ro.disconnect();
      items.forEach((it) => {
        it.el.style.removeProperty("--vt");
        it.el.removeAttribute("data-vc");
      });
    };
  }, [on, pathname]);

  if (!on) return null;
  return (
    <>
      <canvas ref={bgRef} className="vibe-bg" aria-hidden="true" />
      <div className="vibe-bg-grain" aria-hidden="true" />
    </>
  );
}
