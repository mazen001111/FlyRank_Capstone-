import Card from "@/components/Card";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

const stats = [
  { label: "Active classes", value: "3" },
  { label: "Saved notes", value: "12" },
  { label: "Quiz sessions", value: "5" },
];

const tasks = [
  "Review lecture notes",
  "Draft quiz practice set",
  "Prepare for tomorrow's class",
];

export default function DashboardPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="Student dashboard"
          title="Dashboard placeholder"
          description="A simple overview surface for later study planning, note review, and AI tutor activity."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground">{stat.value}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Today&apos;s focus</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Placeholder content for study planning, progress snapshots, and upcoming work.
            </p>
          </Card>
          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Suggested tasks</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {tasks.map((task) => (
                <li key={task} className="rounded-2xl border border-border bg-background px-4 py-3">
                  {task}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </section>
  );
}
