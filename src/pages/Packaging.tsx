import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LitenbyNavbar } from "@/components/LitenbyNavbar";
import { Footer } from "@/components/Footer";
import { packagingLabProducts } from "@/data/packagingLabProducts";
import { cn } from "@/lib/utils";

const materials = ["all", "glass", "carton", "bags", "plastic"] as const;
const shapes = ["all", "bottles", "jars", "boxes", "tubes"] as const;

function FilterBar({
  activeMaterial,
  activeShape,
  onMaterialChange,
  onShapeChange,
}: {
  activeMaterial: string;
  activeShape: string;
  onMaterialChange: (v: string) => void;
  onShapeChange: (v: string) => void;
}) {
  return (
    <div className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Material filters */}
        <div
          className="flex items-center gap-2 [&::-webkit-scrollbar]:hidden"
          style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", width: "100%", whiteSpace: "nowrap" }}
        >
          <span className="mr-2 shrink-0 font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Material
          </span>
          {materials.map((m) => (
            <button
              key={m}
              onClick={() => onMaterialChange(m)}
              style={{ display: "inline-flex" }}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 font-body text-sm font-medium capitalize transition-all duration-300",
                activeMaterial === m
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Shape filters */}
        <div
          className="flex items-center gap-2 [&::-webkit-scrollbar]:hidden"
          style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", width: "100%", whiteSpace: "nowrap" }}
        >
          <span className="mr-2 shrink-0 font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Shape
          </span>
          {shapes.map((s) => (
            <button
              key={s}
              onClick={() => onShapeChange(s)}
              style={{ display: "inline-flex" }}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 font-body text-sm font-medium capitalize transition-all duration-300",
                activeShape === s
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product,
}: {
  product: (typeof packagingLabProducts)[0];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={`/packaging-lab/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="group flex cursor-pointer flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[12px] transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ border: "1px solid #333333" }}
        >
          <img
            src={product.primaryImage}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: hovered ? 0 : 1 }}
          />
          <img
            src={product.hoverImage}
            alt={`${product.name} labeled`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: hovered ? 1 : 0 }}
          />
        </div>

        {/* Info */}
        <div className="mt-2 sm:mt-3 flex items-center justify-between gap-2">
          <p className="font-body text-xs sm:text-sm font-semibold lowercase line-clamp-1 transition-colors duration-300 text-foreground group-hover:text-primary">
            {product.name}
          </p>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-body text-[10px] sm:text-[11px] font-semibold capitalize text-primary">
            {product.material}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Packaging() {
  const [activeMaterial, setActiveMaterial] = useState("all");
  const [activeShape, setActiveShape] = useState("all");

  const filtered = useMemo(() => {
    return packagingLabProducts.filter((p) => {
      const matOk = activeMaterial === "all" || p.material === activeMaterial;
      const shpOk = activeShape === "all" || p.shape === activeShape;
      return matOk && shpOk;
    });
  }, [activeMaterial, activeShape]);

  return (
    <div className="min-h-screen bg-background" style={{ overflowX: "hidden" }}>
      <LitenbyNavbar />

      {/* Hero heading */}
      <section className="pb-8 pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-primary px-4 md:px-0"
          >
            LAB SHOWCASE
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-bold lowercase text-foreground md:text-5xl lg:text-[68px] px-4 md:px-0"
          >
            the packaging lab
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl font-body text-base text-muted-foreground px-4 md:px-0"
          >
            high-end mockups ready for your brand. hover to see the magic.
          </motion.p>
        </div>
      </section>

      {/* Filter bar */}
      <FilterBar
        activeMaterial={activeMaterial}
        activeShape={activeShape}
        onMaterialChange={setActiveMaterial}
        onShapeChange={setActiveShape}
      />

      {/* Product grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6">
          {filtered.length === 0 ? (
            <p className="py-20 text-center font-body text-muted-foreground">
              no products match the current filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
