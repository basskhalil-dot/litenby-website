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
    <section className="w-full bg-background pt-12 pb-[120px] lg:pt-16">
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
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
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
              A brand isn't a logo. It's every decision a product makes before it ever reaches a
              shelf. A great identity does the convincing before anyone reads a single word, before
              anyone tastes, tries, or opens anything. That's why branding sits at the center of what
              we do: identity, voice, and system, built to carry a product from concept through
              packaging and into the moment where it actually gets picked up. We notice the things
              most people don't — the weight of a label, the timing of a motion, the exact shade that
              reads premium instead of cheap. That's the difference between a brand that looks fine
              and one that gets remembered.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
