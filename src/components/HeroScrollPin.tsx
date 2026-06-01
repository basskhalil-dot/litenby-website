import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 35;
// 320dvh section − 100dvh sticky = 220dvh effective scroll range
const SCROLL_MULTIPLIER = 2.2;
const GOLD = "hsl(var(--primary))";
// Contain frames at 90% of viewport — keeps the full bottle in frame
const CONTAIN_SCALE = 0.90;

function frameUrl(i: number): string {
  return `/hero-sequence/frame_${String(i).padStart(3, "0")}.webp`;
}

export function HeroScrollPin() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  // lineRefs: [0] pretitle, [1] h1, [2] subtitle, [3] CTAs
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const [isReady, setIsReady] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  // Preload all 35 frames; animation unlocks only when every one is ready
  useEffect(() => {
    let mounted = true;
    let loaded = 0;
    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
    framesRef.current = frames;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const done = () => {
        loaded++;
        if (loaded >= FRAME_COUNT && mounted) setIsReady(true);
      };
      img.onload = done;
      img.onerror = done;
      img.src = frameUrl(i);
      frames[i] = img;
    }

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

    // Called directly from GSAP's onUpdate — already inside RAF, do not re-wrap.
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

      const scale = Math.min(cw / iw, ch / ih) * CONTAIN_SCALE;
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }

    function handleResize() {
      sizeCanvas();
      drawFrame(currentFrameRef.current);
    }

    sizeCanvas();
    drawFrame(0);

    const scrollPx = Math.round(window.innerHeight * SCROLL_MULTIPLIER);
    const obj = { frame: 0 };

    const gsapCtx = gsap.context(() => {
      // Desktop: all text elements start hidden, fade+slide up on scroll
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
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Frame scrub
      tl.to(
        obj,
        {
          frame: FRAME_COUNT - 1,
          ease: "none",
          duration: 1,
          onUpdate() {
            drawFrame(obj.frame);
          },
        },
        0
      );

      // Desktop: staggered fade-up reveal starting at ~25% scroll.
      // No masks or clip boxes — opacity + translateY only, so no letter clipping.
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
      gsapCtx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [isReady, isMobileLayout]);

  return (
    <section
      ref={wrapperRef}
      style={{ height: "320dvh", overflow: "clip" }}
    >
      {/* Sticky viewport panel */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#000000",
          height: "100dvh",
          overflow: "hidden",
        }}
      >
        {/* Preloader — shown until all 35 frames are decoded */}
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
         * Canvas covers the full sticky panel.
         * mix-blend-mode:screen makes the pure-black surrounding area invisible.
         */}
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            mixBlendMode: "screen",
          }}
        />

        {/* Hero copy — statically placed, fade-up reveal only */}
        <div
          ref={textRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
            ...(isMobileLayout ? { justifyContent: "center" } : {}),
            opacity: isMobileLayout ? 1 : undefined,
          }}
        >
          <div
            style={{
              pointerEvents: "auto",
              maxWidth: "520px",
              width: "100%",
              ...(isMobileLayout
                ? { textAlign: "center", padding: "0 20px" }
                : { marginLeft: "16vw", textAlign: "left" }),
            }}
          >
            {/* Pretitle — lineRefs[0] */}
            <p
              ref={(el) => { lineRefs.current[0] = el; }}
              style={{
                color: GOLD,
                fontSize: isMobileLayout ? "0.6rem" : "0.7rem",
                fontFamily: "Urbanist, sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                marginBottom: isMobileLayout ? "10px" : "10px",
              }}
            >
              Creative Lab
            </p>

            {/* Headline — lineRefs[1].
              Plain display:block lines, no overflow:hidden or clip boxes.
              lineHeight can now be fully tight since no mask is clipping letters. */}
            <h1
              ref={(el) => { lineRefs.current[1] = el; }}
              className="font-heading font-extrabold lowercase"
              style={{
                fontSize: isMobileLayout
                  ? "1.8rem"
                  : "clamp(2.1rem, 4.2vw, 3.5rem)",
                lineHeight: 1.03,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                marginBottom: isMobileLayout ? "10px" : "10px",
              }}
            >
              <span style={{ display: "block" }}>from idea to shelf,</span>
              <span style={{ display: "block" }}>
                and <span style={{ color: GOLD }}>everything</span>
              </span>
              <span style={{ display: "block" }}>in between.</span>
            </h1>

            {/* Subtitle — lineRefs[2] */}
            <p
              ref={(el) => { lineRefs.current[2] = el; }}
              className="font-body"
              style={{
                fontSize: isMobileLayout
                  ? "0.8rem"
                  : "clamp(0.875rem, 1.3vw, 1rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.46)",
                marginBottom: isMobileLayout ? "18px" : "16px",
              }}
            >
              Branding, packaging, and storytelling — built together, from a
              single source.
            </p>

            {/* CTAs — lineRefs[3] */}
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
