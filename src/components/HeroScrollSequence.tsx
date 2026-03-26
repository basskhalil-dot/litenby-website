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
  const frameRef = useRef(0);
  const { images, loaded, totalFrames } = useImageSequence();

  /* ── draw a single frame ── */
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = images.current[index];
      if (!canvas || !ctx || !img?.complete || !img.naturalWidth) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.clearRect(0, 0, w, h);

      // cover-fit the image
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = w / h;
      let dw: number, dh: number;
      if (ir > cr) { dh = h; dw = dh * ir; }
      else { dw = w; dh = dw / ir; }
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    },
    [images],
  );

  /* ── draw frame 0 as soon as it loads ── */
  useEffect(() => {
    const img = images.current[0];
    if (!img) return;
    const paint = () => drawFrame(0);
    if (img.complete && img.naturalWidth) paint();
    else img.addEventListener("load", paint, { once: true });
  }, [drawFrame, images]);

  /* ── GSAP scroll-driven animation ── */
  useEffect(() => {
    if (!loaded || !sectionRef.current) return;
    drawFrame(0);

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
        const i = Math.round(obj.frame);
        if (i !== frameRef.current) {
          frameRef.current = i;
          drawFrame(i);
        }
      },
    });

    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [loaded, drawFrame, totalFrames]);

  /* ── redraw on resize ── */
  useEffect(() => {
    const fn = () => drawFrame(frameRef.current);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [drawFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-visible">

        {/* ── Upper: Bottle canvas ── */}
        <div
          className="w-[90vw] sm:w-[62vw] md:w-[50vw] lg:w-[44vw] flex-shrink-0 mt-10 sm:mt-14"
          style={{ maxHeight: "55vh", paddingBottom: "50px", overflow: "visible" }}
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>

        {/* ── Lower: Text + Buttons ── */}
        <div className="flex flex-col items-center text-center px-6 mt-2">
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

        {/* bottom fade */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
