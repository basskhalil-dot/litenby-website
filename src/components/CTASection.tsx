import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import iconBig from "@/assets/icon-big.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.15 * i,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export function CTASection() {
  return (
    <section className="relative w-full bg-background overflow-hidden" style={{ paddingTop: 100, paddingBottom: 100 }}>
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-primary/5" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* Text content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.h2
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-[58px] leading-[1.08] max-w-[620px]"
            >
              ready to start your brand journey?
            </motion.h2>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg font-body"
            >
              let's build your product from scratch to the shelf.
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-10"
            >
              <Button size="lg" asChild><Link to="/contact#form">start your brand</Link></Button>
            </motion.div>
          </div>

          {/* Sphere icon */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative mx-auto flex items-center justify-center"
          >
            {/* Static sphere */}
            <img
              src={iconBig}
              alt="Litenby abstract sphere"
              className="relative z-10 w-[180px] h-[180px] md:w-[240px] md:h-[240px]"
              style={{ objectFit: "contain" }}
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
