import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 48;

function getFramePath(index: number): string {
  const num = 100 + index; // bottle100.jpg → bottle147.jpg
  return `/hero-sequence/bottle${num}.jpg`;
}

export function useImageSequence() {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let count = 0;
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = getFramePath(i);
      imgs[i] = img;
      const done = () => {
        count++;
        setProgress(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          setLoaded(true);
        }
      };
      img.onload = done;
      img.onerror = done;
    }
  }, []);

  return { images: imagesRef, loaded, progress, totalFrames: TOTAL_FRAMES };
}
