"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";
import { navigationLinks, siteName } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container className="flex min-h-16 flex-wrap items-center justify-between gap-4 py-3">
        <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
          {siteName}
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center justify-end gap-1">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[current=page]:bg-secondary aria-[current=page]:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/login"
          className="inline-flex items-center rounded-full border border-border bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Sign in
        </Link>
      </Container>
    </header>
  );
}
