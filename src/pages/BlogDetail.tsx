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
      <div className="min-h-screen" style={{ background: "#000000" }}>
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
    <div className="min-h-screen" style={{ background: "#000000" }}>
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
              src={article.heroImage ?? article.image}
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
            {article.body?.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </article>

      <Footer />
    </div>
  );
}
