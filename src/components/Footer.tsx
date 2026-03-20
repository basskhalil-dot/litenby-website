import { Instagram, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
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
];

export function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ background: "#000000" }}>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        {/* Top: brand + social */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={litenbyLogo} alt="Litenby" className="h-24 w-auto md:h-32" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-full text-muted-foreground hover:text-white">
              <a href="#" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Middle: nav columns + tagline */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Tagline */}
          <div className="lg:col-span-4">
            <p className="max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
              a creative lab for brands that refuse to blend in.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
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
                        className="font-body text-sm text-muted-foreground transition-colors duration-200 hover:text-white"
                      >
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
        <div className="my-14 h-px w-full" style={{ background: "rgba(255,255,255,0.1)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-body text-xs text-muted-foreground/50">
            © 2026 litenby creative lab
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-body text-xs text-muted-foreground transition-colors duration-200 hover:text-white"
          >
            back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
