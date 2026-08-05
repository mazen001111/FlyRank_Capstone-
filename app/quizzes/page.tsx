import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import QuizGenerator from "@/components/quiz-generator";

export default function QuizzesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          eyebrow="AI quiz generator"
          title="Create practice questions from your material"
          description="Turn a topic or a block of notes into quiz questions with answers and explanations."
          as="h1"
        />
        <div className="mt-10">
          <QuizGenerator />
        </div>
      </Container>
    </section>
  );
}
