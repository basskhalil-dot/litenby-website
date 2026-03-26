import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 48;

function getFramePath(index: number): string {
  const num = 100 + index;
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
      img.decoding = "sync";
      (img as any).loading = "eager";
      img.src = getFramePath(i);
      imgs[i] = img;
      const done = () => {
        count++;
        setProgress(Math.round((count / TOTAL_FRAMES) * 100));
        if (count === TOTAL_FRAMES) {
          // Pre-render every frame into an offscreen canvas to force decode
          const offscreen = document.createElement("canvas");
          const offCtx = offscreen.getContext("2d")!;
          offscreen.width = 1;
          offscreen.height = 1;
          for (const im of imgs) {
            if (im.naturalWidth) offCtx.drawImage(im, 0, 0, 1, 1);
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
