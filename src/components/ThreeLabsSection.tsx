import { motion } from "framer-motion";
import { Paintbrush, Package, Rocket } from "lucide-react";
import labBrand from "@/assets/lab-brand.jpg";
import labPackaging from "@/assets/lab-packaging.jpg";
import labLaunch from "@/assets/lab-launch.jpg";

const labs = [
  {
    title: "Brand",
    description:
      "We distill your vision into a bold identity system — logo, type, color, voice — built to cut through noise and command attention.",
    icon: Paintbrush,
    image: labBrand,
  },
  {
    title: "Packaging Lab",
    description:
      "From concept to shelf, we design packaging that stops thumbs and turns heads. Tactile, iconic, impossible to ignore.",
    icon: Package,
    image: labPackaging,
  },
  {
    title: "Launch",
    description:
      "Strategy, content, and go-to-market firepower. We don't just build brands — we launch them into culture.",
    icon: Rocket,
    image: labLaunch,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.2 + i * 0.15,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export function ThreeLabsSection() {
  return (
    <section className="relative w-full bg-background py-16 lg:py-24">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            What We Do
          </span>
          <h2 className="font-heading text-4xl font-extrabold text-foreground md:text-5xl lg:text-[68px]">
            the three labs
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(255,165,0,0.06)]"
            >
              {/* Image area */}
              <div className="relative h-64 w-full overflow-hidden rounded-xl md:h-72 lg:h-80">
                <img
                  src={lab.image}
                  alt={lab.title}
                  className="h-full w-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative flex flex-1 flex-col p-6 lg:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <lab.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-heading text-xl font-extrabold text-foreground lg:text-2xl">
                    {lab.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                  {lab.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
