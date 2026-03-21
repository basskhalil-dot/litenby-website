import { motion } from "framer-motion";
import { LitenbyNavbar } from "@/components/LitenbyNavbar";
import { Footer } from "@/components/Footer";
import { DynamicFrameLayout } from "@/components/DynamicFrameLayout";

const serviceFrames = [
  {
    id: 1,
    title: "Art Direction",
    video: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
    row: 0,
    col: 0,
  },
  {
    id: 2,
    title: "Motion Graphics",
    video: "https://videos.pexels.com/video-files/6981411/6981411-uhd_2560_1440_25fps.mp4",
    row: 0,
    col: 1,
  },
  {
    id: 3,
    title: "TV Commercials",
    video: "https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4",
    row: 0,
    col: 2,
  },
  {
    id: 4,
    title: "Product Cinematography",
    video: "https://videos.pexels.com/video-files/4065924/4065924-uhd_2560_1440_24fps.mp4",
    row: 1,
    col: 0,
  },
  {
    id: 5,
    title: "Brand Identity Animation",
    video: "https://videos.pexels.com/video-files/6252835/6252835-uhd_2560_1440_25fps.mp4",
    row: 1,
    col: 1,
  },
  {
    id: 6,
    title: "Post-Production",
    video: "https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4",
    row: 1,
    col: 2,
  },
];

export default function Storytelling() {
  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />

      {/* Hero */}
      <section className="pb-16 pt-24 lg:pb-20 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-primary"
          >
            SERVICES
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-bold lowercase text-foreground md:text-5xl lg:text-[68px]"
          >
            narratives that move.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl font-body text-base text-muted-foreground"
          >
            from concept to screen — cinematic storytelling for brands that refuse to blend in.
          </motion.p>
        </div>
      </section>

      {/* Dynamic Frame Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <DynamicFrameLayout frames={serviceFrames} gapSize={3} hoverSize={5} />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
