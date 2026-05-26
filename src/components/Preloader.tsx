import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import litenbyLogo from "@/assets/litenby-logo.png";

interface PreloaderProps {
  progress: number;
  onComplete: () => void;
}

export function Preloader({ progress, onComplete }: PreloaderProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (progress >= 100 && !exiting) {
      const t = setTimeout(() => setExiting(true), 320);
      return () => clearTimeout(t);
    }
  }, [progress, exiting]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src={litenbyLogo}
            alt="Litenby"
            className="h-12 w-auto mb-10"
            initial={{ opacity: 0, scale: 0.88, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="w-[100px]">
            <div className="h-[1px] w-full overflow-hidden bg-muted">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
