import React from "react";
import { motion } from "framer-motion";

import collab1 from "@/assets/collab-1.webp.asset.json";
import collab2 from "@/assets/collab-2.webp.asset.json";
import collab3 from "@/assets/collab-3.webp.asset.json";
import collab4 from "@/assets/collab-4.webp.asset.json";
import collab5 from "@/assets/collab-5.webp.asset.json";
import collab6 from "@/assets/collab-6.webp.asset.json";

interface MediaItemType {
  id: number;
  title: string;
  desc: string;
  url: string;
}

const mediaItems: MediaItemType[] = [
  { id: 1, title: "Brand Identity", desc: "Visual system & logo design", url: collab1.url },
  { id: 2, title: "Packaging", desc: "Product packaging design", url: collab2.url },
  { id: 3, title: "Product Launch", desc: "Campaign & art direction", url: collab3.url },
  { id: 4, title: "Visual System", desc: "Brand guidelines & assets", url: collab4.url },
  { id: 5, title: "Campaign", desc: "Marketing & creative direction", url: collab5.url },
  { id: 6, title: "Direction", desc: "Creative direction & strategy", url: collab6.url },
];

export function CollabsSection() {
  return (
    <section className="relative w-full bg-black" style={{ padding: "100px 0" }}>
      <div className="mb-12 text-center">
        <motion.p
          className="font-body font-semibold uppercase text-sm tracking-widest mb-3 text-highlight"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Project
        </motion.p>
        <motion.h2
          className="font-heading text-4xl font-extrabold lowercase text-white md:text-5xl lg:text-[68px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          collabs
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-muted-foreground font-body"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Ideas that made it to the shelf.
        </motion.p>
      </div>

      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-[12px] cursor-default aspect-[4/5] transition-transform duration-300 hover:scale-[1.02]"
              style={{ border: "1px solid #333333" }}
            >
              <img
                src={item.url}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <h3 className="relative text-white text-xs sm:text-sm font-body font-semibold lowercase line-clamp-1">
                  {item.title}
                </h3>
                <p className="relative text-white/60 text-[10px] sm:text-xs mt-0.5 font-body font-normal line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
