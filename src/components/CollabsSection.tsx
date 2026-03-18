import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import collab1 from "@/assets/collab-1.jpg";
import collab2 from "@/assets/collab-2.jpg";
import collab3 from "@/assets/collab-3.jpg";
import collab4 from "@/assets/collab-4.jpg";
import collab5 from "@/assets/collab-5.jpg";

const collabs = [
  { src: collab1, title: "Amber Luxe Fragrance" },
  { src: collab2, title: "Premium Skincare Line" },
  { src: collab3, title: "Be Mali Fashion" },
  { src: collab4, title: "Artisan Candle Co." },
  { src: collab5, title: "Custom Wine Label" },
];

export function CollabsSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % collabs.length);
    }, 3500);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    startAutoPlay();
  };

  return (
    <section className="relative w-full bg-background py-24 lg:py-32 overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          className="mb-20 text-center"
        >
          <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Selected Work
          </span>
          <h2 className="font-heading text-4xl font-extrabold text-foreground md:text-5xl lg:text-[68px]">
            collabs
          </h2>
        </motion.div>
      </div>

      {/* 3D Perspective Gallery */}
      <div className="relative mx-auto flex h-[500px] max-w-6xl items-center justify-center" style={{ perspective: "1200px" }}>
        {collabs.map((collab, i) => {
          const offset = i - activeIndex;
          const absOffset = Math.abs(offset);
          const isActive = i === activeIndex;

          return (
            <motion.div
              key={collab.title}
              className="absolute cursor-pointer"
              animate={{
                x: offset * 220,
                z: isActive ? 0 : -absOffset * 150,
                rotateY: offset * -15,
                scale: isActive ? 1.1 : 1 - absOffset * 0.1,
                opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.25,
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
              style={{ transformStyle: "preserve-3d", zIndex: 10 - absOffset }}
              onClick={() => handleClick(i)}
            >
              <div
                className={`relative overflow-hidden rounded-2xl transition-shadow duration-500 ${
                  isActive
                    ? "shadow-[0_0_60px_rgba(255,165,0,0.3)]"
                    : "shadow-lg"
                }`}
                style={{ width: 280, height: 380 }}
              >
                <img
                  src={collab.src}
                  alt={collab.title}
                  className="h-full w-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-body text-sm font-semibold tracking-wide text-foreground">
                    {collab.title}
                  </p>
                </div>
                {/* Active orange accent line */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    layoutId="collabAccent"
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="mt-10 flex justify-center gap-2">
        {collabs.map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Hint */}
      <div className="container mt-6 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          click to explore
        </p>
      </div>
    </section>
  );
}
