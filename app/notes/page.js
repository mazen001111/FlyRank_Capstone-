import Card from "@/components/Card";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

const notes = ["Biology chapter summary", "History revision outline", "Calculus formula sheet"];

export default function NotesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="Notes management"
          title="Notes placeholder"
          description="This route is reserved for future note capture, organization, and summarization features."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Recent note groups</h2>
            <div className="mt-4 grid gap-3">
              {notes.map((note) => (
                <div key={note} className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                  {note}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Future actions</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Add note creation, tagging, search, and summary generation in later iterations.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
