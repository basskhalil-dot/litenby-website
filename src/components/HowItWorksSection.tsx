import { Lightbulb, PenTool, Box, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "idea", desc: "Every product begins with a vision.", icon: Lightbulb },
  { step: "02", title: "brand", desc: "Building the core identity and strategy.", icon: PenTool },
  { step: "03", title: "container", desc: "Designing the physical packaging lab.", icon: Box },
  { step: "04", title: "launch", desc: "Full-spectrum storytelling and market release.", icon: Rocket },
];

export function HowItWorksSection() {
  return (
    <section className="relative w-full" style={{ padding: "100px 0", backgroundColor: "#000000" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-highlight">
            OUR PROCESS
          </span>
          <h2 className="font-heading text-4xl font-extrabold lowercase text-white md:text-5xl lg:text-[68px]">
            how it works
          </h2>
        </motion.div>

        {/* Desktop: horizontal layout — all at once */}
        <div className="hidden md:block relative">
          {/* Horizontal connecting line */}
          <div
            className="absolute top-[60px] left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,165,0,0.3) 20%, rgba(255,165,0,0.3) 80%, transparent 100%)",
            }}
          />

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
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center relative"
                >
                  <span
                    className="font-body font-semibold text-xs tracking-widest mb-3"
                    style={{ color: "#FFA500" }}
                  >
                    {item.step}
                  </span>

                  <div className="relative mb-5">
                    <div
                      className="absolute -inset-4 rounded-full blur-xl"
                      style={{ background: "radial-gradient(circle, rgba(255,165,0,0.15) 0%, transparent 70%)" }}
                    />
                    <div
                      className="relative flex items-center justify-center w-14 h-14 rounded-full"
                      style={{
                        border: "1px solid rgba(255,165,0,0.4)",
                        boxShadow: "0 0 20px rgba(255,165,0,0.12), inset 0 0 12px rgba(255,165,0,0.06)",
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "#FFA500" }} />
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg text-white lowercase mb-2">
                    {item.title}
                  </h3>

                  <p
                    className="font-body font-normal text-sm leading-relaxed max-w-[200px]"
                    style={{ color: "#888888" }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile: vertical timeline — all at once */}
        <motion.div
          className="md:hidden relative pl-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute left-[22px] top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(255,165,0,0.3) 15%, rgba(255,165,0,0.3) 85%, transparent 100%)",
            }}
          />

          <div className="flex flex-col gap-12">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative flex items-start gap-5"
                >
                  <div className="absolute -left-10 top-0">
                    <div className="relative">
                      <div
                        className="absolute -inset-3 rounded-full blur-lg"
                        style={{ background: "radial-gradient(circle, rgba(255,165,0,0.15) 0%, transparent 70%)" }}
                      />
                      <div
                        className="relative flex items-center justify-center w-11 h-11 rounded-full"
                        style={{
                          border: "1px solid rgba(255,165,0,0.4)",
                          boxShadow: "0 0 16px rgba(255,165,0,0.12), inset 0 0 8px rgba(255,165,0,0.06)",
                          backgroundColor: "#000000",
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: "#FFA500" }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span
                      className="font-body font-semibold text-xs tracking-widest"
                      style={{ color: "#FFA500" }}
                    >
                      {item.step}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-white lowercase mt-1 mb-1">
                      {item.title}
                    </h3>
                    <p
                      className="font-body font-normal text-sm leading-relaxed"
                      style={{ color: "#888888" }}
                    >
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
