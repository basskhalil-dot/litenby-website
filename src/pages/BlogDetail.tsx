import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { LitenbyNavbar } from "@/components/LitenbyNavbar";
import { Footer } from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { articles } from "@/pages/Blog";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-[100dvh] overflow-x-hidden" style={{ background: "#000000" }}>
        <LitenbyNavbar />
        <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4">
          <h1 className="font-heading text-3xl font-extrabold lowercase text-foreground">
            article not found
          </h1>
          <button
            onClick={() => navigate("/blog")}
            className="font-body text-sm text-primary underline"
          >
            back to the lab notes
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] overflow-x-hidden" style={{ background: "#000000" }}>
      <LitenbyNavbar />

      {/* Back button */}
      <div className="mx-auto max-w-7xl px-6 pt-24 lg:pt-28">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          back to insights
        </motion.button>
      </div>

      {/* Hero Image */}
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-[12px]"
        >
          <AspectRatio ratio={21 / 9}>
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </motion.div>
      </div>

      {/* Article Content */}
      <article className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-6"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-widest text-primary">
            {article.category}
          </span>

          <h1 className="font-heading text-3xl font-extrabold lowercase text-foreground md:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          <p className="font-body text-sm text-muted-foreground/50">
            {article.date}
          </p>

          <div className="h-px w-full bg-border/20" />

          {/* Article body */}
          <div className="space-y-6 font-body text-base leading-relaxed text-muted-foreground">
            <p>{article.excerpt}</p>
            <p>
              Every brand carries a story beneath the surface — an origin, a tension, a purpose that
              goes beyond the product. Our role is to uncover that narrative thread and weave it into
              every visual and verbal touchpoint. From the first sketch to the final deliverable, the
              process is obsessive, intentional, and deeply collaborative.
            </p>
            <p>
              The challenge with heritage brands is balancing reverence with reinvention. You can't
              strip away decades of equity, but you also can't let nostalgia become a cage. The sweet
              spot is in the details — a modernized serif, a refined color shift, a packaging texture
              that whispers luxury without screaming change.
            </p>
            <p>
              What separates a rebrand from a revolution is restraint. Knowing what to keep is just
              as important as knowing what to discard. At Litenby, we approach every identity project
              with a strategist's mind and a designer's hand — because a brand that looks beautiful
              but says nothing is just decoration.
            </p>
          </div>
        </motion.div>
      </article>

      <Footer />
    </div>
  );
}
