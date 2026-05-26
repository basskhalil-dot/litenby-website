import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip the initial mount — no transition on first load
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const el = overlayRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    el.style.visibility = "visible";

    // Wipe in from left → cover screen → wipe out to right
    gsap
      .timeline()
      .fromTo(el, { xPercent: -100 }, { xPercent: 0, duration: 0.3, ease: "power2.in" })
      .to(el, {
        xPercent: 100,
        duration: 0.38,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(el, { xPercent: -100 });
          el.style.visibility = "hidden";
        },
      });
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        zIndex: 9999,
        visibility: "hidden",
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
