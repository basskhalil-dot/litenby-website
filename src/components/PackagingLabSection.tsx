import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { packagingProducts, type PackagingProduct } from "@/data/packagingProducts";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

function PackagingCard({ product }: { product: PackagingProduct }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex cursor-pointer flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/packaging-lab/${product.id}`)}
    >
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[12px] transition-transform duration-300 hover:scale-[1.02]"
        style={{ border: "1px solid #333333" }}
      >
        <img
          src={product.primaryImage}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: isHovered ? 0 : 1 }}
          loading="lazy"
        />
        <img
          src={product.hoverImage}
          alt={`${product.name} alternate view`}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: isHovered ? 1 : 0 }}
          loading="lazy"
        />
      </div>
      <p className="mt-2 font-body text-xs font-semibold lowercase text-foreground sm:text-sm">{product.name}</p>
    </motion.div>
  );
}

export function PackagingLabSection() {
  return (
    <section className="relative w-full bg-background py-20 lg:py-28">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-highlight">
            Containers
          </span>
          <h2 className="font-heading text-4xl font-extrabold text-foreground md:text-5xl lg:text-[68px]">
            the packaging lab
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-muted-foreground font-body">
            Choose the form. We'll build the rest.
          </p>
        </motion.div>

        {/* Grid — staggered reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {packagingProducts.slice(0, 12).map((product) => (
            <PackagingCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex justify-center"
        >
          <Button size="lg" asChild>
            <Link to="/packaging">explore packaging</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
