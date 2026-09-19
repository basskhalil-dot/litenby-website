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
  description: string;
  icon: LucideIcon;
};

const journeySteps: JourneyStep[] = [
  { id: "idea", title: "idea", description: "share your vision and goals", icon: Lightbulb },
  { id: "brand", title: "brand", description: "design your identity and labels", icon: Fingerprint },
  { id: "pack", title: "pack", description: "choose from our real packaging containers", icon: Package },
  { id: "sample", title: "sample", description: "see and approve your physical product", icon: FlaskConical },
  { id: "launch", title: "launch", description: "start your marketing and launch plan", icon: Rocket },
];

export function JourneySection() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const activeJourneyStep = journeySteps.find((step) => step.id === activeStep);
  const activeTitle = activeJourneyStep?.title ?? "the journey";

  return (
    <section className="w-full bg-background py-24 lg:py-32">
      <div className="container">
        <div className="hidden min-h-[260px] grid-cols-[minmax(300px,0.85fr)_minmax(0,1.15fr)] items-center gap-8 md:grid lg:gap-12">
          <div className="min-w-0">
            <div className="h-6">
              <AnimatePresence initial={false}>
                {activeJourneyStep && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.18 }}
                    className="font-body text-xs font-semibold uppercase tracking-widest text-primary"
                  >
                    covering
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="relative h-[72px] overflow-hidden lg:h-[92px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                  key={activeTitle}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`absolute inset-x-0 top-0 whitespace-nowrap font-heading text-[52px] font-extrabold lowercase leading-none lg:text-[72px] ${
                    activeJourneyStep ? "text-foreground" : "text-primary"
                  }`}
                >
                  {activeTitle}
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="h-7">
              <AnimatePresence mode="wait" initial={false}>
                {activeJourneyStep && (
                  <motion.p
                    key={activeJourneyStep.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.18 }}
                    className="font-body text-base text-primary"
                  >
                    {activeJourneyStep.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div
            className="grid grid-cols-5 gap-2 lg:gap-5"
            onMouseLeave={() => setActiveStep(null)}
          >
            {journeySteps.map(({ id, title, icon: Icon }) => {
              const isActive = activeStep === id;
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
                  className={`h-28 w-full rounded-none p-0 transition-colors duration-200 hover:bg-transparent focus-visible:bg-transparent [&_svg]:!size-[58px] lg:[&_svg]:!size-16 ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.15}
                    size={58}
                    className="transition-colors duration-200"
                  />
                </Button>
              );
            })}
          </div>
        </div>

        <div className="md:hidden">
          <div className="mb-14 text-center">
            <h2 className="font-heading text-4xl font-extrabold lowercase leading-tight text-foreground">
              the journey
            </h2>
          </div>

          <div className="flex flex-col gap-14">
            {journeySteps.map(({ id, title, description, icon: Icon }) => (
              <div
                key={id}
                className="flex flex-col items-center text-center"
              >
                <Icon aria-hidden="true" strokeWidth={1.15} size={52} className="mb-5 size-[52px] text-primary" />
                <h3 className="font-heading text-2xl font-bold lowercase text-foreground">{title}</h3>
                <p className="mt-2 max-w-[290px] font-body text-base leading-relaxed text-primary">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}