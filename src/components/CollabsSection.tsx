import React from "react";
import { motion } from "framer-motion";

import collab1 from "@/assets/collab-1.jpg";
import collab2 from "@/assets/collab-2.jpg";
import collab3 from "@/assets/collab-3.jpg";
import collab4 from "@/assets/collab-4.jpg";
import collab5 from "@/assets/collab-5.jpg";
import collab6 from "@/assets/collab-6.jpg";

interface MediaItemType {
  id: number;
  title: string;
  desc: string;
  url: string;
}

const mediaItems: MediaItemType[] = [
  { id: 1, title: "Brand Identity", desc: "Visual system & logo design", url: collab1 },
  { id: 2, title: "Packaging", desc: "Product packaging design", url: collab2 },
  { id: 3, title: "Product Launch", desc: "Campaign & art direction", url: collab3 },
  { id: 4, title: "Visual System", desc: "Brand guidelines & assets", url: collab4 },
  { id: 5, title: "Campaign", desc: "Marketing & creative direction", url: collab5 },
  { id: 6, title: "Direction", desc: "Creative direction & strategy", url: collab6 },
];

export function CollabsSection() {
  return (
    <section className="relative w-full bg-black" style={{ padding: "100px 0" }}>
      <div className="mb-12 text-center">
        <motion.p
          className="font-body font-semibold uppercase text-sm tracking-widest mb-3 text-highlight"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          SELECTED WORK
        </motion.p>
        <motion.h2
          className="font-heading text-4xl font-extrabold lowercase text-white md:text-5xl lg:text-[68px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          selected collaborations
        </motion.h2>
        <motion.p
          className="mt-4 mx-auto max-w-lg text-base text-muted-foreground lg:text-lg"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Projects and collaborations across branding, packaging, and motion design.
        </motion.p>
      </div>

      <div className="container">
        {/* Entire grid appears at once — no stagger */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
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
              {/* Hover overlay with title & description */}
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
        </motion.div>
      </div>
    </section>
  );
}
