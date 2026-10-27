"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// HERO BEND — the showreel as a bending screen. Full-bleed at first; while the
// stage is pinned the video shrinks into a panel whose edges pull in at the
// middle (WebGL fragment warp), and the claim is set along its top and bottom
// edges on curved paths.
// If WebGL is unavailable the plain <video> stays visible. Reduced motion:
// no pin, plain full-screen video.
// ---------------------------------------------------------------------------

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const FRAG = `precision mediump float;
uniform sampler2D t;uniform vec2 res;uniform vec4 rect;uniform float bend;uniform float lb;uniform float va;uniform float alpha;
void main(){
  vec2 px=vec2(gl_FragCoord.x,res.y-gl_FragCoord.y);
  float cx=rect.x,cy=rect.y,w=rect.z,h=rect.w;
  float u=.5+(px.x-cx)/w;
  float d=1.-pow(2.*u-1.,2.);
  float lh=h*(1.-bend*d);
  // v = mask coordinate (follows the bent edges); the picture itself is
  // mapped on the flat panel, so the bend crops instead of stretching it
  float v=(px.y-cy)/lh+.5;
  if(u<0.||u>1.||v<0.||v>1.){gl_FragColor=vec4(0.);return;}
  float pa=w/h;vec2 uv=vec2(u,(px.y-cy)/h+.5);
  if(pa>va){float s=va/pa;uv.y=.5+(uv.y-.5)*s;}else{float s=pa/va;uv.x=.5+(uv.x-.5)*s;}
  float ex=min(u,1.-u)*w,ey=min(v,1.-v)*lh;float aa=clamp(min(ex,ey),0.,1.);
  vec4 c=texture2D(t,uv);
  // the bands where the claim sits are cut out: the claim lies on the page
  if(v<lb||v>1.-lb){gl_FragColor=vec4(0.);return;}
  gl_FragColor=vec4(c.rgb*alpha*aa,alpha*aa);
}`;

export function HeroBend({
  src,
  lines = ["Wir machen Marken", "zum Teil der Kultur."],
}: {
  src: string;
  lines?: [string, string];
}) {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const topRef = useRef<SVGPathElement>(null);
  const botRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!el || !canvas || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true });
    if (!gl) return;
    const sh = (type: number, s: string) => {
      const x = gl.createShader(type)!;
      gl.shaderSource(x, s);
      gl.compileShader(x);
      return x;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U("res"), uRect = U("rect"), uBend = U("bend"), uLb = U("lb"), uVa = U("va"), uAlpha = U("alpha");

    el.classList.add("is-live");
    const clamp = (v: number, lo = 0, hi = 1) => Math.min(Math.max(v, lo), hi);
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let raf = 0;
    let alive = true;
    let target = 0;
    let ps = 0;

    const frame = () => {
      if (!alive) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vw = window.innerWidth, vh = window.innerHeight;
      if (canvas.width !== Math.round(vw * dpr) || canvas.height !== Math.round(vh * dpr)) {
        canvas.width = Math.round(vw * dpr);
        canvas.height = Math.round(vh * dpr);
      }
      // Smooth, inertial progress: the scroll position is the target and
      // the stage eases towards it every frame (no stepping on wheel ticks).
      const r = el.getBoundingClientRect();
      const run = Math.max(el.offsetHeight - vh, 1);
      target = clamp(-r.top / run);
      // with the smooth scroll the page already glides: follow closer
      ps += (target - ps) * (document.documentElement.classList.contains("vibe") ? 0.3 : 0.085);
      if (Math.abs(target - ps) < 0.0004) ps = target;
      const p = ps;
      const small = vw < 700;
      // 1 · full bleed → inset panel (soft sine, no snap)
      const a1 = 0.5 - 0.5 * Math.cos(Math.PI * clamp(p / 0.3));
      // 2 · the bend grows from the very first scroll, slow and even
      const a2 = 0.5 - 0.5 * Math.cos(Math.PI * clamp(p / 0.62));
      // 3 · panel opens up again, letterbox bands + claim wipe in
      const a3 = ease(clamp((p - 0.38) / 0.24));
      // 4 · out
      const out = ease(clamp((p - 0.7) / 0.2));
      const shrinkW = small ? 0.14 : 0.3, shrinkH = small ? 0.5 : 0.34;
      // the panel keeps its shrunk width; only the height opens for the bands
      const W = vw * (1 - shrinkW * a1);
      const H = vh * (1 - shrinkH * a1 + 0.1 * a3);
      const bend = 0.1 * a2;
      const lb = 0.13 * a3;
      const alpha = 1 - out;
      // the small drop below the nav only comes in as the panel shrinks, so
      // the first frame is truly full bleed
      const cx = vw / 2, cy = vh / 2 + (small ? 0 : vh * 0.02 * a1) - out * vh * 0.12;

      el.style.setProperty("--hb-title", clamp(1 - p / 0.1).toFixed(3));
      el.style.setProperty("--hb-claim", (1 - out).toFixed(3));
      el.style.setProperty("--hb-out", out.toFixed(4));
      el.style.setProperty("--hb-wipe", `${(a3 * 100).toFixed(2)}%`);

      // claim paths sit on the centre line of each band and follow exactly the
      // shader's curve: local height lh(x) = H * (1 - bend * d), with
      // d = 1 - (2u - 1)^2. That curve is a parabola in x, so one quadratic
      // Bézier traces it exactly (control y = (4 * mid - start - end) / 2).
      // Paths run past the panel edges so the full line always fits.
      const k = 0.5 - lb / 2;
      const yAt = (d: number, s: number) => cy + s * H * (1 - bend * d) * k;
      const dEnd = 1 - 1.5 * 1.5; // u = -0.25 / 1.25
      const xl = cx - W * 0.75, xr = cx + W * 0.75;
      const path = (s: number) => {
        const y0 = yAt(dEnd, s), ym = yAt(1, s);
        return `M ${xl} ${y0} Q ${cx} ${(4 * ym - 2 * y0) / 2} ${xr} ${y0}`;
      };
      if (svgRef.current) svgRef.current.setAttribute("viewBox", `0 0 ${vw} ${vh}`);
      topRef.current?.setAttribute("d", path(-1));
      botRef.current?.setAttribute("d", path(1));
      el.style.setProperty("--hb-fs", `${Math.min(W / 15, H * 0.12)}px`);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (video.readyState >= 2) {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        try {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
          el.classList.add("is-gl");
        } catch {
          el.classList.remove("is-gl");
        }
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform4f(uRect, cx * dpr, cy * dpr, W * dpr, H * dpr);
        gl.uniform1f(uBend, bend);
        gl.uniform1f(uLb, lb);
        gl.uniform1f(uVa, (video.videoWidth || 16) / (video.videoHeight || 9));
        gl.uniform1f(uAlpha, alpha);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="hb" id="hero" aria-labelledby="hb-title">
      <div className="hb__stage">
        <video
          ref={videoRef}
          className="hb__video"
          src={src}
          crossOrigin="anonymous"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          onContextMenu={(e) => e.preventDefault()}
          aria-hidden="true"
          tabIndex={-1}
        />
        <canvas ref={canvasRef} className="hb__canvas" aria-hidden="true" />

        <svg ref={svgRef} className="hb__claim" aria-hidden="true" preserveAspectRatio="none">
          <defs>
            <clipPath id="hb-wipe">
              <rect className="hb__wipe" x="0" y="0" height="100%" />
            </clipPath>
            <path id="hb-top" ref={topRef} />
            <path id="hb-bot" ref={botRef} />
          </defs>
          <text className="hb__claim-top" dy="0.36em" clipPath="url(#hb-wipe)">
            <textPath href="#hb-top" startOffset="50%" textAnchor="middle">
              {lines[0]}
            </textPath>
          </text>
          <text className="hb__claim-bot" dy="0.36em" clipPath="url(#hb-wipe)">
            <textPath href="#hb-bot" startOffset="50%" textAnchor="middle">
              {lines[1]}
            </textPath>
          </text>
        </svg>
        <p className="x-sr">{lines.join(" ")}</p>

        <h1 className="hb__title x-wide" id="hb-title">
          <span className="x-sr">CAMO Media, Culture Marketing Agency aus Hamburg: </span>
          {["creative", "culture", "digital"].map((word, i) => (
            <span key={word} className="xh__line">
              <span style={{ "--i": i } as React.CSSProperties}>
                {word}
                <span className="x-dot" aria-hidden="true" />
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
