"use client";

import { useEffect } from "react";
import ButtonLink from "@/components/ButtonLink";
import Container from "@/components/Container";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-20 sm:py-24">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Something went wrong</p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-foreground">We could not load this page</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          An unexpected error occurred. You can retry the request or return to the dashboard.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Try again
          </button>
          <ButtonLink href="/dashboard" variant="secondary">
            Back to dashboard
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
