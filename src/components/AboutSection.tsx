import { motion } from "framer-motion";


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
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
              THE STORY
            </motion.span>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col gap-2"
            >
              <h2 className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-[68px]">
                the litenby story
              </h2>
            </motion.div>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg"
            >
              With over 15 years of experience in{" "}
              <span className="text-primary font-medium">advertising</span>,{" "}
              <span className="text-primary font-medium">motion design</span>,
              and{" "}
              <span className="text-primary font-medium">branding</span>, we've
              built Litenby into a creative lab obsessed with craft. Every
              project is a chance to push boundaries — blending strategy with
              bold aesthetics to create work that resonates and endures.
            </motion.p>

            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg"
            >
              From concept to culture, we don't just build brands — we give them
              a pulse. Our studio thrives at the intersection of design thinking
              and cinematic storytelling, delivering identities that move people.
            </motion.p>

            {/* CTA — merged inline */}
            <motion.h3
              custom={5}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 font-heading text-3xl font-extrabold tracking-tight text-highlight md:text-4xl lg:text-5xl leading-[1.1]"
            >
              ready to start your brand journey?
            </motion.h3>

            <motion.p
              custom={6}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg font-body"
            >
              let's build your product from scratch to the shelf.
            </motion.p>

            <motion.div
              custom={7}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-4"
            >
              <Button size="lg">start your brand</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
