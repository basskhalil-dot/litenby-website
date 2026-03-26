import { useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useImageSequence } from "@/hooks/useImageSequence";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);

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
        dh = h;
        dw = dh * imgRatio;
      } else {
        dw = w;
        dh = dw / imgRatio;
      }
      dx = (w - dw) / 2;
      dy = (h - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
    },
    [images]
  );

  /* Draw first frame immediately as placeholder */
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

  /* GSAP ScrollTrigger */
  useEffect(() => {
    if (!loaded || !sectionRef.current) return;
    drawFrame(currentFrameRef.current);

    const obj = { frame: 0 };

    const tween = gsap.to(obj, {
      frame: totalFrames - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        snap: 1 / (totalFrames - 1),
      },
      onUpdate: () => {
        const idx = Math.round(obj.frame);
        if (idx !== currentFrameRef.current) {
          currentFrameRef.current = idx;
          drawFrame(idx);
        }
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [loaded, drawFrame, totalFrames]);

  /* Resize */
  useEffect(() => {
    const onResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start">

        {/* ── Bottle canvas (top) ── */}
        <div
          className="w-[88vw] sm:w-[60vw] md:w-[50vw] lg:w-[42vw] flex-shrink-0 mt-16"
          style={{ maxHeight: "60vh", paddingBottom: "100px" }}
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>

        {/* ── Text stack (bottom) ── */}
        <div className="flex flex-col items-center text-center px-6">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
            Creative Agency
          </span>

          <h1 className="mt-2 font-heading text-3xl font-extrabold lowercase leading-tight tracking-tight text-foreground sm:text-4xl lg:text-6xl">
            litenby is a{" "}
            <span className="text-primary">creative lab</span>
          </h1>

          <p className="mt-3 max-w-lg font-body text-sm text-muted-foreground sm:text-base lg:text-lg">
            from idea to product — brand, packaging &amp; story, all under one roof.
          </p>

          <div className="mt-6 flex gap-4">
            <Button size="lg" asChild>
              <Link to="/contact#form">start your brand</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/packaging">our work</Link>
            </Button>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
