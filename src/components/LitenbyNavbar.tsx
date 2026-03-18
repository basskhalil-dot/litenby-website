import React from 'react';
import { Sheet, SheetContent, SheetFooter, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';

export function LitenbyNavbar() {
  const [open, setOpen] = React.useState(false);

  const links = [
    { label: 'work', href: '#' },
    { label: 'services', href: '#' },
    { label: 'about', href: '#' },
  ];

  return (
    <header className="w-full border-b border-border/40">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
          litenby
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button size="default">start your brand</Button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <MenuToggle
            open={open}
            onOpenChange={setOpen}
            className="size-6 text-foreground"
          />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="top" showClose={false} className="bg-background">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="flex flex-col items-center gap-6 pt-10">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-lg text-muted-foreground transition-colors hover:text-foreground"
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
