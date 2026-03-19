import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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

export function AboutSection() {
  return (
    <section className="w-full bg-background py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">

          {/* Content */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                since 2010
              </Badge>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
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
              viewport={{ once: true, margin: "-100px" }}
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
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg"
            >
              From concept to culture, we don't just build brands — we give them
              a pulse. Our studio thrives at the intersection of design thinking
              and cinematic storytelling, delivering identities that move people.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
