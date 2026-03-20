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
    <footer className="w-full" style={{ background: "#000000" }}>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <img
              src={litenbyLogo}
              alt="Litenby"
              className="h-24 w-auto md:h-32"
            />
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
              a creative lab for brands that refuse to blend in.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-7 lg:col-start-6">
            {columns.map((col) => (
              <div key={col.title}>
                <h3
                  className="mb-5 font-body text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#FFFF00" }}
                >
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors duration-300 hover:text-white"
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
        </div>

        {/* Separator */}
        <div
          className="my-16 h-px w-full"
          style={{ background: "rgba(255,255,255,0.12)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-body text-xs text-muted-foreground/50">
            © 2026 litenby creative lab
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-body text-xs text-muted-foreground transition-colors duration-300 hover:text-white"
          >
            back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
