import Card from "@/components/Card";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";

const prompts = ["Explain this chapter simply", "Create a quick quiz", "Review my mistakes"];

export default function AiTutorPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="AI tutor"
          title="AI tutor placeholder"
          description="Reserved for the conversational study assistant experience that will be added after the skeleton phase."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Study support panel</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              This area is intentionally static until the AI integration is defined.
            </p>
          </Card>
          <Card>
            <h2 className="text-2xl font-semibold text-foreground">Example prompts</h2>
            <div className="mt-4 grid gap-3">
              {prompts.map((prompt) => (
                <div key={prompt} className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                  {prompt}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
