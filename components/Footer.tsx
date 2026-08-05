import Container from "@/components/Container";
import Link from "next/link";
import { navigationLinks, siteName } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <Container className="grid gap-8 py-10 md:grid-cols-[1.5fr_1fr] md:items-start">
        <div>
          <p className="text-lg font-semibold text-foreground">{siteName}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            AI Study Assistant for organizing study materials, generating summaries and quizzes, and supporting guided study.
          </p>
        </div>
        <nav aria-label="Footer" className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
