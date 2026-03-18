import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

function CardPattern({
  mouseX,
  mouseY,
  randomString,
}: {
  mouseX: ReturnType<typeof useMotionValue>;
  mouseY: ReturnType<typeof useMotionValue>;
  randomString: string;
}) {
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] opacity-10 mix-blend-overlay group-hover/card:opacity-30 transition-opacity duration-500" />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 mix-blend-overlay"
        style={style}
      >
        <p className="absolute inset-x-0 h-full break-words whitespace-pre-wrap font-mono text-xs font-bold text-foreground/30 transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

function EvervaultCard({ className }: { className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    setRandomString(generateRandomString(1500));
  }, []);

  const onMouseMove = useCallback(
    ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
      setRandomString(generateRandomString(1500));
    },
    [mouseX, mouseY]
  );

  return (
    <div
      className={cn(
        "group/card relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-transparent p-0.5",
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl"
      >
        <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full text-4xl font-bold text-foreground md:h-44 md:w-44">
            <div className="absolute h-full w-full rounded-full bg-card/80 blur-sm" />
            <span className="z-20 font-heading text-primary">LBY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.15 * i,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export function CTASection() {
  return (
    <section className="relative w-full bg-background overflow-hidden" style={{ paddingTop: 150, paddingBottom: 150 }}>
      {/* Orange glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[700px] rounded-full bg-primary/10 blur-[160px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Text content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.h2
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-[68px]"
            >
              ready to start your brand journey?
            </motion.h2>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg"
            >
              let's build your product from scratch to the shelf.
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-semibold"
              >
                start your brand
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-foreground/20 px-8 py-6 text-base font-semibold text-foreground hover:bg-foreground/5"
              >
                view our work
              </Button>
            </motion.div>
          </div>

          {/* Evervault card */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto w-full max-w-md"
          >
            <EvervaultCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
