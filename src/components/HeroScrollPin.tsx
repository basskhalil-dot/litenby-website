import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FRAME_COUNT = 35;
const GOLD = "hsl(var(--primary))";
const CONTAIN_SCALE = 0.9;
const MOBILE_CONTAIN_SCALE = 1.14;
const MOBILE_NAV_OFFSET = 64; // px — push canvas below the fixed navbar

function frameUrl(i: number, mobile = false): string {
  const dir = mobile ? "hero-sequence-mobile" : "hero-sequence";
  return `/${dir}/frame_${String(i).padStart(3, "0")}.webp`;
}

export function HeroScrollPin() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const mobileFramesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);
  const tickingRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  // Cache the viewport height once on mount so iOS/Android URL-bar collapse
  // doesn't change our scrollable distance mid-scroll (which causes jumps).
  const lockedVhRef = useRef<number>(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  const lockedWidthRef = useRef<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Preload + decode both desktop and mobile frame sets before making the animation interactive.
  useEffect(() => {
    let mounted = true;
    const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
    const mobileFrames: HTMLImageElement[] = new Array(FRAME_COUNT);
    framesRef.current = frames;
    mobileFramesRef.current = mobileFrames;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameUrl(i, false);
      frames[i] = img;

      const mImg = new Image();
      mImg.src = frameUrl(i, true);
      mobileFrames[i] = mImg;
    }

    Promise.all([
      ...frames.map((img) => img.decode().catch(() => {})),
      ...mobileFrames.map((img) => img.decode().catch(() => {})),
    ]).then(() => {
      if (!mounted) return;
      // Draw frame 0 immediately so the canvas has content before the preloader overlay
      // disappears — prevents the blank-canvas flash on first paint.
      const canvas = canvasRef.current;
      if (canvas) {
        const isMob = window.matchMedia("(max-width: 767px)").matches;
        const src = (isMob ? mobileFrames : frames)[0];
        if (src?.naturalWidth) {
          const rect = canvas.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.round(rect.width * dpr);
          canvas.height = Math.round(rect.height * dpr);
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const cw = canvas.width, ch = canvas.height;
            const iw = src.naturalWidth, ih = src.naturalHeight;
            const scale = isMob
              ? Math.min(cw / iw, ch / ih) * MOBILE_CONTAIN_SCALE
              : Math.min(cw / iw, ch / ih) * CONTAIN_SCALE;
            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(src, (cw - iw * scale) / 2, (ch - ih * scale) / 2, iw * scale, ih * scale);
          }
        }
      }
      setIsReady(true);
    });

    return () => { mounted = false; };
  }, []);

  // Respond to breakpoint changes.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobileLayout(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Native scroll + canvas rendering.
  useEffect(() => {
    if (!isReady) return;
    const canvas = canvasRef.current;
    if (!canvas || !wrapperRef.current) return;

    const isMob = isMobileLayout;

    function sizeCanvas() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }

    function render(index: number) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = (isMob ? mobileFramesRef.current : framesRef.current)[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = isMob
        ? Math.min(cw / iw, ch / ih) * MOBILE_CONTAIN_SCALE
        : Math.min(cw / iw, ch / ih) * CONTAIN_SCALE;
      const dw = iw * scale;
      const dh = ih * scale;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }

    if (!isMob) {
      // Desktop: hide lines initially, scroll reveals them.
      lineRefs.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateX(-55px)";
        el.style.transition = "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      });
    } else {
      // Mobile: always visible — reset any stale desktop styles.
      lineRefs.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.transition = "none";
      });
    }

    sizeCanvas();
    render(0);
    lastFrameRef.current = 0;

    function onScroll() {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      // Use the locked viewport height on mobile so URL-bar collapse doesn't
      // change the denominator and snap the progress to a different frame.
      const vh = isMob ? lockedVhRef.current : window.innerHeight;
      const scrollable = rect.height - vh;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const frame = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));

      if (frame !== lastFrameRef.current) {
        lastFrameRef.current = frame;
        if (!tickingRef.current) {
          tickingRef.current = true;
          requestAnimationFrame(() => {
            render(lastFrameRef.current);
            tickingRef.current = false;
          });
        }
      }

      // Desktop text reveal: each line slides in from left once progress passes its threshold.
      if (!isMob) {
        lineRefs.current.forEach((el, i) => {
          if (!el) return;
          const threshold = 0.25 + i * 0.12;
          if (progress >= threshold) {
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
          } else {
            el.style.opacity = "0";
            el.style.transform = "translateX(-55px)";
          }
        });
      }
    }

    function handleResize() {
      // On mobile, ignore resize events triggered only by URL-bar show/hide
      // (width unchanged, height changed). Only react to real width changes.
      if (isMob) {
        if (window.innerWidth === lockedWidthRef.current) return;
        lockedWidthRef.current = window.innerWidth;
        lockedVhRef.current = window.innerHeight;
      }
      sizeCanvas();
      render(Math.max(0, lastFrameRef.current));
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isReady, isMobileLayout]);

  return (
    <section
      ref={wrapperRef}
      style={{
        height: isMobileLayout
          ? `${lockedVhRef.current * 2.5}px`
          : "212dvh",
        overflow: "clip",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#000000",
          height: isMobileLayout ? `${lockedVhRef.current}px` : "100dvh",
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
              ? {
                  width: "100%",
                  height: `${Math.round(lockedVhRef.current * 0.48)}px`,
                  marginTop: `${MOBILE_NAV_OFFSET}px`,
                  flexShrink: 0,
                }
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
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  opacity: 1,
                  padding: "8px 24px max(10px, env(safe-area-inset-bottom, 10px))",
                  overflow: "visible",
                }
              : {
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                  overflowX: "hidden",
                }
          }
        >
          <div
            className={!isMobileLayout ? "container" : undefined}
            style={isMobileLayout ? { width: "100%" } : undefined}
          >
          <div
            className={!isMobileLayout ? "ml-[7vw]" : undefined}
            style={{
              pointerEvents: "auto",
              maxWidth: "520px",
              width: "100%",
              ...(isMobileLayout
                ? { textAlign: "center" }
                : { textAlign: "left" }),
            }}
          >
            <p
              ref={(el) => { lineRefs.current[0] = el; }}
              style={{
                color: GOLD,
                fontSize: isMobileLayout ? "0.55rem" : "0.7rem",
                fontFamily: "Urbanist, sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                marginBottom: isMobileLayout ? "6px" : "10px",
              }}
            >
              Creative Lab
            </p>

            <h1
              ref={(el) => { lineRefs.current[1] = el; }}
              className="font-heading font-extrabold lowercase"
              style={{
                fontSize: isMobileLayout ? "1.48rem" : "clamp(2.1rem, 4.2vw, 3.5rem)",
                lineHeight: isMobileLayout ? 1.02 : 1.03,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                marginBottom: isMobileLayout ? "8px" : "10px",
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
                fontSize: isMobileLayout ? "0.72rem" : "clamp(0.875rem, 1.3vw, 1rem)",
                lineHeight: isMobileLayout ? 1.45 : 1.7,
                color: "rgba(255,255,255,0.46)",
                marginBottom: isMobileLayout ? "12px" : "16px",
              }}
            >
              Branding, packaging, and storytelling —<br className="block md:hidden" /> built together, from a single source.
            </p>

            <div
              ref={(el) => { lineRefs.current[3] = el; }}
              style={
                isMobileLayout
                  ? { display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }
                  : { display: "flex", flexWrap: "wrap", gap: "10px" }
              }
            >
              <Button size="lg" asChild className={isMobileLayout ? "h-[42px] px-6 text-[0.875rem] font-body font-bold" : "font-body font-bold"}>
                <Link
                  to="/contact#form"
                  style={isMobileLayout ? { width: "100%", maxWidth: "280px" } : undefined}
                >
                  start your brand
                </Link>
              </Button>
              <Button size="lg" variant="outline-white" asChild className={isMobileLayout ? "h-[42px] px-6 text-[0.875rem] font-body font-bold" : "font-body font-bold"}>
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
