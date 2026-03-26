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

  /* ── draw a frame ── */
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

      /* cover-fit */
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

  /* ── draw first frame immediately as placeholder ── */
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

  /* ── GSAP ScrollTrigger scrub ── */
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
        scrub: 1.5,
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

  /* ── resize handler ── */
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
      {/* ── sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ── text layer (behind bottle) ── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pt-[12vh]">
          {/* pre-title */}
          <span className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
            Creative Agency
          </span>

          {/* main title */}
          <h1 className="mt-3 font-heading text-4xl font-extrabold lowercase leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl">
            litenby is a{" "}
            <span className="text-primary">creative lab</span>
          </h1>

          {/* description */}
          <p className="mt-5 max-w-lg font-body text-sm text-muted-foreground sm:text-base lg:text-lg">
            from idea to product — brand, packaging &amp; story, all under one roof.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex gap-4">
            <Button size="lg" asChild>
              <Link to="/contact#form">start your brand</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/packaging">our work</Link>
            </Button>
          </div>
        </div>

        {/* ── bottle canvas (in front of text) ── */}
        <div
          className="relative z-20 w-[92vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] flex-shrink-0 pointer-events-none"
          style={{ height: "80vh" }}
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{ aspectRatio: "1 / 1" }}
          />
          {/* reflection fade — lets the AE gradient mesh blend into bg */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* bottom edge fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
