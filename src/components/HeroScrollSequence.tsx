import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        // force-decode
        if (offCtx) {
          offscreen.width = img.width;
          offscreen.height = img.height;
          offCtx.drawImage(img, 0, 0);
        }

        // Track early frames
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

    const obj = { frame: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

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

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [ready]);

  return (
    <div ref={wrapperRef} className="h-[150vh] md:h-[170vh]" style={{ overflow: "clip" }}>
      <div
        className="w-full bg-background flex items-center justify-center"
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            aspectRatio: "1 / 1",
            maxHeight: "70vh",
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: ready ? "block" : "none" }}
          />
        </div>
      </div>
    </div>
  );
}
