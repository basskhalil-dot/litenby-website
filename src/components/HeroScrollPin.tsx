import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const FRAME_COUNT = 72;
const EAGER_FRAMES = 8; // frames loaded before animation unlocks
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
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const wordRefs = useRef<(HTMLElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(() => window.innerWidth < 768);
  const prefersReducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // ── Phase 1: eager-load first EAGER_FRAMES, stream the rest in background ──
  useEffect(() => {
    let mounted = true;
    let eagerLoaded = 0;
    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
    framesRef.current = frames; // expose array immediately so drawFrame can use partial results

    function onEager() {
      eagerLoaded++;
      if (eagerLoaded >= EAGER_FRAMES && mounted) {
        setIsReady(true);
        // Kick off the remaining frames lazily
        for (let i = EAGER_FRAMES; i < FRAME_COUNT; i++) {
          const img = new Image();
          img.src = frameUrl(i);
          frames[i] = img;
        }
      }
    }

    for (let i = 0; i < EAGER_FRAMES; i++) {
      const img = new Image();
      img.onload = onEager;
      img.onerror = onEager; // count failures so we never block indefinitely
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

    // Use a direct window check — React state (isMobileLayout) can be stale
    // during hydration or rapid re-renders and must not be trusted for the
    // canvas translateX guard.
    const isMob = window.innerWidth < 768;

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

    // ── Reduced-motion path: skip all animation, jump to final frame ──────────
    if (prefersReducedMotion.current) {
      const finalIdx = FRAME_COUNT - 1;
      const tryDrawFinal = () => drawFrame(finalIdx);

      const finalImg = framesRef.current[finalIdx];
      if (finalImg?.complete && finalImg.naturalWidth) {
        tryDrawFinal();
      } else {
        const img = new Image();
        img.onload = tryDrawFinal;
        img.src = frameUrl(finalIdx);
        framesRef.current[finalIdx] = img;
      }

      if (!isMob) {
        gsap.set(canvas, { scale: 1, x: Math.round(window.innerWidth * 0.098) });
        gsap.set(textRef.current, { opacity: 1, x: "8vw" });
        const lines = lineRefs.current.filter(Boolean) as HTMLElement[];
        gsap.set(lines, { opacity: 1, y: 0 });
        const words = wordRefs.current.filter(Boolean) as HTMLElement[];
        gsap.set(words, { y: "0%" });
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }

    const obj = { frame: 0 };

    // Mobile: 250dvh section − 100dvh sticky = 150dvh effective scroll range.
    // Desktop: 212dvh section − 100dvh sticky = 112dvh effective scroll range.
    const animScrollPx = Math.round(window.innerHeight * (isMob ? 1.5 : 1.12));
    const driftX = isMob ? 0 : Math.round(window.innerWidth * 0.098);

    const gsapCtx = gsap.context(() => {
      // Container is always opacity 1; individual lines handle their own opacity on desktop.
      gsap.set(textRef.current, {
        opacity: 1,
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
          anticipatePin: 1,
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
            // Re-check window width directly so the closure value can't lie
            // if the viewport changed since the effect ran.
            if (window.innerWidth < 768) canvas.style.transform = "none";
          },
        },
        0
      );

      // Desktop only: canvas drifts right, text container slides in, lines/words stagger in
      if (!isMob) {
        tl.fromTo(
          canvas,
          { scale: 0.92, x: 0 },
          { scale: 1, x: driftX, ease: "none", duration: 1 },
          0
        );

        // Container slides laterally (no opacity change — lines handle that)
        tl.to(
          textRef.current,
          { x: "8vw", ease: "power2.out", duration: 1.2 },
          0.25
        );

        // lineRefs[1,2,3] are null (headline handled per-word below); filter gives [pretitle, subtitle, CTAs]
        const lines = lineRefs.current.filter(Boolean) as HTMLElement[];
        gsap.set(lines, { opacity: 0, y: 30 });
        if (lines[0]) tl.to(lines[0], { opacity: 1, y: 0, ease: "power3.out", duration: 0.9 }, 0.15);
        if (lines[1]) tl.to(lines[1], { opacity: 1, y: 0, ease: "power3.out", duration: 0.9 }, 0.75);
        if (lines[2]) tl.to(lines[2], { opacity: 1, y: 0, ease: "power3.out", duration: 0.9 }, 0.92);

        // Headline: each word slides up out of its overflow-hidden clip
        const words = wordRefs.current.filter(Boolean) as HTMLElement[];
        gsap.set(words, { y: "110%" });
        words.forEach((word, i) => {
          tl.to(word, { y: "0%", ease: "power3.out", duration: 0.6 }, 0.25 + i * 0.055);
        });
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
      style={{
        height: prefersReducedMotion.current
          ? "100dvh"
          : isMobileLayout ? "250dvh" : "212dvh",
        overflow: "clip",
      }}
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
                minHeight: "100dvh",
                overflow: "visible",
                paddingTop: "5dvh",
              }
            : {
                height: "100dvh",
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
              ? { width: "100%", height: "50dvh", flexShrink: 0 }
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
                  paddingBottom: "max(20px, env(safe-area-inset-bottom, 20px))",
                  paddingTop: "10px",
                }
              : {
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  pointerEvents: "none",
                  opacity: 0,
                  paddingTop: "5dvh",
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
              {/* Pretitle — line 0 */}
              <p
                ref={(el) => { lineRefs.current[0] = el; }}
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

              {/* Headline — per-word slide-up reveal on desktop */}
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
                {/* Line 1: "From idea to shelf," */}
                <span style={{ display: "block" }}>
                  {(["From", "idea", "to", "shelf,"] as const).map((word, i) => (
                    <span
                      key={word}
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        verticalAlign: "bottom",
                        marginRight: i < 3 ? "0.22em" : 0,
                      }}
                    >
                      <span
                        ref={(el) => { wordRefs.current[i] = el; }}
                        style={{ display: "inline-block" }}
                      >
                        {word}
                      </span>
                    </span>
                  ))}
                </span>
                {/* Line 2: "and everything" */}
                <span style={{ display: "block" }}>
                  <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.22em" }}>
                    <span ref={(el) => { wordRefs.current[4] = el; }} style={{ display: "inline-block" }}>and</span>
                  </span>
                  <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", color: GOLD }}>
                    <span ref={(el) => { wordRefs.current[5] = el; }} style={{ display: "inline-block" }}>everything</span>
                  </span>
                </span>
                {/* Line 3: "in between." */}
                <span style={{ display: "block" }}>
                  {(["in", "between."] as const).map((word, i) => (
                    <span
                      key={word}
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        verticalAlign: "bottom",
                        marginRight: i === 0 ? "0.22em" : 0,
                      }}
                    >
                      <span
                        ref={(el) => { wordRefs.current[6 + i] = el; }}
                        style={{ display: "inline-block" }}
                      >
                        {word}
                      </span>
                    </span>
                  ))}
                </span>
              </h1>

              {/* Subtitle — line 4 */}
              <p
                ref={(el) => { lineRefs.current[4] = el; }}
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

              {/* CTAs — line 5 */}
              <div
                ref={(el) => { lineRefs.current[5] = el; }}
                style={{
                  display: "flex",
                  ...(isMobileLayout
                    ? { flexDirection: "column", alignItems: "center", gap: "12px", width: "100%" }
                    : { flexWrap: "wrap", gap: "10px" }),
                }}
                className={isMobileLayout ? "" : "justify-center md:justify-start"}
              >
                <Button
                  size="lg"
                  asChild
                  className="font-body font-bold"
                  style={isMobileLayout ? { width: "100%", maxWidth: "280px" } : undefined}
                >
                  <Link to="/contact#form">start your brand</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline-white"
                  asChild
                  className="font-body font-bold"
                  style={isMobileLayout ? { width: "100%", maxWidth: "280px" } : undefined}
                >
                  <Link to="/packaging">explore packaging</Link>
                </Button>
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
