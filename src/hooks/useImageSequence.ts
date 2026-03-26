import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 48;

function getFramePath(index: number): string {
  return `/hero-sequence/bottle${100 + index}.jpg`;
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
      img.decoding = "sync";
      (img as any).loading = "eager";
      img.src = getFramePath(i);
      imgs[i] = img;

      const done = () => {
        count++;
        setProgress(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) {
          // Force-decode every frame via offscreen canvas
          const off = document.createElement("canvas");
          off.width = 1;
          off.height = 1;
          const octx = off.getContext("2d")!;
          for (const im of imgs) {
            if (im.naturalWidth) octx.drawImage(im, 0, 0, 1, 1);
          }
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
