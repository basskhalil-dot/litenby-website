import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Fingerprint,
  FlaskConical,
  Lightbulb,
  Package,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type JourneyStep = {
  id: string;
  title: string;
  icon: LucideIcon;
};

const journeySteps: JourneyStep[] = [
  { id: "idea", title: "idea", icon: Lightbulb },
  { id: "brand", title: "brand", icon: Fingerprint },
  { id: "pack", title: "pack", icon: Package },
  { id: "sample", title: "sample", icon: FlaskConical },
  { id: "launch", title: "launch", icon: Rocket },
];

export function JourneySection() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const activeTitle = journeySteps.find((step) => step.id === activeStep)?.title ?? "the journey";

  return (
    <section className="w-full border-y border-border bg-background py-20 lg:py-28">
      <div className="container">
        <div className="hidden min-h-[300px] grid-cols-[minmax(320px,0.9fr)_minmax(0,1.4fr)] items-center gap-16 md:grid">
          <div className="min-w-0">
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-widest text-primary">
              covering
            </p>
            <div className="relative h-[88px] overflow-hidden lg:h-[108px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                  key={activeTitle}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-x-0 top-0 whitespace-nowrap font-heading text-[56px] font-extrabold lowercase leading-none text-foreground lg:text-[76px]"
                >
                  {activeTitle}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="grid grid-cols-5 border-x border-border"
            onMouseLeave={() => setActiveStep(null)}
          >
            {journeySteps.map(({ id, title, icon: Icon }) => {
              const isActive = activeStep === id;
              const isDimmed = activeStep !== null && !isActive;

              return (
                <Button
                  key={id}
                  type="button"
                  variant="ghost"
                  aria-label={title}
                  aria-pressed={isActive}
                  onMouseEnter={() => setActiveStep(id)}
                  onFocus={() => setActiveStep(id)}
                  onBlur={() => setActiveStep(null)}
                  className={`group h-[220px] w-full rounded-none border-r border-border p-0 transition-colors duration-200 last:border-r-0 hover:bg-secondary/60 focus-visible:bg-secondary/60 [&_svg]:size-14 lg:[&_svg]:size-16 ${
                    isDimmed ? "text-muted-foreground opacity-40" : "text-foreground opacity-100"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.15}
                    className={`transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-current"
                    }`}
                  />
                </Button>
              );
            })}
          </div>
        </div>

        <div className="md:hidden">
          <div className="mb-12 text-center">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-primary">
              covering
            </p>
            <h2 className="font-heading text-4xl font-extrabold lowercase leading-tight text-foreground">
              the journey
            </h2>
          </div>

          <div className="grid grid-cols-2 border-l border-t border-border">
            {journeySteps.map(({ id, title, icon: Icon }, index) => (
              <div
                key={id}
                className={`flex min-h-[150px] flex-col items-center justify-center gap-4 border-b border-r border-border ${
                  index === journeySteps.length - 1 ? "col-span-2" : ""
                }`}
              >
                <Icon aria-hidden="true" strokeWidth={1.15} className="size-11 text-primary" />
                <p className="font-heading text-base font-bold lowercase text-foreground">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}