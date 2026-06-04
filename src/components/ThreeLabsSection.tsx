import { motion } from "framer-motion";
import { Paintbrush, Package, Rocket } from "lucide-react";
import labBrand from "@/assets/lab-brand.webm.asset.json";
import labPackaging from "@/assets/lab-packaging.webm.asset.json";
import labLaunch from "@/assets/lab-launch.webm.asset.json";

const labs = [
  {
    title: "Branding",
    description:
      "Your identity, built from scratch. Logo, color, type, and voice, designed to be recognised before a single word is read.",
    icon: Paintbrush,
    video: labBrand.url,
  },
  {
    title: "Packaging",
    description:
      "Container, label, finish. Every detail considered. Packaging designed to make the right first impression, on the shelf and everywhere else your product is seen.",
    icon: Package,
    video: labPackaging.url,
  },
  {
    title: "Storytelling",
    description:
      "Strategy, content, and go-to-market built around your brand's story. So when you launch, you don't just show up. You make an entrance.",
    icon: Rocket,
    video: labLaunch.url,
  },
];

export function ThreeLabsSection() {
  return (
    <section className="relative w-full bg-background pt-10 pb-20 lg:pb-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-highlight">
            Process
          </span>
          <h2 className="font-heading text-4xl font-extrabold text-foreground md:text-5xl lg:text-[68px]">
            the three labs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-muted-foreground font-body">
            Brand it. Pack it. Launch it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {labs.map((lab, i) => (
            <div
              key={lab.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-transparent bg-card transition-all duration-300"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-xl md:h-72 lg:h-80">
                <video
                  src={lab.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="h-full w-full rounded-xl object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              </div>
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
        </div>
      </div>
    </section>
  );
}
