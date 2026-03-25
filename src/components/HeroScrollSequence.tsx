import { useRef, useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useImageSequence } from "@/hooks/useImageSequence";
import { Button } from "@/components/ui/button";

export function HeroScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [textTranslateY, setTextTranslateY] = useState(0);

  const { images, loaded, totalFrames } = useImageSequence();

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = images.current[frameIndex];
      if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      const isMobile = w < 768;
      const scaleFactor = isMobile ? 0.85 : 0.7;

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;
      let dw: number, dh: number, dx: number, dy: number;

      if (imgRatio > canvasRatio) {
        dw = w * scaleFactor;
        dh = dw / imgRatio;
      } else {
        dh = h * scaleFactor;
        dw = dh * imgRatio;
      }
      dx = (w - dw) / 2;
      // Push bottle up slightly to leave room for text below
      const verticalOffset = isMobile ? -h * 0.06 : -h * 0.08;
      dy = (h - dh) / 2 + verticalOffset;

      ctx.drawImage(img, dx, dy, dw, dh);
    },
    [images]
  );

  // Draw first frame immediately as placeholder
  useEffect(() => {
    const img = images.current[0];
    if (!img) return;
    const tryDraw = () => drawFrame(0);
    if (img.complete && img.naturalWidth) {
      tryDraw();
    } else {
      img.addEventListener("load", tryDraw, { once: true });
    }
  }, [drawFrame, images]);

  useEffect(() => {
    if (!loaded) return;
    drawFrame(currentFrameRef.current);

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const scrollableHeight = section.offsetHeight - window.innerHeight;
        if (scrollableHeight <= 0) return;
        const scrolled = -rect.top;
        const rawProgress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

        // Frame animation
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.floor(rawProgress * (totalFrames - 1))
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        // Parallax: text moves up 2x faster and fades out in first 40% of scroll
        const textProgress = Math.min(1, rawProgress / 0.4);
        setTextOpacity(1 - textProgress);
        setTextTranslateY(-textProgress * 120);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, drawFrame, totalFrames]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "200vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ background: "#000000" }}
        />

        {/* UI Overlay — centered below bottle */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-center pb-10 sm:pb-14"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
            willChange: "transform, opacity",
            pointerEvents: textOpacity < 0.1 ? "none" : "auto",
          }}
        >
          <div className="flex flex-col items-center gap-3 text-center px-6">
            <h1 className="font-heading text-4xl font-extrabold lowercase leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              <span className="block">narratives</span>
              <span className="block">
                that <span className="text-primary">move</span>
              </span>
            </h1>

            <p className="max-w-md font-body text-sm text-white/60 sm:text-base">
              from idea to product — brand, packaging & story, all under one
              roof.
            </p>

            <div className="mt-2 flex gap-3">
              <Button size="lg" asChild>
                <Link to="/contact#form">start your brand</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/packaging">explore packaging</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
