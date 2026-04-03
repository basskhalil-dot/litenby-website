import { useEffect, useState } from "react";

interface PreloaderProps {
  progress: number;
  onComplete: () => void;
}

export function Preloader({ progress, onComplete }: PreloaderProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    if (progress >= 100 && !fadeOut) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setUnmount(true);
        onComplete();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [progress, fadeOut, onComplete]);

  if (unmount) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 600ms ease-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div className="w-[120px]">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
