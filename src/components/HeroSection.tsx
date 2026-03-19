"use client";

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
        duration: 2.4,
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
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-background">
      {/* Geometric floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-primary/[0.08]"
          className="-left-[10%] top-[15%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-primary/[0.06]"
          className="-right-[5%] top-[20%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-primary/[0.04]"
          className="bottom-[15%] left-[5%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-primary/[0.07]"
          className="bottom-[25%] right-[15%]"
        />
        <ElegantShape
          delay={0.7}
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
          <div className="flex flex-col items-start order-2 lg:order-1">
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
              litenby is a{" "}
              <span className="text-primary">creative</span> lab
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg"
            >
              crafting exceptional digital experiences through innovative design
              and cutting-edge brand strategy.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-8"
            >
              <button className="rounded-full bg-primary px-9 py-3.5 font-body text-[0.938rem] font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(255,165,0,0.3)]">
                start your brand
              </button>
            </motion.div>
          </div>

          {/* Right: Hero Bottle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative flex items-center justify-center order-1 lg:order-2 min-h-[40vh] lg:min-h-[70vh]"
          >
            {/* Orange radial glow */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "120%",
                height: "120%",
                top: "-10%",
                left: "-10%",
                background: "radial-gradient(ellipse at 50% 50%, rgba(255,165,0,0.15) 0%, rgba(255,165,0,0.06) 35%, transparent 65%)",
              }}
            />

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
              className="relative z-10 w-[50vw] sm:w-[40vw] lg:w-auto drop-shadow-[0_0_40px_rgba(255,165,0,0.15)]"
              style={{
                height: "auto",
                maxHeight: "60vh",
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
