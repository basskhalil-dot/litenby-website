import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 35;
const GOLD = "hsl(var(--primary))";
const CONTAIN_SCALE = 0.90;

function frameUrl(i: number): string {
  return `/hero-sequence/frame_${String(i).padStart(3, "0")}.webp`;
}

export function HeroScrollPin() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const framesRef = useRef<HTMLImageElement[]>([]);

  // RAF coalescing state — all imperative, zero React re-renders in the draw loop
  const pendingIndexRef = useRef(0); // integer frame index queued for next RAF
  const lastDrawnRef = useRef(-1);   // last integer index actually painted
  const rafIdRef = useRef<number | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  // Preload + decode all 35 frames before the animation is interactive.
  // decode() ensures bitmaps are in GPU memory — no first-paint hitch per frame.
  useEffect(() => {
    let mounted = true;
    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
    framesRef.current = frames;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      frames[i] = img;
    }

    Promise.all(frames.map((img) => img.decode().catch(() => {}))).then(() => {
      if (mounted) setIsReady(true);
    });

    return () => { mounted = false; };
  }, []);

  // Respond to orientation / breakpoint changes
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobileLayout(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Canvas sizing + GSAP scroll animation
  useEffect(() => {
    if (!isReady) return;
    const canvas = canvasRef.current;
    if (!canvas || !wrapperRef.current) return;

    const isMob = window.innerWidth < 768;

    function sizeCanvas() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }

    // Draws a single integer frame at 100% opacity — no blending, no ghosting.
    function render(index: number) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
      const img = framesRef.current[clampedIndex];
      if (!img || !img.complete || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.min(cw / iw, ch / ih) * CONTAIN_SCALE;
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.globalAlpha = 1;
      ctx.drawImage(img, dx, dy, dw, dh);

      lastDrawnRef.current = clampedIndex;
    }

    // Called from ScrollTrigger onUpdate.
    // Rounds to the nearest integer frame and schedules at most one RAF per
    // display frame. No lerp, no blending — 1:1 sharp swaps only.
    function queueRender(frame: number) {
      const index = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frame)));
      pendingIndexRef.current = index;
      if (rafIdRef.current !== null) return; // RAF already queued
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const idx = pendingIndexRef.current;
        if (idx !== lastDrawnRef.current) {
          render(idx);
        }
      });
    }

    function handleResize() {
      sizeCanvas();
      lastDrawnRef.current = -1;
      render(pendingIndexRef.current);
    }

    sizeCanvas();
    render(0);
    pendingIndexRef.current = 0;

    // Desktop 212dvh − 100dvh = 112dvh scroll range (~3dvh/frame).
    // Mobile  250dvh − 100dvh = 150dvh scroll range.
    const scrollPx = Math.round(window.innerHeight * (isMob ? 1.5 : 1.12));

    const obj = { frame: 0 };

    const gsapCtx = gsap.context(() => {
      if (!isMob) {
        gsap.set(textRef.current, { opacity: 1 });
        const els = lineRefs.current.filter(Boolean) as HTMLElement[];
        gsap.set(els, { opacity: 0, y: 25 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${scrollPx}`,
          scrub: true,
          anticipatePin: 1,
        },
      });

      // Frame tween: obj.frame goes 0 → 34 linearly.
      // onUpdate queues the exact decimal frame for RAF-synced cross-fade drawing.
      // One frame rendered per display frame max; no React state touched.
      tl.to(
        obj,
        {
          frame: FRAME_COUNT - 1,
          ease: "none",
          duration: 1,
          onUpdate() {
            queueRender(obj.frame);
          },
        },
        0
      );

      if (!isMob) {
        const els = lineRefs.current.filter(Boolean) as HTMLElement[];
        els.forEach((el, i) => {
          tl.to(
            el,
            { opacity: 1, y: 0, ease: "power3.out", duration: 0.4 },
            0.25 + i * 0.12
          );
        });
      }
    }, wrapperRef);

    window.addEventListener("resize", handleResize);
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      gsapCtx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [isReady, isMobileLayout]);

  return (
    <section
      ref={wrapperRef}
      style={{
        height: isMobileLayout ? "250dvh" : "212dvh",
        overflow: "clip",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#000000",
          height: "100dvh",
          overflow: "hidden",
          ...(isMobileLayout ? { display: "flex", flexDirection: "column" } : {}),
        }}
      >
        {/* Preloader */}
        {!isReady && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <span
              className="animate-pulse block"
              style={{ width: "56px", height: "2px", borderRadius: "2px", background: GOLD }}
            />
          </div>
        )}

        {/* Canvas — mix-blend-mode:screen makes black areas invisible */}
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            mixBlendMode: "screen",
            ...(isMobileLayout
              ? { width: "100%", height: "50dvh", flexShrink: 0 }
              : { width: "100%", height: "100%" }),
          }}
        />

        {/* Hero copy */}
        <div
          ref={textRef}
          style={
            isMobileLayout
              ? {
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  opacity: 1,
                  padding: "0 24px max(20px, env(safe-area-inset-bottom, 20px))",
                }
              : {
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                }
          }
        >
          <div
            style={{
              pointerEvents: "auto",
              maxWidth: "520px",
              width: "100%",
              ...(isMobileLayout
                ? { textAlign: "center" }
                : { marginLeft: "16vw", textAlign: "left" }),
            }}
          >
            <p
              ref={(el) => { lineRefs.current[0] = el; }}
              style={{
                color: GOLD,
                fontSize: isMobileLayout ? "0.6rem" : "0.7rem",
                fontFamily: "Urbanist, sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                marginBottom: "10px",
              }}
            >
              Creative Lab
            </p>

            <h1
              ref={(el) => { lineRefs.current[1] = el; }}
              className="font-heading font-extrabold lowercase"
              style={{
                fontSize: isMobileLayout ? "1.8rem" : "clamp(2.1rem, 4.2vw, 3.5rem)",
                lineHeight: 1.03,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                marginBottom: "10px",
              }}
            >
              <span style={{ display: "block" }}>from idea to shelf,</span>
              <span style={{ display: "block" }}>
                and <span style={{ color: GOLD }}>everything</span>
              </span>
              <span style={{ display: "block" }}>in between.</span>
            </h1>

            <p
              ref={(el) => { lineRefs.current[2] = el; }}
              className="font-body"
              style={{
                fontSize: isMobileLayout ? "0.8rem" : "clamp(0.875rem, 1.3vw, 1rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.46)",
                marginBottom: isMobileLayout ? "18px" : "16px",
              }}
            >
              Branding, packaging, and storytelling — built together, from a single source.
            </p>

            <div
              ref={(el) => { lineRefs.current[3] = el; }}
              style={
                isMobileLayout
                  ? { display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }
                  : { display: "flex", flexWrap: "wrap", gap: "10px" }
              }
            >
              <Button size="lg" asChild className="font-body font-bold">
                <Link
                  to="/contact#form"
                  style={isMobileLayout ? { width: "100%", maxWidth: "280px" } : undefined}
                >
                  start your brand
                </Link>
              </Button>
              <Button size="lg" variant="outline-white" asChild className="font-body font-bold">
                <Link
                  to="/packaging"
                  style={isMobileLayout ? { width: "100%", maxWidth: "280px" } : undefined}
                >
                  explore packaging
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom vignette */}
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
