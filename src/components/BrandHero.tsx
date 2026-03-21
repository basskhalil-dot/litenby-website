import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BrandHeroProps {
  images: string[];
  className?: string;
}

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20, delay: i * 0.1 },
  }),
};

export const BrandHero: React.FC<BrandHeroProps> = ({ images, className }) => {
  const duplicatedImages = [...images, ...images];

  return (
    <section className={cn("relative w-full overflow-hidden bg-background", className)}>
      {/* Text content */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 text-center">
        <motion.p
          custom={0}
          variants={fadeVariants}
          initial="hidden"
          animate="show"
          className="font-body text-sm font-semibold uppercase tracking-widest text-primary"
        >
          brand lab
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeVariants}
          initial="hidden"
          animate="show"
          className="mt-6 font-heading text-5xl font-extrabold lowercase leading-[1.05] tracking-tight text-foreground sm:text-7xl lg:text-[110px]"
        >
          the brand{" "}
          <span className="text-primary">lab.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeVariants}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-xl font-body text-base text-muted-foreground sm:text-lg"
        >
          where strategy meets visual soul. crafting identities that resonate and endure.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeVariants}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <Button size="lg" asChild><Link to="/contact#form">start your brand</Link></Button>
        </motion.div>
      </div>

      {/* Animated marquee */}
      <div className="relative w-full overflow-hidden py-8">
        {/* Left/right fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex w-max gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative h-48 w-72 flex-shrink-0 overflow-hidden rounded-2xl sm:h-64 sm:w-96"
            >
              <img
                src={src}
                alt={`Brand work ${(index % images.length) + 1}`}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
