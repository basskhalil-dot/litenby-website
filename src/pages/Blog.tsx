import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LitenbyNavbar } from "@/components/LitenbyNavbar";
import { Footer } from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const articles = [
  {
    id: 1,
    slug: "from-idea-to-shelf",
    category: "PROCESS",
    title: "from idea to shelf: what actually happens when you build a brand from scratch.",
    date: "march 12, 2026",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
    excerpt: "Not a mood board and a logo. A sequence, where every step decides what the next one can be.",
    body: [
      "Most people picture branding as a moment — you sit down, pick some colors, land on a logo, done. In practice it's a sequence, and the order matters more than any single decision inside it. Skip a step or do them out of order, and the product ends up looking finished while still feeling unresolved.",
      "It starts before any design happens. What does this product actually compete against, and what does it have that nothing else on that shelf has? That question sounds obvious, but most brands never fully answer it — they design first and hope the positioning shows up later. It doesn't. Identity — the logo, the color, the type — only works when it's built to say something that was already decided, not something still being figured out.",
      "From there, the brand has to survive contact with the real world. A color palette that looks right on a screen has to still look right printed on glass, under store lighting, next to competitors. This is where packaging stops being a separate project and becomes a test: does the identity actually hold up once it's something a person can pick up?",
      "The last step is the one people underestimate — giving the brand a reason to be talked about. Not just seen. A launch, a story, a reason someone tells a friend about it. This is the part that turns a well-designed product into one that actually moves.",
      "None of these steps are hard on their own. What's hard is doing them in order, without skipping ahead to the part that feels most exciting.",
    ],
  },
  {
    id: 2,
    slug: "choose-the-right-container",
    category: "PACKAGING",
    title: "how to choose the right container for your product.",
    date: "february 28, 2026",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    excerpt: "The shape people remember isn't always the shape that's easiest to make.",
    body: [
      "There's a version of this decision that happens by default — you look at what your competitors use, and you use something close enough. It's fast, it's safe, and it's the reason so many shelves look the same. The container is usually the first physical thing a customer touches. Copying the category isn't a shortcut, it's a missed chance to be the one thing they actually remember.",
      "Material tells people what to expect before they read a word. Glass says permanent, considered, worth keeping. Plastic says light, everyday, made for use. Neither is better — but using the wrong one for what you're actually selling creates a mismatch people feel even if they can't explain it.",
      "Shape does something similar. A dropper says precision. A pump says routine. A jar says ritual. These aren't just functional choices, they're the first sentence of a story the product hasn't told yet.",
      "The right container isn't the most impressive one on the table. It's the one that matches what the product actually is — and says so before anyone reads the label.",
    ],
  },
  {
    id: 3,
    slug: "why-we-dont-split-the-work",
    category: "CONCEPT",
    title: "why we don't split brand, packaging, and storytelling into three jobs.",
    date: "february 15, 2026",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80",
    excerpt: "Most studios hand you off between departments. We think that's where good brands go to die.",
    body: [
      "Most products don't fail because the idea was weak. They fail somewhere in the handoff — a brand identity built by one team, packaging designed by another, and a launch campaign written by a third, each one working from a brief instead of from each other.",
      "That's the part nobody talks about. A logo can be beautiful and still say nothing on a shelf. A bottle can be well-made and still clash with the story a brand is trying to tell. Not because anyone did bad work — because nobody in the chain was looking at the whole picture.",
      "litenby exists because that gap is avoidable. Brand, packaging, and storytelling aren't three services stacked together — they're three angles on the same decision. The color that works on a logo has to work on a label. The tone in a tagline has to survive the trip from a screen to a shelf. When one person or one process owns all three, that consistency isn't a bonus. It's the whole point.",
      "This is also why the process moves in one direction, not three parallel ones. Identity comes first, because everything else has to agree with it. Packaging comes next, because it's where the brand becomes something a person can actually hold. Storytelling comes last, because a story only lands if there's already something real underneath it to tell.",
    ],
  },
  {
    id: 4,
    slug: "100-years-of-lapiara",
    category: "CAMPAIGN",
    title: "celebrating 100 years of lapiara.",
    date: "january 30, 2026",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    excerpt: "Some brands don't need reinventing. They need reminding — people already love them.",
    body: [
      "A hundred years is a hard thing to say without sounding like a plaque on a wall. The challenge with Lapiara's anniversary wasn't finding something new to say — it was finding a way to say the truth without it going flat.",
      "People already knew the brand. What they needed was a reason to feel it again.",
      "That's where the line came from: الكل عروس البيارا وبعدا سنة مئة — a hundred years, and Lapiara is still the bride of everyone. Not a slogan built in a meeting room. Something closer to what a family already says about a product that's been on their table since before they were born.",
      "The campaign didn't try to modernize a century of history. It leaned into it — treating a hundred years not as an age to justify, but as proof nobody needed to be told twice. Nostalgia only works when it's earned, and this was a brand that had actually earned it.",
      "That's the part worth remembering: the best campaigns aren't always about saying something new. Sometimes the job is just making sure something true gets said loud enough, and warmly enough, to land.",
    ],
  },
  {
    id: 5,
    slug: "rebranding-boulos",
    category: "REBRAND",
    title: "more than just olive oil: rebranding boulos.",
    date: "january 18, 2026",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    excerpt: "A name people already trusted, doing a lot more than it used to.",
    body: [
      "Boulos had the kind of problem most brands would want — people already trusted the name. The issue was that trust was parked in one place: olive oil. Olives, pickles, vinegar, zaatar, olive oil soap — all real products, all sitting under a name people still associated with a single bottle.",
      "The rebrand wasn't about starting over. It was about giving that trust somewhere new to go — one identity, one packaging system, built to hold a full pantry instead of a single product. The goal was simple: someone should be able to look at any item on the shelf and know it's Boulos, without needing the label to work overtime to prove it.",
      "The line that carried the campaign said it plainly: البيت مونة كل ،زيت بس مش — not just oil, the whole pantry. It wasn't a rebrand hiding behind clever language. It was the brand catching up to what it had already become.",
      "This is the kind of project that doesn't get talked about as often as flashy launches, but it's often the harder one — expanding what a brand means without losing what made people trust it in the first place.",
    ],
  },
  {
    id: 6,
    slug: "remember-your-ad",
    category: "STRATEGY",
    title: "how to make people remember your ad, not just see it.",
    date: "january 05, 2026",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    excerpt: "Most ads get watched. Very few get remembered. That gap is the whole game.",
    body: [
      "An ad can do everything right — good visuals, clear message, decent budget — and still disappear the second it's off screen. That's not a production problem. It's usually a memory problem. People forget things that don't give them anything to hold onto: no line, no image, no feeling strong enough to survive the next thirty things they see that day.",
      "What makes something stick is rarely the most polished version of an idea. It's the most specific one. A line people could actually repeat. A visual that couldn't belong to any other brand. Vague, safe, \"on-brand\" messaging is forgettable by design — it was built not to offend anyone, which also means it was built not to move anyone.",
      "This is where direction matters as much as the idea itself. The same message shot two different ways can either disappear or land hard, depending on pacing, framing, what's left in and what's cut. A good idea filmed flatly still gets scrolled past. An ordinary idea, directed with intent, can outperform something with a bigger budget behind it.",
      "The test isn't \"did people see the ad.\" It's \"could someone repeat it back a week later, without the ad in front of them.\" If the answer's no, the work wasn't finished — it just stopped.",
    ],
  },
];

export { articles };

export default function Blog() {
  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
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
            LITENBY STORIES
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
