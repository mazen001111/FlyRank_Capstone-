import Link from "next/link";
import Container from "@/components/Container";
import { navigationLinks, siteName } from "@/lib/site";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
          {siteName}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/login"
          className="inline-flex items-center rounded-full border border-border bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
        >
          Sign in
        </Link>
      </Container>
    </header>
  );
}
