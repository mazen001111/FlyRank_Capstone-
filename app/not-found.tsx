import ButtonLink from "@/components/ButtonLink";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">404</p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-foreground">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          The page you requested does not exist. Head back to a study tool to continue.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/notes" variant="secondary">
            Summarize notes
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
