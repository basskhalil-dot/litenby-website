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

  return (
    <section className="w-full bg-background py-24 lg:py-32">
      <div className="container">
        <div className="hidden min-h-[260px] grid-cols-[minmax(300px,0.85fr)_minmax(0,1.15fr)] items-center gap-8 md:grid lg:gap-12">
          <div className="min-w-0">
            <div className="relative h-[123px] lg:h-[143px]">
              <AnimatePresence mode="wait" initial={false}>
                {activeJourneyStep ? (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <p className="h-6 font-body text-xs font-semibold uppercase tracking-widest text-primary">
                      covering
                    </p>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeJourneyStep.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.14, ease: "easeOut" }}
                      >
                        <h2 className="whitespace-nowrap font-heading text-[52px] font-extrabold lowercase leading-none text-foreground lg:text-[72px]">
                          {activeJourneyStep.title}
                        </h2>
                        <p className="mt-3 font-body text-base text-primary">
                          {activeJourneyStep.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.h2
                    key="journey"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center whitespace-nowrap font-heading text-[52px] font-extrabold lowercase leading-none text-primary lg:text-[72px]"
                  >
                    the journey
                  </motion.h2>
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
                    isActive ? "!text-primary hover:!text-primary" : "!text-foreground hover:!text-foreground"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.15}
                    size={58}
                    className={isActive ? "!text-primary transition-colors duration-200" : "!text-foreground transition-colors duration-200"}
                  />
                </Button>
              );
            })}
          </div>
        </div>

        <div className="md:hidden">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-extrabold lowercase leading-tight text-foreground">
              the journey
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8">
            {journeySteps.map(({ id, title, description, icon: Icon }) => (
              <div
                key={id}
                className="flex flex-col items-center text-center last:col-span-2"
              >
                <Icon aria-hidden="true" strokeWidth={1.15} size={40} className="mb-3 size-10 text-primary" />
                <h3 className="font-heading text-lg font-bold lowercase text-foreground">{title}</h3>
                <p className="mt-1 max-w-[160px] font-body text-sm leading-snug text-primary">
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