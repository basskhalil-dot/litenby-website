import { Instagram, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import litenbyLogo from "@/assets/litenby-logo.png";

const mainLinks = [
  { label: "branding", href: "#" },
  { label: "packaging", href: "#" },
  { label: "storytelling", href: "#" },
  { label: "contact", href: "mailto:hello@litenby.net" },
];

const legalLinks = [
  { label: "privacy", href: "#" },
  { label: "terms", href: "#" },
];

export function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ background: "#000000" }}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* Top row: logo + social */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={litenbyLogo} alt="Litenby" className="h-10 w-auto md:h-14" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-10 w-10 rounded-full text-black hover:opacity-80"
              style={{ background: "#FFA500" }}
            >
              <a href="#" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Separator */}
        <div className="my-8 h-px w-full" style={{ background: "rgba(255,255,255,0.1)" }} />

        {/* Bottom row: copyright left, links right */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-body text-sm text-muted-foreground">
              © 2026 litenby creative lab
            </p>
            <p className="font-body text-sm text-muted-foreground/60">
              all rights reserved
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {mainLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm font-medium text-white transition-colors duration-200 hover:text-[hsl(var(--highlight))]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm text-muted-foreground transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
