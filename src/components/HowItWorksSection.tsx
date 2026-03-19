import { useState, useEffect, useRef } from "react";
import { Lightbulb, Fingerprint, Box, Rocket } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  step: string;
  content: string;
  icon: React.ElementType;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Idea",
    step: "01",
    content: "Every product begins with a vision.",
    icon: Lightbulb,
  },
  {
    id: 2,
    title: "Brand",
    step: "02",
    content: "Building the core identity and strategy.",
    icon: Fingerprint,
  },
  {
    id: 3,
    title: "Container",
    step: "03",
    content: "Designing the physical packaging lab.",
    icon: Box,
  },
  {
    id: 4,
    title: "Launch",
    step: "04",
    content: "Full-spectrum storytelling and market release.",
    icon: Rocket,
  },
];

export function HowItWorksSection() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.25) % 360);
      }, 50);
    }
    return () => clearInterval(timer);
  }, [autoRotate]);

  const handleNodeClick = (id: number) => {
    if (activeNodeId === id) {
      setActiveNodeId(null);
      setAutoRotate(true);
    } else {
      setActiveNodeId(id);
      setAutoRotate(false);
      // Center the clicked node at the top
      const index = timelineData.findIndex((item) => item.id === id);
      const targetAngle = (index / 4) * 360;
      setRotationAngle(270 - targetAngle);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      setActiveNodeId(null);
      setAutoRotate(true);
    }
  };

  const getNodePosition = (index: number) => {
    const angle = ((index / 4) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const radius = 160;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const opacity = Math.max(0.5, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2));
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    return { x, y, opacity, zIndex };
  };

  return (
    <section className="relative w-full bg-background py-16 lg:py-24 overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Process
          </span>
          <h2 className="font-heading text-4xl font-extrabold text-foreground md:text-5xl lg:text-[68px]">
            how it works
          </h2>
        </div>

        {/* Orbital container */}
        <div
          ref={containerRef}
          onClick={handleContainerClick}
          className="relative mx-auto flex h-[500px] w-[500px] max-w-full items-center justify-center"
        >
          {/* Orbit rings */}
          <div className="absolute h-[320px] w-[320px] rounded-full border border-border/20" />
          <div className="absolute h-[280px] w-[280px] rounded-full border border-border/10" />
          <div className="absolute h-[360px] w-[360px] rounded-full border border-border/10" />

          {/* Central sun */}
          <div className="absolute z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-[0_0_40px_rgba(255,165,0,0.4),0_0_80px_rgba(255,165,0,0.15)]">
            <span className="font-heading text-xs font-extrabold text-primary-foreground tracking-wider">
              LBY
            </span>
          </div>

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const pos = getNodePosition(index);
            const isActive = activeNodeId === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute cursor-pointer transition-all duration-700"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isActive ? 200 : pos.zIndex,
                  opacity: isActive ? 1 : pos.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNodeClick(item.id);
                }}
              >
                {/* Node circle */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    isActive
                      ? "border-primary bg-primary/20 shadow-[0_0_30px_rgba(255,165,0,0.3)]"
                      : "border-border/40 bg-card hover:border-primary/50"
                  }`}
                >
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                {/* Label */}
                <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-center">
                  <span className="block font-body text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {item.step}
                  </span>
                  <span className="block font-heading text-sm font-extrabold text-foreground">
                    {item.title}
                  </span>
                </div>

                {/* Expanded card */}
                {isActive && (
                  <div className="absolute left-1/2 top-full mt-14 -translate-x-1/2 w-56 rounded-xl border border-primary/20 bg-card p-4 shadow-[0_0_30px_rgba(255,165,0,0.08)]">
                    <p className="text-center text-sm leading-relaxed text-muted-foreground">
                      {item.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
