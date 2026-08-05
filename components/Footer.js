import Container from "@/components/Container";
import { navigationLinks, siteName } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <Container className="grid gap-8 py-10 md:grid-cols-[1.5fr_1fr] md:items-start">
        <div>
          <p className="text-lg font-semibold text-foreground">{siteName}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Capstone skeleton for organizing study materials, practicing with quizzes, and preparing for an AI tutor experience.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          {navigationLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
