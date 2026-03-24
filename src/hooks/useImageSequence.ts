import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 72;

function getFramePath(index: number): string {
  const padded = String(index).padStart(2, "0");
  return `/hero-sequence/Bottle${padded}.jpg`;
}

export function useImageSequence() {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let count = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = img.onerror = () => {
        count++;
        setProgress(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images.push(img);
    }
  }, []);

  return { images: imagesRef, loaded, progress, totalFrames: TOTAL_FRAMES };
}
