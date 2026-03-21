import { Search, PenTool, MessageSquare, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "discovery",
    description:
      "we dive deep into your market, competitors, and core values to find the 'un-fair advantage.'",
    icon: Search,
  },
  {
    title: "visual identity",
    description:
      "crafting the logo, typography, and color systems that define your brand's physical presence.",
    icon: PenTool,
  },
  {
    title: "brand voice",
    description:
      "developing the language and tone that makes your brand sound as good as it looks.",
    icon: MessageSquare,
  },
  {
    title: "brand guidelines",
    description:
      "building the 'bible' for your brand to ensure consistency across every single touchpoint.",
    icon: BookOpen,
  },
];

export function BrandMethodology() {
  return (
    <section className="w-full bg-background py-[120px]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-xl space-y-5 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-body text-sm font-semibold uppercase tracking-widest text-primary"
          >
            strategy & dna
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-heading text-4xl font-extrabold lowercase leading-tight tracking-tight text-foreground lg:text-[56px] lg:leading-[1.1]"
          >
            building the soul of the brand
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="font-body text-base text-muted-foreground"
          >
            a four-step methodology to distill your vision into a brand that resonates and endures.
          </motion.p>
        </div>

        {/* Grid — matches Storytelling features layout */}
        <div className="relative mx-auto mt-16 grid max-w-4xl divide-x divide-y divide-border/20 border border-border/20 sm:grid-cols-2">
          {steps.map((step) => (
            <div key={step.title} className="space-y-3 p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <step.icon className="size-5 text-primary" strokeWidth={1.5} />
                <h3 className="font-heading text-sm font-bold lowercase text-primary">
                  {step.title}
                </h3>
              </div>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
