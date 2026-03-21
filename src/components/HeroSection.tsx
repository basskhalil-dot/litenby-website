"use client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import heroBottle from "@/assets/hero-bottle.png";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-primary/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-foreground/[0.05]",
            "shadow-[0_8px_32px_0_rgba(255,165,0,0.08)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.06),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      delay: 0.1 + i * 0.05,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-background">
      {/* Geometric floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.1}
          width={600}
          height={140}
          rotate={12}
          gradient="from-primary/[0.08]"
          className="-left-[10%] top-[15%]"
        />
        <ElegantShape
          delay={0.15}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-primary/[0.06]"
          className="-right-[5%] top-[20%]"
        />
        <ElegantShape
          delay={0.12}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-primary/[0.04]"
          className="bottom-[15%] left-[5%]"
        />
        <ElegantShape
          delay={0.18}
          width={200}
          height={60}
          rotate={20}
          gradient="from-primary/[0.07]"
          className="bottom-[25%] right-[15%]"
        />
        <ElegantShape
          delay={0.2}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-primary/[0.05]"
          className="left-[20%] top-[10%]"
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex min-h-[90vh] items-center">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Text */}
          <div className="flex flex-col items-start order-2 lg:order-1 lg:pr-12">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-6 flex items-center gap-2 rounded-full border border-border/50 px-4 py-1.5"
            >
              <Circle className="h-2 w-2 fill-primary text-primary" />
              <span className="text-sm text-muted-foreground">creative studio</span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-7xl lg:text-[110px]"
            >
              from idea to product.
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg"
            >
              Litenby is a creative lab where brands, packaging, and launch campaigns are built together.
            </motion.p>

            <motion.p
              custom={2.5}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base"
            >
              We help founders turn ideas into real products through brand identity, packaging selection, and launch campaigns.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-8"
            >
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild><Link to="/contact#form">start your brand</Link></Button>
                <Button size="lg" variant="outline" asChild><Link to="/packaging">explore packaging</Link></Button>
              </div>
            </motion.div>
          </div>

          {/* Right: Hero Bottle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center order-1 lg:order-2 min-h-[50vh] lg:min-h-[80vh]"
          >
            {/* Floating bottle */}
            <motion.img
              src={heroBottle}
              alt="Litenby branded bottle"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 w-[60vw] sm:w-[45vw] lg:w-auto"
              style={{
                height: "75vh",
                objectFit: "contain",
              }}
              draggable={false}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
