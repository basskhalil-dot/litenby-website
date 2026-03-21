import { Search, PenTool, MessageSquare, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "discovery",
    description:
      "we dive deep into your market, competitors, and core values to find the 'un-fair advantage.'",
    icon: Search,
  },
  {
    number: "02",
    title: "visual identity",
    description:
      "crafting the logo, typography, and color systems that define your brand's physical presence.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "brand voice",
    description:
      "developing the language and tone that makes your brand sound as good as it looks.",
    icon: MessageSquare,
  },
  {
    number: "04",
    title: "brand guidelines",
    description:
      "building the 'bible' for your brand to ensure consistency across every single touchpoint.",
    icon: BookOpen,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.15 * i,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export function BrandMethodology() {
  return (
    <section className="w-full bg-background py-[120px]">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-body text-sm font-semibold uppercase tracking-widest text-primary"
        >
          strategy & dna
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl font-heading text-4xl font-extrabold lowercase leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          building the soul of the brand.
        </motion.h2>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative flex flex-col gap-4 rounded-2xl border border-border/40 bg-card p-6 transition-colors duration-300 hover:border-primary/30"
            >
              {/* Number */}
              <span className="font-heading text-sm font-bold text-primary">
                {step.number}
              </span>

              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <step.icon className="h-5 w-5 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg font-extrabold lowercase text-foreground">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
