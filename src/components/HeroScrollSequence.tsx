import { useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useImageSequence } from "@/hooks/useImageSequence";
import { Button } from "@/components/ui/button";

export function HeroScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

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

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;
      let dw: number, dh: number, dx: number, dy: number;

      if (imgRatio > canvasRatio) {
        dw = w;
        dh = dw / imgRatio;
      } else {
        dh = h;
        dw = dh * imgRatio;
      }
      dx = (w - dw) / 2;
      dy = (h - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
    },
    [images]
  );

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

        const frameIndex = Math.min(
          totalFrames - 1,
          Math.floor(rawProgress * (totalFrames - 1))
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
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
      className="relative w-full bg-background"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start">
        {/* Bottle canvas — 70-80% of viewport height, near full width on mobile */}
        <div
          className="w-[92vw] md:w-auto flex-shrink-0 mt-16 md:mt-12"
          style={{ height: "75vh" }}
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>

        {/* Breathing space + text stack */}
        <div className="flex flex-col items-center text-center px-6 pt-8 md:pt-10">
          <h1 className="font-heading text-3xl font-extrabold lowercase leading-tight tracking-tight text-foreground sm:text-4xl lg:text-6xl">
            litenby is a{" "}
            <span className="text-primary">creative lab</span>
          </h1>

          <p className="mt-4 max-w-md font-body text-sm text-muted-foreground sm:text-base lg:text-lg">
            from idea to product — brand, packaging & story, all under one roof.
          </p>

          <div className="mt-6 flex gap-3">
            <Button size="lg" asChild>
              <Link to="/contact#form">start your brand</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/packaging">explore packaging</Link>
            </Button>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
