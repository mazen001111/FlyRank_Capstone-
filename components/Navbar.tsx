import Link from "next/link";
import Container from "@/components/Container";
import NavLinks from "@/components/NavLinks";
import { siteName } from "@/lib/site";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/95 supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:backdrop-blur">
      <Container className="flex min-h-16 flex-wrap items-center justify-between gap-4 py-3">
        <Link href="/" prefetch className="text-base font-semibold tracking-tight text-foreground">
          {siteName}
        </Link>
        <NavLinks />
        <Link
          href="/login"
          prefetch
          className="inline-flex items-center rounded-full border border-border bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Sign in
        </Link>
      </Container>
    </header>
  );
}
