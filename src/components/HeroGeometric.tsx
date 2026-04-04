import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export function HeroGeometric() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] w-full flex items-center overflow-hidden bg-background"
    >
      {/* Content — left-aligned on desktop, centered on mobile */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-xl md:max-w-lg lg:max-w-xl">
          {/* Pretitle badge */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-1.5"
          >
            <Circle className="h-2 w-2 fill-primary text-primary" />
            <span className="text-sm font-body font-semibold uppercase tracking-widest text-primary">
              Creative Lab
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-foreground lowercase">
              from idea to shelf,{" "}
              <br className="hidden md:block" />
              and <span className="text-primary">everything</span> in between.
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-5 max-w-md text-base sm:text-lg text-muted-foreground font-body"
          >
            branding, packaging, and storytelling built together, from a single source.
          </motion.p>

          {/* Buttons */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-8 flex flex-col sm:flex-row items-start gap-4"
          >
            <Button size="lg" asChild>
              <Link to="/contact#form">start your brand</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary text-primary hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              <Link to="/packaging">explore packaging</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
