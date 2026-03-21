import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetFooter, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import litenbyLogo from '@/assets/litenby-logo.png';

export function LitenbyNavbar() {
  const [open, setOpen] = React.useState(false);

  const links = [
    { label: 'brand', href: '/brand' },
    { label: 'packaging', href: '/packaging' },
    { label: 'storytelling', href: '/storytelling' },
    { label: 'blog', href: '/blog' },
    { label: 'contact', href: '/contact' },
  ];

  return (
    <header className="w-full border-b border-border/40">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src={litenbyLogo}
            alt="Litenby"
            className="h-8 w-auto md:h-9"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-semibold lowercase text-foreground transition-colors duration-300 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <Button size="default" asChild><Link to="/contact#form">start your brand</Link></Button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <MenuToggle
            open={open}
            onOpenChange={setOpen}
            className="size-6 text-foreground"
          />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="top" className="bg-background">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="flex flex-col items-center gap-6 pt-10">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body text-lg font-semibold lowercase text-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <SheetFooter className="mt-8 flex flex-col items-center gap-3 sm:flex-col">
                <Button className="w-full max-w-xs">start your brand</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
