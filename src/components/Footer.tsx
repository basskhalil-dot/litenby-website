import { motion } from "framer-motion";
import { Instagram, ArrowUp } from "lucide-react";
import litenbyLogo from "@/assets/litenby-logo.png";

const columns = [
  {
    title: "the labs",
    links: [
      { label: "branding", href: "#" },
      { label: "packaging", href: "#" },
      { label: "storytelling", href: "#" },
    ],
  },
  {
    title: "work",
    links: [
      { label: "brand", href: "#" },
      { label: "packaging lab", href: "#" },
      { label: "launch", href: "#" },
      { label: "insight", href: "#" },
    ],
  },
  {
    title: "agency",
    links: [
      { label: "the story", href: "#" },
      { label: "contact", href: "mailto:hello@litenby.net" },
    ],
  },
  {
    title: "social",
    links: [{ label: "Instagram", href: "#", icon: true }],
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[hsl(0,0%,0%)]">
      <div className="container py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-16 lg:grid-cols-12"
        >
          {/* Brand */}
          <div className="lg:col-span-4">
            <img src={litenbyLogo} alt="Litenby" className="h-16 w-auto md:h-20" />
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
              a creative lab for brands that refuse to blend in.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-7 lg:col-start-6">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-2 font-body text-sm text-foreground/70 transition-colors duration-300 hover:text-primary"
                      >
                        {link.icon && <Instagram className="h-4 w-4" />}
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="my-14 h-px w-full bg-border/40" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-body text-xs text-muted-foreground/50">
            © 2026 litenby creative lab
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-body text-xs text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
