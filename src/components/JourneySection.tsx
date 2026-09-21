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

  return (
    <section className="w-full bg-background py-20 md:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto hidden max-w-[880px] grid-cols-[275px_minmax(0,1fr)] items-center gap-6 md:grid lg:max-w-[900px] lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
          <h2 className="whitespace-nowrap font-heading text-[44px] font-extrabold lowercase leading-none text-primary lg:text-[50px]">
            the journey
          </h2>

          <div
            className="grid grid-cols-5 gap-1 lg:gap-2"
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
                  className={`relative h-[88px] w-full rounded-none p-0 transition-colors duration-200 hover:bg-transparent focus-visible:bg-transparent [&_svg]:!size-11 lg:[&_svg]:!size-12 ${
                    isActive ? "!text-primary hover:!text-primary" : "!text-foreground hover:!text-foreground"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.15}
                    size={44}
                    className={isActive ? "!text-primary transition-colors duration-200" : "!text-foreground transition-colors duration-200"}
                  />
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-x-0 bottom-0 font-body text-xs font-medium lowercase text-foreground"
                      >
                        {title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto grid max-w-[300px] grid-cols-2 items-center gap-x-8 gap-y-9 md:hidden">
          <h2 className="justify-self-start self-start pt-[9px] pl-[22px] font-heading text-[34px] font-extrabold lowercase leading-[0.92] text-primary">
            the<br />journey
          </h2>

          {journeySteps.map(({ id, title, icon: Icon }) => (
              <div
                key={id}
                className="flex min-h-[86px] flex-col items-center justify-center text-center"
              >
                <Icon aria-hidden="true" strokeWidth={1.15} size={40} className="mb-3 size-10 text-primary" />
                <h3 className="font-heading text-base font-bold lowercase leading-none text-foreground">{title}</h3>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}