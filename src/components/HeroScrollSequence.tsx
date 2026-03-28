import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 48;
const frames: string[] = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `https://raw.githubusercontent.com/basskhalil-dot/litenby-website/main/public/hero-sequence/Bottle_${String(i).padStart(5, "0")}.jpg`
);

export function HeroScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [ready, setReady] = useState(false);

  // Pre-load all frames into memory
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];

    const offscreen = document.createElement("canvas");
    offscreen.width = 4;
    offscreen.height = 4;
    const offCtx = offscreen.getContext("2d");

    let loaded = 0;
    let errors = 0;

    frames.forEach((src, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "sync";
      img.src = src;
      images[i] = img;

      img.onload = () => {
        console.log(`✅ Hero frame loaded: ${src} (${img.naturalWidth}x${img.naturalHeight})`);
        offCtx?.drawImage(img, 0, 0, 4, 4);
        loaded++;
        if (loaded + errors === FRAME_COUNT && !cancelled) {
          console.log(`🎬 All hero frames processed: ${loaded} loaded, ${errors} errors`);
          imagesRef.current = images;
          setReady(true);
        }
      };

      img.onerror = () => {
        console.error(`❌ Hero frame 404: ${src} — full URL: ${window.location.origin}${src}`);
        errors++;
        if (loaded + errors === FRAME_COUNT && !cancelled) {
          console.log(`🎬 All hero frames processed: ${loaded} loaded, ${errors} errors`);
          imagesRef.current = images;
          setReady(true);
        }
      };
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Draw a frame to the canvas using contain-fit logic
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    const scale = Math.min(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // Setup canvas sizing + GSAP ScrollTrigger
  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(currentFrameRef.current);
    };

    resizeCanvas();
    drawFrame(0);

    const obj = { frame: 0 };

    const tween = gsap.to(obj, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: `.hero-pin-target`,
        scrub: 1.5,
        onUpdate: () => {
          const idx = Math.round(obj.frame);
          if (idx !== currentFrameRef.current) {
            currentFrameRef.current = idx;
            drawFrame(idx);
          }
        },
      },
    });

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ready]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="hero-pin-target sticky top-0 flex h-screen w-full items-center justify-center">
        <div
          className="relative flex items-center justify-center"
          style={{
            maxHeight: "70vh",
            width: "100%",
            aspectRatio: "1 / 1",
            maxWidth: "70vh",
            overflow: "visible",
          }}
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{
              display: ready ? "block" : "none",
              objectFit: "contain",
            }}
          />
          {!ready && (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
              Loading…
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
