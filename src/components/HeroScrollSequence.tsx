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
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ── bottle canvas (BEHIND text) ── */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-80"
        >
          <div
            className="w-[80vw] sm:w-[55vw] md:w-[45vw] lg:w-[38vw]"
            style={{ maxHeight: "70vh", aspectRatio: "1 / 1" }}
          >
            <canvas
              ref={canvasRef}
              className="h-full w-full"
              style={{ aspectRatio: "1 / 1" }}
            />
          </div>
        </div>

        {/* ── text layer (IN FRONT of bottle) ── */}
        <div
          className="relative z-20 flex flex-col items-center justify-center text-center px-6"
          style={{ textShadow: "0 2px 20px hsl(var(--background) / 0.7)" }}
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
            Creative Agency
          </span>

          <h1 className="mt-3 font-heading text-4xl font-extrabold lowercase leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl">
            litenby is a{" "}
            <span className="text-primary">creative lab</span>
          </h1>

          <p className="mt-5 max-w-lg font-body text-sm text-muted-foreground sm:text-base lg:text-lg">
            from idea to product — brand, packaging &amp; story, all under one roof.
          </p>

          <div className="mt-8 flex gap-4">
            <Button size="lg" asChild>
              <Link to="/contact#form">start your brand</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/packaging">our work</Link>
            </Button>
          </div>
        </div>

        {/* bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
