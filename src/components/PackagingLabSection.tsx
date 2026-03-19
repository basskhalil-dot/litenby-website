import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { packagingProducts, type PackagingProduct } from "@/data/packagingProducts";

function PackagingCard({
  product,
  index,
}: {
  product: PackagingProduct;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.1,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      }}
      className="group flex cursor-pointer flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/packaging-lab/${product.id}`)}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white transition-shadow duration-500 group-hover:shadow-[0_0_30px_rgba(255,165,0,0.15)]">
        <img
          src={product.primaryImage}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-in-out group-hover:scale-105"
          style={{ opacity: isHovered ? 0 : 1 }}
        />
        <img
          src={product.hoverImage}
          alt={`${product.name} alternate view`}
          className="absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-in-out group-hover:scale-105"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>

      {/* Product name */}
      <p className="mt-4 text-center font-body text-sm font-medium tracking-wide text-muted-foreground">
        {product.name}
      </p>
    </motion.div>
  );
}

export function PackagingLabSection() {
  return (
    <section className="relative w-full bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
          }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Showcase
          </span>
          <h2 className="font-heading text-4xl font-extrabold text-foreground md:text-5xl lg:text-[68px]">
            the packaging lab
          </h2>
        </motion.div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {packagingProducts.map((product, i) => (
            <PackagingCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <Button className="bg-primary px-8 py-3 text-base font-bold text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(255,165,0,0.3)]">
            explore packaging
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
