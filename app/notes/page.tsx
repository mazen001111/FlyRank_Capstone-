import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import SummaryForm from "@/components/summary-form";

export default function NotesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="AI note summarizer"
          title="Turn notes into a clean study summary"
          description="Paste class notes or reading content, then generate a concise summary you can review or reuse in quizzes."
          as="h1"
        />
        <div className="mt-10">
          <SummaryForm />
        </div>
      </Container>
    </section>
  );
}
