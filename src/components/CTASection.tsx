import { motion } from "framer-motion";
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
      {/* Subtle orange glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-primary/8 blur-[140px]" />
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
              <Button variant="gooeyRight" className="px-10 py-4 font-body text-[1.05rem] font-semibold hover:shadow-[0_0_30px_rgba(255,165,0,0.3)]">
                start your brand
              </Button>
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
            {/* Static glow behind sphere */}
            <div
              className="absolute rounded-full"
              style={{
                width: 300,
                height: 300,
                background: "radial-gradient(circle, rgba(255,165,0,0.2) 0%, rgba(255,165,0,0.06) 50%, transparent 70%)",
              }}
            />

            {/* Static sphere */}
            <img
              src={iconBig}
              alt="Litenby abstract sphere"
              className="relative z-10 w-[180px] h-[180px] md:w-[240px] md:h-[240px] drop-shadow-[0_0_40px_rgba(255,165,0,0.2)]"
              style={{ objectFit: "contain" }}
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
