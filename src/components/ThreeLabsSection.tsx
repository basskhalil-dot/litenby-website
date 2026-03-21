import { motion } from "framer-motion";
import { Paintbrush, Package, Rocket } from "lucide-react";
import labBrand from "@/assets/lab-brand.jpg";
import labPackaging from "@/assets/lab-packaging.jpg";
import labLaunch from "@/assets/lab-launch.jpg";

const labs = [
  {
    title: "Brand",
    description:
      "We design identities, logos, and labels that give products their voice.",
    icon: Paintbrush,
    image: labBrand,
  },
  {
    title: "Packaging Lab",
    description:
      "Choose from a curated collection of jars, bottles, and boxes ready for your brand.",
    icon: Package,
    image: labPackaging,
  },
  {
    title: "Launch",
    description:
      "We create photography, campaigns, and content to bring your product to life.",
    icon: Rocket,
    image: labLaunch,
  },
];

export function ThreeLabsSection() {
  return (
    <section className="relative w-full bg-background py-16 lg:py-24">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-highlight">
            WHAT WE DO
          </span>
          <h2 className="font-heading text-4xl font-extrabold text-foreground md:text-5xl lg:text-[68px]">
            the three labs
          </h2>
        </motion.div>

        {/* Cards grid — all appear at once */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {labs.map((lab) => (
            <div
              key={lab.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-transparent bg-card transition-all duration-300"
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

              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
