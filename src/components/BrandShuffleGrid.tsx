import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Placeholder sources — to be replaced by user-supplied images later.
const LANDSCAPE_SRC =
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&q=80";
const PORTRAIT_SRC =
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80";

// Desktop: 5 cols x 4 rows = 20 tiles. Mobile: 4 cols x 5 rows = 20 tiles.
const TILE_COUNT = 20;

type Tile = { id: number };

const baseTiles: Tile[] = Array.from({ length: TILE_COUNT }, (_, i) => ({
  id: i,
}));

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// For a given tile id, compute background-position so all tiles together
// reassemble the source image.
// Desktop: 5 cols (x), 4 rows (y).
const desktopBgPos = (id: number) => {
  const col = id % 5;
  const row = Math.floor(id / 5);
  // percentages: col/(cols-1), row/(rows-1)
  return `${(col / 4) * 100}% ${(row / 3) * 100}%`;
};
// Mobile: 4 cols (x), 5 rows (y).
const mobileBgPos = (id: number) => {
  const col = id % 4;
  const row = Math.floor(id / 4);
  return `${(col / 3) * 100}% ${(row / 4) * 100}%`;
};

export const BrandShuffleGrid: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[]>(baseTiles);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loop = () => {
      setTiles((prev) => shuffle(prev));
      timeoutRef.current = setTimeout(loop, 3000);
    };
    timeoutRef.current = setTimeout(loop, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-16">
      {/* Desktop grid: 5 x 4 (landscape source) */}
      <div className="hidden md:grid aspect-[5/4] w-full grid-cols-5 grid-rows-4 gap-1">
        {tiles.map((tile) => (
          <motion.div
            key={tile.id}
            layout
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
            style={{
              backgroundImage: `url(${LANDSCAPE_SRC})`,
              backgroundSize: "500% 400%",
              backgroundPosition: desktopBgPos(tile.id),
            }}
          />
        ))}
      </div>

      {/* Mobile grid: 4 x 5 (portrait source) */}
      <div className="grid md:hidden aspect-[4/5] w-full grid-cols-4 grid-rows-5 gap-1">
        {tiles.map((tile) => (
          <motion.div
            key={tile.id}
            layout
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
            style={{
              backgroundImage: `url(${PORTRAIT_SRC})`,
              backgroundSize: "400% 500%",
              backgroundPosition: mobileBgPos(tile.id),
            }}
          />
        ))}
      </div>
    </div>
  );
};
