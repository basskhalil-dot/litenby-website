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
  return (
    <section className={cn("relative w-full overflow-hidden bg-background", className)}>
      {/* Text content */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12 text-center lg:pt-32 lg:pb-16">
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
          className="mt-6 font-heading text-4xl font-bold lowercase text-foreground md:text-5xl lg:text-[68px]"
        >
          the brand lab
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
    </section>
  );
};
