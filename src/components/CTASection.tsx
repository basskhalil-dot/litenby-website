import { motion } from "framer-motion";
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
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.h2
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-[68px] leading-[1.05]"
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
              <button className="rounded-full bg-primary px-10 py-4 font-body text-[1.05rem] font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(255,165,0,0.3)]">
                start your brand
              </button>
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
            {/* Pulsing glow behind sphere */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute rounded-full"
              style={{
                width: 280,
                height: 280,
                background: "radial-gradient(circle, rgba(255,165,0,0.25) 0%, rgba(255,165,0,0.08) 50%, transparent 70%)",
              }}
            />

            {/* Slowly rotating sphere */}
            <motion.img
              src={iconBig}
              alt="Litenby abstract sphere"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="relative z-10 w-[180px] h-[180px] md:w-[220px] md:h-[220px]"
              style={{ objectFit: "contain" }}
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
