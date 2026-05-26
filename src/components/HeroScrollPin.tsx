import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const FRAME_COUNT = 72;
// Matches --primary (hsl 39 100% 50%) — the exact orange-gold in the litenby logo
const GOLD = "hsl(var(--primary))";

function frameUrl(i: number): string {
  return `/hero-sequence/frame_${String(i).padStart(3, "0")}.jpg`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export function HeroScrollPin() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(() => window.innerWidth < 768);

  // ── Phase 1: preload every frame before the animation is available ─────────
  useEffect(() => {
    let mounted = true;
    let loaded = 0;
    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);

    function onEach() {
      loaded++;
      if (loaded >= FRAME_COUNT && mounted) {
        framesRef.current = frames;
        setIsReady(true);
      }
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = onEach;
      img.onerror = onEach; // count failures so we never block indefinitely
      img.src = frameUrl(i);
      frames[i] = img;
    }

    return () => {
      mounted = false;
    };
  }, []);

  // ── Track mobile/desktop layout changes (e.g. orientation) ────────────────
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobileLayout(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Phase 2: canvas sizing + GSAP scroll sequence ──────────────────────────
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas || !wrapperRef.current) return;

    const isMob = isMobileLayout;

    // getBoundingClientRect reflects the true rendered size after flex layout;
    // offsetWidth/Height can return 0 inside a flex column before paint.
    function sizeCanvas() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }

    function drawFrame(rawIndex: number) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const index = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(rawIndex)));
      currentFrameRef.current = index;

      const img = framesRef.current[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Mobile: cover-center — scale bottle so its height fills 80% of the canvas;
      // canvas clips any horizontal overflow naturally. Black px are invisible (screen blend).
      // Desktop: contain within 77% of canvas height, capped by canvas width.
      const scale = isMob
        ? (ch * 0.80) / ih
        : Math.min(cw / iw, (ch * 0.77) / ih);

      const dw = iw * scale;
      const dh = ih * scale;

      const yOffset = isMob ? 0 : Math.round(ch * 0.05);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2 + yOffset, dw, dh);
    }

    function handleResize() {
      sizeCanvas();
      drawFrame(currentFrameRef.current);
    }

    sizeCanvas();
    drawFrame(0);

    const obj = { frame: 0 };

    // Mobile: 250vh section − 100vh sticky = 150vh effective scroll range.
    // Desktop: 212vh section − 100vh sticky = 112vh effective scroll range.
    const animScrollPx = Math.round(window.innerHeight * (isMob ? 1.5 : 1.12));
    const driftX = isMob ? 0 : Math.round(window.innerWidth * 0.098);

    const gsapCtx = gsap.context(() => {
      // Mobile: text is always visible, no animation. Desktop: starts hidden, slides in.
      gsap.set(textRef.current, {
        opacity: isMob ? 1 : 0,
        x: isMob ? 0 : -60,
        y: 0,
      });

      // Mobile: lock canvas transform under GSAP ownership at x=0.
      // Omitting clearProps keeps GSAP owning x so no bleed from prior renders.
      if (isMob) {
        gsap.set(canvas, { x: 0, scale: 1 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${animScrollPx}`,
          scrub: 0.3,
        },
      });

      // Frame sequence plays on both mobile and desktop.
      // On mobile the onUpdate also hard-resets the canvas transform every tick —
      // belt-and-suspenders against any translateX leaking from a prior desktop context.
      tl.to(
        obj,
        {
          frame: FRAME_COUNT - 1,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            drawFrame(obj.frame);
            if (isMob) canvas.style.transform = "none";
          },
        },
        0
      );

      // Desktop only: canvas drifts right, text slides in
      if (!isMob) {
        tl.fromTo(
          canvas,
          { scale: 0.92, x: 0 },
          { scale: 1, x: driftX, ease: "none", duration: 1 },
          0
        );
        tl.to(
          textRef.current,
          { opacity: 1, x: "8vw", y: 0, ease: "power2.out", duration: 0.35 },
          0.25
        );
      }
    }, wrapperRef);

    window.addEventListener("resize", handleResize);

    return () => {
      gsapCtx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [isReady, isMobileLayout]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      ref={wrapperRef}
      style={{ height: isMobileLayout ? "250vh" : "212vh", overflow: "clip" }}
    >
      {/*
       * Sticky panel — stays at top:0 for the full scroll range,
       * then unpins naturally when the section leaves the viewport.
       * On mobile: flex column so canvas (top) and text (bottom) stack.
       */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#000000",
          ...(isMobileLayout
            ? {
                display: "flex",
                flexDirection: "column",
                height: "auto",
                minHeight: "100vh",
                overflow: "visible",
                paddingTop: "8vh",
              }
            : {
                height: "100vh",
                overflow: "hidden",
              }),
        }}
      >
        {/* ── Minimal loader shown until all 72 frames are ready ── */}
        {!isReady && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              zIndex: 10,
            }}
          >
            <span
              className="animate-pulse block"
              style={{
                width: "56px",
                height: "2px",
                borderRadius: "2px",
                background: GOLD,
              }}
            />
          </div>
        )}

        {/*
         * mix-blend-mode:screen lets the black background of each JPEG frame
         * merge invisibly with the page, leaving only the subject visible.
         * Mobile: canvas occupies the top 65vh, text fills the remaining 35vh.
         */}
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            mixBlendMode: "screen",
            ...(isMobileLayout
              ? { width: "100%", height: "62vh", flexShrink: 0 }
              : { width: "100%", height: "100%" }),
          }}
        />

        {/*
         * Hero copy.
         * Desktop: absolutely overlaid, fades in via GSAP.
         * Mobile: static flex item below the canvas, always visible.
         */}
        <div
          ref={textRef}
          style={
            isMobileLayout
              ? {
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 1,
                  paddingBottom: "20px",
                  paddingTop: "12px",
                }
              : {
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  pointerEvents: "none",
                  opacity: 0,
                  paddingTop: "5vh",
                }
          }
          className={isMobileLayout ? "" : "items-end pb-10 md:pb-0 md:items-center"}
        >
          <div className="container" style={{ pointerEvents: "none" }}>
            <div
              style={{
                maxWidth: isMobileLayout ? "100%" : "520px",
                pointerEvents: "auto",
              }}
              className={
                isMobileLayout
                  ? "text-center w-full px-5"
                  : "w-full mx-auto md:mx-0 text-center md:text-left"
              }
            >
              {/* Pretitle */}
              <p
                style={{
                  color: GOLD,
                  fontSize: isMobileLayout ? "0.6rem" : "0.7rem",
                  fontFamily: "Urbanist, sans-serif",
                  fontWeight: 700,
                  fontVariant: "small-caps",
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                  marginBottom: isMobileLayout ? "10px" : "16px",
                }}
              >
                Creative Lab
              </p>

              {/* Headline */}
              <h1
                className="font-heading font-extrabold lowercase"
                style={{
                  fontSize: isMobileLayout
                    ? "1.8rem"
                    : "clamp(2.1rem, 4.2vw, 3.5rem)",
                  lineHeight: 1.07,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  marginBottom: isMobileLayout ? "10px" : "20px",
                }}
              >
                From idea to shelf,
                <br className="hidden md:block" />
                {" "}and{" "}
                <span style={{ color: GOLD }}>everything</span>
                {" "}in between.
              </h1>

              {/* Subtitle */}
              <p
                className="font-body"
                style={{
                  fontSize: isMobileLayout ? "0.8rem" : "clamp(0.875rem, 1.3vw, 1rem)",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.46)",
                  marginBottom: isMobileLayout ? "18px" : "32px",
                }}
              >
                Branding, packaging, and storytelling — built together, from a
                single source.
              </p>

              {/* CTAs — stacked vertically on mobile, row on desktop */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  ...(isMobileLayout
                    ? { flexDirection: "column", alignItems: "stretch" }
                    : { flexWrap: "wrap" }),
                }}
                className={isMobileLayout ? "" : "justify-center md:justify-start"}
              >
                <Link
                  to="/contact#form"
                  className="font-body font-bold"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 30px",
                    borderRadius: "9999px",
                    background: GOLD,
                    color: "#000000",
                    fontSize: "0.875rem",
                    letterSpacing: "0.025em",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  start your brand
                </Link>
                <Link
                  to="/packaging"
                  className="font-body font-bold"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 30px",
                    borderRadius: "9999px",
                    background: "transparent",
                    color: "#ffffff",
                    border: "1.5px solid rgba(255,255,255,0.7)",
                    fontSize: "0.875rem",
                    letterSpacing: "0.025em",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
                  }}
                >
                  explore packaging
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Subtle bottom vignette to ease into the next section ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "linear-gradient(to top, #000000, transparent)",
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}
