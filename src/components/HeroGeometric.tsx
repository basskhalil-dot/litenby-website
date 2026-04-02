import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
      transition={{ duration: 2.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-foreground/[0.08]",
            "shadow-[0_8px_32px_0_rgba(255,165,0,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.08),transparent_70%)]"
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

export function HeroGeometric() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Grid overlay */}
      {/* Grid overlay removed */}

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-primary/[0.04]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-primary/[0.03]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-primary/[0.02]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-primary/[0.03]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-primary/[0.02]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[8%]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pretitle badge */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-1.5"
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
            animate="visible"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-foreground lowercase">
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
            animate="visible"
            className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-muted-foreground font-body"
          >
            branding, packaging, and storytelling — built together, from a single source.
          </motion.p>

          {/* Buttons */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link to="/contact#form">start your brand</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
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
