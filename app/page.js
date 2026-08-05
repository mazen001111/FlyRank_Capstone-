import ButtonLink from "@/components/ButtonLink";
import Card from "@/components/Card";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

const highlights = [
  {
    title: "Organize study materials",
    description: "Keep notes, class resources, and exam prep content in one place.",
  },
  {
    title: "Summarize faster",
    description: "Turn long readings into concise, review-friendly summaries.",
  },
  {
    title: "Practice with quizzes",
    description: "Prepare for exams with placeholder quiz-generation workflows.",
  },
];

const flow = [
  "Add notes and learning resources.",
  "Review summaries and practice quizzes.",
  "Use the AI tutor page for guided study support.",
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border/50">
        <Container className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
          <div className="absolute inset-0 -z-10 bg-hero-grid bg-grid opacity-40" />
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                FE-04 Capstone Skeleton
              </p>
              <h1 className="mt-4 font-display text-5xl tracking-tight text-foreground sm:text-6xl">
                AI Study Assistant for focused, structured learning.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                A production-style starting point for students to manage notes, organize materials, review summaries, and prepare for future AI tutor workflows.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/dashboard">Open dashboard</ButtonLink>
                <ButtonLink href="/login" variant="secondary">
                  Placeholder sign in
                </ButtonLink>
              </div>
            </div>
            <Card className="p-0">
              <div className="rounded-2xl border border-border/60 bg-secondary/60 p-6">
                <p className="text-sm font-semibold text-muted-foreground">Project scope</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-background p-4">
                    <p className="text-sm text-muted-foreground">Focus</p>
                    <p className="mt-2 text-lg font-semibold">Study organization</p>
                  </div>
                  <div className="rounded-2xl bg-background p-4">
                    <p className="text-sm text-muted-foreground">Stack</p>
                    <p className="mt-2 text-lg font-semibold">Next.js + Tailwind</p>
                  </div>
                  <div className="rounded-2xl bg-background p-4">
                    <p className="text-sm text-muted-foreground">Architecture</p>
                    <p className="mt-2 text-lg font-semibold">Server Components first</p>
                  </div>
                  <div className="rounded-2xl bg-background p-4">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="mt-2 text-lg font-semibold">Skeleton only</p>
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
            eyebrow="What this foundation includes"
            title="Core pages and shared building blocks"
            description="The routes are intentionally simple placeholders so the project can be extended safely in later phases without reworking the app structure."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <Card key={item.title} className="h-full">
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border/50 bg-secondary/30 py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Recommended flow"
            title="How the placeholder experience is organized"
            description="This keeps the landing page useful while leaving every feature implementation for the next phase."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {flow.map((item, index) => (
              <Card key={item}>
                <p className="text-sm font-semibold text-muted-foreground">Step {index + 1}</p>
                <p className="mt-3 text-lg font-medium text-foreground">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
