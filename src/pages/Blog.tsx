import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LitenbyNavbar } from "@/components/LitenbyNavbar";
import { Footer } from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const articles = [
  {
    id: 1,
    slug: "how-we-rebranded-heritage-perfume",
    category: "CASE STUDY",
    title: "how we rebranded a heritage perfume house for gen-z.",
    date: "march 12, 2026",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
    excerpt: "A deep dive into transforming a 50-year-old fragrance brand for a new generation without losing its soul.",
  },
  {
    id: 2,
    slug: "rise-of-liquid-motion-luxury-brand",
    category: "MOTION TRENDS",
    title: "the rise of liquid motion in luxury brand identity.",
    date: "february 28, 2026",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    excerpt: "Exploring how fluid dynamics and organic animation are redefining premium visual identities across fashion and beauty.",
  },
  {
    id: 3,
    slug: "unboxing-underrated-brand-touchpoint",
    category: "PACKAGING",
    title: "why unboxing is the most underrated brand touchpoint.",
    date: "february 15, 2026",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80",
    excerpt: "The moment a customer opens your package is the most intimate brand interaction. Here's how to make it unforgettable.",
  },
  {
    id: 4,
    slug: "building-brand-voice-beyond-logo",
    category: "STRATEGY",
    title: "building brand voice: beyond the logo and the tagline.",
    date: "january 30, 2026",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    excerpt: "Your brand's voice is its personality in written form. We break down how to develop one that resonates authentically.",
  },
  {
    id: 5,
    slug: "directing-60-second-tvc-dubai",
    category: "BEHIND THE SCENES",
    title: "directing a 60-second TVC in the heart of dubai.",
    date: "january 18, 2026",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    excerpt: "From pre-production to final grade — a behind-the-scenes look at creating a luxury TVC under desert sun.",
  },
  {
    id: 6,
    slug: "obsessive-details-brand-guideline",
    category: "DESIGN SYSTEMS",
    title: "the obsessive details inside a 200-page brand guideline.",
    date: "january 05, 2026",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    excerpt: "Why the difference between 16px and 18px padding matters, and how brand guidelines protect creative integrity at scale.",
  },
];

export { articles };

export default function Blog() {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden" style={{ background: "#000000" }}>
      <LitenbyNavbar />

      {/* Hero */}
      <section className="pb-8 pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-primary"
          >
            INSIGHTS
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-bold lowercase text-foreground md:text-5xl lg:text-[68px]"
          >
            the lab notes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground"
          >
            exploring the intersection of brand strategy, motion physics, and packaging design.
          </motion.p>
        </div>
      </section>

      {/* Archive Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Link
                  to={`/blog/${article.slug}`}
                  className="group block cursor-pointer"
                >
                  {/* Image */}
                  <div className="overflow-hidden rounded-[12px]">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </AspectRatio>
                  </div>

                  {/* Content */}
                  <div className="mt-5 space-y-2">
                    <span className="font-body text-xs font-semibold uppercase tracking-widest text-primary">
                      {article.category}
                    </span>
                    <h3 className="font-heading text-lg font-bold lowercase text-foreground transition-colors duration-300 group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground/50">
                      {article.date}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
