import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/Card";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

const recentActivities = [
  "Summarized Biology notes",
  "Generated a quiz for World History",
  "Reviewed algebra explanations",
] as const;

const savedSummaries = [
  "Photosynthesis overview",
  "Industrial Revolution recap",
  "Quadratic equations cheat sheet",
] as const;

const quizProgress = [
  { label: "Completed", value: "12" },
  { label: "Accuracy", value: "84%" },
  { label: "In progress", value: "3" },
] as const;

const navigationCards = [
  { title: "Notes", description: "Summarize new material", href: "/notes" },
  { title: "Quizzes", description: "Practice active recall", href: "/quizzes" },
  { title: "Tutor", description: "Get targeted explanations", href: "/tutor" },
] as const;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Review study activity, saved summaries, quiz progress, and jump into AI study tools.",
  alternates: { canonical: "/dashboard" },
};

export default function DashboardPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="Student dashboard"
          title="Your study progress at a glance"
          description="Sample dashboard content for the capstone demo. Track recent learning activity, review saved summaries, and jump into the next study action quickly."
          as="h1"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Recent activities</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {recentActivities.map((activity) => (
                <li key={activity} className="rounded-2xl border border-border bg-background px-4 py-3">
                  {activity}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Saved summaries</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {savedSummaries.map((summary) => (
                <li key={summary} className="rounded-2xl border border-border bg-background px-4 py-3">
                  {summary}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Quiz progress</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {quizProgress.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Navigation cards</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {navigationCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  prefetch
                  className="rounded-2xl border border-border bg-background p-4 transition hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <p className="text-lg font-semibold text-foreground">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
