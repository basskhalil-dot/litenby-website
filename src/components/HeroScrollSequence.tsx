import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 48;
const EARLY_FRAMES = 10;

function generateFrames(): string[] {
  return Array.from({ length: TOTAL_FRAMES }, (_, i) =>
    `/hero-sequence/Bottle_${String(i).padStart(5, "0")}.jpg`
  );
}

interface HeroScrollSequenceProps {
  onEarlyLoad?: () => void;
}

export function HeroScrollSequence({ onEarlyLoad }: HeroScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const [ready, setReady] = useState(false);
  const earlyFiredRef = useRef(false);

  /* ---------- preload ---------- */
  useEffect(() => {
    const urls = generateFrames();
    let loaded = 0;
    let earlyLoaded = 0;
    const imgs: HTMLImageElement[] = [];

    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");

    urls.forEach((src, idx) => {
      const img = new Image();
      img.onload = () => {
        if (offCtx) {
          offscreen.width = img.width;
          offscreen.height = img.height;
          offCtx.drawImage(img, 0, 0);
        }

        if (idx < EARLY_FRAMES) {
          earlyLoaded++;
          if (earlyLoaded >= EARLY_FRAMES && !earlyFiredRef.current) {
            earlyFiredRef.current = true;
            onEarlyLoad?.();
          }
        }

        loaded++;
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          setReady(true);
        }
      };
      img.onerror = () => {
        if (idx < EARLY_FRAMES) {
          earlyLoaded++;
          if (earlyLoaded >= EARLY_FRAMES && !earlyFiredRef.current) {
            earlyFiredRef.current = true;
            onEarlyLoad?.();
          }
        }
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          setReady(true);
        }
      };
      img.src = src;
      imgs[idx] = img;
    });
  }, []);

  /* ---------- draw helper ---------- */
  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.min(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  /* ---------- resize ---------- */
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      drawFrame(frameIndexRef.current);
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [ready]);

  /* ---------- GSAP scroll ---------- */
  useEffect(() => {
    if (!ready) return;

    drawFrame(0);

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    const obj = { frame: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Frame scrub
    tl.to(obj, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => {
        const i = Math.round(obj.frame);
        if (i !== frameIndexRef.current) {
          frameIndexRef.current = i;
          drawFrame(i);
        }
      },
    });

    if (isDesktop) {
      // Lateral movement on the bottle container
      if (innerRef.current) {
        tl.to(
          innerRef.current,
          { x: "18vw", scale: 1.3, ease: "power1.inOut" },
          0
        );
      }

      // Text reveal — fades in during the last 25% of scroll
      if (textRef.current) {
        gsap.set(textRef.current, { opacity: 0, y: 40 });
          tl.to(
          textRef.current,
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 },
          0.15 // starts early, in parallel with lateral movement
        );
      }
    } else {
      // Mobile: scale only, no lateral movement
      if (innerRef.current) {
        tl.to(
          innerRef.current,
          { scale: 1.3, ease: "power1.inOut" },
          0
        );
      }
      if (textRef.current) {
        gsap.set(textRef.current, { opacity: 0, y: 30 });
        tl.to(
          textRef.current,
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
          0.3
        );
      }
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [ready]);

  return (
    <div ref={wrapperRef} className="h-[200vh] md:h-[220vh]" style={{ overflow: "clip" }}>
      <div
        className="w-full bg-background"
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >
        {/* Bottle canvas — upper half on mobile, centered on desktop */}
        <div className="absolute inset-0 flex items-start pt-[8vh] md:pt-0 md:items-center justify-center overflow-hidden">
          <div
            ref={innerRef}
            className="max-h-[45vh] md:max-h-[70vh] flex-shrink-0"
            style={{
              width: "min(100%, 600px)",
              aspectRatio: "1 / 1",
              willChange: "transform",
            }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ display: ready ? "block" : "none" }}
            />
          </div>
        </div>

        {/* Hero text — overlaid, animated via GSAP */}
        <div
          ref={textRef}
          className="absolute inset-0 flex items-end justify-center pb-[6vh] md:pb-0 md:items-center md:justify-start pointer-events-none overflow-hidden"
          style={{ opacity: 0 }}
        >
          <div className="pointer-events-auto w-full px-6 md:px-0 md:w-auto md:ml-[20vw] lg:ml-[22vw]">
            <div className="max-w-full md:max-w-lg lg:max-w-xl text-center md:text-left">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 px-3 py-1">
                <Circle className="h-2 w-2 fill-primary text-primary" />
                <span className="text-sm font-body font-semibold uppercase tracking-widest text-primary">
                  Creative Lab
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground lowercase">
                from idea to shelf,{" "}
                <br className="hidden md:block" />
                and <span className="text-primary">everything</span> in between.
              </h1>

              {/* Subtitle */}
              <p className="mt-4 max-w-sm text-sm sm:text-base text-muted-foreground font-body mx-auto md:mx-0">
                branding, packaging, and storytelling built together, from a single source.
              </p>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap items-center md:items-start justify-center md:justify-start gap-3">
                <Button size="lg" asChild>
                  <Link to="/contact#form">start your brand</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary text-primary hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                  <Link to="/packaging">explore packaging</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
