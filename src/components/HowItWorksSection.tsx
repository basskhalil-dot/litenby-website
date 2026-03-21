import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, PenTool, Box, Rocket } from "lucide-react";

const steps = [
  { step: "01", title: "idea", desc: "You come with a concept and a product idea\nthat you want to bring to life.", icon: Lightbulb },
  { step: "02", title: "brand", desc: "We design the identity, logo, and label system\nto shape how your product is perceived.", icon: PenTool },
  { step: "03", title: "container", desc: "We help you choose the right packaging format\nbased on your product and positioning.", icon: Box },
  { step: "04", title: "launch", desc: "We create visuals, content, and campaigns\nto introduce your product to the market.", icon: Rocket },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background"
      style={{ padding: "100px 0" }}
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Header — centered */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-highlight">
            OUR PROCESS
          </span>
          <h2 className="font-heading text-4xl font-extrabold lowercase text-foreground md:text-5xl lg:text-[68px]" style={{ lineHeight: 1.05 }}>
            how it works
          </h2>
        </motion.div>

        {/* Desktop blueprint */}
        <div className="hidden md:block relative">
          {/* Animated dashed connecting line */}
          <div className="absolute left-[12.5%] right-[12.5%] pointer-events-none" style={{ top: "60px" }}>
            <motion.div
              className="h-px w-full origin-left"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 6px, transparent 6px, transparent 14px)",
                backgroundSize: "14px 1px",
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </div>

          {/* Stations */}
          <motion.div
            className="grid grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex flex-col items-center text-center relative">
                  {/* Step number above node */}
                  <span className="font-body font-bold text-sm tracking-widest mb-3 text-highlight">
                    {item.step}
                  </span>

                  {/* Yellow node */}
                  <div className="relative mb-6">
                    <div
                      className="relative w-14 h-14 rounded-full flex items-center justify-center z-10"
                      style={{ background: "hsl(var(--highlight))" }}
                    >
                      <Icon size={24} className="text-background" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-extrabold text-lg text-foreground lowercase mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body font-normal text-sm leading-relaxed max-w-[200px] text-muted-foreground whitespace-pre-line">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile: vertical */}
        <motion.div
          className="md:hidden relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Vertical dashed line */}
          <motion.div
            className="absolute left-[27px] top-0 bottom-0 w-px origin-top"
            style={{
              backgroundImage: "repeating-linear-gradient(180deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 6px, transparent 6px, transparent 14px)",
              backgroundSize: "1px 14px",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />

          <div className="flex flex-col gap-14">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative flex items-start gap-6 text-left">
                  {/* Yellow node */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="relative w-14 h-14 rounded-full flex items-center justify-center z-10"
                      style={{ background: "hsl(var(--highlight))" }}
                    >
                      <Icon size={24} className="text-background" strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="font-body font-bold text-sm tracking-widest text-highlight">
                      {item.step}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-foreground lowercase mt-1 mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body font-normal text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
