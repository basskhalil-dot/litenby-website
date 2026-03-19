import { useParams, useNavigate } from "react-router-dom";
import { packagingProducts } from "@/data/packagingProducts";
import { Button } from "@/components/ui/button";
import { LitenbyNavbar } from "@/components/LitenbyNavbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const PackagingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = packagingProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <LitenbyNavbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground">Product not found</h1>
            <Button className="mt-6" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate(-1)}
          className="mb-10 flex items-center gap-2 font-body text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          back to packaging lab
        </motion.button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden rounded-2xl bg-white"
          >
            <img
              src={product.primaryImage}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </motion.div>

          {/* Product specs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col justify-center"
          >
            <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Packaging Specs
            </span>
            <h1 className="font-heading text-4xl font-extrabold lowercase text-foreground md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-10 space-y-4 border-t border-border pt-8">
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium text-foreground">Premium Packaging</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Material</span>
                <span className="font-medium text-foreground">Glass / PCR Plastic</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">MOQ</span>
                <span className="font-medium text-foreground">500 units</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Lead Time</span>
                <span className="font-medium text-foreground">4–6 weeks</span>
              </div>
            </div>

            <Button className="mt-10 w-fit bg-primary px-8 py-3 text-base font-bold text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(255,165,0,0.3)]">
              request a sample
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PackagingDetail;
