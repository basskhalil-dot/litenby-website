import { Button } from "@/components/ui/button";

interface FooterProps {
  logo: React.ReactNode;
  brandName: string;
  socialLinks: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  mainLinks: Array<{
    href: string;
    label: string;
  }>;
  legalLinks: Array<{
    href: string;
    label: string;
  }>;
  copyright: {
    text: string;
    license?: string;
  };
}

export function FooterBase({
  logo,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="w-full border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            {logo}
            <span className="font-heading text-lg font-bold text-white">
              {brandName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map((link, i) => (
              <Button key={i} variant="ghost" size="icon" asChild className="h-9 w-9 rounded-full text-muted-foreground hover:text-white">
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  {link.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-8 sm:flex-row">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {mainLinks.map((link, i) => (
              <a key={i} href={link.href} className="font-body text-sm text-muted-foreground transition-colors duration-200 hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {legalLinks.map((link, i) => (
              <a key={i} href={link.href} className="font-body text-sm text-muted-foreground transition-colors duration-200 hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-muted-foreground/50">{copyright.text}</p>
          {copyright.license && (
            <p className="font-body text-xs text-muted-foreground/50">{copyright.license}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
