import { Lightbulb, PenTool, Box, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "idea",
    desc: "Every product begins with a vision.",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "brand",
    desc: "Building the core identity and strategy.",
    icon: PenTool,
  },
  {
    step: "03",
    title: "container",
    desc: "Designing the physical packaging lab.",
    icon: Box,
  },
  {
    step: "04",
    title: "launch",
    desc: "Full-spectrum storytelling and market release.",
    icon: Rocket,
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative w-full bg-background" style={{ padding: "100px 0" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Process
          </span>
          <h2 className="font-heading text-4xl font-extrabold text-foreground md:text-5xl lg:text-[68px]">
            how it works
          </h2>
        </motion.div>

        {/* 4-column diagram */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {/* Connecting line behind icons */}
          <div
            className="hidden md:block absolute top-[72px] left-[12.5%] right-[12.5%] h-px"
            style={{ backgroundColor: "rgba(255, 165, 0, 0.15)" }}
          />

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {/* Step number */}
                <span
                  className="font-body font-semibold text-xs tracking-widest mb-3"
                  style={{ color: "#FFA500" }}
                >
                  {item.step}
                </span>

                {/* Icon */}
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-full border mb-4"
                  style={{ borderColor: "rgba(255, 165, 0, 0.3)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#FFA500" }} />
                </div>

                {/* Title */}
                <h3 className="font-heading font-extrabold text-lg text-foreground lowercase mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-body font-normal text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
