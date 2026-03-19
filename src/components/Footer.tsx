import { motion } from "framer-motion";
import { Instagram, ArrowUp } from "lucide-react";
import litenbyLogo from "@/assets/litenby-logo.png";

const navLinks = ["brand", "packaging lab", "launch", "insight"];

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
    <footer className="w-full bg-[hsl(0,0%,0%)]">
      <div className="container py-16 lg:py-20">
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
            <img src={litenbyLogo} alt="Litenby" className="h-8 w-auto" />
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
              a creative lab for brands that refuse to blend in.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 lg:col-start-6"
          >
            <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-sm text-foreground/70 transition-colors duration-300 hover:text-primary"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 lg:col-start-9"
          >
            <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hello@litenby.net"
                  className="font-body text-sm text-foreground/70 transition-colors duration-300 hover:text-primary"
                >
                  hello@litenby.net
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 font-body text-sm text-foreground/70 transition-colors duration-300 hover:text-primary"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-14 h-px w-full bg-border/40" />

        {/* Bottom bar */}
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