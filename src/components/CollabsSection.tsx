import * as React from "react";
import { motion, useTransform, useScroll } from "framer-motion";

import collab1 from "@/assets/collab-1.jpg";
import collab2 from "@/assets/collab-2.jpg";
import collab3 from "@/assets/collab-3.jpg";
import collab4 from "@/assets/collab-4.jpg";
import collab5 from "@/assets/collab-5.jpg";

const collabImages = [
  { src: collab1, label: "Brand Identity" },
  { src: collab2, label: "Packaging" },
  { src: collab3, label: "Product Launch" },
  { src: collab4, label: "Visual System" },
  { src: collab5, label: "Campaign" },
  { src: collab1, label: "Direction" },
];

const Card: React.FC<{ src: string; label: string; index: number }> = ({
  src,
  label,
  index,
}) => {
  return (
    <div className="group relative flex-shrink-0 w-[340px] md:w-[380px] lg:w-[420px]">
      <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "4 / 5" }}>
        <img
          src={src}
          alt={label}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
      </div>
      {/* Label */}
      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-body text-sm font-medium lowercase tracking-wide text-foreground/80">
          {label}
        </span>
      </div>
    </div>
  );
};

export function CollabsSection() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] w-full"
      style={{ backgroundColor: "hsl(0 0% 0%)" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
          }}
          className="mb-10 text-center lg:mb-14"
        >
          <span className="mb-3 inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Selected Work
          </span>
          <h2 className="font-heading text-4xl font-extrabold lowercase text-foreground md:text-5xl lg:text-[68px]">
            collabs
          </h2>
        </motion.div>

        {/* Horizontal scroll strip */}
        <motion.div
          style={{ x }}
          className="flex gap-6 pl-8 md:gap-8 md:pl-16"
          transition={{ type: "spring", stiffness: 40, damping: 30 }}
        >
          {collabImages.map((img, i) => (
            <Card key={i} src={img.src} label={img.label} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
