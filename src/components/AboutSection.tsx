import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.07 * i,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const ctaReveal = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function AboutSection() {
  return (
    <section className="w-full bg-background" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex flex-col items-center gap-6">
            <motion.span
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-highlight"
            >
              Story
            </motion.span>

            <motion.h2
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-[68px]"
            >
              the litenby way
            </motion.h2>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg lg:mt-8"
            >
              litenby was built on one belief: a great product without a strong brand is a missed
              opportunity. Every project starts from the same place. Brand, packaging, and story,
              built together, not stitched together after the fact.
            </motion.p>

            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg"
            >
              From brief to brand, bottle to campaign. One process, no gaps in translation. When
              everything comes from one place, it shows. And people trust what they're looking at.
            </motion.p>

            <motion.h3
              variants={ctaReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 font-heading text-3xl font-extrabold tracking-tight text-highlight md:text-4xl lg:text-5xl leading-[1.1]"
            >
              let's build what<br className="hidden md:block" /> you've been imagining.
            </motion.h3>

            <motion.p
              custom={6}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg font-body"
            >
              Your brand starts with a conversation.
            </motion.p>

            <motion.div
              custom={7}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-4"
            >
              <Button size="lg" asChild>
                <Link to="/contact#form">start your brand</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
