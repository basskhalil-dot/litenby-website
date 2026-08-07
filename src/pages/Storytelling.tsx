import { motion } from "framer-motion";
import { Clapperboard, Layers3, Film, Sparkles, Lightbulb, Monitor } from "lucide-react";
import { LitenbyNavbar } from "@/components/LitenbyNavbar";
import { Footer } from "@/components/Footer";
import { DynamicFrameLayout } from "@/components/DynamicFrameLayout";
import artDirectionVideo from "@/assets/story-art-direction.webm.asset.json";
import artDirectionPoster from "@/assets/story-art-direction-poster.webp.asset.json";
import motionGraphicsVideo from "@/assets/story-motion-graphics.webm.asset.json";
import motionGraphicsPoster from "@/assets/story-motion-graphics-poster.webp.asset.json";
import tvCommercialsVideo from "@/assets/story-tv-commercials.webm.asset.json";
import tvCommercialsPoster from "@/assets/story-tv-commercials-poster.webp.asset.json";
import productCinematographyVideo from "@/assets/story-product-cinematography.webm.asset.json";
import productCinematographyPoster from "@/assets/story-product-cinematography-poster.webp.asset.json";
import brandIdentityVideo from "@/assets/story-brand-identity-animation.webm.asset.json";
import brandIdentityPoster from "@/assets/story-brand-identity-animation-poster.webp.asset.json";

const serviceFrames = [
  {
    id: 1,
    title: "Art Direction",
    video: artDirectionVideo.url,
    poster: artDirectionPoster.url,
    row: 0,
    col: 0,
  },
  {
    id: 2,
    title: "Motion Graphics",
    video: motionGraphicsVideo.url,
    poster: motionGraphicsPoster.url,
    row: 0,
    col: 1,
  },
  {
    id: 3,
    title: "TV Commercials",
    video: tvCommercialsVideo.url,
    poster: tvCommercialsPoster.url,
    row: 0,
    col: 2,
  },
  {
    id: 4,
    title: "Product Cinematography",
    video: productCinematographyVideo.url,
    poster: productCinematographyPoster.url,
    row: 1,
    col: 0,
  },
  {
    id: 5,
    title: "Brand Identity Animation",
    video: brandIdentityVideo.url,
    poster: brandIdentityPoster.url,
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
            narratives that move
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

      {/* Features Grid */}
      <section className="py-[120px]">
        <div className="mx-auto max-w-7xl space-y-16 px-6">
          <div className="mx-auto max-w-xl space-y-5 text-center">
            <h2 className="font-heading text-4xl font-extrabold lowercase text-foreground lg:text-[56px] lg:leading-[1.1]">
              where strategy meets motion.
            </h2>
            <p className="font-body text-base text-muted-foreground">
              We provide the full spectrum of production services to turn brand concepts into cinematic reality.
            </p>
          </div>

          <div className="relative mx-auto grid max-w-4xl divide-x divide-y divide-border/20 border border-border/20 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Clapperboard,
                title: "cinematic direction",
                desc: "15 years of experience directing high-end TV commercials and advertising campaigns across the GCC.",
              },
              {
                icon: Layers3,
                title: "advanced motion design",
                desc: "High-fidelity 2D and 3D animations that bring brand identities to life with realistic physics.",
              },
              {
                icon: Film,
                title: "post-production",
                desc: "Expert editing, color grading, and sound design to ensure every frame meets international broadcast standards.",
              },
              {
                icon: Sparkles,
                title: "visual effects",
                desc: "Integrating CGI and motion tracking to create impossible visuals that command attention.",
              },
              {
                icon: Lightbulb,
                title: "creative strategy",
                desc: "We don't just execute; we conceptualize the narrative arc to ensure maximum audience resonance.",
              },
              {
                icon: Monitor,
                title: "technical precision",
                desc: "Using the latest rendering engines and production tools to deliver 4K+ high-resolution content.",
              },
            ].map((item) => (
              <div key={item.title} className="space-y-3 p-8 lg:p-10">
                <div className="flex items-center gap-3">
                  <item.icon className="size-5 text-primary" strokeWidth={1.5} />
                  <h3 className="font-heading text-sm font-bold lowercase text-foreground">{item.title}</h3>
                </div>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
