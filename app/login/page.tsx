import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import Card from "@/components/Card";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign-in placeholder for AI Study Assistant student accounts.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-xl">
        <SectionHeader
          eyebrow="Account"
          title="Sign in"
          description="Authentication is not connected yet. Use the study tools without an account for now."
          as="h1"
        />
        <Card className="mt-10">
          <p className="text-sm leading-6 text-muted-foreground">
            This route exists so navigation and Lighthouse audits do not hit a 404. Wire a real auth provider here when ready.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/dashboard">Continue to dashboard</ButtonLink>
            <ButtonLink href="/notes" variant="secondary">
              Summarize notes
            </ButtonLink>
          </div>
        </Card>
      </Container>
    </section>
  );
}
