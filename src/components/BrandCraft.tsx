import { motion } from "framer-motion";
import brandingVideo from "@/assets/branding-craft.webm.asset.json";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15 * i,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export function BrandCraft() {
  return (
    <section className="w-full bg-background py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="overflow-hidden rounded-2xl"
          >
            <video
              src={brandingVideo.url}
              autoPlay
              muted
              loop
              playsInline
              className="h-auto w-full object-cover"
            />
          </motion.div>

          {/* Text content */}
          <div className="flex flex-col">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-body text-sm font-semibold uppercase tracking-widest text-primary"
            >
              the craft
            </motion.p>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-4 max-w-lg font-heading text-4xl font-extrabold lowercase leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              built to resonate, not just exist.
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-6 max-w-lg font-body text-base leading-relaxed text-muted-foreground lg:text-lg"
            >
              With over 15 years in the trenches of advertising and motion
              design, Litenby doesn't just create logos—we build visual
              legacies. Our dedication to the craft is obsessive; from the
              weight of the paper to the physics of the motion, every detail is
              engineered to ensure your brand doesn't just join the market, but
              commands it. Authenticity isn't a goal here; it's our baseline.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
