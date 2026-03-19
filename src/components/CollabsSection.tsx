import { motion } from "framer-motion";
import { Suspense } from "react";
import InfiniteGallery from "@/components/InfiniteGallery";

import collab1 from "@/assets/collab-1.jpg";
import collab2 from "@/assets/collab-2.jpg";
import collab3 from "@/assets/collab-3.jpg";
import collab4 from "@/assets/collab-4.jpg";
import collab5 from "@/assets/collab-5.jpg";

const collabImages = [collab1, collab2, collab3, collab4, collab5];

export function CollabsSection() {
  return (
    <section className="relative w-full bg-background py-16 lg:py-24 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        className="mb-8 text-center"
      >
        <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Selected Work
        </span>
        <h2 className="font-heading text-4xl font-extrabold text-foreground md:text-5xl lg:text-[68px]">
          collabs
        </h2>
      </motion.div>

      {/* 3D Infinite Gallery */}
      <Suspense
        fallback={
          <div className="flex h-[600px] items-center justify-center">
            <p className="text-muted-foreground">Loading gallery…</p>
          </div>
        }
      >
        <InfiniteGallery
          images={collabImages}
          className="h-[600px] w-full"
          speed={1}
          visibleCount={8}
        />
      </Suspense>

      {/* Hint */}
      <div className="container mt-6 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          scroll to explore
        </p>
      </div>
    </section>
  );
}
