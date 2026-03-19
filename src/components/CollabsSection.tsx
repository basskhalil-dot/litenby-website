import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import collab1 from "@/assets/collab-1.jpg";
import collab2 from "@/assets/collab-2.jpg";
import collab3 from "@/assets/collab-3.jpg";
import collab4 from "@/assets/collab-4.jpg";
import collab5 from "@/assets/collab-5.jpg";

interface MediaItemType {
  id: number;
  type: string;
  title: string;
  desc: string;
  url: string;
  span: string;
}

const mediaItems: MediaItemType[] = [
  { id: 1, type: "image", title: "Brand Identity", desc: "Visual system & logo design", url: collab1, span: "col-span-1 sm:col-span-1 md:col-span-2 row-span-4" },
  { id: 2, type: "image", title: "Packaging", desc: "Product packaging design", url: collab2, span: "col-span-1 sm:col-span-1 md:col-span-1 row-span-3" },
  { id: 3, type: "image", title: "Product Launch", desc: "Campaign & art direction", url: collab3, span: "col-span-1 sm:col-span-1 md:col-span-1 row-span-5" },
  { id: 4, type: "image", title: "Visual System", desc: "Brand guidelines & assets", url: collab4, span: "col-span-1 sm:col-span-1 md:col-span-1 row-span-4" },
  { id: 5, type: "image", title: "Campaign", desc: "Marketing & creative direction", url: collab5, span: "col-span-1 sm:col-span-2 md:col-span-2 row-span-3" },
  { id: 6, type: "image", title: "Direction", desc: "Creative direction & strategy", url: collab1, span: "col-span-1 sm:col-span-1 md:col-span-1 row-span-4" },
];

const MediaItem = ({
  item,
  className,
  onClick,
}: {
  item: MediaItemType;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <img
      src={item.url}
      alt={item.title}
      className={`${className} object-cover cursor-pointer`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  );
};

const GalleryModal = ({
  selectedItem,
  isOpen,
  onClose,
  setSelectedItem,
  mediaItems,
}: {
  selectedItem: MediaItemType;
  isOpen: boolean;
  onClose: () => void;
  setSelectedItem: (item: MediaItemType | null) => void;
  mediaItems: MediaItemType[];
}) => {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed inset-0 w-full min-h-screen backdrop-blur-lg rounded-none overflow-hidden z-50 bg-black/80"
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                className="relative w-full max-w-[95%] sm:max-w-[85%] md:max-w-3xl rounded-lg overflow-hidden shadow-md"
                style={{ aspectRatio: "4 / 5", maxHeight: "70vh" }}
                initial={{ y: 20, scale: 0.97 }}
                animate={{
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 },
                }}
                exit={{ y: 20, scale: 0.97, transition: { duration: 0.15 } }}
                onClick={onClose}
              >
                <MediaItem item={selectedItem} className="w-full h-full" onClick={onClose} />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-white text-base sm:text-lg md:text-xl font-heading font-extrabold lowercase">
                    {selectedItem.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm mt-1 font-body">
                    {selectedItem.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Draggable Dock */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={false}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_, info) => {
          setDockPosition((prev) => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y,
          }));
        }}
        className="fixed z-[60] left-1/2 bottom-6 -translate-x-1/2 touch-none"
      >
        <motion.div className="relative rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg cursor-grab active:cursor-grabbing">
          <div className="flex items-center -space-x-2 px-3 py-2">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(item);
                }}
                style={{ zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index }}
                className={`relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer hover:z-20 ${
                  selectedItem.id === item.id
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:ring-2 hover:ring-white/30"
                }`}
                initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                animate={{
                  scale: selectedItem.id === item.id ? 1.2 : 1,
                  rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -15 : 15,
                  y: selectedItem.id === item.id ? -8 : 0,
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: 0,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export function CollabsSection() {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
  const [items, setItems] = useState(mediaItems);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section className="relative w-full bg-black" style={{ padding: "100px 0" }}>
      {/* Title */}
      <div className="mb-12 text-center">
        <motion.h2
          className="font-heading text-4xl font-extrabold lowercase text-white md:text-5xl lg:text-[68px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          collabs
        </motion.h2>
      </div>

      {/* Bento Grid */}
      <div className="container mx-auto px-4 max-w-5xl">
        <AnimatePresence mode="wait">
          {selectedItem ? (
            <GalleryModal
              selectedItem={selectedItem}
              isOpen={true}
              onClose={() => setSelectedItem(null)}
              setSelectedItem={setSelectedItem}
              mediaItems={items}
            />
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[60px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layoutId={`media-${item.id}`}
                  className={`relative overflow-hidden rounded-xl cursor-pointer ${item.span}`}
                  onClick={() => !isDragging && setSelectedItem(item)}
                  variants={{
                    hidden: { y: 50, scale: 0.9, opacity: 0 },
                    visible: {
                      y: 0,
                      scale: 1,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                        delay: index * 0.05,
                      },
                    },
                  }}
                  whileHover={{ scale: 1.02 }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(_, info) => {
                    setIsDragging(false);
                    const moveDistance = info.offset.x + info.offset.y;
                    if (Math.abs(moveDistance) > 50) {
                      const newItems = [...items];
                      const draggedItem = newItems[index];
                      const targetIndex =
                        moveDistance > 0
                          ? Math.min(index + 1, items.length - 1)
                          : Math.max(index - 1, 0);
                      newItems.splice(index, 1);
                      newItems.splice(targetIndex, 0, draggedItem);
                      setItems(newItems);
                    }
                  }}
                >
                  <MediaItem
                    item={item}
                    className="absolute inset-0 w-full h-full"
                    onClick={() => !isDragging && setSelectedItem(item)}
                  />
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <h3 className="relative text-white text-xs sm:text-sm font-heading font-extrabold lowercase line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="relative text-white/60 text-[10px] sm:text-xs mt-0.5 font-body line-clamp-2">
                      {item.desc}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
