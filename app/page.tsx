import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import Card from "@/components/Card";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

const features = [
  {
    title: "Summaries that save time",
    description: "Convert lecture notes and reading passages into concise study summaries.",
  },
  {
    title: "Quizzes that reinforce learning",
    description: "Generate practice questions, answers, and explanations from your study materials.",
  },
  {
    title: "Tutor guidance on demand",
    description: "Ask a question and get an explanation adapted to your subject and difficulty level.",
  },
] as const;

export const metadata: Metadata = {
  title: "Home",
  description: "Turn study materials into summaries, quizzes, and explanations with AI Study Assistant.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border/50">
        <Container className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
          <div className="absolute inset-0 -z-10 bg-hero-grid bg-grid opacity-40" aria-hidden="true" />
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">AI Study Assistant</p>
              <h1 className="mt-4 font-display text-5xl tracking-tight text-foreground sm:text-6xl">
                Turn study materials into summaries, quizzes, and explanations.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                AI Study Assistant helps students learn faster by organizing notes, generating practice quizzes, and explaining difficult topics with an LLM-style workflow.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/dashboard">Open dashboard</ButtonLink>
                <ButtonLink href="/notes" variant="secondary">
                  Summarize notes
                </ButtonLink>
              </div>
            </div>
            <Card className="p-0">
              <div className="rounded-2xl border border-border/60 bg-secondary/60 p-6">
                <p className="text-sm font-semibold text-muted-foreground">Why it helps</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-background p-4">
                    <p className="text-sm text-muted-foreground">Input</p>
                    <p className="mt-2 text-lg font-semibold">Notes, topics, questions</p>
                  </div>
                  <div className="rounded-2xl bg-background p-4">
                    <p className="text-sm text-muted-foreground">Output</p>
                    <p className="mt-2 text-lg font-semibold">Summaries, quizzes, explanations</p>
                  </div>
                  <div className="rounded-2xl bg-background p-4">
                    <p className="text-sm text-muted-foreground">Workflow</p>
                    <p className="mt-2 text-lg font-semibold">Study, test, improve</p>
                  </div>
                  <div className="rounded-2xl bg-background p-4">
                    <p className="text-sm text-muted-foreground">CTA</p>
                    <p className="mt-2 text-lg font-semibold">Start with notes</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="AI features"
            title="Built to support the full study loop"
            description="The app centers on a practical learning flow: capture material, compress it into something reviewable, and reinforce it with practice."
            as="h2"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full">
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border/50 bg-secondary/30 py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Clear CTA"
            title="Start with your notes or go straight to practice"
            description="The quickest path is to summarize a note, generate a quiz, or ask the tutor a question."
            as="h2"
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/notes">Summarize a note</ButtonLink>
            <ButtonLink href="/quizzes" variant="secondary">
              Generate a quiz
            </ButtonLink>
            <ButtonLink href="/tutor" variant="secondary">
              Ask the tutor
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
