"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ServiceFrame {
  id: number;
  title: string;
  video: string;
  row: number;
  col: number;
}

function FrameCell({
  frame,
  isHovered,
  onHover,
  onLeave,
}: {
  frame: ServiceFrame;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered) {
      videoRef.current?.play();
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={frame.video}
        loop
        muted
        playsInline
        style={{
          opacity: isHovered ? 1 : 0.4,
          transition: "opacity 0.3s ease-in-out",
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isHovered
            ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)"
            : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 100%)",
          transition: "background 0.3s ease-in-out",
        }}
      />

      {/* Border highlight on hover */}
      <div
        className="absolute inset-0 border-2 transition-colors duration-300"
        style={{
          borderColor: isHovered ? "hsl(var(--primary))" : "rgba(255,255,255,0.06)",
        }}
      />

      {/* Title */}
      <div className="absolute inset-0 flex items-end p-5 lg:p-6">
        <div>
          <span
            className="font-heading text-base font-bold text-foreground lg:text-lg"
            style={{
              transition: "color 0.3s ease-in-out",
              color: isHovered ? "hsl(var(--primary))" : "white",
            }}
          >
            {frame.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface DynamicFrameLayoutProps {
  frames: ServiceFrame[];
  className?: string;
  hoverSize?: number;
  gapSize?: number;
}

export function DynamicFrameLayout({
  frames,
  className = "",
  hoverSize = 5,
  gapSize = 4,
}: DynamicFrameLayoutProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);

  // 2 rows × 3 cols
  const getRowSizes = () => {
    if (!hovered) return "1fr 1fr";
    const { row } = hovered;
    const other = (10 - hoverSize);
    return [0, 1].map((r) => (r === row ? `${hoverSize}fr` : `${other}fr`)).join(" ");
  };

  const getColSizes = () => {
    if (!hovered) return "1fr 1fr 1fr";
    const { col } = hovered;
    const other = (9 - hoverSize) / 2;
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${other}fr`)).join(" ");
  };

  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        aspectRatio: "16 / 9",
      }}
    >
      {frames.map((frame) => (
        <FrameCell
          key={frame.id}
          frame={frame}
          isHovered={hovered?.row === frame.row && hovered?.col === frame.col}
          onHover={() => setHovered({ row: frame.row, col: frame.col })}
          onLeave={() => setHovered(null)}
        />
      ))}
    </div>
  );
}
