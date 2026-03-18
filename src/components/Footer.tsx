import { motion } from "framer-motion";
import { Instagram, Linkedin, Figma, ArrowUp } from "lucide-react";

const columns = [
  {
    title: "the labs",
    links: ["branding", "packaging", "storytelling"],
  },
  {
    title: "work",
    links: ["portfolio", "collabs", "cases"],
  },
  {
    title: "agency",
    links: ["the story", "contact", "careers"],
  },
];

const socials = [
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "Behance", icon: Figma, href: "#" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1 * i,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-background border-t border-border/30">
      <div className="container py-20 lg:py-28">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Brand */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <h2 className="font-heading text-5xl font-bold text-foreground lg:text-7xl">
              litenby
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              a creative lab for brands that refuse to blend in.
            </p>
          </motion.div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5 lg:col-start-6">
            {columns.map((col, ci) => (
              <motion.div
                key={col.title}
                custom={ci + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-foreground/70 transition-colors duration-300 hover:text-primary"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Social */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 lg:col-start-11"
          >
            <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-[0.25em] text-primary">
              social
            </h3>
            <ul className="flex flex-col gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors duration-300 hover:text-primary"
                  >
                    <s.icon className="h-4 w-4" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-14 h-px w-full bg-border/40" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Litenby. created in the lab.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
