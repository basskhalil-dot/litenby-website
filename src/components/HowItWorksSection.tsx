import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { step: "01", title: "idea", desc: "Every product begins with a vision.", coord: "R-204 / L-09" },
  { step: "02", title: "brand", desc: "Building the core identity and strategy.", coord: "R-117 / L-42" },
  { step: "03", title: "container", desc: "Designing the physical packaging lab.", coord: "R-308 / L-71" },
  { step: "04", title: "launch", desc: "Full-spectrum storytelling and market release.", coord: "R-085 / L-96" },
];

function Crosshair() {
  return (
    <motion.svg
      width="28" height="28" viewBox="0 0 28 28"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer circle */}
      <circle cx="14" cy="14" r="10" fill="none" stroke="#FFFF00" strokeWidth="1" opacity="0.4" />
      {/* Cross lines */}
      <line x1="14" y1="2" x2="14" y2="10" stroke="#FFFF00" strokeWidth="1" />
      <line x1="14" y1="18" x2="14" y2="26" stroke="#FFFF00" strokeWidth="1" />
      <line x1="2" y1="14" x2="10" y2="14" stroke="#FFFF00" strokeWidth="1" />
      <line x1="18" y1="14" x2="26" y2="14" stroke="#FFFF00" strokeWidth="1" />
      {/* Center dot */}
      <circle cx="14" cy="14" r="2" fill="#FFFF00" />
    </motion.svg>
  );
}

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background"
      style={{ padding: "100px 0" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header — left aligned */}
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
          {/* Vertical grid lines behind each station */}
          <div className="grid grid-cols-4 absolute inset-0 pointer-events-none">
            {steps.map((item) => (
              <div key={item.step} className="flex justify-center">
                <div className="w-px h-full" style={{ background: "rgba(255,255,255,0.04)" }} />
              </div>
            ))}
          </div>

          {/* Animated dotted connecting line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[14px] h-0 pointer-events-none">
            <motion.div
              className="h-px w-full origin-left"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 4px, transparent 4px, transparent 12px)",
                backgroundSize: "12px 1px",
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
            {steps.map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center relative">
                {/* Crosshair */}
                <div className="mb-6">
                  <Crosshair />
                </div>

                {/* Coordinate label */}
                <span
                  className="mb-3 block text-[10px] tracking-wider"
                  style={{ fontFamily: "'Courier New', monospace", color: "rgba(255,255,255,0.15)" }}
                >
                  {item.coord}
                </span>

                {/* Step number */}
                <span className="font-body font-semibold text-xs tracking-widest mb-2 text-highlight">
                  {item.step}
                </span>

                {/* Title */}
                <h3 className="font-heading font-extrabold text-lg text-foreground lowercase mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-body font-normal text-sm leading-relaxed max-w-[200px] text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: vertical blueprint */}
        <motion.div
          className="md:hidden relative pl-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Vertical dotted line */}
          <motion.div
            className="absolute left-[13px] top-0 bottom-0 w-px origin-top"
            style={{
              backgroundImage: "repeating-linear-gradient(180deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 4px, transparent 4px, transparent 12px)",
              backgroundSize: "1px 12px",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />

          <div className="flex flex-col gap-14">
            {steps.map((item) => (
              <div key={item.step} className="relative flex items-start gap-5">
                {/* Crosshair on the line */}
                <div className="absolute -left-12 top-0">
                  <Crosshair />
                </div>

                <div className="pt-1">
                  <span
                    className="block text-[9px] tracking-wider mb-1"
                    style={{ fontFamily: "'Courier New', monospace", color: "rgba(255,255,255,0.15)" }}
                  >
                    {item.coord}
                  </span>
                  <span className="font-body font-semibold text-xs tracking-widest text-highlight">
                    {item.step}
                  </span>
                  <h3 className="font-heading font-extrabold text-lg text-foreground lowercase mt-1 mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body font-normal text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
